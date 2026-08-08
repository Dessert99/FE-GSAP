# GSAP Plugin First Wave Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Core lesson 순서를 curriculum과 맞춘 뒤 Plugin P01~P03을 공식 source 전체 coverage와 독립 release 증거를 갖춘 학습 페이지로 구현한다.

**Architecture:** 서로 겹치지 않는 category/slug content 폴더와 page handoff를 세 worker가 병렬 소유한다. 루트 에이전트만 `src/app/routes.ts`, 프로그램 상태 문서, 전체 build와 Git commit을 수정하며 P01, P02, P03 순서로 하나씩 통합한다.

**Tech Stack:** React 19, TypeScript 5.9, GSAP 3.15, `@gsap/react`, Vite 8, Storybook 10, CSS, Markdown handoff

## Global Constraints

- 구현 전에 `AGENTS.md`, `docs/project-structure.md`, `docs/workflows/README.md`와 연결된 다섯 계약을 읽는다.
- 공식 rendered/raw source를 각각 최소 두 번 대조하고 heading, signature, parameter, return, note와 example을 직접 센다.
- 공식 문서가 침묵하며 틀리면 학습 오류가 되는 동작만 설치본 GSAP 3.15로 probe한다.
- page TSX는 조립, section은 학습 단위, example runtime은 plugin 호출과 lifecycle을 소유한다.
- controls, 실제 plugin 입력, 관찰 상태와 표시 코드는 하나의 descriptor나 runtime snapshot에서 파생한다.
- `examples/`와 `use*Animation.ts`의 모든 선언·실행 단계에는 역할과 이유를 설명하는 한 줄 한국어 주석을 둔다.
- 자동화 테스트 파일, 테스트 러너와 테스트 전용 의존성을 추가하지 않는다.
- 브라우저 키보드 조작, 실제 reduced-motion 전환, 320/390px layout, control 실조작만 `DEFERRED`로 남긴다.
- worker는 배정된 content 폴더와 handoff 한 파일만 수정하며 route, 프로그램 문서, 공용 UI와 Git을 수정하지 않는다.
- 루트는 worker가 쓰기를 멈춘 뒤에만 전체 TypeScript·Vite·Storybook을 실행한다.
- 페이지마다 handoff, page folder와 route 등록을 한 커밋으로 남긴다.

---

### Task 1: Core lesson 순서 drift 수정

**Files:**
- Modify: `src/app/routes.ts:204-226`

**Interfaces:**
- Consumes: master inventory의 `core:20 reusable-effects`, `core:24 gsap-root-clock`
- Produces: `tracks[0].lessons`가 core:01~core:40 curriculum 순서를 따르는 Plugin 작업 기준선

- [ ] **Step 1: 현재 순서가 authority와 다른지 실패 검산한다**

Run:

```bash
node - <<'NODE'
const fs = require('node:fs')
const source = fs.readFileSync('src/app/routes.ts', 'utf8')
const reusable = source.indexOf("slug: 'reusable-effects'")
const rootClock = source.indexOf("slug: 'gsap-root-clock'")
if (reusable < 0 || rootClock < 0) throw new Error('lesson entry missing')
if (reusable < rootClock) process.exit(0)
throw new Error('reusable-effects must precede gsap-root-clock')
NODE
```

Expected: FAIL with `reusable-effects must precede gsap-root-clock`.

- [ ] **Step 2: lesson entry 두 개의 위치만 바꾼다**

Move this existing entry:

```ts
{ slug: 'reusable-effects', title: '재사용 가능한 effect', group: '트윈 구성', Page: ReusableEffectsPage },
```

to immediately after `high-frequency-updates`, before `gsap-root-clock`. Do not move lazy imports or rename groups.

- [ ] **Step 3: 순서 검산을 다시 실행한다**

Run the Step 1 Node command.

Expected: exit 0.

- [ ] **Step 4: 전체 기준선을 검증한다**

Run:

```bash
npx tsc --noEmit
npm run build
npm run build-storybook
git diff --check
```

Expected: all exit 0; Vite and Storybook include the existing 40 Core pages.

- [ ] **Step 5: 순서 수정만 커밋한다**

```bash
git add src/app/routes.ts
git commit -m "fix: align core lesson order"
```

