import type { Metadata } from "next";

import { type ClinicPage, tableOfContents } from "@/lib/content/types";
import { PageHero } from "./blocks/page-hero";
import { IndexRail } from "./blocks/index-rail";
import { SectionBlock } from "./blocks/sections";
import { CtaBand } from "./blocks/cta-band";
import { illustrationsForPage } from "@/lib/illustrations.server";

/** 페이지 데이터 하나로 metadata 를 만든다. 각 route 에서 재사용. */
export function clinicMetadata(page: ClinicPage): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.href },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.href,
    },
  };
}

/**
 * 클리닉 원고 한 편을 페이지로 편다.
 *
 * 히어로 → (좌측 목차 + 본문) → 예약 안내.
 * 12개 클리닉 페이지가 전부 이 조립기를 통과하므로 구조가 흐트러지지 않는다.
 */
export function ClinicPageLayout({
  page,
  crumbs,
}: {
  page: ClinicPage;
  crumbs?: { label: string; href: string }[];
}) {
  const toc = tableOfContents(page.sections);
  // 폴더에 들어 있는 삽화만 정해 둔 자리에 놓인다 (lib/illustrations.ts)
  const figures = illustrationsForPage(page.href);

  return (
    <article>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.headline}
        lede={page.lede}
        image={page.hero}
        crumbs={crumbs}
      />

      {/* h1 은 히어로의 카피가 맡는다. 페이지의 공식 명칭은 스크린리더에 남긴다. */}
      <h2 className="sr-only">{page.title}</h2>

      <div className="shell grid gap-12 py-16 xl:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] xl:gap-20 xl:py-24">
        <IndexRail items={toc} />

        <div className="flex min-w-0 flex-col gap-16 md:gap-20">
          {page.sections.map((section) => (
            <SectionBlock
              key={section.id}
              section={section}
              figures={figures.filter((figure) => figure.section === section.id)}
            />
          ))}
        </div>
      </div>

      <CtaBand />
    </article>
  );
}
