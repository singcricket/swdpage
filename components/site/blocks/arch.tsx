import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Img } from "@/lib/images";
import { ZoomOverlay, type ZoomProp } from "./zoom";

type ArchImageProps = {
  image: Img;
  /**
   * 아치 비율. 건물의 반원 창은 대체로 폭보다 높이가 크다.
   *   tall   1 : 1.45  — 히어로, 단독 배치
   *   window 1 : 1.15  — 나란히 놓는 사진
   *   wide   1 : 0.72  — 넓은 공간을 담을 때
   */
  ratio?: "tall" | "window" | "wide";
  /** 아래 붙는 캡션 */
  caption?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** 아치 바깥을 teal 선이 한 겹 감싼다. 코브 조명을 옮긴 것. */
  outlined?: boolean;
  /** 주면 눌러서 크게 볼 수 있다 */
  zoom?: ZoomProp;
};

const ratioClass = {
  tall: "aspect-[1/1.45]",
  window: "aspect-[1/1.15]",
  wide: "aspect-[1/0.72]",
} as const;

/**
 * 이 사이트의 시그니처.
 *
 * 대기실의 반원 창, 벽을 뚫은 아치형 출입구, 곡선 리셉션 데스크 —
 * 건물이 반복하는 형태를 사진 프레임으로 그대로 가져왔다.
 * 상단 두 모서리의 반지름 합이 너비를 넘으면 브라우저가 각각 너비의 절반으로
 * 줄이기 때문에, 큰 값 하나로 정확한 반원이 만들어진다.
 */
export function ArchImage({
  image,
  ratio = "window",
  caption,
  priority = false,
  sizes = "(min-width: 1024px) 32rem, 90vw",
  className,
  outlined = false,
  zoom,
}: ArchImageProps) {
  const frame = (
    <div
      className={cn("relative w-full bg-mist arch", ratioClass[ratio], className)}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
      {/* 윤곽선은 사진 위에 따로 얹는다. inset ring 은 배경 레이어에 그려져
          fill 이미지에 가려진다. */}
      {outlined ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 border border-teal/80 arch"
        />
      ) : null}
      {zoom ? <ZoomOverlay {...zoom} /> : null}
    </div>
  );

  if (!caption) return frame;

  return (
    <figure className="flex flex-col gap-3">
      {frame}
      <figcaption className="text-[0.8125rem] leading-6 text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

type RectImageProps = {
  image: Img;
  /**
   * 사각 비율.
   *   tall   1 : 1.45  — 히어로, 단독 배치
   *   window 1 : 1.15  — 나란히 놓는 사진
   *   wide   1 : 0.72  — 넓은 공간을 담을 때
   *   square 1 : 1     — 정사각
   *   auto   원본 이미지의 width/height 비율 그대로 (크롭 없음).
   *          image에 width/height가 없으면 window로 대체된다.
   */
  ratio?: "tall" | "window" | "wide" | "square" | "auto";
  /** 아래 붙는 캡션 */
  caption?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** 프레임 바깥을 teal 선이 한 겹 감싼다. */
  outlined?: boolean;
  /** 주면 눌러서 크게 볼 수 있다 */
  zoom?: ZoomProp;
  /**
   * object-position 값 (예: "center top", "30% 50%").
   * null/undefined면 기본값(center)을 그대로 쓴다 — 얼굴이 중앙에서
   * 벗어나 크롭될 때만 페이지별로 지정하면 된다.
   */
  objectPosition?: string | null;
};

const rectRatioClass = {
  tall: "aspect-[1/1.45]",
  window: "aspect-[1/1.15]",
  wide: "aspect-[1/0.72]",
  square: "aspect-square",
} as const;

/** 아치 없이 모서리만 둥근 사각 프레임. 격자로 나열할 때 사용. */
export function RectImage({
  image,
  ratio = "window",
  caption,
  priority = false,
  sizes = "(min-width: 1024px) 32rem, 90vw",
  className,
  outlined = false,
  objectPosition = null,
  zoom,
}: RectImageProps) {
  const auto = ratio === "auto" && image.width && image.height;

  const frame = (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-mist",
        auto ? undefined : rectRatioClass[ratio === "auto" ? "window" : ratio],
        className,
      )}
      style={auto ? { aspectRatio: `${image.width} / ${image.height}` } : undefined}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        style={objectPosition ? { objectPosition } : undefined}
        className="object-cover"
      />
      {outlined ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl border border-teal/80"
        />
      ) : null}
      {zoom ? <ZoomOverlay {...zoom} /> : null}
    </div>
  );

  if (!caption) return frame;

  return (
    <figure className="flex flex-col gap-3">
      {frame}
      <figcaption className="text-[0.8125rem] leading-6 text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

/** 사진 없이 아치 형태만 필요한 자리 — 배경 장식용 빈 프레임 */
export function ArchOutline({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("arch-outline pointer-events-none", className)}
    />
  );
}
