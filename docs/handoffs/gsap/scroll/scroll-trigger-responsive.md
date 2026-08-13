# ScrollTrigger responsive restoration handoff

## 입력 계약

```text
objective
  P45에서 responsive condition이 바뀔 때 legacy registration, owned condition cleanup, inline style snapshot, ScrollTrigger memory, browser history policy의 서로 다른 ownership을 host scroll 없이 학습한다.
officialPage
  title: ScrollTrigger.clearMatchMedia() / clearScrollMemory() / matchMedia() / saveStyles()
  canonicalUrl: https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.clearMatchMedia()/ ; https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.clearScrollMemory()/ ; https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.matchMedia()/ ; https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.saveStyles()/
  reviewedAt: 2026-08-09
  category: Scroll
  slug: scroll-trigger-responsive
localPage
  localPath: src/content/gsap/scroll/scroll-trigger-responsive/
  route: /fundamentals/scroll-trigger-responsive
moduleSelection
  deprecated API boundary, condition/style snapshot simulator, static navigation timeline, ownership lifecycle
sourceManifest
  - id: STR-181 | officialItem: ScrollTrigger.clearMatchMedia(query?) is deprecated in favor of gsap.matchMedia() since 3.11.0; query is optional, no query clears all prior ScrollTrigger.matchMedia breakpoints, and it does not kill associated triggers or animations | sourceLocation: #181 rendered pass 1 lines 177-190 and pass 2 lines 177-190; official raw ScrollTrigger.js pass 1/2 lines 1457-1459; installed 3.15.0 source pass 1/2 lines 1457-1459; scroll-trigger.d.ts pass 1/2 lines 72-83 | sourceStatus: verified
  - id: STR-182 | officialItem: ScrollTrigger.clearScrollMemory(scrollRestoration?) clears recorded ScrollTrigger positions so refresh will not restore them; auto/manual may explicitly set history.scrollRestoration and default is the value when ScrollTrigger loaded | sourceLocation: #182 rendered pass 1 lines 178-191 and pass 2 lines 178-191; official raw ScrollTrigger.js pass 1/2 lines 242-245 and 1498; installed 3.15.0 source pass 1/2 same; scroll-trigger.d.ts pass 1/2 lines 89-97 | sourceStatus: verified
  - id: STR-192 | officialItem: ScrollTrigger.matchMedia(vars) is deprecated in favor of gsap.matchMedia() since 3.11.0; matching media callbacks set up triggers, all persists, and inactive-query associated triggers and animations revert and kill | sourceLocation: #192 rendered pass 1 lines 179-205 and pass 2 lines 179-205; official raw ScrollTrigger.js pass 1 lines 1362-1379 and pass 2 lines 1362-1379; installed 3.15.0 source pass 1/2 same; scroll-trigger.d.ts pass 1/2 lines 271-286 | sourceStatus: verified
  - id: STR-199 | officialItem: ScrollTrigger.saveStyles(targets) records current inline CSS styles for internal revert after refresh or matchMedia change; targets accept selector text, element, or array | sourceLocation: #199 rendered pass 1 lines 178-199 and pass 2 lines 178-199; official raw ScrollTrigger.js pass 1 lines 1487-1495 and pass 2 lines 1487-1495; installed 3.15.0 source pass 1/2 same; scroll-trigger.d.ts pass 1/2 lines 408-416 | sourceStatus: verified
sourceBlockers
  none. Four rendered canonicals were opened and reopened; official raw source plus installed 3.15.0 source/types were compared twice. The source/runtime boundary is preserved: clearMatchMedia() only kills matching contexts in installed source, while rendered docs explicitly say it does not kill associated triggers/animations; this page retains the rendered guidance and does not invoke the legacy API.
learnerFlow
  1. Define a media condition as setup lifetime, not a CSS breakpoint alone.
  2. Toggle a local large/small simulator and observe captured inline styles re-apply after condition cleanup.
  3. Give reduced motion its own no-animation condition before responsive setup.
  4. Follow the static navigation timeline and keep ScrollTrigger recorded memory separate from browser history restoration.
coverageMap
  - sourceItemId: STR-181 | localEvidence: ResponsiveRestorationLab watch points and ScrollTriggerResponsivePage deprecated ownership boundary | localStatus: covered
  - sourceItemId: STR-182 | localEvidence: descriptor-derived static navigation timeline, code boundary, property table, and page navigation ownership paragraph | localStatus: covered
  - sourceItemId: STR-192 | localEvidence: descriptor query, simulator lifecycle, code panel, property table, and deprecated/core boundary | localStatus: covered
  - sourceItemId: STR-199 | localEvidence: local captured cssText simulator, preview labels, code panel, property table, and cleanup explanation | localStatus: covered
relatedPages
  P40 ScrollTrigger construction and core gsap.matchMedia() lessons are linked; P46 owns custom-scroller integration.
```

