/*
  features/report/components/KeepProductCard.jsx
  담당: 천솔
  작업현황판 task: "유지 제품 리스트 구현" (P0, 마감 8/14, API: /report/{jobId})
  comment: "계속 써도 되는 제품 목록 표시"

  와이어프레임(분석 리포트 화면)의 리스트 로우 스타일에 맞춰 정사각형 썸네일 +
  브랜드 pill + 제품명 + 사유로 구성했다.
*/

import Card from '../../../shared/components/Card';
import Badge from '../../../shared/components/Badge';
import Thumb from '../../../shared/components/Thumb';
import { BADGE_TYPE } from '../../../shared/constants/badge';
import { formatKrw } from '../../../shared/utils/format';
import styles from './ProductCard.module.css';

export default function KeepProductCard({ product }) {
  const { name, brand, price, reason } = product;

  return (
    <Card tone="keep" padding="md" className={styles.card}>
      <Thumb tone="keep" label={brand} />
      <div className={styles.content}>
        <div className={styles.headerRow}>
          <span className={styles.brandPill}>{brand}</span>
          <Badge type={BADGE_TYPE.KEEP} />
        </div>
        <p className={styles.name}>{name}</p>
        {reason && <p className={styles.reason}>{reason}</p>}
        <span className={styles.price}>{formatKrw(price)}</span>
      </div>
    </Card>
  );
}
