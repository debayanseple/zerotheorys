import { motion } from "framer-motion";

const stats = [
  { v: "99.98%", l: "Uptime · trailing 90 days" },
  { v: "97.4%", l: "AI eval pass rate" },
  { v: "6–10w", l: "First AI pilot to production" },
  { v: "−42%", l: "Avg. model spend by week 4" },
  { v: "4.8/5", l: "CSAT · last 12 months" },
  { v: "24/7", l: "Kolkata · London · NYC" },
];

export default function Stats() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8 text-center"
        >
          By the numbers
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-3xl p-8 md:p-10"
            >
              <div className="font-display text-3xl md:text-5xl font-semibold text-gradient">
                {s.v}
              </div>
              <div className="mt-3 text-xs md:text-sm text-muted-foreground tracking-wide">
                {s.l}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
