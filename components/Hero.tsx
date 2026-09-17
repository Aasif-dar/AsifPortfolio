import Image from "next/image";
import { siteConfig } from "@/data/site";
import ScrollReveal from "./ScrollReveal";
import { ArrowRightIcon, GithubIcon, LinkedinIcon } from "./icons";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen scroll-mt-16 items-center overflow-hidden pt-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]"
      />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 py-20 md:grid-cols-2">
        <ScrollReveal>
          <p className="font-mono text-sm text-accent">Hi, I&apos;m</p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {siteConfig.name}
          </h1>
          <p className="mt-3 text-xl text-muted md:text-2xl">{siteConfig.role}</p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            {siteConfig.intro}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#projects" className="btn-primary">
              View Projects
              <ArrowRightIcon className="h-4 w-4" />
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Me
            </a>
          </div>

          <div className="mt-9 flex items-center gap-5">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-muted transition-colors hover:text-accent"
            >
              <GithubIcon />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-muted transition-colors hover:text-accent"
            >
              <LinkedinIcon />
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150} className="mx-auto w-full max-w-sm">
          <div className="relative aspect-square w-full">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-accent/30 via-accent/5 to-transparent blur-2xl"
            />
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-border shadow-2xl">
              <Image
                src="/profile/profile.svg"
                alt={siteConfig.name}
                fill
                priority
                sizes="(max-width: 768px) 80vw, 400px"
                className="object-cover"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
