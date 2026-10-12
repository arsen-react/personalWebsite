/** Physics for the hero's node network, kept free of DOM and canvas so it is unit-testable. */

export interface NetworkNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  bright: boolean;
}

export interface Point {
  x: number;
  y: number;
}

export const NETWORK = {
  nodeCount: 60,
  /** Nodes closer than this are joined by a line. */
  linkDistance: 160,
  /** Nodes within this radius are pushed away from the pointer. */
  pointerRadius: 200,
} as const;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function createNodes(
  count: number,
  width: number,
  height: number,
  random: () => number = Math.random,
): NetworkNode[] {
  return Array.from({ length: count }, () => ({
    x: random() * width,
    y: random() * height,
    vx: (random() - 0.5) * 0.4,
    vy: (random() - 0.5) * 0.4,
    radius: random() * 2 + 1,
    bright: random() > 0.85,
  }));
}

/**
 * Moves a node by one frame: its own drift, a push away from the pointer, and a bounce off
 * the canvas edges. Mutates the node (it runs for every node on every frame) and returns
 * the node's distance to the pointer before the move.
 */
export function stepNode(
  node: NetworkNode,
  width: number,
  height: number,
  pointer: Point,
  pointerRadius: number = NETWORK.pointerRadius,
): number {
  const dx = node.x - pointer.x;
  const dy = node.y - pointer.y;
  const distance = Math.hypot(dx, dy);

  let pushX = 0;
  let pushY = 0;
  if (distance > 0 && distance < pointerRadius) {
    const force = (1 - distance / pointerRadius) * 1.5;
    pushX = (dx / distance) * force;
    pushY = (dy / distance) * force;
  }

  node.x += node.vx + pushX;
  node.y += node.vy + pushY;

  if (node.x < 0 || node.x > width) {
    node.x = clamp(node.x, 0, width);
    node.vx *= -1;
  }
  if (node.y < 0 || node.y > height) {
    node.y = clamp(node.y, 0, height);
    node.vy *= -1;
  }

  return distance;
}

/** Opacity of the line between two nodes: fades from 0.25 when touching to 0 at linkDistance. */
export function linkOpacity(distance: number, linkDistance: number = NETWORK.linkDistance): number {
  return distance < linkDistance ? (1 - distance / linkDistance) * 0.25 : 0;
}
