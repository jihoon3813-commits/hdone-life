"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubVisual from "@/components/SubVisual";
import FloatingContactButton from "@/components/FloatingContactButton";
import { Lock, MessageSquare, PlusCircle, CheckCircle2, HelpCircle } from "lucide-react";

const subNavItems = [
  { name: "공지사항", href: "/customer/notice" },
  { name: "Q&A", href: "/customer/qna" },
];

export default function QnaListPage() {
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [qnas, setQnas] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({ page: 1, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Q&A Form
  const [newQna, setNewQna] = useState({
    title: "",
    content: "",
    author: "",
    password: "",
    is_secret: true,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/site-config")
      .then((res) => res.json())
      .then((data) => data.success && setSiteConfig(data.config))
      .catch(() => {});
  }, []);

  const fetchQnas = () => {
    fetch(`/api/qnas?page=${page}&limit=10`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setQnas(data.qnas);
          setPagination(data.pagination);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchQnas();
  }, [page]);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQna.title || !newQna.content || !newQna.author) {
      alert("작성자, 제목, 내용을 모두 입력해 주세요.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/qnas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQna),
      });

      const data = await res.json();
      if (data.success) {
        alert("질문이 성공적으로 등록되었습니다.");
        setShowCreateModal(false);
        setNewQna({ title: "", content: "", author: "", password: "", is_secret: true });
        fetchQnas();
      } else {
        alert(data.error || "등록 실패");
      }
    } catch (e) {
      alert("서버 통신 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header siteConfig={siteConfig} />

      <SubVisual
        title="Q&A"
        subtitle="고객님의 질문에 정성껏 답변해 드립니다."
        categoryName="고객센터"
        currentPageName="Q&A"
        subItems={subNavItems}
        bgImage="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-8 w-full flex-1 space-y-8">
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-amber-600" /> 질문 및 답변 (Q&A)
            </h2>
            <p className="text-xs text-slate-500 mt-1">총 {pagination.total || 0}건의 Q&A가 등록되어 있습니다.</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all"
          >
            <PlusCircle className="w-4 h-4" /> 질문 등록하기
          </button>
        </div>

        {/* Q&A Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-900 text-white text-xs uppercase font-bold">
                <th className="py-4 px-6 border-b border-slate-800 w-24 text-center">상태</th>
                <th className="py-4 px-6 border-b border-slate-800">제목</th>
                <th className="py-4 px-6 border-b border-slate-800 w-28 text-center">작성자</th>
                <th className="py-4 px-6 border-b border-slate-800 w-28 text-center">작성일</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
              {qnas.length > 0 ? (
                qnas.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                          q.is_answered
                            ? "bg-slate-900 text-white"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {q.is_answered ? "답변완료" : "답변대기"}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold">
                      <Link href={`/customer/qna/${q.id}`} className="hover:text-amber-600 transition-colors flex items-center gap-1.5">
                        {q.is_secret === 1 && <Lock className="w-3.5 h-3.5 text-slate-400" />}
                        <span>{q.title}</span>
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-center text-xs text-slate-500">{q.author}</td>
                    <td className="py-4 px-6 text-center text-xs text-slate-500">{q.created_at?.split(" ")[0]}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400 text-xs">
                    등록된 질문이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center space-x-2 pt-4">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-lg font-bold text-sm ${
                  p === page ? "bg-amber-500 text-slate-950" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Q&A Registration Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-xl font-bold text-slate-900">새 질문 등록 (Q&A)</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-900 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">작성자 이름 *</label>
                <input
                  type="text"
                  required
                  value={newQna.author}
                  onChange={(e) => setNewQna({ ...newQna, author: e.target.value })}
                  placeholder="작성자 성함을 입력하세요"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">비밀번호 (비밀글 시 필요)</label>
                <input
                  type="password"
                  value={newQna.password}
                  onChange={(e) => setNewQna({ ...newQna, password: e.target.value })}
                  placeholder="비밀번호 4자리 이상"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">질문 제목 *</label>
                <input
                  type="text"
                  required
                  value={newQna.title}
                  onChange={(e) => setNewQna({ ...newQna, title: e.target.value })}
                  placeholder="질문 제목을 입력하세요"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">질문 내용 *</label>
                <textarea
                  required
                  rows={4}
                  value={newQna.content}
                  onChange={(e) => setNewQna({ ...newQna, content: e.target.value })}
                  placeholder="상세 내용을 적어주세요"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isSecret"
                  checked={newQna.is_secret}
                  onChange={(e) => setNewQna({ ...newQna, is_secret: e.target.checked })}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="isSecret" className="text-xs font-bold text-slate-700">
                  비밀글로 설정 (작성자와 관리자만 확인 가능)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-lg text-xs hover:bg-amber-400 shadow-md"
                >
                  {submitting ? "등록 중..." : "등록하기"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer siteConfig={siteConfig} />
      <FloatingContactButton phone={siteConfig?.phone} />
    </div>
  );
}
