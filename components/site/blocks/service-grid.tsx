import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { services } from "@/lib/content/services";
import { ArchImage } from "./arch";
import { Reveal } from "./reveal";
import { stagger } from "@/lib/motion";

/**
 * 진료 분야 입구.
 *
 * 카드마다 그 클리닉 원고의 대표 카피를 그대로 실었다. 병원이 각 분야를
 * 어떤 태도로 보는지가 곧 그 페이지를 열어볼 이유가 된다.
 */
export function ServiceGrid() {
  return (
    <ul className="grid list-none gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <Reveal as="li" key={service.href} delay={stagger(index)}>
          <Link
            href={service.href}
            className="group flex h-full flex-col gap-5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <ArchImage
              image={service.image}
              ratio="wide"
              className="transition-opacity group-hover:opacity-90"
              sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 88vw"
            />

            <div className="flex flex-1 flex-col">
              <h3 className="type-title flex items-start gap-1.5 text-ink">
                {service.title}
                <ArrowUpRight
                  className="mt-1 size-4 shrink-0 text-teal transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </h3>

              <p className="mt-3 font-serif text-[0.9375rem] leading-7 text-ink/80">
                {service.claim}
              </p>

              <p className="mt-4 border-t border-border pt-3 text-[0.8125rem] leading-6 text-muted-foreground">
                {service.scope}
              </p>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
