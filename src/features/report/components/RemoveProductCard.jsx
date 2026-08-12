/*
  features/report/components/RemoveProductCard.jsx
  담당: 천솔
  작업현황판 task: "제외 권장 제품 카드 구현" (P0, 마감 8/13, API: /report/{jobId})
  comment: "서비스 핵심 결과인 덜어낼 제품 표시"
*/

import Card from '../../../shared/components/Card';
import Badge from '../../../shared/components/Badge';
import { BADGE_TYPE } from '../../../shared/constants/badge';
import { formatKrw } from '../../../shared/utils/format';
import styles from './ProductCard.module.css';

export default function RemoveProductCard({ product }) {
  const { name, brand, price, reason, ingredients = [] } = product;

  return (
    <Card tone="remove" padding="md" className={styles.card}>
      <div className={styles.headerRow}>
        <Badge type={BADGE_TYPE.REMOVE} />
        <span className={styles.price}>{formatKrw(price)}</span>
      </div>
      <p className={styles.brand}>{brand}</p>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.reason}>{reason}</p>
      {ingredients.length > 0 && (
        <ul className={styles.tagList}>
          {ingredients.map((ingredient) => (
            <li key={ingredient} className={styles.tag}>
              {ingredient}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
