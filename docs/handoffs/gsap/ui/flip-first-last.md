# Flip first-last page handoff

## 입력 계약

```text
objective
  P11에서 one stable card의 First capture, class layout mutation, Flip.from/Flip.to comparison, interruption과 cleanup을 학습시킨다.
officialPage
  title: Flip / Flip.from() / Flip.getState() / Flip.to()
  canonicalUrl: https://gsap.com/docs/v3/Plugins/Flip/ ; https://gsap.com/docs/v3/Plugins/Flip/static.from()/ ; https://gsap.com/docs/v3/Plugins/Flip/static.getState()/ ; https://gsap.com/docs/v3/Plugins/Flip/static.to()/
  reviewedAt: 2026-08-08
  category: UI
  slug: flip-first-last
localPage
  localPath: src/content/gsap/ui/flip-first-last/
  route: /fundamentals/flip-first-last
moduleSelection
  plugin, concept guide, callable methods, property catalog, installation/integration
sourceManifest
  - id: FLIPFL-01 | officialItem: FLIP First/Last/Invert/Play connects DOM structure changes without jump | sourceLocation: #67 rendered 166-169,187 | sourceStatus: verified
  - id: FLIPFL-02 | officialItem: getState then DOM/style mutation then Flip.from removes inverse offsets | sourceLocation: #67 rendered 152-162,206-238 | sourceStatus: verified
  - id: FLIPFL-03 | officialItem: getState accepts selector/Element/Array/NodeList and returns FlipState | sourceLocation: #67/#71 rendered 210-218,362-364 | sourceStatus: verified
  - id: FLIPFL-04 | officialItem: default state data and optional comma props capture | sourceLocation: #67 rendered 213-218,279-281,362-364 | sourceStatus: verified
  - id: FLIPFL-05 | officialItem: Flip.from compares prior state to current, inverts and returns Timeline | sourceLocation: #67/#70 rendered 227-236,359-361 | sourceStatus: verified
  - id: FLIPFL-06 | officialItem: Flip.to is inverse of from and returns Timeline | sourceLocation: #67/#75 rendered 376-378 | sourceStatus: verified
  - id: FLIPFL-07 | officialItem: standard tween vars and callbacks work on Flip timeline | sourceLocation: #67 rendered 194-195,227-236,247 | sourceStatus: verified
  - id: FLIPFL-08 | officialItem: absolute can solve flex/grid but removes document flow | sourceLocation: #67 rendered 191-192,252-254 | sourceStatus: verified
  - id: FLIPFL-09 | officialItem: nested prevents parent/child offset compounding | sourceLocation: #67 rendered 199,263-265 | sourceStatus: verified
  - id: FLIPFL-10 | officialItem: simple skips rotation/scale/skew calculations only when that assumption is true | sourceLocation: #67 rendered 289-290 | sourceStatus: verified
  - id: FLIPFL-11 | officialItem: interruption/framework render/new target data-flip-id boundaries | sourceLocation: #67 rendered 200,326,336-351 | sourceStatus: verified
  - id: FLIPFL-12 | officialItem: 3D transform unsupported and border-box recommended | sourceLocation: #67 rendered 329-333 | sourceStatus: verified
  - id: FLIPFL-S01 | officialItem: raw _fromTo creates Timeline and static from/to use opposite direction; d.ts Timeline return | sourceLocation: node_modules/gsap/src/Flip.js 322-329; types/Flip.d.ts 93,191 | sourceStatus: verified-source
  - id: FLIPFL-S02 | officialItem: raw getState completes active target flip for accurate capture | sourceLocation: node_modules/gsap/src/Flip.js getState; #67 213 | sourceStatus: verified-source
sourceBlockers
  none. Rendered #67/#70/#71/#75 and raw/installed Flip source/types were read twice; no non-DOM probe can establish layout measurement behavior.
learnerFlow
  1. First/Last/Invert/Play mental model.
  2. capture before DOM mutation and props boundary.
  3. Flip.from versus Flip.to direction.
  4. vars, nested/simple and layout caveats.
  5. interruption, cleanup, focus order and reduced-motion final layout.
coverageMap
  - sourceItemId: FLIPFL-01 | localEvidence: FlipFirstLastPage.tsx section 01 | localStatus: covered
  - sourceItemId: FLIPFL-02 | localEvidence: FlipCardLab runtime and section 01 | localStatus: covered
  - sourceItemId: FLIPFL-03 | localEvidence: section 02; useFlipCardAnimation.ts | localStatus: covered
  - sourceItemId: FLIPFL-04 | localEvidence: section 02; descriptor props | localStatus: covered
  - sourceItemId: FLIPFL-05 | localEvidence: section 03; mode descriptor | localStatus: covered
  - sourceItemId: FLIPFL-06 | localEvidence: section 03; mode descriptor | localStatus: covered
  - sourceItemId: FLIPFL-07 | localEvidence: properties and runtime descriptor | localStatus: covered
  - sourceItemId: FLIPFL-08 | localEvidence: section 04 | localStatus: covered
  - sourceItemId: FLIPFL-09 | localEvidence: section 04 | localStatus: covered
  - sourceItemId: FLIPFL-10 | localEvidence: section 04 | localStatus: covered
  - sourceItemId: FLIPFL-11 | localEvidence: section 05; runtime cleanup | localStatus: covered
  - sourceItemId: FLIPFL-12 | localEvidence: section 05 | localStatus: covered
  - sourceItemId: FLIPFL-S01 | localEvidence: catalog and section 03 | localStatus: covered
  - sourceItemId: FLIPFL-S02 | localEvidence: catalog and section 02 | localStatus: covered
relatedPages
  no route link is created because registered prerequisite availability is root-owned; P12/P13 are text-only next boundaries.
```

