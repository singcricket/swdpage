import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { followChannels } from "@/lib/site";

/**
 * 소식 채널.
 *
 * 블로그와 인스타그램은 병원에 말을 거는 곳이 아니라 병원이 올린 것을 보는
 * 곳이다. 전화·카카오톡과 같은 크기로 두면 무엇을 눌러야 하는지 흐려지므로
 * 한 단계 낮은 무게로 묶어서 놓는다.
 */
export function FollowChannels({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul className={cn("flex list-none flex-wrap gap-x-6 gap-y-3", className)}>
      {followChannels.map((channel) => (
        <li key={channel.key}>
          <a
            href={channel.href}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(
              "group inline-flex items-baseline gap-1.5 border-b pb-1 text-[0.875rem] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4",
              tone === "dark"
                ? "border-paper/25 text-paper/80 hover:border-teal hover:text-paper focus-visible:outline-teal"
                : "border-border text-ink hover:border-teal hover:text-teal-deep focus-visible:outline-ring",
            )}
          >
            {channel.label}
            <span
              className={cn(
                "text-[0.75rem]",
                tone === "dark" ? "text-paper/50" : "text-muted-foreground",
              )}
            >
              {channel.blurb}
            </span>
            <ArrowUpRight
              className="size-3.5 shrink-0 self-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
            <span className="sr-only">(새 창에서 열림)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
