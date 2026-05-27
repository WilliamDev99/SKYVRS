import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Header } from "@/components/Header";

import wp13desk from "@/assets/Walpaper/SKYLRK_Wallpaper_13_Desktop.jpg";
import wp13ipad from "@/assets/Walpaper/SKYLRK_Wallpaper_13_iPad.jpg";
import wp13iphone from "@/assets/Walpaper/SKYLRK_Wallpaper_13_iPhone.jpg";
import wp14desk from "@/assets/Walpaper/SKYLRK_Wallpaper_14_Desktop.jpg";
import wp15ipad from "@/assets/Walpaper/SKYLRK_Wallpaper_15_iPad.jpg";
import wp15iphone from "@/assets/Walpaper/SKYLRK_Wallpaper_15_iPhone.jpg";

export const Route = createFileRoute("/wallpapers")({
  component: WallpapersPage,
});

const WALLPAPERS = [
  {
    id: "abyssal-blue",
    name: "ABYSSAL BLUE",
    mobile: wp13iphone,
    tablet: wp13ipad,
    desktop: wp13desk,
    display: wp13desk,
  },
  {
    id: "scarlet-horizon",
    name: "SCARLET HORIZON",
    mobile: wp14desk, // Fallback
    tablet: wp14desk,
    desktop: wp14desk,
    display: wp14desk,
  },
  {
    id: "ethereal-mist",
    name: "ETHEREAL MIST",
    mobile: wp15iphone,
    tablet: wp15ipad,
    desktop: wp15ipad, // Fallback
    display: wp15ipad,
  },
];

function WallpapersPage() {
  const [selectedWallpaper, setSelectedWallpaper] = useState<typeof WALLPAPERS[0] | null>(null);

  return (
    <main className="relative w-full bg-black">
      <Header />
      
      {/* Wallpapers List - Normal continuous flow for Lenis smooth scroll */}
      {WALLPAPERS.map((wp) => (
        <div 
          key={wp.id} 
          className="relative h-screen w-full flex items-center justify-center cursor-pointer overflow-hidden"
          onClick={() => setSelectedWallpaper(wp)}
        >
          {/* Main Background */}
          <img 
            src={wp.display} 
            alt={wp.name} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Subtle vignette/gradient so header is always readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />
          
          {/* Click hint */}
          <div className="absolute bottom-12 text-white/50 text-sm tracking-widest font-mono pointer-events-none uppercase">
            Click to Download
          </div>
        </div>
      ))}

      <GrainOverlay />

      {/* Download Modal */}
      <AnimatePresence>
        {selectedWallpaper && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop click to close */}
            <div 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setSelectedWallpaper(null)}
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md rounded-[32px] p-6 sm:p-8 flex flex-col gap-6"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.15) 100%)",
                border: "1px solid rgba(255,255,255,0.3)",
                backdropFilter: "blur(40px) saturate(1.5)",
                WebkitBackdropFilter: "blur(40px) saturate(1.5)",
                boxShadow: "0 32px 64px rgba(0,0,0,0.15), inset 0 2px 1px rgba(255,255,255,0.7), inset 0 -1px 1px rgba(255,255,255,0.2), inset 0 0 40px rgba(255,255,255,0.15)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 
                  className="text-xl sm:text-2xl font-black text-white tracking-[0.15em] uppercase"
                  style={{ fontFamily: "'Orbitron', sans-serif", textShadow: "0 2px 10px rgba(255,255,255,0.3)" }}
                >
                  {selectedWallpaper.name}
                </h2>
                <button 
                  onClick={() => setSelectedWallpaper(null)}
                  className="text-white hover:text-white/80 transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md border border-white/20"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Download Options */}
              <div className="flex flex-col gap-4">
                {/* Mobile */}
                <a 
                  href={selectedWallpaper.mobile} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    boxShadow: "inset 0 1px 2px rgba(255,255,255,0.5), inset 0 -1px 1px rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="w-12 h-16 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow">
                    <img src={selectedWallpaper.mobile} className="w-full h-full object-cover" alt="Mobile" />
                  </div>
                  <span className="text-white font-bold tracking-[0.15em] absolute right-16 text-sm" style={{ fontFamily: "'Orbitron', sans-serif" }}>MOBILE</span>
                  <Download className="text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all" size={24} />
                </a>

                {/* Tablet */}
                <a 
                  href={selectedWallpaper.tablet} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    boxShadow: "inset 0 1px 2px rgba(255,255,255,0.5), inset 0 -1px 1px rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow">
                    <img src={selectedWallpaper.tablet} className="w-full h-full object-cover" alt="Tablet" />
                  </div>
                  <span className="text-white font-bold tracking-[0.15em] absolute right-16 text-sm" style={{ fontFamily: "'Orbitron', sans-serif" }}>TABLET</span>
                  <Download className="text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all" size={24} />
                </a>

                {/* Desktop */}
                <a 
                  href={selectedWallpaper.desktop} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    boxShadow: "inset 0 1px 2px rgba(255,255,255,0.5), inset 0 -1px 1px rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="w-24 h-16 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow">
                    <img src={selectedWallpaper.desktop} className="w-full h-full object-cover" alt="Desktop" />
                  </div>
                  <span className="text-white font-bold tracking-[0.15em] absolute right-16 text-sm" style={{ fontFamily: "'Orbitron', sans-serif" }}>DESKTOP</span>
                  <Download className="text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all" size={24} />
                </a>
              </div>

              {/* Footer text */}
              <p className="text-white/60 text-xs sm:text-sm font-mono text-center pt-2">
                Image will open in new tab. Press and hold to save.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
