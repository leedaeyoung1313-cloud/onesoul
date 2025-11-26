// utils/analyzeCoreProfile.ts
import { iljuProfiles } from "../data/iljuProfiles";
import { mbtiProfiles, MbtiType } from "../data/mbtiProfiles";
import { bloodProfiles, BloodType } from "../data/bloodProfiles";

export interface CoreAnalysisInput {
  ilju: string;
  mbti: string;
  blood: string;
}

export interface CoreAnalysisResult {
  headline: string;
  overview: string;
  tags: string[];
  strengths: string[];
  weaknesses: string[];
  tips: string[];
}

export function analyzeCoreProfile(
  input: CoreAnalysisInput
): CoreAnalysisResult {
  const iljuKey = input.ilju || "병술";
  const iljuProfile = iljuProfiles[iljuKey] ?? iljuProfiles["병술"];

  const mbtiKey = (input.mbti.toUpperCase() || "INFJ") as MbtiType;
  const mbtiProfile = mbtiProfiles[mbtiKey] ?? mbtiProfiles["INFJ"];

  const bloodKey = (input.blood.toUpperCase() || "A") as BloodType;
  const bloodProfile = bloodProfiles[bloodKey] ?? bloodProfiles["A"];

  const headline = `${iljuProfile.label} · ${mbtiProfile.code} · ${bloodProfile.nickname}`;

  const tags = [
    iljuProfile.nickname,
    mbtiProfile.nickname,
    `${bloodProfile.code}형`,
  ];

  const overviewParts: string[] = [];

  // 일주 기반 메인 설명
  overviewParts.push(iljuProfile.summary);

  // MBTI 기질과의 결합 설명
  overviewParts.push(
    `${mbtiProfile.code} 유형의 “${mbtiProfile.nickname}” 기질이 더해지면서, 상황을 바라보고 움직이는 방식에서는 MBTI 특유의 사고 패턴이 보다 또렷하게 드러납니다.`
  );

  // 혈액형 톤 설명
  overviewParts.push(
    `${bloodProfile.code}형의 “${bloodProfile.nickname}” 성향은 감정을 표현하고 관계를 조율하는 과정에서 미묘한 톤을 더해, 주변 사람들이 느끼는 당신의 인상을 결정짓는 데 영향을 줍니다.`
  );

  const overview = overviewParts.join(" ");

  // 강점: 일주 2 + MBTI 1
  const strengths = [
    ...iljuProfile.strengths.slice(0, 2),
    ...mbtiProfile.strengths.slice(0, 1),
  ];

  // 약점: 일주 2 + MBTI 1
  const weaknesses = [
    ...iljuProfile.weaknesses.slice(0, 2),
    ...mbtiProfile.weaknesses.slice(0, 1),
  ];

  // 팁: 일주 팁 2 + 혈액형 요약/팁
  const tips = [
    ...iljuProfile.tips.slice(0, 2),
    bloodProfile.summary,
    ...bloodProfile.tips.slice(0, 1),
  ];

  return {
    headline,
    overview,
    tags,
    strengths,
    weaknesses,
    tips,
  };
}
