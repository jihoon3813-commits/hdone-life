"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubVisual from "@/components/SubVisual";
import FloatingContactButton from "@/components/FloatingContactButton";
import { Lock, CheckCircle2, MessageSquare, List, Calendar, ShieldCheck } from "lucide-react";

const subNavItems = [
  { name: "공지사항", href: "/customer/notice" },
  { name: "Q&A", href: "/customer/qna" },
];

export default function QnaDetailPage() {
  const { id } = useParams();
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [qna, setQna] = useState<any>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState("");

  useEffect(() => {
    fetch("/api/site-config")
      .then((res) => res.json())
      .then((data) => data.success && setSiteConfig(data.config))
      .catch(() => {});
  }, []);

  const fetchDetail = (passVal?: string) => {
    let url = `/api/qnas/${id}`;
    if (passVal) {
      url += `?password=${encodeURIComponent(passVal)}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setQna(data.qna);
          setIsLocked(false);
        } else if (data.isSecretLocked) {
          setIsLocked(true);
        } else {
          setPassError(data.error || "비밀번호가 일치하지 않습니다.");
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (id) {
      // Check if logged in user is admin
      const loggedUser = localStorage.getItem("hdone_user");
      let isAdmin = false;
      if (loggedUser) {
        try {
          const u = JSON.parse(loggedUser);
          if (u.role === "admin") isAdmin = true;
        } catch (e) {}
      }

      fetchDetail(isAdmin ? "ADMIN_BYPASS" : undefined);
    }
  }, [id]);

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");
    fetchDetail(password);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header siteConfig={siteConfig} />

      <SubVisual
        title="Q&A"
        subtitle="고객님의 질문 상세 내용 및 답변"
        categoryName="고객센터"
        currentPageName="Q&A"
        subItems={subNavItems}
        bgImage="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-8 w-full flex-1 space-y-8">
        {isLocked ? (
          <div className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200 text-center max-w-md mx-auto space-y-6 shadow-sm">
            <div className="w-16 h-16 bg-slate-900 text-amber-400 rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">비밀글입니다</h2>
              <p className="text-xs text-slate-500 mt-1">작성 시 설정한 비밀번호를 입력해 주세요.</p>
            </div>

            <form onSubmit={handleUnlockSubmit} className="space-y-3">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-500"
              />
              {passError && <p className="text-xs text-red-500 font-bold">{passError}</p>}
              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-sm shadow-md transition-all"
              >
                확인
              </button>
            </form>
          </div>
        ) : (
          qna && (
            <>
              {/* Question Section */}
              <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      qna.is_answered ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {qna.is_answered ? "답변완료" : "답변대기"}
                  </span>
                  {qna.is_secret === 1 && <span className="text-xs text-slate-400 font-semibold">[비밀글]</span>}
                </div>

                <h1 className="text-2xl font-extrabold text-slate-900">{qna.title}</h1>

                <div className="flex items-center space-x-6 text-xs text-slate-500 pt-3 border-t border-slate-200">
                  <span>작성자: <strong>{qna.author}</strong></span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-amber-600" /> {qna.created_at?.split(" ")[0]}
                  </span>
                </div>

                <div className="pt-4 text-slate-800 leading-relaxed whitespace-pre-line text-base border-t border-slate-200/60">
                  {qna.content}
                </div>
              </div>

              {/* Admin Answer Box */}
              {qna.is_answered === 1 ? (
                <div className="bg-amber-50/60 p-6 sm:p-8 rounded-2xl border border-amber-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
                    <h3 className="font-bold text-lg text-amber-950 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-amber-600" /> HDONE LIFE 관리자 답변
                    </h3>
                    <span className="text-xs text-amber-800">{qna.answer_at?.split(" ")[0]}</span>
                  </div>
                  <div className="text-slate-800 leading-relaxed text-base whitespace-pre-line">
                    {qna.answer}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-100 p-6 rounded-2xl text-center text-slate-500 text-sm">
                  담당자가 확인 후 조속히 답변을 등록할 예정입니다.
                </div>
              )}

              <div className="text-center pt-4">
                <Link
                  href="/customer/qna"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors text-sm"
                >
                  <List className="w-4 h-4" /> 목록으로 돌아가기
                </Link>
              </div>
            </>
          )
        )}
      </section>

      <Footer siteConfig={siteConfig} />
      <FloatingContactButton phone={siteConfig?.phone} />
    </div>
  );
}
