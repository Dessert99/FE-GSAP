# GSAP 학습 코드북

GSAP 공식 문서를 **읽는 문서가 아니라 조작해보는 학습 페이지**로 재구성한 프로젝트입니다. 공식 기술 페이지 하나를 로컬 학습 페이지 하나에 1:1로 대응시키고, 각 개념마다 값을 바꿔가며 애니메이션 변화를 직접 관찰할 수 있는 예제를 붙입니다.

**🔗 [https://dessert99.github.io/FE-GSAP/](https://dessert99.github.io/FE-GSAP/)**

## 이 프로젝트가 다른 점

- **공식 문서 1:1 대응** — 페이지마다 공식 URL, 목차 대응표, 마지막 대조일을 표시해 원문에서 어디까지 다뤘는지 추적합니다.
- **실행값과 표시 코드가 같은 출처** — 컨트롤 값, 실제 GSAP 입력, 화면에 보이는 코드가 모두 하나의 runtime state에서 파생됩니다. 화면의 코드가 실제로 실행 중인 코드입니다.
- **관찰 중심 구성** — 예제마다 `무엇이 달라졌나요?`, `무엇을 봐야 하나요?`, `왜 이렇게 동작하나요?`로 마무리해 변화를 눈으로 확인하고 원리로 잇습니다.
- **한 화면에 하나의 개념** — 하나의 대상, 하나의 변화에 집중합니다. 다중 대상은 stagger처럼 그 자체가 개념일 때만 씁니다.

## 학습 트랙

| 트랙 | 경로 | 내용 |
| --- | --- | --- |
| **기본** | `/fundamentals` | 공식 API를 작은 예제로 깊게 확인 |
| **패턴** | `/patterns` | 디자인에 종속되지 않는 조합 패턴 (준비 중) |
| **실무** | `/showcases` | 페이지·컴포넌트 단위의 완성된 활용 (준비 중) |

### 현재 공개된 레슨

`/fundamentals`에는 **86개 학습 페이지**가 공개되어 있습니다. Core 40개 페이지가 canonical source 159개를, Plugin 46개 페이지가 canonical source 205개를 소유해 공식 기술 source **364/364개**를 모두 연결합니다.

페이지·공식 source·라우트의 전체 대응은 [master page inventory](docs/handoffs/gsap/_program/master-page-inventory.md), 최신 완료 상태와 검증 근거는 [current status](docs/handoffs/gsap/_program/current-status.md)에서 확인할 수 있습니다. `/patterns`와 `/showcases`는 아직 별도 레슨 없이 트랙 소개 화면만 제공합니다.

## 기술 스택

React 19 · TypeScript 6 · Vite 8 · GSAP 3.15 (`@gsap/react`) · Storybook 10

## 실행

```bash
npm install
npm run dev              # 개발 서버
npm run build            # 타입 검사 + 프로덕션 빌드
npm run preview          # 빌드 결과 확인
npm run storybook        # 공용 컴포넌트 스토리
npm run build-storybook  # 스토리북 정적 빌드
```

## 구조

```text
src/
├── app/                  # 라우팅과 앱 골격
├── components/           # 둘 이상의 학습 페이지가 공유하는 UI
├── content/gsap/         # 공식 문서와 대응하는 학습 콘텐츠
│   └── <분류>/<slug>/    # 공식 페이지 하나의 경계
│       ├── sections/     # 공식 목차와 대응하는 학습 섹션
│       └── examples/     # 독립적으로 실행되는 GSAP 예제
├── pages/                # GSAP 문서와 무관한 앱 페이지
└── styles/               # 전역 토큰과 reset
```

배치 기준과 예제 작성 규칙은 [docs/project-structure.md](docs/project-structure.md)에 정리되어 있습니다.

라우팅은 라이브러리 없이 History API로 직접 구현했습니다. 앱 내부 상태는 항상 `/fundamentals/easing` 형태의 경로를 쓰고, 브라우저 주소로 나갈 때만 배포 base(`/FE-GSAP/`)를 붙입니다 — [src/app/routes.ts](src/app/routes.ts)의 `toHref` / `toAppPath`가 그 경계입니다.

## 문서

| 문서 | 내용 |
| --- | --- |
| [AGENTS.md](AGENTS.md) | 코딩 행동 지침과 주석 규칙 |
| [docs/project-structure.md](docs/project-structure.md) | 폴더 배치 기준과 예제 작성 규칙 |
| [docs/workflows/](docs/workflows/) | 공식 문서 기반 페이지 제작 workflow |
| [docs/handoffs/](docs/handoffs/) | 페이지별 source·coverage·검수 기록 |

## 검증 방식

이 프로젝트는 **자동화 테스트 코드를 작성하지 않습니다.** 대신 TypeScript·Vite 빌드, Storybook 빌드, 그리고 브라우저에서 컨트롤과 애니메이션 동작을 직접 확인하는 방식으로 검증합니다. 자세한 기준은 [docs/workflows/quality-gates.md](docs/workflows/quality-gates.md)에 있습니다.

2026-08-13 기준 86개 페이지 handoff는 모두 `releaseDecision: PASS`입니다. 기존 browser-only `DEFERRED`는 저장소 소유자의 완료 간주 승인으로 닫았으며, 실제 브라우저 실조작 증거가 별도로 생성된 것은 아닙니다.

## 배포

`main` 브랜치에 푸시하면 [GitHub Actions 워크플로](.github/workflows/deploy.yml)가 빌드 후 GitHub Pages로 자동 배포합니다. GitHub Pages에는 SPA fallback이 없어, 빌드 후 `index.html`을 `404.html`로 복사해 레슨 URL 직접 진입도 앱이 받아냅니다.
