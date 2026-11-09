"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { Img } from "@/lib/images";
import { cn } from "@/lib/utils";

export type ZoomProp = {
  /** 함께 넘겨볼 사진 묶음. 같은 섹션·같은 공간의 사진들. */
  gallery: readonly Img[];
  /** 묶음 안에서 이 사진의 위치 */
  index: number;
};

/**
 * 사진 프레임 위에 얹는 투명 버튼 + 크게 보기 창.
 *
 * 프레임 전체를 버튼으로 감싸면 figure·figcaption 이 버튼 안에 들어가
 * HTML 규칙에 어긋난다. 그래서 프레임(position: relative) 위에 버튼을
 * 덮어씌운다. 창은 네이티브 <dialog> 의 top layer 에 그려지므로 아치
 * 프레임의 overflow·clip 에 잘리지 않는다.
 *
 * 키보드: ← → 로 넘기고 Esc 로 닫는다. 배경을 눌러도 닫힌다.
 */
export function ZoomOverlay({ gallery, index }: ZoomProp) {
  const [current, setCurrent] = React.useState<number | null>(null);
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const count = gallery.length;

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (current === null || !dialog) return;
    if (!dialog.open) dialog.showModal();

    // 모달이 떠 있는 동안 뒤 페이지가 스크롤되지 않게 한다.
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [current]);

  const step = React.useCallback(
    (delta: number) =>
      setCurrent((value) =>
        value === null ? value : (value + delta + count) % count,
      ),
    [count],
  );

  const image = current === null ? null : gallery[current];
  const label = gallery[index]?.alt ?? "사진";

  return (
    <>
      <button
        type="button"
        onClick={() => setCurrent(index)}
        aria-label={`${label} 크게 보기`}
        className="absolute inset-0 z-10 cursor-zoom-in rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      />

      {image ? (
        <dialog
          ref={dialogRef}
          aria-label={image.alt}
          onClose={() => setCurrent(null)}
          onClick={(event) => {
            // 사진·버튼이 아니라 배경을 눌렀을 때만 닫는다.
            if (event.target === event.currentTarget) dialogRef.current?.close();
          }}
          onKeyDown={(event) => {
            if (count < 2) return;
            if (event.key === "ArrowRight") step(1);
            if (event.key === "ArrowLeft") step(-1);
          }}
          className="fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none bg-black/95 p-0 text-white backdrop:bg-black/70"
        >
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-4 px-4 py-16 sm:px-20"
            onClick={(event) => {
              if (event.target === event.currentTarget) dialogRef.current?.close();
            }}
          >
            <div className="relative min-h-0 w-full flex-1">
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <p className="max-w-2xl text-center text-[0.875rem] leading-6 text-white/85">
              {image.alt}
              {count > 1 ? (
                <span className="ml-3 tabular-nums text-white/50">
                  {current! + 1} / {count}
                </span>
              ) : null}
            </p>
          </div>

          <ControlButton
            label="닫기"
            onClick={() => dialogRef.current?.close()}
            className="right-3 top-3"
            autoFocus
          >
            <X className="size-5" aria-hidden />
          </ControlButton>

          {count > 1 ? (
            <>
              <ControlButton
                label="이전 사진"
                onClick={() => step(-1)}
                className="left-2 top-1/2 -translate-y-1/2 sm:left-4"
              >
                <ChevronLeft className="size-6" aria-hidden />
              </ControlButton>
              <ControlButton
                label="다음 사진"
                onClick={() => step(1)}
                className="right-2 top-1/2 -translate-y-1/2 sm:right-4"
              >
                <ChevronRight className="size-6" aria-hidden />
              </ControlButton>
            </>
          ) : null}
        </dialog>
      ) : null}
    </>
  );
}

function ControlButton({
  label,
  onClick,
  className,
  children,
  autoFocus,
}: {
  label: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  autoFocus?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      autoFocus={autoFocus}
      className={cn(
        "absolute flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        className,
      )}
    >
      {children}
    </button>
  );
}
