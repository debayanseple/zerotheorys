import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(92vw,1100px)]"
    >
      <div className="glass rounded-full px-6 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-display font-semibold tracking-tight">
          <span className="size-2 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple shadow-[0_0_12px_var(--neon-purple)]" />
          Zero Theorys
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#services" className="hover:text-foreground transition">Services</a>
          <a href="#work" className="hover:text-foreground transition">Work</a>
          <a href="#about" className="hover:text-foreground transition">About</a>
          <a href="#contact" className="hover:text-foreground transition">Contact</a>
        </div>
        <a href="#contact" className="text-sm rounded-full px-4 py-2 bg-foreground text-background font-medium hover:opacity-90 transition">
          Start project
        </a>
      </div>
    </motion.nav>
  );
}
