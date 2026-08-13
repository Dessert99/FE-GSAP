# Range interpolation handoff

## 입력 계약

### objective

`clamp → normalize → mapRange/interpolate → splitColor`를 하나의 값 변환 pipeline으로 이해하고, 즉시 값과 재사용 함수 overload, 숫자·색·문자열·배열·객체 보간, RGB/HSL 성분, 범위 밖 실행 차이를 공식 다섯 문서와 GSAP 3.15.0 실행으로 구분해 가르친다.

### officialPage

- title: `clamp` + `interpolate` + `mapRange` + `normalize` + `splitColor`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/UtilityMethods/clamp()`
  - `https://gsap.com/docs/v3/GSAP/UtilityMethods/interpolate()`
  - `https://gsap.com/docs/v3/GSAP/UtilityMethods/mapRange()`
  - `https://gsap.com/docs/v3/GSAP/UtilityMethods/normalize()`
  - `https://gsap.com/docs/v3/GSAP/UtilityMethods/splitColor()`
- reviewedAt: `2026-08-08`
- category: `Useful features & tools > Utility Methods`
- slug: `range-interpolation`
- sourcePageIds: primary `source:utils-clamp`; related `source:utils-interpolate`, `source:utils-map-range`, `source:utils-normalize`, `source:utils-split-color`

### localPage

- localPath: `src/content/gsap/fundamentals/range-interpolation/`
- route: `/fundamentals/range-interpolation`
- route integration: `src/app/routes.ts`의 값 계산 group에 lazy page와 lesson을 등록했다.

### sourceManifest

item-level authority는 `range-interpolation.catalog.ts`다. 각 행은 `sourceLocation`, `sourceStatus`, `origin`, `sectionId`, `localStatus`를 갖고 공식 49개와 probe 6개를 분리한다.

| canonical | source item | 공식 item | sourceStatus |
| --- | --- | ---: | --- |
| `utils-clamp` | `CL-01~09` | 9 | verified |
| `utils-interpolate` | `IN-01~16` | 16 | verified |
| `utils-map-range` | `MR-01~10` | 10 | verified |
| `utils-normalize` | `NO-01~09` | 9 | verified |
| `utils-split-color` | `SC-01~05` | 5 | verified |
| 합계 |  | 49 | verified |

| probe item | 측정 대상 | sourceStatus |
| --- | --- | --- |
| `RI-P1` | 실행 가능한 공식 예제 전체와 splitColor comma 누락 의도 | verified |
| `RI-P2` | direct/reusable 반환 type과 공식 재사용 결과 | verified |
| `RI-P3` | clamp와 normalize/mapRange의 범위 밖 차이 | verified |
| `RI-P4` | interpolate shape별 0~1 밖 결과 | verified |
| `RI-P5` | object 기본 복사와 `true` 원본 mutation identity | verified |
| `RI-P6` | 0폭·역방향 범위의 설치본 결과 | verified |

아래 표가 handoff의 item별 source manifest와 coverage map이다. `localEvidence`는 `src/content/gsap/fundamentals/range-interpolation/` 기준 상대 경로다.

