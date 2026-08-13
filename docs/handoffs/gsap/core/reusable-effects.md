# Reusable effects handoff

## 입력 계약

### objective

반복되는 animation 함수를 `registerEffect()`로 등록하고 `gsap.effects` 직접 호출과 Timeline extension 중 알맞은 재사용 방식을 선택하게 한다.

### officialPage

- title: `gsap.effects + gsap.registerEffect()`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/gsap.effects`
  - `https://gsap.com/docs/v3/GSAP/gsap.registerEffect()`
- reviewedAt: `2026-08-13`
- category: `Fundamentals > GSAP`
- slug: `reusable-effects`
- sourcePageIds: primary `source:gsap-effects`; related `source:gsap-register-effect`

### localPage

- localPath: `src/content/gsap/fundamentals/reusable-effects/`
- route: `/fundamentals/reusable-effects`

### sourceManifest

| id | technicalItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| RE-EFFECTS-TYPE | `gsap.effects`는 등록된 effect를 보관하는 object다. | `source:gsap-effects` 본문, `src/gsap-core.js` effects registry | verified |
| RE-EFFECTS-NAMED-ACCESS | 등록 name으로 `gsap.effects[name](targets, config?)`를 호출한다. | `source:gsap-effects` 본문·예제 | verified |
| RE-EFFECTS-DIRECT-RETURN | direct 호출은 effect callback의 반환값을 그대로 돌려준다. | `src/gsap-core.js` registerEffect wrapper | verified |
| RE-REGISTER-SHAPE | 공식 등록 예제는 `{ name, effect, defaults, extendTimeline }`을 설정한다. | `source:gsap-register-effect` | verified |
| RE-REGISTER-RETURN | 설치된 타입에서 `registerEffect()` 반환은 void이고 실행 결과는 `undefined`다. | `types/gsap-core.d.ts`, runtime probe | verified |
| RE-REGISTER-NAME | name은 registry key이며 확장 시 Timeline prototype method 이름이다. | `source:gsap-register-effect`, `src/gsap-core.js` | verified |
| RE-REGISTER-EFFECT | 공식 effect callback은 targets와 config를 받는다. | `source:gsap-register-effect` | verified |
| RE-REGISTER-TARGETS | selector·target·group은 callback 전에 target array로 정규화된다. | 두 canonical 본문, `src/gsap-core.js` `toArray()` wrapper | verified |
| RE-REGISTER-CONFIG | 호출 때마다 config가 callback에 전달된다. | `source:gsap-register-effect` 본문 | verified |
| RE-REGISTER-DEFAULTS | defaults는 빠진 key에 매 호출 적용되고 명시한 호출값이 우선한다. | `source:gsap-register-effect`, runtime probe | verified |
| RE-REGISTER-CENTRAL | effect는 중앙 registry에 등록되어 새 targets/config로 재사용된다. | 두 canonical source 본문 | verified |
| RE-EXTEND-OPTION | `extendTimeline: true`면 Timeline prototype에 동명 method를 추가한다. | `source:gsap-register-effect`, `src/gsap-core.js` | verified |
| RE-TIMELINE-SIGNATURE | 확장 method는 `(targets, vars?, position?)` 형태로 호출한다. | 두 canonical 예제, `src/gsap-core.js` | verified |
| RE-TIMELINE-ADD | 확장 method는 effect 반환 animation을 선택한 position에 삽입한다. | 두 canonical 본문·예제, `src/gsap-core.js` | verified |
| RE-TIMELINE-RETURN | 공식 예제는 확장 method와 Tween을 계속 chaining한다. | 두 canonical 예제, `src/gsap-core.js`, runtime probe | verified |
| RE-TIMELINE-CONTEXT | callback의 세 번째 인자는 호출한 parent Timeline이다. | `src/gsap-core.js`, runtime probe | verified |
| RE-TIMELINE-POSITION-SHORTHAND | 두 번째 인자가 object가 아니면 config 대신 position으로 취급하고 defaults를 쓴다. | `src/gsap-core.js` Timeline extension | verified |
| RE-EXTEND-RETURN-WARNING | 확장 effect는 Timeline에 넣을 Tween 또는 Timeline을 반환해야 한다. | `source:gsap-register-effect` warning | verified |
| RE-NONEXTEND-ADD | 확장 없이도 `tl.add(gsap.effects[name](...), position)`으로 삽입한다. | `source:gsap-register-effect` 설명 | verified |
| RE-OFFICIAL-FADE | 공식 fade 예제는 duration 기본값 2, 호출 override, Timeline chaining·position을 보여준다. | 두 canonical 예제 | verified |
| RE-EFFECTS-PORTABLE | 등록 effect는 targets와 config를 바꿔 프로젝트 간에 공유할 수 있다. | `source:gsap-effects` 본문 | verified |

