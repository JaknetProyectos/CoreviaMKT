"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart, IVA_RATE } from "@/lib/cart-context";
import { formatMXN, type ProductPlan } from "@/lib/products";
import { useLanguage } from "@/lib/language-context";

export function ProductCard({
  product,
  index,
}: {
  product: ProductPlan;
  index: number;
}) {
  const { add, open } = useCart();
  const { t, lang } = useLanguage();
  const [dialogOpen, setDialogOpen] = useState(false);

  // Seleccionamos los textos dinámicos según el idioma actual (es o en)
  const data = product[lang];

  const handleAdd = () => {
    add(product);

    toast(t.store.addedToastTitle, {
      description: data.name,
      action: {
        label: t.store.viewCartBtn,
        onClick: () => open(),
      },
    });
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#102e28]/10 bg-white/85 p-3 shadow-[0_22px_55px_-42px_rgba(16,46,40,0.55)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#56c5a8]/45 hover:shadow-[0_34px_80px_-45px_rgba(16,46,40,0.65)] sm:p-4">
      {/* Imagen principal */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.55rem] bg-[#102e28]/5">
        <img
          src={product.imageUrl}
          alt={data.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#102e28]/75 via-[#102e28]/5 to-transparent" />

        {/* Número de servicio */}
        <span className="absolute left-4 top-4 grid h-10 min-w-10 place-items-center rounded-2xl border border-white/15 bg-[#102e28]/80 px-2 font-mono text-[0.65rem] font-bold tracking-[0.1em] text-[#d8ff65] shadow-lg backdrop-blur-md">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Enlace de detalles */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-2xl border border-white/15 bg-white/90 text-[#102e28] shadow-lg backdrop-blur-md transition-all duration-300 hover:rotate-6 hover:bg-[#d8ff65]"
              aria-label={t.store.cardDetails}
            >
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </DialogTrigger>

          <DialogContent className="max-h-[92dvh] w-[94vw] max-w-4xl overflow-y-auto overflow-x-hidden rounded-[2rem] border border-[#102e28]/10 bg-[#f3f6f2] p-0 shadow-[0_40px_100px_-35px_rgba(16,46,40,0.7)] sm:w-full [&>button]:right-4 [&>button]:top-4 [&>button]:z-50 [&>button]:rounded-full [&>button]:border [&>button]:border-white/15 [&>button]:bg-[#102e28]/80 [&>button]:p-2 [&>button]:text-white [&>button]:opacity-100 [&>button]:shadow-lg [&>button]:backdrop-blur-md [&>button]:hover:bg-[#168267]">
            <div className="grid min-h-full md:grid-cols-[0.9fr_1.1fr]">
              {/* Lado visual */}
              <div className="relative overflow-hidden bg-[#102e28] p-5 text-white sm:p-7">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                >
                  <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/10" />

                  <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#168267]/25 blur-3xl" />

                  <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:24px_24px]" />
                </div>

                <div className="relative">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5">
                    <img
                      src={product.imageUrl}
                      alt={data.name}
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#102e28]/45 to-transparent" />
                  </div>

                  <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 font-mono text-[0.6rem] font-bold uppercase tracking-[0.17em] text-[#d8ff65]">
                    <span className="h-2 w-2 rounded-full bg-[#d8ff65]" />
                    Corevia MKT
                  </span>

                  <DialogTitle className="display mt-5 text-3xl font-semibold leading-tight tracking-[-0.035em] text-white">
                    {data.name}
                  </DialogTitle>

                  <p className="mt-4 text-sm leading-7 text-white/60">
                    {data.description}
                  </p>
                </div>
              </div>

              {/* Detalles del servicio */}
              <div className="relative flex flex-col p-6 sm:p-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                >
                  <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#d8ff65]/20 blur-3xl" />

                  <div className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-[#56c5a8]/15 blur-3xl" />
                </div>

                <div className="relative flex flex-1 flex-col">
                  <div className="flex items-center gap-4 border-b border-[#102e28]/10 pb-5">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#102e28] font-mono text-[0.65rem] font-bold text-[#d8ff65]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#168267]">
                      {t.store.cardIncludes}
                    </p>
                  </div>

                  <ul className="mt-6 flex-1 space-y-3">
                    {data.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 rounded-[1.15rem] border border-[#102e28]/8 bg-white/75 px-4 py-3.5 text-sm leading-6 text-[#334b45]"
                      >
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-[#e3f4ed] text-[#168267]">
                          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                        </span>

                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 rounded-[1.5rem] bg-[#102e28] p-5 text-white">
                    <div className="flex items-end justify-between gap-5">
                      <span className="max-w-28 font-mono text-[0.62rem] font-bold uppercase leading-5 tracking-[0.16em] text-white/45">
                        {t.store.cardTotalIva}
                      </span>

                      <span className="display text-right text-3xl font-semibold tracking-[-0.04em] text-[#d8ff65]">
                        {formatMXN(product.priceMXN * (1 + IVA_RATE))}
                      </span>
                    </div>

                    <Button
                      className="group mt-5 h-13 w-full justify-between rounded-2xl bg-[#d8ff65] px-5 font-semibold text-[#102e28] shadow-none transition-all duration-300 hover:bg-white"
                      size="lg"
                      onClick={() => {
                        handleAdd();
                        setDialogOpen(false);
                      }}
                    >
                      {t.store.cardHire}

                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#102e28] text-white transition-transform duration-300 group-hover:rotate-6">
                        <Plus className="h-4 w-4" />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Información de la tarjeta */}
      <div className="flex flex-1 flex-col px-2 pb-2 pt-6 sm:px-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="display max-w-[75%] text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#102e28] transition-colors duration-300 group-hover:text-[#168267]">
            {data.name}
          </h3>

          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#d8ff65] shadow-[0_0_0_5px_rgba(216,255,101,0.2)]" />
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-7 text-[#64766f]">
          {data.description}
        </p>

        <div className="mt-auto pt-6">
          <div className="flex items-end justify-between gap-5 border-t border-[#102e28]/10 pt-5">
            <div>
              <p className="display text-3xl font-semibold tracking-[-0.04em] text-[#168267]">
                {formatMXN(product.priceMXN)}
              </p>

              <p className="mt-1.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#102e28]/40">
                {product.currency}
              </p>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="group/details inline-flex items-center gap-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.13em] text-[#102e28]/50 transition-colors hover:text-[#168267]"
                >
                  {t.store.cardDetails}

                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/details:translate-x-0.5 group-hover/details:-translate-y-0.5" />
                </button>
              </DialogTrigger>
            </Dialog>
          </div>

          <Button
            onClick={handleAdd}
            className="group mt-5 h-13 w-full justify-between rounded-2xl bg-[#102e28] px-5 font-semibold text-white shadow-[0_15px_35px_-20px_rgba(16,46,40,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#168267]"
          >
            {t.store.cardHire}

            <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#d8ff65] text-[#102e28] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
              <Plus className="h-4 w-4" />
            </span>
          </Button>
        </div>
      </div>
    </article>
  );
}