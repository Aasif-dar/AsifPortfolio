"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/data/site";
import ScrollReveal from "./ScrollReveal";
import SectionBackdrop from "./SectionBackdrop";
import { ArrowRightIcon, GithubIcon, LinkedinIcon, MailIcon } from "./icons";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: { name: string; email: string; message: string }) {
  if (!form.name.trim()) return "Please enter your name.";
  if (!EMAIL_PATTERN.test(form.email)) return "Please enter a valid email address.";
  if (form.message.trim().length < 10) return "Message should be at least 10 characters.";
  return "";
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const validationError = validate(form);
    if (validationError) {
      setError(validationError);
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError("");

    // Simulate pure client-side submission delay
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 800);
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-16 overflow-hidden border-t border-border/40 py-16 sm:py-24"
    >
      <SectionBackdrop />

      {/* Background Decorative Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/2 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-500/10 via-sky-400/10 to-emerald-400/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Heading & Social Links */}
          <div className="lg:col-span-5">
            <ScrollReveal className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">
                  05 // Contact
                </span>
              </div>

              <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
                Let&apos;s build <br />
                something{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                  great.
                </span>
              </h2>

              <p className="pt-2 text-xs leading-relaxed text-secondary/80 sm:text-sm">
                Have a project, idea, or opportunity? My inbox is always open.
              </p>
            </ScrollReveal>

            {/* Glassmorphic Contact Pills */}
            <ScrollReveal delay={120} className="mt-6 flex flex-col gap-2.5">
              <a
                href={siteConfig.mail}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between rounded-xl border border-border/40 bg-background/30 p-3 text-xs font-medium text-foreground backdrop-blur-md transition-all hover:border-indigo-400/50 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-2.5">
                  <MailIcon className="h-3.5 w-3.5 text-secondary group-hover:text-indigo-400 transition-colors" />
                  <span>Email Me</span>
                </div>
                <ArrowRightIcon className="h-3 w-3 text-secondary transition-transform group-hover:translate-x-1 group-hover:text-indigo-400" />
              </a>

              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between rounded-xl border border-border/40 bg-background/30 p-3 text-xs font-medium text-foreground backdrop-blur-md transition-all hover:border-sky-400/50 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="h-3.5 w-3.5 text-secondary group-hover:text-sky-400 transition-colors" />
                  <span>LinkedIn</span>
                </div>
                <ArrowRightIcon className="h-3 w-3 text-secondary transition-transform group-hover:translate-x-1 group-hover:text-sky-400" />
              </a>

              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between rounded-xl border border-border/40 bg-background/30 p-3 text-xs font-medium text-foreground backdrop-blur-md transition-all hover:border-emerald-400/50 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="h-3.5 w-3.5 text-secondary group-hover:text-emerald-400 transition-colors" />
                  <span>GitHub</span>
                </div>
                <ArrowRightIcon className="h-3 w-3 text-secondary transition-transform group-hover:translate-x-1 group-hover:text-emerald-400" />
              </a>
            </ScrollReveal>
          </div>

          {/* Right Column: Creative Glassmorphic Form */}
          <ScrollReveal delay={180} className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/30 p-5 shadow-xl backdrop-blur-xl sm:p-7">
              <span aria-hidden className="block h-px w-full bg-gradient-to-r from-transparent via-sky-400/40 to-transparent mb-5" />

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-secondary">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-border/40 bg-white/[0.02] px-3.5 py-2 text-xs text-foreground outline-none transition-all focus:border-sky-400/60 focus:bg-white/[0.04]"
                    placeholder="Your Name"
                    disabled={status === "loading"}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-secondary">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border border-border/40 bg-white/[0.02] px-3.5 py-2 text-xs text-foreground outline-none transition-all focus:border-sky-400/60 focus:bg-white/[0.04]"
                    placeholder="name@example.com"
                    disabled={status === "loading"}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-secondary">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full resize-none rounded-lg border border-border/40 bg-white/[0.02] px-3.5 py-2 text-xs text-foreground outline-none transition-all focus:border-sky-400/60 focus:bg-white/[0.04]"
                    placeholder="Tell me about your project..."
                    disabled={status === "loading"}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative inline-flex w-full items-center justify-center gap-2 rounded-xl border border-sky-400/30 bg-gradient-to-r from-indigo-500/10 via-sky-500/10 to-emerald-500/10 px-5 py-2.5 font-mono text-xs font-medium text-foreground backdrop-blur-md transition-all hover:border-sky-400/60 hover:bg-white/[0.06] disabled:opacity-60"
                >
                  <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
                  <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </button>

                {status === "success" && (
                  <p className="mt-2 font-mono text-[11px] text-emerald-400" role="status">
                    Thanks — your message has been sent. I&apos;ll get back to you soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-2 font-mono text-[11px] text-red-400" role="alert">
                    {error}
                  </p>
                )}
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}