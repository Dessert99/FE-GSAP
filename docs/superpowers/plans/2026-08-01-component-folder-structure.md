# Component Folder Structure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 공용 컴포넌트를 역할별 영역과 컴포넌트별 폴더로 재배치해 관련 구현, 스타일, 테스트, 스토리를 한곳에 모은다.

**Architecture:** `demo`와 `navigation`을 역할 경계로 사용하고, 그 아래에 컴포넌트 이름의 폴더를 둔다. 배럴 파일 없이 소비자가 구현 파일을 직접 import하며 컴포넌트 동작과 CSS 클래스는 변경하지 않는다.

**Tech Stack:** React 19, TypeScript 6, Vitest 4, Storybook 10

## Global Constraints

- 컴포넌트의 공개 props와 런타임 동작을 변경하지 않는다.
- 구현, CSS, 테스트, Storybook 스토리는 해당 컴포넌트 폴더에 둔다.
- 배럴 `index.ts`와 새 추상화를 추가하지 않는다.
- Storybook은 `Components/Demo`, `Components/Navigation`으로 분류한다.

---

### Task 1: Storybook 분류 계약 변경

**Files:**
- Modify: `src/components/storybook.test.ts`

**Interfaces:**
- Consumes: `src/components/**/*.stories.tsx`의 Storybook title
- Produces: `Demo`와 `Navigation` 역할 분류를 강제하는 카탈로그 계약

- [ ] **Step 1: 기대 Storybook 분류 변경**

기대 title을 다음과 같이 바꾼다.

```text
Components/Demo/DemoPanel
Components/Demo/OfficialDocsLink
Components/Navigation/FloatingToc
Components/Navigation/TrackTabs
```

- [ ] **Step 2: RED 확인**

Run: `npm test -- src/components/storybook.test.ts`
Expected: 현재 `Components/Learning/*` title 때문에 카탈로그 비교 실패

### Task 2: 컴포넌트 파일 이동과 import 수정

**Files:**
- Move: `src/components/demo/DemoPanel.*` → `src/components/demo/DemoPanel/DemoPanel.*`
- Move: `src/components/learning/OfficialDocsLink.*` → `src/components/demo/OfficialDocsLink/OfficialDocsLink.*`
- Move: `src/components/learning/FloatingToc.*` → `src/components/navigation/FloatingToc/FloatingToc.*`
- Move: `src/components/learning/TrackTabs.*` → `src/components/navigation/TrackTabs/TrackTabs.*`
- Modify: `src/app/App.tsx`
- Modify: `src/fundamentals/gsap-to/GsapToPage.tsx`
- Modify: `src/fundamentals/gsap-to/gsap-to.references.ts`

**Interfaces:**
- Consumes: 기존 컴포넌트 props, CSS 클래스, 테스트, Storybook 상태
- Produces: 컴포넌트별 응집된 폴더와 수정된 직접 import 경로

- [ ] **Step 1: Demo 컴포넌트 이동**

`DemoPanel` 관련 네 파일과 `OfficialDocsLink` 관련 네 파일을 각 컴포넌트 폴더로 이동한다. `DemoPanel.tsx`의 링크 import는 `../OfficialDocsLink/OfficialDocsLink`로 변경한다.

- [ ] **Step 2: Navigation 컴포넌트 이동**

`FloatingToc` 관련 세 파일과 `TrackTabs` 관련 두 파일을 각 컴포넌트 폴더로 이동한다. `routes` 상대 경로는 새 깊이에 맞춰 `../../../app/routes`로 변경한다.

- [ ] **Step 3: 소비자 import와 Storybook title 수정**

앱과 `gsap.to()` 레슨의 import를 새 구현 파일 경로로 변경한다. 스토리 title은 `Components/Demo`와 `Components/Navigation`에 맞춘다.

- [ ] **Step 4: GREEN 확인**

Run: `npm test -- src/components/storybook.test.ts`
Expected: 카탈로그 계약 테스트 통과

- [ ] **Step 5: 전체 테스트 확인**

Run: `npm test`
Expected: 7개 테스트 파일, 15개 테스트 통과

### Task 3: 구조 문서와 최종 검증

**Files:**
- Modify: `docs/project-plan.md`
- Modify: `docs/project-structure.md`
- Modify: `docs/progress.md`

**Interfaces:**
- Consumes: 완성된 컴포넌트 폴더 구조
- Produces: 다음 세션이 따를 역할별·컴포넌트별 배치 원칙

- [ ] **Step 1: 프로젝트 문서 갱신**

`project-plan.md`의 폴더 예시를 `demo/<Component>`, `navigation/<Component>`로 바꾸고 컴포넌트별 폴더 원칙을 추가한다. `project-structure.md`의 트리를 실제 경로와 일치시키고 `progress.md`에 구조 정리 완료를 기록한다.

- [ ] **Step 2: 앱과 Storybook 빌드 검증**

Run: `npm run build`
Expected: TypeScript 및 Vite 앱 빌드 성공

Run: `npm run build-storybook`
Expected: Storybook 정적 빌드 성공

- [ ] **Step 3: 변경 범위 검증과 커밋**

Run: `git diff --check && git status --short`
Expected: 컴포넌트 이동, import, Storybook title, 프로젝트 문서만 변경됨

```bash
git add src/components src/app/App.tsx src/fundamentals/gsap-to docs/project-plan.md docs/project-structure.md docs/progress.md docs/superpowers/plans/2026-08-01-component-folder-structure.md
git commit -m "refactor: 공용 컴포넌트 폴더 구조 정리"
```