### Task 2: P01 Plugins overview page-local delivery

**Files:**
- Create: `src/content/gsap/plugins/plugins/PluginsPage.tsx`
- Create: `src/content/gsap/plugins/plugins/PluginsPage.css`
- Create: `src/content/gsap/plugins/plugins/plugins.meta.ts`
- Create: `src/content/gsap/plugins/plugins/plugins.catalog.ts`
- Create: `src/content/gsap/plugins/plugins/components/PageCoverage/PageCoverage.tsx`
- Create: `src/content/gsap/plugins/plugins/components/SectionHeading/SectionHeading.tsx`
- Create: `src/content/gsap/plugins/plugins/examples/RegistrationDiagnostic/RegistrationDiagnostic.tsx`
- Create: `src/content/gsap/plugins/plugins/examples/RegistrationDiagnostic/RegistrationDiagnostic.css`
- Create: `src/content/gsap/plugins/plugins/examples/RegistrationDiagnostic/useRegistrationDiagnosticAnimation.ts`
- Create: `src/content/gsap/plugins/plugins/sections/PluginMentalModelSection/PluginMentalModelSection.tsx`
- Create: `src/content/gsap/plugins/plugins/sections/LoadRegisterSection/LoadRegisterSection.tsx`
- Create: `src/content/gsap/plugins/plugins/sections/VarsExtensionSection/VarsExtensionSection.tsx`
- Create: `src/content/gsap/plugins/plugins/sections/PluginFamiliesSection/PluginFamiliesSection.tsx`
- Create: `src/content/gsap/plugins/plugins/sections/BoundariesSection/BoundariesSection.tsx`
- Create: `docs/handoffs/gsap/plugins/plugins.md`

**Interfaces:**
- Consumes: official catalog #17 `https://gsap.com/docs/v3/Plugins/`, core Installation, `gsap.registerPlugin()`, `gsap.to()`
- Produces: `PluginsPage` named export, route slug `plugins`, item-level official catalog and `PASS`-ready page handoff

- [ ] **Step 1: official source와 실행 경계를 고정한다**

Read the rendered page and raw source twice. Record every technical heading, plugin family, core-included/separate distinction, import/script-tag availability, registration/tree-shaking statement, vars extension statement, dependency boundary and official example as unique `PLUG-*` items in `docs/handoffs/gsap/plugins/plugins.md`.

Use TextPlugin only as the registration diagnostic's concrete imported plugin because it ships with the installed GSAP package and is not otherwise owned by P02/P03. P01 explains registration state only; TextPlugin option semantics remain owned by its later page.

- [ ] **Step 2: handoff의 구현 전 계약을 완성한다**

Fill `officialPage`, `localPage`, `sourceManifest`, `sourceBlockers`, `moduleSelection`, `learnerFlow`, planned `coverageMap`, `relatedPages`, `exactFiles`, `exampleContracts`, `nonGoals` and `preserve` using the workflow field names.

The learner flow is:

1. plugin이 core에 새 vars 해석기를 붙이는 mental model
2. load와 register의 서로 다른 역할
3. vars property가 plugin으로 전달되는 경계
4. core-included, standalone, dependent, third-party 선택표
5. bundler, SSR, 재등록과 cleanup 경계

- [ ] **Step 3: meta, catalog와 page shell을 구현한다**

`plugins.catalog.ts` contains every verified `PLUG-*` item with `origin: 'official'`. `plugins.meta.ts` exposes title, category, summary, source path, reviewed date, official source, five section definitions and exact coverage denominators. `PluginsPage.tsx` only assembles the header, `PageCoverage` and five sections.

- [ ] **Step 4: 등록 진단 example을 구현한다**

`useRegistrationDiagnosticAnimation.ts` imports `gsap`, `useGSAP` and `TextPlugin`. It owns a descriptor with module path, registry name, vars key and sample value; detects registry state, registers only from the explicit control, creates the replayable demonstration after registration, kills/reverts it on cleanup, and uses duration 0 under reduced motion.

`RegistrationDiagnostic.tsx` renders the load → register → vars flow, native button controls, discrete status text, preview and code serialized only from the runtime descriptor/snapshot. It does not import GSAP or reconstruct plugin meaning.

- [ ] **Step 5: sections와 CSS를 구현한다**

