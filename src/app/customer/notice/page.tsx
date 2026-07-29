"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubVisual from "@/components/SubVisual";
import FloatingContactButton from "@/components/FloatingContactButton";
import { Search, Eye, FileText, Pin } from "lucide-react";

const subNavItems = [
  { name: "공지사항", href: "/customer/notice" },
  { name: "Q&A", href: "/customer/qna" },
];

export default function NoticeListPage() {
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [notices, setNotices] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({ page: 1, totalPages: 1 });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/api/site-config")
      .then((res) => res.json())
      .then((data) => data.success && setSiteConfig(data.config))
      .catch(() => {});
  }, []);

  const fetchNotices = () => {
    fetch(`/api/notices?page=${page}&limit=10&search=${encodeURIComponent(search)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setNotices(data.notices);
          setPagination(data.pagination);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchNotices();
  }, [page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchNotices();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header siteConfig={siteConfig} />

      <SubVisual
        title="공지사항"
        subtitle="HDONE LIFE의 주요 소식과 안내 사항을 알려드립니다."
        categoryName="고객센터"
        currentPageName="공지사항"
        subItems={subNavItems}
        bgImage="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-8 w-full flex-1 space-y-8">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium">총 {pagination.total || 0}건의 공지사항</span>
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="제목 또는 내용 검색"
              className="bg-white border border-slate-300 text-slate-900 px-4 py-2 text-xs rounded-lg focus:outline-none focus:border-amber-500 w-full sm:w-64"
            />
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-1 shrink-0"
            >
              <Search className="w-3.5 h-3.5" /> 검색
            </button>
          </form>
        </div>

        {/* Notice Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-900 text-white text-xs uppercase font-bold">
                <th className="py-4 px-6 border-b border-slate-800 w-16 text-center">번호</th>
                <th className="py-4 px-6 border-b border-slate-800">제목</th>
                <th className="py-4 px-6 border-b border-slate-800 w-28 text-center">작성자</th>
                <th className="py-4 px-6 border-b border-slate-800 w-28 text-center">작성일</th>
                <th className="py-4 px-6 border-b border-slate-800 w-20 text-center">조회수</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
              {notices.length > 0 ? (
                notices.map((n) => (
                  <tr key={n.id} className={`hover:bg-slate-50 transition-colors ${n.is_important ? "bg-amber-50/40" : ""}`}>
                    <td className="py-4 px-6 text-center font-bold text-slate-500 text-xs">
                      {n.is_important ? (
                        <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded text-[10px] font-extrabold inline-flex items-center gap-0.5">
                          <Pin className="w-3 h-3" /> 공지
                        </span>
                      ) : (
                        n.id
                      )}
                    </td>
                    <td className="py-4 px-6 font-semibold">
                      <Link href={`/customer/notice/${n.id}`} className="hover:text-amber-600 transition-colors">
                        {n.title}
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-center text-xs text-slate-500">{n.author || "관리자"}</td>
                    <td className="py-4 px-6 text-center text-xs text-slate-500">{n.created_at?.split(" ")[0]}</td>
                    <td className="py-4 px-6 text-center text-xs text-slate-500">{n.views}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 text-xs">
                    등록된 공지사항이 없습니다.
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

      <Footer siteConfig={siteConfig} />
      <FloatingContactButton phone={siteConfig?.phone} />
    </div>
  );
}
