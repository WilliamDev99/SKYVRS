import { useEffect, useRef, useState } from "react";

interface FloatingProductProps {
  src: string;
  alt: string;
  name: string;
  price: string;
  /** top/left as % of viewport */
  top: string;
  left: string;
  width: number; // px
  depth?: number; // 0..1, parallax intensity
  delay?: number;
  rotate?: number;
}

export function FloatingProduct({
  src,
  alt,
  name,
  price,
  top,
  left,
  width,
  depth = 0.5,
  delay = 0,
  rotate = 0,
}: FloatingProductProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setTx(-x * 20 * depth);
      setTy(-y * 20 * depth);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [depth]);

  return (
    <div
      ref={ref}
      className="group absolute cursor-pointer"
      style={{
        top,
        left,
        width,
        transform: `translate(${tx}px, ${ty}px)`,
        transition: "transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        animation: `float 7s ease-in-out ${delay}s infinite`,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="relative"
        style={{
          transform: `rotate(${rotate}deg) scale(${hover ? 1.06 : 1})`,
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

      {/* Label tooltip on hover */}
      <div
        className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] font-medium tracking-[0.25em] text-foreground/95 backdrop-blur-md"
        style={{
          background:
            "linear-gradient(180deg, oklch(1 0 0 / 0.25) 0%, oklch(1 0 0 / 0.08) 100%)",
          boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.35)",
          opacity: hover ? 1 : 0,
          transform: `translate(-50%, ${hover ? "0" : "-4px"})`,
          transition: "opacity 300ms ease, transform 300ms ease",
        }}
      >
        {name} · {price}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -14px; }
        }
      `}</style>
    </div>
  );
}