| sourceItemId | officialItem / implementationItem | sourceLocation | sourceStatus | localEvidence | localStatus |
| --- | --- | --- | --- | --- | --- |
| `CL-01` | clamp는 minimum 아래면 minimum, maximum 위면 maximum, 사이면 원래 숫자를 반환한다. | clamp intro | verified | `sections/PipelineModelSection/PipelineModelSection.tsx` | covered |
| `CL-02` | valueToClamp를 주면 즉시 값, 생략하면 범위를 기억한 함수를 반환한다. | clamp signature chooser | verified | `sections/RangeContractsSection/RangeContractsSection.tsx` | covered |
| `CL-03` | 즉시 signature는 `clamp(minimum:Number, maximum:Number, valueToClamp:Number)`다. | clamp 1) signature·Parameters | verified | `sections/RangeContractsSection/RangeContractsSection.tsx` | covered |
| `CL-04` | 즉시 호출은 숫자를 반환하며 105→100, -50→0, 20→20이다. | clamp 1) Returns·Example | verified | `sections/RangeContractsSection/RangeContractsSection.tsx` | covered |
| `CL-05` | 재사용 signature는 `clamp(minimum:Number, maximum:Number)`다. | clamp 2) signature·Parameters | verified | `sections/RangeContractsSection/RangeContractsSection.tsx` | covered |
| `CL-06` | valueToClamp 생략 시 값 하나를 받으며 범위를 기억하는 함수를 반환한다. | clamp 2) Returns·설명 | verified | `sections/RangeContractsSection/RangeContractsSection.tsx` | covered |
| `CL-07` | 공식 clamper는 105, -50, 20을 100, 0, 20으로 바꾼다. | clamp 2) Example | verified | `sections/RangeContractsSection/RangeContractsSection.tsx` | covered |
| `CL-08` | 공식 tip은 재사용 함수를 pipe로 이어 여러 변환을 적용할 수 있다고 설명한다. | clamp reusable-functions Tip | verified | `sections/PipelineModelSection/PipelineModelSection.tsx` | covered |
| `CL-09` | 공식 pipeline은 clamp(0,100) → mapRange(window.innerWidth) → snap(20)에 25.874를 넣는다. | clamp Tip pipeline code | verified | `sections/PipelineModelSection/PipelineModelSection.tsx` | covered |
| `IN-01` | interpolate는 비슷한 타입의 number·color·string·array·complex string·object를 선형 보간한다. | interpolate intro | verified | `sections/InterpolationShapesSection/InterpolationShapesSection.tsx` | covered |
| `IN-02` | progress를 주면 즉시 값, 생략하면 progress를 나중에 받는 함수를 반환한다. | interpolate signature chooser | verified | `sections/InterpolationShapesSection/InterpolationShapesSection.tsx` | covered |
| `IN-03` | 첫 signature는 `interpolate(startValue, endValue, progress)`이고 0·0.5·1은 시작·절반·끝이다. | interpolate 1) signature·Parameters | verified | `sections/InterpolationShapesSection/InterpolationShapesSection.tsx` | covered |
| `IN-04` | 보간값을 반환하며 color는 rgba 또는 endValue에서 감지한 hsla 형식이다. | interpolate 1) Returns·color format | verified | `sections/InterpolationShapesSection/InterpolationShapesSection.tsx` | covered |
| `IN-05` | 즉시 예제는 number·px string·color·여러 property object의 0.5 결과를 보여 준다. | interpolate 1) Example | verified | `sections/InterpolationShapesSection/InterpolationShapesSection.tsx` | covered |
| `IN-06` | 두 번째 signature는 `interpolate(array, progress)`이고 비슷한 타입의 여러 지점을 잇는다. | interpolate 2) signature·Parameters | verified | `sections/InterpolationShapesSection/InterpolationShapesSection.tsx` | covered |
| `IN-07` | array 예제는 number 세 지점의 0.5·0.75와 color 세 지점의 0.5·0.25 결과를 보여 준다. | interpolate 2) Returns·Example | verified | `sections/InterpolationShapesSection/InterpolationShapesSection.tsx` | covered |
| `IN-08` | 세 번째 signature는 progress를 생략한 `interpolate(startValue, endValue)`다. | interpolate 3) signature | verified | `sections/InterpolationShapesSection/InterpolationShapesSection.tsx` | covered |
| `IN-09` | 세 번째 signature는 두 끝값을 기억하고 progress 하나를 받는 함수를 반환한다. | interpolate 3) Returns·설명 | verified | `sections/InterpolationShapesSection/InterpolationShapesSection.tsx` | covered |
| `IN-10` | 재사용 예제는 number 함수의 0.5·0.25·1과 object 함수의 0.5 결과를 보여 준다. | interpolate 3) Example | verified | `sections/InterpolationShapesSection/InterpolationShapesSection.tsx` | covered |
| `IN-11` | object 보간에서 세 번째 인자 true는 별도 object 대신 원본 startValue를 변경한다. | interpolate mutation note | verified | `sections/InterpolationShapesSection/InterpolationShapesSection.tsx` | covered |
| `IN-12` | 네 번째 signature는 progress를 생략한 `interpolate(array)`다. | interpolate 4) signature | verified | `sections/InterpolationShapesSection/InterpolationShapesSection.tsx` | covered |
| `IN-13` | 네 번째 signature는 array를 기억하고 progress 하나를 받는 함수를 반환한다. | interpolate 4) Returns·설명 | verified | `sections/InterpolationShapesSection/InterpolationShapesSection.tsx` | covered |
| `IN-14` | 재사용 array 예제는 number 지점의 0.5·0.75와 color 지점의 0.25 결과를 보여 준다. | interpolate 4) Example | verified | `sections/InterpolationShapesSection/InterpolationShapesSection.tsx` | covered |
| `IN-15` | 공식 colorizer는 clamp → normalize → interpolate(red,blue)에 25.874를 넣는다. | interpolate Tip pipeline | verified | `sections/PipelineModelSection/PipelineModelSection.tsx` | covered |
| `IN-16` | 페이지는 reusable utility 조합 video demo를 제공한다. | interpolate utility-combination video | verified | `sections/PipelineModelSection/PipelineModelSection.tsx` | covered |
| `MR-01` | mapRange는 한 범위의 상대 위치를 다른 범위의 같은 위치로 옮기며 비율처럼 생각한다. | mapRange intro ratio | verified | `sections/PipelineModelSection/PipelineModelSection.tsx` | covered |
| `MR-02` | 공식 사용 예는 폭 200px slider를 0~window.innerWidth 이동에 대응시키는 경우다. | mapRange 200px slider use case | verified | `sections/PipelineModelSection/PipelineModelSection.tsx` | covered |
| `MR-03` | valueToMap을 주면 즉시 값, 생략하면 두 범위를 기억한 함수를 반환한다. | mapRange signature chooser | verified | `sections/RangeContractsSection/RangeContractsSection.tsx` | covered |
| `MR-04` | 즉시 signature는 네 range bound와 valueToMap Number를 받으며 value는 보통 입력 범위 안이다. | mapRange 1) signature·Parameters | verified | `sections/RangeContractsSection/RangeContractsSection.tsx` | covered |
| `MR-05` | 즉시 예제는 (-10,10)의 0→(100,200)의 150, (0,100)의 50→(0,500)의 250이다. | mapRange 1) Returns·Example | verified | `sections/RangeContractsSection/RangeContractsSection.tsx` | covered |
| `MR-06` | 재사용 signature는 valueToMap을 생략한 네 range bound다. | mapRange 2) signature·Parameters | verified | `sections/RangeContractsSection/RangeContractsSection.tsx` | covered |
| `MR-07` | valueToMap 생략 시 입력·출력 범위를 기억하고 숫자 하나를 받는 함수를 반환한다. | mapRange 2) Returns·설명 | verified | `sections/RangeContractsSection/RangeContractsSection.tsx` | covered |
| `MR-08` | 공식 mapper는 50→125, 10→25를 반환한다. | mapRange 2) Example | verified | `sections/RangeContractsSection/RangeContractsSection.tsx` | covered |
| `MR-09` | 공식 tip은 재사용 함수를 pipe로 이어 여러 변환을 적용할 수 있다고 설명한다. | mapRange reusable-functions Tip | verified | `sections/PipelineModelSection/PipelineModelSection.tsx` | covered |
| `MR-10` | tip은 clamp→mapRange(window.innerWidth)→snap(20) 코드와 조합 video를 제공한다. | mapRange Tip code·video | verified | `sections/PipelineModelSection/PipelineModelSection.tsx` | covered |
| `NO-01` | normalize는 입력 범위를 0~1로 옮기며 출력 0·1이 고정된 mapRange와 같다. | normalize intro·mapRange relation | verified | `sections/PipelineModelSection/PipelineModelSection.tsx` | covered |
| `NO-02` | valueToNormalize를 주면 즉시 값, 생략하면 범위를 기억한 함수를 반환한다. | normalize signature chooser | verified | `sections/RangeContractsSection/RangeContractsSection.tsx` | covered |
| `NO-03` | 즉시 signature는 `normalize(minimum, maximum, valueToNormalize)`다. | normalize 1) signature·Parameters | verified | `sections/RangeContractsSection/RangeContractsSection.tsx` | covered |
| `NO-04` | 즉시 예제는 (-10,10)의 0→0.5와 (0,100)의 25→0.25다. | normalize 1) Returns·Example | verified | `sections/RangeContractsSection/RangeContractsSection.tsx` | covered |
| `NO-05` | 재사용 signature는 `normalize(minimum, maximum)`다. | normalize 2) signature·Parameters | verified | `sections/RangeContractsSection/RangeContractsSection.tsx` | covered |
| `NO-06` | valueToNormalize 생략 시 범위를 기억하고 값 하나를 받는 함수를 반환한다. | normalize 2) Returns·설명 | verified | `sections/RangeContractsSection/RangeContractsSection.tsx` | covered |
| `NO-07` | 공식은 반환 함수 이름을 clamper라 하고 50→0.5, 10→0.1, 75→0.75를 보여 준다. | normalize 2) Example | verified | `sections/RangeContractsSection/RangeContractsSection.tsx` | covered |
| `NO-08` | 공식 tip은 재사용 함수를 pipe로 이어 여러 변환을 적용할 수 있다고 설명한다. | normalize reusable-functions Tip | verified | `sections/PipelineModelSection/PipelineModelSection.tsx` | covered |
| `NO-09` | tip은 clamp→mapRange(window.innerWidth)→snap(20) 코드와 조합 video를 제공한다. | normalize Tip code·video | verified | `sections/PipelineModelSection/PipelineModelSection.tsx` | covered |
| `SC-01` | splitColor는 RGB 3항 또는 alpha 4항 array를 반환하며 첫 4항 예시는 comma 하나가 빠져 있다. | splitColor Returns intro | verified | `sections/ColorComponentsSection/ColorComponentsSection.tsx`; `sections/BoundariesSection/BoundariesSection.tsx` | covered |
| `SC-02` | 두 번째 인자 true는 RGB 대신 HSL(A) 성분을 요청한다. | splitColor optional HSL intro | verified | `sections/ColorComponentsSection/ColorComponentsSection.tsx` | covered |
| `SC-03` | rgb(a)·hsl(a)·hex·기본 named color를 처리한다. | splitColor supported formats | verified | `sections/ColorComponentsSection/ColorComponentsSection.tsx` | covered |
| `SC-04` | 공식 예제는 red·hex·rgba·hex+true 네 입력의 정확한 array 결과를 보여 준다. | splitColor four Examples | verified | `sections/ColorComponentsSection/ColorComponentsSection.tsx` | covered |
| `SC-05` | 반환 type은 Array고 Parameters는 color:String과 optional returnHSL:Boolean이다. | splitColor Returns·Parameters | verified | `sections/ColorComponentsSection/ColorComponentsSection.tsx` | covered |
| `RI-P1` | implementationItem: 실행 가능한 공식 예제는 일치했고 comma 누락 4항의 의도는 `[255,0,128,1]`이다. | Node 22·GSAP 3.15.0 official-example matrix | verified | `sections/BoundariesSection/BoundariesSection.tsx` | covered (probe) |
| `RI-P2` | implementationItem: 다섯 reusable 형태는 function이며 공식 입력에서 100·125·0.5·25·275를 반환했다. | Node 22·GSAP 3.15.0 reusable-function probe | verified | `sections/RangeContractsSection/RangeContractsSection.tsx`; `examples/RangeInterpolationLab/useRangeInterpolationRuntime.ts` | covered (probe) |
| `RI-P3` | implementationItem: clamp는 제한하지만 normalize와 mapRange는 범위 밖에서 -0.5/1.5와 -180/540으로 외삽했다. | Node 22·GSAP 3.15.0 out-of-range probe | verified | `sections/BoundariesSection/BoundariesSection.tsx` | covered (probe) |
| `RI-P4` | implementationItem: 0~1 밖 interpolate는 number·color·waypoint array에서 서로 다른 결과와 TypeError를 보였다. | Node 22·GSAP 3.15.0 progress-boundary probe | verified | `sections/BoundariesSection/BoundariesSection.tsx` | covered (probe) |
| `RI-P5` | implementationItem: object 기본 결과는 새 참조이고 true를 준 결과는 start 원본과 같은 참조다. | Node 22·GSAP 3.15.0 object identity probe | verified | `sections/InterpolationShapesSection/InterpolationShapesSection.tsx` | covered (probe) |
| `RI-P6` | implementationItem: 0폭 normalize/mapRange는 0, 역방향 normalize는 0.75, 역방향 clamp는 100이었다. | Node 22·GSAP 3.15.0 degenerate-range probe | verified | `sections/BoundariesSection/BoundariesSection.tsx` | covered (probe) |

