import { useState } from "react";

const NAV = ["SHOP", "CONTACT", "POLICIES", "WALLPAPERS", "IG"];

export function Header({ cartCount = 0 }: { cartCount?: number }) {
  const [open, setOpen] = useState(true);

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-start justify-between gap-3 px-3 py-3 sm:px-6 sm:py-5 md:px-10 md:py-7">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
        {/* Logo pill */}
        <a
          href="#"
          aria-label="LUMVO home"
          className="rounded-full px-4 py-2 text-sm font-semibold tracking-[0.3em] text-foreground/90 backdrop-blur-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-6 sm:py-2.5 sm:text-base sm:tracking-[0.35em] md:px-8 md:py-3 md:text-lg"
          style={{
            background:
              "linear-gradient(180deg, oklch(1 0 0 / 0.35) 0%, oklch(1 0 0 / 0.08) 50%, oklch(1 0 0 / 0.18) 100%)",
            boxShadow:
              "inset 0 1px 0 oklch(1 0 0 / 0.45), inset 0 -1px 0 oklch(0 0 0 / 0.15), 0 8px 24px -8px oklch(0 0 0 / 0.3)",
          }}
        >
          LUMVO
        </a>

        {/* Nav pill */}
        {open && (
          <nav
            aria-label="Primary"
            className="flex items-center gap-3 rounded-full px-3 py-2 text-[10px] font-medium tracking-[0.2em] text-foreground/90 backdrop-blur-md sm:gap-4 sm:px-5 sm:py-2.5 sm:text-[11px] sm:tracking-[0.22em] md:gap-5 md:px-6 md:py-3 md:text-xs"
            style={{
              background:
                "linear-gradient(180deg, oklch(1 0 0 / 0.3) 0%, oklch(1 0 0 / 0.06) 50%, oklch(1 0 0 / 0.16) 100%)",
              boxShadow:
                "inset 0 1px 0 oklch(1 0 0 / 0.4), inset 0 -1px 0 oklch(0 0 0 / 0.12), 0 8px 24px -8px oklch(0 0 0 / 0.3)",
            }}
          >
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full border border-foreground/30 text-[10px]"
              aria-label={`${cartCount} items in cart`}
            >
              {cartCount}
            </span>
            {NAV.map((item) => (
              <a
                key={item}
                href="#"
                className="rounded-sm outline-none transition-opacity hover:opacity-60 focus-visible:opacity-60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {item}
              </a>
            ))}
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
              className="ml-1 rounded-full text-foreground/70 outline-none transition-opacity hover:opacity-60 focus-visible:opacity-60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span aria-hidden>◇</span>
            </button>
          </nav>
        )}

        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            className="rounded-full px-4 py-2.5 text-xs tracking-[0.22em] backdrop-blur-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            style={{
              background:
                "linear-gradient(180deg, oklch(1 0 0 / 0.3) 0%, oklch(1 0 0 / 0.08) 100%)",
            }}
          >
            <span aria-hidden>☰</span>
          </button>
        )}
      </div>

      <div
        className="font-mono text-[10px] tracking-[0.22em] text-foreground/85 sm:text-[11px] sm:tracking-[0.25em] md:text-xs"
        aria-label="Region: RPIDR"
      >
        [ RPIDR ]
      </div>
    </header>
  );
}
