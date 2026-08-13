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

## 2026-08-13 Batch B 재감사

- `MPM-OC-20260813` | PASS | 현재 공식 `getLength()`, `getPositionOnPath()`, `sliceRawPath()` 문서와 대조 | cache 선행 조건, degree angle, 새 RawPath slice 반환 경계를 유지했다.
- `MPM-RDS-20260813` | BLOCK → PASS | serializer가 runtime의 point→slice→length 순서를 바꾸고 slice를 화면 path data로 만드는 `rawPathToString()`을 생략했다 | memoized measurement의 실제 호출 순서와 최종 `sliceData`를 표시했다.
- `MPM-WRITE-20260813` | BLOCK → PASS | learner-facing coverage 수치와 P21/P22 번호가 노출됐다 | 세 학습 질문과 개념명 링크로 바꿨다.
- `MPM-BROWSER-20260813` | DEFERRED | 키보드/포커스, 320/390px, 실제 marker·tangent·slice 결과 | motion은 없으며 이번 배치에서는 브라우저를 조작하지 않았다.
- `MPM-STORYBOOK-20260813` | N/A | Storybook은 c309e13에서 의도적으로 삭제됨 | 실행하지 않았다.

currentReleaseDecision
  PASS — runtime/display와 문장 BLOCK을 해소했고 browser-only 검증은 DEFERRED다. 과거 빌드와 browser closure는 현재 근거가 아니다.

### 2026-08-13 Batch B 통합 검증

- `npx tsc --noEmit --pretty false` exit 0.
- Batch B 21 page dir + handoff 범위 `git diff --check` exit 0.

### 2026-08-13 최종 교차검토

- `MPM-RDS-20260813-02 | BLOCK → PASS` — serializer에 plugin 등록, 실제 path data와 세 control 값을 받는 `measurePath()` 경계를 정의하고, DOM·Tween·listener side effect가 없어 cleanup 대상이 없다는 점까지 명시한 뒤 runtime memo 계산과 재대조했다.
- Storybook: `N/A` — c309e13에서 의도적으로 삭제되어 실행하지 않았다.
- Browser: `DEFERRED` — 키보드·focus, 320/390px, 실제 marker·tangent·slice 결과를 실조작하지 않았다.
- overallDecision: `NOT VERIFIED` — 정적 BLOCK은 없지만 Browser 실조작이 `DEFERRED`다.
- releaseDecision: `NOT VERIFIED` — 브라우저 관점을 현재 증거로 확인하지 않았다.
