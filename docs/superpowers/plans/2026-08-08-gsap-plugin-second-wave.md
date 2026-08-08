# GSAP Plugin Second Wave Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement page-local tasks. The root integrator owns shared files, verification, and Git.

**Goal:** Plugin P04~P06을 공식 source 전체 coverage와 release 증거를 갖춘 Draggable 학습 페이지로 구현한다.

**Architecture:** P04, P05, P06은 서로 겹치지 않는 `src/content/gsap/ui/<slug>/`와 page handoff 한 파일만 병렬로 작성한다. 루트 에이전트가 결과를 직접 검수한 뒤 `src/app/routes.ts`를 P04 → P05 → P06 순서로 수정하고 페이지마다 TypeScript, Vite, Storybook을 통과시켜 커밋한다.

**Tech Stack:** React 19, TypeScript 5.9, GSAP 3.15 Draggable, `@gsap/react`, Vite 8, Storybook 10, CSS, Markdown handoff

## Global constraints

- 구현 전 `AGENTS.md`, `docs/project-structure.md`, `docs/workflows/README.md`와 연결된 계약을 읽는다.
- P03 `draggable-create` 구현과 handoff를 prerequisite pattern으로 읽되, create/get/target/vars 소유권을 중복하지 않는다.
- 각 canonical의 rendered 공식 페이지와 raw/installed source를 최소 두 번 대조하고 heading, signature, parameter, return, note, example을 item 단위로 기록한다.
- page TSX는 조립, section은 학습 단위, `use*Animation.ts`는 Draggable 호출과 lifecycle을 소유한다.
- controls, 실제 Draggable 입력, 관찰 상태와 표시 코드는 하나의 descriptor/runtime snapshot에서 파생한다.
- `examples/`와 `use*Animation.ts`의 모든 선언·실행 단계에는 역할과 이유를 설명하는 한 줄 한국어 주석을 둔다.
- 연속 좌표는 live region 밖에 두고 press/release/command 같은 이산 상태만 알린다.
- 자동화 테스트 파일, 테스트 러너, 테스트 전용 의존성을 추가하지 않는다.
- worker는 배정된 content 폴더, handoff 한 파일, 배정된 작업 보고서만 수정한다. route, 프로그램 문서, 공용 UI, package 파일과 Git은 수정하지 않는다.
- 페이지 간 링크는 작업 시작 시 등록된 P01 `/fundamentals/plugins`와 P03 `/fundamentals/draggable-create`만 허용한다. P04~P08의 아직 등록되지 않은 경계는 텍스트로만 적는다.
- worker가 모두 쓰기를 멈춘 뒤에만 루트가 전체 build를 실행한다.
- 브라우저 키보드·focus, 실제 reduced-motion, 320/390px layout, 실제 control/drag 조작만 `DEFERRED`로 남긴다.

---

### Task 1: P04 Draggable coordinates page-local delivery

**Files:**

- Create: `src/content/gsap/ui/draggable-coordinates/DraggableCoordinatesPage.tsx`
- Create: `src/content/gsap/ui/draggable-coordinates/DraggableCoordinatesPage.css`
- Create: `src/content/gsap/ui/draggable-coordinates/draggable-coordinates.meta.ts`
- Create: `src/content/gsap/ui/draggable-coordinates/draggable-coordinates.catalog.ts`
- Create: `src/content/gsap/ui/draggable-coordinates/draggable-coordinates.properties.ts`
- Create: `src/content/gsap/ui/draggable-coordinates/components/PageCoverage/PageCoverage.tsx`
- Create: `src/content/gsap/ui/draggable-coordinates/components/SectionHeading/SectionHeading.tsx`
- Create: `src/content/gsap/ui/draggable-coordinates/examples/CoordinateLab/CoordinateLab.tsx`
- Create: `src/content/gsap/ui/draggable-coordinates/examples/CoordinateLab/CoordinateLab.css`
- Create: `src/content/gsap/ui/draggable-coordinates/examples/CoordinateLab/useCoordinateAnimation.ts`
- Create: `src/content/gsap/ui/draggable-coordinates/sections/CoordinateMentalModelSection/CoordinateMentalModelSection.tsx`
- Create: `src/content/gsap/ui/draggable-coordinates/sections/PhaseSnapshotSection/PhaseSnapshotSection.tsx`
- Create: `src/content/gsap/ui/draggable-coordinates/sections/PointerTargetSection/PointerTargetSection.tsx`
- Create: `src/content/gsap/ui/draggable-coordinates/sections/DirectionRotationSection/DirectionRotationSection.tsx`
- Create: `src/content/gsap/ui/draggable-coordinates/sections/ReadingBoundarySection/ReadingBoundarySection.tsx`
- Create: `docs/handoffs/gsap/ui/draggable-coordinates.md`

**Interfaces:**

- Consumes: official catalog #24, #25, #30, #31, #32, #33, #45, #46, #47, #48, #50, #51, #60, #61; P01 and P03 registered prerequisites
- Produces: `DraggableCoordinatesPage` named export, route slug `draggable-coordinates`, item-level catalog/coverage handoff

