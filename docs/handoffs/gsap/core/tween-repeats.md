# Tween repeats and invalidate handoff

## 입력 계약

### objective

Tween의 반복을 두 개의 **서로 다른 질문**으로 갈라 가르친다. 하나는 "언제 몇 번 재생되는가"(`repeat`·`repeatDelay`·`yoyo`·`iteration`)이고, 다른 하나는 "재생될 때마다 어떤 숫자를 쓰는가"(`invalidate`)다. 두 질문을 한 섹션에 섞지 않는다.

primary인 `invalidate()`는 초보자에게 가장 어려운 개념이므로 **"Tween은 시작값을 만들 때 한 번 기억해 둔다 → 그래서 다시 재생하면 옛 시작값을 쓴다 → invalidate가 그 기억을 지운다"** 라는 3단 순서로 세운다.

### officialPage

- title: `invalidate` + `iteration` + `repeat` + `repeatDelay` + `yoyo`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/Tween/invalidate()`
  - `https://gsap.com/docs/v3/GSAP/Tween/iteration()`
  - `https://gsap.com/docs/v3/GSAP/Tween/repeat()`
  - `https://gsap.com/docs/v3/GSAP/Tween/repeatDelay()`
  - `https://gsap.com/docs/v3/GSAP/Tween/yoyo()`
- reviewedAt: `2026-08-04`
- category: `Fundamentals > Tween`
- slug: `tween-repeats`
- sourcePageIds: primary `source:tween-invalidate`; related `source:tween-iteration`, `source:tween-repeat`, `source:tween-repeat-delay`, `source:tween-yoyo`

다섯 페이지 모두 짧은 메서드 문서다. heading 구조는 `<메서드명>` → (`Parameters`) → `Returns : <타입>` → `Details`이다.

- `invalidate()`와 `iteration()`에는 **Parameters 절이 없다**. 두 페이지 모두 heading 목록을 직접 조회해 확인했다.
- `iteration()`의 signature는 `iteration( ) : [Number | self]`로 **괄호가 비어 있는데도** Details가 setter 사용법을 설명한다. 공식 문서 내부의 불일치이므로 인자 이름·타입·기본값을 지어내지 않고 양쪽을 그대로 옮긴다.
- 어느 페이지에도 note/tip/warning callout이 없다. **단 하나의 예외**가 `invalidate()`의 `repeatRefresh` Note다.
- `repeat()` 페이지는 `repeatRefresh`를 **언급하지 않는다**. `repeatRefresh` 언급은 오직 `invalidate()` 페이지에만 있다. source별 귀속을 섞지 않는다.

### sourceManifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| REP-01 | signature `repeat( value:Number ) : [Number | self]` | `source:tween-repeat` signature heading | verified |
| REP-02 | `value`: Number (default = `0`) | `source:tween-repeat` Parameters | verified |
| REP-03 | 인자 생략 시 getter, 인자 지정 시 setter이며 instance 자신을 반환 | `source:tween-repeat` Returns | verified |
| REP-04 | "Gets or sets the number of times that the tween should repeat after its first iteration." | `source:tween-repeat` Details | verified |
| REP-05 | "For example, if `repeat` is 1, the tween will play a total of twice (the initial play plus 1 repeat)." | `source:tween-repeat` Details | verified |
| REP-06 | "To repeat indefinitely, use -1." | `source:tween-repeat` Details | verified |
| REP-07 | "`repeat` should always be an integer." | `source:tween-repeat` Details | verified |
| REP-08 | yoyo로 방향 교대, repeatDelay로 시간 간격을 넣으라는 안내 | `source:tween-repeat` Details | verified |
| REP-09 | vars 초기값 `gsap.to(obj, {duration: 1, x: 100, repeat: 2});`, 코드 예제, chaining `myTween.repeat(2).yoyo(true).play();` | `source:tween-repeat` Details + 코드 블록 | verified |
| RPD-01 | signature `repeatDelay( value:Number ) : [Number | self]` | `source:tween-repeat-delay` signature heading | verified |
| RPD-02 | `value`: Number (default = `NaN`) | `source:tween-repeat-delay` Parameters | verified |
| RPD-03 | getter/setter 반환 계약 | `source:tween-repeat-delay` Returns | verified |
| RPD-04 | "Gets or sets the amount of time in seconds between repeats." | `source:tween-repeat-delay` Details | verified |
| RPD-05 | repeat 2 / repeatDelay 1일 때 재생–1초 대기–재생–1초 대기–마지막 반복 | `source:tween-repeat-delay` Details | verified |
| RPD-06 | vars 초기값 예, 코드 예제, chaining `myTween.repeat(2).yoyo(true).repeatDelay(0.5).play();` | `source:tween-repeat-delay` Details + 코드 블록 | verified |
| YOY-01 | signature `yoyo( value:Boolean ) : [Boolean | self]` | `source:tween-yoyo` signature heading | verified |
| YOY-02 | `value`: Boolean (default = `false`) | `source:tween-yoyo` Parameters | verified |
| YOY-03 | getter/setter 반환 계약 | `source:tween-yoyo` Returns | verified |
| YOY-04 | "true causes the tween to go back and forth, alternating backward and forward on each `repeat`" | `source:tween-yoyo` Details | verified |
| YOY-05 | yoyo는 repeat와 함께 동작하며 yoyo시키려면 repeat를 0이 아닌 값으로 두어야 한다 | `source:tween-yoyo` Details | verified |
| YOY-06 | "Yoyo-ing, has no affect on the tween's `reversed` property." | `source:tween-yoyo` Details | verified |
| YOY-07 | repeat 2 기준 값 흐름 띠 비교 (`start - 1 - 2 - 3 - ...`) | `source:tween-yoyo` Details | verified |
| YOY-08 | vars 초기값 예, 코드 예제, chaining `myAnimation.yoyo(true).repeat(3).timeScale(2).play(0.5);` | `source:tween-yoyo` Details + 코드 블록 | verified |
| ITR-01 | signature `iteration( ) : [Number | self]`, Parameters 절 없음 | `source:tween-iteration` signature heading | verified |
| ITR-02 | getter/setter 반환 계약 | `source:tween-iteration` Returns | verified |
| ITR-03 | "Gets or sets the iteration (on a repeated tween)." | `source:tween-iteration` Details | verified |
| ITR-04 | "iteration is `1` the very first time through, then on the first repeat, the iteration would be `2`, then `3`, etc." | `source:tween-iteration` Details | verified |
| ITR-05 | setter는 해당 iteration으로 이동. repeat 4 / 세 번째 repeat에서 `.iteration(2)`는 두 번째 iteration으로 점프 | `source:tween-iteration` Details | verified |
| ITR-06 | 코드 예제 `var progress = myTween.iteration();` / `myTween.iteration(2);` | `source:tween-iteration` 코드 블록 | verified |
| INV-01 | signature `invalidate( ) : self`, Parameters 절 없음 | `source:tween-invalidate` signature heading | verified |
| INV-02 | 반환값 `self (makes chaining easier)` | `source:tween-invalidate` Returns | verified |
| INV-03 | "Clears any initialization data (like recorded starting/ending values)..." | `source:tween-invalidate` Details | verified |
| INV-04 | "it will be re-initialized the next time it renders and its `vars` object will be re-parsed." | `source:tween-invalidate` Details | verified |
| INV-05 | "The timing of the animation (duration, startTime, delay) will not be affected." | `source:tween-invalidate` Details | verified |
| INV-06 | 공식 예제 전반 — `element.x` 0, `gsap.to(element, {duration: 2, x: "+=100"})`, `restart()`해도 0→100 | `source:tween-invalidate` Details | verified |
| INV-07 | 공식 예제 후반 — invalidate 후 다음 render에서 재파싱해 x가 100→200 | `source:tween-invalidate` Details | verified |
| INV-08 | "When you invalidate a timeline, it automatically invalidates all of its children." | `source:tween-invalidate` Details | verified |
| INV-09 | Note — 반복마다 invalidate하고 싶으면 `repeatRefresh: true` | `source:tween-invalidate` Note callout | verified |

source별 공식 item 수: `repeat` 9, `invalidate` 9, `yoyo` 8, `iteration` 6, `repeat-delay` 6 = **38**.

### sourceBlockers

`none`. 38개 기술 item 전부 2026-08-04에 canonical 원문으로 직접 확인했다. 요약 압축을 막기 위해 각 URL에 **"각 항목을 그대로 인용하고 없으면 NOT PRESENT라고 답하라"** 형식으로 재조회해 signature·Parameters·Returns·Details 문장·코드 예제·callout을 항목별로 확정했다. 첫 조회에서 `invalidate()`와 `repeatDelay()`의 signature가 "NOT PRESENT"로 나왔으나 heading 목록을 요구하는 3차 조회에서 둘 다 실재함을 확인했다.

