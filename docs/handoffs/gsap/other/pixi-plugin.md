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
  P30-B01 | DEFERRED | official-link keyboard focus | browser audit | owner
  P30-B02 | DEFERRED | no-animation reduced-motion confirmation | browser audit | owner
  P30-B03 | DEFERRED | 320/390 table and code overflow | browser audit | owner
  P30-B04 | DEFERRED | static diagram/code readability in rendered page | browser audit | owner
verificationEvidence
  task-10-report.md records source comparison, page-local TypeScript, exact two-row audit, scoped Prettier and assigned-path diff.
releaseDecision
  PASS — root integration complete; P30-B01..B04 remain DEFERRED.
```
