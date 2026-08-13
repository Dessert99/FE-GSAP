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
- findings: MPM-F01 PASS 3 catalog/manifest/coverage IDs match; MPM-F02 PASS one raw descriptor feeds actual calls/marker/tangent/slice/code; MPM-F03 PASS no animation or retained overlay; MPM-F04 PASS root route and full TypeScript/Vite/Storybook integration; MPM-B01–B04 DEFERRED → PASS approved browser keyboard/focus, small layout and real control validation.
- verificationEvidence: task-4 report records source evidence and page-local checks.
- releaseDecision: PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
