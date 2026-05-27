import { useEffect, useState } from "react";

interface ProductPanelProps {
  product: {
    name: string;
    price: string;
    color: string;
    description: string;
  } | null;
  onClose: () => void;
}

export function ProductPanel({ product, onClose }: ProductPanelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (product) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [product]);

  if (!product && !isVisible) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-background/20 backdrop-blur-[2px] transition-opacity duration-500 ${isVisible && product ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div 
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-[420px] transform border-l border-foreground/10 p-6 sm:p-10 transition-transform duration-700 cubic-bezier(0.2, 0.8, 0.2, 1) ${isVisible && product ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          background: "linear-gradient(220deg, oklch(1 0 0 / 0.15) 0%, oklch(1 0 0 / 0.05) 100%)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "-10px 0 40px rgba(0,0,0,0.1)",
        }}
      >
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 sm:right-10 sm:top-10 flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 text-foreground/80 transition-all hover:bg-foreground hover:text-background"
        >
          <span className="sr-only">Close</span>
          [ x ]
        </button>

        <div className="mt-16 sm:mt-24 flex flex-col gap-8 h-full">
          <div>

            <h2 className="text-3xl font-medium tracking-tight text-foreground/90 uppercase">
              {product?.name.split('/')[0].trim()}
            </h2>
            <h3 className="text-xl font-medium text-foreground/70 uppercase">
              {product?.name.split('/')[1]?.trim() || product?.name}
            </h3>
          </div>

          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-foreground/80">
              {product?.description || "Garment-dyed heavyweight essential. Custom milled fabric with a relaxed, boxy fit. Floating through space."}
            </p>
          </div>

          <div className="space-y-4 mt-4">
            <p className="font-mono text-[10px] tracking-[0.2em] text-foreground/60">
              [ SELECT SIZE ]
            </p>
            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL'].map(size => (
                <button 
                  key={size}
                  className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-sm border border-foreground/20 font-mono text-sm transition-all hover:bg-foreground/10 focus-visible:bg-foreground focus-visible:text-background"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto pb-10">
            <button className="w-full flex items-center justify-between rounded-sm bg-foreground px-6 py-4 text-background transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <span className="font-mono text-xs tracking-widest font-semibold uppercase">
                Add to Cart
              </span>
              <span className="font-mono text-[11px] tracking-widest opacity-80">
                [ {product?.price} ]
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
