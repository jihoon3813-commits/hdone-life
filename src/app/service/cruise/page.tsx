"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubVisual from "@/components/SubVisual";
import FloatingContactButton from "@/components/FloatingContactButton";
import { Anchor, Compass, Gift, Check, ArrowRight, PhoneCall, Send } from "lucide-react";

const subNavItems = [
  { name: "장례상품", href: "/service/funeral" },
  { name: "웨딩상품", href: "/service/wedding" },
  { name: "크루즈상품", href: "/service/cruise" },
  { name: "펫장례상품", href: "/service/pet-funeral" },
];

export default function CruiseServicePage() {
  const [siteConfig, setSiteConfig] = useState<any>(null);

  useEffect(() => {
    fetch("/api/site-config")
      .then((res) => res.json())
      .then((data) => data.success && setSiteConfig(data.config))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header siteConfig={siteConfig} />

      <SubVisual
        title="크루즈상품"
        subtitle="낭만과 꿈의 여행, 바다 위의 럭셔리 휴양을 느껴보세요."
        categoryName="서비스 안내"
        currentPageName="크루즈상품"
        subItems={subNavItems}
        bgImage="https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-8 w-full flex-1 space-y-16">
        {/* Top Text Banner with Background Image */}
        <div className="text-white rounded-sm p-8 sm:p-12 shadow-2xl relative overflow-hidden min-h-[360px] flex items-center">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://res.cloudinary.com/lyjyvy54/image/upload/v1785308929/ChatGPT_Image_2026%EB%85%84_7%EC%9B%94_29%EC%9D%BC_%EC%98%A4%ED%9B%84_03_38_13_3_anpd46.png"
              alt="크루즈 서비스 안내"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40" />
          </div>

          <div className="space-y-4 max-w-2xl relative z-10">
            <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-sm text-xs font-bold">
              HDONE LIFE 회원 전용 특별 할인 혜택
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              바다 위의 럭셔리 휴양, <br />
              꿈꾸던 프리미엄 해외 크루즈 여행
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              글로벌 명품 크루즈를 타고 다이닝, 뮤지컬 공연, 기항지 관광을 한 번에 누리는 최고의 해양 여행을 HDONE LIFE 회원만의 스페셜 혜택(총 20만원 할인)으로 모십니다.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={`tel:${siteConfig?.phone || "1544-8826"}`}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-sm flex items-center gap-2 text-sm transition-all shadow-lg"
              >
                <PhoneCall className="w-4 h-4" /> 24시 전화상담 {siteConfig?.phone || "1544-8826"}
              </a>
              <Link
                href="/inquiry"
                className="bg-slate-900/80 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-sm flex items-center gap-2 text-sm border border-slate-700/80 transition-all backdrop-blur-sm shadow-lg"
              >
                <Send className="w-4 h-4 text-amber-400" /> 1:1 온라인 문의
              </Link>
            </div>
          </div>
        </div>

        {/* Cruise Travel Details Table */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">CRUISE PACKAGE DETAILS</span>
            <h3 className="text-2xl font-bold text-slate-900">크루즈 여행 상품 세부 내역</h3>
          </div>

          <div className="overflow-x-auto border border-slate-300 rounded-sm shadow-sm">
            <table className="w-full text-center border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#000865] text-white font-bold divide-x divide-white/20">
                  <th className="py-3 px-4 w-1/4 sm:w-1/5">품 목</th>
                  <th className="py-3 px-4 w-3/4 sm:w-4/5">내 용</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-white hover:bg-slate-50 transition-colors divide-x divide-slate-200">
                  <td className="py-3 px-4 font-bold text-slate-900">지역</td>
                  <td className="py-3 px-4 text-slate-800">동남아(싱가폴+말레이시아+인도네시아)</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors divide-x divide-slate-200">
                  <td className="py-3 px-4 font-bold text-slate-900">기간</td>
                  <td className="py-3 px-4 text-slate-800">3박 5일</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors divide-x divide-slate-200">
                  <td className="py-3 px-4 font-bold text-slate-900">인원</td>
                  <td className="py-3 px-4 text-slate-800">1명</td>
                </tr>
                {/* Special Discount Callout Row */}
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td colSpan={2} className="py-4 px-4 font-bold text-slate-900 text-sm sm:text-base border-t border-b border-slate-300">
                    동남아 크루즈 상품은 회원을 위한 특별 할인된 상품입니다. 크루즈 출발 일정의 <span className="text-red-600 font-extrabold">총 금액에서 20만원을 할인</span>해 드립니다
                  </td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors divide-x divide-slate-200">
                  <td className="py-4 px-4 font-bold text-slate-900 align-middle">불포함<br className="hidden sm:inline" />사항</td>
                  <td className="py-4 px-4 text-slate-800 text-left leading-relaxed">
                    - 선별 개별 지출 비용(주류,마사지 비용등)<br />
                    - 선상 팁,유류 할증료
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center space-y-1 text-slate-700 text-xs sm:text-sm font-medium pt-2">
            <p>크루즈 여행은 최소6개월 이전 예약 및 상담을 받으셔야 합니다.</p>
            <p>상품은 선택 범위를 확대해 드리고자 기획한 상품으로 가항지는 선사 및 계절별 프로그램에 따라 변경될 수 있습니다.</p>
          </div>
        </div>
      </section>

      <Footer siteConfig={siteConfig} />
      <FloatingContactButton phone={siteConfig?.phone} />
    </div>
  );
}
