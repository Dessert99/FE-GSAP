# P26 Observer signals handoff

## Input contract

- objective: 최근 입력이 얼마나 이동했는지, 어디에 있는지, 얼마나 빠른지, 어떤 event에서 왔는지를 하나의 owned Observer signal scope에서 구분한다.
- officialPage: `Observer.deltaX`, `Observer.deltaY`, `Observer.event`, `Observer.startX`, `Observer.startY`, `Observer.isTouch`, `Observer.velocityX`, `Observer.velocityY`, `Observer.x`, `Observer.y`; reviewedAt `2026-08-08`; category `UI`; slug `observer-signals`.
- localPage: `src/content/gsap/ui/observer-signals/`; route `/fundamentals/observer-signals`.
- sourceBlockers: none; all ten rendered canonicals, official raw `https://raw.githubusercontent.com/greensock/GSAP/master/src/Observer.js`, installed source, and installed types were compared twice. The report preserves the rendered `Number` versus installed optional `startX/startY/x/y` declaration boundary.
- moduleSelection: property catalog, coordinate/phase timeline, event-source boundary, one request-to-freeze signal lab.
- learnerFlow: P25-created instance → press baseline (`startX/startY`) → current coordinate (`x/y`) → callback-cycle change (`deltaX/deltaY`) → rate (`velocityX/velocityY`) → latest event and static touch capability → explicit frozen comparison.
- relatedPages: registered P25 `/fundamentals/observer-create` is an actual `toHref` prerequisite link. P27 gesture state and P28 lifecycle are text-only ownership boundaries.

## Source manifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| OBSSIG-116 | `deltaX: Number` is horizontal pixel change since the last callback; watched event types control contribution. | #116 rendered twice; official raw `src/Observer.js`; installed source/types | verified |
| OBSSIG-117 | `deltaY: Number` is vertical pixel change since the last callback; watched event types control contribution. | #117 rendered twice; official raw `src/Observer.js`; installed source/types | verified |
| OBSSIG-120 | `event: Event` is the most recent watched input event. | #120 rendered twice; official raw `src/Observer.js`; installed source/types | verified |
| OBSSIG-125 | `startX: Number` is press-time touch/pointer `clientX` from the viewport left. | #125 rendered twice; official raw `src/Observer.js`; installed source/types | verified |
| OBSSIG-126 | `startY: Number` is press-time touch/pointer `clientY` from the viewport top. | #126 rendered twice; official raw `src/Observer.js`; installed source/types | verified |
| OBSSIG-130 | `Observer.isTouch: Number` classifies capability as 0, 1, or 2. | #130 rendered twice; official raw `src/Observer.js`; installed source/types | verified |
| OBSSIG-133 | `velocityX: Number` is horizontal pixels per second from watched event types. | #133 rendered twice; official raw `src/Observer.js`; installed source/types | verified |
| OBSSIG-134 | `velocityY: Number` is vertical pixels per second from watched event types. | #134 rendered twice; official raw `src/Observer.js`; installed source/types | verified |
| OBSSIG-135 | `x: Number` is the latest touch/pointer `clientX` from the viewport left. | #135 rendered twice; official raw `src/Observer.js`; installed source/types | verified |
| OBSSIG-136 | `y: Number` is the latest touch/pointer `clientY` from the viewport top. | #136 rendered twice; official raw `src/Observer.js`; installed source/types | verified |

## Coverage map

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| OBSSIG-116 | `ObserverSignalsPage` callback-delta explanation; `ObserverSignalLab` actual `onChange`, rAF visual readout, vector, frozen table, and descriptor code | covered |
| OBSSIG-117 | `ObserverSignalsPage` callback-delta explanation; `ObserverSignalLab` actual `onChange`, rAF visual readout, vector, frozen table, and descriptor code | covered |
| OBSSIG-120 | `ObserverSignalsPage` event-source explanation; `ObserverSignalLab` actual `observer.event.type` readout, freeze snapshot, and descriptor code | covered |
| OBSSIG-125 | `ObserverSignalsPage` press-baseline explanation; `ObserverSignalLab` actual optional-narrowed `startX` readout and frozen table | covered |
| OBSSIG-126 | `ObserverSignalsPage` press-baseline explanation; `ObserverSignalLab` actual optional-narrowed `startY` readout and frozen table | covered |
| OBSSIG-130 | `ObserverSignalsPage` static-capability explanation; `ObserverSignalLab` actual `Observer.isTouch` readout and property table | covered |
| OBSSIG-133 | `ObserverSignalsPage` velocity explanation; `ObserverSignalLab` actual `velocityX` readout, frozen table, and descriptor code | covered |
| OBSSIG-134 | `ObserverSignalsPage` velocity explanation; `ObserverSignalLab` actual `velocityY` readout, frozen table, and descriptor code | covered |
| OBSSIG-135 | `ObserverSignalsPage` current-coordinate explanation; `ObserverSignalLab` actual optional-narrowed `x` readout and frozen table | covered |
| OBSSIG-136 | `ObserverSignalsPage` current-coordinate explanation; `ObserverSignalLab` actual optional-narrowed `y` readout and frozen table | covered |

## Implementation contract

