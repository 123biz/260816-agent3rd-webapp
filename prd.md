[PRD] Antigravity Startup Dashboard: 2시간 완성 비즈니스 앱 관제탑
1. 프로젝트 개요 (Project Overview)
목표: 초보 창업자(강사/컨설턴트)가 자신의 사업 아이디어를 입력하면, AI가 실시간으로 **Vanilla JS 기반의 PWA(Progressive Web App)**를 생성하고 배포까지 지원하는 '강의용 대시보드' 구축.
철학: 'Antigravity(앤티그래비티)' - 백엔드 설정 및 개발 환경 구축의 복잡성(중력)을 완전히 제거하여, 아이디어가 즉시 현실(URL)이 되는 경험을 제공함.
대상: 비개발자 강사 및 컨설턴트 (MVP 제작 강의용).
2. 디자인 원칙 (Design Principles)
스타일: 네오 브루탈리즘 (Neobrutalism)
핵심 요소:
굵은 검정 테두리 (최소 4px 이상의 Solid Stroke).
강렬한 원색 배경 (Yellow, Pink, Blue, Green).
똑떨어지는 하드 섀도우 (Blur 없이 8px-8px 오프셋 검정 그림자).
큰 폰트와 직관적인 버튼 UI.
3. 기술 스택 (Technical Stack)
Frontend: Next.js (App Router), Tailwind CSS.
Backend/DB: Supabase (수강생 진행 데이터 및 코드 저장, 실시간 동기화).
AI Engine: Antigravity Engine (웹앱 코드 생성용 API).
Deployment: Netlify (대시보드 호스팅), Netlify Drop (수강생 결과물 배포용).
4. 핵심 사용자 여정 (User Journey & 프로세스)
[Step 1] 아이디어 발사대 (Input)
수강생은 4가지 본질적인 질문에 답함:
사업장 이름은? (예: 강남 붕어빵 연구소)
무엇을 파나요? (예: 프리미엄 단팥/슈크림 붕어빵)
누구에게 파나요? (예: 점심시간 디저트를 찾는 직장인)
브랜드 컬러 선택: [ 노랑 / 파랑 / 핑크 / 초록 ] 중 택 1.
UI: 큼직한 카드 형태의 입력 폼, 상단에 실시간 진행률(Progress Bar) 표시.
[Step 2] 우주선 건조 & 실시간 미리보기 (Preview & Edit)
[생성하기] 클릭 시 Antigravity 엔진이 Vanilla JS/HTML/CSS 코드 생성.
실시간 프리뷰: 대시보드 내 **iFrame(srcDoc 방식)**을 사용하여 즉시 렌더링.
한 줄 수정: 하단 채팅창에 "문구를 더 맵게 고쳐줘", "버튼을 크게 해줘"라고 입력하면 AI가 코드를 즉시 수정하고 iFrame이 실시간 갱신됨.
[Step 3] PWA 마법 장착 (PWA Packaging)
시스템이 자동으로 manifest.json과 service-worker.js 생성.
사업명 기반의 앱 아이콘 자동 생성(아이콘은 사업명 첫 글자 활용).
최종 결과물: 모든 코드와 PWA 설정이 포함된 단일 폴더(혹은 index.html 세트) 패키징.
[Step 4] 무중력 배포 (Deploy)
수강생은 최종 파일을 다운로드하여 Netlify Drop에 드래그 앤 드롭함.
배포된 URL로 접속하여 스마트폰에 '홈 화면 추가(설치)' 진행.
5. 상세 기능 요구 사항
A. 수강생용 실시간 프리뷰 페이지
좌측(40%): AI 수정 채팅창 및 단계별 안내 가이드.
우측(60%): iFrame 영역. 생성된 바닐라 코드가 즉시 구동되어야 함.
기능: 코드를 전혀 모르는 수강생이 채팅만으로 디자인과 문구를 변경할 수 있어야 함.
B. 강사용 관리자 대시보드
Supabase Realtime을 통해 수강생별 진행 단계(1~5) 모니터링.
수강생이 만든 앱의 최종 URL을 한곳에 모아 보여주는 '런칭 갤러리'.
C. PWA 자동 생성기
별도 설정 없이 manifest의 name, short_name, start_url, display: standalone 등이 수강생 정보에 맞게 자동 기입되어야 함.
6. 개발 우선순위 (Implementation Roadmap)
Phase 1: 네오 브루탈리즘 스타일의 4가지 질문 입력 폼 UI 구현.
Phase 2: Antigravity 엔진(AI) 연동 및 iFrame 실시간 렌더링 로직 구현.
Phase 3: PWA 파일 자동 생성 및 다운로드 기능 구현.
Phase 4: Supabase 연동 및 실시간 진행률 추적 기능 추가.
Phase 5: Netlify 배포 및 최종 테스트.