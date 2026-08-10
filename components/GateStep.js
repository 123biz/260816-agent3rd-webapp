"use client";

import { useState } from "react";

/**
 * GateStep — 다음 단계로 넘어가기 전 필수 준비물(설치/가입)을 확인하는 게이트 화면.
 * 여백에 설치/가입 가이드를 상시 노출하고, "아직이요"를 누르면 진행을 막는다.
 */
export default function GateStep({ guide, extraGuide, onConfirm, isConfirming = false }) {
  const { question, badge, title, subtitle, steps } = guide;
  const [notYetClicked, setNotYetClicked] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto grid md:grid-cols-[1.1fr_1fr] gap-8 items-start animate-slide-in-up">
      {/* 좌측: 설치/가입 가이드 (여백 활용) */}
      <div className="flex flex-col gap-6">
        {extraGuide && (
          <div className="brutal-card bg-brutal-white p-6 md:p-8">
            <div className="inline-block bg-brutal-yellow border-4 border-brutal-black px-4 py-1 font-black text-sm mb-4 -rotate-1">
              {extraGuide.badge}
            </div>
            <div className="bg-brutal-red text-brutal-white border-4 border-brutal-black px-4 py-3 font-black text-xl md:text-2xl mb-4 brutal-shadow-sm">
              {extraGuide.title}
            </div>
            <div className="bg-brutal-blue border-4 border-brutal-black px-4 py-3 font-bold text-sm mb-6">
              {extraGuide.subtitle}
            </div>
            <ol className="flex flex-col gap-3">
              {extraGuide.steps.map((step, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="shrink-0 w-7 h-7 flex items-center justify-center bg-brutal-black text-brutal-white font-black text-sm">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-sm md:text-base leading-relaxed pt-0.5">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="brutal-card bg-brutal-white p-6 md:p-8">
          <div className="inline-block bg-brutal-yellow border-4 border-brutal-black px-4 py-1 font-black text-sm mb-4 -rotate-1">
            {badge}
          </div>
          <div className="bg-brutal-red text-brutal-white border-4 border-brutal-black px-4 py-3 font-black text-xl md:text-2xl mb-4 brutal-shadow-sm">
            {title}
          </div>
          <div className="bg-brutal-blue border-4 border-brutal-black px-4 py-3 font-bold text-sm mb-6">
            {subtitle}
          </div>
          <ol className="flex flex-col gap-3">
            {steps.map((step, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <span className="shrink-0 w-7 h-7 flex items-center justify-center bg-brutal-black text-brutal-white font-black text-sm">
                  {idx + 1}
                </span>
                <span className="font-semibold text-sm md:text-base leading-relaxed pt-0.5">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* 우측: 질문 카드 */}
      <div className="brutal-card bg-brutal-white p-6 md:p-10 md:sticky md:top-10">
        <h2 className="text-2xl md:text-3xl font-black mb-8 leading-tight">
          {question}
        </h2>
        <div className="flex flex-col gap-4">
          <button
            onClick={onConfirm}
            disabled={isConfirming}
            className="brutal-btn bg-brutal-green py-4 text-lg disabled:opacity-50"
          >
            {isConfirming ? "확인 중..." : "✅ 네, 완료했어요"}
          </button>
          <button
            onClick={() => setNotYetClicked(true)}
            className="brutal-btn bg-brutal-gray py-4 text-lg"
          >
            🐢 아직이요
          </button>
        </div>
        {notYetClicked && (
          <p className="mt-6 font-bold text-sm">
            천천히 왼쪽 가이드를 보면서 진행하고, 다 되면 다시 눌러주세요!
          </p>
        )}
      </div>
    </div>
  );
}
