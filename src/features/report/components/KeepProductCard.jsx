/*
  features/report/components/KeepProductCard.jsx
  담당: 천솔
  작업현황판 task: "유지 제품 리스트 구현" (P0, 마감 8/14, API: /report/{jobId})
  comment: "계속 써도 되는 제품 목록 표시"
*/

import Card from '../../../shared/components/Card';
import Badge from '../../../shared/components/Badge';
import { BADGE_TYPE } from '../../../shared/constants/badge';
import { formatKrw } from '../../../shared/utils/format';
import styles from './ProductCard.module.css';

export default function KeepProductCard({ product }) {
  const { name, brand, price, reason } = product;

  return (
    <Card tone="keep" padding="md" className={styles.card}>
      <div className={styles.headerRow}>
        <Badge type={BADGE_TYPE.KEEP} />
        <span className={styles.price}>{formatKrw(price)}</span>
      </div>
      <p className={styles.brand}>{brand}</p>
      <h3 className={styles.name}>{name}</h3>
      {reason && <p className={styles.reason}>{reason}</p>}
    </Card>
  );
}
