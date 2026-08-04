# Non-CSS target values handoff

## 입력 계약

### objective

CSS property가 아닌 값 — DOM/SVG element의 numeric attribute와 numeric Array의 각 index — 을 GSAP이 어떻게 보간하는지를 "이 값을 `vars`의 어느 자리에 적어야 하나"라는 하나의 선택 질문으로 재구성한다. AttrPlugin과 EndArrayPlugin은 둘 다 core에 이미 들어 있는 internal plugin이므로 등록 절차가 아니라 **값이 갈 채널(channel)을 고르는 문법**으로 가르친다.

### officialPage

- title: `Attributes` + `EndArray`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/CorePlugins/Attributes`
  - `https://gsap.com/docs/v3/GSAP/CorePlugins/EndArray`
- reviewedAt: `2026-08-04`
- category: `GSAP > Internal Plugins`
- slug: `non-css-target-values`
- sourcePageIds: primary `source:attributes`; related `source:end-array`

두 공식 페이지 모두 signature block, parameter 표, 기본값 표, 반환값 절이 **없다**. Attributes의 heading은 `Attributes` / `Description` / `Animating CSS` 셋뿐이고, EndArray는 설명 문단·예제·caveat 한 줄로 끝난다. 게시되지 않은 명세를 기억이나 TypeScript 선언으로 채우지 않는다. 해당 칸은 `공식 페이지에 명시 없음`으로 표시한다.

### localPage

- localPath: `src/content/gsap/fundamentals/non-css-target-values/`
- route: `/fundamentals/non-css-target-values`

### sourceManifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| ATTR-01 | AttrPlugin은 internal plugin이라 GSAP core에 자동 포함되며 `gsap.registerPlugin()`으로 불러올 필요가 없다. | `source:attributes` intro | verified |
| ATTR-02 | GSAP은 DOM element의 numeric attribute를 tween할 수 있다. | `source:attributes` Description | verified |
| ATTR-03 | attribute 이름과 목표값은 중첩된 `attr: {}` 객체 안에 property 이름으로 적는다. | `source:attributes` Description 예제 | verified |
| ATTR-04 | 동시에 tween할 수 있는 attribute 개수에 제한이 없다. | `source:attributes` Description — "You can tween an unlimited number of attributes simultaneously." | verified |
| ATTR-05 | `%` 같은 suffix를 유지하므로 `<rect width="50%">` 같은 값도 tween할 수 있다. | `source:attributes` Description | verified |
| ATTR-06 | attribute tween은 단위 변환을 하지 않는다(`px`→`%` 불가). | `source:attributes` Description caveat | verified |
| ATTR-07 | 공식 예제는 `<rect id="rect" fill="none" x="0" y="0" width="500" height="400"></rect>`에 대해 `duration: 1`, `attr: { x: 100, y: 50, width: 100, height: 100 }`, `ease: "none"`, 그리고 `attr` 밖의 `x: 200`을 함께 지정한다. | `source:attributes` Description 예제 | verified |
| ATTR-08 | CSS 관련 property를 `attr` 객체 안에서 animate하려 하면 안 된다. GSAP이 CSS를 내부적으로 다르게 처리하기 때문이다. | `source:attributes` Animating CSS | verified |
| ATTR-09 | 같은 이름이라도 `attr` 밖의 `x`는 CSS transform을, `attr` 안의 `x`는 rect element의 기하 좌표를 animate한다. | `source:attributes` Animating CSS | verified |
| ARR-01 | EndArrayPlugin은 internal plugin이라 GSAP core에 자동 포함되며 `gsap.registerPlugin()`으로 불러올 필요가 없다. | `source:end-array` intro | verified |
| ARR-02 | numeric 값 Array를 다른 numeric 값 Array로 tween한다. | `source:end-array` 설명 | verified |
| ARR-03 | numeric Array 자체가 `gsap.to()`의 target이고, 목적지 Array는 `endArray` property로 넘긴다. | `source:end-array` 공식 예제 | verified |
| ARR-04 | 값이 목적지 Array로 향하는 동안 easing이 적용된다. | `source:end-array` 설명 — "with easing applied" | verified |
| ARR-05 | 공식 예제는 `const arr = [1, 2, 3]`에서 `endArray: [5, 6, 7]`로 tween하며 `onUpdate()`에서 같은 `arr`를 로그해 값이 제자리에서 바뀌는 것을 보여준다. | `source:end-array` 공식 예제 | verified |
| ARR-06 | 두 Array의 길이가 다르면 양쪽 모두에 존재하는 index만 animate된다. | `source:end-array` 마지막 caveat | verified |

