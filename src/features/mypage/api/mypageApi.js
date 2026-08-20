import { apiClient } from '../../../shared/api/client';
import { getUser } from '../../../shared/utils/tokenStorage';

/**
 * 마이페이지 통계 조회
 * GET /mypage — GlobalResponse 래핑, 인증 필요
 * 루틴이 없어도 404 가 아니라 0 이 내려온다.
 */
export async function getMypageStats() {
  const { data: body } = await apiClient.get('/mypage');
  const payload = body?.data;

  if (!payload) {
    throw new Error('[getMypageStats] invalid mypage response shape');
  }

  return {
    usingProductCount: payload.usingProductCount ?? 0,
    removedProductCount: payload.removedProductCount ?? 0,
    analysisCount: payload.analysisCount ?? 0,
  };
}

/**
 * 마이페이지 화면용 데이터.
 * - 통계: GET /mypage
 * - 이름/이메일: 로그인 시 저장된 사용자 정보 (카카오 연동 전에는 비어 있음)
 */
export async function getMypageProfile() {
  const user = getUser();
  const isLoggedIn = !!user && user.guest !== true;

  let stats = { usingProductCount: 0, removedProductCount: 0, analysisCount: 0 };

  try {
    stats = await getMypageStats();
  } catch (error) {
    // 401 = 카카오 로그인 전(게스트) 상태. 에러 화면 대신 통계 0으로 표시한다.
    if (error?.response?.status === 401) {
      console.warn('[getMypageProfile] 미인증 사용자 — 통계를 0으로 표시합니다.');
    } else {
      throw error;
    }
  }

  return {
    isLoggedIn,
    userName: user?.nickname ?? '',
    // TODO: 이메일은 /mypage 응답에도 저장된 사용자 정보에도 없음 (카카오 로그인 연동 시 확인 필요)
    email: user?.email ?? '',
    stats,
  };
}