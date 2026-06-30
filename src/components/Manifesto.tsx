import { motion } from "framer-motion";

const words = "We build digital products that feel inevitable — engineered with precision, designed with restraint, shipped with intent.".split(" ");

export default function Manifesto() {
  return (
    <section id="about" className="relative py-40 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">Manifesto</p>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.15 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, margin: "-30%" }}
              transition={{ duration: 0.4, delay: i * 0.02 }}
              className="inline-block mr-[0.25em]"
            >
              {w}
            </motion.span>
          ))}
        </h2>
      </div>
    </section>
  );
}
