"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/site/contact-form";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

export function ContactoClient() {
  const { t } = useLanguage();

  const DETAILS = [
    {
      icon: Phone,
      label: t.contactPage.detailsLabelPhone,
      value: "+52 1 55 5088 5510",
      href: "tel:+5215550885510",
    },
    {
      icon: Mail,
      label: t.contactPage.detailsLabelEmail,
      value: "hola@coreviamkt.com",
      href: "mailto:hola@coreviamkt.com",
    },
    {
      icon: MapPin,
      label: t.contactPage.detailsLabelAddress,
      value:
        "Av. Chapultepec No. 480, Piso 9, Col. Roma Norte, C.P. 06700, Alcaldía Cuauhtémoc, CDMX",
      href: "#",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#f3f6f2] py-12 sm:py-16 lg:py-20">
      {/* Fondo decorativo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(#102e28_1px,transparent_1px),linear-gradient(90deg,#102e28_1px,transparent_1px)] [background-size:54px_54px]" />

        <div className="absolute -left-40 -top-28 h-[500px] w-[500px] rounded-full bg-[#d8ff65]/20 blur-[130px]" />

        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#56c5a8]/15 blur-[130px]" />
      </div>

      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid gap-7 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-9">
          {/* Información de contacto */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#102e28] p-6 text-white shadow-[0_40px_100px_-50px_rgba(16,46,40,0.9)] sm:p-9 lg:sticky lg:top-28 lg:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border border-white/10" />

              <div className="absolute right-8 top-8 h-36 w-36 rounded-full border border-[#d8ff65]/20" />

              <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#168267]/25 blur-3xl" />

              <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:24px_24px]" />

              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8ff65]/60 to-transparent" />
            </div>

            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#d8ff65] backdrop-blur-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d8ff65] opacity-40" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#d8ff65]" />
                  </span>

                  {t.contactPage.eyebrow}
                </span>

                <span className="hidden font-mono text-[0.58rem] uppercase tracking-[0.2em] text-white/30 sm:block">
                  Corevia MKT
                </span>
              </div>

              <h1 className="display mt-9 text-5xl font-black uppercase leading-[0.86] tracking-[-0.055em] text-white sm:text-7xl lg:text-[3.4rem]">
                {t.contactPage.titlePart1}{t.contactPage.titlePart2}
                <span className="relative inline-block italic text-[#d8ff65]">
                  

                  <span className="absolute -bottom-2 left-0 h-1.5 w-full -rotate-1 rounded-full bg-[#56c5a8]" />
                </span>
              </h1>

              <p className="mt-8 max-w-md text-pretty text-base leading-8 text-white/60 sm:text-[1.03rem]">
                {t.contactPage.desc}
              </p>

              <Button
                asChild
                variant="outline"
                className="group mt-8 h-12 rounded-full border-white/15 bg-white/[0.05] px-6 font-semibold text-white shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d8ff65] hover:bg-[#d8ff65] hover:text-[#102e28]"
              >
                <Link href="/personalizado">
                  {t.contactPage.payBtn}

                  <span className="ml-2 h-2 w-2 rounded-full bg-[#56c5a8] transition-colors group-hover:bg-[#102e28]" />
                </Link>
              </Button>

              <div className="mt-10 space-y-3 border-t border-white/10 pt-7">
                {DETAILS.map((detail) => (
                  <a
                    key={detail.label}
                    href={detail.href}
                    className="group flex items-start gap-4 rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:translate-x-1 hover:border-[#56c5a8]/35 hover:bg-white/[0.075]"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/[0.07] text-[#d8ff65] transition-all duration-300 group-hover:bg-[#d8ff65] group-hover:text-[#102e28]">
                      <detail.icon className="h-4 w-4" />
                    </span>

                    <span className="min-w-0 pt-0.5">
                      <span className="block font-mono text-[0.58rem] font-bold uppercase tracking-[0.17em] text-white/35">
                        {detail.label}
                      </span>

                      <span className="mt-1.5 block text-sm leading-6 text-white/75 transition-colors group-hover:text-white">
                        {detail.value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-7 flex items-center gap-4">
                <span className="h-2 w-2 rounded-full bg-[#d8ff65]" />
                <span className="h-px flex-1 bg-gradient-to-r from-[#d8ff65]/40 to-transparent" />
                <span className="h-2 w-2 rounded-full bg-[#56c5a8]" />
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 rounded-[2.7rem] border border-[#102e28]/10"
            />

            <div className="relative">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}