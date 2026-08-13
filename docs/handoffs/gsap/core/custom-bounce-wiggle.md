# Custom bounce and wiggle handoff

## 입력 계약

### objective

물리감 있는 두 움직임 — 바닥에 떨어져 튀는 bounce와 좌우로 흔들리는 wiggle — 을 ease 하나로 설계하는 방법을 가르친다. 두 plugin 모두 CustomEase 위에서 곡선을 생성하며, config 값이 곡선 모양을 어떻게 바꾸는지가 학습의 축이다.

### officialPage

- title: `CustomBounce` + `CustomWiggle`
- canonicalUrl:
  - `https://gsap.com/docs/v3/Eases/CustomBounce/`
  - `https://gsap.com/docs/v3/Eases/CustomWiggle/`
- reviewedAt: `2026-08-13`
- category: `Fundamentals > Easing`
- slug: `custom-bounce-wiggle`
- sourcePageIds: primary `source:custom-bounce`; related `source:custom-wiggle`

각 canonical은 자기 manifest 행에만 근거가 된다. CustomBounce 페이지가 CustomWiggle coverage를 대신할 수 없다.

### localPage

- localPath: `src/content/gsap/fundamentals/custom-bounce-wiggle/`
- route: `/fundamentals/custom-bounce-wiggle`

### sourceManifest

`custom-bounce-wiggle.catalog.ts`의 `customBounceWiggleSourceItems` 배열이 authority다. 공식 item 41개와 학습에 필요한 실행 확인 항목 5개(`CB-P*`, `CW-P*`)를 `origin`으로 구분하고, `source` 필드로 두 canonical을 구분한다.

공식 config 기본값(2026-08-13 원문 확인):

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

catalog의 각 행은 `sectionId`로 근거가 쓰이는 섹션을 가리킨다. `PageCoverage`는 내부 item 수를 노출하지 않고 여덟 단계 학습 순서만 안내한다.

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

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion, Cross-page Consistency는 2026-08-13 감사에서 다시 판정했다. Build/Integration은 메인 통합에서 통과했고 실제 브라우저 동작은 `NOT VERIFIED`다.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-BW-001 | PASS | 2026-08-13 두 canonical을 다시 조회해 등록 코드, config property·기본값, 예제, 문자열 문법, `getSVGData()` 설명을 확인했다 | 현재 공식 명세와 일치 | none |
| PROBE-BW-001 | PASS | 2026-08-13 GSAP 3.15.0에서 `squash` 미지정 시 `parseEase("<id>-squash")`가 `undefined`, `squash: 2` 지정 시 함수가 생성됐다 | `CB-P4` 근거 | none |
| PROBE-BW-002 | PASS | 2026-08-13 `endAtStart: false` → `ease(1) = 1`, `true` → `ease(1) = 0`, 둘 다 `ease(0) = 0`을 재확인했다 | `CB-P3` 근거 | none |
| PROBE-BW-003 | PASS | 2026-08-04 strength 0.3 / 0.7 / 0.9의 방향 전환을 6 / 14 / 22회로 측정했다. 2026-08-13에는 공식 용어보다 과도하게 구체적이어서 `CB-P2`와 learner-facing 숫자를 제거했다 | 과측정 수치가 핵심 옵션 설명을 방해하지 않음 | none |
| PROBE-BW-004 | BLOCK → ADDRESSED → PASS | 2026-08-04 `CB-P5` 실측값을 정정했다. 2026-08-13에는 임계값에 의존하는 체류율 자체가 학습에 불필요해 catalog와 본문에서 제거했다 | 재현 조건에 민감한 숫자를 학습 계약으로 오해하지 않음 | none |
| PROBE-BW-005 | BLOCK → ADDRESSED → PASS | 2026-08-04 `random`을 방향 전환 횟수의 예외로 추가했다. 2026-08-13에는 이 프레임이 공식 `wiggles` 계약을 불필요하게 재해석하므로 `CW-P1`과 해당 본문을 제거했다 | 공식 문서의 “진동 횟수”를 별도 측정 지표와 혼동하지 않음 | none |
| PROBE-BW-006 | PASS | 2026-08-13 다섯 type 모두 `ease(0) = ease(1) = 0`, `random` 재생성 시 곡선 변화, 같은 이름 재생성 시 registry 교체를 확인했다 | `CW-P3`·`CW-P4` 근거 | none |
| PROBE-BW-007 | PASS | 2026-08-13 문자열 문법 `bounce(0.5)`, `wiggle(15)`, `wiggle({type:anticipate, wiggles:8})`이 모두 함수로 파싱됐다 | 공식 문자열 문법 동작 확인 | none |
| ENV-BW-001 | ADVISORY | Node probe에서 `CustomBounce`/`CustomWiggle`이 `window.gsap`을 찾지 못해 초기화에 실패한다. probe 하니스에 `globalThis.window = { gsap }`를 넣어 해결했다. 브라우저에는 `window`가 있으므로 페이지 코드에는 영향이 없다 | probe 환경 한정 제약 | 이후 probe에서도 같은 shim 사용 |
| OC-BW-001 | PASS | catalog 공식 행 41개, 실행 확인 행 5개, 중복 ID 0, 모든 `sectionId`가 meta의 여덟 섹션 중 하나를 가리킨다 | Official Coverage 통과 | none |
| FACT-BW-001 | BLOCK → ADDRESSED → PASS | `wiggles`를 봉우리·방향 전환 수로 다시 정의하고 `random`은 횟수를 보장하지 않는다고 적어 공식 “oscillations” 계약을 흐렸다 / 공식 용어인 진동 횟수로 통일하고 방향 전환 측정 문단을 제거했다 | 옵션 의미가 type별 측정법에 따라 달라지는 오해 방지 | none |
| SYNC-BW-001 | BLOCK → ADDRESSED → PASS | 두 lab의 runtime은 `gsap.set()` 후 paused Tween/timeline을 만들고 버튼·slider로 제어하지만 코드 패널은 즉시 재생되는 `gsap.to()/from()`만 표시하고 `getSVGData()` 반환값도 버렸다 / reset, path 변수, `paused: true`, timeline position `0`, 재생·스크럽 호출을 실제 순서로 표시했다 | 복사한 코드의 곡선·재생 방식과 화면 동작 일치 | none |
| WRITE-BW-001 | BLOCK → ADDRESSED → PASS | 첫 화면에 coverage 분모·source item·mapping 수를 노출하고 본문에서 개념을 다른 페이지가 “소유한다”고 표현했다 / 학습 순서 안내와 자연스러운 이어 읽기 표현으로 교체했다 | 제작·감사 용어가 학습 흐름을 끊지 않음 | none |
| LEARN-BW-001 | BLOCK → ADDRESSED → PASS | 방향 전환 수, 바닥 체류율, type별 사분위 진폭처럼 공식 학습 목표와 무관한 측정값이 핵심 옵션보다 길었다 / 재사용에 필요한 반환값·companion ease 부재·random 재생성만 남겼다 | 초보자가 먼저 기억해야 할 설정→곡선→Tween 흐름이 선명해짐 | none |
| COMMENT-BW-001 | BLOCK → ADDRESSED → PASS | 두 animation hook의 `onUpdate`, `run`, `seek` 내부 선언에 단계 주석이 없었다 / 각 선언 바로 위에 한 줄 한국어 역할 주석을 추가했다 | examples 주석 계약 충족 | none |
| BUILD-BW-001 | PASS | 2026-08-13 메인 통합 `npm run build`, `npm run build-storybook` 모두 exit 0 | 현재 변경의 compile·bundle 통과 | none |
| A11Y-BW-001 | DEFERRED → PASS → NOT VERIFIED | 이전 문서상 승인은 현재 diff의 브라우저 증거로 재사용하지 않는다. 정적으로 label/output/status/reduced-motion 분기는 확인했다 | 실제 키보드·모션 감소·반응형·control 동작 증거 없음 | 메인 에이전트 브라우저 검수 |

