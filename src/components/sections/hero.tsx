"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % words.length), 2300);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-110%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="whitespace-nowrap font-semibold text-[#d8ff65]"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative isolate overflow-hidden bg-[#f3f6f2]">
      {/* Elementos decorativos de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#102e28_1px,transparent_1px),linear-gradient(90deg,#102e28_1px,transparent_1px)] [background-size:54px_54px]" />

        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#d8ff65]/25 blur-[130px]" />

        <div className="absolute -right-44 top-1/3 h-[520px] w-[520px] rounded-full bg-[#56c5a8]/20 blur-[140px]" />
      </div>

      <div className="container-px mx-auto max-w-[1400px] pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-28 lg:pt-20">
        {/* Barra superior */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between gap-6"
        >
          <span className="inline-flex items-center gap-3 rounded-full border border-[#102e28]/10 bg-white/75 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#456159] shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#168267] opacity-40" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#168267]" />
            </span>

            {t.hero.eyebrow}
          </span>

          <span className="hidden rounded-full border border-[#102e28]/10 bg-white/60 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#102e28]/50 backdrop-blur-sm sm:block">
            {t.hero.est}
          </span>
        </motion.div>

        {/* Panel principal */}
        <div className="relative mt-8 overflow-hidden rounded-[2rem] bg-[#102e28] shadow-[0_40px_100px_-48px_rgba(16,46,40,0.85)] sm:mt-10 sm:rounded-[2.8rem]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute -right-36 -top-40 h-[520px] w-[520px] rounded-full border border-white/[0.07]" />

            <div className="absolute -right-10 -top-14 h-[300px] w-[300px] rounded-full border border-[#d8ff65]/15" />

            <div className="absolute -bottom-56 -left-40 h-[520px] w-[520px] rounded-full bg-[#168267]/20 blur-[90px]" />

            <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8ff65]/60 to-transparent" />
          </div>

          <div className="relative grid min-h-[620px] lg:grid-cols-[1fr_0.28fr]">
            {/* Contenido principal */}
            <div className="flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-14 xl:px-16">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex flex-wrap items-baseline gap-x-3 font-mono text-xs uppercase tracking-[0.18em] text-white/50 sm:text-sm"
                >
                  {t.hero.weCreate}

                  <RotatingWord words={t.hero.rotatingWords} />
                </motion.div>

                <h1 className="display mt-8 font-black uppercase leading-[0.78] tracking-[-0.055em] text-white sm:mt-10">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="block text-[clamp(3.8rem,12vw,10.5rem)]"
                  >
                    {t.hero.titlePart1}
                  </motion.span>

                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.28,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative mt-2 block text-[clamp(3.8rem,12vw,10.5rem)] italic text-[#d8ff65]"
                  >
                    {t.hero.titlePart2}

                    <span className="absolute bottom-[8%] left-0 h-[0.045em] w-[78%] rounded-full bg-[#56c5a8]" />
                  </motion.span>
                </h1>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-7 sm:mt-16 sm:flex-row sm:items-center sm:justify-between"
              >
                <p className="max-w-xl whitespace-pre-line font-mono text-[0.7rem] uppercase leading-6 tracking-[0.16em] text-white/55">
                  {t.hero.deliveryText}
                </p>

                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#d8ff65]" />
                  <span className="h-2 w-8 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-[#56c5a8]" />
                </div>
              </motion.div>
            </div>

            {/* Franja decorativa lateral */}
            <div className="relative hidden overflow-hidden border-l border-white/10 lg:block">
              <div className="absolute inset-0 bg-white/[0.025]" />

              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 -rotate-90 items-center gap-5 whitespace-nowrap">
                <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.32em] text-white/35">
                  Corevia MKT
                </span>

                <span className="h-px w-20 bg-[#d8ff65]/50" />

                <span className="font-mono text-[0.65rem] uppercase tracking-[0.32em] text-[#d8ff65]">
                  Digital Studio
                </span>
              </div>

              <div className="absolute bottom-8 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#d8ff65]" />

              <div className="absolute left-1/2 top-8 h-12 w-12 -translate-x-1/2 rounded-full border border-white/10" />
            </div>
          </div>
        </div>

        {/* Est. visible en móvil */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-5 flex justify-end sm:hidden"
        >
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#102e28]/45">
            {t.hero.est}
          </span>
        </motion.div>
      </div>
    </section>
  );
}