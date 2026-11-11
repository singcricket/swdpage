import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Img } from "@/lib/images";
import { ArchImage } from "./arch";
import { Reveal } from "./reveal";
import { Eyebrow } from "./primitives";

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
 * 페이지가 열리는 방식.
 *
 * 카피를 먼저 읽고, 그 옆에서 아치가 위에서 아래로 열리며 공간을 보여준다.
 * 건물에 들어설 때의 순서를 그대로 옮겼다.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  crumbs,
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  image: Img;
  crumbs?: Crumb[];
  className?: string;
}) {
  return (
    <div className={cn("border-b border-border bg-mist/35", className)}>
      <div className="shell grid items-center gap-10 py-14 lg:grid-cols-[1fr_minmax(0,23rem)] lg:gap-16 lg:py-20">
        <div>
          {crumbs?.length ? (
            <nav aria-label="현재 위치" className="mb-6">
              <ol className="flex list-none flex-wrap items-center gap-x-2 gap-y-1">
                {crumbs.map((crumb, index) => (
                  <li key={crumb.href} className="flex items-center gap-2">
                    {index > 0 ? (
                      <span aria-hidden className="text-border">
                        /
                      </span>
                    ) : null}
                    <Link
                      href={crumb.href}
                      className="type-label text-muted-foreground underline-offset-4 transition-colors hover:text-teal-deep hover:underline"
                    >
                      {crumb.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          ) : eyebrow ? (
            <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
          ) : null}

          <h1 className="type-display measure text-ink">
            {toSentences(title).map((sentence) => (
              <span key={sentence} className="block">
                {sentence}
              </span>
            ))}
          </h1>

          {lede ? <p className="type-lede measure mt-7">{lede}</p> : null}
        </div>

        {/* 너비는 래퍼가 정한다. 프레임이 w-full 이면서 래퍼 너비가
            내용에 따라 결정되면 서로를 참조해 0 이 된다. */}
        <Reveal
          variant="arch"
          className="w-[17rem] justify-self-center sm:w-[19rem] lg:w-full lg:justify-self-end"
        >
          <ArchImage
            image={image}
            ratio="tall"
            priority
            outlined
            sizes="(min-width: 1024px) 23rem, 19rem"
          />
        </Reveal>
      </div>
    </div>
  );
}
