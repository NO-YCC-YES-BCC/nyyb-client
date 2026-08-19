import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/routes";
import { useAnalysisReport } from "../hooks/useAnalysisReport";
import { getIngredientNameEn, normalizeIngredientName } from "../constants/ingredientNameEn";
import RemoveProductCard from "../components/RemoveProductCard";
import KeepProductCard from "../components/KeepProductCard";
import IngredientWarningCard from "../components/IngredientWarningCard";
import styles from "./ReportPage.module.css";

const DEFAULT_SOURCE = "식품의약품안전처 화장품 원료성분정보";

function toWarningIngredient(ingredient, allergics) {
  const allergic = allergics.find(
    (item) => normalizeIngredientName(item.name) === normalizeIngredientName(ingredient.name)
  );

  return {
    id: ingredient.id,
    name: ingredient.name,
    nameEn: getIngredientNameEn(ingredient.name),
    reason: ingredient.description,
    source: allergic?.dataSource ?? DEFAULT_SOURCE,
  };
}

export default function ReportPage() {
  const { analysisId } = useParams();
  const navigate = useNavigate();
  const { analysis, matched, status } = useAnalysisReport(analysisId);

  useEffect(() => {
    if (status === "unauthorized") {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [status, navigate]);

  if (status === "loading") {
    return (
      <div className={styles.page}>
        <p className={styles.loadingText}>분석 리포트를 불러오는 중이에요...</p>
      </div>
    );
  }

  if (status !== "success") {
    return (
      <div className={styles.page}>
        <p className={styles.loadingText}>
          분석 결과를 찾을 수 없어요. 다시 분석을 시작해주세요.
        </p>
      </div>
    );
  }

  const products = analysis.products ?? [];

  // 서버가 REMOVE 를 앞쪽에 정렬해서 주지만, 섹션이 나뉘어 있으니 명시적으로 걸러낸다.
  const removeProducts = products.filter((product) => product.recommended === "REMOVE");
  const keepProducts = products.filter((product) => product.recommended === "KEEP");

  const cautionIngredients = (matched.ingredients ?? []).map((ingredient) =>
    toWarningIngredient(ingredient, matched.allergics ?? [])
  );

  return (
    <div className={styles.page}>
      <span className={styles.pageTag}>✨ SOTT 비움 리포트</span>

        <header className={styles.summarySection}>
          <h1 className={styles.title}>분석이 모두 완료되었어요!</h1>
          <p className={styles.subtitle}>
            {cautionIngredients.length > 0
              ? `점검 제품 ${products.length}개 중 주의 성분 ${cautionIngredients.length}가지 탐지`
              : `점검 제품 ${products.length}개 · 주의 성분은 없었어요`}
          </p>
        </header>


      {removeProducts.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>💡 구매하지 않아도 되는 제품</h2>
          <div className={styles.cardList}>
            {removeProducts.map((product) => (
              <RemoveProductCard key={product.productId} product={product} />
            ))}
          </div>
        </section>
      )}

      {keepProducts.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📍 이 제품들은 계속 써도 괜찮아요</h2>
          <div className={styles.cardList}>
            {keepProducts.map((product) => (
              <KeepProductCard key={product.productId} product={product} />
            ))}
          </div>
        </section>
      )}

        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {cautionIngredients.length > 0
                ? "⚠ 주의해야 할 성분들이 포함되어 있어요"
                : "✅ 주의 성분은 발견되지 않았어요"}
            </h2>

            {cautionIngredients.length > 0 ? (
              <div className={styles.cardList}>
                {cautionIngredients.map((ingredient) => (
                  <IngredientWarningCard key={ingredient.id} ingredient={ingredient} />
                ))}
              </div>
            ) : (
              <p className={styles.emptyIngredientText}>
                식품의약품안전처 원료성분정보 기준으로 사용조건 확인이 필요한 성분이 없었어요.
              </p>
            )}
          </section>

      <div className={styles.ctaWrap}>
        <Link
          to={ROUTES.ROUTINE}
          state={{ routineId: analysis.routineId }}
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
