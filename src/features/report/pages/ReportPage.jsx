import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getStoredAnalysisResult } from "../../analysis/api/analysisApi";
import { getMatchedIngredients } from "../api/reportApi";
import RemoveProductCard from "../components/RemoveProductCard";
import KeepProductCard from "../components/KeepProductCard";
import IngredientWarningCard from "../components/IngredientWarningCard";
import { ROUTES } from "../../../shared/constants/routes";
import styles from "./ReportPage.module.css";

function toReportProduct(product) {
  return {
    id: product.productId,
    name: product.productName,
    reason: product.recommendReason,
    overlaps: [],
  };
}

function toWarningIngredient(ingredient, allergics) {
  const allergic = allergics.find((item) => item.name === ingredient.name);

  return {
    id: ingredient.id,
    name: ingredient.name,
    nameEn: null,
    routineLocation: null,
    reason: ingredient.description,
    source: allergic?.dataSource ?? "식품의약품안전처 화장품 원료성분정보",
  };
}

export default function ReportPage() {
  const location = useLocation();
  const [matchedData, setMatchedData] = useState(null);

  const analysisResult =
    location.state?.analysisResult ?? getStoredAnalysisResult();

  const products = useMemo(
    () => analysisResult?.products ?? [],
    [analysisResult]
  );

  const productIds = useMemo(
    () => products.map((product) => product.productId),
    [products]
  );

  useEffect(() => {
    if (productIds.length === 0) return;

    async function fetchMatchedIngredients() {
      try {
        const data = await getMatchedIngredients(productIds);
        setMatchedData(data);
      } catch (error) {
        console.error("주의 성분 조회 실패", error);
        setMatchedData({ ingredients: [], allergics: [] });
      }
    }

    fetchMatchedIngredients();
  }, [productIds]);

  if (!analysisResult) {
    return (
      <div className={styles.page}>
        <p className={styles.loadingText}>
          분석 결과를 찾을 수 없어요. 다시 분석을 시작해주세요.
        </p>
      </div>
    );
  }

  const removeProducts = products
    .filter((product) => product.recommended === "REMOVE")
    .map(toReportProduct);

  const keepProducts = products
    .filter((product) => product.recommended === "KEEP")
    .map(toReportProduct);

  const warningIngredients = matchedData?.ingredients ?? [];
  const allergics = matchedData?.allergics ?? [];

  const cautionIngredients = warningIngredients.map((ingredient) =>
    toWarningIngredient(ingredient, allergics)
  );

  return (
    <div className={styles.page}>
      <span className={styles.pageTag}>✨ SOTT 비용 리포트</span>

      <header className={styles.summarySection}>
        <h1 className={styles.title}>분석이 모두 완료되었어요!</h1>
        <p className={styles.subtitle}>
          점검 제품 {products.length}개 중 겹치는 성분{" "}
          {warningIngredients.length}가지 탐지
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>💡 구매하지 않아도 되는 제품</h2>
        <div className={styles.cardList}>
          {removeProducts.map((product, index) => (
            <RemoveProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          📍 이 제품들은 계속 써도 괜찮아요
        </h2>
        <div className={styles.cardList}>
          {keepProducts.map((product) => (
            <KeepProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          ⚠ 주의해야 할 성분들이 포함되어 있어요
        </h2>
        <div className={styles.cardList}>
          {cautionIngredients.map((ingredient) => (
            <IngredientWarningCard
              key={ingredient.id}
              ingredient={ingredient}
            />
          ))}
        </div>
      </section>

      <div className={styles.ctaWrap}>
        <Link
          to={ROUTES.ROUTINE}
          state={{ routineId: analysisResult.routineId }}
          className={styles.ctaButton}
        >
          루틴 추천받기
        </Link>

        <button type="button" className={styles.saveImageLink} disabled>
          분석 리포트 이미지로 저장하기
        </button>
      </div>
    </div>
  );
}