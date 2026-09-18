export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  live?: string;
}

export interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
}

export type SkillCategory = "Frontend" | "Backend" | "Database" | "Tools";

export interface Skill {
  name: string;
  category: SkillCategory;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface GithubStats {
  username: string;
  totalContributions: number;
  publicRepos: number;
  totalStars: number;
  followers: number;
  calendar: ContributionWeek[];
  isLive: boolean;
}
