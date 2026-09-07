/** @type {import('next').NextConfig} */
const nextConfig = {
  // 정적 사이트로 export (Netlify Drop 등 빌드 없이 배포하기 위함).
  // 서버 로직이 없어 전 경로가 정적 프리렌더 대상이다.
  output: "export",
  // export 모드에서는 next/image 서버 최적화를 쓸 수 없으므로 원본을 그대로 서빙한다.
  images: { unoptimized: true },
};

export default nextConfig;
