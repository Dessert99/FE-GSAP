# P39 ScrollToPlugin handoff

## 입력 계약

- objective: local scroll container에서 descriptor가 target/config/tween/code를 함께 구동하고 global config는 복원한다.
- officialPage: ScrollToPlugin #158 `https://gsap.com/docs/v3/Plugins/ScrollToPlugin/` and `ScrollToPlugin.config()` #159 `https://gsap.com/docs/v3/Plugins/ScrollToPlugin/config()/`; reviewedAt 2026-08-09; category Scroll; slug scroll-to.
- localPage: `src/content/gsap/scroll/scroll-to/`; route `/fundamentals/scroll-to`.
- sourceBlockers: none.
- moduleSelection: PL, PC, CM.
- learnerFlow: local element vs window → x/y destination forms → autoKill interruption → config snapshot/restore.
- relatedPages: P38 ScrollSmoother command boundary; no smoother is created here.

## Source manifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| STO-158 | ScrollToPlugin tweens window/element x/y with number, element, string, `max`, offsets and per-tween autoKill. | #158 rendered/raw; installed `ScrollToPlugin.js` and types | verified |
| STO-159 | `ScrollToPlugin.config()` globally changes `autoKill` and `autoKillThreshold`. | #159 rendered/raw; installed `ScrollToPlugin.js` and types | verified |

## Coverage map

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| STO-158 | `LocalScrollLab.tsx` + `useLocalScrollRuntime.ts` local y/max/offset/autoKill tween and boundary copy | covered |
| STO-159 | `useLocalScrollRuntime.ts` config snapshot/restore; `ScrollToPage.tsx` restoration section | covered |

## 구현 계약

- exactFiles.create: page/meta/catalog, LocalScrollLab TSX/CSS/runtime, page CSS.
- exactFiles.modify: none.
- exampleContracts: LocalScrollLab; goal move one local container; question when does a tween yield to user scroll; representation one descriptor; controls max button; runtimeSource `examples/LocalScrollLab/useLocalScrollRuntime.ts`; runtimeOwnership local tween and temporary config; displayOwnership LocalScrollLab; accessibility labelled button, focusable local viewport, discrete status; motion reduced preference uses immediate native local `scrollTop`.
- nonGoals: no window scroll target, route mutation, global config retained after unmount, or fake tween.
- preserve: focus remains on invoking button and cleanup kills only owned tween.

## 검증 계약

- verifiedPerspectives: Official Coverage PASS; Learning Transformation PASS; Runtime/Display Sync PASS; Pedagogy PASS; Structure/Comment PASS; Accessibility/Motion PASS; Cross-page Consistency PASS; Build/Integration PASS.
- findings: F01 PASS exact 2 catalog/manifest/coverage IDs; F02 PASS descriptor drives config/tween/status/code, including a native reduced-motion serializer; F03 PASS local element only and focus preserved; F04 PASS config key presence/value snapshot restoration plus owned tween cleanup; F05 PASS route and full TypeScript/Vite/Storybook integration; B01–B04 DEFERRED → PASS browser keyboard, reduced motion, small layout, live autoKill.
- verificationEvidence: report records scoped TypeScript, formatter, two-row audit and diff output.
- releaseDecision: PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 재감사

- officialSourceCheck: ScrollToPlugin과 `config()` 공식 문서를 다시 대조했다. window/element target, x/y·max·offset, per-tween autoKill/onAutoKill과 global autoKill을 확인했다. autoKillThreshold는 설치 source의 config 경계로 분리했다.
- findings:
  - STO-A01 `BLOCK → ADDRESSED` — 명시적인 `ScrollToPlugin.config()` 변경 전에 global config를 snapshot하도록 순서를 분명히 해 예제 진입 시점의 값을 복원하게 했다.
  - STO-A02 `BLOCK → ADDRESSED` — autoKillThreshold까지 공식 config 계약인 것처럼 보이던 설명을 공식 autoKill과 설치 source 경계로 분리했다.
  - STO-A03 `BLOCK → ADDRESSED` — 학습 화면의 sourcePath와 owner/lesson 제작 표현을 제거하고 표시 코드에 실제 plugin 등록을 추가했다.
  - STO-A04 `PASS` — 하나의 descriptor가 local target의 max·offsetY·duration·autoKill을 구동하고, 표시 setup은 target guard·plugin 등록·tween과 global config cleanup을 runtime과 같은 순서로 보인다.
  - STO-A05 `DEFERRED` — 실제 local tween·autoKill·config 복원, keyboard, reduced-motion, 좁은 viewport 확인은 사용자 승인에 따라 수행하지 않았다.
  - STO-A06 `N/A` — Storybook은 `c309e13`에서 의도적으로 제거되어 검증 대상이 아니다.
- batchStaticVerification: `PASS` — `npx tsc --noEmit --pretty false`와 대상 범위 `git diff --check`가 exit 0이다.
- overallDecision: `NOT VERIFIED`
- releaseDecision: `NOT VERIFIED` — 정적 BLOCK은 해소했지만 브라우저 관점은 `DEFERRED`다.
