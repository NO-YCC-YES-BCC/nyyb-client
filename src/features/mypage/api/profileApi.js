/*
  features/mypage/api/profileApi.js
  담당: 천솔 (담당 API 파일)

  API 연결표(6번): GET /profile -> 마이페이지 (사용자 정보 + 통계)
  공통 규칙(12번)에 따라 실패 시 mock으로 fallback한다.
*/

import apiClient from '../../../shared/api/client';
import { mockProfile } from '../../../mocks/mockData';

export async function getProfile() {
  try {
    const { data } = await apiClient.get('/profile');
    return data;
  } catch (error) {
    console.warn('[profileApi.getProfile] API 호출 실패, mock 데이터로 대체합니다.', error?.message);
    return mockProfile;
  }
}
