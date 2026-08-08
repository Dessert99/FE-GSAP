# Plugins overview handoff

## 입력 계약

### objective

P01은 “plugin을 더하면 무엇이 달라지고, 왜 vars property를 쓰기 전에 load와 register가 필요한가?”를 설명한다. 개별 plugin API를 반복하지 않고, core-included와 separately loaded plugin의 선택·의존성·번들 경계를 짧은 front door로 제공한다.

### officialPage

- title: `Plugins`
- canonicalUrl: `https://gsap.com/docs/v3/Plugins/`
- reviewedAt: `2026-08-08`
- category: `Plugins`
- slug: `plugins`
- sourcePageId: `source:plugins-overview` / `plugin:#17`

Rendered 확인 2회와 raw HTML `curl` 확인 2회에서 `Plugin Overview`, `Included in GSAP's Core` 하위 heading 4개, standalone family heading 7개, `Installing/Loading a plugin`, `Registering a plugin`을 대조했다. signature·parameter·return 표는 이 overview에 게시되지 않았다.

### localPage

- localPath: `src/content/gsap/plugins/plugins/`
- route: `/fundamentals/plugins` (registered)

### sourceManifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| PLUG-01 | plugin은 GSAP core에 extra capability를 더한다. | intro | verified |
| PLUG-02 | 필요한 기능만 더할 수 있도록 core는 비교적 작게 유지된다. | intro | verified |
| PLUG-03 | `Included in GSAP's Core`는 core-included capability의 시작 heading이다. | Included in GSAP's Core | verified |
| PLUG-19 | `Animate anything`은 CSS properties, Attributes, Array Values 등을 core capability로 나열한다. | Core > Animate anything | verified |
| PLUG-20 | core Eases는 none, power, back, bounce, circ, elastic, expo, sine, steps(n)을 나열한다. | Core > Eases | verified |
| PLUG-21 | `Animate efficiently`는 staggers, callbacks, snapping, modifiers, keyframes, ticker, cleanup, matchMedia를 나열한다. | Core > Animate efficiently | verified |
| PLUG-22 | Utility Methods는 checkPrefix부터 wrapYoyo까지의 utility group을 core 포함 기능으로 나열한다. | Core > Utility Methods | verified |
| PLUG-04 | plugin 파일은 JS 파일이며 script tag, npm, yarn, tgz로 설치·load할 수 있다. | Installing/Loading a plugin | verified |
| PLUG-05 | plugin 파일을 먼저 load해야 register할 수 있다. | Registering a plugin | verified |
| PLUG-06 | `gsap.registerPlugin()`은 여러 plugin을 한 번에 받을 수 있다. | official code example | verified |
| PLUG-07 | registration은 plugin과 GSAP core가 함께 동작하게 한다. | Registering a plugin | verified |
| PLUG-09 | 공식 example은 `gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, MorphSVGPlugin)`이다. | official code example | verified |
| PLUG-10 | Scroll Plugins는 ScrollTrigger, ScrollTo, ScrollSmoother를 나열한다. | Scroll Plugins | verified |
| PLUG-23 | Text Plugins는 SplitText, ScrambleText, Text Replacement를 나열한다. | Text Plugins | verified |
| PLUG-24 | SVG Plugins는 DrawSVG, MorphSVG, MotionPath, MotionPathHelper를 나열한다. | SVG Plugins | verified |
| PLUG-25 | UI Plugins는 Flip, Draggable, Inertia, Observer를 나열한다. | UI Plugins | verified |
| PLUG-26 | Other Plugins는 Physics2D, PhysicsProps, GSDevTools, Easel, Pixi를 나열한다. | Other Plugins | verified |
| PLUG-27 | separate Eases는 CustomEase, EasePack, CustomWiggle, CustomBounce를 나열한다. | Eases | verified |
| PLUG-28 | React는 useGSAP()을 npm availability와 함께 제시한다. | React | verified |
| PLUG-11 | ScrollSmoother는 ScrollTrigger를 requires로 표시한다. | Scroll Plugins | verified |
| PLUG-12 | CustomWiggle·CustomBounce는 CustomEase를 requires로 표시한다. | Eases | verified |
| PLUG-13 | independent plugin overview 항목에는 CDN 또는 npm availability badge가 표시된다. | Plugin Overview badges | verified |
| PLUG-14 | registration은 bundler/build tool의 tree shaking 문제를 막는다. | Registering a plugin | verified |
| PLUG-15 | plugin은 사용 전에 한 번만 register하면 된다. | Registering a plugin | verified |
| PLUG-16 | 같은 plugin 재등록은 harmless지만 도움이 되지 않는다. | Registering a plugin | verified |
| PLUG-18 | overview는 Installation helper로 연결하며 환경별 entry detail은 Installation 경계에 둔다. | Installing/Loading a plugin | verified |