Define terms before the diagnostic. Keep individual plugin APIs out of P01, link only to routes already registered, preserve readable content when animation is disabled, and make narrow layouts wrap without horizontal page overflow.

- [ ] **Step 6: page-local 정적 검산을 수행한다**

Check catalog/meta/handoff official item counts, duplicate IDs, coverage status, missing imports, GSAP imports outside the runtime, all example/runtime declaration comments, live regions and unreleased internal links. Record perspective findings; leave route/build as `BLOCK` pending root integration and only the four approved browser checks as `DEFERRED`.

### Task 3: P02 CSSRulePlugin page-local delivery

**Files:**
- Create: `src/content/gsap/plugins-uncategorized/css-rule-plugin/CssRulePluginPage.tsx`
- Create: `src/content/gsap/plugins-uncategorized/css-rule-plugin/CssRulePluginPage.css`
- Create: `src/content/gsap/plugins-uncategorized/css-rule-plugin/css-rule-plugin.meta.ts`
- Create: `src/content/gsap/plugins-uncategorized/css-rule-plugin/css-rule-plugin.catalog.ts`
- Create: `src/content/gsap/plugins-uncategorized/css-rule-plugin/css-rule-plugin.properties.ts`
- Create: `src/content/gsap/plugins-uncategorized/css-rule-plugin/components/PageCoverage/PageCoverage.tsx`
- Create: `src/content/gsap/plugins-uncategorized/css-rule-plugin/components/SectionHeading/SectionHeading.tsx`
- Create: `src/content/gsap/plugins-uncategorized/css-rule-plugin/examples/SharedRuleLab/SharedRuleLab.tsx`
- Create: `src/content/gsap/plugins-uncategorized/css-rule-plugin/examples/SharedRuleLab/SharedRuleLab.css`
- Create: `src/content/gsap/plugins-uncategorized/css-rule-plugin/examples/SharedRuleLab/useSharedRuleAnimation.ts`
- Create: `src/content/gsap/plugins-uncategorized/css-rule-plugin/sections/RuleTargetSection/RuleTargetSection.tsx`
- Create: `src/content/gsap/plugins-uncategorized/css-rule-plugin/sections/GetRuleSection/GetRuleSection.tsx`
- Create: `src/content/gsap/plugins-uncategorized/css-rule-plugin/sections/SharedEffectSection/SharedEffectSection.tsx`
- Create: `src/content/gsap/plugins-uncategorized/css-rule-plugin/sections/FailureMatrixSection/FailureMatrixSection.tsx`
- Create: `src/content/gsap/plugins-uncategorized/css-rule-plugin/sections/AlternativesSection/AlternativesSection.tsx`
- Create: `docs/handoffs/gsap/plugins-uncategorized/css-rule-plugin.md`

**Interfaces:**
- Consumes: official catalog #18 CSSRulePlugin and #19 `CSSRulePlugin.getRule()`, registered P01 route, CSS selectors/rules and CSSPlugin prerequisite
- Produces: `CssRulePluginPage` named export, route slug `css-rule-plugin`, two-canonical item catalog and `PASS`-ready page handoff

- [ ] **Step 1: 두 canonical source를 각각 두 번 대조한다**

Record plugin purpose, registration, `cssRule` vars contract, proxy style behavior, selector form, `getRule(rule: string): CSSStyleDeclaration | null`, pseudo-element normalization, rule search behavior, cross-origin CSSOM constraints, official examples, warnings and alternative guidance as unique `CSSRULE-*` items. Do not infer return/null or deprecation guidance from memory.

- [ ] **Step 2: handoff의 구현 전 계약을 완성한다**

Use the exact workflow fields and map every item to:

1. element style과 shared rule 차이
2. `getRule()` lookup·return·pseudo selector
3. proxy style object와 `cssRule` vars
4. 여러 card에 공유되는 변화
5. missing selector, inaccessible stylesheet, inline/CSS variable alternative

- [ ] **Step 3: meta, catalog, properties와 page shell을 구현한다**

The property table contains verified signature, target/vars types, default or absence, accepted values, timing, return/null and caveats. Meta section sums, official catalog row count and handoff official denominator must match.

- [ ] **Step 4: shared rule example을 구현한다**

