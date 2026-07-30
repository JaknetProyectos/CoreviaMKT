"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { useLanguage } from "@/lib/language-context";

export function Services() {
  const { t } = useLanguage();

  return (
    <section
      id="servicios"
      className="relative overflow-hidden bg-[#f3f6f2] py-20 sm:py-28 lg:py-32"
    >
      {/* Fondo decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#102e28_1px,transparent_1px),linear-gradient(90deg,#102e28_1px,transparent_1px)] [background-size:54px_54px]" />

        <div className="absolute -left-40 top-10 h-[440px] w-[440px] rounded-full bg-[#d8ff65]/20 blur-3xl" />

        <div className="absolute -right-44 bottom-0 h-[500px] w-[500px] rounded-full bg-[#56c5a8]/15 blur-3xl" />
      </div>

      <div className="container-px relative mx-auto max-w-[1400px]">
        {/* Encabezado */}
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-3 rounded-full border border-[#102e28]/10 bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#526a63] shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#168267] opacity-40" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#168267]" />
                </span>

                {t.services.eyebrow}
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="display mt-7 max-w-4xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#102e28] sm:text-5xl lg:text-6xl">
                {t.services.title}
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[1.75rem] border border-[#102e28]/10 bg-white/75 p-6 shadow-[0_20px_55px_-42px_rgba(16,46,40,0.55)] backdrop-blur-sm sm:p-7">
              <div className="absolute left-0 top-7 h-12 w-1 rounded-r-full bg-[#56c5a8]" />

              <p className="pl-3 text-pretty text-[0.95rem] leading-7 text-[#5c7069]">
                {t.services.desc}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Servicios */}
        <div className="mt-14 grid gap-4 sm:mt-16 lg:grid-cols-2">
          {t.services.items.map((item, i) => (
            <Reveal key={item.n} delay={i * 0.04}>
              <Link
                href="/servicios"
                className="group relative flex min-h-[280px] h-full flex-col overflow-hidden rounded-[2rem] border border-[#102e28]/10 bg-white/80 p-6 shadow-[0_24px_60px_-45px_rgba(16,46,40,0.65)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#56c5a8]/50 hover:bg-white hover:shadow-[0_30px_70px_-42px_rgba(16,46,40,0.55)] sm:p-8"
              >
                {/* Decoración de la tarjeta */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                >
                  <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full border border-[#102e28]/5 transition-transform duration-500 group-hover:scale-125" />

                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#d8ff65]/0 transition-colors duration-300 group-hover:bg-[#d8ff65]/25" />

                  <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-[#d8ff65] transition-all duration-500 group-hover:w-full" />
                </div>

                <div className="relative flex items-start justify-between gap-6">
                  <span className="display text-5xl font-black leading-none tracking-[-0.07em] text-[#102e28]/10 transition-colors duration-300 group-hover:text-[#168267]/20 sm:text-6xl">
                    {item.n}
                  </span>

                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#102e28]/10 bg-[#f3f6f2] text-[#102e28] transition-all duration-300 group-hover:rotate-6 group-hover:border-[#102e28] group-hover:bg-[#102e28] group-hover:text-[#d8ff65]">
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                <div className="relative mt-auto pt-10">
                  <h3 className="display max-w-md text-2xl font-semibold leading-tight tracking-[-0.025em] text-[#102e28] transition-colors duration-300 group-hover:text-[#168267] sm:text-3xl">
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-lg text-sm leading-7 text-[#64766f]">
                    {item.desc}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}