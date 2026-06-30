import { motion } from "framer-motion";

const phases = [
  { n: "01", t: "Discover", when: "Week 1", d: "Align on goals, constraints, success metrics, and risks." },
  { n: "02", t: "Plan", when: "Week 2", d: "Strategy, scope, architecture, and sprint milestones." },
  { n: "03", t: "Build", when: "Weeks 3–8", d: "Transparent sprints with working demos every Friday." },
  { n: "04", t: "Launch", when: "Weeks 9–10", d: "Hardened releases, evaluation gates, documented rollback." },
  { n: "05", t: "Operate", when: "Ongoing", d: "Metric reviews, iteration, and SLA-backed support." },
];

export default function Process() {
  return (
    <section id="process" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] uppercase text-muted-foreground"
          >
            How we work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-display text-4xl md:text-6xl font-semibold tracking-tight"
          >
            Five phases.<br />
            <span className="text-gradient">Measured every Friday.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {phases.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass glass-hover rounded-3xl p-6 flex flex-col h-full"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-3xl font-semibold text-gradient">{p.n}</span>
                <span className="text-[10px] tracking-widest uppercase text-muted-foreground">{p.when}</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
