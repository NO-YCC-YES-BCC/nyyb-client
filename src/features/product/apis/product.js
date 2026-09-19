import { apiClient } from "../../../shared/api/client";

// 서버가 페이지 단위(기본 20개)로 돌려주므로 page 를 올려가며 이어 받는다.
export const searchProducts = (keyword, { page = 0, size = 20 } = {}) => {
  const res = apiClient.get("/products", {
    params: {
      keyword,
      page,
      size,
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
