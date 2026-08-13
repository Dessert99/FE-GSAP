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
  - RGP-B01 DEFERRED → PASS — browser keyboard replay/pulse focus validation.
  - RGP-B02 DEFERRED → PASS — browser reduced-motion branches validation.
  - RGP-B03 DEFERRED → PASS — browser small viewport validation.
  - RGP-B04 DEFERRED → PASS — browser actual Context cleanup after navigation validation.
- verificationEvidence: #219/#220 rendered twice; official `greensock/react` source/types and installed package source/types twice; task-15 report records page-local TypeScript, formatter, ID and scoped diff checks.
- releaseDecision: PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 재감사

- officialSourceCheck: GSAP의 React advanced/useful pattern 자료와 `gsap.context()`의 scope·late event 등록 설명을 다시 대조했다. component-local selector와 `contextSafe`가 늦게 만들어진 tween을 같은 Context에 기록하는 경계를 확인했다.
- findings:
  - RGP-A01 `BLOCK → ADDRESSED` — 두 표시 코드를 component 함수 안의 Hooks와 완전한 JSX로 구성해 scope·target ref, list selector, event handler가 실제 DOM에 연결되게 했다.
  - RGP-A02 `BLOCK → ADDRESSED` — 학습 화면의 coverage 개수와 `own/component-owned/existing` 제작 표현을 실제 동작 문장으로 바꿨다.
  - RGP-A03 `PASS` — list selector·duration·stagger와 late-event scale·duration·yoyo·repeat가 각각 runtime과 표시 코드에서 일치한다.
  - RGP-A04 `DEFERRED` — 실제 scope 격리·navigation cleanup, keyboard controls, reduced-motion, 작은 viewport 확인은 사용자 승인에 따라 수행하지 않았다.
  - RGP-A05 `N/A` — Storybook은 `c309e13`에서 의도적으로 제거되어 검증 대상이 아니다.
- batchStaticVerification: `PASS` — `npx tsc --noEmit --pretty false`와 대상 범위 `git diff --check`가 exit 0이다.
- overallDecision: `NOT VERIFIED`
- releaseDecision: `NOT VERIFIED` — 정적 BLOCK은 해소했지만 브라우저 관점은 `DEFERRED`다.

### 2026-08-13 최종 교차검토 수정

- `RGP-RDS-20260813-02 | BLOCK → PASS` — 두 표시 component가 runtime의 공용 `useReducedMotion()` 대신 직접 `matchMedia`를 읽었고, ContextSafe 예제는 실제 count state와 status 출력을 생략했다. 두 snippet을 공용 hook 호출로 맞추고 ContextSafe에 `count`/`setCount`, callback 증가, `role="status"` 출력을 함께 반영했다.
- 재검증: 두 component의 Hooks 위치·JSX ref·reduced-motion config·count/status 흐름을 정적 재독했고, `npx tsc --noEmit --pretty false`와 Batch C 범위 `git diff --check`는 exit 0이다.
- Browser: `DEFERRED`, Storybook: `N/A`; overall/releaseDecision은 `NOT VERIFIED`를 유지한다.
