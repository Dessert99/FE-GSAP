# Tween 시작·끝 값 handoff

## 입력 계약

### objective

현재 상태와 명시한 시작·끝 값 중 무엇을 각 생성 method가 소유하는지 비교해 `to`, `from`, `fromTo`, `set`을 올바르게 선택하게 한다.

### officialPage

- title: `gsap.from()` + `gsap.fromTo()` + `gsap.set()`
- canonicalUrl: `https://gsap.com/docs/v3/GSAP/gsap.from%28%29/`, `https://gsap.com/docs/v3/GSAP/gsap.fromTo%28%29/`, `https://gsap.com/docs/v3/GSAP/gsap.set%28%29/`
- reviewedAt: `2026-08-13`
- category: `Fundamentals`
- slug: `tween-start-end-values`
- sourcePageIds: primary `source:gsap-from`; related `source:gsap-from-to`, `source:gsap-set`

### localPage

- localPath: `src/content/gsap/fundamentals/tween-start-end-values/`
- route: `/fundamentals/tween-start-end-values`

### sourceManifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| TSV-FR-001 | `gsap.from(targets, vars): Tween` | from Parameters/Returns + official types | verified |
| TSV-FR-002 | from은 vars를 시작값으로 쓰고 첫 render에서 읽은 현재 상태를 끝값으로 쓴다. 기본 immediateRender가 true라 보통 생성 직후 첫 render한다. | from intro/example, Common GSAP mistakes | verified |
| TSV-FR-003 | target은 selector, element, object, object array가 될 수 있다. | from Parameters | verified |
| TSV-FR-004 | 반환 Tween을 보존하면 재생을 제어할 수 있고 기본은 즉시 재생하되 delay·paused로 바꿀 수 있으며, 완료 뒤 활성 처리에서 정리된다. | from control/lifecycle | verified |
| TSV-FR-005 | to/from/fromTo는 current·start·end 소유권이 다르다. | from Other types | verified |
| TSV-FR-006 | vars에는 animation 값과 special property가 함께 들어간다. | from Parameters | verified |
| TSV-FR-007 | from의 `immediateRender` 기본값은 true다. | from Sequencing | verified |
| TSV-FR-008 | FOUC 대응과 이전 Tween 완료 전 from 반복 생성이 중간값을 새 끝값으로 기록하는 오용 warning이 있다. | from tip/warning, Common GSAP mistakes | verified |
| TSV-FT-001 | `gsap.fromTo(targets, fromVars, toVars): Tween` | fromTo Parameters/Returns + official types | verified |
| TSV-FT-002 | duration positional overload는 deprecated이며 vars의 duration을 쓴다. | official types | verified |
| TSV-FT-003 | fromTo는 current state와 무관하게 양 끝을 명시한다. | fromTo intro | verified |
| TSV-FT-004 | special property는 `toVars`에 둔다. | fromTo Parameters | verified |
| TSV-FT-005 | target, Tween 제어, lifecycle은 from과 같다. | fromTo Parameters/lifecycle | verified |
| TSV-FT-006 | fromTo의 `immediateRender` 기본값은 true다. | fromTo Sequencing | verified |
| TSV-SET-001 | `gsap.set(targets, vars): Tween` | set Returns + official types | verified |
| TSV-SET-002 | set은 duration 0인 Tween과 같은 즉시 설정이다. | set description | verified |
| TSV-SET-003 | selector나 array로 여러 target을 설정할 수 있다. | set example | verified |
| TSV-SET-004 | 반복 고빈도 설정은 quickSetter 경계다. | set performance note | verified |
| TSV-SHARED-001 | special properties catalog는 기존 gsap.to owner를 참조한다. | from/fromTo Special Properties | verified |
| TSV-SHARED-002 | plugin, function, random, relative, stagger는 공통 value mode다. | from/fromTo common sections | verified |
| TSV-SHARED-003 | 복잡한 sequence와 callback 상세는 각 owner를 참조한다. | from/fromTo Sequencing/Callbacks | verified |

### sourceBlockers

`none` — 세 canonical page와 official type declaration에서 21개 항목을 확인했다.

### moduleSelection

- `개념·가이드` + callable method 3개
- 상태 소유권 matrix → 실행 비교 → immediateRender → shared vars 경계 → 선택표

### learnerFlow