- [ ] Verify all fourteen canonical sources separately and preserve target/pointer, start/current/delta/end, translation/rotation, event and timing distinctions.
- [ ] Freeze the handoff with one row per technical item; do not use ranges in `sourceManifest` or `coverageMap`.
- [ ] Implement five sections in this order: coordinate frames → phase snapshots → pointer versus target → direction/rotation → read-only/timing/environment boundaries.
- [ ] Implement one `CoordinateLab` with a translation/rotation descriptor, a draggable puck, press → drag → release phase, target/pointer readouts, release summary, reset and descriptor-derived code.
- [ ] Throttle visual DOM readouts where useful; never put per-frame coordinate values in a live region. Kill the instance and any scheduled update in cleanup; reset immediately.
- [ ] Page-locally verify all item counts, duplicate IDs, imports, comments, cleanup, P01/P03 links and P05~P08 text-only boundaries. Leave route/build `BLOCK` and the approved browser checks `DEFERRED`.

### Task 2: P05 Draggable bounds-axis page-local delivery

**Files:**

- Create: `src/content/gsap/ui/draggable-bounds-axis/DraggableBoundsAxisPage.tsx`
- Create: `src/content/gsap/ui/draggable-bounds-axis/DraggableBoundsAxisPage.css`
- Create: `src/content/gsap/ui/draggable-bounds-axis/draggable-bounds-axis.meta.ts`
- Create: `src/content/gsap/ui/draggable-bounds-axis/draggable-bounds-axis.catalog.ts`
- Create: `src/content/gsap/ui/draggable-bounds-axis/draggable-bounds-axis.properties.ts`
- Create: `src/content/gsap/ui/draggable-bounds-axis/components/PageCoverage/PageCoverage.tsx`
- Create: `src/content/gsap/ui/draggable-bounds-axis/components/SectionHeading/SectionHeading.tsx`
- Create: `src/content/gsap/ui/draggable-bounds-axis/examples/BoundsAxisLab/BoundsAxisLab.tsx`
- Create: `src/content/gsap/ui/draggable-bounds-axis/examples/BoundsAxisLab/BoundsAxisLab.css`
- Create: `src/content/gsap/ui/draggable-bounds-axis/examples/BoundsAxisLab/useBoundsAxisAnimation.ts`
- Create: `src/content/gsap/ui/draggable-bounds-axis/sections/BoundsMentalModelSection/BoundsMentalModelSection.tsx`
- Create: `src/content/gsap/ui/draggable-bounds-axis/sections/MinMaxSection/MinMaxSection.tsx`
- Create: `src/content/gsap/ui/draggable-bounds-axis/sections/AxisLockSection/AxisLockSection.tsx`
- Create: `src/content/gsap/ui/draggable-bounds-axis/sections/AutoScrollLayerSection/AutoScrollLayerSection.tsx`
- Create: `src/content/gsap/ui/draggable-bounds-axis/sections/ResyncSection/ResyncSection.tsx`
- Create: `docs/handoffs/gsap/ui/draggable-bounds-axis.md`

**Interfaces:**

- Consumes: official catalog #22, #23, #37, #38, #39, #40, #41, #42, #43, #44, #58, #62; P01 and P03 registered prerequisites
- Produces: `DraggableBoundsAxisPage` named export, route slug `draggable-bounds-axis`, item-level catalog/coverage handoff

- [ ] Verify all twelve canonical sources separately, including bounds input/recalculation, mode-specific min/max values, requested/resolved axis, edge auto-scroll, z-index and external-layout resync.
- [ ] Freeze the handoff with one row per technical item and explicit P04/P06~P08 ownership boundaries.
- [ ] Implement five sections in this order: bounds measurement → min/max fields → lockAxis/lockedAxis → autoScroll/zIndex → applyBounds/update resync.
- [ ] Implement one `BoundsAxisLab` with a bounded tray, axis-lock/auto-scroll controls, bounds overlay, min/max inspector, keyboard-equivalent movement and an external-layout-change → `update()` comparison.
- [ ] Keep the normalized constraint descriptor as the source for Draggable vars, labels and displayed code. Kill the instance and observers/listeners in cleanup; make automatic corrections immediate for reduced motion.
- [ ] Page-locally verify all item counts, duplicate IDs, imports, comments, cleanup and link boundaries. Leave route/build `BLOCK` and approved browser checks `DEFERRED`.

### Task 3: P06 Draggable lifecycle page-local delivery

**Files:**

