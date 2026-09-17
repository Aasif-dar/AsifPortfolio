"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/data/site";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";
import { GithubIcon, LinkedinIcon, MailIcon } from "./icons";

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

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or email me directly.");
    }
  }

  return (
    <section id="contact" className="scroll-mt-16 border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <ScrollReveal>
          <SectionHeading eyebrow="Contact" title="Let's build something great." />
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-5">
          <ScrollReveal delay={100} className="md:col-span-2">
            <p className="leading-relaxed text-muted">
              Have a project in mind or just want to say hello? My inbox is open.
            </p>
            <div className="mt-6 space-y-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-accent"
              >
                <MailIcon className="h-5 w-5 text-accent" /> {siteConfig.email}
              </a>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-accent"
              >
                <GithubIcon className="h-5 w-5 text-accent" /> GitHub
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-accent"
              >
                <LinkedinIcon className="h-5 w-5 text-accent" /> LinkedIn
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} className="md:col-span-3">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-muted">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface/50 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                  disabled={status === "loading"}
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-muted">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface/50 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                  disabled={status === "loading"}
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm text-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-lg border border-border bg-surface/50 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                  disabled={status === "loading"}
                />
              </div>

              <button type="submit" disabled={status === "loading"} className="btn-primary w-full sm:w-auto">
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <p className="text-sm text-accent" role="status">
                  Thanks — your message has been sent. I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
