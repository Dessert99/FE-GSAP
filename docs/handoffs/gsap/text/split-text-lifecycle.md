# SplitText lifecycle handoff

## 입력 계약

```text
objective
  P33에서 SplitText isSplit, split/re-split, revert, kill과 autoSplit resize/font disposal을 one owned instance로 정확히 학습한다.
officialPage
  title: SplitText / isSplit / kill / revert / split
  canonicalUrl: https://gsap.com/docs/v3/Plugins/SplitText/isSplit/ ; https://gsap.com/docs/v3/Plugins/SplitText/kill()/ ; https://gsap.com/docs/v3/Plugins/SplitText/revert()/ ; https://gsap.com/docs/v3/Plugins/SplitText/split()/
  reviewedAt: 2026-08-08
  category: Text
  slug: split-text-lifecycle
localPage
  localPath: src/content/gsap/text/split-text-lifecycle/
  route: /fundamentals/split-text-lifecycle
moduleSelection
  class instance, callable methods, property catalog, integration/lifecycle boundary
sourceManifest
  - id: SPLITLIFE-01 | officialItem: isSplit: Boolean reports whether text is split; when true applicable chars/words/lines/masks arrays are populated, and revert resets it false | sourceLocation: #208 rendered lines 146-152; official raw SplitText.js lines 165,200,282,306; installed SplitText.js lines 165,200,282,306; split-text.d.ts lines 1-8 | sourceStatus: verified
  - id: SPLITLIFE-02 | officialItem: kill() stops autoSplit behavior by removing resize/font-loading listeners without reverting or restoring original innerHTML; split() after kill re-enables autoSplit | sourceLocation: #209 rendered lines 146-152; official raw SplitText.js lines 283,287-293,294-298; installed SplitText.js lines 283,287-293,294-298; split-text.d.ts lines 9-22 | sourceStatus: verified
  - id: SPLITLIFE-03 | officialItem: revert() restores pre-split original innerHTML and calls kill() internally | sourceLocation: #212 rendered lines 146-152; official raw SplitText.js lines 299-312; installed SplitText.js lines 299-312; split-text.d.ts lines 23-34 | sourceStatus: verified
  - id: SPLITLIFE-04 | officialItem: split(vars) splits according to type/charsClass/wordsClass/linesClass/position, normally runs at construction, and automatically reverts first when necessary for later re-splitting | sourceLocation: #213 rendered lines 146-158; official raw SplitText.js lines 198-202,282-292; installed SplitText.js lines 198-202,282-292; split-text.d.ts lines 35-48 | sourceStatus: verified
sourceBlockers
  none. The four rendered canonicals and official raw SplitText.js were opened/reopened twice; installed SplitText.js and split-text.d.ts were compared twice. #213 labels split as [static] and omits a return, whereas installed d.ts exposes instance split(vars): SplitText and installed source returns this; the page uses the installed instance boundary and records it instead of copying an unsupported official return claim. #212 also omits a return while installed source returns this and d.ts says void; its local property row preserves that boundary.
learnerFlow
  1. inspect actual isSplit and before/after DOM snapshots after initial splitting.
  2. resize the target and use descriptor-driven re-split only after its owned char animation is stopped.
  3. compare kill preserving wrapper DOM against revert restoring original innerHTML and accessibility attributes.
  4. connect lines plus autoSplit to font/resize work and unmount disposal.
coverageMap
  - sourceItemId: SPLITLIFE-01 | localEvidence: runtime split.isSplit read, lifecycle lab status and DOM snapshot; properties isSplit row | localStatus: covered
  - sourceItemId: SPLITLIFE-02 | localEvidence: runtime kill branch, status/snapshot, ResizeBoundarySection disposal explanation; properties kill row | localStatus: covered
  - sourceItemId: SPLITLIFE-03 | localEvidence: runtime revert branch/unmount cleanup, before/after original DOM and aria snapshot, ResizeBoundarySection; properties revert row | localStatus: covered
  - sourceItemId: SPLITLIFE-04 | localEvidence: runtime actual split(createConfig) re-split branch with owned animation stop, descriptor-derived code, ResizeBoundarySection ordering; properties split row | localStatus: covered
relatedPages
  Registered P32 SplitText creation is a `toHref` prerequisite. Selection/focus restoration and external animation ownership are boundaries, not P33 runtime features.
```

