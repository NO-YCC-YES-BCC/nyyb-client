import { useState } from "react";
import { getCategoryIcon } from "../../../shared/constants/productCategory";
import stepCheckIcon from "../../../assets/icons/onboarding/step-check.svg";
import stepCircleIcon from "../../../assets/icons/onboarding/step-circle.svg";
import stepCircleGrayIcon from "../../../assets/icons/home/step-circle(g).svg";
import { getStepLabels } from "../utils/routineTime";
import { getDoneIds, saveDoneIds } from "../utils/routineProgress";
import styles from "./RoutineSummary.module.css";

function getStepState(isDone, isCurrent) {
    if (isDone) return "done";
    if (isCurrent) return "current";
    return "next";
}

const STATE_CLASS = { done: styles.done, current: styles.current };
const STEP_BADGE = { done: stepCheckIcon, current: stepCircleIcon, next: stepCircleGrayIcon };

export default function RoutineSummary({ products = [], slot }) {
    const [doneIds, setDoneIds] = useState(() => getDoneIds(slot));

    if (products.length === 0) {
        return <p className={styles.empty}>이 시간대에 사용할 제품이 없어요</p>;
    }

    const stepLabels = getStepLabels(products);
    const currentIndex = products.findIndex((product) => !doneIds.includes(product.id));

    const toggleDone = (productId) => {
        const nextDoneIds = doneIds.includes(productId)
            ? doneIds.filter((id) => id !== productId)
            : [...doneIds, productId];

        setDoneIds(nextDoneIds);
        saveDoneIds(slot, nextDoneIds);
    };

    return (
        <ol className={styles.list}>
            {products.map((product, index) => {
                const isDone = doneIds.includes(product.id);
                const state = getStepState(isDone, index === currentIndex);

                return (
                    <li key={product.id} className={`${styles.item} ${STATE_CLASS[state] ?? ""}`}>
                        <button
                            type="button"
                            className={styles.thumbBox}
                            onClick={() => toggleDone(product.id)}
                            aria-pressed={isDone}
                            aria-label={`${product.productName} 사용 완료 표시`}
                        >
                            <img
                                className={styles.thumb}
                                src={getCategoryIcon(product.categorySub)}
                                alt=""
                            />
                            <img className={styles.stepBadge} src={STEP_BADGE[state]} alt="" />
                        </button>

                        <div className={styles.info}>
                            <span className={styles.order}>{index + 1}</span>
                            <p className={styles.name}>{product.productName}</p>
                            <p className={styles.stepLabel}>{stepLabels[index]}</p>
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}