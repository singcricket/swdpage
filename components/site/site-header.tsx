"use client";

import { Accordion } from "@base-ui/react/accordion";
import { Dialog } from "@base-ui/react/dialog";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { ChevronDown, Menu, MessageCircle, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { brand } from "@/lib/images";
import { channels, contact, hours, nav, type NavGroup } from "@/lib/site";
import { cn } from "@/lib/utils";

const kakao = channels.find((channel) => channel.key === "kakao");

/** 현재 경로가 해당 섹션 안에 있는지. `/about` 은 `/about/team` 도 포함한다. */
function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** 그룹의 자식 링크 중 하나라도 현재 경로면 상위 메뉴를 활성으로 본다. */
function isGroupActive(pathname: string, group: NavGroup) {
  if (isActive(pathname, group.href)) return true;
  return (group.children ?? []).some((child) => isActive(pathname, child.href));
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-paper/92 backdrop-blur-md">
      {/* 유틸리티 스트립 — 병원에서 가장 자주 찾는 두 정보 */}
      <div className="hidden border-b border-border/60 bg-mist/60 lg:block">
        <div className="shell flex h-9 items-center justify-between">
          <p className="type-label text-teal-deep">
            {hours.summary} · {hours.weekday}
            <span className="mx-2 text-border">|</span>
            접수 마감 {hours.lastReception}
          </p>

          <a
            href={contact.telHref}
            className="type-label text-ink transition-colors hover:text-teal-deep"
          >
            {contact.tel}
          </a>
        </div>
      </div>

      <div className="shell flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <Image
            src={brand.symbol.src}
            alt=""
            width={120}
            height={44}
            priority
            className="h-6 w-auto lg:h-7"
          />
          <span className="sr-only">신원당동물의료센터 홈으로</span>
          <span
            aria-hidden
            className="font-serif text-[0.95rem] font-semibold tracking-tight text-ink lg:text-base"
          >
            신원당동물의료센터
          </span>
        </Link>

        {/* 데스크톱 내비게이션 */}
        <DesktopNav pathname={pathname} />

        <div className="flex items-center gap-2">
          <a
            href={contact.telHref}
            className="hidden items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:inline-flex"
          >
            <Phone className="size-4" aria-hidden />
            진료 예약 · 문의
          </a>

          {/* 모바일: 전화 + 메뉴 */}
          <a
            href={contact.telHref}
            aria-label={`전화 걸기 ${contact.tel}`}
            className="inline-flex size-10 items-center justify-center rounded-sm bg-primary text-primary-foreground transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
          >
            <Phone className="size-4" aria-hidden />
          </a>

          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* 데스크톱                                                            */
/* ------------------------------------------------------------------ */

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <NavigationMenu.Root className="hidden lg:block">
      <NavigationMenu.List className="relative flex items-center">
        {nav.map((group) => {
          const active = isGroupActive(pathname, group);

          if (!group.children) {
            return (
              <NavigationMenu.Item key={group.href}>
                <NavigationMenu.Link
                  render={<Link href={group.href} />}
                  className={cn(triggerClass, active && triggerActiveClass)}
                >
                  {group.label}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            );
          }

          return (
            <NavigationMenu.Item key={group.href}>
              <NavigationMenu.Trigger
                className={cn(triggerClass, active && triggerActiveClass)}
              >
                {group.label}
                <NavigationMenu.Icon className="transition-transform duration-200 data-popup-open:rotate-180">
                  <ChevronDown className="size-3.5" aria-hidden />
                </NavigationMenu.Icon>
              </NavigationMenu.Trigger>

              <NavigationMenu.Content className={contentClass}>
                <ul className="m-0 flex w-88 list-none flex-col p-1.5">
                  {group.children.map((child) => (
                    <li key={child.href}>
                      <NavigationMenu.Link
                        render={<Link href={child.href} />}
                        className={cn(
                          "block rounded-sm px-3 py-2.5 no-underline transition-colors hover:bg-mist focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
                          isActive(pathname, child.href) && "bg-mist",
                        )}
                      >
                        <span className="block font-serif text-[0.9375rem] leading-6 font-medium text-ink">
                          {child.label}
                        </span>
                        {child.blurb ? (
                          <span className="mt-0.5 block text-[0.8125rem] leading-5 text-muted-foreground">
                            {child.blurb}
                          </span>
                        ) : null}
                      </NavigationMenu.Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          );
        })}
      </NavigationMenu.List>

      <NavigationMenu.Portal>
        <NavigationMenu.Positioner
          sideOffset={14}
          collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
          collisionAvoidance={{ side: "none" }}
          // 팝업은 portal 로 body 에 붙으므로 Root 의 `hidden lg:block` 이
          // 닿지 않는다. 데스크톱에서 메뉴를 연 채 창을 좁히면 모바일 화면에
          // 드롭다운이 남는다. 여기서 직접 숨긴다.
          className="z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-(--duration) ease-(--easing) before:absolute before:inset-x-0 before:-top-3.5 before:h-3.5 before:content-[''] max-lg:hidden data-instant:transition-none"
          style={
            {
              "--duration": "0.3s",
              "--easing": "cubic-bezier(0.22, 1, 0.36, 1)",
            } as React.CSSProperties
          }
        >
          <NavigationMenu.Popup className="relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) overflow-hidden rounded-md border border-border bg-popover shadow-[0_18px_50px_-24px_rgb(22_40_60/0.35)] transition-[opacity,transform,width,height] duration-(--duration) ease-(--easing) data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0">
            <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}

const triggerClass =
  "relative flex h-10 cursor-default items-center gap-1 rounded-sm px-3 text-sm font-medium text-ink no-underline transition-colors select-none hover:bg-mist data-popup-open:bg-mist focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring";

/** 활성 메뉴는 아래에 teal 밑줄. 색만으로 구분하지 않는다. */
const triggerActiveClass =
  "text-teal-deep after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full after:bg-teal after:content-['']";

const contentClass =
  "h-full w-full transition-[opacity,translate] duration-[var(--duration)] ease-[var(--easing)] data-starting-style:opacity-0 data-ending-style:opacity-0 data-starting-style:data-[activation-direction=left]:-translate-x-1/4 data-starting-style:data-[activation-direction=right]:translate-x-1/4 data-ending-style:data-[activation-direction=left]:translate-x-1/4 data-ending-style:data-[activation-direction=right]:-translate-x-1/4";

/* ------------------------------------------------------------------ */
/* 모바일                                                              */
/* ------------------------------------------------------------------ */

function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = React.useState(false);
  // 링크를 누르면 라우트가 바뀌므로 그 자리에서 닫는다.
  // (경로 변화를 effect 로 감시하면 불필요한 연쇄 렌더가 생긴다.)
  const close = React.useCallback(() => setOpen(false), []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="메뉴 열기"
        className="inline-flex size-10 items-center justify-center rounded-sm border border-border text-ink transition-colors hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
      >
        <Menu className="size-5" aria-hidden />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/25 backdrop-blur-[2px] transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed inset-y-0 right-0 z-50 flex w-[min(22rem,88vw)] flex-col bg-paper shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:translate-x-full data-starting-style:translate-x-full">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
            <Dialog.Title className="type-label text-teal-deep">
              메뉴
            </Dialog.Title>
            <Dialog.Close
              aria-label="메뉴 닫기"
              className="inline-flex size-9 items-center justify-center rounded-sm text-ink transition-colors hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <X className="size-5" aria-hidden />
            </Dialog.Close>
          </div>

          <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
            <Accordion.Root className="flex flex-col">
              {nav.map((group) => {
                if (!group.children) {
                  return (
                    <Link
                      key={group.href}
                      href={group.href}
                      onClick={close}
                      className={cn(
                        "rounded-sm px-3 py-3 font-serif text-base font-medium transition-colors hover:bg-mist",
                        isActive(pathname, group.href)
                          ? "text-teal-deep"
                          : "text-ink",
                      )}
                    >
                      {group.label}
                    </Link>
                  );
                }

                return (
                  <Accordion.Item
                    key={group.href}
                    value={group.href}
                    className="border-b border-border/60 last:border-0"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger
                        className={cn(
                          "group flex w-full items-center justify-between rounded-sm px-3 py-3 text-left font-serif text-base font-medium transition-colors hover:bg-mist focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
                          isGroupActive(pathname, group)
                            ? "text-teal-deep"
                            : "text-ink",
                        )}
                      >
                        {group.label}
                        <ChevronDown
                          className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-panel-open:rotate-180"
                          aria-hidden
                        />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-250 ease-out data-ending-style:h-0 data-starting-style:h-0">
                      <ul className="flex list-none flex-col pb-2 pl-3">
                        {group.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={close}
                              className={cn(
                                "block rounded-sm border-l border-border py-2 pl-4 text-sm transition-colors hover:border-teal hover:text-ink",
                                isActive(pathname, child.href)
                                  ? "border-teal text-teal-deep"
                                  : "text-muted-foreground",
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Panel>
                  </Accordion.Item>
                );
              })}
            </Accordion.Root>
          </nav>

          <div className="shrink-0 space-y-3 border-t border-border bg-mist/50 px-5 py-5">
            <p className="type-label text-teal-deep">진료시간</p>
            <p className="text-sm leading-6 text-ink">
              {hours.summary}
              <br />
              {hours.weekday} · 점심 {hours.lunch}
            </p>
            <a
              href={contact.telHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-ink"
            >
              <Phone className="size-4" aria-hidden />
              {contact.tel}
            </a>
            {kakao ? (
              <a
                href={kakao.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-border bg-paper px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-teal hover:text-teal-deep"
              >
                <MessageCircle className="size-4" aria-hidden />
                카카오톡으로 문의
                <span className="sr-only">(새 창에서 열림)</span>
              </a>
            ) : null}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
