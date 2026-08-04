# Tween timing math handoff

## 입력 계약

### objective

Tween의 시간을 다루는 공식 메서드 일곱 개(`delay`, `duration`, `totalDuration`, `startTime`, `endTime`, `timeScale`, `globalTime`)를 개별 API 목록이 아니라 **하나의 시간축 위에서 서로 다른 지점을 가리키는 눈금**으로 재구성한다. 이 페이지의 내용은 곧 숫자 사이의 관계이므로, 공식 문서가 식을 적지 않은 지점은 전부 runtime probe로 확인하고 공식 주장과 분리해 표기한다.

학습 순서의 핵심 결정: `globalTime()`은 초보자에게 가장 낯설다. 다른 여섯 값의 기준(부모 timeline)을 먼저 세운 뒤 **마지막 섹션**에서 다룬다.

### officialPage

- title: `Tween.delay()` 외 6개
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/Tween/delay()` (primary)
  - `https://gsap.com/docs/v3/GSAP/Tween/duration()`
  - `https://gsap.com/docs/v3/GSAP/Tween/totalDuration()`
  - `https://gsap.com/docs/v3/GSAP/Tween/startTime()`
  - `https://gsap.com/docs/v3/GSAP/Tween/endTime()`
  - `https://gsap.com/docs/v3/GSAP/Tween/timeScale()`
  - `https://gsap.com/docs/v3/GSAP/Tween/globalTime()`
- reviewedAt: `2026-08-04`
- category: `GSAP > Tween Methods`
- slug: `tween-timing-math`
- sourcePageIds: primary `source:tween-delay`; related `source:tween-duration`, `source:tween-total-duration`, `source:tween-start-time`, `source:tween-end-time`, `source:tween-time-scale`, `source:tween-global-time`

일곱 페이지 모두 heading 구성이 동일하다: `<메서드명>` / `Parameters` / `Returns : <타입>` / `Details` / `Contents`. 별도의 note·tip·warning callout 상자는 **일곱 페이지 어디에도 없다**. `globalTime()`만 코드 예제 블록이 없고 본문 안에 인라인 호출만 있다.

### sourceManifest

