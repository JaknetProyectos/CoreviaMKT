"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ETOMIN_BASE_URL = "https://pagos.etomin.com/api/v1";

// 1. FUNCIÓN DE SEGURIDAD PARA PARSEAR LA API DE ETOMIN
async function safeEtominFetch(url: string, options: RequestInit) {
  // Configurar cabeceras obligatorias para evitar bloqueos del WAF de Etomin
  const headers = new Headers(options.headers || {});
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36");
  }
  if (!headers.has("Origin")) {
    headers.set("Origin", "https://coreviamkt.com");
  }

  const res = await fetch(url, { ...options, headers });
  const text = await res.text(); 

  if (text.trim().startsWith("<")) {
    console.error(`❌ Etomin devolvió HTML (Posible bloqueo de Firewall) [HTTP ${res.status}]:`, text.substring(0, 200));
    throw new Error("El servidor de pagos bloqueó la conexión.");
  }

  if (!text || text.trim() === "") {
    console.error(`❌ Etomin devolvió respuesta vacía [HTTP ${res.status}]`);
    throw new Error("Respuesta vacía o nula del servidor de pagos.");
  }

  try {
    // Intento normal
    return JSON.parse(text);
  } catch (error) {
    console.warn("⚠️ JSON de Etomin malformado, intentando reparar...");
    const lastBrace = text.lastIndexOf('}');
    if (lastBrace !== -1) {
      try {
        return JSON.parse(text.substring(0, lastBrace + 1));
      } catch (e) {}
    }
    
    try {
      return JSON.parse(text.trim() + '}');
    } catch (e) {}

    console.error("❌ Etomin API devolvió un texto imposible de parsear:", text);
    throw new Error("Error de comunicación con la pasarela de pagos.");
  }
}

// 2. DEFINIMOS LOS TIPOS ESTRICTOS
export interface CheckoutFormState {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  empresa?: string;
  rfc?: string;
  direccion: string;
  ciudad: string;
  estado: string;
  cp: string;
  pais: string;
  card: string;
  cardName: string;
  exp: string;
  cvc: string;
  notas?: string;
}

export interface CheckoutItem {
  product: {
    id: string | number;
    priceMXN: number;
    es: { name: string };
    en: { name: string };
  };
  qty: number;
}

export interface CheckoutPayload {
  form: CheckoutFormState;
  items: CheckoutItem[];
  totals: {
    subtotal: number;
    iva: number;
    total: number;
  };
  lang: "es" | "en";
}

