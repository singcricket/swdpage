import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_KR, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import { cn } from "@/lib/utils";
import { site, contact, channels } from "@/lib/site";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

/** 본문·UI — 각지고 정밀한 인상. 임상 정보를 재는 자리를 맡는다. */
const plexKr = IBM_Plex_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-kr",
  display: "swap",
});

/**
 * 헤드라인·인용 — 병원이 말하는 자리. 마루 부리(네이버 공개 글꼴)가 받는다.
 * 명조이면서 획 끝이 둥글어 "따뜻하게 맞이한다"는 톤과 맞는다.
 * Google Fonts 에 없어 파일을 직접 제공한다. 한 굵기가 약 450KB 라
 * 미리 불러오기는 끄고, 준비되면 바꿔 끼운다(swap).
 */
const maruBuri = localFont({
  src: [
    { path: "./fonts/MaruBuri-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/MaruBuri-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/MaruBuri-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-maruburi",
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
  fallback: ["AppleMyungjo", "Noto Serif KR", "serif"],
});

/** 검사 코드·라벨 전용. */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "신원당동물의료센터",
    "원당역 동물병원",
    "고양시 동물병원",
    "덕양구 동물병원",
    "고양이 친화 병원",
    "반려동물 건강검진",
    "동물 치과",
    "반려동물 종양 클리닉",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#5CAABE",
};

/** 지역 사업체 구조화 데이터 — 지도·검색 결과에 병원 정보가 정확히 뜨도록. */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "VeterinaryCare",
  name: site.name,
  alternateName: site.nameEn,
  url: site.url,
  telephone: contact.tel,
  // 검색엔진이 병원 엔티티와 공식 채널을 연결하도록 알려준다.
  sameAs: channels.map((channel) => channel.href),
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.addressShort,
    addressLocality: "고양시 덕양구",
    addressRegion: "경기도",
    addressCountry: "KR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "20:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ko"
      data-scroll-behavior="smooth"
      // 아래 인라인 스크립트가 첫 페인트 전에 `data-js` 를 붙인다. 서버가
      // 그리지 않은 속성이라 React 19 는 하이드레이션 불일치로 경고하는데,
      // 의도된 동작이므로 이 요소에 한해 경고를 끈다. (자식에는 영향 없음)
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        plexKr.variable,
        maruBuri.variable,
        plexMono.variable,
      )}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {/* 첫 페인트 전에 실행되어 스크롤 리빌의 시작 상태를 결정한다.
            이 한 줄이 없으면 서버가 그린 내용이 잠깐 보였다가 하이드레이션
            시점에 숨겨져 깜빡인다. JS가 없으면 속성이 붙지 않아 콘텐츠가
            그대로 보인다. */}
        <script
          dangerouslySetInnerHTML={{
            // className 을 건드리면 React 가 렌더한 속성과 어긋나 하이드레이션
            // 경고가 난다. React 가 모르는 data 속성을 쓴다.
            __html: `document.documentElement.dataset.js=''`,
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
        >
          본문으로 건너뛰기
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </body>
    </html>
  );
}
