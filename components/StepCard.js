"use client";

/**
 * StepCard — 각 질문 단계를 카드 형태로 표시하는 컴포넌트
 * 네오 브루탈리즘 스타일의 큼직한 입력 카드
 */
export default function StepCard({
  stepNumber,
  emoji,
  title,
  placeholder,
  value,
  onChange,
  onAutoFill,
  bgColor = "bg-brutal-yellow",
  isActive = false,
}) {
  return (
    <div
      className={`
        brutal-card p-6 md:p-10 w-full max-w-xl mx-auto
        ${bgColor}
        ${isActive ? "animate-slide-in-right" : ""}
        transition-all duration-300
      `}
    >
      {/* 단계 번호 뱃지 */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-brutal-black text-brutal-white flex items-center justify-center text-xl font-black">
          {stepNumber}
        </div>
        <span className="text-4xl">{emoji}</span>
      </div>

      {/* 질문 타이틀 */}
      <h2 className="text-2xl md:text-3xl font-black text-brutal-black mb-6 leading-tight">
        {title}
      </h2>

      {/* 입력 필드 & 예시 채우기 버튼 */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`
            brutal-input w-full pl-5 pr-36 py-4
            text-lg md:text-xl font-semibold
            bg-brutal-white text-brutal-black
            placeholder:text-brutal-black/30
          `}
        />
        {onAutoFill && (
          <button 
            onClick={onAutoFill}
            className="absolute right-4 text-xs font-bold bg-brutal-pink text-brutal-black border-2 border-brutal-black px-3 py-2 brutal-shadow-sm brutal-hover whitespace-nowrap"
          >
            🪄 예시 채우기
          </button>
        )}
      </div>

      {/* 입력 가이드 텍스트 */}
      <p className="mt-4 text-sm font-semibold text-brutal-black/50">
        💡 자유롭게 입력해 주세요. 나중에 언제든 수정할 수 있어요!
      </p>
    </div>
  );
}
