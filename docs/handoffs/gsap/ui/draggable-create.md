# Draggable create page handoff

## input contract

```text
objective
  P03에서 target 하나에 Draggable instance를 create하고 같은 target으로 get해 target·vars를 검사하는 최소 mental model을 만든다.

officialPage
  title: Draggable / Draggable.create() / Draggable.get() / target / vars
  canonicalUrl:
    https://gsap.com/docs/v3/Plugins/Draggable/
    https://gsap.com/docs/v3/Plugins/Draggable/static.create()/
    https://gsap.com/docs/v3/Plugins/Draggable/static.get()/
    https://gsap.com/docs/v3/Plugins/Draggable/target/
    https://gsap.com/docs/v3/Plugins/Draggable/vars/
  reviewedAt: 2026-08-08
  category: UI
  slug: draggable-create

localPage
  localPath: src/content/gsap/ui/draggable-create/
  route: /fundamentals/draggable-create (registered)
```

### sourceManifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| DRAGCREATE-01 | Draggable의 DOM drag 역할과 registerPlugin prerequisite | #20 overview Quick Start | verified |
| DRAGCREATE-02 | 기본 create는 bounds·kinetic motion 없이 draggable하게 만든다 | #20 overview Usage | verified |
| DRAGCREATE-03 | 일곱 supported type 문자열 | #20 overview Features | verified |
| DRAGCREATE-04 | clickable child와 dragClickables 경계 | #20 overview Config Object | verified |
| DRAGCREATE-05 | create signature·static constructor boundary | #52 signature | verified |
| DRAGCREATE-06 | element·selector·array target 입력 | #52 Parameters/Details | verified |
| DRAGCREATE-07 | vars가 optional configuration을 담는다 | #52 Parameters | verified |
| DRAGCREATE-08 | create array return과 target별 instance | #52 Returns | verified |
| DRAGCREATE-09 | instance 하나는 element 하나에 연결된다 | #52 Details | verified |
| DRAGCREATE-10 | get signature와 target-associated instance lookup | #53 signature | verified |
| DRAGCREATE-11 | get target은 element 또는 selector | #53 Parameters | verified |
| DRAGCREATE-12 | get은 instance가 없으면 undefined | #53 Returns | verified |
| DRAGCREATE-13 | 여러 target 뒤 개별 target lookup official example | #53 Details | verified |
| DRAGCREATE-14 | target은 draggable 중인 object | #56 Details | verified |
| DRAGCREATE-15 | vars는 constructor configuration variables를 저장한다 | #59 Details | verified |
| DRAGCREATE-16 | overview의 target·vars Object property 표기 | #20 Properties | verified |
| DRAGCREATE-17 | inertia true의 release Tween은 이후 scope | #20 Features/Properties | verified |
| DRAGCREATE-18 | callbacks/event dispatching은 이후 scope | #20 Features | verified |
| DRAGCREATE-21 | activeCursor — press부터 release까지 쓸 CSS cursor String | #52 Config Object | verified |
| DRAGCREATE-22 | allowContextMenu — context menu 허용 Boolean, 기본값 false | #52 Config Object | verified |
| DRAGCREATE-23 | allowEventDefault — original event preventDefault 생략 Boolean, 기본값 false | #52 Config Object | verified |
| DRAGCREATE-24 | allowNativeTouchScrolling — single-axis 반대 축 native touch scrolling Boolean, 기본값 true | #52 Config Object | verified |
| DRAGCREATE-25 | autoScroll — edge 40px 안 non-zero auto-scroll Number, 기본값 0 | #52 Config Object | verified |
| DRAGCREATE-26 | bounds — Element·String·Object 기반 container/coordinate 제한 | #52 Config Object | verified |
| DRAGCREATE-27 | callbackScope — callback this scope Object와 deprecated legacy scope | #52 Config Object | verified |
| DRAGCREATE-28 | clickableTest — pressed element의 clickable 여부를 정하는 Function | #52 Config Object | verified |
| DRAGCREATE-29 | cursor — rotation 외 type의 기본 move cursor를 덮는 String | #52 Config Object | verified |
| DRAGCREATE-30 | dragClickables — clickable child native behavior를 우선할 수 있는 Boolean | #52 Config Object | verified |
| DRAGCREATE-31 | dragResistance — drag 중 resistance 0~1 Number | #52 Config Object | verified |
| DRAGCREATE-32 | edgeResistance — bounds 밖 resistance 0~1 Number | #52 Config Object | verified |
| DRAGCREATE-33 | force3D — GPU compositing 3D transform 사용 Boolean | #52 Config Object | verified |
| DRAGCREATE-34 | inertia — InertiaPlugin momentum용 Boolean 또는 Object | #52 Config Object | verified |
| DRAGCREATE-35 | snap — inertia release landing rule Function·Object·Array | #52 Config Object | verified |
| DRAGCREATE-36 | onThrowUpdate — inertia tween render callback Function | #52 Config Object | verified |
| DRAGCREATE-37 | onThrowComplete — inertia tween complete callback Function | #52 Config Object | verified |
| DRAGCREATE-38 | throwResistance — inertia friction Number, 기본값 1000 | #52 Config Object | verified |
| DRAGCREATE-39 | maxDuration — inertia tween 최대 duration Number, 기본값 10 | #52 Config Object | verified |
| DRAGCREATE-40 | minDuration — inertia tween 최소 duration Number, 기본값 0.2 | #52 Config Object | verified |
| DRAGCREATE-41 | overshootTolerance — inertia overshoot Number, 기본값 1 | #52 Config Object | verified |
| DRAGCREATE-42 | liveSnap — drag 중 snap Function·Boolean·Array·Object | #52 Config Object | verified |
| DRAGCREATE-43 | lockAxis — initial direction axis lock Boolean | #52 Config Object | verified |
| DRAGCREATE-44 | minimumMovement — drag 판단 이동 threshold Number | #52 Config Object | verified |
| DRAGCREATE-45 | onClick — click gesture callback Function | #52 Config Object | verified |
| DRAGCREATE-46 | onClickParams — onClick optional parameter Array | #52 Config Object | verified |
| DRAGCREATE-47 | onDrag — requestAnimationFrame당 한 번 drag callback Function | #52 Config Object | verified |
| DRAGCREATE-48 | onDragParams — onDrag optional parameter Array | #52 Config Object | verified |
| DRAGCREATE-49 | onDragEnd — release 뒤 drag callback Function | #52 Config Object | verified |
| DRAGCREATE-50 | onDragEndParams — onDragEnd optional parameter Array | #52 Config Object | verified |
| DRAGCREATE-51 | onDragStart — 2px 초과 drag start callback Function | #52 Config Object | verified |
| DRAGCREATE-52 | onDragStartParams — onDragStart optional parameter Array | #52 Config Object | verified |
| DRAGCREATE-53 | onLockAxis — axis 결정 callback Function | #52 Config Object | verified |
| DRAGCREATE-54 | onMove — frame당 여러 번 가능한 move callback Function | #52 Config Object | verified |
| DRAGCREATE-55 | onPress — target press callback Function | #52 Config Object | verified |
| DRAGCREATE-56 | onPressInit — starting values 기록 전 callback Function | #52 Config Object | verified |
| DRAGCREATE-57 | onPressParams — onPress optional parameter Array | #52 Config Object | verified |
| DRAGCREATE-58 | onRelease — drag 여부와 무관한 release callback Function | #52 Config Object | verified |
| DRAGCREATE-59 | onReleaseParams — onRelease optional parameter Array | #52 Config Object | verified |
| DRAGCREATE-60 | trigger — target 전체 대신 drag 시작 area를 정하는 Element·String·Object | #52 Config Object | verified |
| DRAGCREATE-61 | type — drag property를 정하는 String, 기본값 "x,y" | #52 Config Object | verified |
| DRAGCREATE-62 | zIndexBoost — positional press zIndex 높임을 끄는 Boolean과 DOM append caveat | #52 Config Object | verified |
| DRAGCREATE-19 | create target normalization·per-target construction·lookup key | installed/official raw `src/Draggable.js` | verified |
| DRAGCREATE-20 | rendered get undefined와 installed d.ts non-null return 불일치 | #53 Returns + `types/draggable.d.ts` | verified |

