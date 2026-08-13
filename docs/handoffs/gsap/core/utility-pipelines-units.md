# Utility pipelines and units handoff

## 입력 계약

### objective

raw 숫자를 재사용 가능한 계산 순서로 연결하고 CSS 문자열의 단위를 계산 경계에서 안전하게 분리·재부착하며, 현재 브라우저가 지원하는 CSS property 이름을 확인하게 한다. `pipe`의 함수 호환성 → `getUnit`/`unitize`의 숫자·단위 경계 → `checkPrefix`의 환경 경계 순서로 가르친다.

### officialPage

- title: `checkPrefix()` + `getUnit()` + `pipe()` + `unitize()`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/UtilityMethods/checkPrefix()`
  - `https://gsap.com/docs/v3/GSAP/UtilityMethods/getUnit()`
  - `https://gsap.com/docs/v3/GSAP/UtilityMethods/pipe()`
  - `https://gsap.com/docs/v3/GSAP/UtilityMethods/unitize()`
- reviewedAt: `2026-08-08`
- category: `Useful features & tools > Utility Methods`
- slug: `utility-pipelines-units`
- sourcePageIds: primary `source:utils-check-prefix`; related `source:utils-get-unit`, `source:utils-pipe`, `source:utils-unitize`
- sourceRevision: 네 canonical 모두 `1`

### localPage

- localPath: `src/content/gsap/fundamentals/utility-pipelines-units/`
- route: `/fundamentals/utility-pipelines-units`
- route registration: `src/app/routes.ts`의 값 계산 group에 lazy page와 lesson을 등록했다.

### sourceManifest

`utility-pipelines-units.catalog.ts`의 item-level 배열이 owned 공식 39개, 선행 hub 공식 오류 2개, probe 5개의 문장·위치·sourceStatus·section·localStatus authority다.

| sourcePageId | catalog source | IDs | 공식 item | sourceStatus |
| --- | --- | --- | ---: | --- |
| `source:utils-check-prefix` | `check-prefix` | `CP-01~06` | 6 | verified |
| `source:utils-get-unit` | `get-unit` | `GU-01~06` | 6 | verified |
| `source:utils-pipe` | `pipe` | `PI-01~13` | 13 | verified |
| `source:utils-unitize` | `unitize` | `UN-01~14` | 14 | verified |
| 합계 | 4 canonical | 39 IDs | 39 | verified |

