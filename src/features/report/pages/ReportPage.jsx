/*
  features/report/pages/ReportPage.jsx
  라우트: /report/:jobId  (4. 화면 매핑 기준)
  담당: 천솔

  오늘(P0) 구현 범위:
  - "분석 리포트 상단 요약 구현"
  - 제외 권장 제품 카드 / 유지 제품 리스트 / 주의 성분 카드 렌더링
  - 루틴 수정 제안 화면(RoutineEditPage)으로 이동하는 CTA

  참고: "분석 리포트 이미지로 저장하기"는 실제 캡처/저장 기능 없이 UI만
  배치한 상태다. 백엔드/이미지 생성 방식이 확정되면 별도 태스크로 붙인다.
*/

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getReport } from '../api/reportApi';
import RemoveProductCard from '../components/RemoveProductCard';
import KeepProductCard from '../components/KeepProductCard';
import IngredientWarningCard from '../components/IngredientWarningCard';
import styles from './ReportPage.module.css';

export default function ReportPage() {
  const { jobId } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getReport(jobId).then((data) => {
      if (isMounted) {
        setReport(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [jobId]);

  const isLoading = !report || report.jobId !== jobId;

  if (isLoading) {
    return (
      <div className={styles.page}>
        <p className={styles.loadingText}>분석 리포트를 불러오는 중이에요...</p>
      </div>
    );
  }

  const { summary, removeProducts, keepProducts, cautionIngredients } = report;

  return (
    <div className={styles.page}>
      <span className={styles.pageTag}>✨ SOTT 비용 리포트</span>

      {/* 상단 요약 (P0: 분석 리포트 상단 요약 구현) */}
      <header className={styles.summarySection}>
        <h1 className={styles.title}>분석이 모두 완료되었어요!</h1>
        <p className={styles.subtitle}>
          점검 제품 {summary.checkedProductCount}개 중 겹치는 성분 {summary.duplicateIngredientCount}가지 탐지
        </p>
      </header>

      {/* 구매하지 않아도 되는 제품 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>💡 구매하지 않아도 되는 제품</h2>
        <div className={styles.cardList}>
          {removeProducts.map((product, index) => (
            <RemoveProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      {/* 이 제품들은 계속 써도 괜찮아요 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>📍 이 제품들은 계속 써도 괜찮아요</h2>
        <div className={styles.cardList}>
          {keepProducts.map((product) => (
            <KeepProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 주의해야 할 성분들이 포함되어 있어요 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>⚠ 주의해야 할 성분들이 포함되어 있어요</h2>
        <div className={styles.cardList}>
          {cautionIngredients.map((ingredient) => (
            <IngredientWarningCard key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>
      </section>

      <div className={styles.ctaWrap}>
        <Link to={`/routine/edit/${jobId}`} className={styles.ctaButton}>
          루틴 추천받기
        </Link>
        {/* TODO: 실제 이미지 캡처/저장 기능은 별도 태스크에서 연결 */}
        <button type="button" className={styles.saveImageLink} disabled>
          분석 리포트 이미지로 저장하기
        </button>
      </div>
    </div>
  );
}