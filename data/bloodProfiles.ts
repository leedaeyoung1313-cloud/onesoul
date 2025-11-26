// data/bloodProfiles.ts

export type BloodType = "A" | "B" | "O" | "AB";

export interface BloodProfile {
  code: BloodType;
  nickname: string;
  summary: string;
  tips: string[];
}

export const bloodProfiles: Record<BloodType, BloodProfile> = {
  A: {
    code: "A",
    nickname: "조심스러운 디테일러",
    summary:
      "눈에 잘 띄지 않는 부분까지 신경 쓰는 편이라, 스스로도 ‘깔끔해야 마음이 편한’ 스타일입니다.",
    tips: [
      "완벽하게 하기보다 ‘지금 가능한 수준에서 충분히 괜찮다’라는 기준을 만들어 두면 부담이 줄어든다.",
    ],
  },
  B: {
    code: "B",
    nickname: "자기 리듬이 중요한 자유형",
    summary:
      "컨디션과 흥미에 따라 에너지가 크게 달라지는 편이고, 남들이 뭐라 해도 자기 리듬이 중요합니다.",
    tips: [
      "하고 싶은 일과 해야 하는 일을 섞어서 배치해두면, 몰입과 지속성을 동시에 챙길 수 있다.",
    ],
  },
  O: {
    code: "O",
    nickname: "대범한 분위기 메이커",
    summary:
      "크게 웃고, 크게 걱정하고, 감정 표현이 비교적 솔직한 편이라 주변 사람들에게 에너지를 주는 타입입니다.",
    tips: [
      "괜찮다고 웃어넘기는 것과, 진짜로 괜찮은 건 다를 수 있다. 가끔은 속마음을 정확히 표현해도 좋다.",
    ],
  },
  AB: {
    code: "AB",
    nickname: "거리 조절이 능숙한 관찰자",
    summary:
      "가까이서 함께하면서도, 동시에 한 발짝 떨어져서 상황을 보는 면이 공존합니다. 사람과 상황 모두를 관찰하는 편입니다.",
    tips: [
      "내가 느끼는 ‘적당한 거리감’을 상대는 다르게 느낄 수 있다. 중요한 관계에는 의도적으로 한 번 더 표현해주는 것이 좋다.",
    ],
  },
};