| id | officialItem / implementation item | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| `PI-01` | pipe 페이지는 반환값을 Function으로 표시한다. | `Returns : Function` | verified |
| `PI-02` | pipe()는 여러 함수 호출을 이어 앞 함수의 결과를 다음 함수로 넘긴다. | `intro paragraph` | verified |
| `PI-03` | pipe 없이 value1, value2, output으로 반환값을 수동 전달하는 세 줄 예제를 싣는다. | `first code example · without pipe()` | verified |
| `PI-04` | func1(func2(func3(input)))처럼 여러 겹으로 감싸는 방식을 awkward라고 표시한다. | `first code example · multi-level wrapping` | verified |
| `PI-05` | cleaner with pipe 예제는 생성 변수명을 transfrom이라고 적는다. | `first code example · cleaner with pipe()` | verified |
| `PI-06` | 바로 다음 줄은 transfrom이 아니라 transform(input)을 호출해 식별자가 서로 맞지 않는다. | `first code example · output line` | verified |
| `PI-07` | Parameters는 원하는 만큼 함수를 넘길 수 있고 주어진 순서로 호출되며 각 반환값이 다음 함수로 간다고 설명한다. | `Parameters` | verified |
| `PI-08` | Tip heading은 재사용 함수를 조합해 강력한 데이터 변환을 만들라고 권한다. | `Tip heading` | verified |
| `PI-09` | Tip 본문은 clamp, mapRange, snap, interpolate 등을 pipeline 후보로 든다. | `Tip paragraph` | verified |
| `PI-10` | 공식 transformer 예제의 첫 단계는 입력을 0~100 사이로 clamp한다. | `transformer code · clamp` | verified |
| `PI-11` | 둘째 단계는 0~100을 0~window.innerWidth 범위로 mapRange한다. | `transformer code · mapRange` | verified |
| `PI-12` | 셋째 단계는 20 간격으로 snap하고 transformer(25.874)로 전체 변환을 실행한다. | `transformer code · snap and call` | verified |
| `PI-13` | Video demo heading과 Combining utility Methods 영상이 pipeline 조합을 보충한다. | `Video demo` | verified |
| `GU-01` | getUnit 페이지는 반환값을 String으로 표시하고 숫자가 먼저, 단위가 뒤에 오는 문자열의 단위를 돌려준다고 요약한다. | `Returns : String summary` | verified |
| `GU-02` | 본문은 숫자가 먼저이고 단위가 뒤인 문자열 안에서 단위를 분리한다고 다시 설명한다. | `intro paragraph` | verified |
| `GU-03` | 코드 주석은 CSS 값의 단위를 반환하는 예제라고 밝힌다. | `code comment` | verified |
| `GU-04` | getUnit("50%")의 공식 결과는 "%"다. | `code example · percent` | verified |
| `GU-05` | getUnit("100vw")의 공식 결과는 "vw"다. | `code example · viewport unit` | verified |
| `GU-06` | Parameters의 value는 단위를 얻고 싶은 String이다. | `Parameters · value` | verified |
| `UN-01` | unitize 페이지는 반환값을 Function으로 표시한다. | `Returns : Function` | verified |
| `UN-02` | unitize()는 다른 함수를 감싸 결과에 px나 % 같은 단위를 붙이는 wrapper다. | `intro paragraph · result unit` | verified |
| `UN-03` | 입력에 단위가 있으면 안쪽 함수에 넣기 전에 떼고, 강제 단위가 없으면 같은 단위를 결과에 다시 붙인다. | `intro paragraph · dynamic unit` | verified |
| `UN-04` | 첫 예제는 clamp(0, 100)을 감싸 px를 항상 붙이는 함수를 만든다. | `Example · forced px setup` | verified |
| `UN-05` | 강제 px 함수는 132→100px, "-20%"→0px, 50→50px를 돌려주며 입력 단위가 바뀔 수 있음을 보인다. | `Example · forced px calls` | verified |
| `UN-06` | 단위를 지정하지 않고 wrap(0, 100)을 감싼 함수는 입력의 단위를 사용한다. | `Example · dynamic unit setup` | verified |
| `UN-07` | 동적 단위 함수는 "150px"→50px, "130%"→30%를 돌려준다. | `Example · dynamic unit calls` | verified |
| `UN-08` | mapRange(-10, 10, 0, 100)을 감싸 %를 강제하는 예제를 싣는다. | `Example · forced percent setup` | verified |
| `UN-09` | 강제 % 함수는 0→50%, "5px"→75%를 돌려준다. | `Example · forced percent calls` | verified |
| `UN-10` | unitize()는 modifier 함수에서 유용하다고 설명한다. | `Example · modifier comment` | verified |
| `UN-11` | modifier 예제는 x 입력의 단위를 떼어 wrap에 숫자로 넣고 결과에 px를 붙인다. | `Example · modifiers.x` | verified |
| `UN-12` | 첫 인자 function은 결과에 단위를 붙일 대상 함수다. | `Parameters · function` | verified |
| `UN-13` | 둘째 인자 unit은 선택 String이며, 생략하면 입력의 원래 단위를 동적으로 적용한다. | `Parameters · unit` | verified |
| `UN-14` | Note는 unitize()가 parseFloat()로 입력 단위를 떼고 function에 넘긴다고 명시한다. | `Note after Parameters` | verified |
| `CP-01` | checkPrefix 페이지는 반환값을 String으로 표시한다. | `Returns : String` | verified |
| `CP-02` | CSS property 이름을 주면 필요할 때 브라우저 prefix를 붙인 property 이름을 돌려준다. | `intro paragraph · prefix` | verified |
| `CP-03` | prefix가 필요 없으면 원래 property 이름을 돌려준다. | `intro paragraph · original name` | verified |
| `CP-04` | property가 존재하지 않으면 undefined를 돌려준다고 본문에 적혀 있어 Returns : String 표기와 충돌한다. | `intro paragraph · unsupported` | verified |
| `CP-05` | filter 예제는 브라우저에 따라 filter, WebkitFilter, MozFilter를 돌려줄 수 있다고 설명한다. | `code example` | verified |
| `CP-06` | Parameters의 property는 filter 같은 확인 대상 property 이름 String이다. | `Parameters · property` | verified |
| `UP-P1` | GSAP 3.15.0에서 지원하지 않는 property의 checkPrefix() 실제 반환은 undefined가 아니라 null이다. | `Node fake-DOM probe` | verified |
| `UP-P2` | prefix probe에서 일반 property는 원래 이름, prefix만 있는 property는 WebkitMaskImage, 없는 property는 null을 돌려줬다. | `Node fake-DOM probe` | verified |
| `UP-P3` | official pipe 코드의 transfrom 선언 뒤 transform 호출은 ReferenceError가 나며, 식별자를 transformer로 통일한 의도 실행은 viewport 500에서 25.874→120이다. | `Node probe` | verified |
| `UP-P4` | official이 설명하지 않은 무함수 pipe()는 GSAP 3.15.0에서 입력을 그대로 돌려주는 함수다. | `Node probe` | verified |
| `UP-P5` | official의 숫자 우선 조건 밖에서는 getUnit("42"), getUnit("calc(100% - 2px)"), getUnit(".5em")이 모두 빈 문자열이고 unitize에 "auto"를 넣으면 안쪽 함수가 NaN을 받는다. | `Node probe with getUnit boundary` | verified |

