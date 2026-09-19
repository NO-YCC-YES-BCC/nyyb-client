const RECENT_SEARCHES_STORAGE_KEY = "sott.product.recentSearches";

// 전체 분석과 구매 예정 분석이 같은 검색 기록을 공유한다.
export function getStoredRecentSearches() {
  const storedSearches = localStorage.getItem(RECENT_SEARCHES_STORAGE_KEY);

  if (!storedSearches) return [];

  try {
    const recentSearches = JSON.parse(storedSearches);

    return Array.isArray(recentSearches)
      ? recentSearches.filter((item) => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

export function saveRecentSearches(recentSearches) {
  localStorage.setItem(
    RECENT_SEARCHES_STORAGE_KEY,
    JSON.stringify(recentSearches),
  );
}

// 같은 검색어는 맨 앞으로 끌어올린다.
export function addRecentSearch(recentSearches, keyword) {
  return [keyword, ...recentSearches.filter((item) => item !== keyword)];
}
