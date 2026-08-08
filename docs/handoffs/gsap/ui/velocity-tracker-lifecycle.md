# P16 VelocityTracker lifecycle handoff

## Input contract

- objective: tracker ownership → choose property set → add/remove → whole-target untrack → cleanup을 one stable x/rotation target으로 학습한다.
- officialPage: title `VelocityTracker`; canonicalUrl `#79 VelocityTracker`, `#80 addProp()`, `#85 removeProp()`, `#87 track()`, `#88 untrack()`; reviewedAt `2026-08-08`; category `UI`; slug `velocity-tracker-lifecycle`.
- localPage: localPath `src/content/gsap/ui/velocity-tracker-lifecycle/`; route `/fundamentals/velocity-tracker-lifecycle`.
- sourceBlockers: none.
- moduleSelection: class/instance lifecycle, static callable methods, property-set guide, one interactive membership inspector.
- learnerFlow: tracker ownership → choose property set → add/remove → whole-target untrack → cleanup.
- relatedPages: P15 `/fundamentals/inertia` is the registered consumer prerequisite; P17 read/query detail remains text-only until integration.

## Source manifest

All five rendered official canonicals were opened twice on 2026-08-08. Official raw `src/utils/VelocityTracker.js` and `types/utils/VelocityTracker.d.ts` were opened twice and compared with installed `node_modules/gsap/utils/VelocityTracker.js` and `node_modules/gsap/types/utils/VelocityTracker.d.ts`.

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| VTL-79 | InertiaPlugin file의 VelocityTracker는 numeric/function property velocity를 자동 추적하며 static track으로 target당 하나의 instance를 사용한다; real property만 추적하고 정확한 read에는 100ms와 2 ticker ticks가 필요하다. | #79 Description/properties/warning; raw lines 64–89, 144–160 | verified |
| VTL-80 | rendered `addProp()`은 property tracking 추가를 설명한다. | #80 Description; raw/type instance `add(property, type)` lines 104–116 / d.ts line 10 | verified |
| VTL-85 | rendered `removeProp()`은 특정 property tracking 중지를 설명한다. | #85 Details; raw/type instance `remove(property)` lines 117–134 / d.ts line 12 | verified |
| VTL-87 | static track은 property velocity tracking을 시작하고 tracker를 반환한다; rendered는 VelocityTracker라고 설명하지만 current raw/type은 target마다 하나인 tracker array를 반환한다. | #87 Returns/Details; raw lines 144–160 / d.ts line 20 | verified |
| VTL-88 | static untrack은 property list 또는 property 생략 form으로 target의 tracking을 멈춘다. | #88 Details/examples; raw lines 162–170 / d.ts line 21 | verified |

## Coverage map

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| VTL-79 | `TrackerOwnershipSection`, runtime descriptor/track startup, lab warning copy | covered |
| VTL-80 | `AddRemoveSection`, `toggleProperty()` actual `tracker.add()` | covered |
| VTL-85 | `AddRemoveSection`, `toggleProperty()` and cleanup actual `tracker.remove()` | covered |
| VTL-87 | `PropertySetSection`, descriptor-derived `VelocityTracker.track()` and lab code | covered |
| VTL-88 | `WholeTargetUntrackSection`, `untrackAll()` and cleanup `VelocityTracker.untrack(target)` | covered |

## Implementation contract

- exactFiles.create: `VelocityTrackerLifecyclePage.tsx/.css`, meta/catalog/properties, PageCoverage, SectionHeading, five sections, and `examples/VelocityTrackerLifecycleLab/*`.
- exactFiles.modify: none.
- exampleContracts: name `VelocityTrackerLifecycleLab`; goal one stable target의 x/rotation membership lifecycle; question property 하나를 remove할 때와 target 전체를 untrack할 때 무엇이 남는가; representation one button target plus sparse inspector; controls native x/rotation unit buttons, membership buttons, track set, untrack all; runtimeSource `useVelocityTrackerLifecycleRuntime.ts`; sourcePath same; runtimeOwnership InertiaPlugin/VelocityTracker registration, static track/getByTarget/isTracking/untrack, instance add/remove, cleanup; displayOwnership descriptor-derived code, membership/value/status; accessibility native labelled controls, explicit px/deg, `role=status` only for discrete lifecycle result; motion actual `useReducedMotion()` result, no autonomous tween and instant `gsap.set()` target mutation.
- nonGoals: no Inertia destination/tween lesson, no detailed `tracker.get()` query lesson (P17 ownership), no Draggable setup.
- preserve: routes, program docs, shared UI, package files, tests and Git state untouched; root owns integration.

## Verification contract

- verifiedPerspectives: Source Curator PASS; Content Architect PASS; Official Coverage PASS; Learning Transformation PASS; Runtime/Display Sync PASS; Pedagogy PASS; Structure/Comment PASS; Accessibility/Motion static PASS; Cross-page Consistency PASS.
- findings:
  - VTL-F01 PASS — five official catalog IDs, sourceManifest rows, and coverage rows are exactly 5/5/5.
  - VTL-F02 PASS — the descriptor is the only source for static comma-list call, type list, membership controls and displayed code; the runtime uses real static `track`/`getByTarget`/`isTracking`/`untrack` and instance `add`/`remove`.
  - VTL-F03 PASS — source/probe difference is explicit: rendered #80/#85 say `addProp/removeProp`, while current raw, installed source, and d.ts expose `add/remove`; rendered #87 calls its return a tracker while raw/d.ts return a tracker array; raw accepts comma-separated type values although d.ts names a single `VelocityType`.
  - VTL-F04 PASS — the Node probe found `getByTarget(target) === tracker`, both properties active after track, one property remains after `remove`, and `untrack(target)` clears membership but retains the lookup-associated instance via shallow kill.
  - VTL-F05 PASS — native buttons have keyboard activation and explicit px/deg text; sparse state updates only after controls; status is a discrete `role=status`; mobile CSS stacks panels.
  - VTL-F06 PASS — P15 prerequisite uses `toHref`; P17 is text-only boundary.
  - VTL-F07 PASS — root route registration, TypeScript, Vite 1010 modules and Storybook 1148 modules passed with page chunks emitted.
  - VTL-B01 DEFERRED — keyboard focus/control operation in a real browser.
  - VTL-B02 DEFERRED — real `prefers-reduced-motion` transition.
  - VTL-B03 DEFERRED — 320/390px layout and overflow.
  - VTL-B04 DEFERRED — actual lab interaction result.
- verificationEvidence: rendered/raw/installed two-pass evidence and Node probe are recorded in `task-10-report.md`; root reran TypeScript, Vite, Storybook and diff checks after route registration.
- releaseDecision: PASS with approved browser B01–B04 DEFERRED; they are not release blockers.
