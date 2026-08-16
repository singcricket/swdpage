import type { Metadata } from "next";
import Image from "next/image";

import { equipmentGroups, equipmentCount } from "@/lib/content/equipment";
import { facility } from "@/lib/images";
import { PageHero } from "@/components/site/blocks/page-hero";
import { Reveal } from "@/components/site/blocks/reveal";
import { IndexRail } from "@/components/site/blocks/index-rail";
import { SectionHeader } from "@/components/site/blocks/primitives";
import { CtaBand } from "@/components/site/blocks/cta-band";

export const metadata: Metadata = {
  title: "의료장비",
  description: `초음파, 디지털 방사선, 내시경부터 원내 혈액 분석기와 치과 전용 장비까지 ${equipmentCount}종. 원내 검사로 결과를 기다리는 시간을 줄였습니다.`,
  alternates: { canonical: "/about/equipment" },
};

export default function EquipmentPage() {
  const toc = equipmentGroups.map((group) => ({
    id: group.id,
    title: group.title,
  }));

  return (
    <article>
      <PageHero
        title="보이지 않는 것을 보는 기술"
        lede={`진단의 정확성을 높이고, 원내 검사로 기다리는 시간을 줄입니다. 현재 ${equipmentCount}종의 장비를 운용하고 있습니다.`}
        image={facility.treatmentRoom[3]}
        crumbs={[
          { label: "병원 소개", href: "/about" },
          { label: "의료장비", href: "/about/equipment" },
        ]}
      />

      <div className="shell grid gap-12 py-16 xl:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] xl:gap-20 xl:py-24">
        <IndexRail items={toc} />

        <div className="flex min-w-0 flex-col gap-20">
          {equipmentGroups.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-28">
              <SectionHeader title={group.title} lede={group.summary} />

              <ul className="mt-12 flex list-none flex-col">
                {group.items.map((item, index) => (
                  <Reveal
                    as="li"
                    key={item.name + item.model}
                    delay={Math.min(index, 4) * 60}
                    className="grid gap-8 border-t border-border py-10 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-12"
                  >
                    {/* 제품 사진은 흰 배경 위 컷이라 아치로 자르면 잘린 티가 난다.
                        여기서는 사진을 있는 그대로 두고 여백으로 정리한다. */}
                    <div className="flex items-center justify-center rounded-md bg-card p-6 ring-1 ring-border">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        width={420}
                        height={420}
                        sizes="(min-width: 768px) 14rem, 60vw"
                        className="h-auto max-h-44 w-auto object-contain"
                      />
                    </div>

                    <div>
                      <h3 className="type-title text-ink">{item.name}</h3>
                      {item.model ? (
                        <p className="type-label mt-2 text-teal-deep">
                          {item.model}
                        </p>
                      ) : null}
                      <p className="measure mt-5 text-[0.9375rem] leading-8 text-ink/80">
                        {item.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <CtaBand
        title="어떤 검사가 필요한지 모르겠다면"
        body="증상을 말씀해 주시면 필요한 검사와 예상 소요 시간을 먼저 안내해 드립니다."
      />
    </article>
  );
}
