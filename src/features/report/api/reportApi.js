import { apiClient } from "../../../shared/api/client";

export async function getMatchedIngredients(productIds) {
  const response = await apiClient.get("/ingredients/match", {
    params: {
      productIds: productIds.join(","),
    },
  });

  return response.data?.data ?? response.data;
}

// HistoryPage가 아직 import하고 있어서 남겨둔다.
// 히스토리 화면은 백엔드 응답 확정 후 다시 정리할 예정.
export async function getAnalysisHistory() {
  return [];
}