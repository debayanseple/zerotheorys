import { useEffect, useRef } from "react";
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

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);

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

      // Cards — staggered scroll-linked entry
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
      }

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
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
