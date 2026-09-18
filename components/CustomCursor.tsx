"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

type Variant = "default" | "hover" | "project";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<Variant>("default");
  const enabled = useMediaQuery("(pointer: fine)");

  useEffect(() => {
    if (!enabled) return;

    function handleMove(e: MouseEvent) {
      const { clientX, clientY } = e;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
    }

    function handleOver(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="project"]')) {
        setVariant("project");
        return;
      }
      if (target.closest("a, button, input, textarea, [role='button']")) {
        setVariant("hover");
        return;
      }
      setVariant("default");
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-100 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-100 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,background-color,border-color] duration-200 ease-out ${
          variant === "project"
            ? "h-16 w-16 border-accent bg-background/90"
            : variant === "hover"
              ? "h-9 w-9 border-accent bg-transparent"
              : "h-6 w-6 border-foreground/40 bg-transparent"
        } flex items-center justify-center`}
      >
        {variant === "project" && (
          <span className="font-mono text-[10px] tracking-widest text-accent">VIEW →</span>
        )}
      </div>
    </>
  );
}
