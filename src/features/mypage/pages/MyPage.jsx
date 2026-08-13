/*
  features/mypage/pages/MyPage.jsx
  라우트: /mypage (4. 화면 매핑 기준)
  담당: 천솔
  작업현황판 task: "마이페이지 프로필 UI 구현" (P1, 마감 8/15, API: /profile)
  comment: "사용자 정보와 통계 표시"

  참고: "카카오톡 수신 토글 구현"(실제 on/off 동작 연결)은 P2라 오늘 범위 밖.
  이 화면에는 자리만 배치하고 disabled 상태로 둔다.
*/

import { useEffect, useState } from 'react';
import { getProfile } from '../api/profileApi';
import ProfileSummary from '../components/ProfileSummary';
import SettingItem from '../components/SettingItem';
import { formatDate } from '../../../shared/utils/format';
import styles from './MyPage.module.css';

export default function MyPage() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getProfile().then((data) => {
      if (isMounted) {
        setProfile(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading || !profile) {
    return (
      <div className={styles.page}>
        <p className={styles.loadingText}>마이페이지를 불러오는 중이에요...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>마이페이지</h1>
      </header>

      <ProfileSummary profile={profile} />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>계정 정보</h2>
        <div className={styles.settingList}>
          <SettingItem label="가입일" value={formatDate(profile.joinedAt)} />
          <SettingItem label="로그인 방식" value="카카오" />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>알림 설정</h2>
        <div className={styles.settingList}>
          <SettingItem
            label="카카오톡 리포트 수신"
            description="분석이 끝나면 카카오톡으로 알려드려요"
            toggle={{ checked: profile.notifyKakao, disabled: true }}
            hint="준비중"
          />
        </div>
      </section>
    </div>
  );
}
