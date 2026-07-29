"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubVisual from "@/components/SubVisual";
import FloatingContactButton from "@/components/FloatingContactButton";
import { Search, Mail, CheckCircle2 } from "lucide-react";

export default function FindAccountPage() {
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [resultMsg, setResultMsg] = useState("");

  useEffect(() => {
    fetch("/api/site-config")
      .then((res) => res.json())
      .then((data) => data.success && setSiteConfig(data.config))
      .catch(() => {});
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("이름과 연락처를 입력해 주세요.");
      return;
    }
    setResultMsg(`회원님의 성함(${name}) 및 연락처로 가입된 안내 메일을 발송했거나, 고객센터(${siteConfig?.phone || "1544-8826"})로 문의하시면 본인 확인 후 아이디/비밀번호 재설정을 도와드립니다.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header siteConfig={siteConfig} />

      <SubVisual
        title="아이디 / 비밀번호 찾기"
        subtitle="가입하신 이름과 연락처를 통해 회원 정보를 확인합니다."
        categoryName="회원서비스"
        currentPageName="계정찾기"
        subItems={[
          { name: "로그인", href: "/login" },
          { name: "회원가입", href: "/register" },
        ]}
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 max-w-md mx-auto px-4 w-full flex-1">
        <div className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">아이디 / 비밀번호 찾기</h2>
            <p className="text-xs text-slate-500">가입하신 이름과 휴대폰 번호를 입력하세요.</p>
          </div>

          {resultMsg ? (
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl text-center space-y-4">
              <CheckCircle2 className="w-10 h-10 text-amber-600 mx-auto" />
              <p className="text-xs text-slate-700 leading-relaxed">{resultMsg}</p>
              <Link href="/login" className="inline-block px-6 py-2.5 bg-slate-900 text-white font-bold rounded-lg text-xs">
                로그인 화면으로 이동
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">이름 (성함) *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">휴대폰 번호 *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-0000-0000"
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow-md text-sm transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" /> 정보 확인하기
              </button>
            </form>
          )}

          <div className="text-center text-xs text-slate-500 pt-2">
            <Link href="/login" className="hover:underline text-slate-700 font-semibold">
              로그인 화면으로 돌아가기
            </Link>
          </div>
        </div>
      </section>

      <Footer siteConfig={siteConfig} />
      <FloatingContactButton phone={siteConfig?.phone} />
    </div>
  );
}
