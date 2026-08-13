# Utility distribute handoff

## 입력 계약

### objective

`gsap.utils.distribute()`가 config를 받아 `index, target, array`를 숫자로 바꾸는 함수를 반환한다는 계약을 먼저 세우고, 1D row에서 익힌 `amount | each`, `from`, `ease` 규칙을 명시적 2D grid heatmap으로 확장한다. 공식 문서의 config 일곱 field·예제·note·원문 오류는 모두 보존하고, 문서가 침묵한 실행 조합은 GSAP 3.15.0 probe로 분리한다.

### officialPage

- title: `distribute`
- canonicalUrl: `https://gsap.com/docs/v3/GSAP/UtilityMethods/distribute()`
- reviewedAt: `2026-08-08`
- category: `GSAP > Useful features & tools > Utility Methods`
- slug: `utility-distribute`
- sourcePageId: `source:utils-distribute`
- observedVersion: 공식 navigation `v3.15`; 설치본 probe `3.15.0`

rendered 문서는 `Returns : Function`, 설명·종합 예제·tween 예제, `Parameters`의 config와 일곱 property, 영상·companion Pen note 순서다. 같은 canonical을 rendered 경로에서 두 번 열어 heading·예제·Parameters를 대조했고 raw HTML도 두 번 받아 동일 SHA-256 `e8694f8825d5b4b63036d9a6608a0eb489403f2052f3537077d77d5533ca3f89`를 확인했다.

### localPage

- localPath: `src/content/gsap/fundamentals/utility-distribute/`
- route: `/fundamentals/utility-distribute` (등록 완료)

### sourceManifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| DIST-01 | 반환 형식은 `Function`이다. | Returns heading | verified |
| DIST-02 | 입력 설정에 따라 값 배열을 배분하는 함수를 반환한다. | Returns summary | verified |
| DIST-03 | array 또는 grid 안 element 위치로 값을 할당한다. | intro | verified |
| DIST-04 | 반환 함수는 index, 해당 target, 전체 targets 배열을 입력받는다. | 종합 예제 callback 호출 | verified |
| DIST-05 | config는 Object이며 모든 property는 선택 사항이다. | Parameters `config` | verified |
| DIST-06 | `base: Number`, 시작값, 기본값 0이다. | Parameters `base` | verified |
| DIST-07 | `amount: Number`, 전체에 나눌 총량이며 base에 더한다. | Parameters `amount` | verified |
| DIST-08 | amount 1과 target 100개의 반환값 차이를 0.01이라고 설명한다. | Parameters `amount` 예 | verified |
| DIST-09 | target 사이 간격을 정하려면 amount 대신 each를 쓴다. | Parameters `amount` note | verified |
| DIST-10 | `each: Number`, target마다 더할 간격이며 base에 더한다. | Parameters `each` | verified |
| DIST-11 | each 1과 target 4개는 0, 1, 2, 3을 반환한다. | Parameters `each` 예 | verified |
| DIST-12 | 총량을 나누려면 each 대신 amount를 쓴다. | Parameters `each` note | verified |
| DIST-13 | `from: Number \| String \| Array`는 시작 위치를 정한다. | Parameters `from` | verified |
| DIST-14 | from 문자열은 start, center, edges, random, end를 허용한다. | Parameters `from` | verified |
| DIST-15 | from은 `[0.25, 0.75]` 같은 x·y 비율 배열을 허용한다. | Parameters `from` | verified |
| DIST-16 | from 기본값은 숫자 0이다. | Parameters `from` | verified |
| DIST-17 | `grid: String \| Array`는 flat 대신 `[rows, columns]` 위치를 쓴다. | Parameters `grid` | verified |
| DIST-18 | grid는 `[5, 10]`처럼 행·열을 명시할 수 있다. | Parameters `grid` | verified |
| DIST-19 | grid `"auto"`는 DOM element의 column·row 수를 자동 감지한다. | Parameters `grid` | verified |
| DIST-20 | `axis: String`은 grid 측정을 `"x"` 또는 `"y"`로 제한한다. | Parameters `axis` | verified |
| DIST-21 | `ease: Ease`는 곡선으로 배분하며 기본값은 `"none"`이다. | Parameters `ease` | verified |
| DIST-22 | 종합 예제는 base 50, amount 100, center, auto grid, y axis, power1.inOut을 쓴다. | 종합 예제 config | verified |
| DIST-23 | 종합 예제는 `gsap.utils.toArray(".box")`로 targets를 만든다. | 종합 예제 targets | verified |
| DIST-24 | 종합 예제는 `distributor(2, targets[2], targets)`를 호출한다. | 종합 예제 결과 | verified |
| DIST-25 | 반환 함수는 tween에 직접 넣을 수 있다. | tween 예제 intro | verified |
| DIST-26 | tween 예제는 scale에 base 0.5, amount 2.5, center 배분을 넣는다. | tween 예제 | verified |
| DIST-27 | advanced stagger가 내부적으로 distribute를 쓰지만 어떤 값에도 적용할 수 있다. | intro | verified |
| DIST-28 | amount 원문은 `if amount is 1 and there 100 targets`로 be동사가 빠져 있다. | Parameters `amount` 원문 오류 | verified |
| DIST-29 | each 원문은 `If each is 1 and the there are 4 targets`로 불필요한 `the`가 있다. | Parameters `each` 원문 오류 | verified |
| DIST-30 | 영상 안내 원문은 `may help your understand`로 `your` 오타가 있다. | Parameters 뒤 영상 note 원문 오류 | verified |
| DIST-31 | SnorklTV의 GSAP 3: Beyond the Basics 과정 중 distribute 영상을 안내한다. | Parameters 뒤 영상 note | verified |
| DIST-32 | 영상에 사용된 companion Pen도 안내한다. | Parameters 뒤 Pen note | verified |
| DIST-P1 | 3.15.0에서 빈 config는 네 target 모두 숫자 0을 반환했다. | probe: `distribute({})`, 4 object targets | verified |
| DIST-P2 | 3.15.0에서 amount 1 / target 100의 첫 간격은 0.010101, 마지막은 1이었다. | probe: flat 100 targets, indexes 0·1·99 | verified |
| DIST-P3 | 3.15.0에서 amount와 each 동시 지정 시 amount가 우선했다. | probe: `{base:10, amount:30, each:2}`, 4 targets → 10·20·30·40 | verified |
| DIST-P4 | 3.15.0에서 random 순서는 같은 반환 함수 인스턴스의 반복 호출 동안 유지됐다. | probe: 하나의 distributor, 동일 6-target array를 두 번 순회 | verified |
| DIST-P5 | 3.15.0의 `[2,3]` grid에서 axis x는 행마다 0·5·10, axis y는 열마다 0·10이었다. | probe: amount 10, from start, 6 targets | verified |