공식 origin 17개와 설치본 implementation origin 4개를 catalog의 `origin`으로 구분한다. implementation item은 `RE-EFFECTS-DIRECT-RETURN`, `RE-REGISTER-RETURN`, `RE-TIMELINE-CONTEXT`, `RE-TIMELINE-POSITION-SHORTHAND`다. 설치본 source에는 `plugins` 옵션도 있지만 현재 공식 두 문서의 본문에 없고 이 페이지의 핵심 질문에 필요하지 않아 학습 범위에서 제외했다.

### sourceBlockers

`none` — 두 canonical source의 공식 17개와 GSAP 3.15.0 `src/gsap-core.js`·`types/gsap-core.d.ts`·Node probe의 학습 관련 구현 4개를 근거별로 확인했다.

### moduleSelection

- concept guide + callable method + Timeline integration

### learnerFlow

1. `#mental-model`: effect는 완성 animation이 아니라 targets와 config를 받는 함수
2. `#register-contract`: name/effect/defaults/extendTimeline/return
3. `#direct-call`: `gsap.effects` object·target array·default override
4. `#registered-example`: direct 실행과 관찰
5. `#timeline-extension`: prototype method·position·third Timeline·반환 animation warning
6. `#boundaries`: 확장 없는 `tl.add`, 이름 충돌 줄이기, related pages

### coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| RE-EFFECTS-TYPE | `reusable-effects.catalog.ts`, `DirectCallSection.tsx` object 설명 | covered |
| RE-EFFECTS-NAMED-ACCESS | `DirectCallSection.tsx`, `RegisteredEffectExample.tsx` direct call code | covered |
| RE-EFFECTS-DIRECT-RETURN | `RegisteredEffectExample.tsx` direct 반환 관찰, `useRegisteredEffectAnimation.ts` Tween data | covered |
| RE-REGISTER-SHAPE | `RegisterContractSection.tsx` 공식 config key 설명 | covered |
| RE-REGISTER-RETURN | `RegisterContractSection.tsx` void code·설치본 provenance note | covered |
| RE-REGISTER-NAME | `RegisterContractSection.tsx` name row, 두 runtime의 page-prefixed registration | covered |
| RE-REGISTER-EFFECT | `RegisterContractSection.tsx` callback 계약, 두 runtime callback | covered |
| RE-REGISTER-TARGETS | `DirectCallSection.tsx`, `RegisteredEffectExample.tsx` Array target count | covered |
| RE-REGISTER-CONFIG | `RegisterContractSection.tsx`, `RegisteredEffectExample.tsx` call config code | covered |
| RE-REGISTER-DEFAULTS | `RegisteredEffectExample.tsx`, `useRegisteredEffectAnimation.ts` 2초/0.8초 관찰 | covered |
| RE-REGISTER-CENTRAL | `EffectMentalModelSection.tsx` effect 함수 흐름 | covered |
| RE-EXTEND-OPTION | `TimelineExtensionSection.tsx`, `timelineEffectRegistration` | covered |
| RE-TIMELINE-SIGNATURE | `TimelineEffectExample.tsx` targets·vars·position code | covered |
| RE-TIMELINE-ADD | `TimelineExtensionSection.tsx`, `useTimelineEffectAnimation.ts` child insertion 관찰 | covered |
| RE-TIMELINE-RETURN | `TimelineEffectExample.tsx` parent return 관찰·chaining code | covered |
| RE-TIMELINE-CONTEXT | `TimelineEffectExample.tsx` third Timeline 관찰, runtime child data | covered |
| RE-TIMELINE-POSITION-SHORTHAND | `TimelineExtensionSection.tsx` shorthand 설명 | covered |
| RE-EXTEND-RETURN-WARNING | `TimelineExtensionSection.tsx` 반환 animation warning | covered |
| RE-NONEXTEND-ADD | `BoundariesSection.tsx` explicit `tl.add()` code | covered |
| RE-OFFICIAL-FADE | `DirectCallSection.tsx`, `RegisteredEffectExample.tsx` default·override·direct call | covered |
| RE-EFFECTS-PORTABLE | `EffectMentalModelSection.tsx`, `BoundariesSection.tsx` targets/config 재사용 경계 | covered |

