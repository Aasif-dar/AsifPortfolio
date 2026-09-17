import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-16 border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading eyebrow="Portfolio" title="Selected Projects" />
        </ScrollReveal>

        <div className="mt-16 space-y-24 md:space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} reversed={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
