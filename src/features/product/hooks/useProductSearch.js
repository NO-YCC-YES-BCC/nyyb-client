import { useCallback, useRef, useState } from "react";
import { searchProducts } from "../apis/product";

const PAGE_SIZE = 20;

// 서버 검색은 정렬 기준이 고정돼 있지 않아 페이지 사이에 같은 제품이 섞일 수 있다.
function appendUnique(current, incoming) {
  const seen = new Set(current.map((product) => product.productId));
  return [
    ...current,
    ...incoming.filter((product) => !seen.has(product.productId)),
  ];
}

/**
 * 제품 검색 결과를 페이지 단위로 이어 받는다.
 * products 가 null 이면 아직 검색 전이다.
 * 한 페이지를 꽉 채워 받았으면 다음 페이지가 더 있을 수 있다고 본다 (서버가 전체 개수를 주지 않음).
 */
export function useProductSearch() {
  const [products, setProducts] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const keywordRef = useRef("");
  const pageRef = useRef(0);
  const isLoadingRef = useRef(false);
  // 새 검색이 시작되면 이전 검색의 늦게 도착한 응답을 버리기 위한 번호
  const searchIdRef = useRef(0);

  const search = useCallback(async (keyword) => {
    const searchId = ++searchIdRef.current;
    keywordRef.current = keyword;
    pageRef.current = 0;
    isLoadingRef.current = false;
    setIsLoadingMore(false);

    const response = await searchProducts(keyword, { page: 0, size: PAGE_SIZE });
    if (searchId !== searchIdRef.current) return;

    const items = response.data.data ?? [];
    setProducts(items);
    setHasMore(items.length === PAGE_SIZE);
  }, []);

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingRef.current) return;

    const searchId = searchIdRef.current;
    const nextPage = pageRef.current + 1;
    isLoadingRef.current = true;
    setIsLoadingMore(true);

    try {
      const response = await searchProducts(keywordRef.current, {
        page: nextPage,
        size: PAGE_SIZE,
      });
      if (searchId !== searchIdRef.current) return;

      const items = response.data.data ?? [];
      pageRef.current = nextPage;
      setProducts((current) => appendUnique(current ?? [], items));
      setHasMore(items.length === PAGE_SIZE);
    } catch (error) {
      console.error("[useProductSearch] 다음 페이지 조회 실패", error);
      if (searchId === searchIdRef.current) setHasMore(false);
    } finally {
      if (searchId === searchIdRef.current) {
        isLoadingRef.current = false;
        setIsLoadingMore(false);
      }
    }
  }, [hasMore]);

  return { products, hasMore, isLoadingMore, search, loadMore };
}
