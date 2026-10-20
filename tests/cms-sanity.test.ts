import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CmsError, memoizeForBuild, sanityConfig, sanityFetch } from "@/lib/cms/sanity";

function mockFetch(body: unknown, init: { ok?: boolean; status?: number } = {}) {
  const spy = vi.fn().mockResolvedValue({
    ok: init.ok ?? true,
    status: init.status ?? 200,
    json: async () => body,
  });
  vi.stubGlobal("fetch", spy);
  return spy;
}

beforeEach(() => {
  vi.stubEnv("SANITY_PROJECT_ID", "abc123de");
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("sanityConfig", () => {
  it("is null when no project is configured, which is what selects the bundled content", () => {
    vi.stubEnv("SANITY_PROJECT_ID", "");
    expect(sanityConfig()).toBeNull();
  });

  it("defaults the dataset and API host", () => {
    expect(sanityConfig()).toEqual({
      projectId: "abc123de",
      dataset: "production",
      apiHost: "https://abc123de.api.sanity.io",
    });
  });

  it("honours a dataset and host override", () => {
    vi.stubEnv("SANITY_DATASET", "staging");
    vi.stubEnv("SANITY_API_HOST", "http://localhost:3299");
    expect(sanityConfig()).toMatchObject({ dataset: "staging", apiHost: "http://localhost:3299" });
  });
});

describe("sanityFetch", () => {
  it("queries the published content and returns the result", async () => {
    const spy = mockFetch({ result: [{ a: 1 }] });
    const result = await sanityFetch<{ a: number }[]>('*[_type == "post"]');

    expect(result).toEqual([{ a: 1 }]);
    const url = new URL(String(spy.mock.calls[0][0]));
    expect(url.origin).toBe("https://abc123de.api.sanity.io");
    expect(url.pathname).toMatch(/^\/v\d{4}-\d{2}-\d{2}\/data\/query\/production$/);
    expect(url.searchParams.get("query")).toBe('*[_type == "post"]');
    expect(url.searchParams.get("perspective")).toBe("published");
  });

  it("passes parameters as JSON, so a value cannot alter the query", async () => {
    const spy = mockFetch({ result: null });
    await sanityFetch("*[slug.current == $slug][0]", { slug: 'x" || true' });
    const url = new URL(String(spy.mock.calls[0][0]));
    expect(url.searchParams.get("$slug")).toBe(JSON.stringify('x" || true'));
  });

  it("sends no credentials for a public dataset, and a bearer token when one is set", async () => {
    const spy = mockFetch({ result: [] });
    await sanityFetch("*");
    expect(spy.mock.calls[0][1]).toBeUndefined();

    vi.stubEnv("SANITY_READ_TOKEN", "sk-test");
    await sanityFetch("*");
    expect(spy.mock.calls[1][1]).toEqual({ headers: { Authorization: "Bearer sk-test" } });
  });

  it("throws, rather than returning nothing, when the API refuses", async () => {
    mockFetch({}, { ok: false, status: 401 });
    await expect(sanityFetch("*")).rejects.toThrow(/status 401/);
    await expect(sanityFetch("*")).rejects.toBeInstanceOf(CmsError);
  });

  it("throws when called with no project configured", async () => {
    vi.stubEnv("SANITY_PROJECT_ID", "");
    await expect(sanityFetch("*")).rejects.toThrow(/SANITY_PROJECT_ID/);
  });
});

describe("memoizeForBuild", () => {
  it("runs the loader once per distinct arguments", async () => {
    const load = vi.fn(async (n: number) => n * 2);
    const memo = memoizeForBuild(load);

    expect(await Promise.all([memo(2), memo(2), memo(2)])).toEqual([4, 4, 4]);
    expect(await memo(3)).toBe(6);
    expect(load).toHaveBeenCalledTimes(2);
  });

  it("does not keep a failure, so one bad request cannot poison later pages", async () => {
    const load = vi.fn().mockRejectedValueOnce(new Error("blip")).mockResolvedValue("ok");
    const memo = memoizeForBuild(load);

    await expect(memo()).rejects.toThrow("blip");
    await Promise.resolve(); // let the cache clear its rejected entry
    expect(await memo()).toBe("ok");
  });

  it("reads fresh content every time in development, so edits show without a restart", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const load = vi.fn(async () => "x");
    const memo = memoizeForBuild(load);
    await memo();
    await memo();
    expect(load).toHaveBeenCalledTimes(2);
  });
});
