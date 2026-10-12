import { fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockMatchMedia } from "@/test/browser-mocks";
import { HeroCanvas } from "./components/HeroCanvas";
import { NETWORK } from "./lib/nodeNetwork";

/** A 2D context that records what is drawn, and a container of the given size. */
function mockCanvas(width: number, height: number) {
  const fills: string[] = [];
  const context = {
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    lineWidth: 1,
    strokeStyle: "",
    get fillStyle() {
      return fills.at(-1) ?? "";
    },
    set fillStyle(value: string) {
      fills.push(value);
    },
  };
  const size = { width, height };

  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
    context as unknown as CanvasRenderingContext2D,
  );
  vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockImplementation(() => size.width);
  vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockImplementation(() => size.height);
  return { context, fills, size };
}

function renderCanvas() {
  const { container, unmount } = render(
    <div>
      <HeroCanvas />
    </div>,
  );
  const wrap = container.firstElementChild as HTMLElement;
  return { wrap, canvas: wrap.querySelector("canvas") as HTMLCanvasElement, unmount };
}

describe("HeroCanvas", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame"] });
  });

  it("fills its container and draws every node", () => {
    const { context } = mockCanvas(800, 600);
    const { wrap, canvas } = renderCanvas();

    expect([canvas.width, canvas.height]).toEqual([800, 600]);
    expect(context.arc).toHaveBeenCalledTimes(NETWORK.nodeCount);
    expect(wrap.style.pointerEvents).toBe("auto");
  });

  it("redraws on every animation frame and resizes with the window", () => {
    const { context, size } = mockCanvas(800, 600);
    const { canvas } = renderCanvas();

    vi.advanceTimersToNextFrame();
    expect(context.clearRect).toHaveBeenCalledTimes(2);

    size.width = 400;
    window.dispatchEvent(new Event("resize"));
    expect(canvas.width).toBe(400);
  });

  it("lights up bright nodes near the pointer until it leaves", () => {
    // Every node starts bright, at the same point: (720, 540).
    vi.spyOn(Math, "random").mockReturnValue(0.9);
    const { context } = mockCanvas(800, 600);
    const { wrap } = renderCanvas();
    const halos = () => context.arc.mock.calls.filter(([, , radius]) => radius > 20).length;
    expect(halos()).toBe(0);

    fireEvent.mouseMove(wrap, { clientX: 720, clientY: 540 });
    vi.advanceTimersToNextFrame();
    expect(halos()).toBe(NETWORK.nodeCount);

    fireEvent.mouseLeave(wrap);
    context.arc.mockClear();
    vi.advanceTimersToNextFrame();
    expect(halos()).toBe(0);
  });

  it("draws in the theme's accent colour", () => {
    document.documentElement.style.setProperty("--accent", "#336699");
    const { fills } = mockCanvas(800, 600);
    renderCanvas();

    expect(fills.length).toBeGreaterThan(0);
    expect(fills.every((fill) => fill.startsWith("rgba(51,102,153,"))).toBe(true);
  });

  it("stays still for users who prefer reduced motion", () => {
    mockMatchMedia(["(prefers-reduced-motion: reduce)"]);
    const { context } = mockCanvas(800, 600);
    const { wrap } = renderCanvas();

    expect(context.clearRect).not.toHaveBeenCalled();
    expect(wrap.style.pointerEvents).toBe("");
    expect(vi.getTimerCount()).toBe(0);
  });

  it("stops the animation and its listeners when unmounted", () => {
    const { size } = mockCanvas(800, 600);
    const { canvas, unmount } = renderCanvas();

    unmount();
    expect(vi.getTimerCount()).toBe(0);

    size.width = 400;
    window.dispatchEvent(new Event("resize"));
    expect(canvas.width).toBe(800);
  });
});
