# Draggable bounds-axis page handoff

## 입력 계약

```text
objective
  P05에서 bounds measurement, mode-specific min/max, requested/resolved axis,
  autoScroll/zIndex layer, external layout resync를 하나의 bounded tray로 학습시킨다.

officialPage
  title: Draggable.applyBounds() / autoScroll / lockAxis / lockedAxis / min/max / update() / zIndex
  canonicalUrl: #22, #23, #37, #38, #39, #40, #41, #42, #43, #44, #58, #62
  reviewedAt: 2026-08-08
  category: UI
  slug: draggable-bounds-axis

localPage
  localPath: src/content/gsap/ui/draggable-bounds-axis/
  route: /fundamentals/draggable-bounds-axis (registered)

moduleSelection
  plugin, class/instance, callable method, property catalog, installation/integration

sourceManifest
  - id: DRAGBND-01 | officialItem: applyBounds signature and new bounds application | sourceLocation: #22 rendered lines 201-215 | sourceStatus: verified
  - id: DRAGBND-02 | officialItem: element/selector/rectangle/min-max/rotation bounds inputs and parent coordinate origin | sourceLocation: #22 rendered lines 207-215 | sourceStatus: verified
  - id: DRAGBND-03 | officialItem: maxRotation legal maximum with bounds | sourceLocation: #39 rendered property detail | sourceStatus: verified
  - id: DRAGBND-04 | officialItem: maxX legal maximum with bounds | sourceLocation: #40 rendered property detail | sourceStatus: verified
  - id: DRAGBND-05 | officialItem: maxY legal maximum with bounds | sourceLocation: #41 rendered property detail | sourceStatus: verified
  - id: DRAGBND-06 | officialItem: minRotation legal minimum with bounds | sourceLocation: #42 rendered property detail | sourceStatus: verified
  - id: DRAGBND-07 | officialItem: minX legal minimum with bounds | sourceLocation: #43 rendered property detail | sourceStatus: verified
  - id: DRAGBND-08 | officialItem: minY legal minimum with bounds | sourceLocation: #44 rendered property detail | sourceStatus: verified
  - id: DRAGBND-09 | officialItem: lockAxis Boolean, 2px initial direction, supported types and no diagonal movement | sourceLocation: #37 rendered lines 203-208 | sourceStatus: verified
  - id: DRAGBND-10 | officialItem: lockedAxis String is the blocked axis and resolves after initial direction | sourceLocation: #38 rendered lines 203-218 | sourceStatus: verified
  - id: DRAGBND-11 | officialItem: autoScroll number, 40px edge, speed factor, proximity acceleration, default 0 | sourceLocation: #23 rendered lines 203-208 | sourceStatus: verified
  - id: DRAGBND-12 | officialItem: zIndex current property | sourceLocation: #62 rendered property detail | sourceStatus: verified
  - id: DRAGBND-13 | officialItem: update() reflects target current position in Draggable x/y | sourceLocation: #58 rendered method detail | sourceStatus: verified
  - id: DRAGBND-S01 | officialItem: installed applyBounds delegates new bounds to update(true, sticky), returns self, while d.ts says void | sourceLocation: node_modules/gsap/src/Draggable.js 1670-1727; types 110-124 | sourceStatus: verified-source
  - id: DRAGBND-S02 | officialItem: installed update refreshes matrix and applies bounds when requested, then returns self | sourceLocation: node_modules/gsap/src/Draggable.js 1729-1762; types 271-284 | sourceStatus: verified-source
  - id: DRAGBND-S03 | officialItem: installed top-level d.ts omits lockedAxis though official #38 documents String | sourceLocation: node_modules/gsap/types/draggable.d.ts 1-28; #38 lines 203-210 | sourceStatus: verified-source

sourceBlockers
  none. Each canonical was rendered and raw/source compared twice; source/type differences remain source-only claims.

learnerFlow
  1. bounds input이 legal range를 계산한다.
  2. translation과 rotation의 min/max field를 분리한다.
  3. lockAxis request와 lockedAxis result를 반대 축 관점으로 읽는다.
  4. autoScroll/zIndex가 bounds value가 아닌 drag layer state임을 구분한다.
  5. external layout change 뒤 update(true)로 matrix/bounds를 다시 읽는다.

coverageMap
  - sourceItemId: DRAGBND-01 | localEvidence: sections/BoundsMentalModelSection/BoundsMentalModelSection.tsx | localStatus: covered
  - sourceItemId: DRAGBND-02 | localEvidence: sections/BoundsMentalModelSection/BoundsMentalModelSection.tsx; examples/BoundsAxisLab/useBoundsAxisAnimation.ts | localStatus: covered
  - sourceItemId: DRAGBND-03 | localEvidence: sections/MinMaxSection/MinMaxSection.tsx; draggable-bounds-axis.properties.ts | localStatus: covered
  - sourceItemId: DRAGBND-04 | localEvidence: sections/MinMaxSection/MinMaxSection.tsx; examples/BoundsAxisLab/BoundsAxisLab.tsx | localStatus: covered
  - sourceItemId: DRAGBND-05 | localEvidence: sections/MinMaxSection/MinMaxSection.tsx; examples/BoundsAxisLab/BoundsAxisLab.tsx | localStatus: covered
  - sourceItemId: DRAGBND-06 | localEvidence: sections/MinMaxSection/MinMaxSection.tsx; draggable-bounds-axis.properties.ts | localStatus: covered
  - sourceItemId: DRAGBND-07 | localEvidence: sections/MinMaxSection/MinMaxSection.tsx; examples/BoundsAxisLab/BoundsAxisLab.tsx | localStatus: covered
  - sourceItemId: DRAGBND-08 | localEvidence: sections/MinMaxSection/MinMaxSection.tsx; examples/BoundsAxisLab/BoundsAxisLab.tsx | localStatus: covered
  - sourceItemId: DRAGBND-09 | localEvidence: sections/AxisLockSection/AxisLockSection.tsx; examples/BoundsAxisLab/useBoundsAxisAnimation.ts | localStatus: covered
  - sourceItemId: DRAGBND-10 | localEvidence: sections/AxisLockSection/AxisLockSection.tsx; examples/BoundsAxisLab/BoundsAxisLab.tsx | localStatus: covered
  - sourceItemId: DRAGBND-11 | localEvidence: sections/AutoScrollLayerSection/AutoScrollLayerSection.tsx; examples/BoundsAxisLab/useBoundsAxisAnimation.ts | localStatus: covered
  - sourceItemId: DRAGBND-12 | localEvidence: sections/AutoScrollLayerSection/AutoScrollLayerSection.tsx; examples/BoundsAxisLab/BoundsAxisLab.tsx | localStatus: covered
  - sourceItemId: DRAGBND-13 | localEvidence: sections/ResyncSection/ResyncSection.tsx; examples/BoundsAxisLab/useBoundsAxisAnimation.ts | localStatus: covered
  - sourceItemId: DRAGBND-S01 | localEvidence: sections/ResyncSection/ResyncSection.tsx; draggable-bounds-axis.catalog.ts | localStatus: covered
  - sourceItemId: DRAGBND-S02 | localEvidence: sections/ResyncSection/ResyncSection.tsx; examples/BoundsAxisLab/useBoundsAxisAnimation.ts | localStatus: covered
  - sourceItemId: DRAGBND-S03 | localEvidence: sections/AxisLockSection/AxisLockSection.tsx; draggable-bounds-axis.catalog.ts | localStatus: covered

relatedPages
  - P01 /fundamentals/plugins and P03 /fundamentals/draggable-create only are links.
  - P04 coordinates and P06/P07/P08 are text-only ownership boundaries; no unregistered route link is created.
```