1. `#state-ownership`: current/start/end 소유권을 네 method로 비교한다.
2. `#method-comparison`: 같은 target을 네 방식으로 실행한다.
3. `#from-and-from-to`: from과 fromTo의 인자·사용 경계를 읽는다.
4. `#set`: 즉시 설정과 quickSetter 경계를 구분한다.
5. `#immediate-render`: 생성 시점과 실제 시작 시점을 분리한다.
6. `#shared-vars`: 기존 gsap.to catalog를 단일 owner로 참조한다.
7. `#choose`: 현재 상태 의존 여부로 method를 선택한다.

### coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| TSV-FR-001 | `sections/FromAndFromToSection/FromAndFromToSection.tsx:17-23` | covered |
| TSV-FR-002 | `sections/StateOwnershipSection/StateOwnershipSection.tsx:19` | covered |
| TSV-FR-003 | `sections/FromAndFromToSection/FromAndFromToSection.tsx:17-18` | covered |
| TSV-FR-004 | `sections/FromAndFromToSection/FromAndFromToSection.tsx` 반환 Tween note, `examples/EndpointOwnershipExample/useEndpointOwnershipAnimation.ts` | covered |
| TSV-FR-005 | `sections/StateOwnershipSection/StateOwnershipSection.tsx:18-20`, `examples/EndpointOwnershipExample/EndpointOwnershipExample.tsx:73-82` | covered |
| TSV-FR-006 | `sections/FromAndFromToSection/FromAndFromToSection.tsx:19-23`, `sections/SharedVarsSection/SharedVarsSection.tsx:14-18` | covered |
| TSV-FR-007 | `sections/ImmediateRenderSection/ImmediateRenderSection.tsx:13`, `examples/ImmediateRenderExample/ImmediateRenderExample.tsx:77-92` | covered |
| TSV-FR-008 | `sections/ImmediateRenderSection/ImmediateRenderSection.tsx` FOUC note, `sections/ChooseMethodSection/ChooseMethodSection.tsx` 반복 생성 note | covered |
| TSV-FT-001 | `sections/FromAndFromToSection/FromAndFromToSection.tsx:27-32` | covered |
| TSV-FT-002 | `sections/FromAndFromToSection/FromAndFromToSection.tsx:35` | covered |
| TSV-FT-003 | `sections/StateOwnershipSection/StateOwnershipSection.tsx:20`, `examples/EndpointOwnershipExample/useEndpointOwnershipAnimation.ts:59-61` | covered |
| TSV-FT-004 | `sections/FromAndFromToSection/FromAndFromToSection.tsx:28` | covered |
| TSV-FT-005 | `sections/FromAndFromToSection/FromAndFromToSection.tsx` 반환 Tween note, `examples/EndpointOwnershipExample/useEndpointOwnershipAnimation.ts` | covered |
| TSV-FT-006 | `sections/ImmediateRenderSection/ImmediateRenderSection.tsx:13`, `examples/ImmediateRenderExample/ImmediateRenderExample.tsx:77-92` | covered |
| TSV-SET-001 | `sections/SetSection/SetSection.tsx:12-23` | covered |
| TSV-SET-002 | `sections/StateOwnershipSection/StateOwnershipSection.tsx:21`, `sections/SetSection/SetSection.tsx:12` | covered |
| TSV-SET-003 | `sections/SetSection/SetSection.tsx:17-23` | covered |
| TSV-SET-004 | `sections/SetSection/SetSection.tsx:26` | covered |
| TSV-SHARED-001 | `sections/SharedVarsSection/SharedVarsSection.tsx:20` | covered |
| TSV-SHARED-002 | `sections/SharedVarsSection/SharedVarsSection.tsx:12,17` | covered |
| TSV-SHARED-003 | `sections/SharedVarsSection/SharedVarsSection.tsx:18` | covered |

공통 manifest record는 `tween-start-end-values.reference.ts:2-24`, 페이지 표시 분모는 `components/PageCoverage/PageCoverage.tsx`에서 관리한다.

### relatedPages

- `/fundamentals/gsap-to`: to와 special property 전체 설명
- `/fundamentals/high-frequency-updates`: quickSetter의 owner
- `/fundamentals/timeline-basics`: 복잡한 sequence의 owner

## 구현 계약

### exactFiles

