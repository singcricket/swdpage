import * as React from "react";

import { cn } from "@/lib/utils";
import type { Section } from "@/lib/content/types";
import { ArchImage } from "./arch";
import { Reveal } from "./reveal";
import { Eyebrow, Note, PullQuote, SectionHeader } from "./primitives";

/* ------------------------------------------------------------------ */
/* 공통 조각                                                           */
/* ------------------------------------------------------------------ */

/** 작은 아치. 목록 마커로 쓰면 시그니처가 본문 크기에서도 이어진다. */
function ArchTick({ tone = "teal" }: { tone?: "teal" | "coral" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "mt-[0.6em] block h-2.5 w-2 shrink-0 arch",
        tone === "teal" ? "bg-teal" : "bg-coral",
      )}
    />
  );
}

/**
 * 이름 + 설명이 반복되는 구조.
 * 원고의 「주요 진료 질환」·「치료 방향」이 전부 이 모양이라 한 컴포넌트로 받는다.
 */
function DefinitionRows({
  items,
  marker = false,
}: {
  items: { name: string; code?: string; body: string }[];
  marker?: boolean;
}) {
  return (
    <dl className="border-t border-border">
      {items.map((item, index) => (
        <Reveal
          key={item.name}
          delay={Math.min(index, 5) * 60}
          className="grid gap-x-8 gap-y-2 border-b border-border py-6 md:grid-cols-[15rem_1fr] md:py-7"
        >
          <dt className="flex items-start gap-2.5">
            {marker ? <ArchTick /> : null}
            <span>
              <span className="type-title block text-ink">{item.name}</span>
              {item.code ? (
                <span className="type-label mt-1.5 block text-muted-foreground">
                  {item.code}
                </span>
              ) : null}
            </span>
          </dt>
          <dd className="type-body text-ink/80">{item.body}</dd>
        </Reveal>
      ))}
    </dl>
  );
}

/** 표는 가로로 넘칠 수 있으니 항상 자기 컨테이너 안에서만 스크롤한다. */
function TableFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        {children}
      </table>
    </div>
  );
}

const thClass =
  "type-label border-b border-ink/15 pb-3 pr-6 align-bottom text-teal-deep last:pr-0";
const tdClass =
  "border-b border-border py-4 pr-6 align-top text-[0.875rem] leading-7 last:pr-0";

/* ------------------------------------------------------------------ */
/* 섹션 렌더러                                                         */
/* ------------------------------------------------------------------ */

export function SectionBlock({ section }: { section: Section }) {
  if (section.kind === "quote") {
    return (
      <div className="py-4">
        <PullQuote attribution={section.attribution}>{section.text}</PullQuote>
      </div>
    );
  }

  return (
    <div className="scroll-mt-28" id={section.id}>
      <SectionHeader
        eyebrow={section.eyebrow}
        title={section.title}
        lede={"intro" in section ? section.intro : undefined}
      />
      <div className="mt-9">
        <SectionBody section={section} />
      </div>
      {"note" in section && section.note ? (
        <Note className="mt-8">{section.note}</Note>
      ) : null}
    </div>
  );
}

function SectionBody({ section }: { section: Section }) {
  switch (section.kind) {
    case "prose":
      return (
        <div className="measure space-y-5">
          {section.body.map((paragraph, index) => (
            <p key={index} className="type-body text-ink/85">
              {paragraph}
            </p>
          ))}
        </div>
      );

    case "list":
      return (
        <ul className="measure grid list-none gap-x-8 gap-y-1">
          {section.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 border-b border-border/70 py-3.5"
            >
              <ArchTick />
              <span className="text-[0.875rem] leading-7 text-ink/85">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );

    case "diseases":
      return <DefinitionRows items={section.items} />;

    case "treatments":
      return <DefinitionRows items={section.items} marker />;

    case "tests":
      return (
        <TableFrame>
          <thead>
            <tr>
              <th scope="col" className={cn(thClass, "w-[15rem]")}>
                검사
              </th>
              <th scope="col" className={thClass}>
                내용
              </th>
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row) => (
              <tr key={row.name}>
                <th
                  scope="row"
                  className={cn(tdClass, "font-medium text-ink")}
                >
                  {row.name}
                </th>
                <td className={cn(tdClass, "text-ink/80")}>{row.detail}</td>
              </tr>
            ))}
          </tbody>
        </TableFrame>
      );

    case "table":
      return (
        <TableFrame>
          <thead>
            <tr>
              {section.head.map((cell) => (
                <th key={cell} scope="col" className={thClass}>
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cn(
                      tdClass,
                      cellIndex === 0
                        ? "font-medium text-ink"
                        : "text-ink/80",
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </TableFrame>
      );

    case "risk":
      // 칸마다 테두리를 준다. gap-px + 배경색으로 격자를 그리면 항목 수가
      // 열 수의 배수가 아닐 때 빈 칸이 회색 블록으로 남는다.
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {section.groups.map((group) => (
            <div
              key={group.label}
              className="rounded-md border border-border bg-card p-6"
            >
              <h3 className="type-label text-teal-deep">{group.label}</h3>
              <p className="mt-3 text-[0.875rem] leading-7 text-ink/85">
                {group.body}
              </p>
            </div>
          ))}
        </div>
      );

    case "symptoms":
      return (
        <ul className="measure grid list-none gap-x-8 gap-y-1 sm:grid-cols-2">
          {section.items.map((item) => (
            <li
              key={item.text}
              className="flex items-start gap-3 border-b border-border/70 py-3.5"
            >
              <ArchTick tone={item.urgent ? "coral" : "teal"} />
              <span className="text-[0.875rem] leading-7 text-ink/85">
                {item.text}
                {item.hint ? (
                  <span className="block text-[0.8125rem] text-muted-foreground">
                    {item.hint}
                  </span>
                ) : null}
                {item.urgent ? (
                  <span className="type-label ml-2 inline-block align-middle text-coral">
                    응급
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      );

    case "photos":
      return (
        <ul className="grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {section.images.map((image, index) => (
            <Reveal as="li" key={image.src} delay={Math.min(index, 5) * 70}>
              <ArchImage
                image={image}
                ratio="window"
                caption={image.alt}
                sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 90vw"
              />
            </Reveal>
          ))}
        </ul>
      );

    default:
      return null;
  }
}

export { Eyebrow };