다음은 다섯 페이지가 **게시하지 않은** 내용이므로 주장하지 않는다.

- `totalDuration` 계산식, `repeat: -1`일 때의 `totalDuration()`·`totalProgress()` 값
- 회차 경계 시각이 앞뒤 어느 회차에 속하는지
- `repeatDelay` 구간 동안 `iteration()`과 대상 값의 상태
- `iteration()` 범위 초과 입력의 처리, setter 인자의 이름·타입·기본값
- 음수 duration, 소수 repeat 같은 잘못된 입력의 처리

### moduleSelection

| module | 목적 | 근거 source |
| --- | --- | --- |
| 개념·가이드 (`CI`) | 회차 계산 모델(`repeat + 1`)과 "값을 한 번 기억한다"는 멘탈 모델을 세운다. | 다섯 source |
| callable method / property catalog (`CM`) | 다섯 메서드의 signature·인자·기본값·반환을 한 표로 대조하고 미게시 칸을 명시한다. | 다섯 source |

`gsap.to()` 속성 카탈로그 형식을 복제하지 않는다. ease visualizer, 설치 모듈, Timeline 모듈을 추가하지 않는다.

### learnerFlow

| id | 학습자 질문 | sourceItemIds |
| --- | --- | --- |
| `flow:count` | repeat 2면 몇 번 재생되나요? | REP-04, REP-05, REP-07 |
| `flow:infinite` | 무한 반복은 어떻게 적나요? | REP-06 |
| `flow:need-more` | 반복만으로 부족하면 무엇을 더 쓰나요? | REP-08, REP-09 |
| `flow:gap` | 회차 사이에 쉬는 시간을 어떻게 넣나요? | RPD-04, RPD-05, RPD-06 |
| `flow:direction` | 되돌아오며 반복하려면? repeat가 0이면 어떻게 되나요? | YOY-04, YOY-05, YOY-07, YOY-08 |
| `flow:reversed-boundary` | 역방향으로 가는 것과 reverse()는 같은 건가요? | YOY-06 |
| `flow:which-iteration` | 지금 몇 회차인지 어떻게 알고, 다른 회차로 어떻게 옮기나요? | ITR-03, ITR-04, ITR-05, ITR-06 |
| `flow:memorized` | 왜 다시 재생해도 같은 자리에서 시작하나요? | INV-03, INV-06 |
| `flow:forget` | 그 기억을 어떻게 지우고 언제 다시 읽나요? | INV-04, INV-07 |
| `flow:untouched` | invalidate가 건드리지 않는 것은? | INV-05, INV-08 |
| `flow:auto-refresh` | 반복마다 자동으로 다시 읽게 하려면? | INV-09 |
| `flow:call-forms` | 이 다섯을 정확히 어떤 형태로 부르나요? | 13개 signature·parameter·return item |

### coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| REP-04, REP-05 | `RepeatCountSection.tsx` 도입 문단 + repeat/총 재생 대조표 | covered |
| REP-06 | `RepeatCountSection.tsx` 대조표 `-1` 행 + 경고 블록 | covered |
| REP-07 | `RepeatCountSection.tsx` "정수만 넣습니다" 경고 블록 | covered |
| REP-08 | `RepeatCountSection.tsx` "repeat 하나로는 부족할 때" 문단 | covered |
| REP-09 | `RepeatCountSection.tsx` vars·getter/setter·chaining 코드 블록 3개 | covered |
| RPD-04 | `RepeatGapSection.tsx` 정의 문단(`delay`와의 구분 포함) | covered |
| RPD-05 | `RepeatGapSection.tsx` 공식 예시를 시간 순서로 펼친 표 | covered |
| RPD-06 | `RepeatGapSection.tsx` vars·getter/setter 코드 블록 | covered |
| YOY-04 | `YoyoDirectionSection.tsx` 정의 문단 | covered |
| YOY-05 | `YoyoDirectionSection.tsx` "repeat가 0이면" 경고 블록 | covered |
| YOY-06 | `YoyoDirectionSection.tsx` "reversed는 다릅니다" note 블록 | covered |
| YOY-07 | `YoyoDirectionSection.tsx` 값 흐름 비교표 + 해설 문단 | covered |
| YOY-08 | `YoyoDirectionSection.tsx` vars·getter/setter 코드 블록 | covered |
| ITR-03, ITR-04 | `IterationNumberSection.tsx` 정의 문단 + "repeat는 0부터, iteration은 1부터" note | covered |
| ITR-05 | `IterationNumberSection.tsx` "다른 회차로 건너뛰기" 문단 | covered |
| ITR-06 | `IterationNumberSection.tsx` 공식 코드 블록 | covered |
| INV-03 | `InvalidateRecomputeSection.tsx` 공식 인용 문단 + 3단계 목록 | covered |
| INV-04 | `InvalidateRecomputeSection.tsx` "다음에 render될 때" 문단 + 3단계 목록 3단계 | covered |
| INV-05 | `InvalidateRecomputeSection.tsx` "시간 설정은 건드리지 않습니다" note | covered |
| INV-06 | `InvalidateRecomputeSection.tsx` 공식 Tween 코드 블록 + 3단계 목록 1·2단계; `InvalidateLab` restart 버튼 | covered |
| INV-07 | `InvalidateRecomputeSection.tsx` 3단계 목록 3단계; `InvalidateLab` invalidate 버튼과 기록 표 | covered |
| INV-08 | `InvalidateRecomputeSection.tsx` "Timeline이면 children까지" note; `BoundariesSection.tsx` 경계 문단 | covered |
| INV-09 | `InvalidateRecomputeSection.tsx` `repeatRefresh` note(소유권을 `gsap-to`로 링크) | covered |
| REP-01·02·03, RPD-01·02·03, YOY-01·02·03, ITR-01·02, INV-01·02 | `CallFormsSection.tsx` 호출 형식 표 5행 + getter/setter 공통 규칙 문단 + `iteration()` signature 불일치 경고 | covered |
| ITR-P1, ITR-P2, ITR-P3 | `IterationNumberSection.tsx` probe 블록 (측정 방법 포함) | covered (probe) |
| YOY-P1 | `YoyoDirectionSection.tsx` probe 블록 (repeat 0 예외 포함) | covered (probe) |
| REP-P1, REP-P2 | `RepeatCountSection.tsx` probe 블록 | covered (probe) |
| RPD-P1 | `RepeatGapSection.tsx` probe 블록 | covered (probe) |
| RPD-P2 | `CallFormsSection.tsx` probe 블록 | covered (probe) |
| INV-P1 | `InvalidateRecomputeSection.tsx` probe 블록 | covered (probe) |

9개 probe item은 공식 item이 아니다. coverage 분모(38)에 포함하지 않으며 `PageCoverage`도 공식 38개와 분리해 센다.

**분모 불변식** — meta 섹션 `sourceItems` 합계(6+3+5+4+7+13+0=38) = catalog `origin: 'official'` 행 수(38) = meta `officialSourceItems`(38). 스크립트로 대조했고 중복 ID는 없다.

### relatedPages

- `gsap-to` — `repeatRefresh` vars의 값 계약과 예제를 소유한다. 이 페이지는 `invalidate()` 문서의 Note가 밝힌 **관계**만 보존하고 링크한다.
- `tween-configuration` — vars·defaults·config의 적용 범위를 소유한다.
- `tween-playhead` — `progress()`·`totalProgress()`의 의미를 소유한다. 두 lab에서 조작 수단으로만 쓴다.
- `tween-start-end-values` — 시작·끝 값을 적는 방법을 소유한다. `"+=100"` 상대값 문법의 소유자다.
- `easing` — ease 곡선의 의미를 소유한다. 두 lab은 관찰을 선형으로 만들기 위해 `ease: 'none'`만 쓴다.
- `timeline-repeats`(미구현) — Timeline의 반복과 invalidate를 소유할 예정이다. 라우팅되지 않았으므로 링크하지 않고 문장으로만 경계를 남겼다.

## 구현 계약

### exactFiles

create:

