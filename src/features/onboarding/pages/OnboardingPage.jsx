import { useInView } from "../../../shared/hooks/useInView";
import infoIcon from "../../../assets/icons/onboarding/info-fill.svg";
import checkIcon from "../../../assets/icons/onboarding/check-fill.svg";
import arrowRightIcon from "../../../assets/icons/onboarding/arrow-drop-right.svg";
import arrowUpIcon from "../../../assets/icons/onboarding/arrow-up.svg";
import serumImage from "../../../assets/images/onboarding/serum.png";
import tonerImage from "../../../assets/images/onboarding/toner.png";
import ellipseIcon from "../../../assets/icons/onboarding/ellipse.svg";
import styles from "./OnboardingPage.module.css";
import { useRef } from "react";

export default function OnboardingPage() {
  const [point1Ref, point1InView] = useInView();
  const [point2Ref, point2InView] = useInView();
  const [point3Ref, point3InView] = useInView();

  const pageRef = useRef(null);

  function scrollToTop() {
  pageRef.current?.scrollTo({ top: 0, behavior: "smooth" });
}

  return (
    <main ref={pageRef} className={styles.page}>
      <section
        ref={point1Ref}
        className={`${styles.section} ${styles.section1} ${
          point1InView ? styles.inView : ""
        }`}
      >
        <span className={styles.pointBadge}>POINT 1</span>

        <h1 className={styles.title}>
          “겹치는 게 있으려나”
          <br />
          고민 했는데
          <br />
          생각보다 훨씬 많아요
        </h1>

        <p className={styles.description}>
          전성분을 대조해 보면
          <br />
          체감보다 겹친 성분이 더 많이 나와요
        </p>

        <article className={styles.statCard}>
          <p className={styles.statCaption}>
            상위 화장품 10개 중 6개는 제품명과 실제 주성분이 다릅니다.
          </p>
          <div className={styles.highlightWrap}>
            <img className={styles.highlightGlow} src={ellipseIcon} alt="" />
            <strong className={styles.statHighlight}>6개 (60%)</strong>
          </div>
          <p className={styles.statDescription}>
            마케팅용 제품명에 표기된 메인 성분이
            <br />
            실제 전성분에서는 극소량만 포함되어 있어요.
          </p>

          <div className={styles.statDivider} />

          <p className={styles.statFootnote}>
            *올리브영 스킨케어 상위 10개 제품 식약처 전성분 DB 대조 분석
          </p>
        </article>
      </section>

      <section
        ref={point2Ref}
        className={`${styles.section} ${styles.section2} ${
          point2InView ? styles.inView : ""
        }`}
      >
        <span className={styles.pointBadge}>POINT 2</span>

        <h1 className={styles.title}>
          추천 대신,
          <br />
          판정을 보여드려요
        </h1>

        <p className={styles.description}>
          겹치는 여러 제품 중에서
          <br />
          무엇을 선택할지 근거를 설명해요
        </p>

        <article className={styles.judgementCard}>
          <div className={`${styles.judgementBar} ${styles.removeBar}`}>
            <img src={infoIcon} alt="" />
            <strong>제외 제한</strong>
          </div>

          <div className={styles.productRow}>
            <div className={styles.productImageBox}>
              <img src={serumImage} alt="" />
            </div>

            <div className={styles.productInfo}>
              <strong>나이아신아마이드 세럼</strong>
              <span className={styles.removeTag}>계산 결과 중복 87%</span>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={`${styles.judgementBar} ${styles.keepBar}`}>
            <img src={checkIcon} alt="" />
            <strong>유지해도 돼요</strong>
          </div>

          <div className={styles.productRow}>
            <div className={styles.productImageBox}>
              <img src={tonerImage} alt="" />
            </div>

            <div className={styles.productInfo}>
              <strong>약산성 토너</strong>
              <span className={styles.keepTag}>규제 근거 배합한도 내</span>
            </div>
          </div>
        </article>
      </section>

      <section
        ref={point3Ref}
        className={`${styles.section} ${styles.section3} ${
          point3InView ? styles.inView : ""
        }`}
      >
        <span className={styles.pointBadge}>POINT 3</span>

        <h1 className={styles.title}>
          추천템 대신
          <br />
          정리된 루틴 카드를 제안해요
        </h1>

        <p className={styles.description}>
          쇼핑몰은 연결되지 않아요
          <br />
          결론은 언제나 ‘축소’예요
        </p>

        <article className={styles.routineCard}>
          <div className={styles.noticePill}>
            <img src={infoIcon} alt="" />
            <strong>이 리포트엔 구매 링크가 없어요</strong>
          </div>

          <div className={styles.routineDivider} />

          <div className={styles.routineCompare}>
            <div className={styles.routineItem}>
              <span>아침 루틴</span>
              <strong>5개</strong>
            </div>

            <img className={styles.arrowRight} src={arrowRightIcon} alt="" />

            <div className={styles.routineItem}>
              <span>아침 루틴</span>
              <strong className={styles.routineStrong}>
                <img className={styles.routineGlow} src={ellipseIcon} alt="" />
                <span className={styles.routineStrongText}>3개 제안</span>
              </strong>
            </div>
          </div>

          <div className={styles.routineDivider} />

          <div className={styles.routineCompare}>
            <div className={styles.routineItem}>
              <span>저녁 루틴</span>
              <strong>7개</strong>
            </div>

            <img className={styles.arrowRight} src={arrowRightIcon} alt="" />

            <div className={styles.routineItem}>
              <span>저녁 루틴</span>
              <strong className={styles.routineStrong}>
                <img className={styles.routineGlow} src={ellipseIcon} alt="" />
                <span className={styles.routineStrongText}>5개 제안</span>
              </strong>
            </div>
          </div>

          <div className={styles.routineDivider} />
        </article>

        <button
          type="button"
          className={styles.scrollTopButton}
          onClick={scrollToTop}
          aria-label="맨 위로 이동"
        >
          <img src={arrowUpIcon} alt="" />
        </button>
      </section>
    </main>
  );
}