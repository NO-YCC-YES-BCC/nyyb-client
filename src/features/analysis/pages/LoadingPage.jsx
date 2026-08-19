import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getStoredAnalysisResult } from "../api/analysisApi";
import styles from "./LoadingPage.module.css";

const MIN_LOADING_TIME = 3000;

export default function LoadingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const analysisResult =
    location.state?.analysisResult ?? getStoredAnalysisResult();

  const productCount = analysisResult?.products?.length ?? 5;
  const progress = 60;

  useEffect(() => {
    if (!analysisResult) return;

    const timer = setTimeout(() => {
      navigate("/report/result", {
        state: { analysisResult },
      });
    }, MIN_LOADING_TIME);

    return () => clearTimeout(timer);
  }, [analysisResult, navigate]);

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <div className={styles.progressArea}>
          <div
            className={styles.progressRing}
            aria-label={`분석 진행률 ${progress}%`}
          >
            <span className={styles.progressValue}>{progress}%</span>
          </div>

          <p className={styles.progressText}>
            제품 {productCount}개 분석 진행중 ({progress}%)
            <br />
            잠시만 기다려주세요
          </p>
        </div>

        <section className={styles.messageArea}>
          <h1 className={styles.title}>성분을 분석하고 있어요!</h1>
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