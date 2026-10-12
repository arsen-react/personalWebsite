import { describe, expect, it } from "vitest";
import { NETWORK, createNodes, linkOpacity, stepNode, type NetworkNode } from "./nodeNetwork";

const node = (overrides: Partial<NetworkNode> = {}): NetworkNode => ({
  x: 50,
  y: 50,
  vx: 0,
  vy: 0,
  radius: 2,
  bright: false,
  ...overrides,
});

const FAR_AWAY = { x: -9999, y: -9999 };

describe("createNodes", () => {
  it("places the requested number of nodes inside the canvas", () => {
    const nodes = createNodes(25, 300, 200);
    expect(nodes).toHaveLength(25);
    for (const n of nodes) {
      expect(n.x).toBeGreaterThanOrEqual(0);
      expect(n.x).toBeLessThanOrEqual(300);
      expect(n.y).toBeGreaterThanOrEqual(0);
      expect(n.y).toBeLessThanOrEqual(200);
    }
  });

  it("is deterministic for a given random source", () => {
    const fixed = () => 0.5;
    expect(createNodes(1, 100, 100, fixed)[0]).toEqual({
      x: 50,
      y: 50,
      vx: 0,
      vy: 0,
      radius: 2,
      bright: false,
    });
  });
});

describe("stepNode", () => {
  it("moves a node by its velocity", () => {
    const n = node({ vx: 0.3, vy: -0.2 });
    stepNode(n, 100, 100, FAR_AWAY);
    expect(n.x).toBeCloseTo(50.3);
    expect(n.y).toBeCloseTo(49.8);
  });

  it("bounces off an edge by clamping the position and reversing the velocity", () => {
    const n = node({ x: 99.9, vx: 0.4 });
    stepNode(n, 100, 100, FAR_AWAY);
    expect(n.x).toBe(100);
    expect(n.vx).toBe(-0.4);
  });

  it("pushes nodes near the pointer away from it", () => {
    const n = node({ x: 60, y: 50 });
    stepNode(n, 200, 200, { x: 50, y: 50 });
    expect(n.x).toBeGreaterThan(60);
    expect(n.y).toBe(50);
  });

  it("returns the distance to the pointer before moving", () => {
    expect(stepNode(node({ x: 30, y: 40 }), 100, 100, { x: 0, y: 0 })).toBe(50);
  });
});

describe("linkOpacity", () => {
  it("fades from 0.25 at zero distance to nothing at the link distance", () => {
    expect(linkOpacity(0)).toBe(0.25);
    expect(linkOpacity(NETWORK.linkDistance / 2)).toBeCloseTo(0.125);
    expect(linkOpacity(NETWORK.linkDistance)).toBe(0);
    expect(linkOpacity(NETWORK.linkDistance * 2)).toBe(0);
  });
});
