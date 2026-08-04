# gsap.to() Learning Clarity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `gsap.to()`의 작은 글자와 불명확한 속성 예제를 개선해 초보자가 한 단계씩 동작과 사용처를 이해하게 한다.

**Architecture:** 기존 `InteractiveExample` 공통 틀과 예제별 폴더 경계는 유지한다. 재생 옵션은 하나의 상태에서 GSAP vars·표시 코드·상태 안내를 파생하고, `repeatRefresh`는 하나의 대상을 네 단계로 실행한다.

**Tech Stack:** React 19, TypeScript, GSAP 3, `@gsap/react`, Vite, Storybook

## Global Constraints

- 자동화 테스트 코드와 테스트 의존성을 추가하지 않는다.
- 한 파일에 둘 이상의 React 컴포넌트를 정의하지 않는다.
- 파일 상단과 export 위에 프로젝트의 한 줄 한국어 주석 규칙을 적용한다.
- 컨트롤 값, 실제 GSAP vars, 화면에 보이는 코드는 하나의 React state에서 파생한다.

---

### Task 1: 학습 페이지 글자 크기 확대

**Files:**
- Modify: `src/components/demo/InteractiveExample/InteractiveExample.css`
- Modify: `src/content/gsap/fundamentals/gsap-to/GsapToPage.css`
- Modify: `src/content/gsap/fundamentals/gsap-to/sections/MethodAnatomySection/MethodAnatomySection.css`
- Modify: `src/content/gsap/fundamentals/gsap-to/sections/PageCoverageSection/PageCoverageSection.css`
- Modify: `src/content/gsap/fundamentals/gsap-to/sections/PluginsSection/PluginsSection.css`
- Modify: `src/content/gsap/fundamentals/gsap-to/sections/SequencingSection/SequencingSection.css`
- Modify: `src/content/gsap/fundamentals/gsap-to/sections/SpecialPropertiesSection/SpecialPropertiesSection.css`
- Modify: `src/content/gsap/fundamentals/gsap-to/examples/*/*.css`

**Interfaces:**
- Consumes: 기존 `--color-*` 토큰과 클래스 이름
- Produces: 핵심 설명 15px 이상, 보조 정보 12px 이상의 `gsap.to()` 페이지

- [ ] **Step 1: 작은 글자 위치 확인**

Run: `rg -n "font-size:\\s*([0-9]|1[0-4])px" src/components/demo/InteractiveExample src/content/gsap/fundamentals/gsap-to`

- [ ] **Step 2: 학습 본문과 조작부 크기 조정**

핵심 본문·설명·표 셀은 15px 이상으로, 눈금·eyebrow·경로·메타 정보는 12px 이상으로 올린다. 제목은 기존 위계를 유지하며 2px 안팎 키운다.

- [ ] **Step 3: 작은 글자 잔여 확인**

Run: `rg -n "font-size:\\s*([0-9]|1[01])px" src/components/demo/InteractiveExample src/content/gsap/fundamentals/gsap-to`
Expected: 결과 없음

### Task 2: 시간·방향 예제 동기화

**Files:**
- Modify: `src/content/gsap/fundamentals/gsap-to/examples/PlaybackOptionsExample/PlaybackOptionsExample.tsx`
- Modify: `src/content/gsap/fundamentals/gsap-to/examples/PlaybackOptionsExample/PlaybackOptionsExample.css`

**Interfaces:**
- Consumes: `PlaybackOptionsState`의 `delay`, `startAt`, `runBackwards`, `reversed`, `easeReverse`
- Produces: 동일 상태에서 생성된 `gsap.TweenVars`, 표시 코드, 시작값·목표값·playhead 방향 안내

- [ ] **Step 1: 설정 상태와 파생값 통합**

다섯 컨트롤을 `PlaybackOptionsState` 하나로 관리하고 `createPlaybackVars(state, reducedMotion)`가 런타임 vars를 반환하게 한다. 코드 문자열과 화면 안내도 같은 `state`에서 생성한다.

- [ ] **Step 2: 현재 동작 안내 추가**

