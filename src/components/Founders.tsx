import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, type MouseEvent } from "react";
import { Volume2, VolumeX } from "lucide-react";
import debayanAsset from "@/assets/debayan.png.asset.json";
import debayanVideoAsset from "@/assets/debayan.mp4.asset.json";
import ganeshAsset from "@/assets/ganesh.png.asset.json";
import aniketAsset from "@/assets/aniket.png.asset.json";

type Founder = {
  name: string;
  role: string;
  image: string;
  initials: string;
  video?: string;
};

const founders: Founder[] = [
  {
    name: "Debayan Chakraborty",
    role: "UI / UX & Graphic Designer",
    image: debayanAsset.url,
    video: debayanVideoAsset.url,
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
    image: aniketAsset.url,
    initials: "AK",
  },
];

function FounderCard({ f, i, reduce }: { f: Founder; i: number; reduce: boolean | null }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(0);

  const rotateX = useSpring(rx, { stiffness: 150, damping: 15, mass: 0.4 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 15, mass: 0.4 });
  const glowX = useSpring(gx, { stiffness: 120, damping: 20 });
  const glowY = useSpring(gy, { stiffness: 120, damping: 20 });

  const glowBg = useTransform(
    [glowX, glowY] as any,
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, hsl(var(--primary) / 0.55), transparent 60%)`
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [hovering, setHovering] = useState(false);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 12);
    rx.set((0.5 - py) * 12);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const handleEnter = () => {
    setHovering(true);
    if (f.video && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(0);
    setHovering(false);
    if (f.video && videoRef.current) {
      videoRef.current.pause();
    }
  };

  const toggleMute = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setMuted((m) => !m);
  };

  return (
    <motion.div
      data-no-fx
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 80, scale: 0.94, filter: "blur(12px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className="relative"
    >
      <motion.div
        aria-hidden
        style={reduce ? undefined : { background: glowBg }}
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 blur-2xl transition-opacity duration-500 group-hover/card:opacity-100"
      />
      <div
        className="glass rounded-3xl p-6 md:p-8 glass-hover group/card relative overflow-hidden
                   transition-shadow duration-500
                   hover:shadow-[0_0_60px_-10px_hsl(var(--primary)/0.55),0_0_120px_-40px_hsl(var(--primary)/0.4)]
                   hover:ring-1 hover:ring-primary/40"
      >
        <motion.div
          aria-hidden
          style={reduce ? undefined : { background: glowBg, mixBlendMode: "overlay" }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-70"
        />

        <div
          className="relative mx-auto w-40 h-52 md:w-48 md:h-64 rounded-2xl overflow-hidden mb-6"
          style={reduce ? undefined : { transform: "translateZ(40px)" }}
        >
          <img
            src={f.image}
            alt={f.name}
            width={384}
            height={512}
            loading="lazy"
            className={`w-full h-full object-cover transition-all duration-700 group-hover/card:scale-105 ${
              f.video && hovering ? "opacity-0" : "opacity-100"
            }`}
          />
          {f.video && (
            <>
              <video
                ref={videoRef}
                src={f.video}
                muted={muted}
                loop
                playsInline
                preload="metadata"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  hovering ? "opacity-100" : "opacity-0"
                }`}
              />
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Unmute video" : "Mute video"}
                className={`absolute bottom-2 right-2 z-10 grid place-items-center w-9 h-9 rounded-full
                            bg-background/60 backdrop-blur-md ring-1 ring-white/15
                            text-foreground/90 hover:text-primary hover:ring-primary/50
                            transition-all duration-300
                            ${hovering ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="text-center relative" style={reduce ? undefined : { transform: "translateZ(24px)" }}>
          <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight">{f.name}</h3>
          <p className="mt-2 text-xs md:text-sm text-muted-foreground tracking-wide uppercase leading-relaxed">
            {f.role}
          </p>
        </div>

        <div className="mt-5 flex justify-center relative">
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50 font-display">
            Co-Founder
          </span>
        </div>
      </div>
    </motion.div>
  );
}

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
            <FounderCard key={f.name} f={f} i={i} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  );
}