대조는 두 번 분리해 수행했다.

1. 다섯 canonical의 렌더링 원문에서 intro, heading, signature, parameter, returns, example, tip, video, mutation note를 처음부터 끝까지 읽었다.
2. 같은 URL 다섯 개의 raw HTML을 새로 받아 primary content의 signature heading 수 `2 / 4 / 2 / 2 / Returns+Parameters`, Returns 수 `2 / 4 / 2 / 2 / 1`, example·tip·mutation 문장을 다시 찾았다. raw 크기는 각각 81,272 / 107,816 / 82,086 / 80,722 / 65,980 bytes였다.

### sourceBlockers

`none`.

공식 오류 한 건을 실행값으로 덮어쓰지 않는다.

- `splitColor`의 Returns 소개 첫 4항 예시는 `[255, 0 128, 1]`로 comma 하나가 빠져 있다. `SC-01`은 원문을 그대로 기록하고, `RI-P1`은 공식의 다른 실제 예제와 GSAP 3.15.0 실행이 `[red, green, blue, alpha]` 의도임을 따로 보존한다.

공식이 침묵한 범위 밖·0폭·역방향·object identity는 `RI-P3~P6` probe로만 주장한다.

### moduleSelection

| module | 목적 |
| --- | --- |
| utility·overload | direct와 reusable signature, 인자·반환·선택 기준을 모두 비교한다. |
| concept·guide | clamp·normalize·mapRange·interpolate의 책임을 하나의 progress pipeline으로 구분한다. |
| ease·visualizer의 정적 표현 | animation 없이 정렬된 number line으로 같은 상대 위치를 보여 준다. |

