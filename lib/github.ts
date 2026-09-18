import type { ContributionWeek, GithubStats } from "@/types";

const GITHUB_REST = "https://api.github.com";
const GITHUB_GRAPHQL = "https://api.github.com/graphql";

function levelFor(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;

  const ratio = count / max;

  if (ratio > 0.75) return 4;
  if (ratio > 0.5) return 3;
  if (ratio > 0.25) return 2;

  return 1;
}

interface RestUser {
  login: string;
  public_repos: number;
  followers: number;
}

interface RestRepo {
  stargazers_count: number;
}

interface GraphqlContributionDay {
  date: string;
  contributionCount: number;
}

interface GraphqlResponse {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: GraphqlContributionDay[];
          }[];
        };
      };
    } | null;
  };

  errors?: {
    message: string;
    type?: string;
  }[];
}

/**
 * Fetch basic GitHub profile information
 */
async function fetchGithubUser(username: string) {
  const response = await fetch(
    `${GITHUB_REST}/users/${username}`,
    {
      cache: "no-store",
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `GitHub user API failed: ${response.status} ${response.statusText}`
    );
  }

  return (await response.json()) as RestUser;
}

/**
 * Fetch repositories
 */
async function fetchGithubRepos(username: string) {
  const response = await fetch(
    `${GITHUB_REST}/users/${username}/repos?per_page=100&type=all`,
    {
      cache: "no-store",
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `GitHub repositories API failed: ${response.status} ${response.statusText}`
    );
  }

  return (await response.json()) as RestRepo[];
}

/**
 * Fetch repositories starred by the authenticated GitHub user
 */
async function fetchGithubStarredRepos(
  token: string
) {
  const response = await fetch(
    `${GITHUB_REST}/user/starred?per_page=100`,
    {
      cache: "no-store",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `GitHub starred repos API failed: ${response.status} ${response.statusText}`
    );
  }

  return (await response.json()) as unknown[];
}
/**
 * Fetch contribution calendar through GitHub GraphQL
 */
async function fetchGithubContributions(
  username: string,
  token: string
) {
  const query = `
    query GetUserContributions($username: String!) {
      user(login: $username) {
        login

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
      }
    }
  `;

  const response = await fetch(GITHUB_GRAPHQL, {
    method: "POST",

    cache: "no-store",

    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    body: JSON.stringify({
      query,
      variables: {
        username,
      },
    }),
  });

  const json = (await response.json()) as GraphqlResponse;

  /*
   * IMPORTANT:
   * GraphQL can return HTTP 200 even when the query itself failed.
   */
  if (!response.ok) {
    throw new Error(
      `GitHub GraphQL HTTP error: ${response.status}`
    );
  }

  if (json.errors?.length) {
    console.error(
      "GitHub GraphQL errors:",
      JSON.stringify(json.errors, null, 2)
    );

    throw new Error(
      json.errors
        .map((error) => error.message)
        .join(" | ")
    );
  }

  const user = json.data?.user;

  if (!user) {
    throw new Error(
      `GitHub GraphQL returned no user for "${username}"`
    );
  }

  return user.contributionsCollection.contributionCalendar;
}

/**
 * Main GitHub stats function
 */
export async function getGithubStats(): Promise<GithubStats | null> {
  const username = process.env.GITHUB_USERNAME?.trim();
  const token = process.env.GITHUB_TOKEN?.trim();

  console.log("=================================");
  console.log("GitHub Stats Debug");
  console.log("Username:", username);
  console.log("Token exists:", Boolean(token));
  console.log("=================================");

  if (!username) {
    console.error(
      "GITHUB_USERNAME is missing from environment variables."
    );

    return null;
  }

  try {
    /*
     * Get profile + repositories
     */
    const [user, repos] = await Promise.all([
      fetchGithubUser(username),
      fetchGithubRepos(username),
    ]);

   let totalStars = 0;

if (token) {
  const starredRepos = await fetchGithubStarredRepos(token);

  totalStars = starredRepos.length;
}

    console.log("GitHub user:", user.login);
    console.log("Public repositories:", user.public_repos);
    console.log("Followers:", user.followers);
    console.log("Repositories fetched:", repos.length);
    console.log("Total repository stars:", totalStars);

    /*
     * Contributions
     */
    if (!token) {
      console.error(
        "GITHUB_TOKEN is missing. Cannot fetch GraphQL contributions."
      );

      return {
        username: user.login,
        totalContributions: 0,
        publicRepos: repos.length,
        totalStars,
        followers: user.followers,
        calendar: [],
        isLive: false,
      };
    }

    const contributionCalendar =
      await fetchGithubContributions(
        username,
        token
      );

    const allCounts =
      contributionCalendar.weeks.flatMap(
        (week) =>
          week.contributionDays.map(
            (day) => day.contributionCount
          )
      );

    const max = Math.max(1, ...allCounts);

    const calendar: ContributionWeek[] =
      contributionCalendar.weeks.map((week) => ({
        days: week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: levelFor(
            day.contributionCount,
            max
          ),
        })),
      }));

    console.log(
      "TOTAL CONTRIBUTIONS:",
      contributionCalendar.totalContributions
    );

    console.log(
      "Calendar weeks:",
      calendar.length
    );

    console.log(
      "Contribution days:",
      allCounts.length
    );

    return {
      username: user.login,
      totalContributions:
        contributionCalendar.totalContributions,
      publicRepos: repos.length
,
      totalStars,
      followers: user.followers,
      calendar,
      isLive: true,
    };
  } catch (error) {
    console.error(
      "================================="
    );

    console.error(
      "GITHUB ERROR:",
      error
    );

    console.error(
      "================================="
    );

    return null;
  }
}