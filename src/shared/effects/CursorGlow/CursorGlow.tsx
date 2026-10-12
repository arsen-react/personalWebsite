"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorGlow.module.css";

const EASING = 0.08;

/** Soft glow that eases after the pointer. Fine pointers only; respects reduced motion. */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    let target = { x: 0, y: 0 };
    let position = { x: 0, y: 0 };
    let frame = 0;

    const onMouseMove = (event: MouseEvent) => {
      target = { x: event.clientX, y: event.clientY };
      glow.classList.add(styles.visible);
    };
    const onMouseLeave = () => glow.classList.remove(styles.visible);
    const animate = () => {
      position = {
        x: position.x + (target.x - position.x) * EASING,
        y: position.y + (target.y - position.y) * EASING,
      };
      glow.style.left = `${position.x}px`;
      glow.style.top = `${position.y}px`;
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

  return <div className={styles.glow} ref={glowRef} aria-hidden="true" />;
}
