/*
  features/report/api/reportApi.js
  담당: 천솔 (담당 API 파일)

  API 연결표(6번):
  - GET /report/{jobId} -> 분석 + 루틴 1건 결과 조회
  - GET /analyses/list  -> 분석 이력 리스트 ("분석 이력 리스트 UI 구현", P1, 8/15)

  공통 규칙(12번): "API 연결 전에는 mocks/mockData.js로 화면을 먼저 완성한다."
                   "API 실패 시 발표 데모가 깨지지 않도록 fallback 데이터를 준비한다."

  참고: 개발 환경에 아직 백엔드가 없으면(.env의 VITE_API_BASE_URL 미설정 등)
  axios 요청이 에러 없이 Vite 개발 서버 자신에게 붙어서 엉뚱한 응답(HTML 등)을
  200으로 받아올 수 있다. 그래서 단순히 요청 성공/실패만 보지 않고, 응답이
  실제로 우리가 쓸 수 있는 모양인지(isValid*)까지 확인한 뒤 아니면 mock으로 대체한다.
*/

import { apiClient } from '../../../shared/api/client';
import { mockReport, mockAnalysisHistory } from '../../../mocks/mockData';

function isValidReport(data) {
  return (
    !!data &&
    typeof data === 'object' &&
    !!data.summary &&
    Array.isArray(data.removeProducts) &&
    Array.isArray(data.keepProducts) &&
    Array.isArray(data.cautionIngredients)
  );
}

function isValidHistoryList(data) {
  return Array.isArray(data);
}

export async function getReport(jobId) {
  try {
    const { data } = await apiClient.get(`/report/${jobId}`);
    if (!isValidReport(data)) {
      throw new Error('응답 형태가 올바르지 않습니다 (백엔드 미연결 추정)');
    }
    return data;
  } catch (error) {
    // 백엔드 미연결/실패/형식 불일치 시 mock으로 fallback (13번: 실제 응답 구조 확정 전까지 유지)
    console.warn('[reportApi.getReport] API 호출 실패, mock 데이터로 대체합니다.', error?.message);
    return { ...mockReport, jobId };
  }
}

export async function getAnalysisHistory() {
  try {
    const { data } = await apiClient.get('/analyses/list');
    if (!isValidHistoryList(data)) {
      throw new Error('응답 형태가 올바르지 않습니다 (백엔드 미연결 추정)');
    }
    return data;
  } catch (error) {
    console.warn('[reportApi.getAnalysisHistory] API 호출 실패, mock 데이터로 대체합니다.', error?.message);
    return mockAnalysisHistory;
  }
}