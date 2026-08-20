import { useState } from "react";
import { matchPath, NavLink, useLocation } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import AnalysisStartModal from "../../features/capture/components/AnalysisStartModal";
import styles from "./BottomNav.module.css";
import homeIcon from "../../assets/icons/home.svg";
import cameraIcon from "../../assets/icons/camera.svg";
import userIcon from "../../assets/icons/my.svg";

// 온보딩, 로그인, 촬영 플로우에서는 하단 네비를 숨긴다.
const HIDDEN_NAV_PATHS = [
    ROUTES.ENTRY,
    ROUTES.ONBOARDING,
    ROUTES.LOGIN,
    ROUTES.CAPTURE,
    ROUTES.CAPTURE_PRODUCTS,
    ROUTES.ANALYSIS_LOADING,
    ROUTES.NOT_FOUND,
];


const NAV_ITEMS = [
    { id: "home", label: "홈", path: ROUTES.HOME, icon: homeIcon, showLabel: true, type: "home" },
    { id: "capture", label: "촬영", icon: cameraIcon, primary: true, showLabel: false },
    { id: "my", label: "마이", path: ROUTES.MYPAGE, icon: userIcon, showLabel: true, type: "my" },
];


export default function BottomNav() {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const shouldHide = HIDDEN_NAV_PATHS.some((path) =>
        matchPath({ path, end: true }, location.pathname)
    );

    if (shouldHide) return null;

    return (
        <>
            <nav className={styles.bottomNav} aria-label="하단 네비게이션">
                {NAV_ITEMS.map((item) => {
                    const inner = (
                        <>
                            <span className={styles.icon}>
                                <img className={styles.iconImage} src={item.icon} alt="" />
                            </span>

                            {item.showLabel && <span className={styles.label}>{item.label}</span>}
                        </>
                    );

                    // path 가 없는 항목(촬영)은 모달을 여는 버튼이다.
                    if (!item.path) {
                        return (
                            <button
                                key={item.id}
                                type="button"
                                aria-label={item.label}
                                className={`${styles.navItem} ${styles.primaryItem} ${styles.navButton}`}
                                onClick={() => setIsModalOpen(true)}
                            >
                                {inner}
                            </button>
                        );
                    }

                    return (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            aria-label={item.label}
                            className={({ isActive }) =>
                                [
                                    styles.navItem,
                                    item.type === "home" ? styles.homeItem : "",
                                    isActive ? styles.active : "",
                                ].join(" ")
                            }
                        >
                            {inner}
                        </NavLink>
                    );
                })}
            </nav>

            <AnalysisStartModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
