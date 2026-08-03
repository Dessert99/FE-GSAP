# Reusable effects handoff

## 입력 계약

### objective

반복되는 animation recipe를 `registerEffect()`로 중앙 등록하고 direct call과 Timeline extension 중 알맞은 재사용 방식을 선택하게 한다.

### officialPage

- title: `gsap.effects + gsap.registerEffect()`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/gsap.effects`
  - `https://gsap.com/docs/v3/GSAP/gsap.registerEffect()`
- reviewedAt: `2026-08-03`
- category: `Fundamentals > GSAP`
- slug: `reusable-effects`
- sourcePageIds: primary `source:gsap-effects`; related `source:gsap-register-effect`

### localPage

- localPath: `src/content/gsap/fundamentals/reusable-effects/`
- route: `/fundamentals/reusable-effects`

### sourceManifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| RE-EFFECTS-TYPE | `gsap.effects`는 등록된 effect를 보관하는 object다. | `source:gsap-effects` 본문, `src/gsap-core.js` effects registry | verified |
| RE-EFFECTS-NAMED-ACCESS | 등록 name으로 `gsap.effects[name](targets, config?)`를 호출한다. | `source:gsap-effects` 본문·예제 | verified |
| RE-EFFECTS-DIRECT-RETURN | direct 호출은 effect callback의 반환값을 그대로 돌려준다. | `src/gsap-core.js` registerEffect wrapper | verified |
| RE-REGISTER-SHAPE | runtime config는 `{ name, effect, plugins, defaults, extendTimeline }`이고 `registerEffect()` 반환은 void다. | `source:gsap-register-effect`, `types/gsap-core.d.ts` | verified |
| RE-REGISTER-NAME | name은 registry key이며 확장 시 Timeline prototype method 이름이다. | `source:gsap-register-effect`, `src/gsap-core.js` | verified |
| RE-REGISTER-EFFECT | callback은 정규화 targets·defaults가 적용된 config·호출 Timeline을 받는다. | `source:gsap-register-effect`, `src/gsap-core.js` | verified |
| RE-REGISTER-TARGETS | selector·target·group은 callback 전에 target array로 정규화된다. | `src/gsap-core.js` `toArray()` wrapper | verified |
| RE-REGISTER-CONFIG | 호출 때마다 config가 callback에 전달된다. | `source:gsap-register-effect` 본문 | verified |
| RE-REGISTER-DEFAULTS | defaults는 빠진 key에 매 호출 적용되고 명시한 호출값이 우선한다. | `source:gsap-register-effect`, runtime probe | verified |
| RE-REGISTER-PLUGINS | comma-separated plugins의 미등록 이름은 경고한다. | `source:gsap-register-effect`, `src/gsap-core.js` | verified |
| RE-REGISTER-CENTRAL | effect는 중앙 registry에 등록되어 새 targets/config로 재사용된다. | 두 canonical source 본문 | verified |
| RE-EXTEND-OPTION | `extendTimeline: true`면 Timeline prototype에 동명 method를 추가한다. | `source:gsap-register-effect`, `src/gsap-core.js` | verified |
| RE-TIMELINE-SIGNATURE | 확장 method는 `(targets, vars?, position?)` 형태로 호출한다. | `src/gsap-core.js` Timeline extension | verified |
| RE-TIMELINE-ADD | 확장 method는 effect 반환 animation을 `timeline.add(..., position)`으로 삽입한다. | `src/gsap-core.js` Timeline extension | verified |
| RE-TIMELINE-RETURN | 확장 호출은 parent Timeline을 반환해 chaining한다. | `src/gsap-core.js`, runtime probe | verified |
| RE-TIMELINE-CONTEXT | callback의 세 번째 인자는 호출한 parent Timeline이다. | `src/gsap-core.js`, runtime probe | verified |
| RE-TIMELINE-POSITION-SHORTHAND | 두 번째 인자가 object가 아니면 config 대신 position으로 취급하고 defaults를 쓴다. | `src/gsap-core.js` Timeline extension | verified |
| RE-EXTEND-RETURN-WARNING | 확장 effect는 Timeline에 넣을 Tween 또는 Timeline을 반환해야 한다. | `source:gsap-register-effect` warning | verified |
| RE-NONEXTEND-ADD | 확장 없이도 `tl.add(gsap.effects[name](...), position)`으로 삽입한다. | `source:gsap-register-effect` 설명 | verified |
| RE-OFFICIAL-FADE | 공식 fade recipe는 duration 기본값 2, direct override, Timeline chaining·position을 보여준다. | `source:gsap-register-effect` 예제 | verified |
| RE-EFFECTS-PORTABLE | 등록 recipe는 targets와 config를 바꿔 프로젝트 안팎에서 재사용할 수 있다. | `source:gsap-effects` 본문 | verified |

