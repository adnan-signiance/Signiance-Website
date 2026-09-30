/**
 * Types and loader for the Cal.com inline embed.
 *
 * Cal.com ships no types for its embed snippet, so this file exists to keep the
 * `any` casts that the vendor's own loader requires in one contained place
 * rather than spread through a component. Everything the rest of the codebase
 * touches is typed.
 *
 * The loader itself is Cal.com's documented snippet, transcribed: it installs a
 * synchronous queue on `window.Cal` immediately and fetches the real embed.js in
 * the background, so calls made before the script finishes loading are queued
 * (`cal.q`) rather than lost.
 */

const EMBED_SRC = "https://app.cal.com/embed/embed.js";

export type CalLayout = "month_view" | "week_view" | "column_view";

export type CalInlineConfig = {
  elementOrSelector: string;
  calLink: string;
  config?: { layout?: CalLayout; theme?: "light" | "dark" | "auto" };
};

export type CalUiConfig = {
  theme?: "light" | "dark" | "auto";
  layout?: CalLayout;
  hideEventTypeDetails?: boolean;
  /** Honoured only on plan tiers that allow it; inert, not an error, elsewhere. */
  hideBranding?: boolean;
  styles?: { branding?: { brandColor?: string } };
  cssVarsPerTheme?: Record<"light" | "dark", Record<string, string>>;
};

/** The namespaced API returned for each embed instance. */
export type CalNamespace = {
  (action: "inline", config: CalInlineConfig): void;
  (action: "ui", config: CalUiConfig): void;
};

export type CalApi = {
  (action: "init", namespace: string, config: { origin: string }): void;
  ns: Record<string, CalNamespace>;
  loaded?: boolean;
  q?: unknown[];
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

/**
 * Installs the embed queue and triggers the script download. Idempotent.
 *
 * The internals mirror Cal.com's minified snippet, which builds functions with
 * dynamic properties that cannot be expressed without casts — hence the local
 * eslint exception rather than a project-wide one.
 */
export function loadCalEmbed(): void {
  if (typeof window === "undefined" || window.Cal) return;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const win = window as unknown as { Cal?: any };
  const doc = document;
  const push = (target: any, args: unknown) => target.q.push(args);

  win.Cal = function (...args: unknown[]) {
    const cal = win.Cal as any;

    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      doc.head.appendChild(doc.createElement("script")).src = EMBED_SRC;
      cal.loaded = true;
    }

    if (args[0] === "init") {
      const api: any = (...inner: unknown[]) => push(api, inner);
      const namespace = args[1];
      api.q = api.q || [];

      if (typeof namespace === "string") {
        cal.ns[namespace] = cal.ns[namespace] || api;
        push(cal.ns[namespace], args);
        push(cal, ["initNamespace", namespace]);
      } else {
        push(cal, args);
      }
      return;
    }

    push(cal, args);
  };
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