## 구현 계약

```text
exactFiles
  create: ScrollTriggerResponsivePage TSX/CSS, meta/catalog/properties/descriptor, ResponsiveRestorationLab TSX/CSS/runtime, this handoff
  modify: none
exampleContracts
  name: ResponsiveRestorationLab
  goal: one descriptor supplies responsive query labels, local style snapshot simulator, no-animation reduced-motion condition, static navigation timeline, and code.
  question: What must be reverted when a responsive condition or page navigation changes?
  representation: labelled local panel, keyboard radio controls, lifecycle message, ordered static timeline, descriptor-derived code, and property table.
  controls: large/small simulator radios plus replay; actual reduced-motion preference overrides selected condition.
  runtimeSource: useResponsiveRestorationRuntime.ts captures only local panel inline cssText, applies a non-animated large style, uses a native media listener, and restores listener/style on condition change or unmount.
  sourcePath: src/content/gsap/scroll/scroll-trigger-responsive/examples/ResponsiveRestorationLab/useResponsiveRestorationRuntime.ts
  runtimeOwnership: local panel style and native listener only; no ScrollTrigger legacy registration, clearMatchMedia, clearScrollMemory, history.scrollRestoration, page scroll, tween, or trigger is invoked.
  displayOwnership: descriptor supplies query strings, snapshot labels, navigation timeline, static code, and condition labels.
  accessibility: radios use fieldset/legend; panel retains reading order; lifecycle is plain text rather than a continuous live region; no focus or scroll movement occurs.
  motion: no animation is rendered; actual reduced-motion preference is an explicit condition that blocks the large setup style.
nonGoals
  host scroll-memory mutation, browser history policy mutation, global legacy matchMedia registration, actual ScrollTrigger creation, and animated breakpoint transitions.
preserve
  routes, program docs, shared UI, global CSS, packages, tests, full builds, and Git remain root-owned.
```

## 검증 계약