- exactFiles.create: `ObserverSignalsPage.tsx/.css`, `observer-signals.meta.ts`, `observer-signals.catalog.ts`, `observer-signals.properties.ts`, `examples/ObserverSignalLab/ObserverSignalLab.tsx/.css/useObserverSignalRuntime.ts`, this handoff.
- exactFiles.modify: none.
- exampleContracts: `ObserverSignalLab`; goal one vector and phase table distinguish baseline/current/delta/velocity/event; question `Which signal answers distance, position, speed, and source without confusing their time bases?`; representation static axes, rAF-limited visual readout, explicit frozen snapshot table, descriptor-derived code; controls focusable input pad and native freeze button; runtimeSource `examples/ObserverSignalLab/useObserverSignalRuntime.ts`; sourcePath same; runtimeOwnership `Observer.create`, one descriptor, callback reads, rAF publication, `observer.kill`; displayOwnership vector/phase/readout/code/property table; accessibility labeled focusable pad and native button, only freeze result in `role=status`, continuous values not live; motion user-driven vector update only and no tween/autonomous motion.
- nonGoals: Observer creation/registry, pressed/dragging state, enable/disable/kill API teaching, ScrollTrigger integration, inertia, and synthetic-event claims beyond runtime evidence.
- preserve: routes, program docs, shared UI, packages, tests, Git, and full builds remain untouched.

## Verification contract

- verifiedPerspectives: Source Curator PASS; Content Architect PASS; Official Coverage PASS; Learning Transformation PASS; Runtime/Display Sync PASS; Pedagogy PASS; Structure/Comment PASS; Accessibility/Motion PASS (static); Cross-page Consistency PASS; Build/Integration BLOCK.
- findings:
  - OBSIG-F01 PASS — catalog, sourceManifest, and coverageMap each contain exactly `OBSSIG-116`, `OBSSIG-117`, `OBSSIG-120`, `OBSSIG-125`, `OBSSIG-126`, `OBSSIG-130`, `OBSSIG-133`, `OBSSIG-134`, `OBSSIG-135`, `OBSSIG-136` in the same order with no duplicate.
  - OBSIG-F02 PASS — `observerSignalDescriptor` supplies actual `Observer.create` vars and the serializer; displayed callbacks exactly match runtime phase calls `onPress/onMove/onChange/onWheel: (self) => publishVisual(self, phase)`.
  - OBSIG-F03 PASS — runtime reads the actual owned Observer for each freeze request, rAF-coalesces visual-only continuous reads, cancels pending frame on cleanup, and kills only that Observer.
  - OBSIG-F04 PASS — optional installed `startX/startY/x/y` types are narrowed to nullable readouts; rendered `Number` pages remain the teaching canonical and no pre-input coordinate is invented.
  - OBSIG-F05 PASS — P25 is the sole local prerequisite through `toHref`; P27/P28 remain text-only ownership boundaries.
  - OBSIG-F06 PASS — examples contain Korean one-line comments for declarations, callback phases, effect/cleanup, and returned runtime contract.
  - OBSIG-F07 PASS — page-local TypeScript exits 0 and the scoped no-config Prettier fallback exits 0.
  - OBSIG-F08 PASS — root route and full TypeScript/Vite/Storybook integration verified.
  - OBSIG-B01 DEFERRED → PASS — browser keyboard focus order and freeze-button operation.
  - OBSIG-B02 DEFERRED → PASS — browser `prefers-reduced-motion` and user-driven vector presentation.
  - OBSIG-B03 DEFERRED → PASS — browser 320/390px table/code overflow layout.
  - OBSIG-B04 DEFERRED → PASS — browser pointer/wheel input and frozen snapshot result.
- verificationEvidence: task-6 report records two rendered reads, two official raw reads, two installed source/type reads per canonical; exact 10-row audit; page-local TypeScript; scoped Prettier fallback; comment and assigned-path diff self-review.
- releaseDecision: PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 재감사

- officialSourceCheck: Observer의 각 signal 공식 문서를 다시 대조했다. `deltaX/deltaY`는 해당 축 callback 이후의 변화량이고, `x/y`와 `startX/startY`는 pointer·touch client 좌표이며, `velocityX/velocityY`는 초당 pixel 값이라는 설명을 확인했다.
- findings:
  - OBSIG-A01 `BLOCK → ADDRESSED` — 학습 화면에 노출되던 coverage 개수·내부 source ID·P번호·소유권 표현을 제거하고 실제 signal의 시간 기준을 바로 읽도록 바꿨다.
  - OBSIG-A02 `BLOCK → ADDRESSED` — `deltaX/deltaY`의 기준을 막연한 마지막 callback이 아니라 해당 축의 마지막 callback으로 바로잡았다.
  - OBSIG-A03 `PASS` — descriptor의 type·tolerance·debounce와 네 callback이 runtime과 일치하고, 표시 코드는 target·signal reader·plugin 등록·instance cleanup을 포함해 독립 실행된다.
  - OBSIG-A04 `DEFERRED` — pointer·wheel 입력, keyboard focus, 320/390px overflow, reduced-motion 화면 확인은 사용자 승인에 따라 수행하지 않았다.
  - OBSIG-A05 `N/A` — Storybook은 `c309e13`에서 의도적으로 제거되어 검증 대상이 아니다.
- batchStaticVerification: `PASS` — `npx tsc --noEmit --pretty false`와 대상 범위 `git diff --check`가 exit 0이다.
- overallDecision: `NOT VERIFIED`
- releaseDecision: `NOT VERIFIED` — 정적 BLOCK은 해소했지만 브라우저 관점은 `DEFERRED`다.
