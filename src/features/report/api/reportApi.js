/*
  features/report/api/reportApi.js
  담당: 천솔 (담당 API 파일)

  API 연결표(6번):
  - GET /report/{jobId} -> 분석 + 루틴 1건 결과 조회
  - GET /analyses/list  -> 분석 이력 리스트 ("분석 이력 리스트 UI 구현", P1, 8/15)

  공통 규칙(12번): "API 연결 전에는 mocks/mockData.js로 화면을 먼저 완성한다."
                   "API 실패 시 발표 데모가 깨지지 않도록 fallback 데이터를 준비한다."
*/

import apiClient from '../../../shared/api/client';
import { mockReport, mockAnalysisHistory } from '../../../mocks/mockData';

export async function getReport(jobId) {
  try {
    const { data } = await apiClient.get(`/report/${jobId}`);
    return data;
  } catch (error) {
    // 백엔드 미연결/실패 시 mock으로 fallback (13번: 실제 응답 구조 확정 전까지 유지)
    console.warn('[reportApi.getReport] API 호출 실패, mock 데이터로 대체합니다.', error?.message);
    return { ...mockReport, jobId };
  }
}

export async function getAnalysisHistory() {
  try {
    const { data } = await apiClient.get('/analyses/list');
    return data;
  } catch (error) {
    console.warn('[reportApi.getAnalysisHistory] API 호출 실패, mock 데이터로 대체합니다.', error?.message);
    return mockAnalysisHistory;
  }
}
