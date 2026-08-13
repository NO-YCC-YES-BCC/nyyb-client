/*
  features/report/components/RemoveProductCard.jsx
  담당: 천솔
  작업현황판 task: "제외 권장 제품 카드 구현" (P0, 마감 8/13, API: /report/{jobId})
  comment: "서비스 핵심 결과인 덜어낼 제품 표시"

  와이어프레임(분석 리포트 화면)의 리스트 로우 스타일에 맞춰 정사각형 썸네일 +
  브랜드 pill + 제품명 + 사유 + 성분 태그로 구성했다.
*/

import Card from '../../../shared/components/Card';
import Badge from '../../../shared/components/Badge';
import Thumb from '../../../shared/components/Thumb';
import { BADGE_TYPE } from '../../../shared/constants/badge';
import { formatKrw } from '../../../shared/utils/format';
import styles from './ProductCard.module.css';

export default function RemoveProductCard({ product }) {
  const { name, brand, price, reason, ingredients = [] } = product;

  return (
    <Card tone="remove" padding="md" className={styles.card}>
      <Thumb tone="remove" label={brand} />
      <div className={styles.content}>
        <div className={styles.headerRow}>
          <span className={styles.brandPill}>{brand}</span>
          <Badge type={BADGE_TYPE.REMOVE} />
        </div>
        <p className={styles.name}>{name}</p>
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
        <span className={styles.price}>{formatKrw(price)}</span>
      </div>
    </Card>
  );
}
