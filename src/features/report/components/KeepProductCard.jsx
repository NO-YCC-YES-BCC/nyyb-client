import styles from './ProductCard.module.css';

export default function KeepProductCard({ product }) {
  const { productName } = product;

  return (
    <div className={styles.keepCard}>
      <p className={styles.keepName}>{productName}</p>
      <span className={styles.keepBadge}>유지</span>
    </div>
  );
}
