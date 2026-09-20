"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from "react";
import { BookLine } from "@/components/ui/BookLine";
import { Reveal } from "@/components/ui/Reveal";
import { useDictionary } from "@/context/LocaleProvider";
import { bookingServices, bookingTimes } from "@/data/services";
import { cn } from "@/lib/cn";

type Picked = {
  service: string | null;
  day: string | null;
  time: string | null;
};

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const Book = (): ReactElement => {
  const d = useDictionary();
  const [picked, setPicked] = useState<Picked>({
    service: null,
    day: null,
    time: null,
  });
  const [done, setDone] = useState("");
  const magnetRef = useRef<HTMLAnchorElement | null>(null);

  const days = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const date = new Date(now.getTime() + (i + 1) * 86400000);
      return `${dayNames[(date.getDay() + 6) % 7]} ${date.getDate()}`;
    });
  }, []);

  const summary = useMemo(() => {
    const service = picked.service ? picked.service.toLowerCase() : "cut";
    const dayPart = picked.day ? `, ${picked.day}` : null;
    const timePart = picked.time ? ` at ${picked.time}` : null;
    return { service, dayPart, timePart, hasService: Boolean(picked.service) };
  }, [picked]);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const m = magnetRef.current;
    if (!m) return;
    const wrap = m.parentElement;
    if (!wrap) return;

    const onMove = (e: MouseEvent): void => {
      const r = m.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      if (Math.abs(dx) > r.width || Math.abs(dy) > 60) {
        m.style.transform = "";
        return;
      }
      m.style.transform = `translate3d(${dx * 0.22}px,${dy * 0.3}px,0)`;
    };

    const onLeave = (): void => {
      m.style.transform = "";
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const select = (
    group: keyof Picked,
    value: string,
  ): void => {
    setPicked((prev) => ({ ...prev, [group]: value }));
    setDone("");
  };

  const send = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    const missing: string[] = [];
    if (!picked.service) missing.push(d.book.missingService);
    if (!picked.day) missing.push(d.book.missingDay);
    if (!picked.time) missing.push(d.book.missingTime);
    if (missing.length) {
      setDone(`${d.book.missingPrefix} ${missing.join(", ")}`);
      return;
    }
    setDone(d.book.done);
  };

  const Opt = ({
    label,
    group,
    mono = false,
  }: {
    label: string;
    group: keyof Picked;
    mono?: boolean;
  }): ReactElement => {
    const pressed = picked[group] === label;
    return (
      <button
        type="button"
        aria-pressed={pressed}
        onClick={() => select(group, label)}
        className={cn(
          "relative py-1 pb-1.5 font-display text-[clamp(18px,2vw,27px)] leading-[1.1] text-muted transition-colors duration-450 ease-brand",
          "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-accent after:origin-right after:scale-x-0 after:transition-transform after:duration-550 after:ease-slow",
          "hover:text-accent",
          pressed && "text-white after:scale-x-100 after:origin-left",
          mono && "font-mono text-[13px] tracking-[0.06em]",
        )}
      >
        {label}
      </button>
    );
  };

  return (
    <section id="book" className="px-gutter py-[clamp(100px,16vh,190px)]">
      <h2 className="m-0 font-display font-normal text-[clamp(52px,13.5vw,220px)] leading-[0.82] tracking-[-0.03em]">
        <Reveal variant="mask" as="span">
          {d.book.title1}
        </Reveal>
        <Reveal variant="mask" as="span" className="block" delayIndex={1}>
          <em className="italic">{d.book.title2}</em>
        </Reveal>
      </h2>

      <div className="grid grid-cols-12 gap-[clamp(16px,2.4vw,32px)] pt-[clamp(34px,6vh,70px)]">
        <Reveal className="col-[1/4] max-[900px]:col-span-full max-[900px]:mb-[26px]">
          <span className="tick" />
          <p className="mt-3 mb-0 max-w-[28ch] text-muted">{d.book.aside}</p>
        </Reveal>

        <div className="col-[5/13] max-[900px]:col-span-full">
          <Reveal className="grid grid-cols-[auto_1fr] items-start gap-[clamp(14px,3vw,40px)] border-t border-rule py-[clamp(16px,2.4vh,26px)] max-[900px]:grid-cols-1 max-[900px]:gap-3">
            <span className="font-mono text-[clamp(9.5px,0.72vw,11px)] uppercase tracking-[0.18em] text-muted">
              {d.book.service}
            </span>
            <div className="flex flex-wrap gap-x-[26px] gap-y-2">
              {bookingServices.map((s) => (
                <Opt key={s} label={s} group="service" />
              ))}
            </div>
          </Reveal>

          <Reveal
            className="grid grid-cols-[auto_1fr] items-start gap-[clamp(14px,3vw,40px)] border-t border-rule py-[clamp(16px,2.4vh,26px)] max-[900px]:grid-cols-1 max-[900px]:gap-3"
            delayIndex={1}
          >
            <span className="font-mono text-[clamp(9.5px,0.72vw,11px)] uppercase tracking-[0.18em] text-muted">
              {d.book.day}
            </span>
            <div className="flex flex-wrap gap-x-[26px] gap-y-2">
              {days.map((day) => (
                <Opt key={day} label={day} group="day" mono />
              ))}
            </div>
          </Reveal>

          <Reveal
            className="grid grid-cols-[auto_1fr] items-start gap-[clamp(14px,3vw,40px)] border-t border-rule py-[clamp(16px,2.4vh,26px)] max-[900px]:grid-cols-1 max-[900px]:gap-3"
            delayIndex={2}
          >
            <span className="font-mono text-[clamp(9.5px,0.72vw,11px)] uppercase tracking-[0.18em] text-muted">
              {d.book.time}
            </span>
            <div className="flex flex-wrap gap-x-[26px] gap-y-2">
              {bookingTimes.map((t) => (
                <Opt key={t} label={t} group="time" mono />
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-1 flex flex-wrap items-end justify-between gap-6 border-t border-rule pt-[clamp(20px,3.4vh,34px)]">
            <p className="m-0 max-w-[24ch] font-display text-[clamp(19px,2.3vw,32px)] leading-[1.25] text-text">
              {!summary.hasService ? <b className="font-normal text-muted">A </b> : null}
              {summary.service}
              {summary.dayPart ?? (
                <>
                  , <b className="font-normal text-muted">on a day</b>
                </>
              )}
              {summary.timePart ?? (
                <>
                  {" "}
                  <b className="font-normal text-muted">at a time</b>
                </>
              )}
              .
            </p>
            <div>
              <BookLine
                ref={magnetRef}
                href="#book"
                magnetic
                onClick={send}
              >
                {d.book.send}
              </BookLine>
              <p
                className="mt-4 min-h-[17px] font-mono text-[11px] uppercase tracking-[0.16em] text-muted"
                role="status"
              >
                {done}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
