import { Link } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/routes";
import defaultProfileIcon from "../../../assets/icons/profile-default.svg";
import { getHomeUser } from "../utils/homeUser";
import { resolveRoutineSlot, SLOT_LABEL } from "../utils/routineTime";
import RoutineSummary from "./RoutineSummary";
import HistorySection from "./HistorySection";
import styles from "../pages/HomePage.module.css";
import morningIcon from "../../../assets/icons/home/morning.png";
import eveningIcon from "../../../assets/icons/home/evening.png";


export default function AfterAnalysisHome( {routine }) {
    const { nickname } = getHomeUser();

    const slot = resolveRoutineSlot(routine);
    // const slot = "evening" 저녁 테스트할 땐 위에 주석
    const products = slot === "morning" ? routine.morning : routine.evening;

    return (
        <>
            <header
                className={`${styles.hero} ${
                    slot === "morning" ? styles.heroMorning: styles.heroEvening
                }`}
            >
                <div className={styles.profileRow}>
                    <Link
                        to={ROUTES.MYPAGE}
                        className={styles.profileButton}    
                        aria-label="마이페이지로 이동"
                    >
                        <img className={styles.profileDefaultIcon} src = {defaultProfileIcon} alt= ""/>
                    </Link>

                    <span className={styles.nickname}> {nickname}님 </span>
                </div>

                <p className={styles.greeting}>
                    안녕하세요.
                    <br />
                    오늘의 {SLOT_LABEL[slot]}루틴입니다
                    <img
                        className={`${styles.slotIcon} ${
                        slot === "morning" ? styles.slotIconSun : styles.slotIconMoon
                        }`}
                        src={slot === "morning" ? morningIcon : eveningIcon}
                        alt=""
                    />
                </p>
            </header>
            
            <section className={styles.routineCard}>
                <RoutineSummary products={products ?? []} />
            </section>

            <HistorySection />
        </>
    )
}