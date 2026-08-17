import { apiClient } from '../../../shared/api/client';
import { mockProfile } from '../../../mocks/mockData';

function isValidProfile(data) {
  return !!data && typeof data === 'object' && typeof data.userName === 'string' && !!data.stats;
}

export async function getProfile() {
  try {
    const { data } = await apiClient.get('/profile');
    if (!isValidProfile(data)) {
      throw new Error('응답 형태가 올바르지 않습니다 (백엔드 미연결 추정)');
    }
    return data;
  } catch (error) {
    console.warn('[profileApi.getProfile] API 호출 실패, mock 데이터로 대체합니다.', error?.message);
    return mockProfile;
  }
}