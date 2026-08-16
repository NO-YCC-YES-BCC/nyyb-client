import styles from './ProductCard.module.css';

export default function KeepProductCard({ product }) {
  const { name } = product;

  return (
    <div className={styles.keepCard}>
      <p className={styles.keepName}>{name}</p>
      <span className={styles.keepBadge}>유지</span>
    </div>
  );
}