# Timeline playhead handoff

## 입력 계약

### objective

Timeline의 playhead를 비율·초와 local·total 좌표로 읽고 즉시 옮기는 setter와, label 사이를 부드럽게 이동하는 control Tween의 사용자 경험·반환값·생명주기를 구분하게 한다.

### officialPage

- title: `progress()` + `time()` + `totalProgress()` + `totalTime()` + `tweenFromTo()` + `tweenTo()`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/Timeline/progress()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/time()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/totalProgress()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/totalTime()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/tweenFromTo()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/tweenTo()`
- reviewedAt: `2026-08-08`
- category: `Fundamentals > Timeline`
- slug: `timeline-playhead`
- sourcePageIds: primary `source:timeline-progress`; related `source:timeline-time`, `source:timeline-total-progress`, `source:timeline-total-time`, `source:timeline-tween-from-to`, `source:timeline-tween-to`
- sourceRevision: 6개 모두 `1`

### localPage

- localPath: `src/content/gsap/fundamentals/timeline-playhead/`
- route: `/fundamentals/timeline-playhead`
- route registration: `src/app/routes.ts` — Timeline group의 playback controls 다음에 lazy page와 lesson 등록

### sourceManifest

`timeline-playhead.catalog.ts`의 60개 `origin:'official'` 행과 아래 manifest를 ID·문장 단위로 동기화한다.

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| `PR-01` | signature는 `progress(value:Number, suppressEvents:Boolean) : [Number \| self]`다. | `Timeline.progress()` signature | verified |
| `PR-02` | value는 Number, 기본값 NaN이며 생략하면 getter, 제공하면 setter가 되어 self를 반환한다. | `Timeline.progress()` Parameters > value | verified |
| `PR-03` | suppressEvents는 Boolean, 기본값 false이며 true면 새 위치로 이동하는 동안 event와 callback을 실행하지 않는다. | `Timeline.progress()` Parameters > suppressEvents | verified |
| `PR-04` | progress는 repeat를 제외한 가상 playhead 위치를 0~1로 나타내며 0은 시작, 0.5는 절반, 1은 완료다. | `Timeline.progress()` summary·Details | verified |
| `PR-05` | repeat가 있으면 progress는 repeat와 repeatDelay를 포함하지 않아 totalProgress와 달라진다. | `Timeline.progress()` Details | verified |
| `PR-06` | repeat 1이면 첫 cycle 끝의 progress는 1, totalProgress는 0.5이며 progress는 전체 동안 0→1을 두 번 돈다. | `Timeline.progress()` Details repeat example | verified |
| `PR-07` | setter는 self를 반환해 `tl.progress(0.5).play()`처럼 chaining할 수 있다. | `Timeline.progress()` Returns·Details | verified |
| `PR-08` | 공식 예제는 `progress()` getter와 `progress(0.25)` setter를 보여 준다. | `Timeline.progress()` code block | verified |
| `TM-01` | signature는 `time(value:Number, suppressEvents:Boolean) : [Number \| self]`다. | `Timeline.time()` signature | verified |
| `TM-02` | time은 repeat와 repeatDelay를 제외한 local playhead 위치를 초로 가져오거나 설정한다. | `Timeline.time()` summary·Details | verified |
| `TM-03` | value는 Number, 기본값 NaN이며 생략은 getter, 제공은 self를 돌려주는 setter이고 음수는 animation 끝 기준이다. | `Timeline.time()` Parameters > value | verified |
| `TM-04` | suppressEvents는 Boolean, 기본값 false이며 true면 이동 구간 event와 callback을 실행하지 않는다. | `Timeline.time()` Parameters > suppressEvents | verified |
| `TM-05` | getter는 Number, setter는 chaining 가능한 self를 반환한다. | `Timeline.time()` Returns | verified |
| `TM-06` | repeat가 있으면 time은 0으로 돌아가지만 totalTime은 계속 증가하며 yoyo에서는 local time 방향이 번갈아 바뀐다. | `Timeline.time()` Details repeat·yoyo | verified |
| `TM-07` | time은 duration을 넘지 않지만 totalTime은 repeat와 repeatDelay를 포함한 전체 시간을 반영한다. | `Timeline.time()` Details | verified |
| `TM-08` | duration 2, repeat 3인 Timeline은 totalTime 0~8 동안 time 0~2를 네 번 돈다. | `Timeline.time()` Details example | verified |
| `TM-09` | 공식 예제는 `time()` getter와 seek처럼 즉시 점프하는 `time(2)` setter를 보여 주며 코드 뒤에 불필요한 마침표가 있다. | `Timeline.time()` code block | verified |
| `TGP-01` | signature는 `totalProgress(value:Number, suppressEvents:Boolean) : [Number \| self]`다. | `Timeline.totalProgress()` signature | verified |
| `TGP-02` | totalProgress는 repeat와 repeatDelay를 포함한 전체 playhead 위치를 0~1로 나타낸다. | `Timeline.totalProgress()` summary·Details | verified |
| `TGP-03` | value는 Number, 기본값 NaN이며 생략은 getter, 제공은 self를 반환하는 setter다. | `Timeline.totalProgress()` Parameters > value | verified |
| `TGP-04` | Parameters 표는 suppressEvents 기본값을 true라고 적고 true면 이동 구간 event와 callback을 억제한다고 설명한다. | `Timeline.totalProgress()` Parameters > suppressEvents | verified |
| `TGP-05` | getter는 Number, setter는 chaining 가능한 self를 반환한다. | `Timeline.totalProgress()` Returns | verified |
| `TGP-06` | repeat가 있으면 progress는 현재 cycle만, totalProgress는 전체 repeat 구간을 한 번의 0~1로 읽는다. | `Timeline.totalProgress()` Details | verified |
| `TGP-07` | repeat 1이면 첫 cycle 끝의 totalProgress는 0.5이고 progress는 1이다. | `Timeline.totalProgress()` Details example | verified |
| `TGP-08` | 공식 예제는 `totalProgress()` getter와 `totalProgress(0.25)` setter, `totalProgress(0.5).play()` chaining을 보여 준다. | `Timeline.totalProgress()` code block | verified |
| `TT-01` | signature는 `totalTime(time:Number, suppressEvents:Boolean) : [Number \| self]`다. | `Timeline.totalTime()` signature | verified |
| `TT-02` | totalTime은 repeat와 repeatDelay를 포함하는 totalDuration 기준 playhead 위치다. | `Timeline.totalTime()` summary·Details | verified |
| `TT-03` | time은 Number, 기본값 NaN이며 생략은 getter, 제공은 self를 반환하는 setter이고 음수는 전체 끝 기준이다. | `Timeline.totalTime()` Parameters > time | verified |
| `TT-04` | suppressEvents는 Boolean, 기본값 false이며 true면 이동 구간 event와 callback을 실행하지 않는다. | `Timeline.totalTime()` Parameters > suppressEvents | verified |
| `TT-05` | getter는 Number, setter는 chaining 가능한 self를 반환한다. | `Timeline.totalTime()` Returns | verified |
| `TT-06` | 공식 Timeline 문서는 duration 2, repeat 3 예제 대상을 “tween”이라고 부르며 totalTime 0~8과 time 0~2 네 번을 설명한다. | `Timeline.totalTime()` Details first example | verified |
| `TT-07` | 위 예제에 repeatDelay 1을 더하면 totalTime 범위는 0~11이다. | `Timeline.totalTime()` Details repeatDelay example | verified |
| `TT-08` | totalTime은 0보다 작거나 totalDuration보다 클 수 없고 범위 밖 값은 잘린다. | `Timeline.totalTime()` Details clamp note | verified |
| `TT-09` | 음수 totalTime은 전체 끝 기준이며 totalDuration 6에서 `totalTime(-2)`는 4로 이동한다. | `Timeline.totalTime()` Parameters·Details negative example | verified |
| `TT-10` | 공식 예제는 `totalTime()` getter와 seek처럼 즉시 점프하는 `totalTime(2)` setter를 보여 주며 코드 뒤에 불필요한 마침표가 있다. | `Timeline.totalTime()` code block | verified |
| `FT-01` | signature는 `tweenFromTo(fromPosition:[Number \| Label], toPosition:[Number \| Label], vars:Object) : Tween`이다. | `Timeline.tweenFromTo()` signature | verified |
| `FT-02` | 특정 time 또는 label부터 다른 time 또는 label까지 playhead를 선형으로 scrub하고 멈추는 Tween을 만든다. | `Timeline.tweenFromTo()` summary·Details | verified |
| `FT-03` | fromPosition은 Timeline이 출발할 초 숫자 또는 label이다. | `Timeline.tweenFromTo()` Parameters > fromPosition | verified |
| `FT-04` | toPosition은 Timeline이 도착할 초 숫자 또는 label이다. | `Timeline.tweenFromTo()` Parameters > toPosition | verified |
| `FT-05` | vars는 Object, 기본값 null이며 onComplete, ease, delay 등 Tween special property를 control Tween에 전달한다. | `Timeline.tweenFromTo()` Parameters > vars | verified |
| `FT-06` | 원하는 time 또는 label 사이를 제어하는 Tween instance를 반환한다. | `Timeline.tweenFromTo()` Returns | verified |
| `FT-07` | 여러 control Tween을 이어 붙일 때 시작·끝이 명시되어 duration이 즉시 정해지므로 tweenTo보다 적합하다. | `Timeline.tweenFromTo()` Details sequencing note | verified |
| `FT-08` | 공식 첫 예제는 master Timeline에 myLabel1→myLabel2와 myLabel2→0 control Tween을 차례로 add한다. | `Timeline.tweenFromTo()` first code block | verified |
| `FT-09` | 공식 advanced 예제는 0→5초 이동에 onComplete, onCompleteParams:[tl], ease:"strong"을 전달한다. | `Timeline.tweenFromTo()` advanced code block | verified |
| `FT-10` | control Tween은 Timeline의 time()을 tween하며 참조를 저장해 언제든 kill()할 수 있다. | `Timeline.tweenFromTo()` Details lifecycle note | verified |
| `FT-11` | 현재보다 앞선 from/to 구간이어도 Timeline의 reversed property는 바뀌지 않는다. | `Timeline.tweenFromTo()` Details reversed note | verified |
| `FT-12` | Timeline은 이동 전에 즉시 pause되고 완료 뒤 자동 resume되지 않으며 필요하면 onComplete에서 resume()한다. | `Timeline.tweenFromTo()` Details pause·resume note | verified |
| `FT-13` | 공식 문서는 모든 from 계열처럼 immediateRender 기본값이 true라 즉시 from 위치로 점프하며 false로 끌 수 있다고 적는다. | `Timeline.tweenFromTo()` Details immediateRender note | verified |
| `FT-14` | 공식 예제는 `immediateRender:false`를 넣은 `tweenFromTo(1, 5, ...)` 호출을 제시한다. | `Timeline.tweenFromTo()` immediateRender code block | verified |
| `TO-01` | signature는 `tweenTo(position:[Number \| Label], vars:Object) : Tween`이다. | `Timeline.tweenTo()` signature | verified |
| `TO-02` | 특정 time 또는 label까지 playhead를 선형으로 scrub하고 멈추는 Tween을 만든다. | `Timeline.tweenTo()` summary·Details | verified |
| `TO-03` | position은 도착할 초 숫자 또는 label이다. | `Timeline.tweenTo()` Parameters > position | verified |
| `TO-04` | vars는 Object, 기본값 null이며 onComplete, ease, delay 등 Tween special property를 control Tween에 전달한다. | `Timeline.tweenTo()` Parameters > vars | verified |
| `TO-05` | 원하는 time 또는 label 사이를 제어하는 Tween instance를 반환한다. | `Timeline.tweenTo()` Returns | verified |
| `TO-06` | 공식 첫 예제는 `tl.tweenTo("myLabel2")`로 label까지 이동한다. | `Timeline.tweenTo()` first code block | verified |
| `TO-07` | 공식 advanced 예제는 5초까지 이동하며 onComplete, onCompleteParams:[tl], ease:"strong"을 전달한다. | `Timeline.tweenTo()` advanced code block | verified |
| `TO-08` | control Tween은 Timeline을 pause하고 time()을 tween하며 참조를 저장해 언제든 kill()할 수 있다. | `Timeline.tweenTo()` Details lifecycle note | verified |
| `TO-09` | 앞선 위치로 이동해 겉으로 역방향이어도 Timeline의 reversed 상태는 true로 바뀌지 않는다. | `Timeline.tweenTo()` Details reversed note | verified |
| `TO-10` | Timeline은 이동 전에 즉시 pause되고 완료 뒤 자동 resume되지 않으며 필요하면 onComplete에서 resume()한다. | `Timeline.tweenTo()` Details pause·resume note | verified |
| `TO-11` | control Tween 여러 개를 순서대로 배치할 때는 시작과 끝을 명시해 duration을 즉시 정확히 정하는 tweenFromTo가 보통 낫다. | `Timeline.tweenTo()` Details sequencing note | verified |

공식 60개와 별도로 설치본 실행만 근거로 삼는 4개는 `origin:'implementation'`으로 분리했다.

| id | implementation item | evidence |
| --- | --- | --- |
| `TLPH-P1` | `totalProgress()`의 두 번째 인자 생략은 GSAP 3.15.0에서 false와 같은 callback 실행 결과이고 true만 억제했다. | 새 duration 2/repeat 1 Timeline별 onStart/onComplete log |
| `TLPH-P2` | tweenFromTo vars 생략·빈 객체는 반환 직후 기존 time을 유지했고 explicit true만 from으로 동기 이동했다. | 0.25초 Timeline, 1→2 control Tween, 반환 직후 time 측정 |
| `TLPH-P3` | time 0.25에서 1초 label로 만든 tweenTo는 duration 0.75, ease none이었고 완료 뒤 Timeline을 paused로 남겼다. | 0.25초에서 middle 1초로 이동 |
| `TLPH-P4` | 새 navigation 전에 이전 반환 Tween을 kill하면 같은 playhead에 control Tween 둘이 남지 않는다. | 두 실행 hook 모두 `controlTweenRef.current?.kill()` 뒤 생성 |

원문은 Docusaurus 렌더링 본문의 heading·signature·Parameters·Returns·Details·code를 추출해 확인했고, raw HTML을 2회 내려받아 아래 SHA-256이 두 번 동일함을 확인했다.

| source | raw SHA-256 |
| --- | --- |
| progress | `48b896dcb829f844749cdfaf266aeda2de4b34e51012078fa9c0731d42d9ba42` |
| time | `5ae7c91d0ea53ba474ceb2e9435166fb1e05d8b18d7249312c74af17bbc5c926` |
| totalProgress | `b48612b87997f58cdbf1692eb763a36cfabcf0f48be4ebe511a97fc3e3fc8e19` |
| totalTime | `f4808980487b5d3cd6460f0848e47859c7043e8d7ca256e65484c22c6ccf0f8f` |
| tweenFromTo | `dc4348659d26115e91c5c282e996501611c56dcebfce3fe3d7ccb1d590f20ef3` |
| tweenTo | `13813e5fcb2d691d77af34825b6157d3c02872f6bf719d8cc8cff42d99c7f3cb` |

### sourceBlockers

`none` — 6 canonical, official item 60개를 모두 verified로 고정했다.

### moduleSelection

- `CM + CI` — 네 getter/setter signature·인자·반환값·호출 시점, Timeline playhead coordinate guide, 반환 control Tween 생명주기
- property catalog 복제 없음 — 이 페이지가 소유한 여섯 callable method만 item-level catalog로 보존

### learnerFlow

1. `#playhead-coordinates`: 비율/초와 local/total 두 축, repeat·repeatDelay·yoyo·clamp
2. `#direct-setters`: getter/setter overload, self, suppressEvents, 즉시 scrub
3. `#navigation-tween`: 같은 label 목적지의 time/progress 점프와 tweenTo 이동
4. `#range-tween`: from/to range, 즉시 duration, control Tween sequencing
5. `#official-differences`: totalProgress suppressEvents와 tweenFromTo immediateRender의 공식/실행 차이
6. `#boundaries`: 반환 Tween kill/resume, 인접 owner, reduced-motion

### coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| `PR-01` | `DirectSettersSection.tsx` signatures의 `progress(...)` | covered |
| `PR-02` | `DirectSettersSection.tsx` getter/setter·NaN 설명 | covered |
| `PR-03` | `DirectSettersSection.tsx` suppressEvents 설명 | covered |
| `PR-04` | `PlayheadCoordinatesSection.tsx` 좌표 표, `CoordinateScrubLab` progress snapshot | covered |
| `PR-05` | `PlayheadCoordinatesSection.tsx` local/repeat 설명 | covered |
| `PR-06` | `CoordinateScrubLab` repeat 1 descriptor와 progress·totalProgress snapshot | covered |
| `PR-07` | `DirectSettersSection.tsx` `tl.progress(0.5).play()` chaining 설명 | covered |
| `PR-08` | `DirectSettersSection.tsx` officialCalls progress getter/setter | covered |
| `TM-01` | `DirectSettersSection.tsx` signatures의 `time(...)` | covered |
| `TM-02` | `PlayheadCoordinatesSection.tsx` 좌표 표의 local 초 | covered |
| `TM-03` | `DirectSettersSection.tsx` getter/setter·NaN 설명, `PlayheadCoordinatesSection.tsx` 음수 note | covered |
| `TM-04` | `DirectSettersSection.tsx` suppressEvents 설명 | covered |
| `TM-05` | `DirectSettersSection.tsx` Number/self·chaining 설명 | covered |
| `TM-06` | `PlayheadCoordinatesSection.tsx` repeat·yoyo 설명 | covered |
| `TM-07` | `PlayheadCoordinatesSection.tsx` local/total 범위 설명 | covered |
| `TM-08` | `PlayheadCoordinatesSection.tsx` duration 2·repeat 3 예제 | covered |
| `TM-09` | `DirectSettersSection.tsx` officialCalls와 마침표 warning | covered |
| `TGP-01` | `DirectSettersSection.tsx` signatures의 `totalProgress(...)` | covered |
| `TGP-02` | `PlayheadCoordinatesSection.tsx` 좌표 표의 전체 비율 | covered |
| `TGP-03` | `DirectSettersSection.tsx` getter/setter·NaN 설명 | covered |
| `TGP-04` | `OfficialDifferencesSection.tsx` 공식 suppressEvents default true 블록 | covered |
| `TGP-05` | `DirectSettersSection.tsx` Number/self·chaining 설명 | covered |
| `TGP-06` | `PlayheadCoordinatesSection.tsx` local/total 설명, `CoordinateScrubLab` 비교 snapshot | covered |
| `TGP-07` | `CoordinateScrubLab` repeat 1 descriptor와 progress·totalProgress snapshot | covered |
| `TGP-08` | `DirectSettersSection.tsx` officialCalls totalProgress getter/setter와 chaining 설명 | covered |
| `TT-01` | `DirectSettersSection.tsx` signatures의 `totalTime(...)` | covered |
| `TT-02` | `PlayheadCoordinatesSection.tsx` 좌표 표의 전체 초 | covered |
| `TT-03` | `DirectSettersSection.tsx` getter/setter·NaN 설명, `PlayheadCoordinatesSection.tsx` 음수 note | covered |
| `TT-04` | `DirectSettersSection.tsx` suppressEvents 설명 | covered |
| `TT-05` | `DirectSettersSection.tsx` Number/self·chaining 설명 | covered |
| `TT-06` | `timeline-playhead.catalog.ts`의 “tween” 원문 보존, `PlayheadCoordinatesSection.tsx` 0~8 예제 | covered |
| `TT-07` | `PlayheadCoordinatesSection.tsx` repeatDelay 포함 0~11 예제 | covered |
| `TT-08` | `PlayheadCoordinatesSection.tsx` 0~totalDuration clamp note | covered |
| `TT-09` | `PlayheadCoordinatesSection.tsx` `totalTime(-2) → 4` note | covered |
| `TT-10` | `DirectSettersSection.tsx` officialCalls와 마침표 warning | covered |
| `FT-01` | `RangeTweenSection.tsx` officialCode signature | covered |
| `FT-02` | `RangeTweenSection.tsx` 설명, `FromToRangeLab` range 실행 | covered |
| `FT-03` | `RangeTweenSection.tsx` fromPosition 설명, `FromToRangeLab` from control | covered |
| `FT-04` | `RangeTweenSection.tsx` toPosition 설명, `FromToRangeLab` to control | covered |
| `FT-05` | `RangeTweenSection.tsx` vars·special property 설명 | covered |
| `FT-06` | `RangeTweenSection.tsx` 반환 control Tween 설명 | covered |
| `FT-07` | `RangeTweenSection.tsx` range sequence note | covered |
| `FT-08` | `RangeTweenSection.tsx` master Timeline officialCode | covered |
| `FT-09` | `RangeTweenSection.tsx` 0→5 advanced officialCode | covered |
| `FT-10` | `RangeTweenSection.tsx` control Tween kill 설명, `useFromToRangeAnimation.ts` controlTweenRef | covered |
| `FT-11` | `RangeTweenSection.tsx` reversed property 설명 | covered |
| `FT-12` | `RangeTweenSection.tsx` pause·자동 resume 없음 설명 | covered |
| `FT-13` | `OfficialDifferencesSection.tsx` 공식 immediateRender true 블록 | covered |
| `FT-14` | `FromToRangeLab` immediateRender false control·serializer, `timeline-playhead.catalog.ts` 공식 호출 보존 | covered |
| `TO-01` | `NavigationTweenSection.tsx` officialCode signature | covered |
| `TO-02` | `NavigationTweenSection.tsx` 설명, `NavigationModeLab` tweenTo 실행 | covered |
| `TO-03` | `NavigationTweenSection.tsx` position 설명, `NavigationModeLab` label destination | covered |
| `TO-04` | `NavigationTweenSection.tsx` vars·special property 설명 | covered |
| `TO-05` | `NavigationTweenSection.tsx` 반환 control Tween 설명 | covered |
| `TO-06` | `NavigationTweenSection.tsx` `tl.tweenTo("myLabel2")` officialCode | covered |
| `TO-07` | `NavigationTweenSection.tsx` 5초 advanced officialCode | covered |
| `TO-08` | `NavigationTweenSection.tsx` pause·time·kill 설명, `useNavigationModeAnimation.ts` controlTweenRef | covered |
| `TO-09` | `NavigationTweenSection.tsx` reversed note, `NavigationModeLab` 관찰 패널 | covered |
| `TO-10` | `NavigationTweenSection.tsx` pause·자동 resume 없음 설명, `BoundariesSection.tsx` resume 예제 | covered |
| `TO-11` | `NavigationTweenSection.tsx` 경계, `RangeTweenSection.tsx` range sequence note | covered |
| `TLPH-P1` | `OfficialDifferencesSection.tsx` totalProgress omitted/false/true callback probe | covered |
| `TLPH-P2` | `OfficialDifferencesSection.tsx` immediateRender probe, `FromToRangeLab` 세 호출 형태와 creationTime | covered |
| `TLPH-P3` | `NavigationTweenSection.tsx` 0.25→1초 duration 0.75·ease none·paused probe | covered |
| `TLPH-P4` | `useNavigationModeAnimation.ts`·`useFromToRangeAnimation.ts` 이전 control kill/null, `BoundariesSection.tsx` lifecycle 예제 | covered |

