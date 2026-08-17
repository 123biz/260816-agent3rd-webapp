"use client";

import { useEffect, useRef, useState } from "react";
import { courseRoadmap } from "@/lib/courseRoadmap";

/**
 * CourseRoadmap — 좌측 "제목 버튼" 네비게이션 + 우측 "설명" 패널을 한 쌍으로 렌더링한다.
 * 부모가 CSS grid일 때 두 컬럼으로 나란히 배치되도록 래핑 없이 Fragment로 반환한다.
 * 버튼 클릭 시 설명 패널이 해당 섹션으로 스크롤 이동하고, 반대로 설명 패널을 직접
 * 스크롤하면 IntersectionObserver가 현재 보이는 섹션에 맞춰 버튼 하이라이트를 갱신한다.
 */
export default function CourseRoadmap() {
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const sectionRefs = useRef({});
  const detailRef = useRef(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const handleSelect = (topicId) => {
    setSelectedTopicId(topicId);
    isProgrammaticScroll.current = true;
    sectionRefs.current[topicId]?.scrollIntoView({ behavior: "smooth", block: "start" });
    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 700);
  };

  useEffect(() => {
    const container = detailRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setSelectedTopicId(visible[0].target.dataset.topicId);
        }
      },
      { root: container, rootMargin: "0px 0px -60% 0px", threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

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

      <div ref={detailRef} className="brutal-card bg-brutal-white p-6 mt-8 h-full min-h-0 overflow-y-auto animate-slide-in-up">
        {courseRoadmap.map((topic) => (
          <section
            key={topic.id}
            data-topic-id={topic.id}
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
