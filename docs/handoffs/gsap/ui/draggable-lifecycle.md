# Draggable lifecycle page handoff

## input contract

```text
objective
  P03에서 만든 Draggable instance를 enable·disable·programmatic start/end·kill/recreate로 전환하고 React cleanup까지 연결한다.

officialPage
  title: Draggable.disable() / enable() / enabled() / endDrag() / kill() / startDrag()
  canonicalUrl:
    https://gsap.com/docs/v3/Plugins/Draggable/disable()/
    https://gsap.com/docs/v3/Plugins/Draggable/enable()/
    https://gsap.com/docs/v3/Plugins/Draggable/enabled()/
    https://gsap.com/docs/v3/Plugins/Draggable/endDrag()/
    https://gsap.com/docs/v3/Plugins/Draggable/kill()/
    https://gsap.com/docs/v3/Plugins/Draggable/startDrag()/
  reviewedAt: 2026-08-08
  category: UI
  slug: draggable-lifecycle

localPage
  localPath: src/content/gsap/ui/draggable-lifecycle/
  route: /fundamentals/draggable-lifecycle (registered)
```

### sourceManifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| DRAGLIFE-01 | disable() signature와 Draggable return | #26 signature | verified |
| DRAGLIFE-02 | disable 뒤 enable 전까지 drag 불가 | #26 Details | verified |
| DRAGLIFE-03 | disable chaining return | #26 Returns | verified |
| DRAGLIFE-04 | enable() signature와 Draggable return | #27 signature | verified |
| DRAGLIFE-05 | enable 뒤 target drag 재허용 | #27 Details | verified |
| DRAGLIFE-06 | enable chaining return | #27 Returns | verified |
| DRAGLIFE-07 | enabled(value:Boolean) getter/setter method | #28 signature/Details | verified |
| DRAGLIFE-08 | enabled() getter Boolean | #28 Details | verified |
| DRAGLIFE-09 | enabled(value) setter self chaining | #28 Details/Returns | verified |
| DRAGLIFE-10 | enabled instance의 mouse event·callback·drag 반응 | #28 Details | verified |
| DRAGLIFE-11 | endDrag(event:Object) void와 programmatic stop | #29 signature/Details | verified |
| DRAGLIFE-12 | endDrag original event와 pageX/pageY/target precondition | #29 Details | verified |
| DRAGLIFE-13 | endDrag는 disable처럼 instance를 shutdown하지 않음 | #29 Details | verified |
| DRAGLIFE-14 | startDrag(event:Object, align:Boolean) void와 programmatic start | #49 signature/Details | verified |
| DRAGLIFE-15 | startDrag original mouse/touch/pointer event 필수 | #49 Details | verified |
| DRAGLIFE-16 | align true의 pointer alignment | #49 Details | verified |
| DRAGLIFE-17 | enable은 interaction 허용, startDrag는 즉시 시작 | #49 Details | verified |
| DRAGLIFE-18 | kill() signature와 Draggable return | #36 signature/Returns | verified |
| DRAGLIFE-19 | kill의 disable·lookup removal·GC effect | #36 Details | verified |
| DRAGLIFE-20 | disable lookup 유지와 kill lookup 제거 차이 | #36 Details | verified |
| DRAGLIFE-21 | no-longer-needed instance의 kill 기준과 chaining return | #36 Details/Returns | verified |
| DRAGLIFE-22 | enable/disable optional type와 enabled setter overload | installed `Draggable.js` + `types/draggable.d.ts` | verified |
| DRAGLIFE-23 | start/end stored pointerEvent fallback과 공식/d.ts stricter event contract | official raw `src/Draggable.js` + installed `Draggable.js` + `types/draggable.d.ts` | verified |

sourceBlockers
  - none

moduleSelection
  - plugin
  - class/instance lifecycle
  - callable methods (enable, disable, enabled, startDrag, endDrag, kill)

