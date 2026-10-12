"use client";

import { useEffect, useRef } from "react";

/** Soft glow that eases after the mouse pointer (fine pointers only, respects reduced motion). */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    let mouseX = 0;
    let mouseY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      glow.classList.add("visible");
    };
    const onMouseLeave = () => glow.classList.remove("visible");
    const animate = () => {
      x += (mouseX - x) * 0.08;
      y += (mouseY - y) * 0.08;
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      frame = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    animate();

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return <div className="cursor-glow" ref={glowRef} aria-hidden="true" />;
}
