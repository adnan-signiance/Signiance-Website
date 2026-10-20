/**
 * The address to give social platforms and search engines for an image.
 *
 * Images in the CMS are served by Sanity's CDN, which crops and converts on request
 * from the URL, so a card is always a proper 1200x630 whatever size was uploaded.
 * Local images (the bundled case studies) are already sized and pass through.
 */
export function socialImage(src: string): string {
  if (!src.startsWith("https://cdn.sanity.io/")) return src;
  const url = new URL(src);
  url.search = "w=1200&h=630&fit=crop&auto=format";
  return url.toString();
}
