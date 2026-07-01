import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const phases = [
  { n: "01", t: "Discover", when: "Week 1", d: "Align on goals, constraints, success metrics, and risks." },
  { n: "02", t: "Plan", when: "Week 2", d: "Strategy, scope, architecture, and sprint milestones." },
  { n: "03", t: "Build", when: "Weeks 3–8", d: "Transparent sprints with working demos every Friday." },
  { n: "04", t: "Launch", when: "Weeks 9–10", d: "Hardened releases, evaluation gates, documented rollback." },
  { n: "05", t: "Operate", when: "Ongoing", d: "Metric reviews, iteration, and SLA-backed support." },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-phase-card]");
      const distance = () => track.scrollWidth - window.innerWidth + 96;

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${(distance() + window.innerHeight * 0.6) * 2}`,
          scrub: 2.5,

          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              cards.length - 1,
              Math.floor(self.progress * cards.length + 0.15)
            );
            setActive(idx);
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      <div className="absolute top-10 md:top-16 left-0 right-0 px-6 z-20">
        <div className="max-w-7xl mx-auto">
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
            className="mt-3 font-display text-3xl md:text-5xl font-semibold tracking-tight"
          >
            Five phases.{" "}
            <span className="text-gradient">Measured every Friday.</span>
          </motion.h2>
        </div>
      </div>

      {/* horizontal track — shifted below headline */}
      <div className="absolute inset-x-0 top-[54%] md:top-[58%] -translate-y-1/2 flex items-center">
        <div
          ref={trackRef}
          className="flex gap-6 md:gap-8 pl-12 md:pl-24 pr-[50vw] will-change-transform"
        >
          {phases.map((p, i) => {
            const isActive = i === active;
            return (
              <div
                key={p.n}
                data-phase-card
                className={`shrink-0 w-[78vw] sm:w-[480px] md:w-[540px] h-[52vh] max-h-[440px] rounded-[2rem] p-6 md:p-10 flex flex-col justify-between glass transition-all duration-500 ease-out ${
                  isActive
                    ? "opacity-100 scale-100 border-foreground/30 shadow-2xl"
                    : "opacity-40 scale-[0.92]"
                }`}
              >

                <div className="flex items-baseline justify-between">
                  <span
                    className={`font-display text-6xl md:text-8xl font-semibold transition-colors duration-500 ${
                      isActive ? "text-gradient" : "text-muted-foreground/60"
                    }`}
                  >
                    {p.n}
                  </span>
                  <span className="text-[10px] md:text-xs tracking-widest uppercase text-muted-foreground">
                    {p.when}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-4xl md:text-6xl font-semibold tracking-tight">
                    {p.t}
                  </h3>
                  <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
                    {p.d}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* progress indicator */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {phases.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === active ? "w-10 bg-foreground" : "w-1.5 bg-foreground/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