sourceBlockers
  - none

moduleSelection
  - plugin
  - class/instance
  - callable method
  - property catalog (target·vars·P03 creation vars만)

learnerFlow
  1. target과 instance를 먼저 구분한다.
  2. create target 입력과 array return의 이유를 연결한다.
  3. get이 새 생성이 아닌 target identity lookup임을 확인한다.
  4. target·vars inspector로 같은 descriptor를 재확인한다.
  5. user-driven drag와 React cleanup을 이후 Draggable detail에서 분리한다.
```

### coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
+| DRAGCREATE-01 | InstanceMentalModelSection registration and target/instance definition | covered |
| DRAGCREATE-02 | InstanceMentalModelSection minimal create boundary | covered |
| DRAGCREATE-03 | InstanceMentalModelSection supported type note | covered |
| DRAGCREATE-04 | InstanceMentalModelSection clickable child boundary | covered |
| DRAGCREATE-05 | CreateSection create signature and constructor boundary | covered |
| DRAGCREATE-06 | CreateSection target normalization examples | covered |
| DRAGCREATE-07 | CreateSection vars input explanation | covered |
| DRAGCREATE-08 | CreateSection array return explanation | covered |
| DRAGCREATE-09 | CreateSection one-target/one-instance explanation | covered |
| DRAGCREATE-10 | LookupIdentitySection get signature and lookup boundary | covered |
| DRAGCREATE-11 | LookupIdentitySection element/selector lookup explanation | covered |
| DRAGCREATE-12 | LookupIdentitySection missing-instance undefined warning | covered |
| DRAGCREATE-13 | LookupIdentitySection multi-target official example explanation | covered |
| DRAGCREATE-14 | TargetVarsSection target inspector explanation | covered |
| DRAGCREATE-15 | TargetVarsSection vars inspector explanation | covered |
| DRAGCREATE-16 | TargetVarsSection property table and inspector | covered |
| DRAGCREATE-17 | LifecycleBoundarySection momentum ownership boundary | covered |
| DRAGCREATE-18 | LifecycleBoundarySection callback/event ownership boundary | covered |
| DRAGCREATE-21 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-22 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-23 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-24 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-25 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-26 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-27 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-28 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-29 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-30 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-31 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-32 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-33 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-34 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-35 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-36 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-37 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-38 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-39 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-40 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-41 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-42 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-43 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-44 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-45 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-46 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-47 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-48 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-49 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-50 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-51 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-52 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-53 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-54 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-55 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-56 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-57 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-58 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-59 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-60 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-61 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-62 | CreateSection Config Object boundary index + catalog entry | covered |
| DRAGCREATE-19 | catalog implementation row + `CreateSection` array explanation | covered |
| DRAGCREATE-20 | catalog implementation row + `LookupIdentitySection` mismatch note | covered |

relatedPages
  - P01 `/fundamentals/plugins`: registered prerequisite link only.
  - P04 coordinates, P05 bounds/axis, P06 lifecycle methods, P07 events, P08 collision/momentum: downstream owners; unregistered so text boundary only, no link.

## implementation contract

```text
exactFiles
  create:
    src/content/gsap/ui/draggable-create/DraggableCreatePage.tsx
    src/content/gsap/ui/draggable-create/DraggableCreatePage.css
    src/content/gsap/ui/draggable-create/draggable-create.meta.ts
    src/content/gsap/ui/draggable-create/draggable-create.catalog.ts
    src/content/gsap/ui/draggable-create/draggable-create.properties.ts
    src/content/gsap/ui/draggable-create/components/PageCoverage/PageCoverage.tsx
    src/content/gsap/ui/draggable-create/components/SectionHeading/SectionHeading.tsx
    src/content/gsap/ui/draggable-create/examples/InstanceInspectorLab/InstanceInspectorLab.tsx
    src/content/gsap/ui/draggable-create/examples/InstanceInspectorLab/InstanceInspectorLab.css
    src/content/gsap/ui/draggable-create/examples/InstanceInspectorLab/useInstanceInspectorAnimation.ts
    src/content/gsap/ui/draggable-create/sections/InstanceMentalModelSection/InstanceMentalModelSection.tsx
    src/content/gsap/ui/draggable-create/sections/CreateSection/CreateSection.tsx
    src/content/gsap/ui/draggable-create/sections/LookupIdentitySection/LookupIdentitySection.tsx
    src/content/gsap/ui/draggable-create/sections/TargetVarsSection/TargetVarsSection.tsx
    src/content/gsap/ui/draggable-create/sections/LifecycleBoundarySection/LifecycleBoundarySection.tsx
    docs/handoffs/gsap/ui/draggable-create.md
  modify: []

