import type { ReactNode } from "react";

type RouteIntroProps = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
  className?: string;
};

const defaultTitleClassName =
  "max-w-[14ch] text-balance text-[3rem] font-black uppercase leading-[0.9] tracking-[-0.05em] sm:max-w-[13ch] sm:text-[4.2rem] md:max-w-[12ch] md:text-[5.2rem] lg:max-w-none lg:text-[6.1rem]";

export function RouteIntro({
  eyebrow,
  title,
  description,
  titleClassName = defaultTitleClassName,
  descriptionClassName = "",
  className = "",
}: RouteIntroProps) {
  return (
    <div
      className={`grid gap-8 lg:grid-cols-[minmax(0,1.16fr)_minmax(22rem,0.84fr)] lg:items-end lg:gap-14 ${className}`}
    >
      <div>
        <p className="mb-5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black/48">
          {eyebrow}
        </p>
        <h1 className={titleClassName}>{title}</h1>
      </div>

      <div className="max-w-[42rem] lg:justify-self-end">
        <div
          className={`text-[1rem] leading-7 text-black/70 sm:text-[1.08rem] ${descriptionClassName}`}
        >
          {description}
        </div>
      </div>
    </div>
  );
}
