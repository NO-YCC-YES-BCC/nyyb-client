import styles from './ProfileSummary.module.css';

export default function ProfileSummary({ profile }) {
  const { userName, email, stats, isLoggedIn } = profile;

  return (
    <section className={styles.profileSummary}>
      <div className={styles.profileRow}>
        <div className={styles.avatar}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="8" r="4" fill="#ffffff" />
            <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" fill="#ffffff" />
          </svg>
        </div>
        <div className={styles.profileInfo}>
          {isLoggedIn ? (
            <>
              <p className={styles.profileName}>{userName} 님</p>
              {email && <p className={styles.profileEmail}>{email}</p>}
            </>
          ) : (
            <p className={styles.profileName}>로그인이 필요해요</p>
          )}
        </div>
        {isLoggedIn && (
          <button type="button" className={styles.editButton}>
            수정
          </button>
        )}
      </div>

      <div className={styles.statList}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>사용하는 제품</span>
          <span className={styles.statValue}>{stats.usingProductCount}개</span>
        </div>
        <div className={`${styles.statCard} ${styles.statCardHighlight}`}>
          <span className={styles.statLabel}>덜어낸 제품</span>
          <span className={`${styles.statValue} ${styles.statValueHighlight}`}>
            {stats.removedProductCount}개
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>분석 횟수</span>
          <span className={styles.statValue}>{stats.analysisCount}회</span>
        </div>
      </div>
    </section>
  );
}