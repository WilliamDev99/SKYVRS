import { memo } from "react";

export const AnimatedMeshBackground = memo(function AnimatedMeshBackground() {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none mix-blend-multiply">
      {/* 1 single giant moving black shadow crossing the entire screen */}
      <div className="absolute top-0 left-0 w-[120vw] h-[120vw] rounded-full opacity-60 filter blur-[150px] animate-blob1 bg-black" />
    </div>
  );
});