미리보기에 `시작값`, `목표값`, `값의 배치`, `playhead`를 표시한다. `reverse()`를 실행하면 표시 코드에 `tween.reverse()`를 추가하고 안내 상태도 역방향으로 바꾼다.

- [ ] **Step 3: 정적 검사**

Run: `npx tsc --noEmit`
Expected: TypeScript 오류 없음

### Task 3: repeatRefresh 단계형 예제

**Files:**
- Modify: `src/content/gsap/fundamentals/gsap-to/examples/RepeatRefreshExample/RepeatRefreshExample.tsx`
- Modify: `src/content/gsap/fundamentals/gsap-to/examples/RepeatRefreshExample/RepeatRefreshExample.css`

**Interfaces:**
- Consumes: `RepeatRefreshStep` 네 단계와 `gsap.utils.random(40, 230, 10)` 함수 기반 목표값
- Produces: `첫 실행 → repeat → repeatRefresh → 활용` 순서, 현재 회차·목적지·재계산 기록

- [ ] **Step 1: 네 단계 상태 정의**

`initial`, `repeat`, `refresh`, `use` 단계별 제목·설명·반복 횟수·`repeatRefresh` 값을 정의하고 버튼으로 하나씩 선택하게 한다.

- [ ] **Step 2: 하나의 대상만 실행**

함수 기반 `x`가 평가될 때 실제 목적지를 기록한다. `repeat` 단계는 같은 기록을 유지하고 `refresh` 단계는 반복마다 새 목적지를 기록한다.

- [ ] **Step 3: 관찰점과 사용처 연결**

현재 회차와 목적지를 크게 표시하고, 단계별 `무엇이 달라졌나요?`, `무엇을 봐야 하나요?`, `왜 이렇게 동작하나요?` 및 불규칙 입자 활용 설명을 제공한다.

- [ ] **Step 4: 정적 검사**

Run: `npx tsc --noEmit`
Expected: TypeScript 오류 없음

### Task 4: 특수 속성 34개의 실제 사용처 보강

**Files:**
- Modify: `src/content/gsap/fundamentals/gsap-to/gsap-to.properties.ts`
- Modify: `src/content/gsap/fundamentals/gsap-to/sections/SpecialPropertiesSection/SpecialPropertiesSection.tsx`
- Modify: `src/content/gsap/fundamentals/gsap-to/sections/SpecialPropertiesSection/SpecialPropertiesSection.css`

**Interfaces:**
- Consumes: 공식 특수 속성 34개의 기존 타입·기본값·설명·조합 데이터
- Produces: 각 속성의 `어떤 동작인가요?`, `언제 쓰나요?`, `함께 쓰는 속성` 학습 흐름

- [ ] **Step 1: 사용처 데이터 추가**

`SpecialProperty`에 `useCase`를 추가하고 34개 속성 모두에 실제 인터랙션 사용 상황을 한 문장으로 작성한다.

- [ ] **Step 2: 카드 설명 순서 변경**

각 카드가 동작 정의, 실제 사용처, 관련 속성 조합 순서로 읽히게 렌더링하고 본문을 15px 이상으로 표시한다.

- [ ] **Step 3: 정적 검사**

Run: `npx tsc --noEmit`
Expected: 누락된 `useCase`와 TypeScript 오류 없음

### Task 5: 지속 규칙과 전체 검증

**Files:**
- Modify: `docs/project-structure.md`

**Interfaces:**
- Consumes: 승인된 단계형 설명 구조
- Produces: 이후 속성 페이지에도 적용되는 학습 예제 규칙

- [ ] **Step 1: 설명 규칙 명시**

낯선 용어를 예제 전에 정의하고, 한 화면에서 하나의 변화만 보여주며, 비교는 한 대상의 단계형 변화로 설명하고, 실제 사용처를 연결한다는 규칙을 추가한다.

- [ ] **Step 2: 프로젝트 검증**

Run: `npm run build`
Expected: Vite production build 성공

Run: `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook`
Expected: Storybook static build 성공

Run: `git diff --check`
Expected: 공백 오류 없음
