import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section id="contact" className="relative py-40 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-radial)" }} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="glass rounded-3xl p-10 md:p-16 text-center">
          <h2 className="font-display text-5xl md:text-7xl font-semibold tracking-tight">
            Let's build the<br /><span className="text-gradient">next thing.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            We take on a handful of partners each quarter. Tell us what you're building.
          </p>
          <a href="mailto:hello@zerotheorys.com" className="mt-10 inline-flex items-center gap-2 rounded-full px-8 py-4 bg-foreground text-background font-medium hover:opacity-90 transition">
            hello@zerotheorys.com →
          </a>
        </div>
      </motion.div>

      <footer className="mt-32 max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple" />
          Zero Theorys © 2026
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition">Twitter</a>
          <a href="#" className="hover:text-foreground transition">Instagram</a>
          <a href="#" className="hover:text-foreground transition">LinkedIn</a>
        </div>
      </footer>
    </section>
  );
}
