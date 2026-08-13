# P41 ScrollTrigger geometry handoff

## Input contract

- objective: local scroller에서 ScrollTrigger의 refreshed pixel geometry, current state, owner elements, and viewport utilities를 one descriptor/sparse snapshot으로 연결한다.
- officialPage: fourteen canonical URLs #161/#162/#165/#168/#170/#172/#174/#176/#177/#178/#188/#193/#196/#204; reviewedAt `2026-08-09`; category `Scroll`; slug `scroll-trigger-geometry`.
- localPage: `src/content/gsap/scroll/scroll-trigger-geometry/`; route `/fundamentals/scroll-trigger-geometry`.
- sourceBlockers: none; all fourteen rendered canonicals were read twice, official raw `src/ScrollTrigger.js` twice, and installed source/types twice. Official raw and installed source are byte-identical at SHA-256 `ccdc8591b7ff86370570c4d236a54ff9810b21a8c0b29f2d3b5391bb7ee44ad5`.
- moduleSelection: instance property/method reference, static utility reference, one local scroll ruler, sparse snapshot table, ownership/refresh boundary.
- learnerFlow: P40 instance/config text prerequisite → config string becomes refresh px → active/progress/direction state → element/scroller ownership → local versus browser viewport utility → sparse snapshot and cleanup.
- relatedPages: registered P40 create page is linked with `toHref`. P42 owns scrub/velocity motion, P43 owns refresh/update lifecycle methods, P44 owns registry; this page calls refresh only to settle its owned local measurement.

## Source manifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- |
| STG-161 | `animation` is readonly associated Tween, Timeline, or undefined. | #161 rendered; raw/type animation field | verified |
| STG-162 | `direction` is readonly 1 forward or -1 backward. | #162 rendered; raw/type direction field | verified |
| STG-165 | `end` is readonly refreshed numeric scroll position in pixels. | #165 rendered; raw/type end field | verified |
| STG-168 | `isActive` is true only when scroll is between start and end. | #168 rendered; raw/type active state | verified |
| STG-170 | `labelToScroll(label)` returns associated timeline label scroll position. | #170 rendered; raw/type method | verified |
| STG-172 | `pin` is readonly pinned element or undefined. | #172 rendered; raw/type pin field | verified |
| STG-174 | `progress` is readonly normalized 0–1 distance between start/end. | #174 rendered; raw/type progress field | verified |
| STG-176 | `scroll(value?)` gets/sets the associated scroller position. | #176 rendered; raw/type method | verified |
| STG-177 | `scroller` is readonly Element or window scroll owner. | #177 rendered; raw/type scroller field | verified |
| STG-178 | `start` is readonly refreshed numeric scroll position in pixels. | #178 rendered; raw/type start field | verified |
| STG-188 | `isInViewport(target, proportion?, horizontal?)` returns viewport visibility. | #188 rendered; raw/type static utility | verified |
| STG-193 | `maxScroll(target, horizontal?)` returns maximum scroll distance. | #193 rendered; raw/type static utility | verified |
| STG-196 | `positionInViewport(element, referencePoint?, horizontal?)` returns normalized viewport position. | #196 rendered; raw/type static utility | verified |
| STG-204 | `trigger` is readonly trigger element or undefined. | #204 rendered; raw/type trigger field | verified |

## Coverage map

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| STG-161 | `GeometryRuler` owned timeline/create config and frozen `animation` readout | covered |
| STG-162 | `GeometryMeaningSection`; frozen `direction` readout | covered |
| STG-165 | `GeometryMeaningSection`; actual refreshed `end` snapshot | covered |
| STG-168 | `GeometryMeaningSection`; actual `isActive` snapshot | covered |
| STG-170 | `OwnershipSection`; timeline label and `labelToScroll` snapshot | covered |
| STG-172 | `OwnershipSection`; reduced/non-reduced actual `pin` snapshot | covered |
| STG-174 | `GeometryMeaningSection`; sparse `progress` snapshot | covered |
| STG-176 | `OwnershipSection`; actual local `scroll()` snapshot | covered |
| STG-177 | `OwnershipSection`; actual `scroller` snapshot | covered |
| STG-178 | `GeometryMeaningSection`; actual refreshed `start` snapshot | covered |
| STG-188 | `OwnershipSection`; actual static utility snapshot | covered |
| STG-193 | `GeometryRuler`; actual local `maxScroll` snapshot | covered |
| STG-196 | `OwnershipSection`; actual viewport-position snapshot | covered |
| STG-204 | `OwnershipSection`; actual `trigger` snapshot | covered |

## Implementation contract

- exactFiles.create: page/meta/catalog/properties, two sections, `examples/GeometryRuler/GeometryRuler.tsx/.css/useGeometryRulerRuntime.ts`, this handoff.
- exampleContracts: `GeometryRuler`; goal config strings, local-scroller geometry, and browser viewport utilities를 다른 units/owners로 읽는다; question `What did this instance calculate when I requested one snapshot?`; representation one local scroller, optional owned pin, sparse table, descriptor-derived code; controls one native button; runtimeSource `useGeometryRulerRuntime.ts`; runtimeOwnership register/create one local ScrollTrigger/timeline, capture fourteen real reads, refresh listener, kill/revert cleanup; displayOwnership controls/table/code/reference; accessibility focusable local scroller, native button/table, no live region; motion reduced motion disables animation/pin but retains measurements.
- nonGoals: global/window scroll takeover, live progress announcements, P40 create/config ownership, P42 motion, P43 global refresh/update lifecycle, P44 registry.
- preserve: routes, program docs, shared UI, packages, tests, Git, full builds.

## Verification contract

- verifiedPerspectives: Source Curator PASS; Content Architect PASS; Official Coverage PASS; Learning Transformation PASS; Runtime/Display Sync PASS; Pedagogy PASS; Structure/Comment PASS; Accessibility/Motion PASS (static); Build/Integration PASS; Cross-page Consistency PASS.
- findings:
  - STG-F01 PASS — catalog/sourceManifest/coverageMap share all 14 IDs in order without duplicate.
  - STG-F02 PASS — one descriptor provides actual create config, timeline label, getter-to-setter `scroll()` call, snapshot values, and code; snapshot is request/refresh sparse, not live.
  - STG-F03 PASS — owned listener, trigger, timeline, and pin work are killed/reverted on cleanup; reduced motion keeps measurements while animation/pin are disabled.
  - STG-I01 PASS — root route, full TypeScript, Vite, Storybook, and diff integration passed.
  - STG-B01 DEFERRED → PASS — browser keyboard/local scroll/button operation.
  - STG-B02 DEFERRED → PASS — browser reduced-motion pin-off outcome.
  - STG-B03 DEFERRED → PASS — browser 320/390px table/code layout.
  - STG-B04 DEFERRED → PASS — browser actual ruler geometry/pin cleanup result.
- releaseDecision: PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
