# P13 Flip batch/interruption handoff

## objective

Stable React-owned card의 concurrent layout action을 `Flip.batch()`로 조율하고 `isFlipping`/`killFlipsOf`로 target-scoped interruption을 가르친다.

## officialPage

title: Flip batch/interruption; canonicalUrl: #68 `static.batch()`, #72 `static.isFlipping()`, #73 `static.killFlipsOf()`; reviewedAt: 2026-08-08; category: UI; slug: `flip-batch-interrupt`.

## localPage

localPath: `src/content/gsap/ui/flip-batch-interrupt/`; route: `/fundamentals/flip-batch-interrupt`.

## sourceManifest

| id | officialItem | sourceStatus |
| --- | --- | --- |
| FLIPBI-68-01 | batch id reuse/create and kill unregister | verified |
| FLIPBI-68-02 | all getState → setState → animate ordering | verified |
| FLIPBI-68-03 | action hooks/loadState/once lifecycle | verified |
| FLIPBI-68-04 | batch/action kill cleanup | verified |
| FLIPBI-72-01 | target scoped Boolean active query | verified |
| FLIPBI-73-01 | target scoped immediate kill and complete policy | verified |
| FLIPBI-IMPL-01 | installed batch conflict ordering and lookup cleanup | verified-installed |

## sourceBlockers

None. All rendered canonicals and official raw/installed Flip source/type were compared twice.

## moduleSelection

concept/guide + callable methods + one three-card BatchInterruptLab.

## learnerFlow

single flip race → batch phases → active query → kill policy → cleanup.

## coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| FLIPBI-68-01 | `BatchPhasesSection`, lab descriptor | covered |
| FLIPBI-68-02 | `BatchPhasesSection`, lab phase status | covered |
| FLIPBI-68-03 | `BatchPhasesSection` lifecycle explanation | covered |
| FLIPBI-68-04 | `CleanupSection`, runtime batch.kill | covered |
| FLIPBI-72-01 | `ActiveQuerySection`, runtime target scope | covered |
| FLIPBI-73-01 | `KillPolicySection`, runtime killFlipsOf | covered |
| FLIPBI-IMPL-01 | runtime cleanup and `CleanupSection` | covered |

## relatedPages

P11 `/fundamentals/flip-first-last`, P12 `/fundamentals/flip-fit-absolute`; P14+ text-only.

## exactFiles

create: page/meta/catalog/properties/components/five sections/examples under P13 path and this handoff. modify: none.

## exampleContracts

name: BatchInterruptLab; controls: batch button; runtimeSource: `useBatchInterruptAnimation.ts`; runtime ownership: `getState` captures stable cards, `setState` toggles the scoped reversed class, `animate` calls `Flip.from`, then active cards are queried and conditionally killed before `batch.run()`; display ownership: fixed alpha/beta/gamma cards, discrete order/status, descriptor-derived code; accessibility: native buttons/focus-stable keys/`role=status` only for the discrete action result/no per-frame live updates; motion: shared `useReducedMotion()` selects duration 0 and the final class order.

## findings

- Official Coverage PASS: 6 official + 1 installed items, all covered.
- Runtime/Display Sync PASS: code serializes the descriptor and actual batch/isFlipping/conditional-kill policy; fixed React keys never reorder.
- Static Accessibility/Motion PASS: the browser media preference is display-only, `role=status` announces one action result, and duration 0 applies the final class order.
- Learning Transformation PASS; Pedagogy PASS; Structure/Comment PASS; Cross-page PASS.
- Build/Integration PASS: root route, TypeScript, Vite 995 modules and Storybook 1133 modules passed with page chunks emitted.
- B01-B04 DEFERRED → PASS: keyboard/focus, reduced motion, small screen, real lab operation.

## verificationEvidence

Rendered/raw two passes; installed `Flip.js`/`flip.d.ts`; 2026-08-08 fix round: isolated whole-page TypeScript exit 0, catalog/sourceManifest/coverage exact-ID audit 7/7/7 exit 0, scoped Prettier exit 0, and `git diff --check` for assigned paths exit 0. Root reran TypeScript, Vite, Storybook and diff checks after route registration.

## releaseDecision

PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
