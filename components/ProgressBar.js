"use client";

/**
 * ProgressBar — 4단계 진행률 바 (네오 브루탈리즘 스타일)
 * 각 단계가 시각적으로 연결되어 현재 위치를 명확히 보여줌
 */
export default function ProgressBar({ currentStep, totalSteps = 4 }) {
  // 각 단계별 아이콘과 라벨
  const steps = [
    { icon: "🏪", label: "이름" },
    { icon: "🛍️", label: "상품" },
    { icon: "🎯", label: "고객" },
    { icon: "🎨", label: "컬러" },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* 단계 표시 영역 */}
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const stepNum = index + 1;
          // 완료/진행중/대기 상태 판별
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          const isPending = stepNum > currentStep;

          return (
            <div key={stepNum} className="flex flex-col items-center relative z-10">
              {/* 원형 아이콘 */}
              <div
                className={`
                  w-14 h-14 md:w-16 md:h-16 flex items-center justify-center
                  border-4 border-brutal-black text-2xl md:text-3xl
                  transition-all duration-300
                  ${isCompleted
                    ? "bg-brutal-green brutal-shadow-sm scale-100"
                    : isCurrent
                      ? "bg-brutal-yellow brutal-shadow animate-pulse-subtle scale-110"
                      : "bg-brutal-gray grayscale text-opacity-50"
                  }
                `}
              >
                {isCompleted ? "✅" : step.icon}
              </div>
              {/* 라벨 */}
              <span
                className={`
                  mt-2 text-sm md:text-base font-bold
                  ${isCurrent ? "text-brutal-black" : isPending ? "text-brutal-black/40" : "text-brutal-black/70"}
                `}
              >
                {step.label}
              </span>
            </div>
          );
        })}

        {/* 연결선 (단계 사이) */}
        <div className="absolute top-7 md:top-8 left-[10%] right-[10%] h-2 border-3 border-brutal-black bg-brutal-gray -z-0">
          <div
            className="h-full bg-brutal-green transition-all duration-500 ease-out"
            style={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* 진행률 텍스트 */}
      <div className="text-center mt-6">
        <span className="text-2xl md:text-3xl font-black text-brutal-black">
          {currentStep} / {totalSteps}
        </span>
        <span className="ml-2 text-lg md:text-xl font-bold text-brutal-black/70">
          단계 진행 중
        </span>
      </div>
    </div>
  );
}