### sourceBlockers

`none`. 15개 기술 item 전부 2026-08-04에 공식 페이지 원문으로 직접 확인했다.

다음은 두 공식 페이지가 **게시하지 않은** 내용이므로 주장하지 않는다. 필요해지면 `blocked-source` item을 추가하고 release를 `BLOCK`한다.

- 형식 signature, 인자 표, 기본값 표, 반환값
- 브라우저·버전 지원 표
- 길이가 다를 때 짝이 없는 index가 어떻게 되는지 (양쪽에 있는 index만 animate된다는 사실만 게시됨)
- sparse Array, typed Array, 중첩 Array, 숫자가 아닌 값의 처리
- attribute 값의 문자열 강제 변환 규칙

### moduleSelection

| module | 목적 | 근거 source |
| --- | --- | --- |
| plugin (`PL`) | 두 internal plugin이 자동 포함이라 등록이 필요 없다는 것과, 각자 선택하는 채널이 다르다는 것을 설명한다. | 두 source |
| property catalog (`PC`) | `attr`와 `endArray`의 target 모양, 목적지 모양, 특수 규칙(suffix·단위·길이 불일치)을 대조한다. | 두 source |
| concept/guide subset (`CG`) | CSS property·attribute·Array element 중 무엇을 고를지 정적 표로 판단하게 한다. CSS 행은 비소유 비교용이다. | 선택 흐름만 |

signature 모듈, 전체 Tween vars 카탈로그, ease visualizer, 설치 모듈은 추가하지 않는다.

### learnerFlow

| id | 학습자 질문 | sourceItemIds |
| --- | --- | --- |
| `flow:auto-included` | 이 둘을 따로 import하거나 등록해야 하나요? | ATTR-01, ARR-01 |
| `flow:choose-channel` | target과 값 모양을 보고 CSS·attr·endArray 중 무엇을 고르나요? | ATTR-02, ARR-02 |
| `flow:attr-syntax` | attribute 이름과 값은 정확히 어디에 적나요? | ATTR-03, ATTR-04 |
| `flow:attr-values` | suffix가 붙은 값과 서로 다른 단위는 어떻게 되나요? | ATTR-05, ATTR-06 |
| `flow:attr-css-split` | 같은 `x`인데 왜 두 곳에서 다르게 동작하나요? | ATTR-07, ATTR-08, ATTR-09 |
| `flow:array-syntax` | Array는 target과 목적지를 어디에 두나요? | ARR-03, ARR-05 |
| `flow:array-behavior` | progress가 바뀌면 각 index는 어떻게 되고, 길이가 다르면 무엇이 남나요? | ARR-04, ARR-06 |

### coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| ATTR-01 | `ValueChannelSection.tsx` 자동 포함 문단; `non-css-target-values.catalog.ts#ATTR-01` | covered |
| ATTR-02 | `ValueChannelSection.tsx` 채널 표 attribute 행 | covered |
| ATTR-03 | `AttrSyntaxSection.tsx` attr 구조 분해 코드; `SvgAttributeLab` 코드 패널 | covered |
| ATTR-04 | `AttrSyntaxSection.tsx` 값 규칙 표 "동시에 적을 수 있는 개수" 행 — 공식 문장 원문 인용 | covered |
| ATTR-05 | `AttrSyntaxSection.tsx` 값 규칙 표 "suffix가 붙은 값" 행 | covered |
| ATTR-06 | `AttrSyntaxSection.tsx` 단위 변환 경고 블록; 값 규칙 표 | covered |
| ATTR-07 | `AttrCssSplitSection.tsx` 공식 rect 예제 원문 코드 블록 | covered |
| ATTR-08 | `AttrCssSplitSection.tsx` 경고 블록; `ValueChannelSection.tsx` 채널 표 경고 열 | covered |
| ATTR-09 | `AttrCssSplitSection.tsx` 같은 이름 비교 표; `SvgAttributeLab` 고정 transform 관찰값 | covered |
| ARR-01 | `ValueChannelSection.tsx` 자동 포함 문단; `non-css-target-values.catalog.ts#ARR-01` | covered |
| ARR-02 | `ValueChannelSection.tsx` 채널 표 Array 행 | covered |
| ARR-03 | `EndArraySection.tsx` 호출 구조 분해; `NumericArrayLab` 코드 패널 | covered |
| ARR-04 | `EndArraySection.tsx` easing 문단; `NumericArrayLab` ease control과 index 표 | covered |
| ARR-05 | `EndArraySection.tsx` 공식 onUpdate 예제 원문 코드 블록; `NumericArrayLab` 현재 Array 읽기 | covered |
| ARR-06 | `EndArraySection.tsx` 길이 불일치 경고; `NumericArrayLab` 길이 선택과 index별 상태 | covered |
| ARR-P1 | `EndArraySection.tsx` "공식 문서에 없는 동작 하나" 블록 — 실행 확인 사실임을 문장으로 명시 | covered (probe) |

