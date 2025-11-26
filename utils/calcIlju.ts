// utils/calcIlju.ts

// 일주 코드는 우선 string으로 두고, 나중에 60갑자 전체를 enum처럼 관리해도 됨.
export type IljuCode = string;

/**
 * TODO: 실제 60갑자 일주 계산 로직을 넣으면 됨.
 * 현재는 데모용으로 임의로 "병술"을 반환합니다.
 */
export function calcIljuFromDate(dateString: string): IljuCode {
  if (!dateString) return "";

  // 여기에서 dateString(YYYY-MM-DD)을 Date로 파싱하고
  // 60갑자 로직을 적용하면 됨.
  // 지금은 일단 데모용으로 고정 일주 사용.
  return "병술";
}
