# 프로젝트 구조 규칙

이 문서는 현재 파일 목록이 아니라 앞으로 추가할 코드의 배치 기준이다.

## 기본 구조

```text
src/
├── app/                              # 라우팅과 앱 골격
├── components/                       # 둘 이상의 학습 페이지가 공유하는 UI
│   └── <역할>/
│       └── <ComponentName>/
│           ├── <ComponentName>.tsx
│           ├── <ComponentName>.css
│           └── <ComponentName>.stories.tsx
├── content/                          # GSAP 공식 문서와 대응하는 학습 콘텐츠
│   └── gsap/
│       └── <공식 문서 분류>/
│           └── <공식 페이지 slug>/  # 공식 페이지 하나의 경계
│               ├── <PageName>.tsx    # 섹션 조립만 담당
│               ├── <PageName>.css    # 페이지 공통 배치
│               ├── <slug>.meta.ts    # 공식 URL·제목·대조일·목차
│               ├── <slug>.properties.ts # 속성 전체 명세가 있을 때
│               ├── components/       # 이 페이지 안에서 재사용하는 작은 UI
│               │   └── <ComponentName>/
│               │       └── <ComponentName>.tsx
│               ├── sections/         # 공식 목차와 대응하는 학습 섹션
│               │   └── <SectionName>/
│               │       ├── <SectionName>.tsx
│               │       └── <SectionName>.css
│               └── examples/         # 독립적으로 실행되는 GSAP 예제
│                   └── <ExampleName>/
│                       ├── <ExampleName>.tsx
│                       ├── <ExampleName>.css
│                       └── use<ExampleName>Animation.ts
├── pages/                            # GSAP 문서와 무관한 앱 페이지
└── styles/                           # 전역 토큰과 reset
```

## 공식 문서 1:1 원칙

- 공식 문서의 기술 페이지 하나를 `src/content/gsap/<분류>/<페이지 slug>/` 하나에 대응시킨다.
- 광고, 계정, 커뮤니티 등 학습과 무관한 페이지는 만들지 않는다.
- 로컬 페이지에 공식 URL, 공식 목차 대응표, 마지막 대조일, 로컬 코드 경로를 표시한다.
- 공식 페이지의 기술 섹션과 API 속성을 모두 명세 데이터로 기록한다. 일부만 구현한 페이지를 완료로 표시하지 않는다.
- 별도 전용 페이지가 있는 개념도 현재 공식 페이지에 설명이 있으면 핵심 원리와 경계를 설명하고 공식 링크를 연결한다.

## 페이지 내부 분리 규칙

- `<PageName>.tsx`에는 헤더와 섹션 컴포넌트 조립만 둔다.
- 공식 목차의 학습 단위는 `sections/<SectionName>/`으로 분리한다.
- 실행 상태와 GSAP 호출을 가진 예제는 `examples/<ExampleName>/`으로 분리하고, GSAP 실행 책임은 같은 폴더의 `use<ExampleName>Animation.ts`에 둔다.
- 한 파일에 둘 이상의 React 컴포넌트를 정의하지 않는다. 페이지 전용 보조 컴포넌트도 `components/<ComponentName>/`에 둔다.
- 컴포넌트의 TSX와 전용 CSS는 같은 폴더에 둔다. 공통으로 사용하지 않는 파일을 상위 폴더로 올리지 않는다.

## 학습 예제 규칙

- `use<ExampleName>Animation.ts`는 GSAP state, scope, 대상 className, `useGSAP`, GSAP 호출, Tween 참조·제어, replay, reduced-motion 분기, runtime 관찰 상태와 실제 정규화 config를 포함한다.
- `<ExampleName>.tsx`는 controls, preview, hook state 기반 code serializer, `propertyDetails`, `changes`, `watchFor`, explanation을 포함한다.
- hook에는 제목·설명·속성 표·관찰점 같은 학습 패널을 넣지 않고, TSX에는 GSAP 호출과 생명주기를 넣지 않는다.
- 컨트롤 값, 실제 GSAP vars, 화면에 보이는 코드는 hook의 동일한 runtime state와 정규화 config나 discriminated descriptor에서 파생한다. TSX serializer는 그 실행값을 코드 문법으로만 포맷하고 의미를 다시 조립하지 않는다.
- 예제별 hook을 유지한다. `<ExampleName>.guide.md`로 실행 경계를 대신하거나 여러 예제를 공용 generic animation hook에 합치지 않는다.
- 처음 등장하는 GSAP 용어와 함수는 예제를 실행하기 전에 쉬운 문장으로 역할을 정의한다.
- 한 화면에서는 하나의 대상과 하나의 변화에 집중한다. 비교가 필요하면 같은 대상의 상태를 단계별로 바꾸되, multiple targets나 stagger 자체가 개념의 본질일 때만 다중 대상을 허용한다.
- 예제 아래에 `무엇이 달라졌나요?`, `무엇을 봐야 하나요?`, `왜 이렇게 동작하나요?`를 작성한다.
- 각 속성이 실제 인터랙션에서 쓰이는 상황을 한두 가지 제시한다.
- 속성마다 타입, 기본값, 허용값·특수값을 표시한다.
- 관련 속성은 실제로 함께 쓰는 조합 단위로 예제를 만들되, 전체 속성 명세에서 누락 여부를 별도로 확인한다.
- 예제 화면의 `sourcePath`는 React 패널이 아니라 `use<ExampleName>Animation.ts`를 가리킨다.

## 공용 컴포넌트 규칙

- 둘 이상의 페이지에서 사용하는 UI만 `src/components/<역할>/<ComponentName>/`에 둔다.
- 공용 컴포넌트 폴더에는 구현, 스타일, Storybook 스토리를 함께 둔다.
- 역할 폴더 바로 아래에 여러 컴포넌트 파일을 평평하게 배치하지 않는다.

## 검증 규칙

- 자동화 테스트 코드는 작성하지 않는다.
- TypeScript·Vite 빌드, Storybook 빌드, 브라우저에서 컨트롤과 애니메이션 동작을 확인한다.
- 공식 목차 수와 속성 수가 로컬 명세와 일치하는지 대조한다.
