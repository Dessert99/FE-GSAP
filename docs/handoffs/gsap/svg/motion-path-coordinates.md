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
- findings: source/coverage/learning/runtime-display/static access PASS by self-review; root route and full TypeScript/Vite/Storybook integration PASS; browser keyboard/focus, reduced-motion, small viewport and real control action DEFERRED.
- releaseDecision: PASS — root integration complete; browser checks remain DEFERRED.
