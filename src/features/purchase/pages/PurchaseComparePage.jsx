import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button";
import { ROUTES } from "../../../shared/constants/routes";
import { getRoutineCandidates, compareProductWithRoutine } from "../api/purchaseApi";
import { getPurchaseProduct, savePurchaseProduct, clearPurchaseProduct } from "../utils/purchaseStorage";
import { CATEGORY_THUMBNAILS } from "../../capture/constants/categoryThumbnails";
import styles from "./PurchaseComparePage.module.css";

function getProductId(product) {
    return product?.productId ?? null;
}

function getProductName(product) {
    return product?.productName ?? "촬영한 제품";
}

function getIngredientCount(product) {
    return product?.ingredientCount ?? product?.ingredients?.length ?? 0;
}

function getThumbnail(product) {
    return CATEGORY_THUMBNAILS[product?.category] ?? CATEGORY_THUMBNAILS.ETC;
}

function getRoutineId(routine) {
    return routine?.id;
}

function getRoutineProductCount(routine) {
    const matched = routine?.title?.match(/(\d+)\s*개의\s*제품/);
    return matched ? Number(matched[1]) : null;
}

function getRoutineBadge(routine) {
    const removeCount = routine?.removeCount ?? 0;

    if (removeCount > 0) {
        return { text: `과잉 ${removeCount}개 제외`, tone: "warn" };
    }

    const productCount = getRoutineProductCount(routine);
    return productCount != null ? { text: `${productCount}개 유지`, tone: "keep" } : null;
}

export default function PurchaseComparePage() {
    const location = useLocation();
    const navigate = useNavigate();

    const routeProduct = location.state?.product;

    const product = useMemo(() => routeProduct ?? getPurchaseProduct(), [routeProduct]);

    const [routines, setRoutines] = useState([]);
    const [selectedRoutineId, setSelectedRoutineId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const productId = getProductId(product);
    const productName = getProductName(product);
    const ingredientCount = getIngredientCount(product);
    const thumbnailSrc = getThumbnail(product);

    useEffect(() => {
        if (routeProduct) {
            savePurchaseProduct(routeProduct);
        }
    }, [routeProduct]);

    useEffect(() => {
        let ignore = false;

        async function loadRoutines() {
            try {
                const routineList = await getRoutineCandidates();

                if (ignore) return;

                setRoutines(routineList);
                setSelectedRoutineId((current) => current ?? getRoutineId(routineList[0]) ?? null);
            } catch (error) {
                if (ignore) return;
                console.error("[PurchaseComparePage] 루틴 목록 조회 실패", error);
                setErrorMessage("최근 루틴을 불러오지 못했어요.");
            } finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        }

        loadRoutines();

        return () => {
            ignore = true;
        };
    }, []);

    function goBackToCaptureGuide() {
        clearPurchaseProduct();
        navigate(ROUTES.CAPTURE, { state: { mode: "new-purchase" } });
    }

    async function handleCompare() {
        if (!productId || !selectedRoutineId || isSubmitting) return;

        try {
            setIsSubmitting(true);
            setErrorMessage("");

            const result = await compareProductWithRoutine({
                productId,
                routineId: selectedRoutineId,
            });

            navigate(ROUTES.PURCHASE_RESULT, { state: { result } });
        } catch (error) {
            console.error("[PurchaseComparePage] 궁합 분석 실패", error);
            setErrorMessage("궁합 분석에 실패했어요. 잠시 후 다시 시도해주세요.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (!productId) {
        return (
            <main className={styles.page}>
                <p className={styles.emptyText}>촬영한 제품 정보가 없어요.</p>
                <Button
                    variant="primary"
                    className={styles.emptyButton}
                    onClick={goBackToCaptureGuide}
                >
                    촬영 가이드로 돌아가기
                </Button>
            </main>
        );
    }

    return (
        <main className={styles.page}>
            <span className={styles.tag}>📷 라벨 스캔 완료</span>

            <header className={styles.header}>
                <h1 className={styles.title}>1개의 제품을 촬영했어요!</h1>
                <p className={styles.subtitle}>
                    내 최근 루틴과 비교해서 꼭 필요한지 확인해 보세요!
                </p>
            </header>

            <section className={styles.routineBox}>
                <h2 className={styles.sectionTitle}>지난 루틴 리포트</h2>

                {isLoading ? (
                    <p className={styles.loadingText}>최근 루틴을 불러오는 중이에요...</p>
                ) : routines.length === 0 ? (
                    <p className={styles.loadingText}>비교할 수 있는 루틴이 아직 없어요.</p>
                ) : (
                    <div className={styles.routineList}>
                        {routines.map((routine) => {
                            const routineId = getRoutineId(routine);
                            const badge = getRoutineBadge(routine);
                            const isSelected = selectedRoutineId === routineId;

                            return (
                                <button
                                    key={routineId}
                                    type="button"
                                    className={`${styles.routineItem} ${
                                        isSelected ? styles.selectedRoutine : ""
                                    }`}
                                    onClick={() => setSelectedRoutineId(routineId)}
                                >
                                    <span className={styles.routineTitle}>{routine.title}</span>
                                    {badge && (
                                        <span
                                            className={`${styles.routineBadge} ${
                                                badge.tone === "warn" ? styles.routineBadgeWarn : ""
                                            }`}
                                        >
                                            {badge.text}
                                        </span>
                                    )}

                                </button>
                            );
                        })}
                    </div>
                )}
            </section>

            <section className={styles.productCard}>
                <div className={styles.thumbnailBox}>
                    {thumbnailSrc ? (
                        <img
                            className={styles.thumbnail}
                            src={thumbnailSrc}
                            alt={productName}
                        />
                    ) : (
                        <span className={styles.thumbnailFallback}>제품</span>
                    )}
                </div>

                <div className={styles.productInfo}>
                    <strong className={styles.productName}>{productName}</strong>
                    <span className={styles.parsedText}>
                        ✨ 성분 {ingredientCount}개 파싱
                    </span>
                </div>

                <button
                    type="button"
                    className={styles.removeButton}
                    onClick={goBackToCaptureGuide}
                    aria-label="촬영한 제품 삭제"
                >
                    ×
                </button>
            </section>  

                <button
                    type="button"
                    className={styles.backLink}
                    onClick={goBackToCaptureGuide}
                >
                    촬영 가이드로 돌아가기
                </button>

            {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}


            <Button
                variant="primary"
                className={styles.submitButton}
                onClick={handleCompare}
                disabled={!selectedRoutineId || isSubmitting}
            >
                {isSubmitting ? "궁합 분석 중..." : "기존 내 루틴과의 궁합 보러가기"}
            </Button>
        </main>
    );
}
