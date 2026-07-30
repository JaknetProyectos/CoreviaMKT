"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag } from "lucide-react";
import { Logo } from "./logo";
import { Marquee } from "./marquee";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { count, toggle, hydrated } = useCart();
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Barra informativa */}
      <div className="relative overflow-hidden bg-[#081b17] py-2.5 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -left-20 top-1/2 h-24 w-64 -translate-y-1/2 rounded-full bg-[#168267]/25 blur-3xl" />

          <div className="absolute -right-20 top-1/2 h-24 w-64 -translate-y-1/2 rounded-full bg-[#d8ff65]/10 blur-3xl" />

          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d8ff65]/25 to-transparent" />
        </div>

        <div className="relative">
          <Marquee duration={32} gap="3rem">
            {t.header.ticker.map((text, i) => (
              <span
                key={i}
                className="flex items-center gap-10 whitespace-nowrap font-mono text-[0.61rem] font-bold  text-white/65 sm:text-[0.64rem]"
              >
                {text}

                <span className="grid h-4 w-4 place-items-center rounded-full bg-[#d8ff65] text-[0.5rem] text-[#102e28]">
                  ✦
                </span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>

      {/* Navegación */}
      <div
        className={cn(
          "relative transition-all duration-300",
          scrolled
            ? "border-b border-[#102e28]/10 bg-[#f3f6f2]/92 py-2 shadow-[0_16px_45px_-35px_rgba(16,46,40,0.5)] backdrop-blur-xl"
            : "border-b border-transparent bg-[#f3f6f2]/70 py-3 backdrop-blur-md",
        )}
      >
        <div className="container-px mx-auto max-w-[1400px]">
          <div
            className={cn(
              "flex items-center justify-between gap-4 border border-[#102e28]/10 bg-white/75 px-3 shadow-[0_16px_45px_-35px_rgba(16,46,40,0.45)] backdrop-blur-xl transition-all duration-300 sm:px-4",
              scrolled
                ? "h-[62px] rounded-2xl"
                : "h-[68px] rounded-[1.4rem]",
            )}
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label="Corevia MKT inicio"
              className="relative z-10 shrink-0"
            >
              <Logo />
            </Link>

            {/* Navegación de escritorio */}
            <nav className="hidden items-center rounded-full border border-[#102e28]/10 bg-[#f3f6f2]/80 p-1 md:flex">
              {t.header.nav.map((link) => {
                const active = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative rounded-full px-4 py-2.5 font-mono font-bold  transition-all duration-300 lg:px-5",
                      active
                        ? "bg-[#102e28] text-[#d8ff65] shadow-[0_10px_25px_-15px_rgba(16,46,40,0.8)]"
                        : "text-[#102e28]/60 hover:bg-white hover:text-[#168267]",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Acciones */}
            <div className="flex items-center gap-2">
              {/* Selector de idioma */}
              <div className="flex items-center rounded-full border border-[#102e28]/10 bg-[#f3f6f2] p-1 font-mono text-[0.62rem] font-bold tracking-[0.08em]">
                <button
                  type="button"
                  onClick={() => setLang("es")}
                  className={cn(
                    "rounded-full px-2.5 py-1.5 transition-all duration-300",
                    lang === "es"
                      ? "bg-[#102e28] text-[#d8ff65] shadow-sm"
                      : "text-[#102e28]/45 hover:bg-white hover:text-[#102e28]",
                  )}
                >
                  ES
                </button>

                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={cn(
                    "rounded-full px-2.5 py-1.5 transition-all duration-300",
                    lang === "en"
                      ? "bg-[#102e28] text-[#d8ff65] shadow-sm"
                      : "text-[#102e28]/45 hover:bg-white hover:text-[#102e28]",
                  )}
                >
                  EN
                </button>
              </div>

              {/* CTA */}
              <Button
                asChild
                size="sm"
                className="hidden h-10 rounded-full bg-[#d8ff65] px-5 font-semibold text-[#102e28] shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#102e28] hover:text-white sm:inline-flex"
              >
                <Link href="/contacto">
                  {t.header.cta}
                </Link>
              </Button>

              {/* Carrito */}
              <button
                type="button"
                onClick={toggle}
                aria-label={t.header.cartAria}
                className="group relative grid h-10 w-10 place-items-center rounded-full border border-[#102e28]/10 bg-[#102e28] text-white shadow-[0_10px_25px_-15px_rgba(16,46,40,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#168267]"
              >
                <ShoppingBag className="h-[17px] w-[17px] transition-transform duration-300 group-hover:scale-105" />

                {hydrated && count > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full border-2 border-white bg-[#d8ff65] px-1 font-mono text-[0.58rem] font-bold text-[#102e28]">
                    {count}
                  </span>
                )}
              </button>

              {/* Menú móvil */}
              <Sheet
                open={menuOpen}
                onOpenChange={setMenuOpen}
              >
                <SheetTrigger asChild>
                  <button
                    type="button"
                    aria-label={t.header.menuAria}
                    className="grid h-10 w-10 place-items-center rounded-full border border-[#102e28]/10 bg-[#f3f6f2] text-[#102e28] transition-all duration-300 hover:border-[#168267]/40 hover:bg-[#e8f7ef] hover:text-[#168267] md:hidden"
                  >
                    <Menu className="h-[18px] w-[18px]" />
                  </button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="flex w-full flex-col gap-0 overflow-hidden border-l border-white/10 bg-[#081b17] p-0 text-white sm:max-w-[390px] [&>button]:right-5 [&>button]:top-5 [&>button]:z-30 [&>button]:rounded-full [&>button]:border [&>button]:border-white/10 [&>button]:bg-white/[0.05] [&>button]:p-2 [&>button]:text-white/50 [&>button]:opacity-100 [&>button]:transition-colors [&>button]:hover:bg-white/10 [&>button]:hover:text-[#d8ff65]"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                  >
                    <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#168267]/25 blur-[110px]" />

                    <div className="absolute -bottom-48 -left-36 h-[420px] w-[420px] rounded-full bg-[#d8ff65]/10 blur-[120px]" />

                    <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:24px_24px]" />
                  </div>

                  <div className="relative flex h-full flex-col">
                    {/* Encabezado móvil */}
                    <div className="border-b border-white/10 px-7 py-7">
                      <Logo variant="cream" />

                      <div className="mt-6 flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-[#d8ff65]" />
                        <span className="h-px flex-1 bg-gradient-to-r from-[#d8ff65]/40 to-transparent" />
                      </div>
                    </div>

                    {/* Enlaces móviles */}
                    <nav className="flex flex-1 flex-col justify-center px-7 py-8">
                      {t.header.nav.map((link, i) => {
                        const active = pathname === link.href;

                        return (
                          <SheetClose
                            asChild
                            key={link.href}
                          >
                            <Link
                              href={link.href}
                              className={cn(
                                "group flex items-center gap-4 border-b border-white/10 py-5 transition-all duration-300",
                                active
                                  ? "text-[#d8ff65]"
                                  : "text-white",
                              )}
                            >
                              <span
                                className={cn(
                                  "grid h-9 w-9 shrink-0 place-items-center rounded-xl font-mono text-[0.62rem] font-bold transition-all duration-300",
                                  active
                                    ? "bg-[#d8ff65] text-[#102e28]"
                                    : "border border-white/10 bg-white/[0.04] text-[#56c5a8] group-hover:bg-[#d8ff65] group-hover:text-[#102e28]",
                                )}
                              >
                                {String(i + 1).padStart(2, "0")}
                              </span>

                              <span className="display flex-1 text-3xl font-semibold tracking-[-0.035em] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#d8ff65]">
                                {link.label}
                              </span>

                              <span className="text-sm text-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#d8ff65]">
                                →
                              </span>
                            </Link>
                          </SheetClose>
                        );
                      })}
                    </nav>

                    {/* CTA móvil */}
                    <div className="border-t border-white/10 px-7">
                      <SheetClose asChild>
                        <Button
                          asChild
                          variant="cream"
                          size="lg"
                          className="w-full justify-between rounded-2xl border-0 py-5 bg-[#d8ff65] px-5 font-semibold text-[#102e28] shadow-none transition-colors hover:bg-white"
                        >
                          <Link href="/contacto">
                            {t.header.cta}

                            <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#102e28] text-white">
                              →
                            </span>
                          </Link>
                        </Button>
                      </SheetClose>

                      <p className="mt-5 break-all font-mono text-[0.62rem]  leading-5 tracking-[0.14em] text-white/30">
                        {t.header.contactEmail}
                      </p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}