import styles from './RoutineProductCard.module.css';
import { getCategoryIcon } from '../constants/categoryIcons';

export default function RoutineProductCard({ product }) {
  const { category, productName, recommendReason, recommended } = product;
  const isExclude = recommended === 'REMOVE';

  return (
    <div className={`${styles.card} ${isExclude ? styles.cardExclude : ''}`}>
      <img src={getCategoryIcon(category)} alt={category} className={styles.thumb} />
      <div className={styles.content}>
        <div className={styles.topRow}>
          <span className={styles.categoryTag}>{category}</span>
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