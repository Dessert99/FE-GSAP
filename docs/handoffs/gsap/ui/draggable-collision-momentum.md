# Draggable collision-momentum page handoff

## 입력 계약

```text
objective
  P08에서 puck과 drop zone 하나로 overlap geometry·threshold forms·inertia throw state·generated tween·cleanup/fallback을 학습시킨다.

officialPage
  title: Draggable.isThrowing / Draggable.hitTest() / Draggable.tween
  canonicalUrl:
    https://gsap.com/docs/v3/Plugins/Draggable/isThrowing/
    https://gsap.com/docs/v3/Plugins/Draggable/static.hitTest()/
    https://gsap.com/docs/v3/Plugins/Draggable/tween/
  reviewedAt: 2026-08-08
  category: UI
  slug: draggable-collision-momentum

localPage
  localPath: src/content/gsap/ui/draggable-collision-momentum/
  route: /fundamentals/draggable-collision-momentum

moduleSelection
  plugin, class/instance, callable method, property catalog, installation/integration

sourceManifest
  - id: DRAGMOM-01 | officialItem: hitTest instance signature tests target overlap with element or mouse position and returns Boolean | sourceLocation: #54 rendered lines 201-205 | sourceStatus: verified
  - id: DRAGMOM-02 | officialItem: testObject accepts element, pageX/pageY event, selector, rectangle; hitTest(window) checks viewport visibility | sourceLocation: #54 rendered lines 208-210, 246 | sourceStatus: verified
  - id: DRAGMOM-03 | officialItem: optional threshold default 0 accepts pixel Number or surface percentage String | sourceLocation: #54 rendered lines 212-213, 230-243 | sourceStatus: verified
  - id: DRAGMOM-04 | officialItem: hitTest returns true on threshold overlap and false otherwise; static form receives both objects | sourceLocation: #54 rendered lines 214-216, 248 | sourceStatus: verified
  - id: DRAGMOM-05 | officialItem: getBoundingClientRect rectangle means non-rectangular or rotated shapes cannot be pixel-perfect | sourceLocation: #54 rendered lines 249-250 | sourceStatus: verified
  - id: DRAGMOM-06 | officialItem: isThrowing Boolean is true while target is animated by an InertiaPlugin inertia tween | sourceLocation: #35 rendered lines 203-209 | sourceStatus: verified
  - id: DRAGMOM-07 | officialItem: read-only tween is created on mouse/touch release when inertia true and permits duration/pause/resume/timeScale inspection | sourceLocation: #57 rendered lines 203-208 | sourceStatus: verified
  - id: DRAGMOM-08 | officialItem: each throw makes a new tween and onDragEnd can read this.tween | sourceLocation: #57 rendered lines 208-209 | sourceStatus: verified
  - id: DRAGMOM-S01 | officialItem: raw static hitTest rejects identical objects; numeric threshold requires strict greater overlap in both dimensions, percentage accepts either object area; Node probe confirms 10px false at 10 and true at 9 | sourceLocation: official raw Draggable.js 1865-1890; installed source 1914-1939; Node probe exit 0 | sourceStatus: verified-source
  - id: DRAGMOM-S02 | officialItem: raw creates isThrowing true and self.tween only when inertia and InertiaPlugin both exist, then clears tween to null on press | sourceLocation: official raw 1006-1060, 1211-1216; installed source 1031-1071, 1722-1731 | sourceStatus: verified-source
  - id: DRAGMOM-S03 | officialItem: installed d.ts says readonly non-null Tween while raw source assigns null on press | sourceLocation: official raw 1211-1216; node_modules/gsap/types/draggable.d.ts 26-31 | sourceStatus: verified-source

sourceBlockers
  none. Rendered #35/#54/#57 were opened twice; official raw and installed source/types were compared twice. The Node-only registration probe has no browser window and does not establish plugin registration state, so it is not used as source evidence.

learnerFlow
  1. overlap geometry를 two rectangle query로 정의한다.
  2. pixel과 percentage threshold가 acceptance rule을 어떻게 바꾸는지 고른다.
  3. release 뒤 inertia tween과 isThrowing state를 분리해 읽는다.
  4. 새 tween reference를 release callback snapshot으로 검사하고 polling boundary를 지킨다.
  5. rectangle limitation, explicit registration, tween/instance cleanup과 reduced-motion fallback을 확인한다.

coverageMap
  - sourceItemId: DRAGMOM-01 | localEvidence: sections/OverlapGeometrySection/OverlapGeometrySection.tsx; examples/CollisionMomentumLab/useCollisionMomentumAnimation.ts | localStatus: covered
  - sourceItemId: DRAGMOM-02 | localEvidence: sections/OverlapGeometrySection/OverlapGeometrySection.tsx | localStatus: covered
  - sourceItemId: DRAGMOM-03 | localEvidence: sections/ThresholdFormsSection/ThresholdFormsSection.tsx; examples/CollisionMomentumLab/CollisionMomentumLab.tsx | localStatus: covered
  - sourceItemId: DRAGMOM-04 | localEvidence: sections/ThresholdFormsSection/ThresholdFormsSection.tsx; examples/CollisionMomentumLab/useCollisionMomentumAnimation.ts | localStatus: covered
  - sourceItemId: DRAGMOM-05 | localEvidence: sections/CleanupFallbackSection/CleanupFallbackSection.tsx; examples/CollisionMomentumLab/CollisionMomentumLab.tsx | localStatus: covered
  - sourceItemId: DRAGMOM-06 | localEvidence: sections/ThrowStateSection/ThrowStateSection.tsx; examples/CollisionMomentumLab/useCollisionMomentumAnimation.ts | localStatus: covered
  - sourceItemId: DRAGMOM-07 | localEvidence: sections/TweenInspectorSection/TweenInspectorSection.tsx; draggable-collision-momentum.properties.ts | localStatus: covered
  - sourceItemId: DRAGMOM-08 | localEvidence: sections/TweenInspectorSection/TweenInspectorSection.tsx; examples/CollisionMomentumLab/useCollisionMomentumAnimation.ts | localStatus: covered
  - sourceItemId: DRAGMOM-S01 | localEvidence: sections/ThresholdFormsSection/ThresholdFormsSection.tsx; draggable-collision-momentum.catalog.ts | localStatus: covered
  - sourceItemId: DRAGMOM-S02 | localEvidence: sections/ThrowStateSection/ThrowStateSection.tsx; draggable-collision-momentum.catalog.ts | localStatus: covered
  - sourceItemId: DRAGMOM-S03 | localEvidence: sections/TweenInspectorSection/TweenInspectorSection.tsx; draggable-collision-momentum.catalog.ts | localStatus: covered

relatedPages
  - P03 /fundamentals/draggable-create, P04 /fundamentals/draggable-coordinates and P05 /fundamentals/draggable-bounds-axis only are registered prerequisite links.
  - P06 lifecycle, P07 gesture events and P15 Inertia velocity/configuration are text-only ownership boundaries.
```

