import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

import { contact } from "@/lib/site";
import { services } from "@/lib/content/services";
import { facility } from "@/lib/images";
import { RectImage } from "@/components/site/blocks/arch";
import { Eyebrow } from "@/components/site/blocks/primitives";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  robots: { index: false, follow: true },
};

/**
 * 404.
 *
 * 없는 페이지를 알리는 데서 끝내지 않고 다음 행선지를 준다. 보호자가 급한
 * 마음으로 검색해서 들어왔을 수 있으므로 전화번호를 가장 크게 둔다.
 */
export default function NotFound() {
  return (
    <div className="shell grid items-center gap-14 py-20 lg:grid-cols-[1fr_minmax(0,20rem)] lg:gap-20 lg:py-28">
      <div>
        <Eyebrow>404</Eyebrow>

        <h1 className="type-display measure mt-6 text-ink">
          찾으시는 페이지가 없습니다
        </h1>

        <p className="type-lede measure mt-7">
          주소가 바뀌었거나 삭제된 페이지일 수 있습니다. 급한 상황이라면 아래
          번호로 바로 연락 주세요.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={contact.telHref}
            className="inline-flex items-center gap-2.5 rounded-sm bg-primary px-6 py-3.5 text-[0.9375rem] font-medium text-primary-foreground transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Phone className="size-4" aria-hidden />
            {contact.tel}
          </a>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-sm px-4 py-3.5 text-[0.9375rem] font-medium text-ink underline-offset-4 transition-colors hover:text-teal-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            홈으로
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>

        <div className="mt-14 border-t border-border pt-8">
          <h2 className="type-label text-muted-foreground">진료 분야로 가기</h2>
          <ul className="mt-5 flex list-none flex-wrap gap-x-2 gap-y-2">
            {services.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className="inline-block rounded-full border border-border px-3.5 py-1.5 text-[0.8125rem] text-ink transition-colors hover:border-teal hover:text-teal-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-[15rem] justify-self-center lg:w-full lg:justify-self-end">
        <RectImage
          image={facility.entrance[0]}
          ratio="window"
          sizes="(min-width: 1024px) 20rem, 15rem"
        />
      </div>
    </div>
  );
}
