import type { Project } from "@/types";
import shahjee from "@/public/shahjee.png";
import mangoReview from "@/public/mangoreview.png";
import fetigyn from "@/public/fertigyn.png";
import gofixy from "@/public/gofixy.png";
import addressHomes from "@/public/addreshomes.png";

// Add a new project by adding an object to this array — no UI changes needed.
// Layouts alternate automatically (image-left, content-left, image-left, ...).
export const projects: Project[] = [
 
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
    title: "The Shahjee",
    description:
      "Premium e-commerce platform developed for a cultural fashion brand, featuring a custom storefront, product management, checkout flow, and admin dashboard.",
    image: shahjee.src,
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    github: "",
    live: "https://theshahjee.com",
  },
    {
    title: "Address Homes",
    description:
      "Modern real estate website developed for a Dubai-based client, designed to showcase property listings, services, and the brand's presence in the UAE real estate market.",
    image: addressHomes.src,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    github: "",
    live: "https://addresshomes.com/",
  },

  {
    title: "GoFixy",
    description:
      "Professional service website developed for a UK-based client, providing a modern digital presence for appliance repair services with a responsive interface and service-focused user experience.",
    image: gofixy.src,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "",
    live: "https://gofixy.co.uk/",
  },
   {
    title: "Fertigyn Clinic",
    description:
      "Modern fertility care platform designed to connect patients with expert reproductive healthcare, advanced treatments, and compassionate support throughout their parenthood journey.",
    image: fetigyn.src,
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    github: "",
    live: "https://fertigynclinic.com/",
  },
];