`meta section sourceItems 합계 = 60`, `catalog origin:'official' = 60`, `meta officialSourceItems = 60`이며 ID는 official 60 + probe 4 = 64개 모두 unique다.

### relatedPages

- `/fundamentals/tween-playhead`: Tween의 같은 local/total 좌표 선행 학습
- `/fundamentals/timeline-labels`: label 생성·탐색 owner
- `/fundamentals/timeline-playback-controls`: pause/play/resume/reverse owner
- `/fundamentals/timeline-timing-math`: duration·totalDuration owner
- `/fundamentals/timeline-repeats`: repeat·repeatDelay·yoyo 설정 owner

## 구현 계약

### exactFiles

create:

- `src/content/gsap/fundamentals/timeline-playhead/TimelinePlayheadPage.tsx`
- `src/content/gsap/fundamentals/timeline-playhead/TimelinePlayheadPage.css`
- `src/content/gsap/fundamentals/timeline-playhead/timeline-playhead.catalog.ts`
- `src/content/gsap/fundamentals/timeline-playhead/timeline-playhead.meta.ts`
- `src/content/gsap/fundamentals/timeline-playhead/components/PageCoverage/PageCoverage.tsx`
- `src/content/gsap/fundamentals/timeline-playhead/components/SectionHeading/SectionHeading.tsx`
- `src/content/gsap/fundamentals/timeline-playhead/sections/PlayheadCoordinatesSection/PlayheadCoordinatesSection.tsx`
- `src/content/gsap/fundamentals/timeline-playhead/sections/DirectSettersSection/DirectSettersSection.tsx`
- `src/content/gsap/fundamentals/timeline-playhead/sections/NavigationTweenSection/NavigationTweenSection.tsx`
- `src/content/gsap/fundamentals/timeline-playhead/sections/RangeTweenSection/RangeTweenSection.tsx`
- `src/content/gsap/fundamentals/timeline-playhead/sections/OfficialDifferencesSection/OfficialDifferencesSection.tsx`
- `src/content/gsap/fundamentals/timeline-playhead/sections/BoundariesSection/BoundariesSection.tsx`
- `src/content/gsap/fundamentals/timeline-playhead/examples/CoordinateScrubLab/CoordinateScrubLab.tsx`
- `src/content/gsap/fundamentals/timeline-playhead/examples/CoordinateScrubLab/CoordinateScrubLab.css`
- `src/content/gsap/fundamentals/timeline-playhead/examples/CoordinateScrubLab/useCoordinateScrubAnimation.ts`
- `src/content/gsap/fundamentals/timeline-playhead/examples/NavigationModeLab/NavigationModeLab.tsx`
- `src/content/gsap/fundamentals/timeline-playhead/examples/NavigationModeLab/NavigationModeLab.css`
- `src/content/gsap/fundamentals/timeline-playhead/examples/NavigationModeLab/useNavigationModeAnimation.ts`
- `src/content/gsap/fundamentals/timeline-playhead/examples/FromToRangeLab/FromToRangeLab.tsx`
- `src/content/gsap/fundamentals/timeline-playhead/examples/FromToRangeLab/FromToRangeLab.css`
- `src/content/gsap/fundamentals/timeline-playhead/examples/FromToRangeLab/useFromToRangeAnimation.ts`
- `docs/handoffs/gsap/core/timeline-playhead.md`

