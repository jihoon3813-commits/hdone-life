"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubVisual from "@/components/SubVisual";
import FloatingContactButton from "@/components/FloatingContactButton";
import { Sparkles, HeartHandshake, Award, ShieldCheck } from "lucide-react";

const subNavItems = [
  { name: "인사말", href: "/company/greeting" },
  { name: "기업이념", href: "/company/philosophy" },
];

export default function GreetingPage() {
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
        title="회사소개"
        subtitle="고객을 가장 먼저 생각하는 기업, 고객이 먼저 자랑하는 기업이 되겠습니다."
        categoryName="회사소개"
        currentPageName="인사말"
        subItems={subNavItems}
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-8 w-full flex-1">
        <div className="text-center space-y-3 mb-12">
          <span className="text-amber-600 font-bold text-xs tracking-widest uppercase">HDONE LIFE GREETINGS</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            함께 성장하고 서로 신뢰하는 <br className="hidden sm:inline" />
            <span className="text-amber-600">행복한 기업문화</span>를 꿈꾸는 기업!
          </h2>
          <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full mt-4" />
        </div>

        {/* CEO Image & Message Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center mb-16">
          <div className="md:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100">
              <img
                src="https://res.cloudinary.com/lyjyvy54/image/upload/v1785308930/ChatGPT_Image_2026%EB%85%84_7%EC%9B%94_29%EC%9D%BC_%EC%98%A4%ED%9B%84_03_50_40_ddnteh.png"
                alt="HDONE LIFE 대표이사"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-slate-900/90 backdrop-blur p-4 text-white text-center">
                <p className="font-bold text-base">{siteConfig?.site_name || "HDONE LIFE"}</p>
                <p className="text-xs text-amber-400 font-medium">임직원 일동</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            <h3 className="text-xl font-bold text-slate-900 border-l-4 border-amber-500 pl-3">
              안녕하십니까? HDONE LIFE 홈페이지를 방문해 주셔서 진심으로 감사드립니다.
            </h3>

            <p>
              <strong>HDONE LIFE(에치디원 라이프)</strong>는 후불제 장례상품으로 고인 안치용품, 입관용품, 의전용품, 전문 행사요원 지원 서비스, 스페셜 케어 등 다채롭고 검증된 라이프 케어 상품을 정직하게 제공하고 있습니다. 가족과 같은 따뜻한 마음으로 미리 준비된 서비스를 위해 언제나 최선의 노력을 다하고 있습니다.
            </p>

            <p>
              <strong>웨딩스페셜 상품</strong>으로는 웨딩 촬영, 드레스, 턱시도, 메이크업부터 본식 관련 모든 연출 서비스를 총괄 준비해 드리고 있으며, 고객님의 요구사항에 맞춰 최상의 아름다운 순간을 선사해 드립니다.
            </p>

            <p>
              <strong>크루즈 상품</strong>으로는 여행 지역과 일정에 맞춰 동남아 및 해외 고품격 크루즈 상품을 제공하고 있으며, HDONE LIFE 회원님만을 위한 전용 할인 혜택을 선사합니다.
            </p>

            <p>
              <strong>펫장례 서비스</strong>는 평생을 함께해 온 소중한 반려동물을 떠나보내는 특별한 서비스입니다. 픽업 운구부터 염습, 추모, 화장, 유골함/봉안까지 가족과 같은 마음으로 모시겠습니다.
            </p>

            <div className="pt-4 border-t border-slate-200 text-right">
              <span className="text-lg font-bold text-slate-900">{siteConfig?.site_name || "HDONE LIFE"} 대표 및 임직원 일동</span>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars - Premium Image Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          <div className="group bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div className="w-full h-52 bg-slate-50 overflow-hidden relative border-b border-slate-100 p-2 flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/lyjyvy54/image/upload/v1785308927/ChatGPT_Image_2026%EB%85%84_7%EC%9B%94_29%EC%9D%BC_%EC%98%A4%ED%9B%84_04_07_58_2_sbwsmq.png"
                alt="고객 중심 서비스"
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 text-center space-y-2 bg-white flex-1 flex flex-col justify-center">
              <h4 className="font-extrabold text-slate-900 text-lg group-hover:text-amber-600 transition-colors">고객 중심 서비스</h4>
              <p className="text-xs text-slate-600 leading-relaxed">24시간 365일 언제나 고객의 편의를 최우선으로 고려합니다.</p>
            </div>
          </div>

          <div className="group bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div className="w-full h-52 bg-slate-50 overflow-hidden relative border-b border-slate-100 p-2 flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/lyjyvy54/image/upload/v1785308927/ChatGPT_Image_2026%EB%85%84_7%EC%9B%94_29%EC%9D%BC_%EC%98%A4%ED%9B%84_04_07_58_3_fukp47.png"
                alt="정직한 가격"
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 text-center space-y-2 bg-white flex-1 flex flex-col justify-center">
              <h4 className="font-extrabold text-slate-900 text-lg group-hover:text-amber-600 transition-colors">정직한 가격</h4>
              <p className="text-xs text-slate-600 leading-relaxed">부당한 추가 비용 없이 명확한 정찰제 품목 구성 제공.</p>
            </div>
          </div>

          <div className="group bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div className="w-full h-52 bg-slate-50 overflow-hidden relative border-b border-slate-100 p-2 flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/lyjyvy54/image/upload/v1785308927/ChatGPT_Image_2026%EB%85%84_7%EC%9B%94_29%EC%9D%BC_%EC%98%A4%ED%9B%84_04_07_58_1_d9sery.png"
                alt="전문 의전 지도"
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 text-center space-y-2 bg-white flex-1 flex flex-col justify-center">
              <h4 className="font-extrabold text-slate-900 text-lg group-hover:text-amber-600 transition-colors">전문 의전 지도</h4>
              <p className="text-xs text-slate-600 leading-relaxed">풍부한 경험을 가진 라이프 케어 전문가 파견.</p>
            </div>
          </div>

          <div className="group bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div className="w-full h-52 bg-slate-50 overflow-hidden relative border-b border-slate-100 p-2 flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/lyjyvy54/image/upload/v1785308927/ChatGPT_Image_2026%EB%85%84_7%EC%9B%94_29%EC%9D%BC_%EC%98%A4%ED%9B%84_04_07_58_4_qhikpz.png"
                alt="토털 라이프 솔루션"
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 text-center space-y-2 bg-white flex-1 flex flex-col justify-center">
              <h4 className="font-extrabold text-slate-900 text-lg group-hover:text-amber-600 transition-colors">토털 라이프 솔루션</h4>
              <p className="text-xs text-slate-600 leading-relaxed">장례, 웨딩, 크루즈, 펫장례를 아우르는 맞춤 서비스.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer siteConfig={siteConfig} />
      <FloatingContactButton phone={siteConfig?.phone} />
    </div>
  );
}
