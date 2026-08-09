/**
 * codeGenerator.js
 * AI가 생성해 주는 코드를 흉내 내는(Mock) 템플릿 엔진입니다.
 * 수강생이 입력한 데이터를 바탕으로 풀스크린 반응형 + 동적 콘텐츠(이미지/지도)를 생성합니다.
 */
export function generateInitialCode({ businessName, product, targetCustomer, brandColor }) {
  // 1. 브랜드 컬러 매핑
  const colorMap = {
    yellow: "#FFE156",
    pink: "#FF6B9D",
    blue: "#6EC6FF",
    green: "#7BED9F",
  };
  const themeColor = colorMap[brandColor] || "#FFE156";

  // 2. 스마트 키워드 분석 (Mock AI)
  // 2-1. 위치 키워드 분석 -> 구글 맵 URL
  let location = "서울역"; // 기본값
  if (businessName.includes("강남")) location = "강남역";
  else if (businessName.includes("홍대")) location = "홍대입구역";
  else if (businessName.includes("부산")) location = "부산역";
  
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  // 2-2. 상품 키워드 분석 -> 고화질 배경 이미지 (Unsplash)
  let bgImage = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1920&q=80"; // 기본 맛집 사진
  if (businessName.includes("붕어") || product.includes("붕어") || product.includes("빵")) {
    bgImage = "https://images.unsplash.com/photo-1596450514735-111a2fe02935?auto=format&fit=crop&w=1920&q=80"; // 페이스트리/빵 사진
  } else if (businessName.includes("커피") || product.includes("커피")) {
    bgImage = "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1920&q=80"; // 커피 사진
  }

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${businessName || "나만의 비즈니스 앱"}</title>
  <style>
    /* 네오 브루탈리즘 기본 스타일 */
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800;900&display=swap');
    
    :root {
      --bg-color: #FFF8E7;
      --text-color: #1A1A2E;
      --theme-color: ${themeColor};
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Outfit', sans-serif;
      background-color: var(--bg-color);
      color: var(--text-color);
      overflow-x: hidden;
    }

    /* 반응형 네비게이션 바 */
    .navbar {
      background-color: var(--theme-color);
      border-bottom: 4px solid var(--text-color);
      padding: 20px 5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .navbar h1 {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: -1px;
    }
    .hamburger {
      font-size: 28px;
      cursor: pointer;
    }

    /* 반응형 메인 히어로 배너 (화면 꽉 차게) */
    .hero {
      position: relative;
      width: 100%;
      min-height: 70vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 40px 5%;
      background-image: url('${bgImage}');
      background-size: cover;
      background-position: center;
      border-bottom: 4px solid var(--text-color);
    }
    /* 배경 어둡게 깔아서 글씨 잘 보이게 */
    .hero::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: rgba(26, 26, 46, 0.6);
      z-index: 1;
    }
    .hero-content {
      position: relative;
      z-index: 2;
    }
    .hero-badge {
      display: inline-block;
      background-color: var(--theme-color);
      color: var(--text-color);
      font-weight: 900;
      font-size: 20px;
      padding: 8px 16px;
      border: 4px solid var(--text-color);
      margin-bottom: 24px;
      transform: rotate(-3deg);
      box-shadow: 4px 4px 0px var(--text-color);
    }
    .hero h2 {
      font-size: clamp(36px, 8vw, 64px);
      font-weight: 900;
      line-height: 1.2;
      color: #FFF;
      text-shadow: 4px 4px 0px var(--text-color);
      margin-bottom: 20px;
      word-break: keep-all;
    }

    /* 본문 컨텐츠 영역 (화면 중앙 정렬, 최대 너비 제한) */
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 60px 5%;
    }

    /* 그리드 레이아웃 (PC에서는 가로로 2개, 모바일은 세로로) */
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin-bottom: 60px;
    }

    /* 브루탈리즘 카드 */
    .card {
      background-color: #FFF;
      border: 4px solid var(--text-color);
      box-shadow: 8px 8px 0px var(--text-color);
      padding: 30px;
      transition: transform 0.2s;
      height: 100%;
    }
    .card:hover {
      transform: translate(-4px, -4px);
      box-shadow: 12px 12px 0px var(--text-color);
    }
    .card-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }
    .card h3 {
      font-size: 28px;
      font-weight: 900;
      margin-bottom: 12px;
      background-color: var(--theme-color);
      display: inline-block;
      padding: 4px 8px;
      border: 2px solid var(--text-color);
    }
    .card p {
      font-size: 18px;
      font-weight: 600;
      line-height: 1.6;
    }

    /* 지도 섹션 */
    .map-section {
      border: 4px solid var(--text-color);
      box-shadow: 8px 8px 0px var(--text-color);
      background-color: #FFF;
      padding: 20px;
    }
    .map-section h2 {
      font-size: 32px;
      font-weight: 900;
      margin-bottom: 20px;
      text-align: center;
    }
    .map-container {
      width: 100%;
      height: 400px;
      border: 4px solid var(--text-color);
    }
    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  </style>
</head>
<body>
  
  <!-- 네비게이션 바 -->
  <div class="navbar">
    <h1>${businessName || "비즈니스 이름"}</h1>
    <div class="hamburger">☰</div>
  </div>
  
  <!-- 메인 배너 (Hero - 반응형 풀스크린 이미지) -->
  <div class="hero">
    <div class="hero-content">
      <div class="hero-badge">NEW OPEN</div>
      <h2>우주에서 제일 맛있는<br/>${product || "특별한 상품"}</h2>
    </div>
  </div>
  
  <!-- 상세 컨텐츠 -->
  <div class="container">
    
    <div class="grid-container">
      <!-- 특징 카드 1 -->
      <div class="card">
        <div class="card-icon">🛍️</div>
        <h3>시그니처 메뉴</h3>
        <p>저희 매장의 자랑, <strong>${product || "비법 상품"}</strong>입니다. 최상의 재료로 정성껏 준비했습니다. 한 번 맛보면 멈출 수 없어요!</p>
      </div>

      <!-- 특징 카드 2 -->
      <div class="card">
        <div class="card-icon">🎯</div>
        <h3>이런 분들께 추천해요</h3>
        <p><strong>${targetCustomer || "특별한 당신"}</strong>을 위해 준비했습니다. 지친 하루에 확실한 힐링이 되어 드릴게요.</p>
      </div>
    </div>

    <!-- 오시는 길 (스마트 구글 지도) -->
    <div class="map-section">
      <h2>📍 오시는 길 (${location})</h2>
      <div class="map-container">
        <iframe src="${mapUrl}" allowfullscreen="" loading="lazy"></iframe>
      </div>
    </div>

  </div>

</body>
</html>`;
}
