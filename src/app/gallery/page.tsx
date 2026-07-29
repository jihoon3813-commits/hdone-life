"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubVisual from "@/components/SubVisual";
import FloatingContactButton from "@/components/FloatingContactButton";
import { Eye, Calendar, Image as ImageIcon } from "lucide-react";

const subNavItems = [{ name: "갤러리", href: "/gallery" }];

export default function GalleryListPage() {
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [galleries, setGalleries] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({ page: 1, totalPages: 1 });
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/api/site-config")
      .then((res) => res.json())
      .then((data) => data.success && setSiteConfig(data.config))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch(`/api/galleries?page=${page}&limit=9`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setGalleries(data.galleries);
          setPagination(data.pagination);
        }
      })
      .catch(() => {});
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header siteConfig={siteConfig} />

      <SubVisual
        title="갤러리"
        subtitle="HDONE LIFE의 실제 서비스 현장 및 브랜드 액티비티 갤러리입니다."
        categoryName="갤러리"
        currentPageName="갤러리"
        subItems={subNavItems}
        bgImage="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-8 w-full flex-1 space-y-12">
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-amber-600" /> 현장 갤러리 목록
          </h2>
          <span className="text-xs text-slate-500">총 {pagination.total || 0}건의 게시물이 있습니다.</span>
        </div>

        {/* Gallery Grid */}
        {galleries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.map((item) => (
              <Link
                key={item.id}
                href={`/gallery/${item.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={item.main_image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {item.created_at?.split(" ")[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> {item.views}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">등록된 갤러리가 없습니다.</div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center space-x-2 pt-6">
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