learnerFlow
  1. P03 instance가 temporary enabled/disabled와 final disposed를 구분함을 본다.
  2. enable/disable의 self return과 enabled getter/setter를 같은 instance에서 확인한다.
  3. 실제 captured pointer event가 있을 때만 startDrag/endDrag를 실행한다.
  4. kill이 disable보다 더 강하게 lookup까지 제거함을 이해한다.
  5. React unmount와 recreate가 kill cleanup을 공유함을 연결한다.
```

### coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| DRAGLIFE-01 | EnableDisableSection and lifecycle property table | covered |
| DRAGLIFE-02 | EnableDisableSection temporary pause explanation | covered |
| DRAGLIFE-03 | EnableDisableSection chaining code | covered |
| DRAGLIFE-04 | EnableDisableSection and lifecycle property table | covered |
| DRAGLIFE-05 | EnableDisableSection temporary pause explanation | covered |
| DRAGLIFE-06 | EnableDisableSection chaining code | covered |
| DRAGLIFE-07 | EnableDisableSection enabled getter/setter explanation | covered |
| DRAGLIFE-08 | LifecycleLab snapshot invokes enabled() after controls | covered |
| DRAGLIFE-09 | EnableDisableSection rendered/type mismatch note | covered |
| DRAGLIFE-10 | EnableDisableSection user-drag state explanation | covered |
| DRAGLIFE-11 | ProgrammaticDragSection and LifecycleLab start/end controls | covered |
| DRAGLIFE-12 | ProgrammaticDragSection original-event explanation and precondition | covered |
| DRAGLIFE-13 | LifecycleLab endDrag notice retains enabled state | covered |
| DRAGLIFE-14 | ProgrammaticDragSection and descriptor-derived code | covered |
| DRAGLIFE-15 | LifecycleLab real native PointerEvent capture only | covered |
| DRAGLIFE-16 | ProgrammaticDragSection align true explanation | covered |
| DRAGLIFE-17 | ProgrammaticDragSection enable/start distinction | covered |
| DRAGLIFE-18 | KillRecreateSection and lifecycle property table | covered |
| DRAGLIFE-19 | KillRecreateSection and hook cleanup | covered |
| DRAGLIFE-20 | KillRecreateSection lookup comparison | covered |
| DRAGLIFE-21 | KillRecreateSection disposal/recreate code | covered |
| DRAGLIFE-22 | catalog implementation row and EnableDisableSection mismatch note | covered |
| DRAGLIFE-23 | catalog implementation row and ProgrammaticDragSection guard | covered |

relatedPages
  - P01 `/fundamentals/plugins`: registered prerequisite link only.
  - P03 `/fundamentals/draggable-create`: registered prerequisite link only.
  - P07 gesture event and P08 collision/momentum: downstream owners; text boundary only, no link.

## implementation contract

```text
exactFiles
  create:
    src/content/gsap/ui/draggable-lifecycle/DraggableLifecyclePage.tsx
    src/content/gsap/ui/draggable-lifecycle/DraggableLifecyclePage.css
    src/content/gsap/ui/draggable-lifecycle/draggable-lifecycle.meta.ts
    src/content/gsap/ui/draggable-lifecycle/draggable-lifecycle.catalog.ts
    src/content/gsap/ui/draggable-lifecycle/draggable-lifecycle.properties.ts
    src/content/gsap/ui/draggable-lifecycle/components/PageCoverage/PageCoverage.tsx
    src/content/gsap/ui/draggable-lifecycle/components/SectionHeading/SectionHeading.tsx
    src/content/gsap/ui/draggable-lifecycle/examples/LifecycleLab/LifecycleLab.tsx
    src/content/gsap/ui/draggable-lifecycle/examples/LifecycleLab/LifecycleLab.css
    src/content/gsap/ui/draggable-lifecycle/examples/LifecycleLab/useLifecycleAnimation.ts
    src/content/gsap/ui/draggable-lifecycle/sections/LifecycleMentalModelSection/LifecycleMentalModelSection.tsx
    src/content/gsap/ui/draggable-lifecycle/sections/EnableDisableSection/EnableDisableSection.tsx
    src/content/gsap/ui/draggable-lifecycle/sections/ProgrammaticDragSection/ProgrammaticDragSection.tsx
    src/content/gsap/ui/draggable-lifecycle/sections/KillRecreateSection/KillRecreateSection.tsx
    src/content/gsap/ui/draggable-lifecycle/sections/FrameworkCleanupSection/FrameworkCleanupSection.tsx
    docs/handoffs/gsap/ui/draggable-lifecycle.md
  modify: []

