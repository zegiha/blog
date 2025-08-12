import type { Metadata } from "next";
import "./globals.css";
import { cookies } from 'next/headers';
import { headers } from 'next/headers';
import localFont from 'next/font/local'

const Pretendard = localFont({
  src: [
    {
      path: '../public/font/Pretendard-Regular.woff2',
      weight: '400'
    },
    {
      path: '../public/font/Pretendard-SemiBold.woff2',
      weight: '600',
    },
  ],
  display: 'swap',
  preload: true,
  adjustFontFallback: 'Arial',
})

export const metadata: Metadata = {
  title: "Zegiha's Blog",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeClass = await getThemeClass();

  return (
    <html lang="ko" className={`${themeClass ? themeClass : undefined}`}>
      <body className={Pretendard.className}>
        {children}
      </body>
    </html>
  );
}

async function getThemeClass() {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get('theme')?.value as 'light' | 'dark' | undefined;

  const h = await headers()
  const ch = h.get('sec-ch-prefers-color-scheme'); // 'light' | 'dark' | null

  const themeClassHeaders = ch === 'dark' ? 'dark' : ch === 'light' ? 'light' : undefined;

  // 쿠키가 light/dark이면 그대로, 아니면 undefined
  const themeClass = cookieTheme === 'dark'
    ? 'dark'
    : cookieTheme === 'light'
      ? 'light'
      : undefined;

  return themeClass ?? themeClassHeaders;
}