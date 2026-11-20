import Image from "next/image";

import type { Img } from "@/lib/images";
import { versioned } from "@/lib/media.server";
import { stagger } from "@/lib/motion";
import { Reveal } from "./reveal";
import { ZoomOverlay } from "./zoom";

/**
 * 장비 사진 격자.
 *
 * 제품 사진은 흰 배경 위 컷이라 아치로 자르면 잘린 티가 난다.
 * 「의료장비」 페이지와 같은 방식으로 사진을 있는 그대로 두고 여백으로 정리한다.
 * 휴대폰(한 줄)에서는 틀이 사진 크기에 맞게 줄어 가운데에 놓이고,
 * 두 줄 이상에서는 같은 4:3 틀에 사진을 가운데 맞춘다.
 */
export function EquipmentGrid({ items }: { items: Img[] }) {
  // 실제 가로·세로를 읽어 와야 틀을 사진에 맞출 수 있다 (파일 버전도 붙는다)
  const images = items.map(versioned);

  return (
    <ul className="grid list-none gap-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {images.map((image, index) => (
        <Reveal as="li" key={image.src} delay={stagger(index)}>
          <figure className="flex h-full flex-col items-center gap-3 sm:items-stretch">
            <div className="relative flex w-fit max-w-full items-center justify-center rounded-md bg-background p-4 sm:aspect-[4/3] sm:w-full sm:p-6">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width ?? 420}
                height={image.height ?? 420}
                sizes="(min-width: 1024px) 16rem, (min-width: 640px) 40vw, 80vw"
                className="h-auto max-h-48 w-auto max-w-full object-contain mix-blend-multiply sm:h-full sm:max-h-40"
              />
              <ZoomOverlay gallery={images} index={index} />
            </div>
            <figcaption className="text-center text-[0.8125rem] leading-6 text-muted-foreground sm:text-left">
              {image.alt}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </ul>
  );
}
