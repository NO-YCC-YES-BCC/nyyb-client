/*
  shared/utils/authStorage.js
  담당: 천솔

  "카카오 로그인 화면 구현"(P1, 8/15)에서 발급받은 토큰을 저장/조회하는 최소 유틸.
  13. 백엔드와 확정해야 할 것: 로그인 payload/응답 형식이 아직 미확정이라,
  실제 응답 구조가 정해지면 setAccessToken 호출부만 맞춰주면 된다.
*/

const ACCESS_TOKEN_KEY = 'sott_access_token';

export function getAccessToken() {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAccessToken(token) {
  try {
    if (token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  } catch {
    // 저장 실패(프라이빗 모드 등)는 조용히 무시 - 로그인 자체는 그대로 진행
  }
}

export function isLoggedIn() {
  return !!getAccessToken();
}