### sourceBlockers

`none` — 두 canonical source 전체 기술 본문과 GSAP 3.15.0 `src/gsap-core.js`, `types/gsap-core.d.ts`, Node runtime probe가 21개 항목에서 일치한다.

### moduleSelection

- concept guide + callable method + Timeline integration

### learnerFlow

1. `#mental-model`: effect는 완성 animation이 아니라 targets와 config를 받는 recipe
2. `#register-contract`: name/effect/defaults/plugins/extendTimeline/return
3. `#direct-call`: registry·target array·default override
4. `#registered-example`: direct 실행과 관찰
5. `#timeline-extension`: prototype method·position·third Timeline·반환 animation warning
6. `#boundaries`: 확장 없는 `tl.add`, naming/global registry 경계, related pages

### coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| RE-EFFECTS-TYPE | `reusable-effects.catalog.ts`, `DirectCallSection.tsx` registry 설명 | covered |
| RE-EFFECTS-NAMED-ACCESS | `DirectCallSection.tsx`, `RegisteredEffectExample.tsx` direct call code | covered |
| RE-EFFECTS-DIRECT-RETURN | `RegisteredEffectExample.tsx` direct 반환 관찰, `useRegisteredEffectAnimation.ts` Tween data | covered |
| RE-REGISTER-SHAPE | `RegisterContractSection.tsx` config table·void code | covered |
| RE-REGISTER-NAME | `RegisterContractSection.tsx` name row, 두 runtime의 page-prefixed registration | covered |
| RE-REGISTER-EFFECT | `RegisterContractSection.tsx` callback 계약, 두 runtime callback | covered |
| RE-REGISTER-TARGETS | `DirectCallSection.tsx`, `RegisteredEffectExample.tsx` Array target count | covered |
| RE-REGISTER-CONFIG | `RegisterContractSection.tsx`, `RegisteredEffectExample.tsx` call config code | covered |
| RE-REGISTER-DEFAULTS | `RegisteredEffectExample.tsx`, `useRegisteredEffectAnimation.ts` 2초/0.8초 관찰 | covered |
| RE-REGISTER-PLUGINS | `RegisterContractSection.tsx` plugins warning row | covered |
| RE-REGISTER-CENTRAL | `EffectMentalModelSection.tsx` recipe flow | covered |
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
- `/fundamentals/easing`: recipe config로 바꿀 ease

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

- `RegisteredEffectExample`: page-prefixed effect를 direct 호출하고 default/override duration radio와 replay로 정규화 targets·config를 관찰한다. module-scope registration descriptor와 실제 runtime, 표시 serializer를 공유하며 autoplay하지 않는다.
- `TimelineEffectExample`: `extendTimeline` effect와 후속 Tween의 parent sequence를 position `0`/`+=0.25`와 replay로 비교한다. callback의 third Timeline과 반환 animation, parent chaining을 같은 descriptor에서 관찰하며 autoplay하지 않는다.
- 두 예제 모두 native label·fieldset/select·output·button을 쓴다. RegisteredEffect는 2초/0.8초 학습 descriptor를 유지한 채 reduced-motion 실행에서 playhead를 즉시 끝으로 옮기고, TimelineEffect는 effective duration 0·무반복 descriptor로 최종 상태를 보여준다.

### nonGoals

- generic effect abstraction/shared registry helper, unregister API 주장, plugin 설치법, Timeline 전체 API, registerPlugin, cross-page component, test file, autoplay/multi-target showcase

### preserve

- inventory identity/owner order, existing routes/shared API, unrelated changes, example별 독립 runtime, runtime-display single descriptor, global collision을 피하는 page-prefixed effect name

## 검수 계약

### reviewAssignments

