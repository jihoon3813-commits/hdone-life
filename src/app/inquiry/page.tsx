"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubVisual from "@/components/SubVisual";
import FloatingContactButton from "@/components/FloatingContactButton";
import { MessageSquare, PhoneCall, CheckCircle2, Send, ShieldCheck } from "lucide-react";
import { formatPhoneNumber } from "@/lib/utils";

const subNavItems = [{ name: "온라인문의", href: "/inquiry" }];

export default function OnlineInquiryPage() {
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    type: "장례상품",
    interest_product: "프리미엄 396만원",
    title: "",
    content: "",
    attachment_url: "",
    is_agreed: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/site-config")
      .then((res) => res.json())
      .then((data) => data.success && setSiteConfig(data.config))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("성함을 입력해 주세요.");
      return;
    }

    const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
    if (!phoneRegex.test(form.phone.replace(/--/g, "-"))) {
      alert("올바른 휴대폰 번호 형식을 입력해 주세요. (예: 010-1234-5678)");
      return;
    }

    if (!form.title.trim()) {
      alert("문의 제목을 입력해 주세요.");
      return;
    }

    if (!form.content.trim()) {
      alert("문의 내용을 입력해 주세요.");
      return;
    }

    if (!form.is_agreed) {
      alert("개인정보 수집 및 이용에 동의해야 문의 접수가 가능합니다.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setForm({
          name: "",
          phone: "",
          email: "",
          type: "장례상품",
          interest_product: "프리미엄 396만원",
          title: "",
          content: "",
          attachment_url: "",
          is_agreed: true,
        });
      } else {
        alert(data.error || "접수 중 오류가 발생했습니다.");
      }
    } catch (e) {
      alert("서버 연결 실패. 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header siteConfig={siteConfig} />

      <SubVisual
        title="온라인문의"
        subtitle="HDONE LIFE에 궁금하신 사항을 1:1 상담으로 남겨주시면 친절하게 답변해 드리겠습니다."
        categoryName="온라인문의"
        currentPageName="온라인문의"
        subItems={subNavItems}
        bgImage="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-8 w-full flex-1 space-y-12">
        {/* Info Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2">
            <span className="text-amber-400 font-bold text-xs tracking-widest uppercase">CUSTOMER CENTER</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">24시간 빠른 상담 서비스</h2>
            <p className="text-slate-300 text-sm">
              급한 장례 관련 문의는 24시 종합상황실 전화를 이용하시면 즉시 연결됩니다.
            </p>
          </div>
          <a
            href={`tel:${siteConfig?.phone || "1544-8826"}`}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-lg flex items-center gap-2 whitespace-nowrap shadow-lg transition-all"
          >
            <PhoneCall className="w-5 h-5" /> {siteConfig?.phone || "1544-8826"}
          </a>
        </div>

        {/* Inquiry Form */}
        <div className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-amber-600" /> 1:1 온라인 상담 신청서
            </h3>
            <p className="text-xs text-slate-500 mt-1">* 표시 항목은 필수 입력 사항입니다.</p>
          </div>

          {success ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-20 h-20 bg-amber-500/20 text-amber-600 rounded-full flex items-center justify-center mx-auto border border-amber-500/40">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h4 className="text-3xl font-extrabold text-slate-900">문의 접수가 성공적으로 완료되었습니다!</h4>
              <p className="text-slate-600 text-base max-w-md mx-auto">
                작성해 주신 연락처로 전담 상담사가 확인 후 빠르게 상담 안내해 드리겠습니다.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-6 px-8 py-3 bg-slate-900 text-white font-bold rounded-lg text-sm hover:bg-slate-800 transition-colors"
              >
                추가 문의 작성하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">이름 (성함) *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="성함을 입력하세요"
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">연락처 *</label>
                  <input
                    type="tel"
                    required
                    maxLength={13}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: formatPhoneNumber(e.target.value) })}
                    placeholder="010-0000-0000"
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">이메일 주소</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="example@domain.com"
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">문의 유형 *</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-500"
                  >
                    <option value="장례상품">장례상품</option>
                    <option value="웨딩상품">웨딩상품</option>
                    <option value="크루즈상품">크루즈상품</option>
                    <option value="펫장례상품">펫장례상품</option>
                    <option value="기타문의">기타문의</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">문의 제목 *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="문의 제목을 입력하세요"
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">문의 내용 *</label>
                <textarea
                  required
                  rows={5}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="궁금하신 내용을 구체적으로 작성해 주시면 보다 정확하게 안내해 드릴 수 있습니다."
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              {/* Privacy Terms Check */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-amber-600" /> 개인정보 수집 및 이용 동의
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed max-h-20 overflow-y-auto">
                  수집 목적: 고객 문의 처리 및 답변 전달 <br />
                  수집 항목: 성함, 연락처, 이메일 주소 <br />
                  보유 및 이용 기간: 문의 답변 완료 후 3년간 보관 후 지체 없이 파기합니다.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="privacyAgreed"
                    checked={form.is_agreed}
                    onChange={(e) => setForm({ ...form, is_agreed: e.target.checked })}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <label htmlFor="privacyAgreed" className="text-xs font-bold text-slate-800">
                    개인정보 수집 및 이용 동의 (필수)
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl shadow-lg flex items-center justify-center gap-2 text-base transition-all"
              >
                <Send className="w-5 h-5" /> {submitting ? "접수 처리 중..." : "온라인 문의 접수하기"}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer siteConfig={siteConfig} />
      <FloatingContactButton phone={siteConfig?.phone} />
    </div>
  );
}
