/*
  features/routine/pages/RoutinePreviewPage.jsx
  라우트: /routine/preview/:jobId (4. 화면 매핑 기준)
  담당: 천솔

  오늘(P0) 구현 범위:
  - "루틴 변화 미리보기 UI 구현" (comment: 저장 전 Before/After 변화 표시)
  - "루틴 저장 버튼 연결" (comment: 최종 선택 결과를 저장)

  TODO(RoutineMainPage 완성 후, P1/8·15): 저장 성공 시 navigate('/routine')로 이동시키고,
  지금의 인라인 성공 메시지는 toast 등으로 교체한다.
*/

import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { previewRoutine, saveRoutine } from '../api/routineApi';
import { mockDefaultSelection } from '../../../mocks/mockData';
import RoutineProductCard from '../components/RoutineProductCard';
import styles from './RoutinePreviewPage.module.css';

function RoutineColumn({ title, morning, evening }) {
  return (
    <div className={styles.column}>
      <h3 className={styles.columnTitle}>{title}</h3>

      <div className={styles.slot}>
        <p className={styles.slotLabel}>아침</p>
        {morning.length === 0 ? (
          <p className={styles.emptyText}>선택된 제품이 없어요</p>
        ) : (
          <ul className={styles.slotList}>
            {morning.map((product) => (
              <li key={product.id}>
                <RoutineProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.slot}>
        <p className={styles.slotLabel}>저녁</p>
        {evening.length === 0 ? (
          <p className={styles.emptyText}>선택된 제품이 없어요</p>
        ) : (
          <ul className={styles.slotList}>
            {evening.map((product) => (
              <li key={product.id}>
                <RoutineProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function RoutinePreviewPage() {
  const { jobId } = useParams();
  const location = useLocation();

  // RoutineEditPage에서 넘어온 선택값. 직접 URL로 진입한 경우(QA/데모)엔 mock 기본값 사용.
  const selection = location.state?.selection ?? mockDefaultSelection;

  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    previewRoutine({ jobId, selection }).then((data) => {
      if (isMounted) {
        setPreview(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  async function handleSave() {
    setIsSaving(true);
    setSaveError(null);
    try {
      const result = await saveRoutine({ jobId, selection });
      setSavedAt(result.savedAt);
    } catch (error) {
      setSaveError('루틴 저장에 실패했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading || !preview) {
    return (
      <div className={styles.page}>
        <p className={styles.loadingText}>변화를 계산하는 중이에요...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>루틴이 이렇게 바뀌어요</h1>
        <p className={styles.subtitle}>저장하기 전에 기존 루틴과 비교해보세요.</p>
      </header>

      <div className={styles.compareWrap}>
        <RoutineColumn title="기존 루틴" morning={preview.before.morning} evening={preview.before.evening} />
        <RoutineColumn title="변경 후 루틴" morning={preview.after.morning} evening={preview.after.evening} />
      </div>

      <div className={styles.ctaWrap}>
        {savedAt ? (
          <p className={styles.savedText}>루틴이 저장됐어요!</p>
        ) : (
          <>
            {saveError && <p className={styles.errorText}>{saveError}</p>}
            <button type="button" className={styles.ctaButton} onClick={handleSave} disabled={isSaving}>
              {isSaving ? '저장하는 중...' : '루틴 저장하기'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