- Source Curator + Content Architect: `/root/replacement_source_arch`
- Implementer: 별도 담당
- Independent Reviewer + release: 구현에 참여하지 않은 reviewer

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SC-CORE20-001 | PASS | canonical docs 2개·GSAP 3.15 source/type·runtime probe에서 21개 stable item 일치 | blocker 없이 구현 가능 | 모든 ID를 local evidence에 연결 |
| IMPL-CORE20-001 | PASS | `ReusableEffectsPage.tsx:24-30`, catalog 21개 item, exact create 18개 파일 | 6단계 학습 flow와 두 독립 runtime 구현 | 독립 검수 요청 |
| IMPL-CORE20-002 | PASS | `useRegisteredEffectAnimation.ts:22-115`, `RegisteredEffectExample.tsx` | page-prefixed direct effect, defaults/override, normalized targets, paused replay 동기화 | 브라우저 control 확인 |
| IMPL-CORE20-003 | PASS | `useTimelineEffectAnimation.ts:26-127`, `TimelineEffectExample.tsx` | extendTimeline position, third Timeline, animation/parent 반환, chaining, paused replay 동기화 | 브라우저 control 확인 |
| BUILD-CORE20-001 | PASS | `npm run build` exit 0, 2026-08-03, page CSS·JS chunk 생성 | TypeScript·Vite 통합 build 통과 | 브라우저 확인 |
| IR-CORE20-001 | PASS | 21개 고유 ID와 per-ID covered evidence 재검수 | Official Coverage 통과 | none |
| IR-CORE20-002 | PASS | mental model부터 boundaries까지 6단계 flow 재검수 | Learning Transformation 통과 | none |
| IR-CORE20-003 | PASS | defaults mutation 복사 격리, direct 2/0.8, Timeline context·parent·position probe | Runtime/Display 통과 | none |
| IR-CORE20-004 | PASS | 조립 page·section·example/runtime 소유권과 한국어 단계 주석 재검수 | Structure/Comments 통과 | none |
| IR-CORE20-005 | PASS | native control·status·no-autoplay·motion 전환·320~390px 정적 CSS 재검수 | Static A11y/Motion 통과 | Browser 실조작 필요 |
| IR-CORE20-006 | PASS | route, build 189 modules, Storybook 327 modules, diff check | Build/Integration 통과 | none |
| IR-CORE20-007 | BLOCK | 연결된 Browser 없음 | 실제 keyboard·motion·viewport evidence 부재 | Browser 연결 후 실조작 |
| XPR-5P-FINAL | PASS | core04&lt;06&lt;08&lt;14&lt;20 identity, source owner, routes, terminology, shared API, motion, responsive CSS 교차 검수 | 5페이지 정적 통합 gate 통과 | Browser gate만 남음 |

### verificationEvidence

- Source verification — official docs, installed GSAP source/type, runtime probe가 일치했다.
- Coverage verification — `reusable-effects.catalog.ts`의 고유 ID 21개와 `reusable-effects.meta.ts` section item 합계 21개가 일치한다.
- Runtime smoke probe — direct effect가 Tween·1개 normalized target·default duration 2를 반환하고, Timeline extension이 parent·third Timeline context를 유지하며 `+=0.25`에서 1.05초가 됨을 확인했다.
- Build — `npm run build` exit 0 (`tsc && vite build`, 189 modules transformed, `ReusableEffectsPage` CSS·JS chunk 생성).
- Storybook — `npm run build-storybook` exit 0, 327 modules transformed; 기존 500 kB size warning만 발생.
- Route — `/fundamentals/reusable-effects` lazy import와 `트윈 구성` lesson 등록을 확인했다.
- Local HTTP — 최종 Vite server에서 확정 5개 route 모두 `200` 응답을 확인했다.
- Independent review — IR-CORE20-001~006 PASS; Critical·Important·Minor code finding 없음.
- Cross-page review — 확정 5페이지 identity/order·source owner·공유 API·motion·responsive static gate PASS.
- Scope — 구현 담당은 exact create 18개 파일과 handoff만 변경했고, 공유 `src/app/routes.ts`는 `/root`가 통합했다.
- Tests — 프로젝트 정책에 따라 자동화 테스트 코드와 test runner를 추가하지 않았다.
- Browser discovery — 연결된 in-app Browser가 없어 실조작은 미실행이다.

### releaseDecision

`BLOCK` — source coverage·구현·route·build·Storybook·독립 및 교차 정적 검수는 통과했다. 연결 가능한 Browser가 없어 keyboard·control·reduced-motion 전환·320/390px 실조작만 남았다.