```text
src/content/gsap/fundamentals/tween-repeats/TweenRepeatsPage.tsx
src/content/gsap/fundamentals/tween-repeats/TweenRepeatsPage.css
src/content/gsap/fundamentals/tween-repeats/tween-repeats.meta.ts
src/content/gsap/fundamentals/tween-repeats/tween-repeats.catalog.ts
src/content/gsap/fundamentals/tween-repeats/components/PageCoverage/PageCoverage.tsx
src/content/gsap/fundamentals/tween-repeats/components/SectionHeading/SectionHeading.tsx
src/content/gsap/fundamentals/tween-repeats/sections/RepeatCountSection/RepeatCountSection.tsx
src/content/gsap/fundamentals/tween-repeats/sections/RepeatGapSection/RepeatGapSection.tsx
src/content/gsap/fundamentals/tween-repeats/sections/YoyoDirectionSection/YoyoDirectionSection.tsx
src/content/gsap/fundamentals/tween-repeats/sections/IterationNumberSection/IterationNumberSection.tsx
src/content/gsap/fundamentals/tween-repeats/sections/InvalidateRecomputeSection/InvalidateRecomputeSection.tsx
src/content/gsap/fundamentals/tween-repeats/sections/CallFormsSection/CallFormsSection.tsx
src/content/gsap/fundamentals/tween-repeats/sections/BoundariesSection/BoundariesSection.tsx
src/content/gsap/fundamentals/tween-repeats/examples/RepeatCycleLab/RepeatCycleLab.tsx
src/content/gsap/fundamentals/tween-repeats/examples/RepeatCycleLab/RepeatCycleLab.css
src/content/gsap/fundamentals/tween-repeats/examples/RepeatCycleLab/useRepeatCycleAnimation.ts
src/content/gsap/fundamentals/tween-repeats/examples/InvalidateLab/InvalidateLab.tsx
src/content/gsap/fundamentals/tween-repeats/examples/InvalidateLab/InvalidateLab.css
src/content/gsap/fundamentals/tween-repeats/examples/InvalidateLab/useInvalidateAnimation.ts
docs/handoffs/gsap/core/tween-repeats.md
```

modify: `none`. `src/app/routes.ts` 등록은 저장소 소유자가 별도로 수행한다.

### exampleContracts

#### `RepeatCycleLab`

- goal: 상자 하나가 `repeat`·`repeatDelay`·`yoyo`로 만들어진 전체 시간표 위를 지나가는 동안, 회차 번호가 언제 넘어가고 값이 언제 멈추는지 관찰한다.
- question: 전체 시간 위에서 헤드를 옮기면 지금 몇 회차이고 값은 어디에 있나요?
- representation: 트랙 위 상자 + 회차/틈 칸으로 나뉜 시간표 띠 + 숫자 관찰 패널
- controls: `totalProgress` range(0–1), `repeat` range(0–3), `repeatDelay` range(0–1, 0.25 단위), `yoyo` checkbox
- runtimeSource: `useRepeatCycleAnimation.ts`
- sourcePath: `examples/RepeatCycleLab/useRepeatCycleAnimation.ts`
- runtimeOwnership: hook이 selector·거리·고정 duration·repeat·repeatDelay·yoyo·totalProgress를 담은 단일 descriptor, paused Tween 하나, 실제 `totalDuration()`을 분모로 만든 회차/틈 블록 목록, Tween이 직접 보고한 `iteration()`·`time()`·`totalTime()`·`progress()`·`duration()`·`totalDuration()`과 상자의 x를 소유한다. scoped `useGSAP` 한 개, `revertOnUpdate: true`.
- displayOwnership: TSX가 descriptor를 코드 문법으로만 직렬화하고 controls·시간표 띠·관찰 패널·학습 문단을 그린다. 보간이나 시간 계산을 다시 하지 않는다.
- coveredSourceItemIds: 관찰 근거로 REP-04·REP-05, RPD-05, YOY-04, ITR-03·ITR-04를 보강한다(섹션이 1차 근거).
- accessibility: native labeled range/checkbox, slider 값은 연결된 `<output>`, 연속 변화하는 관찰값은 live region이 아닌 정적 `<dl>`(스크러빙마다 스크린리더가 낭독되는 것을 막는다), 시간표 띠는 `aria-label`을 가진 `<ol>`이고 playhead는 형제 `div` + `aria-hidden`, 현재 회차는 색과 굵은 테두리로 함께 표시, 작은 화면에서 1열 전환.
- motion: 자동 재생 없음. 상자 위치는 사용자가 옮긴 헤드의 결과로만 바뀐다. `useReducedMotion()`이 root에 `--static`을 붙여 회차 칸의 색 전환과 playhead의 `left` 전환만 끈다.

#### `InvalidateLab`

