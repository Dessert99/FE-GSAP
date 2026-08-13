# P07 Draggable events handoff

## objective

`DraggableEventsPage`는 P03 instance와 P04 gesture timing을 전제로, listener 등록·`isPressed`·recent-drag elapsed time으로 click/drag 의도를 구분하게 한다.

## officialPage

- title: Draggable gesture events and recent-drag state
- canonicalUrl: `https://gsap.com/docs/v3/Plugins/Draggable/addEventListener()/`, `https://gsap.com/docs/v3/Plugins/Draggable/isPressed/`, `https://gsap.com/docs/v3/Plugins/Draggable/static.timeSinceDrag()/`
- reviewedAt: 2026-08-08
- category: UI / Draggable
- slug: `draggable-events`

## localPage

- localPath: `src/content/gsap/ui/draggable-events/`
- route: `/fundamentals/draggable-events`

## sourceManifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| DRAGEVENT-21-01 | addEventListener(type, callback)는 type 발생마다 callback을 등록한다. | #21 Details | verified |
| DRAGEVENT-21-02 | rendered 문서는 listener this가 event를 발생시킨 Draggable target이라고 설명한다. | #21 Details | verified |
| DRAGEVENT-21-03 | event 목록은 press, click, dragstart, drag, dragend, release, throwcomplete, throwupdate다. | #21 Events | verified |
| DRAGEVENT-21-04 | usage는 press listener에서 this target의 backgroundColor를 gsap.to로 바꾼다. | #21 Usage | verified |
| DRAGEVENT-34-01 | isPressed는 pressed 상태이면 true인 Boolean property다. | #34 Details | verified |
| DRAGEVENT-55-01 | static timeSinceDrag()는 마지막 drag 종료 뒤 elapsed seconds Number를 반환한다. | #55 signature/Returns | verified |
| DRAGEVENT-55-02 | 공식 click guard 예제는 0.2초 threshold와 dragClickables: true를 함께 사용한다. | #55 Details/example | verified |
| DRAGEVENT-55-03 | timeSinceDrag() instance method도 제공된다. | #55 Details | verified |

## sourceBlockers

없음. installed dispatcher는 listener `this`를 Draggable instance로 call하고 event payload에 DOM target을 넣어 rendered #21의 target-this 설명과 다르다. 이는 official item을 바꾸지 않는 implementation mismatch이며 `ListenerCleanupSection`과 아래 evidence에 분리했다.

## moduleSelection

- callable method + instance state + concept/guide
- `GestureEventLab`: one draggable target, descriptor-derived listener registration/code, event-driven log, accessible simulation buttons, static elapsed decision, listener/instance cleanup

## learnerFlow

1. gesture event는 의미 있는 한 순간의 notification이다.
2. isPressed는 press부터 release까지 읽는 Boolean state다.
3. timeSinceDrag()는 click 결정 순간에만 elapsed seconds로 읽는다.
4. 같은 callback reference로 listener를 제거하고 instance를 kill한다.
5. recent-drag threshold로 click과 drag 의도를 분리한다.

## coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| DRAGEVENT-21-01 | `GestureEventMentalModelSection`, `GestureEventLab` descriptor registration | covered |
| DRAGEVENT-21-02 | `ListenerCleanupSection` rendered claim/mismatch warning | covered |
| DRAGEVENT-21-03 | `GestureEventMentalModelSection` complete event list | covered |
| DRAGEVENT-21-04 | `ListenerCleanupSection` official usage explanation | covered |
| DRAGEVENT-34-01 | `PressedTimingSection`, `GestureEventLab` snapshot | covered |
| DRAGEVENT-55-01 | `RecentDragDecisionSection`, `GestureEventLab` elapsed readout | covered |
| DRAGEVENT-55-02 | `ClickDragBoundarySection`, `GestureEventLab` threshold decision | covered |
| DRAGEVENT-55-03 | `RecentDragDecisionSection` static/instance distinction | covered |

## relatedPages

- P03 `/fundamentals/draggable-create`
- P04 `/fundamentals/draggable-coordinates`
- P05 bounds·axis, P06 lifecycle commands, P08 collision·momentum은 text-only boundary다.

## exactFiles

- create: all files under `src/content/gsap/ui/draggable-events/`
- create: `docs/handoffs/gsap/ui/draggable-events.md`
- modify: none

## exampleContracts

- name: GestureEventLab
- goal: event listener가 physical/simulated gesture 순간에만 log하고 recent drag click guard를 판단함을 보인다.
- question: polling 없이 press·drag·release와 recent click guard를 어떻게 구분하는가?
- representation: target 1개, descriptor-derived registration/code, buttons, snapshot, log, threshold decision
- controls: six event dispatch buttons, recent-drag decision button
- runtimeSource: `examples/GestureEventLab/useGestureEventRuntime.ts`
- sourcePath: `examples/GestureEventLab/useGestureEventRuntime.ts`
- runtimeOwnership: plugin registration, create, descriptors, listener registration/removal, event state/log, static elapsed reads, kill cleanup
- displayOwnership: markup, controls, serializer, snapshot, log, table, learning panels
- accessibility: focusable target, native labelled buttons, no continuous live region/polling, simulation does not falsely set physical pressed state
- motion: no autonomous animation; direct user drag only

## nonGoals

- P05 bounds/axis, P06 lifecycle command API details, P08 collision/inertia details
- listener `this` runtime mismatch을 공식 계약으로 재정의하지 않음

## preserve

- routes, program docs, shared UI, global CSS, package files, Git state

## verifiedPerspectives

