import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import { MockIntersectionObserver } from "./browser-mocks";

// jsdom has no layout, observers, media queries or canvas; the page only needs them to exist.
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
vi.stubGlobal("matchMedia", (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
  dispatchEvent: () => false,
}));
HTMLCanvasElement.prototype.getContext = (() =>
  null) as unknown as typeof HTMLCanvasElement.prototype.getContext;

afterEach(() => {
  cleanup();
  localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("style");
  document.body.style.overflow = "";
  MockIntersectionObserver.instances.length = 0;
  vi.restoreAllMocks();
  vi.useRealTimers();
});
