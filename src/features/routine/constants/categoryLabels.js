const CATEGORY_LABEL_MAP = {
  TONER: '토너',
  SKIN: '스킨',
  ESSENCE: '에센스',
  SERUM: '세럼',
  AMPOULE: '앰플',
  LOTION: '로션',
  CREAM: '크림',
  EYE_CREAM: '아이크림',
  OIL: '오일',
  SUNSCREEN: '선크림',
  CLEANSER: '클렌저',
  MASK: '마스크',
  ETC: '기타',
};

export function getCategoryLabel(category) {
  return CATEGORY_LABEL_MAP[category] ?? '기타';
}