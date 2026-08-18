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

const ROUTINE_DESIGN_STORAGE_KEY = "sott.routine.design";

  export function getStoredRoutineDesign() {
    const storedDesign = sessionStorage.getItem(ROUTINE_DESIGN_STORAGE_KEY);

    if (!storedDesign) return null;

    try {
      return JSON.parse(storedDesign);
    } catch {
      return null;
    }
  }

  export function saveStoredRoutineDesign(routineDesign) {
    sessionStorage.setItem(
      ROUTINE_DESIGN_STORAGE_KEY,
      JSON.stringify(routineDesign)
    );
  }

  export async function createRoutineDesign(routineId) {
    const response = await apiClient.post(`/routines/${routineId}/design`);
    return response.data?.data ?? response.data;
  }