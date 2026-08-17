export const MOCK_JOB_ID = 'demo-job-001';

export const mockUser = {
  nickname: '김지은',
  profileImageUrl: null,
  hasAnalysis: false,
};

export const MOCK_ROUTINE_ID = 'routine_001';

const PLACEHOLDER_IMG = (seed) =>
  `https://placehold.co/120x120/f6f4ee/8a887f?text=${encodeURIComponent(seed)}`;

export const mockRoutineDetail = {
  routineId: MOCK_ROUTINE_ID,
  jobId: MOCK_JOB_ID,
  score: 66,
  scoreCaption: '조금만 바꾸면 더 좋아요',
  description:
    '피부 고민을 다양하게 커버하는 루틴이에요. 다만 크림이 중복되어 있고, 일부 제품에 자극 성분이 포함되어 있어 순한 대체 제품을 고민해보셔도 좋아요.',
  overlapIngredientCount: 3,
  excludeSuggestionCount: 2,
  morning: [
    {
      id: 'm1',
      brand: 'BOTANICA',
      category: '크림',
      name: 'RESTORATIVE',
      reason: "크림 성분 '판테놀' 성분이 중복돼요",
      status: 'exclude',
      imageUrl: PLACEHOLDER_IMG('B'),
    },
    {
      id: 'm2',
      brand: 'SNAIL',
      category: '크림',
      name: 'RERAIR CREAM',
      reason: '뮤신 성분이 강력한 수분 보유력으로 피부가 건조해지지 않아요',
      status: 'keep',
      imageUrl: PLACEHOLDER_IMG('S'),
    },
    {
      id: 'm3',
      brand: 'HYDRATING',
      category: '토너',
      name: 'FACIAL TONER',
      reason: '병풀 추출물 성분이 속건조 완화에 도움돼요',
      status: 'keep',
      imageUrl: PLACEHOLDER_IMG('H'),
    },
    {
      id: 'm4',
      brand: 'DERMOTORY',
      category: '선스틱',
      name: 'AURA DEFENSE',
      reason: '고체 형태의 오일 막이 피부 수분 증발을 예방해요',
      status: 'keep',
      imageUrl: PLACEHOLDER_IMG('D'),
    },
    {
      id: 'm5',
      brand: 'BOTANICA',
      category: '립밤',
      name: 'RESTORATIVE',
      reason: '강력한 보습 장벽을 형성하여 트거나 갈라짐을 방지해요',
      status: 'keep',
      imageUrl: PLACEHOLDER_IMG('B'),
    },
  ],
  evening: [
    {
      id: 'e1',
      brand: 'AURA BOTANICA',
      category: '미스트',
      name: 'REPLENISHING FACIAL MIST',
      reason: "'글리세린' 성분이 중복돼요",
      status: 'exclude',
      imageUrl: PLACEHOLDER_IMG('A'),
    },
    {
      id: 'e2',
      brand: 'DEWY+LAB',
      category: '팩',
      name: 'RESTORATIVE',
      reason:
        '풀 추출물 성분이 피부에 밀착되며 공기를 차단해, 피부를 급속 쿨링하고 유효 성분을 피부 깊숙이 흡수해요',
      status: 'keep',
      imageUrl: PLACEHOLDER_IMG('D'),
    },
    {
      id: 'e3',
      brand: '아로티카',
      category: '헤어토닉',
      name: '두피 활력 토닉',
      reason: '병풀 성분이 두피 열을 내리고 각질을 제거해줘요',
      status: 'keep',
      imageUrl: PLACEHOLDER_IMG('T'),
    },
    {
      id: 'e4',
      brand: 'BOTANICA',
      category: '바디 크림',
      name: 'INTENSIVE BODY MOISTURIZER',
      reason: "'카프릴릭' 과도하게 중복돼요",
      status: 'exclude',
      imageUrl: PLACEHOLDER_IMG('B'),
    },
    {
      id: 'e5',
      brand: 'AUROR',
      category: '앰플',
      name: 'REVITALIZING FACE SERUM',
      reason: '비타민C 고농축으로 들어있어, 소량으로도 피부 잡티를 개선해요',
      status: 'keep',
      imageUrl: PLACEHOLDER_IMG('A'),
    },
  ],
};

export const mockProducts = {
  cleanser: {
    id: 'p1',
    name: '저자극 약산성 클렌저',
    brand: '이니스프리',
    price: 18000,
    category: '클렌저',
  },
  vitaminCAmpoule: {
    id: 'p2',
    name: '비타민C 앰플 22%',
    brand: '스킨1004',
    price: 32000,
    category: '앰플',
  },
  retinolCream: {
    id: 'p3',
    name: '레티놀 나이트 크림',
    brand: '닥터지',
    price: 45000,
    category: '크림',
  },
  ahaBhaToner: {
    id: 'p4',
    name: 'AHA/BHA 필링 토너',
    brand: '코스알엑스',
    price: 24000,
    category: '토너',
  },
  hyaluronicSerum: {
    id: 'p5',
    name: '히알루론산 수분 세럼',
    brand: '라운드랩',
    price: 26000,
    category: '세럼',
  },
  sunscreen: {
    id: 'p6',
    name: '무기자차 선크림 SPF50+',
    brand: '구달',
    price: 19000,
    category: '선크림',
  },
  soothingCream: {
    id: 'p7',
    name: '병풀 진정 수딩크림',
    brand: '토리든',
    price: 21000,
    category: '크림',
  },
};

