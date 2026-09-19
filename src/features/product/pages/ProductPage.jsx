import { useEffect, useState } from "react";
import styles from "../styles/ProductPage.module.css";
import RecentListSection from "../components/RecentListSection";
import ProductSearchField from "../components/ProductSearchField";
import SearchListSection from "../components/SearchListSection";
import { useProductSuggestions } from "../hooks/useProductSuggestions";
import ProductSection from "../components/ProductSection";
import { searchProducts } from "../apis/product";
import {
  addRecentSearch,
  getStoredRecentSearches,
  saveRecentSearches,
} from "../utils/recentSearches";

export default function ProductPage() {
  const [search, setSearch] = useState("");
  const [isShow, setIsShow] = useState(true);
  const [products, setProducts] = useState("");
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

    const data = await searchProducts(normalizedName);

    setProducts(data.data.data);
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
      />
      {hasKeyword
        ? isShow && (
            <SearchListSection items={suggestions} onSearch={getProduct} />
          )
        : !products && (
            <RecentListSection items={recentSearches} onSearch={getProduct} />
          )}

      {products && <ProductSection products={products} />}
    </main>
  );
}
