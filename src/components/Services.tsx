import { useEffect, useRef } from "react";
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
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-orbit-card]");
      const total = cards.length;

      // Orbit radius (responsive-ish based on viewport)
      const radius = Math.min(window.innerWidth, 1100) * 0.32;

      // Final resting angles: evenly spaced around a circle,
      // starting at top (-90deg) so first card lands at 12 o'clock.
      const finalAngles = cards.map(
        (_, i) => -90 + (360 / total) * i
      );

      // Initial state: all cards stacked at center, invisible.
      cards.forEach((card) => {
        gsap.set(card, {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 0.6,
          autoAlpha: 0,
          filter: "blur(12px)",
          transformOrigin: "50% 50%",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${total * 90}%`,
          scrub: 1.1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Each card sweeps in along a circular arc, one after another.
      cards.forEach((card, i) => {
        const endAngle = finalAngles[i];
        // start the sweep 180deg behind final position (comes around the circle)
        const startAngle = endAngle - 180;
        const steps = 24;

        const path: { x: number; y: number }[] = [];
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          // ease-out along the arc
          const eased = 1 - Math.pow(1 - t, 2);
          const a = (startAngle + (endAngle - startAngle) * eased) * (Math.PI / 180);
          // spiral in: radius grows from 0.4r to r as it sweeps
          const r = radius * (0.4 + 0.6 * eased);
          path.push({ x: Math.cos(a) * r, y: Math.sin(a) * r });
        }

        tl.to(
          card,
          {
            keyframes: {
              x: path.map((p) => p.x),
              y: path.map((p) => p.y),
            },
            autoAlpha: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "none",
          },
          i * 0.75
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      {/* label */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase text-muted-foreground z-20">
        Our Services
      </div>

      {/* center visual */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[260px] md:size-[320px] rounded-full glass flex items-center justify-center will-change-transform z-10">
        <div className="text-center px-6">
          <div className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
            Zero
          </div>
          <div className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
            Theorys
          </div>
          <div className="mt-3 text-[9px] tracking-[0.35em] uppercase text-muted-foreground">
            One standard of craft
          </div>
        </div>
      </div>

      {/* orbit stage — each card is absolutely positioned at center, GSAP moves it */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative size-0">
          {services.map((s, i) => (
            <div
              key={i}
              data-orbit-card
              className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-[240px] md:w-[260px] will-change-transform"
            >
              <div className="glass rounded-2xl p-5">
                <div className="size-10 rounded-xl glass flex items-center justify-center mb-3">
                  <s.icon className="size-4 text-foreground" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] tracking-widest uppercase text-muted-foreground">
                  {s.tag}
                </span>
                <h3 className="mt-1.5 font-display text-lg md:text-xl font-semibold tracking-tight leading-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
