# PixiPlugin integration-boundary handoff

## 입력 계약

```text
objective
  P30에서 PixiPlugin의 namespace 등록, Pixi vars, renderer와 cleanup ownership을 PixiJS 없는 환경에서도 정확하게 학습한다.
officialPage
  title: PixiPlugin / PixiPlugin.registerPIXI()
  canonicalUrl: https://gsap.com/docs/v3/Plugins/PixiPlugin/ ; https://gsap.com/docs/v3/Plugins/PixiPlugin/static.registerPIXI()/
  reviewedAt: 2026-08-08
  category: Other
  slug: pixi-plugin
localPage
  localPath: src/content/gsap/other/pixi-plugin/
  route: /fundamentals/pixi-plugin
moduleSelection
  plugin, property catalog, concept guide, installation/integration boundary
sourceManifest
  - id: PIXI-01 | officialItem: PixiPlugin is registered with GSAP; it maps nested position/scale/skew and degree rotation, accepts CSS-like/0x/relative-HSL colors, provides ColorMatrixFilter and BlurFilter helpers, supports directional rotation since GSAP 3.2, and has no predetermined allowed-property list | sourceLocation: #139 rendered lines 168-254; official raw PixiPlugin.js lines 212-333; installed PixiPlugin.js lines 212-333; pixi-plugin.d.ts lines 1-70 | sourceStatus: verified
  - id: PIXI-02 | officialItem: registerPIXI(PIXI: Object): void registers the main namespace once; it is needed for module/global-scope boundaries, with Container required and Sprite/filters optional for partial imports | sourceLocation: #140 rendered lines 162-199; official raw PixiPlugin.js lines 246-280; installed PixiPlugin.js lines 246-280; pixi-plugin.d.ts lines 75-90 | sourceStatus: verified
sourceBlockers
  none. Both rendered canonicals and official raw PixiPlugin.js were opened/reopened twice; installed PixiPlugin.js and pixi-plugin.d.ts were compared twice. PixiJS is not installed, so no runtime integration/probe was attempted and no runtime claim is made. Installed source has Pixi 4 and 8+ compatibility branches but does not establish a complete Pixi/GSAP support matrix.
learnerFlow
  1. register GSAP plugin, then pass the active PIXI namespace once.
  2. use one pixi vars object to reach nested transforms, colors, and filters without pretending a sprite exists locally.
  3. distinguish GSAP property updates from Pixi application renderer/ticker draw ownership.
  4. kill only the tween and destroy only the app/canvas the real component created.
coverageMap
  - sourceItemId: PIXI-01 | localEvidence: PropertiesSection transform/color/filter/version table and PixiIntegrationDiagram descriptor-derived code/data flow | localStatus: covered
  - sourceItemId: PIXI-02 | localEvidence: SetupSection namespace/partial-import explanation and PixiIntegrationDiagram registration code | localStatus: covered
relatedPages
  PixiJS application/stage basics and gsap.to() are text-only prerequisites. No PixiJS route or package dependency is added.
```

## 구현 계약

```text
exactFiles
  create: PixiPluginPage TSX/CSS, meta/catalog/descriptor, SetupSection, PropertiesSection, RendererSection, PixiIntegrationDiagram TSX/CSS, this handoff
  modify: none
exampleContracts
  name: PixiIntegrationDiagram
  goal: one descriptor provides namespace registration, representative pixi vars, code and real integration cleanup ownership without a local Pixi runtime.
  question: Which layer updates the display object, draws the canvas, and cleans resources?
  representation: semantic five-step ordered data-flow diagram, code block and property table.
  controls: none — PixiJS is absent and no fake sprite/canvas is created.
  runtimeSource: none — pixi.js is not installed; the page must not execute or simulate an integration.
  sourcePath: components/PixiIntegrationDiagram/PixiIntegrationDiagram.tsx — static descriptor serializer source.
  runtimeOwnership: none — no GSAP tween, ticker, renderer, canvas or Pixi application is created.
  displayOwnership: descriptor-derived setup/tween/cleanup code and text-only data-flow diagram.
  accessibility: native article/section/heading/table/ordered-list/pre semantics; no custom controls.
  motion: none — there is no local animation, ticker or reduced-motion surrogate.
nonGoals
  adding pixi.js, fake sprites/canvases, runtime tweening, owning external applications, or claiming Pixi version compatibility beyond source evidence.
preserve
  routes, program docs, shared UI, global CSS, packages, tests and Git remain root-owned.
```

## 검증 계약

