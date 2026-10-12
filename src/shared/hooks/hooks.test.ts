import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useEscapeKey } from "./useEscapeKey";
import { useLockBodyScroll } from "./useLockBodyScroll";
import { useMediaQuery } from "./useMediaQuery";
import { useScrolled } from "./useScrolled";

const pressEscape = () =>
  act(() => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  });

describe("useScrolled", () => {
  it("turns true once the page scrolls past the threshold", () => {
    const { result } = renderHook(() => useScrolled(40));
    expect(result.current).toBe(false);

    const scrollTo = (y: number) =>
      act(() => {
        Object.defineProperty(window, "scrollY", { value: y, configurable: true });
        window.dispatchEvent(new Event("scroll"));
      });

    scrollTo(120);
    expect(result.current).toBe(true);

    scrollTo(0);
    expect(result.current).toBe(false);
  });
});

describe("useLockBodyScroll", () => {
  it("locks page scrolling while active and restores it afterwards", () => {
    const { rerender, unmount } = renderHook(({ locked }) => useLockBodyScroll(locked), {
      initialProps: { locked: true },
    });
    expect(document.body.style.overflow).toBe("hidden");

    rerender({ locked: false });
    expect(document.body.style.overflow).toBe("");
    unmount();
  });
});

describe("useEscapeKey", () => {
  it("calls the handler on Escape only while enabled", () => {
    const onEscape = vi.fn();
    const { rerender } = renderHook(({ enabled }) => useEscapeKey(onEscape, enabled), {
      initialProps: { enabled: true },
    });

    pressEscape();
    expect(onEscape).toHaveBeenCalledTimes(1);

    rerender({ enabled: false });
    pressEscape();
    expect(onEscape).toHaveBeenCalledTimes(1);
  });
});

describe("useMediaQuery", () => {
  it("returns whether the query matches", () => {
    vi.spyOn(window, "matchMedia").mockImplementation(
      (query) =>
        ({
          matches: query === "(min-width: 900px)",
          media: query,
          addEventListener: () => {},
          removeEventListener: () => {},
        }) as unknown as MediaQueryList,
    );

    expect(renderHook(() => useMediaQuery("(min-width: 900px)")).result.current).toBe(true);
    expect(renderHook(() => useMediaQuery("(max-width: 400px)")).result.current).toBe(false);
  });
});
