import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { credentials } from "@/lib/site";
import { greeting, mission, motto } from "@/lib/content/about";
import { vets } from "@/lib/content/team";
import { facility, brand } from "@/lib/images";
import { PageHero } from "@/components/site/blocks/page-hero";
import { RectImage } from "@/components/site/blocks/arch";
import { Reveal } from "@/components/site/blocks/reveal";
import { stagger } from "@/lib/motion";
import {
  Section,
  SectionHeader,
  Eyebrow,
  PullQuote,
} from "@/components/site/blocks/primitives";
import { ServiceGrid } from "@/components/site/blocks/service-grid";
import { VetCard } from "@/components/site/blocks/vet-card";
import { CtaBand } from "@/components/site/blocks/cta-band";

export const metadata: Metadata = {
  title: "병원 소개",
  description:
    "신원당동물의료센터의 진료 철학과 원장 인사말. 규모가 아니라 태도로 신뢰를 드리는 병원이 되겠습니다.",
  alternates: { canonical: "/about" },
};

/** 인사말 옆 사진 — 의료진 소개의 대표원장 사진을 그대로 쓴다. */
const director = vets.find((vet) => vet.role === "대표원장") ?? vets[0];

export default function AboutPage() {
  return (
    <article>
      <PageHero
        eyebrow="병원 소개"
        title={mission.headline}
        lede={mission.lines.join(" ")}
        image={facility.mottoWall[0]}
      />

      {/* 인사말 */}
      <Section>
        <div className="shell grid gap-14 lg:grid-cols-[1fr_minmax(0,20rem)] lg:gap-20">
          <div>
            <Eyebrow>{greeting.title}</Eyebrow>
            <div className="measure mt-8 space-y-6">
              {greeting.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index === 0
                      ? "type-quote text-ink"
                      : "type-body text-ink/85"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="mt-10 font-serif text-[0.9375rem] text-ink">
              {greeting.signature}
            </p>
          </div>

          <Reveal className="w-60 justify-self-center lg:w-full lg:justify-self-end">
            <RectImage
              image={director.portrait}
              ratio="tall"
              caption={`${director.role} ${director.name}`}
              sizes="(min-width: 1024px) 20rem, 15rem"
            />
          </Reveal>
        </div>
      </Section>

      {/* 모토 */}
      <Section tone="mist" tight>
        <div className="shell">
          <PullQuote attribution={motto.attribution} className="mx-auto">
            {motto.text}
          </PullQuote>
        </div>
      </Section>

      {/* 우리가 지키는 것 */}
      <Section>
        <div className="shell">
          <SectionHeader
            eyebrow="우리가 지키는 것"
            title="신원당이 신뢰를 만드는 방법"
          />

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

          <ul className="mt-10 flex flex-wrap gap-x-2 gap-y-2">
            {credentials.map((item) => (
              <li
                key={item}
                className="type-label rounded-full border border-teal/40 px-3 py-1.5 text-teal-deep"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 진료 분야 */}
      <Section tone="mist">
        <div className="shell">
          <SectionHeader
            eyebrow="진료 분야"
            title="어떤 이야기든, 시작할 곳이 있습니다"
          />
          <div className="mt-14">
            <ServiceGrid />
          </div>
        </div>
      </Section>

      {/* 의료진 */}
      <Section>
        <div className="shell">
          <SectionHeader
            eyebrow="의료진"
            title="따뜻한 손길로 맞이하고, 날카로운 눈으로 진료합니다"
          />

          <ul className="mt-14 grid list-none grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-4">
            {vets.map((vet, index) => (
              <Reveal as="li" key={vet.slug} delay={stagger(index)}>
                <VetCard vet={vet} />
              </Reveal>
            ))}
          </ul>

          <Link
            href="/about/team"
            className="group mt-12 inline-flex items-center gap-2 border-b border-teal pb-1 text-[0.9375rem] font-medium text-teal-deep transition-colors hover:border-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            의료진 이력 자세히 보기
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </Section>

      {/* 건물 */}
      <Section tone="mist" tight>
        <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <RectImage
            image={brand.buildingNight}
            ratio="wide"
            sizes="(min-width: 1024px) 34rem, 90vw"
          />
          <div>
            <Eyebrow>건물 안내</Eyebrow>
            <h2 className="type-headline mt-5 text-ink">
              한 건물 안에서, 진료와 돌봄이 이어집니다
            </h2>
            <dl className="mt-8 space-y-4 text-[0.9375rem] leading-7">
              <div className="flex gap-4">
                <dt className="type-label w-8 shrink-0 pt-1.5 text-teal-deep">
                  2F
                </dt>
                <dd className="text-ink">
                  동물의료센터
                  <span className="block text-muted-foreground">
                    진료실 · 처치실 · 수술실 · 치과실 · 검사실 · 입원실
                  </span>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="type-label w-8 shrink-0 pt-1.5 text-teal-deep">
                  1F
                </dt>
                <dd className="text-ink">
                  반려동물 유치원 · 호텔 · 미용
                  <span className="block text-muted-foreground">
                    고양이 호텔 · 강아지 호텔 · 야외 놀이터
                  </span>
                </dd>
              </div>
            </dl>
            <Link
              href="/about/facility"
              className="group mt-9 inline-flex items-center gap-2 border-b border-teal pb-1 text-[0.9375rem] font-medium text-teal-deep transition-colors hover:border-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              시설 전체 보기
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </Section>

      <CtaBand />
    </article>
  );
}

/** 원고의 설립 철학을 보호자가 읽을 문장으로 옮긴 것. */
const principles = [
  {
    title: "쉽게 넘기지 않습니다",
    body: "작은 불안도 함께 들여다보고, 지금 할 수 있는 것을 먼저 찾습니다.",
  },
  {
    title: "공부를 당연하게 여깁니다",
    body: "최신 치료 지식을 공부하고, 적용하고, 고민하는 일을 특별한 노력이 아니라 수의사라면 당연히 해야 할 일로 봅니다.",
  },
  {
    title: "끝까지 같은 사람이 봅니다",
    body: "만성질환은 담당 수의사가 처음부터 끝까지 봅니다. 매번 다른 설명을 듣게 되는 일이 없도록 합니다.",
  },
];
