# SOTT 프론트엔드 — 천솔 담당 구현 (P0 8/12 + P1 8/15)

프론트 개발 문서(1~13번) 및 "11. 작업현황판 초기 데이터" 표를 기준으로,
**담당자 = 천솔** 인 항목을 우선순위 순서대로 구현한 결과물입니다.
어제(P0, 8/12) 화면 위에 오늘(P1, 8/15) 화면을 이어서 추가했습니다.

> **CSS 전략**: **CSS Modules**(`*.module.css`)를 사용합니다. 컴포넌트/페이지 파일 옆에
> 같은 이름의 `*.module.css`를 두고 `import styles from './X.module.css'`로 불러와
> `styles.xxx` 형태로 클래스명을 씁니다. 전역 리셋/디자인 토큰은 `shared/styles/global.css`
> 한 곳에서 관리하고 `main.jsx`에서 한 번만 import합니다.

## 1. 오늘(P1, 8/15) 구현한 작업현황판 항목

| task | page/component | 구현 파일 |
| --- | --- | --- |
| 카카오 로그인 화면 구현 | KakaoLoginPage | `src/features/auth/pages/KakaoLoginPage.jsx` + `src/features/auth/api/authApi.js` |
| 루틴 카드 메인 구현 | RoutineMainPage | `src/features/routine/pages/RoutineMainPage.jsx` + `src/features/routine/components/RoutineCompareCard.jsx` |
| 아침 루틴 상세 UI 구현 | MorningRoutinePage | `src/features/routine/pages/MorningRoutinePage.jsx` |
| 저녁 루틴 상세 UI 구현 | EveningRoutinePage | `src/features/routine/pages/EveningRoutinePage.jsx` |
| 분석 이력 리스트 UI 구현 | HistoryPage | `src/features/report/pages/HistoryPage.jsx` |
| 마이페이지 프로필 UI 구현 | MyPage, ProfileSummary | `src/features/mypage/pages/MyPage.jsx` + `src/features/mypage/components/ProfileSummary.jsx` |

- 아침/저녁 루틴 상세는 API·카드·레이아웃이 100% 동일해서(시간대 텍스트/데이터만 다름)
  중복을 피하려고 `src/features/routine/pages/RoutineTimeDetailPage.jsx`(공용, 라우트 없음)에
  실제 렌더링을 모아두고, `MorningRoutinePage.jsx`/`EveningRoutinePage.jsx`는 `timeSlot`만
  다르게 넘기는 얇은 래퍼로 만들었습니다. 문서 4번 화면 매핑에 있는 두 파일은 그대로 존재합니다.
- **P2라 오늘 범위에서 제외한 것**: "카카오톡 수신 토글 구현" → `MyPage`에 토글 UI는
  배치해뒀지만 `disabled` + "준비중" 힌트로만 표시했습니다 (`SettingItem.jsx`).

## 2. 어제(P0, 8/12) 구현한 작업현황판 항목 (참고용)

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

## 3. 폴더 구조 (문서 3번 최종 폴더 구조 기준)

```
src/
├─ app/
│  ├─ App.jsx                 # 기범 담당(임시 스캐폴딩) — BrowserRouter + Router 조립
│  ├─ Router.jsx               # 기범 담당(임시 스캐폴딩) — 천솔 완료 화면 전부 연결
│  └─ DevHome.jsx               # 임시 QA용 진입 화면 (문서에 없는 파일, 나중에 제거)
│
├─ features/
│  ├─ auth/
│  │  ├─ pages/KakaoLoginPage.jsx
│  │  └─ api/authApi.js
│  ├─ report/
│  │  ├─ pages/ReportPage.jsx
│  │  ├─ pages/HistoryPage.jsx
│  │  ├─ components/RemoveProductCard.jsx
│  │  ├─ components/KeepProductCard.jsx
│  │  ├─ components/IngredientWarningCard.jsx
│  │  └─ api/reportApi.js
│  ├─ routine/
│  │  ├─ pages/RoutineEditPage.jsx
│  │  ├─ pages/RoutinePreviewPage.jsx
│  │  ├─ pages/RoutineMainPage.jsx
│  │  ├─ pages/MorningRoutinePage.jsx
│  │  ├─ pages/EveningRoutinePage.jsx
│  │  ├─ pages/RoutineTimeDetailPage.jsx   # Morning/Evening 공용 내부 컴포넌트(라우트 없음)
│  │  ├─ components/RoutineProductCard.jsx
│  │  ├─ components/RoutineCompareCard.jsx
│  │  └─ api/routineApi.js
│  ├─ mypage/
│  │  ├─ pages/MyPage.jsx
│  │  ├─ components/ProfileSummary.jsx
│  │  ├─ components/SettingItem.jsx
│  │  └─ api/profileApi.js
│  ├─ onboarding/ home/ capture/ analysis/   # 각 담당자용 빈 폴더 + README만 배치
│
├─ shared/
│  ├─ api/client.js              # 공통 axios 인스턴스 + 로그인 토큰 인터셉터 (오늘부터 연결)
│  ├─ components/Card.jsx, Badge.jsx
│  ├─ constants/badge.js
│  ├─ styles/global.css          # 기범 담당(임시 최소 프레임만 작성)
│  └─ utils/format.js, authStorage.js
│
├─ mocks/mockData.js
└─ main.jsx
```

## 4. 실행 방법

이 작업 환경에는 npm 레지스트리 접근이 막혀 있어 `npm install`을 직접 실행해보지
못했습니다. 로컬(또는 팀 개발 환경)에서 아래 순서로 실행해주세요.

```bash
npm install
npm run dev
```

