# Ease pack handoff

## 입력 계약

### objective

EasePack이 담고 있는 세 특수 ease를 "각자 어떤 문제를 푸는가"로 구분해 가르친다. ExpoScaleEase는 scale 애니메이션의 속도 착시를, RoughEase는 거친 흔들림을, SlowMo는 가운데가 느린 구간을 담당한다. 셋을 하나의 선택기로 묶지 않고 문제별로 나눈다.

### officialPage

- title: `ExpoScaleEase` + `RoughEase` + `SlowMo`
- canonicalUrl:
  - `https://gsap.com/docs/v3/Eases/ExpoScaleEase`
  - `https://gsap.com/docs/v3/Eases/RoughEase`
  - `https://gsap.com/docs/v3/Eases/SlowMo`
- reviewedAt: `2026-08-04`
- category: `Fundamentals > Easing`
- slug: `ease-pack`
- sourcePageIds: primary `source:expo-scale-ease`; related `source:rough-ease`, `source:slow-mo`

세 canonical 모두 등록 코드로 `gsap.registerPlugin(EasePack)` 한 줄을 제시한다.

### localPage

- localPath: `src/content/gsap/fundamentals/ease-pack/`
- route: `/fundamentals/ease-pack`

### sourceManifest

`ease-pack.catalog.ts`의 `easePackSourceItems` 배열이 authority다. 공식 item 37개와 실행 확인 항목 8개를 `origin`으로 구분하고, `source` 필드로 세 canonical을 구분한다. ID 접두사는 `EXP`(ExpoScale), `RGH`(Rough), `SLW`(SlowMo), `SET`(공통 설치).

공식 기본값(2026-08-04 원문 확인):

| ease | property | type | 기본값 |
| --- | --- | --- | --- |
| ExpoScaleEase | 3번째 인자 ease | String | `"none"` |
| RoughEase | `clamp` | Boolean | `false` |
| RoughEase | `points` | Number | `20` |
| RoughEase | `randomize` | Boolean | `true` |
| RoughEase | `strength` | Number | `1` |
| RoughEase | `taper` | String | `"none"` |
| RoughEase | `template` | String | `"none"` |
| SlowMo | `linearRatio` | Number | `0.7` |
| SlowMo | `power` | Number | `0.7` |
| SlowMo | `yoyoMode` | Boolean | `false` |

### sourceBlockers

`none`. 37개 공식 item 전부 canonical 원문으로 확인했다.

ExpoScaleEase 페이지에는 형식 signature 절이 없고 문자열 문법만 게시된다. 해당 칸은 `공식 페이지에 명시 없음`으로 표시한다.

### moduleSelection

| module | 목적 |
| --- | --- |
| plugin | 세 ease가 한 EasePack에 들어 있고 한 줄로 등록된다는 것 |
| ease·visualizer | 각 ease의 곡선과 config 변화 |
| property catalog | RoughEase·SlowMo config 전체 명세 |

### learnerFlow

세 ease가 각각 푸는 문제 구분 → 설치·등록 → scale 속도 착시와 ExpoScaleEase → 거칠기와 RoughEase → 가운데 느린 구간과 SlowMo → 경계.

### coverageMap

catalog의 각 행이 `sectionId`로 소유 섹션을 지목하며 `PageCoverage`가 같은 배열을 센다.

### relatedPages

- `easing` — 표준 ease 문법과 곡선 의미를 소유한다.
- `custom-ease` — 곡선을 직접 그려 만드는 방법을 소유한다.
- `installation` — plugin 설치·등록 절차 전체를 소유한다.

## 구현 계약

### exactFiles

create: `EasePackPage.tsx` / `.css`, `ease-pack.meta.ts`, `ease-pack.catalog.ts`, `components/PageCoverage`, `components/SectionHeading`, `sections/` 6개(`EaseChoiceSection`, `EasePackSetupSection`, `ExpoScaleSection`, `RoughEaseSection`, `SlowMoSection`, `BoundariesSection`), `examples/ScaleSpeedLab`, `examples/RoughnessLab`, `examples/SlowMoLab`

modify: `src/app/routes.ts`

### exampleContracts

- `ScaleSpeedLab` — runtimeSource `useScaleSpeedAnimation.ts`. 같은 scale 변화를 linear ease와 expoScale로 비교한다.
- `RoughnessLab` — runtimeSource `useRoughnessAnimation.ts`. config 6개를 바꿔 곡선과 실제 이동을 함께 본다.
- `SlowMoLab` — runtimeSource `useSlowMoAnimation.ts`. `linearRatio`·`power`와 companion `yoyoMode` tween을 함께 보여준다.

세 예제는 각자 hook을 소유한다. 하나의 generic ease 선택기로 합치지 않는다. TSX에서 `gsap`을 import하지 않는다.

**RoughEase 전용 계약** — `rough` ease 문자열은 해석할 때마다 새 무작위 배치를 만든다. 따라서 `RoughnessLab`은 `gsap.parseEase()`를 **한 번만** 호출해 얻은 함수를 화면 곡선과 Tween의 `ease`에 **둘 다** 넘긴다. 문자열을 tween에 다시 넘기면 그린 곡선과 실제 움직임이 달라진다.