41개 공식 item. 모두 2026-08-04에 canonical 원문 인용을 요구하는 방식으로 직접 확인했다.

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| DL-01 | signature `delay( value:Number ) : [Number \| self]` | `source:tween-delay` 제목 아래 signature | verified |
| DL-02 | `value: Number` (default = `NaN`) | `source:tween-delay` Parameters | verified |
| DL-03 | 인자 생략 시 getter, 지정 시 setter이며 인스턴스 자신 반환. 예 `myAnimation.delay(2).timeScale(0.5).restart(true);` | `source:tween-delay` Returns/Details | verified |
| DL-04 | "Gets or sets the animation's initial `delay` which is the length of time in seconds before the animation should begin." | `source:tween-delay` Details | verified |
| DL-05 | "A tween's starting values are not recorded until after the `delay` has expired (except in `from()` tweens which render immediately by default unless `immediateRender: false` is set in the `vars` parameter)." | `source:tween-delay` Details | verified |
| DL-06 | "An animation's `delay` is unaffected by its `timeScale`, so if you were to change `timeScale` from `1` to `10`, for example, it wouldn't cause the delay to grow tenfold." | `source:tween-delay` Details | verified |
| DL-07 | 코드 예제 `var currentDelay = myAnimation.delay(); //gets current delay` / `myAnimation.delay(2); //sets delay` | `source:tween-delay` 예제 | verified |
| DU-01 | signature `duration( value:Number ) : [Number \| self]` | `source:tween-duration` signature | verified |
| DU-02 | `value: Number` (default = `NaN`) | `source:tween-duration` Parameters | verified |
| DU-03 | getter/setter 이중 역할, 체이닝 예 `myAnimation.duration(2).delay(0.5).play(1);` | `source:tween-duration` Details | verified |
| DU-04 | "Gets or sets the animation's `duration`, not including any `repeat`s or `repeatDelay`s." | `source:tween-duration` Details | verified |
| DU-05 | "if a tween has a `duration` of 2 and a `repeat` of 3, its `totalDuration` would be 8 (one standard play plus 3 repeats equals 4 total cycles)" | `source:tween-duration` Details | verified |
| DU-06 | 코드 예제 `var currentDuration = myAnimation.duration(); //gets current duration` / `myAnimation.duration(2); //sets duration` | `source:tween-duration` 예제 | verified |
| TD-01 | signature `totalDuration( value:Number ) : [Number \| self]` | `source:tween-total-duration` signature | verified |
| TD-02 | `value: Number` (default = `NaN`) | `source:tween-total-duration` Parameters | verified |
| TD-03 | getter/setter 이중 역할, 인스턴스 반환 | `source:tween-total-duration` Details | verified |
| TD-04 | "Gets or sets the total duration of the tween in seconds including any repeats or repeatDelays. `duration`, by contrast, does **NOT** include repeats and repeatDelays." | `source:tween-total-duration` Details | verified |
| TD-05 | "if the tween has a `duration` of 10, a `repeat` of 1 and a `repeatDelay` of 2, the `totalDuration` would be 22" | `source:tween-total-duration` Details | verified |
| TD-06 | 코드 예제 `var total = myTween.totalDuration();` / `myTween.totalDuration(10);` | `source:tween-total-duration` 예제 | verified |
| ST-01 | signature `startTime( value:Number ) : [Number \| self]` | `source:tween-start-time` signature | verified |
| ST-02 | `value: Number` (default = `NaN`) | `source:tween-start-time` Parameters | verified |
| ST-03 | getter/setter 이중 역할, 인스턴스 반환 | `source:tween-start-time` Details | verified |
| ST-04 | "Gets or sets the time at which the animation begins on its parent timeline (after any delay that was defined). For example, if a tween starts at exactly 3 seconds into the timeline on which it is placed, the tween's `startTime` would be 3." | `source:tween-start-time` Details | verified |
| ST-05 | "The `startTime` may be automatically adjusted to make the timing appear seamless if the parent timeline's `smoothChildTiming` property is `true` and a timing-dependent change is made on-the-fly, like `reverse()` is called or `timeScale()` is changed, etc." | `source:tween-start-time` Details | verified |
| ST-06 | 코드 예제 `//gets current start time` / `var start = myAnimation.startTime();` / `//sets the start time` / `myAnimation.startTime(2);` | `source:tween-start-time` 예제 | verified |
| ET-01 | signature `endTime( includeRepeats:Boolean ) : Number` — setter 없음 | `source:tween-end-time` signature | verified |
| ET-02 | "`includeRepeats`: Boolean - (default = `true`) - by default, repeats are included when calculating the end time but you can pass `false` to prevent that." | `source:tween-end-time` Parameters | verified |
| ET-03 | "Returns the time at which the animation will finish according to the parent timeline's local time." | `source:tween-end-time` Returns | verified |
| ET-04 | "This does factor in the timeScale." | `source:tween-end-time` Details | verified |
| ET-05 | 공식 코드 예제: `tl.add(tween, 0.5)` 후 `endTime()` → `1.5`, `tween.timeScale(2)` 후 `endTime()` → `1` | `source:tween-end-time` 예제 | verified |
| TS-01 | signature `timeScale( value:Number ) : [Number \| self]` | `source:tween-time-scale` signature | verified |
| TS-02 | `value: Number` (default = `NaN`) | `source:tween-time-scale` Parameters | verified |
| TS-03 | getter/setter 이중 역할, 인스턴스 반환 | `source:tween-time-scale` Details | verified |
| TS-04 | "Factor that's used to scale time in the animation where 1 = normal speed (the default), 0.5 = half speed, 2 = double speed, -1 = go backwards at normal speed, etc." | `source:tween-time-scale` Details | verified |
| TS-05 | "if an animation's `duration` is 2 but its `timeScale` is 0.5, it will take 4 seconds to finish. If you nest that animation in a timeline whose `timeScale` is 0.5 as well, it would take 8 seconds to finish. You can even tween the `timeScale` to gradually slow it down or speed it up." | `source:tween-time-scale` Details | verified |
| TS-06 | 코드 예제 `//gets current timeScale` / `var currentTimeScale = myAnimation.timeScale();` / `//sets timeScale to half-speed` / `myAnimation.timeScale(0.5);` | `source:tween-time-scale` 예제 | verified |
| GT-01 | signature `globalTime( localTime:Number ) : Number` — setter 없음 | `source:tween-global-time` signature | verified |
| GT-02 | `localTime: Number` — "The local time that should be converted into global time". **기본값 표기 없음** | `source:tween-global-time` Parameters | verified |
| GT-03 | "The corresponding time on the `gsap.globalTimeline`" | `source:tween-global-time` Returns | verified |
| GT-04 | "Converts a local time to the corresponding time on the gsap.globalTimeline (factoring in all nesting, timeScales, etc.). Perhaps you've got a tween nested inside a timeline that's in another timeline and you want to convert that tween's start time (0) into where that would sit on the global timeline, you'd do `tween.globalTime(0)`." | `source:tween-global-time` Details | verified |
| GT-05 | "By default, it uses the tween's totalTime, so `tween.globalTime()` is the same as `tween.globalTime(tween.totalTime())`." | `source:tween-global-time` Details | verified |

### sourceBlockers

`none`. 41개 기술 item 전부 2026-08-04에 공식 페이지 원문으로 직접 확인했다.

WebFetch 요약이 항목을 합치거나 누락시키는 문제를 피하기 위해 **일곱 URL을 1차 조회한 뒤, 모호한 다섯 페이지(`startTime`, `totalDuration`, `globalTime`, `duration`, `endTime`)를 원문 인용을 명시적으로 요구하며 2차 재조회**했다. 이 재조회로 다음이 교정됐다.

