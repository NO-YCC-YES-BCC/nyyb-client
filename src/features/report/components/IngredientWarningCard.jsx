/*
  features/report/components/IngredientWarningCard.jsx
  담당: 천솔
  작업현황판 task: "주의 성분 카드 구현" (P0, 마감 8/14, API: /report/{jobId})
  comment: "레티놀/레날등 주의 성분과 근거 표시"

  참고: "성분 상세보기 연결"(task: 성분 상세 보기 연결, /ingredients/{ingredientId})은
  우선순위 P2라 오늘 범위에서는 제외하고, 버튼은 "준비중" 상태로만 노출한다.
*/

import Card from '../../../shared/components/Card';
import Badge from '../../../shared/components/Badge';
import { BADGE_TYPE } from '../../../shared/constants/badge';
import styles from './IngredientWarningCard.module.css';

const LEVEL_LABEL = {
  high: '주의도 높음',
  medium: '주의도 보통',
  low: '주의도 낮음',
};

export default function IngredientWarningCard({ ingredient }) {
  const { name, level, reason, foundIn = [] } = ingredient;

  return (
    <Card tone="caution" padding="md" className={styles.card}>
      <div className={styles.headerRow}>
        <Badge type={BADGE_TYPE.CAUTION} />
        <span className={styles.level}>{LEVEL_LABEL[level] ?? ''}</span>
      </div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.reason}>{reason}</p>
      {foundIn.length > 0 && (
        <p className={styles.foundIn}>포함 제품: {foundIn.join(', ')}</p>
      )}
      <button type="button" className={styles.detailButton} disabled>
        성분 상세보기 (준비중)
      </button>
    </Card>
  );
}
