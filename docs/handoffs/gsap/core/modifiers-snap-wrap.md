# Modifiers, snap and wrap handoff

## 입력 계약

### objective

GSAP이 매 render마다 계산한 값을 그대로 쓰지 않고 중간에서 가로채 고치는 구조를 가르친다. `modifiers`가 그 일반형이고, `snap` vars와 `wrap`·`wrapYoyo` utility는 자주 쓰는 형태를 짧게 쓰는 문법이다. 이 순서로 세운다 — 가로채기 → 눈금 → 순환.

### officialPage

- title: `Modifiers` + `Snap` + `utils.snap()` + `utils.wrap()` + `utils.wrapYoyo()`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/CorePlugins/Modifiers`
  - `https://gsap.com/docs/v3/GSAP/CorePlugins/Snap`
  - `https://gsap.com/docs/v3/GSAP/UtilityMethods/snap()`
  - `https://gsap.com/docs/v3/GSAP/UtilityMethods/wrap()`
  - `https://gsap.com/docs/v3/GSAP/UtilityMethods/wrapYoyo()`
- reviewedAt: `2026-08-05`
- category: `GSAP > Internal Plugins` + `Useful features & tools > Utility Methods`
- slug: `modifiers-snap-wrap`
- sourcePageIds: primary `source:modifiers`; related `source:snap-plugin`, `source:utils-snap`, `source:utils-wrap`, `source:utils-wrap-yoyo`

### localPage

- localPath: `src/content/gsap/fundamentals/modifiers-snap-wrap/`
- route: `/fundamentals/modifiers-snap-wrap`

### sourceManifest

`modifiers-snap-wrap.catalog.ts`의 `modifiersSnapWrapSourceItems` 배열이 authority다. 공식 item 31개와 실행 확인 항목 6개(`MSW-P1`~`MSW-P6`)를 `origin`으로 구분하고, `source` 필드로 다섯 canonical을 구분한다.

| source | 공식 item |
| --- | ---: |
| `modifiers` | 10 |
| `snap-plugin` | 6 |
| `utils-snap` | 8 |
| `utils-wrap` | 4 |
| `utils-wrap-yoyo` | 3 |
| 합계 | 31 |

| 섹션 | 공식 item |
| --- | ---: |
| `intercept` | 6 |
| `modifier-caveats` | 4 |
| `snap-plugin` | 6 |
| `snap-utility` | 8 |
| `wrap-family` | 7 |
| `boundaries` | 0 |
| 합계 | 31 |

### sourceBlockers

`none`. 31개 공식 item 전부 2026-08-05에 canonical 원문으로 확인했다.

한 가지 제약을 기록한다. **Modifiers 페이지의 세 데모(`Snap rotation`, `Clamp with Modulus`, `Carousel Wrap`)는 코드 블록이 동적으로 불러와지는 형태라 원문 코드를 받지 못했다.** heading 이름은 확인했으므로 `MOD-05`로 사실만 기록하고, 코드를 지어내지 않았다. 페이지에도 그렇다고 적었다.

공식이 게시하지 않은 것: modifier 반환값의 타입 규정, radius 밖 값의 처리, `wrap`과 `wrapYoyo`의 최댓값 처리 차이, snap vars와 `utils.snap()`의 공식 비교.

### moduleSelection

| module | 목적 |
| --- | --- |
| plugin | ModifiersPlugin·SnapPlugin이 internal이라 등록이 필요 없다는 것 |
| utility·overload | `utils.snap()`의 여섯 호출 형태와 `wrap`/`wrapYoyo`의 인자 구성 |
| concept/guide | 값을 쓰기 직전에 가로챈다는 멘탈 모델 |

### learnerFlow

가로채기 구조와 인자 → modifier가 통하지 않는 자리 → snap vars 지름길 → `utils.snap()` 여섯 형태 → `wrap`·`wrapYoyo`의 갈림 → 경계.

### coverageMap

catalog의 각 행이 `sectionId`로 소유 섹션을 지목하며 `PageCoverage`가 같은 배열을 센다.

### relatedPages

