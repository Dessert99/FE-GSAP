# 프로젝트 구조

현재 유지보수 대상 기준이다. `node_modules`, `dist`, Git 내부 파일과 임시 파일은 제외한다.

```text
fe-gsap/
├── .storybook/
│   ├── main.ts                      # Storybook React·Vite 설정
│   └── preview.ts                   # 전역 스타일과 공통 preview 설정
├── docs/
│   └── project-structure.md         # 현재 폴더 구조와 배치 원칙
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

## 컴포넌트 배치 원칙

- 공용 컴포넌트는 `src/components/<역할>/<컴포넌트명>/`에 둔다.
- 구현, 스타일, 테스트, Storybook 스토리를 해당 컴포넌트 폴더에 함께 둔다.
- 역할 폴더 바로 아래에 컴포넌트 파일을 평평하게 배치하지 않는다.
- 여러 컴포넌트가 실제로 공유하는 파일만 `src/components` 공통 위치에 둔다.
