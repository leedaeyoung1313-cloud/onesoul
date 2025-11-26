// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-6">
      {/* 메인 소개 카드 */}
      <section className="panel space-y-3">
        <div className="badge">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6cc5ff]" />
          이름·연락처 없이, 가볍게 보는 코어 성향 리포트
        </div>

        <div>
          <h1 className="text-[20px] font-semibold leading-snug mb-2">
            일주 · MBTI · 혈액형을
            <br />
            한 장으로 정리하는{" "}
            <span className="text-accent">SOULCORE 분석</span>
          </h1>
          <p className="small">
            사주의 중심축인 <span className="text-accent">일주</span>, 익숙한{" "}
            <span className="text-accent">MBTI</span>, 감정 분위기를 더해주는{" "}
            <span className="text-accent">혈액형</span>을 라이트하게 종합해서
            <br />
            지나치게 운세처럼 흘려보지 않고,{" "}
            <span className="text-slate-100 font-medium">
              &quot;지금의 나&quot;를 이해하는 데 필요한 핵심만 요약
            </span>
            합니다.
          </p>
        </div>

        <Link href="/test">
          <button className="btn-primary mt-1">1분 만에 내 코어 성향 보기</button>
        </Link>
        <p className="small mt-1">
          생년월일 · MBTI · 혈액형만 입력하면 바로 결과가 생성됩니다.
        </p>
      </section>

      {/* 요소 설명 카드들 */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="panel small">
          <h3 className="font-semibold mb-1">일주(사주)</h3>
          타고난 기질과 기본 방향성을 보여주는 축입니다.
        </div>
        <div className="panel small">
          <h3 className="font-semibold mb-1">MBTI</h3>
          정보를 받아들이고 판단하는 방식, 행동 패턴을 설명합니다.
        </div>
        <div className="panel small">
          <h3 className="font-semibold mb-1">혈액형</h3>
          감정을 표현하고 관계를 맺는 분위기를 보조적으로 보여줍니다.
        </div>
        <div className="panel small">
          <h3 className="font-semibold mb-1">라이트 분석</h3>
          무거운 운세나 궁합이 아니라, 현실에서 바로 쓸 수 있는 정리만 담습니다.
        </div>
      </section>
    </main>
  );
}
