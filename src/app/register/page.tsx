"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubVisual from "@/components/SubVisual";
import FloatingContactButton from "@/components/FloatingContactButton";
import { UserPlus, CheckCircle2 } from "lucide-react";
import { formatPhoneNumber } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    agreeTerms: true,
    agreePrivacy: true,
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch("/api/site-config")
      .then((res) => res.json())
      .then((data) => data.success && setSiteConfig(data.config))
      .catch(() => {});
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.email || !form.password || !form.name || !form.phone) {
      setErrorMsg("모든 필수 항목을 입력해 주세요.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!form.agreeTerms || !form.agreePrivacy) {
      setErrorMsg("이용약관 및 개인정보처리방침에 동의해야 회원가입이 가능합니다.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          name: form.name,
          phone: form.phone,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
        router.push("/login");
      } else {
        setErrorMsg(data.error || "회원가입 실패");
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
        title="회원가입"
        subtitle="HDONE LIFE의 다양한 혜택과 프리미엄 서비스를 이용해 보세요."
        categoryName="회원서비스"
        currentPageName="회원가입"
        subItems={[
          { name: "로그인", href: "/login" },
          { name: "회원가입", href: "/register" },
        ]}
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 max-w-lg mx-auto px-4 w-full flex-1">
        <div className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">HDONE LIFE 신규 회원가입</h2>
            <p className="text-xs text-slate-500">계정 정보를 입력 후 약관에 동의해 주세요.</p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-lg text-center border border-red-200">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">이메일 주소 (아이디) *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">비밀번호 *</label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="비밀번호"
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">비밀번호 확인 *</label>
                <input
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="비밀번호 확인"
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">이름 (성함) *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="홍길동"
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">휴대폰 번호 *</label>
              <input
                type="tel"
                required
                maxLength={13}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: formatPhoneNumber(e.target.value) })}
                placeholder="010-0000-0000"
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Agreement Box */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={form.agreeTerms}
                  onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="agreeTerms" className="font-bold text-slate-800">
                  서비스 이용약관 동의 (필수)
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="agreePrivacy"
                  checked={form.agreePrivacy}
                  onChange={(e) => setForm({ ...form, agreePrivacy: e.target.checked })}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="agreePrivacy" className="font-bold text-slate-800">
                  개인정보 수집 및 이용 동의 (필수)
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow-md text-sm transition-all flex items-center justify-center gap-2"
            >
              {loading ? "가입 처리 중..." : "회원가입 완료"}
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="font-bold text-amber-600 hover:underline">
              로그인하기
            </Link>
          </div>
        </div>
      </section>

      <Footer siteConfig={siteConfig} />
      <FloatingContactButton phone={siteConfig?.phone} />
    </div>
  );
}
