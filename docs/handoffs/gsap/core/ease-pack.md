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
- reviewedAt: `2026-08-13`
- category: `Fundamentals > Easing`
- slug: `ease-pack`
- sourcePageIds: primary `source:expo-scale-ease`; related `source:rough-ease`, `source:slow-mo`

세 canonical 모두 등록 코드로 `gsap.registerPlugin(EasePack)` 한 줄을 제시한다.

### localPage

- localPath: `src/content/gsap/fundamentals/ease-pack/`
- route: `/fundamentals/ease-pack`

### sourceManifest

`ease-pack.catalog.ts`의 `easePackSourceItems` 배열이 authority다. 공식 item 37개와 실행 확인 항목 8개를 `origin`으로 구분하고, `source` 필드로 세 canonical을 구분한다. ID 접두사는 `EXP`(ExpoScale), `RGH`(Rough), `SLW`(SlowMo), `SET`(공통 설치).

공식 기본값(2026-08-13 원문 확인):

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

### historicalFindings

아래는 기존 구현 기록이며 2026-08-13 현재 감사의 build·브라우저 증거로 재사용하지 않는다.

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-EP-001 | PASS | 2026-08-13 세 canonical 직접 조회. heading 순서, 등록 코드, config 전체 property와 기본값 10개, 코드 예제를 원문 인용으로 확인. catalog 주장과 일치 | 구현 범위 고정 | none |
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

- 공식 원문 대조 — 2026-08-13, 세 canonical 직접 조회. 기본값 10개 개별 확인.
- runtime probe — `node` + `window` shim으로 `EasePack` 실행, 위 PROBE-EP-001~007.
- build — `npm run build`, `npm run build-storybook`.

## 2026-08-13 현재 감사

### auditTarget

- route: `/fundamentals/ease-pack`
- commit: 현재 working tree (`git status`에 다른 페이지의 병행 변경이 있어 commit hash 대신 범위를 고정함)
- officialUrls:
  - `https://gsap.com/docs/v3/Eases/ExpoScaleEase/`
  - `https://gsap.com/docs/v3/Eases/RoughEase/`
  - `https://gsap.com/docs/v3/Eases/SlowMo/`
- comparedAt: `2026-08-13` (Asia/Seoul)
- evidenceBoundary: 공식 웹 원문, 설치된 GSAP 3.15.0 probe, 대상 파일 정적 분석만 사용했다. 브라우저와 전역 build/Storybook은 메인 담당이므로 실행하지 않았다.

### currentFindings

| ID | 관점 | 최초 상태 | 위치·근거 | 영향 | 조치 |
| --- | --- | --- | --- | --- | --- |
| FACT-EP-001 | 사실 정확성 | BLOCK | `ease-pack.meta.ts`, `EaseChoiceSection.tsx`; 공식 RoughEase 문서는 “대부분의 easing 방정식”이라고 했지만 페이지는 Core ease 전체가 매끄럽다고 일반화했다. | back·bounce 같은 이름까지 동일한 성격으로 오해할 수 있다. | 공식 문장의 범위를 유지하고 RoughEase에 별도 설정이 필요한 이유를 point 배치·빈도로 직접 설명했다. |
| FACT-EP-002 | 사실 정확성 | BLOCK | `ExpoScaleSection.tsx`, `ScaleSpeedLab.tsx`; canonical은 scale이 linear에서도 속도가 달라 보인다고만 설명하지만 페이지는 사람의 시지각 방식과 작은 변화의 체감 여부를 근거 없이 확정했다. | 검증되지 않은 지각 이론이 ExpoScaleEase의 공식 동작 원리처럼 보였다. | 구간별 배율이라는 계산 가능한 관찰과 공식 설명만 남기고 사용 여부는 실제 비교로 판단하게 했다. |
| FACT-EP-003 | 사실 정확성 | BLOCK | `RoughEaseSection.tsx`, `ease-pack.catalog.ts`; 별도 해석이 별도 무작위 배치를 만든다는 probe를 “매번 다른 결과”로 표현했다. | 무작위 결과의 차이를 절대 보장으로 오해할 수 있다. | 별도 배치이므로 결과가 달라질 수 있다고 경계를 수정하고 동일 배치가 필요하면 함수 재사용이 필요하다고 유지했다. |
| SYNC-EP-001 | Runtime/Display Sync | BLOCK | 세 lab의 TSX 코드 패널; runtime은 `paused: true`로 준비한 뒤 버튼에서 `restart()`하지만 표시 코드는 자동 재생 Tween만 보였다. Rough/SlowMo의 baseline `gsap.set()`도 빠져 있었다. | 표시 코드를 복사하면 실제 예제와 실행 시점·재실행 baseline이 달라진다. | 세 코드 패널에 `paused`, 버튼 `restart()`, 필요한 baseline `gsap.set()`을 descriptor 값으로 표시했다. |
| SYNC-EP-002 | Runtime/Display Sync | BLOCK | `useScaleSpeedAnimation.ts`; 관찰용 element를 `gsap.utils.toArray()`로 전역 조회해 useGSAP scope와 다른 target을 읽을 수 있었다. | 같은 class가 다른 곳에 있으면 표시 표와 실제 scoped Tween이 다른 element를 가리킬 수 있다. | 관찰 element는 `scope.current.querySelector()`로 찾고 GSAP 호출은 표시 코드와 같은 selector를 scoped context에서 사용했다. |
| STYLE-EP-001 | 비유·문체 | BLOCK | `PageCoverage.tsx`, `EasePackSetupSection.tsx`, `EaseChoiceSection.tsx`, `BoundariesSection.tsx`, `RoughEaseSection.tsx`; learner-visible `source`, `item`, `소유`와 “흩뿌린다”, “주인공”, “저절로” 같은 제작·의인화 표현이 노출됐다. | 학습자가 설정의 실제 입력·출력보다 제작 구조와 비유를 해석해야 했다. | `공식 문서`, `확인한 설명`, 이어서 볼 페이지와 point 생성·연결·구간 대응을 직접 설명하는 문장으로 교체했다. |

