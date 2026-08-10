"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("ceo@aicamp.club");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      setIsSubmitting(false);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-brutal-cream flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-10 mb-12 text-center whitespace-nowrap">
        <span className="text-5xl md:text-6xl font-black tracking-tighter">🚀 Claude Code</span>
        <span className="text-3xl md:text-5xl font-black tracking-wide text-rose-400">AI제조혁신 코디네이터/마이스터 제2기</span>
      </div>

      <main className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="brutal-card bg-brutal-white p-10 flex flex-col gap-5">
          <h1 className="text-3xl font-black mb-2 text-left">🔒 관리자 로그인</h1>
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
          {error && <p className="text-red-600 font-bold text-sm">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="brutal-btn bg-brutal-yellow py-4 text-lg disabled:opacity-50"
          >
            {isSubmitting ? "확인 중..." : "로그인"}
          </button>
        </form>
      </main>
    </div>
  );
}
