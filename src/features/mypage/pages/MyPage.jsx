import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../api/profileApi';
import ProfileSummary from '../components/ProfileSummary';
import arrowLeftIcon from '../../../assets/icons/Arrow_left.svg';
import styles from './MyPage.module.css';

const SERVICE_LINKS = ['SOTT는 어떤 서비스인가요', '판정 근거는 어디서 왔나요', '1:1 문의하기'];

const POLICY_LINKS = ['이용약관', '개인정보 처리방침'];

export default function MyPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getProfile().then((data) => {
      if (isMounted) setProfile(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!profile) {
    return (
      <div className={styles.page}>
        <p className={styles.loadingText}>내 정보를 불러오는 중이에요...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <button type="button" className={styles.backButton} onClick={() => navigate(-1)} aria-label="뒤로 가기">
          <img src={arrowLeftIcon} alt="" className={styles.backIcon} />
        </button>
        <h1 className={styles.topBarTitle}>내 정보</h1>
      </header>

      <ProfileSummary profile={profile} />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>알림 설정</h2>
        <div className={styles.notifyCard}>
          <div>
            <p className={styles.notifyLabel}>분석 결과 카톡으로 받기</p>
            <p className={styles.notifySub}>나와의 채팅방으로 보내드려요</p>
          </div>
          <span className={styles.notifyToggle}>{profile.notifyKakao ? 'ON' : 'OFF'}</span>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>서비스 정보</h2>
        <div className={styles.linkCard}>
          {SERVICE_LINKS.map((label) => (
            <button key={label} type="button" className={styles.linkRowBase}>
              <span>{label}</span>
              <span className={styles.linkArrow}>&rarr;</span>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>약관 및 정책</h2>
        <div className={styles.linkCard}>
          {POLICY_LINKS.map((label) => (
            <button key={label} type="button" className={styles.linkRowBase}>
              <span>{label}</span>
              <span className={styles.linkArrow}>&rarr;</span>
            </button>
          ))}
        </div>
      </section>

      <div className={styles.footerLinks}>
        <button type="button" className={`${styles.footerLink} ${styles.footerLinkUnderline}`}>
          로그아웃
        </button>
        <button type="button" className={`${styles.footerLink} ${styles.footerLinkUnderline}`}>
          회원탈퇴
        </button>
      </div>
    </div>
  );
}