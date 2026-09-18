import type { Project } from "@/types";
import shahjee from "@/public/shahjee.png"
import mangoReview from "@/public/mangoreview.png"
import fetigyn from "@/public/fertigyn.png"

// Add a new project by adding an object to this array — no UI changes needed.
// Layouts alternate automatically (image-left, content-left, image-left, ...).
export const projects: Project[] = [
  {
    title: "The Shahjee",
    description:
      "Premium e-commerce platform with a custom storefront, checkout flow, and admin dashboard for managing products and orders.",
    image: shahjee.src,
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    github: "",
    live: "https://theshahjee.com",
    
  },
   {
    title: "Mango Review",
    description:
      "AI-powered review management platform that analyzes customer feedback, delivers actionable business insights, and helps businesses respond to reviews faster.",
    image: mangoReview.src,
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "AI"],
    github: "",
    live: "https://www.mangoreview.ai/",
  },
{
  title: "Fertigyn Clinic",
  description:
    "Modern fertility care platform designed to connect patients with expert reproductive healthcare, advanced treatments, and compassionate support throughout their parenthood journey.",
  image:fetigyn.src ,
  technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
  github: "",
  live: "https://fertigynclinic.com/",
},
];
