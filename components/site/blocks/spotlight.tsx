import { Check } from "lucide-react";

import type { ListSection } from "@/lib/content/types";
import { ImageSlider } from "./slider";
import { alignLeft } from "./showcase";

/**
 * 히어로 바로 아래 넓은 띠로 먼저 보여 주는 대표 섹션.
 *
 * 좌측에 설명과 포함 항목, 우측에 예시 이미지를 크게 넘겨 본다.
 * 건강검진 리포트처럼 페이지에서 가장 먼저 강조하고 싶은 것을 위해 둔다.
 */
export function Spotlight({ section }: { section: ListSection }) {
  return (
    <section id={section.id} className="scroll-mt-36 bg-mist">
      <div
        className={`grid items-center gap-12 px-5 py-16 md:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:py-24 lg:pr-[max(2rem,calc((100vw-78rem)/2+2rem))] ${alignLeft}`}
      >
        <div className="flex flex-col gap-6">
          {section.eyebrow ? (
            <span className="text-sm font-semibold tracking-[0.06em] text-teal-deep">
              {section.eyebrow}
            </span>
          ) : null}
          <h2 className="font-serif text-[clamp(1.75rem,1.25rem+1.8vw,2.625rem)] font-bold leading-[1.35] tracking-[-0.03em] text-balance text-ink">
            {section.title}
          </h2>
          {section.intro ? (
            <p className="text-[1.03125rem] leading-[1.8] text-muted-foreground">
              {section.intro}
            </p>
          ) : null}

          <ul className="grid list-none gap-x-6 gap-y-3 sm:grid-cols-2">
            {section.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] leading-6 text-ink">
                <span
                  aria-hidden
                  className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-teal-deep text-white"
                >
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          {section.note ? (
            <p className="border-l-2 border-gold pl-4 text-[0.90625rem] leading-[1.8] text-muted-foreground">
              {section.note}
            </p>
          ) : null}
        </div>

        {section.slides?.length ? (
          <ImageSlider
            images={section.slides}
            label={`${section.title} 예시`}
            className="max-w-none min-w-0"
          />
        ) : null}
      </div>
    </section>
  );
}