### sourceBlockers

`none`. 공식 overview가 게시하지 않는 individual plugin option·method·default·browser support·SSR 구현은 추측하지 않는다. named `vars key` 멘탈 모델과 individual API ownership은 learner flow·nonGoal 경계이며 공식 coverage item으로 세지 않는다.

### moduleSelection

| module | 목적 | source |
| --- | --- | --- |
| CG | core와 plugin capability, family 선택, ownership boundary를 설명한다. | PLUG-01–03, 10–13, 19–28 |
| PL | load·register·dependency와 named vars key의 연결을 보여 준다. | PLUG-04–07, 09, 14–16 |
| II | entry 방식, bundler tree shaking, SSR·cleanup의 다음 경계를 표시한다. | PLUG-04–05, 14–16, 18 |

### learnerFlow

1. plugin이 core에 새 vars 해석기를 붙이는 mental model
2. load와 register의 서로 다른 역할
3. vars property가 plugin으로 전달되는 경계
4. core-included, standalone, dependent, third-party 선택표
5. bundler, SSR, 재등록과 cleanup 경계

### coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| PLUG-01 | `PluginMentalModelSection.tsx` 첫 문단; `plugins.catalog.ts#PLUG-01` | covered |
| PLUG-02 | `PluginMentalModelSection.tsx` 첫 문단; `plugins.catalog.ts#PLUG-02` | covered |
| PLUG-03 | `PluginMentalModelSection.tsx` core-included 문단; `plugins.catalog.ts#PLUG-03` | covered |
| PLUG-19 | `PluginMentalModelSection.tsx` `Animate anything` heading 문장; `plugins.catalog.ts#PLUG-19` | covered |
| PLUG-20 | `PluginMentalModelSection.tsx` core ease 문장; `plugins.catalog.ts#PLUG-20` | covered |
| PLUG-21 | `PluginMentalModelSection.tsx` `Animate efficiently` heading 문장; `plugins.catalog.ts#PLUG-21` | covered |
| PLUG-22 | `PluginMentalModelSection.tsx` `Utility Methods` heading 문장; `plugins.catalog.ts#PLUG-22` | covered |
| PLUG-04 | `LoadRegisterSection.tsx` load 단계; `plugins.catalog.ts#PLUG-04` | covered |
| PLUG-05 | `LoadRegisterSection.tsx` register 단계와 code block; `plugins.catalog.ts#PLUG-05` | covered |
| PLUG-06 | `LoadRegisterSection.tsx` `gsap.registerPlugin(...)` code block; `plugins.catalog.ts#PLUG-06` | covered |
| PLUG-07 | `VarsExtensionSection.tsx` registry 설명; `RegistrationDiagnostic`; `plugins.catalog.ts#PLUG-07` | covered |
| PLUG-09 | `LoadRegisterSection.tsx` registration code pattern; `VarsExtensionSection.tsx`; `plugins.catalog.ts#PLUG-09` | covered |
| PLUG-10 | `PluginFamiliesSection.tsx` family 목록 문단; `plugins.catalog.ts#PLUG-10` | covered |
| PLUG-23 | `PluginFamiliesSection.tsx` family 목록 문단; `plugins.catalog.ts#PLUG-23` | covered |
| PLUG-24 | `PluginFamiliesSection.tsx` family 목록 문단; `plugins.catalog.ts#PLUG-24` | covered |
| PLUG-25 | `PluginFamiliesSection.tsx` family 목록 문단; `plugins.catalog.ts#PLUG-25` | covered |
| PLUG-26 | `PluginFamiliesSection.tsx` family 목록 문단; `plugins.catalog.ts#PLUG-26` | covered |
| PLUG-27 | `PluginFamiliesSection.tsx` family 목록 문단; `plugins.catalog.ts#PLUG-27` | covered |
| PLUG-28 | `PluginFamiliesSection.tsx` family 목록 문단; `plugins.catalog.ts#PLUG-28` | covered |
| PLUG-11 | `PluginFamiliesSection.tsx` dependent plugin 행; `plugins.catalog.ts#PLUG-11` | covered |
| PLUG-12 | `PluginFamiliesSection.tsx` dependent plugin 행; `plugins.catalog.ts#PLUG-12` | covered |
| PLUG-13 | `PluginFamiliesSection.tsx` availability badge note; `plugins.catalog.ts#PLUG-13` | covered |
| PLUG-14 | `BoundariesSection.tsx` tree shaking 문단; `plugins.catalog.ts#PLUG-14` | covered |
| PLUG-15 | `BoundariesSection.tsx` one-time registration 문단; `plugins.catalog.ts#PLUG-15` | covered |
| PLUG-16 | `BoundariesSection.tsx` re-registration 문단; `plugins.catalog.ts#PLUG-16` | covered |
| PLUG-18 | `LoadRegisterSection.tsx` Installation owner note; `plugins.catalog.ts#PLUG-18` | covered |