브라우저에서 `/`로 접속하면 임시 DevHome에서 P0/P1로 나뉘어 오늘까지 완성한
모든 화면으로 바로 이동할 수 있습니다.

## 5. 코드 검증 관련 안내

`npm install`을 못 돌리는 환경이라 `vite build`로 최종 검증은 못했고, 대신
`esbuild`로 모든 `.jsx`/`.js` 파일의 문법 오류 여부와 import 경로(모듈 해석)를
번들링까지 돌려서 확인했습니다 (에러/경고 없음). 다만 실제 `npm install` 후
`npm run dev` / `npm run build`로 한 번 더 확인해보시는 걸 권장드립니다.

## 6. API 연결 관련 (13번 섹션 참고)

각 feature의 `api/*.js`는 실제 API 호출을 시도하고, 실패하면 자동으로
`mocks/mockData.js`로 대체(fallback)합니다. 오늘 추가된 API 호출:

- `authApi.loginWithKakao` → `POST /auth/kakao` (payload가 code인지 token인지 미확정 — 13번 참고)
- `routineApi.getRoutineMain` → `GET /routines`
- `routineApi.getRoutineDetail` → `GET /routines/{routineId}`
- `reportApi.getAnalysisHistory` → `GET /analyses/list`
- `profileApi.getProfile` → `GET /profile`

또한 `shared/api/client.js`에 로그인 토큰 자동 첨부 interceptor를 연결했습니다
(`shared/utils/authStorage.js`에서 `localStorage` 기반으로 토큰을 저장/조회합니다).
로그인 성공 시(`KakaoLoginPage`) 토큰을 저장하고, 이후 모든 API 요청에 자동으로
`Authorization` 헤더가 붙습니다.

## 7. 와이어프레임 기반 CSS 재작업 (하단 네비 바 제외)

전달받은 Figma 와이어프레임 스크린샷(카카오 로그인, 온보딩, 로딩, 루틴 카드,
아침/저녁 루틴, 첫진입, 메인 홈, 촬영 가이드/목록, 분석 이력, 분석 리포트,
마이페이지)을 기준으로 P0+P1 화면 전체의 CSS를 다시 맞췄습니다.
**하단 네비게이션 바는 요청대로 이번 작업 범위에서 제외**했습니다
(`BottomNav.jsx`가 아직 없는 파일이라 별도 담당자 작업으로 남겨둠).

- **디자인 토큰 재정비** (`shared/styles/global.css`): 와이어프레임에서 눈대중으로
  뽑은 웜톤 아이보리 배경(`--color-bg`), 세이지 그린 브랜드 컬러, 코랄(제외)/그린(유지)/
  앰버(주의)/그레이(이력) 상태 컬러, 카드 그림자(`--shadow-card`), radius 토큰을
  전부 CSS 변수로 통일했습니다. 이번 패스에서 `--color-thumb-default`를 추가해
  `Thumb`의 기본 톤도 하드코딩 없이 변수로 관리하도록 정리했습니다.
- **신규 공통 컴포넌트 `Thumb`** (`shared/components/Thumb.jsx`): 와이어프레임의
  정사각형 제품 썸네일(현재는 실제 이미지 대신 브랜드/이름 첫 글자 placeholder)을
  재현. `tone`(default/remove/keep/caution/history)과 `size`(sm/md/lg)로 카드/리스트
  어디서나 재사용합니다.
- **리스트형 카드 레이아웃으로 전환**: 제외/유지 제품 카드, 루틴 제품 카드, 분석
  이력 항목을 와이어프레임처럼 좌측 썸네일 + 우측 텍스트 블록의 가로 리스트 구조로
  재구성했습니다 (`ProductCard.module.css`, `HistoryPage`, `RoutineProductCard`).
- **루틴 비교 카드 재구성** (`RoutineCompareCard.jsx`): 점수(예: 66점) + "겹치는 성분/
  제외 제안" 배지 + 오전/오후 루틴 아이콘 행으로 와이어프레임 레이아웃에 맞춰 새로
  작성했습니다. `mockData.js`의 `mockSavedRoutine`에 `score`/`overlapIngredientCount`/
  `excludeSuggestionCount` 필드를 추가했습니다.
- **기타 세부 조정**: 카카오 로그인 화면 상단 로고를 텍스트 뱃지(`.logoMark`)로,
  성분 상세보기 버튼을 박스형에서 밑줄 텍스트 링크로, 마이페이지 통계 3칸을 각각
  개별 박스로, 분석 리포트 상단 요약을 코랄 톤 콜아웃 카드로 변경했습니다.
- **검증**: `Thumb.module.css`의 하드코딩 색상(`#cfcabb`)을 토큰으로 옮긴 것 외에
  나머지 하드코딩 색상(버튼/토글 노브의 `#ffffff`, 그림자·태그용 `rgba(...)`)은
  의도된 값이라 그대로 두었습니다. 전체 `.jsx`/`.js` 문법 검사 및 `main.jsx` 기준
  번들/모듈 해석 검사(`esbuild`)를 다시 돌려 에러 없음을 확인했습니다.

## 8. 기범 담당자와 협의가 필요한 부분

- `Router.jsx`, `global.css`, `App.jsx`는 기범 담당 파일이라 오늘도 데모 확인용으로만
  갱신해뒀습니다. 기범 작업 시작 시 덮어써도 무방합니다 (Git 작업 규칙 12번 참고:
  이 파일들은 수정 전 서로 말하고 수정).
- `DevHome.jsx`, `/` 라우트는 문서에 없는 임시 파일이니 실제 `HomePage.jsx` 연결 후 제거해주세요.
