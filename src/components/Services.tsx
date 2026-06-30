import { motion } from "framer-motion";
import { Sparkles, Bot, Code2, Globe, TrendingUp, Headphones } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "AI Solutions",
    desc: "Production-grade AI products, copilots, and automation integrated into your existing stack.",
    tag: "01 / Intelligence",
  },
  {
    icon: Bot,
    title: "AI Agents & Automation",
    desc: "Autonomous and human-in-the-loop workflows that compound output across every team.",
    tag: "02 / Autonomy",
  },
  {
    icon: Code2,
    title: "Software Development",
    desc: "Custom software, SaaS platforms, and internal tools shipped by senior engineers.",
    tag: "03 / Systems",
  },
  {
    icon: Globe,
    title: "Website Development",
    desc: "High-performance, conversion-focused websites optimized for speed, SEO, and revenue.",
    tag: "04 / Surfaces",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    desc: "Full-funnel strategies — SEO, paid, content, lifecycle — that turn audiences into revenue.",
    tag: "05 / Growth",
  },
  {
    icon: Headphones,
    title: "BPO & Outsourcing",
    desc: "24/7 customer support, back-office, and process operations across Kolkata, London & NYC.",
    tag: "06 / Operations",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] uppercase text-muted-foreground"
          >
            What we do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-display text-4xl md:text-6xl font-semibold tracking-tight"
          >
            Six disciplines.<br />
            <span className="text-gradient">One accountable partner.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground max-w-xl"
          >
            Replace three vendors with one studio that owns the strategy, the
            build, the growth, and the round-the-clock operations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              className="glass glass-hover rounded-3xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-start">
                <div className="size-12 rounded-2xl glass flex items-center justify-center">
                  <s.icon className="size-5 text-foreground" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] tracking-widest uppercase text-muted-foreground">
                  {s.tag}
                </span>
              </div>
              <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
