/*
  app/Router.jsx
  담당: 기범 (task: "라우터 기본 연결", P0, 마감 8/12)
  comment: "모든 화면을 URL로 열 수 있게 만드는 기본 작업"

  이 파일은 원래 기범 담당입니다. 오늘은 천솔 담당 P0 화면 3개만 먼저
  라우팅에 연결해 두었고, 나머지 화면(4. 화면 매핑 표 전체)은 각 담당자가
  화면을 완성하는 대로 이 파일에 라우트를 추가하면 됩니다.

  4. 화면 매핑 기준 라우트:
  '/'                          -> 임시 DevHome (기범 HomePage 완성 전까지)
  '/report/:jobId'             -> ReportPage            (천솔, 완료)
  '/routine/edit/:jobId'       -> RoutineEditPage        (천솔, 완료)
  '/routine/preview/:jobId'    -> RoutinePreviewPage     (천솔, 완료)

  TODO(기범): /home, /capture/guide, /capture/products, /analysis/loading/:jobId,
  /login, /onboarding 등 나머지 라우트 연결
  TODO(천솔, P1 이후): /routine, /routine/morning/:routineId, /routine/evening/:routineId,
  /history, /mypage 라우트 연결
*/

import { Routes, Route } from 'react-router-dom';
import DevHome from './DevHome';
import ReportPage from '../features/report/pages/ReportPage';
import RoutineEditPage from '../features/routine/pages/RoutineEditPage';
import RoutinePreviewPage from '../features/routine/pages/RoutinePreviewPage';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<DevHome />} />
      <Route path="/report/:jobId" element={<ReportPage />} />
      <Route path="/routine/edit/:jobId" element={<RoutineEditPage />} />
      <Route path="/routine/preview/:jobId" element={<RoutinePreviewPage />} />
    </Routes>
  );
}
