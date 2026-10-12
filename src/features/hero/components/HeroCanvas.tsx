"use client";

import { useEffect, useRef } from "react";
import { hexToRgb, rgba } from "@/shared/lib/color";
import { NETWORK, createNodes, linkOpacity, stepNode, type Point } from "../lib/nodeNetwork";

// The dark theme's --accent, used if the CSS variable cannot be read.
const FALLBACK_ACCENT = { r: 212, g: 160, b: 74 };
const OFFSCREEN: Point = { x: -9999, y: -9999 };

/** Interactive node network behind the hero. Skipped for users who prefer reduced motion. */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !wrap || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = 0;
    let height = 0;
    let pointer = OFFSCREEN;
    let frame = 0;
    let nodes = createNodes(NETWORK.nodeCount, 0, 0);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = wrap.offsetWidth;
      height = wrap.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = createNodes(NETWORK.nodeCount, width, height);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const accentValue = getComputedStyle(document.documentElement).getPropertyValue("--accent");
      const accent = hexToRgb(accentValue, FALLBACK_ACCENT);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const opacity = linkOpacity(Math.hypot(a.x - b.x, a.y - b.y));
          if (opacity > 0) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = rgba(accent, opacity);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        const distance = stepNode(node, width, height, pointer);
        const glowing = node.bright && distance < NETWORK.pointerRadius * 1.5;

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowing ? node.radius * 2 : node.radius, 0, Math.PI * 2);
        ctx.fillStyle = rgba(accent, glowing ? 0.9 : node.bright ? 0.65 : 0.3);
        ctx.fill();

        if (glowing) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 8, 0, Math.PI * 2);
          ctx.fillStyle = rgba(accent, 0.1);
          ctx.fill();
        }
      }

      frame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onPointerLeave = () => {
      pointer = OFFSCREEN;
    };

    wrap.style.pointerEvents = "auto";
    wrap.addEventListener("mousemove", onPointerMove);
    wrap.addEventListener("mouseleave", onPointerLeave);
    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(frame);
      wrap.removeEventListener("mousemove", onPointerMove);
      wrap.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}
