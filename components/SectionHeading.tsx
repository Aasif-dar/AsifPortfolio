export default function SectionHeading({
  eyebrow,
  title,
  supporting,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  supporting?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        {title}
      </h2>
      {supporting && (
        <p className={`mt-4 max-w-md text-base text-secondary ${align === "center" ? "mx-auto" : ""}`}>
          {supporting}
        </p>
      )}
    </div>
  );
}