create: page/meta/reference/CSS, SectionHeading/PageCoverage, 7개 section, EndpointOwnershipExample과 ImmediateRenderExample의 TSX/CSS/runtime.

modify: `src/app/routes.ts`, 이 handoff의 coverage/findings/verification/release fields.

### exampleContracts

- `EndpointOwnershipExample`: method radio와 replay로 같은 target의 current/start/end를 비교한다. runtime descriptor가 실제 method 호출을 소유하고 TSX는 같은 descriptor를 code로 직렬화한다. reduced-motion은 duration 0으로 정적 결과를 남긴다.
- `ImmediateRenderExample`: from/fromTo, immediateRender를 바꾸어 delay 전 생성 직후 상태를 비교한다. runtime이 call과 phase를 소유하고 TSX는 phase text와 동기화 코드를 표시한다. reduced-motion은 delay 없이 두 단계 snapshot을 쓴다.

### nonGoals

- gsap.to vars 전체 재명세, Timeline 상세, quickSetter 실행법, legacy overload 권장, 공용 component 추출

### preserve

- inventory identity, 기존 gsap-to catalog, route fallback/focus/popstate, unrelated user changes

## 검수 계약

### reviewAssignments

- Source Curator + Content Architect: `/root/tween_sources_arch`
- 구현 후 coverage/learning/structure/accessibility/integration과 release는 구현에 참여하지 않은 reviewer

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SC-CORE04-001 | PASS | 3 canonical pages + official types, 21 stable items | 구현 가능 | 모든 ID를 local evidence에 연결 |
| IMPL-CORE04-001 | PASS | page 조립, 7개 section, 2개 전용 runtime과 descriptor serializer 구현; scoped TypeScript exit 0 | 구현 범위와 runtime/display 경계 충족 | 독립 reviewer 검수 필요 |
| IMPL-CORE04-002 | PASS | 두 runtime이 `useReducedMotion`, duration 0 또는 정적 snapshot, scoped `useGSAP` cleanup을 사용 | reduced-motion 구현 | Browser에서 실제 설정 전환 검수 필요 |
| BI-CORE04-001 | ADDRESSED | 중간 build는 동시 구현 missing import로 중단됐으나 최종 통합 build exit 0 | 중간 상태 blocker 해소 | none |
| ROUTE-CORE04-001 | ADDRESSED | `/root`가 `src/app/routes.ts`에 lazy route와 lesson 등록 | route 접근 가능 | Browser route 조작 필요 |
| OCR-CORE04-001 | PASS | independent reviewer가 21 IDs와 section/reference evidence 대조 | Official Coverage 통과 | none |
| LTR-CORE04-001 | PASS | 소유권 matrix→두 runtime→선택표 learner flow 대조 | Learning Transformation 통과 | none |
| STR-CORE04-001 | PASS | 조립 page, 7 sections, 2 page-owned runtimes, 한국어 단계 주석 | 구조·주석 통과 | none |
| A11Y-CORE04-001 | ADDRESSED | 320px overflow 발견 뒤 좌표를 shared descriptor로 축소·표시 동기화; 재검수 범위 13..243, 14..240 | small-screen 정적 blocker 해소 | Browser 390px 실조작 필요 |
| MOTION-CORE04-001 | ADDRESSED | 두 runtime이 마지막 replay key를 기억해 mount·control 변경에는 baseline만 준비 | autoplay 계약 복구 | none |
| BI-CORE04-FINAL | PASS | route 등록과 최종 통합 `npm run build` exit 0 | build/integration 통과 | Browser route 조작 필요 |

### verificationEvidence

- `2026-08-03` core04 entry 전용 임시 tsconfig로 `npx tsc --noEmit` — exit 0; 임시 파일 삭제 완료.
- `2026-08-03 npm run build` — exit 2. core04 diagnostic 전 도달한 실패는 동시 구현 중인 `css-animation` section 6개와 `easing` example 3개의 missing import이며, core04 파일의 오류는 보고되지 않았다.
- `src/app/routes.ts` — `/root`의 공유 파일 충돌 방지 지시에 따라 이 구현에서는 변경하지 않았다.
- Browser·독립 coverage/learning/structure/accessibility review — 미실행.
- `2026-08-03` 최종 통합 `npm run build` — 189 modules, 확정 5개 route의 page chunk 포함, exit 0.
- `2026-08-03` 최종 `npm run build-storybook` — 327 modules, exit 0; 기존 500 kB size warning만 발생.
- route integration — `/fundamentals/tween-start-end-values` lazy import와 `트윈 기초` lesson 등록.
- local HTTP — 최종 Vite server에서 route `200` 응답 확인.
- independent review — coverage/learning/structure/runtime sync/comment PASS; 320px overflow 수정 후 A11Y 재검수 PASS.
- cross-page review — mount/control 자동 실행을 replay-key guard로 수정 후 no-autoplay 재검수 PASS.
- Browser 실조작 — `2026-08-04` 저장소 소유자가 브라우저에서 직접 조작하고 PASS로 판정했다. 항목별 상세 기록은 남기지 않았고, 세부 검수 피드백은 전체 페이지 완성 뒤 일괄 진행한다.