## 구현 계약

```text
exactFiles
  create: DraggableCollisionMomentumPage.tsx, DraggableCollisionMomentumPage.css, meta/catalog/properties,
    PageCoverage, SectionHeading, CollisionMomentumLab TSX/CSS/hook, five section TSX files, this handoff
  modify: none

exampleContracts
  name: CollisionMomentumLab
  goal: one descriptor gives a puck/drop-zone hitTest threshold, Draggable vars, collision snapshot, optional inertia branch and serialized code.
  question: What changes when a visible overlap must meet a stricter threshold, and when does release create a tween?
  representation: one draggable puck, one DOM drop zone, threshold/inertia controls, text overlap result and generated tween inspector.
  controls: threshold select, inertia checkbox, recheck button, reset button.
  runtimeSource: useCollisionMomentumAnimation.ts
  sourcePath: examples/CollisionMomentumLab/useCollisionMomentumAnimation.ts
  runtimeOwnership: explicit Draggable/InertiaPlugin registration, descriptor, create, static hitTest, release snapshots, gsap reset, tween+instance kill cleanup.
  displayOwnership: controls, puck/drop-zone markup, serializer, property table and learning panels only.
  accessibility: native labelled select/checkbox/buttons; focusable puck; overlap is text and only discrete release summary is live.
  motion: reduced motion makes descriptor inertia false and leaves release at its current position immediately.

nonGoals
  P03 creation/vars, P04 coordinate teaching, P05 constraints, P06 lifecycle API detail, P07 event API detail, P15 velocity/resistance/landing configuration.

preserve
  routes, program docs, shared UI, global CSS, packages and Git state remain root-owned.
```

## 검증 계약