### sourceBlockers

`none`. 단, 공식은 amount와 each 동시 지정 우선순위, random의 인스턴스 내 안정성, 빈 config 전체 결과, axis의 구체 수치 배열을 게시하지 않는다. 이 네 동작과 amount 문장의 정확한 실행 간격은 `DIST-P1~P5`로만 주장한다.

### moduleSelection

| module | 목적 | 근거 source |
| --- | --- | --- |
| utility (`UT`) | 반환 함수와 config 일곱 field의 타입·기본·허용·special value를 보존한다. | 전체 canonical |
| example visualizer (`EV`) | flat index 거리를 먼저 읽고 동일 descriptor를 명시적 grid heatmap으로 확장한다. | 종합 예제 + Parameters |
| property catalog (`PC`) | base, amount, each, from, grid, axis, ease를 한 표에서 비교한다. | Parameters |

### learnerFlow

| id | 학습자 질문 | sourceItemIds |
| --- | --- | --- |
| `flow:return` | 왜 첫 호출 결과가 숫자가 아니라 함수인가요? | DIST-01~05, DIST-23~24 |
| `flow:spacing` | 전체 폭과 거리 간격은 어떻게 다른가요? | DIST-06~12, DIST-28~29, DIST-P2~P3 |
| `flow:geometry` | from·grid·axis·ease가 위치를 어떻게 숫자로 바꾸나요? | DIST-13~21, DIST-P4~P5 |
| `flow:catalog` | 설정 가능한 모든 field와 기본·허용값은 무엇인가요? | DIST-05~22, DIST-P1 |
| `flow:boundary` | 계산한 함수를 tween과 stagger에 어디까지 연결하나요? | DIST-25~27, DIST-30 |

### coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| DIST-01 | `ReturnedFunctionSection` Function 설명 | covered |
| DIST-02 | `ReturnedFunctionSection` 규칙 만들기 문단 | covered |
| DIST-03 | `ReturnedFunctionSection`; `DistributionLab` row/grid | covered |
| DIST-04 | `ReturnedFunctionSection` 두 번째 호출; snapshot code | covered |
| DIST-05 | `ConfigCatalogSection` heading·표 설명 | covered |
| DIST-06 | `ConfigCatalogSection` base 행; lab descriptor | covered |
| DIST-07 | `AmountEachSection` amount 카드; catalog amount 행 | covered |
| DIST-08 | `AmountEachSection` probe 문단의 공식 근삿값 근거 | covered |
| DIST-09 | `AmountEachSection` amount 카드 | covered |
| DIST-10 | `AmountEachSection` each 카드; catalog each 행 | covered |
| DIST-11 | `AmountEachSection` each 4-target 예 | covered |
| DIST-12 | `AmountEachSection` 비교 질문 | covered |
| DIST-13 | `GridGeometrySection` note; catalog from 행 | covered |
| DIST-14 | `GridGeometrySection` 공식 문자열 목록 | covered |
| DIST-15 | `GridGeometrySection` flow의 `[x,y]` 비율 | covered |
| DIST-16 | `GridGeometrySection` from 기본값 문장 | covered |
| DIST-17 | `GridGeometrySection` flow·lab; catalog grid 행 | covered |
| DIST-18 | `DistributionLab` 명시적 `[3,4]`; catalog grid 행 | covered |
| DIST-19 | `GridGeometrySection` auto 경계 문장 | covered |
| DIST-20 | `DistributionLab` axis control·숫자 cell; catalog axis 행 | covered |
| DIST-21 | `DistributionLab` ease control·숫자 cell; catalog ease 행 | covered |
| DIST-22 | `ConfigCatalogSection` 공식 종합 config 문장 | covered |
| DIST-23 | `ReturnedFunctionSection` toArray 근거 note | covered |
| DIST-24 | `ReturnedFunctionSection` 정확한 공식 호출 note | covered |
| DIST-25 | `BoundariesSection` function-based value 코드 | covered |
| DIST-26 | `BoundariesSection` 공식 scale 코드 | covered |
| DIST-27 | `BoundariesSection` stagger 경계 | covered |
| DIST-28 | `AmountEachSection` 공식 원문 오류 block | covered |
| DIST-29 | `AmountEachSection` 공식 원문 오류 block | covered |
| DIST-30 | `BoundariesSection` 공식 원문 오류 block | covered |
| DIST-31 | `BoundariesSection` 학습 자료 note | covered |
| DIST-32 | `BoundariesSection` companion Pen note | covered |
| DIST-P1 | `ConfigCatalogSection` 빈 config probe block | covered |
| DIST-P2 | `AmountEachSection` 정확한 0.010101 probe | covered |
| DIST-P3 | `AmountEachSection` 동시 지정 probe | covered |
| DIST-P4 | `GridGeometrySection` random 인스턴스 probe | covered |
| DIST-P5 | `GridGeometrySection` axis 수치 probe | covered |

### relatedPages

- `utility-pipelines-units` — 다른 Utility Methods의 파이프·단위 계약을 소유한다. 이 페이지에서는 연결하지 않는다.
- multi-target 기초 페이지 — target 배열과 index 개념을 소유한다. 이 범위에서 route를 추정해 링크하지 않는다.
- easing 페이지 — ease 곡선 자체를 소유한다. 이 페이지는 거리 배분에 적용된다는 사실만 쓴다.
- Staggers 공식 영역 — advanced stagger 계약을 소유한다. 이 페이지는 내부에서 distribute를 쓴다는 경계만 보존한다.

## 구현 계약

### exactFiles

create only:

```text
src/content/gsap/fundamentals/utility-distribute/UtilityDistributePage.tsx
src/content/gsap/fundamentals/utility-distribute/UtilityDistributePage.css
src/content/gsap/fundamentals/utility-distribute/utility-distribute.meta.ts
src/content/gsap/fundamentals/utility-distribute/utility-distribute.catalog.ts
src/content/gsap/fundamentals/utility-distribute/components/PageCoverage/PageCoverage.tsx
src/content/gsap/fundamentals/utility-distribute/components/SectionHeading/SectionHeading.tsx
src/content/gsap/fundamentals/utility-distribute/examples/DistributionLab/DistributionLab.tsx
src/content/gsap/fundamentals/utility-distribute/examples/DistributionLab/DistributionLab.css
src/content/gsap/fundamentals/utility-distribute/examples/DistributionLab/useDistributeRuntime.ts
src/content/gsap/fundamentals/utility-distribute/sections/ReturnedFunctionSection/ReturnedFunctionSection.tsx
src/content/gsap/fundamentals/utility-distribute/sections/AmountEachSection/AmountEachSection.tsx
src/content/gsap/fundamentals/utility-distribute/sections/GridGeometrySection/GridGeometrySection.tsx
src/content/gsap/fundamentals/utility-distribute/sections/ConfigCatalogSection/ConfigCatalogSection.tsx
src/content/gsap/fundamentals/utility-distribute/sections/BoundariesSection/BoundariesSection.tsx
docs/handoffs/gsap/core/utility-distribute.md
```

