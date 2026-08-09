"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProgressBar from "@/components/ProgressBar";
import StepCard from "@/components/StepCard";
import ColorPicker from "@/components/ColorPicker";
import GateStep from "@/components/GateStep";
import { setupGuides } from "@/lib/setupGuides";

// 이미 진행을 시작했거나 제출까지 마친 수강생인지 판단 (다른 사람이 실수로 선택하는 것 방지)
function hasProgress(student) {
  return Boolean(
    student.antigravity_installed ||
      student.netlify_signed_up ||
      student.folder_created ||
      student.preview_started ||
      student.pwa_downloaded ||
      student.final_url
  );
}

export default function Home() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0); // 0: 수강생 선택, 1~4: 입력폼
  const [gateStep, setGateStep] = useState(null); // null | "antigravity" | "netlify" | "done"
  const [isConfirmingGate, setIsConfirmingGate] = useState(false);

  // 상태 관리
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [businessName, setBusinessName] = useState("");
  const [product, setProduct] = useState("");
  const [targetCustomer, setTargetCustomer] = useState("");
  const [brandColor, setBrandColor] = useState("");

  // 각 단계별 예시 데이터 채우기 함수
  const fillStep1 = () => setBusinessName("강남 붕어빵 연구소");
  const fillStep2 = () => setProduct("프리미엄 슈크림 붕어빵");
  const fillStep3 = () => setTargetCustomer("점심시간 당이 떨어지는 직장인");

  // 수강생 목록 가져오기 (Supabase 연동 또는 Mock)
  useEffect(() => {
    async function fetchStudents() {
      try {
        const { data, error } = await supabase
          .from("students")
          .select("*")
          .order("id");

        if (error || !data || data.length === 0) {
          // 환경변수가 없거나 에러 시 테스트 데이터 표시
          setStudents([
            { id: 1, name: "테스터 홍길동" },
            { id: 2, name: "테스터 김철수" },
            { id: 3, name: "강사 임시계정" },
          ]);
        } else {
          setStudents(data);
        }
      } catch (err) {
        setStudents([
          { id: 1, name: "테스터 홍길동" },
          { id: 2, name: "테스터 김철수" },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchStudents();

    const channel = supabase
      .channel("students-home")
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
  }, []);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  // 게이트(설치/가입 확인) 통과 처리: Supabase에 기록 후 다음 게이트 또는 본 흐름으로 전환
  const handleGateConfirm = async (columnName, nextGate) => {
    setIsConfirmingGate(true);
    try {
      await supabase
        .from("students")
        .update({ [columnName]: true, updated_at: new Date().toISOString() })
        .eq("id", selectedStudent.id);
    } catch (err) {
      // Supabase 연동이 안 되어 있어도 수업 진행에는 지장 없도록 조용히 넘어감
    } finally {
      setIsConfirmingGate(false);
      if (nextGate === "done") {
        setGateStep("done");
        setCurrentStep(1);
      } else {
        setGateStep(nextGate);
      }
    }
  };

  return (
    <div className="min-h-screen bg-brutal-cream py-10 px-4">
      {/* 상단 로고/헤더 */}
      <header className="max-w-4xl mx-auto mb-10 flex items-center justify-between">
        {/* 좌측: 로고 */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter cursor-pointer inline-block" onClick={() => setCurrentStep(0)}>
            🚀 Antigravity
          </h1>
        </div>
        
        {/* 중앙: 수강생 이름 크게 강조 */}
        <div className="flex-1 flex justify-center">
          {selectedStudent && (
            <span className="font-black text-xl md:text-2xl bg-brutal-green px-6 py-2 border-4 border-brutal-black brutal-shadow-sm whitespace-nowrap">
              {selectedStudent.name}님
            </span>
          )}
        </div>

        {/* 우측: 관제탑 뱃지 */}
        <div className="flex-1 flex justify-end">
          <div className="brutal-card bg-brutal-white px-4 py-2 font-bold text-sm hidden md:block">
            2시간 완성 관제탑
          </div>
        </div>
      </header>

      {/* Step 0: 수강생 선택 화면 */}
      {currentStep === 0 && gateStep === null && (
        <main className="max-w-xl mx-auto mt-20 animate-slide-in-up">
          <div className="brutal-card bg-brutal-white p-8">
            <h2 className="text-3xl font-black mb-6">👋 환영합니다!</h2>
            <p className="font-semibold text-lg mb-8">본인의 이름을 선택하고 시작해 주세요.</p>

            {isLoading ? (
              <p>명단 불러오는 중...</p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {students.map((student) => {
                  const isDisabled = student.is_active === false;
                  return (
                    <button
                      key={student.id}
                      onClick={() => {
                        if (isDisabled) return;
                        if (hasProgress(student)) {
                          window.alert(
                            "이미 진행 중이거나 제출을 마친 수강생입니다. 이름을 다시 확인하고 선택해 주세요."
                          );
                          return;
                        }
                        setSelectedStudent(student);
                        setGateStep("antigravity");
                      }}
                      disabled={isDisabled}
                      className={`brutal-btn py-4 text-xl ${
                        isDisabled
                          ? "bg-brutal-gray opacity-50 cursor-not-allowed"
                          : "bg-brutal-yellow"
                      }`}
                    >
                      {student.name}
                      {isDisabled && " (비활성)"}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      )}

      {/* 게이트: Antigravity 설치 확인 / Netlify 가입 확인 */}
      {currentStep === 0 && gateStep === "antigravity" && (
        <main className="mt-10 px-4">
          <GateStep
            guide={setupGuides.antigravity}
            isConfirming={isConfirmingGate}
            onConfirm={() => handleGateConfirm("antigravity_installed", "netlify")}
          />
        </main>
      )}

      {currentStep === 0 && gateStep === "netlify" && (
        <main className="mt-10 px-4">
          <GateStep
            guide={setupGuides.netlify}
            isConfirming={isConfirmingGate}
            onConfirm={() => handleGateConfirm("netlify_signed_up", "folder")}
          />
        </main>
      )}

      {currentStep === 0 && gateStep === "folder" && (
        <main className="mt-10 px-4">
          <GateStep
            guide={setupGuides.folder}
            isConfirming={isConfirmingGate}
            onConfirm={() => handleGateConfirm("folder_created", "done")}
          />
        </main>
      )}

      {/* Step 1~4: 본격적인 입력 화면 */}
      {currentStep > 0 && (
        <>
          <div className="mb-12">
            <ProgressBar currentStep={currentStep} totalSteps={4} />
          </div>

          <main className="max-w-4xl mx-auto flex flex-col items-center">
            {currentStep === 1 && (
              <StepCard
                stepNumber={1}
                emoji="🏪"
                title="당신의 멋진 사업장 이름은 무엇인가요?"
                placeholder="예: 강남 붕어빵 연구소"
                value={businessName}
                onChange={setBusinessName}
                onAutoFill={fillStep1}
                bgColor="bg-brutal-yellow"
                isActive={true}
              />
            )}
            
            {currentStep === 2 && (
              <StepCard
                stepNumber={2}
                emoji="🛍️"
                title="무엇을 판매하시나요?"
                placeholder="예: 프리미엄 단팥/슈크림 붕어빵"
                value={product}
                onChange={setProduct}
                onAutoFill={fillStep2}
                bgColor="bg-brutal-pink"
                isActive={true}
              />
            )}

            {currentStep === 3 && (
              <StepCard
                stepNumber={3}
                emoji="🎯"
                title="어떤 고객에게 파실 건가요?"
                placeholder="예: 점심시간 디저트를 찾는 직장인"
                value={targetCustomer}
                onChange={setTargetCustomer}
                onAutoFill={fillStep3}
                bgColor="bg-brutal-blue"
                isActive={true}
              />
            )}

            {currentStep === 4 && (
              <ColorPicker
                value={brandColor}
                onChange={setBrandColor}
                isActive={true}
              />
            )}

            {/* 하단 네비게이션 버튼 */}
            <div className="mt-12 flex gap-4 w-full max-w-xl justify-between">
              <button
                onClick={prevStep}
                className="brutal-btn bg-brutal-gray px-6 md:px-8 py-4 text-lg whitespace-nowrap"
              >
                👈 이전
              </button>
              
              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  className="brutal-btn bg-brutal-green px-10 py-4 text-lg w-full whitespace-nowrap"
                >
                  다음 단계로 👉
                </button>
              ) : (
                <button
                  onClick={() => {
                    const params = new URLSearchParams({
                      name: businessName,
                      product: product,
                      customer: targetCustomer,
                      color: brandColor,
                      studentId: selectedStudent?.id ?? ""
                    });
                    router.push(`/preview?${params.toString()}`);
                  }}
                  className="brutal-btn bg-brutal-black text-brutal-white px-10 py-4 text-lg w-full animate-pulse-subtle whitespace-nowrap"
                  disabled={!brandColor}
                >
                  🚀 우주선 생성하기
                </button>
              )}
            </div>
          </main>
        </>
      )}
    </div>
  );
}
