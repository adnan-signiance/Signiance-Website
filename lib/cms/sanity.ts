/**
 * Minimal Sanity read client.
 *
 * Content is read over Sanity's plain HTTP query API rather than through
 * `@sanity/client`, which keeps the site's dependency list unchanged. Everything
 * here runs on the server at build time; nothing is shipped to the browser.
 *
 * Configuration is by environment variable, and its absence is meaningful: with
 * no SANITY_PROJECT_ID the site uses the content bundled in lib/data.ts, so a
 * fresh checkout, CI and local development all work without a CMS account.
 */

const API_VERSION = "2025-02-19";

export type SanityConfig = {
  projectId: string;
  dataset: string;
  apiHost: string;
};

export function sanityConfig(): SanityConfig | null {
  const projectId = process.env.SANITY_PROJECT_ID;
  if (!projectId) return null;
  return {
    projectId,
    dataset: process.env.SANITY_DATASET || "production",
    // Overridable for a proxy or a local stand-in; the default is Sanity's API.
    apiHost: process.env.SANITY_API_HOST || `https://${projectId}.api.sanity.io`,
  };
}

export class CmsError extends Error {
  constructor(message: string) {
    super(`[cms] ${message}`);
    this.name = "CmsError";
  }
}

/**
 * Runs a GROQ query against the published content.
 *
 * Deliberately no `cache` option: Next.js fetches once per build for a page that
 * is prerendered, and on every request in development. `force-cache` would be
 * wrong here, because Next's data cache can outlive a deployment and would keep
 * serving the previous content after a publish.
 *
 * A failure throws. A build that cannot read the CMS must fail and leave the
 * previous deployment live, not quietly ship a site with no case studies.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, string | number> = {}
): Promise<T> {
  const config = sanityConfig();
  if (!config) throw new CmsError("SANITY_PROJECT_ID is not set");

  const url = new URL(`${config.apiHost}/v${API_VERSION}/data/query/${config.dataset}`);
  url.searchParams.set("query", query);
  url.searchParams.set("perspective", "published");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  }

  // Only needed if the dataset is private. A public dataset serves published
  // documents without a token, which is the simpler setup.
  const token = process.env.SANITY_READ_TOKEN;
  const response = await fetch(url, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);

  if (!response.ok) {
    throw new CmsError(`query failed with status ${response.status} (project ${config.projectId}, dataset ${config.dataset})`);
  }

  const body = (await response.json()) as { result: T };
  return body.result;
}

/**
 * Memoises an async loader for the life of a production build worker, so the many
 * pages that read the same content cause one request, not one each. Skipped in
 * development, where a stale module-level promise would hide edits until restart.
 */
export function memoizeForBuild<A extends unknown[], R>(
  load: (...args: A) => Promise<R>
): (...args: A) => Promise<R> {
  const cache = new Map<string, Promise<R>>();
  return (...args: A) => {
    if (process.env.NODE_ENV === "development") return load(...args);
    const key = JSON.stringify(args);
    let hit = cache.get(key);
    if (!hit) {
      hit = load(...args);
      cache.set(key, hit);
      // A rejected promise must not stay cached, or one transient failure would
      // poison every later page in the same worker.
      hit.catch(() => cache.delete(key));
    }
    return hit;
  };
}
