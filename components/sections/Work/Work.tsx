"use client";

import { useEffect, useRef, type ReactElement } from "react";
import { Plate } from "@/components/ui/Plate";
import { Reveal } from "@/components/ui/Reveal";
import { useDictionary } from "@/context/LocaleProvider";
import { gallery } from "@/data/gallery";
import { cn } from "@/lib/cn";

const aspectOnly = (variant: (typeof gallery)[number]["variant"]): string => {
  switch (variant) {
    case "wide":
    case "wide-drop":
      return "aspect-[4/3]";
    case "tall":
      return "aspect-[2/3]";
    default:
      return "aspect-[3/4]";
  }
};

const offsetClass = (variant: (typeof gallery)[number]["variant"]): string => {
  switch (variant) {
    case "drop":
    case "wide-drop":
      return "mt-[clamp(40px,9vh,110px)] max-[860px]:mt-0";
    case "lift":
      return "mb-[clamp(40px,9vh,110px)] max-[860px]:mb-0";
    default:
      return "";
  }
};

export const Work = (): ReactElement => {
  const d = useDictionary();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const countRef = useRef<HTMLSpanElement | null>(null);
  const barRef = useRef<HTMLElement | null>(null);
  const drag = useRef({ down: false, sx: 0, sl: 0, moved: 0 });
  const ticking = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const shotCount = gallery.length;

    const readTrack = (): void => {
      ticking.current = false;
      const max = track.scrollWidth - track.clientWidth;
      const p = max > 0 ? track.scrollLeft / max : 0;
      const w = 100 / shotCount;

      if (barRef.current) {
        barRef.current.style.width = `${w}%`;
        barRef.current.style.left = `${p * (100 - w)}%`;
      }

      if (countRef.current) {
        const i = Math.min(shotCount, Math.round(p * (shotCount - 1)) + 1);
        countRef.current.textContent = `${String(i).padStart(2, "0")} / ${String(shotCount).padStart(2, "0")}`;
      }
    };

    const onScroll = (): void => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(readTrack);
    };

    const onPointerDown = (e: PointerEvent): void => {
      if (e.pointerType === "touch") return;
      drag.current = {
        down: true,
        sx: e.clientX,
        sl: track.scrollLeft,
        moved: 0,
      };
      track.classList.add("cursor-grabbing");
      track.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent): void => {
      if (!drag.current.down) return;
      const delta = e.clientX - drag.current.sx;
      drag.current.moved = Math.abs(delta);
      track.scrollLeft = drag.current.sl - delta;
    };

    const onPointerUp = (): void => {
      drag.current.down = false;
      track.classList.remove("cursor-grabbing");
    };

    const onClick = (e: MouseEvent): void => {
      if (drag.current.moved > 6) e.preventDefault();
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", onPointerUp);
    track.addEventListener("pointercancel", onPointerUp);
    track.addEventListener("click", onClick, true);
    readTrack();

    return () => {
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", onPointerUp);
      track.removeEventListener("pointercancel", onPointerUp);
      track.removeEventListener("click", onClick, true);
    };
  }, []);

  return (
    <section
      id="work"
      className="pt-[clamp(80px,12vh,150px)] pb-[clamp(36px,5vh,64px)]"
    >
      <div className="flex items-end justify-between gap-6 px-gutter pb-[clamp(28px,5vh,56px)]">
        <Reveal
          variant="mask"
          as="h2"
          className="m-0 font-display font-normal text-[clamp(30px,5vw,72px)] leading-[0.95] tracking-[-0.015em]"
        >
          {d.work.title}
        </Reveal>
        <Reveal
          as="span"
          className="font-mono text-[clamp(9.5px,0.72vw,11px)] uppercase tracking-[0.18em] text-muted"
        >
          {d.work.hint}
        </Reveal>
      </div>

      <div
        ref={trackRef}
        className="track-scroll flex touch-pan-x cursor-grab items-center gap-[clamp(18px,3vw,56px)] overflow-x-auto overscroll-x-contain px-gutter snap-x snap-proximity [scrollbar-width:none] [-webkit-overflow-scrolling:touch]"
      >
        {gallery.map((shot) => (
          <figure
            key={shot.id}
            className={cn(
              "shot relative w-auto shrink-0 snap-center",
              offsetClass(shot.variant),
            )}
          >
            <Plate
              label={shot.label}
              img={shot.src}
              className={cn(
                "h-[clamp(320px,58vh,560px)] w-auto max-[860px]:h-[52svh]",
                aspectOnly(shot.variant),
              )}
            />
            <figcaption className="flex justify-between gap-4 pt-3">
              <span className="font-mono text-[clamp(9.5px,0.72vw,11px)] uppercase tracking-[0.18em] text-muted">
                {shot.caption}
              </span>
              <span className="font-mono text-[clamp(9.5px,0.72vw,11px)] uppercase tracking-[0.18em] text-muted">
                {shot.tag}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="flex items-center gap-[18px] px-gutter pt-[clamp(22px,4vh,44px)]">
        <span
          ref={countRef}
          className="font-mono text-[clamp(9.5px,0.72vw,11px)] uppercase tracking-[0.18em] text-muted"
        >
          01 / 06
        </span>
        <span className="relative h-px flex-1 bg-rule">
          <i
            ref={barRef}
            className="absolute top-[-1px] left-0 h-[3px] w-[16.66%] bg-accent not-italic"
          />
        </span>
      </div>
    </section>
  );
};
