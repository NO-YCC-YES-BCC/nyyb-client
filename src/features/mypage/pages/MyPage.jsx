import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants/routes';
import { getMypageProfile } from '../api/mypageApi';
import ProfileSummary from '../components/ProfileSummary';
import arrowLeftIcon from '../../../assets/icons/mypage/arrow-left.svg';
import styles from './MyPage.module.css';

// path 가 있는 항목만 클릭 시 이동한다 (나머지는 준비 중)
const SERVICE_LINKS = [
  { label: 'SOTT는 어떤 서비스인가요', path: ROUTES.ONBOARDING },
  { label: '판정 근거는 어디서 왔나요' },
  { label: '1:1 문의하기' },
];

const POLICY_LINKS = ['이용약관', '개인정보 처리방침'];

export default function MyPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 재요청 전 에러 상태 초기화
    setLoadError(null);

    getMypageProfile()
      .then((data) => {
        if (isMounted) setProfile(data);
      })
      .catch((error) => {
        console.error('[MyPage] failed to load profile:', error);
        if (isMounted) setLoadError(error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loadError) {
    return (
      <div className={styles.page}>
        <p className={styles.loadingText}>내 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

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
        <h2 className={styles.sectionTitle}>서비스 정보</h2>
        <div className={styles.linkCard}>
          {SERVICE_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              className={styles.linkRowBase}
              onClick={link.path ? () => navigate(link.path) : undefined}
            >
              <span>{link.label}</span>
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