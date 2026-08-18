// API 요청 보내기 직전
// → localStorage에서 accessToken 확인
// → 있으면 Authorization 헤더에 자동 추가

import axios from "axios";
import { getAccessToken } from "../utils/tokenStorage";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});