# gsap.utils handoff

## 입력 계약

### objective

`gsap.utils`가 호출 함수가 아니라 17개 utility의 namespace임을 이해하고, 같은 utility가 즉시 값과 재사용 함수를 돌려주는 두 방식 및 문제별 네 갈래를 공식 두 허브와 GSAP 3.15.0 실행으로 가르친다.

### officialPage

- canonicalUrl: `GSAP/gsap.utils` · `GSAP/UtilityMethods`
- reviewedAt: `2026-08-08`
- slug: `gsap-utils`
- localPath: `src/content/gsap/fundamentals/gsap-utils/`
- route: `/fundamentals/gsap-utils`

### sourceManifest

`gsap-utils.catalog.ts`가 공식 47개와 probe 5개의 item별 문장·source·section authority다.

| source | 공식 item | sourceStatus |
| --- | ---: | --- |
| gsap-utils | 24 | verified |
| utility-methods | 23 | verified |
| 합계 | 47 | verified |

| sourceItemIds | sourceLocation | sourceStatus |
| --- | --- | --- |
| GU-01~06 | breadcrumb property 분류·Type Object·intro·function mode·target별 호출·video | verified |
| GU-07~24 | Utility/Description 표 17행과 각 예제·문구·오류 | verified |
| UM-01~05 | Useful features 분류·intro·function mode·target별 호출·video | verified |
| UM-06~23 | Available Utils 17항목과 각 문구·표기 차이·오류 | verified |

공식 URL 두 개를 각각 조회하고, 원본 HTML에서 heading·intro·video·17개 목록·예제 문장을 두 번째로 다시 대조했다.

### sourceBlockers

`none`.

- `gsap.utils`의 `wrapYoyo` 배열 예제는 함수 이름을 `wrap`이라고 잘못 적었다. 로컬 표는 GSAP 3.15.0 실행으로 확인한 의도인 `wrapYoyo`를 쓰고 오류를 명시한다.
- Utility Methods의 `unitize` 예제는 함수 생성 뒤 세미콜론이 빠졌다. 로컬 표는 실행 가능한 의도를 쓰고 원문의 오류를 명시한다.
- Utility Methods의 `checkPrefix` 설명은 `provided`를 `proved`로 잘못 적었다. 로컬 설명은 이 차이를 숨기지 않는다.
- 두 허브의 `wrap`·`wrapYoyo` 설명은 문장이 다르지만 실행 결과는 모두 일치한다. 모순으로 고치지 않는다.

### learnerFlow

1. `gsap.utils`가 method가 아닌 Object property임을 구분한다.
2. 마지막 값 인자 유무로 즉시 값과 재사용 함수 모드를 비교한다.
3. 공식 17개를 문제별 네 갈래로 찾는다.
4. 범위·보간 다섯 함수를 고른다.
5. 조합·단위 네 함수를 고른다.
6. 대상·무작위 네 함수와 `shuffle` 변이를 구분한다.
7. 배분·순환 네 함수와 공식 오류를 확인한다.

### coverageMap

