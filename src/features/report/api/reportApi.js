import { apiClient } from "../../../shared/api/client";

// GET /ingredients/match?productIds=101,102,103
export async function getMatchedIngredients(productIds) {
  const response = await apiClient.get("/ingredients/match", {
    params: {
      productIds: productIds.join(","),
    },
  });

  const data = response.data?.data ?? response.data;
  const productGroups = Array.isArray(data) ? data : [];

  const ingredients = productGroups.flatMap((group) =>
    (group.ingredients ?? []).map((ingredient) => ({
      ...ingredient,
      productName: group.productName,
    }))
  );

  const allergics = productGroups.flatMap((group) => group.allergics ?? []);

  return { ingredients, allergics };
}
