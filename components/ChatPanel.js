"use client";

import { useState } from "react";

/**
 * ChatPanel — AI 코드 수정 요청을 위한 채팅창 컴포넌트
 */
export default function ChatPanel({ onUpdateCode, initialData }) {
  // 사용자가 입력한 데이터를 보기 좋게 정리
  const dataSummary = initialData ? `
입력하신 정보는 다음과 같습니다:
- 사업장 이름: ${initialData.name || "미입력"}
- 판매 상품: ${initialData.product || "미입력"}
- 타겟 고객: ${initialData.customer || "미입력"}
- 브랜드 컬러: ${initialData.color || "미입력"}` : "";

  const [messages, setMessages] = useState([
    { 
      role: "ai", 
      text: `안녕하세요! 방금 생성된 웹앱 어떠신가요? 글자 크기나 버튼 색상 등 고치고 싶은 곳이 있다면 편하게 말씀해 주세요.\n\n${dataSummary}` 
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 사용자 메시지 추가
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");
    setIsTyping(true);

    // Mock AI 응답 (1초 후)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "요청하신 내용을 반영하여 코드를 업데이트했습니다! 오른쪽 화면을 확인해 보세요. ✨" }
      ]);
      setIsTyping(false);
      
      // 임시: 실제로 어떻게 수정되는지 보여주기 위해 부모 컴포넌트에 알림
      onUpdateCode(input);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full min-h-[600px] brutal-card bg-brutal-white">
      {/* 헤더 */}
      <div className="bg-brutal-blue border-b-4 border-brutal-black p-4 flex items-center justify-between">
        <h2 className="text-xl font-black text-brutal-black">🤖 Antigravity AI</h2>
        <span className="bg-brutal-white px-2 py-1 text-xs font-bold border-2 border-brutal-black">디자이너 모드</span>
      </div>

      {/* 체험판 안내: 실제 편집은 다운로드 후 Google Antigravity에서 진행 */}
      <div className="bg-brutal-yellow border-b-4 border-brutal-black px-4 py-2 text-xs md:text-sm font-bold">
        🎬 체험판이에요! 다운로드 받은 뒤, 진짜 수정은 본인의 Google Antigravity에서 채팅으로 요청하시면 돼요.
      </div>

      {/* 채팅 내역 */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-brutal-cream/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div 
              className={`
                max-w-[85%] p-4 border-4 border-brutal-black font-semibold text-sm md:text-base leading-relaxed whitespace-pre-wrap
                ${msg.role === "user" ? "bg-brutal-yellow brutal-shadow-sm" : "bg-brutal-white brutal-shadow-sm"}
              `}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="p-4 border-4 border-brutal-black bg-brutal-white brutal-shadow-sm font-semibold">
              AI가 수정 중입니다... ✍️
            </div>
          </div>
        )}
      </div>

      {/* 입력 폼 */}
      <form onSubmit={handleSend} className="p-4 border-t-4 border-brutal-black bg-brutal-white flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="예: 버튼을 파란색으로 바꿔줘"
          className="flex-1 brutal-input px-5 py-5 text-xl md:text-2xl font-black placeholder:text-brutal-black/40"
        />
        <button 
          type="submit" 
          disabled={isTyping}
          className="brutal-btn bg-brutal-green px-10 py-5 text-xl md:text-2xl font-black disabled:opacity-50 whitespace-nowrap"
        >
          전송
        </button>
      </form>
    </div>
  );
}
