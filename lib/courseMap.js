/**
 * courseMap — 강의 전체 커리큘럼 맵 데이터.
 * 문구는 초안이므로 강사가 자유롭게 수정하면 된다.
 */
export const courseMap = [
  {
    id: 1,
    title: "개발 환경 & AI 기초",
    topics: [
      {
        id: "terminal",
        label: "Terminal",
        desc: "명령어로 컴퓨터에게 직접 지시를 내리는 창입니다. 오늘 모든 실습은 여기서 시작합니다. 윈도우엔 여러 종류의 터미널이 있어요.",
        children: [
          {
            label: "CMD",
            desc: "윈도우 기본 명령 프롬프트. 가장 오래되고 기본적인 터미널입니다.",
          },
          {
            label: "PowerShell",
            desc: "윈도우 전용 터미널. CMD보다 기능이 많아 이 수업에서는 주로 이걸 사용합니다.",
          },
          {
            label: "Git Bash",
            desc: "윈도우에서도 Mac/Linux 명령어를 그대로 쓸 수 있게 해주는 터미널. Git 사용 시 표준입니다.",
          },
        ],
      },
      {
        id: "cli",
        label: "CLI",
        desc: "명령어를 입력해서 컴퓨터를 조작하는 방식입니다. 마우스로 클릭하는 GUI와 대비됩니다.",
        children: [
          {
            label: "CLI vs GUI",
            desc: "CLI(명령어 입력)는 빠르고 정확하고, GUI(마우스 클릭)는 직관적입니다. 개발할 땐 둘을 섞어서 씁니다.",
          },
          {
            label: "왜 배우나요?",
            desc: "자동화, 원격 서버 작업, 대부분의 AI 개발 도구가 CLI 기반이라 개발자에게 꼭 필요한 능력입니다.",
          },
        ],
      },
      {
        id: "python",
        label: "Python",
        desc: "AI·자동화 실습에 쓰는 프로그래밍 언어. 문법이 쉬워 입문자에게 적합합니다.",
        children: [
          { label: "설치 확인", desc: "터미널에 python --version을 입력해 설치가 잘 됐는지 확인합니다." },
          { label: "pip", desc: "다른 사람이 만든 코드 뭉치(패키지)를 설치해주는 도구입니다." },
          { label: "가상환경", desc: "프로젝트마다 독립된 파이썬 공간을 만들어 패키지 충돌을 막습니다." },
        ],
      },
      {
        id: "ide",
        label: "IDE",
        desc: "코드를 작성·실행·디버깅하는 통합 개발 환경. 목적에 따라 여러 종류를 골라 씁니다.",
        children: [
          { label: "IDLE", desc: "파이썬 설치 시 기본으로 함께 설치되는 가장 단순한 코드 편집기입니다." },
          { label: "주피터 노트북", desc: "코드와 실행 결과, 설명을 한 화면에서 볼 수 있는 노트북 형태의 개발 환경. 데이터 분석·AI 실습에 많이 씁니다." },
          { label: "구글 Colab", desc: "구글 클라우드에서 무료로 실행되는 주피터 노트북. 설치 없이 브라우저에서 바로 코드를 실행할 수 있습니다." },
          { label: "VS Code", desc: "탐색기·에디터·터미널이 한 화면에 모인 범용 코드 편집기. 확장 프로그램으로 기능을 자유롭게 확장할 수 있습니다." },
        ],
      },
      {
        id: "chatgpt",
        label: "ChatGPT",
        desc: "ChatGPT 같은 생성형 AI가 나오기까지, 어떤 기술이 쌓여왔는지 순서대로 살펴봅니다.",
        children: [
          { label: "머신러닝", desc: "데이터를 통해 규칙을 스스로 학습하는 프로그래밍 방식입니다. 사람이 규칙을 일일이 코딩하지 않아도 됩니다." },
          { label: "딥러닝", desc: "인공신경망을 여러 층으로 쌓아 학습하는 머신러닝의 한 갈래로, 이미지·음성·언어 인식 성능을 크게 끌어올렸습니다." },
          { label: "CNN", desc: "이미지의 패턴(선, 모양 등)을 인식하는 데 특화된 딥러닝 구조입니다. 사진 분류, 얼굴 인식 등에 쓰입니다." },
          { label: "RNN", desc: "순서가 있는 데이터(문장, 시계열)를 처리하기 위해 이전 정보를 기억하며 학습하는 구조입니다." },
          { label: "언어모델", desc: "다음에 올 단어를 확률적으로 예측하도록 학습된 모델입니다. 문장을 생성하는 능력의 기반이 됩니다." },
          { label: "구글 트랜스포머", desc: "2017년 구글이 발표한 구조로, 문장 전체를 한 번에 보고 관계를 파악합니다. 오늘날 모든 생성형 AI의 근간입니다." },
          { label: "Foundation Model", desc: "대량의 데이터로 미리 학습된 범용 모델입니다. 이걸 바탕으로 ChatGPT 같은 다양한 AI 서비스가 만들어집니다." },
        ],
      },
      {
        id: "front-backend",
        label: "Front/Backend",
        desc: "웹 서비스는 사용자가 보는 부분과, 뒤에서 데이터를 처리하는 부분으로 나뉩니다.",
        children: [
          { label: "Frontend", desc: "사용자가 직접 보고 클릭하는 화면(UI)을 만드는 영역입니다. HTML/CSS/JavaScript가 대표적입니다." },
          { label: "Backend", desc: "데이터 저장, 로그인 처리 등 화면 뒤에서 로직을 처리하는 영역입니다. 서버와 데이터베이스가 여기 속합니다." },
          { label: "API", desc: "프론트엔드와 백엔드가 데이터를 주고받는 약속된 통로입니다." },
        ],
      },
      {
        id: "ai-ecosystem",
        label: "AI Ecosystem",
        desc: "시중의 AI 제품은 크게 5가지 유형으로 나눠볼 수 있습니다.",
        children: [
          {
            label: "① LLM 보유 업체",
            desc: "직접 대규모 언어모델을 만들어 API로 제공하는 회사입니다. 예: OpenAI(GPT), Anthropic(Claude), Google(Gemini), Meta(Llama).",
          },
          {
            label: "② LLM 활용 프로그램",
            desc: "다른 회사의 LLM을 가져와 특정 서비스로 만든 프로그램입니다. 예: 뤼튼, Perplexity, Notion AI, 감마(Gamma).",
          },
          {
            label: "③ 코딩 에이전트",
            desc: "코드 작성·수정·실행을 대신 해주는 AI 도구입니다. 예: GitHub Copilot, Cursor, Claude Code.",
          },
          {
            label: "④ 자동화 툴",
            desc: "여러 앱을 연결해 반복 업무를 자동으로 처리해주는 도구입니다. 예: Zapier, Make, n8n.",
          },
          {
            label: "⑤ 에이전트 특화 프로그램",
            desc: "목표만 주면 스스로 계획을 세우고 여러 단계를 실행하는 자율형 AI입니다. 예: Manus, OpenAI Operator, AutoGPT.",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "웹앱 제작 & 배포",
    topics: [
      {
        id: "claude-features",
        label: "Claude 3가지 활용법",
        desc: "본격적으로 웹앱을 만들기 전에, 클로드가 할 수 있는 일을 먼저 살펴봅니다.",
        children: [
          { label: "챗팅 방식", desc: "대화창에서 질문하고 답을 받는 가장 기본적인 사용 방식입니다. 글쓰기, 요약, 브레인스토밍 등에 씁니다." },
          { label: "Co-work", desc: "문서나 기획안을 클로드와 함께 다듬어가며 만드는 협업 방식입니다. 결과물을 주고받으며 완성도를 높입니다." },
          { label: "Code", desc: "클로드 코드로 실제 코드를 작성·실행·수정하는 방식입니다. 터미널이나 IDE 안에서 개발자와 함께 작업합니다." },
        ],
      },
      {
        id: "claude-code-usage",
        label: "클로드 코드 사용방법 3가지",
        desc: "클로드 코드를 실제로 쓰는 세 가지 방식입니다.",
        children: [
          { label: "PC 설치형으로 사용", desc: "컴퓨터에 앱을 설치해서 GUI 화면으로 클로드 코드를 사용하는 방식입니다." },
          { label: "터미널에서 사용 (CLI)", desc: "터미널에서 claude 명령어로 실행해서 코드 작성·수정을 대화형으로 요청합니다." },
          { label: "IDE 확장", desc: "VS Code 같은 에디터 안에 통합돼서, 코드를 보면서 바로 요청하고 적용합니다." },
        ],
      },
      {
        id: "vanilla-webapp",
        label: "Vanilla Webapp 제작",
        desc: "프레임워크 없이 순수 HTML/CSS/JavaScript만으로 나만의 웹앱을 만듭니다.",
        children: [
          { label: "HTML", desc: "웹페이지의 뼈대(구조)를 만드는 마크업 언어입니다." },
          { label: "CSS", desc: "색상, 레이아웃, 폰트 등 디자인을 입히는 스타일 언어입니다." },
          { label: "JavaScript", desc: "버튼 클릭, 데이터 처리 등 웹페이지에 동작을 부여하는 프로그래밍 언어입니다." },
        ],
      },
      {
        id: "netlify-drop",
        label: "Netlify Drop 배포",
        desc: "만든 웹앱 파일을 드래그 앤 드롭만으로 인터넷에 무료 배포합니다.",
        children: [
          { label: "정적 사이트 호스팅", desc: "서버 코드 없이 HTML/CSS/JS 파일만으로 동작하는 웹사이트를 올려두는 방식입니다." },
          { label: "배포 URL", desc: "업로드하면 즉시 전 세계 어디서나 접속 가능한 주소가 생성됩니다." },
          { label: "PWA", desc: "홈 화면에 추가해서 앱처럼 쓸 수 있게 해주는 웹 기술입니다." },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "DB 연동 & 정식 배포",
    topics: [
      {
        id: "supabase",
        label: "Supabase",
        desc: "오픈소스 Firebase 대안. 데이터베이스·인증·실시간 기능을 API로 손쉽게 씁니다.",
        children: [
          { label: "데이터베이스", desc: "회원 정보, 게시글 같은 데이터를 저장하고 관리하는 공간입니다." },
          { label: "Auth", desc: "로그인·회원가입 같은 사용자 인증 기능을 자동으로 제공합니다." },
          { label: "Realtime", desc: "데이터가 바뀌면 화면에 즉시 반영되는 실시간 동기화 기능입니다." },
        ],
      },
      {
        id: "dashboard",
        label: "Dashboard (React/Vite)",
        desc: "컴포넌트 기반 라이브러리 React와 빠른 빌드 도구 Vite로 진짜 웹앱을 만듭니다.",
        children: [
          { label: "React", desc: "재사용 가능한 컴포넌트로 UI를 조립하는 자바스크립트 라이브러리입니다." },
          { label: "Vite", desc: "개발 서버 실행과 빌드가 매우 빠른 최신 프론트엔드 빌드 도구입니다." },
          { label: "컴포넌트", desc: "버튼, 카드처럼 재사용 가능한 UI 조각 단위입니다." },
        ],
      },
      {
        id: "git-commit",
        label: "Git Commit",
        desc: "코드가 바뀐 시점을 기록하고 되돌릴 수 있게 관리하는 버전 관리 습관입니다.",
        children: [
          { label: "add / commit", desc: "변경사항을 담고(add) 기록을 남기는(commit), 커밋의 기본 흐름입니다." },
          { label: "커밋 메시지", desc: "무엇을, 왜 바꿨는지 남기는 짧은 기록입니다. 나중의 나와 동료를 위한 것입니다." },
          { label: "GitHub", desc: "커밋 기록을 온라인에 올려 백업하고 공유하는 서비스입니다." },
        ],
      },
      {
        id: "vercel-deploy",
        label: "Vercel 배포",
        desc: "React 같은 프레임워크 프로젝트를 Git 저장소와 연결해 자동으로 배포합니다.",
        children: [
          { label: "Git 연동 배포", desc: "GitHub 저장소를 연결하면 코드를 푸시할 때마다 자동으로 재배포됩니다." },
          { label: "프리뷰 배포", desc: "브랜치마다 별도의 임시 URL이 생겨 배포 전에 미리 확인할 수 있습니다." },
          { label: "환경변수", desc: "API 키처럼 코드에 직접 넣으면 안 되는 값을 안전하게 설정하는 곳입니다." },
        ],
      },
    ],
  },
];
