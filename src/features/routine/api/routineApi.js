import { apiClient } from '../../../shared/api/client';

const SLOT_MAP = { morning: 'MORNING', evening: 'EVENING' };

function isValidRoutine(data) {
  return !!data && Array.isArray(data.morning) && Array.isArray(data.evening);
}

export async function getRoutineMain() {
  const { data: body } = await apiClient.get('/routines/latest');
  const payload = body?.data;
  if (!isValidRoutine(payload)) {
    throw new Error('[getRoutineMain] invalid routine response shape');
  }
  return payload;
}

export async function getRoutineDetail(routineId) {
  const { data: body } = await apiClient.get(`/routines/${routineId}`);
  const payload = body?.data;
  if (!isValidRoutine(payload)) {
    throw new Error('[getRoutineDetail] invalid routine response shape');
  }
  return payload;
}

export async function getRoutineTimeDetail(routineId, timeSlot) {
  const slot = SLOT_MAP[timeSlot];
  if (!slot) {
    throw new Error(`[getRoutineTimeDetail] invalid timeSlot: ${timeSlot}`);
  }
  const { data: body } = await apiClient.get(`/routines/${routineId}/day`, {
    params: { slot },
  });
  const payload = body?.data;
  if (!payload || !Array.isArray(payload.products)) {
    throw new Error('[getRoutineTimeDetail] invalid day response shape');
  }
  return payload;
}

export async function saveRoutineProducts(routineId, products) {
  const { data: body } = await apiClient.patch(`/routines/${routineId}/products`, {
    products,
  });
  return body?.data;
}

const ROUTINE_DESIGN_STORAGE_KEY = 'sott.routine.design';

export function getStoredRoutineDesign() {
  try {
    const raw = sessionStorage.getItem(ROUTINE_DESIGN_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn('[getStoredRoutineDesign] failed to parse stored design:', error);
    return null;
  }
}

export function saveStoredRoutineDesign(routineDesign) {
  try {
    sessionStorage.setItem(ROUTINE_DESIGN_STORAGE_KEY, JSON.stringify(routineDesign));
  } catch (error) {
    console.warn('[saveStoredRoutineDesign] failed to save design:', error);
  }
}

export async function createRoutineDesign(routineId) {
  const response = await apiClient.post(`/routines/${routineId}/design`);
  return response.data?.data ?? response.data;
}