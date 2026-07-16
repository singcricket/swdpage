"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** stagger delay bucket 1–5, maps to CSS .delay-N */
  delay?: 1 | 2 | 3 | 4 | 5;
  /** render element tag */
  as?: "div" | "section" | "li" | "article" | "span";
};

/**
 * Fades + slides its children into view once when scrolled near the viewport.
 * Uses IntersectionObserver and toggles the `.is-visible` class defined in globals.css.
 */
export function Reveal({ children, className, delay, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={cn(
        "reveal",
        visible && "is-visible",
        delay && `delay-${delay}`,
        className
      )}
    >
      {children}
    </Tag>
  );
}