| sourceItemIds | localEvidence | localStatus |
| --- | --- | --- |
| GU-01~03, GU-06, UM-01~02, UM-05 | `WhyUtilsSection.tsx` property/hub/Type/video·조합 경계 | covered |
| GU-04~05, UM-03~04 | `TwoModesSection.tsx`·`ValueOrFunctionLab` 즉시 값/함수/target별 호출 | covered |
| GU-07, UM-06 | `CatalogMapSection.tsx` 17개 전체 이름·네 갈래·표기 차이, `UtilityFamilyTable.tsx` 전용 문서 링크·두 허브 설명 | covered |
| GU-09, GU-12~14, GU-20, UM-08, UM-11~13, UM-19 | `RangeFamilySection.tsx`·`UtilityFamilyTable` 설명·공식 예제 | covered |
| GU-08, GU-11, GU-15, GU-22, UM-07, UM-10, UM-14, UM-21 | `ComposeFamilySection.tsx`·`UtilityFamilyTable` 설명·공식 예제·unitize 오류 | covered |
| GU-16~18, GU-21, UM-15~17, UM-20 | `CollectionFamilySection.tsx`·`UtilityFamilyTable` 설명·예제·shuffle in-place | covered |
| GU-10, GU-19, GU-23~24, UM-09, UM-18, UM-22~23 | `SpreadFamilySection.tsx`·`UtilityFamilyTable` 설명·예제·wrapYoyo 오류 | covered |
| UT-P1~03 | `WhyUtilsSection.tsx` namespace Object/비호출 경계, `CatalogMapSection.tsx` 설치본 이름·member 타입·결정적 예제 | covered (probe) |
| UT-P5 | `TwoModesSection.tsx` 무인자 반환 분류 | covered (probe) |
| UT-P4 | `SpreadFamilySection.tsx` 두 설명과 숫자·배열 실행 결과 | covered (probe) |

## 구현 계약

### exactFiles

- create/adopt: 이 handoff와 `gsap-utils/` 아래 catalog·meta·utilities·page·components·sections·examples 전체
- modify: `src/app/routes.ts`
- preserve: 공식 47/probe 5 분리, 17개 전체 목록, 공식 오류 세 가지와 실행으로 확인한 의도

### exampleContracts

#### ValueOrFunctionLab

- goal: 같은 `clamp`를 마지막 값 인자까지 주거나 빼서 number와 function 반환 차이를 확인하고, 반환 함수를 `pipe`·`snap`에 연결한다.
- controls: value/function radio, numeric input
- runtimeSource: `examples/ValueOrFunctionLab/ValueOrFunctionLab.example.ts`
- runtimeOwnership: normalized descriptor, 실제 `clamp`·`pipe`·`snap` 호출, 반환 타입·결과 readings
- displayOwnership: TSX는 같은 descriptor와 readings로 table·status·code를 만든다.
- accessibility/motion: label/radio/number input, 이산 변경 status, animation·autoplay 없음

### preserve

- `gsap.utils` Type Object와 17개 함수 namespace
- 여러 utility의 즉시 값/재사용 함수 두 mode
- `shuffle` in-place
- `unitize` 세미콜론 누락, `checkPrefix` 오타, `wrapYoyo` 함수명 오류
- `wrap`·`wrapYoyo` 두 허브의 다른 설명과 일치하는 실행 결과

## 검증 계약

### findings

| ID | status | evidence | requiredAction |
| --- | --- | --- | --- |
| SRC-GU-001 | PASS | canonical 2개 + 원본 HTML 2차 대조 | none |
| PROBE-GU-001 | PASS | Node22·GSAP3.15.0 names·types·example expressions·무인자 반환 | provenance 유지 |
| OC-GU-001 | PASS | 공식47=meta47=coverage47, probe5, ID 중복0 | none |
| RDS-GU-001 | PASS | descriptor→실제 utility→readings/code, TSX GSAP import0 | none |
| A11Y-STATIC-GU-001 | PASS | label/radio/input/status, autoplay·연속 live 없음 | none |
| REVIEW-GU-001 | PASS | Critical 0, Important 7건(input·UM 근거·live·주석·handoff·localEvidence 2건)과 Minor 1건 반영 | none |
| BUILD-GU-001 | PASS | root app·Storybook final build exit 0 | none |
| A11Y-GU-001 | DEFERRED → PASS | 브라우저 keyboard·responsive | 일괄 검수 |

### verificationEvidence

- static: official47/probe5/meta47/source2/utility17/ID중복0/route1/TSX GSAP import0
- probe: namespace object, member17 all function, deterministic examples14, no-arg function11/value4/TypeError2
- build: 저장소 root `npm run build` exit 0, `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook` exit 0
- review: official47/probe5·utility17·공식 오류·descriptor sync·주석·live·links·handoff localEvidence 재감사 완료

### releaseDecision

`PASS` — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