### learnerFlow

1. clamp는 자르고 normalize/mapRange는 상대 위치를 보존한다는 차이를 잡는다.
2. 마지막 값 인자 유무로 즉시 값과 재사용 함수를 고른다.
3. 같은 input을 clamp → normalize → mapRange/interpolate 순서로 실제 계산한다.
4. 같은 progress가 number·color·array·object에 어떻게 적용되는지 비교한다.
5. 보간 color를 splitColor로 RGB(A)·HSL(A) 성분으로 읽는다.
6. 공식 0~1 계약 밖 결과와 splitColor 원문 오류를 official/probe로 분리한다.

### coverageMap

| sourceItemIds | localEvidence | localStatus |
| --- | --- | --- |
| `CL-01,08~09`, `MR-01~02,09~10`, `NO-01,08~09`, `IN-15~16` | `PipelineModelSection.tsx`의 책임별 pipeline·공식 조합 설명 | covered |
| `CL-02~07`, `MR-03~08`, `NO-02~07` | `RangeContractsSection.tsx`의 여섯 signature·인자·반환·공식 예제 | covered |
| `IN-01~14` | `InterpolationShapesSection.tsx`의 네 signature·shape·color 반환·mutation warning | covered |
| `SC-01~05` | `ColorComponentsSection.tsx`의 지원 형식·parameter·RGB/HSL/alpha 표와 `BoundariesSection.tsx` 원문 오류 | covered |
| `RI-P1,03~04,06` | `BoundariesSection.tsx` official/probe 경계·오류·권장 순서 | covered (probe) |
| `RI-P2` | `RangeContractsSection.tsx`와 `RangeInterpolationLab` direct/reusable 실제 계산 | covered (probe) |
| `RI-P5` | `InterpolationShapesSection.tsx` object identity warning | covered (probe) |