- Source Curator: PASS — 8 official technical items, 8 covered rows.
- Content Architect: PASS — required learner flow and one-event-driven-lab contract fixed.
- Official Coverage: PASS — sourceManifest/coverageMap item IDs match.
- Learning Transformation: PASS — term definition, timing, decision, boundary and use case are separate sections.
- Runtime/Display Sync: PASS — one descriptor array drives listener registration, simulation buttons and displayed code.
- Pedagogy: PASS — one target and one gesture question; simulation limitation is explicit.
- Structure/Comment: PASS — page composes sections; runtime owns GSAP lifecycle; Korean one-line comments included.
- Accessibility/Motion: PASS-static — native buttons/focus target, no live/polling elapsed time, no autonomous motion.
- Cross-page Consistency: PASS — only P03/P04 registered prerequisite links; P05/P06/P08 text-only.
- Build/Integration: PASS — root registered the P07 route; TypeScript, Vite 891 modules and Storybook 1029 modules passed with both page chunks emitted.

## findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| OC-P07-001 | PASS | 8 manifest rows, catalog official denominator 8, 8 coverage rows | Official Coverage | none |
| LT-P07-001 | PASS | five required learner-flow sections and one target lab | Learning Transformation | none |
| RDS-P07-001 | PASS | `gestureEventDescriptors` drives runtime registration, buttons and serializer | Runtime/Display Sync | none |
| A11Y-P07-001 | PASS | no live region or elapsed polling; simulation does not claim physical state | static Accessibility/Motion | none |
| IMPL-P07-001 | ADVISORY | raw official/installed dispatcher `callback.call(this, { target: this.target })` conflicts with rendered this-target text | context safety | use event payload/no this dependence |
| BUILD-P07-001 | PASS | `/fundamentals/draggable-events`, TypeScript exit 0, Vite 891 modules, Storybook 1029 modules, both `DraggableEventsPage` chunks and diff check | integration | none |
| BROWSER-P07-001 | DEFERRED → PASS | keyboard focus/control operation, reduced-motion, 320/390px overflow, physical drag/buttons require final browser batch | approved four browser checks | root browser batch |

## verificationEvidence

- rendered canonical pass 1 and 2: #21/#34/#55 opened directly on 2026-08-08.
- official raw pass 1 and 2: `greensock/GSAP` `src/Draggable.js` inspected for dispatcher, pressed transitions and time methods.
- installed pass 1 and 2: `node_modules/gsap/Draggable.js` and `types/draggable.d.ts` inspected for callback type list, add/remove signatures, listener de-duplication, pressed transitions and static/instance elapsed methods.
- runtime probe: installed source establishes simulated `dispatchEvent()` calls registered listener but does not change physical `isPressed`/last-drag time; lab labels this boundary explicitly.
- page-local static checks: PASS — catalog/sourceManifest/coverageMap 8/8/8, duplicate/missing ID 0, formatter PASS, continuous live/timer 없음, listener removal·instance kill·P03/P04 links 확인, scoped diff check PASS.
- root integration: PASS — `npx tsc --noEmit`, Vite 891 modules, Storybook 1029 modules and `git diff --check` exited 0; Vite and Storybook emitted `DraggableEventsPage` JS/CSS chunks.

## releaseDecision

PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 Batch B 재감사

- 공식 대조: `addEventListener()`, `isPressed`, `Draggable.timeSinceDrag()` canonical과 Draggable event 목록을 현재 웹에서 다시 확인했다.
- `WRITE-B07-01 | BLOCK → PASS` — 첫 화면의 coverage/implementation 수치와 본문의 P번호·검수 용어를 event 순서와 직접적인 버전 차이 설명으로 교체했다.
- `RDS-B07-01 | BLOCK → PASS` — 코드 패널이 listener 등록만 보여 주고 실제 `Draggable.create()`와 동일 callback cleanup을 숨기던 문제를 수정해 runtime lifecycle과 일치시켰다.
- `FACT-B07-01 | ADVISORY` — 공식 listener `this` 설명과 설치된 GSAP 3.15.0 dispatcher가 다르므로 둘을 구분하고 예제는 `this`에 의존하지 않는다.
- Storybook: c309e13에서 삭제되어 `N/A`.
- Browser: `DEFERRED` — keyboard/focus, 320/390px, 실제 press·drag·release·simulation 결과를 실조작하지 않았다. 자동 motion은 없다.
- current releaseDecision: `PASS` — 미해결 BLOCK 없음. Browser 항목은 승인된 `DEFERRED`다.

### 2026-08-13 self cross-review

- `RDS-B07-02 | BLOCK → PASS` — serializer의 `onGesture`가 정의되지 않았고 cleanup 단계가 setup 직후 실행되는 것처럼 보였다. 실제 target query, 동일 callback 등록·해제, 별도 `cleanup()`과 transform 복구로 수정한 뒤 재독해 PASS.
- 통합 검증: `npx tsc --noEmit --pretty false` exit 0, Batch B 21 page dir + handoff 범위 `git diff --check` exit 0.

### 2026-08-13 최종 교차검토 판정

- Storybook: `N/A` — c309e13에서 의도적으로 삭제되어 실행하지 않았다.
- Browser: `DEFERRED` — 승인된 브라우저 실조작 관점을 수행하지 않았다.
- overallDecision: `NOT VERIFIED` — 정적 BLOCK은 없지만 Browser 실조작이 `DEFERRED`다.
- releaseDecision: `NOT VERIFIED` — 브라우저 관점을 현재 증거로 확인하지 않았다.
