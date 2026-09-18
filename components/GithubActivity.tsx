import { getGithubStats } from "@/lib/github";
import type { ContributionWeek } from "@/types";
import AnimatedNumber from "./AnimatedNumber";
import ScrollReveal from "./ScrollReveal";
import { GithubIcon } from "./icons";

// High-contrast, vivid green GitHub activity scale with explicit borders for high pattern visibility
const LEVEL_CLASS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-emerald-950/20 border border-emerald-500/10 hover:border-emerald-500/30",
  1: "bg-[#0e4429] border border-[#006d32]/40 shadow-xs",
  2: "bg-[#006d32] border border-[#26a641]/50 shadow-xs",
  3: "bg-[#26a641] border border-[#39d353]/60 shadow-sm shadow-[#26a641]/20",
  4: "bg-[#39d353] border border-emerald-300 shadow-md shadow-[#39d353]/40",
};

function StatColumn({ label, value, first }: { label: string; value: number; first?: boolean }) {
  return (
    <div className={`flex flex-col gap-1 px-4 py-2 sm:px-6 ${first ? "pl-0" : "border-l border-border/30"}`}>
      <AnimatedNumber
        value={value}
        className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      />
      <p className="font-mono text-[10px] uppercase tracking-wider text-secondary/70">{label}</p>
    </div>
  );
}

function ContributionGraph({ weeks }: { weeks: ContributionWeek[] }) {
  return (
    <div className="overflow-x-auto pb-2 scrollbar-none">
      <div className="inline-flex gap-1">
        {weeks.map((week, i) => (
          <div key={i} className="flex flex-col gap-1">
            {week.days.map((day) => (
              <div
                key={day.date}
                title={`${day.count} contributions on ${day.date}`}
                className={`h-3 w-3 rounded-[3px] transition-all duration-200 hover:scale-125 hover:z-20 ${LEVEL_CLASS[day.level]}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function GithubActivity() {
  const stats = await getGithubStats();
  const isPlaceholder = !stats;

  const data = stats ?? {
    username: process.env.GITHUB_USERNAME || "yourusername",
    totalContributions: 1240,
    publicRepos: 32,
    totalStars: 180,
    followers: 90,
    calendar: [] as ContributionWeek[],
    isLive: false,
  };

  return (
    <section id="github" className="relative scroll-mt-16 border-t border-border/40 py-16 sm:py-24">
      {/* Background Accent Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#39d353]/10 blur-[120px]"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <ScrollReveal className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#39d353]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">
              04 // GitHub
            </span>
          </div>

          <h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-4xl">
            I build{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
              consistently.
            </span>
          </h2>
        </ScrollReveal>

        {/* Activity Container */}
        <ScrollReveal delay={100} className="relative mt-8 overflow-hidden rounded-2xl border border-border/50 bg-background/30 p-1 shadow-xl backdrop-blur-xl sm:mt-10">
          <span aria-hidden className="block h-px w-full bg-gradient-to-r from-transparent via-[#39d353]/50 to-transparent" />

          <div className="p-4 sm:p-6">
            {/* Username & Live Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/30 pb-4">
              <a
                href={`https://github.com/${data.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-mono text-xs font-medium text-foreground/90 transition-colors hover:text-[#39d353]"
              >
                <GithubIcon className="h-4 w-4 text-secondary group-hover:text-[#39d353] transition-colors" />
                github.com/{data.username}
              </a>

              <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-white/[0.03] px-3 py-1 text-[10px] font-mono text-secondary">
                <span className="relative flex h-2 w-2">
                  {!isPlaceholder && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#39d353] opacity-75 motion-reduce:hidden" />
                  )}
                  <span className={`relative inline-flex h-2 w-2 rounded-full ${isPlaceholder ? "bg-muted" : "bg-[#39d353]"}`} />
                </span>
                {isPlaceholder ? "Placeholder" : "Live Activity"}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-y-4 py-5 sm:grid-cols-4">
              <StatColumn label="Contributions" value={data.totalContributions} first />
              <StatColumn label="Repositories" value={data.publicRepos} />
              <StatColumn label="Stars" value={data.totalStars} />
              <StatColumn label="Followers" value={data.followers} />
            </div>

            {/* Contribution Graph with High Contrast Grid */}
            {data.calendar.length > 0 && (
              <div className="mt-2 border-t border-border/30 pt-5">
                <ContributionGraph weeks={data.calendar} />

                {/* Legend */}
                <div className="mt-4 flex items-center justify-end gap-1.5 font-mono text-[9px] text-secondary/70">
                  <span>Less</span>
                  <span className="h-2.5 w-2.5 rounded-[2px] bg-emerald-950/20 border border-emerald-500/10" />
                  <span className="h-2.5 w-2.5 rounded-[2px] bg-[#0e4429] border border-[#006d32]/40" />
                  <span className="h-2.5 w-2.5 rounded-[2px] bg-[#006d32] border border-[#26a641]/50" />
                  <span className="h-2.5 w-2.5 rounded-[2px] bg-[#26a641] border border-[#39d353]/60" />
                  <span className="h-2.5 w-2.5 rounded-[2px] bg-[#39d353] border border-emerald-300" />
                  <span>More</span>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>

        {isPlaceholder && (
          <p className="mt-3 font-mono text-[11px] text-secondary/60">
            Connect GITHUB_USERNAME in .env.local to stream live commit activity.
          </p>
        )}
      </div>
    </section>
  );
}