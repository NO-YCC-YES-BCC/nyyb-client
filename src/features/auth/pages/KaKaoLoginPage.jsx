import { useNavigate } from 'react-router-dom';
import Button from '../../../shared/components/Button';
import { ROUTES } from '../../../shared/constants/routes';
import kakaoIcon from '../../../assets/icons/kakao.svg';
import sottLogo from '../../../assets/icons/sott_logo.svg';
import styles from './KakaoLoginPage.module.css';

export default function KakaoLoginPage() {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = new URL("https://kauth.kakao.com/oauth/authorize");

    kakaoAuthUrl.searchParams.set("response_type", "code");
    kakaoAuthUrl.searchParams.set(
      "client_id",
      import.meta.env.VITE_KAKAO_REST_API_KEY
    );
    kakaoAuthUrl.searchParams.set(
      "redirect_uri",
      import.meta.env.VITE_KAKAO_REDIRECT_URI
    ); 
    window.location.href = kakaoAuthUrl.toString();
  };

  const handleTestLogin = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className={styles.page}>
      <div className={styles.topContent}>
        <img src={sottLogo} alt="SOTT" className={styles.logo} />
        <p className={styles.tagline}>
          제품 성분이 겹치고 있진 않을까요?
          <br />
          전성분을 찍으면 바로 확인해드려요
        </p>
      </div>

      <div className={styles.buttonWrap}>
        <Button variant="kakao" leftIcon={kakaoIcon} onClick={handleKakaoLogin}>
          카카오로 시작하기
        </Button>
        <Button variant="kakaoLight" onClick={handleTestLogin}>
          테스트 계정으로 로그인
        </Button>
      </div>
    </div>
  );
}