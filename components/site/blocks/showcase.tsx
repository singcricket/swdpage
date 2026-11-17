import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { services } from "@/lib/content/services";
import { vets } from "@/lib/content/team";
import { stagger } from "@/lib/motion";
import { Reveal } from "./reveal";

/**
 * 메인 · 병원 소개가 함께 쓰는 블록 (2026-11 개편안).
 * 두 페이지가 같은 모양을 쓰도록 여기 한 곳에 둔다.
 */

/** 왼쪽 글 칸을 다른 섹션의 shell 시작선과 맞추는 안쪽 여백 (화면 끝까지 찬 좌우 분할 섹션용) */
export const alignLeft = "lg:pl-[max(2rem,calc((100vw-78rem)/2+2rem))]";

/** 베이지 바탕에 꽉 찬 대표원장 사진과 남색 이름표 */
export function DirectorFigure({ className }: { className?: string }) {
  const director = vets.find((vet) => vet.role === "대표원장") ?? vets[0];
  return (
    <div className={`relative ${className ?? ""}`}>
      <div className="relative mx-auto aspect-[4/5] max-w-[32rem] overflow-hidden rounded-md bg-[#ede6da]">
        <Image
          src={director.portrait.src}
          alt={director.portrait.alt}
          fill
          sizes="(min-width: 1024px) 32rem, 90vw"
          className="object-cover object-[50%_15%] mix-blend-multiply"
        />
      </div>
      <div className="absolute bottom-6 left-6 rounded-sm bg-navy px-5 py-3.5 text-white">
        <div className="text-xs tracking-[0.1em] text-gold">{director.role}</div>
        <div className="mt-0.5 font-serif text-[1.375rem] font-bold">{director.name}</div>
      </div>
    </div>
  );
}

export function ServiceShowcase({
  eyebrow = "진료 분야",
  title = "어떤 이야기든, 시작할 곳이 있습니다",
  lede,
  aside,
}: {
  eyebrow?: string;
  title?: string;
  lede?: string;
  aside?: React.ReactNode;
}) {
  const [big, small] = [services.slice(0, 3), services.slice(3)];

  return (
    <section className="bg-mist">
      <div className="shell flex flex-col gap-10 py-20 lg:py-26">
        <SectionIntro eyebrow={eyebrow} title={title} lede={lede} aside={aside} />

        <ul className="grid list-none gap-6 md:grid-cols-3">
          {big.map((service, index) => (
            <Reveal as="li" key={service.href} delay={stagger(index)}>
              <Link
                href={service.href}
                className="group relative flex h-[22rem] flex-col justify-end overflow-hidden rounded-md lg:h-[26.25rem]"
              >
                <Image
                  src={service.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="relative flex flex-col gap-1.5 bg-[rgba(16,25,42,0.82)] px-6 py-5 text-white">
                  <span className="font-serif text-[1.5625rem] font-bold">{service.title}</span>
                  <span className="text-[0.90625rem] text-[#d5dce4]">{service.claim}</span>
                  <span className="mt-1 text-[0.78125rem] text-gold">{service.scope}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        <ul className="grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {small.map((service, index) => (
            <Reveal as="li" key={service.href} delay={stagger(index)}>
              <Link
                href={service.href}
                className="group flex h-full flex-col overflow-hidden rounded-md bg-white text-ink"
              >
                <div className="relative h-[11.25rem] overflow-hidden">
                  <Image
                    src={service.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col gap-1.5 px-5.5 pt-5 pb-6">
                  <span className="font-serif text-[1.3125rem] font-bold">{service.title}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{service.claim}</span>
                  <span className="text-[0.78125rem] text-teal-deep">{service.scope}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function TeamShowcase({
  eyebrow = "의료진",
  title,
  aside,
}: {
  eyebrow?: string;
  title: string;
  aside?: React.ReactNode;
}) {
  return (
    <section className="shell flex flex-col gap-11 py-20 lg:py-26">
      <SectionIntro eyebrow={eyebrow} title={title} aside={aside} />

      <ul className="grid list-none grid-cols-2 gap-x-4 gap-y-10 sm:gap-6 lg:grid-cols-4">
        {vets.map((vet, index) => (
          <Reveal as="li" key={vet.slug} delay={stagger(index)} className="flex flex-col gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-[#ede6da]">
              <Image
                src={vet.portrait.src}
                alt={vet.portrait.alt}
                fill
                sizes="(min-width: 1024px) 18rem, 45vw"
                className="object-cover object-[50%_10%] mix-blend-multiply"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[0.8125rem] font-semibold text-teal-deep">
                {vet.role} · {vet.focus}
              </span>
              <span className="font-serif text-2xl font-bold text-ink">{vet.name}</span>
              <p className="text-[0.90625rem] leading-[1.7] text-muted-foreground">{vet.statement}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  lede,
  aside,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  aside?: React.ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="flex max-w-[42rem] flex-col gap-3">
        <span className={`text-sm font-semibold tracking-[0.06em] ${dark ? "text-gold" : "text-teal-deep"}`}>
          {eyebrow}
        </span>
        <h2
          className={`font-serif text-[clamp(1.75rem,1.25rem+1.8vw,2.625rem)] font-bold leading-[1.35] tracking-[-0.03em] text-balance ${dark ? "text-white" : "text-ink"}`}
        >
          {title}
        </h2>
        {lede ? (
          <p className={`text-[1.03125rem] leading-[1.75] ${dark ? "text-on-navy" : "text-muted-foreground"}`}>
            {lede}
          </p>
        ) : null}
      </div>
      {aside}
    </div>
  );
}

export function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex w-fit items-center gap-2 border-b border-teal-deep pb-1 text-[0.96875rem] font-semibold text-teal-deep transition-colors hover:border-ink hover:text-ink"
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </Link>
  );
}
