import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MockIntersectionObserver, mockMatchMedia } from "@/test/browser-mocks";
import styles from "./CursorGlow/CursorGlow.module.css";
import { CursorGlow, ScrollReveal } from "./index";

const FINE_POINTER = "(pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

describe("CursorGlow", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame"] });
  });

  const renderGlow = () => {
    const { container, unmount } = render(<CursorGlow />);
    return { glow: container.firstElementChild as HTMLElement, unmount };
  };

  it("eases towards the pointer on every frame", () => {
    mockMatchMedia([FINE_POINTER]);
    const { glow } = renderGlow();

    fireEvent.mouseMove(document, { clientX: 100, clientY: 50 });
    expect(glow).toHaveClass(styles.visible);

    vi.advanceTimersToNextFrame();
    expect(glow.style.left).toBe("8px");
    expect(glow.style.top).toBe("4px");

    for (let frame = 0; frame < 120; frame++) vi.advanceTimersToNextFrame();
    expect(parseFloat(glow.style.left)).toBeCloseTo(100, 0);
    expect(parseFloat(glow.style.top)).toBeCloseTo(50, 0);
  });

  it("fades out when the pointer leaves the page", () => {
    mockMatchMedia([FINE_POINTER]);
    const { glow } = renderGlow();

    fireEvent.mouseMove(document, { clientX: 100, clientY: 50 });
    fireEvent.mouseLeave(document);
    expect(glow).not.toHaveClass(styles.visible);
  });

  it.each([
    ["on touch screens", []],
    ["for users who prefer reduced motion", [FINE_POINTER, REDUCED_MOTION]],
  ])("stays off %s", (_, matching) => {
    mockMatchMedia(matching);
    const { glow } = renderGlow();

    fireEvent.mouseMove(document, { clientX: 100, clientY: 50 });
    expect(glow).not.toHaveClass(styles.visible);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("stops animating and listening when unmounted", () => {
    mockMatchMedia([FINE_POINTER]);
    const { glow, unmount } = renderGlow();
    expect(vi.getTimerCount()).toBe(1);

    unmount();
    expect(vi.getTimerCount()).toBe(0);
    fireEvent.mouseMove(document, { clientX: 100, clientY: 50 });
    expect(glow).not.toHaveClass(styles.visible);
  });
});

describe("ScrollReveal", () => {
  const renderPage = () =>
    render(
      <>
        <p className="reveal">Intro</p>
        <ul className="reveal-stagger">
          <li>Item</li>
        </ul>
        <ScrollReveal />
      </>,
    );

  it("reveals each element the first time it scrolls into view", () => {
    renderPage();
    const [observer] = MockIntersectionObserver.instances;
    const intro = screen.getByText("Intro");
    const list = screen.getByRole("list");
    expect([...observer.observed]).toEqual([intro, list]);

    observer.trigger([list], false);
    expect(list).not.toHaveClass("visible");

    observer.trigger([intro]);
    expect(intro).toHaveClass("visible");
    expect(observer.observed.has(intro)).toBe(false);
  });

  it("shows everything at once for users who prefer reduced motion", () => {
    mockMatchMedia([REDUCED_MOTION]);
    renderPage();

    expect(screen.getByText("Intro")).toHaveClass("visible");
    expect(screen.getByRole("list")).toHaveClass("visible");
    expect(MockIntersectionObserver.instances).toHaveLength(0);
  });

  it("disconnects its observer when unmounted", () => {
    const { unmount } = renderPage();
    unmount();
    expect(MockIntersectionObserver.instances[0].disconnected).toBe(true);
  });
});
