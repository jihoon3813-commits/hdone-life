"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  SlidersHorizontal,
  Settings,
  FileText,
  HelpCircle,
  MessageSquare,
  Image as ImageIcon,
  Users,
  LogOut,
  PlusCircle,
  Save,
  Trash2,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [adminUser, setAdminUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "slides" | "config" | "notices" | "qnas" | "inquiries" | "galleries" | "popups"
  >("dashboard");

  // Data states
  const [config, setConfig] = useState<any>({});
  const [slides, setSlides] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [qnas, setQnas] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [galleries, setGalleries] = useState<any[]>([]);

  // Form states
  const [newSlide, setNewSlide] = useState({ title: "", subtitle: "", bg_image: "", link_url: "/service/funeral", display_order: 1 });
  const [newNotice, setNewNotice] = useState({ title: "", content: "", is_important: false });
  const [newGallery, setNewGallery] = useState({ title: "", content: "", main_image: "" });
  const [qnaAnswerInput, setQnaAnswerInput] = useState<{ [key: number]: string }>({});
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [pwSubmitting, setPwSubmitting] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    setPwSubmitting(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      const d = await res.json();
      if (d.success) {
        alert("관리자 비밀번호가 성공적으로 변경되었습니다.");
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        alert(d.error || "비밀번호 변경 실패");
      }
    } catch (err) {
      alert("비밀번호 변경 처리 중 오류가 발생했습니다.");
    } finally {
      setPwSubmitting(false);
    }
  };

  useEffect(() => {
    // Check admin auth
    const logged = localStorage.getItem("hdone_user");
    if (logged) {
      try {
        const u = JSON.parse(logged);
        if (u.role === "admin") {
          setAdminUser(u);
        } else {
          alert("관리자 권한이 필요한 페이지입니다.");
          window.location.href = "/login";
        }
      } catch (e) {
        window.location.href = "/login";
      }
    } else {
      window.location.href = "/login";
    }

    loadAllData();
  }, []);

  const loadAllData = () => {
    fetch("/api/site-config").then((res) => res.json()).then((d) => d.success && setConfig(d.config));
    fetch("/api/slides").then((res) => res.json()).then((d) => d.success && setSlides(d.slides));
    fetch("/api/notices?limit=50").then((res) => res.json()).then((d) => d.success && setNotices(d.notices));
    fetch("/api/qnas?limit=50").then((res) => res.json()).then((d) => d.success && setQnas(d.qnas));
    fetch("/api/inquiries?limit=50").then((res) => res.json()).then((d) => d.success && setInquiries(d.inquiries));
    fetch("/api/galleries?limit=50").then((res) => res.json()).then((d) => d.success && setGalleries(d.galleries));
  };

  const handleConfigSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/site-config", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    const d = await res.json();
    if (d.success) alert("사이트 정보가 성공적으로 변경되었습니다!");
  };

  const handleAddSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/slides", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSlide),
    });
    const d = await res.json();
    if (d.success) {
      alert("슬라이드가 추가되었습니다.");
      setNewSlide({ title: "", subtitle: "", bg_image: "", link_url: "/service/funeral", display_order: 1 });
      loadAllData();
    }
  };

  const handleAddNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNotice),
    });
    const d = await res.json();
    if (d.success) {
      alert("공지사항이 등록되었습니다.");
      setNewNotice({ title: "", content: "", is_important: false });
      loadAllData();
    }
  };

  const handleAnswerQna = async (id: number) => {
    const ans = qnaAnswerInput[id];
    if (!ans) return alert("답변 내용을 입력해 주세요.");
    const res = await fetch(`/api/qnas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer: ans }),
    });
    const d = await res.json();
    if (d.success) {
      alert("답변이 등록되었습니다.");
      loadAllData();
    }
  };

  const handleInquiryStatusChange = async (id: number, status: string) => {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const d = await res.json();
    if (d.success) loadAllData();
  };

  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/galleries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGallery),
    });
    const d = await res.json();
    if (d.success) {
      alert("갤러리가 추가되었습니다.");
      setNewGallery({ title: "", content: "", main_image: "" });
      loadAllData();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("hdone_user");
    window.location.href = "/";
  };

  if (!adminUser) return null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Admin Top Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-amber-500 text-slate-950 font-extrabold px-3 py-1 rounded text-lg">HDONE</span>
          <span className="font-bold text-lg text-white">ADMIN CMS</span>
          <span className="text-xs bg-slate-800 text-amber-400 px-2.5 py-1 rounded-full border border-slate-700">
            v1.0 Operational
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/" target="_blank" className="text-xs text-slate-300 hover:text-amber-400">
            사용자 웹사이트 바로가기 ↗
          </Link>
          <button onClick={handleLogout} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-bold">
            <LogOut className="w-3.5 h-3.5" /> 로그아웃
          </button>
        </div>
      </header>

      {/* Admin Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 space-y-1 shrink-0">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${
              activeTab === "dashboard" ? "bg-amber-500 text-slate-950" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> 대시보드
          </button>

          <button
            onClick={() => setActiveTab("slides")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${
              activeTab === "slides" ? "bg-amber-500 text-slate-950" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" /> 메인 슬라이드 관리
          </button>

          <button
            onClick={() => setActiveTab("config")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${
              activeTab === "config" ? "bg-amber-500 text-slate-950" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Settings className="w-4 h-4" /> 회사정보 & 사이트 설정
          </button>

          <button
            onClick={() => setActiveTab("notices")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${
              activeTab === "notices" ? "bg-amber-500 text-slate-950" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <FileText className="w-4 h-4" /> 공지사항 관리
          </button>

          <button
            onClick={() => setActiveTab("qnas")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${
              activeTab === "qnas" ? "bg-amber-500 text-slate-950" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <HelpCircle className="w-4 h-4" /> Q&A 게시판 관리
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${
              activeTab === "inquiries" ? "bg-amber-500 text-slate-950" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <MessageSquare className="w-4 h-4" /> 온라인 문의 관리
          </button>

          <button
            onClick={() => setActiveTab("galleries")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${
              activeTab === "galleries" ? "bg-amber-500 text-slate-950" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <ImageIcon className="w-4 h-4" /> 갤러리 관리
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-y-auto bg-slate-950">
          {/* DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <h2 className="text-2xl font-extrabold text-white">운영 대시보드 개요</h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 block font-medium">총 접수 문의</span>
                  <strong className="text-3xl font-extrabold text-amber-400 mt-2 block">{inquiries.length}건</strong>
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 block font-medium">등록 공지사항</span>
                  <strong className="text-3xl font-extrabold text-white mt-2 block">{notices.length}개</strong>
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 block font-medium">등록 Q&A</span>
                  <strong className="text-3xl font-extrabold text-white mt-2 block">{qnas.length}개</strong>
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 block font-medium">갤러리 포스트</span>
                  <strong className="text-3xl font-extrabold text-white mt-2 block">{galleries.length}개</strong>
                </div>
              </div>
            </div>
          )}

          {/* SITE CONFIG TAB */}
          {activeTab === "config" && (
            <div className="space-y-6 max-w-3xl">
              <h2 className="text-2xl font-extrabold text-white">사이트 기본정보 & 환경 설정</h2>
              <p className="text-xs text-slate-400">
                여기서 수정하는 대표전화, 주소, 이메일, 사업자번호 등은 헤더, 푸터 등에 동시 반영됩니다.
              </p>

              <form onSubmit={handleConfigSave} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">사이트명</label>
                    <input
                      type="text"
                      value={config.site_name || ""}
                      onChange={(e) => setConfig({ ...config, site_name: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">한글 회사명</label>
                    <input
                      type="text"
                      value={config.company_kr_name || ""}
                      onChange={(e) => setConfig({ ...config, company_kr_name: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">대표전화 (24시)</label>
                    <input
                      type="text"
                      value={config.phone || ""}
                      onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">이메일</label>
                    <input
                      type="text"
                      value={config.email || ""}
                      onChange={(e) => setConfig({ ...config, email: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">본사 주소</label>
                  <input
                    type="text"
                    value={config.address || ""}
                    onChange={(e) => setConfig({ ...config, address: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">사업자등록번호</label>
                    <input
                      type="text"
                      value={config.business_number || ""}
                      onChange={(e) => setConfig({ ...config, business_number: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">대표자명</label>
                    <input
                      type="text"
                      value={config.ceo_name || ""}
                      onChange={(e) => setConfig({ ...config, ceo_name: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">개인정보보호책임자</label>
                    <input
                      type="text"
                      value={config.privacy_officer || ""}
                      onChange={(e) => setConfig({ ...config, privacy_officer: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-lg text-sm flex items-center gap-2 hover:bg-amber-400 shadow-md"
                >
                  <Save className="w-4 h-4" /> 사이트 정보 일괄 저장
                </button>
              </form>

              {/* ADMIN PASSWORD CHANGE FORM */}
              <form onSubmit={handlePasswordChange} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> 관리자 비밀번호 변경
                </h3>
                <p className="text-xs text-slate-400">
                  관리자 계정(admin)의 로그인 비밀번호를 변경할 수 있습니다.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">현재 비밀번호</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      placeholder="현재 비밀번호"
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">새 비밀번호</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      placeholder="새 비밀번호 (4자 이상)"
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">새 비밀번호 확인</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      placeholder="새 비밀번호 확인"
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={pwSubmitting}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-lg text-sm flex items-center gap-2 border border-slate-700 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4" /> {pwSubmitting ? "변경 중..." : "비밀번호 변경 적용"}
                </button>
              </form>
            </div>
          )}

          {/* SLIDES TAB */}
          {activeTab === "slides" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-white">메인 비주얼 슬라이드 관리</h2>

              {/* Slide List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {slides.map((s) => (
                  <div key={s.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex gap-4">
                    <img src={s.bg_image} alt={s.title} className="w-24 h-24 object-cover rounded-lg shrink-0" />
                    <div className="space-y-1 text-xs">
                      <span className="bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px]">
                        순서: {s.display_order}
                      </span>
                      <h4 className="font-bold text-sm text-white">{s.title}</h4>
                      <p className="text-slate-400">{s.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Slide Form */}
              <form onSubmit={handleAddSlide} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 max-w-2xl">
                <h3 className="font-bold text-base text-amber-400">새 메인 슬라이드 추가</h3>
                <input
                  type="text"
                  required
                  placeholder="메인 슬라이드 제목"
                  value={newSlide.title}
                  onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  required
                  placeholder="부제목"
                  value={newSlide.subtitle}
                  onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  required
                  placeholder="배경 이미지 URL (https://...)"
                  value={newSlide.bg_image}
                  onChange={(e) => setNewSlide({ ...newSlide, bg_image: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm"
                />
                <button type="submit" className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-lg text-sm">
                  슬라이드 추가
                </button>
              </form>
            </div>
          )}

          {/* NOTICES TAB */}
          {activeTab === "notices" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-white">공지사항 관리</h2>

              <form onSubmit={handleAddNotice} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 max-w-2xl">
                <h3 className="font-bold text-base text-amber-400">새 공지사항 등록</h3>
                <input
                  type="text"
                  required
                  placeholder="공지사항 제목"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm"
                />
                <textarea
                  required
                  rows={4}
                  placeholder="공지사항 상세 내용"
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm resize-none"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="important"
                    checked={newNotice.is_important}
                    onChange={(e) => setNewNotice({ ...newNotice, is_important: e.target.checked })}
                  />
                  <label htmlFor="important" className="text-xs font-bold text-amber-400">
                    상단 고정 중요 공지
                  </label>
                </div>
                <button type="submit" className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-lg text-sm">
                  공지사항 작성
                </button>
              </form>

              {/* Notice List Table */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800 text-slate-300 uppercase">
                    <tr>
                      <th className="p-3">ID</th>
                      <th className="p-3">제목</th>
                      <th className="p-3">등록일</th>
                      <th className="p-3">조회수</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {notices.map((n) => (
                      <tr key={n.id}>
                        <td className="p-3">{n.id}</td>
                        <td className="p-3 font-bold">{n.title}</td>
                        <td className="p-3">{n.created_at?.split(" ")[0]}</td>
                        <td className="p-3">{n.views}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* QNAS TAB */}
          {activeTab === "qnas" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-white">Q&A 게시판 관리 및 답변 작성</h2>
              <div className="space-y-4">
                {qnas.map((q) => (
                  <div key={q.id} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-amber-400">작성자: {q.author}</span>
                      <span className="text-slate-500">{q.created_at}</span>
                    </div>
                    <h4 className="font-bold text-base text-white">{q.title}</h4>
                    <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg">{q.content}</p>

                    {/* Answer area */}
                    <div className="pt-2">
                      {q.is_answered ? (
                        <div className="bg-amber-500/10 p-3 rounded-lg border border-amber-500/30 text-xs">
                          <strong className="text-amber-400">기존 답변:</strong> {q.answer}
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="관리자 답변 입력..."
                            onChange={(e) => setQnaAnswerInput({ ...qnaAnswerInput, [q.id]: e.target.value })}
                            className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs"
                          />
                          <button
                            onClick={() => handleAnswerQna(q.id)}
                            className="bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs"
                          >
                            답변등록
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INQUIRIES TAB */}
          {activeTab === "inquiries" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-white">온라인 문의 접수 내역</h2>
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="bg-amber-500 text-slate-950 font-bold text-xs px-2.5 py-1 rounded">
                        [{inq.type}] {inq.name} ({inq.phone})
                      </span>
                      <select
                        value={inq.status}
                        onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value)}
                        className="bg-slate-800 border border-slate-700 text-white text-xs px-2 py-1 rounded font-bold"
                      >
                        <option value="접수대기">접수대기</option>
                        <option value="상담중">상담중</option>
                        <option value="처리완료">처리완료</option>
                      </select>
                    </div>
                    <h4 className="font-bold text-base text-white">{inq.title}</h4>
                    <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg">{inq.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GALLERIES TAB */}
          {activeTab === "galleries" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-white">갤러리 추가 관리</h2>
              <form onSubmit={handleAddGallery} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 max-w-2xl">
                <input
                  type="text"
                  required
                  placeholder="갤러리 제목"
                  value={newGallery.title}
                  onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  required
                  placeholder="대표 이미지 URL"
                  value={newGallery.main_image}
                  onChange={(e) => setNewGallery({ ...newGallery, main_image: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm"
                />
                <button type="submit" className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-lg text-sm">
                  갤러리 추가
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