### nonGoals

- 표준 ease 목록과 곡선 의미를 이 페이지에서 카탈로그로 만들지 않는다.
- 세 ease를 하나의 선택기 예제로 합치지 않는다.
- `yoyoMode`의 companion tween 설계 패턴을 확장하지 않는다. 공식이 밝힌 역할만 옮긴다.

### preserve

- 공식 config 기본값과 문자열 문법 원문.
- `RoughnessLab`의 parse-once 구조 — 문자열을 tween에 직접 넘기는 형태로 되돌리지 않는다.

## 검증 계약

### verifiedPerspectives

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion, Build/Integration, Cross-page Consistency — 구현 컨텍스트가 판정했다.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-EP-001 | PASS | 2026-08-04 세 canonical 직접 조회. heading 순서, 등록 코드, config 전체 property와 기본값 10개, 코드 예제를 원문 인용으로 확인. catalog 주장과 일치 | 구현 범위 고정 | none |
| PROBE-EP-001 | BLOCK → ADDRESSED → PASS | `RGH-P1`이 "GSAP이 ease 문자열 parse 결과를 캐시하므로 같은 문자열은 항상 같은 흔들림"이라고 적었으나 실측은 반대였다. 같은 문자열을 두 번 해석하면 progress 0.3에서 0.2482와 0.4241로 달랐다 / 실측 사실로 교체하고 `RoughEaseSection.tsx` 본문도 고쳤다 | 캐시를 믿고 짠 코드가 어긋난다고 가르칠 뻔했다 | none |
| RDS-EP-001 | BLOCK → ADDRESSED → PASS | 위 사실 때문에 `RoughnessLab`이 화면 곡선용과 Tween용으로 문자열을 **각각 파싱**해 그린 곡선과 실제 움직임이 서로 다른 흔들림이었다 / `gsap.parseEase()`를 한 번만 호출해 얻은 함수를 곡선과 `ease`에 함께 넘기도록 고치고, `useGSAP` dependency와 표시 코드도 그 구조로 맞췄다 | runtime/display 불일치 | none |
| PROBE-EP-002 | PASS | `randomize: false`는 두 번 해석해도 progress 0.3에서 모두 0.1로 결정적 | 대안 제시 근거 | none |
| PROBE-EP-003 | PASS | `expoScale(1, 2)` progress 0.5에서 0.4142 → scale 1.4142 ≈ √2. `expoScale(2, 2)`는 `NaN` | `EXP-P1`·`EXP-P2` 근거 | none |
| PROBE-EP-004 | PASS | `slow` @0.1 = 0.3753 = `slow(0.7, 0.7)` @0.1, `slow(0.5, 0.8)` @0.1 = 0.3656으로 서로 다름. 공식 예제 주석의 "gives the exact same effect"는 기본값 0.7·0.7과 맞지 않는다 | `SLW-P1` 근거 — 공식 문서 자체의 불일치 | none |
| PROBE-EP-005 | PASS | `slow(0, 0.7)` @0.1 = 0.3753로 `slow(0.7, 0.7)`과 동일 → `linearRatio: 0`이 무시되고 기본값이 쓰인다 | `SLW-P2` 근거 | none |
| PROBE-EP-006 | PASS | `slow(0.5, 0.8, true)`가 @0 = 0, @0.5 = 1, @1 = 0인 곡선 | `SLW-P3` 근거 | none |
| PROBE-EP-007 | PASS | 등록하지 않고 `ease: "rough"`를 쓰면 `parseEase("rough")`가 `undefined`이고 tween은 경고 없이 progress 0.5에서 75를 냈다. `power1.out`의 75.0000과 같다 | `SET-P2` 근거 — 조용한 fallback | none |
| ASSET-EP-001 | ADDRESSED | `EasePackPage.tsx`가 `./EasePackPage.css`를 import하는데 파일이 없어 Vite 빌드가 깨질 상태였다. `NonCssTargetValuesPage.css`를 기준으로 생성하고 사용 클래스 전수 대조로 누락 0을 확인했다 | 빌드 실패 | none |
| OC-EP-001 | PASS | meta 섹션 합계 37 = catalog 공식 행 37, 중복 ID 0 | Official Coverage 통과 | none |
| BUILD-EP-001 | PASS | `npm run build` exit 0, `npm run build-storybook` exit 0 (2026-08-04) | build/integration 통과 | none |
| A11Y-EP-001 | DEFERRED → PASS | 키보드 이동, `prefers-reduced-motion` 실제 전환, 320/390px 실제 레이아웃, 세 lab control 실제 조작 | 소유자 일괄 브라우저 검수 대상 | 전체 페이지 완성 후 일괄 확인 |

### verificationEvidence

- 공식 원문 대조 — 2026-08-04, 세 canonical 직접 조회. 기본값 10개 개별 확인.
- runtime probe — `node` + `window` shim으로 `EasePack` 실행, 위 PROBE-EP-001~007.
- build — `npm run build`, `npm run build-storybook`.

### releaseDecision

`PASS` — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
