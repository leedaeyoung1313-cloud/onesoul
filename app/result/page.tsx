// app/result/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { analyzeCoreProfile } from "../../utils/analyzeCoreProfile";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const ilju = searchParams.get("ilju") ?? "";
  const mbti = searchParams.get("mbti") ?? "";
  const blood = searchParams.get("blood") ?? "";

  if (!ilju || !mbti || !blood) {
    return (
      <div className="space-y-4">
        <p className="text-sm font-semibold text-slate-100">
          분석에 필요한 정보가 부족합니다.
        </p>
        <p className="text-[13px] text-slate-400">
          생년월일 · MBTI · 혈액형을 다시 입력해 주세요.
        </p>
        <button
          onClick={() => router.push("/test")}
          className="rounded-xl border border-slate-700 bg-black/70 px-4 py-2 text-[12px] font-medium text-slate-100 hover:border-violet-400 hover:text-violet-100"
        >
          입력 페이지로 이동
        </button>
      </div>
    );
  }

  const result = analyzeCoreProfile({
    ilju,
    mbti,
    blood,
  });

  return (
    <div className="space-y-8">
      {/* 상단 요약 카드 */}
      <section className="rounded-2xl border border-violet-800/70 bg-black/80 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.9)] sm:p-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] font-medium tracking-[0.2em] text-violet-300/80">
              CORE PROFILE SUMMARY
            </p>
            <div className="rounded-full border border-violet-700/70 bg-violet-900/40 px-3 py-1 text-[10px] text-violet-100">
              {ilju} · {mbti} · {blood}형 기준
            </div>
          </div>

          <h1 className="text-[18px] font-semibold text-slate-50 sm:text-[20px]">
            {result.headline}
          </h1>

          <p className="text-[13px] leading-relaxed text-slate-300">
            {result.overview}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {result.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-900/80 px-2.5 py-1 text-[10px] text-slate-300 border border-slate-700/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 장점 / 단점 / 팁 카드 3개 */}
      <section className="grid gap-3 sm:grid-cols-3">
        <ResultCard
          title="이 조합의 강점"
          subtitle="자연스럽게 잘 발휘되는 부분"
          items={result.strengths}
          tone="positive"
        />
        <ResultCard
          title="주의하면 좋은 부분"
          subtitle="조금만 의식해도 편해지는 포인트"
          items={result.weaknesses}
          tone="neutral"
        />
        <ResultCard
          title="알아두면 좋은 팁"
          subtitle="일·관계·컨디션 관리에 도움 되는 가이드"
          items={result.tips}
          tone="tip"
        />
      </section>

      <div className="flex flex-col gap-2 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={() => router.push("/test")}
          className="w-full rounded-xl border border-slate-700 bg-black/70 px-4 py-2 text-[12px] font-medium text-slate-100 hover:border-violet-400 hover:text-violet-100 sm:w-auto"
        >
          다른 조합으로 다시 보기
        </button>
        <p>
          이 결과는 가볍게 참고용으로만 보시고, 실제 결정은 본인의 판단을
          우선해 주세요.
        </p>
      </div>
    </div>
  );
}

function ResultCard({
  title,
  subtitle,
  items,
  tone,
}: {
  title: string;
  subtitle: string;
  items: string[];
  tone: "positive" | "neutral" | "tip";
}) {
  const border =
    tone === "positive"
      ? "border-emerald-400/60"
      : tone === "tip"
      ? "border-cyan-400/60"
      : "border-slate-700";

  const badgeBg =
    tone === "positive"
      ? "bg-emerald-400/15 text-emerald-100 border-emerald-400/50"
      : tone === "tip"
      ? "bg-cyan-400/15 text-cyan-100 border-cyan-400/50"
      : "bg-slate-800/80 text-slate-100 border-slate-600";

  return (
    <div
      className={`flex h-full flex-col gap-3 rounded-2xl border bg-slate-950/70 p-4 ${border}`}
    >
      <div className="space-y-1">
        <div
          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] ${badgeBg}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
          {title}
        </div>
        <p className="text-[11px] text-slate-400">{subtitle}</p>
      </div>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-slate-500" />
            <p className="text-[12px] leading-relaxed text-slate-300">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