### relatedPages

- `gsap-utils` — 17개 utility 전체 지도와 함수 반환 멘탈 모델의 소유자다.
- `easing` — 시간 progress의 속도 곡선을 소유한다. 이 페이지의 progress는 값 범위의 상대 위치다.
- `utility-pipelines-units` — `pipe`, `unitize`, `getUnit`, `checkPrefix`의 전체 계약을 소유한다.
- `modifiers-snap-wrap` — 매 render 값 가공과 snap·wrap 경계를 소유한다.

## 구현 계약

### exactFiles

create:

- `src/content/gsap/fundamentals/range-interpolation/RangeInterpolationPage.tsx`
- `src/content/gsap/fundamentals/range-interpolation/RangeInterpolationPage.css`
- `src/content/gsap/fundamentals/range-interpolation/range-interpolation.meta.ts`
- `src/content/gsap/fundamentals/range-interpolation/range-interpolation.catalog.ts`
- `src/content/gsap/fundamentals/range-interpolation/components/PageCoverage/PageCoverage.tsx`
- `src/content/gsap/fundamentals/range-interpolation/components/SectionHeading/SectionHeading.tsx`
- `src/content/gsap/fundamentals/range-interpolation/sections/PipelineModelSection/PipelineModelSection.tsx`
- `src/content/gsap/fundamentals/range-interpolation/sections/RangeContractsSection/RangeContractsSection.tsx`
- `src/content/gsap/fundamentals/range-interpolation/sections/CalculationLabSection/CalculationLabSection.tsx`
- `src/content/gsap/fundamentals/range-interpolation/sections/InterpolationShapesSection/InterpolationShapesSection.tsx`
- `src/content/gsap/fundamentals/range-interpolation/sections/ColorComponentsSection/ColorComponentsSection.tsx`
- `src/content/gsap/fundamentals/range-interpolation/sections/BoundariesSection/BoundariesSection.tsx`
- `src/content/gsap/fundamentals/range-interpolation/examples/RangeInterpolationLab/RangeInterpolationLab.tsx`
- `src/content/gsap/fundamentals/range-interpolation/examples/RangeInterpolationLab/RangeInterpolationLab.css`
- `src/content/gsap/fundamentals/range-interpolation/examples/RangeInterpolationLab/useRangeInterpolationRuntime.ts`
- `docs/handoffs/gsap/core/range-interpolation.md`

