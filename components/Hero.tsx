"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import ScrollReveal from "./ScrollReveal";
import SectionBackdrop from "./SectionBackdrop";
import SignatureMark from "./SignatureMark";
import { ArrowRightIcon, GithubIcon, LinkedinIcon, MailIcon } from "./icons";

const codeLines = [
  "const asif = new Developer();",
  "asif.stack = ['MERN', 'ASP.NET', 'AI'];",
  "asif.ship(ideas); // clean & premium",
];

function useTypewriter(lines: string[], speed = 45, pause = 1400) {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = lines[lineIndex];
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), speed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), speed / 2);
    } else {
      setDeleting(false);
      setLineIndex((i) => (i + 1) % lines.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, lineIndex, lines, speed, pause]);

  return text;
}

function highlight(str: string) {
  const parts = str.split(/(['"][^'"]*['"]?|\b(?:const|new|let)\b)/g);
  return parts.map((part, i) => {
    if (!part) return null;
    if (/^['"]/.test(part)) {
      return (
        <span key={i} className="text-emerald-400">
          {part}
        </span>
      );
    }
    if (/^(const|new|let)$/.test(part)) {
      return (
        <span key={i} className="text-indigo-400">
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

const heatCells = Array.from({ length: 72 }, (_, i) => (i * 13) % 5);
const heatShades = [
  "bg-emerald-950/20 border border-emerald-500/10",
  "bg-[#0e4429] border border-[#006d32]/40",
  "bg-[#006d32] border border-[#26a641]/50",
  "bg-[#26a641] border border-[#39d353]/60",
  "bg-[#39d353] border border-emerald-300",
];

function IconReact({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="2.1" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4.3" />
      <ellipse cx="12" cy="12" rx="10" ry="4.3" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.3" transform="rotate(120 12 12)" />
    </svg>
  );
}
function IconNode({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 2.5 L20.5 7.25 V16.75 L12 21.5 L3.5 16.75 V7.25 Z" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconDotNet({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="9.5" cy="12" r="6" />
      <circle cx="14.5" cy="12" r="6" />
    </svg>
  );
}
function IconDatabase({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <ellipse cx="12" cy="5.5" rx="8" ry="2.8" />
      <path d="M4 5.5v6.2c0 1.55 3.58 2.8 8 2.8s8-1.25 8-2.8V5.5" />
      <path d="M4 11.7v6.2c0 1.55 3.58 2.8 8 2.8s8-1.25 8-2.8v-6.2" />
    </svg>
  );
}
function IconAI({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="6.5" y="6.5" width="11" height="11" rx="2" />
      <rect x="10" y="10" width="4" height="4" rx="0.6" fill="currentColor" stroke="none" />
      <path d="M9 2.5v3M15 2.5v3M9 18.5v3M15 18.5v3M2.5 9h3M2.5 15h3M18.5 9h3M18.5 15h3" strokeWidth="1.2" />
    </svg>
  );
}

const orbitNodes = [
  { label: "AI", Icon: IconAI, x: 130, y: 40, color: "text-fuchsia-400" },
  { label: "SQL Server", Icon: IconDatabase, x: 215.6, y: 102.2, color: "text-sky-400" },
  { label: ".NET", Icon: IconDotNet, x: 182.9, y: 202.8, color: "text-indigo-400" },
  { label: "Node.js", Icon: IconNode, x: 77.1, y: 202.8, color: "text-emerald-400" },
  { label: "React", Icon: IconReact, x: 44.4, y: 102.2, color: "text-cyan-400" },
];

function handleTilt(e: MouseEvent<HTMLDivElement>) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rotateX = ((y - rect.height / 2) / rect.height) * -6;
  const rotateY = ((x - rect.width / 2) / rect.width) * 6;
  card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}
function resetTilt(e: MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg)";
}

const noiseBg =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function Hero() {
  const typed = useTypewriter(codeLines);
  const spotlightRef = useRef<HTMLDivElement>(null);

  function handleSpotlight(e: MouseEvent<HTMLElement>) {
    if (!spotlightRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(99,102,241,0.10), transparent 40%)`;
  }

  return (
    <section
      id="home"
      onMouseMove={handleSpotlight}
      className="relative flex min-h-screen scroll-mt-16 flex-col justify-center overflow-hidden px-5 py-6 sm:px-10 sm:py-8"
    >
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .float-slow { animation: float 6s ease-in-out infinite; }
        .float-slow-delayed { animation: float 6s ease-in-out infinite; animation-delay: 1.2s; }
      `}</style>

      <div ref={spotlightRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: noiseBg }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 via-sky-400/15 to-emerald-400/20 blur-[130px]"
      />

      <SectionBackdrop />

      {/* Desktop Floating Left Panel */}
      <ScrollReveal
        delay={150}
        className="pointer-events-none absolute left-6 top-1/4 z-10 hidden w-64 -translate-y-1/2 flex-col gap-3 lg:flex xl:left-12"
      >
        <span className="pointer-events-auto bg-gradient-to-r from-foreground to-secondary bg-clip-text text-[10px] font-semibold uppercase tracking-widest text-transparent">
          Currently coding
        </span>
        <div className="float-slow pointer-events-auto relative">
          <div aria-hidden className="pointer-events-none absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-br from-indigo-500/15 via-sky-400/10 to-emerald-400/15 blur-2xl" />
          <div
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            style={{ transition: "transform 0.2s ease-out" }}
            className="overflow-hidden rounded-2xl border border-border bg-background/50 shadow-xl backdrop-blur-xl"
          >
            <span aria-hidden className="block h-px w-full bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent" />
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-2 text-[10px] font-medium text-secondary">portfolio.js</span>
              <span className="ml-auto flex items-center gap-1 text-[9px] font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                live
              </span>
            </div>
            <div className="min-h-[4.5rem] px-4 py-4 font-mono text-[11px] leading-relaxed text-foreground">
              <span className="text-sky-400">{">"}</span> {highlight(typed)}
              <span className="animate-pulse text-secondary">▌</span>
            </div>
          </div>
        </div>

        <div className="pointer-events-auto mt-5 rounded-2xl border border-border bg-background/40 p-4 shadow-lg backdrop-blur-xl">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-secondary">Shipping rhythm</span>
            <span className="flex items-center gap-1 text-[9px] font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> active
            </span>
          </div>
          <div className="relative overflow-hidden">
            <div className="grid grid-cols-12 gap-[3px] opacity-90">
              {heatCells.map((level, i) => (
                <span key={i} className={`h-2 w-2 rounded-[2px] transition-all hover:scale-125 hover:z-10 ${heatShades[level]}`} />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-background/90 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-background/90 to-transparent z-10" />
          </div>
          <p className="mt-2.5 text-[10px] leading-snug text-secondary">Consistently building, one commit at a time</p>
        </div>
      </ScrollReveal>

      {/* Desktop Floating Right Panel */}
      <ScrollReveal
        delay={200}
        className="pointer-events-none absolute right-6 top-1/4 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex xl:right-10"
      >
        <span className="pointer-events-auto bg-gradient-to-r from-foreground to-secondary bg-clip-text text-[10px] font-semibold uppercase tracking-widest text-transparent">
          Skills constellation
        </span>
        <div className="float-slow-delayed pointer-events-auto relative h-[260px] w-[260px]">
          <div aria-hidden className="pointer-events-none absolute -inset-6 -z-20 rounded-full bg-gradient-to-tr from-indigo-500/15 via-sky-400/10 to-emerald-400/15 blur-2xl" />
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 -z-10 rounded-full opacity-40 blur-2xl animate-[spin_50s_linear_infinite_reverse]"
            style={{
              background: "conic-gradient(from 0deg, rgba(99,102,241,0.25), rgba(56,189,248,0.15), rgba(52,211,153,0.25), rgba(99,102,241,0.25))",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 animate-[spin_8s_linear_infinite] overflow-hidden rounded-full mix-blend-screen"
            style={{
              background: "conic-gradient(from 0deg, transparent 0deg, transparent 330deg, rgba(99,102,241,0.45) 348deg, rgba(56,189,248,0.6) 360deg)",
            }}
          />
          <div onMouseMove={handleTilt} onMouseLeave={resetTilt} style={{ transition: "transform 0.2s ease-out" }} className="absolute inset-0">
            <div className="absolute inset-0 animate-[spin_40s_linear_infinite]">
              <svg viewBox="0 0 260 260" className="absolute inset-0 h-full w-full">
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" className="text-indigo-400" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" className="text-emerald-400" />
                  </linearGradient>
                </defs>
                {orbitNodes.map((node, i) => {
                  const d = `M130,130 L${node.x},${node.y}`;
                  return (
                    <g key={node.label}>
                      <path d={d} stroke="url(#lineGrad)" strokeWidth="1" fill="none" />
                      <circle r="2.2" className={node.color} fill="currentColor" opacity="0.8">
                        <animateMotion dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="linear" path={d} />
                      </circle>
                    </g>
                  );
                })}
              </svg>
              {orbitNodes.map((node) => (
                <span key={node.label} style={{ left: node.x, top: node.y }} className="group absolute -translate-x-1/2 -translate-y-1/2">
                  <span className="block animate-[spin_40s_linear_infinite_reverse]">
                    <span role="img" aria-label={node.label} className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-white/10 via-white/5 to-transparent p-[1.5px] shadow-md transition-transform duration-300 group-hover:scale-110">
                      <span className="flex h-full w-full items-center justify-center rounded-full border border-border bg-background/90 backdrop-blur-xl">
                        <node.Icon className={`h-6 w-6 ${node.color}`} />
                      </span>
                    </span>
                    <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-background/90 px-2 py-1 text-[9px] font-medium text-foreground opacity-0 shadow-md backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                      {node.label}
                    </span>
                  </span>
                </span>
              ))}
            </div>
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400/50 via-sky-400/40 to-emerald-400/50 p-[1.5px] shadow-lg">
              <span className="relative flex h-full w-full items-center justify-center rounded-full bg-background/90 font-mono text-sm font-semibold text-foreground backdrop-blur-xl">
                {"</>"}
                <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-indigo-400/15" />
              </span>
            </span>
          </div>
        </div>
        <span className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1 text-[10px] font-medium text-foreground shadow-md backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Open to new projects
        </span>
      </ScrollReveal>

      {/* Main Container */}
      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <ScrollReveal className="flex items-start justify-between gap-6">
          <div className="max-w-[9.5rem] sm:max-w-[12rem]">
            <span className="badge bg-gradient-to-r from-indigo-500/10 via-sky-500/10 to-emerald-500/10">
              <GithubIcon className="h-3 w-3 text-foreground" />
              @{siteConfig.name.replace(/\s+/g, "").toLowerCase()}
            </span>
            <p className="mt-3 text-sm font-semibold leading-snug tracking-tight text-foreground sm:text-base">
              If my code doesn&apos;t solve the problem,
            </p>
          </div>
          <p className="max-w-[9.5rem] bg-gradient-to-r from-foreground via-foreground to-secondary bg-clip-text text-right text-2xl font-medium leading-[0.95] tracking-tight text-transparent sm:max-w-[12rem] sm:text-4xl">
            who will use it?
          </p>
        </ScrollReveal>

        {/* Portrait Container */}
        <ScrollReveal delay={100} className="relative mx-auto w-[99%] sm:w-[99%]">
          <div aria-hidden className="pointer-events-none absolute -inset-3 rounded-full bg-gradient-to-b from-indigo-500/10 via-sky-400/12 to-transparent blur-2xl" />
          <div className="relative mx-auto aspect-[1/2] h-[20rem] w-full overflow-hidden sm:h-[42rem]">
            <Image
              src={siteConfig.image}
              alt={siteConfig.name}
              fill
              priority
              sizes="(max-width: 768px) 88vw, 520px"
              className="object-contain object-center mix-blend-multiply"
            />
          </div>
          <a
            href="#projects"
            aria-label="View projects"
            className="group absolute -right-4 -top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-gradient-to-br from-background via-background to-accent/10 shadow-lg transition-all duration-300 hover:scale-110 hover:border-accent hover:bg-accent hover:text-background sm:-right-5 sm:-top-5 sm:h-10 sm:w-10"
          >
            <ArrowRightIcon className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
          </a>
          <div className="mt-1 flex items-center gap-2.5">
            <SignatureMark />
            <div className="leading-none">
              <p className="bg-gradient-to-r from-foreground to-secondary bg-clip-text text-[11px] font-semibold uppercase tracking-widest text-transparent">
                {siteConfig.name}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-secondary">{siteConfig.role}</p>
            </div>
          </div>
        </ScrollReveal>

        {/* MOBILE ONLY SIDE COMPONENTS (Inline Glass Cards) */}
        <div className="mt-8 flex flex-col gap-4 lg:hidden">
          {/* Live Code + Rhythm Card */}
          <ScrollReveal delay={150}>
            <div className="rounded-2xl border border-border bg-background/50 p-4 shadow-xl backdrop-blur-xl">
              <div className="mb-3 flex items-center justify-between border-b border-border/60 pb-2.5">
                <span className="bg-gradient-to-r from-foreground to-secondary bg-clip-text text-[10px] font-semibold uppercase tracking-widest text-transparent">
                  Currently Coding
                </span>
                <span className="flex items-center gap-1 text-[9px] font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  live
                </span>
              </div>
              <div className="rounded-xl border border-border/40 bg-background/80 p-3 font-mono text-[11px] leading-relaxed text-foreground">
                <span className="text-[#38bdf8]">{">"}</span> {highlight(typed)}
                <span className="animate-pulse text-secondary">▌</span>
              </div>
              <div className="mt-4 pt-2">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-secondary">Shipping Rhythm</span>
                  <span className="text-[9px] text-emerald-400">Active</span>
                </div>
                <div className="relative overflow-hidden">
                  <div className="grid grid-cols-12 gap-[3px] opacity-90">
                    {heatCells.map((level, i) => (
                      <span key={i} className={`h-2 w-2 rounded-[2px] transition-all hover:scale-125 hover:z-10 ${heatShades[level]}`} />
                    ))}
                  </div>
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-background/90 to-transparent z-10" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-background/90 to-transparent z-10" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Interactive Mobile Tech Stack Grid */}
          <ScrollReveal delay={200}>
            <div className="rounded-2xl border border-border bg-background/50 p-4 shadow-xl backdrop-blur-xl">
              <div className="mb-3 flex items-center justify-between border-b border-border/60 pb-2.5">
                <span className="bg-gradient-to-r from-foreground to-secondary bg-clip-text text-[10px] font-semibold uppercase tracking-widest text-transparent">
                  Core Technologies
                </span>
                <span className="flex items-center gap-1.5 text-[9px] font-medium text-foreground">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Open to projects
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2 pt-1">
                {orbitNodes.map((node) => (
                  <div key={node.label} className="flex flex-col items-center justify-center rounded-xl border border-border/50 bg-background/60 py-2.5 shadow-sm">
                    <node.Icon className={`h-5 w-5 ${node.color}`} />
                    <span className="mt-1 text-[9px] font-medium text-foreground">{node.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Functional Row */}
        <ScrollReveal delay={250} className="mt-8 flex flex-wrap items-center justify-between gap-y-4 sm:mt-10">
          <div className="flex items-center gap-x-7">
            <a href="#projects" className="group link-arrow text-sm font-medium">
              View Projects
              <ArrowRightIcon className="link-arrow-icon h-3.5 w-3.5" />
            </a>
            <a href="#contact" className="group link-arrow text-sm font-medium">
              Contact Me
              <ArrowRightIcon className="link-arrow-icon h-3.5 w-3.5" />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-secondary transition-colors hover:text-foreground"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-secondary transition-colors hover:text-foreground"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.mail}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Email ${siteConfig.name}`}
              className="text-secondary transition-colors hover:text-foreground"
            >
              <MailIcon className="h-4 w-4" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}