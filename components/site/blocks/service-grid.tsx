import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { services } from "@/lib/content/services";
import { RectImage } from "./arch";
import { Reveal } from "./reveal";
import { stagger } from "@/lib/motion";

/**
 * 진료 분야 입구.
 *
 * 카드마다 그 클리닉 원고의 대표 카피를 그대로 실었다. 병원이 각 분야를
 * 어떤 태도로 보는지가 곧 그 페이지를 열어볼 이유가 된다.
 *
 * - 모바일: 사진을 빼고 제목·카피·범위만 있는 목록. 사진 일곱 장이 세로로
 *   쌓이면 이 섹션 하나가 화면 네 장을 넘긴다.
 * - sm 이상: 사진 카드 격자. 마지막 줄에 카드가 하나만 남으면 그 카드를
 *   한 줄 전체로 펼쳐 가로형으로 놓는다 (현재 7개 → 3·3·1).
 */
export function ServiceGrid() {
  const count = services.length;
  const loneAtSm = count % 2 === 1;
  const loneAtLg = count % 3 === 1;

  return (
    <ul className="grid list-none border-t border-border sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 sm:border-t-0 lg:grid-cols-3">
      {services.map((service, index) => {
        const last = index === count - 1;
        const wideSm = last && loneAtSm;
        const wideLg = last && loneAtLg;

        return (
          <Reveal
            as="li"
            key={service.href}
            delay={stagger(index)}
            className={cn(
              wideSm && "sm:col-span-2",
              wideLg ? "lg:col-span-3" : wideSm && "lg:col-span-1",
            )}
          >
            <Link
              href={service.href}
              className={cn(
                "group flex h-full flex-col gap-5 rounded-sm border-b border-border py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:border-b-0 sm:py-0",
                wideSm && "sm:grid sm:grid-cols-2 sm:items-center sm:gap-8",
                wideLg && "lg:grid-cols-3",
                wideSm && !wideLg && "lg:flex",
              )}
            >
              <div className={cn("hidden sm:block", wideLg && "lg:col-span-1")}>
                <RectImage
                  image={service.image}
                  ratio="wide"
                  className="transition-opacity group-hover:opacity-90"
                  sizes="(min-width: 1024px) 22rem, 45vw"
                />
              </div>

              <div
                className={cn(
                  "flex flex-1 flex-col",
                  wideLg && "lg:col-span-2 lg:max-w-xl",
                )}
              >
                <h3 className="type-title flex items-start gap-1.5 text-ink">
                  {service.title}
                  <ArrowUpRight
                    className="mt-1 size-4 shrink-0 text-teal transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </h3>

                <p className="mt-1.5 font-serif text-[0.9375rem] leading-7 text-ink/80 sm:mt-3">
                  {service.claim}
                </p>

                <p className="mt-2 text-[0.8125rem] leading-6 text-muted-foreground sm:mt-4 sm:border-t sm:border-border sm:pt-3">
                  {service.scope}
                </p>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </ul>
  );
}
