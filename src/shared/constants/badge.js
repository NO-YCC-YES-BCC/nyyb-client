/*
  shared/constants/badge.js
  담당: 천솔 (task: "공통 배지 구현", P0)

  Badge.jsx 에서 사용하는 상태 타입 정의.
  comment: "유지, 제외, 주의, 히스토리 상태 표시"
*/

export const BADGE_TYPE = {
  KEEP: 'keep', // 유지 제품
  REMOVE: 'remove', // 제외 권장 제품
  CAUTION: 'caution', // 주의 성분
  HISTORY: 'history', // 분석 이력 등 일반 상태
};

export const BADGE_LABEL = {
  [BADGE_TYPE.KEEP]: '유지',
  [BADGE_TYPE.REMOVE]: '제외 권장',
  [BADGE_TYPE.CAUTION]: '주의',
  [BADGE_TYPE.HISTORY]: '히스토리',
};