`useSharedRuleAnimation.ts` imports/registers CSSRulePlugin, obtains one same-origin pseudo-element rule with `getRule()`, builds one normalized descriptor from selector/color/size controls, applies a tween through `{ cssRule: descriptor.vars }`, observes the real rule declaration, restores the original declaration and kills/reverts on cleanup. Duration is 0 under reduced motion.

`SharedRuleLab.tsx` shows several cards controlled by one stylesheet rule but asks one question: why all cards change together. It serializes the same descriptor, uses native labels/controls and keeps continuous values outside live regions.

- [ ] **Step 5: failure matrix와 alternative 경계를 구현한다**

Explain missing selector, inaccessible cross-origin stylesheet and browser CSSOM-only behavior without attempting unsafe runtime failures. Preserve any official warning or recommendation exactly as verified; do not upgrade a recommendation into an absolute rule.

- [ ] **Step 6: page-local 정적 검산을 수행한다**

Check two canonical ownership sets, item counts, property rows, duplicate IDs, imports, cleanup paths, runtime/display derivation, comments, accessibility and P01 link boundary. Record route/build as pending `BLOCK` and only approved browser items as `DEFERRED`.

### Task 4: P03 Draggable create page-local delivery

**Files:**
- Create: `src/content/gsap/ui/draggable-create/DraggableCreatePage.tsx`
- Create: `src/content/gsap/ui/draggable-create/DraggableCreatePage.css`
- Create: `src/content/gsap/ui/draggable-create/draggable-create.meta.ts`
- Create: `src/content/gsap/ui/draggable-create/draggable-create.catalog.ts`
- Create: `src/content/gsap/ui/draggable-create/draggable-create.properties.ts`
- Create: `src/content/gsap/ui/draggable-create/components/PageCoverage/PageCoverage.tsx`
- Create: `src/content/gsap/ui/draggable-create/components/SectionHeading/SectionHeading.tsx`
- Create: `src/content/gsap/ui/draggable-create/examples/InstanceInspectorLab/InstanceInspectorLab.tsx`
- Create: `src/content/gsap/ui/draggable-create/examples/InstanceInspectorLab/InstanceInspectorLab.css`
- Create: `src/content/gsap/ui/draggable-create/examples/InstanceInspectorLab/useInstanceInspectorAnimation.ts`
- Create: `src/content/gsap/ui/draggable-create/sections/InstanceMentalModelSection/InstanceMentalModelSection.tsx`
- Create: `src/content/gsap/ui/draggable-create/sections/CreateSection/CreateSection.tsx`
- Create: `src/content/gsap/ui/draggable-create/sections/LookupIdentitySection/LookupIdentitySection.tsx`
- Create: `src/content/gsap/ui/draggable-create/sections/TargetVarsSection/TargetVarsSection.tsx`
- Create: `src/content/gsap/ui/draggable-create/sections/LifecycleBoundarySection/LifecycleBoundarySection.tsx`
- Create: `docs/handoffs/gsap/ui/draggable-create.md`

**Interfaces:**
- Consumes: official catalog #20, #52, #53, #56, #59; registered P01 route; DOM target, transform and plugin-registration prerequisites
- Produces: `DraggableCreatePage` named export, route slug `draggable-create`, five-canonical catalog and `PASS`-ready page handoff

- [ ] **Step 1: 다섯 canonical source를 각각 두 번 대조한다**

Record the Draggable class purpose and constructor boundary, `Draggable.create(targets, vars)` signature and array return, target normalization, supported `type` values described by the owned source, base vars, instance identity, `Draggable.get(target)`, `target`, normalized `vars`, basic coordinate/lifecycle statements, official examples, notes and links as unique `DRAGCREATE-*` items.

Items owned by P04~P08 remain related boundaries. Do not teach coordinates, bounds, lifecycle methods, gesture events or collision/momentum details beyond the minimum needed to create and clean up this instance.

- [ ] **Step 2: handoff의 구현 전 계약을 완성한다**

Map every item into:

1. target에 연결된 Draggable instance mental model
2. `create()` input and array return
3. `get()` lookup identity
4. `target` and normalized `vars` inspector
5. user-driven drag and `kill()` cleanup boundary

- [ ] **Step 3: meta, catalog, properties와 page shell을 구현한다**

