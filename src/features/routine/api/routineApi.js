/*
  features/routine/api/routineApi.js
  담당: 천솔 (담당 API 파일)

  API 연결표(6번):
  - POST /routines/preview : 저장 없이 Before/After 계산
  - POST /routines         : 로그인/비로그인 귀속 분기 처리 후 최종 저장

  공통 규칙(12번)에 따라 실패 시 mock으로 fallback한다.
*/

import apiClient from '../../../shared/api/client';
import { buildRoutinePreview, mockSaveRoutineResponse } from '../../../mocks/mockData';

export async function previewRoutine({ jobId, selection }) {
  try {
    const { data } = await apiClient.post('/routines/preview', { jobId, selection });
    return data;
  } catch (error) {
    console.warn('[routineApi.previewRoutine] API 호출 실패, mock 데이터로 대체합니다.', error?.message);
    return buildRoutinePreview(selection);
  }
}

export async function saveRoutine({ jobId, selection }) {
  try {
    const { data } = await apiClient.post('/routines', { jobId, selection });
    return data;
  } catch (error) {
    console.warn('[routineApi.saveRoutine] API 호출 실패, mock 응답으로 대체합니다.', error?.message);
    return { ...mockSaveRoutineResponse, savedAt: new Date().toISOString() };
  }
}
