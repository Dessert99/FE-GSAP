# P32 SplitText creation handoff

## Input contract

- objective: one semantic sentence을 `SplitText.create()`로 split하고 실제 wrapper DOM 및 chars/words/lines/masks instance arrays를 검사한다.
- officialPage: #206 `SplitText`, #207 `SplitText.chars`, #210 `SplitText.lines`, #211 `SplitText.masks`, #214 `SplitText.create()`, #215 `SplitText.vars`, #216 `SplitText.words`; reviewedAt `2026-08-08`; category `Text`; slug `split-text-create`.
- localPage: `src/content/gsap/text/split-text-create/`; route `/fundamentals/split-text-create`.
- sourceBlockers: none; seven rendered canonical pages each twice, official raw `src/SplitText.js`/`types/split-text.d.ts` twice, installed source/types twice compared.
- moduleSelection: plugin/class instance, property catalog, actual DOM inspector, accessibility/layout boundary.
- learnerFlow: create target+vars → wrapper DOM → instance arrays → mask/aria/autoSplit → fonts/layout measurement → revert cleanup.
- relatedPages: registered P31 `/fundamentals/scramble-text` is a `toHref` comparison link. P33 SplitText lifecycle is not registered and remains text-only.

## Source manifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- |
| STC-206 | SplitText splits target text into newly-created char/word/line elements. Constructor/create config includes `type`, classes, `mask`, `aria`, `autoSplit`; default type is chars/words/lines and only needed types should be split. `aria: auto` labels parent and hides generated children; `autoSplit` reverts/re-splits after fonts or lines+width change. | #206 rendered quick start/config/accessibility/responsive sections; raw/type | verified |
| STC-207 | `chars` is the instance array of newly-created character elements. | #207 rendered property reference; raw/type `chars: Element[]` | verified |
| STC-210 | `lines` is the instance array of newly-created line elements whose layout depends on measured lines. | #210 rendered property reference; raw/type `lines: Element[]` | verified |
| STC-211 | `masks` is the instance array of extra clipping wrapper elements created by one `mask` type. | #211 rendered property reference; #206 mask config; raw/type | verified |
| STC-214 | `SplitText.create(target, vars)` accepts Element/String/Array plus configuration and returns a standalone SplitText instance. | #214 rendered signature/return/example; raw/type static create | verified |
| STC-215 | `vars` exposes the configuration object used by the instance. | #215 rendered property reference; raw/type `SplitText.Vars` | verified |
| STC-216 | `words` is the instance array of newly-created word elements. | #216 rendered property reference; raw/type `words: Element[]` | verified |

## Coverage map

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| STC-206 | `CreateModelSection`; lab descriptor/create/onSplit; `AccessibleDomSection`; properties table | covered |
| STC-207 | lab actual `split.chars` count/tree; properties table | covered |
| STC-210 | lab actual `split.lines` count/tree; `AccessibleDomSection`; properties table | covered |
| STC-211 | lab actual `split.masks` count/tree and mask control; properties table | covered |
| STC-214 | `CreateModelSection`; lab actual `SplitText.create(sentence, vars)` and serializer | covered |
| STC-215 | lab descriptor as create vars and serializer; properties table | covered |
| STC-216 | lab actual `split.words` count/tree; properties table | covered |

## Implementation contract

- exactFiles.create: page/meta/catalog/properties, `CreateModelSection`, `AccessibleDomSection`, `SplitInspectorLab.tsx/.css/useSplitInspectorAnimation.ts`, this handoff.
- exactFiles.modify: none.
- exampleContracts: `SplitInspectorLab`; goal actual instance DOM/array inspection; question create 뒤 어떤 wrapper와 arrays가 생기는가; representation one sentence, count inspector and derived first-node tree; controls keyboard select mask and rebuild button; runtimeSource `examples/SplitInspectorLab/useSplitInspectorAnimation.ts`; sourcePath same; runtimeOwnership fonts ready wait, registration/create, `onSplit`, optional stagger, instance `revert`; displayOwnership descriptor serializer, controls, semantic heading and snapshot; accessibility actual `aria:auto` target plus non-live inspector; motion shared `useReducedMotion` keeps split but returns no stagger tween.
- nonGoals: P33 `isSplit`/`kill`/`revert`/manual `split` API teaching, rich nested-link accessibility duplication, text replacement, responsive design system.
- preserve: routes, program docs, shared UI, packages, tests, Git and full builds are untouched.

## Verification contract

- verifiedPerspectives: Source Curator PASS; Content Architect PASS; Official Coverage PASS; Learning Transformation PASS; Runtime/Display Sync PASS; Pedagogy PASS; Structure/Comment PASS; Accessibility/Motion PASS; Cross-page Consistency PASS; Build/Integration BLOCK.
- findings:
  - STC-F01 PASS — exact seven catalog/sourceManifest/coverage IDs match with no duplicate or missing row.
  - STC-F02 PASS — one descriptor drives `create()` vars, mask selector, actual DOM tree/count inspector and code serializer.
  - STC-F03 PASS — waits `document.fonts.ready`; `autoSplit:true` handles font/line-width reflow; cleanup calls instance `revert()` before clearing reference.
  - STC-F04 PASS — semantic heading uses actual `aria:auto`; generated DOM is inspected without a live region; nested semantic content is called out as a boundary.
  - STC-F05 PASS — reduced preference uses shared hook, preserves instance inspection and skips only the returned character stagger.
  - STC-F06 PASS — P31 uses `toHref`; P33 stays text-only.
  - STC-F07 PASS — root route and full TypeScript/Vite/Storybook integration verified.
  - STC-B01 DEFERRED → PASS — browser keyboard select/rebuild focus validation.
  - STC-B02 DEFERRED → PASS — browser fonts/reflow autoSplit validation.
  - STC-B03 DEFERRED → PASS — browser reduced-motion no-stagger validation.
  - STC-B04 DEFERRED → PASS — browser small viewport/generated DOM inspection validation.
- verificationEvidence: seven rendered canonicals twice each, raw/type and installed SplitText source/types twice each; task-12 report records page-local TypeScript, formatter, ID and scoped diff checks.
- releaseDecision: PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