### relatedPages

- `/fundamentals/installation` — environment별 entry와 install detail owner
- `/fundamentals/gsap-to` — Tween target·vars owner
- `/fundamentals/gsap-context` — React cleanup scope owner
- `/fundamentals/responsive-motion` — condition·reduced-motion owner
- plugin P02+ — 각 plugin의 individual API, target, lifecycle owner (아직 route 미등록이라 링크하지 않음)

## 구현 계약

### exactFiles

- create: `src/content/gsap/plugins/plugins/PluginsPage.tsx`
- create: `src/content/gsap/plugins/plugins/PluginsPage.css`
- create: `src/content/gsap/plugins/plugins/plugins.meta.ts`
- create: `src/content/gsap/plugins/plugins/plugins.catalog.ts`
- create: `src/content/gsap/plugins/plugins/components/PageCoverage/PageCoverage.tsx`
- create: `src/content/gsap/plugins/plugins/components/SectionHeading/SectionHeading.tsx`
- create: `src/content/gsap/plugins/plugins/examples/RegistrationDiagnostic/RegistrationDiagnostic.tsx`
- create: `src/content/gsap/plugins/plugins/examples/RegistrationDiagnostic/RegistrationDiagnostic.css`
- create: `src/content/gsap/plugins/plugins/examples/RegistrationDiagnostic/useRegistrationDiagnosticAnimation.ts`
- create: `src/content/gsap/plugins/plugins/sections/PluginMentalModelSection/PluginMentalModelSection.tsx`
- create: `src/content/gsap/plugins/plugins/sections/LoadRegisterSection/LoadRegisterSection.tsx`
- create: `src/content/gsap/plugins/plugins/sections/VarsExtensionSection/VarsExtensionSection.tsx`
- create: `src/content/gsap/plugins/plugins/sections/PluginFamiliesSection/PluginFamiliesSection.tsx`
- create: `src/content/gsap/plugins/plugins/sections/BoundariesSection/BoundariesSection.tsx`

### exampleContracts

| field | value |
| --- | --- |
| name | RegistrationDiagnostic |
| goal | imported plugin이 explicit registration 뒤에만 named vars Tween을 실행하는지 보여 준다. |
| question | 왜 load한 plugin을 register한 뒤 vars property를 써야 하나요? |
| representation | load → register → vars diagram, discrete registry status, 한 문장 preview, code panel |
| controls | native `TextPlugin register`, disabled-until-registered native `예제 replay` button |
| runtimeSource | `useRegistrationDiagnosticAnimation.ts` — `gsap`, `useGSAP`, `TextPlugin` import와 registry detection, registration, Tween lifecycle 소유 |
| sourcePath | `examples/RegistrationDiagnostic/useRegistrationDiagnosticAnimation.ts` |
| runtimeOwnership | descriptor(modulePath, registryName, varsKey, sampleValue), actual registry snapshot, duration(`0.8` 또는 reduced-motion `0`), tween `revert()` cleanup |
| displayOwnership | TSX는 runtime descriptor/snapshot만 serialise하고 controls·preview·학습 설명을 소유한다. |
| accessibility | native button, disabled state, discrete `role=status`; frame마다 바뀌는 값 없음 |
| motion | explicit register/replay only; reduced motion에서는 duration `0`으로 end state를 표시 |

