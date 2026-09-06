"use client";

import { useEffect } from "react";

// 관리자 관제탑에서 수강생 설치 화면 캡쳐를 크게 띄우는 모달(라이트박스).
// 배경 클릭 / ESC / ✕ 버튼으로 닫힌다.
export default function ImageLightbox({ url, alt, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="설치 화면 캡쳐"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-brutal-black/70 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative brutal-card bg-brutal-white p-3 max-h-[90vh] max-w-3xl overflow-auto"
      >
        <button
          onClick={onClose}
          aria-label="닫기"
          className="brutal-btn bg-brutal-pink text-brutal-white absolute -top-4 -right-4 w-10 h-10 flex items-center justify-center text-lg z-10"
        >
          ✕
        </button>
        <img src={url} alt={alt || "설치 화면 캡쳐"} className="max-h-[82vh] w-auto" />
      </div>
    </div>
  );
}
