"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * 좌측 고정 목차.
 *
 * 원고 8편이 전부 같은 5악장(주요 질환 → 검사 → 치료 → 고위험 → 내원 권장)으로
 * 쓰였다는 사실 자체가 정보다. 페이지가 길어도 지금 어디를 읽고 있는지,
 * 이 클리닉 글이 어떤 순서로 전개되는지를 레일이 보여준다.
 * 장식이 아니라 구조를 드러내는 장치라서 번호가 아니라 제목을 쓴다.
 */
export function IndexRail({
  items,
  className,
}: {
  items: { id: string; title: string }[];
  className?: string;
}) {
  const [activeId, setActiveId] = React.useState<string | null>(
    items[0]?.id ?? null,
  );

  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const nodes = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);

    if (nodes.length === 0) return;

    // 화면 상단 1/3 지점을 지나는 섹션을 현재 항목으로 본다.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -68% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="이 페이지의 목차" className={cn("hidden xl:block", className)}>
      <div className="sticky top-32">
        <p className="type-label text-muted-foreground">이 페이지의 구성</p>
        <ol className="mt-5 list-none space-y-px border-l border-border">
          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "-ml-px block border-l py-2 pl-4 text-[0.8125rem] leading-6 transition-colors",
                    active
                      ? "border-teal font-medium text-teal-deep"
                      : "border-transparent text-muted-foreground hover:border-border hover:text-ink",
                  )}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
