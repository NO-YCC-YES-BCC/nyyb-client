/*
  features/auth/pages/KakaoLoginPage.jsx
  라우트: /login (4. 화면 매핑 기준)
  담당: 천솔
  작업현황판 task: "카카오 로그인 화면 구현" (P1, 마감 8/15, API: /auth/kakao)
  comment: "비로그인 저장 시점에 필요"

  5. 프론트 화면 플로우 기준: 루틴 변화 미리보기(RoutinePreviewPage)에서
  "비로그인" 상태로 저장을 시도하면 이 화면으로 오고, 로그인 성공 후
  원래 하려던 동작(예: 루틴 저장)이 있던 화면으로 되돌아간다.

  실제 카카오 SDK 연동은 REST API 키 발급 등 별도 설정이 필요해서,
  오늘은 "카카오 로그인" 버튼 클릭 -> authApi 호출(mock fallback 포함) 흐름만
  화면 레벨에서 완성해뒀다. SDK 연동은 키 발급 후 handleKakaoLogin 내부만 교체하면 된다.
*/

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginWithKakao } from '../api/authApi';
import { setAccessToken } from '../../../shared/utils/authStorage';
import styles from './KakaoLoginPage.module.css';

export default function KakaoLoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const redirectTo = location.state?.from?.pathname ?? '/mypage';

  async function handleKakaoLogin() {
    setIsLoading(true);
    setError(null);
    try {
      // TODO(카카오 SDK 키 발급 후): window.Kakao.Auth.authorize(...) 콜백에서 받은
      // authorization code를 아래 loginWithKakao에 그대로 넘기도록 교체
      const result = await loginWithKakao('mock-authorization-code');
      setAccessToken(result.accessToken);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError('로그인에 실패했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.logoMark}>SOTT</div>
        <h1 className={styles.title}>
          로그인하고
          <br />
          분석 결과를 저장해보세요
        </h1>
        <p className={styles.subtitle}>
          카카오로 3초만에 시작하면, 지금까지 만든 루틴이 그대로 내 계정에 저장돼요.
        </p>
      </div>

      <div className={styles.ctaWrap}>
        {error && <p className={styles.errorText}>{error}</p>}
        <button type="button" className={styles.kakaoButton} onClick={handleKakaoLogin} disabled={isLoading}>
          {isLoading ? '로그인하는 중...' : '카카오로 시작하기'}
        </button>
      </div>
    </div>
  );
}