## 구현 계약

```text
exactFiles
  create: FlipFirstLastPage TSX/CSS, meta/catalog/properties, FlipCardLab TSX/CSS/useFlipCardAnimation, this handoff
  modify: none
exampleContracts
  name: FlipCardLab
  goal: one stable card moves across two visual lanes using one descriptor for capture, class mutation, method, diagram and code.
  question: Which order keeps a changed layout visually continuous?
  representation: two visual lanes, one focusable stable card, First/Last/Invert/Play diagram, mode selector and actual layout status text.
  controls: from/to select and execute/replay controls.
  runtimeSource: useFlipCardAnimation.ts
  sourcePath: examples/FlipCardLab/useFlipCardAnimation.ts
  runtimeOwnership: Flip registration, getState, stage class mutation, from/to timeline, interruption kill and initial layout restoration.
  displayOwnership: controls, diagram, serializer, reference and explanation only.
  accessibility: native labelled controls, one focusable card whose React identity is preserved, and discrete actual-layout status.
  motion: descriptor duration 0 under reduced motion so DOM layout settles immediately.
nonGoals
  P12 fit/makeAbsolute, P13 batch/killFlipsOf API teaching, advanced enter/leave swap choreography.
preserve
  routes, program docs, shared UI, global CSS, packages and Git remain root-owned.
```

## 검증 계약

```text
verifiedPerspectives
  Official Coverage: PASS — 4/4 canonical, 12/12 official items, 2 source items.
  Learning Transformation: PASS — First/Last → capture → mutation → from/to → caveat/cleanup.
  Runtime/Display Sync: PASS — one mode descriptor supplies capture props, selected method, duration, diagram and serialized code.
  Pedagogy: PASS — one stable card/two visual lanes and explicit class layout mutation boundary.
  Structure/Comment: PASS — GSAP calls and cleanup are runtime-owned with Korean comments.
  Accessibility/Motion: PASS (static) — native controls, focusable card, logical destination text, duration 0 reduced-motion fallback.
  Cross-page Consistency: PASS (static) — P12/P13 remain text-only.
  Build/Integration: PASS — root registered P11; TypeScript, Vite 941 modules and Storybook 1079 modules passed with both page chunks emitted.
findings
  P11-OC-001 | PASS | 4 canonical / 12 official / 2 source item audit | complete item mapping | none
  P11-RDS-001 | PASS | descriptor -> getState/mutate/from-or-to/diagram/code | no duplicate config | none
  P11-INT-001 | PASS | `/fundamentals/flip-first-last`, TypeScript exit 0, Vite 941 modules, Storybook 1079 modules, both page chunks and diff check | integration proven | none
  P11-B01 | DEFERRED → PASS | keyboard focus/control | browser audit | owner
  P11-B02 | DEFERRED → PASS | reduced motion actual transition | browser audit | owner
  P11-B03 | DEFERRED → PASS | 320/390 layout | browser audit | owner
  P11-B04 | DEFERRED → PASS | class layout mutation/Flip from-to/interrupt visual result | browser audit | owner
releaseDecision
PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

rootIntegrationEvidence
  `npx tsc --noEmit`, Vite 941 modules, Storybook 1079 modules and `git diff --check` exited 0; both builds emitted `FlipFirstLastPage` JS/CSS chunks.
```

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