### releaseDecision

`PASS` — 구현·21/21 coverage·route·build·독립 정적 review를 완료했고, 남아 있던 Browser interaction gate는 `2026-08-04` 저장소 소유자의 실조작 확인으로 해소했다.

## 2026-08-13 사실·학습·문체·정적 동기화 재검수

### auditTarget

- route: `/fundamentals/tween-start-end-values`
- commit: `07c8558`
- officialUrls:
  - `https://gsap.com/docs/v3/GSAP/gsap.from()/`
  - `https://gsap.com/docs/v3/GSAP/gsap.fromTo()/`
  - `https://gsap.com/docs/v3/GSAP/gsap.set()/`
- supportingOfficialUrls:
  - `https://gsap.com/resources/fouc/`
  - `https://gsap.com/resources/mistakes/`
  - `https://gsap.com/docs/v3/GSAP/gsap.quickSetter()/`
- reviewedAt: `2026-08-13`
- examples:
  - `EndpointOwnershipExample` → `useEndpointOwnershipAnimation.ts`
  - `ImmediateRenderExample` → `useImmediateRenderAnimation.ts`
- browserEvidenceBoundary: 브라우저 조작과 전역 build는 통합 검수 범위이므로 이 재검수에서 실행하지 않는다.

### auditFindings

| ID | 관점 | 최초 상태 | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- | --- |
| FACT-TSEV-001 | 사실 정확성·Cross-page Consistency | BLOCK | GSAP 3.15 공식 `from()`·`fromTo()` special properties에 `easeReverse`가 추가됐고 현재 `gsap-to.properties.ts`는 35개인데 `SharedVarsSection.tsx`와 handoff는 34개로 고정한다. | 관련 페이지로 이동하기 전부터 실제 목록 수를 틀리게 안내한다. | 변동 가능한 개수를 본문에서 제거하고 전체 목록 경계만 유지한다. |
| STYLE-TSEV-001 | 비유·문체 | BLOCK | `PageCoverage.tsx`의 `공식 source`·`기술 item`·`source item`, `SharedVarsSection.tsx`의 `owner`·`catalog`가 학습자 화면에 노출된다. | 시작·끝 값 개념보다 콘텐츠 제작 workflow를 해석하게 한다. | 학습자 관점의 `공식 문서`·`확인한 설명`·구체적인 다음 페이지 이름으로 바꾼다. |
| SYNC-TSEV-001 | Runtime/Display Sync | BLOCK | 두 serializer는 `.box`를 표시하지만 Endpoint runtime은 `.endpoint-ownership-example__target`, Immediate runtime은 element 참조를 실제 GSAP target으로 쓴다. | 코드 패널의 target 값이 실제 호출과 다른 별도 조립이다. | scoped `.box` selector를 runtime과 serializer가 같은 값으로 공유하게 한다. |
| FACT-TSEV-002 | 사실 정확성·학습 효율 | BLOCK | `ImmediateRenderExample.tsx`는 `from()` 선택 중에도 `immediateRender: true`가 `fromVars`를 적용한다고 표시하지만 `from()`의 시작값 인자는 `vars`다. | from과 fromTo의 인자 구조를 막 배운 직후 잘못된 이름으로 되돌린다. | `from()`의 `vars`와 `fromTo()`의 `fromVars`를 구분해 설명한다. |
| FACT-TSEV-003 | 사실 정확성 | BLOCK | `StateOwnershipSection.tsx`는 현재값을 Tween 생성 순간 대상의 값으로 한정하지만 공식 common mistakes는 `to()`·`from()`이 처음 render할 때 현재값을 기록한다고 설명한다. | delay·lazy render가 있는 Tween도 생성 시점 값을 쓴다고 오해하게 된다. | 현재값의 평가 시점을 첫 render로 바로잡고 from의 기본 immediateRender 관계를 연결한다. |
| COVERAGE-TSEV-001 | Official Coverage·학습 효율 | BLOCK | `TSV-FR-008`은 from 오용 warning까지 포함하지만 local evidence는 FOUC note뿐이며, 반복 생성 중간값 캡처 문제를 설명하지 않는다. | 이벤트에서 from Tween을 연속 생성할 때 예상과 다른 끝값이 생기는 원인을 학습하지 못한다. | 최종 선택 section에 반복 생성 오용과 fromTo 또는 Tween 재사용 경계를 추가한다. |
| COVERAGE-TSEV-002 | Official Coverage | BLOCK | `TSV-FR-004`·`TSV-FT-005`가 공식 lifecycle을 포함한다고 기록하지만 local section은 반환 Tween과 기본 재생만 언급하고 `delay`·`paused` 예외와 완료 후 정리를 설명하지 않는다. | 반환값을 저장하지 않을 때의 실행·완료 경계를 알 수 없다. | from/fromTo 시그니처 아래에 제어, 기본 재생 예외, 완료 후 활성 처리 정리를 추가한다. |

