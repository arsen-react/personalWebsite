import { act, renderHook } from "@testing-library/react";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { mockMatchMedia } from "@/test/browser-mocks";
import { useEscapeKey } from "./useEscapeKey";
import { useLockBodyScroll } from "./useLockBodyScroll";
import { useMediaQuery, usePrefersReducedMotion } from "./useMediaQuery";
import { useScrolled } from "./useScrolled";

const pressEscape = () =>
  act(() => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  });

const setScrollY = (y: number) =>
  Object.defineProperty(window, "scrollY", { value: y, configurable: true });

describe("useScrolled", () => {
  it("turns true once the page scrolls past the threshold", () => {
    const { result } = renderHook(() => useScrolled(40));
    expect(result.current).toBe(false);

    const scrollTo = (y: number) =>
      act(() => {
        setScrollY(y);
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
    mockMatchMedia(["(min-width: 900px)"]);

    expect(renderHook(() => useMediaQuery("(min-width: 900px)")).result.current).toBe(true);
    expect(renderHook(() => useMediaQuery("(max-width: 400px)")).result.current).toBe(false);
  });

  it("updates when the query starts or stops matching", () => {
    const media = mockMatchMedia();
    const { result } = renderHook(() => useMediaQuery("(min-width: 900px)"));
    expect(result.current).toBe(false);

    act(() => media.set("(min-width: 900px)", true));
    expect(result.current).toBe(true);

    act(() => media.set("(min-width: 900px)", false));
    expect(result.current).toBe(false);
  });

  it("reads the reduced-motion setting", () => {
    mockMatchMedia(["(prefers-reduced-motion: reduce)"]);
    expect(renderHook(() => usePrefersReducedMotion()).result.current).toBe(true);
  });
});

describe("static rendering", () => {
  it("renders browser state as false, so the exported HTML never depends on the browser", () => {
    mockMatchMedia(["(min-width: 900px)"]);
    setScrollY(500);
    const Probe = () => `${useScrolled(0)} ${useMediaQuery("(min-width: 900px)")}`;

    expect(renderToString(createElement(Probe))).toBe("false false");
    setScrollY(0);
  });
});
