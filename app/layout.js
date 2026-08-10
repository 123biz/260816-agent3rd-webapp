import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

// 메타데이터: SEO 기본 설정
export const metadata = {
  title: "Claude Code 🚀 강의 로드맵",
  description: "AI제조혁신 코디네이터/마이스터 과정의 강의 전체 로드맵입니다.",
  keywords: ["강의", "커리큘럼", "로드맵", "AI"],
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
