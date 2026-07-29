"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubVisual from "@/components/SubVisual";
import FloatingContactButton from "@/components/FloatingContactButton";
import { Sparkles, Heart, Camera, CheckCircle2, ArrowRight, PhoneCall, Send } from "lucide-react";

const subNavItems = [
  { name: "장례상품", href: "/service/funeral" },
  { name: "웨딩상품", href: "/service/wedding" },
  { name: "크루즈상품", href: "/service/cruise" },
  { name: "펫장례상품", href: "/service/pet-funeral" },
];

export default function WeddingServicePage() {
  const [siteConfig, setSiteConfig] = useState<any>(null);

  useEffect(() => {
    fetch("/api/site-config")
      .then((res) => res.json())
      .then((data) => data.success && setSiteConfig(data.config))
      .catch(() => {});
  }, []);

  const weddingTableData = [
    { category: "리허설 촬영", content: "12R20P 디지털 편집 앨범 1권" },
    { category: "본식 스냅 촬영", content: "12R 30P 스토리 앨범 1권내 용" },
    { category: "본식 원판 촬영", content: "12R 10P 양가 부모님용 2권" },
    { category: "웨딩 드레스", content: "4벌 + 1벌(신상품 드레스)" },
    { category: "턱시도", content: "2벌 + 1벌(조끼)" },
    { category: "메이크업", content: "리허설+본식" },
    { category: "헤어", content: "리허설+본식" },
    { category: "웨딩 부케", content: "부케 1+ 부토니아 1+코사지 6개" },
    { category: "웨딩 액자", content: "20R 예식장 전시용 액자 1개" },
    { category: "원본 CD", content: "원본 파일 10만원 별도(리허설+본식)" },
    { category: "헬퍼비", content: "리허설10만원,본식20만원 별도" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header siteConfig={siteConfig} />

      <SubVisual
        title="웨딩상품"
        subtitle="생애 최고의 순간을 모든 패키지 상품에 완벽하게 담아드립니다."
        categoryName="서비스영역"
        currentPageName="웨딩상품"
        subItems={subNavItems}
        bgImage="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-8 w-full flex-1 space-y-16">
        {/* Top Text Banner */}
        <div className="bg-slate-900 text-white rounded-sm p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="space-y-4 max-w-2xl relative z-10">
            <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-sm text-xs font-bold">
              HDONE LIFE 고품격 프리미엄 웨딩
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              생애 가장 아름다운 순간, <br />
              HDONE LIFE 토털 웨딩의 품격을 선사합니다.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              드레스, 턱시도, 메이크업부터 스튜디오 촬영 및 본식 스냅까지. 전담 웨딩 플래너의 1:1 맞춤 컨설팅으로 완벽하고 행복한 결혼식을 만들어 드립니다.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={`tel:${siteConfig?.phone || "1544-8826"}`}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-sm flex items-center gap-2 text-sm transition-all"
              >
                <PhoneCall className="w-4 h-4" /> 24시 전화상담 {siteConfig?.phone || "1544-8826"}
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

        {/* Wedding Service Table */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">WEDDING PACKAGE DETAILS</span>
            <h3 className="text-2xl font-bold text-slate-900">웨딩 서비스 세부 품목 안내</h3>
          </div>

          <div className="overflow-x-auto border border-slate-300 rounded-sm shadow-sm">
            <table className="w-full text-center border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#000865] text-white font-bold divide-x divide-white/20">
                  <th className="py-3 px-4 w-1/3">품 목</th>
                  <th className="py-3 px-4 w-2/3">내 용</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {weddingTableData.map((row, idx) => (
                  <tr key={idx} className="bg-white hover:bg-slate-50 transition-colors divide-x divide-slate-200">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.category}</td>
                    <td className="py-3 px-4 text-slate-800 text-left sm:text-center">{row.content}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center font-bold text-slate-900 text-xs sm:text-sm pt-2">
            위 상품 내용은 웨딩 행사 시 상품내용이 변경될 수 있음을 알려드립니다.
          </p>
        </div>

        {/* Process Steps */}
        <div className="bg-slate-900 text-white rounded-sm p-8 sm:p-12 space-y-8 shadow-xl">
          <div className="space-y-2">
            <span className="text-amber-400 font-bold text-xs tracking-widest uppercase">WEDDING PROCESS</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold">HDONE LIFE 웨딩 진행 절차</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-slate-800 p-5 rounded-sm border border-slate-700 space-y-2 text-center">
              <span className="text-amber-400 text-xs font-bold block">STEP 01</span>
              <h4 className="font-bold text-base">전문상담 & 컨설팅</h4>
              <p className="text-xs text-slate-400">1:1 맞춤 예산 및 스드메 패키지 구성</p>
            </div>
            <div className="bg-slate-800 p-5 rounded-sm border border-slate-700 space-y-2 text-center">
              <span className="text-amber-400 text-xs font-bold block">STEP 02</span>
              <h4 className="font-bold text-base">드레스 가공 & 피팅</h4>
              <p className="text-xs text-slate-400">최신 신상 드레스 피팅 및 메이크업 상담</p>
            </div>
            <div className="bg-slate-800 p-5 rounded-sm border border-slate-700 space-y-2 text-center">
              <span className="text-amber-400 text-xs font-bold block">STEP 03</span>
              <h4 className="font-bold text-base">웨딩 스튜디오 촬영</h4>
              <p className="text-xs text-slate-400">컨셉별 전담 작가 모니터링 촬영</p>
            </div>
            <div className="bg-slate-800 p-5 rounded-sm border border-slate-700 space-y-2 text-center">
              <span className="text-amber-400 text-xs font-bold block">STEP 04</span>
              <h4 className="font-bold text-base">본식 진행 지원</h4>
              <p className="text-xs text-slate-400">부케, 헬퍼 파견 및 본식 앨범 제작</p>
            </div>
          </div>
        </div>
      </section>

      <Footer siteConfig={siteConfig} />
      <FloatingContactButton phone={siteConfig?.phone} />
    </div>
  );
}
