import { experience } from "@/data/experience";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";
import TimelineItem from "./TimelineItem";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <ScrollReveal>
          <SectionHeading eyebrow="Experience" title="Where I've worked" />
        </ScrollReveal>

        <ol className="mt-14 list-none space-y-12 border-l border-border pl-8">
          {experience.map((item, index) => (
            <TimelineItem key={item.company} item={item} delay={index * 100} />
          ))}
        </ol>
      </div>
    </section>
  );
}
