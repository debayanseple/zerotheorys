import logoAsset from "@/assets/Zero_Theorys_Logo.png.asset.json";

/**
 * Zero Theorys logo lockup — pure markup.
 * Animation is orchestrated by the parent (Services.tsx) via GSAP so entrance,
 * shine, and floating share a single ScrollTrigger timeline.
 */
export default function LogoReveal() {
  return (
    <div
      data-lockup
      className="relative w-full h-full p-3 sm:p-5 flex items-center justify-center"
    >
      {/* soft radial glow behind logo */}
      <div
        data-glow
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(34,211,238,0.35), rgba(59,91,255,0.18) 55%, transparent 72%)",
          filter: "blur(6px)",
          opacity: 0,
        }}
      />

      <img
        data-logo
        src={logoAsset.url}
        alt="Zero Theorys"
        className="relative w-full h-full object-contain select-none pointer-events-none"
        draggable={false}
        style={{ opacity: 0 }}
      />

      {/* shine sweep overlay */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl"
      >
        <div
          data-shine
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 h-[140%] w-[35%]"
          style={{
            background:
              "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.55) 50%, transparent 80%)",
            opacity: 0,
          }}
        />
      </div>
    </div>
  );
}
