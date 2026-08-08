# P43 ScrollTrigger lifecycle handoff

## 입력 계약

- objective: resizable local content에서 lifecycle command와 discrete event log를 연결한다.
- officialPage: #163/#164/#169/#175/#179/#197/#198/#202/#203; reviewedAt 2026-08-09; slug scroll-trigger-lifecycle.
- localPage: `src/content/gsap/scroll/scroll-trigger-lifecycle/`; route `/fundamentals/scroll-trigger-lifecycle`.
- sourceBlockers: none.
- moduleSelection: CI, CM.
- learnerFlow: layout change → update/refresh choice → enable/disable → listener/kill cleanup.
- relatedPages: registered P40/P41 prerequisite pages are linked with `toHref`; P44 owns registry lookup/global-state teaching.

## Source manifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| STL-163 | `disable(revert?, allowAnimation?)` deactivates an instance while preserving it for reuse. | #163 rendered/raw; installed source/types | verified |
| STL-164 | `enable(reset?, refresh?)` reactivates a disabled instance and may refresh it. | #164 rendered/raw; installed source/types | verified |
| STL-169 | `kill(revert?, allowAnimation?)` permanently disposes the owned instance. | #169 rendered/raw; installed source/types | verified |
| STL-175 | instance `refresh()` recalculates one trigger's start/end geometry. | #175 rendered/raw; installed source/types | verified |
| STL-179 | `addEventListener(type, callback)` subscribes global lifecycle events including `refreshInit` and `refresh`. | #179 rendered/raw; installed source/types | verified |
| STL-197 | static `refresh(safe?)` recalculates every registered trigger, optionally at safe timing. | #197 rendered/raw; installed source/types | verified |
| STL-198 | `removeEventListener(type, callback)` removes the same callback identity. | #198 rendered/raw; installed source/types | verified |
| STL-202 | `sort(compare?)` reorders and returns registered triggers before refresh. | #202 rendered/raw; installed source/types | verified |
| STL-203 | static `update()` applies current scroll state without geometry remeasurement. | #203 rendered/raw; installed source/types | verified |

## Coverage map

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| STL-163 | `LifecycleLab` descriptor/button, actual instance disable, signature table | covered |
| STL-164 | `LifecycleLab` descriptor/button, actual instance enable, signature table | covered |
| STL-169 | actual kill command and owned cleanup boundary | covered |
| STL-175 | instanceRefresh command and layout decision matrix | covered |
| STL-179 | actual `refreshInit`/`refresh` listener ordering log | covered |
| STL-197 | actual globalRefresh command and scope warning | covered |
| STL-198 | cleanup removes both listeners by same callback identity | covered |
| STL-202 | actual sort command records returned registry count | covered |
| STL-203 | actual update command and no-remeasurement explanation | covered |

## 구현 계약

- exactFiles.create: page/CSS/meta/catalog/properties, `examples/LifecycleLab/LifecycleLab.tsx/.css/useLifecycleRuntime.ts`.
- exampleContracts: LifecycleLab; one command descriptor drives labels/code and runtime command IDs; controls commands and height toggle; runtimeSource `examples/LifecycleLab/useLifecycleRuntime.ts`; owned trigger/two global listener cleanup; displayOwnership TSX controls/target/log/code/reference; accessibility native buttons and bounded discrete status; motion none because target height changes without animation.
- nonGoals: continuous scroll announcement, host scroll mutation, static global disable/enable, registry lookup, or automatic refresh after local height change.

## 검증 계약

- verifiedPerspectives: Official Coverage PASS; Learning Transformation PASS; Runtime/Display Sync PASS; Pedagogy PASS; Structure/Comment PASS; Accessibility/Motion PASS; Cross-page Consistency PASS; Build/Integration PASS.
- findings: F01 PASS 9/9 IDs and visible signatures; F02 PASS two global listeners are removed and owned trigger is killed; F03 PASS continuous scroll never announces; F04 PASS page/runtime/example separation and descriptor/code synchronization; F05 PASS root route/full integration; B01–B04 DEFERRED browser.
- verificationEvidence: root review replaced the page-bound runtime with a scoped example hook, added official identity/property reference, and passed page-local TypeScript, Prettier and exact 9-row audit.
- releaseDecision: PASS — root integration completed; B01–B04 are approved browser DEFERRED checks.
