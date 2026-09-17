import { getGithubStats } from "@/lib/github";
import type { ContributionWeek } from "@/types";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";
import { ActivityIcon, GithubIcon, RepoIcon, StarIcon, UsersIcon } from "./icons";

const LEVEL_CLASS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-surface",
  1: "bg-accent/25",
  2: "bg-accent/50",
  3: "bg-accent/75",
  4: "bg-accent",
};

function StatTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface/50 p-6">
      <div className="text-accent">{icon}</div>
      <p className="mt-4 text-3xl font-bold tracking-tight text-foreground">
        {value.toLocaleString()}
      </p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}

function ContributionGraph({ weeks }: { weeks: ContributionWeek[] }) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="inline-flex gap-1">
        {weeks.map((week, i) => (
          <div key={i} className="flex flex-col gap-1">
            {week.days.map((day) => (
              <div
                key={day.date}
                title={`${day.count} contributions on ${day.date}`}
                className={`h-2.5 w-2.5 rounded-[2px] ${LEVEL_CLASS[day.level]}`}
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
    <section id="github" className="scroll-mt-16 border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SectionHeading eyebrow="GitHub" title="Activity" />
        </ScrollReveal>

        <ScrollReveal delay={100} className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatTile icon={<ActivityIcon />} label="Contributions" value={data.totalContributions} />
          <StatTile icon={<RepoIcon />} label="Repositories" value={data.publicRepos} />
          <StatTile icon={<StarIcon />} label="Stars" value={data.totalStars} />
          <StatTile icon={<UsersIcon />} label="Followers" value={data.followers} />
        </ScrollReveal>

        {data.calendar.length > 0 && (
          <ScrollReveal delay={200} className="mt-8 rounded-2xl border border-border bg-surface/50 p-6">
            <ContributionGraph weeks={data.calendar} />
          </ScrollReveal>
        )}

        <ScrollReveal delay={300} className="mt-8 flex items-center justify-between gap-4">
          <a
            href={`https://github.com/${data.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
          >
            <GithubIcon className="h-4 w-4" /> View full profile on GitHub
          </a>
          {isPlaceholder && (
            <p className="text-xs text-muted">
              Showing placeholder data — set GITHUB_USERNAME (and optionally GITHUB_TOKEN) in .env.local to go live.
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
