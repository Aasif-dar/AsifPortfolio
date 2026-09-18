"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/lib/useReveal";
import { useMediaQuery } from "@/lib/useMediaQuery";

export default function AnimatedNumber({
  value,
  duration = 1200,
  className = "",
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLSpanElement>();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!visible || startedRef.current || reducedMotion) return;
    startedRef.current = true;

    let raf: number;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, value, duration, reducedMotion]);

  const shown = reducedMotion && visible ? value : display;

  return (
    <span ref={ref} className={className}>
      {shown.toLocaleString()}
    </span>
  );
}
