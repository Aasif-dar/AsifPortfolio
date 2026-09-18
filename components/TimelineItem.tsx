"use client";

import { useEffect, useRef, useState } from "react";
import type { ExperienceItem } from "@/types";
import { useMediaQuery } from "@/lib/useMediaQuery";

export default function TimelineItem({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [intersected, setIntersected] = useState(false);
  const [active, setActive] = useState(false);
  const visible = reducedMotion || intersected;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const revealObserver = !reducedMotion
      ? new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIntersected(true);
              revealObserver?.disconnect();
            }
          },
          { threshold: 0.15 }
        )
      : null;
    revealObserver?.observe(node);

    const activeObserver = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    activeObserver.observe(node);

    return () => {
      revealObserver?.disconnect();
      activeObserver.disconnect();
    };
  }, [reducedMotion]);

  return (
    <li
      ref={ref}
      style={{ transitionDelay: visible ? `${index * 80}ms` : "0ms" }}
      className={`relative transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <span
        className={`absolute -left-6 top-1.5 h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
          active
            ? "border-accent bg-accent shadow-[0_0_0_4px_var(--color-accent-subtle)]"
            : "border-border bg-background"
        }`}
        aria-hidden
      />

      <p
        className={`flex items-baseline gap-2 font-mono text-xs uppercase tracking-widest transition-colors duration-300 ${
          active ? "text-accent" : "text-secondary"
        }`}
      >
        <span className="opacity-40">0{index + 1}</span>
        {item.duration}
      </p>

      <h3
        className={`mt-3 text-xl font-medium transition-colors duration-300 md:text-2xl ${
          active ? "text-foreground" : "text-foreground/60"
        }`}
      >
        {item.position}
      </h3>
      <p className="mt-1 text-sm text-secondary">{item.company}</p>

      <p className="mt-4 max-w-xl text-sm leading-relaxed text-secondary">
        {item.description}
      </p>

      <p className="mt-4 font-mono text-xs text-secondary">
        {item.technologies.join("  ·  ")}
      </p>
    </li>
  );
}