The properties data covers only owned `target`, `vars` and the creation vars explicitly required by the five canonicals. Related Draggable APIs are links/boundaries, not duplicated reference ownership.

- [ ] **Step 4: instance inspector example을 구현한다**

`useInstanceInspectorAnimation.ts` imports/registers Draggable and owns target ref, `type` control, one creation descriptor, the single created instance, lookup result and inspector snapshot. Recreate on descriptor changes with `revertOnUpdate`, call `kill()` during cleanup and make reset instant under reduced motion.

`InstanceInspectorLab.tsx` renders one keyboard-focusable draggable card, type selector, explicit reset, instance identity, target and vars inspector, and code formatted only from the descriptor/snapshot. Native click/focus behavior remains usable; no frame-by-frame live announcement is allowed.

- [ ] **Step 5: sections와 downstream boundaries를 구현한다**

Define instance and target before use. Explain why create returns an array, when `get()` is useful and which later pages own coordinate, bounds, lifecycle, events and collision concerns. Link only to P01 because P04~P08 are not registered yet.

- [ ] **Step 6: page-local 정적 검산을 수행한다**

Check five canonical ownership sets, item counts, property rows, duplicate IDs, Draggable cleanup, descriptor synchronization, comments, focus semantics, continuous status behavior and unreleased links. Record route/build as pending `BLOCK` and only approved browser items as `DEFERRED`.

### Task 5: P01 root integration and release

**Files:**
- Modify: `src/app/routes.ts`
- Modify: `docs/handoffs/gsap/plugins/plugins.md`
- Verify: `src/content/gsap/plugins/plugins/`

**Interfaces:**
- Consumes: Task 2 `PluginsPage` and page handoff
- Produces: released `/fundamentals/plugins` lesson and page-level commit

- [ ] **Step 1: worker 결과를 독립적으로 재검산한다**

Re-read the official source evidence and compare source manifest, catalog, meta section sums and coverage map. Inspect every changed source file for runtime/display, comments, imports, accessibility and motion boundaries. Fix only P01 files and preserve finding history.

- [ ] **Step 2: P01 route를 등록한다**

Add a lazy `PluginsPage` import from `../content/gsap/plugins/plugins/PluginsPage` and append this lesson after Core 40:

```ts
{ slug: 'plugins', title: 'Plugin 불러오기와 등록', group: 'Plugin 기초', Page: PluginsPage },
```

- [ ] **Step 3: 전체 검증을 실행한다**

```bash
npx tsc --noEmit
npm run build
npm run build-storybook
git diff --check
```

Expected: all exit 0 and both production outputs contain a `PluginsPage` chunk.

- [ ] **Step 4: P01 handoff를 실제 증거로 갱신한다**

Change route/build findings from `BLOCK` to `PASS` only with command output and chunk evidence. Keep approved browser items `DEFERRED`; set `releaseDecision` to `PASS` only when no other blocker remains.

- [ ] **Step 5: P01을 커밋한다**

```bash
git add src/content/gsap/plugins/plugins docs/handoffs/gsap/plugins/plugins.md src/app/routes.ts
git commit -m "feat: add plugins overview lesson"
```

### Task 6: P02 root integration and release

**Files:**
- Modify: `src/app/routes.ts`
- Modify: `docs/handoffs/gsap/plugins-uncategorized/css-rule-plugin.md`
- Verify: `src/content/gsap/plugins-uncategorized/css-rule-plugin/`

**Interfaces:**
- Consumes: Task 3 `CssRulePluginPage`, P01 registered route
- Produces: released `/fundamentals/css-rule-plugin` lesson and page-level commit

- [ ] **Step 1: source, coverage, runtime과 CSSOM cleanup을 재검산한다**

Confirm the two canonical source sets are complete, all properties match verified official wording, the example targets a same-origin rule, original declarations restore on every cleanup path and displayed code uses the runtime descriptor.

- [ ] **Step 2: P02 route를 등록한다**

Add a lazy import from `../content/gsap/plugins-uncategorized/css-rule-plugin/CssRulePluginPage` and append:

```ts
{ slug: 'css-rule-plugin', title: 'CSS rule 함께 움직이기', group: 'Plugin 기초', Page: CssRulePluginPage },
```

- [ ] **Step 3: 전체 검증과 handoff release 갱신을 수행한다**

