/**
 * Whether a case study's picture is a real photograph. Some studies only have a placeholder
 * (a flat colour or an abstract wash); those show their result on a flat field instead of
 * presenting the placeholder as a picture of the work.
 */
const PHOTOS = ["/media/case-healthcare.webp", "/media/case-sales.webp", "/media/case-food.webp", "/media/case-engineering.webp"];

export function hasCasePhoto(src: string): boolean {
  return PHOTOS.includes(src) || src.startsWith("https://") || src.startsWith("http://");
}
