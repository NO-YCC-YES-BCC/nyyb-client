import { matchPath, NavLink, useLocation } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import styles from "./BottomNav.module.css";
import homeIcon from "../../assets/icons/home.svg"
import cameraIcon from "../../assets/icons/camera.svg"
import userIcon from "../../assets/icons/my.svg"

// 온보딩, 로그인, 촬영 플로우에서는 하단 네비를 숨긴다.
const HIDDEN_NAV_PATHS = [
    ROUTES.ENTRY,
    ROUTES.ONBOARDING,
    ROUTES.LOGIN,
    ROUTES.CAPTURE,
    ROUTES.CAPTURE_PRODUCTS,
    ROUTES.ANALYSIS_LOADING,
];


const NAV_ITEMS = [
    { label: "홈", path: ROUTES.HOME, icon: homeIcon, showLabel: true, type: "home"},
    { label: "촬영", path: ROUTES.CAPTURE, icon: cameraIcon, primary: true,showLabel: false,},
    { label:"마이", path:ROUTES.MYPAGE, icon:userIcon, showLabel: true, type: "my" },
];

export default function BottomNav() {
    const location = useLocation();

    const shouldHide = HIDDEN_NAV_PATHS.some((path) =>
    matchPath({ path, end:true }, location.pathname)
    );

    if(shouldHide) return null;

    return(
        <nav className={styles.bottomNav} aria-label="하단 네비게이션">
            {NAV_ITEMS.map((item) => (
            <NavLink
                key={item.path}
                to={item.path}
                aria-label={item.label}
                className={({ isActive }) =>
                [
                    styles.navItem,
                    item.primary ? styles.primaryItem: "",
                    item.type === "home" ? styles.homeItem : "",
                    isActive ? styles.active: "",
                ].join(" ")
                }
            >
                <span className={styles.icon}>
                    <img className={styles.iconImage} src={item.icon} alt="" />
                </span>
                
                {item.showLabel && (
                    <span className={styles.label}>{item.label}</span>
                )}
            </NavLink>
        ))}
        </nav>
    );
}