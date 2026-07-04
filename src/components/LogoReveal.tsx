import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import logoAsset from "@/assets/Zero_Theorys_Logo.png.asset.json";

/**
 * Zero Theorys logo reveal — GSAP-driven.
 * Entrance runs when a `.play` class is added to this component or any ancestor
 * (Services adds it via ScrollTrigger). After entrance, a continuous float +
 * glow-breathe loop runs, plus a periodic shine sweep across the logo.
 */
export default function LogoReveal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    const logo = logoRef.current;
    const shine = shineRef.current;
    const glow = glowRef.current;
    if (!root || !logo || !shine || !glow) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // initial state
    gsap.set(logo, {
      opacity: 0,
      scale: 0.55,
      rotate: -12,
      filter: "drop-shadow(0 0 0 rgba(34,211,238,0)) blur(6px)",
      transformOrigin: "50% 50%",
    });
    gsap.set(glow, { opacity: 0, scale: 0.6 });
    gsap.set(shine, { xPercent: -180, opacity: 0, rotate: 12 });

    const loops: gsap.core.Tween[] = [];

    const play = () => {
      if (played.current) return;
      played.current = true;

      if (reduce) {
        gsap.set(logo, {
          opacity: 1,
          scale: 1,
          rotate: 0,
          filter: "drop-shadow(0 0 18px rgba(34,211,238,0.28)) blur(0px)",
        });
        gsap.set(glow, { opacity: 0.7, scale: 1 });
        return;
      }

      const tl = gsap.timeline();
      tl.to(glow, { opacity: 0.75, scale: 1, duration: 1.1, ease: "power2.out" }, 0)
        .to(
          logo,
          {
            opacity: 1,
            scale: 1.08,
            rotate: 3,
            filter: "drop-shadow(0 0 22px rgba(34,211,238,0.4)) blur(0px)",
            duration: 0.9,
            ease: "back.out(1.6)",
          },
          0.05
        )
        .to(logo, { scale: 1, rotate: 0, duration: 0.5, ease: "power2.out" })
        .add(() => {
          // continuous float
          loops.push(
            gsap.to(logo, {
              y: -8,
              duration: 2.6,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            })
          );
          // subtle rotate sway
          loops.push(
            gsap.to(logo, {
              rotate: 2.5,
              duration: 4.2,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            })
          );
          // glow breathe
          loops.push(
            gsap.to(logo, {
              filter: "drop-shadow(0 0 36px rgba(59,91,255,0.55)) blur(0px)",
              duration: 2.2,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            })
          );
          loops.push(
            gsap.to(glow, {
              scale: 1.12,
              opacity: 0.95,
              duration: 2.2,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            })
          );
          // periodic shine sweep
          loops.push(
            gsap.to(shine, {
              xPercent: 180,
              opacity: 1,
              duration: 1.6,
              ease: "power2.inOut",
              repeat: -1,
              repeatDelay: 2.4,
              onRepeat: () => gsap.set(shine, { xPercent: -180, opacity: 0 }),
            })
          );
        });
    };

    // trigger when `.play` class appears on root or any ancestor
    const check = () => {
      let el: HTMLElement | null = root;
      while (el) {
        if (el.classList.contains("play")) {
          play();
          return true;
        }
        el = el.parentElement;
      }
      return false;
    };

    if (!check()) {
      const mo = new MutationObserver(check);
      let el: HTMLElement | null = root;
      while (el) {
        mo.observe(el, { attributes: true, attributeFilter: ["class"] });
        el = el.parentElement;
      }
      return () => {
        mo.disconnect();
        loops.forEach((t) => t.kill());
      };
    }

    return () => {
      loops.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative w-full h-full p-3 sm:p-5 flex items-center justify-center"
    >
      {/* soft radial glow behind logo */}
      <div
        ref={glowRef}
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(34,211,238,0.35), rgba(59,91,255,0.18) 55%, transparent 72%)",
          filter: "blur(6px)",
        }}
      />

      <img
        ref={logoRef}
        src={logoAsset.url}
        alt="Zero Theorys"
        className="relative w-full h-full object-contain select-none pointer-events-none"
        draggable={false}
      />

      {/* shine sweep overlay */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl"
      >
        <div
          ref={shineRef}
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 h-[140%] w-[35%]"
          style={{
            background:
              "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.55) 50%, transparent 80%)",
          }}
        />
      </div>
    </div>
  );
}
