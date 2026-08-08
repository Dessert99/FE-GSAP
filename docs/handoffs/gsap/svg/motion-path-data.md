# MotionPath raw-path data page handoff

## 입력 계약

```text
objective
  P22에서 points, object arrays, SVG shapes, d strings, RawPath arrays를 one inspectable cubic raw-path pipeline으로 변환한다.
officialPage
  title: MotionPathPlugin.pointsToSegment / arrayToRawPath / convertToPath / getRawPath / rawPathToString / stringToRawPath
  canonicalUrl: https://gsap.com/docs/v3/Plugins/MotionPathPlugin/methods/static-pointsToSegment/ ; https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.arrayToRawPath()/ ; https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.convertToPath()/ ; https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.getRawPath()/ ; https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.rawPathToString()/ ; https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.stringToRawPath()/
  reviewedAt: 2026-08-08
  category: SVG
  slug: motion-path-data
localPage
  localPath: src/content/gsap/svg/motion-path-data/
  route: /fundamentals/motion-path-data
moduleSelection
  utility/overload, input-output pipeline, DOM mutation/restoration, semantic RawPath tables
sourceManifest
  - id: MPDATA-01 | officialItem: pointsToSegment(points, curviness) maps alternating x/y points to cubic segment array; 0 hard corners, 1 default, 2 more curvy | sourceLocation: #102 rendered signature/parameters/returns; official MotionPathPlugin.js utility export; installed types 191-200 | sourceStatus: verified
  - id: MPDATA-02 | officialItem: arrayToRawPath(values, vars) returns RawPath; vars include curviness, thru/cubic type, relative, x, y and cubic has anchor/two-control-point order | sourceLocation: #103 rendered details/configuration/RawPath; installed MotionPathPlugin.js 260-264 and types 25-41 | sourceStatus: verified
  - id: MPDATA-03 | officialItem: convertToPath(shape, swap) accepts selector or SVG shape element, returns path array, swaps DOM by default, and false prevents swap | sourceLocation: #105 rendered signature/parameters/returns; installed MotionPathPlugin.js 250 and types 93-102 | sourceStatus: verified
  - id: MPDATA-04 | officialItem: getRawPath(value) reads RawPath from selector, SVG path element, or raw d string | sourceLocation: #110 rendered signature/parameters/RawPath; installed MotionPathPlugin.js 242 and types 160-168 | sourceStatus: verified
  - id: MPDATA-05 | officialItem: rawPathToString(rawPath) converts cubic numeric segment arrays to SVG d string and pairs with stringToRawPath | sourceLocation: #112 rendered signature/details/RawPath; installed MotionPathPlugin.js 245 and types 206-214 | sourceStatus: verified
  - id: MPDATA-06 | officialItem: stringToRawPath(data) converts SVG d string to RawPath; resulting RawPath always has cubic beziers and pairs with rawPathToString | sourceLocation: #114 rendered signature/details/RawPath; installed MotionPathPlugin.js 244 and types 236-244 | sourceStatus: verified
sourceBlockers
  none. All six rendered canonicals were opened and reopened twice on 2026-08-08. Official GSAP raw MotionPathPlugin/paths sources and installed MotionPathPlugin.js, paths.js, motion-path-plugin.d.ts were compared twice. Installed d.ts narrows convertToPath input to SVGPathTarget (string/SVGPathElement) although official #105 permits SVG shapes; runtime uses a single source-boundary cast for the imperative rect and records it without replacing official wording. Resolution occurs in raw-path measurement source, but is not a documented input of these six conversion utilities; P21 owns it as a text-only boundary.
learnerFlow
  1. flat points and object arrays enter cubic raw data through two different APIs.
  2. SVG conversion is distinct because swap mutates the DOM.
  3. RawPath is one numeric segment array for every M command.
  4. string/element getRawPath and string parse converge on RawPath.
  5. serialize then parse verifies the representation round trip without animation.
coverageMap
  - sourceItemId: MPDATA-01 | localEvidence: input-shapes section; points descriptor and actual pointsToSegment branch | localStatus: covered
  - sourceItemId: MPDATA-02 | localEvidence: input-shapes section; array descriptor/curviness/type actual arrayToRawPath branch; properties table | localStatus: covered
  - sourceItemId: MPDATA-03 | localEvidence: svg-boundary section; imperative host restore and actual convertToPath(rect, true) branch | localStatus: covered
  - sourceItemId: MPDATA-04 | localEvidence: raw-structure section; SVG path and d-string getRawPath actual branches | localStatus: covered
  - sourceItemId: MPDATA-05 | localEvidence: RawPathPipelineLab serialized d stage and actual rawPathToString branches | localStatus: covered
  - sourceItemId: MPDATA-06 | localEvidence: RawPathPipelineLab direct/string round-trip branches and RawPath table | localStatus: covered
relatedPages
  P21 MotionPath is a registered prerequisite. P23 coordinate conversion is outside this page; resolution remains P21 motion measurement vocabulary, not a P22 pipeline input.
```

