"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { processContact } from "@/app/actions/contact";

type Fields = "nombre" | "correo" | "telefono" | "asunto" | "mensaje";
type FormState = Record<Fields, string>;

const EMPTY: FormState = {
  nombre: "",
  correo: "",
  telefono: "",
  asunto: "",
  mensaje: "",
};

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
      <label className="mb-2.5 flex items-center gap-2 font-mono text-[0.64rem] font-bold uppercase tracking-[0.17em] text-[#526a63]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#56c5a8]" />
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

const inputClass =
  "h-12 rounded-2xl border-[#102e28]/10 bg-[#f4f7f3] px-4 text-[#102e28] shadow-none transition-all duration-300 placeholder:text-[#102e28]/35 hover:border-[#168267]/30 hover:bg-white focus-visible:border-[#168267] focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-[#56c5a8]/15";

const textareaClass =
  "min-h-40 resize-none rounded-2xl border-[#102e28]/10 bg-[#f4f7f3] px-4 py-4 text-[#102e28] shadow-none transition-all duration-300 placeholder:text-[#102e28]/35 hover:border-[#168267]/30 hover:bg-white focus-visible:border-[#168267] focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-[#56c5a8]/15";

export function ContactForm() {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k: Fields, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));

    if (errors[k]) {
      setErrors((e) => ({ ...e, [k]: undefined }));
    }
  };

  const validate = () => {
    const e: Partial<FormState> = {};

    if (!form.nombre.trim()) {
      e.nombre = t.contact.errName;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.correo)) {
      e.correo = t.contact.errEmail;
    }

    if (!form.mensaje.trim() || form.mensaje.trim().length < 5) {
      e.mensaje = t.contact.errMsg;
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    if (!validate()) {
      toast(t.contact.toastTitle, {
        description: t.contact.toastDesc,
      });

      return;
    }

    setLoading(true);

    const result = await processContact({
      form,
      lang,
    });

    setLoading(false);

    if (result.success) {
      setSent(true);

      toast(t.contact.sentToastTitle, {
        description: t.contact.sentToastDesc,
      });
    } else {
      toast.error("Error", {
        description:
          "Ocurrió un problema al enviar el mensaje. Intenta de nuevo.",
      });
    }
  };

  if (sent) {
    return (
      <div className="relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden rounded-[2.25rem] bg-[#102e28] p-8 text-center shadow-[0_35px_90px_-45px_rgba(16,46,40,0.9)] sm:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border border-white/10" />

          <div className="absolute right-10 top-10 h-36 w-36 rounded-full border border-[#d8ff65]/20" />

          <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#168267]/25 blur-3xl" />

          <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:24px_24px]" />

          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8ff65]/60 to-transparent" />
        </div>

        <div className="relative">
          <div className="absolute -inset-5 rounded-[2.2rem] border border-dashed border-[#d8ff65]/25" />

          <span className="relative grid h-24 w-24 place-items-center rounded-[2rem] bg-[#d8ff65] text-[#102e28] shadow-[0_22px_50px_-20px_rgba(216,255,101,0.65)]">
            <Check className="h-11 w-11" strokeWidth={2.5} />
          </span>
        </div>

        <span className="relative mt-10 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#56c5a8]">
          Corevia MKT
        </span>

        <h3 className="display relative mt-6 max-w-md text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
          {t.contact.successTitle}
        </h3>

        <p className="relative mt-4 max-w-sm text-pretty leading-7 text-white/55">
          {t.contact.successDesc}
        </p>

        <Button
          variant="outline"
          className="relative mt-9 h-12 rounded-full border-white/15 bg-white/[0.05] px-6 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d8ff65] hover:bg-[#d8ff65] hover:text-[#102e28]"
          onClick={() => {
            setForm(EMPTY);
            setSent(false);
          }}
        >
          {t.contact.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative overflow-hidden rounded-[2.25rem] border border-[#102e28]/10 bg-white/85 p-5 shadow-[0_35px_90px_-55px_rgba(16,46,40,0.65)] backdrop-blur-xl sm:p-8 lg:p-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[#d8ff65]/20 blur-3xl" />

        <div className="absolute -bottom-36 -left-28 h-80 w-80 rounded-full bg-[#56c5a8]/15 blur-3xl" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#56c5a8]/50 to-transparent" />
      </div>

      <div className="relative mb-8 flex flex-col gap-5 border-b border-[#102e28]/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#e8f7ef] px-3 py-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#168267]">
            <span className="h-2 w-2 rounded-full bg-[#168267]" />
            Corevia MKT
          </span>

          <div className="mt-4 flex items-center gap-3">
            <span className="h-1.5 w-12 rounded-full bg-[#d8ff65]" />
            <span className="h-px w-20 bg-[#102e28]/10" />
          </div>
        </div>

        <span className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.2em] text-[#102e28]/35">
          01 — 05
        </span>
      </div>

      <div className="relative grid gap-6 sm:grid-cols-2">
        <Field
          label={t.contact.fullName}
          error={errors.nombre}
        >
          <Input
            value={form.nombre}
            onChange={(e) => update("nombre", e.target.value)}
            placeholder={t.contact.namePlaceholder}
            className={inputClass}
          />
        </Field>

        <Field
          label={t.contact.email}
          error={errors.correo}
        >
          <Input
            type="email"
            value={form.correo}
            onChange={(e) => update("correo", e.target.value)}
            placeholder={t.contact.emailPlaceholder}
            className={inputClass}
          />
        </Field>

        <Field label={t.contact.phone}>
          <Input
            value={form.telefono}
            onChange={(e) => update("telefono", e.target.value)}
            placeholder={t.contact.phonePlaceholder}
            className={inputClass}
          />
        </Field>

        <Field label={t.contact.subject}>
          <Input
            value={form.asunto}
            onChange={(e) => update("asunto", e.target.value)}
            placeholder={t.contact.subjectPlaceholder}
            className={inputClass}
          />
        </Field>

        <Field
          label={t.contact.message}
          error={errors.mensaje}
          className="sm:col-span-2"
        >
          <Textarea
            value={form.mensaje}
            onChange={(e) => update("mensaje", e.target.value)}
            placeholder={t.contact.msgPlaceholder}
            rows={6}
            className={textareaClass}
          />
        </Field>
      </div>

      <div className="relative mt-8 flex flex-col gap-4 border-t border-[#102e28]/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs font-mono text-[0.58rem] uppercase leading-5 tracking-[0.14em] text-[#102e28]/40">
          hola@coreviamkt.com
        </p>

        <Button
          type="submit"
          size="lg"
          className="group h-14 w-full justify-between rounded-2xl bg-[#102e28] px-5 font-semibold text-white shadow-[0_18px_40px_-20px_rgba(16,46,40,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#168267] sm:w-auto sm:min-w-56"
          disabled={loading}
        >
          {loading ? (
            <>
              {t.contact.sending}

              <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/10">
                <Loader2 className="h-4 w-4 animate-spin text-[#d8ff65]" />
              </span>
            </>
          ) : (
            <>
              {t.contact.submitBtn}

              <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#d8ff65] text-[#102e28] transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}