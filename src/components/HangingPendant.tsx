import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import pendant from "@/assets/pendant.svg";

export default function HangingPendant() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const swingRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [visible, setVisible] = useState(true);

  // GSAP-driven swing toward cursor with spring easing
  useEffect(() => {
    const swing = swingRef.current;
    if (!swing) return;

    const setRot = gsap.quickTo(swing, "rotation", {
      duration: 1.1,
      ease: "elastic.out(1, 0.35)",
    });

    let raf = 0;
    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const pivotX = rect.left + rect.width / 2;
        const pivotY = rect.top;
        const dx = e.clientX - pivotX;
        const dy = Math.max(e.clientY - pivotY, 1);
        const deg = Math.atan2(dx, dy) * (180 / Math.PI);
        setRot(Math.max(-45, Math.min(45, -deg * 0.7)));
      });
    };
    window.addEventListener("mousemove", handleMove);

    // idle pendulum breathing
    const idle = gsap.to(swing, {
      rotation: "+=3",
      duration: 2.4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
      idle.kill();
    };
  }, []);

  // hover pop
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const onEnter = () =>
      gsap.to(img, { width: 120, duration: 0.4, ease: "back.out(2)" });
    const onLeave = () =>
      gsap.to(img, { width: 100, duration: 0.4, ease: "power3.out" });
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
          className="mx-auto"
          style={{
            width: 1,
            height: 40,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.1))",
          }}
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
