# GSAP N:1 Learning-Page Workflow Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 공식 기술 source 364개를 개별 추적하면서 관련 source를 `gsap.to()` 수준의 주제형 학습 페이지로 묶을 수 있도록 프로젝트 규칙 전체를 N:1 계약으로 바꾼다.

**Architecture:** master inventory는 공식 `sourcePage`의 유일한 등록부이고, 학습 페이지 handoff는 하나의 `primary`와 여러 `related` source를 완전히 소유한다. 모든 기술 주장은 namespaced `sourceItemId`로 로컬 근거에 연결하며, Scope Cohesion·revision 일치·독립 release `PASS` 전에는 route/catalog에 등록하지 않는다.

**Tech Stack:** Markdown project governance, React 19, TypeScript, GSAP 3, Vite, Storybook

## Global Constraints

- 공식 source page 364개와 그 기술 item은 축소·합성·삭제하지 않는다.
- 한 공식 source page는 정확히 하나의 `ownerLearningPageId`를 가진다.
- `related` ownership도 `primary`와 동일한 100% manifest·coverage 책임을 가진다.
- 일반 참고 링크는 `referenceSourcePageIds`에 기록하며 coverage로 인정하지 않는다.
- 모든 학습 페이지는 현재 `gsap.to()`와 동등한 초보자 설명과 상세 예제 품질을 충족한다.
- 자동화 테스트 코드, 테스트 러너, 테스트 전용 의존성을 추가하지 않는다.
- 비애니메이션 utility에 장식용 Tween이나 animation Hook을 추가하지 않는다.
- 미해결 `BLOCK`, stale revision, 모호한 근거가 있으면 route/catalog에 등록하지 않는다.

---

### Task 1: Source identity와 N:1 handoff 계약

**Files:**
- Modify: `docs/workflows/source-coverage.md`
- Modify: `docs/workflows/context-handoff.md`

**Interfaces:**
- Consumes: `docs/superpowers/specs/2026-08-02-gsap-n-to-one-learning-pages-design.md`
- Produces: `sourcePageId`, `sourceItemId`, `learningPageId`, ownership, revision, completeness, handoff field 계약

- [ ] **Step 1: `source-coverage.md`에 source/learning identity와 소유권을 정의한다.**

  `source:<canonical-key>`와 `<sourcePageId>#<semantic-item-key>` 형식, 한 source의 고유 owner, `primary | related`와 non-owning reference 구분을 명시한다.

- [ ] **Step 2: coverage와 revision 수식을 고정한다.**

  source item·source page·learning page·program 순서로 100%를 판정하고, `mappedSourceRevision !== sourceRevision`이면 `BLOCK`하도록 작성한다.

- [ ] **Step 3: `context-handoff.md`를 N:1 입력·구현·검수 계약으로 바꾼다.**

  `learningPage`, `primarySourcePageId`, `ownedSourcePages[]`, `referenceSourcePageIds[]`, `mergeRationale`, namespaced manifest/coverage, `exampleContracts[].coveredSourceItemIds`, completeness와 released revision 필드를 빠짐없이 기록한다.

- [ ] **Step 4: schema 용어를 확인한다.**

  Run: `rg -n "sourcePageId|sourceItemId|learningPageId|primarySourcePageId|ownedSourcePages|mappedSourceRevision|releasedSourceRevisions" docs/workflows/source-coverage.md docs/workflows/context-handoff.md`

  Expected: 두 문서에서 같은 이름과 의미로 모든 필드가 발견되고 singular `officialPage`가 현재 계약으로 남지 않는다.

- [ ] **Step 5: 변경을 커밋한다.**

  Run: `git add docs/workflows/source-coverage.md docs/workflows/context-handoff.md && git commit -m "docs: define N-to-one GSAP source ownership"`

### Task 2: 학습 페이지 폴더와 Scope Cohesion 규칙

**Files:**
- Modify: `docs/project-structure.md`
- Modify: `docs/workflows/page-format.md`

