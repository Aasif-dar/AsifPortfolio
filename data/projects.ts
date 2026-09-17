import type { Project } from "@/types";

// Add a new project by adding an object to this array — no UI changes needed.
// Layouts alternate automatically (image-left, content-left, image-left, ...).
export const projects: Project[] = [
  {
    title: "The Shahjee",
    description:
      "Premium e-commerce platform with a custom storefront, checkout flow, and admin dashboard for managing products and orders.",
    image: "/projects/shahjee.svg",
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    github: "",
    live: "https://theshahjee.com",
  },
  {
    title: "Project Two",
    description:
      "A short, punchy description of what this project does and the problem it solves for its users.",
    image: "/projects/project-two.svg",
    technologies: ["React", "Node.js", "Express", "Tailwind CSS"],
    github: "https://github.com/yourusername/project-two",
    live: "",
  },
  {
    title: "Project Three",
    description:
      "A short, punchy description of what this project does and the problem it solves for its users.",
    image: "/projects/project-three.svg",
    technologies: ["Next.js", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/yourusername/project-three",
    live: "",
  },
];
