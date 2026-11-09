import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Img } from "@/lib/images";
import { PageHero } from "./blocks/page-hero";
import { RectImage } from "./blocks/arch";
import { Reveal } from "./blocks/reveal";
import { stagger } from "@/lib/motion";
import { Section, SectionHeader } from "./blocks/primitives";
import { CtaBand } from "./blocks/cta-band";
import { EquipmentGrid } from "./blocks/equipment-grid";

export type HubChild = {
  href: string;
  title: string;
  /** 그 클리닉의 대표 카피 */
  claim: string;
  /** 무엇을 보는 곳인지 — 질환명 목록 */
  covers: string[];
  image: Img;
};

/**
 * 여러 하위 클리닉을 거느린 대표 페이지.
 *
 * 하위 카드는 「어떤 병을 보는가」를 질환 이름으로 그대로 보여준다.
 * 보호자는 대개 병명을 들고 오기 때문에, 요약된 분야명보다 병명이 길을 찾는
 * 데 빠르다.
 */
export function ClinicHubLayout({
  eyebrow,
  title,
  lede,
  hero,
  crumbs,
  children: subClinics,
  principles,
  principlesTitle = "이 클리닉이 일하는 방식",
  childrenTitle,
  childrenLede,
  equipment,
  equipmentTitle = "사용하는 장비",
  equipmentLede,
}: {
  eyebrow?: string;
  title: string;
  lede: string;
  hero: Img;
  crumbs?: { label: string; href: string }[];
  children: HubChild[];
  principles?: readonly { title: string; body: string }[];
  principlesTitle?: string;
  childrenTitle: string;
  childrenLede?: string;
  /** 원칙 아래에 붙는 장비 사진. 원칙을 뒷받침하는 장비만 고른다. */
  equipment?: readonly Img[];
  equipmentTitle?: string;
  equipmentLede?: string;
}) {
  return (
    <article>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        lede={lede}
        image={hero}
        crumbs={crumbs}
      />

      <Section>
        <div className="shell">
          <SectionHeader title={childrenTitle} lede={childrenLede} />

          <ul className="mt-14 flex list-none flex-col">
            {subClinics.map((child, index) => (
              <Reveal
                as="li"
                key={child.href}
                delay={stagger(index)}
                className="border-t border-border last:border-b"
              >
                <Link
                  href={child.href}
                  className="group grid items-center gap-8 py-9 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring md:grid-cols-[minmax(0,13rem)_1fr] md:gap-12"
                >
                  <RectImage
                    image={child.image}
                    ratio="wide"
                    className="transition-opacity group-hover:opacity-90"
                    sizes="(min-width: 768px) 13rem, 60vw"
                  />

                  <div>
                    <h3 className="type-title flex items-start gap-1.5 text-ink">
                      {child.title}
                      <ArrowUpRight
                        className="mt-1 size-4 shrink-0 text-teal transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </h3>

                    <p className="measure mt-3 font-serif text-[0.9375rem] leading-7 text-ink/80">
                      {child.claim}
                    </p>

                    {child.covers.length ? (
                      <ul className="mt-5 flex list-none flex-wrap gap-x-2 gap-y-2">
                        {child.covers.map((cover) => (
                          <li
                            key={cover}
                            className="rounded-full border border-border px-2.5 py-1 text-[0.75rem] leading-5 text-muted-foreground transition-colors group-hover:border-teal/50"
                          >
                            {cover}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {principles?.length ? (
        <Section tone="mist">
          <div className="shell">
            <SectionHeader title={principlesTitle} />
            <ul className="mt-12 grid list-none gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
              {principles.map((item) => (
                <li key={item.title} className="bg-card p-7">
                  <h3 className="type-title text-ink">{item.title}</h3>
                  <p className="mt-4 text-[0.875rem] leading-7 text-ink/80">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {equipment?.length ? (
        <Section>
          <div className="shell">
            <SectionHeader title={equipmentTitle} lede={equipmentLede} />
            <div className="mt-12">
              <EquipmentGrid items={[...equipment]} />
            </div>
          </div>
        </Section>
      ) : null}

      <CtaBand />
    </article>
  );
}
