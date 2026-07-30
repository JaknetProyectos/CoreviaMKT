"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ChevronsRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useCart } from "@/lib/cart-context";
import { ProductPlan } from "@/lib/products";

type Fields = "nombre" | "correo" | "referencia" | "monto";
type FormState = Record<Fields, string>;

const EMPTY: FormState = {
  nombre: "",
  correo: "",
  referencia: "",
  monto: "",
};

export function PagoPersonalizadoClient() {
  const { t } = useLanguage();
  const { add, open } = useCart();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const update = (k: Fields, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));

    if (errors[k]) {
      setErrors((e) => ({ ...e, [k]: undefined }));
    }
  };

  const validate = () => {
    const e: Partial<FormState> = {};

    if (!form.nombre.trim()) {
      e.nombre = t.customPayment.errName;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.correo)) {
      e.correo = t.customPayment.errEmail;
    }

    if (!form.referencia.trim()) {
      e.referencia = t.customPayment.errRef;
    }

    const amountVal = parseFloat(form.monto);

    if (isNaN(amountVal) || amountVal <= 0) {
      e.monto = t.customPayment.errAmount;
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    if (!validate()) return;

    // Generamos un producto dinámico basado en los datos del formulario
    const customProduct: ProductPlan = {
      id: `custom-payment-${Date.now()}`,
      priceMXN: parseFloat(form.monto),
      taxIncluded: false,
      currency: "MXN + IVA",
      imageUrl:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
      es: {
        name: `${form.referencia}`,
        description: `Pago personalizado. Nombre: ${form.nombre} | Correo: ${form.correo}`,
        features: ["Pago personalizado", "Procesamiento seguro"],
      },
      en: {
        name: `${form.referencia}`,
        description: `Custom payment. Name: ${form.nombre} | Email: ${form.correo}`,
        features: ["Custom payment", "Secure processing"],
      },
    };

    // Añadimos al carrito y lo abrimos automáticamente
    add(customProduct);
    open();

    toast.success(t.customPayment.toastAdded);
    setForm(EMPTY);
  };

  return (
    <section className="relative min-h-[calc(100vh-68px)] overflow-hidden bg-[#eef3ee] py-14 sm:py-20 lg:py-24">
      {/* Fondo decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#102e28_1px,transparent_1px),linear-gradient(90deg,#102e28_1px,transparent_1px)] [background-size:54px_54px]" />

        <div className="absolute -left-48 -top-40 h-[520px] w-[520px] rounded-full bg-[#d8ff65]/25 blur-[130px]" />

        <div className="absolute -bottom-48 -right-40 h-[520px] w-[520px] rounded-full bg-[#56c5a8]/20 blur-[130px]" />
      </div>

      <div className="container-px relative mx-auto max-w-[1280px]">
        <div className="overflow-hidden rounded-[2.5rem] border border-[#102e28]/10 bg-white/75 shadow-[0_40px_100px_-55px_rgba(16,46,40,0.65)] backdrop-blur-xl">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            {/* Panel de presentación */}
            <div className="relative flex min-h-[430px] flex-col justify-between overflow-hidden bg-[#102e28] p-7 text-white sm:p-10 lg:min-h-[690px] lg:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border border-white/10" />

                <div className="absolute right-8 top-8 h-36 w-36 rounded-full border border-[#d8ff65]/20" />

                <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#168267]/25 blur-3xl" />

                <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:24px_24px]" />

                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8ff65]/60 to-transparent" />
              </div>

              <div className="relative">
                <div className="flex items-center justify-between gap-5">
                  <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#d8ff65]">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d8ff65] opacity-40" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#d8ff65]" />
                    </span>

                    Corevia MKT
                  </span>

                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-white/25">
                    01 / 01
                  </span>
                </div>

                <h1 className="display mt-10 text-5xl font-black uppercase leading-[0.86] tracking-[-0.055em] text-white sm:text-6xl lg:text-[5.5rem]">
                  {t.customPayment.title1}
                  <br />

                  <span className="relative inline-block italic text-[#d8ff65]">
                    {t.customPayment.title2}

                    <span className="absolute -bottom-2 left-0 h-1.5 w-full -rotate-1 rounded-full bg-[#56c5a8]" />
                  </span>
                </h1>

                <p className="mt-8 max-w-md text-pretty text-base leading-8 text-white/60 sm:text-lg">
                  {t.customPayment.desc}
                </p>
              </div>

              <div className="relative mt-12">
                <div className="grid grid-cols-3 gap-3">
                  {["01", "02", "03"].map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-4"
                    >
                      <span className="font-mono text-[0.65rem] font-bold text-[#56c5a8]">
                        {item}
                      </span>

                      <span className="mt-3 block h-1 w-full rounded-full bg-white/10">
                        <span className="block h-full w-1/2 rounded-full bg-[#d8ff65]" />
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <span className="h-2 w-2 rounded-full bg-[#d8ff65]" />
                  <span className="h-px flex-1 bg-gradient-to-r from-[#d8ff65]/45 to-transparent" />
                  <span className="h-2 w-2 rounded-full bg-[#56c5a8]" />
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="relative p-5 sm:p-8 lg:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#d8ff65]/20 blur-3xl" />

                <div className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-[#56c5a8]/15 blur-3xl" />
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="relative space-y-6"
              >
                <div className="flex items-center justify-between gap-4 border-b border-[#102e28]/10 pb-6">
                  <div>
                    <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#168267]">
                      Corevia MKT
                    </span>

                    <div className="mt-3 flex items-center gap-3">
                      <span className="h-1.5 w-12 rounded-full bg-[#d8ff65]" />
                      <span className="h-px w-20 bg-[#102e28]/10" />
                    </div>
                  </div>

                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#102e28] font-mono text-[0.62rem] font-bold text-[#d8ff65]">
                    MXN
                  </span>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2.5 ml-1 block font-mono text-[0.64rem] font-bold uppercase tracking-[0.16em] text-[#526a63]">
                      {t.customPayment.nameLabel}
                    </label>

                    <input
                      type="text"
                      value={form.nombre}
                      onChange={(e) => update("nombre", e.target.value)}
                      className="h-14 w-full rounded-2xl border border-[#102e28]/10 bg-[#f4f7f3] px-5 text-[#102e28] outline-none transition-all duration-300 hover:border-[#168267]/30 hover:bg-white focus:border-[#168267] focus:bg-white focus:ring-4 focus:ring-[#56c5a8]/15"
                    />

                    {errors.nombre && (
                      <p className="mt-2 ml-1 flex items-center gap-2 font-mono text-[0.6rem] font-semibold uppercase tracking-wide text-[#c54f3d]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#c54f3d]" />
                        {errors.nombre}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2.5 ml-1 block font-mono text-[0.64rem] font-bold uppercase tracking-[0.16em] text-[#526a63]">
                      {t.customPayment.emailLabel}
                    </label>

                    <input
                      type="email"
                      value={form.correo}
                      onChange={(e) => update("correo", e.target.value)}
                      className="h-14 w-full rounded-2xl border border-[#102e28]/10 bg-[#f4f7f3] px-5 text-[#102e28] outline-none transition-all duration-300 hover:border-[#168267]/30 hover:bg-white focus:border-[#168267] focus:bg-white focus:ring-4 focus:ring-[#56c5a8]/15"
                    />

                    {errors.correo && (
                      <p className="mt-2 ml-1 flex items-center gap-2 font-mono text-[0.6rem] font-semibold uppercase tracking-wide text-[#c54f3d]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#c54f3d]" />
                        {errors.correo}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-2.5 ml-1 block font-mono text-[0.64rem] font-bold uppercase tracking-[0.16em] text-[#526a63]">
                    {t.customPayment.refLabel}
                  </label>

                  <input
                    type="text"
                    value={form.referencia}
                    onChange={(e) => update("referencia", e.target.value)}
                    className="h-14 w-full rounded-2xl border border-[#102e28]/10 bg-[#f4f7f3] px-5 text-[#102e28] outline-none transition-all duration-300 hover:border-[#168267]/30 hover:bg-white focus:border-[#168267] focus:bg-white focus:ring-4 focus:ring-[#56c5a8]/15"
                  />

                  {errors.referencia && (
                    <p className="mt-2 ml-1 flex items-center gap-2 font-mono text-[0.6rem] font-semibold uppercase tracking-wide text-[#c54f3d]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#c54f3d]" />
                      {errors.referencia}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2.5 ml-1 block font-mono text-[0.64rem] font-bold uppercase tracking-[0.16em] text-[#526a63]">
                    {t.customPayment.amountLabel}
                  </label>

                  <div className="relative overflow-hidden rounded-[1.6rem] border border-[#102e28]/10 bg-[#102e28] p-2 shadow-[0_18px_45px_-28px_rgba(16,46,40,0.7)]">
                    <div className="flex items-center">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#d8ff65] font-mono text-lg font-bold text-[#102e28]">
                        $
                      </span>

                      <input
                        type="number"
                        step="0.01"
                        min="1"
                        value={form.monto}
                        onChange={(e) => update("monto", e.target.value)}
                        className="h-14 min-w-0 flex-1 bg-transparent px-5 font-mono text-xl font-semibold text-white outline-none placeholder:text-white/20"
                      />

                      <span className="pr-4 font-mono text-[0.62rem] font-bold uppercase tracking-[0.15em] text-white/35">
                        MXN
                      </span>
                    </div>
                  </div>

                  {errors.monto && (
                    <p className="mt-2 ml-1 flex items-center gap-2 font-mono text-[0.6rem] font-semibold uppercase tracking-wide text-[#c54f3d]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#c54f3d]" />
                      {errors.monto}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="group flex h-14 w-full items-center justify-between rounded-2xl bg-[#d8ff65] px-5 font-display text-base font-bold tracking-wide text-[#102e28] shadow-[0_18px_45px_-20px_rgba(216,255,101,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#102e28] hover:text-white"
                  >
                    {t.customPayment.button}

                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#102e28] text-white transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#d8ff65] group-hover:text-[#102e28]">
                      <ChevronsRight className="h-5 w-5" />
                    </span>
                  </button>
                </div>

                <div className="rounded-[1.4rem] border border-[#102e28]/10 bg-[#f4f7f3] px-5 py-4 text-center font-mono text-[0.6rem] uppercase leading-5 tracking-[0.14em] text-[#102e28]/40">
                  <p>{t.customPayment.note1}</p>
                  <p>{t.customPayment.note2}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}