- `startTime` signature가 1차 요약에서 `startTime() : [Number | self]`로 나왔으나 실제로는 `startTime( value:Number ) : [Number | self]`였다.
- `duration`의 체이닝 예시 `myAnimation.duration(2).delay(0.5).play(1);`이 1차에서 출처 불명으로 나왔으나 Details 절 본문임을 확인했다.
- `globalTime`에 코드 예제 블록이 없고 인라인 호출만 있음을 확인했다.

다음은 일곱 공식 페이지가 **게시하지 않은** 내용이므로 공식 주장으로 적지 않는다. 이 중 실행으로 확인한 것은 `implementation` origin으로 분리 표기했다.

- 각 속성 자체의 기본값 표 (인자 기본값 `NaN`만 게시됨)
- setter 호출 시 다른 값이 따라 바뀌는 부작용
- `repeat: -1`일 때 `totalDuration()`의 반환값
- `smoothChildTiming`의 기본값과 자동 조정 발생 조건
- `endTime`·`globalTime`·`totalDuration`의 계산식
- 브라우저·버전 지원 표

### moduleSelection

| module | 목적 | 근거 source |
| --- | --- | --- |
| callable method (`CM`) | 일곱 메서드의 signature·인자·기본값·반환값·setter 유무를 표로 확정한다. | 일곱 source 전부 |
| 개념·가이드 (`CI`) | 일곱 값을 하나의 시간축 위 좌표·길이·속도로 묶는 멘탈 모델을 세운다. | 일곱 source의 Details |
| property catalog 부분 채택 | `duration` vs `totalDuration`, `endTime()` vs `endTime(false)`처럼 **짝으로만 의미가 생기는 값**을 대조표로 다룬다. | duration, total-duration, end-time |

`gsap.to()` vars 카탈로그, ease visualizer, 설치 모듈은 추가하지 않는다. animation Hook도 쓰지 않는다 — 아래 exampleContracts 참고.

### learnerFlow

| id | 학습자 질문 | sourceItemIds |
| --- | --- | --- |
| `flow:one-axis` | 이 일곱 개가 왜 한 페이지에 같이 있나요? | DL-01, DL-04 |
| `flow:delay-semantics` | delay 동안에는 정확히 무슨 일이 일어나나요? | DL-05, DL-06, DL-07 |
| `flow:same-shape` | 메서드를 하나씩 외워야 하나요? | DL-02/03, DU-02/03, TD-02/03, ST-02/03, TS-02/03 |
| `flow:length-split` | duration과 totalDuration은 왜 둘 다 있나요? | DU-01/04/05/06, TD-01/04/05/06 |
| `flow:coordinates` | 길이 말고 "몇 초에 시작하는지"는 어떻게 아나요? | ST-01/04/05/06 |
| `flow:end-and-repeats` | 끝나는 시각은 반복을 세나요 마나요? | ET-01/02/03/04/05 |
| `flow:speed-not-length` | 배속을 올리면 duration이 줄어드나요? | TS-01/04/05/06 |
| `flow:nesting` | 부모의 부모가 있으면 실제 시각은 어떻게 아나요? | GT-01/02/03/04/05 |

### coverageMap

41개 공식 item 전부 `covered`. 섹션별 분배는 `tween-timing-math.meta.ts`의 `sourceItems`와 `tween-timing-math.catalog.ts`의 행 수가 스크립트로 일치 확인됐다(둘 다 41).

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| DL-01, DL-04, DL-05, DL-06, DL-07 | `sections/TimeAxisSection/TimeAxisSection.tsx` — delay 정의 문단, from() 경고 블록, timeScale 무관 note, 공식 코드 블록 | covered |
| DL-02/03, DU-02/03, TD-02/03, ST-02/03, TS-02/03 | `sections/GetterSetterSection/GetterSetterSection.tsx` — 다섯 메서드 공통 규칙 표, `NaN` 의미 note, 공식 체이닝 예시 표 | covered |
| DU-01, DU-04, DU-05, DU-06, TD-01, TD-04, TD-05, TD-06 | `sections/DurationTotalSection/DurationTotalSection.tsx` — 공식 두 숫자 예시 표, 두 공식 코드 블록 | covered |
| ST-01, ST-04, ST-05, ST-06 | `sections/StartEndSection/StartEndSection.tsx` — 좌표 대조표, startTime 공식 코드 블록, smoothChildTiming 경고 블록 | covered |
| ET-01, ET-02, ET-03, ET-04, ET-05 | `sections/StartEndSection/StartEndSection.tsx` — 좌표 대조표, 공식 endTime 예제 원문과 1.5/1 해설, includeRepeats note | covered |
| TS-01, TS-04, TS-05, TS-06 | `sections/TimeScaleSection/TimeScaleSection.tsx` — 값 의미 표, 중첩 배속 문단, 공식 코드 블록 | covered |
| GT-01, GT-02, GT-03, GT-04, GT-05 | `sections/GlobalTimeSection/GlobalTimeSection.tsx` — 공식 명세 표, 공식 상황 인용 문단, 인자 생략 문장 | covered |

