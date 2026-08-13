/*
  shared/api/client.js
  공통 axios 인스턴스 (12. 공통 규칙: "공동 axios 인스턴스는 shared/api/client.js 에서만 관리한다")

  주의:
  - 각 feature의 api/ 폴더(reportApi.js, routineApi.js 등)는
    반드시 이 client를 통해서만 API를 호출한다.
  - baseURL은 실제 배포 주소 확정 전까지 .env(VITE_API_BASE_URL)로 교체 가능하게 열어둔다.
  - 로그인 토큰 첨부(interceptor): "카카오 로그인 화면 구현"(P1, 8/15) 완료로 오늘부터 연결.
*/

import axios from 'axios';
import { getAccessToken } from '../utils/authStorage';

const baseURL = import.meta.env?.VITE_API_BASE_URL || 'https://api.sott.example.com';

export const apiClient = axios.create({
  baseURL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 로그인 토큰이 있으면 Authorization 헤더 자동 첨부 (비로그인 상태면 그냥 통과)
apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
