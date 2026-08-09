import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

// 메타데이터: SEO 기본 설정
export const metadata = {
  title: "Antigravity 🚀 스타트업 대시보드",
  description:
    "아이디어를 입력하면 AI가 나만의 비즈니스 앱을 자동으로 만들어 드립니다. 2시간 완성 비즈니스 앱 관제탑.",
  keywords: ["스타트업", "대시보드", "PWA", "AI", "웹앱 생성기"],
};

// 전역 레이아웃: 모든 페이지에 공통 적용
export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`h-full ${outfit.variable}`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