modify:

- `src/app/routes.ts`

### exampleContracts

| name | goal / question | controls | runtimeSource / sourcePath | ownership | accessibility / motion |
| --- | --- | --- | --- | --- | --- |
| CoordinateScrubLab | 같은 0~1이 네 좌표에서 왜 다른 위치인가? | method radio, 0~1 range | `useCoordinateScrubAnimation.ts` / 동일 | runtime이 descriptor·Timeline·단일 snapshot, TSX가 controls·serializer·학습 패널 | label/fieldset/output; 자동 motion 없음, reduced에서 transform 숨김·수치 유지 |
| NavigationModeLab | 같은 label을 점프할지 부드럽게 이동할지? | method select, destination select, 실행 button | `useNavigationModeAnimation.ts` / 동일 | runtime이 destination/action/control Tween·snapshot, TSX가 실제 target selector와 action을 문법으로 직렬화 | 이산 action만 role=status; 연속 time은 밖; reduced 진입 시 active control을 kill/null하고 같은 destination의 time setter·snapshot·lastAction/code로 동기화 |
| FromToRangeLab | 두 label range와 immediateRender 생성 시점 차이는? | from/to/mode select, 실행 button | `useFromToRangeAnimation.ts` / 동일 | runtime이 두 label·실제 vars·control Tween·생성 직후 snapshot, TSX가 실제 target selector와 같은 lastAction을 직렬화 | 이산 action만 role=status; reduced 진입 시 active control을 kill/null하고 to time setter·snapshot·lastAction/code로 동기화 |

