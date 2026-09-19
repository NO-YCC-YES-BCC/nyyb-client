import { useEffect, useState } from "react";
import styles from "../styles/ProductPage.module.css";
import RecentListSection from "../components/RecentListSection";
import ProductSearchField from "../components/ProductSearchField";
import SearchListSection from "../components/SearchListSection";
import { useProductSuggestions } from "../hooks/useProductSuggestions";
import ProductSection from "../components/ProductSection";
import { searchProducts } from "../apis/product";
import { useProductSearch } from "../hooks/useProductSearch";
import {
  addRecentSearch,
  getStoredRecentSearches,
  saveRecentSearches,
} from "../utils/recentSearches";

export default function ProductPage() {
  const [search, setSearch] = useState("");
  const [isShow, setIsShow] = useState(true);
  const { products, hasMore, isLoadingMore, search: runSearch, loadMore } =
    useProductSearch();
  const [recentSearches, setRecentSearches] = useState(getStoredRecentSearches);
  const { suggestions } = useProductSuggestions(search);
  const hasKeyword = search.trim().length > 0;

  useEffect(() => {
    saveRecentSearches(recentSearches);
  }, [recentSearches]);

  const getProduct = async (name) => {
    const normalizedName = name.trim();

    setRecentSearches((currentSearches) =>
      addRecentSearch(currentSearches, normalizedName),
    );

    await runSearch(normalizedName);

    setSearch("");
    setIsShow(false);
  };

  return (
    <main className={styles.mainWarpper}>
      <h1 className={styles.title} onClick={() => searchProducts("")}>
        제품 선택
      </h1>
      <ProductSearchField
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsShow(true);
        }}
        onClear={() => setSearch("")}
        onSubmit={getProduct}
      />
      {hasKeyword
        ? isShow && (
            <SearchListSection items={suggestions} onSearch={getProduct} />
          )
        : !products && (
            <RecentListSection items={recentSearches} onSearch={getProduct} />
          )}

      {products && (
        <ProductSection
          products={products}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
          onLoadMore={loadMore}
        />
      )}
    </main>
  );
}
