import { useState } from "react";

const NAV = ["SHOP", "CONTACT", "POLICIES", "WALLPAPERS", "IG"];

export function Header({ cartCount = 0 }: { cartCount?: number }) {
  const [open, setOpen] = useState(true);

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-start justify-between px-6 py-5 md:px-10 md:py-7">
      <div className="flex items-center gap-3 md:gap-4">
        {/* Logo pill */}
        <div className="relative">
          <div
            className="rounded-full px-6 py-2.5 text-base font-semibold tracking-[0.35em] text-foreground/90 backdrop-blur-md md:px-8 md:py-3 md:text-lg"
            style={{
              background:
                "linear-gradient(180deg, oklch(1 0 0 / 0.35) 0%, oklch(1 0 0 / 0.08) 50%, oklch(1 0 0 / 0.18) 100%)",
              boxShadow:
                "inset 0 1px 0 oklch(1 0 0 / 0.45), inset 0 -1px 0 oklch(0 0 0 / 0.15), 0 8px 24px -8px oklch(0 0 0 / 0.3)",
            }}
          >
            LUMVO
          </div>
        </div>

        {/* Nav pill */}
        {open && (
          <nav
            className="flex items-center gap-4 rounded-full px-5 py-2.5 text-[11px] font-medium tracking-[0.22em] text-foreground/90 backdrop-blur-md md:gap-5 md:px-6 md:py-3 md:text-xs"
            style={{
              background:
                "linear-gradient(180deg, oklch(1 0 0 / 0.3) 0%, oklch(1 0 0 / 0.06) 50%, oklch(1 0 0 / 0.16) 100%)",
              boxShadow:
                "inset 0 1px 0 oklch(1 0 0 / 0.4), inset 0 -1px 0 oklch(0 0 0 / 0.12), 0 8px 24px -8px oklch(0 0 0 / 0.3)",
            }}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-foreground/30 text-[10px]">
              {cartCount}
            </span>
            {NAV.map((item) => (
              <a
                key={item}
                href="#"
                className="transition-opacity hover:opacity-60"
              >
                {item}
              </a>
            ))}
            <button
              aria-label="Close nav"
              onClick={() => setOpen(false)}
              className="ml-1 text-foreground/70 transition-opacity hover:opacity-60"
            >
              ◇
            </button>
          </nav>
        )}

        {!open && (
          <button
            onClick={() => setOpen(true)}
            aria-label="Open nav"
            className="rounded-full px-4 py-2.5 text-xs tracking-[0.22em] backdrop-blur-md"
            style={{
              background:
                "linear-gradient(180deg, oklch(1 0 0 / 0.3) 0%, oklch(1 0 0 / 0.08) 100%)",
            }}
          >
            ☰
          </button>
        )}
      </div>

      <div className="font-mono text-[11px] tracking-[0.25em] text-foreground/85 md:text-xs">
        [ RPIDR ]
      </div>
    </header>
  );
}
