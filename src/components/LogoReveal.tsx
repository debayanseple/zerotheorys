import { useEffect, useRef } from "react";
import logoAsset from "@/assets/Zero_Theorys_Logo.png.asset.json";

/**
 * Zero Theorys logo reveal.
 * Renders the full SVG logo. A `.play` class (added by parent
 * Services section on scroll-into-view) triggers the entrance +
 * continuous shine/breathe loops.
 */
export default function LogoReveal() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches && rootRef.current) rootRef.current.classList.add("play");
  }, []);

  return (
    <div ref={rootRef} data-lockup className="zt-lockup relative w-[90%] aspect-square">
      <img
        src={logoAsset.url}
        alt="Zero Theorys"
        className="zt-logo absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
        draggable={false}
      />
      <div className="zt-shine absolute inset-0 overflow-hidden pointer-events-none rounded-2xl" />

      <style>{`
        .zt-logo{
          opacity:0;
          transform: scale(0.6) rotate(-10deg);
          filter: drop-shadow(0 0 0 rgba(34,211,238,0));
          will-change: transform, opacity, filter;
        }
        .zt-lockup.play .zt-logo{
          animation:
            zt-logoIn 1.1s cubic-bezier(.2,1.2,.35,1) 0.05s forwards,
            zt-logoBreathe 4s ease-in-out 1.4s infinite;
        }
        @keyframes zt-logoIn{
          0%   { opacity:0; transform: scale(0.6) rotate(-10deg); filter: drop-shadow(0 0 0 rgba(34,211,238,0)); }
          60%  { opacity:1; transform: scale(1.05) rotate(2deg); }
          100% { opacity:1; transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 24px rgba(34,211,238,0.35)); }
        }
        @keyframes zt-logoBreathe{
          0%,100%{ filter: drop-shadow(0 0 18px rgba(34,211,238,0.28)); transform: scale(1); }
          50%    { filter: drop-shadow(0 0 34px rgba(59,91,255,0.5)); transform: scale(1.015); }
        }

        .zt-shine{ opacity:0; }
        .zt-lockup.play .zt-shine{ animation: zt-shineOn 0.3s linear 1s forwards; }
        @keyframes zt-shineOn{ to{ opacity:1; } }
        .zt-shine::after{
          content:"";
          position:absolute;
          top:-40%; left:-60%;
          width:35%; height:180%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: rotate(8deg);
        }
        .zt-lockup.play .zt-shine::after{
          animation: zt-sweep 3.6s ease-in-out 1.4s infinite;
        }
        @keyframes zt-sweep{
          0%   { left:-60%; }
          30%  { left:130%; }
          100% { left:130%; }
        }

        @media (prefers-reduced-motion: reduce){
          .zt-lockup.play .zt-logo,
          .zt-lockup.play .zt-shine,
          .zt-lockup.play .zt-shine::after{
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: drop-shadow(0 0 18px rgba(34,211,238,0.28)) !important;
          }
        }
      `}</style>
    </div>
  );
}
