/*
  features/routine/pages/RoutineMainPage.jsx
  라우트: /routine
  담당: 천솔
  작업현황판 task: "루틴 카드 메인 UI 구현" (P1, API: /routines/latest)
  comment: "저장된 루틴 요약 표시"

  와이어프레임 기준: 점수 카드 + 오전/오후 루틴 미리보기 카드(가로 스크롤 +
  dot 인디케이터) + 하단 저장 CTA(게스트만 노출).
  /routines/latest는 KST 기준 현재 시간대 슬롯만 채워서 주기 때문에
  오전/오후 중 데이터가 있는 섹션만 보여준다.
*/
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants/routes';
import { getRoutineMain } from '../api/routineApi';
import { getAccessToken } from '../../../shared/utils/tokenStorage';
import RoutineThumbCarousel from '../components/RoutineThumbCarousel';
import Button from '../../../shared/components/Button';
import styles from './RoutineMainPage.module.css';
import morningIcon from '../../../assets/icons/routine/morning.svg';
import eveningIcon from '../../../assets/icons/routine/evening.svg';

export default function RoutineMainPage() {
  const navigate = useNavigate();
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

  const handleGuestSave = () => {
    navigate(ROUTES.LOGIN);
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

  const { routineId, score, scoreReason, summary, morning, evening } = routine;
  const isDesigned = score !== null && score !== undefined;
  const isGuest = !getAccessToken();

  return (
    <div className={styles.page}>
      <section className={styles.scoreCard}>
        {isDesigned ? (
          <>
            <p className={styles.score}>{score}점</p>
            <span className={styles.scoreBadge}>{scoreReason}</span>
            <p className={styles.description}>{summary}</p>
          </>
        ) : (
          <p className={styles.description}>루틴을 분석하고 있어요. 잠시 후 다시 확인해주세요.</p>
        )}
      </section>

      {morning.length > 0 && (
        <Link to={`${ROUTES.ROUTINE_MORNING}/${routineId}`} className={styles.timeCard}>
          <div className={styles.timeHeader}>
            <span className={`${styles.timeIcon} ${styles.timeIconMorning}`}>
              <img src={morningIcon} alt="" className={styles.timeIconImg} />
            </span>
            <span className={styles.timeLabel}>오전 루틴</span>
          </div>
          <RoutineThumbCarousel items={morning} />
        </Link>
      )}

      {evening.length > 0 && (
        <Link to={`${ROUTES.ROUTINE_EVENING}/${routineId}`} className={styles.timeCard}>
          <div className={styles.timeHeader}>
            <span className={`${styles.timeIcon} ${styles.timeIconEvening}`}>
              <img src={eveningIcon} alt="" className={styles.timeIconImg} />
            </span>
            <span className={styles.timeLabel}>오후 루틴</span>
          </div>
          <RoutineThumbCarousel items={evening} />
        </Link>
      )}

      {isGuest && (
        <Button variant="primary" className={styles.saveButton} onClick={handleGuestSave}>
          카카오로 로그인하고 저장하기
        </Button>
      )}
    </div>
  );
}