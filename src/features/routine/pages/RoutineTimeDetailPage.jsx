/*
  features/routine/pages/RoutineTimeDetailPage.jsx
  라우트: /routine/morning/:routineId, /routine/evening/:routineId
  담당: 천솔
  작업현황판 task: "아침 루틴 상세 UI 구현" / "저녁 루틴 상세 UI 구현" (P1, 마감 8/15, API: /routines/{routineId}/day, /routines/{routineId}/products)
  comment: "아침/저녁 전체 보기"

  MorningRoutinePage / EveningRoutinePage가 timeSlot prop만 다르게 넘기는
  공용 내부 컴포넌트(라우트 없음).
*/
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoutineTimeDetail, saveRoutineProducts } from '../api/routineApi';
import { ROUTES } from '../../../shared/constants/routes';
import RoutineProductCard from '../components/RoutineProductCard';
import morningIcon from '../../../assets/icons/routine/morning.svg';
import eveningIcon from '../../../assets/icons/routine/evening.svg';
import styles from './RoutineTimeDetailPage.module.css';

const TIME_SLOT_META = {
  morning: { label: '오전 루틴', icon: morningIcon },
  evening: { label: '오후 루틴', icon: eveningIcon },
};

export default function RoutineTimeDetailPage({ timeSlot }) {
  const { routineId } = useParams();
  const navigate = useNavigate();
  const [dayData, setDayData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    let ignore = false;
    getRoutineTimeDetail(routineId, timeSlot).then((data) => {
      if (!ignore) {
        setDayData(data);
        setIsLoading(false);
      }
    });
    return () => {
      ignore = true;
    };
  }, [routineId, timeSlot]);

  if (isLoading) return <div className={styles.page}>불러오는 중...</div>;
  if (!dayData) return <div className={styles.page}>루틴 정보를 찾을 수 없어요.</div>;

  const meta = TIME_SLOT_META[timeSlot];
  const products = dayData.products ?? [];
  const excludeCount = products.filter((p) => p.recommended === 'REMOVE').length;
  const keepCount = products.length - excludeCount;

  const handleSaveAndReorganize = async () => {
    const payload = products.map((product) => ({
      id: product.id,
      slot: dayData.slot,
      action: product.recommended,
    }));

    setIsSaving(true);
    setSaveError(null);
    try {
      await saveRoutineProducts(routineId, payload);
      navigate(ROUTES.ROUTINE);
    } catch (error) {
      console.error('[RoutineTimeDetailPage] failed to save routine products:', error);
      setSaveError('저장에 실패했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.headerPill}>
        <span className={`${styles.headerIcon} ${styles[`icon-${timeSlot}`]}`}>
          <img src={meta.icon} alt="" className={styles.headerIconImg} />
        </span>
        <span className={styles.headerLabel}>{meta.label}</span>
      </div>

      <div className={styles.statChips}>
        <span className={`${styles.chip} ${styles.chipActive_1}`}>사용 제품 {products.length}</span>
        <span className={`${styles.chip} ${styles.chipActive_2}`}>조합 추천 {keepCount}</span>
        <span className={`${styles.chip} ${styles.chipActive_3}`}>제외 제안 {excludeCount}</span>
      </div>

      <div className={styles.list}>
        {products.map((product) => (
          <RoutineProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={styles.ctaWrap}>
        <button
          type="button"
          className={styles.ctaButton}
          onClick={handleSaveAndReorganize}
          disabled={isSaving}
        >
          {isSaving ? '저장 중...' : '제외 제안 반영 후 다시 정리하기'}
        </button>
        {saveError && <p className={styles.saveError}>{saveError}</p>}
      </div>
    </div>
  );
}