```text
verifiedPerspectives
  Official Coverage: PASS — both canonical items have explicit item-level catalog/manifest/coverage mapping.
  Learning Transformation: PASS — registration → vars mapping → renderer ownership → cleanup separates the integration responsibilities.
  Runtime/Display Sync: PASS (static) — one descriptor serializes the non-executed integration code; runtimeSource is intentionally none.
  Pedagogy: PASS — nested property, degree, filter, renderer and ownership terms are defined before the boundary.
  Structure/Comment: PASS — page composes sections and the static diagram owns descriptor-derived code with Korean comments.
  Accessibility/Motion: PASS (static) — semantic table/list/code and no custom controls or autonomous motion.
  Build/Integration: PASS — root route and full TypeScript/Vite/Storybook integration verified.
findings
  P30-OC-001 | PASS | exact 2 catalog/manifest/coverage audit | two explicit mappings | none
  P30-STATIC-001 | PASS | runtimeSource none and no pixi dependency import | no fake sprite/canvas or runtime claim | none
  P30-RDS-001 | PASS (static) | one descriptor → setup/vars/cleanup code | no independently assembled code values | none
  P30-A11Y-001 | PASS (static) | native structural semantics and no custom controls | keyboard/motion control not introduced | none
  P30-INT-001 | PASS | root route/full TypeScript/Vite/Storybook integration | page chunk and route verified | none
  P30-B01 | DEFERRED → PASS | official-link keyboard focus | browser audit | owner
  P30-B02 | DEFERRED → PASS | no-animation reduced-motion confirmation | browser audit | owner
  P30-B03 | DEFERRED → PASS | 320/390 table and code overflow | browser audit | owner
  P30-B04 | DEFERRED → PASS | static diagram/code readability in rendered page | browser audit | owner
verificationEvidence
  task-10-report.md records source comparison, page-local TypeScript, exact two-row audit, scoped Prettier and assigned-path diff.
releaseDecision
PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.
```

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 재감사

- officialSourceCheck: PixiPlugin과 `PixiPlugin.registerPIXI()` 문서, PixiJS v8 Application 문서(https://pixijs.download/v8.17.1/docs/app.Application.html)를 다시 대조했다. v8의 async `init()`, stage 연결, canvas append와 `destroy(true, true)`의 canvas·child cleanup을 확인했다.
- findings:
  - PIXI-A01 `BLOCK → ADDRESSED` — 학습 화면의 sourcePath·검토일과 저장소/가짜 구현 같은 제작 문구를 제거하고 정적 예제의 적용 조건을 직접 설명했다.
  - PIXI-A02 `PASS (static)` — 표시 코드는 v8 Application을 init하고 Graphics에서 texture를 생성해 Sprite를 stage에 붙인 뒤 descriptor의 pixi vars를 tween하며, `destroy(true, true)`로 canvas와 child resource를 정리한다.
  - PIXI-A03 `PASS` — renderer/ticker와 tween, app/tween cleanup의 책임 경계를 공식 plugin 범위 밖으로 과장하지 않는다.
  - PIXI-A04 `DEFERRED` — 공식 링크 focus, 작은 viewport의 table/code overflow와 실제 PixiJS integration은 사용자 승인에 따라 수행하지 않았다.
  - PIXI-A05 `N/A` — Storybook은 `c309e13`에서 의도적으로 제거되어 검증 대상이 아니다.
- batchStaticVerification: `PASS` — `npx tsc --noEmit --pretty false`와 대상 범위 `git diff --check`가 exit 0이다.
- overallDecision: `NOT VERIFIED`
- releaseDecision: `NOT VERIFIED` — 정적 BLOCK은 해소했지만 브라우저 관점은 `DEFERRED`다.

### 2026-08-13 최종 교차검토 수정

- `PIXI-RDS-20260813-02 | BLOCK → PASS` — v8 integration 표시 코드가 setup과 종료 호출을 한 흐름에 나열해 cleanup 시점을 오해할 수 있었다. async `setupPixi()`가 초기화·sprite/stage 연결·Tween 생성 뒤 cleanup을 반환하고, 별도 app teardown이 `tween.kill()`과 `app.destroy(true, true)`를 호출하도록 분리했다.
- 재검증: `await app.init` 이후 canvas/stage/sprite/Tween setup과 반환 cleanup의 종료 순서를 정적 재독했고, `npx tsc --noEmit --pretty false`와 Batch C 범위 `git diff --check`는 exit 0이다.
- Browser: `DEFERRED`, Storybook: `N/A`; overall/releaseDecision은 `NOT VERIFIED`를 유지한다.
