/*
  app/App.jsx
  담당: 기범 (앱 전체 조립)

  천솔 담당 P0 화면을 오늘 바로 확인할 수 있도록 최소 형태로 임시 작성.
  BottomNav.jsx 등 기범 담당 공통 레이아웃이 완성되면 이 파일에 조립한다.
*/

import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-frame">
        <div className="app-frame__content">
          <Router />
        </div>
        {/* TODO(기범): BottomNav.jsx 완성되면 여기에 배치 */}
      </div>
    </BrowserRouter>
  );
}