- Create: `src/content/gsap/ui/draggable-lifecycle/DraggableLifecyclePage.tsx`
- Create: `src/content/gsap/ui/draggable-lifecycle/DraggableLifecyclePage.css`
- Create: `src/content/gsap/ui/draggable-lifecycle/draggable-lifecycle.meta.ts`
- Create: `src/content/gsap/ui/draggable-lifecycle/draggable-lifecycle.catalog.ts`
- Create: `src/content/gsap/ui/draggable-lifecycle/draggable-lifecycle.properties.ts`
- Create: `src/content/gsap/ui/draggable-lifecycle/components/PageCoverage/PageCoverage.tsx`
- Create: `src/content/gsap/ui/draggable-lifecycle/components/SectionHeading/SectionHeading.tsx`
- Create: `src/content/gsap/ui/draggable-lifecycle/examples/LifecycleLab/LifecycleLab.tsx`
- Create: `src/content/gsap/ui/draggable-lifecycle/examples/LifecycleLab/LifecycleLab.css`
- Create: `src/content/gsap/ui/draggable-lifecycle/examples/LifecycleLab/useLifecycleAnimation.ts`
- Create: `src/content/gsap/ui/draggable-lifecycle/sections/LifecycleMentalModelSection/LifecycleMentalModelSection.tsx`
- Create: `src/content/gsap/ui/draggable-lifecycle/sections/EnableDisableSection/EnableDisableSection.tsx`
- Create: `src/content/gsap/ui/draggable-lifecycle/sections/ProgrammaticDragSection/ProgrammaticDragSection.tsx`
- Create: `src/content/gsap/ui/draggable-lifecycle/sections/KillRecreateSection/KillRecreateSection.tsx`
- Create: `src/content/gsap/ui/draggable-lifecycle/sections/FrameworkCleanupSection/FrameworkCleanupSection.tsx`
- Create: `docs/handoffs/gsap/ui/draggable-lifecycle.md`

**Interfaces:**

- Consumes: official catalog #26, #27, #28, #29, #36, #49; P01 and P03 registered prerequisites
- Produces: `DraggableLifecyclePage` named export, route slug `draggable-lifecycle`, item-level catalog/coverage handoff

- [ ] Verify all six canonical sources separately, including signatures, chaining returns, enabled getter, event input, listener effects, disable versus kill and framework cleanup.
- [ ] Freeze the handoff with one row per technical item and text-only P07/P08 boundaries.
- [ ] Implement five sections in this order: state machine → enable/disable/enabled → start/end drive → kill/recreate → React cleanup.
- [ ] Implement one `LifecycleLab` with an instance state machine and native controls for enable, disable, programmatic start/end, kill and recreate. The command descriptor must drive the invoked method, state transition and displayed code.
- [ ] Use a real pointer event only where the installed/browser contract supports it; expose unsupported programmatic-start preconditions instead of fabricating success. Kill the live instance on unmount and avoid autonomous motion.
- [ ] Page-locally verify all item counts, duplicate IDs, imports, comments, cleanup and link boundaries. Leave route/build `BLOCK` and approved browser checks `DEFERRED`.

### Task 4: Integrate and commit P04

- [ ] Root reviews P04 against all fourteen canonical ownership keys, item-level coverage, P03 terminology and P05~P08 boundaries.
- [ ] Add a lazy import and `{ slug: 'draggable-coordinates', title: 'Draggable 좌표 읽기', group: 'Draggable', Page: DraggableCoordinatesPage }` immediately after P03.
- [ ] Run `npx tsc --noEmit`, `npm run build`, `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook`, `git diff --check`; confirm both builds emit the P04 chunk.
- [ ] Replace only the integration `BLOCK` with measured `PASS`, preserve the four browser checks as `DEFERRED`, and commit P04 content, handoff and route together.

### Task 5: Integrate and commit P05

- [ ] Root reviews P05 against all twelve canonical ownership keys, item-level coverage, P03/P04 terminology and P06~P08 boundaries.
- [ ] Add a lazy import and `{ slug: 'draggable-bounds-axis', title: 'Draggable 범위와 축 제한', group: 'Draggable', Page: DraggableBoundsAxisPage }` immediately after P04.
- [ ] Run the same four verification commands and confirm both builds emit the P05 chunk.
- [ ] Clear only measured integration blockers and commit P05 content, handoff and route together.

### Task 6: Integrate and commit P06

- [ ] Root reviews P06 against all six canonical ownership keys, item-level coverage, P03 terminology and P07/P08 boundaries.
- [ ] Add a lazy import and `{ slug: 'draggable-lifecycle', title: 'Draggable 생명주기', group: 'Draggable', Page: DraggableLifecyclePage }` immediately after P05.
- [ ] Run the same four verification commands and confirm both builds emit the P06 chunk.
- [ ] Clear only measured integration blockers and commit P06 content, handoff and route together.

### Task 7: Cross-page handoff and final verification

- [ ] Compare P03~P06 terminology and ownership: create/identity, coordinates, constraints, lifecycle are distinct; P07 events and P08 collision/momentum remain unlinked text boundaries.
- [ ] Verify per-page `sourceManifest` IDs equal catalog IDs, `coverageMap` IDs and meta section sums with no duplicates or ranges.
- [ ] Update `docs/handoffs/gsap/_program/current-status.md` to 46/86 pages, 199/364 total canonicals, 6/46 plugin pages and 40/205 plugin canonicals.
- [ ] Create `docs/handoffs/gsap/_program/session-handoff-2026-08-08-plugin-wave-02.md` with commits, build evidence, source discrepancies, deferred browser checks and P07~P09 next-wave scope.
- [ ] Fresh-run `npx tsc --noEmit`, `npm run build`, `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook`, `git diff --check`, `git status --short --branch`.
- [ ] Commit the Wave 02 program handoff. Do not push unless the user asks separately.
