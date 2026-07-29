"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubVisual from "@/components/SubVisual";
import FloatingContactButton from "@/components/FloatingContactButton";
import { Lock, Mail, KeyRound, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch("/api/site-config")
      .then((res) => res.json())
      .then((data) => data.success && setSiteConfig(data.config))
      .catch(() => {});
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("hdone_user", JSON.stringify(data.user));
        if (data.user.role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      } else {
        setErrorMsg(data.error || "로그인에 실패했습니다.");
      }
    } catch (e) {
      setErrorMsg("서버 통신 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header siteConfig={siteConfig} />

      <SubVisual
        title="로그인"
        subtitle="HDONE LIFE 서비스 이용을 위한 로그인 페이지입니다."
        categoryName="회원서비스"
        currentPageName="로그인"
        subItems={[
          { name: "로그인", href: "/login" },
          { name: "회원가입", href: "/register" },
        ]}
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 max-w-md mx-auto px-4 w-full flex-1">
        <div className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">HDONE LIFE 로그인</h2>
            <p className="text-xs text-slate-500">등록하신 이메일과 비밀번호를 입력하세요.</p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-lg text-center border border-red-200">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">아이디 또는 이메일</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="아이디 또는 이메일을 입력하세요"
                  className="w-full bg-white border border-slate-300 rounded-sm pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">비밀번호</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호"
                  className="w-full bg-white border border-slate-300 rounded-sm pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-sm shadow-md text-sm transition-all flex items-center justify-center gap-2"
            >
              {loading ? "로그인 중..." : "로그인"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-200">
            <Link href="/find-account" className="hover:text-amber-600">
              아이디/비밀번호 찾기
            </Link>
            <Link href="/register" className="font-bold text-amber-600 hover:underline">
              회원가입
            </Link>
          </div>
        </div>
      </section>

      <Footer siteConfig={siteConfig} />
      <FloatingContactButton phone={siteConfig?.phone} />
    </div>
  );
}
