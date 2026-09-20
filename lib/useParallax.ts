"use client";

import { useEffect, useRef, type RefObject } from "react";

type ParallaxOptions = {
  amount?: number;
  drift?: number;
};

export const useParallax = <T extends HTMLElement>(
  options: ParallaxOptions = {},
): RefObject<T | null> => {
  const ref = useRef<T | null>(null);
  const { amount, drift } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let ticking = false;

    const frame = (): void => {
      ticking = false;
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const mid = (r.top + r.height / 2 - vh / 2) / vh;
      if (typeof drift === "number") {
        el.style.transform = `translate3d(${mid * drift}px,0,0)`;
      } else if (typeof amount === "number") {
        el.style.transform = `translate3d(0,${mid * amount}px,0)`;
      }
    };

    const onScroll = (): void => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(frame);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", frame);
    frame();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", frame);
    };
  }, [amount, drift]);

  return ref;
};
