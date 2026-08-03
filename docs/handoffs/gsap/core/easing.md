# Easing handoff

## 입력 계약

### objective

ease를 시간 progress를 property value 비율로 바꾸는 함수로 이해하고, 내장 family·steps·parseEase·registerEase 중 필요한 도구를 선택하게 한다.

### officialPage

- title: `Easing` + `gsap.parseEase()` + `gsap.registerEase()` + `SteppedEase`
- canonicalUrl: `https://gsap.com/docs/v3/Eases/`, `https://gsap.com/docs/v3/GSAP/gsap.parseEase%28%29/`, `https://gsap.com/docs/v3/GSAP/gsap.registerEase%28%29/`, `https://gsap.com/docs/v3/Eases/SteppedEase/`
- reviewedAt: `2026-08-03`
- category: `Fundamentals`
- slug: `easing`
- sourcePageIds: primary `source:easing`; related `source:gsap-parse-ease`, `source:gsap-register-ease`, `source:stepped-ease`

### localPage

- localPath: `src/content/gsap/fundamentals/easing/`
- route: `/fundamentals/easing`

### sourceManifest

| id | officialItem | sourceStatus |
| --- | --- | --- |
| EASE-S001 | ease는 timing과 animation의 feel을 바꾼다. | verified |
| EASE-S002 | visualizer는 normalized progress 입력과 value 출력을 curve·preview·code로 보여준다. | verified |
| EASE-S003 | visualizer 편집 hint는 add, smooth/corner, handle, multi-select, delete, undo다. | verified |
| EASE-S004 | Core family는 none, power1~4, back, bounce, circ, elastic, expo, sine, steps다. | verified |
| EASE-S005 | 적용 가능한 family는 out/inOut/in variant를 제공한다. | verified |
| EASE-S006 | power0는 linear entry다. | verified |
| EASE-S007 | EasePack과 Custom ease family를 visualizer가 연결한다. | verified |
| EASE-S008 | generated code는 configurable argument와 같은 ease expression을 tween에 반영한다. | verified |
| EASE-S009 | 기본 ease는 power1.out이다. | verified |
| EASE-S010 | 개별 tween의 ease가 기본값을 override한다. | verified |
| EASE-S011 | global defaults와 timeline defaults로 적용 범위를 정한다. | verified |
| EASE-S012 | slow, rough, expoScale은 Core가 아닌 EasePack이다. | verified |
| EASE-S013 | CustomEase/Bounce/Wiggle은 별도 package와 installation 경계다. | verified |
| EASE-EX001 | official defaults와 generated tween code | verified |
| PARSE-S001 | parseEase는 ease string을 easing function으로 바꾼다. | verified |
| PARSE-S002 | power1, steps(5), elastic(1.2,0.5)를 parse할 수 있다. | verified |
| PARSE-S003 | CustomEase가 등록되면 4-number cubic-bezier string도 parse할 수 있다. | verified |
| PARSE-S004 | 복잡한 blended ease는 official helper 경계다. | verified |
| REGISTER-S001 | registerEase는 easing function에 이름을 붙여 string으로 재사용한다. | verified |
| REGISTER-S002 | easing function은 progress를 받아 일반적으로 0~1을 반환하나 범위를 넘을 수 있다. | verified |
| REGISTER-EX001 | linear custom function 등록과 tween 사용 sequence | verified |
| STEPS-S001 | SteppedEase/steps는 Core에 포함된다. | verified |
| STEPS-S002 | 연속 보간 대신 지정한 step 수로 거칠게 전환한다. | verified |
| STEPS-S003 | 0→100, 5 steps는 20/40/60/80/100이며 syntax는 steps(5)다. | verified |
| STEPS-S004 | GSAP용 equation이며 0~1을 반환한다. | verified |
| STEPS-EX001 | official five-step tween code | verified |

### sourceBlockers

`none`. power0와 none은 같은 linear curve로 설명하고 Custom/EasePack option은 전용 owner로 넘긴다.

### moduleSelection

- ease visualizer + callable parse/register method + progress→value concept guide

### learnerFlow

1. `#model`: progress→value 함수
2. `#families`: core family와 in/out/inOut
3. `#explorer`: 같은 거리에서 curve 비교
4. `#steps`: 연속·불연속 비교
5. `#parse`: string을 function과 sample로 변환
6. `#register`: function에 이름을 붙여 재사용
7. `#defaults-boundary`: default 범위와 external ease 경계

### coverageMap

