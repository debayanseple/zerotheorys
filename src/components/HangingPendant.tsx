import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import pendant from "@/assets/pendant.svg";

/**
 * HangingPendant — GSAP-driven "fluid" pendulum.
 *
 * The motion is modeled as a damped harmonic oscillator integrated on GSAP's
 * ticker. A soft torque pulls the bob toward the cursor while damping bleeds
 * energy so the swing settles like a viscous fluid rather than snapping.
 * The string is a chain of segments that follow the bob with easing, giving
 * the rope a rippling, liquid trail.
 */
export default function HangingPendant() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const swingRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const ropeRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const swing = swingRef.current;
    const wrap = wrapRef.current;
    const rope = ropeRef.current;
    if (!swing || !wrap || !rope) return;

    // --- Rope segments (fluid trail) ---
    const SEG_COUNT = 12;
    const segments: HTMLDivElement[] = [];
    rope.innerHTML = "";
    for (let i = 0; i < SEG_COUNT; i++) {
      const s = document.createElement("div");
      const t = i / (SEG_COUNT - 1);
      s.style.cssText = `
        position:absolute;
        top:${t * 40}px;
        left:50%;
        width:${1.2 - t * 0.4}px;
        height:${40 / SEG_COUNT + 1}px;
        margin-left:${-(1.2 - t * 0.4) / 2}px;
        background:linear-gradient(to bottom, rgba(255,255,255,${0.5 - t * 0.35}), rgba(255,255,255,${0.35 - t * 0.25}));
        border-radius:2px;
        transform-origin:top center;
        will-change:transform;
      `;
      rope.appendChild(s);
      segments.push(s);
    }

    // --- Physics state ---
    const state = {
      angle: 0, // deg
      velocity: 0, // deg/s
      target: 0, // deg (cursor-derived rest target)
    };

    const setBob = gsap.quickSetter(swing, "rotation", "deg");
    // per-segment setters for fluid lag
    const segAngles = new Array(SEG_COUNT).fill(0);
    const segSetters = segments.map((s) =>
      gsap.quickSetter(s, "rotation", "deg"),
    );

    // Damped spring integrator (fluid feel: low stiffness, high damping)
    const STIFFNESS = 42; // pull strength toward target
    const DAMPING = 3.6; // viscosity
    const MAX_DT = 1 / 30;

    const tick = (_time: number, deltaMS: number) => {
      const dt = Math.min(deltaMS / 1000, MAX_DT);
      // spring toward target
      const accel =
        -STIFFNESS * (state.angle - state.target) - DAMPING * state.velocity;
      state.velocity += accel * dt;
      state.angle += state.velocity * dt;

      setBob(state.angle);

      // rope segments follow with progressive lag → fluid ripple
      for (let i = 0; i < SEG_COUNT; i++) {
        const follow = 0.18 + (i / SEG_COUNT) * 0.55; // top responds slower, bottom faster
        segAngles[i] += (state.angle - segAngles[i]) * follow;
        // slight sinusoidal offset for wave-like flow
        const wave =
          Math.sin(_time / 380 + i * 0.55) * 0.6 * (i / SEG_COUNT);
        segSetters[i](segAngles[i] + wave);
      }
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(500, 33);

    // --- Cursor influence ---
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = wrap.getBoundingClientRect();
        const pivotX = rect.left + rect.width / 2;
        const pivotY = rect.top;
        const dx = e.clientX - pivotX;
        const dy = Math.max(e.clientY - pivotY, 40);
        const deg = Math.atan2(dx, dy) * (180 / Math.PI);
        // clamp + soften
        state.target = Math.max(-38, Math.min(38, -deg * 0.55));
      });
    };
    window.addEventListener("mousemove", onMove);

    // idle drift: gently move target so pendulum breathes when cursor idle
    const drift = gsap.to(state, {
      target: "+=0",
      duration: 0,
      onUpdate: () => {},
    });
    const idle = gsap.to(state, {
      duration: 3.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      onUpdate: function () {
        // only nudge when cursor idle (target near zero)
        if (Math.abs(state.target) < 2) {
          state.target = Math.sin(performance.now() / 1400) * 4;
        }
      },
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      gsap.ticker.remove(tick);
      idle.kill();
      drift.kill();
    };
  }, []);

  // hover pop
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const onEnter = () =>
      gsap.to(img, {
        width: 122,
        duration: 0.55,
        ease: "elastic.out(1, 0.5)",
      });
    const onLeave = () =>
      gsap.to(img, { width: 100, duration: 0.5, ease: "power3.out" });
    img.addEventListener("mouseenter", onEnter);
    img.addEventListener("mouseleave", onLeave);
    return () => {
      img.removeEventListener("mouseenter", onEnter);
      img.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      setVisible(rect.bottom > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="fixed top-20 right-6 z-40 hidden md:block"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <div ref={swingRef} style={{ transformOrigin: "top center" }}>
        <div
          ref={ropeRef}
          className="mx-auto relative"
          style={{ width: 2, height: 40 }}
        />
        <img
          ref={imgRef}
          src={pendant}
          alt=""
          draggable={false}
          className="block select-none"
          style={{
            width: 100,
            height: "auto",
            marginTop: -2,
            filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.45))",
          }}
        />
      </div>
    </div>
  );
}