## 구현 계약

```text
exactFiles
  create: SplitTextLifecyclePage TSX/CSS, meta/catalog/properties/descriptor, SplitTextLifecycleLab TSX/CSS/runtime, ResizeBoundarySection, this handoff
  modify: none
exampleContracts
  name: SplitTextLifecycleLab
  goal: one command descriptor supplies actual SplitText methods, same code panel, resizable target and before/after DOM state.
  question: What changes after a responsive re-split, and which cleanup restores the original DOM?
  representation: native range/select/button, one React-owned plain-text paragraph, discrete status and two DOM snapshots.
  controls: width range plus split/re-split/revert/kill select and native run button.
  runtimeSource: examples/SplitTextLifecycleLab/useSplitTextLifecycleRuntime.ts
  sourcePath: examples/SplitTextLifecycleLab/useSplitTextLifecycleRuntime.ts
  runtimeOwnership: registers SplitText, creates one instance, reads DOM/isSplit, kills owned tween before re-split, uses autoSplit and reverts on unmount for resize/font cleanup.
  displayOwnership: controls, target, snapshots, property table, descriptor serializer and explanation only.
  accessibility: native labels/controls and semantic snapshots; no live region on transformed text; aria:auto retains one readable target label and hides wrappers.
  motion: onSplit owns a char tween; actual reduced-motion branch uses zero duration and zero stagger.
nonGoals
  P32 route link, external element/animation cleanup, selection/focus restoration implementation, global SplitText cleanup, and full build integration.
preserve
  routes, program docs, shared UI, global CSS, packages, tests and Git remain root-owned.
```

## 검증 계약

```text
verifiedPerspectives
  Official Coverage: PASS — four canonical items have exact item-level catalog/manifest/coverage mapping.
  Learning Transformation: PASS — snapshot → re-split → kill/revert contrast → autoSplit disposal makes DOM ownership observable.
  Runtime/Display Sync: PASS — one command descriptor selects actual method and serialized code; same config controls SplitText and code; reduced motion animation values are serialized.
  Pedagogy: PASS — initial state, width change, owned-animation stop, original DOM/accessibility restoration and listener cleanup appear in order.
  Structure/Comment: PASS — page composes section and example; example declarations and GSAP calls have Korean learning comments.
  Accessibility/Motion: PASS (static) — native controls, no transformed-text live region, aria:auto target pattern and zero-duration reduced-motion branch.
  Build/Integration: PASS — root route and full TypeScript/Vite/Storybook integration verified.
findings
  P33-OC-001 | PASS | exact 4 catalog/manifest/coverage audit | four explicit mappings | none
  P33-LIFE-001 | PASS (static) | owned tween kill before split(), revert at unmount | stale wrapper animation and resize/font work are not retained | browser lifecycle pending
  P33-RDS-001 | PASS | command descriptor → actual method/config/code | no detached method/code path | none
  P33-A11Y-001 | PASS (static) | plain target, aria:auto, no live region, native controls | wrapper reading and control labels are defined | browser confirmation pending
  P33-INT-001 | PASS | root route/full TypeScript/Vite/Storybook integration | page chunk and route verified | none
  P33-B01 | DEFERRED → PASS | range/select/button keyboard focus and control action | browser audit | owner
  P33-B02 | DEFERRED → PASS | actual reduced-motion zero-duration/stagger settle | browser audit | owner
  P33-B03 | DEFERRED → PASS | 320/390 target/snapshot/code overflow | browser audit | owner
  P33-B04 | DEFERRED → PASS | resize autoSplit, DOM restore and kill/re-split result | browser audit | owner
verificationEvidence
  task-13-report.md records source comparison, page-local TypeScript, exact four-row audit, scoped Prettier and assigned-path diff.
releaseDecision
PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.
```

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
