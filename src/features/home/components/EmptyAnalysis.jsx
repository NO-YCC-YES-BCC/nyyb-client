import { Link } from "react-router-dom";
import Button from "../../../shared/components/Button";
import { ROUTES } from "../../../shared/constants/routes";
import emptyMagnifierIcon from "../../../assets/icons/home/magnifier.svg";
import styles from "../pages/HomePage.module.css";

export default function EmptyAnalysis() {
  return (
    <section className={styles.emptyState}>
      <img
        className={styles.emptyMagnifierIcon}
        src={emptyMagnifierIcon}
        alt=""
      />

      <h2 className={styles.emptyTitle}>아직 분석을 진행하지 않았어요!</h2>

      <p className={styles.emptyDescription}>
        쓰고 있는 화장품을 검색하고 선택하면
        <br />
        덜어낼 수 있는 제품을 찾아드려요!
      </p>

      <Link to={ROUTES.PRODUCT} className={styles.ctaLink}>
        <Button className={styles.analyzeButton}>분석하러 가기</Button>
      </Link>
    </section>
  );
}
