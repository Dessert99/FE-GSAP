# Observer lifecycle handoff

## 입력 계약

```text
objective
  P28에서 one owned Observer command descriptor로 disable, enable, isEnabled, kill과 explicit recreate를 안전하게 학습한다.
officialPage
  title: Observer / disable / enable / isEnabled / kill
  canonicalUrl: https://gsap.com/docs/v3/Plugins/Observer/disable()/ ; https://gsap.com/docs/v3/Plugins/Observer/enable()/ ; https://gsap.com/docs/v3/Plugins/Observer/isEnabled/ ; https://gsap.com/docs/v3/Plugins/Observer/kill()/
  reviewedAt: 2026-08-08
  category: UI
  slug: observer-lifecycle
localPage
  localPath: src/content/gsap/ui/observer-lifecycle/
  route: /fundamentals/observer-lifecycle
moduleSelection
  plugin/class instance, listener lifecycle, state read, permanent disposal
sourceManifest
  - id: OBSLIFE-01 | officialItem: disable(): void removes necessary event listeners and fires onDisable unless already disabled; permanent disposal should use kill | sourceLocation: #118 rendered lines 183-188; official raw Observer.js lines 377-399; installed Observer.js lines 377-399; observer.d.ts lines 74-82 | sourceStatus: verified
  - id: OBSLIFE-02 | officialItem: enable(event: Event): Self adds necessary event listeners and fires onEnable unless already enabled; optional event is immediately passed to onPress | sourceLocation: #119 rendered lines 183-195; official raw Observer.js lines 349-375; installed Observer.js lines 349-375; observer.d.ts lines 84-92 | sourceStatus: verified
  - id: OBSLIFE-03 | officialItem: isEnabled: Boolean indicates enabled state; enable and disable set it and disabled instances do not trigger callbacks | sourceLocation: #122 rendered lines 183-188; official raw Observer.js lines 350,366,378,398; installed Observer.js lines 350,366,378,398; observer.d.ts lines 11-18 | sourceStatus: verified
  - id: OBSLIFE-04 | officialItem: kill(): void calls disable, removes the instance from the internal Array, is permanent, and requires create rather than later enable | sourceLocation: #124 rendered lines 183-188; official raw Observer.js lines 401-406; installed Observer.js lines 401-406; observer.d.ts lines 94-102 | sourceStatus: verified
sourceBlockers
  none. The four rendered canonicals and official raw Observer.js were opened/reopened twice; installed Observer.js and observer.d.ts were compared twice. Installed d.ts agrees with rendered void/Self/Boolean methods and properties. The page does not infer any undocumented return for disable or kill.
learnerFlow
  1. one page-owned Observer begins enabled on a stable focusable pad.
  2. the command descriptor calls disable or enable and copies the actual isEnabled property into the display.
  3. kill removes the current instance so enable is unavailable instead of falsely reviving it.
  4. recreate disposes any current owned instance, creates a fresh instance, and unmount kills every owned instance.
coverageMap
  - sourceItemId: OBSLIFE-01 | localEvidence: useObserverLifecycleRuntime runCommand disable branch and lifecycle-lab changes | localStatus: covered
  - sourceItemId: OBSLIFE-02 | localEvidence: useObserverLifecycleRuntime runCommand enable branch; command-derived code panel; observerLifecycleProperties enable row | localStatus: covered
  - sourceItemId: OBSLIFE-03 | localEvidence: useObserverLifecycleRuntime observer.isEnabled reads and lifecycle-lab actual isEnabled display | localStatus: covered
  - sourceItemId: OBSLIFE-04 | localEvidence: useObserverLifecycleRuntime kill branch, null current boundary, recreate and owned cleanup; lifecycle-lab disabled enable control | localStatus: covered
relatedPages
  P25 Observer.create is a registered prerequisite link boundary. Advanced input and velocity APIs remain outside P28.
```

## 구현 계약

```text
exactFiles
  create: ObserverLifecyclePage TSX, meta/catalog/properties, ObserverLifecycleLab TSX/runtime, this handoff
  modify: none
exampleContracts
  name: ObserverLifecycleLab
  goal: one command descriptor supplies actual lifecycle calls, actual isEnabled state, UI availability and code.
  question: Which lifecycle method keeps an Observer reusable, and when is a new instance required?
  representation: native select/button, focusable input pad and discrete lifecycle readout.
  controls: select disable/enable/kill/recreate, then run command button.
  runtimeSource: examples/ObserverLifecycleLab/useObserverLifecycleRuntime.ts
  sourcePath: examples/ObserverLifecycleLab/useObserverLifecycleRuntime.ts
  runtimeOwnership: registers Observer, creates owned instances, calls official methods, reads isEnabled and kills every owned instance on unmount.
  displayOwnership: select/button/state/code/explanation only.
  accessibility: native select/button and focusable target; killed state disables enable choice.
  motion: no autonomous motion.
nonGoals
  global Observer cleanup, re-enabling killed instances, advanced gesture/velocity APIs and ScrollTrigger integration.
preserve
  routes, program docs, shared UI, global CSS, packages, tests and Git remain root-owned.
```

## 검증 계약

```text
verifiedPerspectives
  Official Coverage: PASS — four canonical items have item-level catalog/manifest/coverage mapping.
  Learning Transformation: PASS — enabled → disabled → enabled or permanent kill → recreate is visible.
  Runtime/Display Sync: PASS — one command descriptor determines actual method call, actual isEnabled read and code.
  Pedagogy: PASS — no killed instance is offered as re-enableable.
  Structure/Comment: PASS — page-local runtime/display with Korean learning comments.
  Accessibility/Motion: PASS (static) — native controls, focus target and no autonomous motion.
  Build/Integration: PASS — root route and full TypeScript/Vite/Storybook integration verified.
findings
  P28-OC-001 | PASS | exact 4 catalog/manifest/coverage audit | four explicit rows | none
  P28-RDS-001 | PASS | descriptor → method/isEnabled/code | no detached demo state | none
  P28-LIFE-001 | PASS (static) | current and every owned instance cleanup | killed instance cannot re-enable | browser lifecycle pending
  P28-INT-001 | PASS | root route/full TypeScript/Vite/Storybook integration | page chunk and route verified | none
  P28-B01 | DEFERRED | select/button keyboard focus and command controls | browser audit | owner
  P28-B02 | DEFERRED | no-autonomous-motion reduced-motion confirmation | browser audit | owner
  P28-B03 | DEFERRED | 320/390 lifecycle control layout | browser audit | owner
  P28-B04 | DEFERRED | listener removal/re-enable/kill/recreate actual behavior | browser audit | owner
verificationEvidence
  task-8-report.md records source comparison, page-local TypeScript, exact four-row audit, scoped Prettier and assigned-path diff.
releaseDecision
  PASS — root integration complete; P28-B01..B04 remain DEFERRED.
```
