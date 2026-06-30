import { useEffect, useRef, useState } from "react";
import pendant from "@/assets/pendant.svg";

export default function HangingPendant() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const target = useRef(0);
  const current = useRef(0);
  const velocity = useRef(0);

  /* swing toward cursor */
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pivotX = rect.left + rect.width / 2;
      const pivotY = rect.top;
      const dx = e.clientX - pivotX;
      const dy = Math.max(e.clientY - pivotY, 1);
      const deg = Math.atan2(dx, dy) * (180 / Math.PI);
      target.current = Math.max(-45, Math.min(45, -deg * 0.7));
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  /* physics spring */
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const k = 0.06;
      const d = 0.86;
      const force = (target.current - current.current) * k;
      velocity.current = (velocity.current + force) * d;
      current.current += velocity.current;
      setAngle(current.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* hide when scrolled past hero */
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

  const opacity = visible ? 1 : 0;

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="fixed top-20 right-6 z-40 hidden md:block"
      style={{
        opacity,
        transition: "opacity 0.4s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          transformOrigin: "top center",
          transform: `rotate(${angle}deg)`,
          transition: "none",
        }}
      >
        {/* short string */}
        <div
          className="mx-auto"
          style={{
            width: 1,
            height: 40,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.1))",
          }}
        />
        {/* small pendant image */}
        <img
          src={pendant}
          alt=""
          draggable={false}
          className="block select-none"
          style={{
            width: hovered ? 56 : 40,
            height: "auto",
            marginTop: -2,
            filter: hovered
              ? "drop-shadow(0 12px 24px rgba(168,85,247,0.5))"
              : "drop-shadow(0 8px 16px rgba(0,0,0,0.45))",
            transition: "width 0.3s ease, filter 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}