### relatedPages

- `/fundamentals/tween-playhead`: parent Timeline에 넣은 animation의 시간 위치
- `/fundamentals/gsap-to`: effect callback이 반환하는 기본 Tween
- `/fundamentals/easing`: effect config로 바꿀 ease

## 구현 계약

### exactFiles

create:

- `src/content/gsap/fundamentals/reusable-effects/ReusableEffectsPage.tsx`
- `src/content/gsap/fundamentals/reusable-effects/ReusableEffectsPage.css`
- `src/content/gsap/fundamentals/reusable-effects/reusable-effects.meta.ts`
- `src/content/gsap/fundamentals/reusable-effects/reusable-effects.catalog.ts`
- `src/content/gsap/fundamentals/reusable-effects/components/SectionHeading/SectionHeading.tsx`
- `src/content/gsap/fundamentals/reusable-effects/components/PageCoverage/PageCoverage.tsx`
- `src/content/gsap/fundamentals/reusable-effects/sections/EffectMentalModelSection/EffectMentalModelSection.tsx`
- `src/content/gsap/fundamentals/reusable-effects/sections/RegisterContractSection/RegisterContractSection.tsx`
- `src/content/gsap/fundamentals/reusable-effects/sections/DirectCallSection/DirectCallSection.tsx`
- `src/content/gsap/fundamentals/reusable-effects/sections/RegisteredExampleSection/RegisteredExampleSection.tsx`
- `src/content/gsap/fundamentals/reusable-effects/sections/TimelineExtensionSection/TimelineExtensionSection.tsx`
- `src/content/gsap/fundamentals/reusable-effects/sections/BoundariesSection/BoundariesSection.tsx`
- `src/content/gsap/fundamentals/reusable-effects/examples/RegisteredEffectExample/RegisteredEffectExample.tsx`
- `src/content/gsap/fundamentals/reusable-effects/examples/RegisteredEffectExample/RegisteredEffectExample.css`
- `src/content/gsap/fundamentals/reusable-effects/examples/RegisteredEffectExample/useRegisteredEffectAnimation.ts`
- `src/content/gsap/fundamentals/reusable-effects/examples/TimelineEffectExample/TimelineEffectExample.tsx`
- `src/content/gsap/fundamentals/reusable-effects/examples/TimelineEffectExample/TimelineEffectExample.css`
- `src/content/gsap/fundamentals/reusable-effects/examples/TimelineEffectExample/useTimelineEffectAnimation.ts`

modify:

- `src/app/routes.ts`
- `docs/handoffs/gsap/core/reusable-effects.md`

구현 담당 지시에 따라 공유 파일 `src/app/routes.ts`는 이 작업에서 수정하지 않고 기존 병렬 변경을 보존했다.

### exampleContracts

- `RegisteredEffectExample`: page-prefixed effect를 direct 호출하고 default/override duration radio와 replay로 정규화 targets·config를 관찰한다. module-scope registration descriptor와 실제 runtime, 표시 serializer를 공유하며 autoplay하지 않는다. runtimeSource는 `examples/RegisteredEffectExample/useRegisteredEffectAnimation.ts`다.
- `TimelineEffectExample`: `extendTimeline` effect와 후속 Tween의 parent sequence를 position `0`/`+=0.25`와 replay로 비교한다. callback의 third Timeline과 반환 animation, parent chaining을 같은 descriptor에서 관찰하며 autoplay하지 않는다. runtimeSource는 `examples/TimelineEffectExample/useTimelineEffectAnimation.ts`다.
- 두 예제 모두 native label·fieldset/select·output·button을 쓴다. RegisteredEffect는 2초/0.8초 학습 descriptor를 유지한 채 reduced-motion 실행에서 playhead를 즉시 끝으로 옮기고, TimelineEffect는 effective duration 0·무반복 descriptor로 최종 상태를 보여준다.

### nonGoals

- generic effect abstraction/shared registry helper, unregister API 주장, plugin 설치법, Timeline 전체 API, registerPlugin, cross-page component, test file, autoplay/multi-target showcase

### preserve

- inventory identity/owner order, existing routes/shared API, unrelated changes, example별 독립 runtime, runtime-display single descriptor, global collision을 피하는 page-prefixed effect name

