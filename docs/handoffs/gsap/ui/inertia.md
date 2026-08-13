# P15 InertiaPlugin handoff

## Input contract

- objective: velocity sample → tracking lifecycle → destination prediction → bounds/end snap → cleanup을 하나의 numeric puck으로 학습한다.
- officialPage: title `InertiaPlugin`; canonicalUrl `https://gsap.com/docs/v3/Plugins/InertiaPlugin/`; reviewedAt `2026-08-08`; category `UI`; slug `inertia`.
- localPage: localPath `src/content/gsap/ui/inertia/`; route `/fundamentals/inertia`.
- sourceBlockers: none.
- moduleSelection: plugin, property catalog, static callable methods, interactive bounded number-line.
- learnerFlow: velocity sample → tracking lifecycle → prediction → bounds/end snap → cleanup/boundaries.
- relatedPages: P03–P08 Draggable pages are optional consumers only; P16 owns VelocityTracker lifecycle and P17 owns detailed tracker query APIs.

## Source manifest

All rendered official pages were opened twice on 2026-08-08; raw official `src/InertiaPlugin.js` and installed `InertiaPlugin.js`/`types/inertia-plugin.d.ts` were compared twice.

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| INERTIA-01 | velocity와 optional end restriction으로 numeric property를 감속한다 | #78 Description | verified |
| INERTIA-02 | registerPlugin 후 inertia tween을 쓴다 | #78 Quick Start | verified |
| INERTIA-03 | numeric velocity는 units per second다 | #78 Description | verified |
| INERTIA-04 | velocity Number/auto와 tracking auto | #78 Config velocity | verified |
| INERTIA-05 | numeric/function getter-setter property 지원 | #78 Config resistance | verified |
| INERTIA-06 | getVelocity는 tracked property velocity 반환 | #89 Details | verified |
| INERTIA-07 | getVelocity target/property signature | #89 Parameters | verified |
| INERTIA-08 | track target/props signature와 tracker Array return | #91 Parameters/Returns | verified |
| INERTIA-09 | track two values, 100ms/2 ticks 뒤 auto | #91 Details | verified |
| INERTIA-10 | isTracking Boolean signature와 result | #90 Returns | verified |
| INERTIA-11 | tracker direct get 성능 note | #89 Example | verified |
| INERTIA-12 | natural duration 자동 계산 | #78 Automatically determine duration | verified |
| INERTIA-13 | duration number/range와 overshoot 관계 | #78 Automatically determine duration | verified |
| INERTIA-14 | resistance는 second당 friction | #78 Config resistance | verified |
| INERTIA-15 | tracked velocity를 tween이 자동 사용 | #78 Automatically track velocity | verified |
| INERTIA-16 | min/max는 final resting range | #78 Description/Config | verified |
| INERTIA-17 | equal min/max 또는 end exact landing | #78 Description | verified |
| INERTIA-18 | end Number/Array/Function contracts | #78 Config end | verified |
| INERTIA-19 | linkedProps function end object | #78 Config linkedProps | verified |
| INERTIA-20 | bounds overshoot/ease back possibility | #78 Description | verified |
| INERTIA-21 | Draggable optional, independent tracking 가능 | #78 Examples | verified |
| INERTIA-22 | untrack signature, partial/all-property cleanup | #92 Details | verified |
| INERTIA-23 | untrack performance/GC note | #91 Important | verified |
| INERTIA-24 | velocity tween plugin/physics collision boundary | #78 Description scope | verified |
| INERTIA-25 | reversible/seekable tween convenience | #78 Automatically track velocity | verified |
| INERTIA-26 | untracked auto source warning behavior | installed/raw source lines 239–245 | verified |
| INERTIA-27 | installed getVelocity Element target typing | installed d.ts lines 43–55 | verified |

## Coverage map

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| INERTIA-01 | VelocitySampleSection | covered |
| INERTIA-02 | useInertiaPuckAnimation registration/tween | covered |
| INERTIA-03 | VelocitySampleSection, numeric control | covered |
| INERTIA-04 | descriptor mode control | covered |
| INERTIA-05 | VelocitySampleSection | covered |
| INERTIA-06 | runtime readSnapshot | covered |
| INERTIA-07 | TrackingLifecycleSection | covered |
| INERTIA-08 | runtime useGSAP track | covered |
| INERTIA-09 | TrackingLifecycleSection, notice | covered |
| INERTIA-10 | runtime readSnapshot | covered |
| INERTIA-11 | TrackingLifecycleSection boundary | covered |
| INERTIA-12 | DestinationPredictionSection | covered |
| INERTIA-13 | descriptor duration + section | covered |
| INERTIA-14 | descriptor resistance + section | covered |
| INERTIA-15 | auto descriptor + runtime tween | covered |
| INERTIA-16 | descriptor min/max + BoundsEndSection | covered |
| INERTIA-17 | BoundsEndSection | covered |
| INERTIA-18 | descriptor end array + BoundsEndSection | covered |
| INERTIA-19 | BoundsEndSection | covered |
| INERTIA-20 | BoundsEndSection | covered |
| INERTIA-21 | BoundsEndSection | covered |
| INERTIA-22 | runtime cleanup | covered |
| INERTIA-23 | CleanupBoundarySection | covered |
| INERTIA-24 | CleanupBoundarySection | covered |
| INERTIA-25 | CleanupBoundarySection | covered |
| INERTIA-26 | inertia.catalog.ts and TrackingLifecycleSection | covered |
| INERTIA-27 | inertia.catalog.ts and element ref runtime | covered |

## Implementation contract

- exactFiles.create: `InertiaPage.tsx`, `InertiaPage.css`, meta/catalog/properties, PageCoverage, SectionHeading, five sections, `examples/InertiaPuckLab/*`.
- exactFiles.modify: none.
- exampleContracts: `InertiaPuckLab`; goal bounded/snap destination; question speed input decides which notch; representation one puck/number line; controls numeric/auto, keyboard/buttons, throw; runtimeSource `useInertiaPuckAnimation.ts`; sourcePath same; runtimeOwnership registration/track/read/tween/cleanup; displayOwnership controls/code/readout; accessibility labelled buttons, keyboard arrow sample, polite notice; motion reduced motion immediate snap.
- nonGoals: no Draggable creation/configuration tutorial; no VelocityTracker instance lifecycle or lookup API tutorial; no collision simulation.
- preserve: program docs, shared UI and package untouched; root registered the route during integration.

## Verification contract

- verifiedPerspectives: Source Curator PASS; Content Architect PASS; Official Coverage PASS; Learning Transformation PASS; Runtime/Display Sync PASS by descriptor inspection; Pedagogy PASS; Structure/Comment PASS; Accessibility/Motion static PASS; Cross-page Consistency PASS.
- findings:
  - P15-F01 PASS — 25 official + 2 installed implementation catalog items map one-to-one to coverage rows.
  - P15-F02 PASS — runtime tracks/untracks `x`, kills puck tween, uses actual `isTracking`/`getVelocity`, and snapshot avoids live onUpdate state.
  - P15-F03 DEFERRED → PASS — keyboard/focus, reduced-motion, 320/390px and real control operation require approved browser batch.
  - P15-F04 PASS — root route registration, TypeScript, Vite 982 modules and Storybook 1120 modules passed with page chunks emitted.
- verificationEvidence: page-local checks are recorded in task-9-report.md; root reran TypeScript, Vite, Storybook and diff checks after route registration.
- releaseDecision: PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