## 구현 계약

```text
exactFiles
  create: MotionPathDataPage TSX/CSS, meta/catalog/properties, RawPathPipelineLab TSX/CSS/runtime, this handoff
  modify: none
exampleContracts
  name: RawPathPipelineLab
  goal: one discriminated descriptor supplies actual input calls, RawPath semantic tables, serialized output and displayed code.
  question: Which conversion should I call for each path representation, and when does conversion mutate SVG DOM?
  representation: native input-kind select, conditional curviness range, static imperative SVG host, stage definition list, RawPath table and serialized code.
  controls: native select, native range when points/array apply, run pipeline, restore SVG rect.
  runtimeSource: examples/RawPathPipelineLab/useRawPathPipelineRuntime.ts
  sourcePath: examples/RawPathPipelineLab/useRawPathPipelineRuntime.ts
  runtimeOwnership: plugin registration, discriminated descriptor, actual six utility branches, imperative SVG replacement/restore/cleanup and snapshot.
  displayOwnership: native controls, SVG host, semantic tables, code serializer, explanation and observation guidance.
  accessibility: native select/range/buttons; status announces explicit run/restore result; table has caption and headers.
  motion: none; no tween or autonomous motion is created, so reduced-motion alternate behavior is not applicable.
nonGoals
  P21 motion tween setup/resolution, P23 coordinates/matrices, malformed d error claims, React-owned SVG replacement.
preserve
  routes, program docs, shared UI, global CSS, packages, tests and Git remain root-owned.
```

## 검증 계약

```text
verifiedPerspectives
  Official Coverage: PASS — six verified canonical items map one-to-one to catalog, manifest and coverage.
  Learning Transformation: PASS — input choice → DOM boundary → numeric segment meaning → serialize/parse round trip.
  Runtime/Display Sync: PASS — one descriptor supplies selected input, curviness, actual branch and code.
  Pedagogy: PASS — no animation obscures geometry representation; semantic tables show M/segment and alternating coordinates.
  Structure/Comment: PASS — page assembly, non-animation runtime and Korean learning comments remain page-local.
  Accessibility/Motion: PASS (static) — native controls/status/table; motion none is explicit.
  Cross-page Consistency: PASS (static) — P21 text-only and P23 ownership boundaries remain clear.
  Build/Integration: PASS — root route and full TypeScript/Vite/Storybook integration verified.
findings
  P22-OC-001 | PASS | exact 6 canonical / 6 catalog / 6 manifest / 6 coverage audit | item-level mapping complete | none
  P22-RDS-001 | PASS | descriptor → selected utility branch/RawPath output/code | no duplicate conversion configuration | none
  P22-DOM-001 | PASS (static) | React owns g only; imperative host creates/restores/removes rect/path | swap cannot replace a React-owned node | browser confirmation pending
  P22-INT-001 | PASS | route/full TypeScript/Vite/Storybook | page chunk and route integration verified | none
  P22-B01 | DEFERRED | native select/range/button keyboard and focus operation | browser audit | owner
  P22-B03 | DEFERRED | 320/390 table and serialized-d overflow | browser audit | owner
  P22-B04 | DEFERRED | all five input branches and SVG swap/restore actual result | browser audit | owner
verificationEvidence
  page-local TypeScript/import, exact six-row audit, scoped Prettier and assigned-path diff are recorded in task-2-report.md.
releaseDecision
  PASS — root integration is complete; P22-B01, P22-B03 and P22-B04 are the only applicable DEFERRED checks because motion is none.
```
