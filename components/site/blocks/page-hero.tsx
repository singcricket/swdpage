import Link from "next/link";

import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Img } from "@/lib/images";
import { heroEyebrowEn } from "@/lib/site";
import { SectionTabs } from "./section-tabs";

type Crumb = { label: string; href: string };

/**
 * 헤드라인을 문장 단위로 나눈다.
 *
 * 「심장은 아프다고 말하지 않습니다. 그래서 먼저 확인해야 합니다」처럼 두
 * 문장인 카피는 마침표에서 줄이 나뉘어야 읽힌다. text-wrap: balance 에만
 * 맡기면 줄 길이를 맞추려고 「말하지 / 않습니다」처럼 어절 한가운데를 끊는다.
 *
 * 강제 개행(<br>)과 달리 문장 자체는 그대로 접히므로 좁은 화면에서도 깨지지
 * 않는다. 문장이 하나면 아무 일도 일어나지 않는다.
 */
function toSentences(headline: string) {
  return headline
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

/**
 * 페이지가 열리는 방식 (2026-11 개편안).
 *
 * 왼쪽은 남색 바탕에 경로 · 금색 눈썹 · 제목 · 소개글, 오른쪽은 화면 끝까지 꽉 찬 사진.
 * 그 아래 같은 메뉴의 다른 페이지로 가는 탭이 붙는다.
 * 모바일에서는 글 → 사진 순으로 쌓인다.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imageFit = "cover",
  crumbs,
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  image: Img;
  imageFit?: "cover" | "contain";
  crumbs?: Crumb[];
  className?: string;
}) {
  const current = crumbs?.at(-1)?.href;
  const label = (current && heroEyebrowEn[current]) || eyebrow;

  return (
    <>
      <div className={cn("grid bg-navy lg:min-h-[34rem] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]", className)}>
        <div className="flex flex-col justify-center gap-6 px-5 py-14 md:px-8 lg:py-16 lg:pr-14 lg:pl-[max(2rem,calc((100vw-78rem)/2+2rem))]">
          <nav aria-label="현재 위치">
            <ol className="flex list-none flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-on-navy-muted">
              {[{ label: "홈", href: "/" }, ...(crumbs ?? [])].map((crumb, index) => (
                <li key={crumb.href + index} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden>›</span> : null}
                  <Link
                    href={crumb.href}
                    className="underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {crumb.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          {label ? (
            <p className="flex items-center gap-3.5">
              <span aria-hidden className="h-px w-10 bg-gold" />
              <span className="text-[0.8125rem] font-semibold tracking-[0.22em] text-gold">
                {label}
              </span>
            </p>
          ) : null}

          <h1 className="font-serif text-[clamp(2rem,1.4rem+2vw,3.25rem)] font-bold leading-[1.28] tracking-[-0.03em] text-balance text-white">
            {toSentences(title).map((sentence) => (
              <span key={sentence} className="block">
                {sentence}
              </span>
            ))}
          </h1>

          {lede ? (
            <p className="max-w-[32rem] text-[clamp(1rem,0.95rem+0.25vw,1.09375rem)] leading-[1.8] text-pretty text-on-navy">
              {lede}
            </p>
          ) : null}
        </div>

        <div
          className={cn(
            "relative aspect-[4/3] lg:aspect-auto",
            imageFit === "contain" ? "bg-navy" : "bg-[#3a4b5e]",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 56vw, 100vw"
            className={imageFit === "contain" ? "object-contain" : "object-cover"}
          />
        </div>
      </div>

      <SectionTabs />
    </>
  );
}
