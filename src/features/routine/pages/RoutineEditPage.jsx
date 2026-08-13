/*
  features/routine/pages/RoutineEditPage.jsx
  라우트: /routine/edit/:jobId (4. 화면 매핑 기준)
  담당: 천솔
  작업현황판 task: "루틴 수정 제안 UI 구현" (P0, 마감 8/14, API: /report/{jobId})
  comment: "사용자가 유지할 제품과 시간대를 고르는 화면"

  분석 리포트의 keepProducts를 기준으로, 사용자가 아침/저녁 루틴에
  넣을 제품과 시간대를 선택한다. 선택 결과는 다음 화면(RoutinePreviewPage)에
  라우터 state로 전달한다.
*/

import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReport } from '../../report/api/reportApi';
import { mockDefaultSelection } from '../../../mocks/mockData';
import RoutineProductCard from '../components/RoutineProductCard';
import styles from './RoutineEditPage.module.css';

export default function RoutineEditPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [keepProducts, setKeepProducts] = useState([]);
  const [selection, setSelection] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getReport(jobId).then((report) => {
      if (!isMounted) return;
      setKeepProducts(report.keepProducts ?? []);

      // 유지 제품 기준으로 초기 선택값 구성 (mock 추천값이 있으면 사용, 없으면 미선택)
      const initialSelection = {};
      (report.keepProducts ?? []).forEach((product) => {
        initialSelection[product.id] = mockDefaultSelection[product.id] ?? {
          morning: false,
          evening: false,
        };
      });
      setSelection(initialSelection);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [jobId]);

  const selectedCount = useMemo(
    () =>
      Object.values(selection).filter((slot) => slot?.morning || slot?.evening).length,
    [selection]
  );

  function handleToggle(productId, slot) {
    setSelection((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [slot]: !prev[productId]?.[slot],
      },
    }));
  }

  function handleNext() {
    navigate(`/routine/preview/${jobId}`, { state: { selection } });
  }

  if (isLoading) {
    return (
      <div className={styles.page}>
        <p className={styles.loadingText}>유지 제품을 불러오는 중이에요...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>루틴에 넣을 제품을 골라주세요</h1>
        <p className={styles.subtitle}>
          유지하기로 한 제품 중, 아침/저녁 루틴에 넣을 시간대를 선택해주세요.
        </p>
      </header>

      <ul className={styles.list}>
        {keepProducts.map((product) => (
          <li key={product.id}>
            <RoutineProductCard
              product={product}
              editable
              morningSelected={!!selection[product.id]?.morning}
              eveningSelected={!!selection[product.id]?.evening}
              onToggle={(slot) => handleToggle(product.id, slot)}
            />
          </li>
        ))}
      </ul>

      <div className={styles.ctaWrap}>
        <p className={styles.selectedCount}>{selectedCount}개 제품 선택됨</p>
        <button type="button" className={styles.ctaButton} onClick={handleNext}>
          변화 미리보기
        </button>
      </div>
    </div>
  );
}
