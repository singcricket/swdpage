import Image from "next/image";

import type { Img } from "@/lib/images";
import { stagger } from "@/lib/motion";
import { Reveal } from "./reveal";
import { ZoomOverlay } from "./zoom";

/**
 * 장비 사진 격자.
 *
 * 제품 사진은 흰 배경 위 컷이라 아치로 자르면 잘린 티가 난다.
 * 「의료장비」 페이지와 같은 방식으로 사진을 있는 그대로 두고 여백으로 정리한다.
 */
export function EquipmentGrid({ items }: { items: Img[] }) {
  return (
    <ul className="grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((image, index) => (
        <Reveal as="li" key={image.src} delay={stagger(index)}>
          <figure className="flex h-full flex-col gap-3">
            <div className="relative flex aspect-[4/3] items-center justify-center rounded-md bg-card p-6 ring-1 ring-border">
              <Image
                src={image.src}
                alt={image.alt}
                width={420}
                height={420}
                sizes="(min-width: 1024px) 16rem, (min-width: 640px) 40vw, 80vw"
                className="h-full max-h-40 w-auto object-contain"
              />
              <ZoomOverlay gallery={items} index={index} />
            </div>
            <figcaption className="text-[0.8125rem] leading-6 text-muted-foreground">
              {image.alt}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </ul>
  );
}
