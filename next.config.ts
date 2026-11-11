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
    ],
  },
};

export default nextConfig;
