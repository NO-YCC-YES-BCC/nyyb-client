import { Link } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/routes";
import { useAnalysisList } from "../../report/hooks/useAnalysisList";
import styles from "./HistorySection.module.css";

export default function HistorySection() {
    const { analyses, status } = useAnalysisList({ size: 3 });

    // 홈에서는 이력이 없거나 실패해도 섹션 자체를 숨긴다 (에러 문구로 홈을 어지럽히지 않는다)
    if (status !== "success" || analyses.length === 0) return null;

    return (
        <section className={styles.section}>
        <div className={styles.head}>
            <h2 className={styles.title}>지난 분석 리포트</h2>
            <Link to={ROUTES.HISTORY} className={styles.moreLink}>
                <span className={styles.underlineText}>전체보기</span> &gt;
            </Link>
        </div>

        <ul className={styles.list}>
            {analyses.map((item) => (
            <li key={item.id} className={styles.card}>
                <Link to={`/report/${item.id}`} className={styles.cardLink}>
                <div className={styles.cardText}>
                    <p className={styles.cardTitle}>{item.title}</p>
                    <p className={styles.cardCaption}>보유 화장품 {item.productCount}개 점검</p>
                </div>

                {item.removeCount > 0 && (
                    <span className={`${styles.tag} ${styles.tagWarning}`}>
                    과잉 {item.removeCount}개 제외
                    </span>
                )}
                </Link>
            </li>
            ))}
        </ul>
        </section>
    );
}
