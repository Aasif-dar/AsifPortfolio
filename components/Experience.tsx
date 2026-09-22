"use client";

import { useEffect, useRef, useState } from "react";
import { experience } from "@/data/experience";
import ScrollReveal from "./ScrollReveal";
import TimelineItem from "./TimelineItem";

export default function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const node = trackRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.5;
      const covered = viewportCenter - rect.top;
      const ratio = Math.min(1, Math.max(0, rect.height > 0 ? covered / rect.height : 0));
      setProgress(ratio * 100);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section id="experience" className="relative scroll-mt-16 border-t border-border/40 py-16 sm:py-24">
      {/* Subtle Background Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-1/2 -z-10 h-64 w-64 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px]"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Minimal Header */}
        <ScrollReveal className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">
              Career
            </span>
          </div>

         <h2 className="text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl">
  Where I&apos;ve worked{" "}
  <span className="text-muted-foreground">&amp;</span>{" "}
  <span className="font-semibold">
    what I&apos;ve delivered.
  </span>
</h2>
        </ScrollReveal>

        {/* Minimal Animated Timeline */}
        <div ref={trackRef} className="relative mt-10 pl-6 sm:mt-12 sm:pl-8">
          {/* Base Track */}
          <div className="absolute left-2.5 top-2 bottom-2 w-px bg-border/40" aria-hidden />

          {/* Glowing Active Track */}
          <div
            className="absolute left-2.5 top-2 w-px bg-gradient-to-b from-indigo-400 via-sky-400 to-emerald-400 transition-[height] duration-150 ease-out shadow-[0_0_8px_rgba(56,189,248,0.5)]"
            style={{ height: `${progress}%` }}
            aria-hidden
          />

          <ol className="list-none space-y-10 sm:space-y-12">
            {experience.map((item, index) => (
              <TimelineItem key={item.company} item={item} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}