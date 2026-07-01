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

const leftServices = [
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
];

const rightServices = [
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

type Service = (typeof leftServices)[number];

function OrbitCircle({
  services,
  side,
  attr,
}: {
  services: Service[];
  side: "left" | "right";
  attr: string;
}) {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* orbit ring */}
      <div className="absolute size-[420px] md:size-[520px] rounded-full border border-white/10" />
      <div className="absolute size-[280px] md:size-[340px] rounded-full border border-white/5" />

      {/* hub */}
      <div className="absolute size-[140px] md:size-[170px] rounded-full glass flex items-center justify-center">
        <div className="text-center px-3">
          <div className="font-display text-xl md:text-2xl font-semibold tracking-tight text-gradient">
            {side === "left" ? "Build" : "Grow"}
          </div>
          <div className="mt-1 text-[8px] tracking-[0.3em] uppercase text-muted-foreground">
            {side === "left" ? "Engineering" : "Distribution"}
          </div>
        </div>
      </div>

      {/* cards positioned at center; GSAP places them on the orbit */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative size-0">
          {services.map((s, i) => (
            <div
              key={i}
              data-orbit-card={attr}
              data-index={i}
              className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-[220px] md:w-[240px] will-change-transform"
            >
              <div className="glass rounded-2xl p-4">
                <div className="size-9 rounded-xl glass flex items-center justify-center mb-2">
                  <s.icon className="size-4 text-foreground" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] tracking-widest uppercase text-muted-foreground">
                  {s.tag}
                </span>
                <h3 className="mt-1 font-display text-base md:text-lg font-semibold tracking-tight leading-tight">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const setupOrbit = (attr: string, direction: 1 | -1) => {
        const cards = gsap.utils.toArray<HTMLElement>(
          `[data-orbit-card="${attr}"]`
        );
        const total = cards.length;
        const radius = Math.min(window.innerWidth, 1400) * 0.13;

        // final resting angles: evenly spaced around the circle
        const finalAngles = cards.map((_, i) => -90 + (360 / total) * i);

        cards.forEach((card) => {
          gsap.set(card, {
            x: 0,
            y: 0,
            scale: 0.5,
            autoAlpha: 0,
            filter: "blur(12px)",
            transformOrigin: "50% 50%",
          });
        });

        cards.forEach((card, i) => {
          const endAngle = finalAngles[i];
          // sweep 220deg in from the outside, direction differs per side
          const startAngle = endAngle - direction * 220;
          const steps = 30;
          const xs: number[] = [];
          const ys: number[] = [];
          for (let s = 0; s <= steps; s++) {
            const t = s / steps;
            const eased = 1 - Math.pow(1 - t, 2);
            const a =
              (startAngle + (endAngle - startAngle) * eased) *
              (Math.PI / 180);
            const r = radius * (0.5 + 0.5 * eased);
            xs.push(Math.cos(a) * r);
            ys.push(Math.sin(a) * r);
          }

          gsap.to(card, {
            keyframes: { x: xs, y: ys },
            autoAlpha: 1,
            scale: 1,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: `+=${total * 90}%`,
              scrub: 1.1,
            },
            // stagger via delay on the sub-tween within the scrubbed range
            // by offsetting start position through immediateRender + delay
            delay: i * 0.4,
          });
        });
      };

      setupOrbit("left", -1);
      setupOrbit("right", 1);

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${3 * 90}%`,
        pin: true,
        anticipatePin: 1,
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

      {/* two orbit stages, side by side */}
      <div className="absolute inset-0 grid grid-cols-2">
        <OrbitCircle services={leftServices} side="left" attr="left" />
        <OrbitCircle services={rightServices} side="right" attr="right" />
      </div>
    </section>
  );
}
