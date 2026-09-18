import { siteConfig } from "@/data/site";

const SIZES = {
  sm: "h-7 w-7 text-[10px]",
  md: "h-9 w-9 text-xs",
} as const;

/**
 * The initials chip introduced in Hero as a personal "signature" — reused
 * at the site's other identity moments (Footer) so the brand mark recurs
 * without repeating the whole Hero composition.
 */
export default function SignatureMark({ size = "sm" }: { size?: keyof typeof SIZES }) {
  const initials = siteConfig.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-foreground via-foreground to-secondary font-mono font-semibold text-background shadow-sm ${SIZES[size]}`}
    >
      {initials}
    </span>
  );
}
