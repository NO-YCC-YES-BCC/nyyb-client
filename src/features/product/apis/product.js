import { apiClient } from "../../../shared/api/client";

export const searchProducts = (keyword) => {
  const res = apiClient.get("/products", {
    params: {
      keyword,
    },
  });

  return res;
};

export const getProductSuggestions = async ({
  keyword,
  limit = 10,
  signal,
}) => {
  const response = await apiClient.get("/products/suggestions", {
    params: {
      keyword,
      limit,
    },
    signal,
  });

  const suggestions = response.data?.data;

  return Array.isArray(suggestions) ? suggestions : [];
};

export const requestProduct = (data) => {
  const res = apiClient.post("/products/requests", data);

  return res;
};
