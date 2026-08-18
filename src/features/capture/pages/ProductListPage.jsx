import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button";
import { ROUTES } from "../../../shared/constants/routes";
import ImagePicker from "../components/ImagePicker";
import ProductPhotoCard from "../components/ProductPhotoCard";
import {
    addProductImage,
    getStoredCaptureProducts,
    saveStoredCaptureProducts,
} from "../api/captureApi";
import styles from "./ProductListPage.module.css";


export default function ProductListPage() {
    const navigate = useNavigate();
    const [products, setProducts] = useState(() => getStoredCaptureProducts());
    const [errorMessage, setErrorMessage] = useState("");

    async function handleAddImage(file) {
      try {
        setErrorMessage("");

        const nextProducts = await addProductImage(file);
        setProducts(nextProducts);
      } catch(error) {
        console.error("제품 사진 분석 실패", error);
        setErrorMessage("사진 분석에 실패했어요. 글자가 잘 보이도록 다시 촬영해주세요.");
      }

    }

    function handleRemove(productId) {
      const nextProducts = products.filter(
        (product) => product.productId !== productId 
      );

      setProducts(nextProducts);
      saveStoredCaptureProducts(nextProducts);
    }

    function handleSlotChange (productId, userRoutineSlot) {
      const nextProducts = products.map((product) =>
          product.productId === productId
              ? { ...product, userRoutineSlot }
              : product
      );

      setProducts(nextProducts);
      saveStoredCaptureProducts(nextProducts);
    }

    function handleStartAnalysis() {
      if (products.length === 0) {
        setErrorMessage("분석할 제품 사진을 먼저 추가해주세요.");
        return;
      }
      setErrorMessage("");
      navigate(ROUTES.ANALYSIS_LOADING);
    }

    return (
      <main className={styles.page}>
        <div className={styles.badge}>
            <span className={styles.badgeIcon}>📷</span>
            <span>라벨 스캔 완료</span>
        </div>
          
          <header className={styles.header}>
            <h1 className={styles.title}>
              {products.length}개의 제품을 촬영했어요!
            </h1>
            <p className={styles.description}>
              분석 전 추가하거나 제외할 제품이 있다면 지금 수정해주세요!
            </p>

            {errorMessage && (
              <p className={styles.errorMessage}>
                {errorMessage}
              </p>
            )}
          </header>

          {products.length > 0 ? (
            <section className={styles.productList} aria-label="촬영한 제품 목록">
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
                <strong>아직 추가된 제품이 없어요</strong>
                <p>제품 뒷면 성분표를 촬영하면 이곳에 표시됩니다.</p>
            </section>
          )}

          <div className={styles.addButtonArea}>
            <ImagePicker 
              buttonText="+ 제품 추가 촬영하기"
              buttonVariant="secondaryDashed"
              className={styles.addButton}
              onSelect={handleAddImage}
            />
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

