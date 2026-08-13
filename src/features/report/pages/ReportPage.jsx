/*
  features/report/pages/ReportPage.jsx
  라우트: /report/:jobId  (4. 화면 매핑 기준)
  담당: 천솔

  오늘(P0) 구현 범위:
  - "분석 리포트 상단 요약 구현" (comment: 분석 완료 메시지, 점검 제품 수, 중복 성분 수 표시)
  - 제외 권장 제품 카드 / 유지 제품 리스트 / 주의 성분 카드 렌더링
  - 루틴 수정 제안 화면(RoutineEditPage)으로 이동하는 CTA

  TODO(기범 Router.jsx 완성 후): 실제 라우팅 정책(가드 등)에 맞춰 이 파일의
  진입/이탈 처리를 다시 확인할 것.
*/

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getReport } from '../api/reportApi';
import RemoveProductCard from '../components/RemoveProductCard';
import KeepProductCard from '../components/KeepProductCard';
import IngredientWarningCard from '../components/IngredientWarningCard';
import { formatKrw } from '../../../shared/utils/format';
import styles from './ReportPage.module.css';

export default function ReportPage() {
  const { jobId } = useParams();
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getReport(jobId).then((data) => {
      if (isMounted) {
        setReport(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [jobId]);

  if (isLoading || !report) {
    return (
      <div className={styles.page}>
        <p className={styles.loadingText}>분석 리포트를 불러오는 중이에요...</p>
      </div>
    );
  }

  const { userName, summary, removeProducts, keepProducts, cautionIngredients } = report;

  return (
    <div className={styles.page}>
      {/* 상단 요약 (P0: 분석 리포트 상단 요약 구현) */}
      <section className={styles.summarySection}>
        <p className={styles.greeting}>{userName}님</p>
        <h1 className={styles.title}>분석이 모두 완료되었어요!</h1>
        <div className={styles.summaryCard}>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>점검한 제품</span>
            <span className={styles.summaryValue}>{summary.checkedProductCount}개</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>중복된 주의 성분</span>
            <span className={styles.summaryValue}>{summary.duplicateIngredientCount}개</span>
          </div>
          <div className={styles.summaryDivider} />
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>예상 절약 금액</span>
            <span className={styles.summaryHighlight}>{formatKrw(summary.estimatedSavings)}</span>
          </div>
        </div>
      </section>

      {/* 제외 권장 제품 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>이 제품은 제외를 권장해요</h2>
        <div className={styles.cardList}>
          {removeProducts.map((product) => (
            <RemoveProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 유지 제품 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>이 제품은 계속 써도 좋아요</h2>
        <div className={styles.cardList}>
          {keepProducts.map((product) => (
            <KeepProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 주의 성분 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>주의해야 할 성분</h2>
        <div className={styles.cardList}>
          {cautionIngredients.map((ingredient) => (
            <IngredientWarningCard key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>
      </section>

      <div className={styles.ctaWrap}>
        <Link to={`/routine/edit/${jobId}`} className={styles.ctaButton}>
          루틴 수정하러 가기
        </Link>
      </div>
    </div>
  );
}
