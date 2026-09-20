"use client";

import { Plate } from "@/components/ui/Plate";
import { Reveal } from "@/components/ui/Reveal";
import { useDictionary } from "@/context/LocaleProvider";
import { assets } from "@/data/assets";

export const Ian = (): React.ReactElement => {
  const d = useDictionary();

  return (
    <section id="ian" className="px-gutter py-[clamp(110px,18vh,210px)]">
      <div className="relative grid grid-cols-12 gap-[clamp(14px,2vw,28px)] max-[860px]:grid-cols-1">
        <Plate
          label={d.ian.plateLabel}
          img={assets.ian}
          reveal
          className="col-[1/7] row-start-1 aspect-[4/5] max-[860px]:col-auto max-[860px]:row-auto max-[860px]:w-[78%]"
        />

        <h2 className="col-[4/13] row-start-1 relative z-[3] self-center pointer-events-none mix-blend-difference font-display font-normal text-[clamp(46px,10.5vw,158px)] leading-[0.86] tracking-[-0.025em] max-[860px]:col-auto max-[860px]:row-auto max-[860px]:mt-[-16%] max-[860px]:pl-[6vw]">
          <Reveal variant="mask" as="span">
            {d.ian.name1}
          </Reveal>
          <Reveal variant="mask" as="span" className="block pl-[0.18em]" delayIndex={1}>
            <em className="italic">{d.ian.name2}</em>
          </Reveal>
        </h2>

        <div className="col-[8/13] row-start-1 pt-[clamp(20px,4vh,42px)] max-[860px]:col-auto max-[860px]:row-auto">
          <Reveal as="p" className="mb-[1.05em] mt-0 max-w-[46ch] text-accent">
            {d.ian.p1}
          </Reveal>
          <Reveal as="p" className="mb-0 mt-0 max-w-[46ch] text-muted" delayIndex={1}>
            {d.ian.p2}
          </Reveal>
        </div>

        <Reveal className="col-[1/7] row-start-2 flex gap-[clamp(20px,4vw,56px)] pt-[clamp(20px,4vh,42px)] max-[860px]:col-auto max-[860px]:row-auto">
          <div>
            <span className="font-mono text-[clamp(9.5px,0.72vw,11px)] uppercase tracking-[0.18em] text-muted">
              {d.ian.factChairsLabel}
            </span>
            <span className="mt-1.5 block font-display text-[clamp(22px,2.6vw,34px)] text-text">
              {d.ian.factChairs}
            </span>
          </div>
          <div>
            <span className="font-mono text-[clamp(9.5px,0.72vw,11px)] uppercase tracking-[0.18em] text-muted">
              {d.ian.factBookingLabel}
            </span>
            <span className="mt-1.5 block font-display text-[clamp(22px,2.6vw,34px)] text-text">
              {d.ian.factBooking}
            </span>
          </div>
          <div>
            <span className="font-mono text-[clamp(9.5px,0.72vw,11px)] uppercase tracking-[0.18em] text-muted">
              {d.ian.factBasedLabel}
            </span>
            <span className="mt-1.5 block font-display text-[clamp(22px,2.6vw,34px)] text-text">
              {d.ian.factBased}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
