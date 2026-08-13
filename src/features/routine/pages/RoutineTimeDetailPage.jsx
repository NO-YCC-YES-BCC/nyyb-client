/*
  features/routine/pages/RoutineTimeDetailPage.jsx
  담당: 천솔

  MorningRoutinePage("아침 루틴 상세 UI 구현")와 EveningRoutinePage("저녁 루틴 상세 UI 구현")는
  화면 매핑(4번) 상 서로 다른 라우트/파일이지만 렌더링 로직이 100% 동일해서
  (같은 API, 같은 카드, "아침" ↔ "저녁" 텍스트/데이터만 다름) 중복을 피하려고
  이 내부 공용 컴포넌트로 로직을 모아두고, 두 페이지 파일은 timeSlot만 다르게 넘긴다.

  이 파일 자체는 라우트에 직접 연결되지 않는다 (app/Router.jsx 참고).
*/

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRoutineDetail } from '../api/routineApi';
import RoutineProductCard from '../components/RoutineProductCard';
import styles from './RoutineTimeDetailPage.module.css';

const TIME_SLOT_LABEL = {
  morning: '아침',
  evening: '저녁',
};

export default function RoutineTimeDetailPage({ timeSlot }) {
  const { routineId } = useParams();
  const [routine, setRoutine] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getRoutineDetail(routineId).then((data) => {
      if (isMounted) {
        setRoutine(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [routineId]);

  if (isLoading || !routine) {
    return (
      <div className={styles.page}>
        <p className={styles.loadingText}>루틴을 불러오는 중이에요...</p>
      </div>
    );
  }

  const label = TIME_SLOT_LABEL[timeSlot];
  const products = routine[timeSlot] ?? [];

  return (
    <div className={styles.page}>
      <Link to="/routine" className={styles.backLink}>
        ← 내 루틴으로
      </Link>

      <div className={styles.header}>
        <h1 className={styles.title}>{label} 루틴</h1>
        <span className={styles.count}>{products.length}개 제품</span>
      </div>

      {products.length === 0 ? (
        <p className={styles.emptyState}>{label} 루틴에 포함된 제품이 없어요.</p>
      ) : (
        <ul className={styles.list}>
          {products.map((product) => (
            <li key={product.id}>
              <RoutineProductCard product={product} />
            </li>
          ))}
        </ul>
      )}

      {routine.jobId && (
        <div className={styles.ctaWrap}>
          <Link to={`/routine/edit/${routine.jobId}`} className={styles.ctaButton}>
            제외 제안 반영 후 다시 정리하기
          </Link>
        </div>
      )}
    </div>
  );
}
