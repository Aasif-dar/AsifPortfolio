"use client";

import type { ExperienceItem } from "@/types";
import { useReveal } from "@/lib/useReveal";

export default function TimelineItem({
  item,
  delay = 0,
}: {
  item: ExperienceItem;
  delay?: number;
}) {
  const { ref, visible } = useReveal<HTMLLIElement>();

  return (
    <li
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`relative transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_-1px_var(--color-accent)]" />
      <p className="font-mono text-sm text-muted">{item.duration}</p>
      <h3 className="mt-1 text-xl font-semibold text-foreground">
        {item.position} <span className="text-muted">·</span>{" "}
        <span className="text-accent">{item.company}</span>
      </h3>
      <p className="mt-2 text-muted leading-relaxed">{item.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {item.technologies.map((tech) => (
          <span key={tech} className="chip-sm">
            {tech}
          </span>
        ))}
      </div>
    </li>
  );
}
