import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button";
import { ROUTES } from "../../../shared/constants/routes";
import ProductPhotoCard from "../components/ProductPhotoCard";
import {
  getStoredCaptureProducts,
  saveStoredCaptureProducts,
} from "../api/captureApi";
import styles from "./ProductListPage.module.css";

export default function ProductListPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(() => getStoredCaptureProducts());
  const [errorMessage, setErrorMessage] = useState("");

  function handleRemove(productId) {
    const nextProducts = products.filter(
      (product) => product.productId !== productId,
    );

    setProducts(nextProducts);
    saveStoredCaptureProducts(nextProducts);
  }

  function handleSlotChange(productId, userRoutineSlot) {
    const nextProducts = products.map((product) =>
      product.productId === productId
        ? { ...product, userRoutineSlot }
        : product,
    );

    setProducts(nextProducts);
    saveStoredCaptureProducts(nextProducts);
  }

  function handleStartAnalysis() {
    if (products.length === 0) {
      setErrorMessage("분석할 제품을 먼저 추가해주세요.");
      return;
    }

    navigate(ROUTES.ANALYSIS_LOADING, { state: { products } });
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {products.length}개의 제품을 선택했어요!
        </h1>
        <p className={styles.description}>
          제품마다 아침 / 저녁 중 언제 사용하는지 체크해주세요!
        </p>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </header>

      {products.length > 0 ? (
        <section className={styles.productList} aria-label="선택한 제품 목록">
          {products.map((product, index) => (
            <ProductPhotoCard
              key={product.productId}
              product={product}
              index={index}
              onRemove={handleRemove}
              onSlotChange={handleSlotChange}
            />
          ))}
        </section>
      ) : (
        <section className={styles.emptyState}>
          <strong>아직 선택한 제품이 없어요</strong>
          <p>제품을 추가하면 이곳에 표시됩니다.</p>
        </section>
      )}

      <div className={styles.addButtonArea}>
        <Button
          variant="secondaryDashed"
          className={styles.addButton}
          onClick={() => navigate(ROUTES.PRODUCT)}
        >
          + 제품 추가로 더 담기
        </Button>
      </div>

      <Button
        variant="primary"
        className={styles.startButton}
        onClick={handleStartAnalysis}
      >
        루틴 저장하고 분석 시작하기
      </Button>
    </main>
  );
}
