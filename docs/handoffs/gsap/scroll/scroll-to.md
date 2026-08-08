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
- findings: F01 PASS exact 2 catalog/manifest/coverage IDs; F02 PASS descriptor drives config/tween/status/code, including a native reduced-motion serializer; F03 PASS local element only and focus preserved; F04 PASS config key presence/value snapshot restoration plus owned tween cleanup; F05 PASS route and full TypeScript/Vite/Storybook integration; B01–B04 DEFERRED browser keyboard, reduced motion, small layout, live autoKill.
- verificationEvidence: report records scoped TypeScript, formatter, two-row audit and diff output.
- releaseDecision: PASS — root integration completed; B01–B04 are approved browser DEFERRED.
