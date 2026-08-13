/*
  features/routine/components/RoutineProductCard.jsx
  담당: 천솔
  작업현황판 task: "루틴 제품 카드 구현" (P0, 마감 8/14, API: /report/{jobId})
  comment: "루틴에 들어갈 제품을 반복 표시"

  RoutineEditPage(시간대 선택)와 RoutinePreviewPage/Morning·EveningRoutinePage(읽기 전용)에서
  재사용한다.
  - editable=true  : 아침/저녁 토글 버튼 표시 (RoutineEditPage)
  - editable=false : 읽기 전용 목록 항목으로 표시

  와이어프레임(아침/저녁 루틴 상세)의 정사각형 썸네일 + 브랜드 pill 스타일에 맞췄다.
*/

import Card from '../../../shared/components/Card';
import Thumb from '../../../shared/components/Thumb';
import styles from './RoutineProductCard.module.css';

export default function RoutineProductCard({
  product,
  editable = false,
  morningSelected = false,
  eveningSelected = false,
  onToggle,
}) {
  const { name, brand, category } = product;

  return (
    <Card tone="default" padding="sm" className={styles.card}>
      <Thumb tone="keep" label={brand} size="sm" />

      <div className={styles.info}>
        <span className={styles.brandPill}>{brand}</span>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.category}>{category}</p>
      </div>

      {editable && (
        <div className={styles.toggleGroup}>
          <button
            type="button"
            className={[styles.toggleChip, morningSelected ? styles.toggleChipActive : '']
              .filter(Boolean)
              .join(' ')}
            onClick={() => onToggle?.('morning')}
          >
            아침
          </button>
          <button
            type="button"
            className={[styles.toggleChip, eveningSelected ? styles.toggleChipActive : '']
              .filter(Boolean)
              .join(' ')}
            onClick={() => onToggle?.('evening')}
          >
            저녁
          </button>
        </div>
      )}
    </Card>
  );
}
