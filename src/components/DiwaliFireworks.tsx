import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

type Spark = { x: number; y: number; vx: number; vy: number; life: number; duration: number; color: string; trail: [number, number][]; size: number };
type Ripple = { x: number; y: number; life: number; color: string };

export default function DiwaliFireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lightsRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const lights = lightsRef.current;
    const lightsContext = lights?.getContext("2d");
    if (!canvas || !context || !lights || !lightsContext) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const styles = getComputedStyle(document.documentElement);
    const colors = ["--festival-gold", "--festival-rose", "--festival-jade", "--festival-pearl"].map((token) => styles.getPropertyValue(token).trim());
    const wire = styles.getPropertyValue("--festival-wire").trim();
    let frame = 0, width = 0, height = 0, last = 0, nextBurst = 0, lastTrail = 0, lastClick = 0;
    let elapsed = 0;
    let sparks: Spark[] = [];
    let ripples: Ripple[] = [];
    const pointer = { x: -1000, y: -1000, active: false };
    const enabled = () => !paused && !media.matches && !document.hidden;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      lights.width = width * ratio;
      lights.height = 90 * ratio;
      lightsContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const addSpark = (x: number, y: number, vx: number, vy: number, duration: number, color: string, size = 1.4) => {
      if (sparks.length >= 650) return;
      sparks.push({ x, y, vx, vy, life: duration, duration, color, trail: [], size });
    };
    const burst = (x: number, y: number, clicked = false) => {
      const color = colors[Math.floor(Math.random() * 3)];
      const count = width < 640 ? 48 : 88;
      for (let i = 0; i < count; i++) {
        const angle = i / count * Math.PI * 2;
        // Alternating petals create a jewel-like chrysanthemum rather than a flat circle.
        const speed = (clicked ? 100 : 65) + (0.5 + 0.5 * Math.cos(angle * 8)) * (clicked ? 140 : 95);
        addSpark(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, 1.8 + Math.random() * 0.9, i % 5 === 0 ? colors[3] : color);
      }
      if (clicked) ripples.push({ x, y, life: 1, color });
    };
    const move = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = event.pointerType !== "touch";
      if (!enabled() || !pointer.active || event.timeStamp - lastTrail < 32) return;
      lastTrail = event.timeStamp;
      for (let i = 0; i < 2; i++) {
        addSpark(pointer.x + (Math.random() - 0.5) * 9, pointer.y, (Math.random() - 0.5) * 32, -15 - Math.random() * 25, 0.55 + Math.random() * 0.4, colors[i === 0 ? 0 : 3], 1);
      }
    };
    const click = (event: PointerEvent) => {
      if (!enabled() || event.timeStamp - lastClick < 180) return;
      if (event.target instanceof Element && event.target.closest("button, a, input, textarea, select, [role='button']")) return;
      lastClick = event.timeStamp;
      burst(event.clientX, event.clientY, true);
    };
    const leave = () => { pointer.active = false; };
    const drawLights = () => {
      const context = lightsContext;
      context.clearRect(0, 0, width, 90);
      const spans = width < 640 ? 2 : 4;
      const span = width / spans;
      for (let section = 0; section < spans; section++) {
        context.globalAlpha = 0.75;
        context.strokeStyle = wire;
        context.lineWidth = 0.8;
        context.beginPath();
        for (let j = 0; j <= 48; j++) {
          const u = j / 48;
          const x = section * span + u * span;
          const y = 5 + Math.sin(u * Math.PI) * (width < 640 ? 34 : 48);
          if (j === 0) context.moveTo(x, y); else context.lineTo(x, y);
        }
        context.stroke();
        const bulbs = width < 640 ? 9 : 12;
        for (let j = 0; j < bulbs; j++) {
          const u = (j + 0.5) / bulbs;
          const x = section * span + u * span;
          const baseY = 5 + Math.sin(u * Math.PI) * (width < 640 ? 34 : 48);
          const distance = pointer.active ? Math.hypot(pointer.x - x, pointer.y - baseY) : 1000;
          const proximity = enabled() ? Math.max(0, 1 - distance / 140) : 0;
          const phase = section * 2.3 + j * 0.85;
          const sway = enabled() ? Math.sin(elapsed * 1.4 + phase) * 1.8 + (pointer.x - x) * proximity * 0.06 : 0;
          const color = colors[(j + section) % 7 === 0 ? 1 : (j + section) % 9 === 0 ? 2 : 0];
          const brightness = 0.65 + Math.sin(elapsed * 1.8 + phase) * 0.16 + proximity * 0.19;
          context.globalAlpha = 0.65;
          context.strokeStyle = wire;
          context.beginPath();
          context.moveTo(x, baseY);
          context.lineTo(x + sway, baseY + 9);
          context.stroke();
          context.globalAlpha = Math.min(1, brightness);
          context.fillStyle = color;
          context.shadowColor = color;
          context.shadowBlur = 10 + proximity * 15;
          context.beginPath();
          context.ellipse(x + sway, baseY + 12, 1.8 + proximity, 3.3 + proximity, -sway * 0.03, 0, Math.PI * 2);
          context.fill();
          context.shadowBlur = 0;
          context.fillStyle = colors[3];
          context.globalAlpha = 0.8;
          context.beginPath();
          context.arc(x + sway, baseY + 11, 0.7, 0, Math.PI * 2);
          context.fill();
        }
      }
      context.globalAlpha = 1;
    };
    const draw = (time: number) => {
      const dt = Math.min((time - last) / 1000, 0.035);
      last = time;
      context.clearRect(0, 0, width, height);
      if (enabled()) elapsed += dt;
      drawLights();
      if (enabled()) {
        if (time > nextBurst) {
          burst(width * (Math.random() > 0.5 ? 0.85 : 0.13), height * (0.18 + Math.random() * 0.28));
          nextBurst = time + 2200 + Math.random() * 1800;
        }
        sparks = sparks.filter((spark) => spark.life > 0);
        context.globalCompositeOperation = "lighter";
        for (const spark of sparks) {
          const dx = spark.x - pointer.x, dy = spark.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (pointer.active && distance > 1 && distance < 110) {
            const force = (1 - distance / 110) * 280 * dt;
            spark.vx += dx / distance * force;
            spark.vy += dy / distance * force;
          }
          spark.trail.push([spark.x, spark.y]);
          if (spark.trail.length > 6) spark.trail.shift();
          spark.x += spark.vx * dt;
          spark.y += spark.vy * dt;
          spark.vy += 32 * dt;
          spark.vx *= 1 - dt * 0.5;
          spark.life -= dt;
          context.globalAlpha = Math.max(0, Math.min(spark.life / 0.7, 0.8));
          context.strokeStyle = spark.color;
          context.fillStyle = spark.color;
          context.lineWidth = 0.7;
          context.beginPath();
          spark.trail.forEach(([x, y], index) => index === 0 ? context.moveTo(x, y) : context.lineTo(x, y));
          context.stroke();
          context.beginPath();
          context.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
          context.fill();
        }
        ripples = ripples.filter((ripple) => ripple.life > 0);
        for (const ripple of ripples) {
          ripple.life -= dt * 1.3;
          context.globalAlpha = Math.max(0, ripple.life * 0.45);
          context.strokeStyle = ripple.color;
          context.lineWidth = 1;
          for (let ring = 0; ring < 2; ring++) {
            context.beginPath();
            context.arc(ripple.x, ripple.y, (1 - ripple.life) * (ring === 0 ? 155 : 110) + 3, 0, Math.PI * 2);
            context.stroke();
          }
        }
        context.globalCompositeOperation = "source-over";
        context.globalAlpha = 1;
      } else { sparks = []; ripples = []; }
      frame = requestAnimationFrame(draw);
    };
    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", click, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", click);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
      context.clearRect(0, 0, width, height);
    };
  }, [paused]);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-20 h-full w-full" />
      <canvas ref={lightsRef} aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[90px] w-full" />
      <div aria-hidden="true" className={`diwali-diya pointer-events-none fixed bottom-4 left-5 z-20 ${paused ? "festival-paused" : ""}`}><span /></div>
      <Button variant="outline" size="icon" className="fixed bottom-5 right-5 z-40 border-festival-gold/40 bg-background/90 text-festival-gold" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play Diwali fireworks" : "Pause Diwali fireworks"} title={paused ? "Play Diwali fireworks" : "Pause Diwali fireworks"}>
        {paused ? <Play /> : <Pause />}
      </Button>
    </>
  );
}
