"use client";

import type { SkillCategory } from "@/types";
import { skills } from "@/data/skills";
import ScrollReveal from "./ScrollReveal";

const CATEGORY_ORDER: SkillCategory[] = ["Frontend", "Backend", "Database", "Tools"];

function groupSkills() {
  return CATEGORY_ORDER.map((category) => ({
    category,
    items: skills.filter((skill) => skill.category === category),
  })).filter((group) => group.items.length > 0);
}

export default function About() {
  const groups = groupSkills();

  return (
    <section id="about" className="relative scroll-mt-16 border-t border-border/40 py-16 sm:py-24">
      {/* Subtle Background Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[100px]"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Minimal Header */}
        <ScrollReveal className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">
              About
            </span>
          </div>

        <h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-4xl">
  A developer who cares about{" "}
  <span className="font-semibold">how things work</span>
  {" and "}
  <span className="font-semibold">how they feel.</span>
</h2>
        </ScrollReveal>

        {/* Creative Asymmetrical Layout */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-12 sm:gap-8">
          {/* Bio Block */}
          <ScrollReveal delay={100} className="sm:col-span-5">
            <p className="text-xs leading-relaxed text-secondary/90 sm:text-sm">
              I&apos;m a full stack developer focused on crafting clean, fast, and scalable web applications.
              I bridge design and architecture using TypeScript, React, Next.js, Node.js, and .NET Core to produce thoughtful digital experiences.
            </p>
          </ScrollReveal>

          {/* Minimal Creative Stack Matrix */}
          <ScrollReveal delay={200} className="sm:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/30 p-4 shadow-sm backdrop-blur-xl sm:p-5">
              <div className="space-y-3">
                {groups.map((group) => (
                  <div
                    key={group.category}
                    className="group flex flex-col gap-1.5 border-b border-border/30 pb-2.5 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-wider text-secondary/70 group-hover:text-indigo-400 transition-colors">
                      {group.category}
                    </span>
                    <div className="flex flex-wrap gap-1.5 sm:justify-end">
                      {group.items.map((skill) => (
                        <span
                          key={skill.name}
                          className="rounded-md bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium text-foreground/90 transition-colors group-hover:bg-white/[0.06]"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}