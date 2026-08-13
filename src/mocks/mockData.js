/*
  mocks/mockData.js
  담당: 천솔
  작업현황판 task: "mockData 구조 작성" (P0, 마감 8/12)
  comment: "백엔드 없이 화면을 끝까지 개발하기 위한 가짜 데이터"

  실제 API 응답 구조가 확정되면(13. 백엔드와 확정해야 할 것 참고),
  이 파일의 shape을 기준으로 각 feature의 api/*.js 안에서 매핑만 바꾸면 되도록
  최대한 API 연결표(6번)의 응답 형태에 가깝게 작성한다.
*/

// ---------------------------------------------------------------------------
// GET /report/{jobId} 목데이터
// ---------------------------------------------------------------------------

export const MOCK_JOB_ID = 'demo-job-001';

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
};

export const mockReport = {
  jobId: MOCK_JOB_ID,
  userName: '김지선',
  completedAt: '2026-08-12T09:30:00+09:00',
  summary: {
    totalProductCount: 6,
    checkedProductCount: 6,
    duplicateIngredientCount: 3,
    estimatedSavings: 373000,
  },
  removeProducts: [
    {
      ...mockProducts.vitaminCAmpoule,
      reason: '고농도 비타민C를 클렌저 산성도와 시간차 없이 사용하면 산화·자극 우려가 있어요.',
      ingredients: ['아스코르빈산 22%', '히알루론산나트륨'],
    },
    {
      ...mockProducts.retinolCream,
      reason: 'AHA/BHA 필링 토너와 함께 쓰면 각질 제거 자극이 중복돼요.',
      ingredients: ['레티놀', '나이아신아마이드'],
    },
    {
      ...mockProducts.ahaBhaToner,
      reason: '레티놀 나이트 크림과 함께 쓰면 각질층이 약해질 수 있어요.',
      ingredients: ['글라이콜릭애씨드', '살리실릭애씨드'],
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
  ],
  cautionIngredients: [
    {
      id: 'ing1',
      name: '레티놀',
      level: 'high',
      reason: '세포 재생을 촉진하는 성분이라 다른 각질 제거 성분과 함께 쓰면 자극이 커질 수 있어요.',
      foundIn: ['레티놀 나이트 크림'],
    },
    {
      id: 'ing2',
      name: 'AHA/BHA',
      level: 'medium',
      reason: '각질 제거 성분이 중복되면 피부 장벽이 약해질 수 있어요.',
      foundIn: ['AHA/BHA 필링 토너'],
    },
    {
      id: 'ing3',
      name: '고농도 비타민C',
      level: 'medium',
      reason: '약산성 제품과 함께 쓰면 성분이 불안정해지고 자극이 생길 수 있어요.',
      foundIn: ['비타민C 앰플 22%'],
    },
  ],
};

// ---------------------------------------------------------------------------
// POST /routines/preview, POST /routines 에서 사용할 기존(before) 루틴 목데이터
// RoutineEditPage에서 만든 선택값(selection)을 조합해 after를 구성한다.
// ---------------------------------------------------------------------------

export const mockCurrentRoutine = {
  morning: [mockProducts.cleanser, mockProducts.vitaminCAmpoule, mockProducts.hyaluronicSerum, mockProducts.sunscreen],
  evening: [mockProducts.cleanser, mockProducts.retinolCream, mockProducts.ahaBhaToner, mockProducts.hyaluronicSerum],
};

// RoutineEditPage 초기 선택값 (유지 제품 기준 추천 배치)
// selection shape: { [productId]: { morning: boolean, evening: boolean } }
export const mockDefaultSelection = {
  p1: { morning: true, evening: true }, // 클렌저: 아침/저녁 모두
  p5: { morning: true, evening: true }, // 세럼: 아침/저녁 모두
  p6: { morning: true, evening: false }, // 선크림: 아침만
};

/**
 * RoutineEditPage의 selection(map) 값을 받아 Before/After 루틴 미리보기 데이터를 만든다.
 * selection: { [productId]: { morning: boolean, evening: boolean } }
 */
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

export const MOCK_ROUTINE_ID = 'routine_001';

export const mockSaveRoutineResponse = {
  routineId: MOCK_ROUTINE_ID,
  savedAt: new Date().toISOString(),
};

// ---------------------------------------------------------------------------
// GET /routines, GET /routines/{routineId} 목데이터
// (오늘 저장된 루틴이 하나 있다고 가정 - RoutineMainPage/Morning/EveningRoutinePage 공용)
// ---------------------------------------------------------------------------

export const mockSavedRoutine = {
  routineId: MOCK_ROUTINE_ID,
  jobId: MOCK_JOB_ID,
  savedAt: '2026-08-12T10:00:00+09:00',
  // 와이어프레임(루틴 카드 메인) 수치: "66점 · 겹치는 성분 3건 · 제외 제안 2건"
  score: 66,
  overlapIngredientCount: 3,
  excludeSuggestionCount: 2,
  morning: buildRoutinePreview(mockDefaultSelection).after.morning,
  evening: buildRoutinePreview(mockDefaultSelection).after.evening,
};

// ---------------------------------------------------------------------------
// GET /analyses/list 목데이터 (분석 이력 리스트)
// ---------------------------------------------------------------------------

export const mockAnalysisHistory = [
  {
    jobId: MOCK_JOB_ID,
    completedAt: '2026-08-12T09:30:00+09:00',
    checkedProductCount: 6,
    removedProductCount: 3,
    estimatedSavings: 373000,
  },
  {
    jobId: 'demo-job-000',
    completedAt: '2026-08-05T14:10:00+09:00',
    checkedProductCount: 5,
    removedProductCount: 1,
    estimatedSavings: 45000,
  },
  {
    jobId: 'demo-job-002',
    completedAt: '2026-07-28T11:20:00+09:00',
    checkedProductCount: 4,
    removedProductCount: 2,
    estimatedSavings: 88000,
  },
];

// ---------------------------------------------------------------------------
// GET /profile 목데이터 (마이페이지)
// ---------------------------------------------------------------------------

export const mockProfile = {
  userName: '김지선',
  joinedAt: '2026-07-01T00:00:00+09:00',
  stats: {
    totalAnalysisCount: mockAnalysisHistory.length,
    totalRemovedProductCount: 6,
    totalSavings: 506000,
  },
  // 카카오톡 리포트 수신 여부. 실제 토글 연동("카카오톡 수신 토글 구현")은 P2라 오늘 범위 밖.
  notifyKakao: false,
};

// ---------------------------------------------------------------------------
// POST /auth/kakao 목데이터 (카카오 로그인)
// 13. 백엔드와 확정해야 할 것: payload가 authorization code인지 access token인지 미확정 -
// 확정 전까지는 프론트에서 임의의 code 문자열을 보내는 것으로 가정한다.
// ---------------------------------------------------------------------------

export const mockKakaoLoginResponse = {
  accessToken: 'mock-access-token',
  user: {
    userName: '김지선',
    isNewUser: false,
  },
};
