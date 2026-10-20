/**
 * Emits a JSON-LD graph as a script tag.
 *
 * Server component, so the markup is in the prerendered HTML where crawlers
 * read it without executing JavaScript.
 *
 * `dangerouslySetInnerHTML` is required — React escapes text children, which
 * would corrupt the JSON. The JSON comes from `jsonLdGraph`, which serialises with
 * `JSON.stringify` and escapes `<`, so text from the CMS cannot close the tag.
 */
export default function JsonLd({ json }: { json: string }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
