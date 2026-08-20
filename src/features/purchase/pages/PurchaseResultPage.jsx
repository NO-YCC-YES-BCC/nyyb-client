import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/routes";
import IngredientWarningCard from "../../report/components/IngredientWarningCard";
import { getIngredientNameEn, normalizeIngredientName } from "../../report/constants/ingredientNameEn";
import { parseRecommendReason } from "../../report/utils/recommendReason";
import styles from "./PurchaseResultPage.module.css";

const DEFAULT_SOURCE = "식품의약품안전처 화장품 원료성분정보";

function toWarningIngredient(ingredient, allergics, productName) {
    const allergic = allergics.find(
        (item) => normalizeIngredientName(item.name) === normalizeIngredientName(ingredient.name)
    );

    return {
        id: ingredient.id,
        name: ingredient.name,
        nameEn: getIngredientNameEn(ingredient.name),
        location: productName ? `${productName}에 포함되어있어요` : null,
        reason: ingredient.description,
        source: allergic?.dataSource ?? DEFAULT_SOURCE,
    };
}

export default function PurchaseResultPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const result = location.state?.result; 

    if (!result) {
        return (
            <main className={styles.page}>
                <p className={styles.emptyText}>궁합 분석 결과를 찾을 수 없어요.</p>
                <button type="button" className={styles.homeButton} onClick={() => navigate(ROUTES.HOME)}>
                    메인으로 돌아가기
                </button>
            </main>
        );
    }

    const isPositive = result.recommended === "KEEP";
    const title = isPositive ? "구매해도 괜찮아요" : "구매하지 않아도 괜찮아요";
    const cardClassName = isPositive ? styles.keepCard : styles.removeCard;

    const { overlaps, summary } = parseRecommendReason(result.recommendReason);
    const warningIngredients = (result.ingredients ?? []).map((ingredient) =>
        toWarningIngredient(ingredient, result.allergics ?? [], result.productName)
    );

    return (
        <main className={styles.page}>
            <span className={styles.tag}>✨ SOTT 비용 리포트</span>

            <header className={styles.header}>
                <h1 className={styles.title}>분석이 모두 완료되었어요!</h1>
                <p className={styles.subtitle}>
                    구매 예정인 제품과 기존 제품의 성분을 비교해요
                </p>
            </header>

            <section>
                <h2 className={styles.sectionTitle}>💡 {title}</h2>

                <article className={`${styles.resultCard} ${cardClassName}`}>
                    <strong className={styles.productTitle}>
                        {result.productName ?? "촬영한 제품"}
                    </strong>

                    {overlaps.length > 0 && (
                        <div className={styles.reasonBox}>
                            {overlaps.map((overlap, index) => (
                                <p key={index}>
                                    {overlap.prefix}{" "}
                                    <strong>{overlap.count}개 성분 중복</strong>
                                </p>
                            ))}

                        </div>
                    )}

                    {summary && <p className={styles.description}>{summary}</p>}
                </article>
            </section>

            <section className={styles.warningSection}>
                <h2 className={styles.sectionTitle}>
                    {warningIngredients.length > 0
                        ? "⚠ 주의해야 할 성분들이 포함되어 있어요"
                        : "✅ 주의 성분은 발견되지 않았어요"}
                </h2>

                {warningIngredients.length > 0 ? (
                    <div className={styles.warningList}>
                        {warningIngredients.map((ingredient) => (
                            <IngredientWarningCard key={ingredient.id} ingredient={ingredient} />
                        ))}
                    </div>
                ) : (
                    <p className={styles.emptyIngredientText}>
                        식품의약품안전처 원료성분정보 기준으로 사용조건 확인이 필요한 성분이 없었어요.
                    </p>
                )}
            </section>


            <button
                type="button"
                className={styles.homeButton}
                onClick={() => navigate(ROUTES.HOME)}
            >
                메인으로 돌아가기
            </button>
        </main>
    );
}
