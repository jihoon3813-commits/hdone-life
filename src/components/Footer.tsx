"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface FooterProps {
  siteConfig?: {
    site_name?: string;
    company_kr_name?: string;
    phone?: string;
    email?: string;
    address?: string;
    business_number?: string;
    ceo_name?: string;
    privacy_officer?: string;
    hours?: string;
  };
}

export default function Footer({ siteConfig }: FooterProps) {
  const [showEmailRejectModal, setShowEmailRejectModal] = useState(false);

  const config = {
    site_name: siteConfig?.site_name || "HDONE LIFE",
    company_kr_name: siteConfig?.company_kr_name || "(주)에이치디원컴퍼니",
    phone: siteConfig?.phone || "1544-8826",
    address: siteConfig?.address || "서울시 중랑구 동일로 964, 4층 4061호(묵동, 에릭슨시스템)",
    business_number: siteConfig?.business_number || "149-86-03849",
    ceo_name: siteConfig?.ceo_name || "박혜경",
    hours: siteConfig?.hours || "평일 09:00 - 18:00",
  };

  return (
    <footer className="bg-[#09090b] text-[#9ca3af] text-xs py-10 border-t border-[#1f2937]/50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        {/* Top Header: Logo on left, Nav links on right */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-800/80">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center">
            <img
              src="https://res.cloudinary.com/lyjyvy54/image/upload/v1785311356/Vector_kau2qp.png"
              alt="HDONE LIFE 로고"
              className="h-10 w-auto object-contain brightness-0 invert"
            />
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm">
            <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
              이용약관
            </Link>
            <Link href="/privacy" className="text-white font-extrabold hover:underline">
              개인정보처리방침
            </Link>
            <button
              type="button"
              onClick={() => setShowEmailRejectModal(true)}
              className="text-gray-300 hover:text-white transition-colors text-left"
            >
              이메일무단수집거부
            </button>
          </div>
        </div>

        {/* Company Details */}
        <div className="space-y-2 text-xs text-gray-400 leading-relaxed font-normal">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{config.company_kr_name}</span>
            <span className="text-gray-600">|</span>
            <span>대표자: {config.ceo_name}</span>
            <span className="text-gray-600">|</span>
            <span>사업자등록번호: {config.business_number}</span>
            <span className="text-gray-600">|</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>주소: {config.address}</span>
            <span className="text-gray-600">|</span>
            <span>
              고객센터: <a href={`tel:${config.phone}`} className="text-gray-200 hover:underline">{config.phone}</a> ({config.hours})
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-2 text-[11px] text-gray-500 flex items-center justify-between">
          <span>Copyright © {new Date().getFullYear()} {config.company_kr_name}. All Rights Reserved.</span>
          <Link href="/admin" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300 transition-colors">
            관리자
          </Link>
        </div>
      </div>

      {/* Email Collection Rejection Modal */}
      {showEmailRejectModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-amber-400">이메일무단수집거부</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              본 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며, 이를 위반 시 정보통신망법에 의해 형사처벌됨을 유념하시기 바랍니다.
            </p>
            <div className="text-right pt-2">
              <button
                onClick={() => setShowEmailRejectModal(false)}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