page 35가 소유한 Utility Methods hub의 원문 오류 두 개는 owned denominator에 다시 넣지 않고 `origin:'upstream-official'`로 보존한다.

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| `HP-01` | checkPrefix 설명은 `provided`를 `proved`로 잘못 적는다. | `Utility Methods > Available Utils > checkPrefix` | verified |
| `HP-02` | unitize 함수 생성과 `wrap("150px")` 호출 사이 세미콜론이 빠졌다. | `Utility Methods > Available Utils > unitize` | verified |

원문은 네 Docusaurus 렌더링 페이지의 Returns·intro·Parameters·Tip·Example·Video를 두 번 항목별로 대조했다. raw HTML도 각각 두 번 내려받아 두 pass의 SHA-256이 일치했다.

| source | raw pass 1 | raw pass 2 |
| --- | --- | --- |
| checkPrefix | `72869744d209ddaad1954996f5781f05db16c2d3782521d2a052345e1dee03e6` | 동일 |
| getUnit | `9a2f75225bb1ab428a32190f02dbf863ef3697ebecadedab949db7a6967007ec` | 동일 |
| pipe | `99bb5fb5896e7021a28c5d7cb918ab4f79b1fc0051829a7d9427f74a042c8cd5` | 동일 |
| unitize | `0df6c8b6f310cde3b84dff3893f7cf221d97e05ece719a24527d2df344aa429b` | 동일 |

공식 39개와 별도로 GSAP 3.15.0 실행만 근거로 삼는 다섯 item은 `origin:'implementation'`으로 분리했다.

| id | implementation item | evidence |
| --- | --- | --- |
| `UP-P1` | unsupported `checkPrefix()`는 dedicated 문서의 `undefined`와 달리 `null` 반환 | fake DOM의 존재하지 않는 style key |
| `UP-P2` | native property는 원래 이름, prefix-only property는 `WebkitMaskImage`, unsupported는 `null` | style keys `transform/filter/WebkitMaskImage` |
| `UP-P3` | 공식 `transfrom` 선언 + `transform` 호출은 ReferenceError, 의도대로 통일하면 viewport 500에서 `25.874→120` | 원문 코드 실행 + clamp/map/snap 실행 |
| `UP-P4` | 무함수 `pipe()`는 입력을 그대로 반환 | `pipe()('12px') → '12px'` |
| `UP-P5` | 숫자 우선 전제 밖의 getUnit은 빈 문자열, `unitize(...)("auto")`의 callback 입력은 `NaN` | boundary 입력 직접 호출 |

### sourceBlockers

`none` — 네 canonical과 공식 item 39개를 모두 verified로 고정했다.

공식 오류와 문서 간 차이는 blocker 대신 provenance를 보존했다.

