"use client";

import { Plate } from "@/components/ui/Plate";
import { Reveal } from "@/components/ui/Reveal";
import { useDictionary } from "@/context/LocaleProvider";
import { assets } from "@/data/assets";
import { useParallax } from "@/lib/useParallax";

export const Place = (): React.ReactElement => {
  const d = useDictionary();
  const plateRef = useParallax<HTMLDivElement>({ amount: -30 });
  const wordRef = useParallax<HTMLSpanElement>({ drift: -120 });

  return (
    <section id="place" className="relative">
      <div className="relative flex min-h-[clamp(480px,88svh,900px)] items-end overflow-hidden">
        <div ref={plateRef} className="absolute inset-x-0 -inset-y-[8%] border-x-0">
          <Plate
            label={d.place.plateLabel}
            img={assets.place}
            reveal
            className="h-full w-full border-x-0"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.62)_0%,rgba(8,8,8,0.18)_38%,rgba(8,8,8,0.92)_100%)]" />

        <span
          ref={wordRef}
          className="absolute left-0 top-[clamp(60px,14vh,140px)] whitespace-nowrap font-display font-normal text-[clamp(70px,17vw,260px)] leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgba(234,234,234,0.34)] will-change-transform"
        >
          {d.place.word}
        </span>

        <div className="relative z-[4] w-full px-gutter pb-[clamp(34px,6vh,70px)]">
          <Reveal
            variant="mask"
            as="h2"
            className="mb-[18px] mt-0 max-w-[18ch] font-display font-normal text-[clamp(26px,3.6vw,50px)] tracking-[-0.01em]"
          >
            {d.place.title}
          </Reveal>
          <Reveal as="p" className="mb-[22px] mt-0 max-w-[44ch] text-accent">
            {d.place.copy}
          </Reveal>
          <Reveal className="flex flex-wrap gap-[clamp(18px,4vw,64px)] border-t border-[rgba(234,234,234,0.22)] pt-[18px]">
            <div>
              <span className="font-mono text-[clamp(9.5px,0.72vw,11px)] uppercase tracking-[0.18em] text-muted">
                {d.place.findLabel}
              </span>
              <span className="mt-1.5 block text-[14px] text-text">
                {d.place.find}{" "}
                <small className="font-mono text-[clamp(9.5px,0.72vw,11px)] uppercase tracking-[0.18em] text-muted">
                  {d.place.findHint}
                </small>
              </span>
            </div>
            <div>
              <span className="font-mono text-[clamp(9.5px,0.72vw,11px)] uppercase tracking-[0.18em] text-muted">
                {d.place.parkingLabel}
              </span>
              <span className="mt-1.5 block text-[14px] text-text">
                {d.place.parking}
              </span>
            </div>
            <div>
              <span className="font-mono text-[clamp(9.5px,0.72vw,11px)] uppercase tracking-[0.18em] text-muted">
                {d.place.gettingInLabel}
              </span>
              <span className="mt-1.5 block text-[14px] text-text">
                {d.place.gettingIn}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
