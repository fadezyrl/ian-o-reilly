"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useDictionary } from "@/context/LocaleProvider";

export const Footer = (): React.ReactElement => {
  const d = useDictionary();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule px-gutter pt-[clamp(40px,7vh,80px)] pb-[calc(clamp(22px,4vh,40px)+env(safe-area-inset-bottom,0px))]">
      <Reveal
        variant="mask"
        as="p"
        className="mb-[clamp(26px,5vh,56px)] mt-0 font-display font-normal text-[clamp(34px,10.6vw,168px)] leading-[0.86] tracking-[-0.028em]"
      >
        {d.footer.mark}
      </Reveal>
      <div className="flex flex-wrap justify-between gap-x-[34px] gap-y-[18px] border-t border-rule pt-[18px] font-mono text-[clamp(9.5px,0.72vw,11px)] uppercase tracking-[0.18em] text-muted">
        <span>{d.footer.place}</span>
        <a
          href={d.footer.instagramHref}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-400 hover:text-text"
        >
          {d.footer.instagram}
        </a>
        <a href="#book" className="transition-colors duration-400 hover:text-text">
          {d.footer.booking}
        </a>
        <a href="#info" className="transition-colors duration-400 hover:text-text">
          {d.footer.contact}
        </a>
        <span>&copy; {year}</span>
      </div>
    </footer>
  );
};
