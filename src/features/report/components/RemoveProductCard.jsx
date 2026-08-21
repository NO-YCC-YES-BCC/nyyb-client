import { parseRecommendReason } from '../utils/recommendReason';
import OverlapToggleRow from './OverlapToggleRow';
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
              <OverlapToggleRow
                overlap={overlap}
                classNames={{
                  row: styles.overlapRow,
                  rowExpanded: styles.overlapRowExpanded,
                  name: styles.overlapName,
                  count: styles.overlapHighlight,
                }}
              />
            </li>
          ))}

        </ul>
      )}

      {summary && <p className={styles.removeSummary}>{summary}</p>}
    </div>
  );
}
