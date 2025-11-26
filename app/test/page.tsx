// app/test/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { calcIljuFromDate } from "../../utils/calcIlju";

const MBTIS = [
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

const BLOODS = ["A", "B", "O", "AB"] as const;

export default function TestPage() {
  const router = useRouter();

  const [birth, setBirth] = useState("");
  const [mbti, setMbti] = useState("");
  const [blood, setBlood] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!birth || !mbti || !blood) {
      setError("모든 항목을 입력해 주세요.");
      return;
    }

    const ilju = calcIljuFromDate(birth);

    const query = new URLSearchParams({
      ilju,
      mbti,
      blood,
    }).toString();

    router.push(`/result?${query}`);
  };

  return (
    <main className="space-y-6">
      <section className="panel space-y-4">
        <div className="badge">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6cc5ff]" />
          STEP 1 · 기본 정보 세 가지
        </div>

        <div className="space-y-1">
          <h2 className="text-[18px] font-semibold">
            이름 대신,
            <br />
            당신의 패턴만 살짝 알려 주세요.
          </h2>
          <p className="small">
            생년월일은 <span className="text-accent">일주</span> 계산에만 쓰이고,
            MBTI와 혈액형은{" "}
            <span className="text-slate-100 font-medium">
              이미 알고 있는 정보 그대로
            </span>{" "}
            사용합니다.
            <br />
            입력 내용은 서버에 저장되지 않고, 브라우저 안에서만 처리됩니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 생년월일 */}
          <div>
            <p className="label">생년월일</p>
            <input
              type="date"
              className="input"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
            />
          </div>

          {/* MBTI */}
          <div>
            <p className="label">MBTI</p>
            <select
              className="input"
              value={mbti}
              onChange={(e) => setMbti(e.target.value)}
            >
              <option value="">선택</option>
              {MBTIS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <p className="small mt-1">
              확신이 안 들면, 평소 가장 많이 듣는 유형을 선택해도 괜찮습니다.
            </p>
          </div>

          {/* 혈액형 */}
          <div>
            <p className="label">혈액형</p>
            <div className="grid grid-cols-4 gap-2">
              {BLOODS.map((b) => {
                const active = blood === b;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBlood(b)}
                    className={
                      "rounded-lg border py-2 text-[13px] " +
                      (active
                        ? "border-[#6cc5ff] bg-[#0f2330] text-[#e6f6ff]"
                        : "border-[rgba(63,68,80,0.8)] bg-[#0f1116] text-slate-300")
                    }
                  >
                    {b}형
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <p className="small text-warn">⚠ {error}</p>
          )}

          <button type="submit" className="btn-primary mt-1">
            내 코어 성향 리포트 보기
          </button>
        </form>
      </section>
    </main>
  );
}
