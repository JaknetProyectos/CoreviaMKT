"use client";

import { StoreGrid } from "@/components/site/store-grid";
import { CtaBand } from "@/components/sections/cta-band";
import { useLanguage } from "@/lib/language-context";

export function ServiciosClient() {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#f3f6f2]">
        {/* Fondo decorativo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#102e28_1px,transparent_1px),linear-gradient(90deg,#102e28_1px,transparent_1px)] [background-size:54px_54px]" />

          <div className="absolute -left-48 -top-48 h-[560px] w-[560px] rounded-full bg-[#d8ff65]/25 blur-[140px]" />

          <div className="absolute -right-48 top-20 h-[500px] w-[500px] rounded-full bg-[#56c5a8]/20 blur-[140px]" />
        </div>

        <div className="container-px mx-auto max-w-[1400px] pb-10 pt-10 sm:pb-14 sm:pt-16 lg:pt-20">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#102e28] px-6 py-9 text-white shadow-[0_40px_100px_-50px_rgba(16,46,40,0.85)] sm:px-10 sm:py-12 lg:px-14 lg:py-16">
            {/* Decoración del panel */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />

              <div className="absolute right-10 top-10 h-44 w-44 rounded-full border border-[#d8ff65]/20" />

              <div className="absolute -bottom-48 -left-32 h-[440px] w-[440px] rounded-full bg-[#168267]/30 blur-3xl" />

              <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:24px_24px]" />

              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8ff65]/60 to-transparent" />
            </div>

            <div className="relative grid gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-end">
              <div>
                <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#d8ff65] backdrop-blur-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d8ff65] opacity-40" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#d8ff65]" />
                  </span>

                  {t.servicesPage.eyebrow}
                </span>

                <h1 className="display mt-8 max-w-5xl text-balance text-5xl font-black uppercase leading-[0.88] tracking-[-0.055em] text-white sm:text-7xl lg:text-[5.8rem]">
                  {t.servicesPage.titlePart1}{" "}
                  <span className="relative inline-block italic text-[#d8ff65]">
                    {t.servicesPage.titlePart2}

                    <span className="absolute -bottom-2 left-0 h-1.5 w-full -rotate-1 rounded-full bg-[#56c5a8]" />
                  </span>
                </h1>
              </div>

              <div className="lg:border-l lg:border-white/10 lg:pl-9">
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-12 rounded-full bg-[#d8ff65]" />
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.2em] text-white/30">
                    Corevia MKT
                  </span>
                </div>

                <p className="mt-6 max-w-lg text-pretty text-base leading-8 text-white/60 sm:text-lg">
                  {t.servicesPage.desc}
                </p>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {["01", "02", "03"].map((item) => (
                    <span
                      key={item}
                      className="flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] font-mono text-[0.64rem] font-bold tracking-[0.14em] text-[#56c5a8]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f3f6f2] pb-20 pt-4 sm:pb-28 sm:pt-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-48 top-1/3 h-[460px] w-[460px] rounded-full bg-[#56c5a8]/10 blur-[130px]" />

          <div className="absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full bg-[#d8ff65]/15 blur-[130px]" />
        </div>

        <div className="container-px relative mx-auto max-w-[1400px]">
          <div className="mb-8 flex items-center gap-4 sm:mb-10">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#102e28] font-mono text-[0.62rem] font-bold text-[#d8ff65]">
              01
            </span>

            <span className="h-px flex-1 bg-[#102e28]/10" />

            <span className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#102e28]/35">
              Corevia MKT
            </span>
          </div>

          <StoreGrid />
        </div>
      </section>

      <CtaBand />
    </>
  );
}