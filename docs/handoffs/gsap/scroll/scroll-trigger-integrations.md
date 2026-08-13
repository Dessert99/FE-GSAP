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
  - STI-B01 DEFERRED → PASS — browser keyboard/focus/local wheel-touch Observer operation.
  - STI-B02 DEFERRED → PASS — browser reduced-motion outcome.
  - STI-B03 DEFERRED → PASS — browser 320/390px architecture/code layout.
  - STI-B04 DEFERRED → PASS — browser observer cleanup result.
- releaseDecision: PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 재감사

- finding STI-A01 `BLOCK` → 수정: 실행되는 Observer 코드 패널이 `target`, `preventDefault`, `onUp`, `onDown`을 누락하던 문제를 runtime config와 일치하는 독립 코드로 교체했다.
- finding STI-A02 `BLOCK` → 수정: scrollerProxy 표시 코드의 빈 getter/setter·measurement placeholder를 실제 DOM 조회와 동작하는 getter/setter 형태로 교체했다.
- finding STI-A03 `BLOCK` → 수정: 화면의 내부 coverage 수, 문서 경로, 단계 번호와 제작 용어를 제거했다.
- Official Coverage: `PASS` — 3개 공식 항목을 2026-08-13 현재 문서와 다시 대조했다.
- Runtime/Display Sync: `PASS` — 실제 실행되는 Observer의 target/type/preventDefault/directional callbacks/kill이 표시 코드와 일치한다.
- Static boundary: `PASS` — normalizeScroll과 scrollerProxy는 앱 전체 scroll 동작에 영향을 주므로 호출 형태만 표시하고 실행하지 않는다.
- Build/Integration: `NOT VERIFIED` — 전역 build는 실행하지 않았다. TypeScript와 대상 범위 diff 검사는 exit 0이다.
- Browser: `DEFERRED` — 사용자 승인 및 quality-gates에 따라 이번 감사에서 실조작하지 않았다.
- Storybook: `N/A` — c309e13에서 의도적으로 삭제되어 검증 대상이 아니다.
- overallDecision: `NOT VERIFIED`
- releaseDecision: `NOT VERIFIED` — 브라우저 관점이 남아 있다.

### 2026-08-13 최종 교차검토 수정

- `STI-RDS-20260813-02 | BLOCK → PASS` — 세 표시 코드가 `gsap`과 `ScrollTrigger` import 없이 시작해 단독 실행 문맥이 성립하지 않았다. normalizeScroll·observe·scrollerProxy 각 snippet에 동일 import와 `gsap.registerPlugin(ScrollTrigger)`를 포함하고, Observer branch의 target/callback/cleanup은 runtime과 다시 대조했다.
- 재검증: 세 snippet의 import/register/target/callback/cleanup을 정적 재독했고, `npx tsc --noEmit --pretty false`와 Batch C 범위 `git diff --check`는 exit 0이다.
- Browser: `DEFERRED`, Storybook: `N/A`; overall/releaseDecision은 `NOT VERIFIED`를 유지한다.
