import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface MobileProductCardProps {
  src: string;
  alt: string;
  name: string;
  price: string;
  gradient: string;
  onClick: () => void;
  onVisible: () => void;
}

export function MobileProductCard({
  src,
  alt,
  name,
  price,
  onClick,
  onVisible,
}: MobileProductCardProps) {
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.75, 1.05, 0.75]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <section
      ref={ref}
      className="relative flex h-[100dvh] w-full flex-col items-center justify-center px-6 pt-20 pb-16"
    >
      <button
        type="button"
        onClick={onClick}
        className="group flex flex-col items-center gap-6 outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <motion.div style={{ y, scale }}>
          <div
            className="transition-transform duration-500 ease-out group-active:scale-95"
          style={{
            filter:
              "drop-shadow(0 30px 40px oklch(0.15 0.06 255 / 0.45)) drop-shadow(0 8px 12px oklch(0.15 0.06 255 / 0.25))",
            animation: "float 7s ease-in-out infinite",
          }}
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="h-auto w-[75vw] max-w-[320px] md:max-w-[480px] select-none"
            draggable={false}
          />
          </div>
        </motion.div>

        <div className="mt-4 flex flex-col items-center gap-2">

          <h2 className="text-center text-xl font-medium tracking-[0.15em] text-foreground/90">
            {name}
          </h2>
          <p className="font-mono text-sm tracking-[0.2em] text-foreground/70">
            {price}
          </p>
        </div>
      </button>

      <style>{`
        @keyframes float {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -14px; }
        }
      `}</style>
    </section>
  );
}
