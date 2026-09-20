"use client";

import { useEffect, useRef, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealVariant = "fade" | "mask" | "img";

type RevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  className?: string;
  as?: "div" | "span" | "p" | "h2" | "h3" | "article";
  delayIndex?: number;
};

export const Reveal = ({
  children,
  variant = "fade",
  className,
  as = "div",
  delayIndex = 0,
}: RevealProps): ReactElement => {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.classList.add("in");
      return;
    }

    el.style.transitionDelay = `${Math.min(delayIndex, 3) * 70}ms`;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: variant === "img" ? 0 : 0.08,
      },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delayIndex, variant]);

  const variantClass =
    variant === "mask" ? "r-mask" : variant === "img" ? "r-img" : "r";

  if (variant === "mask") {
    return (
      <Tag
        ref={ref as never}
        className={cn(variantClass, className)}
      >
        <span>{children}</span>
      </Tag>
    );
  }

  return (
    <Tag ref={ref as never} className={cn(variantClass, className)}>
      {children}
    </Tag>
  );
};
