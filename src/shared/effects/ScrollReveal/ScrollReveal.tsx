"use client";

import { useEffect } from "react";

const SELECTOR = ".reveal, .reveal-stagger";

/**
 * Adds .visible to .reveal and .reveal-stagger elements as they scroll into view; the
 * transitions live in styles/utilities.css. Renders nothing.
 */
export function ScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(SELECTOR);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((element) => element.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
