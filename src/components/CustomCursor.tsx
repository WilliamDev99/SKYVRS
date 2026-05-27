import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    const mqC = window.matchMedia("(pointer: coarse)");
    setIsCoarse(mqC.matches);
    const sync = () => setIsCoarse(mqC.matches);
    mqC.addEventListener("change", sync);
    return () => mqC.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (isCoarse) return;
    
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering an interactive element
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [isCoarse]);

  if (isCoarse) return null;

  return (
    <>
      <style>{`
        body, a, button {
          cursor: none !important;
        }
      `}</style>
      <div
        className="pointer-events-none fixed z-[100] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/30 mix-blend-difference transition-transform duration-200 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      >
        <div 
          className="absolute h-1 w-1 rounded-full bg-foreground transition-all duration-200" 
          style={{ opacity: isHovering ? 0 : 1 }}
        />
        <div 
          className="font-mono text-[8px] tracking-widest text-foreground transition-all duration-200"
          style={{ opacity: isHovering ? 1 : 0 }}
        >
          [+]
        </div>
      </div>
    </>
  );
}
