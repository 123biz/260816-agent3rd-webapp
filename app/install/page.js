"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ScreenshotUpload from "@/components/ScreenshotUpload";

// 모바일 전용 화면: 폰에 앱을 설치한 수강생이 설치 화면 캡쳐만 전송한다.
// 메인(/)의 강의 로드맵·제작 흐름은 전부 빼고, "이름 선택 → 사진 전송"만 남긴다.
export default function InstallPage() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const { data, error } = await supabase.from("students").select("*").order("id");
        if (error || !data) {
          setStudents([]);
        } else {
          setStudents(data);
        }
      } catch (err) {
        console.error("수강생 명단 조회 실패:", err);
        setStudents([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStudents();
  }, []);

  // 업로드 후 최신 상태를 반영하기 위해 실시간 스냅샷 사용
  const selectedStudent = selectedId
    ? students.find((s) => s.id === selectedId) ?? null
    : null;

  return (
    <div className="min-h-screen bg-brutal-cream flex flex-col px-4 py-6">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-black tracking-tighter">🚀 Antigravity</h1>
        <p className="font-black text-lg text-brutal-pink mt-1">📸 설치 화면 인증</p>
      </header>

      <main className="w-full max-w-md mx-auto flex-1">
        {selectedStudent ? (
          <div className="flex flex-col gap-4">
            <div className="brutal-card bg-brutal-green px-4 py-3 font-black text-xl text-center">
              {selectedStudent.name}님
            </div>

            <ScreenshotUpload
              studentId={selectedStudent.id}
              initialUrl={selectedStudent.install_screenshot_url}
            />

            <button
              onClick={() => setSelectedId(null)}
              className="brutal-btn bg-brutal-white px-4 py-3 text-base"
            >
              ← 다른 이름 선택
            </button>
          </div>
        ) : (
          <div className="brutal-card bg-brutal-white p-6">
            <h2 className="text-xl font-black mb-2">본인 이름을 선택하세요</h2>
            <p className="font-semibold text-sm text-brutal-black/70 mb-6">
              폰에 설치한 앱을 실행하고, 그 화면을 캡쳐한 뒤 여기서 전송합니다.
            </p>

            {isLoading ? (
              <p className="font-semibold">명단 불러오는 중...</p>
            ) : students.length === 0 ? (
              <p className="font-semibold text-red-700">
                수강생 명단을 불러오지 못했습니다. 강사님께 문의해 주세요.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {students.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => setSelectedId(student.id)}
                    className="brutal-btn bg-brutal-yellow py-5 text-xl"
                  >
                    {student.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
