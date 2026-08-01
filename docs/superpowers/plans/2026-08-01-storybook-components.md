# Storybook Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `src/components`의 네 공용 컴포넌트를 앱과 동일한 스타일로 Storybook에서 확인하고 조작할 수 있게 한다.

**Architecture:** `.storybook`은 React+Vite Storybook 설정과 앱 전역 스타일 로딩만 담당한다. 각 컴포넌트의 CSF 스토리는 구현 파일 옆에 두며, 하나의 Vitest 계약 테스트가 등록된 컴포넌트와 상태 목록을 검증한다.

**Tech Stack:** Storybook 10.5.5, React 19, Vite 8, TypeScript 6, Vitest 4

## Global Constraints

- Storybook 생성 샘플과 소개 페이지를 추가하지 않는다.
- 기존 컴포넌트 구현과 스타일을 Storybook 때문에 변경하지 않는다.
- 스토리는 `src/components` 아래의 공용 컴포넌트만 포함한다.
- 앱의 `global.css`와 `app.css`를 그대로 사용한다.

---

### Task 1: 스토리 카탈로그 계약 테스트

**Files:**
- Create: `src/components/storybook.test.ts`

**Interfaces:**
- Consumes: `src/components/**/*.stories.tsx`의 기본 메타데이터와 named story export
- Produces: 네 컴포넌트와 필수 상태가 빠지면 실패하는 Vitest 계약

- [ ] **Step 1: 실패하는 카탈로그 테스트 작성**

`import.meta.glob('./**/*.stories.tsx', { eager: true })`로 스토리 모듈을 읽고 아래 목록과 정확히 일치하는지 검증한다.

```text
Components/Demo/DemoPanel: Default, WithOfficialReferences
Components/Learning/FloatingToc: Closed, Open
Components/Learning/OfficialDocsLink: Default, LongLabel
Components/Learning/TrackTabs: Fundamentals, Patterns, Showcases
```

- [ ] **Step 2: RED 확인**

Run: `npm test -- src/components/storybook.test.ts`
Expected: 실제 카탈로그가 빈 배열이어서 기대 목록과 다르게 실패

### Task 2: Storybook 실행 환경

**Files:**
- Create: `.storybook/main.ts`
- Create: `.storybook/preview.ts`
- Modify: `.gitignore`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Consumes: `src/styles/global.css`, `src/app/app.css`, `src/components/**/*.stories.tsx`
- Produces: `npm run storybook`, `npm run build-storybook`

- [ ] **Step 1: 동일 버전의 최소 패키지 설치**

Run: `npm install --save-dev storybook@10.5.5 @storybook/react-vite@10.5.5 @storybook/addon-docs@10.5.5`

- [ ] **Step 2: 실행 스크립트와 산출물 제외 추가**

`package.json`에 아래 스크립트를 추가한다.

```json
"storybook": "storybook dev -p 6006",
"build-storybook": "storybook build"
```

`.gitignore`에 `storybook-static/`을 추가한다.

- [ ] **Step 3: Storybook 설정 작성**

`.storybook/main.ts`는 `@storybook/react-vite`, `@storybook/addon-docs`, `src/components`의 스토리 glob만 등록한다. `.storybook/preview.ts`는 `global.css`, `app.css`를 불러오고 `autodocs`를 활성화한다.

### Task 3: 공용 컴포넌트 스토리

**Files:**
- Create: `src/components/demo/DemoPanel.stories.tsx`
- Create: `src/components/learning/FloatingToc.stories.tsx`
- Create: `src/components/learning/OfficialDocsLink.stories.tsx`
- Create: `src/components/learning/TrackTabs.stories.tsx`

**Interfaces:**
- Consumes: 기존 네 컴포넌트의 공개 props와 `src/app/routes.ts`의 실제 트랙 데이터
- Produces: `Components/Demo`, `Components/Learning` 아래의 독립 UI 상태

- [ ] **Step 1: DemoPanel과 링크 스토리 작성**

`DemoPanel`은 기본 상태와 공식 자료 링크 포함 상태를 제공한다. `OfficialDocsLink`는 기본 라벨과 긴 라벨 상태를 제공한다.

- [ ] **Step 2: 목차와 탭 스토리 작성**

`FloatingToc`는 닫힌 상태와 `play` 함수가 목차 버튼을 누르는 열린 상태를 제공한다. `TrackTabs`는 세 트랙 각각을 현재 상태로 제공하고 링크 이동은 Storybook 안에서 막는다.

- [ ] **Step 3: GREEN 확인**

Run: `npm test -- src/components/storybook.test.ts`
Expected: 카탈로그 계약 테스트 통과

- [ ] **Step 4: 전체 테스트 확인**

Run: `npm test`
Expected: 기존 14개 테스트와 새 카탈로그 테스트 통과

### Task 4: 문서와 최종 검증

**Files:**
- Modify: `docs/project-plan.md`
- Modify: `docs/project-structure.md`
- Modify: `docs/progress.md`

**Interfaces:**
- Consumes: 완성된 Storybook 설정, 스토리, 검증 결과
- Produces: 새 세션에서 확인 가능한 현재 구조와 진행 현황

- [ ] **Step 1: 프로젝트 문서 갱신**

`docs/project-plan.md`에 공용 컴포넌트 스토리 유지 원칙과 Storybook 빌드 명령을 추가한다. `docs/project-structure.md`에 `.storybook`, 네 스토리, 카탈로그 테스트를 추가한다. `docs/progress.md`에 Storybook 실행 환경과 공용 컴포넌트 스토리 완료 상태를 기록한다.

- [ ] **Step 2: 앱과 Storybook 빌드 검증**

Run: `npm run build`
Expected: TypeScript 및 Vite 앱 빌드 성공

Run: `npm run build-storybook`
Expected: `storybook-static` 정적 빌드 성공

- [ ] **Step 3: 브라우저 검증**

Run: `npm run storybook -- --no-open`
Expected: 네 컴포넌트가 사이드바에 나타나며 목차 열기·닫기와 탭·링크·다시 재생 UI가 앱 스타일로 표시됨

- [ ] **Step 4: 변경 범위 검증과 커밋**

Run: `git diff --check && git status --short`
Expected: Storybook 설정, 스토리, 패키지, 프로젝트 문서만 변경됨

```bash
git add .storybook .gitignore package.json package-lock.json src/components docs/project-plan.md docs/project-structure.md docs/progress.md docs/superpowers/plans/2026-08-01-storybook-components.md
git commit -m "feat: 공용 컴포넌트 Storybook 추가"
```
