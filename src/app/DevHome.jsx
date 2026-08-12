/*
  app/DevHome.jsx
  임시 QA용 진입 화면입니다. 문서(4. 화면 매핑)에 정의된 정식 화면이 아니며,
  기범 담당 HomePage.jsx(features/home)가 완성되면 이 파일과 Router.jsx의
  '/' 라우트 연결은 제거/교체합니다.

  오늘 완성한 천솔 담당 P0 화면 3개를 mock jobId로 바로 확인할 수 있게 링크만 모아둔 페이지.
*/

import { Link } from 'react-router-dom';
import { MOCK_JOB_ID } from '../mocks/mockData';

const links = [
  { to: `/report/${MOCK_JOB_ID}`, label: '분석 리포트 (ReportPage)' },
  { to: `/routine/edit/${MOCK_JOB_ID}`, label: '루틴 수정 제안 (RoutineEditPage)' },
  { to: `/routine/preview/${MOCK_JOB_ID}`, label: '루틴 변화 미리보기 (RoutinePreviewPage)' },
];

export default function DevHome() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 18, marginBottom: 4 }}>SOTT 개발용 임시 홈</h1>
      <p style={{ fontSize: 13, color: '#6b6f76', marginBottom: 20 }}>
        천솔 담당 P0 화면(8/12) 확인용입니다. 실제 HomePage는 기범 담당입니다.
      </p>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              style={{
                display: 'block',
                padding: '12px 16px',
                borderRadius: 12,
                border: '1px solid #e5e7eb',
                background: '#fff',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