```text
verifiedPerspectives
  Official Coverage: PASS — four canonical IDs have individual catalog, sourceManifest, and coverageMap rows.
  Learning Transformation: PASS — global/legacy APIs become a local reversible snapshot and a navigation ownership timeline rather than a destructive demo.
  Runtime/Display Sync: PASS (simulator) — one descriptor supplies query labels, snapshot labels, timeline, static code, and local condition state; runtime intentionally avoids global APIs.
  Pedagogy: PASS — condition, cleanup, saved inline style, reduced motion, and navigation timing are separated in learner order.
  Structure/Comment: PASS — page/example/runtime ownership is split and comments are scoped to new files.
  Accessibility/Motion: PASS (static) — semantic radio group, no autonomous movement, and actual reduced-motion condition are present.
  Build/Integration: PASS — root registered the route and completed full TypeScript/Vite/Storybook builds.
findings
  P45-OC-001 | PASS | exact four-row catalog/manifest/coverage audit | no canonical is grouped or omitted | none
  P45-RDS-001 | PASS | descriptor and effective condition supply actual local snapshot/listener code before clearly labelled static global boundaries | no fake global runtime claim | none
  P45-BOUNDARY-001 | PASS | local cssText/listener cleanup only | host scroll memory and history policy remain untouched | application owner chooses navigation timing
  P45-SOURCE-001 | ADVISORY | rendered clearMatchMedia says it does not kill associated triggers/animations while installed source context-kills matching triggers | page records rendered/install boundary and does not execute legacy API | retain boundary
  P45-INT-001 | PASS | route, prerequisite links, and full integration builds pass | page is registered in inventory order | none
  P45-B01 | DEFERRED → PASS | keyboard radio/replay focus path | browser audit after route integration | root
  P45-B02 | DEFERRED → PASS | actual reduced-motion condition switch | browser audit after route integration | root
  P45-B03 | DEFERRED → PASS | 320/390 code/timeline layout | browser audit after route integration | root
  P45-B04 | DEFERRED → PASS | simulator style/listener restoration through control changes | browser audit after route integration | root
verificationEvidence
  task-25-report.md records source comparisons, page-local TypeScript, exact four-row audit, scoped Prettier, assigned diff, and self-review.
releaseDecision
PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.
```

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 재감사

- finding STRP-A01 `BLOCK` → 수정: 코드 패널이 정의되지 않은 `panel`과 `onChange`를 사용하고 runtime의 background style을 누락하던 문제를 실제 DOM 조회·callback·두 style 값이 포함된 코드로 맞췄다.
- finding STRP-A02 `BLOCK` → 수정: `ScrollTrigger.matchMedia()`의 조건 비활성화 cleanup과 `clearMatchMedia()` 자체의 공식 설명을 구체적인 API 이름으로 구분했다.
- finding STRP-A03 `BLOCK` → 수정: 화면의 내부 coverage 수, 문서 경로, 단계 번호와 제작 용어를 제거했다.
- Official Coverage: `PASS` — 4개 공식 항목을 2026-08-13 현재 문서와 다시 대조했다.
- Source boundary: `ADVISORY` — 공식 `clearMatchMedia()` 문서는 연결된 trigger/animation을 kill하지 않는다고 설명하지만 설치된 3.15 source는 일치하는 context를 kill한다. 페이지는 API를 실행하지 않고 차이를 명시한다.
- Runtime/Display Sync: `PASS` — local style snapshot과 media listener cleanup 내용이 일치하고, runtime은 effect return에서, 표시 코드는 pagehide 또는 dispose에서 같은 cleanup을 호출한다.
- Build/Integration: `NOT VERIFIED` — 전역 build는 실행하지 않았다. TypeScript와 대상 범위 diff 검사는 exit 0이다.
- Browser: `DEFERRED` — 사용자 승인 및 quality-gates에 따라 이번 감사에서 실조작하지 않았다.
- Storybook: `N/A` — c309e13에서 의도적으로 삭제되어 검증 대상이 아니다.
- overallDecision: `NOT VERIFIED`
- releaseDecision: `NOT VERIFIED` — 브라우저 관점이 남아 있다.

### 2026-08-13 최종 교차검토 수정

- `STRP-RDS-20260813-02 | BLOCK → PASS` — 표시 코드에 runtime에 없는 `pagehide` listener와 이중 dispose 경로가 있었다. 이를 제거하고 runtime과 같은 effect return 하나가 condition 변경과 unmount에서 listener/style cleanup을 실행하도록 맞췄다.
- 재검증: 표시 코드에 `pagehide` 경로가 없고 effect return만 cleanup을 호출함을 정적 재독했으며, `npx tsc --noEmit --pretty false`와 Batch C 범위 `git diff --check`는 exit 0이다.
- Browser: `DEFERRED`, Storybook: `N/A`; overall/releaseDecision은 `NOT VERIFIED`를 유지한다.
