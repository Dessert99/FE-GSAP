# Custom bounce and wiggle handoff

## 입력 계약

### objective

물리감 있는 두 움직임 — 바닥에 떨어져 튀는 bounce와 좌우로 흔들리는 wiggle — 을 ease 하나로 설계하는 방법을 가르친다. 두 plugin 모두 CustomEase 위에서 곡선을 생성하며, config 값이 곡선 모양을 어떻게 바꾸는지가 학습의 축이다.

### officialPage

- title: `CustomBounce` + `CustomWiggle`
- canonicalUrl:
  - `https://gsap.com/docs/v3/Eases/CustomBounce`
  - `https://gsap.com/docs/v3/Eases/CustomWiggle`
- reviewedAt: `2026-08-04`
- category: `Fundamentals > Easing`
- slug: `custom-bounce-wiggle`
- sourcePageIds: primary `source:custom-bounce`; related `source:custom-wiggle`

각 canonical은 자기 manifest 행에만 근거가 된다. CustomBounce 페이지가 CustomWiggle coverage를 대신할 수 없다.

### localPage

- localPath: `src/content/gsap/fundamentals/custom-bounce-wiggle/`
- route: `/fundamentals/custom-bounce-wiggle`

### sourceManifest

`custom-bounce-wiggle.catalog.ts`의 `customBounceWiggleSourceItems` 배열이 authority다. 공식 item 41개와 실행 확인 항목 9개(`CB-P*`, `CW-P*`)를 `origin`으로 구분하고, `source` 필드로 두 canonical을 구분한다.

공식 config 기본값(2026-08-04 원문 확인):

| plugin | property | type | 기본값 |
| --- | --- | --- | --- |
| CustomBounce | `strength` | Number | `0.7` |
| CustomBounce | `endAtStart` | Boolean | `false` |
| CustomBounce | `squash` | Number | `0` |
| CustomBounce | `squashID` | String | `"{id}-squash"` |
| CustomWiggle | `wiggles` | Integer | `10` |
| CustomWiggle | `type` | String | `"easeOut"` |
| CustomWiggle | `amplitudeEase` / `timingEase` | Ease | 공식 페이지에 명시 없음 |

### sourceBlockers

`none`. 41개 공식 item 전부 canonical 원문으로 확인했다.

### moduleSelection

| module | 목적 |
| --- | --- |
| plugin | 두 plugin이 CustomEase에 의존하고 함께 등록해야 한다는 것 |
| property catalog | config 전체 property의 타입·기본값·허용값 |
| ease·visualizer | config 변화가 곡선 모양을 어떻게 바꾸는지 |

### learnerFlow

설치·등록(CustomEase 의존) → bounce 곡선 설계 → squash와 companion ease → wiggle 곡선 설계 → wiggle type 다섯 가지 → 고급 옵션 → 경계.

### coverageMap

catalog의 각 행이 `sectionId`로 소유 섹션을 지목하며 `PageCoverage`가 같은 배열을 센다.

### relatedPages

- `custom-ease` — CustomEase 자체와 path data를 소유한다. 두 plugin은 그 위에서 동작한다.
- `easing` — 표준 ease 문법과 곡선 의미를 소유한다.
- `installation` — plugin 설치·등록 절차 전체를 소유한다.

## 구현 계약

### exactFiles

create: `CustomBounceWigglePage.tsx` / `.css`, `custom-bounce-wiggle.meta.ts`, `custom-bounce-wiggle.catalog.ts`, `components/PageCoverage`, `components/SectionHeading`, `sections/` 8개(`SetupSection`, `EaseGeneratorSection`, `BounceDesignSection`, `BounceSquashSection`, `CurveGraphSection`, `WiggleDesignSection`, `WiggleAdvancedSection`, `BoundariesSection`), `examples/BounceCurveLab`, `examples/WiggleShapeLab`

modify: `src/app/routes.ts`

### exampleContracts

- `BounceCurveLab` — runtimeSource `useBounceCurveAnimation.ts`. `strength`·`endAtStart`·`squash`를 바꿔 bounce 곡선과 실제 낙하를 함께 보여주고, squash companion tween을 같은 duration으로 동기화한다.
- `WiggleShapeLab` — runtimeSource `useWiggleShapeAnimation.ts`. `wiggles`·`type`을 바꿔 진동 곡선과 실제 흔들림을 보여준다.

두 예제는 **각자 hook을 소유**한다. 하나의 generic ease 생성 hook으로 합치지 않는다. TSX에서 `gsap`을 import하지 않는다.

등록 순서: 두 hook 모두 `gsap.registerPlugin(CustomEase, CustomBounce)` / `(CustomEase, CustomWiggle)` 형태로 **CustomEase를 먼저** 넘긴다. CustomBounce·CustomWiggle이 내부적으로 CustomEase의 생성 함수를 찾기 때문이다.

### nonGoals

