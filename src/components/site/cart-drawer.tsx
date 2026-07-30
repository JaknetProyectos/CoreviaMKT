"use client";

import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart, IVA_RATE } from "@/lib/cart-context";
import { formatMXN } from "@/lib/products";
import { useLanguage } from "@/lib/language-context";

export function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    iva,
    total,
    isOpen,
    close,
    setQty,
    remove,
    clear,
  } = useCart();

  const { t, lang } = useLanguage();

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && close()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 overflow-hidden border-l border-white/10 bg-[#0b211d] p-0 text-white sm:max-w-[470px] [&>button]:right-5 [&>button]:top-5 [&>button]:z-30 [&>button]:rounded-full [&>button]:border [&>button]:border-white/10 [&>button]:bg-white/[0.06] [&>button]:p-2 [&>button]:text-white/60 [&>button]:opacity-100 [&>button]:transition-colors [&>button]:hover:bg-white/10 [&>button]:hover:text-[#d8ff65]"
      >
        {/* Decoración de fondo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -right-40 -top-44 h-[430px] w-[430px] rounded-full bg-[#168267]/25 blur-[100px]" />

          <div className="absolute -bottom-48 -left-40 h-[430px] w-[430px] rounded-full bg-[#d8ff65]/10 blur-[110px]" />

          <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <SheetHeader className="relative z-10 border-b border-white/10 px-6 pb-6 pt-7 text-left sm:px-7">
          <div className="pr-12">
            <SheetTitle className="flex items-center gap-3 text-white">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#d8ff65]">
                <span className="h-2 w-2 rounded-full bg-[#d8ff65]" />
                {t.cart.title}
              </span>

              <span className="grid h-8 min-w-8 place-items-center rounded-full bg-[#d8ff65] px-2 font-mono text-[0.65rem] font-bold text-[#102e28]">
                {String(count).padStart(2, "0")}
              </span>
            </SheetTitle>

            <p className="display mt-5 max-w-xs text-2xl font-semibold leading-tight tracking-[-0.025em] text-white sm:text-3xl">
              {t.cart.selection}
            </p>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span className="h-1.5 w-12 rounded-full bg-[#d8ff65]" />
            <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-7 py-10 text-center">
            <div className="relative">
              <div className="absolute -inset-5 rounded-full border border-dashed border-[#d8ff65]/20" />

              <div className="grid h-24 w-24 place-items-center rounded-[2rem] border border-white/10 bg-white/[0.05] shadow-[0_25px_55px_-30px_rgba(0,0,0,0.8)] backdrop-blur-sm">
                <ShoppingBag className="h-9 w-9 text-[#d8ff65]" />
              </div>

              <span className="absolute -right-2 -top-2 grid h-8 w-8 place-items-center rounded-full border-4 border-[#0b211d] bg-[#56c5a8] font-mono text-xs font-bold text-[#102e28]">
                0
              </span>
            </div>

            <div className="mt-9 max-w-xs space-y-3">
              <p className="display text-2xl font-semibold tracking-[-0.02em] text-white">
                {t.cart.emptyTitle}
              </p>

              <p className="text-sm leading-6 text-white/50">
                {t.cart.emptyDesc}
              </p>
            </div>

            <Button
              asChild
              variant="cream"
              onClick={close}
              className="group mt-8 h-12 rounded-full border-0 bg-[#d8ff65] px-6 font-semibold text-[#102e28] shadow-[0_18px_40px_-18px_rgba(216,255,101,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              <Link href="/servicios" className="inline-flex items-center gap-3">
                {t.cart.viewServices}

                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#102e28] text-white transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="relative z-10 flex-1 space-y-3 overflow-y-auto px-5 py-5 sm:px-6">
              {items.map(({ product, qty }) => {
                const data = product[lang];

                return (
                  <div
                    key={product.id}
                    className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm transition-colors duration-300 hover:border-[#56c5a8]/35 hover:bg-white/[0.075]"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#d8ff65]/0 transition-colors duration-300 group-hover:bg-[#d8ff65]/10"
                    />

                    <div className="relative flex gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[1.15rem] border border-white/10 bg-white/[0.06]">
                        <img
                          src={product.imageUrl}
                          alt={data.name}
                          className="h-full w-full object-cover opacity-85 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#102e28]/30 to-transparent" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#56c5a8]">
                              {product.currency}
                            </p>

                            <p className="display mt-1 line-clamp-2 text-[1.05rem] font-semibold leading-snug text-white">
                              {data.name}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => remove(product.id)}
                            aria-label={t.cart.removeAria}
                            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-white/35 transition-all duration-300 hover:border-red-300/30 hover:bg-red-400/10 hover:text-red-300"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <div className="inline-flex items-center rounded-full border border-white/10 bg-black/10 p-1">
                            <button
                              type="button"
                              onClick={() => setQty(product.id, qty - 1)}
                              className="grid h-7 w-7 place-items-center rounded-full text-white/55 transition-colors hover:bg-white/10 hover:text-[#d8ff65]"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>

                            <span className="w-8 text-center font-mono text-xs font-semibold text-white">
                              {qty}
                            </span>

                            <button
                              type="button"
                              onClick={() => setQty(product.id, qty + 1)}
                              className="grid h-7 w-7 place-items-center rounded-full text-white/55 transition-colors hover:bg-white/10 hover:text-[#d8ff65]"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="block font-mono text-sm font-semibold text-white">
                              {formatMXN(product.priceMXN * qty)} MXN
                            </span>

                            <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/35">
                              + IVA
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative z-20 border-t border-white/10 bg-[#081a17]/95 px-5 py-5 shadow-[0_-20px_50px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:px-6 sm:py-6">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5">
                <dl className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between gap-4 text-white/45">
                    <dt>{t.cart.subtotal}</dt>
                    <dd className="text-right">{formatMXN(subtotal)} MXN</dd>
                  </div>

                  <div className="flex justify-between gap-4 text-white/45">
                    <dt>IVA ({Math.round(IVA_RATE * 100)}%)</dt>
                    <dd className="text-right">{formatMXN(iva)} MXN</dd>
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-5 border-t border-white/10 pt-4">
                    <dt className="display text-base font-semibold normal-case tracking-normal text-white">
                      {t.cart.total}
                    </dt>

                    <dd className="text-right">
                      <span className="display block text-2xl font-semibold tracking-[-0.03em] text-[#d8ff65]">
                        {formatMXN(total)}
                      </span>

                      <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-white/35">
                        MXN
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              <Button
                asChild
                variant="cream"
                size="lg"
                className="group mt-4  w-full justify-between rounded-[1.2rem] border-0 bg-[#d8ff65] px-5 font-semibold text-[#102e28] shadow-[0_18px_45px_-18px_rgba(216,255,101,0.5)] transition-all duration-300 hover:bg-white"
                onClick={close}
              >
                <Link href="/checkout">
                  {t.cart.checkoutBtn}

                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#102e28] text-white transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Button>

              <button
                type="button"
                onClick={clear}
                className="mt-4 block w-full text-center font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/30 transition-colors hover:text-[#d8ff65]"
              >
                {t.cart.clearBtn}
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}