probe item 10개(`PR-01`~`PR-10`)는 공식 item이 아니다. coverage 분모(41)에 포함하지 않으며 `PageCoverage`도 공식 41개와 분리해 센다. 페이지에서는 **점선 테두리 상자**(`.timing-page__note--probe`)와 "공식 페이지에 없는 내용입니다" 문장, 그리고 **측정 방법과 재현 조건**을 함께 표기한다.

| probeItemId | 주장 | localEvidence |
| --- | --- | --- |
| PR-01 | `totalDuration = duration × (repeat + 1) + repeatDelay × repeat` | `DurationTotalSection.tsx` 식 블록 |
| PR-02 | `duration(v)`/`totalDuration(v)` setter가 서로를 재계산하고 timeScale은 1 유지 | `DurationTotalSection.tsx` setter 블록 |
| PR-03 | `repeat: -1` → `totalDuration()` = `10000000000` | `DurationTotalSection.tsx` 무한 반복 경고 |
| PR-04 | `endTime(true/false) = startTime + (totalDuration/duration) ÷ \|timeScale\|` | `StartEndSection.tsx` 식 블록 |
| PR-05 | timeline 안에서 `startTime = 배치 위치 + delay` | `StartEndSection.tsx` 덧셈 블록 |
| PR-06 | `gsap.timeline()`의 `smoothChildTiming` 기본값은 `false`, `gsap.globalTimeline`만 `true` | `StartEndSection.tsx` smoothChildTiming 경고 |
| PR-07 | `timeScale`은 `duration()`·`totalDuration()`을 바꾸지 않는다 | `TimeScaleSection.tsx` 불변 블록 |
| PR-08 | paused 애니메이션은 `endTime()`이 timeScale을 반영하지 않는다 | `TimeScaleSection.tsx` 경고 블록 |
| PR-09 | globalTime은 위로 올라가며 `time = startTime + time ÷ \|timeScale\|` 반복 | `GlobalTimeSection.tsx` 변환 규칙 블록 |
| PR-10 | 인자 없는 `globalTime()`은 `totalTime()`이 아니라 재생 헤드 기준 rawTime을 쓴다 | `GlobalTimeSection.tsx` 인자 생략 경고 |

### relatedPages

- `gsap-to` — target·vars와 Tween 생성 계약 전체를 소유한다. 이 페이지는 전제로만 쓴다.
- `tween-configuration` — `duration`/`delay`/`repeat`/`repeatDelay`를 `vars`에 적는 방법을 소유한다. 이 페이지는 그 값이 **getter 반환값에 어떻게 반영되는지**만 다룬다.
- `tween-playhead` — `progress()`와 재생 헤드 조작을 소유한다.
- `easing` — ease 곡선을 소유한다. 이 페이지는 시간축만 다루고 값 보간은 다루지 않는다.
- 반복 회차와 값 재계산(`invalidate`, `iteration`, `yoyo`)은 별도 페이지 소유이며 **현재 라우트에 등록돼 있지 않아 링크를 걸지 않았다**. 등록되면 `DurationTotalSection`의 마지막 note에 링크를 추가한다.

## 구현 계약

### exactFiles

create:

```text
src/content/gsap/fundamentals/tween-timing-math/TweenTimingMathPage.tsx
src/content/gsap/fundamentals/tween-timing-math/TweenTimingMathPage.css
src/content/gsap/fundamentals/tween-timing-math/tween-timing-math.meta.ts
src/content/gsap/fundamentals/tween-timing-math/tween-timing-math.catalog.ts
src/content/gsap/fundamentals/tween-timing-math/components/PageCoverage/PageCoverage.tsx
src/content/gsap/fundamentals/tween-timing-math/components/SectionHeading/SectionHeading.tsx
src/content/gsap/fundamentals/tween-timing-math/sections/TimeAxisSection/TimeAxisSection.tsx
src/content/gsap/fundamentals/tween-timing-math/sections/GetterSetterSection/GetterSetterSection.tsx
src/content/gsap/fundamentals/tween-timing-math/sections/DurationTotalSection/DurationTotalSection.tsx
src/content/gsap/fundamentals/tween-timing-math/sections/StartEndSection/StartEndSection.tsx
src/content/gsap/fundamentals/tween-timing-math/sections/TimeScaleSection/TimeScaleSection.tsx
src/content/gsap/fundamentals/tween-timing-math/sections/GlobalTimeSection/GlobalTimeSection.tsx
src/content/gsap/fundamentals/tween-timing-math/sections/BoundariesSection/BoundariesSection.tsx
src/content/gsap/fundamentals/tween-timing-math/examples/TimingMathLab/TimingMathLab.tsx
src/content/gsap/fundamentals/tween-timing-math/examples/TimingMathLab/TimingMathLab.css
src/content/gsap/fundamentals/tween-timing-math/examples/TimingMathLab/useTimingMathRuntime.ts
src/content/gsap/fundamentals/tween-timing-math/examples/NestedGlobalTimeLab/NestedGlobalTimeLab.tsx
src/content/gsap/fundamentals/tween-timing-math/examples/NestedGlobalTimeLab/NestedGlobalTimeLab.css
src/content/gsap/fundamentals/tween-timing-math/examples/NestedGlobalTimeLab/useNestedGlobalTimeRuntime.ts
docs/handoffs/gsap/core/tween-timing-math.md
```

