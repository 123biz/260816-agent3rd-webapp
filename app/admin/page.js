"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// 학생 데이터로부터 단계별 완료 여부를 계산 (별도 stage 컬럼 없이 파생)
function getStages(student) {
  return [
    { label: "설치", done: !!student.antigravity_installed },
    { label: "가입", done: !!student.netlify_signed_up },
    { label: "폴더", done: !!student.folder_created },
    { label: "제작중", done: !!student.preview_started },
    { label: "다운로드", done: !!student.pwa_downloaded },
    { label: "최종 제출", done: !!student.final_url },
  ];
}

function LoginForm({ onSubmit, error, isSubmitting }) {
  const [email, setEmail] = useState("ceo@aicamp.club");
  const [password, setPassword] = useState("");

  return (
    <main className="max-w-sm mx-auto mt-24">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(email, password);
        }}
        className="brutal-card bg-brutal-white p-8 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-black mb-2">🔐 관리자 로그인</h2>
        <input
          type="email"
          required
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="brutal-input px-4 py-3 text-lg"
        />
        <input
          type="password"
          required
          autoFocus
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="brutal-input px-4 py-3 text-lg"
        />
        {error && <p className="text-red-600 font-semibold text-sm">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="brutal-btn bg-brutal-yellow py-3 text-lg"
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </main>
  );
}

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 로그인 세션 확인 및 변경 감지
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => {
        setSession(data.session);
      })
      .catch((err) => {
        console.error("세션 확인 실패:", err);
        setSession(null);
      })
      .finally(() => {
        setIsAuthChecked(true);
      });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (email, password) => {
    setIsLoggingIn(true);
    setLoginError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setLoginError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
    setIsLoggingIn(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // 로그인 상태일 때만 수강생 데이터 조회 및 실시간 구독
  useEffect(() => {
    if (!session) return;

    async function fetchAll() {
      const { data } = await supabase.from("students").select("*").order("id");
      setStudents(data || []);
      setIsLoading(false);
    }
    fetchAll();

    const channel = supabase
      .channel("students-admin")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "students" },
        (payload) => {
          setStudents((prev) => {
            if (payload.eventType === "DELETE") {
              return prev.filter((s) => s.id !== payload.old.id);
            }
            const exists = prev.some((s) => s.id === payload.new.id);
            if (exists) {
              return prev.map((s) => (s.id === payload.new.id ? payload.new : s));
            }
            return [...prev, payload.new].sort((a, b) => a.id - b.id);
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

  const toggleActive = async (student) => {
    const nextValue = !student.is_active;

    // 낙관적 업데이트: Realtime 신호를 기다리지 않고 클릭 즉시 화면에 반영
    setStudents((prev) =>
      prev.map((s) => (s.id === student.id ? { ...s, is_active: nextValue } : s))
    );

    const { error } = await supabase
      .from("students")
      .update({ is_active: nextValue, updated_at: new Date().toISOString() })
      .eq("id", student.id);

    if (error) {
      // 저장 실패 시 되돌림
      setStudents((prev) =>
        prev.map((s) => (s.id === student.id ? { ...s, is_active: student.is_active } : s))
      );
    }
  };

  if (!isAuthChecked) {
    return (
      <div className="min-h-screen bg-brutal-cream py-10 px-4">
        <p className="text-center font-semibold text-lg mt-24">확인 중...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-brutal-cream py-10 px-4">
        <LoginForm onSubmit={handleLogin} error={loginError} isSubmitting={isLoggingIn} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brutal-cream py-10 px-4">
      <header className="max-w-5xl mx-auto mb-10 flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter">🎛️ 관제탑</h1>
        <div className="flex items-center gap-3">
          <div className="brutal-card bg-brutal-white w-32 px-4 py-2 font-bold text-sm text-center whitespace-nowrap">
            수강생 {students.length}명
          </div>
          <div className="brutal-card bg-brutal-green w-32 px-4 py-2 font-bold text-sm text-center whitespace-nowrap">
            활성 {students.filter((s) => s.is_active).length}명
          </div>
          <div className="brutal-card bg-brutal-gray w-32 px-4 py-2 font-bold text-sm text-center whitespace-nowrap">
            비활성 {students.filter((s) => !s.is_active).length}명
          </div>
          <button
            onClick={handleLogout}
            className="brutal-btn bg-brutal-white px-4 py-2 text-sm whitespace-nowrap"
          >
            로그아웃
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto">
        {isLoading ? (
          <p className="font-semibold text-lg">불러오는 중...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {students.map((student) => (
              <div
                key={student.id}
                className={`brutal-card p-5 flex flex-col gap-3 ${
                  student.is_active ? "bg-brutal-white" : "bg-brutal-gray opacity-60"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0 overflow-x-auto">
                    <span className="font-black text-xl whitespace-nowrap shrink-0 mr-5">{student.name}</span>
                    {getStages(student).map((stage, idx, arr) => {
                      const isCurrent = !stage.done && (idx === 0 || arr[idx - 1].done);
                      return (
                        <span
                          key={stage.label}
                          className={`w-28 shrink-0 text-center text-sm font-black px-2 py-3 border-2 border-brutal-black whitespace-nowrap ${
                            stage.done
                              ? "bg-brutal-green"
                              : isCurrent
                                ? "bg-brutal-blue"
                                : "bg-brutal-gray opacity-50"
                          }`}
                        >
                          {idx + 1}. {stage.label} {stage.done ? "✅" : "☐"}
                        </span>
                      );
                    })}
                    {student.final_url && (
                      <a
                        href={student.final_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="brutal-btn bg-brutal-orange px-4 py-2 text-xs font-black shrink-0 whitespace-nowrap"
                      >
                        🔗 사이트 이동
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-black text-sm">
                      {student.is_active ? "활성" : "비활성"}
                    </span>
                    <button
                      onClick={() => toggleActive(student)}
                      role="switch"
                      aria-checked={student.is_active}
                      aria-label={`${student.name} 활성 상태 전환`}
                      className={`relative w-20 h-11 border-4 border-brutal-black shrink-0 brutal-shadow-sm brutal-hover transition-colors ${
                        student.is_active ? "bg-brutal-green" : "bg-brutal-white"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-8 h-8 bg-brutal-black transition-transform duration-200 ${
                          student.is_active ? "translate-x-9" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
