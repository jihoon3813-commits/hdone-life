"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Lock, UserPlus, PhoneCall, ShieldCheck, UserCheck } from "lucide-react";

export interface HeaderProps {
  siteConfig?: {
    site_name: string;
    phone: string;
  };
}

const mainNavItems = [
  {
    name: "회사소개",
    href: "/company/greeting",
    subItems: [
      { name: "인사말", href: "/company/greeting" },
      { name: "기업이념", href: "/company/philosophy" },
    ],
  },
  {
    name: "서비스영역",
    href: "/service/funeral",
    subItems: [
      { name: "장례상품", href: "/service/funeral" },
      { name: "웨딩상품", href: "/service/wedding" },
      { name: "크루즈상품", href: "/service/cruise" },
      { name: "펫장례상품", href: "/service/pet-funeral" },
    ],
  },
  {
    name: "갤러리",
    href: "/gallery",
    subItems: [{ name: "갤러리", href: "/gallery" }],
  },
  {
    name: "온라인문의",
    href: "/inquiry",
    subItems: [{ name: "온라인문의", href: "/inquiry" }],
  },
  {
    name: "고객센터",
    href: "/customer/notice",
    subItems: [
      { name: "공지사항", href: "/customer/notice" },
      { name: "Q&A", href: "/customer/qna" },
    ],
  },
];

export default function Header({ siteConfig }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Check login state from localStorage / cookie fallback
    const loggedInUser = localStorage.getItem("hdone_user");
    if (loggedInUser) {
      try {
        const u = JSON.parse(loggedInUser);
        setIsLoggedIn(true);
        setUserRole(u.role);
      } catch (e) {
        setIsLoggedIn(false);
      }
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("hdone_user");
    setIsLoggedIn(false);
    setUserRole(null);
    window.location.href = "/";
  };

  const toggleMobileSubmenu = (menuName: string) => {
    if (expandedMobileMenu === menuName) {
      setExpandedMobileMenu(null);
    } else {
      setExpandedMobileMenu(menuName);
    }
  };

  const phoneNum = siteConfig?.phone || "1544-8826";

  return (
    <header className={`w-full z-50 transition-all duration-300 ${isScrolled ? "fixed top-0 left-0 right-0 shadow-2xl bg-slate-950/90 backdrop-blur-lg text-white" : "absolute top-0 left-0 right-0 bg-transparent text-white"}`}>
      {/* Top Utility Bar */}
      <div className="text-xs py-2.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-end items-center">
          <div className="flex items-center space-x-4 text-slate-200">
            {isLoggedIn ? (
              <>
                <Link href="/profile" className="hover:text-amber-400 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" /> 마이페이지
                </Link>
                <button onClick={handleLogout} className="hover:text-amber-400 cursor-pointer">
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-amber-400 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> 로그인
                </Link>
                <Link href="/register" className="hover:text-amber-400 flex items-center gap-1">
                  <UserPlus className="w-3.5 h-3.5" /> 회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header / GNB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-extrabold px-3 py-1.5 rounded text-xl tracking-wider shadow-md group-hover:from-amber-400 group-hover:to-amber-500 transition-all">
              HDONE
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-white tracking-widest leading-none">LIFE</span>
              <span className="text-[10px] text-slate-400 tracking-tighter mt-0.5">에치디원 라이프</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {mainNavItems.map((item) => {
              const isActive = pathname.startsWith(item.href.split("/")[1] ? `/${item.href.split("/")[1]}` : item.href);
              return (
                <div key={item.name} className="relative group py-6 px-4">
                  <Link
                    href={item.href}
                    className={`font-semibold text-base tracking-wide flex items-center gap-1 transition-colors ${
                      isActive ? "text-amber-400 font-bold" : "text-slate-100 hover:text-amber-400"
                    }`}
                  >
                    {item.name}
                  </Link>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-slate-800 text-slate-100 rounded-b-lg shadow-2xl py-2 hidden group-hover:block transition-all border border-slate-700/50">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className={`block px-5 py-2.5 text-sm transition-colors hover:bg-slate-700 hover:text-amber-400 ${
                          pathname === sub.href ? "text-amber-400 font-bold bg-slate-700/50" : "text-slate-300"
                        }`}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-3">
            <a href={`tel:${phoneNum}`} className="bg-amber-500 text-slate-950 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5" /> 전화
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-slate-800"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[112px] bg-slate-950/95 z-50 overflow-y-auto px-6 py-6 border-t border-slate-800">
          <div className="space-y-4 max-w-lg mx-auto">
            {/* Quick Mobile Auth */}
            <div className="bg-slate-900 p-4 rounded-xl flex justify-between items-center border border-slate-800 mb-6">
              {isLoggedIn ? (
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm text-slate-300">반갑습니다, 회원님</span>
                  <button onClick={handleLogout} className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700">
                    로그아웃
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 w-full justify-center">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2 bg-amber-500 text-slate-950 font-bold text-sm rounded-lg"
                  >
                    로그인
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2 bg-slate-800 text-slate-200 font-bold text-sm rounded-lg border border-slate-700"
                  >
                    회원가입
                  </Link>
                </div>
              )}
            </div>

            {/* Navigation List */}
            {mainNavItems.map((item) => (
              <div key={item.name} className="border-b border-slate-800 pb-3">
                <button
                  onClick={() => toggleMobileSubmenu(item.name)}
                  className="w-full flex justify-between items-center py-3 text-lg font-bold text-slate-100 hover:text-amber-400"
                >
                  <span>{item.name}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${expandedMobileMenu === item.name ? "rotate-180 text-amber-400" : "text-slate-400"}`} />
                </button>

                {expandedMobileMenu === item.name && (
                  <div className="pl-4 py-2 space-y-2.5 bg-slate-900/50 rounded-lg my-1">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block text-base py-1.5 transition-colors ${
                          pathname === sub.href ? "text-amber-400 font-bold" : "text-slate-300 hover:text-white"
                        }`}
                      >
                        - {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Direct Contact Phone Box */}
            <div className="mt-8 p-4 bg-gradient-to-r from-amber-500/10 to-amber-500/20 rounded-xl border border-amber-500/30 text-center">
              <p className="text-xs text-amber-400 font-medium">24시간 긴급 장례 상담전화</p>
              <a href={`tel:${phoneNum}`} className="text-xl font-extrabold text-amber-400 block mt-1">
                {phoneNum}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
