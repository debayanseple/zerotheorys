import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import heroImage from "@/assets/hero-design.svg";

const stats = [
  { value: "99.98%", label: "Uptime · 90d" },
  { value: "6–10w", label: "Pilot to prod" },
  { value: "4.8/5", label: "CSAT · 12mo" },
  { value: "24/7", label: "Global ops" },
];

export default function Hero() {
  const [visible, setVisible] = useState(true);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setVisible(rect.bottom > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-radial)" }} />

      {/* Floating hero image — top-right, small, hover-reactive, hides on scroll */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
        transition={{ duration: 0.4 }}
        className="fixed top-20 right-6 z-30 pointer-events-auto hidden md:block"
      >
        <div className="group relative cursor-pointer">
          <img
            src={heroImage}
            alt="Zero Theorys hero illustration"
            draggable={false}
            className="w-20 h-auto object-contain mix-blend-screen select-none transition-transform duration-300 ease-out group-hover:scale-110"
            style={{
              filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))",
            }}
            width={200}
            height={150}
          />
          <div
            className="absolute inset-0 -z-10 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-70"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, oklch(0.68 0.27 300 / 0.5), transparent 70%)",
            }}
          />
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-16 md:pt-40 lg:pt-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-neon-blue animate-pulse" />
              AI · Engineering · Growth · 24/7 Ops
            </span>

            <h1
              className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]"
              style={{ textShadow: "0 4px 16px rgba(0,0,0,0.6)" }}
            >
              Software, AI and growth.
              <br />
              <span
                className="text-gradient"
                style={{ textShadow: "0 0 20px rgba(168,85,247,0.6)" }}
              >
                Engineered as one.
              </span>
            </h1>

            <p
              className="mt-6 max-w-lg text-lg text-foreground/90 leading-relaxed"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
            >
              Zero Theorys integrates AI, software engineering, performance
              marketing, and 24/7 operations into a single accountable team for
              ambitious companies.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#services"
                className="rounded-full px-7 py-3 bg-foreground text-background font-medium hover:opacity-90 transition"
              >
                Start a build
              </a>
              <a
                href="#work"
                className="glass rounded-full px-7 py-3 font-medium hover:bg-white/5 transition"
              >
                See growth case studies →
              </a>
            </div>
          </motion.div>

          {/* Right column — image merged into background, no card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative"
          >
            <img
              src={heroImage}
              alt="Zero Theorys hero illustration"
              className="w-full h-auto object-contain mix-blend-screen"
              style={{
                filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.5))",
              }}
              width={1200}
              height={800}
            />
            {/* subtle glow behind image */}
            <div
              className="absolute -inset-4 -z-10 rounded-3xl opacity-50 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, oklch(0.68 0.27 300 / 0.35), transparent 70%)",
              }}
            />
          </motion.div>

        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-3xl"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-display font-bold tracking-tight">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground tracking-widest uppercase"
      >
        Scroll
      </motion.div>
    </section>
  );
}
