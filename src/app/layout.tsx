import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HDONE LIFE | 에치디원 라이프 공식 홈페이지",
  description: "장례상품, 웨딩상품, 크루즈상품, 펫장례상품. 정성과 신뢰를 다하여 모시는 라이프 서비스 전문 기업 HDONE LIFE",
  keywords: ["HDONE LIFE", "에치디원 라이프", "후불제 장례", "웨딩상품", "크루즈여행", "펫장례", "상조서비스"],
  openGraph: {
    title: "HDONE LIFE | 에치디원 라이프",
    description: "장례, 웨딩, 크루즈, 펫장례 서비스. 24시간 고객을 가장 먼저 생각하는 라이프 파트너 HDONE LIFE",
    url: "https://hdone-life.co.kr",
    siteName: "HDONE LIFE",
    locale: "ko_KR",
    type: "website",
  },
};

import ConvexClientProvider from "@/components/ConvexClientProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-amber-500 selection:text-slate-950">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
