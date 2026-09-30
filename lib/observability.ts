/**
 * Error reporting.
 *
 * Deliberately a thin seam rather than a direct Sentry dependency: the call
 * sites (`app/error.tsx`, `app/global-error.tsx`, the enquiry route) are the part
 * that is specific to this codebase and worth committing now. Which vendor
 * receives the report is a later decision that only this file needs to know
 * about.
 *
 * Until a reporter is wired up, errors go to the console — which on a server
 * deployment means the platform's own log stream, so nothing is silently lost.
 */

type Context = Record<string, string | number | boolean | undefined>;

type Reporter = (error: unknown, context?: Context) => void;

let reporter: Reporter | null = null;

/**
 * Registers the real reporter. Call once during startup, e.g. from
 * `instrumentation.ts` after initialising Sentry:
 *
 *   setErrorReporter((error, context) => Sentry.captureException(error, { extra: context }));
 */
export function setErrorReporter(next: Reporter): void {
  reporter = next;
}

export function reportError(error: unknown, context?: Context): void {
  if (reporter) {
    try {
      reporter(error, context);
      return;
    } catch {
      // A failing reporter must not mask the original error.
    }
  }

  const detail = context ? ` ${JSON.stringify(context)}` : "";
  if (error instanceof Error) {
    console.error(`[error]${detail} ${error.message}`, error.stack);
  } else {
    console.error(`[error]${detail}`, error);
  }
}