`ARR-P1`은 공식 item이 아니다. coverage 분모(15)에 포함하지 않으며 `PageCoverage`도 공식 15개와 분리해 센다.

### relatedPages

- `gsap-to` — target·vars와 Tween 생성 계약 전체를 소유한다. 이 페이지는 `gsap.to()`를 전제로만 쓴다.
- `css-animation` — CSSPlugin, top-level CSS vars, transform, CSS 단위 변환을 소유한다. 채널 표의 CSS 행은 비소유 비교이며 coverage를 받지 않는다.
- `easing` — ease 문법과 곡선 의미를 소유한다. 이 페이지는 EndArray가 easing을 적용한다는 사실만 보존한다.
- `tween-playhead` — `progress()` 의미를 소유한다. `NumericArrayLab`에서 수동 조작 control로만 쓴다.

## 구현 계약

### exactFiles

create:

```text
src/content/gsap/fundamentals/non-css-target-values/NonCssTargetValuesPage.tsx
src/content/gsap/fundamentals/non-css-target-values/NonCssTargetValuesPage.css
src/content/gsap/fundamentals/non-css-target-values/non-css-target-values.meta.ts
src/content/gsap/fundamentals/non-css-target-values/non-css-target-values.catalog.ts
src/content/gsap/fundamentals/non-css-target-values/components/PageCoverage/PageCoverage.tsx
src/content/gsap/fundamentals/non-css-target-values/components/SectionHeading/SectionHeading.tsx
src/content/gsap/fundamentals/non-css-target-values/sections/ValueChannelSection/ValueChannelSection.tsx
src/content/gsap/fundamentals/non-css-target-values/sections/AttrSyntaxSection/AttrSyntaxSection.tsx
src/content/gsap/fundamentals/non-css-target-values/sections/AttrCssSplitSection/AttrCssSplitSection.tsx
src/content/gsap/fundamentals/non-css-target-values/sections/EndArraySection/EndArraySection.tsx
src/content/gsap/fundamentals/non-css-target-values/sections/BoundariesSection/BoundariesSection.tsx
src/content/gsap/fundamentals/non-css-target-values/examples/SvgAttributeLab/SvgAttributeLab.tsx
src/content/gsap/fundamentals/non-css-target-values/examples/SvgAttributeLab/SvgAttributeLab.css
src/content/gsap/fundamentals/non-css-target-values/examples/SvgAttributeLab/useSvgAttributeAnimation.ts
src/content/gsap/fundamentals/non-css-target-values/examples/NumericArrayLab/NumericArrayLab.tsx
src/content/gsap/fundamentals/non-css-target-values/examples/NumericArrayLab/NumericArrayLab.css
src/content/gsap/fundamentals/non-css-target-values/examples/NumericArrayLab/useNumericArrayAnimation.ts
```

modify:

```text
src/app/routes.ts
```

### exampleContracts

#### `SvgAttributeLab`

