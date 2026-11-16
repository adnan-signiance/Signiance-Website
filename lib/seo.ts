/**
 * Titles and descriptions as search results show them.
 *
 * A result shows roughly 60 characters of a title and 155 to 160 of a description, and cuts the rest
 * wherever it likes, usually mid-phrase. Writing the cut ourselves, at a word, means the part that
 * is shown is the part we chose. The page's own heading and its share card are not shortened: only the
 * `<title>` and the `description` meta tag are.
 */

/** Where the layout's title template adds the brand ("Title · Signiance"). */
const SUFFIX = " · Signiance";

/** The longest title and title-with-brand that is shown whole. */
export const TITLE_MAX = 60;
const TITLE_WITH_BRAND_MAX = 65;

/** The longest description that is shown whole. */
export const DESCRIPTION_MAX = 158;

/** Cuts at a word boundary and ends on an ellipsis, so the result is never longer than `max`. */
function clip(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  const room = max - 1; // the ellipsis is one character
  let cut = clean.slice(0, room);
  const space = cut.lastIndexOf(" ");
  // Back up to the last whole word, unless that would throw away most of the text.
  if (space > room * 0.6) cut = cut.slice(0, space);
  return `${cut.replace(/[\s,;:–—-]+$/u, "")}…`;
}

export function metaDescription(text: string): string {
  return clip(text, DESCRIPTION_MAX);
}

/**
 * A title for Next's `metadata.title`. When the title and the brand fit, the layout's template adds
 * the brand as usual. When they do not, the brand is dropped (the address bar and the result's site
 * name already say it) and the title is cut at a word if it is still too long.
 */
export function metaTitle(title: string): string | { absolute: string } {
  const clean = title.replace(/\s+/g, " ").trim();
  if (clean.length + SUFFIX.length <= TITLE_WITH_BRAND_MAX) return clean;
  return { absolute: clip(clean, TITLE_MAX) };
}