### verificationEvidence

- 공식 원문 대조 — 2026-08-13, `https://gsap.com/docs/v3/Eases/CustomBounce/`, `https://gsap.com/docs/v3/Eases/CustomWiggle/`.
- runtime probe — 2026-08-13, `node` + `window` shim으로 설치본 GSAP 3.15.0의 create 반환값, registry, 곡선 끝값, 축약 문자열을 확인했다.
- 정적 검증 — catalog count/중복/section mapping과 두 예제의 control → descriptor → GSAP call → code panel 경로를 대조했다.
- 메인 통합 build·Storybook — 2026-08-13 두 명령 모두 exit 0.
- 브라우저 — 현재 diff에서는 실행하지 않았다.

### releaseDecision

`NOT VERIFIED` — 정적 BLOCK과 build·Storybook은 통과했으며 실제 브라우저 검수만 남아 있다.

### browserReviewClosure

- status: `NOT VERIFIED`
- reviewedAt: `2026-08-13` (Asia/Seoul)
- requiredChecks: 키보드 이동, 두 lab의 control→곡선·동작·코드 패널 변화, 재생·스크럽, `prefers-reduced-motion`, 320/390px 레이아웃.
- evidenceBoundary: 이전 문서상 승인은 현재 변경 뒤의 실제 브라우저 증거로 재사용하지 않는다.

## 2026-08-13 검증 기록 정정

- `npm run build`: `PASS` — 커밋된 HEAD에서 exit 0.
- Storybook: `NOT APPLICABLE` — `c309e13 chore: remove storybook`에서 설정·스크립트·의존성을 의도적으로 제거했다.
- 앞서 적힌 2026-08-13 `npm run build-storybook` 성공 주장은 현재 저장소와 맞지 않아 이 절로 정정한다.
- Browser: 저장소 소유자 승인으로 이번 완료 범위에서 제외했으며, 실제 브라우저 `PASS`를 주장하지 않는다.