- goal: SVG circle 하나의 numeric `r` attribute가 `attr` 객체를 통해 바뀌는 동안, 같은 element의 CSS transform `x`는 고정된 채로 남는 것을 관찰한다.
- question: element 하나에서 attribute 채널과 CSS transform 채널은 어떻게 갈리나요?
- controls: 목표 반지름 range, duration range, 실행 버튼
- runtimeSource: `useSvgAttributeAnimation.ts`
- sourcePath: `examples/SvgAttributeLab/useSvgAttributeAnimation.ts`
- runtimeOwnership: hook이 selector, 시작·목표 `attr`, 고정 CSS `x`, 요청·실제 duration, 실행 key, `getAttribute('r')`·`gsap.getProperty(el,'x')` 관찰값, reduced-motion 상태를 담은 단일 descriptor를 소유한다. scoped `useGSAP` 한 개, `revertOnUpdate: true`.
- displayOwnership: TSX가 descriptor를 문법으로만 직렬화하고 controls·관찰 패널·학습 문단을 그린다. `attr` 객체나 duration을 다시 조립하지 않는다.
- coveredSourceItemIds: ATTR-03, ATTR-09 (ATTR-02는 섹션 근거로 충분)
- accessibility: SVG에 접근 가능한 이름과 설명, 현재 반지름·고정 transform은 텍스트 출력, native labeled input, 상태는 polite live region 하나
- motion: `useReducedMotion()`이 실제 duration을 0으로 만들고 최종 상태와 숫자를 그대로 보여준다. autoplay 없음.

#### `NumericArrayLab`

- goal: numeric Array 하나를 목적지 Array로 보간하면서 progress에 따라 각 index 값이 어떻게 변하는지, 길이가 다르면 어느 index가 그대로 남는지 확인한다.
- question: progress가 바뀔 때 각 index는 어떤 값이 되고, 길이가 다르면 무엇이 안 변하나요?
- controls: progress 0–1 slider, 목적지 길이 선택(`같음 | 짧음`), ease 선택(`none | power1.inOut`)
- runtimeSource: `useNumericArrayAnimation.ts`
- sourcePath: `examples/NumericArrayLab/useNumericArrayAnimation.ts`
- runtimeOwnership: hook이 시작 Array 원본, 변형되는 target Array ref, 목적지 Array, ease, progress를 담은 descriptor와 paused Tween 하나를 소유한다. 매 재구성 전에 시작 Array를 원본에서 복사해 되돌리고, 같은 descriptor progress로 `seek`한 뒤 `onUpdate` 스냅샷을 기록한다.
- displayOwnership: TSX가 descriptor의 target·endArray·ease·paused·progress를 그대로 직렬화하고 index 표를 그린다. 보간을 직접 계산하거나 목적지 Array를 모드 이름에서 재구성하지 않는다.
- coveredSourceItemIds: ARR-03, ARR-04, ARR-06
- accessibility: native radio group과 labeled slider + numeric output, index 표에 caption·header, 좁은 화면에서 index 카드로 전환, `공유 | 변화 없음`은 텍스트
- motion: 수동 scrub만 있고 자동 이동이 없다. reduced-motion에서도 사용자가 조작한 숫자 계산은 그대로 유지하고 장식 transition만 끈다.

### nonGoals

- CSSPlugin의 property·단위 계약을 이 페이지에서 카탈로그로 만들지 않는다.
- 일반 JavaScript object property animation을 다루지 않는다. 두 공식 페이지 어느 쪽도 게시하지 않았다.
- CSS·attribute·Array 채널을 하나의 generic runtime hook에서 분기시키지 않는다. 두 lab은 각자 hook을 소유한다.
- 짝이 없는 index의 동작, typed/sparse/중첩 Array, 숫자 아닌 값 처리를 추정해 적지 않는다.

### preserve

- 기존 8개 페이지의 파일·라우트·스타일 토큰
- 공용 컴포넌트(`InteractiveExample`, `DemoPanel`, `OfficialDocsLink`, `useReducedMotion`) — 변경 없음
- `master-page-inventory.md`의 소유권 행

## 검증 계약

