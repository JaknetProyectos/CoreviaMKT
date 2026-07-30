"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { useLanguage } from "@/lib/language-context";

export function Process() {
  const { t } = useLanguage();

  return (
    <section
      id="proceso"
      className="relative overflow-hidden bg-[#0b211d] py-20 sm:py-28 lg:py-32"
    >
      {/* Fondo decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:56px_56px]" />

        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#168267]/25 blur-[130px]" />

        <div className="absolute -bottom-52 -right-40 h-[540px] w-[540px] rounded-full bg-[#d8ff65]/10 blur-[130px]" />

        <div className="absolute right-[8%] top-16 hidden h-32 w-32 rotate-12 rounded-[2.5rem] border border-white/10 lg:block" />

        <div className="absolute bottom-20 left-[6%] hidden h-20 w-20 rounded-full border border-[#d8ff65]/15 lg:block" />
      </div>

      <div className="container-px relative mx-auto max-w-[1400px]">
        {/* Encabezado */}
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/60 backdrop-blur-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d8ff65] opacity-40" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#d8ff65]" />
                </span>

                {t.process.eyebrow}
              </span>

              <p className="mt-7 max-w-md text-pretty text-[1rem] leading-8 text-white/55">
                {t.process.desc}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="display max-w-4xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl xl:text-[4.4rem]">
              {t.process.titlePart1}{" "}
              <span className="relative inline-block italic text-[#d8ff65]">
                {t.process.titlePart2}

                <span className="absolute -bottom-2 left-0 h-1.5 w-full -rotate-1 rounded-full bg-[#56c5a8]" />
              </span>
            </h2>
          </Reveal>
        </div>

        {/* Panel principal */}
        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-[0.32fr_1fr]">
          {/* Panel lateral */}
          <Reveal delay={0.08}>
            <div className="relative flex h-full min-h-72 flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10" />

                <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-[#168267]/20 blur-2xl" />
              </div>

              <div className="relative">
                <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#56c5a8]">
                  Corevia MKT
                </span>

                <div className="mt-7">
                  <span className="display block text-[5rem] font-black leading-none tracking-[-0.08em] text-white sm:text-[6rem]">
                    {String(t.process.steps.length).padStart(2, "0")}
                  </span>

                  <span className="mt-2 block max-w-36 text-xs font-semibold uppercase leading-5 tracking-[0.16em] text-white/45">
                    {t.process.orbitCenterText}
                  </span>
                </div>
              </div>

              <div className="relative mt-10">
                <Button
                  asChild
                  className="group h-12 w-full justify-between rounded-2xl bg-[#d8ff65] px-5 font-semibold text-[#102e28] shadow-none transition-all duration-300 hover:bg-white"
                >
                  <Link href="/servicios">
                    {t.process.ctaBtn}

                    <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#102e28] text-white transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Tablero de pasos */}
          <Reveal delay={0.12}>
            <div className="relative overflow-hidden rounded-[2rem] bg-[#f3f6f2] p-4 shadow-[0_40px_100px_-45px_rgba(0,0,0,0.75)] sm:p-6 lg:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
              >
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#d8ff65]/25 blur-3xl" />

                <div className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-[#56c5a8]/15 blur-3xl" />
              </div>

              <div className="relative grid gap-4 sm:grid-cols-2">
                {t.process.steps.map((step, index) => (
                  <article
                    key={step.n}
                    className="group relative min-h-64 overflow-hidden rounded-[1.6rem] border border-[#102e28]/10 bg-white/75 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#56c5a8]/50 hover:bg-white hover:shadow-[0_24px_55px_-38px_rgba(16,46,40,0.65)] sm:p-7"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-[#102e28]/5 transition-transform duration-500 group-hover:scale-125"
                    />

                    <div
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-1 w-0 bg-[#d8ff65] transition-all duration-500 group-hover:w-full"
                    />

                    <div className="relative flex h-full flex-col">
                      <div className="flex items-start justify-between gap-5">
                        <span className="display text-5xl font-black leading-none tracking-[-0.07em] text-[#102e28]/10 transition-colors duration-300 group-hover:text-[#168267]/20 sm:text-6xl">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#102e28] font-mono text-[0.65rem] font-bold text-[#d8ff65] transition-all duration-300 group-hover:rotate-6 group-hover:bg-[#168267]">
                          {step.n}
                        </span>
                      </div>

                      <div className="mt-auto pt-8">
                        <h3 className="display text-xl font-semibold leading-tight tracking-[-0.02em] text-[#102e28] sm:text-2xl">
                          {step.title}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-[#63766f]">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Indicador inferior */}
              <div className="relative mt-4 flex items-center gap-4 rounded-[1.4rem] bg-[#102e28] px-5 py-4">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d8ff65] opacity-40" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[#d8ff65]" />
                </span>

                <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/65">
                  {t.process.orbitCenterText}
                </span>

                <span className="ml-auto h-px w-12 bg-gradient-to-r from-[#56c5a8] to-transparent sm:w-24" />

                <ArrowRight className="h-4 w-4 shrink-0 text-[#d8ff65]" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}