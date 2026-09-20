"use client";

import { BookLine } from "@/components/ui/BookLine";
import { Reveal } from "@/components/ui/Reveal";
import { useDictionary } from "@/context/LocaleProvider";

export const Info = (): React.ReactElement => {
  const d = useDictionary();

  const rows = [
    {
      label: d.info.locationLabel,
      value: d.info.location,
      hint: d.info.locationHint,
      aside: d.info.locationAside,
    },
    {
      label: d.info.hoursLabel,
      value: d.info.hours,
      hint: d.info.hoursHint,
      aside: d.info.hoursAside,
    },
    {
      label: d.info.contactLabel,
      value: (
        <BookLine href={d.info.contactHref}>{d.info.contact}</BookLine>
      ),
      aside: d.info.contactAside,
    },
    {
      label: d.info.bookingLabel,
      value: <BookLine href="#book">{d.info.booking}</BookLine>,
      aside: d.info.bookingAside,
    },
    {
      label: d.info.instagramLabel,
      value: (
        <BookLine href={d.info.instagramHref} external>
          {d.info.instagram}
        </BookLine>
      ),
      aside: d.info.instagramAside,
    },
  ];

  return (
    <section id="info" className="px-gutter py-[clamp(70px,11vh,140px)]">
      <dl className="m-0">
        {rows.map((row, i) => (
          <Reveal
            key={row.label}
            className="grid grid-cols-12 gap-[clamp(14px,2.4vw,32px)] border-t border-rule py-[clamp(18px,3vh,30px)] last:border-b"
            delayIndex={Math.min(i, 3)}
          >
            <dt className="col-[1/4] font-mono text-[clamp(9.5px,0.72vw,11px)] uppercase tracking-[0.18em] text-muted max-[860px]:col-span-full">
              {row.label}
            </dt>
            <dd className="col-[5/10] m-0 text-[clamp(15px,1.3vw,19px)] text-text max-[860px]:col-span-full max-[860px]:mt-2">
              {row.value}
              {"hint" in row && row.hint ? (
                <small className="mt-1 block text-[13px] text-muted">
                  {row.hint}
                </small>
              ) : null}
            </dd>
            <span className="col-[11/13] text-right font-mono text-[clamp(9.5px,0.72vw,11px)] uppercase tracking-[0.18em] text-muted max-[860px]:hidden">
              {row.aside}
            </span>
          </Reveal>
        ))}
      </dl>
    </section>
  );
};
