import { formatKrw } from "../../../shared/utils/format";
import { calculateSavings } from "../utils/savings";
import { Link } from "react-router-dom";
import { getUser } from "../../../shared/utils/tokenStorage";
import { extractAnalysisDate } from "../utils/analysisTitle";
import { useAnalysisList } from "../hooks/useAnalysisList";
import styles from "./HistoryPage.module.css";

export default function HistoryPage() {
  const { analyses, status } = useAnalysisList({ size: 20 });
  const nickname = getUser()?.nickname ?? "회원";

  if (status === "loading") {
    return (
      <div className={styles.page}>
        <p className={styles.loadingText}>분석 이력을 불러오는 중이에요...</p>
      </div>
    );
  }

  if (status !== "success") {
    return (
      <div className={styles.page}>
        <p className={styles.loadingText}>정보를 불러올 수 없습니다.</p>
      </div>
    );
  }


  const totalRemoveCount = analyses.reduce((sum, item) => sum + (item.removeCount ?? 0), 0);
  const totalSavings = calculateSavings(totalRemoveCount);


  return (
    <div className={styles.page}>
      <span className={styles.pageTag}>📊 히스토리</span>

      <header className={styles.header}>
        <h1 className={styles.title}>{nickname}님의 분석 기록</h1>
        <p className={styles.subtitle}>지금까지 진행된 SOTT 디톡스 리포트 모음입니다.</p>
      </header>

            {analyses.length > 0 && (
        <div className={styles.summaryBanner}>
          <span className={styles.summaryLabel}>누적 성분 디톡스 성과</span>
          <span className={styles.summaryValue}>
            총 {totalRemoveCount}개 제외 · {formatKrw(totalSavings)} 절약
          </span>
        </div>
      )}


      {analyses.length === 0 ? (
        <p className={styles.emptyState}>아직 분석 이력이 없어요.</p>
      ) : (
        <ul className={styles.list}>
          {analyses.map((item) => (
            <li key={item.id}>
              <Link to={`/report/${item.id}`} className={styles.item}>
                <div className={styles.itemBody}>
                  <span className={styles.itemDate}>
                    {extractAnalysisDate(item.title)} 분석 리포트
                  </span>
                  <span className={styles.itemStats}>제품 {item.productCount}개</span>
                </div>

                <div className={styles.itemTrailing}>
                  {item.removeCount > 0 && (
                    <span className={`${styles.statusBadge} ${styles["status-remove"]}`}>
                      {item.removeCount}개 제외
                    </span>
                  )}
                  <span className={styles.chevron}>&rarr;</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
