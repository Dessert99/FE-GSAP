# P24 MotionPath measurement handoff

## Input contract

- objective: one raw path descriptor에서 length → position/angle sample → slice interval을 static ruler로 학습한다.
- officialPage: #108 `getLength()`, #109 `getPositionOnPath()`, #113 `sliceRawPath()`; reviewedAt `2026-08-08`; category `SVG`; slug `motion-path-measure`.
- localPage: `src/content/gsap/svg/motion-path-measure/`; route `/fundamentals/motion-path-measure`.
- sourceBlockers: none; each rendered canonical, official raw/types, installed source/types compared twice.
- moduleSelection: callable utility, coordinate measurement, static visualizer.
- learnerFlow: accepted path/length → cached raw-path position+angle → sliced interval → closed/wrap boundary.
- relatedPages: registered P21 MotionPath and P22 RawPath data pages are linked prerequisites.

## Source manifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| MPM-108 | `getLength(path: Element | String | RawPath): Number` returns path length. | #108 signature/parameters/returns; source/types | verified |
| MPM-109 | `getPositionOnPath(rawPath, progress, includeAngle)` returns x/y and optional degree angle; measurements must be cached first and recached if path changes. | #109 signature/details/sample; source/types | verified |
| MPM-113 | `sliceRawPath(rawPath, start, end)` returns a new sliced RawPath; interval/wrap behavior is raw geometry, and this open-path lab separates closed-path boundary. | #113 signature/details; source/types | verified |

## Coverage map

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| MPM-108 | LengthSection, runtime `getLength`, labelled ruler output | covered |
| MPM-109 | SampleSection, runtime cache/sample, marker+tangent | covered |
| MPM-113 | SliceSection, runtime slice/rawPathToString, highlight | covered |

## Implementation contract

- exactFiles.create: page/meta/catalog, three sections, PathRulerLab TSX/CSS/runtime, this handoff.
- exactFiles.modify: none.
- exampleContracts: PathRulerLab; goal static geometry measurement; controls three keyboard range inputs; runtimeSource `usePathRulerRuntime.ts`; sourcePath same; runtimeOwnership register/plugin static calls; displayOwnership SVG marker/tangent/slice/code/labelled values; accessibility semantic labels and no live per-frame data; motion none by design, React removes SVG overlays on unmount.
- nonGoals: no follower tween, raw conversion lesson, coordinate matrix lesson.
- preserve: routes/program/shared/packages/tests/Git/full builds untouched.

## Verification contract

- verifiedPerspectives: Source Curator PASS; Content Architect PASS; Official Coverage PASS; Learning Transformation PASS; Runtime/Display Sync PASS; Pedagogy PASS; Structure/Comment PASS; Accessibility/Motion static PASS; Cross-page Consistency PASS.
- findings: MPM-F01 PASS 3 catalog/manifest/coverage IDs match; MPM-F02 PASS one raw descriptor feeds actual calls/marker/tangent/slice/code; MPM-F03 PASS no animation or retained overlay; MPM-F04 PASS root route and full TypeScript/Vite/Storybook integration; MPM-B01–B04 DEFERRED approved browser keyboard/focus, small layout and real control validation.
- verificationEvidence: task-4 report records source evidence and page-local checks.
- releaseDecision: PASS — root integration complete; B01–B04 DEFERRED.
