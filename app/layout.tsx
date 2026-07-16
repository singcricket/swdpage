import type { Metadata } from "next";
import { Noto_Sans_KR, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sinwondang.co.kr"),
  title: {
    default: "신원당동물병원 | 우리 아이의 평생 주치의",
    template: "%s | 신원당동물병원",
  },
  description:
    "보호자와 반려동물의 마음까지 살피는 신원당동물병원입니다. 예방접종, 건강검진, 내과·외과, 치과, 영상진단까지 정성을 다해 진료합니다.",
  keywords: [
    "신원당동물병원",
    "동물병원",
    "강아지 병원",
    "고양이 병원",
    "예방접종",
    "반려동물 건강검진",
  ],
  openGraph: {
    title: "신원당동물병원 | 우리 아이의 평생 주치의",
    description:
      "보호자와 반려동물의 마음까지 살피는 신원당동물병원. 정성을 다한 진료로 함께합니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={cn(
        "h-full",
        "antialiased",
        notoSansKr.variable,
        geistMono.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col bg-background">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
