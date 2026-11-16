import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";
import { services } from "@/lib/data";

const require = createRequire(import.meta.url);
const { legacyRedirects, pages, postAliases } = require("../redirects/legacy") as {
  legacyRedirects: (o: { posts: boolean }) => Redirect[];
  pages: [string, string][];
  postAliases: [string, string][];
};
const postRedirects = require("../redirects/wordpress-posts.json") as Redirect[];

type Redirect = { source: string; destination: string; permanent: boolean };

// Every route the site serves at a fixed address. A redirect must never take one of these over, and
// a page redirect must end on one of them.
const routes = new Set([
  "/",
  "/about",
  "/services",
  "/case-studies",
  "/how-we-work",
  "/privacy",
  "/terms",
  "/security",
  "/careers",
  "/guarantee",
  "/blog",
  ...services.map((s) => `/services/${s.slug}`),
]);

describe("legacy page redirects", () => {
  it("send every old page to a page that exists", () => {
    for (const [source, destination] of pages) {
      const path = destination.split("#")[0] || "/";
      expect(routes.has(path), `${source} goes to ${destination}, which is not a route`).toBe(true);
    }
  });

  it("do not take over an address the site serves", () => {
    for (const [source] of pages) {
      expect(routes.has(source), `${source} is a live route and must not redirect`).toBe(false);
    }
  });

  it("are permanent", () => {
    expect(legacyRedirects({ posts: false }).every((r) => r.permanent)).toBe(true);
  });
});

describe("blog post redirects", () => {
  it("send each old address to a plain ASCII /blog/<slug>", () => {
    expect(postRedirects.length).toBeGreaterThan(0);
    for (const r of postRedirects) {
      expect(r.destination, r.source).toMatch(/^\/blog\/[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(r.permanent).toBe(true);
    }
  });

  it("have url-safe sources that cannot take over a route", () => {
    for (const r of postRedirects) {
      expect(r.source, r.source).toMatch(/^\/[a-z0-9%-]+$/);
      expect(routes.has(r.source), `${r.source} is a live route`).toBe(false);
    }
  });

  it("have no duplicate sources, across the pages and the posts", () => {
    const all = [...pages.map(([source]) => source), ...postRedirects.map((r) => r.source)];
    expect(new Set(all).size).toBe(all.length);
  });

  it("apply only when the CMS is configured, because the posts live in it", () => {
    const without = legacyRedirects({ posts: false });
    const withPosts = legacyRedirects({ posts: true });
    expect(without.some((r) => r.destination.startsWith("/blog/"))).toBe(false);
    const overridden = postRedirects.filter((r) => postAliases.some(([source]) => source === r.source)).length;
    expect(withPosts.length).toBe(without.length + postRedirects.length - overridden + postAliases.length);
  });

  it("keeps hand-written aliases, which win over the generated list and never repeat a source", () => {
    const sources = legacyRedirects({ posts: true }).map((r) => r.source);
    expect(new Set(sources).size).toBe(sources.length);
    for (const [source, destination] of postAliases) {
      expect(destination, source).toMatch(/^\/blog\/[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(routes.has(source), `${source} is a live route`).toBe(false);
      const hit = legacyRedirects({ posts: true }).find((r) => r.source === source);
      expect(hit?.destination).toBe(destination);
    }
  });
});