- dedicated `checkPrefix` heading은 `Returns : String`, 본문은 unsupported에 `undefined`라고 적지만 실행은 `null`이다.
- dedicated `pipe` 첫 코드는 `transfrom`을 선언하고 `transform`을 호출한다.
- page 35가 소유한 Utility Methods hub의 `unitize` 세미콜론 누락과 `checkPrefix`의 `proved` 오타는 이 페이지에서 되돌리거나 정정 완료로 취급하지 않는다. dedicated 페이지는 세미콜론과 `provided`가 올바른 현재 원문이라는 차이만 설명한다.

### moduleSelection

- `UT + II` — 네 callable의 입력·반환, 함수 조합, 단위 추출·재부착, browser property lookup
- animation Hook 없음 — 세 utility는 순수/상태형 계산이고 checkPrefix는 환경 조회라 `use*Runtime.ts`가 실제 호출을 소유한다.
- property catalog 복제 없음 — 네 owned callable의 선택 기준과 공식 인자만 마지막 표에서 비교한다.

### learnerFlow

1. `#pipeline`: `pipe`가 Function을 돌려주고 앞 출력이 다음 입력으로 흐르는 구조
2. `#units`: `getUnit` 관찰과 `unitize`의 parseFloat → 숫자 함수 → 보존/강제 단위
3. `#prefix`: native/prefixed/unsupported property와 browser fallback
4. `#boundaries`: 공식 오류, hub 보존 차이, 숫자 우선 전제와 빈 pipe 경계

### coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| `PI-01` | `PipelineSection.tsx` “만들 때는 실행하지 않습니다”의 반환 Function | covered |
| `PI-02` | `PipelineSection.tsx` flow와 왼쪽→오른쪽 설명 | covered |
| `PI-03` | `PipelineSection.tsx` “공식이 먼저 보여 준 수동 전달” code | covered |
| `PI-04` | `PipelineSection.tsx` “공식이 awkward라고 부른 중첩” code | covered |
| `PI-05` | `BoundariesSection.tsx` `transfrom` 선언 warning | covered |
| `PI-06` | `BoundariesSection.tsx` `transform` 호출·ReferenceError warning | covered |
| `PI-07` | `PipelineSection.tsx` 주어진 순서와 이전 output=다음 input 설명 | covered |
| `PI-08` | `PipelineSection.tsx` 공식 tip의 재사용 함수 조합 | covered |
| `PI-09` | `PipelineSection.tsx` 공식 tip의 clamp·mapRange·snap·interpolate 목록 | covered |
| `PI-10` | `PipelineSection.tsx` 공식 예제 0~100 clamp, `PipelineLab` 첫 reading | covered |
| `PI-11` | `PipelineSection.tsx` 공식 0~window.innerWidth mapping 경계, `PipelineLab` 고정 0~360 mapping | covered |
| `PI-12` | `PipelineSection.tsx` 공식 snap 20/input 25.874, `PipelineLab` 실제 call | covered |
| `PI-13` | `PipelineSection.tsx` “Video demo: combining utility methods” 명시 | covered |
| `GU-01` | `UnitSection.tsx` getUnit reference의 String 반환·숫자 우선 계약 | covered |
| `GU-02` | `UnitSection.tsx` 숫자와 단위를 분리하는 경계 설명 | covered |
| `GU-03` | `UnitSection.tsx` CSS 값 단위를 읽는 getUnit reference | covered |
| `GU-04` | `UnitSection.tsx` `getUnit("50%") // "%"` | covered |
| `GU-05` | `UnitSection.tsx` `getUnit("100vw") // "vw"` | covered |
| `GU-06` | `BoundariesSection.tsx` method table의 `value: String` | covered |
| `UN-01` | `BoundariesSection.tsx` method table의 Function 반환 | covered |
| `UN-02` | `UnitSection.tsx` wrapper 멘탈 모델 | covered |
| `UN-03` | `UnitSection.tsx` 제거→계산→재부착 diagram과 `UnitLab` | covered |
| `UN-04` | `UnitSection.tsx` 강제 px setup code | covered |
| `UN-05` | `UnitSection.tsx` 132/-20%/50 공식 결과 code | covered |
| `UN-06` | `UnitSection.tsx` unit 생략 wrap setup code | covered |
| `UN-07` | `UnitSection.tsx` 150px/130% 공식 결과 code | covered |
| `UN-08` | `UnitSection.tsx` 강제 % mapRange setup code | covered |
| `UN-09` | `UnitSection.tsx` 0/5px 공식 결과 code | covered |
| `UN-10` | `UnitSection.tsx` modifier 경계 note | covered |
| `UN-11` | `UnitSection.tsx` modifiers.x의 wrap·px 설명 | covered |
| `UN-12` | `BoundariesSection.tsx` method table의 function 인자 | covered |
| `UN-13` | `BoundariesSection.tsx` method table의 optional unit, `UnitLab` 세 policy | covered |
| `UN-14` | `UnitSection.tsx` parseFloat 설명, `UnitLab` receivedNumber snapshot | covered |
| `CP-01` | `PrefixSection.tsx` warning의 Returns : String | covered |
| `CP-02` | `PrefixSection.tsx` prefix가 붙은 실제 property 설명 | covered |
| `CP-03` | `PrefixSection.tsx` native property는 원래 이름 설명 | covered |
| `CP-04` | `PrefixSection.tsx` official undefined와 runtime null 분리 | covered |
| `CP-05` | `PrefixSection.tsx` filter/WebkitFilter/MozFilter 예제 후보 | covered |
| `CP-06` | `BoundariesSection.tsx` method table의 property: String | covered |
| `HP-01` | `BoundariesSection.tsx` exact `provided`→`proved` hub 오타와 page35 owner | covered (upstream official) |
| `HP-02` | `BoundariesSection.tsx` exact unitize 생성/`wrap("150px")` 사이 semicolon 누락과 page35 owner | covered (upstream official) |
| `UP-P1` | `PrefixSection.tsx` dedicated undefined/runtime null warning | covered (probe) |
| `UP-P2` | `PrefixCheck` native/prefix/unsupported 실제 browser snapshot | covered (probe) |
| `UP-P3` | `BoundariesSection.tsx` ReferenceError·의도 코드 분리 | covered (probe) |
| `UP-P4` | `BoundariesSection.tsx` 빈 pipe identity note | covered (probe) |
| `UP-P5` | `BoundariesSection.tsx` getUnit 빈 문자열·unitize auto→NaN warning | covered (probe) |

