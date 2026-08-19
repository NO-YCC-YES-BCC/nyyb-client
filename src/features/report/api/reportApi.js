import { apiClient } from "../../../shared/api/client";

// GET /ingredients/match?productIds=101,102,103
export async function getMatchedIngredients(productIds) {
  const response = await apiClient.get("/ingredients/match", {
    params: {
      productIds: productIds.join(","),
    },
  });

  return response.data?.data ?? response.data;
}
