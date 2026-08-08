# GSAP Core Completion Handoff Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 새 세션이 Core 완료 상태를 재현하고 Plugin P01부터 안전하게 병렬 작업할 수 있는 최신 프로그램 handoff와 복사용 프롬프트를 만든다.

**Architecture:** 변하는 진입점 `current-status.md`와 불변 Core 완료 체크포인트를 분리하고, 과거 handoff에는 최신 문서 포인터만 추가한다. 프로그램 authority 문서는 참조만 하며, 루트 에이전트가 공유 파일과 검증·커밋을 소유하고 서브 에이전트는 겹치지 않는 읽기 전용 감사를 병렬 수행한다.

**Tech Stack:** Markdown, Git, Node.js 기반 저장소 검산 스크립트, ripgrep

## Global Constraints

- 기존 `session-handoff-2026-08-08.md`의 실제 사고 9개와 공식 문서 오류·probe 차이를 삭제하거나 교정하지 않는다.
- `master-page-inventory.md`, `core-learning-curriculum.md`, `plugin-learning-curriculum.md`의 ownership을 변경하지 않는다.
- Plugin 구현·source manifest·route를 미리 만들지 않는다.
- 자동화 테스트 코드와 테스트 실행 환경을 추가하지 않는다.
- 병렬 에이전트는 읽기 전용으로 서로 다른 근거를 감사하고, 루트 에이전트만 프로그램 문서를 수정·커밋한다.
- 새 프롬프트는 공유 파일을 한 루트 에이전트만 수정하고 페이지 전용 폴더만 병렬 작성하게 명시한다.

---

### Task 1: 현재 상태 근거 수집

**Files:**
- Read: `docs/handoffs/gsap/_program/master-page-inventory.md`
- Read: `docs/handoffs/gsap/_program/core-learning-curriculum.md`
- Read: `docs/handoffs/gsap/_program/plugin-learning-curriculum.md`
- Read: `docs/handoffs/gsap/core/*.md`
- Read: `src/app/routes.ts`
- Read: Git history and status

**Interfaces:**
- Consumes: 저장소의 현재 HEAD와 authority 문서
- Produces: Core 완료·Plugin 잔여·검증·commit·`DEFERRED`의 검증된 숫자와 다음 P01 identity

- [ ] **Step 1: Core 40개 구현 대응을 검산한다**

Run a Node script that parses the 40 `core:*` inventory rows and checks `src/content/gsap/fundamentals/<slug>`, `docs/handoffs/gsap/core/<slug>.md`, lazy import, and lesson registration.

- [ ] **Step 2: Plugin 46개와 P01을 검산한다**

Parse the 46 `plugin:P*` inventory rows and confirm P01 is `plugins`, route `/fundamentals/plugins`, primary `source:plugins-overview`, owned source count 1.

- [ ] **Step 3: 두 읽기 전용 감사를 병렬 실행한다**

One agent audits Core 40 completion, recent commits, release decisions, and browser deferrals. A second agent audits Plugin 46 ownership, P01 prerequisites, and parallelizable boundaries. Neither agent edits files.

### Task 2: 최신 진입점과 불변 체크포인트 작성

**Files:**
- Create: `docs/handoffs/gsap/_program/current-status.md`
- Create: `docs/handoffs/gsap/_program/session-handoff-2026-08-08-core-complete.md`

**Interfaces:**
- Consumes: Task 1의 검산 결과
- Produces: 새 세션의 단일 진입점, Core 완료 시점의 재현 가능한 증거, 복사용 Plugin 시작 프롬프트

- [ ] **Step 1: `current-status.md`를 작성한다**

Record document authority, current baseline commit, Core 40/40, Plugin 0/46, browser deferrals, mandatory read order, next P01 identity, page-level workflow, parallel ownership rules, shared-file integration sequence, and a copy-ready Korean prompt.

- [ ] **Step 2: Core 완료 체크포인트를 작성한다**

Record the 16 core:25–40 page commits, 40/40 content/handoff/route audit, latest TypeScript/Vite/Storybook evidence, official-error preservation pointer, deferred browser boundary, working-tree state, and exact next-session start conditions.

### Task 3: 과거 handoff에 최신 포인터 추가

**Files:**
- Modify: `docs/handoffs/gsap/_program/session-handoff-2026-08-08.md`

**Interfaces:**
- Consumes: Task 2의 두 새 문서 경로
- Produces: 과거 상태를 현재 상태로 오인하지 않게 하는 상단 경고

- [ ] **Step 1: 제목 아래에 역사적 상태 경고를 추가한다**

Add a compact block that states the document captures the state before Core completion, links `current-status.md` and `session-handoff-2026-08-08-core-complete.md`, and requires preserving the accident/error sections below.

- [ ] **Step 2: 기존 본문이 보존됐는지 확인한다**

Use `git diff` to ensure only the top warning block changed and all nine accident headings plus the official-error table remain intact.

### Task 4: 문서 검증과 커밋

**Files:**
- Verify: all three program handoff files
- Commit: documentation changes from Tasks 2–3

**Interfaces:**
- Consumes: completed documentation diff
- Produces: clean, committed, new-session-ready handoff state

- [ ] **Step 1: 링크와 숫자를 재검산한다**

Run `rg`, Node, and filesystem checks for the three document links, Core 40/40, Plugin 46, P01 identity, 16 commit hashes, and allowed release/deferred claims.

- [ ] **Step 2: 문서 품질을 확인한다**

Run placeholder scan, `git diff --check`, scoped diff inspection, and confirm no source or route file changed.

- [ ] **Step 3: 문서 변경을 커밋한다**

```bash
git add docs/handoffs/gsap/_program/current-status.md docs/handoffs/gsap/_program/session-handoff-2026-08-08-core-complete.md docs/handoffs/gsap/_program/session-handoff-2026-08-08.md
git commit -m "docs: hand off completed GSAP core curriculum"
```

- [ ] **Step 4: 최종 상태를 확인한다**

Run `git status --short`, `git log -2 --oneline`, and re-read the copy-ready prompt from `current-status.md`.
