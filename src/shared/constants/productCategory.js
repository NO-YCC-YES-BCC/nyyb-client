

export const PRODUCT_CATEGORY_LABEL = {
    TONER: "토너",
    SKIN: "스킨",
    ESSENCE: "에센스",
    SERUM: "세럼",
    AMPOULE: "앰플",
    LOTION: "로션",
    CREAM: "크림",
    EYE_CREAM: "아이크림",
    OIL: "오일",
    SUNSCREEN: "선크림",
    CLEANSER: "클렌저",
    MASK: "마스크팩",
    ETC: "기타 제품",
};

export function getCategoryLabel(category) {
    return PRODUCT_CATEGORY_LABEL[category] ?? PRODUCT_CATEGORY_LABEL.ETC;
}
