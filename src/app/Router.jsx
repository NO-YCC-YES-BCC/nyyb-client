/*
  app/Router.jsx
  담당: 기범 (task: "라우터 기본 연결", P0, 마감 8/12)
  comment: "모든 화면을 URL로 열 수 있게 만드는 기본 작업"

  이 파일은 원래 기범 담당입니다. 천솔 담당 화면이 완성되는 대로 이 파일에
  라우트를 계속 추가하고 있습니다. 기범 담당 화면(홈/촬영/분석 로딩 등)은
  아직 라우트가 비어있으니, 해당 화면 완성 시 이 파일에 추가해주세요.

  4. 화면 매핑 기준 라우트 현황:
  '/'                          -> 임시 DevHome (기범 HomePage 완성 전까지)
  '/login'                     -> KakaoLoginPage         (천솔, P1 완료)
  '/report/:jobId'             -> ReportPage              (천솔, P0 완료)
  '/routine/edit/:jobId'       -> RoutineEditPage          (천솔, P0 완료)
  '/routine/preview/:jobId'    -> RoutinePreviewPage       (천솔, P0 완료)
  '/routine'                   -> RoutineMainPage          (천솔, P1 완료)
  '/routine/morning/:routineId'-> MorningRoutinePage       (천솔, P1 완료)
  '/routine/evening/:routineId'-> EveningRoutinePage       (천솔, P1 완료)
  '/history'                   -> HistoryPage              (천솔, P1 완료)
  '/mypage'                    -> MyPage                   (천솔, P1 완료)

  TODO(기범): /home, /capture/guide, /capture/products, /analysis/loading/:jobId,
  /onboarding 등 나머지 라우트 연결
*/

import { Routes, Route } from 'react-router-dom';
import DevHome from './DevHome';
import KakaoLoginPage from '../features/auth/pages/KakaoLoginPage';
import ReportPage from '../features/report/pages/ReportPage';
import HistoryPage from '../features/report/pages/HistoryPage';
import RoutineEditPage from '../features/routine/pages/RoutineEditPage';
import RoutinePreviewPage from '../features/routine/pages/RoutinePreviewPage';
import RoutineMainPage from '../features/routine/pages/RoutineMainPage';
import MorningRoutinePage from '../features/routine/pages/MorningRoutinePage';
import EveningRoutinePage from '../features/routine/pages/EveningRoutinePage';
import MyPage from '../features/mypage/pages/MyPage';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<DevHome />} />
      <Route path="/login" element={<KakaoLoginPage />} />
      <Route path="/report/:jobId" element={<ReportPage />} />
      <Route path="/routine/edit/:jobId" element={<RoutineEditPage />} />
      <Route path="/routine/preview/:jobId" element={<RoutinePreviewPage />} />
      <Route path="/routine" element={<RoutineMainPage />} />
      <Route path="/routine/morning/:routineId" element={<MorningRoutinePage />} />
      <Route path="/routine/evening/:routineId" element={<EveningRoutinePage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
}