`meta section sourceItems 합계 = 39`, `catalog origin:'official' = 39`, `meta officialSourceItems = 39`이며 owned official 39 + upstream official 2 + probe 5 = 46개 ID는 모두 unique다.

### relatedPages

- `/fundamentals/gsap-utils`: 17개 utility 전체 지도와 두 허브의 원문 차이 owner
- `/fundamentals/range-interpolation`: clamp·mapRange 등 range 계산의 전체 overload owner
- `/fundamentals/css-animation`: CSS property·transform 값 표현 owner
- `/fundamentals/modifiers-snap-wrap`: unitize를 modifier에 연결하는 매 render 적용 owner

## 구현 계약

### exactFiles

create:

- `src/content/gsap/fundamentals/utility-pipelines-units/UtilityPipelinesUnitsPage.tsx`
- `src/content/gsap/fundamentals/utility-pipelines-units/UtilityPipelinesUnitsPage.css`
- `src/content/gsap/fundamentals/utility-pipelines-units/utility-pipelines-units.catalog.ts`
- `src/content/gsap/fundamentals/utility-pipelines-units/utility-pipelines-units.meta.ts`
- `src/content/gsap/fundamentals/utility-pipelines-units/components/PageCoverage/PageCoverage.tsx`
- `src/content/gsap/fundamentals/utility-pipelines-units/components/SectionHeading/SectionHeading.tsx`
- `src/content/gsap/fundamentals/utility-pipelines-units/sections/PipelineSection/PipelineSection.tsx`
- `src/content/gsap/fundamentals/utility-pipelines-units/sections/UnitSection/UnitSection.tsx`
- `src/content/gsap/fundamentals/utility-pipelines-units/sections/PrefixSection/PrefixSection.tsx`
- `src/content/gsap/fundamentals/utility-pipelines-units/sections/BoundariesSection/BoundariesSection.tsx`
- `src/content/gsap/fundamentals/utility-pipelines-units/examples/PipelineLab/PipelineLab.tsx`
- `src/content/gsap/fundamentals/utility-pipelines-units/examples/PipelineLab/PipelineLab.css`
- `src/content/gsap/fundamentals/utility-pipelines-units/examples/PipelineLab/usePipelineLabRuntime.ts`
- `src/content/gsap/fundamentals/utility-pipelines-units/examples/UnitLab/UnitLab.tsx`
- `src/content/gsap/fundamentals/utility-pipelines-units/examples/UnitLab/UnitLab.css`
- `src/content/gsap/fundamentals/utility-pipelines-units/examples/UnitLab/useUnitLabRuntime.ts`
- `src/content/gsap/fundamentals/utility-pipelines-units/examples/PrefixCheck/PrefixCheck.tsx`
- `src/content/gsap/fundamentals/utility-pipelines-units/examples/PrefixCheck/usePrefixCheckRuntime.ts`
- `docs/handoffs/gsap/core/utility-pipelines-units.md`

