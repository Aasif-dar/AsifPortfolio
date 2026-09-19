"use client";

import Image from "next/image";
import type { Project } from "@/types";
import ScrollReveal from "./ScrollReveal";
import { ArrowRightIcon, GithubIcon } from "./icons";

interface ProjectCardProps {
  project: Project;
  index: number;
  reversed?: boolean;
}

export default function ProjectCard({
  project,
  index,
  reversed = false,
}: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");
  const primaryHref = project.live || project.github;

  const image = (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border/50 bg-background/50 shadow-sm backdrop-blur-md transition-all duration-500 group-hover:border-sky-400/40 group-hover:shadow-lg">
      <Image
        src={project.image}
        alt={`${project.title} preview`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30"
      />
    </div>
  );

  return (
    <ScrollReveal>
      <div className="group relative">
        <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-12 sm:gap-8">
          {/* Project Image Frame */}
          <div className={`sm:col-span-7 ${reversed ? "sm:order-2" : ""}`}>
            {primaryHref ? (
              <a
                href={primaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {image}
              </a>
            ) : (
              image
            )}
          </div>

          {/* Project Details Content */}
          <div className={`flex flex-col justify-center sm:col-span-5 ${reversed ? "sm:order-1 sm:text-right" : ""}`}>
            <div className={`flex items-center gap-2 font-mono text-[10px] text-secondary/70 ${reversed ? "sm:justify-end" : ""}`}>
              <span>// {number}</span>
            </div>

            <h3 className="mt-1.5 text-xl font-medium tracking-tight text-foreground sm:text-2xl group-hover:text-sky-400 transition-colors">
              {project.title}
            </h3>

            {/* Premium Minimal Glass Description Box */}
            <p className="mt-3 rounded-xl border border-border/40 bg-background/30 p-3.5 text-xs leading-relaxed text-secondary/90 shadow-xs backdrop-blur-md sm:text-xs">
              {project.description}
            </p>

            {/* Minimal Technology Badges */}
            {/* <div className={`mt-3.5 flex flex-wrap gap-1.5 ${reversed ? "sm:justify-end" : ""}`}>
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-white/[0.03] border border-border/30 px-2 py-0.5 font-mono text-[9px] text-foreground/80"
                >
                  {tech}
                </span>
              ))}
            </div> */}

            {/* Links Bar */}
            <div className={`mt-4 flex items-center gap-4 ${reversed ? "sm:justify-end" : ""}`}>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/90 transition-colors hover:text-sky-400"
                >
                  Live Preview
                  <ArrowRightIcon className="h-3 w-3 -rotate-45" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary transition-colors hover:text-foreground"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}