// 3. PROCESAMIENTO DEL PAGO
export async function processCheckout(payload: CheckoutPayload) {
  try {
    const { form, items, totals, lang } = payload;
    const orderId = `PC-${Math.floor(100000 + Math.random() * 899999)}`;
    const currentLang = lang || "es";

    // Aseguramos que las credenciales no sean undefined (evita crasheos en URLSearchParams)
    const emailStr = process.env.ETOMIN_EMAIL;
    const passwordStr = process.env.ETOMIN_PASSWORD;

    if (!emailStr || !passwordStr) {
      throw new Error("Credenciales de la pasarela no configuradas en el servidor.");
    }

    // A. AUTENTICACIÓN EN ETOMIN
    const authData = await safeEtominFetch(`${ETOMIN_BASE_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        email: emailStr,    
        password: passwordStr,
      }),
    });

    if (!authData.authToken) throw new Error("Error de autenticación con la pasarela.");
    const token = authData.authToken;

    // B. TOKENIZACIÓN DE LA TARJETA
    const expParts = form.exp.split("/");
    const cardData = {
      cardNumber: form.card.replace(/\s/g, ""),
      cardholderName: form.cardName,
      expirationMonth: expParts[0],
      expirationYear: `20${expParts[1]}`,
    };

    const tokenData = await safeEtominFetch(`${ETOMIN_BASE_URL}/card/tokenizer`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cardData }),
    });

    if (!tokenData.cardNumberToken) throw new Error("Error al procesar la tarjeta.");

    // C. PROCESAR LA VENTA
    const salePayload = {
      amount: Math.round(totals.total * 100) / 100,
      currency: 484, // MXN
      reference: orderId,
      customerInformation: {
        firstName: form.nombre,
        lastName: form.apellidos,
        email: form.email,
        phone1: form.telefono,
        city: form.ciudad,
        address1: form.direccion,
        postalCode: form.cp,
        state: form.estado,
        country: form.pais === "México" ? "Mx" : form.pais,
      },
      cardData: {
        cardNumberToken: tokenData.cardNumberToken,
        cvv: form.cvc,
      },
      items: items.map((i) => ({
        title: i.product[currentLang].name,
        amount: Math.round(i.product.priceMXN * 100) / 100,
        quantity: i.qty,
        id: String(i.product.id),
      })),
      redirectUrl: "https://coreviamkt.com/checkout",
    };

    const saleData = await safeEtominFetch(`${ETOMIN_BASE_URL}/sale`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(salePayload),
    });

    // D. EVALUAR RESPUESTA
    if (saleData.status === "DECLINED") {
      return { success: false, error: "Pago declinado. Revisa los fondos o intenta con otra tarjeta." };
    }
    
    if (saleData.status === "PENDING" && saleData.redirectTo) {
      return { success: true, redirectTo: saleData.redirectTo };
    }

    if (saleData.status !== "APPROVED") {
      return { success: false, error: "La transacción falló o fue rechazada por el banco." };
    }

    // E. ENVÍO DE CORREOS
    await enviarCorreos(orderId, form, items, totals, currentLang);

    return { success: true, orderId };
  } catch (error: unknown) {
    console.error("Checkout Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Ocurrió un error al procesar el pago.";
    return { success: false, error: errorMessage };
  }
}

async function enviarCorreos(
  orderId: string,
  form: CheckoutFormState,
  items: CheckoutItem[],
  totals: { subtotal: number; iva: number; total: number },
  lang: "es" | "en"
) {
  const adminEmail = process.env.ADMIN_EMAIL || "hola@coreviamkt.com";
  const senderEmail = "CoreviaMKT <hola@coreviamkt.com>"; 

  const texts = {
    es: {
      subjectClient: `¡Gracias por tu pedido! Folio: ${orderId}`,
      subjectAdmin: `💰 NUEVA VENTA: ${orderId} - ${form.nombre}`,
      title: `Confirmación de Pedido: ${orderId}`,
      hello: `Hola`,
      intro: `Tu pago ha sido procesado exitosamente. Hemos recibido tu solicitud para iniciar tu proyecto digital.`,
      totalPaid: `Total Pagado:`,
      clientData: `Datos del Cliente`,
      emailLabel: `Email:`,
      phoneLabel: `Teléfono:`,
      companyLabel: `Empresa/RFC:`,
      footer: `CoreviaMKT — Estudio Digital CDMX.`
    },
    en: {
      subjectClient: `Thank you for your order! Folio: ${orderId}`,
      subjectAdmin: `💰 NEW SALE: ${orderId} - ${form.nombre}`,
      title: `Order Confirmation: ${orderId}`,
      hello: `Hello`,
      intro: `Your payment has been successfully processed. We have received your request to start your digital project.`,
      totalPaid: `Total Paid:`,
      clientData: `Customer Information`,
      emailLabel: `Email:`,
      phoneLabel: `Phone:`,
      companyLabel: `Company/Tax ID:`,
      footer: `CoreviaMKT — Digital Studio CDMX.`
    }
  };

  const t = texts[lang] || texts["es"];
  
  const itemsListHtml = items.map((i) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${i.qty}x ${i.product[lang].name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${(i.product.priceMXN * i.qty).toFixed(2)} MXN</td>
    </tr>
  `).join("");

  const emailBody = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f5; padding: 40px 20px; color: #111827;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
      
      <!-- Header / Título -->
      <div style="border-bottom: 2px solid #065f46; padding-bottom: 20px; margin-bottom: 24px;">
        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #065f46; font-weight: bold; display: block; margin-bottom: 6px;">Confirmación de Pedido</span>
        <h2 style="color: #111827; font-size: 24px; margin: 0; font-weight: 700;">${t.title}</h2>
      </div>

      <!-- Saludo e introducción -->
      <p style="font-size: 16px; line-height: 1.5; color: #374151; margin-bottom: 12px;">
        ${t.hello} <strong>${form.nombre}</strong>,
      </p>
      <p style="font-size: 15px; line-height: 1.5; color: #4b5563; margin-bottom: 28px;">
        ${t.intro}
      </p>
      
      <!-- Tarjeta de Resumen de Productos -->
      <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <h3 style="font-size: 13px; font-weight: 700; color: #374151; margin-top: 0; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1px;">
          Resumen de Artículos
        </h3>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #374151;">
          ${itemsListHtml}
          <tr>
            <td colspan="2" style="border-top: 1px solid #e5e7eb; padding-top: 14px; padding-bottom: 4px;"></td>
          </tr>
          <tr>
            <td style="padding: 4px 0; font-weight: bold; color: #111827;">${t.totalPaid}</td>
            <td style="padding: 4px 0; font-weight: bold; text-align: right; color: #065f46; font-size: 16px;">$${totals.total.toFixed(2)} MXN</td>
          </tr>
        </table>
      </div>

      <!-- Tarjeta de Datos del Cliente -->
      <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <h3 style="font-size: 13px; font-weight: 700; color: #374151; margin-top: 0; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1px;">
          ${t.clientData}
        </h3>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #374151;">
          <tr>
            <td style="padding: 6px 0; font-weight: bold; width: 35%; color: #4b5563; vertical-align: top;">${t.emailLabel}:</td>
            <td style="padding: 6px 0; color: #111827; vertical-align: top;">${form.email}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #4b5563; vertical-align: top;">${t.phoneLabel}:</td>
            <td style="padding: 6px 0; color: #111827; vertical-align: top;">${form.telefono}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #4b5563; vertical-align: top;">${t.companyLabel}:</td>
            <td style="padding: 6px 0; color: #111827; vertical-align: top;">${form.empresa || "N/A"} / ${form.rfc || "N/A"}</td>
          </tr>
        </table>
      </div>

      <!-- Footer -->
      <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
        <p style="font-size: 12px; color: #9ca3af; margin: 0; line-height: 1.4;">
          ${t.footer}
        </p>
      </div>

    </div>
  </div>
`;

  try {
    await resend.emails.send({
      from: senderEmail,
      to: form.email,
      subject: t.subjectClient,
      html: emailBody,
    });

    await resend.emails.send({
      from: senderEmail,
      to: adminEmail,
      subject: t.subjectAdmin,
      html: `<div style="background-color: #f4ede0; padding: 20px;">${emailBody}</div>`,
    });
  } catch (err) {
    console.error("❌ Error ejecutando Resend:", err);
  }
}