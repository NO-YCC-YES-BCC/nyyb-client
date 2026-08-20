import styles from './IngredientWarningCard.module.css';

export default function IngredientWarningCard({ ingredient }) {
  const { name, nameEn, location, reason, source } = ingredient;

  return (
    <div className={styles.warningCard}>
      <h3 className={styles.warningName}>
        {name}
        {nameEn && ` (${nameEn})`}
      </h3>
      {location && <p className={styles.warningLocation}>{location}</p>}
      <p className={styles.warningReason}>{reason}</p>
      {source && <p className={styles.warningSource}>출처 : {source}</p>}
    </div>
  );
}
