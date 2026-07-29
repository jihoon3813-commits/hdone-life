"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubVisual from "@/components/SubVisual";
import FloatingContactButton from "@/components/FloatingContactButton";
import { Calendar, Eye, List, Paperclip } from "lucide-react";

const subNavItems = [
  { name: "공지사항", href: "/customer/notice" },
  { name: "Q&A", href: "/customer/qna" },
];

export default function NoticeDetailPage() {
  const { id } = useParams();
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [notice, setNotice] = useState<any>(null);
  const [prev, setPrev] = useState<any>(null);
  const [next, setNext] = useState<any>(null);

  useEffect(() => {
    fetch("/api/site-config")
      .then((res) => res.json())
      .then((data) => data.success && setSiteConfig(data.config))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/notices/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setNotice(data.notice);
          setPrev(data.prev);
          setNext(data.next);
        }
      })
      .catch(() => {});
  }, [id]);

  if (!notice) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header siteConfig={siteConfig} />
        <div className="flex-1 flex items-center justify-center text-slate-400 py-32">로딩 중...</div>
        <Footer siteConfig={siteConfig} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header siteConfig={siteConfig} />

      <SubVisual
        title="공지사항"
        subtitle="HDONE LIFE의 소식과 안내 사항을 상세히 전해 드립니다."
        categoryName="고객센터"
        currentPageName="공지사항"
        subItems={subNavItems}
        bgImage="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-8 w-full flex-1 space-y-8">
        {/* Notice Header */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{notice.title}</h1>
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 pt-3 border-t border-slate-200">
            <div className="flex items-center space-x-4">
              <span>작성자: <strong>{notice.author}</strong></span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-amber-600" /> {notice.created_at?.split(" ")[0]}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-amber-600" /> {notice.views}
              </span>
            </div>

            {notice.attachment_name && (
              <a
                href={notice.attachment_url || "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-amber-600 font-bold hover:underline"
              >
                <Paperclip className="w-3.5 h-3.5" /> 첨부파일: {notice.attachment_name}
              </a>
            )}
          </div>
        </div>

        {/* Notice Body Content */}
        <div className="bg-white p-6 sm:p-8 border border-slate-200 rounded-2xl min-h-[250px] text-slate-800 leading-relaxed whitespace-pre-line text-base">
          {notice.content}
        </div>

        {/* Prev / Next Navigation */}
        <div className="border-t border-b border-slate-200 divide-y divide-slate-100 text-sm text-slate-700">
          <div className="py-3.5 flex items-center justify-between">
            <span className="font-bold text-xs text-slate-500 w-20">이전 글 ▲</span>
            {prev ? (
              <Link href={`/customer/notice/${prev.id}`} className="truncate hover:text-amber-600 flex-1">
                {prev.title}
              </Link>
            ) : (
              <span className="text-slate-400 flex-1">이전 글이 없습니다.</span>
            )}
          </div>
          <div className="py-3.5 flex items-center justify-between">
            <span className="font-bold text-xs text-slate-500 w-20">다음 글 ▼</span>
            {next ? (
              <Link href={`/customer/notice/${next.id}`} className="truncate hover:text-amber-600 flex-1">
                {next.title}
              </Link>
            ) : (
              <span className="text-slate-400 flex-1">다음 글이 없습니다.</span>
            )}
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/customer/notice"
            className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors text-sm"
          >
            <List className="w-4 h-4" /> 목록으로 돌아가기
          </Link>
        </div>
      </section>

      <Footer siteConfig={siteConfig} />
      <FloatingContactButton phone={siteConfig?.phone} />
    </div>
  );
}
