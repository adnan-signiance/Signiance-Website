import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

// jsdom implements neither of these, and several components read them on mount
// (scroll state in the header, reduced-motion in the counters and carousel).
if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
}

if (!window.ResizeObserver) {
  Object.defineProperty(window, "ResizeObserver", {
    writable: true,
    // Configurable so individual tests can swap in their own recording stub.
    configurable: true,
    value: class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    },
  });
}

if (!window.IntersectionObserver) {
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      takeRecords = vi.fn(() => []);
      root = null;
      rootMargin = "";
      thresholds = [];
    },
  });
}
