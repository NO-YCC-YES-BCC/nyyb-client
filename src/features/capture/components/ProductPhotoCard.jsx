import deleteIcon from "../../../assets/icons/capture/delete.svg"
import styles from "./ProductPhotoCard.module.css";

const ROUTINE_SLOT_OPTIONS = [
    { value: "MORNING", label: "아침"},
    { value: "EVENING", label: "저녁"},
    { value: "BOTH", label: "전체"},
];

export default function ProductPhotoCard({
    product,
    index,
    onRemove,
    onSlotChange,
}) {
    return (
        <article className={styles.card}>
            <div className={styles.imageBox}>
                <img 
                    className={styles.image}
                    src={product.imageUrl}
                    alt ={`${index + 1}번 제품 사진`}
                />
            </div>

            <div className={styles.info}>
                <strong className={styles.name}>
                    {product.productName || `${index + 1}번 제품`}
                </strong>
                <span className={styles.meta}>
                    {product.ingredientCount > 0
                    ? `성분 ${product.ingredientCount}개 파싱`
                    : "성분 분석 전"}
                </span>
            </div>

            <div className={styles.slotGroup} aria-label="사용 시간대 선택">
                {ROUTINE_SLOT_OPTIONS.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    className={[
                        styles.slotButton,
                        product.userRoutineSlot === option.value ? styles.activeSlot : "",
                    ].join(" ")}
                    onClick={() => onSlotChange(product.productId, option.value)}
                >
                    {option.label}
                </button>
            ))}
            </div>

            <button
                type="button"
                className={styles.removeButton}
                aria-label= {`${index + 1}번 제품 삭제`}
                onClick={() => onRemove(product.productId)}
            >
                <img src={deleteIcon} alt="" className={styles.removeIcon} />
            </button>
        </article>
    );
}