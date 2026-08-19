import { Link } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/routes";
import defaultProfileIcon from "../../../assets/icons/profile-default.svg";
import { getHomeUser } from "../utils/homeUser";
import EmptyAnalysis from "./EmptyAnalysis";
import styles from "../pages/HomePage.module.css"

export default function BeforeAnalysisHome() {
    const { nickname, isGuest } = getHomeUser();

    return (
        <>
        <header className={styles.plainHeader}>
            <h1 className={styles.plainGreeting}>안녕하세요 {nickname}님!</h1>
            {isGuest && (
                <Link
                    to={ROUTES.MYPAGE}
                    className={styles.profileButton}
                    aria-label="마이페이지로 이동"
                >
                    <img className={styles.profileDefaultIcon} src={defaultProfileIcon} alt ="" />
                </Link>
            )}
        </header>

        <EmptyAnalysis />
        </>
    );
}