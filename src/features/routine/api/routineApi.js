import { apiClient } from '../../../shared/api/client';
import { MOCK_ROUTINE_ID, mockRoutineDetail } from '../../../mocks/mockData';

const SLOT_MAP = { morning: 'MORNING', evening: 'EVENING' };

function isValidRoutine(data) {
  return !!data && Array.isArray(data.morning) && Array.isArray(data.evening);
}

function adaptMockLatestResponse() {
  const toProducts = (items) =>
    (items ?? []).map((item) => ({
      id: item.id,
      category: item.category,
      productName: item.brand ? `${item.brand} ${item.name}` : item.name,
    }));

  return {
    routineId: MOCK_ROUTINE_ID,
    title: null,
    score: mockRoutineDetail.score,
    scoreReason: mockRoutineDetail.scoreCaption,
    summary: mockRoutineDetail.description,
    morning: toProducts(mockRoutineDetail.morning),
    evening: toProducts(mockRoutineDetail.evening),
  };
}

export async function getRoutineMain() {
  try {
    const { data: body } = await apiClient.get('/routines/latest');
    const payload = body?.data;
    if (!payload || !Array.isArray(payload.morning) || !Array.isArray(payload.evening)) {
      throw new Error('invalid routine response shape');
    }
    return payload;
  } catch (error) {
    console.warn('[getRoutineMain] falling back to mock data:', error.message);
    return adaptMockLatestResponse();
  }
}

export async function getRoutineDetail(routineId) {
  try {
    const { data: body } = await apiClient.get(`/routines/${routineId}`);
    const payload = body?.data;
    if (!isValidRoutine(payload)) {
      throw new Error('invalid routine response shape');
    }
    return payload;
  } catch (error) {
    console.warn('[getRoutineDetail] falling back to mock data:', error.message);
    return mockRoutineDetail;
  }
}

function adaptMockDayResponse(timeSlot) {
  const slot = SLOT_MAP[timeSlot];
  const products = (mockRoutineDetail[timeSlot] ?? []).map((item) => ({
    id: item.id,
    category: item.category,
    productName: item.brand ? `${item.brand} ${item.name}` : item.name,
    recommended: item.status === 'exclude' ? 'REMOVE' : 'KEEP',
    recommendReason: item.reason,
  }));
  return { slot, products };
}

export async function getRoutineTimeDetail(routineId, timeSlot) {
  const slot = SLOT_MAP[timeSlot];
  if (!slot) {
    throw new Error(`[getRoutineTimeDetail] invalid timeSlot: ${timeSlot}`);
  }

  try {
    const { data: body } = await apiClient.get(`/routines/${routineId}/day`, {
      params: { slot },
    });
    const payload = body?.data;
    if (!payload || !Array.isArray(payload.products)) {
      throw new Error('invalid day response shape');
    }
    return payload;
  } catch (error) {
    console.warn('[getRoutineTimeDetail] falling back to mock data:', error.message);
    return adaptMockDayResponse(timeSlot);
  }
}

export async function saveRoutineProducts(routineId, products) {
  const { data: body } = await apiClient.patch(`/routines/${routineId}/products`, { products });
  return body?.data;
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