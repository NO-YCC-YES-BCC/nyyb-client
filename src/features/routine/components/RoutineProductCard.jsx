import styles from './RoutineProductCard.module.css';
import { getCategoryIcon, getCategoryLabel } from '../../../shared/constants/productCategory';

export default function RoutineProductCard({ product }) {
  const { brand, categorySub, productName, recommendReason, recommended } = product;
  const isExclude = recommended === 'REMOVE';

  return (
    <div className={`${styles.card} ${isExclude ? styles.cardExclude : ''}`}>
      <img src={getCategoryIcon(categorySub)} alt={categorySub} className={styles.thumb} />

      <div className={styles.content}>
        <div className={styles.topRow}>
          <div className={styles.metaGroup}>
            {/* brand 는 현재 API 응답에 없어 값이 있을 때만 노출 */}
            {brand && <span className={styles.brand}>{brand}</span>}
                        <span className={styles.categoryTag}>{getCategoryLabel(categorySub)}</span>
          </div>
          <span className={`${styles.statusTag} ${isExclude ? styles.statusExclude : styles.statusKeep}`}>
            {isExclude ? '제외' : '유지'}
          </span>
        </div>

        <p className={styles.name}>{productName}</p>
        <p className={styles.reason}>{recommendReason}</p>
      </div>
    </div>
  );
}