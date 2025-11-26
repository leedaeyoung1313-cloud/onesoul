// app/result/page.tsx
import Link from "next/link";
import { analyzeCoreProfile } from "../../utils/analyzeCoreProfile";

type ResultPageProps = {
  searchParams?: {
    ilju?: string;
    mbti?: string;
    blood?: string;
  };
};

export default function ResultPage({ searchParams }: ResultPageProps) {
  const ilju = searchParams?.ilju ?? "";
  const mbti = searchParams?.mbti ?? "";
  const blood = searchParams?.blood ?? "";

  if (!ilju || !mbti || !blood) {
    return (
      <main className="space-y-4">
        <div className="panel small">
          <p>분석에 필요한 정보가 부족합니다.</p>
          <p className="mt-1">
            생년월일 · MBTI · 혈액형을 다시 입력해 주세요.
          </p>
          <Link href="/test">
            <button className="btn-primary mt-3">입력 페이지로 이동</button>
          </Link>
        </div>
      </main>
    );
  }

  const result = analyzeCoreProfile({ ilju, mbti, blood });

  return (
    <main className="space-y-6">
      {/* 요약 */}
      <section className="panel space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-[18px] font-semibold">코어 성향 요약</h2>
          <span className="small">
            기준: {ilju} · {mbti} · {blood}형
          </span>
        </div>
        <p className="small leading-relaxed">{result.overview}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {result.tags.map((tag) => (
            <span key={tag} className="badge">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* 강점 */}
      <section className="panel">
        <h3 className="font-semibold mb-2 text-[14px]">이 조합의 강점</h3>
        <ul className="small space-y-1.5">
          {result.strengths.map((s, i) => (
            <li key={i}>• {s}</li>
          ))}
        </ul>
      </section>

      {/* 주의할 점 */}
      <section className="panel">
        <h3 className="font-semibold mb-2 text-[14px]">주의하면 좋은 부분</h3>
        <ul className="small space-y-1.5">
          {result.weaknesses.map((s, i) => (
            <li key={i}>• {s}</li>
          ))}
        </ul>
      </section>

      {/* 팁 */}
      <section className="panel">
        <h3 className="font-semibold mb-2 text-[14px]">알아두면 도움이 되는 팁</h3>
        <ul className="small space-y-1.5">
          {result.tips.map((t, i) => (
            <li key={i}>• {t}</li>
          ))}
        </ul>

        <Link href="/test">
          <button className="btn-primary mt-4">
            다른 조합으로 다시 보기
          </button>
        </Link>
      </section>
    </main>
  );
}