- `gsap-to` — `vars`·`target`과 `roundProps`의 전체 명세를 소유한다.
- `css-animation` — CSS 값·transform 처리를 소유한다.
- `non-css-target-values` — `attr`·`endArray` 채널을 소유한다.
- `gsap-utils` — utility 함수 전체 지도를 소유한다.

## 구현 계약

### exactFiles

create: `ModifiersSnapWrapPage.tsx` / `.css`, `modifiers-snap-wrap.meta.ts`, `modifiers-snap-wrap.catalog.ts`, `components/PageCoverage`, `components/SectionHeading`, `sections/` 6개(`InterceptSection`, `ModifierCaveatsSection`, `SnapPluginSection`, `SnapUtilitySection`, `WrapFamilySection`, `BoundariesSection`), `examples/WrapCompareLab`

modify: `src/app/routes.ts`

### exampleContracts

- `WrapCompareLab` — runtimeSource `WrapCompare.example.ts`(순수 계산) + `useWrapCompareRuntime.ts`(controls 상태). 같은 index 목록을 `wrap`과 `wrapYoyo`에 동시에 넣어 결과를 한 표에 나란히 놓는다. **GSAP 애니메이션이 아니라 순수 함수 호출이라 `docs/project-structure.md`의 "상태가 없는 순수 호출·계산은 `<ExampleName>.example.ts`" 규칙을 따랐다.** controls 상태만 얇은 hook이 들고, 계산은 example 파일이 소유한다.
- 배열 모드와 숫자 범위 모드를 나눈 이유는 **최댓값 처리 차이가 숫자 범위에서만 드러나기** 때문이다. 배열만으로는 `wrap(0,3,i)`에 3이 없다는 사실을 볼 수 없다.
- TSX에서 `gsap`을 import하지 않는다.

### nonGoals

- `roundProps` 자체의 명세를 소유하지 않는다. 02단계에서 제약으로만 언급한다.
- Modifiers 공식 데모 세 개의 코드를 재현하지 않는다. 원문을 받지 못했고 지어내지 않는다.
- utility 함수 전체 목록을 여기서 카탈로그로 만들지 않는다.

### preserve

- 공식 Snap 페이지 코드 예제 네 개의 주석 포함 원문.
- 공식 `wrap`·`wrapYoyo` 예제 원문 — **틀린 주석까지 그대로 보존한다.** 그 주석이 틀렸다는 것이 이 페이지의 학습 내용이기 때문이다.

## 검증 계약

