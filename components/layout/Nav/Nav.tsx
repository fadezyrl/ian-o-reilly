"use client";

import { useDictionary } from "@/context/LocaleProvider";
import { useSmoothAnchors } from "@/lib/useSmoothAnchors";

export const Nav = (): React.ReactElement => {
  const d = useDictionary();
  useSmoothAnchors();

  return (
    <nav className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between gap-5 px-gutter py-[18px] pt-[calc(18px+env(safe-area-inset-top,0px))] mix-blend-difference">
      <a
        className="flex items-baseline gap-2.5"
        href="#top"
        aria-label={d.nav.backToTop}
      >
        <b className="font-display font-normal text-[19px] tracking-[0.02em]">
          {d.meta.brand}
        </b>
        <span className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-muted">
          {d.meta.location}
        </span>
      </a>
      <div className="hidden gap-[clamp(16px,2.4vw,34px)] max-[760px]:hidden min-[761px]:flex">
        <a
          href="#craft"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-text opacity-[0.72] transition-opacity duration-400 hover:opacity-100"
        >
          {d.nav.craft}
        </a>
        <a
          href="#work"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-text opacity-[0.72] transition-opacity duration-400 hover:opacity-100"
        >
          {d.nav.work}
        </a>
        <a
          href="#ian"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-text opacity-[0.72] transition-opacity duration-400 hover:opacity-100"
        >
          {d.nav.ian}
        </a>
        <a
          href="#place"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-text opacity-[0.72] transition-opacity duration-400 hover:opacity-100"
        >
          {d.nav.place}
        </a>
        <a
          href="#book"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-text opacity-[0.72] transition-opacity duration-400 hover:opacity-100"
        >
          {d.nav.book}
        </a>
      </div>
    </nav>
  );
};
