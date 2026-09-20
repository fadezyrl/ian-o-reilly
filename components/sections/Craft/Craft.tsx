"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";
import { Plate } from "@/components/ui/Plate";
import { Reveal } from "@/components/ui/Reveal";
import { useDictionary } from "@/context/LocaleProvider";
import { services } from "@/data/services";
import { cn } from "@/lib/cn";

export const Craft = (): ReactElement => {
  const d = useDictionary();
  const [openId, setOpenId] = useState<string | null>(null);
  const [previewLabel, setPreviewLabel] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [previewOn, setPreviewOn] = useState(false);
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const previewRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ px: 0, py: 0, cx: 0, cy: 0, on: false });

  const toggle = useCallback((id: string): void => {
    setOpenId((prev) => (prev === id ? null : id));
    setPreviewOn(false);
  }, []);

  useEffect(() => {
    const onResize = (): void => {
      if (!openId) return;
      const panel = panelRefs.current[openId];
      const inner = panel?.firstElementChild as HTMLElement | null;
      if (panel && inner) panel.style.height = `${inner.offsetHeight}px`;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [openId]);

  useEffect(() => {
    Object.entries(panelRefs.current).forEach(([id, panel]) => {
      if (!panel) return;
      const inner = panel.firstElementChild as HTMLElement | null;
      if (!inner) return;
      panel.style.height = openId === id ? `${inner.offsetHeight}px` : "0px";
    });
  }, [openId]);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const onMove = (e: MouseEvent): void => {
      pos.current.px = e.clientX;
      pos.current.py = e.clientY;
    };

    let raf = 0;
    const follow = (): void => {
      const p = pos.current;
      p.cx += (p.px - p.cx) * 0.12;
      p.cy += (p.py - p.cy) * 0.12;
      const k = p.on ? 1 : 0.94;
      const el = previewRef.current;
      if (el) {
        el.style.transform = `translate3d(${p.cx}px,${p.cy}px,0) translate(-50%,-50%) scale(${k})`;
      }
      raf = requestAnimationFrame(follow);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(follow);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    pos.current.on = previewOn;
  }, [previewOn]);

  return (
    <>
      <section id="craft" className="px-gutter py-[clamp(70px,10vh,120px)]">
        <div className="flex items-end justify-between gap-7 pb-[clamp(26px,5vh,52px)]">
          <Reveal
            variant="mask"
            as="h2"
            className="m-0 font-display font-normal text-[clamp(26px,3.4vw,46px)] tracking-[-0.01em]"
          >
            {d.craft.title}
          </Reveal>
          <Reveal
            as="span"
            className="font-mono text-[clamp(9.5px,0.72vw,11px)] uppercase tracking-[0.18em] text-muted"
          >
            {d.craft.hint}
          </Reveal>
        </div>

        <div className="border-t border-rule">
          {services.map((service) => {
            const expanded = openId === service.id;
            return (
              <Reveal key={service.id} as="article" className="border-b border-rule">
                <button
                  type="button"
                  className={cn(
                    "group row-bar grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-[clamp(14px,3vw,44px)] py-[clamp(18px,2.6vh,30px)] text-left transition-[padding-left,color] duration-700 ease-slow max-[900px]:grid-cols-[auto_1fr]",
                    "hover:pl-[clamp(8px,1.6vw,26px)]",
                    expanded && "pl-[clamp(8px,1.6vw,26px)]",
                  )}
                  aria-expanded={expanded}
                  onClick={() => toggle(service.id)}
                  onMouseEnter={() => {
                    if (expanded) return;
                    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
                    setPreviewLabel(service.previewLabel);
                    setPreviewImg(service.img);
                    setPreviewOn(true);
                  }}
                  onMouseLeave={() => setPreviewOn(false)}
                >
                  <span className="font-mono text-[10px] tracking-[0.18em] text-muted">
                    {service.idx}
                  </span>
                  <span
                    className={cn(
                      "font-display font-normal text-[clamp(28px,5.2vw,74px)] leading-none tracking-[-0.015em] transition-colors duration-500",
                      "group-hover:text-white",
                    )}
                  >
                    {service.name}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.1em] text-muted max-[900px]:col-start-2 max-[900px]:row-start-2">
                    {service.price}
                  </span>
                </button>
                <div
                  ref={(el) => {
                    panelRefs.current[service.id] = el;
                  }}
                  className="h-0 overflow-hidden transition-[height] duration-750 ease-slow"
                >
                  <div className="grid grid-cols-12 gap-[clamp(16px,2.4vw,32px)] pb-[clamp(26px,4vh,44px)] pl-[clamp(8px,1.6vw,26px)]">
                    <span className="col-[1/4] font-mono text-[clamp(9.5px,0.72vw,11px)] uppercase tracking-[0.18em] text-muted max-[900px]:col-span-full">
                      {service.duration}
                    </span>
                    <p className="col-[4/9] m-0 max-w-[54ch] text-accent max-[900px]:col-span-full">
                      {service.description}
                    </p>
                    <Plate
                      label={service.plateLabel}
                      img={service.img}
                      className="col-[10/13] aspect-[4/5] max-[900px]:col-span-full max-[900px]:mt-[18px] max-[900px]:aspect-[16/10]"
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <div
        ref={previewRef}
        className={cn(
          "fixed top-0 left-0 z-40 aspect-[4/5] w-[min(23vw,300px)] pointer-events-none opacity-0 transition-opacity duration-300 max-[900px]:hidden",
          previewOn && "opacity-100",
        )}
        style={{ transform: "translate3d(-50%,-50%,0)" }}
      >
        {previewImg ? (
          <Plate
            img={previewImg}
            label={previewLabel}
            className="h-full w-full"
          />
        ) : null}
      </div>
    </>
  );
};
