"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { useLanguage } from "@/lib/language-context";

function VisaBadge() {
  return (
    <span
      aria-label="Visa"
      className="grid h-10 w-[4.25rem] place-items-center rounded-lg border border-black/10 bg-white shadow-sm"
    >
      <span className="font-sans text-[1.05rem] font-black italic tracking-[-0.08em] text-[#1434CB]">
        VISA
      </span>
    </span>
  );
}

function MastercardBadge() {
  return (
    <span
      aria-label="Mastercard"
      className="flex h-10 w-[4.25rem] items-center justify-center rounded-lg border border-black/10 bg-white shadow-sm"
    >
      <span className="h-6 w-6 rounded-full bg-[#EB001B]" />
      <span className="-ml-2.5 h-6 w-6 rounded-full bg-[#F79E1B] opacity-95" />
    </span>
  );
}

export function Footer() {
  const { t } = useLanguage();

  // Rutas correspondientes al orden de tu diccionario
  // Privacidad, Términos y Devoluciones
  const legalRoutes = ["/privacidad", "/terminos", "/devoluciones"];

  return (
    <footer className="relative overflow-hidden bg-[#081b17] text-white">
      {/* Fondo decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-52 -top-48 h-[520px] w-[520px] rounded-full bg-[#168267]/20 blur-[140px]" />

        <div className="absolute -bottom-60 -right-40 h-[580px] w-[580px] rounded-full bg-[#d8ff65]/10 blur-[150px]" />

        <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(rgba(255,255,255,0.85)_1px,transparent_1px)] [background-size:26px_26px]" />

        <div className="absolute right-[8%] top-14 hidden h-40 w-40 rounded-full border border-white/[0.05] lg:block" />

        <div className="absolute right-[11%] top-24 hidden h-20 w-20 rounded-full border border-[#d8ff65]/10 lg:block" />
      </div>

      <div className="container-px relative mx-auto max-w-[1400px]">
        {/* Marca y navegación principal */}
        <div className="grid gap-10 border-b border-white/10 py-12 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
          <div>
            <Logo variant="cream" />

            <div className="mt-8 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#d8ff65]" />
              <span className="h-px w-20 bg-gradient-to-r from-[#d8ff65]/60 to-transparent" />
            </div>

            <p className="mt-6 max-w-sm font-mono text-[0.64rem] uppercase leading-6 tracking-[0.15em] text-white/35">
              {t.footer.slogan}
            </p>
          </div>

          <nav className="divide-y divide-white/10 border-y border-white/10">
            {t.footer.bigLinks.map(
              (
                link: {
                  href: string;
                  label: string;
                },
                index: number,
              ) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-5 py-5 transition-all duration-300 sm:py-6"
                >
                  <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#56c5a8]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="display flex-1 text-3xl font-semibold uppercase leading-none tracking-[-0.04em] text-white/80 transition-all duration-300 group-hover:translate-x-2 group-hover:text-white sm:text-4xl lg:text-5xl">
                    {link.label}
                  </span>

                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 text-lg text-white/35 transition-all duration-300 group-hover:rotate-45 group-hover:border-[#d8ff65] group-hover:bg-[#d8ff65] group-hover:text-[#102e28]">
                    ↗
                  </span>
                </Link>
              ),
            )}
          </nav>
        </div>

        {/* Información */}
        <div className="grid gap-5 py-10 sm:py-12 md:grid-cols-2 lg:grid-cols-[0.9fr_0.9fr_1.2fr]">
          {/* Contacto */}
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm sm:p-7">
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-44 w-44 rounded-full border border-white/[0.06]"
            />

            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#56c5a8] opacity-40" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#56c5a8]" />
                </span>

                <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.19em] text-[#d8ff65]">
                  {t.footer.contactEyebrow}
                </p>
              </div>

              <div className="mt-7 space-y-4">
                <a
                  href="tel:+5215550885510"
                  className="group block border-b border-white/10 pb-4"
                >
                  <span className="block font-mono text-[0.55rem] uppercase tracking-[0.16em] text-white/30">
                    {t.contact.phone}
                  </span>

                  <span className="mt-1.5 block text-sm text-white/75 transition-colors group-hover:text-[#d8ff65]">
                    +52 1 55 5088 5510
                  </span>
                </a>

                <a
                  href="mailto:hola@coreviamkt.com"
                  className="group block"
                >
                  <span className="block font-mono text-[0.55rem] uppercase tracking-[0.16em] text-white/30">
                    Email
                  </span>

                  <span className="mt-1.5 block break-all text-sm text-white/75 transition-colors group-hover:text-[#d8ff65]">
                    hola@coreviamkt.com
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Dirección */}
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#102e28] p-6 sm:p-7">
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-[#168267]/20 blur-3xl"
            />

            <div className="relative flex h-full flex-col">
              <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.19em] text-[#d8ff65]">
                {t.footer.addressEyebrow}
              </p>

              <p className="mt-7 max-w-sm text-sm leading-7 text-white/65">
                {t.footer.addressText}
              </p>

              <div className="mt-8 flex items-center gap-3 lg:mt-auto lg:pt-8">
                <span className="h-1.5 w-10 rounded-full bg-[#56c5a8]" />
                <span className="h-px flex-1 bg-white/10" />
              </div>
            </div>
          </div>

          {/* Legales y pagos */}
          <div className="relative overflow-hidden rounded-[1.75rem] bg-[#d8ff65] p-6 text-[#102e28] sm:p-7 md:col-span-2 lg:col-span-1">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-[#102e28]/10"
            />

            <div className="relative flex h-full flex-col">
              <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.19em] text-[#102e28]/55">
                {t.footer.legalInfo}
              </p>

              <div className="mt-6 flex flex-col">
                {t.footer.legal.map((label: string, index: number) => (
                  <Link
                    key={label}
                    href={legalRoutes[index] || "#"}
                    className="group flex items-center justify-between gap-4 border-b border-[#102e28]/15 py-3.5 first:pt-0 last:border-b-0"
                  >
                    <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.13em] text-[#102e28]/70 transition-colors group-hover:text-[#102e28]">
                      {label}
                    </span>

                    <span className="text-sm text-[#102e28]/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#102e28]">
                      →
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-8 border-t border-[#102e28]/15 pt-6 lg:mt-auto">
                <p className="mb-4 font-mono text-[0.56rem] font-bold uppercase tracking-[0.16em] text-[#102e28]/45">
                  {t.footer.payment}
                </p>

                <div className="flex items-center gap-2.5">
                  <VisaBadge />
                  <MastercardBadge />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="flex flex-col gap-5 border-t border-white/10 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.61rem] uppercase tracking-[0.15em] text-white/35">
            {t.footer.copyright}
          </p>

          <div className="flex items-center gap-4">
            <span className="hidden h-px w-20 bg-gradient-to-r from-transparent to-[#d8ff65]/35 sm:block" />

            <p className="font-mono text-[0.61rem] uppercase tracking-[0.15em] text-white/35">
              {t.footer.studio}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}