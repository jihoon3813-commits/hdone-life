"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubVisual from "@/components/SubVisual";
import FloatingContactButton from "@/components/FloatingContactButton";
import { ShieldCheck, PhoneCall, AlertCircle, Send } from "lucide-react";

const subNavItems = [
  { name: "장례상품", href: "/service/funeral" },
  { name: "웨딩상품", href: "/service/wedding" },
  { name: "크루즈상품", href: "/service/cruise" },
  { name: "펫장례상품", href: "/service/pet-funeral" },
];

export default function FuneralServicePage() {
  const [siteConfig, setSiteConfig] = useState<any>(null);

  useEffect(() => {
    fetch("/api/site-config")
      .then((res) => res.json())
      .then((data) => data.success && setSiteConfig(data.config))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header siteConfig={siteConfig} />

      <SubVisual
        title="장례상품"
        subtitle="예와 정성을 다하여 모시는 HDONE LIFE 후불제 장례 서비스"
        categoryName="서비스 안내"
        currentPageName="장례상품"
        subItems={subNavItems}
        bgImage="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-8 w-full flex-1 space-y-16">
        {/* Intro Banner with Background Image */}
        <div className="text-white rounded-sm p-8 sm:p-12 shadow-2xl relative overflow-hidden min-h-[360px] flex items-center">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://res.cloudinary.com/lyjyvy54/image/upload/v1785308928/ChatGPT_Image_2026%EB%85%84_7%EC%9B%94_29%EC%9D%BC_%EC%98%A4%ED%9B%84_03_38_13_1_1_mpokg4.png"
              alt="장례 서비스 안내"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40" />
          </div>

          <div className="space-y-4 max-w-2xl relative z-10">
            <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-sm text-xs font-bold">
              후불제 장례 프리미엄 396만원 상품
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              가족과 같은 마음으로 <br />
              처음부터 끝까지 정성을 다하겠습니다.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              HDONE LIFE 후불제 장례는 매월 납입하는 부담 없이 임종 시 연락 한 통으로 앰블런스 이송부터 장례 지도, 입관, 발인까지 종합 전담 케어를 제공합니다.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={`tel:${siteConfig?.phone || "1544-8826"}`}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-sm flex items-center gap-2 text-sm transition-all shadow-lg"
              >
                <PhoneCall className="w-4 h-4" /> 24시 긴급상담 {siteConfig?.phone || "1544-8826"}
              </a>
              <Link
                href="/inquiry"
                className="bg-slate-900/80 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-sm flex items-center gap-2 text-sm border border-slate-700/80 transition-all backdrop-blur-sm shadow-lg"
              >
                <Send className="w-4 h-4 text-amber-400" /> 1:1 온라인 문의
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Items Table (Updated as per user's image) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">PREMIUM PACKAGE (396만원)</span>
              <h3 className="text-2xl font-bold text-slate-900">장례 서비스 세부 제공 내역</h3>
            </div>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">※ PC/모바일 수평 스크롤 가능</span>
          </div>

          <div className="overflow-x-auto rounded-sm border border-[#2b4c80] shadow-sm table-custom-scroll">
            <table className="w-full text-center border-collapse min-w-[720px] text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#000865] text-white font-bold text-sm">
                  <th colSpan={3} className="py-3 px-4 border border-[#2b4c80] w-[45%]">
                    품 목 (프리미엄상품 396만원)
                  </th>
                  <th colSpan={1} className="py-3 px-4 border border-[#2b4c80] w-[55%]">
                    내 용
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#6482ad]/40 text-slate-800">
                {/* 1. 장례서비스 */}
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td rowSpan={8} colSpan={2} className="py-3 px-4 font-bold border border-[#6482ad]/40 bg-slate-50/60 text-slate-900 w-[24%]">
                    장례서비스
                  </td>
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium bg-slate-50/30">관</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40 font-semibold text-slate-900">오동나무고급3호</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium bg-slate-50/30">수의</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40 font-semibold text-slate-900">우리명품수의</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium bg-slate-50/30">도복, 원삼, 천금, 지금</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40">본건,삼베</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium bg-slate-50/30">영정</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40">본건</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium bg-slate-50/30">베개, 습신, 수시포, 탈지면, 알코올</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40 font-semibold text-slate-900">필요량제공</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium bg-slate-50/30">한지, 보공, 받침대, 예단, 다라니경</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40 font-semibold text-slate-900">필요량제공</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium bg-slate-50/30">관보</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40">우단관보</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium bg-slate-50/30">결과바</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40">소칭 40(면)</td>
                </tr>

                {/* 2. 의전용품 - 전통식 */}
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td rowSpan={10} className="py-3 px-4 font-bold border border-[#6482ad]/40 bg-slate-50/60 text-slate-900">
                    의 전 용 품
                  </td>
                  <td rowSpan={5} className="py-2.5 px-3 border border-[#6482ad]/40 font-semibold bg-slate-50/30">
                    전통식
                  </td>
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium">굴건제복</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40">직계상주</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium">바지저고리</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40">직계상주</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium">복조끼 삼베 치마 저고리</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40">직계상주</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium">두루마기, 치마 저고리</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40">직계상주</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium">행전, 두건, 요질, 수질, 작지, 완장</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40 font-semibold text-slate-900">필요량 전부 제공</td>
                </tr>

                {/* 2. 의전용품 - 현대식 */}
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td rowSpan={2} className="py-2.5 px-3 border border-[#6482ad]/40 font-semibold bg-slate-50/30">
                    현대식
                  </td>
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium">검정 양복 대여(남)</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40">5벌대여(와이셔츠, 넥타이 포함) 5벌 대여</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium">치마 저고리(검정 또는 흰색)</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40">5벌대여</td>
                </tr>

                {/* 2. 의전용품 - 부속품 */}
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td rowSpan={3} className="py-2.5 px-3 border border-[#6482ad]/40 font-semibold bg-slate-50/30">
                    부속품
                  </td>
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium">부의록,방명록</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40">제공</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium">축문,위패</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40">제공</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium">기타제공</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40 leading-relaxed">
                    운아, 혼백, 향, 초, 장갑,<br />
                    액자 리본, 짚신, 공포, 상가 표시
                  </td>
                </tr>

                {/* 3. 행사요원서비스 */}
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td rowSpan={2} colSpan={2} className="py-3 px-4 font-bold border border-[#6482ad]/40 bg-slate-50/60 text-slate-900">
                    행사요원서비스
                  </td>
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium">장례지도사</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40 font-semibold text-slate-900">2명 파견</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium">행사도우미</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40 font-semibold text-slate-900">2일간 3명(1일 8시간 기준)</td>
                </tr>

                {/* 4. 스페셜 서비스 */}
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td rowSpan={3} colSpan={2} className="py-3 px-4 font-bold border border-[#6482ad]/40 bg-slate-50/60 text-slate-900">
                    스페셜<br />서비스
                  </td>
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium">염습</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40 font-semibold text-slate-900">황실특수대령</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium">제단장식</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40 font-semibold text-slate-900">지원 100,000원</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium">장의차</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40 leading-relaxed font-medium">
                    장의버스 또는 장의리무진 선택1<br />
                    <span className="font-bold text-slate-900">왕복 200km 무료</span><br />
                    <span className="text-xs text-slate-500">(2차 장지 추가요금 발생)</span>
                  </td>
                </tr>

                {/* 5. 대여품 */}
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td rowSpan={2} colSpan={2} className="py-3 px-4 font-bold border border-[#6482ad]/40 bg-slate-50/60 text-slate-900">
                    대여품
                  </td>
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium">근조기,조등</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40">제공</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 border border-[#6482ad]/40 font-medium">향로,촛대,잔대,병풍</td>
                  <td className="py-2.5 px-4 border border-[#6482ad]/40">필요시제공</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Important Notice & Details Box */}
        <div className="bg-slate-50 rounded-sm p-6 sm:p-8 border border-slate-200 space-y-6 text-slate-800">
          {/* [유의사항] */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">[유의사항]</h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <li>- 도서지역은 서비스가 한정되며 시신운구 차량은 당사에 사전에뢰 한 운구건에 한해 무상 제공(시내한정)됩니다.</li>
              <li>- 직접 준비하신 용품에 대해서는 공제 혜택이 없으며, 접객실 이용료, 고인 안치료, 음식비 등은 상품 내용에 포함되지 않습니다.</li>
              <li>- 초과 규격으로 주문 제작관을 사용하실 경우는 회원님께서 추가 금액을 부담하셔야 합니다.</li>
              <li>- 장례식장과 당사에 중복하여 행사 의뢰 시는 행사진행이 어려울수도 있으므로 행사 발생 시 꼭 먼저 연락하시고 당사 진행에 협조하셔야 합니다.</li>
            </ul>
          </div>

          {/* [구체적인 제공 물품 및 서비스 내용] */}
          <div className="space-y-2 pt-4 border-t border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">[구체적인 제공 물품 및 서비스 내용]</h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <li>- 수의 원단은 100% 저마(원산지: 중국), 제조지역은 한국, 기계직</li>
              <li>- 관은 화장 시 1.5cm, 매장 시 오동나무 4cm</li>
              <li>- 장의차량: 장의 버스는 45인승(지역별로 35인승으로 대체될 수 있습니다.)</li>
              <li>- 고인 운구차량: 리무진이 상품은 장의버스 또는 장의 리무진 중 하나를선택하여 사용하실 수 있습니다- 장의버스 또는 장의 리무진은 왕복 200km 이내 무료제공(1km당 2,000원 추가)</li>
              <li>- 인력은 장례지도사 1~2명, 도우미 행사 당 총 3명1일 8시간 기준</li>
              <li>- 도우미 서비스 추가시 1시간당 15,000원 추가비용발생합니다.</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer siteConfig={siteConfig} />
      <FloatingContactButton phone={siteConfig?.phone} />
    </div>
  );
}