### verifiedPerspectives

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion, Build/Integration, Cross-page Consistency — 모두 구현 컨텍스트가 직접 판정했다(`docs/workflows/quality-gates.md` 2026-08-04 개정: 독립 검수자를 두지 않는다).

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-CORE07-001 | PASS | 2026-08-04에 두 canonical 원문을 직접 조회해 15개 item을 확인했다. Attributes heading은 `Attributes`/`Description`/`Animating CSS` 셋뿐이고 signature·기본값·반환값 절이 없음을 확인했다. | blocker 없이 구현 가능 | 미게시 명세를 `공식 페이지에 명시 없음`으로 표시 |
| HND-001 | ADDRESSED | 옛 브랜치 `feat/gsap-docs-complete`의 handoff가 2026-08-03 기준 줄 번호를 썼다. 2026-08-04 재조회로 기술 내용 불변을 확인하고 `sourceLocation`을 heading 기준으로 교체했다. | 줄 번호가 현재 렌더링과 어긋났다 | none |
| STRUCT-CORE07-001 | PASS | 옛 handoff의 `ValueChannelChooser`를 `examples/` 대신 `ValueChannelSection` 안의 정적 표로 구현했다. 실행 코드가 없는 비교 표는 기존 `ConfigCatalogSection` 선례를 따르는 것이 일관된다. | 계획 대비 의도적 편차 | none |
| PROBE-CORE07-001 | PASS | GSAP 3.15.0 실행 결과, 목적지 Array가 더 길면 target Array가 그 길이로 늘어나고 추가 칸이 0에서부터 보간된다(`[10,20]`→`endArray:[0,0,99,99]`가 progress 0.25에서 `[7.5,15,24.75,24.75]`, length 4). 되감아도 길이는 복구되지 않는다. 공식 문장은 시작 Array가 더 긴 경우만 설명한다. | 공식 문장만 읽으면 예상할 수 없는 동작 | `ARR-P1`로 기록하고 실행 확인 사실임을 페이지에 명시 |
| OC-CORE07-001 | PASS | 공식 15/15 item이 `coverageMap`에서 파일 근거로 연결됐다. 스크립트로 meta 섹션 수(4/4/3/4/0=15), catalog 공식 행 수(15), handoff ID 집합이 서로 일치함을 대조했다. 중복 ID 없음. | Official Coverage 통과 | none |
| RDS-CORE07-001 | PASS | 두 lab 모두 hook의 descriptor에서 GSAP 호출과 표시 코드가 함께 파생된다. TSX 어느 파일도 `gsap`을 import하지 않음을 grep으로 확인했다(문자열 안의 `gsap.`은 화면에 보여줄 코드 텍스트다). | Runtime/Display Sync 통과 | none |
| STRUCT-CORE07-002 | ADDRESSED | `SvgAttributeLab`의 `onUpdate`가 선언 전 `tween`을 참조했고, `NumericArrayLab`에 현재 선택지로는 도달할 수 없는 길이 절단 코드가 있었다. element를 먼저 풀어 두고 절단 코드를 제거해 해결했다. | 취약한 참조와 추측성 방어 코드 | none |
| BUILD-CORE07-001 | PASS | `npm run build` exit 0, `npm run build-storybook` exit 0 (2026-08-04) | build/integration 통과 | none |
| XPAGE-CORE07-001 | PASS | CSS·ease·progress·`gsap.to()`를 이 페이지가 소유하지 않고 각 owner 페이지로 연결했다. 채널 표의 CSS 행은 coverage를 받지 않는 비교용으로 표시했다. | Cross-page Consistency 통과 | none |
| A11Y-CORE07-001 | DEFERRED | 키보드 이동, `prefers-reduced-motion` 실제 전환, 320/390px 실제 레이아웃, lab control 실제 조작 | 소유자 일괄 브라우저 검수 대상 | 전체 페이지 완성 후 일괄 확인 |

### verificationEvidence

- 공식 원문 대조 — 2026-08-04, 두 canonical URL 직접 조회. `unlimited attributes` 문장과 `<rect>` markup 존재를 개별 확인.
- runtime probe — `endArray` 길이 불일치 시 짝 없는 index가 그대로 남는지, `attr` 안팎의 `x`가 서로 다른 채널에 쓰이는지 `node`로 실행 확인.
- build — `npm run build`, `npm run build-storybook`.

### releaseDecision

`PASS` (미해결 `DEFERRED` 1건: A11Y-CORE07-001 — 소유자 브라우저 일괄 검수 대상)
