/*
  features/routine/components/RoutineProductCard.jsx
  담당: 천솔
  작업현황판 task: "루틴 제품 카드 구현" (P0, 마감 8/14, API: /report/{jobId})
  comment: "루틴에 들어갈 제품을 반복 표시"

  좌측 정사각 썸네일 + 우측 브랜드/카테고리 태그·상태 태그·제품명·사유로
  구성된 가로 리스트 카드.
*/
import styles from './RoutineProductCard.module.css';

export default function RoutineProductCard({ product }) {
  const { imageUrl, brand, category, name, reason, status } = product;
  const isExclude = status === 'exclude';

  return (
    <div className={`${styles.card} ${isExclude ? styles.cardExclude : ''}`}>
      <img src={imageUrl} alt={name} className={styles.thumb} />
      <div className={styles.content}>
        <div className={styles.topRow}>
          <div className={styles.brandGroup}>
            <span className={styles.brand}>{brand}</span>
            <span className={styles.categoryTag}>{category}</span>
          </div>
          <span className={`${styles.statusTag} ${isExclude ? styles.statusExclude : styles.statusKeep}`}>
            {isExclude ? '제외' : '유지'}
          </span>
        </div>
        <p className={styles.name}>{name}</p>
        <p className={styles.reason}>{reason}</p>
      </div>
    </div>
  );
}