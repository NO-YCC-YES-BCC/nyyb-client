import styles from './IngredientWarningCard.module.css';

export default function IngredientWarningCard({ ingredient }) {
  const { name, nameEn, reason, source } = ingredient;

  return (
    <div className={styles.warningCard}>
      <h3 className={styles.warningName}>
        {name}
        {nameEn && ` (${nameEn})`}
      </h3>
      {/* 시안의 "아침 루틴 '판테놀 크림'에 포함" 은 API 로 알 수 없어 제거했다 */}
      <p className={styles.warningReason}>{reason}</p>
      {source && <p className={styles.warningSource}>출처 : {source}</p>}
    </div>
  );
}
