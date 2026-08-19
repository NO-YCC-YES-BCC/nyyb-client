import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants/routes';
import { getRoutineMain } from '../api/routineApi';
import { getUser } from '../../../shared/utils/tokenStorage';
import RoutineThumbCarousel from '../components/RoutineThumbCarousel';
import Button from '../../../shared/components/Button';
import styles from './RoutineMainPage.module.css';
import morningIcon from '../../../assets/icons/routine/morning.svg';
import eveningIcon from '../../../assets/icons/routine/evening.svg';

export default function RoutineMainPage() {
  const navigate = useNavigate();
  const [routine, setRoutine] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let ignore = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 재요청 전 로딩/에러 상태 초기화 (React 데이터 페칭 표준 패턴)
    setIsLoading(true);
    setLoadError(null);

    getRoutineMain()
      .then((data) => {
        if (!ignore) {
          setRoutine(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error('[RoutineMainPage] failed to load routine:', error);
        if (!ignore) {
          setLoadError(error);
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

  if (loadError) {
    return (
      <div className={styles.page}>
        <p className={styles.emptyState}>루틴 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.</p>
      </div>
    );
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
  const user = getUser();
  const isGuest = user?.guest === true;

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