// app/test/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { calcIljuFromDate } from "../../utils/calcIlju";

const MBTI_TYPES = [
  "ISTJ",
  "ISFJ",
  "INFJ",
  "INTJ",
  "ISTP",
  "ISFP",
  "INFP",
  "INTP",
  "ESTP",
  "ESFP",
  "ENFP",
  "ENTP",
  "ESTJ",
  "ESFJ",
  "ENFJ",
  "ENTJ",
] as const;

const BLOOD_TYPES = ["A", "B", "O", "AB"] as const;

export default function TestPage() {
  const router = useRouter();
  const [birth, setBirth] = useState("");
  const [mbti, setMbti] = useState<string>("");
  const [blood, setBlood] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!birth) {
      setError("생년월일을 입력해 주세요.");
      return;
    }
    if (!mbti) {
      setError("MBTI 유형을 선택해 주세요.");
      return;
    }
    if (!blood) {
      setError("혈액형을 선택해 주세요.");
      return;
    }

    const ilju = calcIljuFromDate(birth);
    if (!ilju) {
      setError("일주 계산에 문제가 발생했습니다. 입력값을 다시 확인해 주세요.");
      return;
    }

    const search = new URLSearchParams({
      ilju,
      mbti,
      blood,
    }).toString();

    router.push(`/result?${search}`);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-700/60 bg-violet-900/30 px-3 py-1 text-[11px] text-violet-200/90">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
          STEP 1 · 기본 정보 세 가지
        </div>
        <h1 className="text-[18px] font-semibold text-slate-50 sm:text-[20px]">
          이름 대신,
          <br />
          당신의 패턴만 살짝 알려 주세요.
        </h1>
        <p className="text-[13px] leading-relaxed text-slate-400">
          생년월일은 <span className="font-medium text-slate-200">일주</span>를
          계산하는 데 쓰이고, MBTI와 혈액형은{" "}
          <span className="font-medium text-slate-200">
            이미 알고 있는 정보 그대로
          </span>{" "}
          사용합니다.
          <br />
          입력한 내용은 서버에 저장되지 않고, 브라우저 안에서만 처리됩니다.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 sm:p-5"
      >
        {/* 생년월일 */}
        <div className="space-y-2">
          <label className="text-[11px] font-medium text-slate-200">
            ① 생년월일 <span className="text-rose-400">*</span>
          </label>
          <input
            type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-black/60 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
          />
          <p className="text-[11px] text-slate-500">
            양력 기준으로 입력해 주세요.
          </p>
        </div>

        {/* MBTI */}
        <div className="space-y-2">
          <label className="text-[11px] font-medium text-slate-200">
            ② MBTI 유형 <span className="text-rose-400">*</span>
          </label>
          <select
            value={mbti}
            onChange={(e) => setMbti(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-black/60 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
          >
            <option value="">선택해 주세요</option>
            {MBTI_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-500">
            확신이 안 들면, 평소 가장 많이 듣는 유형을 선택해도 괜찮아요.
          </p>
        </div>

        {/* 혈액형 */}
        <div className="space-y-2">
          <label className="text-[11px] font-medium text-slate-200">
            ③ 혈액형 <span className="text-rose-400">*</span>
          </label>
          <div className="grid grid-cols-4 gap-2">
            {BLOOD_TYPES.map((type) => {
              const active = blood === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setBlood(type)}
                  className={
                    "flex flex-col items-center justify-center rounded-xl border px-2 py-2 text-[12px] transition " +
                    (active
                      ? "border-cyan-300 bg-cyan-300/10 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.6)]"
                      : "border-slate-700 bg-black/60 text-slate-300 hover:border-slate-500")
                  }
                >
                  <span className="font-semibold">{type}</span>
                  <span className="text-[10px] text-slate-500">형</span>
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <p className="rounded-xl border border-rose-500/50 bg-rose-950/50 px-3 py-2 text-[11px] text-rose-100">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 px-4 py-2.5 text-sm font-medium text-slate-900 shadow-[0_0_30px_rgba(79,70,229,0.8)] transition hover:brightness-110"
        >
          내 코어 성향 리포트 보기
        </button>
      </form>
    </div>
  );
}
