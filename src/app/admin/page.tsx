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
  Upload,
  Search,
  Filter,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  UserCheck,
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

  // Inquiry filter & search states
  const [inquiryFilter, setInquiryFilter] = useState<string>("전체");
  const [inquirySearch, setInquirySearch] = useState<string>("");
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  // Form states
  const [newSlide, setNewSlide] = useState({ title: "", subtitle: "", bg_image: "", link_url: "/service/funeral", display_order: 1 });
  const [newNotice, setNewNotice] = useState({ title: "", content: "", is_important: false });
  const [newGallery, setNewGallery] = useState({ title: "", content: "", main_image: "" });
  const [qnaAnswerInput, setQnaAnswerInput] = useState<{ [key: number]: string }>({});
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [pwSubmitting, setPwSubmitting] = useState(false);

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
    if (d.success) {
      loadAllData();
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status });
      }
    }
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
      alert("갤러리가 성공적으로 추가되었습니다.");
      setNewGallery({ title: "", content: "", main_image: "" });
      loadAllData();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("hdone_user");
    window.location.href = "/";
  };

  if (!adminUser) return null;

  // Filtered inquiries logic
  const filteredInquiries = inquiries.filter((item) => {
    const matchesFilter = inquiryFilter === "전체" || item.status === inquiryFilter;
    const matchesSearch =
      inquirySearch === "" ||
      item.name?.includes(inquirySearch) ||
      item.phone?.includes(inquirySearch) ||
      item.title?.includes(inquirySearch) ||
      item.type?.includes(inquirySearch);
    return matchesFilter && matchesSearch;
  });

  const pendingCount = inquiries.filter((i) => i.status === "접수대기").length;
  const processingCount = inquiries.filter((i) => i.status === "상담중").length;
  const completedCount = inquiries.filter((i) => i.status === "처리완료").length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 text-slate-800 font-sans">
      {/* Modern Bright Header */}
      <header className="bg-white border-b border-slate-200/90 px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <img
            src="https://res.cloudinary.com/lyjyvy54/image/upload/v1785311356/Vector_kau2qp.png"
            alt="HDONE LIFE 로고"
            className="h-7 w-auto object-contain"
          />
          <span className="font-extrabold text-base text-slate-900 tracking-tight">ADMIN CMS</span>
          <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200/80 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Operational
          </span>
        </div>

        <div className="flex items-center space-x-5">
          <Link
            href="/"
            target="_blank"
            className="text-xs font-semibold text-slate-600 hover:text-amber-600 transition-colors flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/70 px-3 py-1.5 rounded-lg border border-slate-200"
          >
            <span>웹사이트 바로가기</span> <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <div className="h-4 w-px bg-slate-200"></div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-amber-500/10 text-amber-700 font-bold flex items-center justify-center text-xs border border-amber-300">
              A
            </div>
            <span className="text-xs font-bold text-slate-700">{adminUser.name || "관리자"}님</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg font-bold transition-all border border-rose-100 flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" /> 로그아웃
          </button>
        </div>
      </header>

      {/* Admin Body Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Modern Bright Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200/90 p-4 space-y-1.5 shrink-0 shadow-xs">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">메인 메뉴</div>

          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === "dashboard"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4" /> 대시보드 개요
            </span>
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === "inquiries"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4" /> 온라인 문의 관리
            </span>
            {pendingCount > 0 && (
              <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${activeTab === "inquiries" ? "bg-slate-950 text-amber-400" : "bg-amber-500 text-slate-950"}`}>
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("galleries")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === "galleries"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <ImageIcon className="w-4 h-4" /> 갤러리 관리
            </span>
          </button>

          <button
            onClick={() => setActiveTab("slides")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === "slides"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <SlidersHorizontal className="w-4 h-4" /> 메인 슬라이드 관리
            </span>
          </button>

          <button
            onClick={() => setActiveTab("notices")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === "notices"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <FileText className="w-4 h-4" /> 공지사항 관리
            </span>
          </button>

          <button
            onClick={() => setActiveTab("qnas")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === "qnas"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <HelpCircle className="w-4 h-4" /> Q&A 게시판 관리
            </span>
          </button>

          <div className="pt-4 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">환경 설정</div>

          <button
            onClick={() => setActiveTab("config")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === "config"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Settings className="w-4 h-4" /> 사이트 정보 & 비번 변경
            </span>
          </button>
        </aside>

        {/* Content Workspace Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 max-w-6xl">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">HDONE LIFE CMS 대시보드</h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">전체 사이트 데이터 통합 운영 현황입니다.</p>
              </div>

              {/* Metric Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
                  <div>
                    <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">접수된 문의</span>
                    <strong className="text-3xl font-black text-amber-600 mt-1 block">{inquiries.length}건</strong>
                    <span className="text-[11px] text-amber-700 font-semibold mt-1 inline-block bg-amber-50 px-2 py-0.5 rounded">
                      미처리 대기 {pendingCount}건
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center border border-amber-200">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
                  <div>
                    <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">공지사항 게시물</span>
                    <strong className="text-3xl font-black text-slate-900 mt-1 block">{notices.length}개</strong>
                    <span className="text-[11px] text-slate-500 font-medium mt-1 inline-block">최신 소식 등록됨</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center border border-blue-200">
                    <FileText className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
                  <div>
                    <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">Q&A 문의내역</span>
                    <strong className="text-3xl font-black text-slate-900 mt-1 block">{qnas.length}개</strong>
                    <span className="text-[11px] text-slate-500 font-medium mt-1 inline-block">고객 질의응답 현황</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-200">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
                  <div>
                    <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">갤러리 포스트</span>
                    <strong className="text-3xl font-black text-slate-900 mt-1 block">{galleries.length}개</strong>
                    <span className="text-[11px] text-purple-700 font-semibold mt-1 inline-block bg-purple-50 px-2 py-0.5 rounded">
                      행사 현장 사진
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center border border-purple-200">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Inquiries */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-slate-900">최근 접수된 온라인 문의</h3>
                  <button
                    onClick={() => setActiveTab("inquiries")}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                  >
                    전체 보기 <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">상태</th>
                        <th className="py-3 px-4">구분</th>
                        <th className="py-3 px-4">고객명</th>
                        <th className="py-3 px-4">연락처</th>
                        <th className="py-3 px-4">제목</th>
                        <th className="py-3 px-4">접수일</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {inquiries.slice(0, 5).map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                                inq.status === "접수대기"
                                  ? "bg-amber-50 text-amber-800 border-amber-200"
                                  : inq.status === "상담중"
                                  ? "bg-sky-50 text-sky-800 border-sky-200"
                                  : "bg-emerald-50 text-emerald-800 border-emerald-200"
                              }`}
                            >
                              {inq.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-800">{inq.type}</td>
                          <td className="py-3 px-4 font-bold text-slate-900">{inq.name}</td>
                          <td className="py-3 px-4 text-slate-600">{inq.phone}</td>
                          <td className="py-3 px-4 font-medium text-slate-800">{inq.title}</td>
                          <td className="py-3 px-4 text-slate-500">{inq.created_at?.split(" ")[0]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ONLINE INQUIRIES TAB - SLEEK BRIGHT TABLE DESIGN */}
          {activeTab === "inquiries" && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">온라인 문의 접수 내역</h2>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    고객님이 사이트에서 신청하신 1:1 서비스 상담 접수 리스트입니다.
                  </p>
                </div>
              </div>

              {/* Status Filter Tabs & Search Bar Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Filter Pills */}
                <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {["전체", "접수대기", "상담중", "처리완료"].map((statusStr) => {
                    const count =
                      statusStr === "전체"
                        ? inquiries.length
                        : statusStr === "접수대기"
                        ? pendingCount
                        : statusStr === "상담중"
                        ? processingCount
                        : completedCount;
                    return (
                      <button
                        key={statusStr}
                        onClick={() => setInquiryFilter(statusStr)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                          inquiryFilter === statusStr
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        <span>{statusStr}</span>
                        <span
                          className={`px-1.5 py-0.2 text-[10px] rounded-full font-extrabold ${
                            inquiryFilter === statusStr ? "bg-amber-400 text-slate-950" : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="고객명, 연락처, 제목 검색..."
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Sleek Data Table */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
                {filteredInquiries.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 text-xs font-medium space-y-2">
                    <MessageSquare className="w-8 h-8 mx-auto text-slate-300" />
                    <p>조건에 부합하는 문의 내역이 없습니다.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-slate-50/90 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200 text-[11px]">
                        <tr>
                          <th className="py-3.5 px-5 w-16">ID</th>
                          <th className="py-3.5 px-5">진행상태</th>
                          <th className="py-3.5 px-5">서비스 구분</th>
                          <th className="py-3.5 px-5">고객명</th>
                          <th className="py-3.5 px-5">연락처</th>
                          <th className="py-3.5 px-5">문의 제목</th>
                          <th className="py-3.5 px-5">접수 일시</th>
                          <th className="py-3.5 px-5 text-right">상태 변경 / 상세보기</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredInquiries.map((inq) => (
                          <tr
                            key={inq.id}
                            className="hover:bg-amber-50/30 transition-colors cursor-pointer"
                            onClick={() => setSelectedInquiry(inq)}
                          >
                            <td className="py-4 px-5 text-slate-400 font-mono font-bold">#{inq.id}</td>
                            <td className="py-4 px-5">
                              <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${
                                  inq.status === "접수대기"
                                    ? "bg-amber-100 text-amber-900 border-amber-300"
                                    : inq.status === "상담중"
                                    ? "bg-sky-100 text-sky-900 border-sky-300"
                                    : "bg-emerald-100 text-emerald-900 border-emerald-300"
                                }`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    inq.status === "접수대기"
                                      ? "bg-amber-500"
                                      : inq.status === "상담중"
                                      ? "bg-sky-500"
                                      : "bg-emerald-500"
                                  }`}
                                ></span>
                                {inq.status}
                              </span>
                            </td>
                            <td className="py-4 px-5">
                              <span className="bg-slate-100 text-slate-800 font-bold px-2.5 py-1 rounded-md text-xs border border-slate-200">
                                {inq.type}
                              </span>
                            </td>
                            <td className="py-4 px-5 font-bold text-slate-900 text-sm">{inq.name}</td>
                            <td className="py-4 px-5 font-mono text-slate-700 font-semibold">{inq.phone}</td>
                            <td className="py-4 px-5 font-medium text-slate-800 max-w-xs truncate">{inq.title}</td>
                            <td className="py-4 px-5 text-slate-500 text-[11px]">{inq.created_at}</td>
                            <td className="py-4 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-2">
                                <select
                                  value={inq.status}
                                  onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value)}
                                  className="bg-white border border-slate-300 text-slate-900 text-xs px-2.5 py-1.5 rounded-lg font-bold focus:outline-none focus:border-amber-500 shadow-2xs"
                                >
                                  <option value="접수대기">접수대기</option>
                                  <option value="상담중">상담중</option>
                                  <option value="처리완료">처리완료</option>
                                </select>
                                <button
                                  onClick={() => setSelectedInquiry(inq)}
                                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all"
                                  title="상세보기"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Modal / Drawer for Detailed Inquiry View */}
              {selectedInquiry && (
                <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in duration-200">
                    <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                      <div>
                        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">온라인 문의 상세보기 #{selectedInquiry.id}</span>
                        <h3 className="text-xl font-bold text-slate-900 mt-1">{selectedInquiry.title}</h3>
                      </div>
                      <button
                        onClick={() => setSelectedInquiry(null)}
                        className="text-slate-400 hover:text-slate-600 font-bold p-1 text-lg rounded-lg"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-slate-400 block font-semibold">신청 고객명</span>
                        <strong className="text-sm font-bold text-slate-900">{selectedInquiry.name}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold">연락처</span>
                        <strong className="text-sm font-bold text-slate-900 font-mono">{selectedInquiry.phone}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold">문의 상품</span>
                        <span className="inline-block mt-0.5 px-2 py-0.5 bg-slate-200 font-bold text-slate-800 rounded">{selectedInquiry.type}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold">접수 일시</span>
                        <span className="text-slate-700 font-medium">{selectedInquiry.created_at}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-700">문의 상세 내용</span>
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs text-slate-800 leading-relaxed whitespace-pre-line min-h-[100px]">
                        {selectedInquiry.content}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-700">처리 상태 변경:</span>
                        <select
                          value={selectedInquiry.status}
                          onChange={(e) => handleInquiryStatusChange(selectedInquiry.id, e.target.value)}
                          className="bg-white border border-slate-300 text-slate-900 text-xs px-3 py-1.5 rounded-lg font-bold focus:outline-none focus:border-amber-500"
                        >
                          <option value="접수대기">접수대기</option>
                          <option value="상담중">상담중</option>
                          <option value="처리완료">처리완료</option>
                        </select>
                      </div>

                      <button
                        onClick={() => setSelectedInquiry(null)}
                        className="px-5 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800"
                      >
                        닫기
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* GALLERIES TAB - BRIGHT DESIGN */}
          {activeTab === "galleries" && (
            <div className="space-y-8 max-w-4xl">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">갤러리 추가 및 게시물 관리</h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">내 컴퓨터에서 이미지 파일을 선택하여 직접 업로드하거나 URL을 입력하여 등록하세요.</p>
              </div>

              {/* Add Gallery Form */}
              <form onSubmit={handleAddGallery} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-6">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <PlusCircle className="w-5 h-5 text-amber-500" /> 새 갤러리 게시물 등록
                </h3>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">갤러리 제목 *</label>
                  <input
                    type="text"
                    required
                    placeholder="예: HDONE LIFE 고품격 전문 장례 행사 진행 현장"
                    value={newGallery.title}
                    onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">상세 설명 / 내용</label>
                  <textarea
                    rows={3}
                    placeholder="갤러리 상세 내용을 입력하세요."
                    value={newGallery.content}
                    onChange={(e) => setNewGallery({ ...newGallery, content: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 resize-none transition-all"
                  />
                </div>

                {/* Image Upload / URL Input Box */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700">대표 이미지 등록 (파일 업로드 / URL) *</label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Local File Upload Button */}
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-amber-500 bg-slate-50/80 hover:bg-amber-50/30 rounded-2xl p-6 cursor-pointer transition-all text-center group">
                      <Upload className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform mb-2" />
                      <span className="text-xs font-bold text-slate-800">내 PC에서 이미지 파일 선택</span>
                      <span className="text-[11px] text-slate-500 mt-1">PNG, JPG, WEBP 지원</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              if (typeof reader.result === "string") {
                                setNewGallery((prev) => ({ ...prev, main_image: reader.result as string }));
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>

                    {/* Direct URL Input */}
                    <div className="flex flex-col justify-center space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <span className="text-xs font-semibold text-slate-600">또는 이미지 웹 URL 직접 입력:</span>
                      <input
                        type="text"
                        placeholder="https://..."
                        value={newGallery.main_image}
                        onChange={(e) => setNewGallery({ ...newGallery, main_image: e.target.value })}
                        className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Image Preview Thumbnail */}
                  {newGallery.main_image && (
                    <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-4">
                      <img
                        src={newGallery.main_image}
                        alt="업로드 이미지 미리보기"
                        className="w-24 h-20 object-cover rounded-xl border border-slate-300 shadow-xs shrink-0"
                      />
                      <div className="flex-1 overflow-hidden">
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> 이미지 선택 완료
                        </span>
                        <p className="text-[11px] text-slate-500 truncate mt-1">{newGallery.main_image.substring(0, 80)}...</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setNewGallery({ ...newGallery, main_image: "" })}
                        className="text-xs text-rose-600 hover:bg-rose-100 font-bold px-3 py-1.5 bg-rose-50 rounded-lg border border-rose-200"
                      >
                        지우기
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!newGallery.title || !newGallery.main_image}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" /> 갤러리 등록 완료
                </button>
              </form>

              {/* Registered Gallery List */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-slate-900">등록된 갤러리 목록 ({galleries.length}개)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {galleries.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all">
                      <div className="h-44 overflow-hidden relative bg-slate-100">
                        <img src={item.main_image} alt={item.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 right-3 bg-slate-900/80 text-amber-400 font-bold text-[10px] px-2.5 py-1 rounded-full backdrop-blur-xs">
                          {item.created_at?.split(" ")[0]}
                        </span>
                      </div>
                      <div className="p-5 space-y-2">
                        <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{item.title}</h4>
                        {item.content && <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{item.content}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SLIDES TAB */}
          {activeTab === "slides" && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">메인 슬라이드 관리</h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">메인 화면 상단 히어로 슬라이드 이미지를 추가합니다.</p>
              </div>

              <form onSubmit={handleAddSlide} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-4 max-w-2xl">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <PlusCircle className="w-5 h-5 text-amber-500" /> 새 슬라이드 추가
                </h3>
                <input
                  type="text"
                  required
                  placeholder="슬라이드 제목"
                  value={newSlide.title}
                  onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                />
                <input
                  type="text"
                  placeholder="부제목 (선택사항)"
                  value={newSlide.subtitle}
                  onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                />
                <input
                  type="text"
                  required
                  placeholder="배경 이미지 URL (https://...)"
                  value={newSlide.bg_image}
                  onChange={(e) => setNewSlide({ ...newSlide, bg_image: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                />
                <button type="submit" className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm shadow-md">
                  슬라이드 추가
                </button>
              </form>
            </div>
          )}

          {/* NOTICES TAB */}
          {activeTab === "notices" && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">공지사항 관리</h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">사이트 주요 안내사항 게시물을 작성 및 수정합니다.</p>
              </div>

              <form onSubmit={handleAddNotice} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-4 max-w-2xl">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <PlusCircle className="w-5 h-5 text-amber-500" /> 새 공지사항 작성
                </h3>
                <input
                  type="text"
                  required
                  placeholder="공지사항 제목"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                />
                <textarea
                  required
                  rows={4}
                  placeholder="공지사항 상세 내용"
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 resize-none"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="important"
                    checked={newNotice.is_important}
                    onChange={(e) => setNewNotice({ ...newNotice, is_important: e.target.checked })}
                    className="w-4 h-4 text-amber-500 rounded"
                  />
                  <label htmlFor="important" className="text-xs font-bold text-amber-700">
                    상단 고정 중요 공지
                  </label>
                </div>
                <button type="submit" className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm shadow-md">
                  공지사항 작성 완료
                </button>
              </form>

              {/* Notice Table */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-200">
                    <tr>
                      <th className="p-4">ID</th>
                      <th className="p-4">제목</th>
                      <th className="p-4">등록일</th>
                      <th className="p-4">조회수</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {notices.map((n) => (
                      <tr key={n.id} className="hover:bg-slate-50/80">
                        <td className="p-4 font-mono font-bold text-slate-400">#{n.id}</td>
                        <td className="p-4 font-bold text-slate-900">{n.title}</td>
                        <td className="p-4 text-slate-500">{n.created_at?.split(" ")[0]}</td>
                        <td className="p-4 font-semibold text-slate-700">{n.views}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* QNAS TAB */}
          {activeTab === "qnas" && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Q&A 게시판 관리 및 답변 작성</h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">고객 질문 내역을 확인하고 답글을 등록합니다.</p>
              </div>

              <div className="space-y-4">
                {qnas.map((q) => (
                  <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                        작성자: {q.author}
                      </span>
                      <span className="text-slate-400 font-medium">{q.created_at}</span>
                    </div>
                    <h4 className="font-bold text-base text-slate-900">{q.title}</h4>
                    <p className="text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200/80 leading-relaxed">
                      {q.content}
                    </p>

                    {/* Answer area */}
                    <div className="pt-2">
                      {q.is_answered ? (
                        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                          <strong className="text-emerald-700 font-bold block mb-1">✓ 기존 관리자 답변:</strong> {q.answer}
                        </div>
                      ) : (
                        <div className="flex gap-3">
                          <input
                            type="text"
                            placeholder="관리자 답변 입력..."
                            onChange={(e) => setQnaAnswerInput({ ...qnaAnswerInput, [q.id]: e.target.value })}
                            className="flex-1 bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-amber-500 focus:bg-white"
                          />
                          <button
                            onClick={() => handleAnswerQna(q.id)}
                            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs shadow-md shrink-0"
                          >
                            답변 등록
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SITE CONFIG & PASSWORD CHANGE TAB */}
          {activeTab === "config" && (
            <div className="space-y-8 max-w-4xl">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">사이트 기본정보 & 관리자 보안 설정</h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  대표전화, 주소, 이메일 등 회사 정보와 관리자 로그인 비밀번호를 변경합니다.
                </p>
              </div>

              <form onSubmit={handleConfigSave} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-5">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Settings className="w-5 h-5 text-amber-500" /> 기본 사이트 정보 설정
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">사이트명</label>
                    <input
                      type="text"
                      value={config.site_name || ""}
                      onChange={(e) => setConfig({ ...config, site_name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">한글 회사명</label>
                    <input
                      type="text"
                      value={config.company_kr_name || ""}
                      onChange={(e) => setConfig({ ...config, company_kr_name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">대표전화 (24시)</label>
                    <input
                      type="text"
                      value={config.phone || ""}
                      onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">이메일</label>
                    <input
                      type="text"
                      value={config.email || ""}
                      onChange={(e) => setConfig({ ...config, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">본사 주소</label>
                  <input
                    type="text"
                    value={config.address || ""}
                    onChange={(e) => setConfig({ ...config, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">사업자등록번호</label>
                    <input
                      type="text"
                      value={config.business_number || ""}
                      onChange={(e) => setConfig({ ...config, business_number: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">대표자명</label>
                    <input
                      type="text"
                      value={config.ceo_name || ""}
                      onChange={(e) => setConfig({ ...config, ceo_name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">개인정보보호책임자</label>
                    <input
                      type="text"
                      value={config.privacy_officer || ""}
                      onChange={(e) => setConfig({ ...config, privacy_officer: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm flex items-center gap-2 shadow-md"
                >
                  <Save className="w-4 h-4" /> 사이트 정보 일괄 저장
                </button>
              </form>

              {/* ADMIN PASSWORD CHANGE FORM */}
              <form onSubmit={handlePasswordChange} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <ShieldCheck className="w-5 h-5 text-amber-500" /> 관리자 비밀번호 변경
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">현재 비밀번호</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      placeholder="현재 비밀번호"
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">새 비밀번호</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      placeholder="새 비밀번호 (4자 이상)"
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">새 비밀번호 확인</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      placeholder="새 비밀번호 확인"
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={pwSubmitting}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm shadow-md"
                >
                  {pwSubmitting ? "비밀번호 변경 처리 중..." : "비밀번호 변경 완료"}
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
