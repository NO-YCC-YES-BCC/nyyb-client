import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/routes";
import { useLatestRoutine } from "../hooks/useLatestRoutine";
import BeforeAnalysisHome from "../components/BeforeAnalysisHome";
import AfterAnalysisHome from "../components/AfterAnalysisHome";
import styles from "./HomePage.module.css";

export default function HomePage() {
    
    const navigate = useNavigate();
    const { routine, status, reload } = useLatestRoutine();

    useEffect(() => {
      if (status === "unauthorized") {
        navigate(ROUTES.LOGIN, { replace: true });
      }
    }, [status, navigate]);

  return (
    <main className={styles.page}>
      {status === "loading" && (
        <p className={styles.stateText}> 루틴을 불러오는 중이에요</p>
      )}

      {status === "empty" && <BeforeAnalysisHome />}

      {status === "success" && <AfterAnalysisHome routine = {routine} />}

      {status === "error" && (
        <div className={styles.stateBox}>
          <p className={styles.stateText}>정보를 불러올 수 없습니다. </p>
            <button type="button" className={styles.retryButton} onClick={reload}>
              다시시도
            </button>
        </div>
      )}
    </main>
  );
}