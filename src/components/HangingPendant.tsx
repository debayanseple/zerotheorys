import { useEffect, useRef, useState } from "react";
import pendant from "@/assets/pendant.svg";

/**
 * A pendant SVG that hangs from a string anchored just below the
 * "Start project" button in the navbar and swings toward the cursor.
 */
export default function HangingPendant() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);
  const target = useRef(0);
  const current = useRef(0);
  const velocity = useRef(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Pivot is at the top-center of the wrapper
      const pivotX = rect.left + rect.width / 2;
      const pivotY = rect.top;
      const dx = e.clientX - pivotX;
      const dy = Math.max(e.clientY - pivotY, 1);
      // Angle in degrees from vertical (down) axis — follow the cursor
      const deg = Math.atan2(dx, dy) * (180 / Math.PI);
      // Clamp swing (negate so the pendant leans toward the cursor)
      target.current = Math.max(-45, Math.min(45, -deg * 0.7));
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      // Spring physics toward target
      const k = 0.06; // stiffness
      const d = 0.86; // damping
      const force = (target.current - current.current) * k;
      velocity.current = (velocity.current + force) * d;
      current.current += velocity.current;
      setAngle(current.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed z-40 hidden lg:block"
      style={{
        // Anchored to the very top of the screen, centered horizontally.
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {/* String */}
      <div
        style={{
          transformOrigin: "top center",
          transform: `rotate(${angle}deg)`,
          transition: "none",
        }}
      >
        <div
          className="mx-auto"
          style={{
            width: 1.5,
            height: 140,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.15))",
            boxShadow: "0 0 6px rgba(255,255,255,0.25)",
          }}
        />
        <img
          src={pendant}
          alt=""
          draggable={false}
          className="mx-auto block select-none"
          style={{
            width: 180,
            height: "auto",
            marginTop: -2,
            filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.55))",
          }}
        />
      </div>
    </div>
  );
}
