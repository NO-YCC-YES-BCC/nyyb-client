import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button";
import { ROUTES } from "../../../shared/constants/routes";
import { loginWithGuest } from "../api/authApi";
import kakaoIcon from "../../../assets/icons/auth/kakao.svg";
import sottLogo from "../../../assets/icons/auth/sott-logo.svg";
import styles from "./KakaoLoginPage.module.css";

export default function KakaoLoginPage() {
  const navigate = useNavigate();
  const [isTestLoginLoading, setIsTestLoginLoading] = useState(false);

  const handleKakaoLogin = () => {
    const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const kakaoRedirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

    if (!kakaoClientId || !kakaoRedirectUri) {
      console.error("카카오 환경변수가 없습니다.", {
        kakaoClientId,
        kakaoRedirectUri,
      });
      return;
    }

    const params = new URLSearchParams({
      client_id: kakaoClientId,
      redirect_uri: kakaoRedirectUri,
      response_type: "code",
    });

    window.location.href = `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
  };

  const handleTestLogin = async () => {
    if (isTestLoginLoading) return;

    setIsTestLoginLoading(true);

    try {
      await loginWithGuest();
      navigate(ROUTES.HOME, { replace: true });
    } catch (error) {
      console.error("테스트 계정 로그인 실패", error);
      setIsTestLoginLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.topContent}>
        <img src={sottLogo} alt="SOTT" className={styles.logo} />
        <p className={styles.tagline}>
          제품 성분이 겹치고 있진 않을까요?
          <br />
          제품을 검색해서 바로 성분을 확인해보세요!
        </p>
      </div>

      <div className={styles.buttonWrap}>
        <Button variant="kakao" leftIcon={kakaoIcon} onClick={handleKakaoLogin}>
          카카오로 시작하기
        </Button>
        <Button
          variant="kakaoLight"
          disabled={isTestLoginLoading}
          onClick={handleTestLogin}
        >
          {isTestLoginLoading ? "로그인 중..." : "테스트 계정으로 로그인"}
        </Button>
      </div>
    </div>
  );
}
