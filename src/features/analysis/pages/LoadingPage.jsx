import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button";
import { ROUTES } from "../../../shared/constants/routes";
import { resolveAnalysisErrorStatus, startAnalysis } from "../api/analysisApi";
import { saveStoredCaptureProducts } from "../../capture/api/captureApi";
import styles from "./LoadingPage.module.css";

const MIN_LOADING_TIME = 3000;

export default function LoadingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const products = location.state?.products;

  const [status, setStatus] = useState("loading");
  const [retryCount, setRetryCount] = useState(0);
  const startedRef = useRef(-1);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!products?.length) return;

    // 개발 모드(StrictMode)는 effect 를 두 번 실행하므로, 같은 시도에서는 요청을 한 번만 보낸다
    if (startedRef.current === retryCount) return;
    startedRef.current = retryCount;

    const minWait = new Promise((resolve) =>
      setTimeout(resolve, MIN_LOADING_TIME),
    );

    Promise.all([startAnalysis(products), minWait])
      .then(([result]) => {
        if (!isMountedRef.current) return;
        saveStoredCaptureProducts([]);
        navigate(`/report/${result.analysisId}`, { replace: true });
      })
      .catch((error) => {
        console.error("제품 분석 실패", error);
        if (!isMountedRef.current) return;

        if (resolveAnalysisErrorStatus(error) === "unauthorized") {
          navigate(ROUTES.LOGIN, { replace: true });
          return;
        }

        setStatus("error");
      });
  }, [products, retryCount, navigate]);

  function handleRetry() {
    setStatus("loading");
    setRetryCount((count) => count + 1);
  }

  if (!products?.length) {
    return <Navigate to={ROUTES.CAPTURE_PRODUCTS} replace />;
  }

  if (status === "error") {
    return (
      <main className={styles.page}>
        <section className={styles.content}>
          <section className={styles.messageArea}>
            <h1 className={styles.title}>분석을 마치지 못했어요</h1>
            <p className={styles.description}>잠시 후 다시 시도해주세요</p>
          </section>

          <div className={styles.errorActions}>
            <Button variant="primary" onClick={handleRetry}>
              다시 시도
            </Button>
            <Button
              variant="secondarySolid"
              onClick={() => navigate(ROUTES.CAPTURE_PRODUCTS)}
            >
              제품 목록으로
            </Button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <div className={styles.progressArea}>
          <div className={styles.progressRing} aria-label="분석 진행 중" />
        </div>

        <section className={styles.messageArea}>
          <h1 className={styles.title}>전성분을 정규화하고 있어요!</h1>
          <p className={styles.description}>
            식약처 공공데이터 원료 DB 대조 분석 중
            <span className={styles.dots} aria-hidden="true">
              ....
            </span>
          </p>
        </section>
      </section>
    </main>
  );
}