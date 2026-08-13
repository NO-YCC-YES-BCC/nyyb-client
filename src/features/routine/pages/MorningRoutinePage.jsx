/*
  features/routine/pages/MorningRoutinePage.jsx
  라우트: /routine/morning/:routineId (4. 화면 매핑 기준)
  담당: 천솔
  작업현황판 task: "아침 루틴 상세 UI 구현" (P1, 마감 8/15, API: /routines/{routineId})
  comment: "아침 루틴 전체 보기"

  실제 렌더링은 RoutineTimeDetailPage(공용) 참고.
*/

import RoutineTimeDetailPage from './RoutineTimeDetailPage';

export default function MorningRoutinePage() {
  return <RoutineTimeDetailPage timeSlot="morning" />;
}