exampleContracts
  - name: LifecycleLab
    goal: 한 Draggable instance에서 enable, disable, programmatic start/end, kill, recreate의 state transition을 관찰한다.
    question: temporary disable과 final kill은 target·pointer input·lookup을 어떻게 다르게 남기는가?
    representation: keyboard-focusable card 1개, native method buttons, state definition list, status message, descriptor-derived code, method table
    controls: enable, disable, startDrag, endDrag, kill, recreate buttons; card native pointer capture
    runtimeSource: useLifecycleAnimation.ts
    sourcePath: examples/LifecycleLab/useLifecycleAnimation.ts
    runtimeOwnership: Draggable import/register, target/instance/event refs, creation, enabled/isDragging/get snapshots, descriptor execution, kill cleanup, instant transform reset
    displayOwnership: controls, preview markup, descriptor code, state table, observation and pedagogy panels
    accessibility: keyboard-operable native buttons, focusable target, disabled unavailable pointer controls, role=status for one-shot result, focus-visible outline
    motion: no autonomous motion; no tween; transform reset is gsap.set and immediate

nonGoals
  - P04 coordinate values and direction
  - P05 bounds, axis lock, auto-scroll and update
  - P07 gesture event API, callbacks and timing
  - P08 hit testing, inertia configuration and collision/momentum outcome

preserve
  - routes.ts, program documents, shared components, global CSS, package files, Git state
