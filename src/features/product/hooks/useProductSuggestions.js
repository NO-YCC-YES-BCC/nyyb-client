import { useEffect, useState } from "react";
import { getProductSuggestions } from "../apis/product";

const EMPTY_STATE = {
  keyword: "",
  suggestions: [],
  status: "idle",
};

export function useProductSuggestions(keyword, delay = 300) {
  const normalizedKeyword = keyword.trim();
  const [state, setState] = useState(EMPTY_STATE);

  useEffect(() => {
    if (!normalizedKeyword) return;

    let active = true;
    const controller = new AbortController();

    const timerId = setTimeout(async () => {
      setState({
        keyword: normalizedKeyword,
        suggestions: [],
        status: "loading",
      });

      try {
        const suggestions = await getProductSuggestions({
          keyword: normalizedKeyword,
          signal: controller.signal,
        });

        if (active) {
          setState({
            keyword: normalizedKeyword,
            suggestions,
            status: "success",
          });
        }
      } catch (error) {
        if (active && error.code !== "ERR_CANCELED") {
          console.error("제품 자동완성 조회 실패:", error);
          setState({
            keyword: normalizedKeyword,
            suggestions: [],
            status: "error",
          });
        }
      }
    }, delay);

    return () => {
      active = false;
      clearTimeout(timerId);
      controller.abort();
    };
  }, [normalizedKeyword, delay]);

  if (!normalizedKeyword) return EMPTY_STATE;

  if (state.keyword !== normalizedKeyword) {
    return {
      keyword: normalizedKeyword,
      suggestions: [],
      status: "loading",
    };
  }

  return state;
}
