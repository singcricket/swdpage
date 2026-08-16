import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_KR, IBM_Plex_Mono, Noto_Serif_KR } from "next/font/google";

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

/** 헤드라인·인용 — 병원이 말하는 자리. 명조가 받는다. */
const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-serif-kr",
  display: "swap",
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
      className={cn(
        "h-full antialiased",
        plexKr.variable,
        notoSerifKr.variable,
        plexMono.variable,
      )}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
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
