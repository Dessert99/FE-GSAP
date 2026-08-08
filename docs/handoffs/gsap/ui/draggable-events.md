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
| BROWSER-P07-001 | DEFERRED | keyboard focus/control operation, reduced-motion, 320/390px overflow, physical drag/buttons require final browser batch | approved four browser checks | root browser batch |

## verificationEvidence

- rendered canonical pass 1 and 2: #21/#34/#55 opened directly on 2026-08-08.
- official raw pass 1 and 2: `greensock/GSAP` `src/Draggable.js` inspected for dispatcher, pressed transitions and time methods.
- installed pass 1 and 2: `node_modules/gsap/Draggable.js` and `types/draggable.d.ts` inspected for callback type list, add/remove signatures, listener de-duplication, pressed transitions and static/instance elapsed methods.
- runtime probe: installed source establishes simulated `dispatchEvent()` calls registered listener but does not change physical `isPressed`/last-drag time; lab labels this boundary explicitly.
- page-local static checks: PASS — catalog/sourceManifest/coverageMap 8/8/8, duplicate/missing ID 0, formatter PASS, continuous live/timer 없음, listener removal·instance kill·P03/P04 links 확인, scoped diff check PASS.
- root integration: PASS — `npx tsc --noEmit`, Vite 891 modules, Storybook 1029 modules and `git diff --check` exited 0; Vite and Storybook emitted `DraggableEventsPage` JS/CSS chunks.

## releaseDecision

PASS — route/build integration is complete. Only BROWSER-P07-001’s four approved browser checks remain DEFERRED for the final browser batch.
