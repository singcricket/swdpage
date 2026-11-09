import type { Metadata } from "next";

import { spaceGroups } from "@/lib/content/spaces";
import { facility } from "@/lib/images";
import { PageHero } from "@/components/site/blocks/page-hero";
import { ArchImage } from "@/components/site/blocks/arch";
import { Reveal } from "@/components/site/blocks/reveal";
import { stagger } from "@/lib/motion";
import { IndexRail } from "@/components/site/blocks/index-rail";
import { SectionHeader } from "@/components/site/blocks/primitives";
import { CtaBand } from "@/components/site/blocks/cta-band";

export const metadata: Metadata = {
  title: "병원 시설",
  description:
    "대기실부터 수술실까지 신원당동물의료센터의 공간 안내. 개와 고양이의 동선을 분리하고, 진료·검사·수술 공간을 나눠 운영합니다.",
  alternates: { canonical: "/about/facility" },
};

export default function FacilityPage() {
  const toc = spaceGroups.map((group) => ({
    id: group.id,
    title: group.title,
  }));

  return (
    <article>
      <PageHero
        title="공간도 치료의 일부입니다"
        lede="낯선 병원이 조금 덜 무섭도록, 공간부터 신경 썼습니다. 개와 고양이의 동선을 나누고, 설명을 듣는 자리와 처치를 받는 자리를 따로 두었습니다."
        image={facility.lobby[0]}
        crumbs={[
          { label: "병원 소개", href: "/about" },
          { label: "병원 시설", href: "/about/facility" },
        ]}
      />

      <div className="shell grid gap-12 py-16 xl:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] xl:gap-20 xl:py-24">
        <IndexRail items={toc} />

        <div className="flex min-w-0 flex-col gap-20">
          {spaceGroups.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-28">
              <SectionHeader title={group.title} lede={group.summary} />

              <ul className="mt-12 flex list-none flex-col gap-14">
                {group.spaces.map((space, index) => (
                  <Reveal
                    as="li"
                    key={space.id}
                    delay={stagger(index)}
                    className="border-t border-border pt-8"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="type-title text-ink">{space.name}</h3>
                      <span className="type-label text-teal-deep">
                        {space.floor}
                      </span>
                    </div>

                    <p className="measure mt-4 text-[0.9375rem] leading-8 text-ink/80">
                      {space.body}
                    </p>

                    <ul className="mt-7 grid list-none gap-6 sm:grid-cols-2">
                      {space.images.map((image, imageIndex) => (
                        <li key={image.src}>
                          <ArchImage
                            image={image}
                            ratio="wide"
                            sizes="(min-width: 640px) 24rem, 88vw"
                            zoom={{ gallery: space.images, index: imageIndex }}
                          />
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <CtaBand
        title="직접 보고 싶으시다면"
        body="진료 예약 없이도 시설을 둘러보실 수 있습니다. 방문 전 연락 주시면 안내해 드리겠습니다."
      />
    </article>
  );
}
