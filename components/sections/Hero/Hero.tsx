"use client";

import { BookLine } from "@/components/ui/BookLine";
import { Reveal } from "@/components/ui/Reveal";
import { useDictionary } from "@/context/LocaleProvider";
import { assets } from "@/data/assets";

export const Hero = (): React.ReactElement => {
  const d = useDictionary();

  return (
    <header
      id="top"
      className="relative grid min-h-svh grid-cols-12 grid-rows-[1fr_auto] gap-x-[clamp(12px,2vw,28px)] overflow-hidden px-gutter pt-[clamp(120px,16vh,190px)] pb-[clamp(28px,5vh,56px)] max-[860px]:grid-cols-1 max-[860px]:grid-rows-[1fr_auto] max-[860px]:pt-[calc(96px+env(safe-area-inset-top,0px))]"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={assets.heroVideo}
          poster={assets.hero}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.55)_0%,rgba(8,8,8,0.28)_42%,rgba(8,8,8,0.78)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_70%_20%,rgba(8,8,8,0.15),rgba(8,8,8,0.72)_78%)]" />
      </div>

      <div className="col-[1/10] row-[1/2] relative z-[3] self-end pb-[clamp(10px,4vh,40px)] max-[860px]:col-auto max-[860px]:pb-[26px]">
        <Reveal
          variant="mask"
          as="div"
          className="font-display font-normal leading-[0.82] tracking-[-0.022em] text-[clamp(58px,12.2vw,185px)] text-text"
        >
          {d.hero.line1}
        </Reveal>
        <Reveal
          variant="mask"
          as="div"
          className="font-display font-normal leading-[0.82] tracking-[-0.022em] text-[clamp(58px,12.2vw,185px)] pl-[clamp(40px,14vw,220px)] text-text max-[860px]:pl-[22vw]"
          delayIndex={1}
        >
          <em className="italic">{d.hero.line2}</em>
        </Reveal>
      </div>

      <Reveal
        as="span"
        className="absolute left-[calc(var(--gutter)*-1+8px)] top-[38%] z-[4] origin-top-left -rotate-90 font-mono text-[10px] uppercase tracking-[0.34em] text-muted max-[860px]:hidden"
      >
        {d.hero.edge}
      </Reveal>

      <div className="col-[1/13] row-[2/3] relative z-[5] flex items-end justify-between gap-6 border-t border-[rgba(234,234,234,0.22)] pt-4 max-[860px]:col-auto max-[860px]:flex-col max-[860px]:items-start max-[860px]:gap-[22px]">
        <Reveal as="p" className="max-w-[30ch] text-[clamp(14px,1.3vw,18px)] leading-[1.45] text-text">
          {d.hero.claim}
          <small className="mt-1.5 block font-mono text-[clamp(9.5px,0.72vw,11px)] uppercase tracking-[0.18em] text-muted">
            {d.hero.claimMeta}
          </small>
        </Reveal>
        <Reveal>
          <BookLine href="#book" hint={d.hero.ctaHint}>
            {d.hero.cta}
          </BookLine>
        </Reveal>
      </div>
    </header>
  );
};