modify: `none`.

`src/app/routes.ts` 등록은 **이 컨텍스트의 비목표**다. 저장소 소유자가 직접 등록한다. 등록 전까지 페이지는 라우트에서 접근되지 않는다.

### exampleContracts

#### `TimingMathLab`

- goal: `delay`·`duration`·`repeat`·`repeatDelay`·`timeScale` 다섯 값을 조절하며 일곱 getter의 반환값이 **동시에** 어떻게 갈라지는지 하나의 시간축·표·코드로 확인한다.
- question: 다섯 입력 중 하나를 바꾸면 일곱 숫자 중 무엇이 바뀌고 무엇이 그대로인가?
- representation: **정적 계산 관찰**. 자동 재생 애니메이션을 쓰지 않는다. `docs/workflows/learning-design.md`의 "정적 표·타임라인이 더 직접적이면 그것을 고른다"에 따른 선택이며, 이 개념의 본질이 움직임이 아니라 숫자 관계이기 때문이다.
- controls: delay range(0–2, 0.25), duration range(0.5–4, 0.5), repeat range(0–3, 1), repeatDelay range(0–1, 0.25), timeScale radio(0.5/1/2/4)
- runtimeSource: `useTimingMathRuntime.ts`
- sourcePath: `examples/TimingMathLab/useTimingMathRuntime.ts`
- runtimeOwnership: hook이 다섯 control state, 단일 `TimingDescriptor`, `gsap.timeline({paused:true})` + `gsap.to()` + `parent.add(tween, 0)` + `tween.timeScale()` 생성 순서, 일곱 getter 호출 결과(`TimingReadout`), 그리고 **읽어 온 값에서만 파생한** 시간축 칸(`TimingSegment[]`)을 소유한다. scoped `useGSAP` 한 개, `revertOnUpdate: true`, cleanup에서 `parent.kill()`.
- displayOwnership: TSX가 descriptor를 코드 문법으로만 직렬화하고 controls·시간축 막대·getter 표·학습 패널을 그린다. 어떤 숫자도 TSX에서 계산하지 않는다. 막대의 `left`/`width` 백분율만 `readout.endTime` 기준으로 환산한다.
- coveredSourceItemIds: 종합 예제로서 DL-04, DU-04, TD-04, ST-04, ET-02, ET-04, TS-04를 실행으로 재확인한다(각 item의 1차 근거는 해당 섹션 본문).
- accessibility: 모든 range/radio에 native label과 `output`, radio group에 `role="radiogroup"` + `aria-labelledby`, 시간축에 `role="img"`와 현재 숫자를 담은 `aria-label`, 시간축 아래에 **같은 정보를 텍스트로 반복하는 `ol` legend**(색·위치에만 의존하지 않기 위함), 표에 `caption`과 header, `:focus-visible` 아웃라인.
- motion: 자동 재생 **없음**. 부모 timeline이 `paused: true`라 아무것도 움직이지 않는다. 유일한 모션은 값이 바뀔 때 막대가 새 위치로 미끄러지는 220ms transition이며, `useReducedMotion()`이 `true`면 `--animated` 클래스를 붙이지 않고 CSS `@media (prefers-reduced-motion: reduce)`로도 이중 차단한다.

#### `NestedGlobalTimeLab`

- goal: outer → inner → tween 삼중 중첩에서 tween의 local time 하나가 전역 시각으로 접히는 과정을 층별 좌표와 함께 확인한다.
- question: 층마다 다른 기준으로 잰 `startTime()`들이 어떻게 하나의 전역 숫자가 되는가?
- representation: **정적 좌표 관찰** + 층 구조 목록 + 전역 시간축 위 구간·표시자.
- controls: inner 위치 range(0–4, 0.5), tween 위치 range(0–3, 0.5), localTime range(0–2, 0.25), inner timeScale radio(0.5/1/2)
- runtimeSource: `useNestedGlobalTimeRuntime.ts`
- sourcePath: `examples/NestedGlobalTimeLab/useNestedGlobalTimeRuntime.ts`
- runtimeOwnership: hook이 네 control state, 단일 `NestedDescriptor`, `outer(paused) → outer.startTime(0) → inner → tween` 생성 순서, 세 층의 `startTime()`과 세 번의 `globalTime()` 호출 결과(`NestedReadout`)를 소유한다. scoped `useGSAP` 한 개, `revertOnUpdate: true`, cleanup에서 `outer.kill()`.
- displayOwnership: TSX가 descriptor를 코드 문법으로만 직렬화하고 층 목록·전역 시간축·학습 패널을 그린다. 좌표 변환을 TSX에서 다시 계산하지 않는다.
- coveredSourceItemIds: GT-04를 실행으로 재확인한다(1차 근거는 `GlobalTimeSection` 본문).
- accessibility: native label + `output`, radio group에 `role="radiogroup"`, 전역 시간축에 `role="img"`와 현재 숫자를 담은 `aria-label`, 축 아래에 결과 숫자를 텍스트로 반복, 층 구조는 들여쓰기뿐 아니라 **각 층의 이름과 값을 텍스트로** 제공, 좁은 화면에서 들여쓰기 해제.
- motion: 자동 재생 **없음**. outer가 `paused: true`. 구간 막대와 표시자의 220ms transition만 있으며 `useReducedMotion()`과 CSS 미디어 쿼리로 이중 차단한다.

