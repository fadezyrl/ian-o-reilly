import { forwardRef, type MouseEvent, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type BookLineProps = {
  href: string;
  children: ReactNode;
  hint?: string;
  className?: string;
  magnetic?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  id?: string;
  external?: boolean;
};

export const BookLine = forwardRef<HTMLAnchorElement, BookLineProps>(
  (
    {
      href,
      children,
      hint,
      className,
      magnetic = false,
      onClick,
      id,
      external = false,
    },
    ref,
  ): ReactElement => {
    return (
      <a
        ref={ref}
        id={id}
        href={href}
        onClick={onClick}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className={cn(
          "relative inline-flex items-baseline gap-3 whitespace-nowrap pb-[7px] font-mono text-[11px] uppercase tracking-[0.2em] text-text",
          "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-[0.24] after:bg-accent after:transition-transform after:duration-700 after:ease-slow after:content-['']",
          "hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100",
          magnetic &&
            "inline-block will-change-transform transition-transform duration-500 ease-slow",
          className,
        )}
      >
        <span>{children}</span>
        {hint ? <i className="not-italic text-muted">{hint}</i> : null}
      </a>
    );
  },
);

BookLine.displayName = "BookLine";
