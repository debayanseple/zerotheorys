import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
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
        // alternate sides: even from left, odd from right — arc into place
        const fromLeft = i % 2 === 0;
        const dir = fromLeft ? -1 : 1;

        // Motion path: start far off to the side and below, arc up & inward
        const path = [
          { x: dir * 620, y: 260, rotate: dir * -35 },
          { x: dir * 380, y: 40, rotate: dir * -18 },
          { x: dir * 160, y: -30, rotate: dir * -6 },
          { x: 0, y: 0, rotate: 0 },
        ];

        gsap.set(card, {
          x: path[0].x,
          y: path[0].y,
          rotate: path[0].rotate,
          opacity: 0,
          filter: "blur(10px)",
          transformOrigin: "50% 50%",
        });

        gsap.to(card, {
          motionPath: {
            path,
            curviness: 1.5,
            autoRotate: false,
          },
          rotate: 0,
          opacity: 1,
          filter: "blur(0px)",
          ease: "power3.out",
          duration: 1.4,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 40%",
            scrub: 0.8,
          },
        });
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
