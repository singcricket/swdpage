import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    localPatterns: [
      // 일반 사이트 이미지: 쿼리 없이
      { pathname: "/images/**", search: "" },
      // 컨셉 사진 · 삽화: 파일을 바꿔 넣으면 ?v=버전 이 바뀌어 캐시를 새로 만든다
      // (lib/media.server.ts)
      { pathname: "/images/photos/**" },
      { pathname: "/images/illustrations/**" },
      // 약도 등 같은 이름으로 바꿔 넣는 브랜드 이미지 (versioned())
      { pathname: "/images/brand/**" },
      // 건강검진 · 치과 리포트 예시 (versioned())
      { pathname: "/images/report/**" },
    ],
  },
};

export default nextConfig;
