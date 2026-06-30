import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import ServiceIcon from "./three/ServiceIcon";

const services = [
  { kind: "software" as const, title: "Software Engineering", desc: "Production-grade systems, APIs and infrastructure built with modern stacks and an obsession for craft.", tag: "01 / Systems" },
  { kind: "web" as const, title: "Web Development", desc: "Interactive, performant websites and product UIs. From marketing surfaces to complex SaaS.", tag: "02 / Interfaces" },
  { kind: "social" as const, title: "Social Media Marketing", desc: "Content systems, paid growth and community engineering that compound your brand's gravity.", tag: "03 / Growth" },
  { kind: "design" as const, title: "Graphic Design", desc: "Identity, motion, art direction. Visual languages that make brands feel inevitable.", tag: "04 / Identity" },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="max-w-6xl mx-auto px-6 w-full mb-12">
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
            className="mt-3 font-display text-4xl md:text-6xl font-semibold tracking-tight"
          >
            Four disciplines.<br />
            <span className="text-gradient">One studio.</span>
          </motion.h2>
        </div>

        <motion.div style={{ x }} className="flex gap-8 pl-[8vw]">
          {services.map((s, i) => (
            <div
              key={s.kind}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group relative glass rounded-3xl w-[72vw] md:w-[42vw] lg:w-[34vw] aspect-[4/5] p-8 flex flex-col shrink-0 transition-shadow duration-500 hover:glow-ring"
            >
              <div className="flex justify-between text-xs text-muted-foreground tracking-widest uppercase">
                <span>{s.tag}</span>
                <span>↗</span>
              </div>
              <div className="flex-1 my-6">
                <ServiceIcon kind={s.kind} hovered={hovered === i} />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
          <div className="shrink-0 w-[20vw]" />
        </motion.div>
      </div>
    </section>
  );
}
