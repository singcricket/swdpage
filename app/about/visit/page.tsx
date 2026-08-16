import type { Metadata } from "next";
import Image from "next/image";
import {
  Phone,
  Clock,
  MapPin,
  Car,
  TrainFront,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

import { contact, hours, directions, site, channels } from "@/lib/site";
import { facility, brand } from "@/lib/images";
import { PageHero } from "@/components/site/blocks/page-hero";
import { ArchImage } from "@/components/site/blocks/arch";
import {
  Section,
  SectionHeader,
  Note,
} from "@/components/site/blocks/primitives";
import { FollowChannels } from "@/components/site/blocks/channel-links";
import { CtaBand } from "@/components/site/blocks/cta-band";

export const metadata: Metadata = {
  title: "진료시간 · 오시는 길",
  description: `${site.name}은 365일 연중무휴 오전 10시부터 오후 8시까지 진료합니다. 지하철 3호선 원당역 6번 출구에서 도보 3분, 건물 뒤편에 전용 주차구역이 있습니다.`,
  alternates: { canonical: "/about/visit" },
};

const kakao = channels.find((channel) => channel.key === "kakao");

export default function VisitPage() {
  return (
    <article>
      <PageHero
        title="예약하시면 대기 시간은 줄고, 진료 시간은 늘어납니다"
        lede="진료 전 예약을 권장합니다. 급한 상황이라면 전화로 먼저 알려주세요. 도착 전에 준비해 두겠습니다."
        image={facility.entrance[0]}
        crumbs={[
          { label: "병원 소개", href: "/about" },
          { label: "진료시간 · 오시는 길", href: "/about/visit" },
        ]}
      />

      {/* 진료시간 · 예약 */}
      <Section>
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader eyebrow="진료시간" title="365일 연중무휴" />

            <dl className="mt-10 border-t border-border">
              <InfoRow
                icon={<Clock className="size-4 text-teal" aria-hidden />}
                term="365일"
              >
                {hours.weekday}
              </InfoRow>
              <InfoRow
                icon={<Clock className="size-4 text-teal" aria-hidden />}
                term="점심시간"
              >
                {hours.lunch}
              </InfoRow>
              <InfoRow
                icon={<Clock className="size-4 text-teal" aria-hidden />}
                term="진료 접수 마감"
              >
                {hours.lastReception}
              </InfoRow>
            </dl>

            <Note className="mt-8">
              수술과 검진은 예약제로 운영합니다. 충분한 시간을 확보해 진행하기
              때문에 방문 전 연락 주시면 대기 없이 진료받으실 수 있습니다.
            </Note>
          </div>

          <div>
            <SectionHeader
              eyebrow="예약 · 문의"
              title="전화나 카카오톡으로 연결됩니다"
            />

            <div className="mt-10 space-y-3">
              <a
                href={contact.telHref}
                className="flex items-center justify-between gap-4 rounded-md border border-teal/50 bg-mist/50 px-6 py-6 transition-colors hover:border-teal hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span>
                  <span className="type-label block text-teal-deep">
                    전화 예약 · 문의
                  </span>
                  <span className="mt-2 block font-serif text-2xl font-semibold tracking-tight text-ink">
                    {contact.tel}
                  </span>
                </span>
                <Phone className="size-6 shrink-0 text-teal-deep" aria-hidden />
              </a>

              {kakao ? (
                <a
                  href={kakao.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between gap-4 rounded-md border border-border bg-card px-6 py-6 transition-colors hover:border-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span>
                    <span className="type-label block text-teal-deep">
                      카카오톡 채널
                    </span>
                    <span className="mt-2 block font-serif text-lg font-semibold tracking-tight text-ink">
                      채팅으로 예약 · 문의하기
                    </span>
                  </span>
                  <MessageCircle
                    className="size-6 shrink-0 text-teal-deep"
                    aria-hidden
                  />
                  <span className="sr-only">(새 창에서 열림)</span>
                </a>
              ) : null}
            </div>

            <div className="mt-10 border-t border-border pt-7">
              <p className="type-label text-muted-foreground">소식 채널</p>
              <FollowChannels className="mt-4" />
            </div>

            {/* 온라인 예약 창구는 아직 없다. 링크 없는 버튼을 두는 대신
                지금 가능한 방법이 무엇인지 말한다. */}
            <Note className="mt-8">
              온라인 예약 페이지는 아직 없습니다. 예약은 전화나 카카오톡 채널로
              접수해 드립니다.
            </Note>
          </div>
        </div>
      </Section>

      {/* 오시는 길 */}
      <Section tone="mist">
        <div className="shell">
          <SectionHeader
            eyebrow="오시는 길"
            title={contact.address}
            lede={contact.addressDetail}
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_minmax(0,22rem)] lg:gap-14">
            <div>
              <div className="overflow-hidden rounded-md border border-border bg-card">
                <iframe
                  src={directions.googleEmbedSrc}
                  title={`${site.name} 위치 지도`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[22rem] w-full border-0 sm:h-[26rem]"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <MapLink href={directions.kakaoMapUrl}>카카오맵 길찾기</MapLink>
                <MapLink href={directions.naverMapUrl}>
                  네이버지도 길찾기
                </MapLink>
              </div>

              <Note className="mt-6">
                지도는 위치 확인용입니다. 자동차 길찾기는 카카오맵이나
                네이버지도에서 더 정확합니다.
              </Note>

              {/* 병원이 직접 만든 약도. 지하철에서 걸어오는 경로와 주차장
                  위치처럼 일반 지도가 알려주지 않는 것이 그려져 있다. */}
              <figure className="mt-10">
                <figcaption className="type-label text-teal-deep">
                  약도
                </figcaption>
                <Image
                  src={brand.routeMap.src}
                  alt={brand.routeMap.alt}
                  width={1000}
                  height={702}
                  sizes="(min-width: 1024px) 44rem, 92vw"
                  className="mt-4 h-auto w-full rounded-md border border-border bg-card"
                />
              </figure>
            </div>

            <dl className="border-t border-border">
              <InfoRow
                icon={<TrainFront className="size-4 text-teal" aria-hidden />}
                term="지하철"
              >
                {directions.transit}
                <span className="mt-1.5 block text-muted-foreground">
                  {directions.transitDetail}
                </span>
              </InfoRow>
              <InfoRow
                icon={<Car className="size-4 text-teal" aria-hidden />}
                term="주차"
              >
                {directions.parking}
              </InfoRow>
              <InfoRow
                icon={<MapPin className="size-4 text-teal" aria-hidden />}
                term="건물 안내"
              >
                2층 동물의료센터
                <span className="mt-1.5 block text-muted-foreground">
                  1층 반려동물 유치원 · 호텔 · 미용, 야외 놀이터
                </span>
              </InfoRow>
            </dl>
          </div>
        </div>
      </Section>

      {/* 도착하면 보이는 것 */}
      <Section>
        <div className="shell">
          <SectionHeader
            eyebrow="도착하면"
            title="이 간판이 보이면 제대로 오신 겁니다"
          />

          <ul className="mt-12 grid list-none gap-8 sm:grid-cols-3">
            {arrivalShots.map((shot) => (
              <li key={shot.caption}>
                <ArchImage
                  image={shot.image}
                  ratio="window"
                  caption={shot.caption}
                  sizes="(min-width: 640px) 22rem, 88vw"
                />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand
        title="방문 전에 한 번만 연락 주세요"
        body="증상과 도착 예정 시간을 미리 알려주시면, 필요한 준비를 마치고 기다리겠습니다."
      />
    </article>
  );
}

const arrivalShots = [
  {
    image: facility.exterior[0],
    caption: "건물 정면 — 2층이 동물의료센터입니다",
  },
  { image: facility.entrance[0], caption: "2층 입구" },
  {
    image: facility.entranceInfo[0],
    caption: "입구 안내판 — 진료과목과 진료시간을 확인하실 수 있습니다",
  },
];

function InfoRow({
  icon,
  term,
  children,
}: {
  icon: React.ReactNode;
  term: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid items-start gap-x-4 gap-y-1 border-b border-border py-5 sm:grid-cols-[9rem_1fr]">
      <dt className="flex items-center gap-2 pt-1">
        {icon}
        <span className="type-label text-muted-foreground">{term}</span>
      </dt>
      <dd className="text-[0.9375rem] leading-7 text-ink">{children}</dd>
    </div>
  );
}

function MapLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-2.5 text-[0.875rem] font-medium text-ink transition-colors hover:border-teal hover:text-teal-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {children}
      <ExternalLink className="size-3.5 text-muted-foreground" aria-hidden />
      <span className="sr-only">(새 창에서 열림)</span>
    </a>
  );
}
