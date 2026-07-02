import { motion } from "framer-motion";
import heroImage from "@/assets/hero-design.svg";
import CountUp from "@/components/CountUp";

const stats = [
  { value: "99.98%", label: "Uptime · 90d" },
  { value: "6–10w", label: "Pilot to prod" },
  { value: "4.8/5", label: "CSAT · 12mo" },
  { value: "24/7", label: "Global ops" },
];

export default function Hero() {
  return (
  <section id="hero" className="relative w-full overflow-hidden" style={{ background: "#0a0514" }}>
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(139,92,246,0.35), transparent 60%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(88,28,135,0.4), transparent 70%), linear-gradient(180deg, #0a0514 0%, #150829 50%, #0a0514 100%)",
        }}
      />


      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-10 md:pt-20 lg:pt-20 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
              className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]"
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
              className="mt-5 max-w-lg text-base md:text-lg text-foreground/90 leading-relaxed"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
            >
              Zero Theorys integrates AI, software engineering, performance
              marketing, and 24/7 operations into a single accountable team for
              ambitious companies.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
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

          {/* Right column — hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <img
              src={heroImage}
              alt="Zero Theorys hero illustration"
              draggable={false}
              className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto object-contain select-none"
              style={{
                filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.5))",
              }}
            />
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-3xl"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-display font-bold tracking-tight">
                <CountUp value={stat.value} />
              </div>
              <div className="mt-1 text-xs text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
