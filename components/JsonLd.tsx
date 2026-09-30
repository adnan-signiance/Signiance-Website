/**
 * Emits a JSON-LD graph as a script tag.
 *
 * Server component, so the markup is in the prerendered HTML where crawlers
 * read it without executing JavaScript.
 *
 * `dangerouslySetInnerHTML` is required — React escapes text children, which
 * would corrupt the JSON. The content is safe because it is built entirely from
 * `lib/data.ts` by `JSON.stringify`, never from user input.
 */
export default function JsonLd({ json }: { json: string }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
