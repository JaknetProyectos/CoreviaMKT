"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { useLanguage } from "@/lib/language-context";

export function About() {
  const { t } = useLanguage();

  return (
    <section
      id="nosotros"
      className="relative overflow-hidden bg-[#f3f6f2] py-20 sm:py-28 lg:py-32"
    >
      {/* Fondo decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#102e28_1px,transparent_1px),linear-gradient(90deg,#102e28_1px,transparent_1px)] [background-size:52px_52px]" />

        <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[#d8ff65]/20 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full bg-[#56c5a8]/15 blur-3xl" />
      </div>

      <div className="container-px relative mx-auto max-w-[1400px]">
        {/* Encabezado superior */}
        <div className="grid gap-8 lg:grid-cols-[0.42fr_1fr] lg:items-start lg:gap-16">
          <Reveal>
            <div className="flex items-center gap-4 pt-2">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#d8ff65]">
                <span className="h-3 w-3 rounded-full bg-[#102e28]" />
              </span>

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#536b64]">
                {t.about.eyebrow}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="display max-w-5xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#102e28] sm:text-5xl lg:text-6xl xl:text-[4.5rem]">
              {t.about.titlePart1}{" "}
              <span className="relative inline-block italic text-[#168267]">
                {t.about.titlePart2}

                <span className="absolute -bottom-2 left-0 h-2 w-full -rotate-1 rounded-full bg-[#d8ff65]/80" />
              </span>
            </h2>
          </Reveal>
        </div>

        {/* Contenido principal */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          {/* Información */}
          <Reveal delay={0.1}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[2.25rem] bg-[#102e28] p-7 text-white shadow-[0_35px_90px_-45px_rgba(16,46,40,0.8)] sm:p-9 lg:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />

                <div className="absolute right-7 top-7 h-28 w-28 rounded-full border border-[#d8ff65]/20" />

                <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#56c5a8]/15 blur-3xl" />

                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8ff65]/60 to-transparent" />
              </div>

              <div className="relative">
                <span className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#d8ff65]">
                  Corevia MKT
                </span>

                <div className="mt-8 space-y-6 text-pretty text-[1.02rem] leading-8 text-white/70">
                  <p>{t.about.p1}</p>
                  <p>{t.about.p2}</p>
                </div>
              </div>

              <div className="relative mt-10 border-t border-white/10 pt-8 lg:mt-auto">
                <Button
                  asChild
                  className="group h-12 rounded-full bg-[#d8ff65] px-6 font-semibold text-[#102e28] shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                >
                  <Link
                    href="/servicios"
                    className="inline-flex items-center gap-3"
                  >
                    {t.about.ctaBtn}

                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#102e28] text-white transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Lista de servicios */}
          <Reveal delay={0.1} className="relative">
            <div className="relative rounded-[2.25rem] border border-[#102e28]/10 bg-white/80 p-6 shadow-[0_30px_80px_-50px_rgba(16,46,40,0.55)] backdrop-blur-sm sm:p-8 lg:p-10">
              <div className="flex items-center gap-5 border-b border-[#102e28]/10 pb-7">
                <div className="h-1.5 w-14 rounded-full bg-[#d8ff65]" />

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168267]">
                  {t.about.servicesIncludedEyebrow}
                </p>
              </div>

              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {t.about.servicesList.map((service, i) => (
                  <li
                    key={service}
                    className="group flex min-h-28 flex-col justify-between rounded-[1.5rem] border border-[#102e28]/10 bg-[#f4f7f3] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#56c5a8]/50 hover:bg-white hover:shadow-[0_20px_45px_-32px_rgba(16,46,40,0.65)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-[#102e28] font-mono text-[0.68rem] font-bold text-white transition-colors duration-300 group-hover:bg-[#168267]">
                        0{i + 1}
                      </span>

                      <ArrowRight className="h-4 w-4 -rotate-45 text-[#102e28]/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#168267]" />
                    </div>

                    <span className="display mt-5 text-lg font-semibold leading-snug text-[#183c34]">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between gap-4 rounded-[1.5rem] bg-[#d8ff65] px-5 py-4 text-[#102e28]">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#168267] opacity-50" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-[#102e28]" />
                  </span>

                  <span className="font-mono text-[0.68rem] font-bold uppercase leading-tight tracking-[0.14em]">
                    {t.about.onlineBadgeLine1}
                    <br />
                    {t.about.onlineBadgeLine2}
                  </span>
                </div>

                <ArrowRight className="h-5 w-5 shrink-0" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}