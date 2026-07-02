import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollFX() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll progress bar
      gsap.to("#scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });

      // Parallax on hero image
      gsap.utils.toArray<HTMLElement>("#hero img").forEach((img) => {
        gsap.to(img, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Section headings — subtle scroll-linked lift
      gsap.utils.toArray<HTMLElement>("section h2").forEach((h) => {
        if (h.closest("[data-no-fx]")) return;
        gsap.from(h, {
          y: 40,
          opacity: 0,

          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: h,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Glass cards — stagger on enter, scale-linked while in view
      gsap.utils.toArray<HTMLElement>("section .glass").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Manifesto: pin & word reveal not needed — framer handles it.
      // Refresh after fonts/images load
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none"
    >
      <div
        id="scroll-progress"
        className="h-full origin-left scale-x-0"
        style={{
          background:
            "linear-gradient(90deg, var(--neon-blue, #60a5fa), var(--neon-purple, #a855f7))",
          boxShadow: "0 0 12px rgba(168,85,247,0.6)",
        }}
      />
    </div>
  );
}
