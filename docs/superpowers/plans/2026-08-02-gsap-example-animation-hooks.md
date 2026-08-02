# GSAP Example Animation Hooks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `gsap.to()`의 모든 실행 예제에서 GSAP 상태와 실행 생명주기를 예제별 커스텀 훅으로 분리하고, 같은 규칙을 프로젝트 구조와 제작 스킬에 고정한다.

**Architecture:** 각 `examples/<ExampleName>/`에는 기존 React 패널 컴포넌트와 CSS를 유지하고 `use<ExampleName>Animation.ts`를 추가한다. 훅은 GSAP 대상, 실행 상태, `useGSAP`, Tween 제어와 replay를 소유하며 컴포넌트는 UI와 학습 패널을 소유한다.

**Tech Stack:** React 19, TypeScript, GSAP 3, `@gsap/react`, Vite, Storybook, Codex project skills

## Global Constraints

- 자동화 테스트 코드와 테스트 의존성을 추가하지 않는다.
- 훅에는 패널 제목·설명·속성 표·관찰점·사용처를 넣지 않는다.
- 컨트롤, 실행 vars, 표시 코드는 훅이 제공하는 동일한 상태와 정규화된 설정에서 파생한다.
- 파일 상단과 모든 export 위에 한 줄 한국어 주석 규칙을 적용한다.
- 공통 훅으로 합치지 않고 예제별 이름과 동작을 유지한다.

---

### Task 1: 기본 값·대상·키프레임 예제 훅 분리

**Files:**
- Create: `src/content/gsap/methods/gsap-to/examples/DestinationValuesExample/useDestinationValuesAnimation.ts`
- Create: `src/content/gsap/methods/gsap-to/examples/MultipleTargetsExample/useMultipleTargetsAnimation.ts`
- Create: `src/content/gsap/methods/gsap-to/examples/KeyframesExample/useKeyframesAnimation.ts`
- Modify: 각 폴더의 기존 `*Example.tsx`

**Interfaces:**
- Consumes: 각 예제의 컨트롤 상태와 reduced-motion 환경
- Produces: `scope`, GSAP 상태·설정, target className, replay와 UI가 호출할 상태 변경 함수

- [ ] **Step 1: 현재 컴포넌트의 state·useGSAP·target className·replay를 같은 폴더의 훅으로 이동한다.**
- [ ] **Step 2: 컴포넌트가 훅 결과로 컨트롤·미리보기·표시 코드를 렌더링하게 한다.**
- [ ] **Step 3: `sourcePath`를 새 훅 파일로 변경하고 TypeScript 빌드로 경계를 확인한다.**

### Task 2: 반복·값 표현·overwrite 예제 훅 분리

**Files:**
- Create: `src/content/gsap/methods/gsap-to/examples/RepeatYoyoExample/useRepeatYoyoAnimation.ts`
- Create: `src/content/gsap/methods/gsap-to/examples/RepeatRefreshExample/useRepeatRefreshAnimation.ts`
- Create: `src/content/gsap/methods/gsap-to/examples/ValueModesExample/useValueModesAnimation.ts`
- Create: `src/content/gsap/methods/gsap-to/examples/OverwriteExample/useOverwriteAnimation.ts`
- Modify: 각 폴더의 기존 `*Example.tsx`

**Interfaces:**
- Consumes: 반복 단계, 값 표현 방식, overwrite 선택 상태
- Produces: 실제 GSAP 설정과 관찰 상태, target className, replay와 상태 변경 함수

- [ ] **Step 1: 학습 문구는 컴포넌트에 남기고 실행 설정과 관찰 상태만 훅으로 이동한다.**
- [ ] **Step 2: 표시 코드가 훅의 정규화된 실행 설정을 사용하게 한다.**
- [ ] **Step 3: `sourcePath`를 새 훅 파일로 변경하고 TypeScript 빌드로 경계를 확인한다.**

### Task 3: Tween 제어·콜백·재생 옵션 예제 훅 분리

**Files:**
- Create: `src/content/gsap/methods/gsap-to/examples/TweenControlsExample/useTweenControlsAnimation.ts`
- Create: `src/content/gsap/methods/gsap-to/examples/CallbacksExample/useCallbacksAnimation.ts`
- Create: `src/content/gsap/methods/gsap-to/examples/PlaybackOptionsExample/usePlaybackOptionsAnimation.ts`
- Modify: 각 폴더의 기존 `*Example.tsx`

**Interfaces:**
- Consumes: Tween 참조, 콜백 로그, 재생 방향 설정
- Produces: Tween 제어 메서드, 관찰 상태, 정규화된 vars와 replay

- [ ] **Step 1: Tween 생성과 제어 메서드를 훅으로 이동해 한 파일에서 전체 실행 흐름을 읽게 한다.**
- [ ] **Step 2: 컴포넌트에는 버튼·상태 안내·학습 패널만 남긴다.**
- [ ] **Step 3: `sourcePath`를 새 훅 파일로 변경하고 TypeScript 빌드로 경계를 확인한다.**

### Task 4: 공식 문서 제작 스킬과 구조 규칙 동기화

**Files:**
- Create: `.agents/skills/creating-gsap-learning-pages/SKILL.md`
- Create: `docs/workflows/README.md`
- Create: `docs/workflows/page-format.md`
- Create: `docs/workflows/quality-gates.md`
- Modify: `AGENTS.md`
- Modify: `docs/project-structure.md`

**Interfaces:**
- Consumes: 공식 문서 1:1 원칙, 페이지 유형별 포맷, 기준 에이전트가 동작 훅 대신 guide를 제안한 실패
- Produces: 새 세션이 발견할 제작 스킬, 훅 경계와 전문 검수 역할이 포함된 지속 규칙

- [ ] **Step 1: 스킬에 소스 분석→페이지 유형 선택→coverage 계약→구현→전문 검수 흐름을 작성한다.**
- [ ] **Step 2: 예제 훅의 포함·제외 책임과 표시 코드 동기화 규칙을 명시한다.**
- [ ] **Step 3: AGENTS와 프로젝트 구조 문서가 스킬과 실제 폴더 구조를 참조하게 한다.**

### Task 5: 전체 검증

**Files:**
- Verify: `src/content/gsap/methods/gsap-to/examples/`
- Verify: `.agents/skills/creating-gsap-learning-pages/`
- Verify: `docs/workflows/`

**Interfaces:**
- Consumes: 완료된 코드·스킬·문서
- Produces: 빌드 가능한 앱과 Storybook, 실제 화면에서 동기화된 컨트롤·코드·애니메이션

- [ ] **Step 1: `npm run build`로 TypeScript와 Vite 빌드를 확인한다.**
- [ ] **Step 2: `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook`으로 공용 UI 스토리를 확인한다.**
- [ ] **Step 3: 브라우저에서 모든 예제의 replay·컨트롤·Tween 제어와 소스 경로를 확인한다.**
- [ ] **Step 4: `git diff --check`와 구조 검색으로 패널 데이터가 훅에 들어가지 않았는지 확인한다.**