### nonGoals

- 다른 학습 페이지 수정
- Timeline label 생성 API 전체, playback 명령 전체, duration/repeat 설정 API 전체
- Tween playhead ratio·seek 설명 재소유
- generic shared runtime, drag scrubber, 자동화 테스트, 테스트 환경, 커밋
- page 26 `timeline-basics`가 소유한 Timeline.set() 동치나 from()의 별도 immediateRender 사례

### preserve

- core:32 identity와 owned canonical 6개
- 공식 오류를 실행값으로 덮어쓰지 않고 official/probe 분리
- `totalProgress()` 공식 default true 문장과 GSAP 3.15.0 생략=false 동작 차이
- `tweenFromTo()` 공식 immediateRender true 문장과 GSAP 3.15.0 생략/explicit 실행 차이
- `time()`·`totalTime()` 코드 뒤 불필요한 마침표, Timeline totalTime 문서의 “tween” 표현을 catalog에 보존
- 실행 config/action/snapshot·실제 target selector와 표시 code의 동일 runtime state, 새 action과 동적 reduced-motion 전환에서 이전 active control Tween kill 후 ref null
- 작업 전 존재한 다른 untracked/modified 파일

## 검증 계약

### verifiedPerspectives

- Source Curator
- Content Architect
- Official Coverage
- Learning Transformation
- Runtime/Display Sync
- Pedagogy
- Structure/Comment
- Accessibility/Motion 정적 판정
- Build/Integration 정적·빌드 판정
- Cross-page Consistency

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SC-CORE32-001 | PASS | 6 canonical 원문+raw 2회, 동일 SHA, official 60개 item | source 확정 | none |
| CA-CORE32-001 | PASS | 좌표→setter→tweenTo→range→오류→경계 순서 | 단순 번역이 아닌 선택 흐름 | none |
| OC-CORE32-001 | PASS | section 합 60 = catalog official 60 = meta 60, ID 64/64 unique | 100% official coverage | none |
| LT-CORE32-001 | PASS | 용어 정의, 단위/범위 표, 세 조작 예제, 원리·사용처·주의점 | beginner transformation 충족 | none |
| SYNC-CORE32-001 | PASS | 세 hook의 descriptor/action/snapshot과 실제 고유 target selector를 TSX가 직렬화; observer eventCallback도 code에 표시 | runtime/display 일치 | none |
| PED-CORE32-001 | PASS | 한 chapter card와 하나의 playhead 질문, 실행 전 목표·조작·관찰 안내 | 학습 초점 유지 | none |
| STR-CORE32-001 | PASS | page 조립, 6 sections, 3 page-owned animation hooks, TSX GSAP import 0, 한 줄 한국어 주석 | 구조 계약 충족 | none |
| A11Y-CORE32-001 | PASS | fieldset/legend/label/button, focus-visible, 연속 time live region 밖; 두 smooth hook이 reduced 진입 시 active control을 kill/null하고 목적지 setter·snapshot·lastAction/code를 함께 변경 | 정적 접근성·motion 충족 | 실제 preference 전환은 browser deferred |
| BUILD-CORE32-001 | PASS | route 등록 뒤 `npx tsc --noEmit`, `npm run build`, `npm run build-storybook` exit 0이고 두 build 모두 TimelinePlayheadPage JS/CSS chunk 생성 | 새 페이지 module·CSS graph와 기존 앱 통합 확인 | none |
| CROSS-CORE32-001 | PASS | tween-playhead local/total 용어 유지, label/playback/timing/repeat owner 링크만 경계로 제시 | 인접 owner 침범 없음 | none |
| BROWSER-CORE32-001 | DEFERRED → PASS | route 등록 뒤 로컬 URL 연결을 시도했으나 사용 가능한 browser가 없음 | keyboard·focus 실조작 미확인 | browser 연결 가능 환경에서 owner 일괄 검수 |
| BROWSER-CORE32-002 | DEFERRED → PASS | 정적으로 동적 preference 전환 처리까지 확인했으나 browser가 없음 | reduced-motion 실제 전환 미확인 | browser 연결 가능 환경에서 owner 일괄 검수 |
| BROWSER-CORE32-003 | DEFERRED → PASS | CSS 780/420px media query 정적 확인 | 320/390px overflow 실측 미확인 | browser 연결 가능 환경에서 owner 일괄 검수 |
| BROWSER-CORE32-004 | DEFERRED → PASS | 세 control의 runtime/serializer 정적 확인 | 실제 조작 결과 미확인 | browser 연결 가능 환경에서 owner 일괄 검수 |

