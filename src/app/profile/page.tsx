"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubVisual from "@/components/SubVisual";
import FloatingContactButton from "@/components/FloatingContactButton";
import { UserCheck, ShieldCheck, Phone, Mail } from "lucide-react";

export default function ProfilePage() {
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/site-config")
      .then((res) => res.json())
      .then((data) => data.success && setSiteConfig(data.config))
      .catch(() => {});

    const loggedUser = localStorage.getItem("hdone_user");
    if (loggedUser) {
      try {
        setUser(JSON.parse(loggedUser));
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("hdone_user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header siteConfig={siteConfig} />

      <SubVisual
        title="회원정보 관리"
        subtitle="HDONE LIFE 회원님의 내 정보 조회 및 관리"
        categoryName="회원서비스"
        currentPageName="회원정보 관리"
        subItems={[
          { name: "로그인", href: "/login" },
          { name: "회원정보 관리", href: "/profile" },
        ]}
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 max-w-2xl mx-auto px-4 w-full flex-1">
        {user ? (
          <div className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <div className="flex items-center space-x-4 border-b border-slate-200 pb-6">
              <div className="w-16 h-16 bg-amber-500 text-slate-950 rounded-2xl flex items-center justify-center font-extrabold text-2xl shadow-md">
                {user.name ? user.name[0] : "H"}
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">{user.name} 님</h2>
                <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2.5 py-0.5 rounded-full inline-block mt-1">
                  {user.role === "admin" ? "최고 관리자 계정" : "HDONE LIFE 정회원"}
                </span>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="flex justify-between py-2 border-b border-slate-200/60">
                <span className="font-bold text-slate-500">이메일 아이디</span>
                <span className="font-semibold text-slate-900">{user.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200/60">
                <span className="font-bold text-slate-500">연락처</span>
                <span className="font-semibold text-slate-900">{user.phone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200/60">
                <span className="font-bold text-slate-500">계정 등급</span>
                <span className="font-semibold text-slate-900">{user.role}</span>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="flex-1 text-center py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm shadow-md"
                >
                  관리자 대시보드
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm shadow-md"
              >
                로그아웃
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 space-y-4 bg-slate-50 p-8 rounded-3xl border border-slate-200">
            <p className="text-slate-600 font-medium">로그인이 필요한 서비스입니다.</p>
            <Link href="/login" className="inline-block px-8 py-3 bg-amber-500 text-slate-950 font-bold rounded-xl text-sm">
              로그인하러 가기
            </Link>
          </div>
        )}
      </section>

      <Footer siteConfig={siteConfig} />
      <FloatingContactButton phone={siteConfig?.phone} />
    </div>
  );
}
