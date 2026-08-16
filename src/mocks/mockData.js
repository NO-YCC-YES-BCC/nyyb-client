export const mockUser = {
    nickname: "김지은",
    profileImageUrl: null,
    hasAnalysis: false,
};

// ── 루틴 카드 메인 / 아침·저녁 루틴 상세 (P1) 목데이터 ──
// 백엔드 /routines, /routines/{routineId} 연동 전까지 이 데이터로 화면을 완성합니다.

export const MOCK_ROUTINE_ID = 'routine_001'; 
export const MOCK_JOB_ID = 'demo-job-001';

const PLACEHOLDER_IMG = (seed) =>
  `https://placehold.co/120x120/f6f4ee/8a887f?text=${encodeURIComponent(seed)}`;

export const mockRoutineDetail = {
  routineId: MOCK_ROUTINE_ID,
  jobId: MOCK_JOB_ID, // 이미 있으면 이 값 재사용, 없으면 'demo-job-001' 등으로 대체
  score: 66,
  scoreCaption: '조금만 바꾸면 더 좋아요',
  description:
    '피부 고민을 다양하게 커버하는 루틴이에요. 다만 크림이 중복되어 있고, 일부 제품에 자극 성분이 포함되어 있어 순한 대체 제품을 고민해보셔도 좋아요.',
  overlapIngredientCount: 3,
  excludeSuggestionCount: 2,
  morning: [
    { id: 'm1', brand: 'BOTANICA', category: '크림', name: 'RESTORATIVE', reason: "크림 성분 '판테놀' 성분이 중복돼요", status: 'exclude', imageUrl: PLACEHOLDER_IMG('B') },
    { id: 'm2', brand: 'SNAIL', category: '크림', name: 'RERAIR CREAM', reason: '뮤신 성분이 강력한 수분 보유력으로 피부가 건조해지지 않아요', status: 'keep', imageUrl: PLACEHOLDER_IMG('S') },
    { id: 'm3', brand: 'HYDRATING', category: '토너', name: 'FACIAL TONER', reason: '병풀 추출물 성분이 속건조 완화에 도움돼요', status: 'keep', imageUrl: PLACEHOLDER_IMG('H') },
    { id: 'm4', brand: 'DERMOTORY', category: '선스틱', name: 'AURA DEFENSE', reason: '고체 형태의 오일 막이 피부 수분 증발을 예방해요', status: 'keep', imageUrl: PLACEHOLDER_IMG('D') },
    { id: 'm5', brand: 'BOTANICA', category: '립밤', name: 'RESTORATIVE', reason: '강력한 보습 장벽을 형성하여 트거나 갈라짐을 방지해요', status: 'keep', imageUrl: PLACEHOLDER_IMG('B') },
  ],
  evening: [
    { id: 'e1', brand: 'AURA BOTANICA', category: '미스트', name: 'REPLENISHING FACIAL MIST', reason: "'글리세린' 성분이 중복돼요", status: 'exclude', imageUrl: PLACEHOLDER_IMG('A') },
    { id: 'e2', brand: 'DEWY+LAB', category: '팩', name: 'RESTORATIVE', reason: '풀 추출물 성분이 피부에 밀착되며 공기를 차단해, 피부를 급속 쿨링하고 유효 성분을 피부 깊숙이 흡수해요', status: 'keep', imageUrl: PLACEHOLDER_IMG('D') },
    { id: 'e3', brand: '아로티카', category: '헤어토닉', name: '두피 활력 토닉', reason: '병풀 성분이 두피 열을 내리고 각질을 제거해줘요', status: 'keep', imageUrl: PLACEHOLDER_IMG('T') },
    { id: 'e4', brand: 'BOTANICA', category: '바디 크림', name: 'INTENSIVE BODY MOISTURIZER', reason: "'카프릴릭' 과도하게 중복돼요", status: 'exclude', imageUrl: PLACEHOLDER_IMG('B') },
    { id: 'e5', brand: 'AUROR', category: '앰플', name: 'REVITALIZING FACE SERUM', reason: '비타민C 고농축으로 들어있어, 소량으로도 피부 잡티를 개선해요', status: 'keep', imageUrl: PLACEHOLDER_IMG('A') },
  ],
};