### verifiedPerspectives

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion, Build/Integration, Cross-page Consistency — 구현 컨텍스트가 판정했다.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-MSW-001 | PASS | 2026-08-05 다섯 canonical 직접 조회. heading 순서, internal plugin 문장, modifier 인자 두 개, Caveats 세 항목, snap 네 형태 코드 원문, `utils.snap()` 여섯 호출 형태, `wrap`·`wrapYoyo` signature와 예제를 원문 인용으로 확인 | 구현 범위 고정 | none |
| SRC-MSW-002 | ADVISORY | Modifiers 페이지의 세 데모 코드 블록이 동적 로딩이라 원문을 받지 못했다. heading 이름만 확인해 `MOD-05`로 기록하고 코드를 지어내지 않았다 | 공식 예제 코드 미확보 | 브라우저에서 해당 데모를 열어 보완 가능 |
| DOC-MSW-001 | PASS | **공식 `wrapYoyo` 페이지가 같은 호출을 두 곳에서 다르게 주석했다.** `wrapYoyo(["red","green","yellow"], 5)`를 첫 예제는 `"red"`, 세 번째 예제는 `"green"`이라 적었다. 실행 결과는 `"green"`이라 첫 예제 주석이 틀렸다. `wrapYoyo(5, 10, 12) === 8`은 맞았다 | 공식 문서를 그대로 믿으면 어긋난다 | `WrapFamilySection`에 경고 블록으로 명시 |
| PROBE-MSW-001 | PASS | index 0~6에서 `wrap(0,3,i)`는 `0 1 2 0 1 2 0`, `wrapYoyo(0,3,i)`는 `0 1 2 3 2 1 0`. **`wrap`은 최댓값을 포함하지 않고 `wrapYoyo`는 포함한다.** 공식 어디에도 이 비대칭이 없다 | 범위를 정할 때 최댓값 기대가 어긋난다 | `MSW-P2`로 기록하고 페이지에 명시 |
| PROBE-MSW-002 | PASS | radius 밖 값은 snap되지 않고 원값이 그대로 돌아온다. `values [0,100,300]` + `radius 20`에서 `105 → 100`, `150 → 150`. `{increment:10, radius:2}`에 `23 → 23`(20 아님) | `MSW-P3`·`MSW-P4` 근거 | none |
| PROBE-MSW-003 | PASS | 2D point snap은 객체를 돌려준다. `values`에 `{x,y}` 배열과 `radius 30`, 입력 `{x:10,y:10}` → `{x:0,y:0}` | `MSW-P5` 근거 | none |
| PROBE-MSW-004 | PASS | 공식 예제 재현 — `snap(10, 23.5) → 20`, `snap([100,50,500], 65) → 50`, `wrap(["red","green","yellow"], 5) → "yellow"`, `wrap(5,10,12) → 7`, `wrap(배열)` 반환이 `function`이고 `w(5) → "yellow"` | 공식 주장 확인 | none |
| PROBE-MSW-005 | PASS | 음수 index — `wrap(["a","b","c"], -1) → "c"`, `wrap(5,10,3) → 8` | `MSW-P6` 근거 | none |
| RDS-MSW-001 | PASS | `WrapCompareLab`의 표와 코드 패널이 모두 `WrapCompare.example.ts`의 같은 계산 결과에서 나온다. TSX가 값을 다시 계산하지 않는다. TSX에 `gsap` import 없음 | Runtime/Display Sync 통과 | none |
| STRUCT-MSW-001 | PASS | 순수 계산 예제라 `<ExampleName>.example.ts`를 쓰고 controls 상태만 얇은 hook이 들었다. `docs/project-structure.md`의 실행 source 선택 규칙에 부합 | 구조 통과 | none |
| OC-MSW-001 | PASS | meta 섹션 합계 31 = catalog 공식 행 31 = 분모 31, 중복 ID 0, catalog가 근거 댄 source 5개 = 선언한 5개, 사용 CSS 클래스 누락 0 | Official Coverage 통과 | none |
| BUILD-MSW-001 | PASS | `modifiers-snap-wrap`와 등록 라우트를 포함하고 다른 8개 미완성 폴더만 제외한 임시 검증 복제본에서 `npm run build` exit 0, `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook` exit 0 (2026-08-08). 원본 전체 타입 검사는 미완성 폴더의 미생성 import 27건과 별도 타입 오류 1건 때문에 실패하며 이 페이지 경로 오류는 0건이다. | Build/Integration 통과 | 미완성 페이지를 완성할 때 원본 전체 타입 검사를 다시 실행 |
| A11Y-MSW-001 | DEFERRED | 키보드 이동, `prefers-reduced-motion` 실제 전환, 320/390px 실제 레이아웃, lab control 실제 조작 | 소유자 일괄 브라우저 검수 대상 | 전체 페이지 완성 후 일괄 확인 |

### verificationEvidence

- 공식 원문 대조 — 2026-08-05, 다섯 canonical 직접 조회.
- runtime probe — `node`로 `gsap` 실행. 측정 방법: `gsap.utils`의 각 함수를 직접 호출하고 반환값을 그대로 출력. 재현 조건: gsap 3.15.0, Node 22, 다른 라이브러리 없이 단독 실행. 오차 허용치가 필요한 주장 없음(전부 정확값 비교).
- 정합성 — meta/catalog/분모 3자 대조, CSS 클래스 전수 대조, TSX의 gsap import grep.
- 통합 — `src/app/routes.ts`에 `/fundamentals/modifiers-snap-wrap` 등록, 다른 미완성 폴더만 제외한 동일 소스 복제본에서 `npm run build`와 `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook` 성공(2026-08-08).

### releaseDecision

`PASS` (미해결 `DEFERRED` 1건: A11Y-MSW-001 / `ADVISORY` 1건: SRC-MSW-002 — Modifiers 공식 데모 코드 미확보)
