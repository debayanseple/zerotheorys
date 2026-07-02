import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

type Star = { x: number; y: number; r: number; o: number };

function makeStars(count: number, seed: number): Star[] {
  const rand = seeded(seed);
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    r: 0.5 + rand() * 1.8,
    o: 0.3 + rand() * 0.7,
  }));
}

export default function SpaceBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  const layers = useMemo(
    () => [
      { stars: makeStars(120, 11), depth: 0.15, size: 1, glow: false },
      { stars: makeStars(70, 37), depth: 0.4, size: 1.4, glow: false },
      { stars: makeStars(30, 71), depth: 0.75, size: 2.2, glow: true },
    ],
    []
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let blurRafId = 0;
    const ctx = gsap.context(() => {

      // Parallax star layers — driven directly by scroll progress so pinned
      // sections (which extend scrollHeight after mount) don't cap the range.
      const starLayerEls = gsap.utils.toArray<HTMLElement>("[data-space-layer]");
      const layerSetters = starLayerEls.map((layer) => {
        const depth = parseFloat(layer.dataset.depth || "0.3");
        return {
          depth,
          setY: gsap.quickSetter(layer, "yPercent") as (v: number) => void,
        };
      });

      // Scroll-velocity motion blur on star layers
      const starLayers = gsap.utils.toArray<HTMLElement>("[data-space-layer]");
      const blurSetters = starLayers.map((el) => {
        const depth = parseFloat(el.dataset.depth || "0.3");
        const setStretch = gsap.quickTo(el, "scaleY", {
          duration: 0.35,
          ease: "power2.out",
        });
        return { depth, setStretch, el };
      });


      const tick = () => {
        const v = Math.abs((ScrollTrigger as unknown as { getVelocity: () => number }).getVelocity());
        const base = Math.min(v / 220, 12);
        blurSetters.forEach(({ depth, setStretch, el }) => {
          const b = base * (0.5 + depth);
          el.style.filter = `blur(${b}px)`;
          const stretch = 1 + Math.min(b / 40, 0.18);
          setStretch(stretch);
        });
        blurRafId = requestAnimationFrame(tick);
      };
      blurRafId = requestAnimationFrame(tick);





      // Aurora blobs slow drift with scroll
      const auroraST = (scrub: number) => ({
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        scrub,
        invalidateOnRefresh: true,
      });
      gsap.to("[data-space-aurora-1]", {
        xPercent: 20,
        yPercent: -15,
        scrollTrigger: auroraST(1.5),
      });
      gsap.to("[data-space-aurora-2]", {
        xPercent: -18,
        yPercent: 18,
        scrollTrigger: auroraST(1.5),
      });
      gsap.to("[data-space-aurora-3]", {
        xPercent: 14,
        yPercent: 20,
        scrollTrigger: auroraST(2),
      });

      // Twinkle
      gsap.utils.toArray<HTMLElement>("[data-space-star]").forEach((s, i) => {
        gsap.to(s, {
          opacity: `+=${(i % 3) === 0 ? -0.35 : 0.25}`,
          duration: 1.4 + (i % 6) * 0.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: (i % 9) * 0.12,
        });
      });

      // Shooting stars — periodic
      const fireShootingStar = () => {
        const el = document.createElement("div");
        el.className = "pointer-events-none absolute";
        const startX = 5 + Math.random() * 60; // vw
        const startY = 5 + Math.random() * 30; // vh
        const length = 140 + Math.random() * 120;
        el.style.left = `${startX}vw`;
        el.style.top = `${startY}vh`;
        el.style.width = `${length}px`;
        el.style.height = "2px";
        el.style.transform = "rotate(20deg)";
        el.style.transformOrigin = "left center";
        el.style.background =
          "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 60%, #fff 100%)";
        el.style.borderRadius = "9999px";
        el.style.boxShadow =
          "0 0 8px rgba(255,255,255,0.9), 0 0 24px rgba(168,85,247,0.55)";
        el.style.opacity = "0";
        root.appendChild(el);

        gsap.fromTo(
          el,
          { x: -length, opacity: 0 },
          {
            x: window.innerWidth * 0.5 + length,
            y: window.innerHeight * 0.35,
            opacity: 1,
            duration: 0.9 + Math.random() * 0.5,
            ease: "power2.in",
            onComplete: () => el.remove(),
          }
        );
      };

      const shootInterval = window.setInterval(
        () => fireShootingStar(),
        3200 + Math.random() * 1800
      );
      // one right away
      window.setTimeout(fireShootingStar, 900);

      // Rockets — occasional
      const rocketColors = ["#60a5fa", "#a855f7", "#f472b6"];
      const fireRocket = () => {
        const rocket = document.createElement("div");
        rocket.className = "pointer-events-none absolute";
        const startX = 5 + Math.random() * 90; // vw
        const drift = (Math.random() - 0.5) * 200;
        const color =
          rocketColors[Math.floor(Math.random() * rocketColors.length)];
        rocket.style.left = `${startX}vw`;
        rocket.style.top = "100vh";
        rocket.style.width = "3px";
        rocket.style.height = "22px";
        rocket.style.borderRadius = "9999px";
        rocket.style.background = `linear-gradient(180deg, ${color}, rgba(255,255,255,0.9))`;
        rocket.style.boxShadow = `0 0 12px ${color}, 0 0 32px ${color}`;
        rocket.style.opacity = "0";
        root.appendChild(rocket);

        // trail
        const trail = document.createElement("div");
        trail.className = "pointer-events-none absolute";
        trail.style.left = `${startX}vw`;
        trail.style.top = "100vh";
        trail.style.width = "2px";
        trail.style.height = "90px";
        trail.style.borderRadius = "9999px";
        trail.style.background = `linear-gradient(180deg, ${color}00, ${color}aa)`;
        trail.style.filter = "blur(2px)";
        trail.style.opacity = "0";
        root.appendChild(trail);

        const tl = gsap.timeline({
          onComplete: () => {
            rocket.remove();
            trail.remove();
          },
        });
        tl.to([rocket, trail], { opacity: 1, duration: 0.2 }, 0)
          .to(
            [rocket, trail],
            {
              y: -(window.innerHeight + 200),
              x: drift,
              duration: 3.2 + Math.random() * 1.5,
              ease: "power1.in",
            },
            0
          )
          .to([rocket, trail], { opacity: 0, duration: 0.4 }, "-=0.5");
      };

      const rocketInterval = window.setInterval(
        () => fireRocket(),
        9000 + Math.random() * 6000
      );
      window.setTimeout(fireRocket, 2500);

      return () => {
        window.clearInterval(shootInterval);
        window.clearInterval(rocketInterval);
      };
    }, root);

    return () => {
      cancelAnimationFrame(blurRafId);
      ctx.revert();
    };

  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at 20% 10%, rgba(30,27,75,0.6), transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(76,29,149,0.55), transparent 60%), #05060f",
      }}
    >
      {/* Aurora blobs */}
      <div
        data-space-aurora-1
        className="absolute -top-40 -left-32 w-[640px] h-[640px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(96,165,250,0.6), transparent 60%)",
        }}
      />
      <div
        data-space-aurora-2
        className="absolute top-1/3 -right-40 w-[720px] h-[720px] rounded-full opacity-35 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.55), transparent 60%)",
        }}
      />
      <div
        data-space-aurora-3
        className="absolute -bottom-48 left-1/4 w-[680px] h-[680px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(244,114,182,0.5), transparent 60%)",
        }}
      />

      {/* Star layers */}
      {layers.map((layer, li) => (
        <div
          key={li}
          data-space-layer
          data-depth={layer.depth}
          className="absolute inset-0 will-change-transform"
          style={{ height: "140%" }}
        >
          {layer.stars.map((s, i) => (
            <span
              key={i}
              data-space-star
              className="absolute rounded-full bg-white"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: `${s.r * layer.size}px`,
                height: `${s.r * layer.size}px`,
                opacity: s.o,
                boxShadow: layer.glow
                  ? "0 0 8px rgba(168,85,247,0.7)"
                  : "0 0 2px rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
