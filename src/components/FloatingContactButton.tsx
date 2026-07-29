"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PhoneCall, MessageSquare, ArrowUp, X, Send, CheckCircle2 } from "lucide-react";
import { formatPhoneNumber } from "@/lib/utils";

export interface FloatingContactButtonProps {
  phone?: string;
}

export default function FloatingContactButton({ phone = "1544-8826" }: FloatingContactButtonProps) {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    phone: "",
    type: "장례상품",
    title: "",
    content: "",
    is_agreed: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inquiryForm.name.trim()) {
      alert("성함을 입력해 주세요.");
      return;
    }
    if (!inquiryForm.phone.trim()) {
      alert("연락처를 입력해 주세요.");
      return;
    }
    if (!inquiryForm.title.trim()) {
      alert("문의 제목을 입력해 주세요.");
      return;
    }
    if (!inquiryForm.content.trim()) {
      alert("문의 내용을 입력해 주세요.");
      return;
    }
    if (!inquiryForm.is_agreed) {
      alert("개인정보 수집 및 이용에 동의하셔야 접수가 가능합니다.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiryForm),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setInquiryForm({
          name: "",
          phone: "",
          type: "장례상품",
          title: "",
          content: "",
          is_agreed: true,
        });
      } else {
        alert(data.error || "접수 실패");
      }
    } catch (e) {
      alert("서버 연결 실패. 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSubmitted(false);
  };

  return (
    <>
      {/* Floating Buttons Container */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3 items-end">
        {/* Quick Phone Call Button */}
        <a
          href={`tel:${phone}`}
          className="group flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-3 rounded-sm shadow-2xl transition-all transform hover:scale-105"
          title="24시 상담전화 연결"
        >
          <PhoneCall className="w-5 h-5 animate-pulse" />
          <span className="hidden sm:inline text-sm font-extrabold">{phone}</span>
        </a>

        {/* Quick Inquiry Modal Trigger Button */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-100 font-bold px-4 py-3 rounded-sm shadow-2xl border border-slate-700 transition-all transform hover:scale-105 text-left"
          title="1:1 온라인 문의 팝업"
        >
          <MessageSquare className="w-5 h-5 text-amber-400" />
          <span className="hidden sm:inline text-sm">온라인 문의</span>
        </button>

        {/* Top Scroll Button */}
        {showTopBtn && (
          <button
            onClick={scrollToTop}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-3 rounded-sm shadow-xl border border-slate-600 transition-all"
            title="상단으로 이동"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Online Inquiry Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-sm max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-amber-400 font-bold text-xs tracking-wider uppercase">FAST INQUIRY</span>
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5">
                  <MessageSquare className="w-5 h-5 text-amber-400" /> 1:1 온라인 빠른 상담 문의
                </h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-white p-1 transition-colors"
                aria-label="팝업 닫기"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-white">상담 접수가 완료되었습니다.</h4>
                <p className="text-slate-300 text-sm">
                  남겨주신 문의 내용을 확인 후 전문 전담 상담사가 조속히 연락드리겠습니다.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleCloseModal}
                    className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-sm text-sm transition-all"
                  >
                    확인 및 닫기
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">성함 *</label>
                    <input
                      type="text"
                      required
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      placeholder="성함을 입력하세요"
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-sm px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">연락처 *</label>
                    <input
                      type="tel"
                      required
                      maxLength={13}
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: formatPhoneNumber(e.target.value) })}
                      placeholder="010-0000-0000"
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-sm px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">문의 분야 *</label>
                    <select
                      value={inquiryForm.type}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, type: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-sm px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                    >
                      <option value="장례상품">장례상품</option>
                      <option value="웨딩상품">웨딩상품</option>
                      <option value="크루즈상품">크루즈상품</option>
                      <option value="펫장례상품">펫장례상품</option>
                      <option value="기타문의">기타문의</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">제목 *</label>
                    <input
                      type="text"
                      required
                      value={inquiryForm.title}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, title: e.target.value })}
                      placeholder="문의 제목"
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-sm px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">문의 내용 *</label>
                  <textarea
                    required
                    rows={4}
                    value={inquiryForm.content}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, content: e.target.value })}
                    placeholder="상세 문의 내용을 작성해 주세요."
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-sm px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="modalPrivacyAgreed"
                    checked={inquiryForm.is_agreed}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, is_agreed: e.target.checked })}
                    className="rounded-sm bg-slate-800 border-slate-700 text-amber-500 focus:ring-amber-400"
                  />
                  <label htmlFor="modalPrivacyAgreed" className="text-xs text-slate-400">
                    개인정보 수집 및 이용에 동의합니다. (필수)
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-sm shadow-lg flex items-center justify-center gap-2 text-base transition-all"
                  >
                    <Send className="w-4 h-4" /> {submitting ? "접수 처리 중..." : "온라인 문의 접수하기"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
