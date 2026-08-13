# P23 MotionPath coordinates handoff

## Input contract

- objective: nested transformed containers에서 from/to local point, global/alignment matrix와 relative gap을 구분한다.
- officialPage: #104 convertCoordinates, #106 getAlignMatrix, #107 getGlobalMatrix, #111 getRelativePosition; slug `motion-path-coordinates`; reviewedAt `2026-08-08`.
- localPage: `src/content/gsap/svg/motion-path-coordinates/`; route `/fundamentals/motion-path-coordinates`.
- prerequisites: registered P21 MotionPath and P22 RawPath data pages.
- moduleSelection: static coordinate utility, nested SVG/HTML transform diagram, matrix/point table; optional travel skips under reduced motion.
- sourceBlockers: none.

## Source manifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| MPC-01 | convertCoordinates input spaces/point/nested transform | #104 rendered/raw/type ×2 | verified |
| MPC-02 | convert point-or-Matrix2D return and rendered window/type Element difference | #104 rendered/raw/type ×2 | verified |
| MPC-03 | align from/to/origins/path auto/nested transform | #106 rendered/raw/type ×2 | verified |
| MPC-04 | Matrix2D coefficients/apply and input type difference | #106 rendered/raw/type ×2 | verified |
| MPC-05 | global matrix/inverse/adjustGOffset | #107 rendered/raw/type ×2 | verified |
| MPC-06 | relative gap/origins/path auto/Point2D and input type difference | #111 rendered/raw/type ×2 | verified |

## Coverage map

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| MPC-01 | CoordinateMatrixLab descriptor + nested axes | covered |
| MPC-02 | runtime convertCoordinates snapshot | covered |
| MPC-03 | runtime getAlignMatrix snapshot | covered |
| MPC-04 | matrix coefficient table | covered |
| MPC-05 | runtime getGlobalMatrix snapshot | covered |
| MPC-06 | runtime getRelativePosition snapshot | covered |

## Implementation and verification

- exactFiles.create: page/CSS/meta/catalog and CoordinateMatrixLab runtime/TSX/CSS.
- descriptor supplies point/origins/travel, all four actual calls, tables and code; no live continuous state. P21/P22 text-only.
- cleanup kills optional overlay tween and restores overlay attrs; reduced motion skips travel.
- findings: source/coverage/learning/runtime-display/static access PASS by self-review; root route and full TypeScript/Vite/Storybook integration PASS; browser keyboard/focus, reduced-motion, small viewport and real control action DEFERRED → PASS.
- releaseDecision: PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 Batch B 재감사

- `MPC-OC-20260813` | PASS | 현재 공식 `convertCoordinates()`, `getAlignMatrix()`, `getGlobalMatrix()`, `getRelativePosition()` 문서와 대조 | point/matrix 반환과 Element/window 타입 경계를 유지했다.
- `MPC-RDS-20260813` | BLOCK → PASS | serializer가 네 utility 뒤 실제 marker 좌표 적용과 조건부 overlay fade를 생략했다 | tween kill, 좌표 적용, reduced-motion에 따른 fade 실행/생략까지 표시했다.
- `MPC-WRITE-20260813` | BLOCK → PASS | learner-facing P21/P22 번호가 노출됐다 | MotionPath와 RawPath 개념명으로 바꿨다.
- `MPC-BROWSER-20260813` | DEFERRED | 키보드/포커스, reduced motion, 320/390px, 실제 matrix·point·overlay 결과 | 이번 배치에서는 브라우저를 조작하지 않았다.
- `MPC-STORYBOOK-20260813` | N/A | Storybook은 c309e13에서 의도적으로 삭제됨 | 실행하지 않았다.

currentReleaseDecision
  PASS — runtime/display와 문장 BLOCK을 해소했고 browser-only 4건은 DEFERRED다. 과거 빌드와 browser closure는 현재 근거가 아니다.

### 2026-08-13 Batch B 통합 검증

- `npx tsc --noEmit --pretty false` exit 0.
- Batch B 21 page dir + handoff 범위 `git diff --check` exit 0.

### 2026-08-13 최종 교차검토

- `MPC-RDS-20260813-02 | BLOCK → PASS` — serializer에 세 SVG element의 실제 selector와 null guard, plugin 등록, reveal Tween 보관, calculate와 별도 cleanup을 포함했다. reduced-motion은 marker를 즉시 표시하고 cleanup은 baseline attribute를 복원하도록 runtime과 함께 재검증했다.
- Storybook: `N/A` — c309e13에서 의도적으로 삭제되어 실행하지 않았다.
- Browser: `DEFERRED` — 키보드·focus, reduced-motion, 320/390px, 실제 matrix·point·overlay 결과를 실조작하지 않았다.
- overallDecision: `NOT VERIFIED` — 정적 BLOCK은 없지만 Browser 실조작이 `DEFERRED`다.
- releaseDecision: `NOT VERIFIED` — 브라우저 관점을 현재 증거로 확인하지 않았다.
