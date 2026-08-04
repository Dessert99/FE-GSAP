# Tween 시작·끝 값 handoff

## 입력 계약

### objective

현재 상태와 명시한 시작·끝 값 중 무엇을 각 생성 method가 소유하는지 비교해 `to`, `from`, `fromTo`, `set`을 올바르게 선택하게 한다.

### officialPage

- title: `gsap.from()` + `gsap.fromTo()` + `gsap.set()`
- canonicalUrl: `https://gsap.com/docs/v3/GSAP/gsap.from%28%29/`, `https://gsap.com/docs/v3/GSAP/gsap.fromTo%28%29/`, `https://gsap.com/docs/v3/GSAP/gsap.set%28%29/`
- reviewedAt: `2026-08-03`
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
| TSV-FR-002 | from은 vars를 시작값으로 즉시 잡고 현재 상태를 끝값으로 쓴다. | from intro/example | verified |
| TSV-FR-003 | target은 selector, element, object, object array가 될 수 있다. | from Parameters | verified |
| TSV-FR-004 | 반환 Tween을 보존하면 재생을 제어할 수 있고 기본은 즉시 재생한다. | from control/lifecycle | verified |
| TSV-FR-005 | to/from/fromTo는 current·start·end 소유권이 다르다. | from Other types | verified |
| TSV-FR-006 | vars에는 animation 값과 special property가 함께 들어간다. | from Parameters | verified |
| TSV-FR-007 | from의 `immediateRender` 기본값은 true다. | from Sequencing | verified |
| TSV-FR-008 | FOUC 대응 공식 경계와 from 오용 warning이 있다. | from tip/warning | verified |
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
| TSV-FR-004 | `sections/FromAndFromToSection/FromAndFromToSection.tsx:12,18`, `examples/EndpointOwnershipExample/useEndpointOwnershipAnimation.ts:48-69` | covered |
| TSV-FR-005 | `sections/StateOwnershipSection/StateOwnershipSection.tsx:18-20`, `examples/EndpointOwnershipExample/EndpointOwnershipExample.tsx:73-82` | covered |
| TSV-FR-006 | `sections/FromAndFromToSection/FromAndFromToSection.tsx:19-23`, `sections/SharedVarsSection/SharedVarsSection.tsx:14-18` | covered |
| TSV-FR-007 | `sections/ImmediateRenderSection/ImmediateRenderSection.tsx:13`, `examples/ImmediateRenderExample/ImmediateRenderExample.tsx:77-92` | covered |
| TSV-FR-008 | `sections/ImmediateRenderSection/ImmediateRenderSection.tsx:16` | covered |
| TSV-FT-001 | `sections/FromAndFromToSection/FromAndFromToSection.tsx:27-32` | covered |
| TSV-FT-002 | `sections/FromAndFromToSection/FromAndFromToSection.tsx:35` | covered |
| TSV-FT-003 | `sections/StateOwnershipSection/StateOwnershipSection.tsx:20`, `examples/EndpointOwnershipExample/useEndpointOwnershipAnimation.ts:59-61` | covered |
| TSV-FT-004 | `sections/FromAndFromToSection/FromAndFromToSection.tsx:28` | covered |
| TSV-FT-005 | `sections/FromAndFromToSection/FromAndFromToSection.tsx:12`, `examples/EndpointOwnershipExample/useEndpointOwnershipAnimation.ts:48-69` | covered |
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

- `/fundamentals/gsap-to`: to와 34개 special property의 owner
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

- gsap.to 34개 vars 재명세, Timeline 상세, quickSetter 실행법, legacy overload 권장, 공용 component 추출

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