```

## verification contract

### source evidence

- Rendered canonical pass 1 (2026-08-08): six official pages opened directly. Recorded #26/#27 signatures, Details, Returns; #28 signature, getter/setter Details and return wording; #29/#49 event preconditions and void returns; #36 lookup-removal and GC distinction.
- Rendered canonical pass 2 (2026-08-08): targeted reread of each #26, #27, #28, #29, #36, #49 Details/Returns section. Confirmed enable/disable self chaining, enabled getter/setter discrepancy, start/end original-event requirement, align behavior, and kill versus disable lookup behavior.
- Raw/source pass 1 (2026-08-08): official GSAP raw `src/Draggable.js` inspected at `enable`, `disable`, `enabled`, `startDrag`, `endDrag`, and `kill`; recorded listener setup/removal, setter delegation, lookup deletion, and `event || self.pointerEvent` fallback.
- Raw/source pass 2 (2026-08-08): installed `node_modules/gsap/Draggable.js` compared at the same methods, then `node_modules/gsap/types/draggable.d.ts` checked. Type overloads keep enabled getter Boolean/setter this and require Event for startDrag/endDrag.
- Runtime probe: 0. Browser pointer execution is intentionally deferred; Node cannot establish DOM pointer semantics and no synthetic event is treated as source evidence.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| OC-P06-001 | PASS | 21 official catalog rows, 2 implementation rows, meta denominator 21/2, section sum 0+10+7+4+0=21, six canonical keys present | Official Coverage | none |
| LT-P06-001 | PASS | sections reorder source into state machine → enable/disable → start/end → kill/recreate → cleanup; lab has goal, controls, observation, reason, use case, boundaries | Learning Transformation | none |
| RDS-P06-001 | PASS | hook owns create, refs, actual method invocation, enabled/isDragging/get snapshots, cleanup; TSX imports no gsap and code display derives from command descriptor | Runtime/Display Sync | none |
| PED-P06-001 | PASS | P03 prerequisite appears before lifecycle methods; lab prevents synthetic event success and distinguishes temporary pause from disposal | Pedagogy | none |
| STRUCT-P06-001 | PASS | page shell only composes sections; one component/file; hook owns plugin lifecycle; Korean one-line comments and per-step hook comments present | Structure/Comment | none |
| A11Y-P06-001 | PASS | native buttons, focusable target, disabled unavailable controls, single status result, focus-visible CSS, no autonomous motion | static Accessibility/Motion | none |
| XPAGE-P06-001 | PASS | only P01/P03 are linked; P07/P08 remain text-only downstream owner boundaries | Cross-page Consistency | none |
| ROUTE-BUILD-P06-001 | PASS | root registered `/fundamentals/draggable-lifecycle`; `npx tsc --noEmit`, Vite 876 modules, Storybook 1014 modules, both `DraggableLifecyclePage` JS/CSS chunks, and `git diff --check` passed | Integration | none |
| BROWSER-P06-001 | DEFERRED → PASS | keyboard controls, reduced-motion outcome, 320/390px overflow, and real pointer drag/start/end/kill/recreate outcome need browser interaction | approved four browser checks only | root final browser batch |

verificationEvidence
  - catalog ID/count/duplicate, sourceManifest/coverage item alignment, section arithmetic, exact file, import, cleanup, comment, and link-boundary checks are page-local static checks.
  - root integration reran `npx tsc --noEmit`, `npm run build`, `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook`, and `git diff --check`; all exited 0.
  - no automated test files or runner changes were created.

fixRound
  - root runtime/display review: startDrag/endDrag now read instance.isDragging after each call; start is guarded by actual enabled state and end by the previous actual isDragging snapshot.
  - root lifecycle review: create/enable/disable/kill now read Draggable.get(target) with a local Draggable | undefined cast; kill marks disposal only when lookup is actually removed.

releaseDecision
  PASS — route/build integration blocker is cleared. The only deferred work is BROWSER-P06-001’s four approved browser checks.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 Batch B 재감사

- 공식 대조: `enable()`, `disable()`, `enabled()`, `startDrag()`, `endDrag()`, `kill()` canonical을 현재 웹에서 다시 확인했다.
- `WRITE-B06-01 | BLOCK → PASS` — 첫 화면의 coverage 수치와 learner-facing P번호·소유권 표현을 lifecycle 질문과 관련 개념 이름으로 교체했다.
- `FACT-B06-01 | BLOCK → PASS` — `kill()`을 되돌릴 수 없는 객체 소멸로 읽히던 문장을 공식 범위인 disable+lookup 제거로 좁히고, 새 instance 생성은 이 예제의 선택임을 명시했다.
- Runtime/Display Sync 재검수: 실제 command descriptor가 method 호출과 마지막 코드 패널을 함께 구동하며 drift 없음.
- Storybook: c309e13에서 삭제되어 `N/A`이며 실행·성공 근거로 사용하지 않는다.
- Browser: `DEFERRED` — keyboard/focus, reduced-motion, 320/390px, 실제 pointer start/end/kill/recreate 결과는 실조작하지 않았다.
- current releaseDecision: `PASS` — 미해결 BLOCK 없음. Browser 네 항목은 승인된 `DEFERRED`다.

### 2026-08-13 Batch B 통합 검증

- `npx tsc --noEmit --pretty false` exit 0.
- Batch B 21 page dir + handoff 범위 `git diff --check` exit 0.

### 2026-08-13 최종 교차검토 판정

- Storybook: `N/A` — c309e13에서 의도적으로 삭제되어 실행하지 않았다.
- Browser: `DEFERRED` — 승인된 브라우저 실조작 관점을 수행하지 않았다.
- overallDecision: `NOT VERIFIED` — 정적 BLOCK은 없지만 Browser 실조작이 `DEFERRED`다.
- releaseDecision: `NOT VERIFIED` — 브라우저 관점을 현재 증거로 확인하지 않았다.
