import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

type Spark = { x: number; y: number; vx: number; vy: number; life: number; color: string; trail: [number, number][] };

export default function DiwaliFireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let width = 0;
    let height = 0;
    let last = 0;
    let nextBurst = 0;
    let sparks: Spark[] = [];
    const styles = getComputedStyle(document.documentElement);
    const colors = ["--festival-gold", "--festival-rose", "--festival-jade"].map((token) => styles.getPropertyValue(token).trim());
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const burst = () => {
      // Keep celebrations at the edges, away from the main copy.
      const x = width * (Math.random() > 0.5 ? 0.82 : 0.12);
      const y = height * (0.16 + Math.random() * 0.24);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const count = width < 640 ? 40 : 70;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const speed = 35 + Math.random() * (width < 640 ? 55 : 105);
        sparks.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 2.4 + Math.random() * 0.8, color, trail: [] });
      }
    };
    const draw = (time: number) => {
      const dt = Math.min((time - last) / 1000, 0.035);
      last = time;
      context.clearRect(0, 0, width, height);
      if (!paused && !media.matches && !document.hidden) {
        if (time > nextBurst) {
          burst();
          nextBurst = time + 1700 + Math.random() * 1200;
        }
        sparks = sparks.filter((spark) => spark.life > 0);
        for (const spark of sparks) {
          spark.trail.push([spark.x, spark.y]);
          if (spark.trail.length > 7) spark.trail.shift();
          spark.x += spark.vx * dt;
          spark.y += spark.vy * dt;
          spark.vy += 25 * dt;
          spark.vx *= 1 - dt * 0.35;
          spark.life -= dt;
          context.globalAlpha = Math.min(spark.life / 1.2, 0.7);
          context.strokeStyle = spark.color;
          context.fillStyle = spark.color;
          context.lineWidth = 1;
          context.beginPath();
          spark.trail.forEach(([x, y], index) => index === 0 ? context.moveTo(x, y) : context.lineTo(x, y));
          context.stroke();
          context.beginPath();
          context.arc(spark.x, spark.y, 1.5, 0, Math.PI * 2);
          context.fill();
        }
        context.globalAlpha = 1;
      } else {
        sparks = [];
      }
      frame = requestAnimationFrame(draw);
    };
    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      context.clearRect(0, 0, width, height);
    };
  }, [paused]);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-20 h-full w-full" />
      <div aria-hidden="true" className="diwali-diya pointer-events-none fixed bottom-4 left-5 z-20"><span /></div>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-5 right-5 z-40 border-festival-gold/40 bg-background/90 text-festival-gold"
        onClick={() => setPaused((value) => !value)}
        aria-label={paused ? "Play Diwali fireworks" : "Pause Diwali fireworks"}
        title={paused ? "Play Diwali fireworks" : "Pause Diwali fireworks"}
      >
        {paused ? <Play /> : <Pause />}
      </Button>
    </>
  );
}