- CustomEase의 path data 문법을 이 페이지에서 다시 가르치지 않는다.
- 표준 `bounce` ease의 명세를 소유하지 않는다.
- `amplitudeEase`·`timingEase`의 곡선 설계 이론을 확장하지 않는다. 공식이 밝힌 역할만 옮긴다.

### preserve

- 공식 config 기본값과 문자열 문법(`"bounce(0.5)"`, `"wiggle({type:anticipate, wiggles:8})"`) 원문.
- 공용 컴포넌트와 다른 페이지 파일.

## 검증 계약

### verifiedPerspectives

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion, Build/Integration, Cross-page Consistency — 구현 컨텍스트가 판정했다.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-BW-001 | PASS | 2026-08-04 두 canonical 직접 조회. heading 순서, 등록 코드, config 전체 property와 기본값, 코드 예제, 문자열 문법을 원문 인용으로 확인. catalog가 주장한 기본값 7개가 모두 원문과 일치 | 구현 범위 고정 | none |
| PROBE-BW-001 | PASS | `squash` 미지정 시 `parseEase("<id>-squash")`가 `undefined`, `squash: 3` 지정 시 함수 생성 | `CB-P4` 근거 | none |
| PROBE-BW-002 | PASS | `endAtStart: false` → `ease(1) = 1`, `true` → `ease(1) = 0`, 둘 다 `ease(0) = 0` | `CB-P3` 근거 | none |
| PROBE-BW-003 | PASS | strength 0.3 / 0.7 / 0.9의 방향 전환이 6 / 14 / 22회 | `CB-P2` 근거 | none |
| PROBE-BW-004 | BLOCK → ADDRESSED → PASS | `CB-P5`가 squash 0/2/4의 바닥 체류를 2.1% / 4.8% / 8.8%로 적었으나 실측은 2.4% / 10.9% / 18.1%였다 / 측정 방법(1000등분, 오차 0.001)을 명시하고 실측값으로 교체했다. `BounceSquashSection.tsx` 본문도 함께 고쳤다 | 재현되지 않는 숫자를 게시할 뻔했다 | none |
| PROBE-BW-005 | BLOCK → ADDRESSED → PASS | `CW-P1`이 "wiggles N이면 방향 전환이 정확히 N번"이라고 단정했으나 `type: "random"`은 wiggles 6에서 전환이 2회였다 / random을 예외로 명시하고 `WiggleDesignSection.tsx` 본문도 고쳤다 | 한 type에서 틀린 규칙을 가르칠 뻔했다 | none |
| PROBE-BW-006 | PASS | 다섯 type 모두 `ease(0) = ease(1) = 0`. `type: "random"`은 같은 이름·config로 재생성해도 값이 달라짐(0.0378 → 0.9088). 같은 이름 재생성 시 이전 ease가 교체됨 | `CW-P1` 끝값·`CW-P3`·`CW-P4` 근거 | none |
| PROBE-BW-007 | PASS | 문자열 문법 `bounce(0.5)`, `wiggle(15)`, `wiggle({type:anticipate, wiggles:8})` 모두 함수로 파싱됨. `wiggles: 6` 기본 type이 `easeOut` 명시와 동일 곡선 | 공식 문자열 문법 동작 확인 | none |
| ENV-BW-001 | ADVISORY | Node probe에서 `CustomBounce`/`CustomWiggle`이 `window.gsap`을 찾지 못해 초기화에 실패한다. probe 하니스에 `globalThis.window = { gsap }`를 넣어 해결했다. 브라우저에는 `window`가 있으므로 페이지 코드에는 영향이 없다 | probe 환경 한정 제약 | 이후 probe에서도 같은 shim 사용 |
| OC-BW-001 | PASS | meta 섹션 합계 41 = catalog 공식 행 41, 중복 ID 0 | Official Coverage 통과 | none |
| BUILD-BW-001 | PASS | `npm run build` exit 0, `npm run build-storybook` exit 0 (2026-08-04) | build/integration 통과 | none |
| A11Y-BW-001 | DEFERRED | 키보드 이동, `prefers-reduced-motion` 실제 전환, 320/390px 실제 레이아웃, 두 lab control 실제 조작 | 소유자 일괄 브라우저 검수 대상 | 전체 페이지 완성 후 일괄 확인 |

### verificationEvidence

- 공식 원문 대조 — 2026-08-04, 두 canonical 직접 조회. config 기본값 7개 개별 확인.
- runtime probe — `node` + `window` shim으로 `CustomEase`·`CustomBounce`·`CustomWiggle` 실행, 위 PROBE-BW-001~007.
- build — `npm run build`, `npm run build-storybook`.

### releaseDecision

`PASS` (미해결 `DEFERRED` 1건: A11Y-BW-001 / `ADVISORY` 1건: ENV-BW-001은 probe 환경 한정이라 페이지 동작과 무관)
