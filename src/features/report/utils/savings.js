/*
    절약 금액은 백엔드 응답에 없어서 프론트에서 계산한다.
    기획 확정 공식: 제품 개수 × 20,000원 × 6개월
    → 제품 1개당 월 20,000원을 6개월간 안 쓰는 것으로 환산

    백엔드가 금액 필드를 내려주게 되면 이 파일을 지우고 그 값을 쓴다.
    */

    const PRICE_PER_PRODUCT = 20000;
    const MONTHS = 6;

    export function calculateSavings(productCount) {
    if (typeof productCount !== "number" || Number.isNaN(productCount)) return 0;

  return productCount * PRICE_PER_PRODUCT * MONTHS;
}
