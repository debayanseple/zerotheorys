import { motion } from "framer-motion";
import HeroScene from "./three/HeroScene";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden noise-grid">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-radial)" }} />
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-40 pb-24 md:pt-56">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl pointer-events-none"
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground pointer-events-auto">
            <span className="size-1.5 rounded-full bg-neon-blue animate-pulse" />
            Digital agency · est. 2024
          </span>
          <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.95]">
            Engineering the<br />
            <span className="text-gradient">improbable.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Zero Theorys is a creative engineering studio crafting software, web, brand and growth systems for ambitious teams.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 pointer-events-auto">
            <a href="#services" className="rounded-full px-6 py-3 bg-foreground text-background font-medium hover:opacity-90 transition">
              Explore services
            </a>
            <a href="#work" className="glass rounded-full px-6 py-3 font-medium hover:bg-white/5 transition">
              View work →
            </a>
          </div>
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