export const mockReport = {
  jobId: MOCK_JOB_ID,
  userName: '김지선',
  completedAt: '2026-08-12T09:30:00+09:00',
  summary: {
    totalProductCount: 7,
    checkedProductCount: 7,
    duplicateIngredientCount: 2,
    estimatedSavings: 373000,
  },
  removeProducts: [
    {
      ...mockProducts.vitaminCAmpoule,
      reason: '2번 제품과 성분 구성이 비슷하며, 함께 사용하면 자극이 더 커질 수 있어요.',
      overlaps: [
        { productNumber: 2, count: 4 },
        { productNumber: 3, count: 3 },
      ],
    },
    {
      ...mockProducts.retinolCream,
      reason: '3번 제품과 각질 제거 효과가 중복되어 자극이 커질 수 있어요.',
      overlaps: [{ productNumber: 3, count: 6 }],
    },
    {
      ...mockProducts.ahaBhaToner,
      reason: '2번 제품과 동일한 역할이며, 자극 강도가 더 강해요.',
      overlaps: [{ productNumber: 2, count: 6 }],
    },
  ],
  keepProducts: [
    {
      ...mockProducts.cleanser,
      reason: '자극 성분이 없는 약산성 클렌저라 아침/저녁 모두 사용해도 좋아요.',
    },
    {
      ...mockProducts.hyaluronicSerum,
      reason: '보습 성분 중심이라 다른 제품과 함께 사용해도 자극이 적어요.',
    },
    {
      ...mockProducts.sunscreen,
      reason: '무기자차 성분이라 자극 없이 매일 사용하기 좋아요.',
    },
    {
      ...mockProducts.soothingCream,
      reason: '진정 성분 위주라 다른 제품과 함께 매일 사용해도 좋아요.',
    },
  ],
  cautionIngredients: [
    {
      id: 'ing1',
      name: '레티놀',
      nameEn: 'Retinol',
      routineLocation: '저녁 루틴 · 레티놀 나이트 크림',
      reason:
        '세포 재생을 촉진하는 성분이라 AHA/BHA 같은 각질 제거 성분과 함께 쓰면 자극이 커질 수 있어요.',
      source: '식품의약품안전처 화장품 성분사전',
    },
    {
      id: 'ing2',
      name: 'AHA/BHA',
      nameEn: 'Glycolic Acid / Salicylic Acid',
      routineLocation: '저녁 루틴 · AHA/BHA 필링 토너',
      reason: '각질 제거 성분이 레티놀과 중복되면 피부 장벽이 약해질 수 있어요.',
      source: '대한피부과학회 성분 가이드',
    },
  ],
};

export const mockCurrentRoutine = {
  morning: [
    mockProducts.cleanser,
    mockProducts.vitaminCAmpoule,
    mockProducts.hyaluronicSerum,
    mockProducts.sunscreen,
  ],
  evening: [
    mockProducts.cleanser,
    mockProducts.retinolCream,
    mockProducts.ahaBhaToner,
    mockProducts.hyaluronicSerum,
  ],
};

export const mockDefaultSelection = {
  p1: { morning: true, evening: true },
  p5: { morning: true, evening: true },
  p6: { morning: true, evening: false },
};

export function buildRoutinePreview(selection = mockDefaultSelection) {
  const after = { morning: [], evening: [] };

  mockReport.keepProducts.forEach((product) => {
    const slot = selection[product.id];
    if (!slot) return;
    if (slot.morning) after.morning.push(product);
    if (slot.evening) after.evening.push(product);
  });

  return {
    jobId: MOCK_JOB_ID,
    before: mockCurrentRoutine,
    after,
  };
}

export const mockSaveRoutineResponse = {
  routineId: MOCK_ROUTINE_ID,
  savedAt: new Date().toISOString(),
};

export const mockSavedRoutine = {
  routineId: MOCK_ROUTINE_ID,
  jobId: MOCK_JOB_ID,
  savedAt: '2026-08-12T10:00:00+09:00',
  score: 66,
  overlapIngredientCount: 3,
  excludeSuggestionCount: 2,
  morning: buildRoutinePreview(mockDefaultSelection).after.morning,
  evening: buildRoutinePreview(mockDefaultSelection).after.evening,
};

export const mockAnalysisHistory = [
  {
    jobId: MOCK_JOB_ID,
    completedAt: '2026-08-12T09:30:00+09:00',
    checkedProductCount: mockReport.summary.checkedProductCount,
    removedProductCount: mockReport.removeProducts.length,
    estimatedSavings: mockReport.summary.estimatedSavings,
    routineScore: null,
  },
  {
    jobId: 'demo-job-000',
    completedAt: '2026-08-05T14:10:00+09:00',
    checkedProductCount: 5,
    removedProductCount: 0,
    estimatedSavings: 0,
    routineScore: 66,
  },
  {
    jobId: 'demo-job-002',
    completedAt: '2026-07-28T11:20:00+09:00',
    checkedProductCount: 4,
    removedProductCount: 0,
    estimatedSavings: 45000,
    routineScore: null,
  },
];

export const mockProfile = {
  userName: '김지은',
  email: 'jieun.kim@kakao.com',
  joinedAt: '2026-07-01T00:00:00+09:00',
  stats: {
    usingProductCount: 3,
    removedProductCount: 2,
    analysisCount: 3,
    totalAnalysisCount: mockAnalysisHistory.length,
    totalRemovedProductCount: 6,
    totalSavings: 506000,
  },
  notifyKakao: true,
};

export const mockKakaoLoginResponse = {
  accessToken: 'mock-access-token',
  user: {
    userName: '김지선',
    isNewUser: false,
  },
};