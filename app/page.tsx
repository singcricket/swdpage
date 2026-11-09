import Link from "next/link";
import { Phone, ArrowRight, ArrowUpRight, Clock, MapPin, Car } from "lucide-react";

import { contact, hours, directions, credentials } from "@/lib/site";
import { greeting, mission } from "@/lib/content/about";
import { vets } from "@/lib/content/team";
import { facility } from "@/lib/images";
import { ArchImage, RectImage } from "@/components/site/blocks/arch";
import { Reveal } from "@/components/site/blocks/reveal";
import { stagger } from "@/lib/motion";
import {
  Eyebrow,
  SectionHeader,
  Section,
} from "@/components/site/blocks/primitives";
import { ServiceGrid } from "@/components/site/blocks/service-grid";
import { VetCard } from "@/components/site/blocks/vet-card";
import { CtaBand } from "@/components/site/blocks/cta-band";

export default function HomePage() {
  return (
    <>
      <HomeHero />
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

/**
 * 홈의 명제.
 *
 * 아치 프레임 안에 건물의 아치 창이 들어간다. 사이트의 형태와 건물의 형태가
 * 같은 말을 하도록 두고, 카피가 먼저 읽히게 여백을 크게 잡았다.
 */
function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-linear-to-b from-mist/70 to-transparent"
      />

      <div className="shell relative grid items-center gap-14 py-16 lg:grid-cols-[1fr_minmax(0,24rem)] lg:gap-20 lg:py-28">
        <div>
          <Eyebrow>
            {hours.summary} · {directions.transit}
          </Eyebrow>

          <h1 className="type-display mt-7 text-ink">
            진료실 문을 열면,
            <br />
            진심이 보입니다
          </h1>

          <p className="type-lede measure mt-8">
            {mission.lines.join(" ")}
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
              href="/about"
              className="group inline-flex items-center gap-2 rounded-sm px-4 py-3.5 text-[0.9375rem] font-medium text-ink underline-offset-4 transition-colors hover:text-teal-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              병원 소개
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-2 gap-y-2">
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

        {/* 너비는 래퍼가 정한다. 프레임이 w-full 이면서 래퍼 너비가
            내용에 따라 결정되면 서로를 참조해 0 이 된다. */}
        <Reveal
          variant="arch"
          className="w-[17rem] justify-self-center sm:w-[20rem] lg:w-full lg:justify-self-end"
        >
          <ArchImage
            image={facility.waiting[0]}
            ratio="tall"
            priority
            outlined
            sizes="(min-width: 1024px) 24rem, 20rem"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Greeting() {
  return (
    <Section tone="mist">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-20">
        <Reveal className="w-[13rem] justify-self-center lg:w-full lg:justify-self-start">
          <ArchImage
            image={facility.mottoWall[0]}
            ratio="window"
            sizes="(min-width: 1024px) 18rem, 13rem"
          />
        </Reveal>

        <div className="flex flex-col justify-center">
          <Eyebrow>{greeting.title}</Eyebrow>
          <p className="type-quote measure mt-6 text-ink">
            {greeting.excerpt}
          </p>
          <p className="mt-7 text-sm text-muted-foreground">
            {greeting.signature}
          </p>
          <Link
            href="/about"
            className="group mt-8 inline-flex w-fit items-center gap-2 border-b border-teal pb-1 text-[0.9375rem] font-medium text-teal-deep transition-colors hover:border-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            인사말 전문 읽기
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function Services() {
  return (
    <Section>
      <div className="shell">
        <SectionHeader
          eyebrow="진료 분야"
          title="어떤 이야기든, 시작할 곳이 있습니다"
          lede="분야마다 담당 수의사가 처음부터 끝까지 봅니다. 아래에서 해당하는 곳을 열어보시거나, 어디로 가야 할지 모르겠다면 전화로 먼저 문의해 주세요."
        />
        <div className="mt-14">
          <ServiceGrid />
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function Team() {
  return (
    <Section tone="mist">
      <div className="shell">
        <SectionHeader
          eyebrow="의료진"
          title="이 선생님에게 맡기면 되겠다, 그 느낌을 드리고 싶습니다"
          lede="따뜻한 손길로 맞이하고, 날카로운 눈으로 진료합니다."
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
  );
}

/* ------------------------------------------------------------------ */

function FacilityPreview() {
  const shots = [
    { image: facility.catWaiting[0], label: "고양이 전용 대기실" },
    { image: facility.surgeryRoom[0], label: "수술실" },
    { image: facility.labRoom[0], label: "임상병리실" },
    { image: facility.playground[3], label: "야외 놀이터 · 1층" },
  ];

  return (
    <Section>
      <div className="shell">
        <SectionHeader
          eyebrow="병원 시설"
          title="공간도 치료의 일부입니다"
          lede="개와 고양이의 동선을 나누고, 설명을 듣는 자리와 처치를 받는 자리를 따로 두었습니다."
        />

        <ul className="mt-14 grid list-none grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
          {shots.map((shot, index) => (
            <Reveal as="li" key={shot.label} delay={stagger(index)}>
              <RectImage
                image={shot.image}
                ratio="window"
                sizes="(min-width: 1024px) 17rem, 45vw"
              />
              <p className="type-label mt-3 text-[0.8125rem] text-muted-foreground sm:mt-4 sm:text-[0.9375rem]">
                {shot.label}
              </p>
            </Reveal>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          <Link
            href="/about/facility"
            className="group inline-flex items-center gap-2 border-b border-teal pb-1 text-[0.9375rem] font-medium text-teal-deep transition-colors hover:border-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            시설 전체 보기
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
          <Link
            href="/about/equipment"
            className="group inline-flex items-center gap-2 border-b border-border pb-1 text-[0.9375rem] font-medium text-ink transition-colors hover:border-teal hover:text-teal-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            보유 장비 보기
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function Visit() {
  return (
    <Section tone="mist">
      <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeader
            eyebrow="진료시간 · 오시는 길"
            title="원당역에서 걸어서 3분, 365일 문을 엽니다"
          />

          <dl className="mt-10 border-t border-border">
            <Row icon={<Clock className="size-4 text-teal" aria-hidden />} term="진료시간">
              {hours.summary} {hours.weekday}
              <span className="mt-1 block text-muted-foreground">
                점심 {hours.lunch} · 접수 마감 {hours.lastReception}
              </span>
            </Row>

            <Row icon={<MapPin className="size-4 text-teal" aria-hidden />} term="주소">
              {contact.address}
              <span className="mt-1 block text-muted-foreground">
                {contact.addressDetail}
              </span>
            </Row>

            <Row icon={<ArrowRight className="size-4 text-teal" aria-hidden />} term="대중교통">
              {directions.transit}
              <span className="mt-1 block text-muted-foreground">
                {directions.transitDetail}
              </span>
            </Row>

            <Row icon={<Car className="size-4 text-teal" aria-hidden />} term="주차">
              {directions.parking}
            </Row>
          </dl>

          <Link
            href="/about/visit"
            className="group mt-10 inline-flex items-center gap-2 border-b border-teal pb-1 text-[0.9375rem] font-medium text-teal-deep transition-colors hover:border-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            지도와 상세 안내 보기
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>

        <Reveal className="w-full">
          <RectImage
            image={facility.exterior[0]}
            ratio="wide"
            caption="원당역 6번 출구에서 도보 3분. 2층이 동물의료센터입니다."
            sizes="(min-width: 1024px) 34rem, 90vw"
          />
        </Reveal>
      </div>
    </Section>
  );
}

function Row({
  icon,
  term,
  children,
}: {
  icon: React.ReactNode;
  term: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid items-start gap-x-4 gap-y-1 border-b border-border py-5 sm:grid-cols-[7.5rem_1fr]">
      <dt className="flex items-center gap-2 pt-1">
        {icon}
        <span className="type-label text-muted-foreground">{term}</span>
      </dt>
      <dd className="text-[0.9375rem] leading-7 text-ink">{children}</dd>
    </div>
  );
}
