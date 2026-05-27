import { useEffect, useRef, useState } from "react";

interface FloatingProductProps {
  src: string;
  alt: string;
  name: string;
  price: string;
  /** top/left as % of viewport (desktop) */
  top: string;
  left: string;
  /** mobile-specific top/left overrides (<=640px) */
  mobileTop?: string;
  mobileLeft?: string;
  /** desktop width px */
  width: number;
  /** mobile width px (defaults to ~50% of width) */
  mobileWidth?: number;
  depth?: number;
  delay?: number;
  rotate?: number;
  onHoverChange?: (isHovered: boolean) => void;
  onClick?: () => void;
}

export function FloatingProduct({
  src,
  alt,
  name,
  price,
  top,
  left,
  mobileTop,
  mobileLeft,
  width,
  mobileWidth,
  depth = 0.5,
  delay = 0,
  rotate = 0,
  onHoverChange,
  onClick,
}: FloatingProductProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [active, setActive] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    const mqC = window.matchMedia("(pointer: coarse)");
    const mqM = window.matchMedia("(max-width: 640px)");
    const sync = () => {
      setIsCoarse(mqC.matches);
      setIsMobile(mqM.matches);
    };
    sync();
    mqC.addEventListener("change", sync);
    mqM.addEventListener("change", sync);
    return () => {
      mqC.removeEventListener("change", sync);
      mqM.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (isCoarse) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setTx(-x * 20 * depth);
      setTy(-y * 20 * depth);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [depth, isCoarse]);

  const mw = mobileWidth ?? Math.round(width * 0.75);
  const resolvedTop = isMobile && mobileTop ? mobileTop : top;
  const resolvedLeft = isMobile && mobileLeft ? mobileLeft : left;

  return (
    <button
      ref={ref}
      type="button"
      aria-label={`${name}, ${price}`}
      className="group absolute z-10 cursor-pointer rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{
        top: resolvedTop,
        left: resolvedLeft,
        width: `clamp(${mw}px, ${(width / 1024) * 100}vw, ${width * 1.1}px)`,
        transform: `translate(${tx}px, ${ty}px)`,
        transition: "transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        animation: `float 7s ease-in-out ${delay}s infinite`,
      }}
      onMouseEnter={() => { setActive(true); onHoverChange?.(true); }}
      onMouseLeave={() => { setActive(false); onHoverChange?.(false); }}
      onFocus={() => { setActive(true); onHoverChange?.(true); }}
      onBlur={() => { setActive(false); onHoverChange?.(false); }}
      onClick={() => { console.log("FloatingProduct clicked!"); onClick?.(); }}
    >
      <div
        className="relative"
        style={{
          transform: `rotate(${rotate}deg) scale(${active ? 1.06 : 1})`,
          transition: "transform 500ms cubic-bezier(0.2, 0.8, 0.2, 1)",
          filter:
            "drop-shadow(0 30px 40px oklch(0.15 0.06 255 / 0.45)) drop-shadow(0 8px 12px oklch(0.15 0.06 255 / 0.25))",
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-auto w-full select-none"
          draggable={false}
        />
      </div>

      <div
        className="pointer-events-none absolute left-1/2 top-full mt-2 max-w-[80vw] -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold tracking-[0.1em] text-foreground/95 backdrop-blur-md sm:mt-3 sm:px-4 sm:py-2 sm:text-sm sm:tracking-[0.1em]"
        style={{
          background:
            "linear-gradient(180deg, oklch(1 0 0 / 0.25) 0%, oklch(1 0 0 / 0.08) 100%)",
          boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.35)",
          opacity: active ? 1 : 0,
          transform: `translate(-50%, ${active ? "0" : "-4px"})`,
          transition: "opacity 300ms ease, transform 300ms ease",
        }}
        aria-hidden
      >
        {name} · {price}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -14px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .group { animation: none !important; }
        }
      `}</style>
    </button>
  );
}
