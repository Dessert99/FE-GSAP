# P29 Physics motion handoff

## Input contract

- objective: `physics2D` launch vector와 `physicsProps` per-property config를 한 target에서 exclusive mode로 비교한다.
- officialPage: #137 `Physics2D`, `https://gsap.com/docs/v3/Plugins/Physics2DPlugin/`; #138 `PhysicsProps`, `https://gsap.com/docs/v3/Plugins/PhysicsPropsPlugin/`; reviewedAt `2026-08-08`; category `Other`; slug `physics-motion`.
- localPage: `src/content/gsap/other/physics-motion/`; route `/fundamentals/physics-motion`.
- sourceBlockers: none; #137/#138 rendered canonical을 각각 두 번, official raw source/types와 installed source/types를 각각 두 번 대조했다.
- moduleSelection: plugin/property catalog, discriminated input model, actual physics tween lab, boundary warning.
- learnerFlow: end value 없이 velocity를 읽기 → 2D launch vector → per-property config → friction final sample → unit/ease/collision boundary.
- relatedPages: none; collision, inertia, generic tween easing은 이 페이지의 route prerequisite로 연결하지 않는다.

## Source manifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| PM-137 | Physics2DPlugin은 x/y 또는 left/top에 velocity, angle, gravity 또는 acceleration/accelerationAngle, friction, xProp/yProp를 적용한다. velocity는 pixels per time unit, gravity/acceleration은 pixels per second이며 gravity와 acceleration은 함께 쓰지 않는다. friction은 0–1, parameters are not dynamically updateable, reversible, tween ease ignored, collision detection 없음. | #137 rendered description/config/usage; raw `src/Physics2DPlugin.js`; installed source/types | verified |
| PM-138 | PhysicsPropsPlugin은 any numeric property마다 velocity, acceleration, friction을 적용한다. velocity/acceleration은 units per second, friction은 0–1이며 optional acceleration/friction, non-dynamic parameters, reverseable tween, ignored ease를 가진다. | #138 rendered description/config; raw `src/PhysicsPropsPlugin.js`; installed source/types | verified |

## Coverage map

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| PM-137 | `ModeSelectionSection`; `PhysicsMotionLab` launch descriptor/actual `physics2D` tween/vector result; properties table; `BoundariesSection` | covered |
| PM-138 | `ModeSelectionSection`; `PhysicsMotionLab` properties descriptor/actual `physicsProps` tween/result; properties table; `BoundariesSection` | covered |

## Implementation contract

- exactFiles.create: page/meta/catalog/properties, `ModeSelectionSection`, `BoundariesSection`, `PhysicsMotionLab.tsx/.css/usePhysicsMotionAnimation.ts`, this handoff.
- exactFiles.modify: none.
- exampleContracts: `PhysicsMotionLab`; goal launch vector와 independent x/y property physics를 구분; question 언제 `physics2D` 대신 `physicsProps`를 써야 하는가; representation one stable target, vector/result sample and serialized code; controls keyboard radio mode + replay; runtimeSource `examples/PhysicsMotionLab/usePhysicsMotionAnimation.ts`; sourcePath same; runtimeOwnership selected plugin registration, `gsap.to`, update snapshots, `tween.revert` cleanup; displayOwnership controls, final sample, serializer and property reference; accessibility native radio/button and non-live visual result; motion actual `useReducedMotion`, same tween `progress(1).pause()` final sample immediately.
- nonGoals: collision detection, a full physics engine, dynamic physics parameter edits during a tween, inertia release behavior, generic ease tutorial.
- preserve: routes, program docs, shared UI, packages, tests, Git and full builds are untouched.

## Verification contract

- verifiedPerspectives: Source Curator PASS; Content Architect PASS; Official Coverage PASS; Learning Transformation PASS; Runtime/Display Sync PASS; Pedagogy PASS; Structure/Comment PASS; Accessibility/Motion PASS; Cross-page Consistency PASS; Build/Integration BLOCK.
- findings:
  - PM-F01 PASS — exact 2 official catalog/sourceManifest/coverage IDs are `PM-137`, `PM-138`; no duplicate or missing ID.
  - PM-F02 PASS — one discriminated descriptor picks exactly one plugin key, supplies actual tween config, friction final sample and code serializer.
  - PM-F03 PASS — stable React-owned target is reset before replay/mode switch; restoring `tween.revert()` runs before ref clear on replay, switch and cleanup.
  - PM-F04 PASS — reduced motion reads the shared media-preference hook and calls the same actual tween at final progress without an animated path; result has no live region.
  - PM-F05 PASS — property table and boundary section distinguish units, ignored tween ease, gravity/acceleration exclusion and no collision detection.
  - PM-F06 PASS — root route and full TypeScript/Vite/Storybook integration verified.
  - PM-B01 DEFERRED → PASS — browser keyboard radio/replay focus validation.
  - PM-B02 DEFERRED → PASS — browser `prefers-reduced-motion` validation.
  - PM-B03 DEFERRED → PASS — browser small viewport/overflow validation.
  - PM-B04 DEFERRED → PASS — browser actual plugin replay/final sample validation.
- verificationEvidence: #137/#138 rendered twice each; official raw source/type twice each; installed `Physics2DPlugin.js`/`PhysicsPropsPlugin.js` and types twice each; task-9 report records page-local TypeScript, formatter, ID and scoped diff checks.
- releaseDecision: PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 재감사

- officialSourceCheck: Physics2DPlugin과 PhysicsPropsPlugin 공식 문서를 다시 대조했다. velocity·acceleration·friction 입력, gravity와 acceleration의 배타성, physics property의 ease 무시, 동적 갱신 비권장, reverse 가능, collision 미지원 경계를 확인했다.
- findings:
  - PM-A01 `BLOCK → ADDRESSED` — 학습 화면에 노출되던 sourcePath·검토일과 구현 소유권 표현을 제거했다.
  - PM-A02 `BLOCK → ADDRESSED` — friction의 "추가 처리"를 공식 문서가 뜻하는 계산 비용으로 명확히 고쳤다.
  - PM-A03 `PASS` — mode별 descriptor가 실제 plugin key·config·표시 코드를 함께 만들고 target guard·Context revert를 표시하며, reduced-motion의 `progress(1).pause()`도 runtime과 일치한다.
  - PM-A04 `DEFERRED` — 실제 plugin replay, final sample, keyboard, reduced-motion, 작은 viewport 확인은 사용자 승인에 따라 수행하지 않았다.
  - PM-A05 `N/A` — Storybook은 `c309e13`에서 의도적으로 제거되어 검증 대상이 아니다.
- batchStaticVerification: `PASS` — `npx tsc --noEmit --pretty false`와 대상 범위 `git diff --check`가 exit 0이다.
- overallDecision: `NOT VERIFIED`
- releaseDecision: `NOT VERIFIED` — 정적 BLOCK은 해소했지만 브라우저 관점은 `DEFERRED`다.
