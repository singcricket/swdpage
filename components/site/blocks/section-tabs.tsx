"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * 페이지 맨 위 사진 바로 아래, 같은 메뉴에 속한 페이지로 가는 탭.
 * (예: 클리닉 소개 | 심혈관계 | 신장 · 비뇨기 …)
 * 메뉴 데이터(lib/site.ts 의 nav)를 그대로 따르므로 페이지가 늘면 탭도 늘어난다.
 */
export function SectionTabs() {
  const pathname = usePathname();
  const group = nav.find(
    (item) =>
      item.href === pathname ||
      (item.children ?? []).some((child) => child.href === pathname),
  );
  if (!group) return null;

  const tabs = group.children?.length
    ? group.children.map((child) => ({
        href: child.href,
        // 「만성질환 클리닉 소개」처럼 긴 개요 이름은 탭에서 「클리닉 소개」로 줄인다
        label:
          child.href === group.href && child.label !== group.label
            ? child.label.replace(group.label.replace(" 클리닉", "").replace(" 센터", ""), "").trim()
            : child.label,
      }))
    : [{ href: group.href, label: group.label }];

  return (
    <nav aria-label={`${group.label} 하위 메뉴`} className="border-b border-border bg-paper">
      <div className="shell">
        <ul className="-mb-px flex list-none gap-x-7 overflow-x-auto [scrollbar-width:none] md:gap-x-9 [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const current = tab.href === pathname;
            return (
              <li key={tab.href} className="shrink-0">
                <Link
                  href={tab.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "block border-b-[3px] py-4 text-[0.9375rem] transition-colors md:py-5",
                    current
                      ? "border-teal-deep font-bold text-ink"
                      : "border-transparent text-muted-foreground hover:text-ink",
                  )}
                >
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
