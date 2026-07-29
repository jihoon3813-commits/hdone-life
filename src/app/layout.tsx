import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HDONE LIFE | 품격 있는 토털 라이프 케어 파트너",
  description: "후불제 장례, 고품격 웨딩, 럭셔리 크루즈, 소중한 펫장례 서비스. 24시간 365일 정성과 신뢰를 다하는 HDONE LIFE 공식 홈페이지",
  keywords: ["HDONE LIFE", "에치디원 라이프", "후불제 장례", "웨딩상품", "크루즈여행", "펫장례", "상조서비스", "라이프케어"],
  icons: {
    icon: "https://res.cloudinary.com/lyjyvy54/image/upload/v1785333308/Vector_3_r7osgk.png",
    shortcut: "https://res.cloudinary.com/lyjyvy54/image/upload/v1785333308/Vector_3_r7osgk.png",
    apple: "https://res.cloudinary.com/lyjyvy54/image/upload/v1785333308/Vector_3_r7osgk.png",
  },
  openGraph: {
    title: "HDONE LIFE | 품격 있는 토털 라이프 케어 파트너",
    description: "후불제 장례, 고품격 웨딩, 럭셔리 크루즈, 소중한 펫장례 서비스. 24시간 365일 정성과 신뢰를 다하는 HDONE LIFE",
    url: "https://hdone-life.co.kr",
    siteName: "HDONE LIFE",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/lyjyvy54/image/upload/v1785333309/Group_1_7_ay3uky.png",
        width: 1200,
        height: 630,
        alt: "HDONE LIFE 대표 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HDONE LIFE | 품격 있는 토털 라이프 케어 파트너",
    description: "후불제 장례, 고품격 웨딩, 럭셔리 크루즈, 소중한 펫장례 서비스. 24시간 365일 정성과 신뢰를 다하는 HDONE LIFE",
    images: ["https://res.cloudinary.com/lyjyvy54/image/upload/v1785333309/Group_1_7_ay3uky.png"],
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
        <link rel="icon" href="https://res.cloudinary.com/lyjyvy54/image/upload/v1785333308/Vector_3_r7osgk.png" />
        <link rel="apple-touch-icon" href="https://res.cloudinary.com/lyjyvy54/image/upload/v1785333308/Vector_3_r7osgk.png" />
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
