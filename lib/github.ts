import type { ContributionWeek, GithubStats } from "@/types";

const GITHUB_REST = "https://api.github.com";
const GITHUB_GRAPHQL = "https://api.github.com/graphql";

function levelFor(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  const ratio = count / max;
  if (ratio > 0.75) return 4;
  if (ratio > 0.5) return 3;
  if (ratio > 0.25) return 2;
  return 1;
}

interface GraphqlContributionDay {
  date: string;
  contributionCount: number;
}

interface GraphqlResponse {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: GraphqlContributionDay[] }[];
        };
      };
      repositories: {
        totalCount: number;
        nodes: { stargazerCount: number }[];
      };
      followers: { totalCount: number };
    } | null;
  };
}

async function fetchViaGraphql(
  username: string,
  token: string
): Promise<GithubStats | null> {
  const query = `
    query ($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
        repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
          totalCount
          nodes {
            stargazerCount
          }
        }
        followers {
          totalCount
        }
      }
    }
  `;

  const res = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { username } }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  const json: GraphqlResponse = await res.json();
  const user = json.data?.user;
  if (!user) return null;

  const calendar = user.contributionsCollection.contributionCalendar;
  const totalStars = user.repositories.nodes.reduce(
    (sum, repo) => sum + repo.stargazerCount,
    0
  );

  const allCounts = calendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => day.contributionCount)
  );
  const max = Math.max(1, ...allCounts);

  const weeks: ContributionWeek[] = calendar.weeks.map((week) => ({
    days: week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: levelFor(day.contributionCount, max),
    })),
  }));

  return {
    username,
    totalContributions: calendar.totalContributions,
    publicRepos: user.repositories.totalCount,
    totalStars,
    followers: user.followers.totalCount,
    calendar: weeks,
    isLive: true,
  };
}

interface RestUser {
  public_repos?: number;
  followers?: number;
}

interface RestRepo {
  stargazers_count?: number;
}

async function fetchViaRest(username: string): Promise<GithubStats | null> {
  const [userRes, reposRes] = await Promise.all([
    fetch(`${GITHUB_REST}/users/${username}`, { next: { revalidate: 3600 } }),
    fetch(`${GITHUB_REST}/users/${username}/repos?per_page=100`, {
      next: { revalidate: 3600 },
    }),
  ]);

  if (!userRes.ok) return null;

  const user: RestUser = await userRes.json();
  const repos: RestRepo[] = reposRes.ok ? await reposRes.json() : [];
  const totalStars = Array.isArray(repos)
    ? repos.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0)
    : 0;

  return {
    username,
    totalContributions: 0,
    publicRepos: user.public_repos ?? 0,
    totalStars,
    followers: user.followers ?? 0,
    calendar: [],
    isLive: false,
  };
}

/**
 * Reads GITHUB_USERNAME / GITHUB_TOKEN server-side only. Returns null when
 * no username is configured, or when GitHub is unreachable, so callers can
 * fall back to placeholder data.
 */
export async function getGithubStats(): Promise<GithubStats | null> {
  const username = process.env.GITHUB_USERNAME;
  if (!username) return null;

  const token = process.env.GITHUB_TOKEN;

  try {
    if (token) {
      const viaGraphql = await fetchViaGraphql(username, token);
      if (viaGraphql) return viaGraphql;
    }
    return await fetchViaRest(username);
  } catch {
    return null;
  }
}
