/*
  features/report/pages/HistoryPage.jsx
  라우트: /history (4. 화면 매핑 기준)
  담당: 천솔
  작업현황판 task: "분석 이력 리스트 UI 구현" (P1, 마감 8/15, API: /analyses/list)
  comment: "지난 분석 결과 목록 표시"

  각 항목을 누르면 해당 회차의 분석 리포트(ReportPage)로 이동한다.
  와이어프레임 스크린샷 기준으로 상단 칩 + 누적 배너(라벨+큰 숫자) +
  카드형 리스트 로우(날짜/제품 수/상태 배지)로 맞췄다.

  상단 누적 배너 수치는 하드코딩하지 않고 history 배열을 그대로 합산해서 계산한다.
*/

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAnalysisHistory } from '../api/reportApi';
import { formatKrw } from '../../../shared/utils/format';
import styles from './HistoryPage.module.css';

// completedAt을 "8월 3일" 형태로 표시한다 (와이어프레임 문구 기준).
function formatHistoryDate(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '-';
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

// 이력 항목 하나의 removedProductCount/routineScore 조합으로 상태 배지를 계산한다.
// - 제외 제품이 있으면: "과잉 N개 제외" (remove 톤)
// - 제외는 없고 루틴 점수가 있으면: "안전 루틴 N점" (keep 톤)
// - 둘 다 없으면: "성분 최적화" (history 톤)
function getHistoryStatus(item) {
  if (item.removedProductCount > 0) {
    return { tone: 'remove', label: `과잉 ${item.removedProductCount}개 제외` };
  }
  if (typeof item.routineScore === 'number') {
    return { tone: 'keep', label: `안전 루틴 ${item.routineScore}점` };
  }
  return { tone: 'history', label: '성분 최적화' };
}

export default function HistoryPage() {
  const [history, setHistory] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getAnalysisHistory().then((data) => {
      if (isMounted) {
        setHistory(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!history) {
    return (
      <div className={styles.page}>
        <p className={styles.loadingText}>분석 이력을 불러오는 중이에요...</p>
      </div>
    );
  }

  const totalExcludedCount = history.reduce((sum, item) => sum + item.removedProductCount, 0);
  const totalSavings = history.reduce((sum, item) => sum + item.estimatedSavings, 0);

  return (
    <div className={styles.page}>
      <span className={styles.pageTag}>📊 히스토리</span>

      <header className={styles.header}>
        <h1 className={styles.title}>김지은님의 분석 기록</h1>
        <p className={styles.subtitle}>지금까지 진행된 SOTT 디톡스 리포트 모음입니다.</p>
      </header>

      {history.length > 0 && (
        <div className={styles.summaryBanner}>
          <span className={styles.summaryLabel}>누적 성분 디톡스 성과</span>
          <span className={styles.summaryValue}>
            총 {totalExcludedCount}개 제외 · {formatKrw(totalSavings)} 절약
          </span>
        </div>
      )}

      {history.length === 0 ? (
        <p className={styles.emptyState}>아직 분석 이력이 없어요.</p>
      ) : (
        <ul className={styles.list}>
          {history.map((item) => {
            const status = getHistoryStatus(item);
            return (
              <li key={item.jobId}>
                <Link to={`/report/${item.jobId}`} className={styles.item}>
                  <div className={styles.itemBody}>
                    <span className={styles.itemDate}>{formatHistoryDate(item.completedAt)} 분석 리포트</span>
                    <span className={styles.itemStats}>{item.checkedProductCount}개 제품 점검</span>
                  </div>
                  <div className={styles.itemTrailing}>
                    <span className={`${styles.statusBadge} ${styles[`status-${status.tone}`]}`}>
                      {status.label}
                    </span>
                    <span className={styles.chevron}>&rarr;</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}