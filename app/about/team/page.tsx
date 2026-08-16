import type { Metadata } from "next";

import { vets } from "@/lib/content/team";
import { facility } from "@/lib/images";
import { PageHero } from "@/components/site/blocks/page-hero";
import { ArchImage } from "@/components/site/blocks/arch";
import { Reveal } from "@/components/site/blocks/reveal";
import {
  Section,
  SectionHeader,
  Eyebrow,
} from "@/components/site/blocks/primitives";
import { CtaBand } from "@/components/site/blocks/cta-band";

export const metadata: Metadata = {
  title: "의료진 소개",
  description:
    "신원당동물의료센터 의료진. 외과·치과의 최윤호 대표원장, 노령·중증 내과의 김방창 원장, 고양이 특화 진료의 이나영 부원장, 건강검진의 김민철 진료과장이 진료합니다.",
  alternates: { canonical: "/about/team" },
};

export default function TeamPage() {
  return (
    <article>
      <PageHero
        title="이 선생님에게 맡기면 되겠다, 그 느낌을 드리고 싶습니다"
        lede="따뜻한 손길로 맞이하고, 날카로운 눈으로 진료합니다. 분야마다 담당 수의사가 처음부터 끝까지 봅니다."
        image={facility.examRoom[0]}
        crumbs={[
          { label: "병원 소개", href: "/about" },
          { label: "의료진 소개", href: "/about/team" },
        ]}
      />

      <Section>
        <div className="shell">
          <ul className="flex list-none flex-col gap-16 md:gap-20">
            {vets.map((vet) => (
              <Reveal
                as="li"
                key={vet.slug}
                className="grid gap-8 border-t border-border pt-10 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-14"
              >
                <div className="w-[12rem] justify-self-center md:w-full md:justify-self-start">
                  <ArchImage
                    image={vet.portrait}
                    ratio="window"
                    sizes="(min-width: 768px) 15rem, 12rem"
                  />
                </div>

                <div>
                  <Eyebrow>{vet.role}</Eyebrow>

                  <h2 className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-serif text-2xl font-semibold tracking-tight text-ink">
                      {vet.name}
                    </span>
                    <span className="text-[0.9375rem] text-muted-foreground">
                      {vet.focus}
                    </span>
                  </h2>

                  <p className="type-quote measure mt-6 border-l-2 border-teal pl-6 text-ink">
                    {vet.statement}
                  </p>

                  <div className="mt-9">
                    <h3 className="type-label text-muted-foreground">
                      학회 · 이수 과정
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {vet.credentials.map((line) => (
                        <li
                          key={line}
                          className="flex items-start gap-3 text-[0.875rem] leading-7 text-ink/85"
                        >
                          <span
                            aria-hidden
                            className="mt-[0.7em] block h-2 w-1.5 shrink-0 arch bg-teal"
                          />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="mist" tight>
        <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ArchImage
            image={facility.certificates[0]}
            ratio="wide"
            sizes="(min-width: 1024px) 34rem, 90vw"
          />
          <div>
            <SectionHeader
              eyebrow="공부하는 일을 당연하게"
              title="수료증은 벽에 걸어두는 것으로 끝나지 않습니다"
              lede="최신 치료 지식을 공부하고, 적용하고, 고민하는 것을 저희는 당연한 일로 여깁니다. 수의사라면 그래야 한다고 믿기 때문입니다."
            />
          </div>
        </div>
      </Section>

      <CtaBand
        title="어느 선생님과 함께할지 모르겠다면"
        body="증상을 말씀해 주시면 담당 분야의 수의사에게 연결해 드립니다."
      />
    </article>
  );
}
