"use client";

import { webPlans } from "@/lib/products";
import { ProductCard } from "./product-card";
import { useLanguage } from "@/lib/language-context";

export function StoreGrid() {
  const { t } = useLanguage();

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-[1.5rem] border border-[#102e28]/10 bg-white/70 px-5 py-4 shadow-[0_18px_45px_-38px_rgba(16,46,40,0.55)] backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-9 min-w-9 place-items-center rounded-xl bg-[#102e28] px-2 font-mono text-[0.62rem] font-bold text-[#d8ff65]">
            {String(webPlans.length).padStart(2, "0")}
          </span>

          <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#102e28]/50">
            {t.store.plansCountLabel}
          </p>
        </div>

        <div
          aria-hidden="true"
          className="flex items-center gap-3"
        >
          <span className="h-1.5 w-12 rounded-full bg-[#d8ff65]" />
          <span className="h-px w-16 bg-[#102e28]/10 sm:w-24" />
          <span className="h-2 w-2 rounded-full bg-[#56c5a8]" />
        </div>
      </div>

      <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {webPlans.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}