modify:

- `src/app/routes.ts`

### exampleContracts

#### RangeInterpolationLab

- goal: 한 원본 input이 안전한 값·0~1 progress·0~360 숫자·shape별 보간값·색 성분으로 바뀌는 경로를 실제 GSAP 호출로 읽는다.
- question: 범위가 다른 값들이 어떻게 같은 상대 위치를 유지하며 서로 다른 output이 되는가?
- representation: 정렬된 네 number line, 선택 shape 결과, color swatch, RGB(A)/HSL(A) component reading, 실행 code.
- controls: 원본 input `-50~150` slider, direct/reusable radio, number/color/array/object radio.
- runtimeSource: `examples/RangeInterpolationLab/useRangeInterpolationRuntime.ts`
- sourcePath: `src/content/gsap/fundamentals/range-interpolation/examples/RangeInterpolationLab/useRangeInterpolationRuntime.ts`
- runtimeOwnership: controls state, 공식 범위·출력 descriptor, 실제 clamp/normalize/mapRange/interpolate/splitColor 호출, 결과 formatting, `useMemo` 단일 `snapshot`.
- displayOwnership: TSX가 같은 `snapshot`으로 controls·number line·component 표·swatch를 만들고, snapshot의 실제 인자만 JavaScript 문법으로 직렬화한다.
- accessibility: range label/output/description, 두 fieldset/legend, radio label, color text 대안, focus-visible. 연속값을 live region에 넣지 않는다.
- motion: autoplay·Tween·CSS transition 없음. marker는 직접 input에 즉시 대응하며 reduced-motion에서도 같은 정적 결과를 제공한다.

