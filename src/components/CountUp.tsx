import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [display, setDisplay] = useState(() => value.replace(/\d/g, "0"));

  useEffect(() => {
    if (!inView) return;
    const parts = value.split(/(\d+(?:\.\d+)?)/);
    const nums = parts
      .map((p, i) => (/\d/.test(p) ? { i, target: parseFloat(p), raw: p } : null))
      .filter(Boolean) as { i: number; target: number; raw: string }[];

    const current = parts.slice();
    const controls = nums.map((n) =>
      animate(0, n.target, {
        duration: 1.4,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => {
          const decimals = (n.raw.split(".")[1] || "").length;
          current[n.i] = decimals ? v.toFixed(decimals) : Math.round(v).toString();
          setDisplay(current.join(""));
        },
      })
    );
    return () => controls.forEach((c) => c.stop());
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}
