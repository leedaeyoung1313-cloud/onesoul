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

  // 필수 파라미터 없을 때
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

  const result = analyzeCoreProfile({
    ilju,
    mbti,
    blood,
  });

  return (
    <main className="space-y-6">
      {/* 요약 */}
      <div className="panel">
        <h2 className="text-lg font-semibold mb-2">{result.headline}</h2>
        <p className="small leading-relaxed">{result.overview}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          {result.tags.map((t) => (
            <span key={t} className="badge">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* 강점 */}
      <div className="panel">
        <h3 className="font-semibold mb-2">강점</h3>
        <ul className="small space-y-1">
          {result.strengths.map((s, i) => (
            <li key={i}>• {s}</li>
          ))}
        </ul>
      </div>

      {/* 주의할 점 */}
      <div className="panel">
        <h3 className="font-semibold mb-2">주의할 점</h3>
        <ul className="small space-y-1">
          {result.weaknesses.map((s, i) => (
            <li key={i}>• {s}</li>
          ))}
        </ul>
      </div>

      {/* 팁 */}
      <div className="panel">
        <h3 className="font-semibold mb-2">유용한 팁</h3>
        <ul className="small space-y-1">
          {result.tips.map((t, i) => (
            <li key={i}>• {t}</li>
          ))}
        </ul>

        <Link href="/test">
          <button className="btn-primary mt-4">
            다른 조합으로 다시 보기
          </button>
        </Link>
      </div>
    </main>
  );
}
