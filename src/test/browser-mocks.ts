import { vi } from "vitest";

/**
 * IntersectionObserver for jsdom, which has none. Tests drive it by hand: `trigger` reports
 * elements entering or leaving the viewport, and `instances` lists every observer created.
 */
export class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly root = null;
  readonly rootMargin: string;
  readonly thresholds: readonly number[];
  readonly observed = new Set<Element>();
  disconnected = false;
  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback, options: IntersectionObserverInit = {}) {
    this.callback = callback;
    this.rootMargin = options.rootMargin ?? "0px";
    this.thresholds = [options.threshold ?? 0].flat();
    MockIntersectionObserver.instances.push(this);
  }

  observe(element: Element) {
    this.observed.add(element);
  }

  unobserve(element: Element) {
    this.observed.delete(element);
  }

  disconnect() {
    this.observed.clear();
    this.disconnected = true;
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  trigger(targets: Element[], isIntersecting = true) {
    const entries = targets.map(
      (target) => ({ target, isIntersecting }) as IntersectionObserverEntry,
    );
    this.callback(entries, this as unknown as IntersectionObserver);
  }
}

/**
 * Makes window.matchMedia match exactly the given queries for the current test. `set`
 * flips a query and notifies listeners, like resizing the window or changing an OS setting.
 */
export function mockMatchMedia(matching: readonly string[] = []) {
  const active = new Set(matching);
  const listeners = new Set<() => void>();

  vi.spyOn(window, "matchMedia").mockImplementation(
    (query) =>
      ({
        get matches() {
          return active.has(query);
        },
        media: query,
        onchange: null,
        addEventListener: (_type: string, listener: () => void) => listeners.add(listener),
        removeEventListener: (_type: string, listener: () => void) => listeners.delete(listener),
      }) as unknown as MediaQueryList,
  );

  return {
    set(query: string, matches: boolean) {
      if (matches) active.add(query);
      else active.delete(query);
      listeners.forEach((listener) => listener());
    },
  };
}