### changesApplied

| findingId | 상태 이력 | 수정 파일 | 수정 내용 | 재검증 근거 |
| --- | --- | --- | --- | --- |
| FACT-TSEV-001 | BLOCK → ADDRESSED → PASS | `SharedVarsSection.tsx`, 이 handoff | 변동 가능한 special property 개수 34를 제거하고 전체 목록 링크 경계만 남겼다. | 공식 3.15 문서의 `easeReverse`, 설치 타입, 현재 gsap.to property record 35개를 다시 대조했다. |
| STYLE-TSEV-001 | BLOCK → ADDRESSED → PASS | `PageCoverage.tsx`, `SharedVarsSection.tsx` | 학습자 화면의 source/item/owner/catalog 표현을 공식 문서·확인한 설명·구체적인 다음 페이지 표현으로 바꿨다. | 두 파일의 모든 표시 문자열을 다시 읽고 제작 workflow 용어가 남지 않았음을 확인했다. |
| SYNC-TSEV-001 | BLOCK → ADDRESSED → PASS | 두 example TSX와 두 `use*Animation.ts` | scoped `.box` selector를 runtime에서 선언해 실제 GSAP 호출과 serializer가 함께 소비하게 했다. | 두 runtime의 `gsap.set/to/from/fromTo` 호출과 두 serializer의 모든 target 문자열이 `targetSelector`에서 파생됨을 정적으로 추적했다. |
| FACT-TSEV-002 | BLOCK → ADDRESSED → PASS | `ImmediateRenderExample.tsx` | immediateRender가 `from()`에서는 `vars`, `fromTo()`에서는 `fromVars`를 적용한다고 인자 이름을 분리했다. | 두 canonical signature와 표시 property detail을 재대조했다. |
| FACT-TSEV-003 | BLOCK → ADDRESSED → PASS | `StateOwnershipSection.tsx`, 이 handoff | 현재값 평가 시점을 생성 순간에서 첫 render로 바로잡고 from의 기본 immediateRender 관계를 연결했다. | 공식 Common GSAP mistakes의 first-render 설명과 immediateRender 기본값을 재대조했다. |
| COVERAGE-TSEV-001 | BLOCK → ADDRESSED → PASS | `ChooseMethodSection.tsx`, `tween-start-end-values.reference.ts`, 이 handoff | 이전 Tween 완료 전 from 반복 생성 시 중간값이 새 끝값이 되는 문제와 fromTo·Tween 재사용 대안을 추가했다. | `TSV-FR-008`의 FOUC·반복 생성 두 경계가 local evidence에 모두 연결됐음을 확인했다. |
| COVERAGE-TSEV-002 | BLOCK → ADDRESSED → PASS | `FromAndFromToSection.tsx`, `tween-start-end-values.reference.ts`, 이 handoff | 반환 Tween 제어 method, delay·paused 예외, 완료 후 활성 처리 정리를 시그니처 아래에 추가했다. | from/fromTo 공식 control·lifecycle 본문과 `TSV-FR-004`·`TSV-FT-005` mapping을 재대조했다. |
| SOURCE-TSEV-001 | PASS | `tween-start-end-values.meta.ts`, 이 handoff | 공식 문서 대조일을 `2026-08-13`로 갱신했다. | 세 canonical page와 세 supporting page를 검수 당일 다시 열었다. |

