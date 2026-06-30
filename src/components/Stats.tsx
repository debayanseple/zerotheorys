import { motion } from "framer-motion";

const stats = [
  { v: "40+", l: "Shipped products" },
  { v: "12", l: "Industries served" },
  { v: "99%", l: "Client retention" },
  { v: "∞", l: "Iterations" },
];

export default function Stats() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px glass rounded-3xl overflow-hidden">
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="p-8 md:p-12 glass"
          >
            <div className="font-display text-4xl md:text-6xl font-semibold text-gradient">{s.v}</div>
            <div className="mt-2 text-sm text-muted-foreground tracking-wide">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