## 검수 계약

### verifiedPerspectives

- Official Coverage: `PASS` — 공식 17개와 학습에 필요한 installation implementation 4개를 origin별로 분리하고 총 21개를 section에 연결했다.
- Learning Transformation / Pedagogy: `PASS` — 제작 coverage UI와 반복 비유를 제거하고 effect 함수의 입력·등록·호출·확장 순서로 유지했다.
- Runtime/Display Sync: 정적 `PASS` — 두 예제의 control → descriptor → GSAP call → serializer가 같은 값과 selector를 사용한다.
- Structure/Comment: `PASS` — 예제별 runtimeSource 분리와 선언·실행 단계 주석을 정적 확인했다.
- Accessibility/Motion: 정적 `PASS`, 브라우저 `NOT VERIFIED` — native control·status·reduced-motion 분기를 확인했다.
- Build/Integration: TypeScript·Vite·Storybook `PASS` — 2026-08-13 메인 통합 실행이 모두 exit 0이다.
- Cross-page Consistency: `PASS` — 세 related route가 현재 route registry에 존재함을 읽기 전용으로 확인했다.

### reviewAssignments

- Current Source Curator + Content Architect + Auditor: `/root/audit_gsap_to`
- 브라우저·전역 build 통합: `/root`

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SC-CORE20-001 | 과거 PASS → BLOCK → ADDRESSED → PASS | 21개를 모두 공식 item으로 보았으나 현재 canonical에 없는 구현 항목이 섞여 있었음 / 공식 17개와 학습 관련 implementation 4개로 origin을 분리하고 `RE-REGISTER-RETURN`을 신설 | source provenance 오류 | none |
| IMPL-CORE20-001 | PASS | `ReusableEffectsPage.tsx`, catalog 21개 item, exact create 18개 파일 | 6단계 학습 flow와 두 독립 runtime 구현 | none |
| IMPL-CORE20-002 | PASS | `useRegisteredEffectAnimation.ts:22-115`, `RegisteredEffectExample.tsx` | page-prefixed direct effect, defaults/override, normalized targets, paused replay 동기화 | 브라우저 control 확인 |
| IMPL-CORE20-003 | PASS | `useTimelineEffectAnimation.ts:26-127`, `TimelineEffectExample.tsx` | extendTimeline position, third Timeline, animation/parent 반환, chaining, paused replay 동기화 | 브라우저 control 확인 |
| BUILD-CORE20-001 | PASS | 2026-08-13 메인 통합 `npm run build`·`npm run build-storybook` 모두 exit 0 | 현재 수정본의 integration 확인 | none |
| TYPE-CORE20-001 | PASS | `npx tsc --noEmit` exit 0, 2026-08-13 | 현재 TypeScript 정합성 확인 | none |
| IR-CORE20-001 | 과거 PASS → BLOCK → ADDRESSED → PASS | catalog 공식 17개·implementation 4개, 총 21개 고유 ID와 section 합계 21을 재검수 | Official Coverage와 provenance 통과 | none |
| IR-CORE20-002 | PASS | mental model부터 boundaries까지 6단계 flow 재검수 | Learning Transformation 통과 | none |
| IR-CORE20-003 | PASS | defaults mutation 복사 격리, direct 2/0.8, Timeline context·parent·position probe | Runtime/Display 통과 | none |
| IR-CORE20-004 | PASS | 조립 page·section·example/runtime 소유권과 한국어 단계 주석 재검수 | Structure/Comments 통과 | none |
| IR-CORE20-005 | PASS | native control·status·no-autoplay·motion 전환·320~390px 정적 CSS 재검수 | Static A11y/Motion 통과 | Browser 실조작 필요 |
| IR-CORE20-006 | PASS | 2026-08-13 현재 변경에서 Vite·Storybook 통합 모두 exit 0 | 현재 전역 build 확인 | none |
| IR-CORE20-007 | 과거 PASS → 현재 NOT VERIFIED | 2026-08-04 결과를 현재 코드 변경의 browser 증거로 재사용하지 않음 | keyboard·motion·viewport·control 실조작 미확인 | 메인 에이전트가 통합 검수 |
| XPR-5P-FINAL | 과거 PASS | core04&lt;06&lt;08&lt;14&lt;20 identity, source owner, routes, terminology, shared API, motion, responsive CSS 교차 검수 | 이전 통합 gate 기록 | 현재 페이지 related route만 재확인 |
| CONTENT-CORE20-001 | BLOCK → ADDRESSED → PASS | 첫 화면의 official coverage ID와 페이지 코드 경로가 제작 workflow를 노출하고 `recipe`·`registry`가 반복됨 | 핵심 개념보다 제작 메타데이터와 비유가 먼저 보임 | 첫 화면은 학습 순서 nav와 직접적인 effect 함수 설명으로 수정하고, 예제 `sourcePath`는 runtime/display 추적 계약에 따라 유지 |
| PED-CORE20-001 | BLOCK → ADDRESSED → PASS | 공식 본문에 없는 `plugins`가 등록 표와 두 핵심 예제에 빈 문자열로 반복돼 default/override·Timeline 확장 질문을 흐림 | 한 예제가 한 질문에 답하지 못함 | `plugins`를 학습 catalog·표·두 예제 descriptor와 표시 코드에서 제거하고 source-only 제외 이유를 기록 |
| SYNC-CORE20-001 | BLOCK → ADDRESSED → PASS | 두 코드 패널은 `.notice`·`.card`를 표시했지만 runtime은 page-prefixed class selector를 실행 | 표시 코드를 복사하면 실행 대상이 달라짐 | 두 serializer가 runtime의 `targetClassName`을 사용하도록 수정 |
| OBS-CORE20-001 | BLOCK → ADDRESSED → PASS | Timeline 예제는 callback 세 번째 인자가 truthy이기만 하면 "parent 전달됨"으로 표시 | 다른 Timeline도 parent라고 오판할 수 있음 | callback이 받은 Timeline reference와 생성한 parent가 `===`일 때만 true로 기록 |

