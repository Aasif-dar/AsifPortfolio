import { siteConfig } from "@/data/site";
import SignatureMark from "./SignatureMark";
import { ArrowUpIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-3">
            <SignatureMark />
            <div>
              <p className="text-base font-medium text-foreground">{siteConfig.name}</p>
              <p className="mt-0.5 text-sm text-secondary">{siteConfig.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-link text-sm"
            >
              GitHub
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-link text-sm"
            >
              LinkedIn
            </a>
            <a href={siteConfig.mail} target="_blank" rel="noopener noreferrer" className="underline-link text-sm">
              Email
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-start gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-secondary">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <a
            href="#home"
            className="group inline-flex items-center gap-2 text-xs font-medium text-foreground transition-colors hover:text-accent"
          >
            Back to top
            <ArrowUpIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </footer>
  );
}
