"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubVisual from "@/components/SubVisual";
import FloatingContactButton from "@/components/FloatingContactButton";
import { Heart, Car, Sparkles, Flame, Shield, ArrowRight, PhoneCall, Send } from "lucide-react";

const subNavItems = [
  { name: "장례상품", href: "/service/funeral" },
  { name: "웨딩상품", href: "/service/wedding" },
  { name: "크루즈상품", href: "/service/cruise" },
  { name: "펫장례상품", href: "/service/pet-funeral" },
];

export default function PetFuneralServicePage() {
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
        title="펫장례상품"
        subtitle="평생을 함께해 준 반려동물의 마지막 길을 정성과 사랑으로 모십니다."
        categoryName="서비스영역"
        currentPageName="펫장례상품"
        subItems={subNavItems}
        bgImage="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-8 w-full flex-1 space-y-16">
        {/* Top Text Banner */}
        <div className="bg-slate-900 text-white rounded-sm p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="space-y-4 max-w-2xl relative z-10">
            <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-sm text-xs font-bold">
              24시간 반려동물 장례 안심 케어
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              가족과 같았던 아이와의 이별, <br />
              처음부터 끝까지 따뜻한 정성으로 모십니다.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              자택/동물병원 픽업 운구부터 정성스러운 염습, 단독 개별 화장, 유골함 안치 및 메모리얼 스톤 제작까지 소중한 아이의 마지막 길을 24시간 진심으로 함께합니다.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={`tel:${siteConfig?.phone || "1544-8826"}`}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-sm flex items-center gap-2 text-sm transition-all"
              >
                <PhoneCall className="w-4 h-4" /> 24시 긴급상담 {siteConfig?.phone || "1544-8826"}
              </a>
              <Link
                href="/inquiry"
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-sm flex items-center gap-2 text-sm border border-slate-700 transition-all"
              >
                <Send className="w-4 h-4 text-amber-400" /> 1:1 온라인 문의
              </Link>
            </div>
          </div>
        </div>

        {/* Pet Funeral Service Table */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">PET FUNERAL PACKAGE DETAILS</span>
            <h3 className="text-2xl font-bold text-slate-900">펫장례 서비스 세부 품목 안내</h3>
          </div>

          <div className="overflow-x-auto border border-slate-300 rounded-sm shadow-sm">
            <table className="w-full text-center border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#000865] text-white font-bold divide-x divide-white/20">
                  <th colSpan={2} className="py-3 px-4 w-1/3">품 목</th>
                  <th className="py-3 px-4 w-2/3">내 용</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {/* Row 1: 수시,염습,입관 */}
                <tr className="bg-white hover:bg-slate-50 transition-colors divide-x divide-slate-200">
                  <td colSpan={2} className="py-3 px-4 font-bold text-slate-900">수시,염습,입관</td>
                  <td className="py-3 px-4 text-slate-800">왕복 100km(펫 전용 차량)반려동물 장례지도사</td>
                </tr>

                {/* Row 2-7: 장례서비스 (rowSpan=6) */}
                <tr className="bg-white hover:bg-slate-50 transition-colors divide-x divide-slate-200">
                  <td rowSpan={6} className="py-3 px-4 font-bold text-slate-900 align-middle bg-slate-50/60">
                    장례서비스
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900">염습</td>
                  <td className="py-3 px-4 text-slate-800">반려동물 장례지도사</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors divide-x divide-slate-200">
                  <td className="py-3 px-4 font-medium text-slate-900">수의</td>
                  <td className="py-3 px-4 text-slate-800">화장용수의</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors divide-x divide-slate-200">
                  <td className="py-3 px-4 font-medium text-slate-900">관</td>
                  <td className="py-3 px-4 text-slate-800">화장용 관</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors divide-x divide-slate-200">
                  <td className="py-3 px-4 font-medium text-slate-900">화장</td>
                  <td className="py-3 px-4 text-slate-800">개별화장</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors divide-x divide-slate-200">
                  <td className="py-3 px-4 font-medium text-slate-900">추모실</td>
                  <td className="py-3 px-4 text-slate-800">의패,영정사진/개별 추모실</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors divide-x divide-slate-200">
                  <td className="py-3 px-4 font-medium text-slate-900">유골함</td>
                  <td className="py-3 px-4 text-slate-800">고급 유골함 제공</td>
                </tr>

                {/* Row 8: 그 외 제공 내역 */}
                <tr className="bg-white hover:bg-slate-50 transition-colors divide-x divide-slate-200">
                  <td colSpan={2} className="py-3 px-4 font-bold text-slate-900">그 외 제공 내역</td>
                  <td className="py-3 px-4 text-slate-800">국내 유일 명품 특허 스톤 제공(100 유골)</td>
                </tr>

                {/* Row 9: 산골 / 나골 / 수목장 */}
                <tr className="bg-white hover:bg-slate-50 transition-colors divide-x divide-slate-200">
                  <td colSpan={2} className="py-3 px-4 font-bold text-slate-900">산골 / 나골 / 수목장</td>
                  <td className="py-3 px-4 text-slate-800">고객님의 선택에 따라 안치(선택 시 추가 요금 발생할 수 있습니다.)</td>
                </tr>

                {/* Row 10: 참고 사항 */}
                <tr className="bg-white hover:bg-slate-50 transition-colors divide-x divide-slate-200">
                  <td colSpan={2} className="py-4 px-4 font-bold text-slate-900 align-middle">참고 사항</td>
                  <td className="py-4 px-4 text-slate-800 text-left leading-relaxed space-y-1">
                    <p>■ 반려동물 무게가 10kg 초과시 화장, 스톤 제작 추가 비용이 발생할 수 있습니다.</p>
                    <p>■ 운구 서비스 왕복 100km 초과 시 추가 요금이 발생할 수 있습니다.</p>
                    <p>■ 수의 관 등을 특별 제작 시 추가 요금이 발생할 수 있습니다</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer siteConfig={siteConfig} />
      <FloatingContactButton phone={siteConfig?.phone} />
    </div>
  );
}
