/**
 * The grid + fog backdrop established in Hero. Used sparingly — only at
 * the site's opening and closing moments (Hero, Contact) — so it reads as
 * a deliberate bookend rather than repeated decoration.
 */
export default function SectionBackdrop() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.99]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--background)_80%)]"
      />
    </>
  );
}
