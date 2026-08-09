/**
 * pwaGenerator.js
 * 생성된 HTML 코드를 모바일 앱처럼 설치할 수 있게 도와주는 PWA 파일들을 생성합니다.
 */

// 1. manifest.json 생성
export function generateManifest({ businessName, themeColor }) {
  const manifest = {
    name: businessName || "나만의 비즈니스 앱",
    short_name: businessName || "비즈니스",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF8E7",
    theme_color: themeColor || "#FFE156",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable"
      }
    ]
  };
  return JSON.stringify(manifest, null, 2);
}

// 2. service-worker.js 생성 (오프라인 캐싱 지원)
export function generateServiceWorker() {
  return `
const CACHE_NAME = "antigravity-pwa-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
  `.trim();
}

// 3. 임시 아이콘 (SVG) 생성 - 입력받은 이름의 첫 글자와 브랜드 컬러 사용
export function generateIconSvg({ businessName, themeColor }) {
  const firstLetter = (businessName || "앱").charAt(0);
  
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="120" fill="${themeColor || '#FFE156'}" stroke="#1A1A2E" stroke-width="24"/>
  <text x="50%" y="55%" font-size="280" font-weight="900" font-family="sans-serif" fill="#1A1A2E" text-anchor="middle" dominant-baseline="middle">
    ${firstLetter}
  </text>
</svg>
  `.trim();
}