두 예제 모두 `use*Animation.ts`가 아니라 `use*Runtime.ts`를 쓴다. GSAP 객체를 만들지만 **재생하지 않고 getter 반환값만 관찰**하는 비애니메이션 예제이기 때문이다(`docs/project-structure.md`의 "상태형 비애니메이션 utility" 분류, `tween-callbacks-promise`의 `useEventCallbackRuntime.ts` 선례를 따름).

### nonGoals

- `src/app/routes.ts`에 페이지를 등록하지 않는다. 소유자가 직접 한다.
- `src/components/` 공용 컴포넌트를 수정하지 않는다. `useReducedMotion`은 읽기만 한다.
- Timeline의 동명 메서드 페이지를 이 페이지에서 다루지 않는다. 일곱 canonical은 전부 Tween 쪽이다.
- `repeat`/`repeatDelay`/`yoyo`의 회차 의미와 값 재계산을 카탈로그로 만들지 않는다. `totalDuration`에 반영되는 방식만 본다.
- 공식이 침묵한 항목을 추정해 적지 않는다. 실행으로 확인한 것만 `implementation` origin으로 분리 표기한다.
- 자동화 테스트 코드와 테스트 러너 설정을 추가하지 않는다.

### preserve

- 기존 학습 페이지들의 파일·라우트·스타일 토큰
- 공용 컴포넌트(`OfficialDocsLink`, `useReducedMotion`) — 변경 없음
- `master-page-inventory.md`의 소유권 행

## 검증 계약

