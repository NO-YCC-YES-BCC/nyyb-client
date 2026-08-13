/*
  features/routine/pages/RoutineMainPage.jsx
  라우트: /routine (4. 화면 매핑 기준)
  담당: 천솔
  작업현황판 task: "루틴 카드 메인 구현" (P1, 마감 8/15, API: /routines)
  comment: "저장된 루틴 요약 표시"
*/

import { useEffect, useState } from 'react';
import { getRoutineMain } from '../api/routineApi';
import RoutineCompareCard from '../components/RoutineCompareCard';
import styles from './RoutineMainPage.module.css';

export default function RoutineMainPage() {
  const [routine, setRoutine] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getRoutineMain().then((data) => {
      if (isMounted) {
        setRoutine(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <p className={styles.loadingText}>루틴을 불러오는 중이에요...</p>
      </div>
    );
  }

  const hasRoutine = routine && (routine.morning?.length > 0 || routine.evening?.length > 0);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>내 루틴</h1>
        <p className={styles.subtitle}>저장한 루틴을 확인하고 시간대별로 자세히 볼 수 있어요.</p>
      </header>

      {hasRoutine ? (
        <RoutineCompareCard routine={routine} />
      ) : (
        <p className={styles.emptyState}>아직 저장된 루틴이 없어요. 분석을 먼저 진행해주세요.</p>
      )}
    </div>
  );
}
