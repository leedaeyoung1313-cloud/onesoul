// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-6">
      {/* Intro */}
      <div className="panel space-y-3">
        <h2 className="text-xl font-semibold">SOULCORE 코어 성향 분석</h2>
        <p className="small leading-relaxed">
          사주의 중심축인 <span className="text-accent">일주</span>, 
          사고 패턴을 보여주는 <span className="text-accent">MBTI</span>, 
          감정 톤의 힌트를 주는 <span className="text-accent">혈액형</span>을 가볍게 종합해,
          지금의 나를 이해하는 라이트 리포트를 제공합니다.
        </p>

        <Link href="/test">
          <button className="btn-primary mt-2">1분 만에 시작하기</button>
        </Link>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="panel small">
          <h3 className="font-semibold mb-1">일주(사주)</h3>
          타고난 기질과 기본 방향성
        </div>
        <div className="panel small">
          <h3 className="font-semibold mb-1">MBTI</h3>
          사고·행동 패턴
        </div>
        <div className="panel small">
          <h3 className="font-semibold mb-1">혈액형</h3>
          감정 표현과 분위기
        </div>
        <div className="panel small">
          <h3 className="font-semibold mb-1">라이트 분석</h3>
          과하지 않게 필요한 핵심만 요약
        </div>
      </div>
    </main>
  );
}