modify:

- `src/app/routes.ts`

### exampleContracts

| name | goal / question | representation / controls | runtimeSource / sourcePath | runtimeOwnership / displayOwnership | accessibility / motion |
| --- | --- | --- | --- | --- | --- |
| PipelineLab | 값 하나가 세 함수를 어떤 순서로 지나가는가? | input number + ordered intermediate cards | `usePipelineLabRuntime.ts` / 동일 | runtime이 descriptor·실제 `pipe` 1회 실행·중간 reading·code snapshot, TSX가 controls·표·설명 | label/input, 이산 status, motion none |
| UnitLab | 단위가 계산의 어느 지점에서 사라지고 돌아오는가? | CSS text input + preserve/px/% radio + 세 reading | `useUnitLabRuntime.ts` / 동일 | runtime이 getUnit·실제 unitize 1회 실행·callback received number·code snapshot, TSX가 controls·관찰·설명 | fieldset/legend/label, 이산 status, motion none |
| PrefixCheck | 이 브라우저가 사용할 property 이름은 무엇인가? | property select + actual output | `usePrefixCheckRuntime.ts` / 동일 | runtime이 local nullable type·실제 checkPrefix·code snapshot, TSX가 select·fallback 설명 | label/select/output, 이산 status, motion none |

### nonGoals

- 다른 학습 페이지 수정
- range utility의 전체 overload·계산 원리 재소유
- modifier의 per-render 생명주기나 animation 데모
- browser vendor별 결과를 고정된 공식 사실로 선언
- generic shared runtime, 자동화 테스트, 테스트 환경, 커밋

### preserve

- core:37 identity, primary 1 + related 3 owned canonical과 sourceRevision 1
- page 35의 Utility Methods `unitize` 세미콜론 누락·`checkPrefix`의 `proved` 오타
- dedicated `checkPrefix`의 String/undefined 주장과 runtime null을 official/probe로 분리
- dedicated `pipe`의 `transfrom`/`transform` 오류와 의도 실행을 official/probe로 분리
- controls → descriptor → 실제 GSAP 호출 → observation/code가 같은 단일 snapshot을 공유
- TSX의 GSAP import 0, autoplay·Tween·Timeline 0, 연속 live region 0
- 작업 전 존재한 다른 modified/untracked 파일

## 검증 계약

### verifiedPerspectives

