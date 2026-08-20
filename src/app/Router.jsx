import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import NotFoundPage from "../features/not-found/pages/NotFoundPage"
import KakaoCallbackPage from "../features/auth/pages/KaKaoCallbackPage";

export default function AppRouter() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.ENTRY} element={<EntryPage/>} />
                <Route path={ROUTES.ONBOARDING} element={<OnboardingPage />} />
                <Route path={ROUTES.LOGIN} element={<KaKaoLoginPage/>} />
                <Route path={ROUTES.KAKAO_CALLBACK} element={<KakaoCallbackPage />}/>
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

                <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage/>} />
                <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />

                
            </Routes>
            <BottomNav/>
        </BrowserRouter>
    );
}

