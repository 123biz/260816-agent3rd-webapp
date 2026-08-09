/**
 * setupGuides.js
 * 게이트 화면(GateStep)에 상시 노출되는 설치/가입 안내 문구.
 * 일반적인 절차 기준 초안 — 최신 화면 구성과 다를 수 있으니 강사가 검수 후 필요시 수정할 것.
 */
export const setupGuides = {
  antigravity: {
    toolName: "Google Antigravity",
    question: "Google Antigravity IDE를 설치하셨나요?",
    badge: "🚀 STEP GUIDE",
    title: "Google Antigravity 설치 방법",
    subtitle: "무료 · 5분이면 충분해요",
    steps: [
      (
        <>
          브라우저에서{" "}
          <a
            href="https://antigravity.google"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-black text-brutal-blue"
          >
            antigravity.google
          </a>{" "}
          에 접속하세요.
        </>
      ),
      "화면 우측 상단에 있는 \"Download\" 버튼을 클릭하세요.",
      (
        <>
          바뀐 화면 상단에 보이는 'Antigravity 2.0' 말고 화면을 아래로 쭉
          내려서 'Antigravity IDE' 프로그램을 다운받아야 합니다.
          <br />
          → 검정색 'Download for x64' 버튼 클릭
        </>
      ),
      "각자의 다운로드 폴더에서 'Antigravity IDE.exe' 파일을 확인하세요.",
      (
        <>
          해당 파일을 더블 클릭하여 Antigravity IDE를 설치합니다.
          <br />
          (참고) IDE = Integrated Development Environment
        </>
      ),
      "설치가 끝나면 실행 후 구글 계정으로 로그인하세요.",
      "로그인 후 새 프로젝트(폴더)를 열 수 있으면 준비 완료!",
    ],
  },
  netlify: {
    toolName: "Netlify",
    question: "Netlify에 가입하셨나요? (무료)",
    badge: "🚀 STEP GUIDE",
    title: "Netlify 가입 방법",
    subtitle: "무료 · 카드 등록 필요 없음",
    steps: [
      "브라우저에서 netlify.com 에 접속하세요.",
      "우측 상단 'Sign up' 버튼을 클릭하세요.",
      "이메일 또는 Google/GitHub 계정으로 가입을 진행하세요.",
      "이메일 인증 메일이 오면 링크를 눌러 인증을 완료하세요.",
      "로그인 후 대시보드 화면이 뜨면 준비 완료!",
    ],
  },
  folder: {
    toolName: "프로젝트 폴더",
    question: "프로젝트 폴더를 만드셨나요?",
    badge: "🚀 STEP GUIDE",
    title: "프로젝트 폴더 만들기",
    subtitle: "1분이면 충분해요",
    steps: [
      "C:\\ 드라이브에 'Antigravity' 라는 이름의 폴더를 새로 만드세요.",
      "방금 만든 'Antigravity' 폴더 안에 'agent3rd-webapp-260816' 이라는 이름의 폴더를 만드세요.",
    ],
  },
};
