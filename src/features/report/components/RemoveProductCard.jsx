import styles from './ProductCard.module.css';

export default function RemoveProductCard({ product, index }) {
  const { name, reason, overlaps = [] } = product;

  return (
    <div className={styles.removeCard}>
      <span className={styles.removeBadge}>제외 권장</span>
      <p className={styles.removeName}>
        {index + 1}번 {name}
      </p>
      {overlaps.length > 0 && (
        <ul className={styles.overlapList}>
          {overlaps.map((overlap, i) => (
            <li key={`${overlap.productNumber}-${overlap.count}-${i}`} className={styles.overlapItem}>
              제품 {overlap.productNumber}번과{' '}
              <strong className={styles.overlapHighlight}>{overlap.count}개 성분 중복</strong>
            </li>
          ))}
        </ul>
      )}
      {reason && <p className={styles.removeSummary}>{reason}</p>}
    </div>
  );
}