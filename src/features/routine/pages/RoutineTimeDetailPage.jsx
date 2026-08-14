/*
  features/routine/pages/RoutineTimeDetailPage.jsx
  라우트: /routine/morning/:routineId, /routine/evening/:routineId
  담당: 천솔
  작업현황판 task: "아침 루틴 상세 UI 구현" / "저녁 루틴 상세 UI 구현" (P1, 마감 8/15, API: /routines/{routineId})
  comment: "아침/저녁 전체 보기"

  MorningRoutinePage / EveningRoutinePage가 timeSlot prop만 다르게 넘기는
  공용 내부 컴포넌트(라우트 없음).
*/
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoutineDetail } from '../api/routineApi';
import RoutineProductCard from '../components/RoutineProductCard';
import styles from './RoutineTimeDetailPage.module.css';

const TIME_SLOT_META = {
  morning: { label: '오전 루틴', icon: '+' },
  evening: { label: '오후 루틴', icon: '☾' },
};

export default function RoutineTimeDetailPage({ timeSlot }) {
  const { routineId } = useParams();
  const navigate = useNavigate();
  const [routine, setRoutine] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    getRoutineDetail(routineId).then((data) => {
      if (!ignore) {
        setRoutine(data);
        setIsLoading(false);
      }
    });
    return () => {
      ignore = true;
    };
  }, [routineId]);

  if (isLoading) return <div className={styles.page}>불러오는 중...</div>;
  if (!routine) return <div className={styles.page}>루틴 정보를 찾을 수 없어요.</div>;

  const meta = TIME_SLOT_META[timeSlot];
  const products = routine[timeSlot] ?? [];
  const excludeCount = products.filter((p) => p.status === 'exclude').length;
  const keepCount = products.length - excludeCount;

  return (
    <div className={styles.page}>
      <div className={styles.headerPill}>
        <span className={`${styles.headerIcon} ${styles[`icon-${timeSlot}`]}`}>{meta.icon}</span>
        <span className={styles.headerLabel}>{meta.label}</span>
      </div>

      <div className={styles.statChips}>
        <span className={styles.chip}>사용 제품 {products.length}</span>
        <span className={styles.chip}>조합 추천 {keepCount}</span>
        <span className={`${styles.chip} ${styles.chipActive}`}>제외 제안 {excludeCount}</span>
      </div>

      <div className={styles.list}>
        {products.map((product) => (
          <RoutineProductCard key={product.id} product={product} />
        ))}
      </div>

      {routine.jobId && (
        <div className={styles.ctaWrap}>
          <button
            type="button"
            className={styles.ctaButton}
            onClick={() => navigate(`/routine/edit/${routine.jobId}`)}
          >
            제외 제안 반영 후 다시 정리하기
          </button>
        </div>
      )}
    </div>
  );
}