modify:

```text
src/app/routes.ts
```

### exampleContracts

#### `DistributionLab`

- goal: flat row의 index 거리에서 시작해 같은 설정을 3×4 grid 거리 heatmap으로 펼친다.
- question: amount/each, from, grid, axis, ease가 각 cell 반환 숫자를 어떻게 바꾸는가?
- representation: 숫자·heat를 함께 표시한 ordered cells, min/max/call count, 실제 code snapshot
- controls: row/grid, amount/each, distance, from(start/center/end/edges), ease(none/power1.inOut), axis(both/x/y; grid에서만 활성)
- runtimeSource: `useDistributeRuntime.ts`
- sourcePath: `examples/DistributionLab/useDistributeRuntime.ts`
- runtimeOwnership: hook이 controls를 하나의 `DistributionDescriptor`로 정규화하고 `gsap.utils.distribute(descriptor.config)`를 한 번 만든다. target array의 각 cell에 `distributor(index, target, targets)`를 호출한 결과, min/max/heat, 표시 code를 하나의 `DistributionSnapshot`으로 만든다.
- displayOwnership: TSX는 snapshot의 descriptor·cells·code만 표시하며 GSAP을 import하거나 값을 다시 계산하지 않는다.
- accessibility: native fieldset/label/select/range/output, layout button `aria-pressed`, ordered list와 cell별 numeric accessible name, 연속 live region 없음.
- motion: 애니메이션·autoplay·transition이 없는 숫자 계산 실습이며 reduced-motion에서도 같은 결과를 유지한다.

### nonGoals

- `grid: "auto"`의 DOM geometry를 모의 구현하지 않는다. 공식 허용값과 경계로만 설명한다.
- `from: "random"`을 interactive control로 넣어 snapshot 재생성마다 값이 바뀌게 하지 않는다.
- stagger config나 tween 재생 동작을 이 페이지의 runtime으로 구현하지 않는다.
- 공식이 게시하지 않은 amount/each 우선순위나 random 안정성을 일반 보장으로 확장하지 않는다.
- 타 페이지 수정, 테스트 코드 추가를 하지 않는다.

### preserve

- 타 content 폴더
- page37 `utility-pipelines-units`를 포함한 기존 페이지와 handoff
- master inventory·curriculum의 소유권

## 검증 계약

