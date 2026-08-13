/*
  features/mypage/components/ProfileSummary.jsx
  담당: 천솔
  작업현황판 task: "마이페이지 프로필 UI 구현"에서 사용하는 컴포넌트 (P1, 마감 8/15, API: /profile)
  comment: "사용자 정보와 통계 표시"
*/

import { formatDate, formatKrw } from '../../../shared/utils/format';
import styles from './ProfileSummary.module.css';

export default function ProfileSummary({ profile }) {
  const { userName, joinedAt, stats } = profile;

  return (
    <div className={styles.card}>
      <div className={styles.identity}>
        <div className={styles.avatar}>{userName?.[0] ?? '?'}</div>
        <div>
          <p className={styles.name}>{userName}님</p>
          <p className={styles.joinedAt}>{formatDate(joinedAt)}부터 함께하고 있어요</p>
        </div>
      </div>

      <div className={styles.statGrid}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{stats.totalAnalysisCount}</span>
          <span className={styles.statLabel}>총 분석 횟수</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{stats.totalRemovedProductCount}</span>
          <span className={styles.statLabel}>제외한 제품</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{formatKrw(stats.totalSavings)}</span>
          <span className={styles.statLabel}>누적 절약 금액</span>
        </div>
      </div>
    </div>
  );
}
