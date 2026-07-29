"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubVisual from "@/components/SubVisual";
import FloatingContactButton from "@/components/FloatingContactButton";

export default function PrivacyPage() {
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
        title="개인정보처리방침"
        subtitle="HDONE-LIFE는 고객님의 개인정보를 소중히 다루며 법령을 준수합니다."
        categoryName="이용안내"
        currentPageName="개인정보처리방침"
        subItems={[{ name: "개인정보처리방침", href: "/privacy" }]}
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-8 w-full flex-1 space-y-8">
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
          <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3">
            HDONE-LIFE 개인정보처리방침
          </h2>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base">1. 개인정보의 수집 및 이용 목적</h3>
            <p>
              HDONE-LIFE는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.<br />
              - 회원가입 및 관리, 1:1 상담접수 및 본인확인, 서비스 예약 안내
            </p>

            <h3 className="font-bold text-slate-900 text-base">2. 수집하는 개인정보 항목</h3>
            <p>
              - 회원가입 시: 이메일, 비밀번호, 성함, 연락처<br />
              - 온라인 문의 시: 성함, 연락처, 이메일, 관심 서비스 분야
            </p>

            <h3 className="font-bold text-slate-900 text-base">3. 개인정보의 보유 및 이용 기간</h3>
            <p>
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.<br />
              - 온라인 문의 기록: 3년 보관 후 지체 없이 파기
            </p>

            <h3 className="font-bold text-slate-900 text-base">4. 개인정보 보호책임자</h3>
            <p>
              개인정보 보호책임자: {siteConfig?.privacy_officer || "이지원"}<br />
              대표전화: {siteConfig?.phone || "1544-8826"}<br />
              이메일: {siteConfig?.email || "contact@hdone-life.co.kr"}
            </p>
          </div>
        </div>
      </section>

      <Footer siteConfig={siteConfig} />
      <FloatingContactButton phone={siteConfig?.phone} />
    </div>
  );
}