Run TypeScript, Vite, Storybook and `git diff --check`; require a `CssRulePluginPage` chunk in both builds. Update findings with actual evidence and keep only approved browser checks `DEFERRED`.

- [ ] **Step 4: P02를 커밋한다**

```bash
git add src/content/gsap/plugins-uncategorized/css-rule-plugin docs/handoffs/gsap/plugins-uncategorized/css-rule-plugin.md src/app/routes.ts
git commit -m "feat: add css rule plugin lesson"
```

### Task 7: P03 root integration and release

**Files:**
- Modify: `src/app/routes.ts`
- Modify: `docs/handoffs/gsap/ui/draggable-create.md`
- Verify: `src/content/gsap/ui/draggable-create/`

**Interfaces:**
- Consumes: Task 4 `DraggableCreatePage`, P01 registered route
- Produces: released `/fundamentals/draggable-create` lesson and page-level commit

- [ ] **Step 1: source, coverage, instance ownership과 cleanup을 재검산한다**

Confirm five canonical sets are complete, downstream API ownership is not duplicated, create/get/target/vars claims match official source, only one instance exists per descriptor and every lifecycle path calls `kill()`.

- [ ] **Step 2: P03 route를 등록한다**

Add a lazy import from `../content/gsap/ui/draggable-create/DraggableCreatePage` and append:

```ts
{ slug: 'draggable-create', title: 'Draggable instance 만들기', group: 'Draggable', Page: DraggableCreatePage },
```

- [ ] **Step 3: 전체 검증과 handoff release 갱신을 수행한다**

Run TypeScript, Vite, Storybook and `git diff --check`; require a `DraggableCreatePage` chunk in both builds. Update findings with actual evidence and keep only approved browser checks `DEFERRED`.

- [ ] **Step 4: P03을 커밋한다**

```bash
git add src/content/gsap/ui/draggable-create docs/handoffs/gsap/ui/draggable-create.md src/app/routes.ts
git commit -m "feat: add draggable creation lesson"
```

### Task 8: First wave cross-page handoff

**Files:**
- Modify: `docs/handoffs/gsap/_program/current-status.md`
- Create: `docs/handoffs/gsap/_program/session-handoff-2026-08-08-plugin-wave-01.md`

**Interfaces:**
- Consumes: released P01~P03 commits and three page handoffs
- Produces: Plugin 3/46, canonical 8/205 status and P04~P06 next-wave entrypoint

- [ ] **Step 1: 세 페이지의 cross-page 일관성을 검산한다**

Check route order P01→P02→P03, P01 registration vocabulary, P02/P03 prerequisite links, no links to P04~P08, category paths, unique source ownership, unique finding IDs and `releaseDecision PASS` for all three pages.

- [ ] **Step 2: 프로그램 수량을 재현한다**

Parse master inventory rows and confirm:

```text
Core pages 40/40, canonical 159/159
Plugin pages 3/46, canonical 8/205
Total pages 43/86, canonical 167/364
Next wave P04 draggable-coordinates, P05 draggable-bounds-axis, P06 draggable-lifecycle
```

- [ ] **Step 3: 프로그램 handoff를 갱신한다**

Record current HEAD, the four commits from Tasks 1 and 5~7, fresh module counts/chunk evidence, browser `DEFERRED` file count, advisory/blocker status and exact P04~P06 identities. Preserve prior historical handoffs.

- [ ] **Step 4: 최종 검증을 다시 실행한다**

```bash
npx tsc --noEmit
npm run build
npm run build-storybook
git diff --check
git status --short
```

Expected: builds exit 0; only the two program handoff files are uncommitted before staging.

- [ ] **Step 5: wave handoff를 커밋한다**

```bash
git add docs/handoffs/gsap/_program/current-status.md docs/handoffs/gsap/_program/session-handoff-2026-08-08-plugin-wave-01.md
git commit -m "docs: hand off first plugin wave"
```

- [ ] **Step 6: 최종 저장소 상태를 확인한다**

```bash
git status --short --branch
git log -7 --oneline
git rev-list --left-right --count origin/main...HEAD
```

Expected: clean worktree; local branch contains the design, plan, route-order, P01, P02, P03 and wave-handoff commits not yet pushed unless the user separately requests a push.