### verificationEvidence

- Audit target — route `/fundamentals/reusable-effects`, base commit `07c8558`, 대조일 2026-08-13.
- Official URLs — `https://gsap.com/docs/v3/GSAP/gsap.effects`, `https://gsap.com/docs/v3/GSAP/gsap.registerEffect()`.
- Source verification — 2026-08-13 두 canonical과 설치된 GSAP 3.15.0 source/type을 근거별로 대조했다.
- Coverage verification — catalog 공식 17개·implementation 4개, 고유 ID 21개와 meta section 합계 21이 일치한다.
- Runtime smoke probe — register 반환 `undefined`, direct 반환 Tween, target Array 정규화, duration override·defaults, extension parent 반환·third parent·position shorthand를 확인했다. 실제 예제 descriptor의 parent duration은 position `0`에서 1.50초, `+=0.25`에서 1.75초다.
- TypeScript — `npx tsc --noEmit` exit 0.
- 메인 통합 Build·Storybook — 2026-08-13 `npm run build` exit 0, `npm run build-storybook` exit 0.
- Route — `/fundamentals/reusable-effects` lazy import와 `트윈 구성` lesson 등록을 확인했다.
- Historical evidence — 2026-08-03~04 Local HTTP·independent review·cross-page review 결과는 과거 기록이며 현재 browser/build 증거로 재사용하지 않는다.
- Current route check — `/fundamentals/reusable-effects`와 related route 세 개가 현재 route registry에 존재한다.
- Scope — 이번 감사는 `src/content/gsap/fundamentals/reusable-effects/**`와 이 handoff만 변경했다.
- Tests — 프로젝트 정책에 따라 자동화 테스트 코드와 test runner를 추가하지 않았다.
- Browser 실조작 — 현재 검수에서는 실행하지 않아 `NOT VERIFIED`다. 두 예제의 모든 control·replay, 빠른 반복, route 복귀, keyboard, reduced motion, 320px·390px를 메인 에이전트가 확인한다.

### releaseDecision

`NOT VERIFIED` — 현재 정적 BLOCK은 모두 수정했고 메인 통합 build·Storybook도 통과했지만 브라우저 실조작은 `NOT VERIFIED`다.

## 2026-08-13 검증 기록 정정

- `npm run build`: `PASS` — 커밋된 HEAD에서 exit 0.
- Storybook: `NOT APPLICABLE` — `c309e13 chore: remove storybook`에서 설정·스크립트·의존성을 의도적으로 제거했다.
- 앞서 적힌 2026-08-13 `npm run build-storybook` 성공 주장은 현재 저장소와 맞지 않아 이 절로 정정한다.
- Browser: 저장소 소유자 승인으로 이번 완료 범위에서 제외했으며, 실제 브라우저 `PASS`를 주장하지 않는다.
