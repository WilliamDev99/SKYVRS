import { useState, useEffect, useRef } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { FloatingProduct } from "@/components/FloatingProduct";
import { GrainOverlay } from "@/components/GrainOverlay";
import { ProductPanel } from "@/components/ProductPanel";
import { MobileProductCard } from "@/components/MobileProductCard";
import { useProducts, type Product } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SKYVRS — Essentials From Above" },
      {
        name: "description",
        content:
          "SKYVRS essentials. Garment-dyed hoodies, beanies, and sweatpants in lime, iris, and sky.",
      },
      { property: "og:title", content: "SKYVRS — Essentials From Above" },
      {
        property: "og:description",
        content: "Floating shop of garment-dyed essentials.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [bgGradient, setBgGradient] = useState("var(--gradient-sky)");
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    name: string;
    price: string;
    color: string;
    description: string;
  } | null>(null);

  const { data: products = [] } = useProducts();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const navigate = useNavigate();

  const selectProduct = (p: Product) => {
    navigate({ to: "/product", search: { id: p.id } });
  };

  return (
    <main
      className="relative w-full transition-all duration-700 ease-in-out"
      style={{ background: bgGradient }}
    >
      <ProductPanel product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      
      <GrainOverlay />
      <Header />

      {isMobile ? (
        /* ── MOBILE: vertical scroll, one product per screen ── */
        <div className="flex flex-col pb-20 pt-20">
          {products.map((p, i) => (
            <MobileProductCard
              key={i}
              src={p.src}
              alt={p.name}
              name={p.name}
              price={p.price}
              gradient={p.gradient}
              onClick={() => selectProduct(p)}
              onVisible={() => setBgGradient(p.gradient)}
            />
          ))}
        </div>
      ) : (
        /* ── DESKTOP & TABLET: scattered collage layout ── */
        <div className="relative min-h-[350vh] w-full overflow-hidden">
          {products.map((p, i) => (
            <FloatingProduct
              key={i}
              src={p.src}
              alt={p.name}
              name={p.name}
              price={p.price}
              top={p.top}
              left={p.left}
              mobileTop={p.mobileTop}
              mobileLeft={p.mobileLeft}
              width={p.width}
              mobileWidth={p.mobileWidth}
              depth={p.depth}
              delay={p.delay}
              rotate={p.rotate}
              onHoverChange={(h) => setBgGradient(h ? p.hoverGradient : "var(--gradient-sky)")}
              onClick={() => selectProduct(p)}
            />
          ))}
        </div>
      )}


    </main>
  );
}
