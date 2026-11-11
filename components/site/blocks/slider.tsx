"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Img } from "@/lib/images";
import { cn } from "@/lib/utils";
import { RectImage } from "./arch";

/**
 * 가로로 넘겨 보는 이미지 묶음.
 *
 * 손가락으로 밀거나(모바일 · 트랙패드), 아래 화살표로 한 장씩 넘긴다.
 * 한 번에 한 장이 프레임에 꼭 맞게 보인다.
 * 사진을 누르면 크게 보기 창이 열리고, 그 안에서도 ← → 로 넘길 수 있다.
 */
export function ImageSlider({
  images,
  label,
  className,
}: {
  images: readonly Img[];
  /** 스크린리더용 묶음 이름 */
  label: string;
  className?: string;
}) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [current, setCurrent] = React.useState(0);
  const count = images.length;

  // 스크롤 위치에서 지금 보이는 장을 계산한다
  const onScroll = React.useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = [...track.children] as HTMLElement[];
    const left = track.scrollLeft;
    let nearest = 0;
    let best = Infinity;
    slides.forEach((slide, index) => {
      const distance = Math.abs(slide.offsetLeft - track.offsetLeft - left);
      if (distance < best) {
        best = distance;
        nearest = index;
      }
    });
    setCurrent(nearest);
  }, []);

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = Math.max(0, Math.min(count - 1, index));
    const slide = track.children[target] as HTMLElement | undefined;
    if (!slide) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className={cn("max-w-[46rem]", className)}
    >
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => (
          <div
            key={image.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${count}장 중 ${index + 1}번째`}
            className="w-full shrink-0 snap-start"
          >
            <RectImage
              image={image}
              ratio="auto"
              className="bg-card ring-1 ring-border"
              sizes="(min-width: 1024px) 46rem, 92vw"
              zoom={{ gallery: images, index }}
            />
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-4">
        <div className="flex gap-2">
          <SlideButton
            label="이전 장"
            disabled={current === 0}
            onClick={() => goTo(current - 1)}
          >
            <ChevronLeft className="size-4" aria-hidden />
          </SlideButton>
          <SlideButton
            label="다음 장"
            disabled={current === count - 1}
            onClick={() => goTo(current + 1)}
          >
            <ChevronRight className="size-4" aria-hidden />
          </SlideButton>
        </div>

        <p className="type-label tabular-nums text-teal-deep" aria-live="polite">
          {current + 1} / {count}
        </p>

        <p className="hidden min-w-0 truncate text-[0.8125rem] text-muted-foreground sm:block">
          {images[current]?.alt}
        </p>
      </div>
    </section>
  );
}

function SlideButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "grid size-10 place-items-center rounded-full border border-border bg-card text-ink transition-colors",
        "hover:border-teal hover:text-teal-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        "disabled:cursor-default disabled:opacity-35 disabled:hover:border-border disabled:hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