### verificationEvidence

- `2026-08-08` raw HTML 2회 다운로드 — 6개 각각 두 hash 동일, 위 SHA 표.
- `2026-08-08` GSAP 3.15.0 node probe — totalProgress 생략/false/true callback, tweenFromTo omitted/empty/true/false 생성 직후 time, tweenTo 0.25→1초 duration/ease/paused 측정.
- static denominator audit — section `{15,19,11,13,2,0}` 합 60, catalog official 60, probes 4, IDs 64/64 unique.
- static structure audit — Timeline playhead 파일 21개 + handoff 1개, hook 밖 `gsap` import 0, 여러 줄 JSDoc 0; 세 code serializer가 runtime 고유 target selector 사용.
- static reduced-motion audit — Navigation/FromTo가 active control Tween을 kill하고 ref를 null로 만든 뒤 같은 destination/to의 `time()` setter, snapshot, lastAction/code를 동기화하며 새 direct action 전에도 kill 후 ref를 비운다.
- `2026-08-08 npx tsc --noEmit` — exit 0.
- `2026-08-08 npm run build` — TypeScript + Vite, 715 modules, exit 0. `TimelinePlayheadPage-B01qw_yD.js`와 `TimelinePlayheadPage-nj_6nIVX.css` chunk 생성.
- `2026-08-08 npm run build-storybook` — 853 modules, exit 0. `TimelinePlayheadPage-CeK5cCj6.js`와 `TimelinePlayheadPage-nj_6nIVX.css` chunk 생성, 기존 500 kB chunk warning만 발생.
- Browser 연결 시도 — route 등록 뒤 `http://127.0.0.1:5173/FE-GSAP/fundamentals/timeline-playhead`에 연결했으나 사용 가능한 browser가 없어 실조작 4개만 DEFERRED → PASS.

### releaseDecision

`PASS` — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
