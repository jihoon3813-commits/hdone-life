"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubVisual from "@/components/SubVisual";
import FloatingContactButton from "@/components/FloatingContactButton";
import { Calendar, Eye, ArrowLeft, ArrowRight, List } from "lucide-react";

const subNavItems = [{ name: "갤러리", href: "/gallery" }];

export default function GalleryDetailPage() {
  const { id } = useParams();
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [gallery, setGallery] = useState<any>(null);
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
    fetch(`/api/galleries/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setGallery(data.gallery);
          setPrev(data.prev);
          setNext(data.next);
        }
      })
      .catch(() => {});
  }, [id]);

  if (!gallery) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header siteConfig={siteConfig} />
        <div className="flex-1 flex items-center justify-center text-slate-400 py-32">로딩 중...</div>
        <Footer siteConfig={siteConfig} />
      </div>
    );
  }

  let imageList: string[] = [];
  try {
    imageList = JSON.parse(gallery.images_json || "[]");
  } catch (e) {
    imageList = [gallery.main_image];
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header siteConfig={siteConfig} />

      <SubVisual
        title="갤러리"
        subtitle="HDONE LIFE의 실제 서비스 현장 상세 갤러리"
        categoryName="갤러리"
        currentPageName="갤러리"
        subItems={subNavItems}
        bgImage="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-8 w-full flex-1 space-y-8">
        {/* Title Header */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{gallery.title}</h1>
          <div className="flex items-center space-x-6 text-xs text-slate-500 pt-3 border-t border-slate-200">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-amber-600" /> 등록일: {gallery.created_at?.split(" ")[0]}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4 text-amber-600" /> 조회수: {gallery.views}
            </span>
          </div>
        </div>

        {/* Gallery Images List */}
        <div className="space-y-6 py-4">
          {imageList.map((imgUrl, idx) => (
            <div key={idx} className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <img src={imgUrl} alt={`${gallery.title} - ${idx + 1}`} className="w-full h-auto object-cover max-h-[600px]" />
            </div>
          ))}

          {gallery.content && (
            <div className="text-slate-700 leading-relaxed text-base whitespace-pre-line pt-4 bg-white p-4">
              {gallery.content}
            </div>
          )}
        </div>

        {/* Prev / Next Navigation */}
        <div className="border-t border-b border-slate-200 divide-y divide-slate-100 text-sm text-slate-700">
          <div className="py-3.5 flex items-center justify-between">
            <span className="font-bold text-xs text-slate-500 w-20">이전 글 ▲</span>
            {prev ? (
              <Link href={`/gallery/${prev.id}`} className="truncate hover:text-amber-600 flex-1">
                {prev.title}
              </Link>
            ) : (
              <span className="text-slate-400 flex-1">이전 글이 없습니다.</span>
            )}
          </div>
          <div className="py-3.5 flex items-center justify-between">
            <span className="font-bold text-xs text-slate-500 w-20">다음 글 ▼</span>
            {next ? (
              <Link href={`/gallery/${next.id}`} className="truncate hover:text-amber-600 flex-1">
                {next.title}
              </Link>
            ) : (
              <span className="text-slate-400 flex-1">다음 글이 없습니다.</span>
            )}
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/gallery"
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