## 구현 계약

```text
exactFiles
  create: DraggableBoundsAxisPage.tsx, DraggableBoundsAxisPage.css, meta/catalog/properties,
    PageCoverage, SectionHeading, BoundsAxisLab TSX/CSS/hook, five section TSX files, this handoff
  modify: none
exampleContracts
  name: BoundsAxisLab
  goal: one bounded target uses one constraint descriptor for pointer drag, keyboard move, min/max inspector and resync code.
  question: What must be recalculated after an external tray layout change?
  representation: 실제 가로·세로 overflow를 가진 bounded scrollable tray, viewport overlay, target button, min/max snapshot and four keyboard movement buttons.
  controls: lockAxis checkbox, autoScroll select, external layout button, update(true) button, direction buttons.
  runtimeSource: useBoundsAxisAnimation.ts
  sourcePath: examples/BoundsAxisLab/useBoundsAxisAnimation.ts
  runtimeOwnership: register/create Draggable, descriptor vars, snapshot, update/applyBounds, gsap keyboard correction, instance kill cleanup.
  displayOwnership: controls, preview, serializer, property table and learning panels only.
  accessibility: native labelled controls, explicit arrow-button labels and keyboard movement; only discrete sync status is live.
  motion: keyboard correction duration is 0 with reduced motion.
nonGoals
  P04 coordinate/pointer APIs; P06 lifecycle API teaching; P07 events; P08 collision/inertia.
preserve
  routes, program docs, shared UI, global CSS, packages and Git state remain root-owned.
```

## 검증 계약

