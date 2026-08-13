# GSDevTools page handoff

## 입력 계약

```text
objective
  P14에서 development 중 labelled GSAP timeline을 scrub·slow·isolate하는 GSDevTools create workflow와 production/disposal boundary를 학습시킨다.
officialPage
  title: GSDevTools / GSDevTools.create()
  canonicalUrl: https://gsap.com/docs/v3/Plugins/GSDevTools/ ; https://gsap.com/docs/v3/Plugins/GSDevTools/static.create()/
  reviewedAt: 2026-08-08
  category: Other
  slug: gsdevtools
localPage
  localPath: src/content/gsap/other/gsdevtools/
  route: /fundamentals/gsdevtools
moduleSelection
  plugin, class/instance, property catalog, installation/integration
sourceManifest
  - id: GSDT-01 | officialItem: visual debugging UI with playback controls, keyboard shortcuts and global synchronization | sourceLocation: #76 rendered 175-177 | sourceStatus: verified
  - id: GSDT-02 | officialItem: import/register plugin then create an instance | sourceLocation: #76 rendered 168-192 | sourceStatus: verified
  - id: GSDT-03 | officialItem: default instance controls every animation on Global Timeline | sourceLocation: #76 rendered 203 | sourceStatus: verified
  - id: GSDT-04 | officialItem: directly link a particular animation to avoid global syncing work | sourceLocation: #76 rendered 196-202,299 | sourceStatus: verified
  - id: GSDT-05 | officialItem: timeline/tween string id appears in animation menu | sourceLocation: #76 rendered 204-219 | sourceStatus: verified
  - id: GSDT-06 | officialItem: UI in/out, animation, timeScale and loop choices persist and config overrides them | sourceLocation: #76 rendered 220-222 | sourceStatus: verified
  - id: GSDT-07 | officialItem: persist false disables storage and unique id segregates session/domain values | sourceLocation: #76 rendered 220-222 | sourceStatus: verified
  - id: GSDT-08 | officialItem: animation accepts String or Animation and defaults to Global Timeline selection | sourceLocation: #76 rendered 230-232 | sourceStatus: verified
  - id: GSDT-09 | officialItem: container accepts String/Element and css accepts Object/String | sourceLocation: #76 rendered 234-239 | sourceStatus: verified
  - id: GSDT-10 | officialItem: globalSync hooks root timeline and hideGlobalTimeline removes menu item | sourceLocation: #76 rendered 241-247 | sourceStatus: verified
  - id: GSDT-11 | officialItem: inTime/outTime accept time, label or animation id positions | sourceLocation: #76 rendered 252-269 | sourceStatus: verified
  - id: GSDT-12 | officialItem: keyboard defaults true and only one instance listens for shortcuts | sourceLocation: #76 rendered 256-258; #77 rendered 175 | sourceStatus: verified
  - id: GSDT-13 | officialItem: loop/paused/timeScale are initial state and minimal limits visible controls | sourceLocation: #76 rendered 260-280 | sourceStatus: verified
  - id: GSDT-14 | officialItem: under 600px minimal auto-switches and visibility auto hides after mouse off | sourceLocation: #76 rendered 264-265,282-284 | sourceStatus: verified
  - id: GSDT-15 | officialItem: documented Space/arrows/L/I/O/H keyboard controls | sourceLocation: #76 rendered 287-296 | sourceStatus: verified
  - id: GSDT-16 | officialItem: ScrollTrigger-driven animations do not work because scrollbar and scrubber cannot both control them | sourceLocation: #76 rendered 309-311 | sourceStatus: verified
  - id: GSDT-17 | officialItem: Global Timeline duration caps at 1000 seconds when it contains an infinite repeat | sourceLocation: #76 rendered 320-322 | sourceStatus: verified
  - id: GSDT-18 | officialItem: create(config:Object) returns a new GSDevTools; multiples allowed but one globalSync and keyboard instance only | sourceLocation: #76 rendered 315; #77 rendered 162-175 | sourceStatus: verified
  - id: GSDT-S01 | officialItem: installed constructor sets globalSync default according to supplied animation | sourceLocation: node_modules/gsap/src/GSDevTools.js 366-381 | sourceStatus: verified-source
  - id: GSDT-S02 | officialItem: installed d.ts/source expose create(vars?): GSDevTools and kill(): void | sourceLocation: node_modules/gsap/types/gs-dev-tools.d.ts 1-37; src/GSDevTools.js 1175 | sourceStatus: verified-source
sourceBlockers
  none. #76/#77 rendered evidence was reopened twice and installed source/types were read twice. No important official silence needed a runtime probe.
learnerFlow
  1. replay만으로 놓치는 time debugging problem을 playhead control로 정의한다.
  2. labelled timeline과 animation selection으로 inspect scope를 좁힌다.
  3. one descriptor로 create config, tool UI, native fallback, code를 동기화한다.
  4. persistence/globalSync/keyboard/minimal/visibility 선택을 구분한다.
  5. ScrollTrigger warning, conditional development loading, kill disposal을 고정한다.
coverageMap
  - sourceItemId: GSDT-01 | localEvidence: DebuggingProblemSection section 01 | localStatus: covered
  - sourceItemId: GSDT-02 | localEvidence: CreateInstanceSection and useGsDevToolsLabAnimation.ts | localStatus: covered
  - sourceItemId: GSDT-03 | localEvidence: DebuggingProblemSection section 01 | localStatus: covered
  - sourceItemId: GSDT-04 | localEvidence: DebuggingProblemSection; lab descriptor animation | localStatus: covered
  - sourceItemId: GSDT-05 | localEvidence: CreateInstanceSection; lab descriptor timelineId/childIds | localStatus: covered
  - sourceItemId: GSDT-06 | localEvidence: CreateInstanceSection; properties | localStatus: covered
  - sourceItemId: GSDT-07 | localEvidence: CreateInstanceSection; descriptor config id/persist | localStatus: covered
  - sourceItemId: GSDT-08 | localEvidence: gsdevtools.properties.ts; lab animation config | localStatus: covered
  - sourceItemId: GSDT-09 | localEvidence: gsdevtools.properties.ts; lab toolContainerRef | localStatus: covered
  - sourceItemId: GSDT-10 | localEvidence: ConfigControlsSection; descriptor hideGlobalTimeline | localStatus: covered
  - sourceItemId: GSDT-11 | localEvidence: ConfigControlsSection; gsdevtools.properties.ts | localStatus: covered
  - sourceItemId: GSDT-12 | localEvidence: ConfigControlsSection; descriptor keyboard false | localStatus: covered
  - sourceItemId: GSDT-13 | localEvidence: ConfigControlsSection; descriptor paused/timeScale/minimal | localStatus: covered
  - sourceItemId: GSDT-14 | localEvidence: ConfigControlsSection; descriptor visibility auto | localStatus: covered
  - sourceItemId: GSDT-15 | localEvidence: ConfigControlsSection section 03 | localStatus: covered
  - sourceItemId: GSDT-16 | localEvidence: ProductionBoundarySection warning | localStatus: covered
  - sourceItemId: GSDT-17 | localEvidence: ProductionBoundarySection disposal card | localStatus: covered
  - sourceItemId: GSDT-18 | localEvidence: gsdevtools.catalog.ts; ProductionBoundarySection | localStatus: covered
  - sourceItemId: GSDT-S01 | localEvidence: CreateInstanceSection global selection explanation | localStatus: covered
  - sourceItemId: GSDT-S02 | localEvidence: useGsDevToolsLabAnimation.ts cleanup; ProductionBoundarySection | localStatus: covered
relatedPages
  Tween/Timeline controls are prerequisites. P15 and later pages remain text-only boundaries.
```

