import { parseRecommendReason } from '../utils/recommendReason';
import styles from './ProductCard.module.css';

export default function RemoveProductCard({ product }) {
  const { productName, recommendReason } = product;
  const { overlaps, summary } = parseRecommendReason(recommendReason);

  return (
    <div className={styles.removeCard}>
      <span className={styles.removeBadge}>제외 권장</span>

      <p className={styles.removeName}>{productName}</p>

      {overlaps.length > 0 && (
        <ul className={styles.overlapList}>
          {overlaps.map((overlap, i) => (
            <li key={i} className={styles.overlapItem}>
              {overlap.prefix}{' '}
              <strong className={styles.overlapHighlight}>{overlap.count}개 성분 중복</strong>
            </li>
          ))}

        </ul>
      )}

      {summary && <p className={styles.removeSummary}>{summary}</p>}
    </div>
  );
}
