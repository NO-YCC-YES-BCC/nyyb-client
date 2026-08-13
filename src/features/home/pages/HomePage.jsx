import { Link } from "react-router-dom";
import { mockUser } from "../../../mocks/mockData";
import { ROUTES } from "../../../shared/constants/routes";
import defaultProfileIcon from "../../../assets/icons/profile-default.svg";
import EmptyAnalysis from "../components/EmptyAnalysis";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <main className={`page ${styles.page}`}>
      <header className={styles.header}>
        <h1 className={styles.greeting}>
          안녕하세요 {mockUser.nickname}님!
        </h1>

        <Link
          to={ROUTES.MYPAGE}
          className={styles.profileButton}
          aria-label="마이페이지로 이동"
        >
          {mockUser.profileImageUrl ? (
            <img
              className={styles.profileImage}
              src={mockUser.profileImageUrl}
              alt=""
            />
          ) : (
            <img
              className={styles.profileDefaultIcon}
              src={defaultProfileIcon}
              alt=""
            />
          )}
        </Link>
      </header>

      {mockUser.hasAnalysis ? (
        <p>분석 후 홈은 다음 작업에서 구현</p>
      ) : (
        <EmptyAnalysis />
      )}
    </main>
  );
}