- goal: 목적지가 `"+=120"`인 Tween 하나를 여러 번 다시 재생하면서, `invalidate()`를 끼웠을 때만 시작값이 현재 위치로 다시 읽히는 것을 기록 표로 확인한다.
- question: 같은 Tween을 다시 재생하면 어떤 시작값을 쓰나요?
- representation: 트랙 위 상자 + 실행마다 한 행이 쌓이는 기록 표
- controls: `restart()만` 버튼, `invalidate() 후 restart()` 버튼, `처음으로 되돌리기` 버튼
- runtimeSource: `useInvalidateAnimation.ts`
- sourcePath: `examples/InvalidateLab/useInvalidateAnimation.ts`
- runtimeOwnership: hook이 selector·상대 목적지 문자열·고정 duration·모션 설정을 담은 descriptor, 여러 번 재사용되는 paused Tween 하나, 실행 기록 배열, 상태 문구, 되돌리기 key를 소유한다. 실행마다 `progress(0)`/`progress(1)`로 렌더해 **실제로 쓰인** 시작·끝 값을 읽는다. scoped `useGSAP` 한 개, `revertOnUpdate: true`.
- displayOwnership: TSX가 descriptor와 실행 기록을 표와 코드 문법으로만 포맷한다. 시작·끝 값을 계산하지 않는다.
- coveredSourceItemIds: INV-06, INV-07
- accessibility: native button 3개, 상태는 polite live region(`role="status"`) 하나 — 버튼 조작은 이산 이벤트라 낭독이 적절하다. 기록 표에 caption·header, 빈 상태 안내 행, 작은 화면에서 1열 전환.
- motion: `useReducedMotion()`이 켜지면 `restart()` 재생 대신 헤드를 `progress(1)`에 둬 이동 없이 최종 상태만 보여준다. 기록 표의 숫자는 두 모드에서 동일하다.

### nonGoals

- Timeline의 반복·invalidate를 다루지 않는다. `Tween.invalidate()`가 밝힌 children 전파 관계만 보존한다.
- `repeatRefresh`의 값 계약·예제를 다시 소유하지 않는다. 관계 문장과 `gsap-to` 링크로 끝낸다.
- `progress()`·`totalProgress()`·`reverse()`의 의미를 이 페이지에서 정의하지 않는다.
- 자동 무한 반복 재생을 예제에 넣지 않는다. `repeat: -1`은 섹션 텍스트와 probe로만 다룬다.
- 두 lab을 공용 generic runtime hook으로 합치지 않는다.

### preserve

- `src/app/routes.ts` — 수정하지 않았다.
- `src/components/` 공용 컴포넌트(`OfficialDocsLink`, `useReducedMotion`) — 변경 없음.
- 다른 페이지 폴더 — 변경 없음.
- `master-page-inventory.md`의 소유권 행.

## 검증 계약