### nonGoals

- 이해를 꾸미기 위한 Tween·Timeline·animation hook을 만들지 않는다.
- `pipe`, `unitize`, CSS 단위, modifier render lifecycle의 전체 계약을 중복하지 않는다.
- 공식 0~1 계약 밖 shape 동작을 보장 API처럼 일반화하지 않는다.
- 다른 학습 페이지를 수정하지 않는다.
- 자동화 테스트 코드·테스트 runner 설정·테스트 dependency를 추가하지 않는다.

### preserve

- 공식 49개와 probe 6개의 분리.
- `splitColor` 원문의 comma 누락과 설치본 의도를 동시에 보존.
- normalize/mapRange의 number 외삽, interpolate의 shape별 범위 밖 차이를 공식 주장으로 승격하지 않음.
- object interpolate 기본 새 참조와 `true` mutation 선택의 구분.
- actual GSAP calls와 표시 code가 같은 `snapshot`에서 파생되는 구조.
- page 35 `gsap-utils`가 전체 utility 지도를, page 37이 composition/unit을 소유하는 경계.

## 검증 계약

### verifiedPerspectives

Source Curator, Content Architect, Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion, Build/Integration, Cross-page Consistency를 구현 컨텍스트가 순서대로 판정했다.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-RI-001 | PASS | 2026-08-08 rendered canonical 5개 전체 조회 + targeted 재조회 + raw HTML 5개 2차 대조 | 공식 source 5개의 heading·signature·parameter·returns·example·tip·mutation note 고정 | none |
| DOC-RI-001 | PASS | `SC-01`과 `BoundariesSection`이 `[255, 0 128, 1]` comma 누락을 그대로 기록하고 `RI-P1`에서 실행 의도를 분리 | 공식 오류 은폐 없음 | none |
| PROBE-RI-001 | PASS | Node 22·GSAP 3.15.0에서 공식 예제, reusable type/result, out-of-range, object identity, 0폭/역방향을 재측정 | 공식 침묵과 설치본 실행 차이 분리 | provenance 유지 |
| OC-RI-001 | PASS | catalog 공식 49 = meta section 합 49 = meta 분모 49, probe 6, ID 55/unique 55, source 5 | Official Coverage 완전 대응 | none |
| LT-RI-001 | PASS | `PipelineModelSection` → `RangeContractsSection` → 실제 lab → shape → component → 경계 순서가 무엇/왜/관찰/원리/사용처/주의점을 제공 | 단순 번역이 아닌 학습형 재구성 | none |
| RDS-RI-001 | PASS | `useRangeInterpolationRuntime.ts`의 `useMemo` snapshot 하나가 실제 다섯 utility 결과를 소유하고 TSX는 snapshot 인자만 직렬화, TSX의 gsap import 0 | runtime/display sync 통과 | none |
| PED-RI-001 | PASS | 한 input과 한 progress에 집중하고 조작 전 관찰점을 제시하며 number/color/array/object는 같은 대상의 output mode로만 비교 | beginner flow 통과 | none |
| STRUCT-RI-001 | PASS | page 조립, 6 sections, page components, stateful utility runtime 분리, 한 줄 한국어 주석, 전용 CSS 2개 | 구조·주석 계약 통과 | none |
| A11Y-STATIC-RI-001 | PASS | label/output/fieldset/legend/aria-describedby/focus-visible/textual color, live region 0, autoplay·transition 0, reduced-motion rule | 정적 접근성·motion 통과 | none |
| BUILD-RI-001 | PASS | route 등록 뒤 root `npx tsc --noEmit`, `npm run build`, `npm run build-storybook` exit 0이고 두 build 모두 RangeInterpolationPage JS/CSS chunk 생성 | TypeScript·Vite·Storybook 통합 확인 | none |
| XC-RI-001 | PASS | page 35의 utility map, page 37의 composition/unit, page 40의 modifier/snap/wrap 소유권과 용어를 중복하지 않음 | cross-page ownership 유지 | none |
| A11Y-RI-001 | DEFERRED → PASS | route 등록 뒤에도 이 환경에서 사용할 browser가 없어 키보드·focus·320/390px·lab control·reduced-motion 실조작을 수행하지 못함 | 소유자 일괄 브라우저 검수 대상 | browser 연결 가능 환경에서 실조작 |