## 구현 계약

```text
exactFiles
  create: GsDevToolsPage TSX/CSS, meta/catalog/properties, four sections, GsDevToolsLab TSX/CSS/runtime, this handoff
  modify: none
exampleContracts
  name: GsDevToolsLab
  goal: one descriptor supplies a paused labelled timeline, GSDevTools.create config, visible native fallback controls and synchronized setup code.
  question: How can one scene be scrubbed and slowed during development without making a production debug UI?
  representation: one dot timeline, GSDevTools container in development, initial timeScale select, play/pause/rewind fallback and status.
  controls: initial timeScale select; native play, pause and rewind buttons.
  runtimeSource: examples/GsDevToolsLab/useGsDevToolsLabAnimation.ts
  sourcePath: examples/GsDevToolsLab/useGsDevToolsLabAnimation.ts
  runtimeOwnership: paused labelled timeline creation, dev-only dynamic import/register/create, descriptor config, native timeline actions and instance/timeline disposal.
  displayOwnership: controls, stage, status, serializer, property reference and learning explanation only.
  accessibility: native labelled select/buttons, status message and keyboard-independent fallback; GSDevTools keyboard is disabled because only one instance may listen.
  motion: timeline starts paused; reduced motion never autoplays and native play settles to final state immediately.
nonGoals
  production debugging console, global timeline control, ScrollTrigger inspection, future P15 inertia APIs.
preserve
  routes, program docs, shared UI, global CSS, packages and Git remain root-owned.
```

## 검증 계약

```text
verifiedPerspectives
  Official Coverage: PASS — 2/2 canonical, 18/18 official item, 2/2 installed-source item mapping.
  Learning Transformation: PASS — problem → labelled selection → config → control → production/disposal.
  Runtime/Display Sync: PASS — one descriptor supplies timeline IDs, duration, timeScale, create config, visible select and serialized code.
  Pedagogy: PASS — one scene distinguishes inspector role from animation creation and shows native fallback.
  Structure/Comment: PASS — page/sections/example runtime boundaries and Korean one-line comments are page-local.
  Accessibility/Motion: PASS (static) — native controls, status, initially paused timeline and reduced-motion final settle.
  Cross-page Consistency: PASS (static) — Timeline controls are prerequisite text; P15 is text-only boundary.
  Build/Integration: PASS — root route, TypeScript, Vite 967 modules and Storybook 1105 modules passed.
findings
  P14-OC-001 | PASS | 2 canonical / 18 official / 2 source item audit | complete item mapping | none
  P14-RDS-001 | PASS | descriptor -> labelled timeline/create config/native controls/code | no duplicate config | none
  P14-INT-001 | PASS | route/full TypeScript/Vite/Storybook | 967/1105 modules and page chunks emitted | none
  P14-B01 | DEFERRED → PASS | keyboard focus/native control operation | browser audit | owner
  P14-B02 | DEFERRED → PASS | reduced-motion actual no-autoplay/final settle | browser audit | owner
  P14-B03 | DEFERRED → PASS | 320/390 inspector container and overflow | browser audit | owner
  P14-B04 | DEFERRED → PASS | development GSDevTools create, scrub, slow and disposal visual result | browser audit | owner
verificationEvidence
  page-local checks are recorded in task-8-report.md; root reran TypeScript, Vite, Storybook and diff checks after route registration.
releaseDecision
PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.
```

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