### verifiedPerspectives

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion, Build/Integration, Cross-page Consistency — 모두 구현 컨텍스트가 직접 판정했다(`docs/workflows/quality-gates.md`: 독립 검수자를 두지 않는다).

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-CORE16-001 | PASS | 2026-08-04에 다섯 canonical을 직접 조회해 38개 item을 확인했다. 요약 압축을 막기 위해 "각 줄을 그대로 인용하고 없으면 NOT PRESENT"로 재조회했다. | blocker 없이 구현 가능 | 미게시 칸은 `공식 페이지에 명시 없음`으로 표시 |
| SRC-CORE16-002 | ADDRESSED | 1차 조회에서 `invalidate()`·`repeatDelay()`의 signature가 "NOT PRESENT"로 반환됐다. heading 목록을 요구하는 3차 조회에서 `invalidate( ) : self`와 `repeatDelay( value:Number ) : [Number | self]`가 실재함을 확인했다. | 존재하는 공식 item을 누락할 뻔했다 | 두 item을 `call-forms`에 편입 |
| SRC-CORE16-003 | PASS | `repeat()` 페이지에 `repeatRefresh`가 없음을 명시 질의로 확인했다. `repeatRefresh` 언급은 `invalidate()` 페이지의 Note 하나뿐이다. | source별 귀속을 섞지 않았다 | INV-09로만 기록 |
| OC-CORE16-001 | PASS | 공식 38/38 item이 `coverageMap`에서 파일 근거로 연결됐다. 스크립트로 meta 섹션 합계(38) = catalog official 행 수(38) = `officialSourceItems`(38)와 섹션별 분포 일치, 중복 ID 없음을 대조했다. | Official Coverage 통과 | none |
| LT-CORE16-001 | PASS | `invalidate()`를 번역하지 않고 "기억한다 → 다시 써 버린다 → 지운다" 3단계 목록과 실행 기록 표로 재구성했다. `repeat`는 대조표로, `yoyo`는 공식 값 흐름 띠의 `3-3`·`1-1` 해설로, `iteration`은 "repeat는 0부터, iteration은 1부터" 대비로 세웠다. | Learning Transformation 통과 | none |
| PROBE-CORE16-001 | PASS | 9개 probe item 전부 측정 방법·재현 조건을 페이지 본문에 함께 적었다. 단정 주장은 조합 전수로 예외를 확인했다(아래 verificationEvidence). | 재현 불가능한 숫자 없음 | none |
| RDS-CORE16-001 | PASS | 두 lab 모두 hook의 descriptor에서 GSAP 호출과 표시 코드가 함께 파생된다. 시간표 칸의 폭은 실제 `tween.totalDuration()`을 분모로 쓴다. TSX 어느 파일도 `gsap`/`@gsap/react`를 import하지 않음을 grep으로 확인했다. | Runtime/Display Sync 통과 | none |
| DESIGN-CORE16-001 | ADDRESSED | `InvalidateLab`의 초기 설계가 `onStart`/`onComplete`로 시작·끝 값을 잡고 reduced-motion에서 `duration: 0`을 쓰려 했다. probe 결과 `duration: 0`에서는 `onStart`가 아예 발화하지 않고 2회차부터 `onComplete`도 발화하지 않았다. | 모션 감소 설정에서 기록 표가 비었을 것 | 콜백 대신 `progress(0)`/`progress(1)` 동기 판독으로 바꾸고, reduced-motion은 `duration: 0`이 아니라 헤드를 `progress(1)`로 옮기는 방식으로 교체 |
| A11Y-CORE16-001 | ADDRESSED | `RepeatCycleLab`의 관찰 패널이 `<output>`(암시적 `role="status"`)이었고 상태 문단에 `role="status"`가 붙어 있었다. slider 스크러빙마다 live region이 발화해 스크린리더를 뒤덮는 구조였다. | 연속 조작 예제의 접근성 결함 | 연속 변화 값은 정적 `<dl>`로 바꾸고 live region 제거. 이산 버튼인 `InvalidateLab`에는 `role="status"` 유지 |
| A11Y-CORE16-002 | ADDRESSED | 시간표의 playhead가 `<ol>` 안의 `<li>`였다. 목록 항목이 아닌 장식이므로 형제 `div` + `aria-hidden`으로 분리하고 `<ol>`은 회차/틈 칸만 담게 했다. | 목록 시맨틱 오염 | none |
| MOTION-CORE16-001 | ADDRESSED | `RepeatCycleLab`의 reduced-motion 클래스가 전환이 정의되지 않은 상자에 붙어 아무 효과가 없었다. 회차 칸 색 전환과 playhead `left` 전환을 실제로 정의하고 root `--static`이 그 둘을 끄도록 바꿨다. | 형식적 reduced-motion 처리 | none |
| STRUCT-CORE16-001 | PASS | 페이지 TSX는 조립만, 섹션은 학습 단위, 두 예제는 각자 hook을 소유한다. hook에 제목·설명·속성 표가 없고 TSX에 GSAP 생명주기가 없다. 파일 19개 전부 목록과 일치하며 import한 CSS 3개가 모두 존재한다. | Structure/Comment 통과 | none |
| BUILD-CORE16-001 | PASS | `npx tsc --noEmit`에서 `tween-repeats` 경로 오류 0건(grep으로 확인). 저장소 전체 20건은 동시에 작업 중인 다른 페이지(`find-stop-animations`, `gsap-context`, `high-frequency-updates`, `tween-playback-controls`, `tween-timing-math`)의 것으로 이 페이지와 무관하다. | Build 통과 | `npm run build`/`build-storybook`은 지시에 따라 실행하지 않음 |
| XPAGE-CORE16-001 | PASS | `repeatRefresh`·`progress()`·상대값 문법·ease를 이 페이지가 소유하지 않고 각 owner로 링크했다. 링크는 `routes.ts`에 등록된 경로만 사용했고 미구현 `timeline-repeats`는 문장으로만 경계를 남겼다. | Cross-page Consistency 통과 | none |
| A11Y-CORE16-003 | DEFERRED → PASS | 키보드 이동·포커스 표시, `prefers-reduced-motion` 실제 전환, 320/390px 실제 레이아웃, 두 lab control의 실제 조작 결과 | 소유자 일괄 브라우저 검수 대상 | 전체 페이지 완성 후 일괄 확인 |

