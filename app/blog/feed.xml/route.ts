import { getPosts } from "@/lib/content/posts";
import { buildFeed } from "@/lib/content/feed";
import { SITE_URL } from "@/lib/schema";

// Built once at build time, like every page.
export const dynamic = "force-static";

export async function GET() {
  const xml = buildFeed(await getPosts(), {
    url: SITE_URL,
    title: "Signiance field notes",
    description: "Field notes on shipping cloud infrastructure and production AI.",
  });

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
