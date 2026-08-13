/*
  features/auth/api/authApi.js
  담당: 천솔 (담당 API 파일)

  API 연결표(6번): POST /auth/kakao - 게스트 분석/루틴 claim
  13. 백엔드와 확정해야 할 것: 요청 payload가 authorization code인지 access token인지
  아직 미확정이라, 우선 카카오 SDK에서 받는 값을 `code`라는 이름으로 그대로 넘긴다.
  (확정되면 이 함수 내부 payload 필드명만 바꾸면 된다.)
*/

import apiClient from '../../../shared/api/client';
import { mockKakaoLoginResponse } from '../../../mocks/mockData';

export async function loginWithKakao(code) {
  try {
    const { data } = await apiClient.post('/auth/kakao', { code });
    return data;
  } catch (error) {
    console.warn('[authApi.loginWithKakao] API 호출 실패, mock 응답으로 대체합니다.', error?.message);
    return mockKakaoLoginResponse;
  }
}
