"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/site/marquee";
import { useLanguage } from "@/lib/language-context";

function Word({ text }: { text: string }) {
  return (
    <span
      className="display whitespace-nowrap text-[16vw] font-black uppercase leading-[0.78] tracking-[-0.07em] text-transparent sm:text-[13vw]"
      style={{
        WebkitTextStroke: "1px rgba(216, 255, 101, 0.32)",
      }}
    >
      {text}
    </span>
  );
}

export function CtaBand() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#0b211d] py-24 sm:py-32 lg:py-36">
      {/* Fondo decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-[#168267]/25 blur-3xl" />

        <div className="absolute -bottom-52 -right-32 h-[520px] w-[520px] rounded-full bg-[#d8ff65]/10 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-[85%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-[3rem] border border-white/[0.07]" />

        <div className="absolute left-1/2 top-1/2 h-[68%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-[2.5rem] border border-[#d8ff65]/10" />

        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:50px_50px]" />
      </div>

      {/* Marquesinas */}
      <div className="pointer-events-none absolute inset-0 flex rotate-[-4deg] flex-col justify-center gap-5 opacity-90">
        <Marquee duration={34} gap="3.5rem">
          <Word text={t.ctaBand.word} />

          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#d8ff65] text-xl text-[#102e28] sm:h-16 sm:w-16 sm:text-3xl">
            ✦
          </span>

          <Word text={t.ctaBand.word} />

          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#56c5a8]/50 text-xl text-[#56c5a8] sm:h-16 sm:w-16 sm:text-3xl">
            ✦
          </span>
        </Marquee>

        <Marquee duration={34} reverse gap="3.5rem">
          <Word text={t.ctaBand.word} />

          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#d8ff65]/50 text-xl text-[#d8ff65] sm:h-16 sm:w-16 sm:text-3xl">
            ✦
          </span>

          <Word text={t.ctaBand.word} />

          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#56c5a8] text-xl text-[#102e28] sm:h-16 sm:w-16 sm:text-3xl">
            ✦
          </span>
        </Marquee>
      </div>

      {/* Acción central */}
      <div className="container-px relative z-10 mx-auto flex max-w-[1400px] justify-center">
        <div className="relative w-full max-w-xl">
          <div className="absolute -inset-3 rounded-[2.25rem] border border-white/10 bg-white/[0.02] backdrop-blur-[2px]" />

          <div className="relative flex min-h-56 items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-[#102e28]/85 px-6 py-10 shadow-[0_35px_90px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:min-h-64 sm:px-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10" />

              <div className="absolute right-5 top-5 h-20 w-20 rounded-full border border-[#d8ff65]/20" />

              <div className="absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#d8ff65]/50 to-transparent" />

              <div className="absolute left-8 top-8 h-2 w-2 rounded-full bg-[#d8ff65]" />

              <div className="absolute bottom-8 right-8 h-2 w-2 rounded-full bg-[#56c5a8]" />
            </div>

            <Button
              asChild
              variant="cream"
              size="xl"
              className="group relative h-14 rounded-full border-0 bg-[#d8ff65] px-6 font-semibold text-[#102e28] shadow-[0_20px_45px_-18px_rgba(216,255,101,0.65)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_25px_55px_-18px_rgba(255,255,255,0.45)] sm:h-16 sm:px-8"
            >
              <Link
                href="/contacto"
                className="inline-flex items-center gap-4"
              >
                {t.ctaBand.btnText}

                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#102e28] text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-[-5deg]">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}