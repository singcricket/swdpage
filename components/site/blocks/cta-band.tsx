import Link from "next/link";
import { Phone, MapPin, MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { contact, hours, channels } from "@/lib/site";
import { FollowChannels } from "./channel-links";

const kakao = channels.find((channel) => channel.key === "kakao");

/**
 * 페이지 끝에서 다음 행동을 제시한다.
 *
 * 이 병원에 말을 거는 방법은 전화와 카카오톡 두 가지다. 두 개를 나란히 두고,
 * 소식 채널은 그 아래 한 단계 낮은 무게로 묶는다. 버튼은 눌렀을 때 실제로
 * 일어나는 일을 말한다 — 예약 폼이 없으므로 「예약하기」라고 쓰지 않는다.
 */
export function CtaBand({
  title = "진료 전 예약을 권장합니다",
  body = hours.note,
  className,
}: {
  title?: string;
  body?: string;
  className?: string;
}) {
  return (
    <section className={cn("bg-ink text-paper", className)}>
      <div className="shell flex flex-col gap-10 py-14 lg:flex-row lg:items-start lg:justify-between lg:gap-16 lg:py-16">
        <div>
          <h2 className="type-headline text-paper">{title}</h2>
          <p className="mt-4 max-w-xl text-[0.9375rem] leading-8 text-paper/70">
            {body}
          </p>
          <p className="type-label mt-6 text-teal">
            {hours.summary} · {hours.weekday} · 접수 마감 {hours.lastReception}
          </p>

          <div className="mt-9 border-t border-paper/15 pt-7">
            <p className="type-label text-paper/50">소식 채널</p>
            <FollowChannels tone="dark" className="mt-4" />
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-3 lg:w-[19rem]">
          <a
            href={contact.telHref}
            className="inline-flex items-center justify-center gap-2.5 rounded-sm bg-teal px-6 py-4 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            <Phone className="size-4" aria-hidden />
            {contact.tel}
          </a>

          {kakao ? (
            <a
              href={kakao.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center gap-2.5 rounded-sm border border-paper/30 px-6 py-4 text-[0.9375rem] font-medium text-paper transition-colors hover:border-paper hover:bg-paper/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              <MessageCircle className="size-4" aria-hidden />
              카카오톡으로 문의
              <span className="sr-only">(새 창에서 열림)</span>
            </a>
          ) : null}

          <Link
            href="/about/visit"
            className="inline-flex items-center justify-center gap-2.5 rounded-sm px-6 py-3.5 text-[0.9375rem] font-medium text-paper/80 underline-offset-4 transition-colors hover:text-paper hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            <MapPin className="size-4" aria-hidden />
            오시는 길
          </Link>
        </div>
      </div>
    </section>
  );
}
