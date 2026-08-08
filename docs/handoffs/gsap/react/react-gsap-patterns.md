# P35 React GSAP patterns handoff

## Input contract

- objective: component마다 unique ref/runtime resource를 소유하고, late event의 GSAP work는 `contextSafe`로 Context cleanup에 연결한다.
- officialPage: #219 `React & GSAP — Advanced Techniques`, `https://gsap.com/resources/react-advanced/`; #220 `React & GSAP — Useful Patterns`, `https://gsap.com/resources/react-basics/`; reviewedAt `2026-08-09`; category `React`; slug `react-gsap-patterns`.
- localPage: `src/content/gsap/react/react-gsap-patterns/`; route `/fundamentals/react-gsap-patterns`.
- sourceBlockers: none; #219/#220 rendered resources twice, official `greensock/react` source/types and installed `@gsap/react` source/types twice compared.
- moduleSelection: React integration patterns, component resource organization, Context-safe event lifecycle, composition boundary.
- learnerFlow: resource-unique scope → stable list deps/revert → late event/contextSafe → reusable logic/imperative boundary.
- relatedPages: registered core React `/fundamentals/react-use-gsap` is linked with `toHref`; core hook installation/signature ownership remains there.

## Source manifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- |
| RGP-219 | Advanced patterns cover component communication via timeline prop or callback, Context distinction, reusable animation components/custom hooks, imperative GSAP control, exit/layout boundaries, and `contextSafe` for event-time work. | #219 rendered component communication/reusable/exit/custom hook sections; installed source/types | verified |
| RGP-220 | Useful patterns establish React component-local target refs, scoped GSAP work, dependency-aware cleanup and React/GSAP organization before advanced composition. | #220 rendered useful pattern sections; installed source/types | verified |

## Coverage map

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| RGP-219 | `OrganizationSection`, `BoundarySection`, `ContextSafeEventLab` runtime/serializer, core link boundary | covered |
| RGP-220 | `OrganizationSection`, `ScopedListRevealLab` runtime/serializer, stable dependencies/revert guidance | covered |

## Implementation contract

- exactFiles.create: page/meta/catalog/properties, `OrganizationSection`, `BoundarySection`, `ScopedListRevealLab.tsx/.css/useScopedListRevealAnimation.ts`, `ContextSafeEventLab.tsx/.css/useContextSafeEventAnimation.ts`, this handoff.
- exactFiles.modify: none.
- exampleContracts: ScopedListRevealLab; goal local scope owns local list resource; question component boundary가 selector/cleanup을 어떻게 제한하는가; representation semantic list; controls replay button; runtimeSource scoped hook; sourcePath same; runtimeOwnership `useGSAP`, selector tween and revert-on-update; displayOwnership list/code/config; accessibility semantic list/button; motion duration/stagger 0 immediate.
- exampleContracts: ContextSafeEventLab; goal late event tween joins Context cleanup; question click 뒤 생성된 tween을 왜 `contextSafe`로 감싸는가; representation stable target and discrete status; controls semantic button; runtimeSource event hook; sourcePath same; runtimeOwnership `useGSAP({scope})`, contextSafe, late `fromTo`; displayOwnership target/status/code; accessibility button and discrete `role=status`; motion duration 0 and no yoyo/repeat.
- nonGoals: core useGSAP install/register/signatures, global selector strategy, exit orchestration, FLIP layout shift, server component architecture.
- preserve: routes, program docs, shared UI, packages, tests, Git and full builds untouched.

## Verification contract

- verifiedPerspectives: Source Curator PASS; Content Architect PASS; Official Coverage PASS; Learning Transformation PASS; Runtime/Display Sync PASS; Pedagogy PASS; Structure/Comment PASS; Accessibility/Motion PASS; Cross-page Consistency PASS; Build/Integration BLOCK.
- findings:
  - RGP-F01 PASS — exact 2 catalog/sourceManifest/coverage IDs are `RGP-219`, `RGP-220`.
  - RGP-F02 PASS — scoped list descriptor feeds actual selector/config/code; stable dependencies plus `revertOnUpdate:true` clean the previous resource.
  - RGP-F03 PASS — late button handler is created by installed `contextSafe`; its actual `fromTo` tween joins the same scope Context.
  - RGP-F04 PASS — React owns semantic list/button/status structure; GSAP owns imperative presentation only; core API ownership is linked rather than duplicated.
  - RGP-F05 PASS — both runtime sources use shared reduced-motion preference and immediate/low-motion values.
  - RGP-F06 PASS — root route and full TypeScript/Vite/Storybook integration verified.
  - RGP-B01 DEFERRED — browser keyboard replay/pulse focus validation.
  - RGP-B02 DEFERRED — browser reduced-motion branches validation.
  - RGP-B03 DEFERRED — browser small viewport validation.
  - RGP-B04 DEFERRED — browser actual Context cleanup after navigation validation.
- verificationEvidence: #219/#220 rendered twice; official `greensock/react` source/types and installed package source/types twice; task-15 report records page-local TypeScript, formatter, ID and scoped diff checks.
- releaseDecision: PASS — root integration complete; RGP-B01–B04 are approved browser DEFERRED checks.
