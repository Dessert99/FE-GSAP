# P27 Observer gesture state handoff

## Input contract

- objective: press → tolerance crossing → release의 실제 Observer phase에서 `isPressed`와 `isDragging`을 구분한다.
- officialPage: #121 `Observer.isDragging`, `https://gsap.com/docs/v3/Plugins/Observer/isDragging/`; #123 `Observer.isPressed`, `https://gsap.com/docs/v3/Plugins/Observer/isPressed/`; reviewedAt `2026-08-08`; category `UI`; slug `observer-gesture-state`.
- localPage: `src/content/gsap/ui/observer-gesture-state/`; route `/fundamentals/observer-gesture-state`.
- sourceBlockers: none; #121/#123 rendered canonical을 각각 두 번, official raw `src/Observer.js`와 `types/observer.d.ts` 및 installed source/types를 각각 두 번 대조했다.
- moduleSelection: property state catalog, lifecycle boundary, keyboard-accessible runtime probe.
- learnerFlow: press의 `isPressed` → `dragMinimum`을 넘긴 `isDragging` → owner document release → owned Observer cleanup.
- relatedPages: registered P25 `/fundamentals/observer-create`와 P26 `/fundamentals/observer-signals`를 `toHref` anchor로 연결한다.

## Source manifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| OGS-121 | `isDragging`은 press 뒤 이동이 `dragMinimum`을 넘으면 true가 되며 pointer/touch release까지 유지된다. | #121 rendered canonical; raw `src/Observer.js` threshold/release; installed source/types | verified |
| OGS-123 | `isPressed`는 pointer/touch press에서 true가 되고 release에서 false가 된다. | #123 rendered canonical; raw `src/Observer.js` press/release; installed source/types | verified |

## Coverage map

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| OGS-121 | `TransitionSection`; `GestureStateLab` descriptor, actual `onDrag` snapshot and code panel | covered |
| OGS-123 | `TransitionSection`; `GestureStateLab` actual `onPress`/`onRelease` snapshots and code panel | covered |

## Implementation contract

- exactFiles.create: page/meta/catalog, `TransitionSection`, `GestureStateLab.tsx/.css/useGestureStateRuntime.ts`, this handoff.
- exactFiles.modify: none.
- exampleContracts: `GestureStateLab`; goal press와 drag state를 release까지 비교; question `dragMinimum` 전후 boolean이 어떻게 달라지는가; representation stable button + sparse state table + code; controls keyboard press/drag/release buttons; runtimeSource `examples/GestureStateLab/useGestureStateRuntime.ts`; sourcePath same; runtimeOwnership `Observer.create`, callbacks, synthetic pointer sequence, `observer.kill`; displayOwnership labels, status, state values, descriptor serializer; accessibility keyboard controls and only discrete `role=status`; motion none because no tween/automatic motion.
- nonGoals: Observer creation API 전체, wheel/scroll signal, velocity/inertia, draggable transform을 가르치지 않는다.
- preserve: routes, program docs, shared UI, packages, tests, Git, full build are untouched.

## Verification contract

- verifiedPerspectives: Source Curator PASS; Content Architect PASS; Official Coverage PASS; Learning Transformation PASS; Runtime/Display Sync PASS; Pedagogy PASS; Structure/Comment PASS; Accessibility/Motion PASS; Cross-page Consistency PASS; Build/Integration BLOCK.
- findings:
  - OGS-F01 PASS — exact 2 official catalog/sourceManifest/coverage IDs are `OGS-121`, `OGS-123`; no duplicate or missing ID.
  - OGS-F02 PASS — one `gestureDescriptor.dragMinimum` drives `Observer.create`, simulated threshold and serializer; callback booleans form sparse display snapshots.
  - OGS-F03 PASS — stable React-owned button receives press; owner document receives move/release; cleanup calls the owned Observer `kill()`.
  - OGS-F04 PASS — semantic buttons work by keyboard; `role=status` announces only discrete callback phase; no automatic motion exists.
  - OGS-F05 PASS — P25와 P26 prerequisite가 `toHref`로 연결된다.
  - OGS-F06 PASS — root route and full TypeScript/Vite/Storybook integration verified.
  - OGS-B01 DEFERRED — browser pointer/touch interaction validation.
  - OGS-B02 DEFERRED — browser keyboard/focus order validation.
  - OGS-B03 DEFERRED — browser small viewport validation.
  - OGS-B04 DEFERRED — browser assistive-technology status validation.
- verificationEvidence: rendered #121/#123 twice each; official raw source/type twice each; installed `Observer.js`/`observer.d.ts` twice each; task-7 report records page-local TypeScript, formatter, ID and scoped diff checks.
- releaseDecision: PASS — root integration complete; B01–B04 are approved browser DEFERRED checks.
