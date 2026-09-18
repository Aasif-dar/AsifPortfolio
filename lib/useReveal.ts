"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "./useMediaQuery";

/**
 * Fires once an element scrolls into view. Skips straight to visible when
 * the user has prefers-reduced-motion set, so content never depends on
 * motion to appear.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [intersected, setIntersected] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersected(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return { ref, visible: reducedMotion || intersected };
}
