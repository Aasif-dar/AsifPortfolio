import Image from "next/image";
import type { Project } from "@/types";
import ScrollReveal from "./ScrollReveal";
import { ExternalLinkIcon, GithubIcon } from "./icons";

export default function ProjectCard({
  project,
  reversed = false,
}: {
  project: Project;
  reversed?: boolean;
}) {
  return (
    <ScrollReveal>
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14">
        <div
          className={`group relative overflow-hidden rounded-2xl border border-border ${
            reversed ? "md:order-2" : ""
          }`}
        >
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            width={1200}
            height={800}
            className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>

        <div className={reversed ? "md:order-1" : ""}>
          <h3 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="chip-sm">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-6">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                <ExternalLinkIcon /> Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                <GithubIcon className="h-4 w-4" /> Source
              </a>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
