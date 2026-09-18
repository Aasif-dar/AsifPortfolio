"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";
import { CloseIcon, MenuIcon } from "./icons";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];

function useLocalTime(timeZone: string) {
  const [time, setTime] = useState("");

  useEffect(() => {
    function tick() {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone,
          hour: "numeric",
          minute: "2-digit",
        }).format(new Date())
      );
    }
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#about");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const time = useLocalTime("Asia/Kolkata");

  useEffect(() => {
    function handleScroll() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setScrolled(window.scrollY > 20);
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = [{ href: "#home" }, ...NAV_LINKS]
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 p-4 transition-all duration-500">
      <div className="mx-auto max-w-6xl">
        <nav
          className={`relative flex items-center justify-between rounded-2xl border px-6 transition-all duration-500 ${
            scrolled
              ? "border-border/60 bg-background/80 shadow-2xl backdrop-blur-2xl py-3"
              : "border-transparent bg-transparent py-5"
          }`}
        >
          {/* Brand Mark */}
          <a
            href="#home"
            className="group flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-foreground"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-muted/30 font-semibold text-accent transition-transform duration-300 group-hover:scale-110">
              /
            </span>
            <span className="font-semibold transition-opacity group-hover:opacity-75">
              {siteConfig.name}
            </span>
          </a>

          {/* Desktop Links with Monospace Indexes */}
          <ul className="hidden items-center gap-1 rounded-full border border-border/40 bg-muted/20 p-1.5 backdrop-blur-lg md:flex">
            {NAV_LINKS.map((link, idx) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                      isActive
                        ? "text-foreground bg-background shadow-sm"
                        : "text-secondary hover:text-foreground"
                    }`}
                  >
                    <span className="font-mono text-[10px] opacity-40">
                      0{idx + 1}
                    </span>
                    <span>{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Time & Availability Badge */}
          <div className="hidden items-center gap-4 border-l border-border/40 pl-5 md:flex">
            <div className="flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-3 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-xs font-medium tabular-nums text-foreground">
                {time || "--:--"}
              </span>
              <span className="font-mono text-[10px] uppercase text-secondary">
                IST
              </span>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 bg-muted/30 text-foreground transition-colors hover:bg-muted/60 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>

          {/* Subtly Glowing Bottom Border Accent for Scroll Progress */}
          <div
            className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-150 opacity-80"
            style={{ width: `${progress}%` }}
          />
        </nav>

        {/* Mobile Flyout Canvas */}
        <div
          className={`mt-2 overflow-hidden rounded-2xl border border-border/60 bg-background/95 backdrop-blur-2xl transition-all duration-300 md:hidden ${
            open
              ? "max-h-96 opacity-100 p-6"
              : "max-h-0 opacity-0 p-0 pointer-events-none"
          }`}
        >
          <ul className="space-y-1">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    active === link.href
                      ? "bg-accent/10 text-accent font-semibold"
                      : "text-foreground/80 hover:bg-muted/40 hover:text-foreground"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs opacity-40">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-4">
            <span className="font-mono text-xs text-secondary">
              {time || "—"}
            </span>
            <span className="text-xs font-medium text-accent">
              ● Open to work
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}