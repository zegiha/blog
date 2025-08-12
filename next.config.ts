import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        // 브라우저에게 색상 테마 힌트를 달라고 알림
        { key: 'Accept-CH', value: 'Sec-CH-Prefers-Color-Scheme' },
        // 첫 네비게이션에서도 힌트를 주도록 요청(크로뮴 계열)
        { key: 'Critical-CH', value: 'Sec-CH-Prefers-Color-Scheme' },
        // 캐시 키에 포함(라우터/프록시 캐시 안전)
        { key: 'Vary', value: 'Sec-CH-Prefers-Color-Scheme' },
      ],
    }
  ]
};

export default nextConfig;
