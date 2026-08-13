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
  - VTL-B01 DEFERRED → PASS — keyboard focus/control operation in a real browser.
  - VTL-B02 DEFERRED → PASS — real `prefers-reduced-motion` transition.
  - VTL-B03 DEFERRED → PASS — 320/390px layout and overflow.
  - VTL-B04 DEFERRED → PASS — actual lab interaction result.
- verificationEvidence: rendered/raw/installed two-pass evidence and Node probe are recorded in `task-10-report.md`; root reran TypeScript, Vite, Storybook and diff checks after route registration.
- releaseDecision: PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 Batch B 재감사

- `VTL-OC-20260813` | PASS | 현재 공식 `VelocityTracker`, `addProp()`, `removeProp()`, `track()`, `untrack()` 문서와 설치 소스의 `add/remove` API를 대조 | 렌더 문서와 실제 설치 API의 이름·반환 차이를 계속 명시한다.
- `VTL-RDS-20260813` | BLOCK → PASS | 코드 패널이 rotation 조작 뒤에도 x membership에서 추론한 호출을 표시하고 nudge·track·untrack의 실제 최근 동작을 반영하지 못했다 | runtime 각 action에서 실행한 property·type·값으로 `lastActionCode`를 함께 갱신한다.
- `VTL-WRITE-20260813` | BLOCK → PASS | learner-facing `ownership`과 내부 P15 번호를 사용했다 | “tracker 생성”과 개념명 링크로 바꿨다.
- `VTL-BROWSER-20260813` | DEFERRED | 키보드/포커스, reduced motion, 320/390px, membership 조작 결과 | 이번 배치에서는 브라우저를 조작하지 않았다.
- `VTL-STORYBOOK-20260813` | N/A | Storybook은 c309e13에서 의도적으로 삭제됨 | 실행하지 않았다.

currentReleaseDecision
  PASS — runtime/display 및 문장 BLOCK을 해소했고 browser-only 4건은 DEFERRED다. 과거 빌드와 browser closure는 현재 근거가 아니다.

### 2026-08-13 self cross-review

- `VTL-RDS-20260813-02 | BLOCK → PASS` — 최근 action 한 줄만 표시해 `target`·`tracker`가 정의되지 않았다. 실제 target query, tracker setup, 최근 action, property remove와 whole-target cleanup을 한 실행 문맥으로 묶은 뒤 재독해 PASS.
- 통합 검증: `npx tsc --noEmit --pretty false` exit 0, Batch B 21 page dir + handoff 범위 `git diff --check` exit 0.

### 2026-08-13 최종 교차검토 판정

- Storybook: `N/A` — c309e13에서 의도적으로 삭제되어 실행하지 않았다.
- Browser: `DEFERRED` — 승인된 브라우저 실조작 관점을 수행하지 않았다.
- overallDecision: `NOT VERIFIED` — 정적 BLOCK은 없지만 Browser 실조작이 `DEFERRED`다.
- releaseDecision: `NOT VERIFIED` — 브라우저 관점을 현재 증거로 확인하지 않았다.
