/**
 * The heading of a section that has no other title: "What it is", "Core values", "Results".
 * It is a real heading in the display face, in sentence case, so the section is named for
 * readers and for assistive technology alike. (The name is historical: this used to be a small
 * capital chip above a heading. Sections that have their own heading no longer carry one.)
 *
 * `rise` is a delay in seconds. Given one, the heading fades up on page load, on the same CSS
 * entrance as the page title beside it (see .hero-rise); further down the page <Reveal> does it.
 */
export default function SectionEyebrow({ children, rise }: { children: React.ReactNode; rise?: number }) {
  return (
    <h2
      className={rise === undefined ? "section-label" : "section-label hero-rise"}
      style={rise === undefined ? undefined : ({ "--d": `${rise}s` } as React.CSSProperties)}
    >
      {children}
    </h2>
  );
}
