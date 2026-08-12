/*
  shared/api/client.js
  공통 axios 인스턴스 (12. 공통 규칙: "공동 axios 인스턴스는 shared/api/client.js 에서만 관리한다")

  주의:
  - 각 feature의 api/ 폴더(reportApi.js, routineApi.js 등)는
    반드시 이 client를 통해서만 API를 호출한다.
  - baseURL은 실제 배포 주소 확정 전까지 .env(VITE_API_BASE_URL)로 교체 가능하게 열어둔다.
  - 로그인 토큰 첨부(interceptor)는 auth 담당(천솔, KakaoLoginPage/authApi.js) 작업 완료 후 연결 예정 (P1).
*/

import axios from 'axios';

const baseURL = import.meta.env?.VITE_API_BASE_URL || 'https://api.sott.example.com';

export const apiClient = axios.create({
  baseURL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// TODO(auth 완료 후): 로그인 토큰이 있으면 Authorization 헤더 자동 첨부
// apiClient.interceptors.request.use((config) => {
//   const token = getAccessToken();
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export default apiClient;