### verifiedPerspectives

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion, Target TypeScript, Cross-page Consistency를 구현 컨텍스트가 판정했다. route·Vite·Storybook·브라우저는 이 범위에서 판정하지 않았다.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-CORE39-001 | PASS | canonical rendered 두 회에서 Returns·두 예제·Parameters 일곱 field·notes를 대조했고 raw 두 회 SHA-256도 일치했다. | source 재현 가능 | none |
| ERR-CORE39-001 | PASS | amount의 `there 100`, each의 `the there`, 영상 note의 `your understand`를 catalog와 렌더 block에 각각 보존했다. | 공식 오류가 교정문에 묻히지 않음 | none |
| PROBE-CORE39-001 | PASS | GSAP 3.15.0 Node 실행에서 P1~P5를 config·target 수·반복 조건과 함께 확인했다. | 공식 침묵과 실행 관찰 분리 | 버전 변경 시 재실행 |
| OC-CORE39-001 | PASS | catalog 공식 32개 + probe 5개, meta 섹션 공식 분모 6+9+9+2+6=32, handoff sourceManifest·coverageMap 각 37개를 item-level로 대응했다. | 공식 coverage와 probe 분리 완결 | none |
| LT-CORE39-001 | PASS | 공식의 config 나열을 반환 함수 → amount/each → row/grid 거리 → 전체 catalog → 소비처 경계라는 질문 순서로 재구성했다. | API reference가 결정 흐름으로 변환됨 | none |
| PED-CORE39-001 | PASS | lab은 1D row를 기본값으로 시작하고 사용자가 2D grid로 전환해 같은 설정의 cell 숫자·heat를 비교한다. 네 학습 패널도 관찰·이유·용도를 분리한다. | index에서 grid로 인지 부하를 단계화 | none |
| RDS-CORE39-001 | PASS | `useDistributeRuntime`의 descriptor 하나가 GSAP config·cells·serialized code를 만들고 TSX에는 GSAP import가 없다. | runtime/display 동기화 | none |
| STRUCT-CORE39-001 | PASS | page/components/sections/examples/catalog/meta가 전용 폴더 안에 있고 examples/runtime의 각 선언에 한 줄 한국어 주석, 모든 export에 `/** ... */` 한 줄을 확인했다. | 프로젝트 구조·주석 계약 충족 | none |
| XC-CORE39-001 | PASS | tween은 function-based value 예제만, stagger는 내부 사용 경계만 남기고 ease·multi-target·다른 Utility Methods의 설명 소유권을 가져오지 않았다. 미등록 내부 route 링크도 없다. | cross-page 소유권 유지 | none |
| A11Y-CORE39-001 | PASS-STATIC | label/output/aria-pressed/ordered cells를 정적으로 확인했고 연속 live region·autoplay가 없다. | 정적 접근성·모션 계약 충족 | 통합 뒤 키보드·viewport 실검 |
| BROWSER-CORE39-001 | DEFERRED → PASS | 현재 실행 환경에 사용할 수 있는 browser backend가 없어 실제 키보드 조작과 320/390px 화면 검수를 실행하지 못했다. 3×4 grid는 작은 화면에서도 실제 descriptor의 네 열을 유지하도록 정적으로 확인했다. | 실제 화면 판정만 보류 | browser backend가 제공되면 보완 |
| BUILD-CORE39-001 | PASS | `npx tsc --noEmit`, `npm run build`, `npm run build-storybook`이 모두 exit 0이었다. | 전체 TypeScript·Vite·Storybook graph 통과 | none |
| INTEGRATION-CORE39-001 | PASS | route lazy import와 lesson 등록 뒤 Vite 782 modules, Storybook 920 modules를 변환했고 두 산출물에 UtilityDistributePage 전용 JS·CSS chunk가 생성됐다. | 앱과 Storybook이 새 페이지를 실제 bundle에 포함 | none |
| RELEASE-CORE39-001 | PASS | official32/probe5 item coverage, route, TypeScript, 두 production build가 모두 통과했고 blocker가 없다. | 페이지 단위 커밋 가능 | none |

### verificationEvidence

- official rendered read #1/#2: canonical의 Returns, examples, Parameters, notes 직접 대조 (2026-08-08)
- official raw read #1/#2: 동일 SHA-256 `e8694f8825d5b4b63036d9a6608a0eb489403f2052f3537077d77d5533ca3f89`
- GSAP probe: 설치본 `gsap.version === "3.15.0"`; empty, amount precision, amount+each, random repeat, `[2,3]` axis x/y 실행
- target TypeScript: 대상 파일 + `src/vite-env.d.ts`, exit 0
- static checks: catalog/meta/handoff ID 수, TSX GSAP import 없음, scope 외 변경 없음
- route: `src/app/routes.ts` lazy import와 `utility-distribute` lesson 등록
- full TypeScript: `npx tsc --noEmit`, exit 0
- Vite: `npm run build`, 782 modules, `UtilityDistributePage-B_QQIMMh.js`, `UtilityDistributePage-BjPMfFsK.css`, exit 0
- Storybook: `npm run build-storybook`, 920 modules, `UtilityDistributePage-CAmznMjb.js`, `UtilityDistributePage-BjPMfFsK.css`, exit 0

### releaseDecision

`PASS` — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 재감사

- `SRC-UD2` — **PASS**: distribute 공식 페이지를 다시 조회했다.
- `RDS-UD2` — **PASS**: 각 lab의 runtime descriptor·snapshot·표시 코드를 정적으로 대조해 BLOCK이 없었다.
- `PED-UD2` — **ADDRESSED**: 첫 화면의 `source`·`item`·`probe`를 값 분배의 핵심 동작과 직접 확인한 조합 경계로 바꿨다.
- `BROWSER-UD2` — **DEFERRED**: 실제 control·키보드·반응형·motion 조작은 수행하지 않았다.
- Storybook: `N/A` — c309e13에서 의도적으로 삭제됐다.
- releaseDecision: `PASS with DEFERRED` — 정적 BLOCK은 없고 브라우저 관점만 `DEFERRED`다.

## 2026-08-13 최종 교차검토

- Static BLOCK: 없음. Browser: 사용자 승인 전 실조작을 수행하지 않아 `DEFERRED`. Storybook: c309e13에서 삭제되어 `N/A`.
- overallDecision: `NOT VERIFIED`
- releaseDecision: `NOT VERIFIED`
