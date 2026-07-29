"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubVisual from "@/components/SubVisual";
import FloatingContactButton from "@/components/FloatingContactButton";
import { Target, Heart, Shield, Award, Sparkles, CheckCircle2 } from "lucide-react";

const subNavItems = [
  { name: "인사말", href: "/company/greeting" },
  { name: "기업이념", href: "/company/philosophy" },
];

export default function PhilosophyPage() {
  const [siteConfig, setSiteConfig] = useState<any>(null);

  useEffect(() => {
    fetch("/api/site-config")
      .then((res) => res.json())
      .then((data) => data.success && setSiteConfig(data.config))
      .catch(() => {});
  }, []);

  const coreValues = [
    {
      icon: Heart,
      title: "고객 중심 (Customer First)",
      desc: "고객의 상황과 마음을 누구보다 먼저 헤아리며 365일 24시간 언제나 진정성 있게 다가섭니다.",
    },
    {
      icon: Shield,
      title: "신뢰 (Trust)",
      desc: "투명하고 정직한 운영을 바탕으로 언제나 안심하고 믿고 맡길 수 있는 라이프 파트너가 됩니다.",
    },
    {
      icon: Target,
      title: "정직 (Honesty)",
      desc: "불필요한 부풀리기나 과장 없이 정찰된 품목과 품질 원칙을 엄격하게 준수합니다.",
    },
    {
      icon: Award,
      title: "전문 서비스 (Professionality)",
      desc: "장례, 웨딩, 크루즈, 펫장례 각 분야의 숙련된 전문가들이 고품격 서비스를 완성합니다.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header siteConfig={siteConfig} />

      <SubVisual
        title="기업이념"
        subtitle="HDONE-LIFE가 지켜나가는 올바른 가치와 비전을 소개합니다."
        categoryName="회사소개"
        currentPageName="기업이념"
        subItems={subNavItems}
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-8 w-full flex-1 space-y-16">
        {/* Title Section */}
        <div className="text-center space-y-3">
          <span className="text-amber-600 font-bold text-xs tracking-widest uppercase">PHILOSOPHY & VISION</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            삶의 가장 소중한 순간, <br className="hidden sm:inline" />
            <span className="text-amber-600">진정성과 예의</span>를 다하는 HDONE-LIFE
          </h2>
          <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full mt-4" />
        </div>

        {/* 4 Core Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                <div className="w-14 h-14 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center border border-amber-500/20">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{val.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Operating Principles / Vision */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8 shadow-xl">
          <div className="space-y-2">
            <span className="text-amber-400 font-bold text-xs tracking-widest uppercase">MANAGEMENT PRINCIPLES</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold">HDONE-LIFE 경영 비전 및 운영 철학</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <CheckCircle2 className="w-8 h-8 text-amber-400" />
              <h4 className="font-bold text-lg text-white">01. 100% 정찰 품질보장</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                계약된 용품과 서비스 제공 항목을 명확히 준수하며 품질을 속이지 않습니다.
              </p>
            </div>
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <CheckCircle2 className="w-8 h-8 text-amber-400" />
              <h4 className="font-bold text-lg text-white">02. 24시간 신속 케어</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                슬픔이나 기쁨의 순간, 언제 연락 주셔도 전담 전문가가 차질 없이 지원합니다.
              </p>
            </div>
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <CheckCircle2 className="w-8 h-8 text-amber-400" />
              <h4 className="font-bold text-lg text-white">03. 지속 가능한 혁신</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                시대의 흐름에 맞춰 장례, 웨딩, 크루즈, 펫장례의 최상의 서비스를 제안합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer siteConfig={siteConfig} />
      <FloatingContactButton phone={siteConfig?.phone} />
    </div>
  );
}
