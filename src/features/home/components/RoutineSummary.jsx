import { getCategoryIcon } from "../../../shared/constants/productCategory";
import stepCheckIcon from "../../../assets/icons/onboarding/step-check.svg";
import stepCircleIcon from "../../../assets/icons/onboarding/step-circle.svg";
import stepCircleGrayIcon from "../../../assets/icons/home/step-circle(g).svg";
import { getStepLabel } from "../utils/routineTime";
import styles from "./RoutineSummary.module.css";

// TODO: 완료/현재/대기 상태는 API에 없어서 순서로 임시 처리. 기획 확인 후 이 함수만 교체
function getStepState(index) {
    if (index === 0) return "done";
    if (index === 1) return "current";
    return "next";
}

const STATE_CLASS = { done: styles.done, current: styles.current };
const STEP_BADGE = { done: stepCheckIcon, current: stepCircleIcon, next: stepCircleGrayIcon };

export default function RoutineSummary({ products = [] }) {
    if (products.length === 0) {
        return <p className={styles.empty}>이 시간대에 사용할 제품이 없어요</p>;
    }

    return (
        <ol className={styles.list}>
            {products.map((product, index) => {
                const state = getStepState(index);

                return (
                    <li key={product.id} className={`${styles.item} ${STATE_CLASS[state] ?? ""}`}>
                        <div className={styles.thumbBox}>
                            <img
                                className={styles.thumb}
                                src={getCategoryIcon(product.categorySub)}
                                alt=""
                            />
                            <img className={styles.stepBadge} src={STEP_BADGE[state]} alt="" />
                        </div>

                        <div className={styles.info}>
                            <span className={styles.order}>{index + 1}</span>
                            <p className={styles.name}>{product.productName}</p>
                            <p className={styles.stepLabel}>{getStepLabel(index)}</p>
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}