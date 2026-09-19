import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button";
import { ROUTES } from "../../../shared/constants/routes";
import {
  getStoredCaptureProducts,
  saveStoredCaptureProducts,
} from "../../capture/api/captureApi";
import styles from "../styles/ProductSection.module.css";
import ProductItem from "./ProductItem";
import NotFound from "./NotFound";
import SelectedProduct from "./SelectedProduct";
import LoadMoreTrigger from "./LoadMoreTrigger";

export default function ProductSection({
  products,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
}) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(() => getStoredCaptureProducts());
  const count = products.length;

  const addProduct = (product) => {
    setSelected((prev) => {
      const isAlreadySelected = prev.some(
        (selectedProduct) => selectedProduct.productId === product.productId,
      );

      return isAlreadySelected ? prev : [...prev, product];
    });
  };

  const deleteProduct = (productId) => {
    setSelected((prev) =>
      prev.filter((product) => product.productId !== productId),
    );
  };

  const handleProceed = () => {
    const analysisProducts = selected.map((product) => ({
      ...product,
      productName: product.name,
      userRoutineSlot: product.userRoutineSlot ?? "BOTH",
    }));

    saveStoredCaptureProducts(analysisProducts);
    navigate(ROUTES.CAPTURE_PRODUCTS);
  };

  if (count === 0) {
    return <NotFound />;
  }

  return (
    <section className={styles.productSection}>
      {/* 서버가 전체 개수를 주지 않아, 더 불러올 게 남아 있으면 "이상"으로 표시한다 */}
      <p className={styles.counter}>
        {hasMore ? `${count}개 이상 찾음` : `${count}개 찾음`}
      </p>

      <div className={styles.productList}>
        {products.map((product) => (
          <ProductItem
            key={product.productId}
            product={product}
            selected={selected.some(
              (selectedProduct) =>
                selectedProduct.productId === product.productId,
            )}
            onClick={() => addProduct(product)}
          />
        ))}
      </div>

      <LoadMoreTrigger
        hasMore={hasMore}
        isLoading={isLoadingMore}
        onLoadMore={onLoadMore}
      />

      {/* 목록은 화면 전체로 스크롤하고, 선택한 제품과 버튼은 하단 네비 위에 고정한다 */}
      <div className={styles.actionBar}>
        {selected.length > 0 && (
          <div className={styles.selectedList}>
            {selected.map((selectedProduct) => (
              <SelectedProduct
                key={selectedProduct.productId}
                product={selectedProduct}
                onDelete={() => deleteProduct(selectedProduct.productId)}
              />
            ))}
          </div>
        )}

        <div className={styles.buttonBox}>
          <Button disabled={selected.length === 0} onClick={handleProceed}>
            {selected.length > 0
              ? `${selected.length}개 선택 · 다음으로`
              : "다음으로"}
          </Button>
        </div>
      </div>
    </section>
  );
}
