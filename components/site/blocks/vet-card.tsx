import { cn } from "@/lib/utils";
import type { Vet } from "@/lib/content/team";
import { ArchImage } from "./arch";

/**
 * 의료진 카드.
 *
 * 원본 사진은 이름·경력이 픽셀에 박힌 완성 배너였다. 인물만 남기고 글자는
 * HTML로 다시 짰기 때문에, 검색엔진이 읽고 화면 크기에 따라 접히며
 * 스크린리더가 순서대로 읽는다.
 */
export function VetCard({
  vet,
  detailed = false,
  className,
}: {
  vet: Vet;
  /** 이력까지 모두 펼친다. 의료진 소개 페이지에서 사용. */
  detailed?: boolean;
  className?: string;
}) {
  return (
    <article className={cn("flex flex-col gap-6", className)}>
      <ArchImage
        image={vet.portrait}
        ratio="window"
        sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 85vw"
      />

      <div>
        <p className="type-label text-teal-deep">{vet.role}</p>
        <h3 className="type-title mt-2 text-ink">
          {vet.name}
          <span className="ml-2.5 align-middle text-[0.8125rem] font-normal text-muted-foreground">
            {vet.focus}
          </span>
        </h3>

        <p className="mt-4 border-l-2 border-teal pl-4 font-serif text-[0.9375rem] leading-7 text-ink/85">
          {vet.statement}
        </p>

        {detailed ? (
          <ul className="mt-6 space-y-2 border-t border-border pt-5">
            {vet.credentials.map((line) => (
              <li
                key={line}
                className="text-[0.8125rem] leading-6 text-muted-foreground"
              >
                {line}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
