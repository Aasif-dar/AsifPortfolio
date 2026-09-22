"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ScrollReveal from "./ScrollReveal";
import { ArrowRightIcon } from "./icons";

const INITIAL_COUNT = 3;

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT);
  const hasMore = projects.length > INITIAL_COUNT;

  return (
    <section id="projects" className="relative scroll-mt-16 border-t border-border/40 py-16 sm:py-24">
      {/* Subtle Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/3 top-1/3 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[120px]"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Minimal Section Header */}
        <ScrollReveal className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">
              Portfolio
            </span>
          </div>

          <h2 className="text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl">
  Selected Work{" "}
  <span className="text-muted-foreground">&amp;</span>{" "}
  <span className="font-semibold">
    featured builds.
  </span>
</h2>
          <p className="max-w-md text-xs text-secondary/80 sm:text-sm">
            A curated list of applications I&apos;ve designed, built, and deployed.
          </p>
        </ScrollReveal>

        {/* Asymmetrical Project Grid */}
        <div className="mt-12 space-y-12 sm:mt-16 sm:space-y-20">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              reversed={index % 2 === 1}
            />
          ))}
        </div>

        {/* Minimalist CTA Toggle Button */}
        {hasMore && (
          <ScrollReveal delay={100} className="mt-12 flex justify-center sm:mt-16">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="group relative inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-5 py-2 font-mono text-xs font-medium text-foreground backdrop-blur-md transition-all hover:border-sky-400/50 hover:bg-white/[0.04]"
            >
              <span>{showAll ? "Show Less" : "Explore More Projects"}</span>
              <ArrowRightIcon className={`h-3 w-3 transition-transform duration-300 ${showAll ? "-rotate-90" : "rotate-90 group-hover:translate-y-0.5"}`} />
            </button>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}