import * as React from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* 레이아웃                                                            */
/* ------------------------------------------------------------------ */

export function Section({
  className,
  tone = "paper",
  tight = false,
  ...props
}: React.ComponentProps<"section"> & {
  tone?: "paper" | "mist" | "ink";
  tight?: boolean;
}) {
  return (
    <section
      className={cn(
        tight ? "section-tight" : "section",
        tone === "mist" && "bg-mist/45",
        tone === "ink" && "bg-ink text-paper",
        className,
      )}
      {...props}
    />
  );
}

/** 섹션 위 작은 라벨. 데이터를 재는 목소리라 모노를 쓴다. */
export function Eyebrow({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return <p className={cn("type-label text-teal-deep", className)} {...props} />;
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  id,
  align = "start",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  id?: string;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        id={id}
        className={cn("type-headline text-ink", id && "scroll-mt-32")}
      >
        {title}
      </h2>
      {lede ? (
        <p className={cn("type-lede measure", align === "center" && "mx-auto")}>
          {lede}
        </p>
      ) : null}
    </header>
  );
}

/** 문단 묶음. 원고의 줄바꿈을 그대로 살린다. */
export function Prose({
  body,
  className,
}: {
  body: string[];
  className?: string;
}) {
  return (
    <div className={cn("measure space-y-5", className)}>
      {body.map((paragraph, index) => (
        <p key={index} className="type-body text-ink/85">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

/** 병원이 직접 말하는 자리. 세리프 + 아치 모서리의 여는 따옴표. */
export function PullQuote({
  children,
  attribution,
  className,
}: {
  children: React.ReactNode;
  attribution?: string;
  className?: string;
}) {
  return (
    <figure className={cn("measure", className)}>
      <div className="border-l-2 border-teal pl-6 sm:pl-8">
        <blockquote className="type-quote text-ink">{children}</blockquote>
        {attribution ? (
          <figcaption className="mt-5 text-sm text-muted-foreground">
            {attribution}
          </figcaption>
        ) : null}
      </div>
    </figure>
  );
}

/** 섹션 안에서 보조 정보를 다는 자리 */
export function Note({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "measure border-l border-border pl-4 text-[0.8125rem] leading-7 text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}
