import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "ink",
  wordmark = true,
}: {
  className?: string;
  variant?: "ink" | "cream";
  wordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-[12px] bg-[#102e28] shadow-[0_3px_0_0_#071713]">
        {/* Decoración interior */}
        <span className="absolute -bottom-4 -left-4 h-9 w-9 rounded-full bg-[#168267]/30" />

        <span className="absolute -right-3 -top-3 h-8 w-8 rounded-full border border-white/10" />

        {/* Inicial de Corevia */}
        <span className="display relative -translate-x-[0.5px] text-[1.25rem] font-black leading-none text-white">
          C
        </span>

        {/* Insignia de crecimiento */}
        <span className="absolute -right-[3px] -top-[3px] grid h-[17px] w-[17px] place-items-center rounded-full bg-[#d8ff65] ring-2 ring-[#f3f6f2]">
          <span className="relative h-[7px] w-[7px]">
            <span className="absolute bottom-0 left-0 h-[2px] w-[7px] -rotate-45 rounded-full bg-[#102e28]" />

            <span className="absolute right-0 top-0 h-[5px] w-[2px] rounded-full bg-[#102e28]" />

            <span className="absolute right-0 top-0 h-[2px] w-[5px] rounded-full bg-[#102e28]" />
          </span>
        </span>
      </span>

      {wordmark && (
        <span
          className={cn(
            "display inline-flex items-baseline text-[1.35rem] font-semibold leading-none tracking-[-0.04em]",
            variant === "cream" ? "text-white" : "text-[#102e28]",
          )}
        >
          Corevia
          <span
            className={cn(
              "ml-1.5 rounded-md px-1.5 py-1 font-mono text-[0.52rem] font-bold uppercase tracking-[0.12em]",
              variant === "cream"
                ? "bg-[#d8ff65] text-[#102e28]"
                : "bg-[#102e28] text-[#d8ff65]",
            )}
          >
            MKT
          </span>
        </span>
      )}
    </span>
  );
}