### verifiedPerspectives

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion, Build/Integration, Cross-page Consistency — 모두 구현 컨텍스트가 직접 판정했다(`docs/workflows/quality-gates.md`: 독립 검수자를 두지 않는다).

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-CORE15-001 | PASS | 2026-08-04에 일곱 canonical 원문을 직접 조회해 41개 item을 확인했다. 일곱 페이지 모두 heading이 `<이름>/Parameters/Returns/Details/Contents`이고 note·tip·warning callout 상자가 없음을 확인했다. | blocker 없이 구현 가능 | 미게시 명세를 `공식 페이지에 명시 없음`으로 표시 |
| SRC-CORE15-002 | ADDRESSED | 1차 WebFetch 요약이 `startTime` signature를 `startTime()`으로(인자 누락), `duration`의 체이닝 예시를 출처 불명으로 반환했다. 다섯 페이지를 원문 인용 요구 방식으로 2차 재조회해 `startTime( value:Number ) : [Number \| self]`와 Details 절 소재를 확정했다. | 요약만 믿었으면 signature 오기와 item 누락 | none |
| OC-CORE15-001 | PASS | 공식 41/41 item이 `coverageMap`에서 파일 근거로 연결됐다. 스크립트로 meta 섹션 합계(5+10+8+9+4+5+0=41), catalog `origin:'official'` 행 수(41), `officialSourceItems` 분모(41)가 셋 다 일치함을 대조했다. 중복 ID 없음, 미등록 sectionId 없음, mapped source 7/7. | Official Coverage 통과 | none |
| LT-CORE15-001 | PASS | 공식 순서(메서드 알파벳순 7개 문서)를 버리고 "시간축 → 공통 호출 규칙 → 길이 → 좌표 → 속도 → 중첩" 순으로 재배열했다. 용어 4개(부모 timeline, local time, 재생 헤드, 회차)를 01 섹션에서 사용 전에 정의했다. `globalTime`은 요청대로 마지막 섹션에 배치했다. | Learning Transformation 통과 | none |
| PROBE-CORE15-001 | PASS | 아래 verificationEvidence의 10개 probe. 모두 config·호출·반환값을 그대로 기록했고, 식 주장 2건은 각각 6개·15개 조합 전수 대조로 검증했다. | 공식 문장만으로는 알 수 없는 숫자 관계 | `PR-01`~`PR-10`으로 기록하고 점선 상자에 측정 방법 명시 |
| STRUCT-CORE15-001 | PASS | 두 예제 모두 `use*Runtime.ts`를 쓴다. GSAP 호출·state·descriptor·관찰값은 hook에, 제목·설명·표·패널은 TSX에 있다. TSX 어느 파일도 `gsap`을 import하지 않음을 grep으로 확인했다(문자열 안의 `gsap.`은 화면에 보여줄 코드 텍스트다). 한 파일 한 컴포넌트, TSX와 전용 CSS 동일 폴더. | Structure/Comment 통과 | none |
| RDS-CORE15-001 | PASS | 두 lab 모두 hook의 단일 descriptor에서 GSAP 호출과 표시 코드가 함께 파생된다. 화면의 모든 숫자가 getter 반환값(`TimingReadout`/`NestedReadout`)이고, 시간축 칸도 그 반환값에서만 파생한다. TSX는 백분율 환산과 문법 포맷만 한다. | Runtime/Display Sync 통과 | none |
| STRUCT-CORE15-002 | ADDRESSED | 초안이 `tween.globalTime()`을 직접 호출했으나 GSAP 3.15.0의 `types/*.d.ts`에 `globalTime` 선언이 없어 `TS2339`로 실패했다(런타임에는 존재, 공식 문서에도 게시). `useNestedGlobalTimeRuntime.ts`에 공식 signature를 그대로 옮긴 `WithGlobalTime` 타입과 `readGlobalTime()` 헬퍼를 두어 호출 지점에서 한 번만 좁혔다. | 타입 체크 실패 | none |
| DESIGN-CORE15-001 | PASS | probe P3에서 **paused tween은 `endTime()`이 timeScale을 무시**함을 발견해 lab 구조를 바꿨다. tween 자신을 멈추는 대신 **부모 timeline만 `paused:true`로 두고 자식은 살려** 둔다. 그 결과 화면은 정지 상태이면서 `endTime()`이 공식대로 timeScale을 반영한다. 이 사실 자체를 `PR-08`로 페이지에 실었다. | 잘못된 구조였다면 공식 문서와 어긋나는 숫자를 가르칠 뻔했다 | none |
| A11Y-CORE15-001 | PASS (정적) | 코드로 판정 가능한 범위: 모든 range/radio에 native `label`+`htmlFor`, radio group에 `role="radiogroup"`+`aria-labelledby`, 두 시간축에 `role="img"`와 현재 숫자를 담은 `aria-label`, 시간축 정보를 텍스트 legend로 중복 제공(색·위치 단독 의존 없음), 표에 `caption`/`scope`, `:focus-visible` 아웃라인, 720px 이하 1열 전환. | 정적 접근성 통과 | none |
| MOTION-CORE15-001 | PASS (정적) | 자동 재생 없음(두 예제의 최상위 timeline이 `paused: true`). 유일한 transition에 `useReducedMotion()` 기반 클래스 차단과 CSS `@media (prefers-reduced-motion: reduce)` 이중 차단을 걸었다. | 정적 motion 통과 | none |
| BUILD-CORE15-001 | PASS | `npx tsc --noEmit` 결과 `tween-timing-math` 경로의 오류 0건. 19개 파일의 모든 상대 import를 각 파일 기준으로 해석해 실재 확인. 남은 20건은 전부 다른 페이지 폴더(`find-stop-animations`, `gsap-context`, `high-frequency-updates`, `tween-playback-controls`, `responsive-motion`, `tween-instance`)의 동시 작업 중 파일이며 이 작업과 무관하다. | Build 통과 | `npm run build`/`build-storybook`은 지시에 따라 실행하지 않음 |
| XPAGE-CORE15-001 | PASS | `gsap.to()`·vars 작성법·`progress()`·ease를 소유하지 않고 각 owner 페이지로 연결했다. 미등록 라우트(`tween-repeats`)로의 링크를 만들지 않고 등록된 `tween-configuration`으로 대체했다 — `resolveRoute`가 미등록 경로를 첫 레슨으로 흡수해 오해를 낳기 때문이다. 파일·클래스 네이밍은 `non-css-target-values`/`tween-callbacks-promise` 규약을 따랐다. | Cross-page Consistency 통과 | 반복 페이지 등록 시 링크 추가 |
| A11Y-CORE15-002 | DEFERRED | 키보드 이동·포커스 표시, `prefers-reduced-motion` 실제 전환, 320/390px 실제 레이아웃, 두 lab control의 실제 조작 결과 | 소유자 일괄 브라우저 검수 대상 | 전체 페이지 완성 후 일괄 확인 |

### verificationEvidence

- **공식 원문 대조** — 2026-08-04, 일곱 canonical URL 직접 조회 + 모호한 다섯 페이지 원문 인용 재조회.
- **runtime probe** — GSAP `3.15.0`(`node_modules/gsap/package.json`). 모든 probe는 프로젝트 루트에서 `node --input-type=module`로 `gsap`을 import해 실행했다.

공통 측정 구조(별도 명시가 없으면 이것):

```js
const parent = gsap.timeline({ paused: true })
const tween = gsap.to({ v: 0 }, { v: 1, duration, delay, repeat, repeatDelay })
parent.add(tween, position)
tween.timeScale(ts)
// 이후 getter를 그대로 읽는다
```

