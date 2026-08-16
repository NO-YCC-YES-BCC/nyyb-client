import { apiClient } from '../../../shared/api/client';
import { mockRoutineDetail } from '../../../mocks/mockData';

function isValidRoutine(data) {
  return !!data && Array.isArray(data.morning) && Array.isArray(data.evening);
}

export async function getRoutineMain() {
  try {
    const { data } = await apiClient.get('/routines');
    if (!isValidRoutine(data)) {
      throw new Error('invalid routine response shape');
    }
    return data;
  } catch (error) {
    console.warn('[getRoutineMain] falling back to mock data:', error.message);
    return mockRoutineDetail;
  }
}

export async function getRoutineDetail(routineId) {
  try {
    const { data } = await apiClient.get(`/routines/${routineId}`);
    if (!isValidRoutine(data)) {
      throw new Error('invalid routine response shape');
    }
    return data;
  } catch (error) {
    console.warn('[getRoutineDetail] falling back to mock data:', error.message);
    return mockRoutineDetail;
  }
}

function isValidPreview(data) {
  return (
    !!data &&
    data.before &&
    data.after &&
    Array.isArray(data.after.morning) &&
    Array.isArray(data.after.evening)
  );
}

function buildRoutinePreview(selection) {
  return {
    routineId: mockRoutineDetail.routineId,
    before: {
      morning: mockRoutineDetail.morning,
      evening: mockRoutineDetail.evening,
    },
    after: {
      morning: selection.filter((item) => item.morning),
      evening: selection.filter((item) => item.evening),
    },
  };
}

export async function getRoutinePreview(selection) {
  try {
    const { data } = await apiClient.post('/routines/preview', { selection });
    if (!isValidPreview(data)) {
      throw new Error('invalid preview response shape');
    }
    return data;
  } catch (error) {
    console.warn('[getRoutinePreview] falling back to mock data:', error.message);
    return buildRoutinePreview(selection);
  }
}

export async function saveRoutine(selection) {
  try {
    const { data } = await apiClient.post('/routines', { selection });
    return data;
  } catch (error) {
    console.warn('[saveRoutine] falling back to mock response:', error.message);
    return {
      routineId: mockRoutineDetail.routineId,
      savedAt: new Date().toISOString(),
    };
  }
}