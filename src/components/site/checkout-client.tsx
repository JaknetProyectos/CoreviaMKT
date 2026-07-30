"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowRight,
  Check,
  Lock,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCart, IVA_RATE } from "@/lib/cart-context";
import { formatMXN } from "@/lib/products";
import { useLanguage } from "@/lib/language-context";
import {
  processCheckout,
  type CheckoutFormState,
  type CheckoutItem,
} from "@/app/actions/checkout";

// Forzamos que los campos requeridos coincidan estrictamente con la interfaz del servidor
const REQUIRED: (keyof CheckoutFormState)[] = [
  "nombre",
  "apellidos",
  "email",
  "telefono",
  "direccion",
  "ciudad",
  "estado",
  "cp",
  "card",
  "cardName",
  "exp",
  "cvc",
];

function Field({
  label,
  children,
  error,
  className,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2.5 block font-mono text-[0.64rem] font-bold uppercase tracking-[0.17em] text-[#526a63]">
        {label}
      </label>

      {children}

      {error && (
        <p className="mt-2 flex items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-[#c54f3d]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c54f3d]" />
          {error}
        </p>
      )}
    </div>
  );
}

function SectionTitle({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-7 flex items-center gap-4 border-b border-[#102e28]/10 pb-5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#102e28] font-mono text-[0.66rem] font-bold text-[#d8ff65] shadow-[0_12px_28px_-15px_rgba(16,46,40,0.8)]">
        {n}
      </span>

      <div>
        <span className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#168267]">
          Corevia MKT
        </span>

        <h2 className="display mt-1 text-xl font-semibold tracking-[-0.02em] text-[#102e28] sm:text-2xl">
          {title}
        </h2>
      </div>
    </div>
  );
}

const inputBase =
  "flex h-12 w-full rounded-2xl border border-[#102e28]/12 bg-[#f6f8f5] px-4 text-[0.95rem] text-[#102e28] outline-none transition-all duration-300 placeholder:text-[#102e28]/35 hover:border-[#168267]/30 focus:border-[#168267] focus:bg-white focus:ring-4 focus:ring-[#56c5a8]/15";

const inputClass =
  "h-12 rounded-2xl border-[#102e28]/12 bg-[#f6f8f5] px-4 text-[#102e28] shadow-none transition-all duration-300 placeholder:text-[#102e28]/35 hover:border-[#168267]/30 focus-visible:border-[#168267] focus-visible:ring-4 focus-visible:ring-[#56c5a8]/15";

const textareaClass =
  "min-h-28 resize-none rounded-2xl border-[#102e28]/12 bg-[#f6f8f5] px-4 py-3 text-[#102e28] shadow-none transition-all duration-300 placeholder:text-[#102e28]/35 hover:border-[#168267]/30 focus-visible:border-[#168267] focus-visible:ring-4 focus-visible:ring-[#56c5a8]/15";

export function CheckoutClient() {
  const {
    items,
    subtotal,
    iva,
    total,
    hydrated,
    setQty,
    remove,
    clear,
  } = useCart();

  const { t, lang } = useLanguage();

  const [form, setForm] = useState<Partial<CheckoutFormState>>({
    pais: "México",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutFormState, string>>
  >({});

  const [loading, setLoading] = useState(false);

  const [order, setOrder] = useState<{
    no: string;
    total: number;
  } | null>(null);

  const update = (k: keyof CheckoutFormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));

    if (errors[k]) {
      setErrors((e) => ({ ...e, [k]: undefined }));
    }
  };

  const fmtCard = (v: string) =>
    v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const fmtExp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const validate = () => {
    const e: Partial<Record<keyof CheckoutFormState, string>> = {};

    for (const k of REQUIRED) {
      if (!form[k]?.trim()) {
        e[k] = t.checkout.requiredErr;
      }
    }

    if (
      form.email &&
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)
    ) {
      e.email = t.checkout.invalidEmail;
    }

    if (form.cp && !/^\d{5}$/.test(form.cp)) {
      e.cp = t.checkout.digits5;
    }

    if (
      form.card &&
      form.card.replace(/\s/g, "").length < 15
    ) {
      e.card = t.checkout.incompleteNum;
    }

    if (form.exp && !/^\d{2}\/\d{2}$/.test(form.exp)) {
      e.exp = "MM/AA";
    }

    if (form.cvc && !/^\d{3,4}$/.test(form.cvc)) {
      e.cvc = "3–4";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    if (items.length === 0) return;

    if (!validate()) {
      toast(t.checkout.toastReview, {
        description: t.checkout.toastReviewDesc,
      });

      const first = document.querySelector("[data-error='true']");

      first?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      return;
    }

    setLoading(true);

    // Mapeamos estrictamente los items a la interfaz que espera el servidor
    const checkoutItems: CheckoutItem[] = items.map((i) => ({
      product: {
        id: i.product.id,
        priceMXN: i.product.priceMXN,
        es: {
          name: i.product.es.name,
        },
        en: {
          name: i.product.en.name,
        },
      },
      qty: i.qty,
    }));

    const result = await processCheckout({
      form: form as CheckoutFormState,
      items: checkoutItems,
      totals: {
        subtotal,
        iva,
        total,
      },
      lang: lang as "es" | "en",
    });

    setLoading(false);

    if (result.success) {
      if (result.redirectTo) {
        window.location.href = result.redirectTo;
        return;
      }

      setOrder({
        no: result.orderId!,
        total,
      });

      clear();

      toast(t.checkout.toastConfirmed, {
        description: `${t.checkout.toastFolio} ${result.orderId}`,
      });
    } else {
      toast.error("Error en el pago", {
        description: result.error,
      });
    }
  };

  if (order) {
    return (
      <main className="relative min-h-[75vh] overflow-hidden bg-[#f3f6f2]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-40 top-0 h-[440px] w-[440px] rounded-full bg-[#d8ff65]/25 blur-3xl" />
          <div className="absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full bg-[#56c5a8]/20 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#102e28_1px,transparent_1px),linear-gradient(90deg,#102e28_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <div className="container-px relative mx-auto flex max-w-3xl items-center justify-center py-20 sm:py-28">
          <div className="w-full overflow-hidden rounded-[2.5rem] border border-[#102e28]/10 bg-white/85 shadow-[0_35px_90px_-45px_rgba(16,46,40,0.55)] backdrop-blur-xl">
            <div className="relative bg-[#102e28] px-6 py-12 text-center sm:px-10">
              <div
                aria-hidden="true"
                className="absolute inset-0 overflow-hidden"
              >
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/10" />
                <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-[#168267]/25 blur-3xl" />
              </div>

              <span className="relative mx-auto grid h-24 w-24 place-items-center rounded-[2rem] bg-[#d8ff65] text-[#102e28] shadow-[0_20px_45px_-18px_rgba(216,255,101,0.55)]">
                <Check className="h-11 w-11" strokeWidth={2.5} />
              </span>

              <h1 className="display relative mt-8 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                {t.checkout.successThankYou}
              </h1>

              <p className="relative mx-auto mt-4 max-w-xl text-pretty text-base leading-7 text-white/60 sm:text-lg">
                {t.checkout.successDesc}
              </p>
            </div>

            <div className="p-6 sm:p-9">
              <div className="mx-auto max-w-md rounded-[1.75rem] border border-[#102e28]/10 bg-[#f4f7f3] p-6">
                <div className="flex items-center justify-between gap-5 border-b border-[#102e28]/10 pb-5">
                  <span className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[#60736d]">
                    {t.checkout.folioLabel}
                  </span>

                  <span className="rounded-full bg-[#102e28] px-3 py-1.5 font-mono text-xs font-semibold text-[#d8ff65]">
                    {order.no}
                  </span>
                </div>

                <div className="flex items-end justify-between gap-5 pt-5">
                  <span className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[#60736d]">
                    {t.checkout.totalPaid}
                  </span>

                  <span className="display text-right text-2xl font-semibold tracking-[-0.03em] text-[#168267]">
                    {formatMXN(order.total)} MXN
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button
                  asChild
                  className="h-12 rounded-full bg-[#102e28] px-6 font-semibold text-white hover:bg-[#168267]"
                >
                  <Link href="/servicios">
                    {t.checkout.exploreMore}
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-full border-[#102e28]/15 bg-white px-6 text-[#102e28] hover:bg-[#eef3ee]"
                >
                  <Link href="/">
                    {t.checkout.backHome}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (hydrated && items.length === 0) {
    return (
      <main className="relative min-h-[70vh] overflow-hidden bg-[#f3f6f2]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[#d8ff65]/25 blur-3xl" />
          <div className="absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full bg-[#56c5a8]/20 blur-3xl" />
        </div>

        <div className="container-px relative mx-auto flex max-w-2xl flex-col items-center py-24 text-center sm:py-32">
          <div className="relative">
            <div className="absolute -inset-5 rounded-[2.5rem] border border-dashed border-[#102e28]/15" />

            <span className="relative grid h-24 w-24 place-items-center rounded-[2rem] bg-[#102e28] text-[#d8ff65] shadow-[0_25px_55px_-28px_rgba(16,46,40,0.8)]">
              <ShoppingBag className="h-9 w-9" />
            </span>
          </div>

          <h1 className="display mt-10 text-4xl font-semibold tracking-[-0.04em] text-[#102e28] sm:text-5xl">
            {t.checkout.emptyTitle}
          </h1>

          <p className="mt-4 max-w-md text-pretty leading-7 text-[#61736d]">
            {t.checkout.emptyDesc}
          </p>

          <Button
            asChild
            className="group mt-8 h-12 rounded-full bg-[#102e28] px-6 font-semibold text-white hover:bg-[#168267]"
          >
            <Link
              href="/servicios"
              className="inline-flex items-center gap-3"
            >
              {t.checkout.viewServices}

              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#d8ff65] text-[#102e28] transition-transform group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden bg-[#f3f6f2] py-12 sm:py-16 lg:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(#102e28_1px,transparent_1px),linear-gradient(90deg,#102e28_1px,transparent_1px)] [background-size:54px_54px]" />

        <div className="absolute -left-40 top-0 h-[460px] w-[460px] rounded-full bg-[#d8ff65]/20 blur-3xl" />

        <div className="absolute -right-44 bottom-0 h-[520px] w-[520px] rounded-full bg-[#56c5a8]/15 blur-3xl" />
      </div>

      <div className="container-px relative mx-auto max-w-[1400px]">
        <div className="relative mb-10 overflow-hidden rounded-[2.25rem] bg-[#102e28] px-6 py-9 sm:px-9 sm:py-11 lg:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border border-white/10" />
            <div className="absolute right-10 top-10 h-40 w-40 rounded-full border border-[#d8ff65]/15" />
            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#168267]/25 blur-3xl" />
          </div>

          <div className="relative">
            <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 font-mono text-[0.64rem] font-bold uppercase tracking-[0.18em] text-[#d8ff65]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d8ff65] opacity-40" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#d8ff65]" />
              </span>

              {t.checkout.eyebrow}
            </span>

            <h1 className="display mt-6 max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
              {t.checkout.title}
            </h1>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:gap-10"
        >
          <div className="space-y-6">
            <section className="rounded-[2rem] border border-[#102e28]/10 bg-white/85 p-6 shadow-[0_25px_65px_-48px_rgba(16,46,40,0.55)] backdrop-blur-sm sm:p-8">
              <SectionTitle
                n="01"
                title={t.checkout.contactSec}
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label={t.checkout.name}
                  error={errors.nombre}
                >
                  <Input
                    data-error={!!errors.nombre}
                    value={form.nombre || ""}
                    onChange={(e) =>
                      update("nombre", e.target.value)
                    }
                    placeholder={t.checkout.name}
                    className={inputClass}
                  />
                </Field>

                <Field
                  label={t.checkout.lastName}
                  error={errors.apellidos}
                >
                  <Input
                    value={form.apellidos || ""}
                    onChange={(e) =>
                      update("apellidos", e.target.value)
                    }
                    placeholder={t.checkout.lastName}
                    className={inputClass}
                  />
                </Field>

                <Field
                  label="Email"
                  error={errors.email}
                >
                  <Input
                    type="email"
                    value={form.email || ""}
                    onChange={(e) =>
                      update("email", e.target.value)
                    }
                    placeholder="tu@correo.com"
                    className={inputClass}
                  />
                </Field>

                <Field
                  label={t.contact.phone}
                  error={errors.telefono}
                >
                  <Input
                    value={form.telefono || ""}
                    onChange={(e) =>
                      update("telefono", e.target.value)
                    }
                    placeholder="+52 ..."
                    className={inputClass}
                  />
                </Field>
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#102e28]/10 bg-white/85 p-6 shadow-[0_25px_65px_-48px_rgba(16,46,40,0.55)] backdrop-blur-sm sm:p-8">
              <SectionTitle
                n="02"
                title={t.checkout.billingSec}
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t.checkout.company}>
                  <Input
                    value={form.empresa || ""}
                    onChange={(e) =>
                      update("empresa", e.target.value)
                    }
                    placeholder={t.checkout.companyPlaceholder}
                    className={inputClass}
                  />
                </Field>

                <Field label={t.checkout.rfc}>
                  <Input
                    value={form.rfc || ""}
                    onChange={(e) =>
                      update(
                        "rfc",
                        e.target.value.toUpperCase(),
                      )
                    }
                    placeholder="XAXX010101000"
                    className={inputClass}
                  />
                </Field>

                <Field
                  label={t.checkout.address}
                  error={errors.direccion}
                  className="sm:col-span-2"
                >
                  <Input
                    value={form.direccion || ""}
                    onChange={(e) =>
                      update("direccion", e.target.value)
                    }
                    placeholder={t.checkout.addressPlaceholder}
                    className={inputClass}
                  />
                </Field>

                <Field
                  label={t.checkout.city}
                  error={errors.ciudad}
                >
                  <Input
                    value={form.ciudad || ""}
                    onChange={(e) =>
                      update("ciudad", e.target.value)
                    }
                    placeholder={t.checkout.city}
                    className={inputClass}
                  />
                </Field>

                <Field
                  label={t.checkout.state}
                  error={errors.estado}
                >
                  <Input
                    value={form.estado || ""}
                    onChange={(e) =>
                      update("estado", e.target.value)
                    }
                    placeholder={t.checkout.state}
                    className={inputClass}
                  />
                </Field>

                <Field
                  label={t.checkout.zip}
                  error={errors.cp}
                >
                  <Input
                    value={form.cp || ""}
                    onChange={(e) =>
                      update(
                        "cp",
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 5),
                      )
                    }
                    placeholder="06700"
                    inputMode="numeric"
                    className={inputClass}
                  />
                </Field>

                <Field label={t.checkout.country}>
                  <select
                    value={form.pais || "México"}
                    onChange={(e) =>
                      update("pais", e.target.value)
                    }
                    className={inputBase}
                  >
                    <option>México</option>
                    <option>Estados Unidos</option>
                    <option>Colombia</option>
                    <option>Argentina</option>
                    <option>España</option>
                  </select>
                </Field>
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#102e28]/10 bg-white/85 p-6 shadow-[0_25px_65px_-48px_rgba(16,46,40,0.55)] backdrop-blur-sm sm:p-8">
              <SectionTitle
                n="03"
                title={t.checkout.paymentSec}
              />

              <div className="mb-6 flex flex-col gap-4 rounded-[1.4rem] border border-[#56c5a8]/20 bg-[#eff8f4] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#102e28] text-[#d8ff65]">
                    <Lock className="h-4 w-4" />
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-[#102e28]">
                      Pago encriptado y seguro
                    </p>

                    <p className="mt-0.5 text-xs text-[#61736d]">
                      Tus datos viajan mediante una conexión protegida.
                    </p>
                  </div>
                </div>

                <img
                  src="/etomin_logo.svg"
                  alt="Procesado por Etomin Payments"
                  className="h-[30px] w-auto object-contain opacity-75 mix-blend-multiply"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label={t.checkout.cardNumber}
                  error={errors.card}
                  className="sm:col-span-2"
                >
                  <Input
                    value={form.card || ""}
                    onChange={(e) =>
                      update("card", fmtCard(e.target.value))
                    }
                    placeholder="4242 4242 4242 4242"
                    inputMode="numeric"
                    className={inputClass}
                  />
                </Field>

                <Field
                  label={t.checkout.cardName}
                  error={errors.cardName}
                  className="sm:col-span-2"
                >
                  <Input
                    value={form.cardName || ""}
                    onChange={(e) =>
                      update("cardName", e.target.value)
                    }
                    placeholder={t.checkout.cardNamePlaceholder}
                    className={inputClass}
                  />
                </Field>

                <Field
                  label={t.checkout.exp}
                  error={errors.exp}
                >
                  <Input
                    value={form.exp || ""}
                    onChange={(e) =>
                      update("exp", fmtExp(e.target.value))
                    }
                    placeholder="MM/AA"
                    inputMode="numeric"
                    className={inputClass}
                  />
                </Field>

                <Field
                  label="CVV"
                  error={errors.cvc}
                >
                  <Input
                    type="password"
                    value={form.cvc || ""}
                    onChange={(e) =>
                      update(
                        "cvc",
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 4),
                      )
                    }
                    placeholder="***"
                    inputMode="numeric"
                    className={inputClass}
                  />
                </Field>

                <Field
                  label={t.checkout.notes}
                  className="sm:col-span-2"
                >
                  <Textarea
                    value={form.notas || ""}
                    onChange={(e) =>
                      update("notas", e.target.value)
                    }
                    placeholder={t.checkout.notesPlaceholder}
                    rows={3}
                    className={textareaClass}
                  />
                </Field>
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#102e28] p-6 text-white shadow-[0_35px_90px_-45px_rgba(16,46,40,0.9)] sm:p-7">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/10" />
                <div className="absolute right-6 top-6 h-28 w-28 rounded-full border border-[#d8ff65]/15" />
                <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-[#168267]/20 blur-3xl" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8ff65]/60 to-transparent" />
              </div>

              <div className="relative">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.19em] text-[#d8ff65]">
                      {t.checkout.summaryEyebrow}
                    </p>

                    <p className="display mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
                      Corevia MKT
                    </p>
                  </div>

                  <span className="grid h-11 min-w-11 place-items-center rounded-2xl bg-[#d8ff65] px-3 font-mono text-xs font-bold text-[#102e28]">
                    {String(items.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-5 max-h-[340px] space-y-3 overflow-y-auto pr-1">
                  {items.map(({ product, qty }) => {
                    const data = product[lang];

                    return (
                      <div
                        key={product.id}
                        className="group rounded-[1.3rem] border border-white/10 bg-white/[0.05] p-3.5 transition-colors hover:bg-white/[0.075]"
                      >
                        <div className="flex gap-3">
                          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.06]">
                            <img
                              src={product.imageUrl}
                              alt={data.name}
                              className="h-full w-full object-cover opacity-85 transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="line-clamp-2 text-sm font-medium leading-snug text-white">
                              {data.name}
                            </p>

                            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                              <div className="inline-flex items-center rounded-full border border-white/10 bg-black/10 p-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setQty(product.id, qty - 1)
                                  }
                                  className="grid h-6 w-6 place-items-center rounded-full text-white/55 transition-colors hover:bg-white/10 hover:text-[#d8ff65]"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>

                                <span className="w-6 text-center font-mono text-xs text-white">
                                  {qty}
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setQty(product.id, qty + 1)
                                  }
                                  className="grid h-6 w-6 place-items-center rounded-full text-white/55 transition-colors hover:bg-white/10 hover:text-[#d8ff65]"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>

                              <span className="text-right font-mono text-xs text-white/80">
                                {formatMXN(
                                  product.priceMXN * qty,
                                )}{" "}
                                MXN{" "}
                                <span className="text-[0.52rem] text-white/40">
                                  + IVA
                                </span>
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => remove(product.id)}
                            className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-white/30 transition-colors hover:bg-red-400/10 hover:text-red-300"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <dl className="mt-6 space-y-3 rounded-[1.4rem] border border-white/10 bg-black/10 p-5 font-mono text-xs">
                  <div className="flex justify-between gap-5 text-white/50">
                    <dt>{t.cart.subtotal}</dt>
                    <dd className="text-right">
                      {formatMXN(subtotal)} MXN
                    </dd>
                  </div>

                  <div className="flex justify-between gap-5 text-white/50">
                    <dt>
                      IVA ({Math.round(IVA_RATE * 100)}%)
                    </dt>

                    <dd className="text-right">
                      {formatMXN(iva)} MXN
                    </dd>
                  </div>

                  <div className="flex items-end justify-between gap-5 border-t border-white/10 pt-4">
                    <dt className="display text-base font-semibold normal-case tracking-normal text-white">
                      {t.cart.total}
                    </dt>

                    <dd className="text-right">
                      <span className="display block text-2xl font-semibold tracking-[-0.03em] text-[#d8ff65]">
                        {formatMXN(total)}
                      </span>

                      <span className="font-mono text-[0.54rem] uppercase tracking-[0.15em] text-white/35">
                        MXN
                      </span>
                    </dd>
                  </div>
                </dl>

                <Button
                  type="submit"
                  variant="cream"
                  size="lg"
                  className="group mt-5 h-14 w-full justify-between rounded-[1.2rem] border-0 bg-[#d8ff65] px-5 font-semibold text-[#102e28] shadow-[0_18px_45px_-18px_rgba(216,255,101,0.5)] transition-all duration-300 hover:bg-white"
                  disabled={loading || items.length === 0}
                >
                  {loading ? (
                    <>
                      {t.checkout.processing}
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      {t.checkout.placeOrder}

                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#102e28] text-white transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </>
                  )}
                </Button>

                <p className="mt-4 flex items-center justify-center gap-2 font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em] text-white/35">
                  <Lock className="h-3 w-3 text-[#56c5a8]" />
                  {t.checkout.protected}
                </p>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}