"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubVisual from "@/components/SubVisual";
import FloatingContactButton from "@/components/FloatingContactButton";
import { MapPin, Phone, Mail, Bus, Car, ExternalLink, Navigation } from "lucide-react";

const subNavItems = [
  { name: "인사말", href: "/company/greeting" },
  { name: "기업이념", href: "/company/philosophy" },
  { name: "오시는 길", href: "/company/location" },
];

export default function LocationPage() {
  const [siteConfig, setSiteConfig] = useState<any>(null);

  useEffect(() => {
    fetch("/api/site-config")
      .then((res) => res.json())
      .then((data) => data.success && setSiteConfig(data.config))
      .catch(() => {});
  }, []);

  const address = siteConfig?.address || "서울특별시 강남구 테헤란로 123 HDONE 타워 8층";
  const phone = siteConfig?.phone || "1544-8826";
  const email = siteConfig?.email || "contact@hdone-life.co.kr";

  const openMap = (type: "kakao" | "naver") => {
    const query = encodeURIComponent(address);
    if (type === "kakao") {
      window.open(`https://map.kakao.com/?q=${query}`, "_blank");
    } else {
      window.open(`https://map.naver.com/v5/search/${query}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header siteConfig={siteConfig} />

      <SubVisual
        title="오시는 길"
        subtitle="HDONE LIFE 본사 위치 및 대중교통 이용 방법을 안내해 드립니다."
        categoryName="회사소개"
        currentPageName="오시는 길"
        subItems={subNavItems}
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-8 w-full flex-1 space-y-12">
        {/* Contact Meta Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex items-center space-x-4">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center shrink-0 border border-amber-500/20">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block">본사 주소</span>
              <strong className="text-slate-900 text-sm">{address}</strong>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex items-center space-x-4">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center shrink-0 border border-amber-500/20">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block">대표전화</span>
              <strong className="text-slate-900 text-base">{phone}</strong>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex items-center space-x-4">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center shrink-0 border border-amber-500/20">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block">이메일 문의</span>
              <strong className="text-slate-900 text-sm">{email}</strong>
            </div>
          </div>
        </div>

        {/* Map Container Placeholder & Quick Buttons */}
        <div className="bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
          <div className="p-4 bg-slate-950 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
            <div className="flex items-center gap-2 font-bold text-sm">
              <Navigation className="w-4 h-4 text-amber-400" /> 지도 서비스 연동
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => openMap("kakao")}
                className="bg-yellow-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1 hover:bg-yellow-300 transition-colors"
              >
                카카오맵 보기 <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => openMap("naver")}
                className="bg-emerald-600 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1 hover:bg-emerald-500 transition-colors"
              >
                네이버지도 보기 <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Map Iframe Placeholder */}
          <div className="relative w-full h-[400px] bg-slate-800 flex items-center justify-center text-center p-6">
            <iframe
              title="HDONE LIFE 오시는 길 지도"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "contrast(1.05)" }}
              loading="lazy"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            />
          </div>
        </div>

        {/* Transportation Guidance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center space-x-3 text-slate-900 font-bold text-xl">
              <Bus className="w-6 h-6 text-amber-600" />
              <h3>대중교통 이용 안내</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-600 leading-relaxed list-disc list-inside">
              <li>지하철: 2호선 / 수인분당선 강남역 또는 역삼역 하차 후 도보 5분 거리</li>
              <li>간선버스: 146, 341, 360, 740 번 정류장 하차</li>
              <li>지선버스: 3412, 4412 번 정류장 하차</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center space-x-3 text-slate-900 font-bold text-xl">
              <Car className="w-6 h-6 text-amber-600" />
              <h3>자가용 이용 안내</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-600 leading-relaxed list-disc list-inside">
              <li>네비게이션에 <strong>&apos;{address}&apos;</strong> 검색</li>
              <li>건물 지하 주차장 이용 시 방문 고객 2시간 무료 주차 지원</li>
              <li>만차 시 인근 공영주차장 이용 권장</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer siteConfig={siteConfig} />
      <FloatingContactButton phone={siteConfig?.phone} />
    </div>
  );
}