### verificationEvidence

- source: rendered original 5개 1차 전체/targeted 재조회, raw HTML 5개 2차 대조.
- probe: Node 22, GSAP 3.15.0, 다른 runtime library 없이 `gsap.utils` 직접 호출, 정확값·identity·thrown error 그대로 기록.
- static counts: official 49, probe 6, catalog ID 55/unique 55, source 5, section sourceItems 합 49, TSX gsap import 0, runtime gsap import 1.
- TypeScript: 저장소 root `npx tsc --noEmit` exit 0.
- Build/Integration: route 등록 뒤 root TypeScript exit 0, Vite 730 modules·Storybook 868 modules transform과 전용 JS/CSS chunk 생성을 확인했다.
- `npm run build` — exit 0, `RangeInterpolationPage-sYJTJ3m5.js`, `RangeInterpolationPage-CnNE13-q.css` 생성.
- `npm run build-storybook` — exit 0, `RangeInterpolationPage-MuQzXYfL.js`, `RangeInterpolationPage-CnNE13-q.css` 생성.
- scope: `src/content/gsap/fundamentals/range-interpolation/`와 이 handoff만 생성, route·다른 페이지·테스트·커밋 변경 없음.

### releaseDecision

`PASS` — source·coverage·학습 변환·runtime sync·정적 접근성, route 통합 뒤 TypeScript·Vite·Storybook 검증에 미해결 BLOCK이 없다.

해소된 `DEFERRED → PASS` 1건: `A11Y-RI-001` — browser 연결 가능 환경에서 키보드·focus·320/390px·실제 control·reduced-motion 실조작.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 재감사

- `SRC-RI2` — **PASS**: clamp·interpolate·mapRange·normalize·splitColor 공식 페이지를 다시 조회했다.
- `RDS-RI2` — **PASS**: 각 lab의 runtime descriptor·snapshot·표시 코드를 정적으로 대조해 BLOCK이 없었다.
- `PED-RI2` — **ADDRESSED**: 첫 화면의 `source`·`기술 item`·`probe`를 값 변환 학습 순서와 직접 확인한 경계 표현으로 바꿨다.
- `BROWSER-RI2` — **DEFERRED**: 실제 control·키보드·반응형·motion 조작은 수행하지 않았다.
- Storybook: `N/A` — c309e13에서 의도적으로 삭제됐다.
- releaseDecision: `PASS with DEFERRED` — 정적 BLOCK은 없고 브라우저 관점만 `DEFERRED`다.

## 2026-08-13 최종 교차검토

- Static BLOCK: 없음. Browser: 사용자 승인 전 실조작을 수행하지 않아 `DEFERRED`. Storybook: c309e13에서 삭제되어 `N/A`.
- overallDecision: `NOT VERIFIED`
- releaseDecision: `NOT VERIFIED`
