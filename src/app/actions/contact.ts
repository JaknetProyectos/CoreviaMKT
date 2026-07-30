"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// 1. DEFINIMOS LOS TIPOS ESTRICTOS
export interface ContactFormState {
  nombre: string;
  correo: string;
  telefono: string;
  asunto: string;
  mensaje: string;
}

export interface ContactPayload {
  form: ContactFormState;
  lang: "es" | "en";
}

// 2. APLICAMOS EL TIPO AL PAYLOAD
export async function processContact(payload: ContactPayload) {
  try {
    const { form, lang } = payload;
    const adminEmail = process.env.ADMIN_EMAIL || "hola@coreviamkt.com";
    const senderEmail = "CoreviaMKT <hola@coreviamkt.com>";

    const texts = {
      es: {
        subjectClient: "Hemos recibido tu mensaje - CoreviaMKT",
        subjectAdmin: `Nuevo mensaje de contacto: ${form.nombre}`,
        title: "¡Gracias por contactarnos!",
        hello: "Hola",
        intro: "Hemos recibido tu mensaje. Revisaremos los detalles de tu proyecto y nos pondremos en contacto contigo lo antes posible para enviarte una propuesta personalizada.",
        details: "Detalles de tu mensaje:",
        name: "Nombre:",
        email: "Email:",
        phone: "Teléfono:",
        subject: "Asunto:",
        message: "Mensaje:",
        footer: "CoreviaMKT — Estudio Digital CDMX."
      },
      en: {
        subjectClient: "We have received your message - CoreviaMKT",
        subjectAdmin: `New contact message: ${form.nombre}`,
        title: "Thank you for reaching out!",
        hello: "Hello",
        intro: "We have received your message. We will review your project details and get back to you as soon as possible with a custom proposal.",
        details: "Your message details:",
        name: "Name:",
        email: "Email:",
        phone: "Phone:",
        subject: "Subject:",
        message: "Message:",
        footer: "CoreviaMKT — Digital Studio CDMX."
      }
    };

    const t = texts[lang] || texts["es"];

    const emailBody = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f5; padding: 40px 20px; color: #111827;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
      
      <!-- Header / Título -->
      <div style="border-bottom: 2px solid #065f46; padding-bottom: 20px; margin-bottom: 24px;">
        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #065f46; font-weight: bold; display: block; margin-bottom: 6px;">Notificación de Contacto</span>
        <h2 style="color: #111827; font-size: 24px; margin: 0; font-weight: 700;">${t.title}</h2>
      </div>

      <!-- Saludo e introducción -->
      <p style="font-size: 16px; line-height: 1.5; color: #374151; margin-bottom: 12px;">
        ${t.hello} <strong>${form.nombre}</strong>,
      </p>
      <p style="font-size: 15px; line-height: 1.5; color: #4b5563; margin-bottom: 28px;">
        ${t.intro}
      </p>
      
      <!-- Tarjeta de Detalles -->
      <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <h3 style="font-size: 13px; font-weight: 700; color: #374151; margin-top: 0; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1px;">
          ${t.details}
        </h3>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #374151;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 32%; color: #4b5563; vertical-align: top;">${t.name}:</td>
            <td style="padding: 8px 0; color: #111827; vertical-align: top;">${form.nombre}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4b5563; vertical-align: top;">${t.email}</td>
            <td style="padding: 8px 0; color: #111827; vertical-align: top;">${form.correo}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4b5563; vertical-align: top;">${t.phone}</td>
            <td style="padding: 8px 0; color: #111827; vertical-align: top;">${form.telefono || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4b5563; vertical-align: top;">${t.subject}</td>
            <td style="padding: 8px 0; color: #111827; vertical-align: top;">${form.asunto || "N/A"}</td>
          </tr>
        </table>

        <!-- Bloque de Mensaje -->
        <div style="margin-top: 18px; border-top: 1px solid #e5e7eb; padding-top: 16px;">
          <strong style="display: block; font-size: 13px; font-weight: bold; color: #4b5563; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">${t.message}:</strong>
          <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px; color: #111827; font-size: 14px; line-height: 1.6;">
            ${form.mensaje}
          </div>
        </div>
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

    // 1. Correo de confirmación al cliente
    await resend.emails.send({
      from: senderEmail,
      to: form.correo,
      subject: t.subjectClient,
      html: emailBody,
    });

    // 2. Correo de notificación al Administrador
    await resend.emails.send({
      from: senderEmail,
      to: adminEmail,
      subject: t.subjectAdmin,
      html: `<div style="background-color: #f4ede0; padding: 20px;">${emailBody}</div>`,
    });

    return { success: true };
  } catch (error: unknown) {
    console.error("❌ Error en processContact:", error);
    const errorMessage = error instanceof Error ? error.message : "Ocurrió un error desconocido";
    return { success: false, error: errorMessage };
  }
}