**Interfaces:**
- Consumes: Task 1 identity/ownership schema
- Produces: visible learning-page folder boundary, source index, module union, split guardrails

- [ ] **Step 1: 공식 문서 1:1 폴더 규칙을 source-exhaustive N:1 규칙으로 바꾼다.**

  한 폴더·route·handoff가 하나의 visible learning page이며 하나 이상의 source page를 소유할 수 있다고 명시한다. metadata/header는 owned official sources와 대조일을 열거한다.

- [ ] **Step 2: 섹션과 예제 경계를 보존한다.**

  섹션은 학습 질문을 따르고 여러 source item을 묶을 수 있으며, execution source 선택표와 runtime/display 동기화 규칙은 유지한다.

- [ ] **Step 3: Scope Cohesion 허용·분리 조건을 추가한다.**

  하나의 중심 질문·공유 멘탈 모델·설정/수명주기·명확한 evidence가 모두 있어야 병합하고, 독립 질문·환경·cleanup·과도한 generic runtime·접근성/성능 실패가 있으면 `OVERSIZED_PAGE`로 분리한다.

- [ ] **Step 4: 구조 용어를 확인한다.**

  Run: `rg -n "visible|학습 페이지|owned|Scope Cohesion|OVERSIZED_PAGE|source index|sourcePage" docs/project-structure.md docs/workflows/page-format.md`

  Expected: 두 문서가 N:1 폴더 경계와 split 기준을 설명하고 “공식 문서 하나당 폴더 하나”를 요구하지 않는다.

- [ ] **Step 5: 변경을 커밋한다.**

  Run: `git add docs/project-structure.md docs/workflows/page-format.md && git commit -m "docs: define grouped GSAP learning pages"`

### Task 3: Workflow와 독립 품질 게이트

**Files:**
- Modify: `docs/workflows/README.md`
- Modify: `docs/workflows/quality-gates.md`

**Interfaces:**
- Consumes: Tasks 1-2 contracts
- Produces: source inventory → ownership → cohesion → implementation → review → registration sequence

- [ ] **Step 1: README workflow 순서를 N:1 단계로 교체한다.**

  inventory/revision 확인, 고유 ownership, Scope Cohesion, handoff, learner flow/coverage, 구현, 독립 검수, Cross-page Consistency, fix loop, independent release, PASS 후 등록 순서를 작성한다.

- [ ] **Step 2: quality gate를 per-source 판정으로 강화한다.**

  Official Coverage는 source별 item 판정 후 learning-page 집계를 내고, N:1 페이지의 Cross-page Consistency를 필수로 만든다.

- [ ] **Step 3: 즉시 BLOCK 조건을 추가한다.**

  duplicate/missing ownership, ambiguous evidence, stale revision, `OVERSIZED_PAGE`, count-only completion을 `BLOCK`으로 명시한다.

- [ ] **Step 4: workflow 순서를 확인한다.**

  Run: `rg -n "master inventory|ownership|Scope Cohesion|Cross-page Consistency|release|catalog|route|BLOCK" docs/workflows/README.md docs/workflows/quality-gates.md`

  Expected: PASS 전 route/catalog 등록 금지와 Integrator-only fix loop가 모두 발견된다.

- [ ] **Step 5: 변경을 커밋한다.**

  Run: `git add docs/workflows/README.md docs/workflows/quality-gates.md && git commit -m "docs: add N-to-one GSAP quality gates"`

### Task 4: 프로젝트 진입 지침과 제작 스킬 동기화

**Files:**
- Modify: `AGENTS.md`
- Modify: `.agents/skills/creating-gsap-learning-pages/SKILL.md`

**Interfaces:**
- Consumes: Tasks 1-3 authoritative workflow docs
- Produces: 새 세션이 N:1 계약과 gsap.to 품질 기준을 발견하는 진입점

