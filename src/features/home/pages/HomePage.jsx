import { Link } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/routes";
import defaultProfileIcon from "../../../assets/icons/profile-default.svg";
import EmptyAnalysis from "../components/EmptyAnalysis";
import styles from "./HomePage.module.css";
import { getUser } from "../../../shared/utils/tokenStorage"

export default function HomePage() {

  const user = getUser();
  const nickname = user?.guest ? "게스트" : user?.nickname ?? "게스트";
  const isGuest = user?.guest !== false;

  return (
    <main className={`page ${styles.page}`}>
      <header className={styles.header}>
        <h1 className={styles.greeting}>
          안녕하세요 {nickname}님!
        </h1>

        {!isGuest && (
          <Link
            to={ROUTES.MYPAGE}
            className={styles.profileButton}
            aria-label="마이페이지로 이동"
          >
            <img
              className={styles.profileDefaultIcon}
              src={defaultProfileIcon}
              alt=""
            />
          </Link>
        )}
      </header>

      <EmptyAnalysis />
    </main>
  );
}