### nonGoals

- TextPlugin의 value, delimiter, diff 등 option semantics를 설명하지 않는다.
- individual plugin API catalog·pricing·membership·CDN URL을 만들지 않는다.
- unregistered state를 만들기 위해 global plugin registry를 해제하거나 수정하지 않는다.
- `routes.ts`, shared UI, global CSS, program docs를 수정하지 않는다.

### preserve

- 기존 core routes와 등록된 slug만 내부 링크로 사용한다.
- `OfficialDocsLink`, `useReducedMotion`, core installation/cleanup/motion page의 ownership을 변경하지 않는다.
- root integration 전 route/build finding은 `BLOCK`으로 남긴다.

## 검증 계약

### verifiedPerspectives

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, static Accessibility/Motion, Cross-page Consistency는 page-local self-review 대상이다. Build/Integration은 root route integration 뒤에만 판정한다.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-P01-001 | PASS | 2026-08-08 rendered page 2회와 raw HTML `curl` 2회에서 3개 technical heading, core list, 7 family heading, dependencies, loading·registration 문구와 official example을 대조했다. | source blocker 없음 | none |
| OC-P01-001 | PASS | meta section 합계 `7+3+2+10+4=26`, catalog official 행 26, manifest PLUG ID 26을 static script로 대조한다. | coverage denominator 일치 | none |
| RDS-P01-001 | PASS | GSAP import는 runtime hook 한 파일에만 있고, descriptor가 import·registry·vars·sample code와 tween input을 함께 제공한다. | runtime/display sync | none |
| PED-P01-001 | PASS | 용어 정의 → load/register → diagnostic → family table → operational boundary 순서이며 diagnostic은 목표·관찰·원리·use case를 포함한다. | beginner flow | none |
| STRUCT-P01-001 | PASS | page는 assembly만 담당하고 section/example/runtime source가 분리됐으며 example declaration·execution step마다 Korean one-line comment가 있다. | structure/comment | none |
| A11Y-P01-001 | PASS | native controls, disabled replay, discrete status, reduced-motion duration 0, grid wrapping CSS와 live-region static review. | static accessibility/motion | none |
| XPAGE-P01-001 | PASS | existing registered routes만 링크하고 P02+ API semantics를 P01에 중복하지 않는다. | cross-page consistency | none |
| INT-P01-001 | PASS | root가 `src/app/routes.ts`에 `PluginsPage` lazy import와 `/fundamentals/plugins` lesson을 등록했다. worker 단계의 BLOCK은 이 통합으로 해소됐다. | 페이지가 curriculum에서 탐색 가능하다. | none |
| BUILD-P01-001 | PASS | root가 통합 후 `npx tsc --noEmit`, `npm run build`, `npm run build-storybook`, `git diff --check`를 모두 exit 0으로 확인했다. Vite 798 modules와 Storybook 936 modules에서 `PluginsPage` chunk가 생성됐다. | 타입·production·Storybook 통합이 검증됐다. | none |
| BROWSER-P01-001 | DEFERRED | keyboard focus/control action, reduced-motion live switch, 320/390px layout/overflow, register/replay interaction are approved browser-only checks. | owner batch browser review pending | root/owner checks all four in browser |

### verificationEvidence

- official evidence: rendered official canonical twice, raw official canonical twice, 2026-08-08
- runtime probe: installed GSAP 3.15.0 `TextPlugin` export reports name `text`; Node lacks DOM so it queues browser plugin registration and cannot prove browser registry state. Browser registry state is therefore read at runtime, not asserted by the probe.
- static evidence: page-local file existence, PLUG catalog count/duplicates, section denominator, GSAP import ownership, comment/live-region/internal-link scans are recorded in task report.
- integration evidence: root route registration 뒤 TypeScript, Vite 798 modules, Storybook 936 modules와 두 output의 `PluginsPage` chunk, diff check가 모두 통과했다.

### releaseDecision

`PASS` — route와 TypeScript/Vite/Storybook 통합 blocker가 해소됐다. 브라우저 확인은 네 개의 승인된 `DEFERRED` 항목으로 명시적으로 남는다.
