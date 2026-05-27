import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { GrainOverlay } from "@/components/GrainOverlay";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "SKYVRS — Contact" },
      {
        name: "description",
        content: "Get in touch with SKYVRS. Send us your questions, order inquiries, and messages.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [email, setEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setEmail("");
    setOrderNumber("");
    setMessage("");
  };

  const glassInput: React.CSSProperties = {
    background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "12px",
    boxShadow: "inset 0 1px 2px rgba(255,255,255,0.5), inset 0 -1px 1px rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.05)",
    padding: "16px 20px",
    color: "white",
    fontSize: "12px",
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: 600,
    letterSpacing: "0.15em",
    outline: "none",
    width: "100%",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  };

  const glassInputFocus: React.CSSProperties = {
    borderColor: "rgba(255,255,255,0.8)",
    background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)",
    boxShadow: "inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -1px 2px rgba(255,255,255,0.2), 0 0 12px rgba(255,255,255,0.3)",
  };

  return (
    <main
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background: `radial-gradient(
          ellipse 90% 70% at 75% 95%,
          oklch(0.86 0.06 305) 0%,
          transparent 55%
        ),
        radial-gradient(
          ellipse 120% 80% at 50% 0%,
          oklch(0.82 0.09 235) 0%,
          transparent 60%
        ),
        linear-gradient(
          180deg,
          oklch(0.55 0.12 240) 0%,
          oklch(0.25 0.08 252) 55%,
          oklch(0.18 0.06 255) 100%
        )`,
      }}
    >
      <GrainOverlay />
      <Header />

      {/* Contact Form Card */}
      <div className="flex min-h-screen items-center justify-center px-4 pt-24 pb-12">
        <div
          className="w-full max-w-md rounded-[32px] p-8 sm:p-10"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.15) 100%)",
            border: "1px solid rgba(255,255,255,0.3)",
            backdropFilter: "blur(40px) saturate(1.5)",
            WebkitBackdropFilter: "blur(40px) saturate(1.5)",
            boxShadow: "0 32px 64px rgba(0,0,0,0.15), inset 0 2px 1px rgba(255,255,255,0.7), inset 0 -1px 1px rgba(255,255,255,0.2), inset 0 0 40px rgba(255,255,255,0.15)",
          }}
        >
          {/* Title */}
          <h1
            className="mb-8 text-lg font-black tracking-[0.25em] text-white sm:text-xl"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            CONTACT
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <input
              type="email"
              required
              placeholder="EMAIL*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={glassInput}
              onFocus={(e) => Object.assign(e.target.style, glassInputFocus)}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.3)";
                e.target.style.boxShadow = "inset 0 1px 2px rgba(255,255,255,0.5), inset 0 -1px 1px rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.05)";
                e.target.style.background = "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)";
              }}
              className="placeholder-white/50"
            />

            {/* Order Number */}
            <input
              type="text"
              placeholder="ORDER NUMBER"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              style={glassInput}
              onFocus={(e) => Object.assign(e.target.style, glassInputFocus)}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.3)";
                e.target.style.boxShadow = "inset 0 1px 2px rgba(255,255,255,0.5), inset 0 -1px 1px rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.05)";
                e.target.style.background = "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)";
              }}
              className="placeholder-white/50"
            />

            {/* Message */}
            <textarea
              required
              placeholder="MESSAGE..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              style={{ ...glassInput, resize: "none" }}
              onFocus={(e) => Object.assign(e.target.style, glassInputFocus)}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.3)";
                e.target.style.boxShadow = "inset 0 1px 2px rgba(255,255,255,0.5), inset 0 -1px 1px rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.05)";
                e.target.style.background = "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)";
              }}
              className="placeholder-white/50"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 w-full rounded-full py-4 text-sm font-bold tracking-[0.25em] text-[#334b5c] transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(230,230,230,0.85) 100%)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15), inset 0 2px 2px rgba(255,255,255,1)",
              }}
            >
              {submitted ? "SENT ✓" : "SUBMIT"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
