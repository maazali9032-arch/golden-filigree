import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface DrawProps {
  d: string;
  delay?: number;
  duration?: number;
  width?: number;
  className?: string;
}

/** A single hairline gold path that forges itself into existence. */
export function DrawnPath({ d, delay = 0, duration = 1.6, width = 1, className }: DrawProps) {
  const reduce = useReducedMotion();
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        pathLength: { duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.25, delay: reduce ? 0 : delay },
      }}
    />
  );
}

/** Reusable jeweller's scroll used as a corner motif. */
const CORNER_PATHS = [
  "M4 4 C 4 46, 22 66, 64 68",
  "M4 4 C 46 4, 66 22, 68 64",
  "M10 22 C 34 24, 44 34, 46 56 C 46 66, 34 68, 30 60 C 26 52, 34 44, 44 46 C 56 48, 62 58, 62 70",
  "M22 10 C 24 34, 34 44, 56 46 C 66 46, 68 34, 60 30 C 52 26, 44 34, 46 44",
  "M14 12 C 26 12, 32 18, 32 28",
  "M12 14 C 12 26, 18 32, 28 32",
];

export function FiligreeCorner({
  className = "",
  delay = 0,
  flipX = false,
  flipY = false,
}: {
  className?: string;
  delay?: number;
  flipX?: boolean;
  flipY?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 80 80"
      aria-hidden="true"
      className={`pointer-events-none text-gold ${className}`}
      style={{ transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})` }}
    >
      {CORNER_PATHS.map((d, i) => (
        <DrawnPath key={d} d={d} delay={delay + i * 0.18} duration={1.2} width={0.9} />
      ))}
    </svg>
  );
}

/** A thin forged separator: a line pulled outward from a central bead. */
export function FiligreeDivider({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  return (
    <svg viewBox="0 0 220 20" aria-hidden="true" className={`h-5 w-44 text-gold ${className}`}>
      <DrawnPath d="M10 10 H 92" delay={delay} duration={0.9} width={0.8} />
      <DrawnPath d="M210 10 H 128" delay={delay} duration={0.9} width={0.8} />
      <DrawnPath
        d="M100 10 C 104 4, 116 4, 120 10 C 116 16, 104 16, 100 10 Z"
        delay={delay + 0.4}
        duration={0.8}
        width={0.9}
      />
      <DrawnPath d="M92 10 l 4 -3 v 6 z" delay={delay + 0.7} duration={0.4} width={0.8} />
      <DrawnPath d="M128 10 l -4 -3 v 6 z" delay={delay + 0.7} duration={0.4} width={0.8} />
    </svg>
  );
}

/** Jewellery-like frame that grows around its children. */
export function FiligreeFrame({
  children,
  className = "",
  delay = 0,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  padded?: boolean;
}) {
  return (
    <div className={`relative ${padded ? "px-7 py-10" : ""} ${className}`}>
      <svg
        viewBox="0 0 300 460"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full text-gold-soft"
      >
        <DrawnPath d="M18 10 H 282" delay={delay} duration={1.4} width={0.7} />
        <DrawnPath d="M18 450 H 282" delay={delay + 0.1} duration={1.4} width={0.7} />
        <DrawnPath d="M10 18 V 442" delay={delay + 0.2} duration={1.4} width={0.7} />
        <DrawnPath d="M290 18 V 442" delay={delay + 0.3} duration={1.4} width={0.7} />
        <DrawnPath d="M10 18 C 10 12, 12 10, 18 10" delay={delay + 0.9} duration={0.5} width={0.7} />
        <DrawnPath d="M290 18 C 290 12, 288 10, 282 10" delay={delay + 0.9} duration={0.5} width={0.7} />
        <DrawnPath d="M10 442 C 10 448, 12 450, 18 450" delay={delay + 0.9} duration={0.5} width={0.7} />
        <DrawnPath d="M290 442 C 290 448, 288 450, 282 450" delay={delay + 0.9} duration={0.5} width={0.7} />
      </svg>
      <FiligreeCorner className="absolute left-1 top-1 h-11 w-11" delay={delay + 0.6} />
      <FiligreeCorner
        className="absolute right-1 top-1 h-11 w-11"
        delay={delay + 0.75}
        flipX
      />
      <FiligreeCorner
        className="absolute bottom-1 left-1 h-11 w-11"
        delay={delay + 0.9}
        flipY
      />
      <FiligreeCorner
        className="absolute bottom-1 right-1 h-11 w-11"
        delay={delay + 1.05}
        flipX
        flipY
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/** Ornate crown arch used above the hero and closing composition. */
export function FiligreeArch({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  return (
    <svg viewBox="0 0 320 110" aria-hidden="true" className={`w-full text-gold ${className}`}>
      <DrawnPath d="M20 100 C 30 40, 90 12, 160 12 C 230 12, 290 40, 300 100" delay={delay} duration={1.8} width={0.9} />
      <DrawnPath
        d="M40 100 C 50 52, 100 26, 160 26 C 220 26, 270 52, 280 100"
        delay={delay + 0.35}
        duration={1.8}
        width={0.6}
      />
      <DrawnPath
        d="M160 12 C 150 22, 150 34, 160 42 C 170 34, 170 22, 160 12 Z"
        delay={delay + 1.1}
        duration={0.7}
        width={0.9}
      />
      <DrawnPath
        d="M104 34 C 96 44, 104 58, 118 54 C 128 50, 126 38, 116 38 C 108 38, 106 46, 112 48"
        delay={delay + 1.2}
        duration={1}
        width={0.7}
      />
      <DrawnPath
        d="M216 34 C 224 44, 216 58, 202 54 C 192 50, 194 38, 204 38 C 212 38, 214 46, 208 48"
        delay={delay + 1.3}
        duration={1}
        width={0.7}
      />
      <DrawnPath d="M62 78 C 76 66, 92 70, 96 84" delay={delay + 1.4} duration={0.8} width={0.6} />
      <DrawnPath d="M258 78 C 244 66, 228 70, 224 84" delay={delay + 1.5} duration={0.8} width={0.6} />
    </svg>
  );
}

/** Fine vine that grows along a section edge. */
export function FiligreeVine({ delay = 0, className = "", mirrored = false }: { delay?: number; className?: string; mirrored?: boolean }) {
  return (
    <svg
      viewBox="0 0 60 400"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={`pointer-events-none text-gold-soft ${className}`}
      style={{ transform: mirrored ? "scaleX(-1)" : undefined }}
    >
      <DrawnPath d="M30 0 C 6 70, 54 130, 30 200 C 6 270, 54 330, 30 400" delay={delay} duration={2.6} width={0.7} />
      <DrawnPath d="M22 70 C 6 62, 4 44, 20 42 C 30 42, 30 56, 20 56" delay={delay + 0.6} duration={0.9} width={0.6} />
      <DrawnPath d="M38 190 C 54 182, 56 164, 40 162 C 30 162, 30 176, 40 176" delay={delay + 1} duration={0.9} width={0.6} />
      <DrawnPath d="M22 310 C 6 302, 4 284, 20 282 C 30 282, 30 296, 20 296" delay={delay + 1.4} duration={0.9} width={0.6} />
    </svg>
  );
}
