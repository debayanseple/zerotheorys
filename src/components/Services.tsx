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
import LogoReveal from "./LogoReveal";

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

// group into pairs (left, right) per scroll step
const steps: Array<[typeof services[number], typeof services[number]]> = [
  [services[0], services[1]],
  [services[2], services[3]],
  [services[4], services[5]],
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const stepEls = gsap.utils.toArray<HTMLElement>("[data-step]");
      const centerEl = section.querySelector<HTMLElement>("[data-center]");

      // init: hide all except first
      stepEls.forEach((el, i) => {
        const leftCard = el.querySelector<HTMLElement>("[data-side='left']");
        const rightCard = el.querySelector<HTMLElement>("[data-side='right']");
        gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 });
        if (leftCard) gsap.set(leftCard, { x: i === 0 ? 0 : -120, autoAlpha: i === 0 ? 1 : 0, filter: i === 0 ? "blur(0px)" : "blur(8px)" });
        if (rightCard) gsap.set(rightCard, { x: i === 0 ? 0 : 120, autoAlpha: i === 0 ? 1 : 0, filter: i === 0 ? "blur(0px)" : "blur(8px)" });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${stepEls.length * 180}%`,
          scrub: 2,
          pin: true,
          anticipatePin: 1,
          onEnter: () => centerEl?.classList.add("play"),
          onEnterBack: () => centerEl?.classList.add("play"),
        },
      });


      // transition between steps
      for (let i = 0; i < stepEls.length - 1; i++) {
        const curr = stepEls[i];
        const next = stepEls[i + 1];
        const currL = curr.querySelector<HTMLElement>("[data-side='left']");
        const currR = curr.querySelector<HTMLElement>("[data-side='right']");
        const nextL = next.querySelector<HTMLElement>("[data-side='left']");
        const nextR = next.querySelector<HTMLElement>("[data-side='right']");

        const at = i + 0.35; // hold, then swap
        tl.to(currL, { x: -140, autoAlpha: 0, filter: "blur(8px)", duration: 0.5, ease: "power2.in" }, at)
          .to(currR, { x: 140, autoAlpha: 0, filter: "blur(8px)", duration: 0.5, ease: "power2.in" }, at)
          .set(curr, { autoAlpha: 0 }, at + 0.5)
          .set(next, { autoAlpha: 1 }, at + 0.5)
          .fromTo(
            nextL,
            { x: -160, autoAlpha: 0, filter: "blur(10px)" },
            { x: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.6, ease: "power3.out" },
            at + 0.5
          )
          .fromTo(
            nextR,
            { x: 160, autoAlpha: 0, filter: "blur(10px)" },
            { x: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.6, ease: "power3.out" },
            at + 0.5
          );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* label */}
      <div className="absolute top-6 md:top-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase text-muted-foreground z-20">
        Our Services
      </div>

      {/* center visual */}
      <div
        data-center
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[240px] sm:size-[280px] md:size-[340px] rounded-3xl glass flex items-center justify-center will-change-transform"
      >
        <div className="text-center px-6">
          <div className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-gradient">
            Zero
          </div>
          <div className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
            Theorys
          </div>
          <div className="mt-3 md:mt-4 text-[10px] tracking-[0.35em] uppercase text-muted-foreground">
            Different disciplines · One standard of craft
          </div>
        </div>
      </div>

      {/* steps overlay */}
      <div className="absolute inset-0">
        {steps.map((pair, i) => (
          <div key={i} data-step className="absolute inset-0">
            {/* left card — top-left quadrant */}
            <div
              data-side="left"
              className="absolute left-4 sm:left-8 md:left-16 top-[12%] md:top-[14%] max-w-[220px] sm:max-w-xs will-change-transform"
            >
              <ServiceBlock s={pair[0]} align="left" />
            </div>
            {/* right card — bottom-right quadrant (like Trionn's diagonal layout) */}
            <div
              data-side="right"
              className="absolute right-4 sm:right-8 md:right-16 bottom-[12%] md:bottom-[14%] max-w-[220px] sm:max-w-xs text-right will-change-transform"
            >
              <ServiceBlock s={pair[1]} align="right" />
            </div>
          </div>
        ))}
      </div>

      {/* progress dots */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {steps.map((_, i) => (
          <span key={i} className="size-1.5 rounded-full bg-foreground/30" />
        ))}
      </div>
    </section>
  );
}

function ServiceBlock({
  s,
  align,
}: {
  s: typeof services[number];
  align: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "flex flex-col items-end" : "flex flex-col items-start"}>
      <div className="size-9 rounded-xl glass flex items-center justify-center mb-3">
        <s.icon className="size-4 text-foreground" strokeWidth={1.5} />
      </div>
      <span className="text-[10px] tracking-widest uppercase text-muted-foreground">{s.tag}</span>
      <h3 className="mt-1.5 font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
        {s.title}
      </h3>
      <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
    </div>
  );
}
