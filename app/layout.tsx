// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SOULCORE · 일주 × MBTI × 혈액형 코어 성향",
  description:
    "사주 일주, MBTI, 혈액형을 가볍게 묶어서 지금 나의 핵심 성향을 정리하는 라이트 분석 서비스.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="max-w-xl mx-auto px-4 pt-5 pb-16 page-shell">
          {/* HEADER */}
          <header className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.24em] text-slate-400">
                SOULCORE
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                ILJU · MBTI · BLOODTYPE
              </p>
            </div>
            <Link href="/test">
              <span className="badge hover:opacity-90">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6cc5ff]" />
                코어 성향 바로 보기
              </span>
            </Link>
          </header>

          {children}

          <footer className="mt-10 text-center small opacity-70">
            입력한 정보는 저장되지 않고, 브라우저에서만 처리됩니다.
          </footer>
        </div>
      </body>
    </html>
  );
}
