import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";

import {
  site,
  contact,
  hours,
  directions,
  footerNav,
  credentials,
  channels,
} from "@/lib/site";
import { brand } from "@/lib/images";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-mist/45">
      <div className="shell grid gap-12 py-14 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16 lg:py-20">
        {/* 병원 정보 */}
        <div>
          <div className="flex items-center gap-2.5">
            <Image
              src={brand.symbol.src}
              alt=""
              width={120}
              height={44}
              className="h-6 w-auto"
            />
            <span className="font-serif text-base font-bold tracking-tight text-ink">
              {site.name}
            </span>
          </div>

          <p className="type-label mt-4 text-muted-foreground">
            {site.nameEn}
          </p>

          <dl className="mt-7 space-y-4 text-sm leading-6">
            <div className="flex gap-3">
              <dt className="pt-0.5">
                <MapPin className="size-4 text-teal" aria-hidden />
                <span className="sr-only">주소</span>
              </dt>
              <dd className="text-ink">
                {contact.address}
                <span className="mt-0.5 block text-muted-foreground">
                  {contact.addressDetail}
                </span>
              </dd>
            </div>

            <div className="flex gap-3">
              <dt className="pt-0.5">
                <Phone className="size-4 text-teal" aria-hidden />
                <span className="sr-only">전화</span>
              </dt>
              <dd>
                <a
                  href={contact.telHref}
                  className="text-ink underline-offset-4 transition-colors hover:text-teal-deep hover:underline"
                >
                  {contact.tel}
                </a>
              </dd>
            </div>

            <div className="flex gap-3">
              <dt className="pt-0.5">
                <Clock className="size-4 text-teal" aria-hidden />
                <span className="sr-only">진료시간</span>
              </dt>
              <dd className="text-ink">
                {hours.summary} {hours.weekday}
                <span className="mt-0.5 block text-muted-foreground">
                  점심 {hours.lunch} · 접수 마감 {hours.lastReception}
                </span>
              </dd>
            </div>
          </dl>

          <ul className="mt-7 flex flex-wrap gap-x-2 gap-y-2">
            {credentials.map((item) => (
              <li
                key={item}
                className="type-label rounded-full border border-teal/40 px-2.5 py-1 text-teal-deep"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-border/70 pt-6">
            <h2 className="type-label text-teal-deep">채널</h2>
            <ul className="mt-4 space-y-2.5">
              {channels.map((channel) => (
                <li key={channel.key}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-baseline gap-2 text-[0.8125rem] leading-5 text-muted-foreground underline-offset-4 transition-colors hover:text-ink hover:underline"
                  >
                    {channel.label}
                    <ArrowUpRight
                      className="size-3 shrink-0 self-center opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                    <span className="sr-only">(새 창에서 열림)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 사이트맵 */}
        <nav
          aria-label="사이트맵"
          className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-5"
        >
          {footerNav.map((column) => (
            <div key={column.label}>
              <h2 className="type-label text-teal-deep">{column.label}</h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.8125rem] leading-5 text-muted-foreground underline-offset-4 transition-colors hover:text-ink hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* 병원의 목소리로 닫는다 */}
      <div className="border-t border-border/70">
        <div className="shell flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-[0.9375rem] leading-7 text-ink">
            신뢰와 따뜻함을 담아, 원칙을 지키며
            <br className="sm:hidden" />
            <span className="sm:ml-1">
              당신의 소중한 가족을 돌보겠습니다.
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={directions.kakaoMapUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="type-label text-muted-foreground underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              카카오맵 길찾기
            </a>
            <a
              href={directions.naverMapUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="type-label text-muted-foreground underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              네이버지도 길찾기
            </a>
            <p className="type-label text-muted-foreground">
              © {year} {site.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
