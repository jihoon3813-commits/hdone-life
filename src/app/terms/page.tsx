"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubVisual from "@/components/SubVisual";
import FloatingContactButton from "@/components/FloatingContactButton";

export default function TermsPage() {
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
        title="서비스 이용약관"
        subtitle="HDONE LIFE 홈페이지 이용에 대한 약관입니다."
        categoryName="이용안내"
        currentPageName="서비스 이용약관"
        subItems={[{ name: "서비스 이용약관", href: "/terms" }]}
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-8 w-full flex-1 space-y-8">
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
          <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3">
            HDONE LIFE 서비스 이용약관
          </h2>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base">제 1 조 (목적)</h3>
            <p>
              본 약관은 HDONE LIFE (이하 &quot;회사&quot;)가 제공하는 모든 웹사이트 서비스(장례, 웨딩, 크루즈, 펫장례 및 1:1 상담 서비스)의 이용조건 및 절차, 이용자와 회사의 권리, 의무, 책임사항을 규정함을 목적으로 합니다.
            </p>

            <h3 className="font-bold text-slate-900 text-base">제 2 조 (용어의 정의)</h3>
            <p>
              1. &quot;이용자&quot;란 웹사이트에 접속하여 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.<br />
              2. &quot;회원&quot;이라 함은 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
            </p>

            <h3 className="font-bold text-slate-900 text-base">제 3 조 (약관의 효력 및 변경)</h3>
            <p>
              1. 본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.<br />
              2. 회사는 약관의규제에관한법률 등 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.
            </p>

            <h3 className="font-bold text-slate-900 text-base">제 4 조 (서비스의 제공 및 변경)</h3>
            <p>
              회사는 이용자에게 장례상품, 웨딩상품, 크루즈상품, 펫장례상품 안내 및 온라인 상담 신청, 커뮤니티 서비스를 제공합니다.
            </p>
          </div>
        </div>
      </section>

      <Footer siteConfig={siteConfig} />
      <FloatingContactButton phone={siteConfig?.phone} />
    </div>
  );
}
