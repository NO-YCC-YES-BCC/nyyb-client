/*
  features/report/pages/HistoryPage.jsx
  라우트: /history (4. 화면 매핑 기준)
  담당: 천솔
  작업현황판 task: "분석 이력 리스트 UI 구현" (P1, 마감 8/15, API: /analyses/list)
  comment: "지난 분석 결과 목록 표시"

  각 항목을 누르면 해당 회차의 분석 리포트(ReportPage)로 이동한다.
  와이어프레임(분석 이력 리스트)의 아이콘 + 날짜/요약 + 금액 리스트 로우 스타일에 맞췄다.
*/

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAnalysisHistory } from '../api/reportApi';
import Thumb from '../../../shared/components/Thumb';
import { formatDate, formatKrw } from '../../../shared/utils/format';
import styles from './HistoryPage.module.css';

export default function HistoryPage() {
  const [history, setHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getAnalysisHistory().then((data) => {
      if (isMounted) {
        setHistory(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading || !history) {
    return (
      <div className={styles.page}>
        <p className={styles.loadingText}>분석 이력을 불러오는 중이에요...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>김지선님의 분석 기록</h1>
        <p className={styles.subtitle}>지금까지 진행한 전성분 분석 결과를 다시 볼 수 있어요.</p>
      </header>

      {history.length === 0 ? (
        <p className={styles.emptyState}>아직 분석 이력이 없어요.</p>
      ) : (
        <ul className={styles.list}>
          {history.map((item) => (
            <li key={item.jobId}>
              <Link to={`/report/${item.jobId}`} className={styles.item}>
                <Thumb tone="history" label={formatDate(item.completedAt).slice(-2)} size="md" />
                <div className={styles.itemBody}>
                  <span className={styles.itemDate}>{formatDate(item.completedAt)}</span>
                  <span className={styles.itemStats}>
                    총 {item.checkedProductCount}개 제품 · 제외 {item.removedProductCount}개
                  </span>
                </div>
                <div className={styles.itemTrailing}>
                  <span className={styles.itemSavings}>{formatKrw(item.estimatedSavings)}</span>
                  <span className={styles.chevron}>&gt;</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
