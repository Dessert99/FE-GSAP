# P42 ScrollTrigger motion handoff

## 입력 계약

- objective: scrub, batch, snap을 exclusive descriptor로 실제 ScrollTrigger runtime에 연결한다.
- officialPage: #166 `getTween()`, #167 `getVelocity()`, #180 `batch()`, #201 `snapDirectional()`; reviewedAt 2026-08-09; slug scroll-trigger-motion.
- localPage: `src/content/gsap/scroll/scroll-trigger-motion/`; route `/fundamentals/scroll-trigger-motion`.
- sourceBlockers: none.
- moduleSelection: CM, PC.
- learnerFlow: velocity/tween query → exclusive mode → batch interval/max → directional snap → cleanup.
- relatedPages: registered P40/P41 prerequisites are linked with `toHref`.

## Source manifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| STM-166 | `getTween()` reads scrub or snap tween. | #166 rendered/raw; installed source/types | verified |
| STM-167 | `getVelocity()` reads signed scroll velocity. | #167 rendered/raw; installed source/types | verified |
| STM-180 | `batch()` groups callbacks with interval/batchMax. | #180 rendered/raw; installed source/types | verified |
| STM-201 | `snapDirectional()` returns direction-aware snap function. | #201 rendered/raw; installed source/types | verified |

## Coverage map

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| STM-166 | page header and scrub runtime | covered |
| STM-167 | page header | covered |
| STM-180 | batch descriptor/runtime/code | covered |
| STM-201 | snap descriptor/runtime/code | covered |

## 구현 계약

- exactFiles.create: page/CSS/meta, catalog, MotionModeLab TSX/CSS/runtime.
- exactFiles.modify: none.
- exampleContracts: MotionModeLab; one discriminated descriptor; runtimeSource `useMotionModeRuntime.ts`; owned trigger/scrub/batch cleanup; select control; reduced motion reveal only with scrub/snap absent.
- nonGoals: no P40/P41 link/runtime and no shared trigger ownership.
- preserve: focusable select and discrete status.

## 검증 계약

- verifiedPerspectives: coverage PASS; learning PASS; runtime/display PASS; structure/comment PASS; accessibility/motion PASS; Build/Integration PASS.
- findings: F01 PASS 4/4 catalog-manifest-coverage; F02 PASS exclusive descriptor drives scoped code/runtime and executes both `getTween()`/`getVelocity()` reads; F03 PASS reduced-motion code/runtime reveal only and cleanup kills owned trigger/tween/batch work; F04 PASS root route/full integration; B01–B04 DEFERRED browser.
- verificationEvidence: report records scoped TS/Prettier/audit/diff.
- releaseDecision: PASS — root integration completed; B01–B04 DEFERRED.