```text
verifiedPerspectives
  Official Coverage: PASS — 12/12 canonical keys and 13/13 technical items are covered; 3 source/type items separate.
  Learning Transformation: PASS — measurement → fields → request/result → layer → resync.
  Runtime/Display Sync: PASS — descriptor supplies Draggable vars, labels and serializer; snapshot reads actual instance fields.
  Pedagogy: PASS — one target and one external-layout resync question with controls, watch points and keyboard equivalent.
  Structure/Comment: PASS — page composes sections; GSAP calls stay in useBoundsAxisAnimation with step comments.
  Accessibility/Motion: PASS (static) — native controls, explicit arrow-button labels, no continuous live status, reduced-motion corrections are immediate.
  Cross-page Consistency: PASS (static) — P01/P03 links only; P04/P06-P08 text-only.
  Build/Integration: PASS — root registered the route; TypeScript, Vite, Storybook and diff checks passed with both page chunks emitted.
findings
  P05-OC-001 | PASS | catalog/meta/handoff item map | canonical coverage | none
  P05-SRC-001 | PASS | installed source/types versus rendered #22/#38/#58 | source/type boundaries stay explicitly non-official | none
  P05-FIX-001 | PASS | all 12 meta officialSources plus scroll-space tray/arrow labels | canonical links are item-level and autoScroll has real overflow geometry | browser result remains deferred
  P05-INT-001 | PASS | `/fundamentals/draggable-bounds-axis` route, `npx tsc --noEmit`, Vite 861 modules, Storybook 999 modules, both `DraggableBoundsAxisPage` JS/CSS chunks, `git diff --check` | integration proven | none
  P05-B01 | DEFERRED → PASS | browser keyboard/focus control operation | browser audit | owner
  P05-B02 | DEFERRED → PASS | browser reduced-motion media transition | browser audit | owner
  P05-B03 | DEFERRED → PASS | browser 320/390px layout | browser audit | owner
  P05-B04 | DEFERRED → PASS | pointer drag/edge autoScroll/control visual result | browser audit | owner
verificationEvidence
  rendered official pass: #22/#23/#37/#38 direct web open; min/max/update/zIndex canonicals separately opened; meta exposes every one of the 12 canonical URLs individually.
  raw/source pass: node_modules/gsap/src/Draggable.js bounds/axis/autoScroll/update locations and types/draggable.d.ts compared.
  local fix pass: scroll-space creates 780px × 420px tray content inside the 224px viewport, while the sibling overlay continues to mark that visible bounds viewport; four arrow controls have explicit aria-labels.
  root integration pass: `npx tsc --noEmit`, `npm run build`, `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook`, and `git diff --check` all exited 0.
releaseDecision
PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.
```

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 Batch B 재감사

- 공식 대조: `applyBounds()`, `autoScroll`, `lockAxis`, `lockedAxis`, min/max, `update()`, `zIndex` canonical을 현재 웹에서 다시 확인했다.
- `WRITE-B05-01 | BLOCK → PASS` — 첫 화면의 canonical/item/source 분모와 본문의 P번호·소유권 표현을 학습 질문과 실제 관련 개념으로 교체했다.
- `RDS-B05-01 | BLOCK → PASS` — runtime은 `inertia: false`를 실행하지만 코드 패널이 생략하던 값을 공용 descriptor에 넣어 Draggable vars와 표시 코드를 일치시켰다.
- 정적 재검수: Official Coverage PASS, Learning Transformation PASS, Runtime/Display Sync PASS, Pedagogy PASS, Structure/Comment PASS, Accessibility/Motion PASS(static), Cross-page Consistency PASS.
- Build/Integration: Batch B 종료 시 TypeScript와 범위 diff를 통합 검증한다. Storybook은 c309e13에서 삭제되어 `N/A`이며 실행·성공 근거로 사용하지 않는다.
- Browser: `DEFERRED` — 키보드·focus, reduced-motion 실제 전환, 320/390px layout, pointer drag·autoScroll·control 결과는 실조작하지 않았다.
- current releaseDecision: `PASS` — 미해결 BLOCK 없음. 위 browser 항목은 승인된 네 종류의 `DEFERRED`로 남는다.

### 2026-08-13 Batch B 통합 검증

- `npx tsc --noEmit --pretty false` exit 0.
- Batch B 21 page dir + handoff 범위 `git diff --check` exit 0.

### 2026-08-13 최종 교차검토

- `RDS-B05-02 | BLOCK → PASS` — serializer의 미정의 `target`과 즉시 끝나는 생성 예시를 실제 target/tray query, null guard, plugin 등록, 보관한 Draggable instance, `moveBy()`·`resync()`와 별도 `cleanup()`으로 교체하고 runtime descriptor와 재대조했다.
- Storybook: `N/A` — c309e13에서 의도적으로 삭제되어 실행하지 않았다.
- Browser: `DEFERRED` — 키보드·focus, reduced-motion, 320/390px, 실제 pointer drag·autoScroll·control 결과를 실조작하지 않았다.
- overallDecision: `NOT VERIFIED` — 정적 BLOCK은 없지만 Browser 실조작이 `DEFERRED`다.
- releaseDecision: `NOT VERIFIED` — 브라우저 관점을 현재 증거로 확인하지 않았다.
