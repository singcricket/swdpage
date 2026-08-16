"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type RevealProps = React.ComponentProps<"div"> & {
  /** 아치 마스크가 위에서 아래로 열리는 변형. 히어로에만 쓴다. */
  variant?: "rise" | "arch";
  /** 같은 묶음 안에서 순서대로 나타나게 할 때의 지연(ms) */
  delay?: number;
  as?: "div" | "section" | "li" | "figure";
};

/**
 * 스크롤 진입 시 한 번만 나타난다.
 *
 * 서버에서는 보이지 않는 상태로 렌더되므로, JS가 꺼진 환경을 위해
 * `noscript` 가 아니라 IntersectionObserver 미지원 시 즉시 표시로 처리한다.
 * `prefers-reduced-motion` 은 CSS 쪽에서 애니메이션을 끈다.
 */
export function Reveal({
  className,
  variant = "rise",
  delay = 0,
  as: Tag = "div",
  style,
  children,
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  // 태그가 div | section | li | figure 로 갈리면 ref 프롭 타입이 교집합이 되어
  // 어떤 구체 타입도 받지 못한다. 우리는 dataset 만 건드리므로 여기서 푼다.
  const Component = Tag as React.ElementType;

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.dataset.visible = "true";
      return;
    }

    // 이미 화면 안이면 곧바로 재생한다. 앵커 링크로 페이지 중간에 도착한
    // 경우가 여기 해당하는데, 관찰만 걸어두고 숨겨버리면 도착한 자리가
    // 빈 화면으로 보인다.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      node.dataset.visible = "true";
      return;
    }

    node.dataset.visible = "false";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      className={cn("reveal", variant === "arch" && "reveal-arch", className)}
      style={{ animationDelay: delay ? `${delay}ms` : undefined, ...style }}
      {...props}
    >
      {children}
    </Component>
  );
}
