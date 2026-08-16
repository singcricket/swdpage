import type { MetadataRoute } from "next";

import { site, nav } from "@/lib/site";

/**
 * 사이트맵.
 *
 * 경로 목록을 따로 적지 않고 헤더 내비게이션에서 뽑는다. 페이지를 추가하면
 * 메뉴에 넣게 되어 있으므로, 사이트맵에 빠뜨릴 일이 없다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>(["/"]);

  for (const group of nav) {
    paths.add(group.href);
    for (const child of group.children ?? []) {
      paths.add(child.href);
    }
  }

  const lastModified = new Date();

  return [...paths].map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: priorityFor(path),
  }));
}

/** 홈 > 클리닉 대표 페이지 > 개별 진료 페이지 > 소개 하위 페이지 순. */
function priorityFor(path: string) {
  if (path === "/") return 1;
  if (path === "/about") return 0.8;
  if (path.startsWith("/about/")) return 0.6;
  // 하위 페이지를 거느린 대표 페이지는 슬래시가 두 번 나오지 않는다.
  const isHub = path.split("/").length === 3;
  return isHub ? 0.9 : 0.7;
}
