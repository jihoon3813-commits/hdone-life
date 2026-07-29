"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContactButton from "@/components/FloatingContactButton";
import PopupModal from "@/components/PopupModal";
import { ChevronLeft, ChevronRight, ArrowRight, Heart, Sparkles, PhoneCall, ShieldCheck, CheckCircle2, Send } from "lucide-react";
import { formatPhoneNumber } from "@/lib/utils";

export default function HomePage() {
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [slides, setSlides] = useState<any[]>([
    {
      id: 1,
      title: "HDONE LIFE 장례서비스",
      subtitle: "저희 HDONE LIFE는 가족처럼 모시는 정성스러운 기업입니다.\n삶의 소중한 순간, 항상 힘이 되는 파트너가 되겠습니다.",
      bg_image: "https://res.cloudinary.com/lyjyvy54/image/upload/v1785309033/ChatGPT_Image_2026%EB%85%84_7%EC%9B%94_28%EC%9D%BC_%EC%98%A4%ED%9B%84_11_01_33_1_b3b5zc.png",
      link_url: "/service/funeral",
    },
    {
      id: 2,
      title: "HDONE LIFE 웨딩서비스",
      subtitle: "생애 최고의 서비스를 모든 패키지 상품에 담아\n영원한 추억과 행복을 함께하는 웨딩의 모든 것을 준비해 드립니다.",
      bg_image: "https://res.cloudinary.com/lyjyvy54/image/upload/v1785309033/ChatGPT_Image_2026%EB%85%84_7%EC%9B%94_28%EC%9D%BC_%EC%98%A4%ED%9B%84_11_01_34_2_oupji9.png",
      link_url: "/service/wedding",
    },
    {
      id: 3,
      title: "HDONE LIFE 크루즈여행",
      subtitle: "낭만과 꿈의 크루즈 여행을 통해 다양한 공연과 이벤트로\n모든 관광을 고품격으로 누릴 수 있는 멋진 여행을 느껴보세요.",
      bg_image: "https://res.cloudinary.com/lyjyvy54/image/upload/v1785309032/ChatGPT_Image_2026%EB%85%84_7%EC%9B%94_28%EC%9D%BC_%EC%98%A4%ED%9B%84_11_01_34_3_dzkukk.png",
      link_url: "/service/cruise",
    },
    {
      id: 4,
      title: "HDONE LIFE 펫장례",
      subtitle: "평생 같이한 반려동물을 떠나보내는 펫장례의 모든 과정을\n가족과 같은 정성과 사랑으로 엄수해 드리겠습니다.",
      bg_image: "https://res.cloudinary.com/lyjyvy54/image/upload/v1785309033/ChatGPT_Image_2026%EB%85%84_7%EC%9B%94_28%EC%9D%BC_%EC%98%A4%ED%9B%84_11_01_34_4_q59ekk.png",
      link_url: "/service/pet-funeral",
    },
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [notices, setNotices] = useState<any[]>([]);
  const [qnas, setQnas] = useState<any[]>([]);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    phone: "",
    type: "장례상품",
    title: "",
    content: "",
    is_agreed: true,
  });
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  useEffect(() => {
    // Fetch site config
    fetch("/api/site-config")
      .then((res) => res.json())
      .then((data) => data.success && setSiteConfig(data.config))
      .catch(() => {});

    // Fetch slides
    fetch("/api/slides")
      .then((res) => res.json())
      .then((data) => data.success && setSlides(data.slides))
      .catch(() => {});

    // Fetch notices
    fetch("/api/notices?limit=5")
      .then((res) => res.json())
      .then((data) => data.success && setNotices(data.notices))
      .catch(() => {});

    // Fetch QNAs
    fetch("/api/qnas?limit=5")
      .then((res) => res.json())
      .then((data) => data.success && setQnas(data.qnas))
      .catch(() => {});
  }, []);

  // Slide autoplay
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.phone || !inquiryForm.title || !inquiryForm.content) {
      alert("필수 상담 정보를 모두 입력해 주세요.");
      return;
    }
    setInquirySubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiryForm),
      });
      const data = await res.json();
      if (data.success) {
        setInquirySuccess(true);
        setInquiryForm({ name: "", phone: "", type: "장례상품", title: "", content: "", is_agreed: true });
        setTimeout(() => setInquirySuccess(false), 5000);
      } else {
        alert(data.error || "접수 실패");
      }
    } catch (e) {
      alert("서버 통신 오류가 발생했습니다.");
    } finally {
      setInquirySubmitting(false);
    }
  };

  const services = [
    {
      title: "장례상품",
      desc: "품격 있고 정성스러운 후불제 장례서비스. 정직한 용품과 전문 인력으로 모십니다.",
      image: "https://res.cloudinary.com/lyjyvy54/image/upload/v1785313684/ChatGPT_Image_2026%EB%85%84_7%EC%9B%94_29%EC%9D%BC_%EC%98%A4%EC%A0%84_09_15_50_1_1_klajob.png",
      href: "/service/funeral",
      badge: "후불제 장례",
    },
    {
      title: "웨딩상품",
      desc: "드레스, 턱시도, 메이크업부터 본식 촬영까지. 하나뿐인 완벽한 웨딩의 시작.",
      image: "https://res.cloudinary.com/lyjyvy54/image/upload/v1785313684/ChatGPT_Image_2026%EB%85%84_7%EC%9B%94_29%EC%9D%BC_%EC%98%A4%EC%A0%84_09_15_51_2_1_hx5kxp.png",
      href: "/service/wedding",
      badge: "고품격 웨딩",
    },
    {
      title: "크루즈상품",
      desc: "낭만과 꿈의 해외 크루즈 여행. HDONE LIFE 회원만을 위한 스페셜 할인 혜택.",
      image: "https://res.cloudinary.com/lyjyvy54/image/upload/v1785313684/ChatGPT_Image_2026%EB%85%84_7%EC%9B%94_29%EC%9D%BC_%EC%98%A4%EC%A0%84_09_15_51_3_1_a0kkgd.png",
      href: "/service/cruise",
      badge: "럭셔리 여행",
    },
    {
      title: "펫장례상품",
      desc: "소중한 반려동물의 마지막 길을 가족과 같은 사랑과 정성으로 따뜻하게 배웅합니다.",
      image: "https://res.cloudinary.com/lyjyvy54/image/upload/v1785313683/ChatGPT_Image_2026%EB%85%84_7%EC%9B%94_29%EC%9D%BC_%EC%98%A4%EC%A0%84_09_15_52_4_1_gfyoqb.png",
      href: "/service/pet-funeral",
      badge: "반려동물 케어",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header siteConfig={siteConfig} />
      <PopupModal />

      {/* 4.3 메인 비주얼 슬라이더 */}
      <section className="relative w-full bg-slate-950 overflow-hidden min-h-[580px] sm:min-h-[680px] flex items-center">
        {slides.map((slide, idx) => (
          <div
            key={slide.id || idx}
            className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${
              idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-10000"
              style={{ backgroundImage: `url(${slide.bg_image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent" />
            </div>

            {/* Slide Text Content */}
            <div className="relative max-w-7xl mx-auto px-6 sm:px-12 w-full text-white space-y-4 pt-36 pb-20 sm:pt-44 sm:pb-24">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight max-w-3xl whitespace-pre-line">
                {slide.title}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base font-normal max-w-2xl whitespace-pre-line leading-relaxed">
                {slide.subtitle}
              </p>
              <div className="pt-4">
                <Link
                  href={slide.link_url}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/60 hover:border-amber-400 text-white hover:text-amber-400 font-semibold rounded-sm text-sm sm:text-base transition-all bg-black/20 hover:bg-black/40 backdrop-blur-sm group"
                >
                  자세히 보기 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Controls */}
        {slides.length > 1 && (
          <>
            <button
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white border border-slate-700/50 backdrop-blur transition-all"
              aria-label="이전 슬라이드"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white border border-slate-700/50 backdrop-blur transition-all"
              aria-label="다음 슬라이드"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Pagination Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 transition-all rounded-sm ${idx === currentSlide ? "w-8 bg-amber-400" : "w-2.5 bg-white/40"}`}
                  aria-label={`슬라이드 ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* 4.4 서비스영역 (장례, 웨딩, 크루즈, 펫장례) */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center space-y-3 mb-14">
            <span className="text-amber-600 font-bold text-xs tracking-widest uppercase">OUR SERVICES</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">HDONE LIFE 서비스 안내</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              정직과 신뢰를 바탕으로 삶의 중요한 모든 순간을 소중히 모십니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-slate-700">
                    {item.badge}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900 group-hover:text-amber-600 pt-2 border-t border-slate-100"
                  >
                    상세보기 <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.5 ABOUT US 영역 */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-amber-400 font-bold text-xs tracking-widest uppercase">ABOUT US</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
              고객중심의 서비스 <br />
              <span className="text-amber-400">24시간</span> 고객님만을 생각하는 파트너
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              고객이 먼저 자랑하는 기업! 최상의 서비스와 진정성 있는 전달력으로 고객 만족에 앞장서겠습니다. 가족과 같은 따뜻한 정성과 깊은 이해로 든든한 동반자가 되어 드립니다.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
                <ShieldCheck className="w-8 h-8 text-amber-400 mb-2" />
                <h4 className="font-bold text-white text-base">신뢰와 정직</h4>
                <p className="text-xs text-slate-400 mt-1">투명한 정찰가격 및 불필요한 추가금 0원</p>
              </div>
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
                <CheckCircle2 className="w-8 h-8 text-amber-400 mb-2" />
                <h4 className="font-bold text-white text-base">24시 대기 시스템</h4>
                <p className="text-xs text-slate-400 mt-1">365일 언제나 전문 의전팀 즉시 출동</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/company/greeting"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-all"
              >
                인사말 바로가기 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-3xl overflow-hidden border-4 border-slate-800 shadow-2xl aspect-square w-full">
              <img
                src="https://res.cloudinary.com/lyjyvy54/image/upload/v1785308930/ChatGPT_Image_2026%EB%85%84_7%EC%9B%94_29%EC%9D%BC_%EC%98%A4%ED%9B%84_03_50_36_ahhran.png"
                alt="HDONE LIFE 소개"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4.6 공지사항 & Q&A 커뮤니티 영역 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center space-y-2 mb-12">
            <span className="text-amber-600 font-bold text-xs tracking-widest uppercase">COMMUNITY</span>
            <h2 className="text-3xl font-extrabold text-slate-900">HDONE LIFE 소식 및 문의</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Notice Section */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> 공지사항 (Notice)
                  </h3>
                  <Link href="/customer/notice" className="text-xs text-slate-500 hover:text-amber-600 font-semibold">
                    전체보기 +
                  </Link>
                </div>

                <div className="space-y-3">
                  {notices.length > 0 ? (
                    notices.map((n) => (
                      <Link
                        key={n.id}
                        href={`/customer/notice/${n.id}`}
                        className="flex items-center justify-between py-2 text-sm text-slate-700 hover:text-amber-600 group transition-colors"
                      >
                        <span className="truncate pr-4 flex items-center gap-2">
                          {n.is_important === 1 && (
                            <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded">
                              중요
                            </span>
                          )}
                          <span className="group-hover:underline">{n.title}</span>
                        </span>
                        <span className="text-xs text-slate-400 whitespace-nowrap">
                          {n.created_at?.split(" ")[0]}
                        </span>
                      </Link>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 py-4">등록된 공지사항이 없습니다.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Q&A Section */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-900" /> 자주하는 질문 (Q&A)
                  </h3>
                  <Link href="/customer/qna" className="text-xs text-slate-500 hover:text-amber-600 font-semibold">
                    전체보기 +
                  </Link>
                </div>

                <div className="space-y-3">
                  {qnas.length > 0 ? (
                    qnas.map((q) => (
                      <Link
                        key={q.id}
                        href={`/customer/qna/${q.id}`}
                        className="flex items-center justify-between py-2 text-sm text-slate-700 hover:text-amber-600 group transition-colors"
                      >
                        <span className="truncate pr-4 flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              q.is_answered ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-600"
                            }`}
                          >
                            {q.is_answered ? "답변완료" : "답변대기"}
                          </span>
                          <span className="group-hover:underline">{q.title}</span>
                        </span>
                        <span className="text-xs text-slate-400 whitespace-nowrap">
                          {q.created_at?.split(" ")[0]}
                        </span>
                      </Link>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 py-4">등록된 Q&A가 없습니다.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.7 빠른 상담 유도 영역 */}
      <section className="py-20 bg-slate-950 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-amber-400 font-bold text-xs tracking-widest uppercase">FAST INQUIRY</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              궁금하신 사항이 있으신가요? <br />
              <span className="text-amber-400">1:1 빠른 온라인 상담</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              성함과 연락처를 남겨주시면 전문 상담사가 내용을 확인 후 친절하고 신속하게 답변해 드리겠습니다.
            </p>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs text-slate-400 block font-medium">24시간 직통 전화 상담</span>
              <a href={`tel:${siteConfig?.phone || "1544-8826"}`} className="text-2xl sm:text-3xl font-extrabold text-amber-400 flex items-center gap-2">
                <PhoneCall className="w-7 h-7" /> {siteConfig?.phone || "1544-8826"}
              </a>
              <p className="text-xs text-slate-500">※ 긴급 장례의 경우 바로 전화 상담을 이용하시기 바랍니다.</p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl">
            {inquirySuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">상담 접수가 완료되었습니다.</h3>
                <p className="text-slate-400 text-sm">전문 담당자가 확인 후 조속히 연락드리겠습니다.</p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">성함 *</label>
                    <input
                      type="text"
                      required
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      placeholder="성함을 입력하세요"
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">연락처 *</label>
                    <input
                      type="tel"
                      required
                      maxLength={13}
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: formatPhoneNumber(e.target.value) })}
                      placeholder="010-0000-0000"
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">문의 분야 *</label>
                    <select
                      value={inquiryForm.type}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, type: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                    >
                      <option value="장례상품">장례상품</option>
                      <option value="웨딩상품">웨딩상품</option>
                      <option value="크루즈상품">크루즈상품</option>
                      <option value="펫장례상품">펫장례상품</option>
                      <option value="기타문의">기타문의</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">제목 *</label>
                    <input
                      type="text"
                      required
                      value={inquiryForm.title}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, title: e.target.value })}
                      placeholder="문의 제목을 입력하세요"
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">문의 내용 *</label>
                  <textarea
                    required
                    rows={3}
                    value={inquiryForm.content}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, content: e.target.value })}
                    placeholder="상세 문의 내용을 작성해 주세요"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="agreed"
                    checked={inquiryForm.is_agreed}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, is_agreed: e.target.checked })}
                    className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-amber-400"
                  />
                  <label htmlFor="agreed" className="text-xs text-slate-400">
                    개인정보 수집 및 이용에 동의합니다.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={inquirySubmitting}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 text-base transition-all"
                >
                  <Send className="w-4 h-4" /> {inquirySubmitting ? "접수 중..." : "상담 신청하기"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer siteConfig={siteConfig} />
      <FloatingContactButton phone={siteConfig?.phone} />
    </div>
  );
}
