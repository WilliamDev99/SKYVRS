import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { CartModal } from "./CartModal";
import { useCart } from "@/contexts/CartContext";

const NAV_LINKS: Record<string, string> = {
  SHOP: "/",
  CONTACT: "/contact",
  POLICIES: "#",
  WALLPAPERS: "/wallpapers",
  IG: "https://www.instagram.com/williamrann_/",
};

const NAV = Object.keys(NAV_LINKS);

const liquidGlassStyle = {
  border: "1px solid rgba(255,255,255,0.3)",
  background: "linear-gradient(145deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.15) 100%)",
  backdropFilter: "blur(40px) saturate(1.5)",
  WebkitBackdropFilter: "blur(40px) saturate(1.5)",
  boxShadow: "0 12px 24px rgba(0,0,0,0.12), inset 0 2px 1px rgba(255,255,255,0.7), inset 0 -1px 1px rgba(255,255,255,0.2), inset 0 0 20px rgba(255,255,255,0.15)",
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <>
      {/* ---------------- MOBILE HEADER ---------------- */}
      <header className="fixed inset-x-0 top-0 z-50 p-3 sm:p-6 md:hidden pointer-events-none">
        <div className="flex flex-col items-start gap-3 w-full max-w-[400px]">
          {/* Top Row: Logo & Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
            {/* Logo pill */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="SKYVRS home"
              className="rounded-full px-2 py-0.5 sm:px-3 sm:py-1 text-3xl sm:text-4xl leading-none font-black tracking-[0.4em] text-white outline-none flex items-center justify-center"
              style={{
                fontFamily: "'Nasalization Rg', sans-serif",
                ...liquidGlassStyle
              }}
            >
              SKYVRS
            </Link>
            
            {/* Toggle pill */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
              className="flex items-center gap-2 sm:gap-3 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 outline-none transition-all"
              style={liquidGlassStyle}
            >
              {cartCount > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCartOpen(true);
                  }}
                  className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-white text-[11px] sm:text-xs font-medium text-slate-600 hover:opacity-80 transition-opacity"
                  aria-label="Open cart"
                >
                  {cartCount}
                </button>
              )}
              <motion.div 
                className="relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 ml-1 mr-1"
                animate={{ rotate: mobileOpen ? 135 : 0 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 15 }}
              >
                <motion.span 
                  className="absolute bg-white rounded-full"
                  style={{ height: '2px' }}
                  animate={{ width: mobileOpen ? '100%' : '60%' }}
                  transition={{ duration: 0.4 }}
                />
                <motion.span 
                  className="absolute bg-white rounded-full"
                  style={{ width: '2px' }}
                  animate={{ height: mobileOpen ? '100%' : '60%' }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </button>
          </div>

          {/* Dropdown Panel */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.nav
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full rounded-[32px] p-6 sm:p-8 pointer-events-auto flex flex-col origin-top-left"
                style={liquidGlassStyle}
              >
                <div className="flex flex-col gap-4 sm:gap-5">
                  {Object.entries(NAV_LINKS).map(([name, path]) => 
                    path.startsWith("http") ? (
                      <a
                        key={name}
                        href={path}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between text-white font-bold tracking-[0.15em] sm:tracking-[0.2em] text-sm sm:text-base outline-none transition-all hover:opacity-70 focus-visible:opacity-70"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}
                      >
                        <span>{name}</span>
                        <span className="font-light text-white/50">→</span>
                      </a>
                    ) : (
                      <Link
                        key={name}
                        to={path}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between text-white font-bold tracking-[0.15em] sm:tracking-[0.2em] text-sm sm:text-base outline-none transition-all hover:opacity-70 focus-visible:opacity-70"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}
                      >
                        <span>{name}</span>
                        <span className="font-light text-white/50">→</span>
                      </Link>
                    )
                  )}
                </div>
                <div
                  className="mt-12 font-mono text-xs tracking-[0.2em] text-white/80"
                  aria-label="Region: RPIDR"
                >
                  [ RPIDR ]
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ---------------- DESKTOP HEADER ---------------- */}
      <header className="fixed inset-x-0 top-0 z-40 hidden md:flex items-start justify-between gap-3 px-3 py-3 sm:px-6 sm:py-5 md:px-10 md:py-7 pointer-events-none">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 pointer-events-auto">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="SKYVRS home"
            className="hidden md:flex rounded-full px-5 py-2 text-4xl leading-none font-black tracking-[0.4em] text-white outline-none items-center justify-center pointer-events-auto"
            style={{
              fontFamily: "'Nasalization Rg', sans-serif",
              ...liquidGlassStyle
            }}
          >
            SKYVRS
          </Link>

          {/* Nav pill container */}
          <motion.div
            layout
            initial={false}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex items-center rounded-full overflow-hidden"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              ...liquidGlassStyle
            }}
          >
            {desktopOpen ? (
              <motion.nav
                key="nav"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                aria-label="Primary"
                className="flex items-center gap-3 px-3 py-2 text-[10px] font-bold tracking-[0.2em] text-white sm:gap-4 sm:px-5 sm:py-2.5 sm:text-[11px] sm:tracking-[0.22em] md:gap-5 md:px-6 md:py-3 md:text-xs min-w-max"
              >
                {cartCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setCartOpen(true)}
                    className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-white text-[10px] sm:text-[11px] font-medium text-slate-600 hover:opacity-80 transition-opacity"
                    aria-label="Open cart"
                  >
                    {cartCount}
                  </button>
                )}
                {Object.entries(NAV_LINKS).map(([name, path]) => 
                  path.startsWith("http") ? (
                    <a
                      key={name}
                      href={path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs tracking-[0.2em] text-white/90 hover:text-white transition-colors"
                    >
                      {name}
                    </a>
                  ) : (
                    <Link
                      key={name}
                      to={path}
                      className="font-mono text-xs tracking-[0.2em] text-white/90 hover:text-white transition-colors"
                    >
                      {name}
                    </Link>
                  )
                )}
                <button
                  type="button"
                  aria-label="Close navigation"
                  onClick={() => setDesktopOpen(false)}
                  className="ml-1 flex items-center justify-center rounded-full font-bold text-white outline-none transition-opacity hover:opacity-70 focus-visible:opacity-70 focus-visible:ring-2 focus-visible:ring-white drop-shadow-sm"
                >
                  <motion.div 
                    className="relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 135 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <motion.span className="absolute bg-white rounded-full" style={{ height: '2px' }} initial={{ width: '60%' }} animate={{ width: '100%' }} transition={{ duration: 0.4 }} />
                    <motion.span className="absolute bg-white rounded-full" style={{ width: '2px' }} initial={{ height: '60%' }} animate={{ height: '100%' }} transition={{ duration: 0.4 }} />
                  </motion.div>
                </button>
              </motion.nav>
            ) : (
              <motion.button
                key="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                type="button"
                onClick={() => setDesktopOpen(true)}
                aria-label="Open navigation"
                className="flex items-center gap-3 justify-center px-5 py-2 text-white outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {cartCount > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCartOpen(true);
                    }}
                    className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-white text-[10px] sm:text-[11px] font-medium text-slate-600 hover:opacity-80 transition-opacity"
                    aria-label="Open cart"
                  >
                    {cartCount}
                  </button>
                )}
                <motion.div 
                  className="relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6"
                  initial={{ rotate: 135 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 15 }}
                >
                  <motion.span className="absolute bg-white rounded-full" style={{ height: '2px' }} initial={{ width: '100%' }} animate={{ width: '60%' }} transition={{ duration: 0.4 }} />
                  <motion.span className="absolute bg-white rounded-full" style={{ width: '2px' }} initial={{ height: '100%' }} animate={{ height: '60%' }} transition={{ duration: 0.4 }} />
                </motion.div>
              </motion.button>
            )}
          </motion.div>        </div>

        <div
          className="font-mono text-[10px] tracking-[0.22em] text-white/80 sm:text-[11px] sm:tracking-[0.25em] md:text-xs"
          aria-label="Region: RPIDR"
        >
          [ RPIDR ]
        </div>
      </header>

      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
