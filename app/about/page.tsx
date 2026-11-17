import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { credentials } from "@/lib/site";
import { greeting, mission, motto } from "@/lib/content/about";
import { facility, brand } from "@/lib/images";
import { PageHero } from "@/components/site/blocks/page-hero";
import { Reveal } from "@/components/site/blocks/reveal";
import { CtaBand } from "@/components/site/blocks/cta-band";
import {
  alignLeft,
  DirectorFigure,
  MoreLink,
  SectionIntro,
  ServiceShowcase,
  TeamShowcase,
} from "@/components/site/blocks/showcase";

export const metadata: Metadata = {
  title: "병원 소개",
  description:
    "신원당동물의료센터의 진료 철학과 원장 인사말. 규모가 아니라 태도로 신뢰를 드리는 병원이 되겠습니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article>
      <PageHero
        eyebrow="병원 소개"
        title={mission.headline}
        lede={mission.lines.join(" ")}
        image={facility.mottoWall[0]}
        crumbs={[{ label: "병원 소개", href: "/about" }]}
      />

      {/* 인사말 — 메인과 같은 원장 사진 · 이름표 */}
      <section className="shell grid items-start gap-12 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16 lg:py-28">
        <Reveal className="lg:sticky lg:top-40">
          <DirectorFigure />
        </Reveal>

        <div className="flex flex-col gap-7">
          <span className="text-sm font-semibold tracking-[0.06em] text-teal-deep">
            {greeting.title}
          </span>
          <p className="font-serif text-[clamp(1.625rem,1.2rem+1.5vw,2.375rem)] font-bold leading-[1.5] tracking-[-0.02em] text-ink">
            {greeting.paragraphs[0]}
          </p>
          <div className="space-y-5">
            {greeting.paragraphs.slice(1).map((paragraph, index) => (
              <p key={index} className="text-[1.03125rem] leading-[1.9] text-ink/85">
                {paragraph}
              </p>
            ))}
          </div>
          <span className="text-[0.9375rem] text-muted-foreground">{greeting.signature}</span>
        </div>
      </section>

      {/* 모토 — 남색 띠 */}
      <section className="bg-navy">
        <figure className="shell flex flex-col items-center gap-6 py-20 text-center lg:py-24">
          <span aria-hidden className="h-px w-10 bg-gold" />
          <blockquote className="max-w-[44rem] font-serif text-[clamp(1.5rem,1.15rem+1.3vw,2.25rem)] font-bold leading-[1.6] tracking-[-0.02em] text-balance text-white">
            {motto.text}
          </blockquote>
          <figcaption className="text-sm tracking-[0.12em] text-gold">{motto.attribution}</figcaption>
        </figure>
      </section>

      {/* 우리가 지키는 것 — 메인 숫자 카드와 같은 흰 카드 */}
      <section className="shell flex flex-col gap-11 py-20 lg:py-26">
        <SectionIntro eyebrow="우리가 지키는 것" title="신원당이 신뢰를 만드는 방법" />

        <ul className="grid list-none rounded-md bg-white shadow-[0_20px_48px_rgba(23,35,56,0.08)] md:grid-cols-3">
          {principles.map((item, index) => (
            <li
              key={item.title}
              className={`flex flex-col gap-3 px-7 py-8 sm:px-8 ${index < principles.length - 1 ? "border-b border-[#ede7dc] md:border-r md:border-b-0" : ""}`}
            >
              <span className="font-serif text-[1.75rem] font-bold leading-none text-teal-deep">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-[1.3125rem] font-bold text-ink">{item.title}</h3>
              <p className="text-[0.90625rem] leading-[1.75] text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>

        <ul className="flex list-none flex-wrap gap-2">
          {credentials.map((item) => (
            <li
              key={item}
              className="rounded-full border border-teal-deep/40 px-3.5 py-1.5 text-[0.8125rem] font-medium text-teal-deep"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* 진료 분야 — 메인과 같은 카드 */}
      <ServiceShowcase />

      {/* 의료진 — 메인과 같은 카드 */}
      <TeamShowcase
        title="따뜻한 손길로 맞이하고, 날카로운 눈으로 진료합니다"
        aside={<MoreLink href="/about/team">의료진 이력 자세히 보기</MoreLink>}
      />

      {/* 건물 — 메인 「오시는 길」과 같은 좌우 분할 */}
      <section className="grid bg-mist lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <div className={`flex flex-col gap-7 px-5 py-20 md:px-8 lg:py-24 lg:pr-16 ${alignLeft}`}>
          <span className="text-sm font-semibold tracking-[0.06em] text-teal-deep">건물 안내</span>
          <h2 className="font-serif text-[clamp(1.75rem,1.3rem+1.5vw,2.5rem)] font-bold leading-[1.35] tracking-[-0.03em] text-ink">
            한 건물 안에서,
            <br />
            진료와 돌봄이 이어집니다
          </h2>
          <dl className="grid grid-cols-[3rem_1fr] gap-x-5 gap-y-5 text-[0.96875rem] leading-relaxed">
            <dt className="font-serif text-xl font-bold text-teal-deep">2F</dt>
            <dd>
              <b>동물의료센터</b>
              <br />
              <span className="text-muted-foreground">
                진료실 · 처치실 · 수술실 · 치과실 · 검사실 · 입원실
              </span>
            </dd>
            <dt className="font-serif text-xl font-bold text-teal-deep">1F</dt>
            <dd>
              <b>반려동물 유치원 · 호텔 · 미용</b>
              <br />
              <span className="text-muted-foreground">고양이 호텔 · 강아지 호텔 · 야외 놀이터</span>
            </dd>
          </dl>
          <div>
            <Link
              href="/about/facility"
              className="inline-block rounded-sm bg-teal-deep px-5 py-3 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-ink"
            >
              시설 전체 보기
            </Link>
          </div>
        </div>

        <div className="relative min-h-[20rem] lg:min-h-[35rem]">
          <Image
            src={brand.buildingNight.src}
            alt={brand.buildingNight.alt}
            fill
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

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