### verificationEvidence

- **공식 원문 대조** — 2026-08-04, 다섯 canonical URL 직접 조회. 항목별 인용/`NOT PRESENT` 강제 질의로 signature·Parameters·Returns·Details 문장·코드 예제·callout을 확정. heading 목록 질의로 signature 존재를 교차 확인.
- **runtime probe** — GSAP 3.15.0(`node_modules/gsap` 3.15.0)을 node로 직접 실행. 단정 주장은 조합 전수로 예외를 확인했다.
  - `iteration()` 1-base: repeat `0·1·2·-1` × yoyo `false·true` × repeatDelay `0·0.5`의 16조합 + `duration: 0` + `gsap.set()` → `totalTime` 0에서 **전부 1**, 0인 경우 없음.
  - 회차 경계: `duration:1, repeat:2`에서 `totalTime` `[0,0.5,0.9999,1,1.0001,1.5,2,2.0001,2.5,2.9999,3]` → iteration `[1,1,1,1,2,2,2,3,3,3,3]`. 경계는 **끝난 회차**에 속하고 마지막 끝에서도 증가하지 않음.
  - yoyo 방향: `ease:'none'`으로 각 회차 25% 지점 값 판독. repeat 1~4 전부 홀수 회차 0.25(정방향)/짝수 회차 0.75(역방향), `repeatDelay:0.5`를 넣어도 동일. **예외** — `repeat:0`에 `yoyo:true`를 넘기면 `yoyo()`가 `false`를 반환.
  - `repeat:-1`: duration `0.5·1·2·5` × repeatDelay `0·1`의 8조합에서 `totalDuration()`이 **전부 `10000000000`**, `Infinity` 아님. `duration()`은 지정값 유지.
  - `totalDuration` 공식: duration `0.5·1·2` × repeat `0~3` × repeatDelay `0·0.25·1`의 36조합에서 `duration × (repeat+1) + repeatDelay × repeat`와 **불일치 0건**.
  - `repeatDelay` 틈: `duration:1, repeat:2, repeatDelay:0.5`에서 `totalTime` 1.0~1.5 내내 iteration 1·값 1로 고정, 1.75에서 iteration 2·값 0.25.
  - getter 기본값: 옵션 없는 tween에서 `[repeat(), repeatDelay(), yoyo(), iteration()]` = `[0, 0, false, 1]`. `repeatDelay()`는 **number 0**이고 `Number.isNaN()`은 `false`(공식 표는 `NaN`).
  - `iteration()` setter: `repeat:4`에서 `totalTime(2.5)` → `iteration(2)` → `totalTime` 1.5(회차 내 위치 유지). `iteration(99)` → `totalTime` 5로 클램프. setter는 self 반환.
  - `invalidate()`: 상대값 `"+=100"` 1회 재생 후 `restart()`만 하면 0→100 반복, `invalidate()` 후에는 100→200. timing `[duration, delay, startTime]`이 `[2, 0.5, -2]`로 전후 동일. `repeat:2,yoyo:true,repeatDelay:0.5`의 `[repeat, yoyo, repeatDelay, totalDuration]`이 `[2,true,0.5,4]`로 전후 동일. 절대값 `x:100` tween을 끝낸 뒤 값을 500으로 바꾸고 `invalidate()`하면 `progress` 0/0.5/1에서 `500/300/100`. 첫 render 전 `invalidate()`는 효과 없음.
  - `repeatRefresh` 대조: `x:'+=10', repeat:2`에서 `false`는 `totalTime` `[0,0.5,1.5,2.5,3]` → `[0,5,5,5,10]`, `true`는 `[0,5,15,25,30]`.
  - 설계 검증: `duration:0`에서는 `onStart`가 발화하지 않고 2회차 이후 `onComplete`도 발화하지 않음(`InvalidateLab` 설계 변경 근거).
- **타입 검사** — `npx tsc --noEmit`, `tween-repeats` 경로 오류 0건.
- **불변식 대조** — meta 섹션 합계 38 = catalog official 38 = `officialSourceItems` 38, 섹션별 분포 일치, 중복 ID 0건.

### releaseDecision

`PASS` — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

라우트 등록(`src/app/routes.ts`)은 이 작업의 범위 밖이며 저장소 소유자가 수행한다. 등록 전까지 페이지는 앱에서 접근되지 않는다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
