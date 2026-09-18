import { getCategoryIcon } from "../../../shared/constants/productCategory";
import { getStepLabel } from "../utils/routineTime";
import styles from "./RoutineSummary.module.css";

export default function RoutineSummary({ products = [] }) {
    if (products.length === 0) {
        return (
        <p className={styles.empty}>이 시간대에 사용할 제품이 없어요</p>
        );
    }

    return (
        <ol className={styles.list}>
        {products.map((product, index) => (
            <li key={product.id} className={styles.item}>
            <div className={styles.thumbBox}>
                <img
                className={styles.thumb}
                src={getCategoryIcon(product.categorySub)}
                alt=""
                />
            </div>

            <div className={styles.info}>
                <span className={styles.order}>{index + 1}</span>
                <p className={styles.name}>{product.productName}</p>
                <p className={styles.stepLabel}>{getStepLabel(index)}</p>
            </div>
            </li>
        ))}
        </ol>
    );
}
