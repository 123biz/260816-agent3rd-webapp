"use client";

/**
 * ColorPicker — 브랜드 컬러 4가지 중 하나를 선택하는 컴포넌트
 */
export default function ColorPicker({ value, onChange, isActive = false }) {
  const colors = [
    { id: "yellow", name: "열정 노랑", hex: "bg-[#FFE156]" },
    { id: "pink", name: "톡톡 핑크", hex: "bg-[#FF6B9D]" },
    { id: "blue", name: "신뢰 파랑", hex: "bg-[#6EC6FF]" },
    { id: "green", name: "성장 초록", hex: "bg-[#7BED9F]" },
  ];

  return (
    <div
      className={`
        brutal-card p-6 md:p-10 w-full max-w-xl mx-auto
        bg-brutal-white
        ${isActive ? "animate-slide-in-right" : ""}
      `}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-brutal-black text-brutal-white flex items-center justify-center text-xl font-black">
          4
        </div>
        <span className="text-4xl">🎨</span>
      </div>

      <h2 className="text-2xl md:text-3xl font-black text-brutal-black mb-8 leading-tight">
        브랜드 컬러를 선택하세요
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => onChange(color.id)}
            className={`
              relative h-32 border-4 border-brutal-black flex flex-col items-center justify-center gap-2
              transition-all duration-200
              ${color.hex}
              ${
                value === color.id
                  ? "shadow-[inset_0_0_0_4px_#1A1A2E] scale-[0.98] transform translate-x-[4px] translate-y-[4px] box-shadow-none"
                  : "brutal-shadow brutal-hover"
              }
            `}
          >
            {/* 선택되었을 때 체크 마크 표시 */}
            {value === color.id && (
              <div className="absolute top-2 right-2 bg-brutal-black text-brutal-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                ✓
              </div>
            )}
            <span className="font-black text-brutal-black text-lg">
              {color.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
