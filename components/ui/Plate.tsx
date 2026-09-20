"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type PlateProps = {
  label?: string;
  img?: string;
  className?: string;
  reveal?: boolean;
  style?: React.CSSProperties;
  priority?: boolean;
};

const isVideoSrc = (src: string): boolean =>
  /\.(mp4|webm|ogg)(\?|$)/i.test(src);

export const Plate = ({
  label,
  img,
  className,
  reveal = false,
  style,
  priority = false,
}: PlateProps): React.ReactElement => {
  const ref = useRef<HTMLDivElement | null>(null);
  const filled = Boolean(img);
  const video = filled && isVideoSrc(img!);

  useEffect(() => {
    if (!reveal) return;
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.classList.add("in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        });
      },
      // clip-path on .r-img zeros the intersection ratio
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reveal]);

  return (
    <div
      ref={ref}
      className={cn("plate", filled && "is-filled", reveal && "r-img", className)}
      data-label={filled ? undefined : label}
      style={style}
    >
      {filled && video ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={img}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
      ) : null}
      {filled && !video ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={img}
          alt={label ?? ""}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
        />
      ) : null}
    </div>
  );
};
