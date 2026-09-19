import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button";
import { ROUTES } from "../../../shared/constants/routes";
import NotFound from "../../product/components/NotFound";
import ProductItem from "../../product/components/ProductItem";
import ProductSearchField from "../../product/components/ProductSearchField";
import RecentListSection from "../../product/components/RecentListSection";
import SearchListSection from "../../product/components/SearchListSection";
import { searchProducts } from "../../product/apis/product";
import { useProductSuggestions } from "../../product/hooks/useProductSuggestions";
import {
  addRecentSearch,
  getStoredRecentSearches,
  saveRecentSearches,
} from "../../product/utils/recentSearches";
import { savePurchaseProduct } from "../utils/purchaseStorage";
import styles from "./PurchaseProductPage.module.css";

/**
 * 구매 예정 제품 검색·선택 페이지.
 * 전체 화장품 분석(ProductPage)과 달리 루틴과 비교할 제품 한 개만 고른다.
 */
export default function PurchaseProductPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(true);
  const [products, setProducts] = useState(null);
  const [recentSearches, setRecentSearches] = useState(getStoredRecentSearches);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { suggestions } = useProductSuggestions(search);
  const hasKeyword = search.trim().length > 0;

  useEffect(() => {
    saveRecentSearches(recentSearches);
  }, [recentSearches]);

  const runSearch = async (keyword) => {
    const normalizedKeyword = keyword.trim();

    setRecentSearches((currentSearches) =>
      addRecentSearch(currentSearches, normalizedKeyword),
    );

    const response = await searchProducts(normalizedKeyword);

    setProducts(response.data.data);
    setSearch("");
    setIsSuggestionOpen(false);
  };

  // 비교는 제품 한 개 기준이라 새로 고르면 이전 선택을 대체한다.
  const goToCompare = () => {
    if (!selectedProduct) return;

    const product = {
      ...selectedProduct,
      productName: selectedProduct.name,
      // 비교 화면이 촬영/검색 중 어느 쪽에서 왔는지에 따라 문구와 뒤로가기를 바꾼다.
      source: "search",
    };

    savePurchaseProduct(product);
    navigate(ROUTES.PURCHASE_COMPARE, { state: { product } });
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>제품 선택</h1>

      <ProductSearchField
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setIsSuggestionOpen(true);
        }}
        onClear={() => setSearch("")}
      />

      {hasKeyword
        ? isSuggestionOpen && (
            <SearchListSection items={suggestions} onSearch={runSearch} />
          )
        : products === null && (
            <RecentListSection items={recentSearches} onSearch={runSearch} />
          )}

      {products !== null &&
        (products.length === 0 ? (
          <NotFound />
        ) : (
          <section className={styles.resultSection}>
            <div>
              <p className={styles.counter}>{products.length}개 찾음</p>

              <div className={styles.productList}>
                {products.map((product) => (
                  <ProductItem
                    key={product.productId}
                    product={product}
                    selected={
                      selectedProduct?.productId === product.productId
                    }
                    onClick={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            </div>

            <div className={styles.buttonBox}>
              <Button disabled={!selectedProduct} onClick={goToCompare}>
                구매 예정 제품 분석 진행하기
              </Button>
            </div>
          </section>
        ))}
    </main>
  );
}