| source items | localEvidence | localStatus |
| --- | --- | --- |
| EASE-S001~S008 | `easing.catalog.ts:3-6,21-22`, `ModelFamiliesSection.tsx:9-14`, `EaseCurveExplorer/**` | covered |
| EASE-S009~S013, EASE-EX001 | `easing.catalog.ts:7-10,24-25`, `DefaultsBoundarySection.tsx:8-14` | covered |
| PARSE-S001~S004 | `easing.catalog.ts:11-14`, `ParseRegisterSection.tsx:8-17`, `ParseEaseExample/**` | covered |
| REGISTER-S001~S002, REGISTER-EX001 | `easing.catalog.ts:11-14`, `ParseRegisterSection.tsx:11,14-16`, `ParseEaseExample/useParseEaseRuntime.ts` | covered |
| STEPS-S001~S004, STEPS-EX001 | `easing.catalog.ts:15-18`, `SteppedEaseSection.tsx:8-10`, `SteppedEaseExample/**` | covered |

`PageCoverage.tsx`가 23개 기술 claim과 3개 official-code item, 합계 26개의 stable ID를 렌더링한다.

### relatedPages

- `/fundamentals/custom-bounce-wiggle`: Custom ease family
- `/fundamentals/tween-configuration`: defaults owner
- `/fundamentals/gsap-to`: per-tween ease var owner

## 구현 계약

### exactFiles

create: page/meta/catalog/CSS, SectionHeading/PageCoverage, model/families/steps/parse/register/default-boundary sections, EaseCurveExplorer·ParseEaseExample·SteppedEaseExample 전용 runtime. modify: routes와 handoff evidence.

### exampleContracts

- `EaseCurveExplorer`: family·variant와 progress slider로 paused Tween, SVG curve, progress/value table을 같은 descriptor에서 만든다.
- `ParseEaseExample`: 세 preset string을 parse해 고정 progress sample table과 동기화 코드를 표시하며 motion은 없다.
- `SteppedEaseExample`: step 수와 progress를 수동 조절하고 현재 step/value를 text로 표시한다.
- autoplay 없음, native label/keyboard, graph와 동등한 table, reduced-motion에서 수동 progress만 사용한다.

### nonGoals

- CustomEase/Bounce/Wiggle 구현, full curve editor, EasePack option, gsap.to vars 복제, shared generic ease runtime

### preserve

- inventory identity, core:09~11 owner 경계, existing pages/shared APIs, route semantics, unrelated changes

## 검수 계약

### reviewAssignments

- Source Curator + Content Architect: `/root/target_sources_arch`
- 구현 후 독립 전문 review와 release reviewer

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SC-CORE08-001 | PASS | 4 canonical pages, 26 stable items | 구현 가능 | 모든 ID evidence 연결 |
| SC-CORE08-002 | ADVISORY | 사전 curator 요약의 24 claims + 3 code 합계 표기는 실제 열거 23 + 3과 달랐음 | coverage 분모 혼동 | stable ID 실목록 기준 26으로 고정 |
| IMPL-CORE08-001 | PASS | 조립 page, 4개 section, page-owned example/runtime 3개, 26개 catalog ID | 구현 계약 충족 | independent review 필요 |
| IMPL-CORE08-002 | PASS | 세 example 모두 자동 재생 없이 paused/manual progress 또는 정적 sampling 사용 | motion 계약 충족 | Browser 실조작 필요 |
| ROUTE-CORE08-001 | PASS | `src/app/routes.ts` lazy import와 `값과 움직임` lesson 등록 | route 접근 가능 | Browser route 이동 필요 |
| IR-CORE08-001 | ADDRESSED | EaseCurve·Stepped의 x·duration·ease·progress를 runtime descriptor 단일 원본으로 변경 | runtime/display sync 복구 | none |
| IR-CORE08-002 | ADDRESSED | parse progress와 register name·실제 easing function을 runtime source에서 section/code까지 공유 | parse/register sync 복구 | none |
| IR-CORE08-003 | ADDRESSED | CSS 파일 역할 주석과 exported type JSDoc 보완 | comment gate 통과 | none |
| IR-CORE08-FINAL | PASS | independent reviewer가 26/26 coverage와 세 수정사항 재검수 | 정적 release gate 통과 | Browser gate만 남음 |

### verificationEvidence

- `2026-08-03 npm run build` — `tsc && vite build`, 171 modules, `EasingPage` JS/CSS chunk 생성, exit 0.
- static integration — `/fundamentals/easing` lazy route와 lesson group 등록 확인.
- Browser discovery — `agent.browsers.list()`가 `[]`; keyboard·390px·control 실조작은 미실행.
- 독립 review — coverage/learning/structure/accessibility/build PASS; runtime/display·comment 3건 수정 후 재검수 PASS.

### releaseDecision

`BLOCK` — 구현·26/26 coverage·route·build·독립 정적 review는 완료했다. 연결 가능한 Browser가 없어 실제 interaction gate만 남았다.
