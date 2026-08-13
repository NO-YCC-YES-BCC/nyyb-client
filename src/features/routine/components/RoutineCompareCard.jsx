/*
  features/routine/components/RoutineCompareCard.jsx
  담당: 천솔
  작업현황판 task: "루틴 카드 메인 구현"에서 사용하는 요약 카드 (P1, 마감 8/15, API: /routines)
  comment: "저장된 루틴 요약 표시"

  RoutineMainPage에서 저장된 루틴 1건을 점수 + 아침/저녁 제품 아이콘 줄로 요약해서
  보여주고, 각 시간대 상세(MorningRoutinePage/EveningRoutinePage)로 이동하는
  진입점 역할을 한다. 와이어프레임(루틴 카드 메인)의 "66점" 스코어 헤더 +
  코랄 배지 + 아이콘 줄 레이아웃에 맞췄다.
*/

import { Link } from 'react-router-dom';
import Thumb from '../../../shared/components/Thumb';
import styles from './RoutineCompareCard.module.css';

function RoutineIconRow({ label, to, products }) {
  return (
    <Link to={to} className={styles.row}>
      <div className={styles.rowHeader}>
        <span className={styles.rowLabel}>{label}</span>
        <span className={styles.rowMeta}>{products.length}개 &gt;</span>
      </div>
      <div className={styles.iconList}>
        {products.map((product) => (
          <Thumb key={product.id} tone="keep" label={product.brand} size="sm" />
        ))}
      </div>
    </Link>
  );
}

export default function RoutineCompareCard({ routine }) {
  const { score, overlapIngredientCount, excludeSuggestionCount, routineId, morning, evening } = routine;

  return (
    <div className={styles.card}>
      <div className={styles.scoreBlock}>
        <span className={styles.score}>{score}점</span>
        <p className={styles.scoreCaption}>조금만 바꾸면 더 좋아져요</p>
      </div>

      <span className={styles.badge}>
        겹치는 성분 {overlapIngredientCount}건 · 제외 제안 {excludeSuggestionCount}건
      </span>

      <div className={styles.rowList}>
        <RoutineIconRow label="오전 루틴" to={`/routine/morning/${routineId}`} products={morning} />
        <RoutineIconRow label="오후 루틴" to={`/routine/evening/${routineId}`} products={evening} />
      </div>
    </div>
  );
}
