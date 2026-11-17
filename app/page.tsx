import Image from "next/image";
import Link from "next/link";

import { contact, hours, directions } from "@/lib/site";
import { greeting, mission } from "@/lib/content/about";
import { services } from "@/lib/content/services";
import { facility, type Img } from "@/lib/images";
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

/**
 * 홈 (2026-11 개편안 · 남색과 금색).
 * 클라이언트 시안 Home.dc.html 의 구성을 따르고, 문구는 기존 원고를 쓴다.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Stats />
      <Greeting />
      <Services />
      <Team />
      <FacilityPreview />
      <Visit />
      <CtaBand />
    </>
  );
}



/* ------------------------------------------------------------------ */

function HomeHero() {
  const [first, second] = mission.headline.split(", ");

  return (
    <section className="grid bg-navy lg:min-h-[45rem] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <div
        className={`flex flex-col justify-center gap-7 px-5 pt-14 pb-28 md:px-8 lg:pt-24 lg:pr-16 lg:pb-36 ${alignLeft}`}
      >
        <p className="flex items-center gap-3.5">
          <span aria-hidden className="h-px w-10 bg-gold" />
          <span className="text-[0.8125rem] font-semibold tracking-[0.22em] text-gold">
            고양 원당 · 동물의료센터
          </span>
        </p>

        <h1 className="font-serif text-[clamp(2.375rem,1.5rem+3vw,3.875rem)] font-bold leading-[1.22] tracking-[-0.03em] text-white">
          <span className="block sm:whitespace-nowrap">{first},</span>
          <span className="block sm:whitespace-nowrap">{second}</span>
        </h1>

        <p className="max-w-[30rem] text-[clamp(1.0625rem,1rem+0.3vw,1.1875rem)] leading-[1.75] text-on-navy">
          {mission.lines[0]}
          <br />
          {mission.lines[1]}
        </p>

        <div className="mt-2 flex flex-wrap gap-3.5">
          <a
            href={contact.telHref}
            className="inline-flex items-center gap-2.5 rounded-sm bg-paper px-7 py-4 text-[1.0625rem] font-bold text-ink transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {contact.tel}
          </a>
          <Link
            href="/about/facility"
            className="inline-flex items-center gap-2.5 rounded-sm border border-navy-line px-6 py-4 text-[1.0625rem] font-medium text-white transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            병원 둘러보기 <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <div className="relative min-h-[22rem] bg-[#3a4b5e] lg:min-h-[32rem]">
        <Image
          src={facility.waiting[4].src}
          alt="아치형 창으로 자연광이 드는 2층 대기실"
          fill
          priority
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="object-cover object-[38%_50%]"
        />

        {/* 건물 외관 카드 — 넓은 화면에서는 글 칸 쪽으로 걸쳐 놓인다 */}
        <figure className="absolute bottom-24 left-5 hidden w-[15rem] rounded-sm bg-white p-2.5 pb-3.5 shadow-[0_18px_40px_rgba(10,20,35,0.35)] sm:block lg:bottom-[7.5rem] lg:-left-[5.25rem] lg:w-[18.75rem]">
          <div className="relative h-[8.5rem] lg:h-[10.625rem]">
            <Image
              src={facility.exterior[0].src}
              alt={facility.exterior[0].alt}
              fill
              sizes="19rem"
              className="object-cover object-[50%_55%]"
            />
          </div>
          <figcaption className="mt-2.5 text-[0.84375rem] font-semibold text-ink">
            원당역 6번 출구 도보 3분
          </figcaption>
          <span className="text-xs text-muted-foreground">
            2층 동물의료센터 · {directions.parking.replace("동물병원 ", "")}
          </span>
        </figure>

        {/* 공간 설명 */}
        <div className="absolute right-5 bottom-24 hidden max-w-[18.75rem] rounded-sm sm:block bg-[rgba(23,35,56,0.86)] px-5 py-4 text-paper lg:right-8 lg:bottom-[7.5rem]">
          <div className="text-xs font-semibold tracking-[0.12em] text-gold">2F · MAIN LOUNGE</div>
          <div className="mt-1.5 font-serif text-base leading-[1.6]">아치형 창으로 햇살이 드는 대기 공간</div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const stats = [
  {
    value: "365일",
    title: "연중무휴 진료",
    body: `주말·공휴일 포함 ${hours.weekday.replaceAll(":00", "시")}`,
  },
  {
    value: "GOLD",
    title: "ISFM 고양이 친화 병원",
    body: "개와 완전히 분리된 고양이 전용 공간",
  },
  {
    value: "15년+",
    title: "외과 수술 경력",
    body: "정형외과 · 일반외과 · 마취 안전 관리",
  },
  {
    value: `${services.length}개`,
    title: "분야별 전문 클리닉",
    body: "분야마다 담당 수의사가 처음부터 끝까지",
  },
];

/** 히어로 아래에 걸쳐 올라오는 숫자 카드 */
function Stats() {
  return (
    <div className="shell relative -mt-[4.75rem]">
      <ul className="grid list-none grid-cols-2 rounded-md bg-white shadow-[0_20px_48px_rgba(23,35,56,0.12)] lg:grid-cols-4">
        {stats.map((stat, index) => (
          <li
            key={stat.title}
            className={`flex flex-col gap-1.5 px-5 py-6 sm:px-8 sm:py-8 ${index % 2 === 0 ? "border-r border-[#ede7dc]" : ""} ${index < 2 ? "border-b border-[#ede7dc] lg:border-b-0" : ""} ${index === 1 ? "lg:border-r" : ""}`}
          >
            <span className="font-serif text-[clamp(1.75rem,1.4rem+1vw,2.25rem)] font-bold leading-tight text-teal-deep">
              {stat.value}
            </span>
            <span className="text-[0.9375rem] font-semibold text-ink">{stat.title}</span>
            <span className="text-[0.84375rem] leading-6 text-muted-foreground">
              {stat.body}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Greeting() {
  return (
    <section className="shell grid items-center gap-12 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16 lg:pt-28 lg:pb-24">
      <Reveal>
        <DirectorFigure />
      </Reveal>

      <div className="flex flex-col gap-7">
        <span className="text-sm font-semibold tracking-[0.06em] text-teal-deep">
          {greeting.title}
        </span>
        <p className="font-serif text-[clamp(1.625rem,1.2rem+1.5vw,2.375rem)] font-bold leading-[1.5] tracking-[-0.02em] text-ink">
          {greeting.excerpt}
        </p>
        <span className="text-[0.9375rem] text-muted-foreground">{greeting.signature}</span>
        <MoreLink href="/about">인사말 전문 읽기</MoreLink>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Services() {
  return (
    <ServiceShowcase
      lede="분야마다 담당 수의사가 처음부터 끝까지 봅니다. 어디로 가야 할지 모르겠다면 전화로 먼저 문의해 주세요."
      aside={
        <a href={contact.telHref} className="text-[0.96875rem] font-semibold text-teal-deep hover:text-ink">
          {contact.tel} →
        </a>
      }
    />
  );
}

/* ------------------------------------------------------------------ */

function Team() {
  return (
    <TeamShowcase
      title="이 선생님에게 맡기면 되겠다, 그 느낌을 드리고 싶습니다"
      aside={<MoreLink href="/about/team">의료진 이력 자세히 보기</MoreLink>}
    />
  );
}

/* ------------------------------------------------------------------ */

function FacilityPreview() {
  const shots: { image: Img; label: string }[] = [
    { image: facility.reception[6], label: "2층 리셉션" },
    { image: facility.catWaiting[0], label: "고양이 전용 대기실" },
    { image: facility.surgeryRoom[0], label: "메인 수술실" },
    { image: facility.labRoom[0], label: "임상병리실" },
    { image: facility.waiting[2], label: "강아지 대기실" },
  ];

  return (
    <section className="bg-navy text-white">
      <div className="shell flex flex-col gap-11 py-20 lg:py-26">
        <SectionIntro
          tone="dark"
          eyebrow="병원 시설"
          title="공간도 치료의 일부입니다"
          lede="개와 고양이의 동선을 나누고, 설명을 듣는 자리와 처치를 받는 자리를 따로 두었습니다."
          aside={
            <div className="flex flex-wrap gap-5">
              <Link href="/about/facility" className="text-[0.96875rem] font-semibold text-white underline-offset-4 hover:underline">
                시설 전체 보기 →
              </Link>
              <Link href="/about/equipment" className="text-[0.96875rem] font-semibold text-gold underline-offset-4 hover:underline">
                보유 장비 보기 →
              </Link>
            </div>
          }
        />

        <ul className="grid list-none auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] lg:auto-rows-[15rem] lg:grid-cols-4 lg:gap-4">
          {shots.map((shot, index) => (
            <li
              key={shot.label}
              className={`relative overflow-hidden rounded-md ${index === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <Image
                src={shot.image.src}
                alt={shot.image.alt}
                fill
                sizes={index === 0 ? "(min-width: 1024px) 38rem, 100vw" : "(min-width: 1024px) 19rem, 50vw"}
                className="object-cover"
              />
              <span
                className={`absolute rounded-sm bg-[rgba(16,25,42,0.82)] text-white ${index === 0 ? "bottom-4 left-4 px-3.5 py-2 text-sm" : "bottom-3 left-3 px-3 py-1.5 text-[0.8125rem]"}`}
              >
                {shot.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Visit() {
  return (
    <section className="grid bg-paper lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
      <div className={`flex flex-col gap-7 px-5 py-20 md:px-8 lg:py-24 lg:pr-16 ${alignLeft}`}>
        <span className="text-sm font-semibold tracking-[0.06em] text-teal-deep">진료시간 · 오시는 길</span>
        <h2 className="font-serif text-[clamp(1.75rem,1.3rem+1.5vw,2.5rem)] font-bold leading-[1.35] tracking-[-0.03em] text-ink">
          원당역에서 걸어서 3분,
          <br />
          365일 문을 엽니다
        </h2>

        <dl className="grid grid-cols-[5rem_1fr] gap-x-5 gap-y-4.5 text-[0.96875rem] leading-relaxed sm:grid-cols-[6rem_1fr]">
          <dt className="font-semibold text-teal-deep">진료시간</dt>
          <dd>
            <b>
              {hours.summary} {hours.weekday}
            </b>
            <br />
            <span className="text-muted-foreground">
              점심 {hours.lunch} · 접수 마감 {hours.lastReception}
            </span>
          </dd>
          <dt className="font-semibold text-teal-deep">주소</dt>
          <dd>
            {contact.address}
            <br />
            <span className="text-muted-foreground">{contact.addressDetail}</span>
          </dd>
          <dt className="font-semibold text-teal-deep">대중교통</dt>
          <dd>
            {directions.transit}
            <br />
            <span className="text-muted-foreground">{directions.transitDetail}</span>
          </dd>
          <dt className="font-semibold text-teal-deep">주차</dt>
          <dd>{directions.parking}</dd>
        </dl>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/about/visit"
            className="rounded-sm bg-teal-deep px-5 py-3 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-ink"
          >
            지도와 상세 안내 보기
          </Link>
          <a
            href={directions.naverMapUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-sm border border-teal-deep px-5 py-3 text-[0.9375rem] font-semibold text-teal-deep transition-colors hover:bg-teal-deep hover:text-white"
          >
            네이버 지도<span className="sr-only">(새 창에서 열림)</span>
          </a>
          <a
            href={directions.kakaoMapUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-sm border border-teal-deep px-5 py-3 text-[0.9375rem] font-semibold text-teal-deep transition-colors hover:bg-teal-deep hover:text-white"
          >
            카카오맵<span className="sr-only">(새 창에서 열림)</span>
          </a>
        </div>
      </div>

      <div className="relative min-h-[20rem] lg:min-h-[35rem]">
        <Image
          src={facility.exterior[0].src}
          alt={facility.exterior[0].alt}
          fill
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="object-cover object-[55%_60%]"
        />
      </div>
    </section>
  );
}
