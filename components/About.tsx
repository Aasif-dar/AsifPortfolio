import { skills } from "@/data/skills";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="scroll-mt-16 border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <ScrollReveal>
          <SectionHeading eyebrow="About" title="A bit about me" />
        </ScrollReveal>

        <ScrollReveal delay={100} className="mt-8 space-y-4 text-lg leading-relaxed text-muted">
          <p>
            I&apos;m a full stack developer who enjoys turning ideas into fast, polished
            products — comfortable moving between database schemas, API design, and
            pixel-level UI details.
          </p>
          <p>
            I build web applications end to end: responsive interfaces, REST APIs,
            and the data layer that ties them together, with a focus on
            performance and clean architecture.
          </p>
          <p>
            My approach favors simplicity over cleverness — readable code, sensible
            abstractions, and shipping iteratively based on real feedback.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200} className="mt-10 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span key={skill.name} className="chip">
              {skill.name}
            </span>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
