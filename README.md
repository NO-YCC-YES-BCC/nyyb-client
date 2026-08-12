# SOTT 프론트엔드 — 천솔 담당 P0 구현 (8/12)

프론트 개발 문서(1~13번) 및 "11. 작업현황판 초기 데이터" 표를 기준으로,
**담당자 = 천솔, 우선순위 = P0** 인 항목만 오늘 먼저 구현한 결과물입니다.

## 1. 오늘 구현한 작업현황판 항목 (담당자: 천솔, 우선순위: P0)

| task | page/component | 구현 파일 |
| --- | --- | --- |
| 공통 카드 구현 | Card.jsx | `src/shared/components/Card.jsx` |
| 공통 배지 구현 | Badge.jsx | `src/shared/components/Badge.jsx` |
| mockData 구조 작성 | mockData.js | `src/mocks/mockData.js` |
| 분석 리포트 상단 요약 구현 | ReportPage | `src/features/report/pages/ReportPage.jsx` |
| 제외 권장 제품 카드 구현 | RemoveProductCard | `src/features/report/components/RemoveProductCard.jsx` |
| 유지 제품 리스트 구현 | KeepProductCard | `src/features/report/components/KeepProductCard.jsx` |
| 주의 성분 카드 구현 | IngredientWarningCard | `src/features/report/components/IngredientWarningCard.jsx` |
| 루틴 수정 제안 UI 구현 | RoutineEditPage | `src/features/routine/pages/RoutineEditPage.jsx` |
| 루틴 제품 카드 구현 | RoutineProductCard | `src/features/routine/components/RoutineProductCard.jsx` |
| 루틴 변화 미리보기 UI 구현 | RoutinePreviewPage | `src/features/routine/pages/RoutinePreviewPage.jsx` |
| 루틴 저장 버튼 연결 | RoutinePreviewPage (저장 버튼) | `src/features/routine/pages/RoutinePreviewPage.jsx` + `src/features/routine/api/routineApi.js` |

같은 표에서 **천솔 담당이지만 오늘 범위가 아닌 항목**(참고용):
- P1: 카카오 로그인 화면, 루틴 카드 메인, 아침/저녁 루틴 상세, 분석 이력 리스트, 마이페이지 프로필 UI
- P2: 성분 상세 보기 연결, 카카오톡 수신 토글 → `IngredientWarningCard.jsx`에 "성분 상세보기(준비중)" 버튼만 비활성 상태로 미리 배치해뒀습니다.

## 2. 폴더 구조 (문서 3번 최종 폴더 구조 기준)

```
src/
├─ app/
│  ├─ App.jsx           # 기범 담당(임시 스캐폴딩) — BrowserRouter + Router 조립
│  ├─ Router.jsx         # 기범 담당(임시 스캐폴딩) — 천솔 P0 화면 3개만 우선 연결
│  └─ DevHome.jsx        # 임시 QA용 진입 화면 (문서에 없는 파일, 나중에 제거)
│
├─ features/
│  ├─ report/
│  │  ├─ pages/ReportPage.jsx
│  │  ├─ components/RemoveProductCard.jsx
│  │  ├─ components/KeepProductCard.jsx
│  │  ├─ components/IngredientWarningCard.jsx
│  │  └─ api/reportApi.js
│  ├─ routine/
│  │  ├─ pages/RoutineEditPage.jsx
│  │  ├─ pages/RoutinePreviewPage.jsx
│  │  ├─ components/RoutineProductCard.jsx
│  │  └─ api/routineApi.js
│  ├─ onboarding/ auth/ home/ capture/ analysis/ mypage/   # 각 담당자용 빈 폴더 + README만 배치
│
├─ shared/
│  ├─ api/client.js              # 공통 axios 인스턴스 (기범/천솔 공용)
│  ├─ components/Card.jsx, Badge.jsx
│  ├─ constants/badge.js
│  ├─ styles/global.css          # 기범 담당(임시 최소 프레임만 작성)
│  └─ utils/format.js
│
├─ mocks/mockData.js
└─ main.jsx
```

## 3. 실행 방법

이 작업 환경에는 npm 레지스트리 접근이 막혀 있어 `npm install`을 직접 실행해보지
못했습니다. 로컬(또는 팀 개발 환경)에서 아래 순서로 실행해주세요.

```bash
npm install
npm run dev
```

브라우저에서 `/`로 접속하면 임시 DevHome에서 아래 3개 화면으로 바로 이동할 수 있습니다.

- `/report/demo-job-001` — 분석 리포트
- `/routine/edit/demo-job-001` — 루틴 수정 제안
- `/routine/preview/demo-job-001` — 루틴 변화 미리보기 + 저장

## 4. 코드 검증 관련 안내

`npm install`을 못 돌리는 환경이라 `vite build`로 최종 검증은 못했고, 대신
`esbuild`로 모든 `.jsx`/`.js` 파일의 문법 오류 여부와 import 경로(모듈 해석)를
번들링까지 돌려서 확인했습니다 (에러/경고 없음). 다만 실제 `npm install` 후
`npm run dev` / `npm run build`로 한 번 더 확인해보시는 걸 권장드립니다.

## 5. API 연결 관련 (13번 섹션 참고)

`reportApi.js`, `routineApi.js`는 실제 API(`/report/{jobId}`, `/routines/preview`,
`/routines`) 호출을 시도하고, 실패하면 자동으로 `mocks/mockData.js`로 대체(fallback)하도록
만들어 뒀습니다. 따라서 백엔드가 아직 없어도 화면이 그대로 동작하고, 나중에 baseURL과
엔드포인트가 확정되면 `shared/api/client.js`의 `baseURL`(`VITE_API_BASE_URL`)만 채워주면
됩니다.

## 6. 기범 담당자와 협의가 필요한 부분

- `Router.jsx`, `global.css`, `App.jsx`는 기범 담당 파일이라 오늘은 데모 확인용으로
  최소한만 채워뒀습니다. 기범 작업 시작 시 덮어써도 무방합니다 (Git 작업 규칙 12번 참고:
  이 파일들은 수정 전 서로 말하고 수정).
- `DevHome.jsx`, `/` 라우트는 문서에 없는 임시 파일이니 실제 `HomePage.jsx` 연결 후 제거해주세요.