exampleContracts
  - name: InstanceInspectorLab
    goal: 하나의 target을 create하고 get·target·vars로 같은 instance임을 검사한다.
    question: type을 바꿔 다시 만들면 create array의 instance와 get 결과가 같은가?
    representation: keyboard-focusable card 1개, type select, instant reset, definition-list inspector, descriptor-derived code
    controls: type select, reset button
    runtimeSource: useInstanceInspectorAnimation.ts
    sourcePath: examples/InstanceInspectorLab/useInstanceInspectorAnimation.ts
    runtimeOwnership: Draggable import/register, target ref, type/reset state, descriptor, create/get, snapshot, kill cleanup, immediate style reset
    displayOwnership: controls, preview markup, serializer, property table, observation and pedagogy panels
    accessibility: focusable target, labelled native select/button, focus-visible outline, clickable child button with dragClickables false, no live frame status
    motion: no autonomous motion; reset is gsap.set and instant under reduced motion

nonGoals
  - P04 coordinate values/direction/pointer event
  - P05 bounds, axis lock, auto-scroll, update
  - P06 enable/disable/start/end/kill API detail beyond cleanup prerequisite
  - P07 gesture event API and timing
  - P08 hit testing, inertia configuration and release Tween inspection

preserve
  - routes.ts, program documents, shared components, global CSS, package files, Git state
