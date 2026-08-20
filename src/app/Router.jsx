import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../shared/constants/routes";

import EntryPage from "../features/onboarding/pages/EntryPage"
import OnboardingPage from "../features/onboarding/pages/OnboardingPage"
import KaKaoLoginPage from "../features/auth/pages/KaKaoLoginPage"
import HomePage from "../features/home/pages/HomePage"
import CaptureGuidePage from "../features/capture/pages/CaptureGuidePage"
import ProductListPage from "../features/capture/pages/ProductListPage"
import LoadingPage from "../features/analysis/pages/LoadingPage"
import ReportPage from "../features/report/pages/ReportPage"
import RoutineMainPage from "../features/routine/pages/RoutineMainPage"
import MorningRoutinePage from "../features/routine/pages/MorningRoutinePage"
import EveningRoutinePage from "../features/routine/pages/EveningRoutinePage"
import HistoryPage from "../features/report/pages/HistoryPage"
import MyPage from "../features/mypage/pages/MyPage"
import BottomNav from "../shared/components/BottomNav";
import PurchaseComparePage from "../features/purchase/pages/PurchaseComparePage";
import PurchaseResultPage from "../features/purchase/pages/PurchaseResultPage";
import NotFoundPage from "../features/not-found/pages/NotFoundPage"
import KakaoCallbackPage from "../features/auth/pages/KaKaoCallbackPage";

function AppRoutes() {
    const location = useLocation();

    // 이전 페이지의 스크롤 위치가 새 페이지에 남지 않게 맨 위로 되돌린다.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        // pathname 을 key 로 걸어 페이지가 바뀔 때마다 페이드 인 애니메이션을 다시 실행한다.
        <div key={location.pathname} className="route-transition">
            <Routes location={location}>
                <Route path={ROUTES.ENTRY} element={<EntryPage/>} />
                <Route path={ROUTES.ONBOARDING} element={<OnboardingPage />} />
                <Route path={ROUTES.LOGIN} element={<KaKaoLoginPage/>} />
                <Route path={ROUTES.KAKAO_CALLBACK} element={<KakaoCallbackPage />} />
                <Route path={ROUTES.HOME} element={<HomePage/>} />
                <Route path={ROUTES.CAPTURE} element={<CaptureGuidePage />} />
                <Route path={ROUTES.CAPTURE_PRODUCTS} element={<ProductListPage />} />
                <Route path={ROUTES.ANALYSIS_LOADING} element={<LoadingPage />} />
                <Route path={ROUTES.REPORT} element={<ReportPage />} />
                <Route path={ROUTES.ROUTINE} element={<RoutineMainPage />} />
                <Route path={ROUTES.ROUTINE_MORNING} element={<MorningRoutinePage />} />
                <Route path={ROUTES.ROUTINE_MORNING_DETAIL} element={<MorningRoutinePage />} />
                <Route path={ROUTES.ROUTINE_EVENING} element={<EveningRoutinePage />} />
                <Route path={ROUTES.ROUTINE_EVENING_DETAIL} element={<EveningRoutinePage />} />
                <Route path={ROUTES.HISTORY} element={<HistoryPage />} />
                <Route path={ROUTES.MYPAGE} element={<MyPage />} />
                <Route path={ROUTES.PURCHASE_COMPARE} element={<PurchaseComparePage />} />
                <Route path={ROUTES.PURCHASE_RESULT} element={<PurchaseResultPage />} />

                <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage/>} />
                <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
            </Routes>
        </div>
    );
}

export default function AppRouter() {
    return(
        <BrowserRouter>
            <AppRoutes />
            <BottomNav/>
        </BrowserRouter>
    );
}
