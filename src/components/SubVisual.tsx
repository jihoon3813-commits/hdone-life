"use client";

import React from "react";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

interface SubItem {
  name: string;
  href: string;
}

export interface SubVisualProps {
  title: string;
  subtitle?: string;
  categoryName: string;
  currentPageName: string;
  subItems: SubItem[];
  bgImage?: string;
}

export default function SubVisual({
  title,
  subtitle = "홈페이지를 방문해 주셔서 진심으로 감사드립니다.",
  categoryName,
  currentPageName,
  subItems,
  bgImage = "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1600&q=80",
}: SubVisualProps) {
  return (
    <div className="w-full">
      {/* Visual Banner */}
      <div
        className="relative bg-cover bg-center pt-32 pb-12 sm:pt-40 sm:pb-16 flex items-center justify-center text-white text-center"
        style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url(${bgImage})` }}
      >
        <div className="max-w-4xl px-4 space-y-3">
          <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-full text-xs font-semibold tracking-wider">
            {categoryName}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{title}</h1>
          <p className="text-slate-300 text-sm sm:text-base font-light max-w-xl mx-auto">{subtitle}</p>
        </div>
      </div>

      {/* Sub Navigation Bar & Breadcrumbs */}
      <div className="bg-slate-900 text-slate-300 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Sub Navigation Tabs */}
          <div className="flex overflow-x-auto scrollbar-none py-2 md:py-0 border-b md:border-b-0 border-slate-800">
            {subItems.map((item) => {
              const isSelected = item.name === currentPageName;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                    isSelected
                      ? "border-amber-400 text-amber-400 bg-slate-800/60"
                      : "border-transparent text-slate-300 hover:text-white hover:bg-slate-800/40"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Breadcrumbs */}
          <div className="hidden md:flex items-center space-x-2 text-xs text-slate-400 py-3">
            <Link href="/" className="hover:text-amber-400 flex items-center">
              <Home className="w-3.5 h-3.5" />
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span>{categoryName}</span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-amber-400 font-medium">{currentPageName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
