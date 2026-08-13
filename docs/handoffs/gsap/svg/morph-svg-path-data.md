# P19 MorphSVG path-data handoff — Phase 1

## Input contract

- objective: shape input → DOM path conversion → RawPath numeric form → serialization → round-trip/boundaries.
- officialPage: catalog #94/#98/#99; category `SVG`; slug `morph-svg-path-data`; reviewedAt `2026-08-08`.
- localPage: localPath `src/content/gsap/svg/morph-svg-path-data/`; route `/fundamentals/morph-svg-path-data`.
- prerequisite: P18 is registered and linked as the preceding MorphSVG lesson.
- moduleSelection: static utility/overload, DOM mutation/restoration, accessible RawPath data table; motion `none`.
- learnerFlow: shape input → conversion → raw numeric form → serialization → round-trip/boundaries.
- sourceBlockers: none.

## Source manifest

Rendered #94/#98/#99 were opened twice on 2026-08-08. Official raw MorphSVG source and installed `MorphSVGPlugin.js`/`morph-svg-plugin.d.ts` were compared twice; types confirm `convertToPath(shape, swap?): SVGPathElement[]`, `rawPathToString(RawPath): string`, `stringToRawPath(string): RawPath`.

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| MORPHPATH-01 | convert inputs, default DOM swap/false opt-out, return paths, retained attributes and rx/ry caveat | #94 signature/Details/Notes | verified |
| MORPHPATH-02 | RawPath-to-cubic-d serialization, segment/M and alternating coordinate representation | #98 signature/Details | verified |
| MORPHPATH-03 | d-to-RawPath parse, cubic conversion, segment representation and counterpart round trip | #99 signature/Details | verified |

## Coverage map

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| MORPHPATH-01 | GeometryConverter `convert`, DOM source/converted d, clone restoration | covered |
| MORPHPATH-02 | GeometryConverter RawPath accessible segment table and serialized d | covered |
| MORPHPATH-03 | descriptor `sourceD`, actual parse/serialize calls and documented boundary | covered |

## Phase 1 finding

- P19-P1 PASS — exact 3-row catalog/meta/manifest/coverage draft written; no implementation files created.
- P19-P2 ADVISORY — rendered docs describe cubic normalization but do not specify malformed-string behavior; implementation must display it as a boundary rather than claim a result.

## Implementation contract

- exactFiles.create: `MorphSvgPathDataPage.tsx`, `MorphSvgPathDataPage.css`, meta/catalog, `examples/GeometryConverter/*`.
- exactFiles.modify: none.
- exampleContracts: static geometry converter; descriptor supplies source tag and swap, while each actual utility return feeds the next call plus DOM/raw/string views and code; runtime source `useGeometryConverter.ts`; accessible raw segment table; motion `none` because this is representation, not animation.
- cleanup: React owns only a stable `<g>` host. Hook-owned baseline/current nodes are replaced inside it; rerun restores a fresh baseline clone first and unmount empties host plus refs. No tween is created.
- preserve: root owns routes, Git and program docs; shared UI, package and tests remain untouched.

## Verification contract

- verifiedPerspectives: Source Curator PASS; Content Architect PASS; Official Coverage PASS; Learning Transformation PASS; Runtime/Display Sync PASS; Pedagogy PASS; Structure/Comment PASS; static Accessibility/Motion PASS; Cross-page boundary PASS.
- findings: P19-F01 PASS — `convert` calls all three utilities in sequence, passing converted path d into RawPath parsing and its result into serialization. P19-F02 PASS — the stable host replaces hook-owned children with a baseline clone before rerun and empties them on unmount, so no generated node or stale ref remains. P19-F03 ADVISORY — malformed d input has no documented outcome and is correctly presented only as a boundary. P19-F04 PASS — root route, TypeScript, Vite 1032 modules and Storybook 1170 modules passed with page chunks. P19-F05 DEFERRED → PASS — approved browser control/focus and narrow-layout checks only; reduced motion is not applicable (motion none).
- verificationEvidence: task-13-report.md Phase 3 commands; root fixed Fiber ownership, utility chaining, restore snapshot and a stale CSS import, then reran TypeScript, Vite, Storybook and diff checks.
- releaseDecision: PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

## Fiber ownership fix

- P19-F06 ADDRESSED — `convertToPath(..., true)` no longer replaces a React-owned rect. React renders only `<g ref={hostRef}>`; hook creates baseline rect, tracks current `SVGElement`, replaces host children with a fresh baseline clone, and clears host/refs at cleanup. Path is never cast as `SVGRectElement`.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 Batch B 재감사

- `MORPHPATH-OC-20260813` | PASS | 현재 공식 `convertToPath()`, `rawPathToString()`, `stringToRawPath()` 문서와 대조 | DOM 교체 기본값, SVGPathElement 배열 반환, RawPath 왕복 경계를 유지했다.
- `MORPHPATH-RDS-20260813` | BLOCK → PASS | serializer가 runtime element 대신 선언되지 않은 tag 이름을 인자로 쓰고 실제 path 선택·빈 d fallback·`serialized` 변수명을 생략했다 | `currentRef.current`에서 시작하는 실제 utility 연결 순서를 표시했다.
- `MORPHPATH-WRITE-20260813` | BLOCK → PASS | learner-facing P18 번호를 사용했다 | 선행 MorphSVG 개념명으로 바꿨다.
- `MORPHPATH-ADV-20260813` | ADVISORY | 공식 문서는 malformed path string의 결과를 정하지 않는다 | 페이지도 결과를 단정하지 않는다.
- `MORPHPATH-BROWSER-20260813` | DEFERRED | 키보드/포커스, 320/390px, 실제 DOM conversion·restore 결과 | motion은 없으며 이번 배치에서는 브라우저를 조작하지 않았다.
- `MORPHPATH-STORYBOOK-20260813` | N/A | Storybook은 c309e13에서 의도적으로 삭제됨 | 실행하지 않았다.

currentReleaseDecision
  PASS — runtime/display·문장 BLOCK을 해소했고 browser-only 검증은 DEFERRED다. 과거 빌드와 browser closure는 현재 근거가 아니다.

### 2026-08-13 self cross-review

- `MORPHPATH-RDS-20260813-02 | BLOCK → PASS` — serializer가 hook 내부 `currentRef`에 의존했다. runtime과 같은 baseline rect를 imperative host에 만들고 변환·cleanup하는 독립 snippet으로 수정한 뒤 재독해 PASS.
- 통합 검증: `npx tsc --noEmit --pretty false` exit 0, Batch B 21 page dir + handoff 범위 `git diff --check` exit 0.

### 2026-08-13 최종 교차검토 판정

- Storybook: `N/A` — c309e13에서 의도적으로 삭제되어 실행하지 않았다.
- Browser: `DEFERRED` — 승인된 브라우저 실조작 관점을 수행하지 않았다.
- overallDecision: `NOT VERIFIED` — 정적 BLOCK은 없지만 Browser 실조작이 `DEFERRED`다.
- releaseDecision: `NOT VERIFIED` — 브라우저 관점을 현재 증거로 확인하지 않았다.
