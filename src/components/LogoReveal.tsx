import { useEffect, useRef } from "react";
import logoAsset from "@/assets/zerotheorys-logo.svg.asset.json";

/**
 * Zero Theorys animated logo reveal.
 * Animation plays once when the lockup gains the `.play` class
 * (added by the parent Services section as the user scrolls into it).
 * Breathe + shine sweep loops keep running after reveal.
 */
export default function LogoReveal() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Guard: if the user prefers reduced motion, reveal immediately.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches && rootRef.current) rootRef.current.classList.add("play");
  }, []);

  return (
    <div
      ref={rootRef}
      data-lockup
      className="zt-lockup relative w-[78%] aspect-square"
      style={{ ["--logo-url" as any]: `url(${logoAsset.url})` }}
    >
      <div className="zt-layer zt-icon" />
      <div className="zt-shine" />
      <div className="zt-layer zt-word" />
      <div className="zt-layer zt-tagline" />

      <style>{`
        .zt-layer{
          position:absolute; inset:0; width:100%; height:100%;
          background-image: var(--logo-url);
          background-repeat:no-repeat;
          background-size:100% 100%;
          background-position:0 0;
          opacity:0;
          will-change: transform, opacity, filter;
        }

        /* ICON — ZO monogram */
        .zt-icon{
          clip-path: inset(19% 26% 41% 25%);
          transform-origin: 50% 38%;
          filter: drop-shadow(0 0 0 rgba(34,211,238,0));
        }
        .zt-lockup.play .zt-icon{
          animation:
            zt-iconIn 1.05s cubic-bezier(.2,1.4,.4,1) 0.05s forwards,
            zt-iconBreathe 3.2s ease-in-out 1.3s infinite;
        }
        @keyframes zt-iconIn{
          0%   { opacity:0; transform: scale(0.35) rotate(-24deg); filter: drop-shadow(0 0 0 rgba(34,211,238,0)); }
          55%  { opacity:1; transform: scale(1.08) rotate(4deg); }
          75%  { transform: scale(0.97) rotate(-1.5deg); }
          100% { opacity:1; transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 22px rgba(34,211,238,0.35)); }
        }
        @keyframes zt-iconBreathe{
          0%,100%{ filter: drop-shadow(0 0 18px rgba(34,211,238,0.28)); transform: scale(1); }
          50%    { filter: drop-shadow(0 0 32px rgba(59,91,255,0.45)); transform: scale(1.015); }
        }

        /* Diagonal shine sweep */
        .zt-shine{
          position:absolute;
          inset:19% 26% 41% 25%;
          overflow:hidden;
          pointer-events:none;
          opacity:0;
        }
        .zt-lockup.play .zt-shine{
          animation: zt-shineReveal 0.4s linear 1.15s forwards;
        }
        @keyframes zt-shineReveal{ to{ opacity:1; } }
        .zt-shine::after{
          content:"";
          position:absolute;
          top:-40%; left:-60%;
          width:40%; height:180%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: rotate(8deg);
        }
        .zt-lockup.play .zt-shine::after{
          animation: zt-sweep 3.6s ease-in-out 1.6s infinite;
        }
        @keyframes zt-sweep{
          0%   { left:-60%; }
          30%  { left:130%; }
          100% { left:130%; }
        }

        /* WORDMARK */
        .zt-word{
          clip-path: inset(60% 3% 28% 3%);
          transform: translateY(14px);
        }
        .zt-lockup.play .zt-word{
          animation: zt-wordIn 0.85s cubic-bezier(.16,.9,.3,1) 0.95s forwards;
        }
        @keyframes zt-wordIn{
          to{ opacity:1; transform: translateY(0); }
        }

        /* TAGLINE */
        .zt-tagline{
          clip-path: inset(70% 1% 22% 1%);
          transform: translateY(8px) scaleX(0.92);
          transform-origin: 50% 50%;
        }
        .zt-lockup.play .zt-tagline{
          animation: zt-tagIn 0.9s ease-out 1.55s forwards;
        }
        @keyframes zt-tagIn{
          to{ opacity:0.92; transform: translateY(0) scaleX(1); }
        }

        @media (prefers-reduced-motion: reduce){
          .zt-lockup.play .zt-icon,
          .zt-lockup.play .zt-word,
          .zt-lockup.play .zt-tagline,
          .zt-lockup.play .zt-shine,
          .zt-lockup.play .zt-shine::after{
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
