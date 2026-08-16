/*
  features/routine/pages/RoutinePreviewPage.jsx
  라우트: /routine/preview
  담당: 천솔
  작업현황판 task: "루틴 변화 미리보기 UI 구현" (P0, API: /routines/preview)
             + "루틴 저장 버튼 연결" (P0, API: /routines)
  comment: "저장 전 Before/After 변화 표시" / "최종 선택 결과를 저장"
*/
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants/routes';
import { getRoutinePreview, saveRoutine } from '../api/routineApi';
import styles from './RoutinePreviewPage.module.css';

export default function RoutinePreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const selection = location.state?.selection ?? [];

  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let ignore = false;
    getRoutinePreview(selection).then((data) => {
      if (!ignore) {
        setPreview(data);
        setIsLoading(false);
      }
    });
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await saveRoutine(selection);
    setIsSaving(false);
    navigate(ROUTES.ROUTINE);
  };

  if (isLoading) {
    return <div className={styles.page}>불러오는 중...</div>;
  }

  const { before, after } = preview;

  return (
    <div className={styles.page}>
      <div className={styles.headerPill}>
        <span className={styles.headerLabel}>변화 미리보기</span>
      </div>
      <p className={styles.subtitle}>저장하기 전에 기존 루틴과 달라지는 점을 확인해보세요.</p>

      <section className={styles.compareCard}>
        <p className={styles.compareLabel}>Before · 기존 루틴</p>
        <div className={styles.thumbGroup}>
          <p className={styles.slotLabel}>오전 {before.morning.length}개</p>
          <div className={styles.thumbRow}>
            {before.morning.map((item) => (
              <img key={item.id} src={item.imageUrl} alt={item.name} className={styles.thumb} />
            ))}
          </div>
          <p className={styles.slotLabel}>오후 {before.evening.length}개</p>
          <div className={styles.thumbRow}>
            {before.evening.map((item) => (
              <img key={item.id} src={item.imageUrl} alt={item.name} className={styles.thumb} />
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.compareCard} ${styles.compareCardAfter}`}>
        <p className={styles.compareLabel}>After · 변경 후 루틴</p>
        <div className={styles.thumbGroup}>
          <p className={styles.slotLabel}>오전 {after.morning.length}개</p>
          <div className={styles.thumbRow}>
            {after.morning.map((item) => (
              <img key={item.id} src={item.imageUrl} alt={item.name} className={styles.thumb} />
            ))}
          </div>
          <p className={styles.slotLabel}>오후 {after.evening.length}개</p>
          <div className={styles.thumbRow}>
            {after.evening.map((item) => (
              <img key={item.id} src={item.imageUrl} alt={item.name} className={styles.thumb} />
            ))}
          </div>
        </div>
      </section>

      <div className={styles.ctaWrap}>
        <button type="button" className={styles.ctaButton} onClick={handleSave} disabled={isSaving}>
          {isSaving ? '저장 중...' : '이 루틴으로 저장하기'}
        </button>
      </div>
    </div>
  );
}