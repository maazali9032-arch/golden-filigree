import { useReducedMotion } from "motion/react";

/**
 * Global floating brand ribbon.
 * Data-driven: the brand name always comes from the public RPC payload.
 */
export function BrandTicker({ brandName }: { brandName?: string | null | undefined }) {
  const reduce = useReducedMotion();
  const name = brandName?.trim();
  if (!name) return null;

  const group = (key: string) => (
    <div key={key} className="flex shrink-0">
      {Array.from({ length: 6 }, (_, i) => (
        <span
          key={i}
          className="flex items-center gap-3 whitespace-nowrap px-4 font-sans text-[9px] uppercase tracking-[0.3em] text-gold-deep/75"
        >
          {name}
          <span className="text-gold/60">&mdash;</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-[70%] z-40 flex h-[1.7vh] min-h-[15px] items-center overflow-hidden border-y border-gold/25 bg-gold-veil backdrop-blur-[1px]"
    >
      <div
        className={`flex ${reduce ? "" : "animate-brand-marquee"}`}
        style={{ willChange: "transform" }}
      >
        {group("a")}
        {group("b")}
      </div>
    </div>
  );
}

