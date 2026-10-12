"use client";

import { useEffect, useRef } from "react";

const NODE_COUNT = 60;
const CONNECT_DIST = 160;
const MOUSE_RADIUS = 200;
const FALLBACK_ACCENT = "#d4a04a";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  bright: boolean;
}

function accentRgb() {
  const value = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
  const hex = /^#[0-9a-f]{6}$/i.test(value) ? value : FALLBACK_ACCENT;
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

/** Interactive node network behind the hero; nodes drift and move away from the cursor. */
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
    let mouseX = -9999;
    let mouseY = -9999;
    let frame = 0;
    const nodes: Node[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = wrap.offsetWidth;
      height = wrap.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 2 + 1,
          bright: Math.random() > 0.85,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const { r, g, b } = accentRgb();

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const c = nodes[j];
          const dist = Math.hypot(a.x - c.x, a.y - c.y);
          if (dist < CONNECT_DIST) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(c.x, c.y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - dist / CONNECT_DIST) * 0.25})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const dx = n.x - mouseX;
        const dy = n.y - mouseY;
        const dist = Math.hypot(dx, dy);
        let pushX = 0;
        let pushY = 0;
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * 1.5;
          pushX = (dx / dist) * force;
          pushY = (dy / dist) * force;
        }

        n.x += n.vx + pushX;
        n.y += n.vy + pushY;
        if (n.x < 0 || n.x > width) {
          n.x = Math.min(Math.max(n.x, 0), width);
          n.vx *= -1;
        }
        if (n.y < 0 || n.y > height) {
          n.y = Math.min(Math.max(n.y, 0), height);
          n.vy *= -1;
        }

        const glow = n.bright && dist < MOUSE_RADIUS * 1.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, glow ? n.r * 2 : n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${glow ? 0.9 : n.bright ? 0.65 : 0.3})`;
        ctx.fill();

        if (glow) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},0.1)`;
          ctx.fill();
        }
      }

      frame = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };
    const onResize = () => {
      resize();
      seed();
    };

    wrap.style.pointerEvents = "auto";
    wrap.addEventListener("mousemove", onMouseMove);
    wrap.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);
    onResize();
    draw();

    return () => {
      cancelAnimationFrame(frame);
      wrap.removeEventListener("mousemove", onMouseMove);
      wrap.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}