- [ ] **Step 1: `AGENTS.md` 참조와 구현 금지선을 갱신한다.**

  구현 전 master inventory와 learning-page handoff를 읽고 ownership/manifest를 임의로 바꾸지 않도록 명시한다. 예제 주석 범위를 animation Hook뿐 아니라 `use*Runtime.ts`와 `*.example.ts`까지 확장한다.

- [ ] **Step 2: 제작 스킬의 최상위 완료 조건과 workflow를 N:1로 교체한다.**

  364 source identity 보존, owned source 전수 변환, Scope Cohesion, namespaced coverage, revision, unique ownership, PASS 후 등록을 명시한다.

- [ ] **Step 3: 스킬의 즉시 BLOCK과 release 증거를 동기화한다.**

  누락/중복 ownership, stale revision, oversized merge, 얕은 related coverage, generic runtime, decorative animation, 근거 없는 완료를 BLOCK한다.

- [ ] **Step 4: 진입 문서와 스킬 용어를 확인한다.**

  Run: `rg -n "master inventory|handoff|sourcePageId|sourceItemId|Scope Cohesion|owned|revision|PASS|catalog|route" AGENTS.md .agents/skills/creating-gsap-learning-pages/SKILL.md`

  Expected: 구현 전 입력, 완료 조건, BLOCK 조건, release 순서가 authoritative workflow와 일치한다.

- [ ] **Step 5: 변경을 커밋한다.**

  Run: `git add AGENTS.md .agents/skills/creating-gsap-learning-pages/SKILL.md && git commit -m "docs: adopt grouped GSAP learning workflow"`

### Task 5: 전체 문서 계약 검증

**Files:**
- Verify: `AGENTS.md`
- Verify: `docs/project-structure.md`
- Verify: `docs/workflows/*.md`
- Verify: `.agents/skills/creating-gsap-learning-pages/SKILL.md`

**Interfaces:**
- Consumes: Tasks 1-4
- Produces: 서로 모순되지 않는 N:1 규칙과 기존 앱의 빌드 증거

- [ ] **Step 1: 폐기된 1:1 visible-page 규칙을 검색한다.**

  Run: `rg -n "공식 문서 1:1|공식 페이지 하나|officialPage:|localPage:" AGENTS.md docs/project-structure.md docs/workflows .agents/skills/creating-gsap-learning-pages/SKILL.md`

  Expected: N:1 source identity를 설명하는 역사/대조 문장 외에 현재 규칙으로 남은 결과가 없다.

- [ ] **Step 2: 필수 N:1 용어의 존재를 확인한다.**

  Run: `rg -l "sourcePageId" docs/workflows/source-coverage.md docs/workflows/context-handoff.md .agents/skills/creating-gsap-learning-pages/SKILL.md && rg -l "Scope Cohesion" docs/workflows/page-format.md docs/workflows/quality-gates.md .agents/skills/creating-gsap-learning-pages/SKILL.md`

  Expected: 첫 검색은 3개 파일, 둘째 검색은 3개 파일을 모두 출력한다.

- [ ] **Step 3: Markdown whitespace를 확인한다.**

  Run: `git diff --check`

  Expected: 출력 없이 exit 0.

- [ ] **Step 4: 기존 앱 build를 확인한다.**

  Run: `npm run build`

  Expected: TypeScript와 Vite가 exit 0.

- [ ] **Step 5: 공용 `src/components` UI 변경일 때만 Storybook 통합 빌드를 확인한다.**

  조건: 공용 컴포넌트를 생성·수정했다면 스토리를 추가·갱신한다.

  Run: `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook`

  Expected: Storybook build exit 0. 기존 chunk-size warning은 실패로 판정하지 않는다. 공용 컴포넌트를 바꾸지 않았다면 실행하지 않고 `none: shared component unchanged`를 기록한다.

- [ ] **Step 6: 최종 문서 변경을 커밋한다.**

  Run: `git add AGENTS.md docs/project-structure.md docs/workflows .agents/skills/creating-gsap-learning-pages/SKILL.md && git commit -m "docs: verify N-to-one GSAP workflow"`