- Source Curator
- Content Architect
- Official Coverage
- Learning Transformation
- Runtime/Display Sync
- Pedagogy
- Structure/Comment
- Accessibility/Motion 정적 판정
- Build/Integration
- Cross-page Consistency

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SC-CORE37-001 | PASS | 네 canonical 렌더 본문 2회 + raw 2회, raw hash 각 pass 동일 | source 확정 | none |
| CA-CORE37-001 | PASS | 함수 흐름 → 단위 경계 → browser 경계 → 오류/비호환 순서 | 단순 번역이 아닌 선택 흐름 | none |
| OC-CORE37-001 | PASS | section 39 = catalog owned official 39 = meta 39, upstream official 2, probe 5, ID 46/46 unique, owned source 4/4 | 100% owned official coverage + upstream 오류 보존 | none |
| LT-CORE37-001 | PASS | 각 lab 실행 전 용어·목표·관찰을 정의하고 변화·원리·사용처·주의점을 분리 | beginner transformation 충족 | none |
| SYNC-CORE37-001 | PASS | PipelineLab은 실제 pipe 1회에서 중간값 기록, UnitLab code는 실제 관찰 callback·unitize(callback, unit) 구조와 descriptor를 그대로 직렬화, 세 runtime이 code까지 snapshot 소유 | runtime/display 일치 | none |
| PED-CORE37-001 | PASS | pipeline 한 입력/한 흐름, unit 한 문자열/한 경계, prefix 한 property/한 환경 결과 | 예제 질문 분리 | none |
| STR-CORE37-001 | PASS | page 조립, 4 sections, 3 page-owned runtime, TSX GSAP import 0, 한 줄 한국어 주석 | 구조 계약 충족 | none |
| A11Y-STATIC-CORE37-001 | PASS | label/fieldset/legend/select/output, focus-visible, 이산 status만 사용, animation/autoplay 없음, reduced CSS에서 transition 제거 | 정적 접근성·motion 충족 | 실제 조작은 browser deferred |
| CROSS-CORE37-001 | PASS | page 35 hub 오류를 유지하고 page 36 range/page 40 modifier ownership을 재소유하지 않음 | cross-page 경계 유지 | none |
| REVIEW-CORE37-001 | PASS | 독립 감사에서 빈 Pipeline fallback 고지와 UnitLab 비숫자 입력의 wrap overload 진입을 지적했고, control 안내와 `Number.isFinite` guard·표시 code를 함께 수정 | 입력/runtime/code 경계 동기화 | none |
| BUILD-CORE37-001 | PASS | route 등록 뒤 root `npx tsc --noEmit`, `npm run build`, `npm run build-storybook` exit 0이고 두 build 모두 UtilityPipelinesUnitsPage JS/CSS chunk 생성 | TypeScript·Vite·Storybook 통합 확인 | none |
| A11Y-CORE37-001 | DEFERRED → PASS | route 등록 뒤에도 이 환경에서 사용할 browser가 없어 키보드·focus·320/390px·실제 controls를 확인하지 못함 | 소유자 일괄 브라우저 검수 대상 | browser 연결 가능 환경에서 확인 |

### verificationEvidence

- source: four canonical rendered headings/Returns/Parameters/examples twice; raw HTML twice with stable SHA-256 above
- probe: Node 22.21.0, GSAP 3.15.0, fake DOM style keys `transform/filter/WebkitMaskImage`, viewport 500; `checkPrefix` native/prefix/null, pipe typo ReferenceError, intended `25.874→120`, empty pipe identity, getUnit boundaries, seven official unitize results, auto→NaN
- static: owned official 39 / upstream official 2 / probe 5 / owned sources 4 / section sum 39 / meta 39 / duplicate IDs 0 / TSX GSAP imports 0 / runtimeSource 3
- compile: 최종 target TS/TSX 15개 + `src/vite-env.d.ts` 대상 TypeScript 6 `--ignoreConfig --noEmit` exit 0
- review fix: 빈 Pipeline input은 25.874 fallback을 control 아래 표시하고, UnitLab은 비유한 수를 wrap에 넘기지 않고 `NaN`을 반환하며 code panel도 같은 guard를 표시
- build: route 등록 뒤 root TypeScript exit 0, Vite 748 modules·Storybook 886 modules transform과 전용 JS/CSS chunk 생성을 확인
- `npm run build` — exit 0, `UtilityPipelinesUnitsPage-DgAe5S6-.js`, `UtilityPipelinesUnitsPage-5CD8onhw.css` 생성
- `npm run build-storybook` — exit 0, `UtilityPipelinesUnitsPage-D_R08xZ6.js`, `UtilityPipelinesUnitsPage-5CD8onhw.css` 생성
- browser: 현재 환경에 사용할 browser가 없어 keyboard·small-screen·실제 controls는 `DEFERRED → PASS`

### releaseDecision

`PASS` — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
