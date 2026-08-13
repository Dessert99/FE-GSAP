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
- findings: F01 PASS 4/4 catalog-manifest-coverage; F02 PASS exclusive descriptor drives scoped code/runtime and executes both `getTween()`/`getVelocity()` reads; F03 PASS reduced-motion code/runtime reveal only and cleanup kills owned trigger/tween/batch work; F04 PASS root route/full integration; B01–B04 DEFERRED → PASS browser.
- verificationEvidence: report records scoped TS/Prettier/audit/diff.
- releaseDecision: PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 재감사

- officialSourceCheck: ScrollTrigger `getTween()`, `getVelocity()`, `batch()`, `snapDirectional()` 공식 문서를 다시 대조했다. scrub/snap tween 구분, px/s velocity, interval·batchMax callback과 방향성 snap을 확인했다.
- findings:
  - STM-A01 `BLOCK → ADDRESSED` — snap과 batch가 host page scroll을 사용하던 runtime을 focusable local scroller로 한정해 페이지 전체 snap/trigger 간섭을 제거했다.
  - STM-A02 `BLOCK → ADDRESSED` — 표시 코드에서 빠졌던 scrub trigger/scroller와 batch onEnter callback을 실제 runtime과 같게 추가했다.
  - STM-A03 `BLOCK → ADDRESSED` — 학습 화면의 sourcePath·coverage·P번호 제작 메타를 제거했다.
  - STM-A04 `PASS` — mode descriptor가 scrub·batch·snap 중 하나만 만들고 표시 setup은 local guard·plugin 등록·Context revert와 batch trigger/tween cleanup을 포함하며 reduced-motion은 trigger 없이 final reveal만 실행한다.
  - STM-A05 `DEFERRED` — local scrub/batch/snap, keyboard scroll, cleanup, reduced-motion, 좁은 viewport 확인은 사용자 승인에 따라 수행하지 않았다.
  - STM-A06 `N/A` — Storybook은 `c309e13`에서 의도적으로 제거되어 검증 대상이 아니다.
- batchStaticVerification: `PASS` — `npx tsc --noEmit --pretty false`와 대상 범위 `git diff --check`가 exit 0이다.
- overallDecision: `NOT VERIFIED`
- releaseDecision: `NOT VERIFIED` — 정적 BLOCK은 해소했지만 브라우저 관점은 `DEFERRED`다.
