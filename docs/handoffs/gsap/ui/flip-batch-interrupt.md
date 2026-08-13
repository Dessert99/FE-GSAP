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

## 2026-08-13 Batch B 재감사

- `FLIPBI-OC-20260813` | PASS | 현재 공식 `Flip.batch()`·`Flip.isFlipping()`·`Flip.killFlipsOf()` 문서와 대조 | 세 단계 batch 순서와 target 단위 중단 경계를 유지했다.
- `FLIPBI-RDS-20260813` | BLOCK → PASS | 코드 패널의 `cards`가 문자열 배열처럼 보였고 runtime `setState()`의 affected element 반환을 생략했다 | 실제 NodeList query와 `Array.from(cardsEl.children)` 반환까지 표시했다.
- `FLIPBI-WRITE-20260813` | BLOCK → PASS | 학습 본문에 내부 페이지 번호와 “text-only” 제작 상태가 노출됐다 | 개념명과 학습 선행 관계로 바꿨다.
- `FLIPBI-BROWSER-20260813` | DEFERRED | 키보드/포커스, reduced motion, 320/390px, batch 중단 결과 | 이번 배치에서는 브라우저를 조작하지 않았다.
- `FLIPBI-STORYBOOK-20260813` | N/A | Storybook은 c309e13에서 의도적으로 삭제됨 | 실행하지 않았다.

currentReleaseDecision
  PASS — 정적 BLOCK 2건을 해소했고 browser-only 4건은 DEFERRED다. 과거 빌드와 browser closure는 현재 근거가 아니다.

### 2026-08-13 self cross-review

- `FLIPBI-RDS-20260813-02 | BLOCK → PASS` — serializer의 `cardsEl`이 정의되지 않았고 batch/Flip/class cleanup을 표시하지 않았다. actual container query와 NodeList active 확인, 별도 cleanup을 포함한 뒤 재독해 PASS.
- 통합 검증: `npx tsc --noEmit --pretty false` exit 0, Batch B 21 page dir + handoff 범위 `git diff --check` exit 0.

### 2026-08-13 최종 교차검토 판정

- Storybook: `N/A` — c309e13에서 의도적으로 삭제되어 실행하지 않았다.
- Browser: `DEFERRED` — 승인된 브라우저 실조작 관점을 수행하지 않았다.
- overallDecision: `NOT VERIFIED` — 정적 BLOCK은 없지만 Browser 실조작이 `DEFERRED`다.
- releaseDecision: `NOT VERIFIED` — 브라우저 관점을 현재 증거로 확인하지 않았다.
