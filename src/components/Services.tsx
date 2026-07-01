import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  Bot,
  Code2,
  Globe,
  TrendingUp,
  Headphones,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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
    title: "Graphic Design Solutions",
    desc: "High-impact branding, UI/UX, marketing collaterals, and digital-first visual identities engineered for scale.",
    tag: "06 / Identity",
  },
];

export default function Services() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = gsap.utils.toArray<HTMLElement>(grid.querySelectorAll("[data-service-card]"));
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        // alternate sides: even from left, odd from right
        const fromLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          {
            x: fromLeft ? -260 : 260,
            y: 40,
            rotate: fromLeft ? -6 : 6,
            opacity: 0,
            filter: "blur(8px)",
          },
          {
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 1,
            filter: "blur(0px)",
            ease: "power3.out",
            duration: 1.1,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 45%",
              scrub: 0.6,
            },
          },
        );
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="relative py-32 px-6 overflow-hidden">
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
            Six disciplines.
            <br />
            <span className="text-gradient">One accountable partner.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground max-w-xl"
          >
            Replace three vendors with one studio that owns the strategy, the build, the growth, and the round-the-clock
            operations.
          </motion.p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((s, i) => (
            <div
              key={s.title}
              data-service-card
              data-side={i % 2 === 0 ? "left" : "right"}
              className="glass glass-hover rounded-3xl p-8 flex flex-col will-change-transform"
            >
              <div className="flex justify-between items-start">
                <div className="size-12 rounded-2xl glass flex items-center justify-center">
                  <s.icon className="size-5 text-foreground" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] tracking-widest uppercase text-muted-foreground">{s.tag}</span>
              </div>
              <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
