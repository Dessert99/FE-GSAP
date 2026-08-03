# Blocker-free GSAP 학습 페이지 5개 설계

## 목표

master inventory 순서를 따르되 공식 source blocker가 확인된 페이지는 건너뛰고, 독립적으로 release 판단할 수 있는 다음 학습 페이지 다섯 개를 구현한다.

## 선택 규칙

- 공식 canonical source의 기술 항목을 stable ID manifest로 먼저 고정한다.
- 문서 불일치나 설명 없는 API 항목이 있으면 구현 수량을 맞추기 위해 추측하지 않고 다음 inventory 후보로 교체한다.
- 각 페이지는 자기 source만 소유하고 기존 `gsap.to()`의 34개 vars catalog를 복제하지 않는다.
- 실행 예제는 페이지 전용 runtime을 가지며, 화면 코드 패널은 같은 descriptor를 직렬화한다.
- 페이지별 handoff, build, Storybook, 독립 review를 완료한 뒤 page 단위로 commit한다.

## 확정 배치

1. `core:04 tween-start-end-values` — `to/from/fromTo/set`의 시작·끝 상태 소유권
2. `core:06 css-animation` — CSS 값 parsing과 transform mental model
3. `core:08 easing` — 내장 ease 선택과 parse/config 경계
4. `core:14 tween-playhead` — tween 재생 헤드와 시간·진행률 제어
5. `core:20 reusable-effects` — `registerEffect()`로 재사용 가능한 애니메이션 효과 설계

다음 선행 inventory 후보는 공식 문서·설치된 GSAP 3.15 source/type 사이의 blocker가 확인되어 건너뛴다.

| inventory | blocker evidence |
| --- | --- |
| `core:02 installation` | interactive helper 결과·typed `registerPlugin()` 계약·SSR source가 하나의 재현 가능한 canonical source로 고정되지 않음 |
| `core:05 tween-configuration` | `trialWarn`과 공개 config type의 범위가 official/runtime 사이에서 다름 |
| `core:07 non-css-target-values` | EndArray official 설명과 GSAP 3.15 source 동작이 다름 |
| `core:09 custom-ease` | official FAQ의 literal `undefined`와 metadata 누락으로 분모를 고정할 수 없음 |
| `core:10 custom-bounce-wiggle` | official `strength: 0~1`과 runtime의 `vars.strength || 0.7`이 충돌 |
| `core:11 ease-pack` | official example과 SlowMo runtime 의미가 충돌 |
| `core:12 tween-instance` | `scrollTrigger` official/type은 `undefined`만 허용하지만 runtime `kill()`은 `null`을 대입 |
| `core:13 tween-playback-controls` | `reverse()`의 official wording과 runtime 방향 전환 의미가 충돌 |
| `core:15 tween-timing-math` | official/runtime의 `globalTime()`이 GSAP 3.15 public type에 없음 |
| `core:16 tween-repeats` | `iteration()` official signature와 documented setter 인자가 충돌 |
| `core:17 tween-callbacks-promise` | `eventCallback()` public type의 fourth `scope` 인자와 runtime 사용이 충돌 |
| `core:18 find-stop-animations` | `Tween.kill()` official selector target과 public `object` target type이 충돌 |
| `core:19 high-frequency-updates` | `getProperty()` official `null` 결과가 public return type에 없음 |

## 공통 UI 원칙

- 기존 페이지의 header, section, coverage 시각 언어를 따르되 공용 추출은 하지 않는다.
- 자동 재생을 피하고 실행·재실행 버튼 또는 수동 progress로 제어한다.
- 390px에서 단일 열, code/table 가로 스크롤, native control label, focus-visible을 보장한다.
- reduced-motion에서는 duration 0 또는 정적 단계 비교로 같은 학습 질문을 유지한다.

## 검증

- 각 handoff coverage가 모든 verified source ID에 local evidence를 연결한다.
- `npm run build`, `npm run build-storybook`을 최종 배치에서 다시 실행한다.
- 연결 가능한 in-app Browser가 있으면 route, keyboard, reduced-motion, 390px를 실조작한다.
- 구현에 참여하지 않은 reviewer가 coverage, 학습 변환, 구조·주석, 접근성·motion, integration을 독립 판정한다.
