"use client";

import { useRef, useState } from "react";
import { courseRoadmap } from "@/lib/courseRoadmap";

/**
 * CourseRoadmap — 좌측 "제목 버튼" 네비게이션 + 우측 "설명" 패널을 한 쌍으로 렌더링한다.
 * 부모가 CSS grid일 때 두 컬럼으로 나란히 배치되도록 래핑 없이 Fragment로 반환한다.
 * 버튼을 누르면 설명 패널에서 해당 주제 섹션으로 스크롤 이동한다.
 */
export default function CourseRoadmap() {
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const sectionRefs = useRef({});

  const handleSelect = (topicId) => {
    setSelectedTopicId(topicId);
    sectionRefs.current[topicId]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav className="brutal-card bg-brutal-purple p-6 mt-8 h-full min-h-0 overflow-y-auto animate-slide-in-up">
        <h2 className="font-black text-3xl mb-6">🗺️ 강의 로드맵</h2>

        <div className="flex flex-col gap-6">
          {courseRoadmap.map((topic) => {
            const isActive = selectedTopicId === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => handleSelect(topic.id)}
                className={`brutal-btn !normal-case text-xl px-4 h-28 flex items-center justify-center leading-tight text-center whitespace-pre-line ${
                  isActive ? "bg-brutal-pink text-white" : "bg-brutal-yellow"
                }`}
              >
                {topic.label}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="brutal-card bg-brutal-white p-6 mt-8 h-full min-h-0 overflow-y-auto animate-slide-in-up">
        {courseRoadmap.map((topic) => (
          <section
            key={topic.id}
            ref={(el) => {
              sectionRefs.current[topic.id] = el;
            }}
            className={`border-4 p-5 mb-5 last:mb-0 bg-brutal-cream ${
              selectedTopicId === topic.id ? "border-brutal-pink" : "border-brutal-black"
            }`}
          >
            <div className="font-black text-3xl mb-2">{topic.label}</div>
            <p className="text-xl font-semibold mb-4 opacity-90">{topic.desc}</p>

            <div className="flex flex-col gap-3">
              {topic.children.map((child) => (
                <div key={child.label} className="border-2 border-brutal-black bg-brutal-white p-4">
                  <div className="font-black text-2xl mb-2">{child.label}</div>
                  <div className="text-xl font-semibold opacity-80 whitespace-pre-line">{child.desc}</div>
                  {child.note && <div className="mt-2 text-xl font-black text-blue-700">{child.note}</div>}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
