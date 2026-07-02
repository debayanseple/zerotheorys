import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const studies = [
  {
    tag: "B2B SaaS",
    title: "Re-platformed marketing engine",
    metrics: [
      { v: "3–4×", l: "Pipeline growth" },
      { v: "−40%", l: "CAC reduction" },
    ],
    desc: "Rebuilt the marketing site, attribution, and lifecycle stack to compound qualified pipeline quarter over quarter.",
  },
  {
    tag: "Premium D2C Beauty",
    title: "Direct revenue, organically",
    metrics: [
      { v: "2.5–3×", l: "Direct revenue" },
      { v: "+180%", l: "Organic sessions" },
    ],
    desc: "Editorial storefront, content velocity, and SEO architecture engineered for a high-margin beauty brand.",
  },
  {
    tag: "Multi-region 3PL",
    title: "Support operations, rebuilt",
    metrics: [
      { v: "−33%", l: "Cost to serve" },
      { v: "92", l: "CSAT" },
    ],
    desc: "Reorganized 24/7 support, automated tier-1 tickets, and instrumented quality across three regions.",
  },
];

// Seeded PRNG so stars stay stable across renders / SSR
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

type Star = { x: number; y: number; r: number; o: number; d: number };

function makeStars(count: number, seed: number, depth: number): Star[] {
  const rand = seeded(seed);
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    r: 0.6 + rand() * 1.8,
    o: 0.25 + rand() * 0.7,
    d: depth,
  }));
}

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);

  const layers = useMemo(
    () => [
      { stars: makeStars(60, 11, 0.15), size: 1 },
      { stars: makeStars(40, 37, 0.35), size: 1.4 },
      { stars: makeStars(22, 71, 0.6), size: 1.9 },
    ],
    []
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Eyebrow + heading reveal
      gsap.from("[data-cs-eyebrow]", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from("[data-cs-heading]", {
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Cards — staggered entry
      const cards = gsap.utils.toArray<HTMLElement>("[data-cs-card]");
      if (cards.length) {
        gsap.from(cards, {
          y: 80,
          opacity: 0,
          scale: 0.94,
          rotateX: 6,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: cards[0],
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-cs-metric]", {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
          delay: 0.4,
          scrollTrigger: {
            trigger: cards[0],
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        // Scroll-linked tilt on cards for depth feel
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { rotateY: i === 0 ? 4 : i === cards.length - 1 ? -4 : 0, y: 20 },
            {
              rotateY: 0,
              y: -20,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
              },
            }
          );
        });
      }
    }, section);


    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      data-no-fx
      className="relative py-32 px-6 overflow-hidden isolate"
    >
      <div className="max-w-7xl mx-auto relative">

        <div className="max-w-3xl mb-16">
          <p
            data-cs-eyebrow
            className="text-xs tracking-[0.3em] uppercase text-muted-foreground"
          >
            Selected work
          </p>
          <h2
            data-cs-heading
            className="mt-4 font-display text-4xl md:text-6xl font-semibold tracking-tight"
          >
            Outcomes, <span className="text-gradient">not output.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 [perspective:1200px]">
          {studies.map((s) => (
            <article
              key={s.title}
              data-cs-card
              className="glass glass-hover rounded-3xl p-8 flex flex-col will-change-transform"
            >
              <span className="text-[10px] tracking-widest uppercase text-muted-foreground">
                {s.tag}
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                {s.metrics.map((m) => (
                  <div key={m.l} data-cs-metric>
                    <div className="font-display text-2xl font-semibold text-gradient">
                      {m.v}
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                      {m.l}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
