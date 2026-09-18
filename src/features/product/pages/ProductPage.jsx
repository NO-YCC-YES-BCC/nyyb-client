import { useEffect, useState } from "react";
import styles from "../styles/ProductPage.module.css";
import RecentListSection from "../components/RecentListSection";
import ProductSearchField from "../components/ProductSearchField";
import SearchListSection from "../components/SearchListSection";
import { useProductSuggestions } from "../hooks/useProductSuggestions";
import ProductSection from "../components/ProductSection";
import { searchProducts } from "../apis/product";
// import NotFound from "../components/NotFound";

const RECENT_SEARCHES_STORAGE_KEY = "sott.product.recentSearches";

function getStoredRecentSearches() {
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

export default function ProductPage() {
  const [search, setSearch] = useState("");
  const [isShow, setIsShow] = useState(true);
  const [products, setProducts] = useState("");
  const [recentSearches, setRecentSearches] = useState(getStoredRecentSearches);
  const { suggestions } = useProductSuggestions(search);
  const hasKeyword = search.trim().length > 0;

  useEffect(() => {
    localStorage.setItem(
      RECENT_SEARCHES_STORAGE_KEY,
      JSON.stringify(recentSearches),
    );
  }, [recentSearches]);

  const getProduct = async (name) => {
    const normalizedName = name.trim();

    setRecentSearches((currentSearches) => [
      normalizedName,
      ...currentSearches.filter((item) => item !== normalizedName),
    ]);

    const data = await searchProducts(normalizedName);

    setProducts(data.data.data);
    setIsShow(false);
  };

  return (
    <main className={styles.mainWarpper}>
      <h1 className={styles.title}>제품 선택</h1>
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
        : !products && <RecentListSection items={recentSearches} />}

      {products && <ProductSection products={products} />}

      {/* <NotFound /> */}
    </main>
  );
}
