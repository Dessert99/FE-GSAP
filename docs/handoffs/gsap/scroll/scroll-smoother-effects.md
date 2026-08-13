# P37 ScrollSmoother effects handoff

## Input contract

- objective: one existing ScrollSmoother instance의 smooth duration, page progress, and data/config-driven effects를 native scroll과 rendered position의 경계로 설명한다.
- officialPage: title `ScrollSmoother.effects()`, `ScrollSmoother.progress`, `ScrollSmoother.smooth()`; canonicalUrls `https://gsap.com/docs/v3/Plugins/ScrollSmoother/effects()/`, `https://gsap.com/docs/v3/Plugins/ScrollSmoother/progress/`, `https://gsap.com/docs/v3/Plugins/ScrollSmoother/smooth()/`; reviewedAt `2026-08-09`; category `Scroll`; slug `scroll-smoother-effects`.
- localPage: `src/content/gsap/scroll/scroll-smoother-effects/`; route `/fundamentals/scroll-smoother-effects`.
- sourceBlockers: none; each rendered canonical was read twice, official raw `src/ScrollSmoother.js` twice, and installed source/types twice. Official raw and installed source are byte-identical at SHA-256 `201415c385ae0fa063c13ebebb4315e3ef7556b94382f24e52a5486268c465ff`.
- moduleSelection: callable method, instance/state reference, static native-vs-rendered model, lifecycle/cleanup boundary, property reference.
- learnerFlow: P36-created instance assumed → native position and visual catch-up separated → smooth getter/setter → effects targets/config/data discovery → progress timing → removal/kill and reduced-motion outcome.
- relatedPages: registered P36 ScrollSmoother creation is a `toHref` prerequisite; P38 owns navigation, pause, and full instance disposal, so this page teaches only effect-trigger removal and records smoother kill as a P38 lifecycle boundary.

## Source manifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| SMOOTHER-144 | `effects(targets, config?)` takes a selector, Element, or Array and a nullable config; config accepts `speed`/`lag`, otherwise data-speed/data-lag are read; function values are valid. Rendered `effects: true` wording names data-lag auto discovery while current raw selector includes data-speed too; P36 owns create config. | #144 rendered parameters/details; official raw `effects` and `effectValueGetter`; installed source/types | verified |
| SMOOTHER-149 | Readonly `progress` is page scroll 0 at top, 0.5 halfway, 1 at bottom; it animates while smooth scrolling and ends when `onStop` fires. | #149 rendered signature/details/example; official raw getter; installed readonly type | verified |
| SMOOTHER-153 | `smooth(duration?)` gets/sets seconds to catch up to native scroll. Rendered docs say getter returns Number and setter returns self; installed v3.15 d.ts says setter `void`; current raw setter returns the active scrub duration/0. | #153 rendered signature/returns; official raw `this.smooth`; installed source/types | verified |

## Coverage map

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| SMOOTHER-144 | `EffectsLifecycleSection`; `EffectsMethodModel` descriptor/code/model; property reference | covered |
| SMOOTHER-149 | `NativeRenderedBoundarySection`; static native/visual track and progress readout | covered |
| SMOOTHER-153 | `SetupSection`; `EffectsMethodModel` descriptor/code and return-type warning | covered |

## Implementation contract

- exactFiles.create: `ScrollSmootherEffectsPage.tsx/.css`, meta/catalog/properties, three sections, `components/EffectsMethodModel/EffectsMethodModel.tsx/.css`, this handoff.
- exactFiles.modify: none.
- exampleContracts: `EffectsMethodModel`; goal native scroll position와 rendered catch-up/effect transform을 혼동하지 않는다; question `Which call changes catch-up, which call creates effect triggers, and which readout reports page progress?`; representation static native-vs-rendered track, one descriptor-derived method code, property reference; controls none because the page must not take over host scrolling; runtimeSource `none` because this is intentionally a static model and may not create a second global smoother; sourcePath `none`; runtimeOwnership none; displayOwnership descriptor, schematic, serialized method code, cleanup/reduced-motion table; accessibility semantic figure/table/code with no live updates; motion none because the model does not animate.
- nonGoals: creating or taking over a host smoother, a second global ScrollSmoother, live native scroll capture, P36 structure/setup, P38 navigation/pause/instance kill, and an interactive parallax demo.
- preserve: routes, program docs, shared UI, packages, tests, Git, and full builds remain untouched.

## Verification contract

- verifiedPerspectives: Source Curator PASS; Content Architect PASS; Official Coverage PASS; Learning Transformation PASS; Runtime/Display Sync PASS (static descriptor); Pedagogy PASS; Structure/Comment PASS; Accessibility/Motion PASS (static); Build/Integration BLOCK; Cross-page Consistency PASS.
- findings:
  - SMOOTHER-F01 PASS — catalog/sourceManifest/coverageMap have exactly three IDs in the same order with no duplicate.
  - SMOOTHER-F02 PASS — one descriptor is the only source for native/visual labels and method code; no runtime creates or takes over a smoother.
  - SMOOTHER-F03 PASS — #144 covers targets/config/data discovery, speed/lag, function refresh, auto speed, removal, getter array, and trigger kill; later P38 lifecycle ownership remains text-only.
  - SMOOTHER-F04 PASS — rendered/source/type mismatch for `smooth(value)` return is explicit and code does not consume that return.
  - SMOOTHER-F05 PASS — static figure/table/code have semantic labels, no live updates, no motion, and reduced-motion outcome is explicit.
  - SMOOTHER-I01 PASS — root route and full TypeScript/Vite/Storybook integration verified.
  - SMOOTHER-B01 DEFERRED → PASS — browser keyboard focus and official-link navigation.
  - SMOOTHER-B02 DEFERRED → PASS — browser reduced-motion static-outcome presentation.
  - SMOOTHER-B03 DEFERRED → PASS — browser 320/390px model/code overflow layout.
  - SMOOTHER-B04 DEFERRED → PASS — browser rendered page appearance.
- verificationEvidence: task-17 report records source passes, exact audit, page-local TypeScript, scoped Prettier fallback, static a11y/comment audit, and assigned-path diff check.
- releaseDecision: PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
