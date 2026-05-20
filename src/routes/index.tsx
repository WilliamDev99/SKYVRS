import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { FloatingProduct } from "@/components/FloatingProduct";
import { GrainOverlay } from "@/components/GrainOverlay";
import beanieLime from "@/assets/products/beanie-lime.png";
import beanieIris from "@/assets/products/beanie-iris.png";
import hoodieSky from "@/assets/products/hoodie-sky.png";
import hoodieLime from "@/assets/products/hoodie-lime.png";
import sweatpantsLavender from "@/assets/products/sweatpants-lavender.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUMVO — Essentials From Above" },
      {
        name: "description",
        content:
          "LUMVO essentials. Garment-dyed hoodies, beanies, and sweatpants in lime, iris, and sky.",
      },
      { property: "og:title", content: "LUMVO — Essentials From Above" },
      {
        property: "og:description",
        content: "Floating shop of garment-dyed essentials.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  return (
    <main
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: "var(--gradient-sky)" }}
    >
      <GrainOverlay />
      <Header cartCount={0} />

      {/* Floating products */}
      <div className="relative h-screen w-full">
        <FloatingProduct
          src={beanieLime}
          alt="Lime beanie"
          name="BEANIE / LIME"
          price="IDR 761,000"
          top="22%"
          left="6%"
          width={180}
          depth={0.4}
          delay={0}
          rotate={-6}
        />
        <FloatingProduct
          src={beanieIris}
          alt="Iris beanie"
          name="BEANIE / IRIS"
          price="IDR 761,000"
          top="14%"
          left="44%"
          width={170}
          depth={0.6}
          delay={1.2}
          rotate={4}
        />
        <FloatingProduct
          src={hoodieSky}
          alt="Sky hoodie"
          name="HOODIE / SKY"
          price="IDR 2,450,000"
          top="32%"
          left="74%"
          width={280}
          depth={0.5}
          delay={2}
          rotate={-3}
        />
        <FloatingProduct
          src={hoodieLime}
          alt="Lime hoodie"
          name="HOODIE / LIME"
          price="IDR 2,450,000"
          top="46%"
          left="32%"
          width={340}
          depth={0.7}
          delay={0.6}
          rotate={2}
        />
        <FloatingProduct
          src={sweatpantsLavender}
          alt="Lavender sweatpants"
          name="SWEATPANTS / IRIS"
          price="IDR 1,890,000"
          top="50%"
          left="66%"
          width={220}
          depth={0.55}
          delay={1.6}
          rotate={5}
        />
      </div>

      {/* Bottom corner caption */}
      <div className="pointer-events-none fixed bottom-6 left-6 z-30 font-mono text-[10px] tracking-[0.3em] text-foreground/70 md:bottom-8 md:left-10">
        SS26 · DROP 01 · ESSENTIALS FROM ABOVE
      </div>
      <div className="pointer-events-none fixed bottom-6 right-6 z-30 font-mono text-[10px] tracking-[0.3em] text-foreground/70 md:bottom-8 md:right-10">
        ◇ SCROLL · CLICK · COLLECT
      </div>
    </main>
  );
}
