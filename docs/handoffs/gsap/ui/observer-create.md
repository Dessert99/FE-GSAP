# Observer creation and registry handoff

## 입력 계약

```text
objective
  P25에서 one owned Observer descriptor로 input pad를 create하고 id registry, target, original vars를 안전하게 읽는다.
officialPage
  title: Observer / create / getAll / getById / target / vars
  canonicalUrl: https://gsap.com/docs/v3/Plugins/Observer/ ; https://gsap.com/docs/v3/Plugins/Observer/static.create()/ ; https://gsap.com/docs/v3/Plugins/Observer/static.getAll()/ ; https://gsap.com/docs/v3/Plugins/Observer/static.getById()/ ; https://gsap.com/docs/v3/Plugins/Observer/target/ ; https://gsap.com/docs/v3/Plugins/Observer/vars/
  reviewedAt: 2026-08-08
  category: UI
  slug: observer-create
localPage
  localPath: src/content/gsap/ui/observer-create/
  route: /fundamentals/observer-create
moduleSelection
  plugin/class instance, property catalog, callable registry methods, input lifecycle
sourceManifest
  - id: OBSCREATE-01 | officialItem: Observer unifies wheel/touch/pointer/scroll; type, tolerance, debounce, preventDefault, lockAxis configure input processing and ScrollTrigger.observe is identical create alternative | sourceLocation: #115 rendered Quick Start/config/FAQ; Observer.js 155-255 | sourceStatus: verified
  - id: OBSCREATE-02 | officialItem: Observer.create(vars) creates and returns Observer | sourceLocation: #127 rendered signature/details; Observer.js 432; observer.d.ts 23-40 | sourceStatus: verified
  - id: OBSCREATE-03 | officialItem: Observer.getAll() returns all not-killed observers | sourceLocation: #128 rendered signature/details; Observer.js 434; observer.d.ts 43-54 | sourceStatus: verified
  - id: OBSCREATE-04 | officialItem: Observer.getById(id) returns matching configured-id Observer or undefined | sourceLocation: #129 rendered signature/details; Observer.js 435; observer.d.ts 60-69 | sourceStatus: verified
  - id: OBSCREATE-05 | officialItem: observer.target is target Element | sourceLocation: #131 rendered property details; observer.d.ts 14 | sourceStatus: verified
  - id: OBSCREATE-06 | officialItem: observer.vars is original configuration passed to create | sourceLocation: #132 rendered property details; Observer docs 416-418; observer.d.ts 15 | sourceStatus: verified
sourceBlockers
  none. Six rendered canonicals and official raw Observer.js were opened/reopened twice; installed Observer.js and observer.d.ts were compared twice. Runtime source default tolerance is 1e-9 and lockAxis defaults false when absent, but the page avoids presenting either as an official default where #115 is silent. The lab uses documented explicit values and only kills its own ref. ScrollTrigger.observe equivalence is official #115 context, not a second runtime integration.
learnerFlow
  1. one descriptor sets input type and movement processing policies.
  2. create produces one owned instance and directional callbacks.
  3. getAll/getById inspect registry without mutating other instances.
  4. target/vars prove what instance was created.
coverageMap
  - sourceItemId: OBSCREATE-01 | localEvidence: observer-config section; descriptor/type/tolerance/debounce/preventDefault/lockAxis and explanation boundary | localStatus: covered
  - sourceItemId: OBSCREATE-02 | localEvidence: runtime actual Observer.create and code panel | localStatus: covered
  - sourceItemId: OBSCREATE-03 | localEvidence: runtime getAll and registry inspector | localStatus: covered
  - sourceItemId: OBSCREATE-04 | localEvidence: runtime getById and registry inspector | localStatus: covered
  - sourceItemId: OBSCREATE-05 | localEvidence: runtime target equality inspector and observer-instance section | localStatus: covered
  - sourceItemId: OBSCREATE-06 | localEvidence: runtime vars.id inspector and observer-instance section | localStatus: covered
relatedPages
  ScrollTrigger.observe is text-only equivalent context. P26+ own velocity/gesture advanced API and are not linked here.
```

## 구현 계약

```text
exactFiles
  create: ObserverCreatePage TSX/CSS, meta/catalog/properties, ObserverInputPad TSX/CSS/runtime, this handoff
  modify: none
exampleContracts
  name: ObserverInputPad
  goal: one actual descriptor supplies create vars, input callbacks, registry inspector and code.
  question: How do I create one Observer, identify it later, and clean up only what I own?
  representation: focusable input pad, native keyboard direction buttons, discrete status, non-live continuous delta output, registry definition list.
  controls: pointer/wheel on pad; keyboard up/down/left/right buttons.
  runtimeSource: examples/ObserverInputPad/useObserverInputPadRuntime.ts
  sourcePath: examples/ObserverInputPad/useObserverInputPadRuntime.ts
  runtimeOwnership: register/create, callbacks, getAll/getById/target/vars reads and owned kill cleanup.
  displayOwnership: pad/buttons/status/output/registry/code/explanation only.
  accessibility: native buttons and focusable pad; only discrete direction uses status; continuous deltas have no live region.
  motion: user-driven input only; no autonomous motion.
nonGoals
  Observer velocity/gesture advanced APIs, global registry cleanup, ScrollTrigger runtime integration.
preserve
  routes, program docs, shared UI, global CSS, packages, tests and Git remain root-owned.
```

## 검증 계약

```text
verifiedPerspectives
  Official Coverage: PASS — six canonical items have catalog/manifest/coverage mapping.
  Learning Transformation: PASS — config → create → registry → instance inspection → owned cleanup.
  Runtime/Display Sync: PASS — one descriptor drives actual create, inspector and code.
  Pedagogy: PASS — physical input and keyboard fallback separate continuous delta from discrete direction.
  Structure/Comment: PASS — page-local runtime/display and Korean learning comments.
  Accessibility/Motion: PASS (static) — native controls, focus target, no live continuous values, no autonomous motion.
  Build/Integration: PASS — root route and full TypeScript/Vite/Storybook integration verified.
findings
  P25-OC-001 | PASS | exact 6 catalog/manifest/coverage audit | complete mapping | none
  P25-RDS-001 | PASS | descriptor → create vars/registry/code | no separate config | none
  P25-LIFE-001 | PASS (static) | cleanup kills observerRef only | unrelated registry instances preserved | browser lifecycle pending
  P25-INT-001 | PASS | root route/full TypeScript/Vite/Storybook | page chunk and route integration verified | none
  P25-B01 | DEFERRED | pad/button keyboard focus and controls | browser audit | owner
  P25-B02 | DEFERRED | reduced-motion user-driven input confirmation | browser audit | owner
  P25-B03 | DEFERRED | 320/390 registry layout | browser audit | owner
  P25-B04 | DEFERRED | pointer/wheel callback and owned cleanup actual result | browser audit | owner
verificationEvidence
  task-5-report.md records page-local TypeScript, exact six-row audit, scoped Prettier and assigned-path diff.
releaseDecision
  PASS — root integration complete; P25-B01..B04 are only DEFERRED checks.
```
