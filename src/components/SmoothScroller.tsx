import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * SmoothScroller — initializes Lenis for heavy, smooth, Apple-like scrolling.
 * Renders nothing; just hooks into the window RAF loop.
 */
export function SmoothScroller() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,            // heavier = slower deceleration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // aggressive ease-out
      touchMultiplier: 1.8,     // make touch scrolling feel responsive
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
