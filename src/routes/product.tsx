import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { GrainOverlay } from "@/components/GrainOverlay";
import { useState, useEffect, useRef } from "react";
import { motion, PanInfo, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useProducts, type Product } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";

export const Route = createFileRoute("/product")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      id: search.id as string | undefined,
    };
  },
  component: ProductPage,
});

const SIZES = ["XS", "S", "M", "L", "XL", "2XL"];

const COLOR_MAP: Record<string, string> = {
  LIME: "#B5C282",
  CAVE: "#1a1a1a",
  PINK: "#D4869C",
  IRIS: "#7B68AE",
  WASHED: "#8BA5B5",
  PAPER: "#E8E0D4",
  GOO: "#a4d339",
  JELLY: "#ff3366",
  "SUPER BLUE": "#93018192",
  ONYX: "#38b000",
  STONE: "linear-gradient(135deg, #ff99cc 0%, #ff99cc 50%, #004d00 50%, #004d00 100%)",
  SAND: "#f4e4c1",
  DREAM: "#b3cce6",
  "FRESH GREEN": "linear-gradient(135deg, #ccff00 0%, #ccff00 50%, #2b7a2b 50%, #2b7a2b 100%)",
  PIE: "#e63946",
};

function ProductPage() {
  const { id } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data: products = [] } = useProducts();
  const product = products.find((p) => p.id === id) || products[0];
  const { addToCart } = useCart();
  const baseName = product?.name.split(" / ")[0] || "";
  const colorVariants = products.filter(p => p.name.startsWith(baseName));
  const [selectedSize, setSelectedSize] = useState("M");
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDraggingCarousel, setIsDraggingCarousel] = useState(false);
  const [isSizingOpen, setIsSizingOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const images = product?.images || [product?.src || ""];

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.y < -40) {
      setIsExpanded(true); // Pulled up
    } else if (info.offset.y > 40) {
      setIsExpanded(false); // Pulled down
    }
  };

  const liquidGlassStyle: React.CSSProperties = {
    background: "linear-gradient(145deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.15) 100%)",
    border: "1px solid rgba(255,255,255,0.3)",
    backdropFilter: "blur(40px) saturate(1.5)",
    WebkitBackdropFilter: "blur(40px) saturate(1.5)",
    boxShadow: "0 12px 24px rgba(0,0,0,0.12), inset 0 2px 1px rgba(255,255,255,0.7), inset 0 -1px 1px rgba(255,255,255,0.2), inset 0 0 20px rgba(255,255,255,0.15)",
  };

  return (
    <main
      className="relative min-h-screen w-full transition-all duration-700 ease-in-out text-white"
      style={{
        background: product ? product.gradient : "var(--gradient-black)",
      }}
    >
      <GrainOverlay />
      <Header />

      {!product ? (
        <div className="flex h-screen w-full items-center justify-center">
          <div className="text-xl tracking-widest text-white/50">PRODUCT NOT FOUND.</div>
        </div>
      ) : (
        <>
          {/* Mobile: Swipe Carousel */}
      {isMobile ? (
        <>
          <div className="fixed inset-0 z-10 flex items-center overflow-hidden">
            <motion.div
              drag="x"
              dragConstraints={{ 
                left: typeof window !== "undefined" ? -((images.length - 1) * window.innerWidth) : 0, 
                right: 0 
              }}
              dragElastic={0.15}
              onDragStart={() => setIsDraggingCarousel(true)}
              onDragEnd={(_: any, info: PanInfo) => {
                setIsDraggingCarousel(false);
                const swipe = info.offset.x;
                const velocity = info.velocity.x;
                if (swipe < -40 || velocity < -400) {
                  setActiveSlide((prev) => Math.min(prev + 1, images.length - 1));
                } else if (swipe > 40 || velocity > 400) {
                  setActiveSlide((prev) => Math.max(prev - 1, 0));
                }
              }}
              animate={{ x: `-${activeSlide * 100}vw` }}
              transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.8 }}
              className="flex h-full items-center"
              style={{ width: "max-content" }}
            >
              {images.map((imgSrc: string, i: number) => (
                <div
                  key={i}
                  className="flex items-center justify-center shrink-0 w-screen h-full px-6 pb-[20vh] md:pb-[35vh] pt-[8vh]"
                >
                  <motion.img
                    src={imgSrc}
                    alt={`${product.name} view ${i + 1}`}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="max-h-full w-auto max-w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] select-none pointer-events-none"
                    animate={{
                      scale: activeSlide === i && !isDraggingCarousel ? 1 : 0.85,
                      opacity: activeSlide === i && !isDraggingCarousel ? 1 : 0.6,
                      filter: activeSlide === i && !isDraggingCarousel ? "blur(0px)" : "blur(6px)",
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dot Indicators — Mobile Only */}
          <div className="fixed bottom-[22vh] left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-3 md:hidden">
            {images.map((_: string, i: number) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                style={liquidGlassStyle}
                className={`rounded-full transition-all duration-500 overflow-hidden ${
                  activeSlide === i
                    ? "w-3 h-3 shadow-[0_0_8px_rgba(255,255,255,0.8)] opacity-100 scale-110"
                    : "w-2.5 h-2.5 opacity-50"
                }`}
              />
            ))}
          </div>

          {/* Thumbnail Navigation — Tablet/iPad Portrait Only */}
          <div 
            className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-3 p-3 rounded-[24px]"
            style={liquidGlassStyle}
          >
            {images.map((imgSrc: string, i: number) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`relative h-14 w-14 overflow-hidden rounded-xl bg-black/5 transition-all duration-300 ${
                  activeSlide === i 
                    ? "border-2 border-white opacity-100 shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-100" 
                    : "border-2 border-transparent opacity-50 hover:opacity-80 scale-95"
                }`}
              >
                <img src={imgSrc} alt={`View ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

        </>
      ) : (
        /* Desktop/Tablet: Cinematic Vertical Scroll */
        <>
          <div className="relative w-full z-10">
            {images.map((imgSrc: string, i: number) => (
              <CinematicSlide
                key={i}
                imgSrc={imgSrc}
                alt={`${product?.name || "Product"} view ${i + 1}`}
                index={i}
                onVisible={() => setActiveSlide(i)}
              />
            ))}
          </div>

          {/* Desktop Thumbnail Navigation */}
          <div 
            className="fixed left-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3 p-3 rounded-[24px]"
            style={liquidGlassStyle}
          >
            {images.map((imgSrc: string, i: number) => (
              <button
                key={i}
                onClick={() => {
                  window.scrollTo({ top: i * window.innerHeight, behavior: "smooth" });
                }}
                className={`relative h-16 w-16 overflow-hidden rounded-xl bg-black/5 transition-all duration-300 ${
                  activeSlide === i 
                    ? "border-2 border-white opacity-100 shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-100" 
                    : "border-2 border-transparent opacity-50 hover:opacity-80 scale-95"
                }`}
              >
                <img src={imgSrc} alt={`View ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </>
      )}
      <motion.div
        drag={!isDesktop ? "y" : false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        animate={{ y: !isDesktop ? (isExpanded ? 0 : "65%") : 0 }}
        transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
        className="fixed z-40 w-full md:w-[80vw] md:max-w-[500px] 
                   bottom-0 inset-x-0 rounded-t-[32px] pb-12 pt-3 px-6
                   md:left-1/2 md:-translate-x-1/2 md:p-6 md:pb-12
                   lg:bottom-10 lg:left-auto lg:right-10 lg:translate-x-0 lg:rounded-[24px] lg:pb-6"
        style={{
          ...liquidGlassStyle,
          touchAction: "none"
        }}
      >
        {/* Drag Handle (Mobile & Tablet Only) */}
        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-white/40 lg:hidden" />

        <div className="mb-6">
          <h1 className="text-lg font-black tracking-[0.05em] text-white sm:text-xl md:text-2xl">
            {product.name}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
              {product.description}
              <br />[ + ]
            </p>
          </div>

          <div className="mb-6 space-y-5 font-mono text-xs sm:text-sm">
            {/* Color */}
            <div>
              <div className="mb-2 tracking-widest text-white/70">COLOR [ {product.color} ]</div>
              <div className="flex gap-2">
                {colorVariants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => {
                      if (variant.id !== product.id) {
                        navigate({ search: { id: variant.id }, replace: false });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`h-4 w-4 rounded-full ring-1 ring-offset-2 ring-offset-transparent transition-all ${
                      variant.id === product.id ? "ring-white" : "ring-white/30 hover:ring-white/80 cursor-pointer"
                    }`}
                    style={{ background: COLOR_MAP[variant.color] || "#888" }}
                    title={variant.color}
                    aria-label={`Select color ${variant.color}`}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            {!product.name.includes("BEANIE") && !product.name.includes("CASE") && (
              <div>
                <div className="mb-2 tracking-widest text-white/70">SIZE [ {selectedSize} ]</div>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex h-8 min-w-[32px] items-center justify-center rounded px-2 text-xs transition-all sm:h-9 sm:min-w-[36px] sm:text-sm ${
                        selectedSize === size
                          ? "bg-white font-bold text-black"
                          : "font-medium text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mb-6 flex items-center justify-between border-t border-white/20 pt-5 font-mono text-[10px] uppercase tracking-widest text-white/60 sm:text-xs">
            <span>Ships in 2-3 weeks</span>
            {!product.name.includes("BEANIE") && !product.name.includes("CASE") && (
              <button 
                onClick={() => setIsSizingOpen(true)}
                className="underline decoration-white/30 hover:text-white"
              >
                View Sizing Info
              </button>
            )}
          </div>

          <button
            onClick={() => {
              const numericPrice = parseInt(product.price.replace(/[^\d]/g, ""), 10) || 0;
              addToCart({
                productId: product.id,
                name: product.name,
                color: product.color,
                colorHex: COLOR_MAP[product.color] || "#888",
                size: (product.name.includes("BEANIE") || product.name.includes("CASE")) ? "OS" : selectedSize,
                price: numericPrice,
                image: product.src,
              });
            }}
            className="flex w-full items-center justify-between rounded-xl px-6 py-4 text-xs font-bold tracking-widest text-[#334b5c] transition-all duration-300 hover:opacity-90 active:scale-[0.98] sm:text-sm"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(230,230,230,0.85) 100%)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15), inset 0 2px 2px rgba(255,255,255,1)",
            }}
          >
            <span>ADD TO CART</span>
            <span>{product.price}</span>
          </button>
      </motion.div>
      <AnimatePresence>
        {isSizingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizingOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl rounded-[24px] p-6 sm:p-8 text-white overflow-hidden shadow-2xl"
              style={liquidGlassStyle}
            >
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-sm sm:text-base font-bold tracking-widest uppercase">
                  {product.name.split(" / ")[0]} (SIZE GUIDE)
                </h2>
                <button onClick={() => setIsSizingOpen(false)} className="text-white/70 hover:text-white transition-colors">
                  <span aria-hidden className="text-2xl font-light leading-none">&times;</span>
                </button>
              </div>
              
              <div className="overflow-x-auto pb-2">
                <table className="w-full text-left border-collapse font-mono text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-white/30">
                      <th className="p-3 sm:p-4 font-medium"></th>
                      <th className="p-3 sm:p-4 font-bold text-center border-l border-white/30">XS</th>
                      <th className="p-3 sm:p-4 font-bold text-center border-l border-white/30">S</th>
                      <th className="p-3 sm:p-4 font-bold text-center border-l border-white/30">M</th>
                      <th className="p-3 sm:p-4 font-bold text-center border-l border-white/30">L</th>
                      <th className="p-3 sm:p-4 font-bold text-center border-l border-white/30">XL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.name.includes("HOODIE") ? (
                      <>
                        <tr className="border-b border-white/30">
                          <td className="p-3 sm:p-4 tracking-widest text-white/90 font-medium">HIGH POINT TO HEM</td>
                          <td className="p-3 sm:p-4 text-center border-l border-white/30">23.5"</td>
                          <td className="p-3 sm:p-4 text-center border-l border-white/30">24.5"</td>
                          <td className="p-3 sm:p-4 text-center border-l border-white/30">25.5"</td>
                          <td className="p-3 sm:p-4 text-center border-l border-white/30">26.5"</td>
                          <td className="p-3 sm:p-4 text-center border-l border-white/30">27.5"</td>
                        </tr>
                        <tr>
                          <td className="p-3 sm:p-4 tracking-widest text-white/90 font-medium">CHEST</td>
                          <td className="p-3 sm:p-4 text-center border-l border-white/30">24.5"</td>
                          <td className="p-3 sm:p-4 text-center border-l border-white/30">25.25"</td>
                          <td className="p-3 sm:p-4 text-center border-l border-white/30">26"</td>
                          <td className="p-3 sm:p-4 text-center border-l border-white/30">27"</td>
                          <td className="p-3 sm:p-4 text-center border-l border-white/30">28"</td>
                        </tr>
                      </>
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-white/60 tracking-widest uppercase">
                          Size guide for this product will be added soon
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
        </>
      )}
    </main>
  );
}

function CinematicSlide({ imgSrc, alt, index, onVisible }: { imgSrc: string; alt: string; index: number, onVisible?: () => void }) {
  return (
    <div className="relative flex h-screen w-full items-center justify-center lg:pr-[480px]">
      <motion.div
        initial={{ scale: 0.85, opacity: 0, filter: "blur(20px)", y: 100 }}
        whileInView={{ scale: 1, opacity: 1, filter: "blur(0px)", y: 0 }}
        onViewportEnter={onVisible}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center justify-center w-full h-full"
      >
        <img
          src={imgSrc}
          alt={alt}
          loading={index === 0 ? "eager" : "lazy"}
          className="max-h-[70vh] w-auto max-w-[90vw] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          style={{
            animation: "float 6s ease-in-out infinite",
            animationDelay: `${index * 0.5}s`,
          }}
        />
      </motion.div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  );
}
