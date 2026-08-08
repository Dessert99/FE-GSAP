# P46 ScrollTrigger integrations handoff

## Input contract

- objective: native normalization, Observer input sensing, and scrollerProxy scroll/measurement adaptation을 discriminated modes로 구분한다.
- officialPage: #194 `normalizeScroll()`, #195 `observe()`, #200 `scrollerProxy()`; reviewedAt `2026-08-09`; category `Scroll`; slug `scroll-trigger-integrations`.
- localPage: `src/content/gsap/scroll/scroll-trigger-integrations/`; route `/fundamentals/scroll-trigger-integrations`.
- sourceBlockers: none; all three rendered canonicals, official raw `src/ScrollTrigger.js`, installed source/types were each read twice. Raw/installed source SHA-256 `ccdc8591b7ff86370570c4d236a54ff9810b21a8c0b29f2d3b5391bb7ee44ad5`.
- moduleSelection: integration boundary, architecture diagram, one local Observer runtime, cleanup/motion accessibility boundary.
- learnerFlow: native scrolling default → normalize intercept/disable → observe equals Observer.create → proxy getter/setter/measurement/pin contracts → select local-safe execution and cleanup.
- relatedPages: P25 Observer and P40–P43 ScrollTrigger prerequisites are linked in learner order.

## Source manifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- |
| STI-194 | `normalizeScroll(true|false|object)` is Observer-backed normalization; getter returns current normalizer, false restores native scrolling, object accepts Observer options; it handles JS-thread sync/mobile issues and has multi-touch/zoom caveats. | #194 rendered details/config/caveats; raw/type normalizeScroll | verified |
| STI-195 | `observe(config)` returns Observer, is functionally identical to `Observer.create`, accepts target/type/callback config, and is available because ScrollTrigger normalization already uses Observer. | #195 rendered signature/details/example; raw/type observe | verified |
| STI-200 | `scrollerProxy(scroller, vars)` replaces scroll getters/setters; either scrollTop or scrollLeft getter/setter is required, measurement/size/fixedMarkers/pinType are optional, and custom-scroller updates call `ScrollTrigger.update`. | #200 rendered signature/special properties; raw/type scrollerProxy | verified |

## Coverage map

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| STI-194 | native-normalize diagram/code; false-disable/reduced-motion boundary | covered |
| STI-195 | actual local `ScrollTrigger.observe` runtime; Observer equivalence diagram/code; cleanup | covered |
| STI-200 | proxy diagram/code and required/optional measurement/pin reference | covered |

## Implementation contract

- exactFiles.create: page/meta/catalog, `examples/LocalObserver/LocalObserver.tsx/.css/useLocalObserverRuntime.ts`, this handoff.
- exampleContracts: `LocalObserver`; goal choose the ownership-safe integration mode; question `Which mode may run locally without replacing browser scroll?`; representation three discriminated architecture cards and one local input surface; controls reset discrete direction output only; runtimeSource `useLocalObserverRuntime.ts`; runtimeOwnership only local Observer/kill/readout reset; displayOwnership descriptor diagrams/code/discrete output; accessibility focusable local target, no preventDefault, no continuous live region; motion reduced motion never enables normalizer.
- nonGoals: global normalizeScroll execution, live scrollerProxy registry changes, third-party library integration, global scroll interception, P25/P40–P43 duplicate teaching.
- preserve: routes, program docs, shared UI, packages, tests, Git, full builds.

## Verification contract

- verifiedPerspectives: Source Curator PASS; Content Architect PASS; Official Coverage PASS; Learning Transformation PASS; Runtime/Display Sync PASS; Pedagogy PASS; Structure/Comment PASS; Accessibility/Motion PASS (static); Build/Integration PASS; Cross-page Consistency PASS.
- findings:
  - STI-F01 PASS — exact catalog/sourceManifest/coverageMap are 3/3/3 ordered, duplicate-free.
  - STI-F02 PASS — normalizer and proxy are diagram-only because their global registry/host ownership cannot be restored safely in a page-local lab; Observer is actual only on local target.
  - STI-F03 PASS — actual Observer kill, native keyboard preservation, reduced-motion normalization prohibition, and proxy restoration boundary are explicit.
  - STI-I01 PASS — route, prerequisite links, and full TypeScript/Vite/Storybook integration pass under root ownership.
  - STI-B01 DEFERRED — browser keyboard/focus/local wheel-touch Observer operation.
  - STI-B02 DEFERRED — browser reduced-motion outcome.
  - STI-B03 DEFERRED — browser 320/390px architecture/code layout.
  - STI-B04 DEFERRED — browser observer cleanup result.
- releaseDecision: PASS — source integration is complete; STI-B01–B04 remain in the approved final browser DEFERRED batch.