| probe | 측정 방법 | 결과(숫자 그대로) |
| --- | --- | --- |
| PR-01 | `duration:d, repeat:r, repeatDelay:rd`로 만들어 `tween.totalDuration()`을 읽고 `d*(r+1)+rd*r`과 대조 | `(2,0,0)→2`, `(2,2,0)→6`, `(2,2,0.5)→7`, `(10,1,2)→22`, `(1.5,4,0.25)→8.5`, `(3,1,0)→6`. **6/6 식과 일치** |
| PR-02 | `duration:2, repeat:2`(초기 `d2/td6/ts1`)에 setter 호출 후 세 getter 재조회 | `duration(4)` → `d4/td12/ts1`. `totalDuration(12)` → `d4/td12/ts1`. 다섯 setter의 반환값이 인스턴스 자신인지도 확인: `duration/totalDuration/delay/timeScale/startTime` 전부 `true` |
| PR-03 | `duration:2, repeat:-1`을 position 1에 배치 후 읽기 | `d 2`, `td 10000000000`, `endTime 10000000001`, `endTime(false) 3` |
| PR-04 | 설정 `{duration:2}`, `{duration:2,repeat:2}`, `{duration:3,repeat:1,repeatDelay:1}` × timeScale `0.25/0.5/1/2/3` = 15조합. position 1. `endTime()`/`endTime(false)`를 `startTime + (td\|d)/\|ts\|`와 대조 | **15/15 전부 일치**. 예: `{d2,r2}` ts0.25 → `et 25 / etFalse 9`; ts0.5 → `13 / 5`; ts1 → `7 / 3`; ts2 → `4 / 2`; ts3 → `3 / 1.666667` |
| PR-05 | `{duration:1, delay:D}`를 `parent.add(tween, POS)`로 넣고 `startTime()` 읽기 | `(D0,POS2)→2`, `(D0.75,POS2)→2.75`, `(D1,POS0)→1`, `(D0.75,POS0)→0.75`. lab 설정(position 0)에서 delay 6종 × ts 5종 = 30조합 전부 `startTime === delay` |
| PR-06 | `gsap.timeline({paused:true}).smoothChildTiming`, `gsap.globalTimeline.smoothChildTiming` 읽기. 이어서 헤드를 2초로 옮긴 뒤 자식에 `timeScale(2)` | 기본값 `false`, globalTimeline `true`. `smoothChildTiming:false`면 `startTime` `1→1`, `true`면 `1→1.5`. `delay(0.5)` setter도 `false`에서 `st 2→2`, `true`에서 `2→2.5` |
| PR-07 | `{duration:2, repeat:2}` position 1에 `timeScale(k)` | k `0.5/1/2/4` 전부 `duration 2`, `totalDuration 6`으로 동일. `endTime`만 `13 / 7 / 4 / 2.5` |
| PR-08 | 같은 구조에서 tween만 `paused:true`로 생성 후 `timeScale(k)` | 살아 있는 자식: ts2 → `endTime 4`. `paused:true` 자식: ts0.5에서도 ts2에서도 `endTime 7`(=배속 1과 동일) |
| PR-09 | `outer(paused, startTime(0)) → inner(innerPos) → tween(twPos, duration 2)`, `inner.timeScale(k)`. `tween.globalTime(local)`을 위로 올라가며 `start + time/\|ts\|`를 적용한 손계산과 대조 | 7조합 **전부 일치**: `(3,1,1,0)→4`, `(3,1,1,2)→6`, `(3,1,2,0)→3.5`, `(3,1,2,2)→4.5`, `(0,0,1,0)→0`, `(2,0.5,0.5,1)→5`, `(4,2,2,1)→5.5` |
| PR-10 | 같은 삼중 구조에서 `tween.globalTime()`과 `tween.globalTime(tween.totalTime())` 비교 | 바깥 헤드 0초: `totalTime 0`, 인자 없음 → `0`, `globalTime(totalTime())` → `4`, `rawTime -4` (**불일치**). `outer.time(4)` 후: 둘 다 `4` (일치) |

- 공식 예제 재현 — `endTime()` 문서 예제를 그대로 실행해 `tl.add(tween, 0.5)` 후 `endTime() = 1.5`, `tween.timeScale(2)` 후 `endTime() = 1`을 확인했다(ET-05 일치).
- 공식 숫자 예시 재현 — DU-05(`duration 2, repeat 3` → `totalDuration 8`)와 TD-05(`duration 10, repeat 1, repeatDelay 2` → `22`)를 실행으로 확인했다.
- coverage 대조 — 스크립트로 catalog 공식 행 수 41, meta 섹션 합계 41, `officialSourceItems` 41이 일치함을 확인했다.
- 타입 — `npx tsc --noEmit`에서 `tween-timing-math` 경로 오류 0건.

### releaseDecision

`PASS` (미해결 `DEFERRED` 1건: A11Y-CORE15-002 — 키보드 이동·`prefers-reduced-motion` 실제 전환·320/390px 실제 레이아웃·lab control 실제 조작. 소유자 브라우저 일괄 검수 대상)

`src/app/routes.ts` 등록은 이 컨텍스트의 비목표이므로 등록 전까지 페이지는 라우트에서 접근되지 않는다. 소유자 등록 후 브라우저 검수를 진행한다.
