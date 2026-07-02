import { motion, useReducedMotion } from "framer-motion";
import debayanAsset from "@/assets/debayan.png.asset.json";
import ganeshAsset from "@/assets/ganesh.png.asset.json";

const founders = [
  {
    name: "Debayan Chakraborty",
    role: "UI / UX & Graphic Designer",
    image: debayanAsset.url,
    initials: "DC",
  },
  {
    name: "Ganesh Singha",
    role: "Full-Stack Engineer",
    image: ganeshAsset.url,
    initials: "GS",
  },
  {
    name: "Aniket Karmakar",
    role: "Prompt & Loop Engineer",
    image: "/founders/ganesh.jpg",
    initials: "AK",
  },
];

export default function Founders() {
  const reduce = useReducedMotion();

  return (
    <section id="founders" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8 text-center"
        >
          The team
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center font-display text-3xl md:text-5xl font-semibold tracking-tight mb-4"
        >
          Built by <span className="text-gradient">founders who ship</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-center text-muted-foreground max-w-xl mx-auto mb-16 text-sm md:text-base leading-relaxed"
        >
          Three specialists. One shared standard — deliver work that moves the needle.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {founders.map((f, i) => (
            <motion.div
              key={f.name}
              data-no-fx
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 80, scale: 0.94, filter: "blur(12px)" }}
              whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 1.1,
                delay: i * 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={reduce ? undefined : { y: -6, transition: { duration: 0.4, ease: "easeOut" } }}
            >
              <div className="glass rounded-3xl p-6 md:p-8 glass-hover group">
                <div className="relative mx-auto w-40 h-52 md:w-48 md:h-64 rounded-2xl overflow-hidden mb-6">
                  <img
                    src={f.image}
                    alt={f.name}
                    width={384}
                    height={512}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>

                <div className="text-center">
                  <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight">{f.name}</h3>
                  <p className="mt-2 text-xs md:text-sm text-muted-foreground tracking-wide uppercase leading-relaxed">
                    {f.role}
                  </p>
                </div>

                <div className="mt-5 flex justify-center">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50 font-display">
                    Co-Founder
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