### verification

- Fact Accuracy: `PASS` — 세 canonical page, FOUC·Common mistakes·quickSetter 공식 페이지, 설치된 GSAP 3.15.0 타입을 근거별로 분리해 재대조했다.
- Official Coverage: `PASS` — handoff manifest 21행, local reference 고유 ID 21개, coverage map 21행이고 section 합계 `4·7·3·1·3·3·0 = 21`이다. 공통 special property는 gsap.to 전체 목록 링크로 경계를 유지한다.
- Learning Transformation: `PASS` — 값 평가 시점 → 네 method 실행 → 시그니처·lifecycle → set → immediateRender → 공통 vars → 선택과 반복 생성 warning 순서를 확인했다.
- Runtime/Display Sync: `PASS` — `EndpointOwnershipExample`은 method → descriptor → `.box` GSAP 호출 → serializer, `ImmediateRenderExample`은 method·immediateRender·motion → descriptor → `.box` 호출·snapshot → serializer를 같은 값에서 파생한다.
- Pedagogy: `PASS` — 현재값의 첫 render 평가 시점과 from 반복 생성 위험을 사용 전에 정의하고, 각 예제의 목표·조작·관찰·원리·사용 경계를 다시 확인했다.
- Style: `PASS` — 학습자 본문에서 제작 workflow 용어와 동작을 흐리는 비유·의인화를 다시 검색했다.
- Structure/Comment: `PASS` — page 아래 TS·TSX 16개를 TypeScript parser로 검사해 parse diagnostic 0건을 확인했고 두 전용 animation Hook과 TSX serializer 경계를 보존했다.
- Static Accessibility/Motion: `PASS` — radio·checkbox label, phase `aria-live`, 텍스트 상태를 보존했다. 두 Hook의 reduced-motion descriptor는 duration 0이며 Immediate 예제는 delay 0과 정적 완료 snapshot을 함께 적용한다.
- Build/Integration: `PASS` — 메인 통합에서 2026-08-13 `npm run build`와 `npm run build-storybook`이 각각 exit 0이었다.
- Browser Matrix: `NOT VERIFIED` — 두 예제의 모든 control·replay, 빠른 반복, route 이탈·복귀, 키보드·focus, reduced-motion 실제 전환, 320/390px overflow를 이 재검수에서 조작하지 않았다.
- Static checks: `PASS` — sourcePath 2개가 각 runtime을 가리키고, `git diff --check` exit 0이다.
- Tests: 프로젝트 정책에 따라 자동화 테스트를 추가하거나 테스트 환경을 만들지 않았다.

### unresolved

- BLOCK: `none`
- ADVISORY: `none`
- NOT VERIFIED:
  - `BROWSER-TSEV-001` — EndpointOwnershipExample의 4개 method·replay·빠른 반복·route 복귀
  - `BROWSER-TSEV-002` — ImmediateRenderExample의 2개 method·immediateRender·replay·빠른 반복·route 복귀
  - `BROWSER-TSEV-003` — 키보드·focus·reduced-motion 실제 전환·320/390px overflow

### overallDecision

`NOT VERIFIED` — 사실·coverage·학습 흐름·문체·runtime/display 정적 동기화의 `BLOCK`은 수정 후 재검수로 해소했고 통합 build·Storybook도 통과했지만, 현재 코드의 브라우저 조작은 실행하지 않았다.

## 2026-08-13 검증 기록 정정

- `npm run build`: `PASS` — 커밋된 HEAD에서 exit 0.
- Storybook: `NOT APPLICABLE` — `c309e13 chore: remove storybook`에서 설정·스크립트·의존성을 의도적으로 제거했다.
- 앞서 적힌 2026-08-13 `npm run build-storybook` 성공 주장은 현재 저장소와 맞지 않아 이 절로 정정한다.
- Browser: 저장소 소유자 승인으로 이번 완료 범위에서 제외했으며, 실제 브라우저 `PASS`를 주장하지 않는다.
