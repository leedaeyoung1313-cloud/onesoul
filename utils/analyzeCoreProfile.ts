// utils/analyzeCoreProfile.ts

import { iljuProfiles } from "../data/iljuProfiles";
import { mbtiProfiles, MbtiType } from "../data/mbtiProfiles";
import { bloodProfiles, BloodType } from "../data/bloodProfiles";
import type { IljuCode } from "./calcIlju";

export interface CoreAnalysisInput {
  ilju: IljuCode;
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
  const iljuProfile =
    iljuProfiles[input.ilju] ?? iljuProfiles["병술"]; // fallback

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

  const overview = [
    iljuProfile.summary,
    `${mbtiProfile.code} 유형 특유의 "${mbtiProfile.nickname}" 기질이 더해져, 생각하고 움직이는 방식에서는 MBTI 색이 더 뚜렷하게 드러납니다.`,
    `여기에 ${bloodProfile.code}형의 "${bloodProfile.nickname}" 분위기가 섞여, 감정을 표현하고 관계를 맺는 방식에 작은 톤을 더해 줍니다.`,
  ]
    .join(" ")
    .trim();

  const strengths = [
    ...iljuProfile.strengths.slice(0, 2),
    ...mbtiProfile.strengths.slice(0, 1),
  ];

  const weaknesses = [
    ...iljuProfile.weaknesses.slice(0, 2),
    ...mbtiProfile.weaknesses.slice(0, 1),
  ];

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
