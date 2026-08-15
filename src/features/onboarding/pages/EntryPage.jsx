import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/routes";
import Button from "../../../shared/components/Button"
import CyclingIcon from "../components/CyclingIcon";
import styles from "./EntryPage.module.css";

export default function EntryPage() {
  const navigate = useNavigate();

  function goToCaptureGuide() {
    navigate(ROUTES.CAPTURE);
  }

  function goToLogin() {
    navigate(ROUTES.LOGIN);
  }

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <div className={styles.textGroup}>
          <h1 className={styles.title}>
            현재 사용하는 화장품,
            <br />
            전부 필요할까요?
          </h1>
          
        <p className={styles.description}>
          사용하고 계신 화장품을 찍어서 분석하면
          <br />
          불필요한 화장품을 알려드려요!
        </p>
        </div>

        <div className={styles.animationArea}>
          <CyclingIcon/>
        </div>
      </section>

      <div className={styles.actionArea}>
        <Button variant="primary" onClick={goToCaptureGuide}>
          성분 검사해보기
        </Button>

        <button type="button" className={styles.loginButton} onClick={goToLogin}>
          로그인하기
        </button>
      </div>
    </main>

  );
}