```

## verification contract

### source evidence

- Rendered canonical pass 1 (2026-08-08): all five official pages opened directly. Recorded #20 Quick Start/Usage/Features/Properties and #52/#53 signatures, parameters, returns, details plus #56/#59 details.
- Rendered canonical pass 2 (2026-08-08): targeted reread of #52 lines 201–231, #53 lines 201–220, #56 lines 201–210, #59 lines 201–210, and #20 lines 201–269 and 616–649. Confirmed create array return, get undefined wording, target/vars wording, registration and supported types.
- Raw/source pass 1 (2026-08-08): official GSAP raw `src/Draggable.js` inspected. `Draggable.create` normalizes targets then maps each to `new Draggable`; `Draggable.get` reads target lookup identity; constructor stores target and copied vars.
- Raw/source pass 2 (2026-08-08): installed `node_modules/gsap/Draggable.js` compared at the same create/get/constructor locations, then `node_modules/gsap/types/draggable.d.ts` checked. Runtime type declaration says `get(): Draggable`, unlike rendered `undefined` branch; this mismatch remains explicit in DRAGCREATE-20 and the page.
- Runtime probe: 1 attempted, 0 accepted. Node-only `Draggable.get({})` after direct ESM import failed because DOM core initialization did not provide `_toArray`; it does not establish browser missing-target behavior and is not used as evidence. The page relies on official rendered wording and raw lookup source instead.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| OC-P03-001 | PASS | 60 official catalog rows, meta denominator 60, section sum 4+47+4+3+2=60, including #52 Config Object 42 named vars; five canonical keys all present | Official Coverage | none |
| LT-P03-001 | PASS | sections reorder source into instance → create → lookup → inspect → cleanup; lab has goal, control, observation, reason, use case, boundary | Learning Transformation | none |
| RDS-P03-001 | PASS | hook owns descriptor/create/get/snapshot; TSX imports no gsap and serializes descriptor only | Runtime/Display Sync | none |
| PED-P03-001 | PASS | target and instance are defined before create/get; one target/card; property rows include type/default/allowed values/use | Pedagogy | none |
| STRUCT-P03-001 | PASS | page shell only composes sections; one component/file; hook owns plugin lifecycle; Korean one-line comments and per-step hook comments present | Structure/Comment | none |
| A11Y-P03-001 | PASS | native select/reset/button, focusable card, labelled controls, text identity result, focus-visible CSS, no live per-frame announcement | static Accessibility/Motion | none |
| XPAGE-P03-001 | PASS | only P01 is linked; P04–P08 are unlinked owner boundaries without duplicated API teaching | Cross-page Consistency | none |
| BUILD-P03-001 | PASS | root registered `/fundamentals/draggable-create`; the worker-stage BLOCK was cleared by `npx tsc --noEmit`, `npm run build`, `npm run build-storybook`, and `git diff --check`, all exit 0 | Vite 831 modules and Storybook 969 modules both emitted a DraggableCreatePage chunk | none |
| BROWSER-P03-001 | DEFERRED → PASS | keyboard focus/control operation, reduced-motion actual change, 320/390px overflow, and real drag/select/reset outcome require browser interaction | approved four browser checks only | root’s final browser batch |

verificationEvidence
  - catalog duplicate ID check and metadata arithmetic remain page-local static checks.
  - root route registration, TypeScript, Vite 831 modules, Storybook 969 modules, both DraggableCreatePage chunks, and diff check passed.
  - no automated test files or runner changes were created.

releaseDecision
  PASS — route/build integration blocker is cleared. The only deferred work is BROWSER-P03-001’s four approved browser checks.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 재감사

- `SRC-DC2` — **PASS**: Draggable·create·get·target·vars 공식 페이지를 다시 조회했다.
- `RDS-DC2` — **PASS**: 각 lab의 runtime descriptor·snapshot·표시 코드를 정적으로 대조해 BLOCK이 없었다.
- `PED-DC2` — **ADDRESSED**: 첫 화면과 instance 표의 `OFFICIAL COVERAGE`·`canonicals`·`source/type checks`·`surface`를 생성 순서와 바로 확인할 값으로 바꿨다.
- `BROWSER-DC2` — **DEFERRED**: 실제 control·키보드·반응형·motion 조작은 수행하지 않았다.
- Storybook: `N/A` — c309e13에서 의도적으로 삭제됐다.
- releaseDecision: `PASS with DEFERRED` — 정적 BLOCK은 없고 브라우저 관점만 `DEFERRED`다.

## 2026-08-13 최종 교차검토

- `RDS-DC3` — **PASS**: InstanceInspector 표시 코드에 plugin import·registration·target 조회·null guard·instance kill과 style cleanup을 포함해 재검증했다.
- Static BLOCK: 없음. Browser: 사용자 승인 전 실조작을 수행하지 않아 `DEFERRED`. Storybook: c309e13에서 삭제되어 `N/A`.
- overallDecision: `NOT VERIFIED`
- releaseDecision: `NOT VERIFIED`