```text
verifiedPerspectives
  Official Coverage: PASS — 3/3 canonical keys and 8/8 official technical items are covered; 3 source/probe items are separate.
  Learning Transformation: PASS — geometry → threshold → throw state → tween snapshot → cleanup/fallback.
  Runtime/Display Sync: PASS — one descriptor supplies threshold, Draggable vars, static hitTest and serializer; runtime callbacks supply displayed snapshots.
  Pedagogy: PASS — one puck/one drop zone, controls before observation, hitTest limit and Inertia ownership boundary included.
  Structure/Comment: PASS — page only composes sections; GSAP calls and cleanup stay in useCollisionMomentumAnimation with Korean step comments.
  Accessibility/Motion: PASS (static) — labelled native controls, focusable puck, text collision state, discrete status only, immediate reduced-motion fallback.
  Cross-page Consistency: PASS (static) — P03/P04/P05 links only; P06/P07/P15 text-only.
  Build/Integration: PASS — root registered the P08 route; TypeScript, Vite 908 modules and Storybook 1046 modules passed with both page chunks emitted.

findings
  P08-OC-001 | PASS | catalog/meta/handoff item map | 3 canonical / 8 official / 3 source-probe coverage | none
  P08-SRC-001 | PASS | rendered twice, official raw + installed source/types twice, static hitTest Node probe exit 0 | raw/type details remain distinct from official claims | none
  P08-RDS-001 | PASS | runtime descriptor drives threshold/inertia/hitTest/code and snapshots | no display-side config reconstruction | none
  P08-INT-001 | PASS | `/fundamentals/draggable-collision-momentum`, TypeScript exit 0, Vite 908 modules, Storybook 1046 modules, both page chunks and diff check | integration proven | none
  P08-B01 | DEFERRED → PASS | browser keyboard focus/control operation | browser audit | owner
  P08-B02 | DEFERRED → PASS | browser reduced-motion media transition | browser audit | owner
  P08-B03 | DEFERRED → PASS | browser 320/390px layout and overflow | browser audit | owner
  P08-B04 | DEFERRED → PASS | pointer drag, threshold collision and inertia release/tween result | browser audit | owner

verificationEvidence
  rendered pass 1/2: #35 isThrowing, #54 static hitTest and #57 tween each opened directly and reread at technical headings.
  raw/source pass 1/2: official greensock raw Draggable.js and node_modules source/types compared at hitTest, inertia creation, tween clear and d.ts locations.
  probe: `node --input-type=module` generic rectangle hitTest returned anyOverlap true, pixel10 false, pixel9 true, percent10 true, percent11 false, self false (exit 0).
  static page check: scoped `npx tsc --ignoreConfig ...` exited 0 after all P08 files were created.
  root integration: `npx tsc --noEmit`, Vite 908 modules, Storybook 1046 modules and `git diff --check` exited 0; both builds emitted `DraggableCollisionMomentumPage` JS/CSS chunks.

releaseDecision
PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.
```

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 Batch B 재감사

- 공식 대조: `Draggable.hitTest()`, `isThrowing`, `tween` canonical을 현재 웹에서 다시 확인했다.
- `WRITE-B08-01 | BLOCK → PASS` — 첫 화면의 canonical/item/probe 수치와 본문의 P번호·소유권 표현을 실제 질문과 공식/설치본 경계 설명으로 교체했다.
- `RDS-B08-01 | BLOCK → PASS` — 코드 패널이 baseline과 release/throw 관찰 callback을 생략해 실제 snapshot 경로를 설명하지 못하던 문제를 수정했다.
- `FACT-B08-01 | ADVISORY` — threshold의 strict 경계 비교는 공식 문서에 없으므로 설치된 3.15.0 관찰로만 표시했다.
- Storybook: c309e13에서 삭제되어 `N/A`.
- Browser: `DEFERRED` — keyboard/focus, reduced-motion, 320/390px, 실제 drag·hitTest·throw Tween 결과를 실조작하지 않았다.
- current releaseDecision: `PASS` — 미해결 BLOCK 없음. Browser 항목은 승인된 `DEFERRED`다.

### 2026-08-13 Batch B 통합 검증

- `npx tsc --noEmit --pretty false` exit 0.
- Batch B 21 page dir + handoff 범위 `git diff --check` exit 0.

### 2026-08-13 최종 교차검토

- `RDS-B08-02 | BLOCK → PASS` — serializer에 puck/stage/drop zone query와 null guard, plugin 등록, throw Tween·Draggable 보관, collision 재검사·reset과 별도 cleanup을 포함하고 runtime callback 의미와 재대조했다.
- Storybook: `N/A` — c309e13에서 의도적으로 삭제되어 실행하지 않았다.
- Browser: `DEFERRED` — 키보드·focus, reduced-motion, 320/390px, 실제 drag·hitTest·throw 결과를 실조작하지 않았다.
- overallDecision: `NOT VERIFIED` — 정적 BLOCK은 없지만 Browser 실조작이 `DEFERRED`다.
- releaseDecision: `NOT VERIFIED` — 브라우저 관점을 현재 증거로 확인하지 않았다.
