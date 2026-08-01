# 프로젝트 구조

현재 유지보수 대상 기준이다. `node_modules`, `dist`, Git 내부 파일과 임시 파일은 제외한다.

```text
fe-gsap/
├── .storybook/
│   ├── main.ts                      # Storybook React·Vite 설정
│   └── preview.ts                   # 전역 스타일과 공통 preview 설정
├── docs/
│   ├── project-plan.md              # 프로젝트 목적과 운영 원칙
│   ├── project-structure.md         # 현재 폴더 구조
│   ├── progress.md                  # 구현 진행 현황
│   └── superpowers/
│       ├── plans/                   # 구현 계획 기록
│       └── specs/                   # 설계 결정 기록
├── public/
│   └── favicon.svg
├── src/
│   ├── app/
│   │   ├── App.tsx                  # 전체 학습 화면
│   │   ├── App.test.tsx
│   │   ├── routes.ts                # 트랙과 레슨 등록
│   │   ├── routes.test.ts
│   │   └── app.css                  # 앱 골격 스타일
│   ├── components/
│   │   ├── demo/
│   │   │   ├── DemoPanel/
│   │   │   │   ├── DemoPanel.tsx    # 공통 데모 프레임
│   │   │   │   ├── DemoPanel.stories.tsx
│   │   │   │   ├── DemoPanel.test.tsx
│   │   │   │   └── DemoPanel.css
│   │   │   └── OfficialDocsLink/
│   │   │       ├── OfficialDocsLink.tsx # GSAP 공식 자료 링크
│   │   │       ├── OfficialDocsLink.stories.tsx
│   │   │       ├── OfficialDocsLink.test.tsx
│   │   │       └── OfficialDocsLink.css
│   │   ├── navigation/
│   │   │   ├── FloatingToc/
│   │   │   │   ├── FloatingToc.tsx  # 원형 레슨 목차
│   │   │   │   ├── FloatingToc.stories.tsx
│   │   │   │   └── FloatingToc.test.tsx
│   │   │   └── TrackTabs/
│   │   │       ├── TrackTabs.tsx    # 학습 트랙 탭
│   │   │       └── TrackTabs.stories.tsx
│   │   └── storybook.test.ts        # Storybook 카탈로그 계약
│   ├── fundamentals/
│   │   └── gsap-to/
│   │       ├── examples/            # gsap.to() 개별 예제
│   │       │   ├── BasicMovementExample.tsx
│   │       │   ├── CardFeedbackExample.tsx
│   │       │   ├── FunctionValueExample.tsx
│   │       │   ├── MultiplePropertiesExample.tsx
│   │       │   ├── MultipleTargetsExample.tsx
│   │       │   └── RelativeValueExample.tsx
│   │       ├── GsapToPage.tsx
│   │       ├── GsapToPage.test.tsx
│   │       ├── gsap-to.references.ts
│   │       └── gsap-to.css
│   ├── pages/
│   │   └── TrackOverviewPage.tsx    # 트랙 기본 안내 화면
│   ├── styles/
│   │   └── global.css               # reset과 디자인 토큰
│   ├── test/
│   │   └── setup.ts                 # Vitest 공통 설정
│   ├── main.tsx                     # 앱 진입점
│   └── vite-env.d.ts
├── AGENTS.md                        # 작업 기본 지침
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── prettier.config.js
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```
