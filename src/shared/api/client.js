// API 요청 보내기 직전
// → localStorage에서 accessToken 확인
// → 있으면 Authorization 헤더에 자동 추가

import axios from "axios";
import { getAccessToken } from "../utils/tokenStorage";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // 응답 없는 요청이 무한 대기하면 저장 버튼 등이 '저장 중' 상태로 영구 잠기므로 제한을 둔다.
  // (이미지 업로드/분석처럼 오래 걸리는 요청도 있어 넉넉히 잡는다)
  timeout: 60000,
});

apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});