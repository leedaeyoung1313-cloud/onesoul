// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SOULCORE · 라이트 코어 성향 분석",
  description: "사주 일주 · MBTI · 혈액형 기반 코어 성향 라이트 분석",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="max-w-xl mx-auto p-5 pb-20">
          {/* HEADER */}
          <header className="flex items-center justify-between mb-5">
            <h1 className="text-lg font-semibold tracking-tight">SOULCORE</h1>

            <Link
              href="/test"
              className="badge hover:opacity-90 transition"
            >
              바로 분석
            </Link>
          </header>

          {children}

          <footer className="mt-10 text-center small opacity-60">
            입력 정보는 저장되지 않으며 브라우저에서만 처리됩니다.
          </footer>
        </div>
      </body>
    </html>
  );
}
