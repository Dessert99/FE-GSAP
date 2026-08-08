# P21 MotionPath handoff

## Input contract

- objective: one visible path와 stable follower로 path input → progress → align → orientation → coordinate boundary를 학습한다.
- officialPage: title `MotionPath`; canonicalUrl `https://gsap.com/docs/v3/Plugins/MotionPathPlugin/`; reviewedAt `2026-08-08`; category `SVG`; slug `motion-path`.
- localPage: localPath `src/content/gsap/svg/motion-path/`; route `/fundamentals/motion-path`.
- sourceBlockers: none; #101 rendered 두 번, official raw/type 두 번, installed source/type 두 번 대조.
- moduleSelection: plugin, property catalog, concept guide, one SVG follower tween.
- learnerFlow: path input/progress → visible interval → align/origin → autoRotate/point-array boundary → coordinate/authoring boundary.
- relatedPages: registered P20 `/fundamentals/motion-path-helper`; P22–P24 raw data/coordinates/measurement are text-only boundaries.

## Source manifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| MP-01 | plugin registration and minimal motionPath tween | #101 Quick Start | verified |
| MP-02 | selector, Element, SVG string inputs | #101 path | verified |
| MP-03 | x/y points, cubic points and current start | #101 path | verified |
| MP-04 | non-coordinate property arrays smooth velocity | #101 path/other properties | verified |
| MP-05 | shorthand or config object | #101 config intro | verified |
| MP-06 | align selector/Element/self, offsets and coordinate spaces | #101 align | verified |
| MP-07 | alignOrigin sets target point and transformOrigin | #101 alignOrigin | verified |
| MP-08 | autoRotate true/degree offset/center origin | #101 autoRotate | verified |
| MP-09 | start/end defaults, negative, backwards and wrap | #101 start/end | verified |
| MP-10 | curviness applies to point arrays and defaults to 1 | #101 curviness | verified |
| MP-11 | fromCurrent, relative and cubic array boundaries | #101 fromCurrent/relative/type | verified |
| MP-12 | resolution pacing tradeoff and useRadians | #101 resolution/useRadians | verified |
| MP-13 | align is one-time; resize recreates tween at saved progress | #101 alignment note | verified |
| MP-14 | helper and conversion/coordinate utilities are separate concerns | #101 highlights/method list | verified |

## Coverage map

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| MP-01 | runtime registration/tween | covered |
| MP-02 | PathInputSection | covered |
| MP-03 | PathInputSection | covered |
| MP-04 | OrientationSection boundary | covered |
| MP-05 | lab descriptor/code | covered |
| MP-06 | AlignmentSection/runtime align | covered |
| MP-07 | AlignmentSection/lab descriptor | covered |
| MP-08 | OrientationSection/lab checkbox | covered |
| MP-09 | PathInputSection/lab ranges/markers | covered |
| MP-10 | OrientationSection | covered |
| MP-11 | OrientationSection | covered |
| MP-12 | OrientationSection | covered |
| MP-13 | BoundarySection | covered |
| MP-14 | BoundarySection/P20 link | covered |

## Implementation contract

- exactFiles.create: page/meta/catalog/properties, PageCoverage, four sections, MotionPathLab TSX/CSS/animation hook, this handoff.
- exactFiles.modify: none.
- exampleContracts: name MotionPathLab; goal selected progress interval and tangent orientation; representation one SVG curve/one follower/0-0.5-1 markers; controls keyboard range start/end and checkbox autoRotate; runtimeSource `useMotionPathAnimation.ts`; sourcePath same; runtimeOwnership register/tween/kill/revert; displayOwnership controls/code/status; accessibility labels, keyboard native controls, discrete status; motion shared `useReducedMotion`, duration 0 selected end.
- nonGoals: no editor lifecycle, raw conversion, matrix/measurement tutorial, no decorative second target.
- preserve: routes, program/shared/package/tests/Git unchanged; root owns integration.

## Verification contract

- verifiedPerspectives: Source Curator PASS; Content Architect PASS; Official Coverage PASS; Learning Transformation PASS; Runtime/Display Sync PASS; Pedagogy PASS; Structure/Comment PASS; static Accessibility/Motion PASS; Cross-page Consistency PASS.
- findings:
  - MP-F01 PASS — 14 catalog/sourceManifest/coverage IDs map one-to-one.
  - MP-F02 PASS — one descriptor drives controls, actual motionPath config, markers/status and serializer; stable refs own visible path/follower.
  - MP-F03 PASS — cleanup kills tween and clears transform/transformOrigin; reduced motion gives selected end with duration 0.
  - MP-F04 PASS — P20 uses toHref; raw utilities remain text-only.
  - MP-F05 PASS — root route, full TypeScript, Vite and Storybook integration verified.
  - MP-B01/B02/B03/B04 DEFERRED — approved keyboard/focus, reduced-motion browser switch, 320/390 layout, real control operation.
- verificationEvidence: report records rendered/raw/installed evidence, page-local TypeScript, ID audit, Prettier and diff check.
- releaseDecision: PASS — root integration complete; B01–B04 DEFERRED.
