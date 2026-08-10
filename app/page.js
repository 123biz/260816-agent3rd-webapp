"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import CourseMap from "@/components/CourseMap";

export default function Home() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // 강의 전체 맵에서 강조할 "오늘 진행 세션" (관리자 로그인 시 헤더에서 직접 지정, course_settings 테이블에 저장)
  const [currentSession, setCurrentSession] = useState(1);

  // 강의 전체 맵의 "오늘 진행 세션" 조회 (course_settings 테이블이 없거나 값이 없으면 기본값 1 유지)
  useEffect(() => {
    async function fetchCourseSettings() {
      const { data } = await supabase.from("course_settings").select("current_session").eq("id", 1).single();
      if (data?.current_session) {
        setCurrentSession(data.current_session);
      }
    }
    fetchCourseSettings();
  }, []);

  // 로그인 필수: 세션 없으면 /login으로 이동
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/login");
      } else {
        setIsAdmin(true);
      }
      setAuthChecked(true);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setIsAdmin(Boolean(newSession));
      if (!newSession) {
        router.push("/login");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // 강의 전체 맵에서 강조할 "오늘 진행 세션" 변경 (관리자만)
  const updateCurrentSession = async (sessionId) => {
    const previous = currentSession;
    setCurrentSession(sessionId);

    const { error } = await supabase
      .from("course_settings")
      .update({ current_session: sessionId, updated_at: new Date().toISOString() })
      .eq("id", 1);

    if (error) {
      setCurrentSession(previous);
    }
  };

  if (!authChecked || !isAdmin) {
    return <div className="min-h-screen bg-brutal-cream" />;
  }

  return (
    <div className="min-h-screen bg-brutal-cream py-10 px-6">
      {/* 상단 로고/헤더 */}
      <header className="max-w-[1750px] mx-auto mb-10 flex items-center justify-between">
        {/* 좌측: 로고 */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter inline-block">
            🚀 Claude Code
          </h1>
        </div>

        {/* 중앙: 프로그램명 */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <span className="font-black text-2xl md:text-4xl tracking-wide whitespace-nowrap">
            AI제조혁신 코디네이터/마이스터 제2기
          </span>
        </div>

        {/* 우측: "오늘 세션" 선택 + 로그아웃 (이 화면에 왔다는 건 이미 로그인된 상태) */}
        <div className="flex-1 flex justify-end">
          <div className="flex items-stretch gap-6">
            <div className="brutal-card bg-brutal-white px-3 py-2 flex items-center gap-2">
              <span className="font-bold text-xs whitespace-nowrap">🗺️ 오늘 세션</span>
              {[1, 2, 3].map((sessionId) => (
                <button
                  key={sessionId}
                  onClick={() => updateCurrentSession(sessionId)}
                  className={`brutal-btn w-9 h-9 text-sm ${
                    currentSession === sessionId ? "bg-brutal-yellow" : "bg-brutal-white"
                  }`}
                >
                  {sessionId}
                </button>
              ))}
            </div>
            <button onClick={handleLogout} className="brutal-btn bg-brutal-white px-3 flex items-center justify-center text-lg whitespace-nowrap">
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <CourseMap currentSession={currentSession} />
    </div>
  );
}
