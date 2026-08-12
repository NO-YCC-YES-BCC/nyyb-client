# nyyb-client

nyyb 서비스의 프론트엔드 입니다.

---

## 기술 스택

| 구분 | 내용 |
|---|---|
| Language | JavaScript |
| Framework | React |
| Build Tool | Vite |
| Package Manager | npm |
| API Client | Axios |
| Routing | React Router |
| Lint | ESLint |

---

## 요구사항

프로젝트를 실행하기 전에 아래 프로그램이 설치되어 있어야 합니다.

- Node.js 20 이상
- npm

Node.js를 설치하면 npm은 함께 설치됩니다.

설치 여부는 아래 명령어로 확인할 수 있습니다.

```bash
node -v
npm -v
```

---

## 실행 방법

### 1. 프로젝트 클론

GitHub에서 프로젝트를 내려받습니다.

```bash
git clone <repository-url>
cd nyyb-client
```

GitHub Desktop을 사용하는 경우 clone 후 해당 폴더를 VS Code로 열면 됩니다.

---

### 2. 패키지 설치

프로젝트 실행에 필요한 라이브러리를 설치합니다.

```bash
npm install
```

`npm install`은 `package.json`에 적힌 라이브러리 목록을 읽고, 필요한 패키지들을 `node_modules` 폴더에 설치합니다.

`node_modules` 폴더는 용량이 크기 때문에 Git에 올리지 않습니다.

따라서 프로젝트를 처음 clone한 사람은 반드시 `npm install`을 실행해야 합니다.

---

### 3. 환경변수 설정

프로젝트 최상단에 `.env` 파일을 생성합니다.

```bash
cp .env.example .env
```

`.env` 파일에는 로컬 개발 환경에서 사용할 설정값을 작성합니다.

```env
VITE_API_BASE_URL=http://localhost:8080
```

`VITE_API_BASE_URL`은 프론트엔드에서 요청을 보낼 백엔드 API 서버 주소입니다.

예를 들어 백엔드 서버가 로컬에서 `8080` 포트로 실행 중이라면 아래와 같이 설정합니다.

```env
VITE_API_BASE_URL=http://localhost:8080
```

`.env` 파일은 개인 로컬 설정 파일이므로 Git에 커밋하지 않습니다.

필요한 환경변수 목록은 `.env.example` 파일에만 작성합니다.

---

### 4. 개발 서버 실행

아래 명령어로 프론트엔드 개발 서버를 실행합니다.

```bash
npm run dev
```

실행 후 터미널에 표시되는 주소로 접속합니다.

예시:

```txt
http://localhost:5173
```

---

## 주요 명령어

| 명령어 | 설명 |
|---|---|
| `npm install` | 프로젝트에 필요한 라이브러리를 설치합니다. |
| `npm run dev` | 개발 서버를 실행합니다. |
| `npm run build` | 배포용 파일을 생성합니다. |
| `npm run lint` | 코드 스타일 및 문법 문제를 검사합니다. |

---

## 설정 파일 구조

| 파일 | 설명 |
|---|---|
| `.env.example` | 필요한 환경변수 예시 파일입니다. Git에 커밋합니다. |
| `.env` | 로컬 개발 환경에서 실제로 사용하는 환경변수 파일입니다. Git에 커밋하지 않습니다. |
| `.gitignore` | Git에 올리지 않을 파일과 폴더를 정의합니다. |
| `package.json` | 프로젝트 정보, 실행 명령어, 라이브러리 목록을 관리합니다. |
| `package-lock.json` | 설치된 라이브러리의 정확한 버전을 기록합니다. |
| `vite.config.js` | Vite 설정 파일입니다. |
| `eslint.config.js` | ESLint 설정 파일입니다. |

---

## 폴더 구조

```txt
src
├─ app
├─ pages
├─ features
├─ shared
├─ App.jsx
└─ main.jsx
```

---

## 패키지 구조

프론트엔드 코드는 역할에 따라 폴더를 나누어 관리합니다.

```txt
src/
├─ app/
│  ├─ App.jsx
│  └─ Router.jsx
│
├─ assets/
│  └─ images/
│
├─ features/
│  ├─ onboarding/
│  ├─ auth/
│  ├─ home/
│  ├─ capture/
│  ├─ analysis/
│  ├─ report/
│  ├─ routine/
│  └─ mypage/
│
├─ shared/
│  ├─ api/
│  ├─ components/
│  ├─ constants/
│  ├─ styles/
│  └─ utils/
│
├─ mocks/
│  └─ mockData.js
│
└─ main.jsx
```

새로운 기능을 추가할 때는 `features` 폴더 아래에 기능 이름으로 폴더를 만들고 관리합니다.

예시:

```txt
features
├─ auth
├─ user
└─ post
```

여러 기능에서 함께 사용하는 버튼, 헤더, API 설정 등은 `shared` 폴더에 둡니다.

---

## 환경변수

| 이름 | 설명 | 예시 |
|---|---|---|
| `VITE_API_BASE_URL` | 백엔드 API 서버 주소 | `http://localhost:8080` |

Vite에서 브라우저 코드에 노출되는 환경변수는 반드시 `VITE_`로 시작해야 합니다.

---

## API 통신 구조

백엔드 API 요청은 `src/shared/api/client.js`에서 공통 설정을 관리합니다.

```js
import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});
```

각 기능별 API 요청은 해당 기능 폴더 안에서 관리합니다.

예시:

```txt
src/features/auth/api.js
src/features/user/api.js
```

---

## 브랜치 전략

| 브랜치 | 용도 |
|---|---|
| `main` | 배포 가능한 안정 버전 |
| `develop` | 개발 통합 브랜치 |
| `feat/*` | 기능 개발 브랜치 |
| `fix/*` | 버그 수정 브랜치 |

작업은 `develop` 브랜치에서 새 브랜치를 만들어 진행합니다.

```bash
git checkout develop
git checkout -b feat/login
```

작업 완료 후 GitHub에서 Pull Request를 생성하고, 리뷰 후 `develop` 브랜치에 병합합니다.

---

## 커밋 메시지 예시

| 타입 | 설명 | 예시 |
|---|---|---|
| `init` | 프로젝트 초기 설정 | `init: project setup` |
| `feat` | 새로운 기능 추가 | `feat: add login page` |
| `fix` | 버그 수정 | `fix: handle login error` |
| `docs` | 문서 수정 | `docs: update README` |
| `style` | 스타일 수정 | `style: update button layout` |
| `refactor` | 코드 구조 개선 | `refactor: separate auth api` |

---

## Git에 올리지 않는 파일

아래 파일과 폴더는 Git에 커밋하지 않습니다.

```txt
node_modules
dist
.env
```

- `node_modules`: 설치된 라이브러리 폴더입니다. `npm install`로 다시 생성할 수 있습니다.
- `dist`: 빌드 결과물 폴더입니다. `npm run build`로 다시 생성할 수 있습니다.
- `.env`: 개인 로컬 환경변수 파일입니다.
