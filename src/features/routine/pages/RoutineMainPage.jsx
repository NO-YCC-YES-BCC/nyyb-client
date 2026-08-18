/*
  features/routine/pages/RoutineMainPage.jsx
  라우트: /routine
  담당: 천솔
  작업현황판 task: "루틴 카드 메인 UI 구현" (P1, API: /routines)
  comment: "저장된 루틴 요약 표시"

  와이어프레임 기준: 점수 카드 + 겹치는 성분/제외 제안 요약 pill + 오전/오후
  루틴 미리보기 카드(가로 스크롤 + dot 인디케이터) + 하단 저장 CTA.
*/
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants/routes';
import { getRoutineMain } from '../api/routineApi';
import RoutineThumbCarousel from '../components/RoutineThumbCarousel';
import Button from '../../../shared/components/Button';
import styles from './RoutineMainPage.module.css';
import morningIcon from '../../../assets/icons/routine/morning.svg';
import eveningIcon from '../../../assets/icons/routine/evening.svg';

export default function RoutineMainPage() {
  const [routine, setRoutine] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    getRoutineMain().then((data) => {
      if (!ignore) {
        setRoutine(data);
        setIsLoading(false);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  // TODO: 카카오 로그인 연동 후 루틴 저장 API(POST /routines)로 교체 예정
  const handleSaveRoutine = () => {
    console.warn('[RoutineMainPage] 카카오 로그인 후 루틴 저장 연동 예정');
  };

  if (isLoading) {
    return <div className={styles.page}>불러오는 중...</div>;
  }

  if (!routine) {
    return (
      <div className={styles.page}>
        <p className={styles.emptyState}>아직 저장된 루틴이 없어요.</p>
      </div>
    );
  }

  const {
    score,
    scoreCaption,
    description,
    overlapIngredientCount,
    excludeSuggestionCount,
    morning,
    evening,
  } = routine;

  return (
    <div className={styles.page}>
      <section className={styles.scoreCard}>
        <p className={styles.score}>{score}점</p>
        <span className={styles.scoreBadge}>{scoreCaption}</span>
        <p className={styles.description}>{description}</p>
      </section>

      <p className={styles.summaryPill}>
        겹치는 성분 {overlapIngredientCount}건 · 제외 제안 {excludeSuggestionCount}개
      </p>

      <Link to={ROUTES.ROUTINE_MORNING} className={styles.timeCard}>
        <div className={styles.timeHeader}>
          <span className={`${styles.timeIcon} ${styles.timeIconMorning}`}>
            <img src={morningIcon} alt="" className={styles.timeIconImg} />
          </span>
          <span className={styles.timeLabel}>오전 루틴</span>
        </div>
        <RoutineThumbCarousel items={morning} />
      </Link>

      <Link to={ROUTES.ROUTINE_EVENING} className={styles.timeCard}>
        <div className={styles.timeHeader}>
          <span className={`${styles.timeIcon} ${styles.timeIconEvening}`}>
            <img src={eveningIcon} alt="" className={styles.timeIconImg} />
          </span>
          <span className={styles.timeLabel}>오후 루틴</span>
        </div>
        <RoutineThumbCarousel items={evening} />
      </Link>

      <Button variant="primary" className={styles.saveButton} onClick={handleSaveRoutine}>
        카카오로 로그인하고 저장하기
      </Button>
    </div>
  );
}