### changesApplied

- `FACT-EP-001`: meta 요약과 `EaseChoiceSection.tsx`에서 Core ease 전체 일반화를 제거했다.
- `FACT-EP-002`: `ExpoScaleSection.tsx`, `ScaleSpeedLab.tsx`를 구간별 배율과 canonical 설명으로 좁혔다.
- `FACT-EP-003`: `RoughEaseSection.tsx`, catalog의 무작위 결과를 가능성·재사용 경계로 수정했다.
- `SYNC-EP-001`: `ScaleSpeedLab.tsx`, `RoughnessLab.tsx`, `SlowMoLab.tsx`의 표시 코드에 실제 paused/restart/baseline 생명주기를 반영했다.
- `SYNC-EP-002`: `useScaleSpeedAnimation.ts`의 관찰 target을 scope 내부에서 찾도록 수정했다.
- `STYLE-EP-001`: `PageCoverage.tsx`, setup/choice/boundaries/rough/slow 문장의 제작 용어와 의인화를 직접 설명으로 교체했다.
- 공식 재대조일을 `ease-pack.meta.ts`와 이 handoff에서 `2026-08-13`으로 갱신했다.

### verification

- Official Coverage: 공식 원문 37개 item, catalog 공식 행 37개, section 합계 37개를 정적으로 재대조한다.
- Runtime probe: GSAP 3.15.0과 `window` shim에서 import와 `registerPlugin(EasePack)`만으로는 세 이름이 `undefined`, `registerPlugin(RoughEase)` 뒤에는 셋 다 함수였다. 이번 실행에서 같은 random RoughEase 문자열 두 결과는 progress 0.3에서 `0.1859`와 `0.3885`, `randomize:false`는 둘 다 `0.1`이었다. `expoScale(1,2)`의 중간 scale은 `1.4142`, `expoScale(2,2)`는 `NaN`; `slow`와 `slow(0.5,0.8)`의 progress 0.1은 `0.3753`과 `0.3656`, `slow(0,0.7)`은 기본 설정과 같았고 yoyoMode 결과는 `0→1→0`이었다. 미등록 `rough`는 경고 없이 기본 ease와 같은 x `51`을 냈다.
- Runtime/Display Sync: 세 lab의 selector/config/ease/duration/paused/baseline/restart가 각 descriptor와 실제 호출에서 같은지 정적으로 추적한다.
- TypeScript parse: 대상 17개 TS/TSX 파일, parse diagnostic 0; relative import 미해결 0.
- Coverage/sourcePath: section 합계 37, meta 분모 37, catalog 공식 item 37·implementation probe 8, 전체 ID 45개 중 중복 0; route lazy import와 lesson 등록을 확인했다.
- Runtime/Display 정적 assertion: ScaleSpeedLab, RoughnessLab, SlowMoLab 모두 `true`.
- `git diff --check -- <대상 page> <handoff>`: exit 0.
- Vite build·Storybook build: `PASS` — 메인 통합에서 2026-08-13 각각 exit 0.
- 실제 브라우저 조작·키보드·reduced-motion·320/390px: `NOT VERIFIED`.

### unresolved

- BLOCK: none after static re-verification.
- ADVISORY: none.
- NOT VERIFIED: 세 lab의 실제 controls/replay/cleanup, 키보드, reduced-motion, 320px·390px 레이아웃.

### overallDecision

`NOT VERIFIED` — 공식 대조와 정적 수정, 통합 build·Storybook은 완료했으나 실제 브라우저 증거가 남아 있다.
