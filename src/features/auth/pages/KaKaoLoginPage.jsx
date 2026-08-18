import { useNavigate } from 'react-router-dom';
import Button from '../../../shared/components/Button';
import { ROUTES } from '../../../shared/constants/routes';
import kakaoIcon from '../../../assets/icons/kakao.svg';
import styles from './KakaoLoginPage.module.css';

export default function KakaoLoginPage() {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    console.warn('[KakaoLoginPage] 카카오 로그인 연동 예정');
  };

  const handleGuestLogin = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className={styles.page}>
      <div className={styles.logoPlaceholder} aria-hidden="true" />

      <p className={styles.tagline}>
        제품 성분이 겹치고 있진 않을까요?
        <br />
        전성분을 찍으면 바로 확인해드려요
      </p>

      <div className={styles.buttonWrap}>
        <Button variant="kakao" leftIcon={kakaoIcon} onClick={handleKakaoLogin}>
          카카오로 시작하기
        </Button>
        <Button variant="kakaoLight" onClick={handleGuestLogin}>
          게스트 계정으로 로그인
        </Button>
      </div>
    </div>
  );
}