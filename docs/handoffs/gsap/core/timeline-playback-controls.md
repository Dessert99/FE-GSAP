# Timeline playback controls handoff

## 입력 계약

### objective

Timeline playback 메서드 여덟 개를 API 순서로 나열하지 않고, **부모 playhead 하나가 A → B → C sequence 전체를 어떻게 멈추고·재개하고·되감는가**로 재구성한다.

핵심 멘탈 모델은 다음 셋이다.

- `paused()` — 부모 시간이 흐르는가를 읽고 쓰는 자기 스위치
- `reversed()` — 부모 시간이 어느 방향으로 흐르는가를 읽고 쓰는 자기 스위치
- `isActive()` — playhead 위치와 paused 조상까지 포함해 계산하는 읽기 전용 결과

Timeline 고유 학습 지점은 `pause(atTime)`·`play(from)`·`reverse(from)`의 첫 인자가 숫자뿐 아니라 **label**도 받는다는 것, 그리고 부모 명령 하나가 이미 배치된 children 전체에 cascade된다는 것이다.

### officialPage

- title: `isActive` + `pause` + `paused` + `play` + `restart` + `resume` + `reverse` + `reversed`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/Timeline/isActive()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/pause()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/paused()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/play()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/restart()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/resume()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/reverse()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/reversed()`
- reviewedAt: `2026-08-08` (공식 렌더 원문 + raw HTML 2회 대조)
- category: `Fundamentals > Timeline`
- slug: `timeline-playback-controls`
- sourcePageIds: primary `source:timeline-is-active`; related `source:timeline-pause`, `source:timeline-paused`, `source:timeline-play`, `source:timeline-restart`, `source:timeline-resume`, `source:timeline-reverse`, `source:timeline-reversed`

### sourceManifest

item-level authority는 `src/content/gsap/fundamentals/timeline-playback-controls/timeline-playback-controls.catalog.ts`다. 아래 65개 행은 catalog의 공식 item을 빠짐없이 재현하며, `sourceLocation`은 `officialPage.canonicalUrl` 아래의 visible heading·본문 위치다. `ISA-07`이 progress 비교와 global timeline 문장을 함께 소유하고 별도 `ISA-09`는 없다.

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| PSD-02 | paused()는 animation의 paused 상태를 가져오거나 설정한다. | `Timeline/paused() · summary · Details` | verified |
| PSD-05 | paused 상태는 조상 timeline을 고려하지 않는다(`anscestor` 공식 오타 포함). | `Timeline/paused() · Details · ancestor` | verified |
| PSD-06 | 자신은 멈추지 않아도 paused인 부모·조상 때문에 멈춘 것처럼 보일 수 있다(`ancenstor` 공식 오타 포함). | `Timeline/paused() · Details · parent example` | verified |
| PSD-07 | pause해도 부모에서 제거되지는 않지만 부모 duration/totalDuration 계산에는 포함되지 않는다. | `Timeline/paused() · Details · parent duration` | verified |
| PSD-08 | animation 완료는 paused 상태를 바꾸지 않는다. | `Timeline/paused() · Details · completion` | verified |
| PSD-10 | vars의 `paused: true`로 초기 paused 상태를 지정할 수 있다. | `Timeline/paused() · Details · initial vars` | verified |
| RVD-02 | reversed()는 animation이 거꾸로 재생해야 하는지를 가져오거나 설정한다. | `Timeline/reversed() · summary · Details` | verified |
| RVD-03 | reversed 값은 yoyo와 조상 timeline의 reversed 상태를 고려하지 않는다. | `Timeline/reversed() · Details · yoyo/ancestor` | verified |
| RVD-04 | 자신은 reversed가 아니어도 reversed인 부모·조상 때문에 거꾸로 보일 수 있다. | `Timeline/reversed() · Details · parent example` | verified |
| ISA-03 | isActive()는 playhead가 time span 위를 움직이고 자신과 조상이 paused가 아닐 때 active임을 나타낸다. | `Timeline/isActive() · summary · Details` | verified |
| ISA-04 | 진행 중에는 active지만 완료 뒤와 시작 전에는 active가 아니다. | `Timeline/isActive() · Details · active range` | verified |
| ISA-05 | 자신 또는 조상 timeline이 paused면 isActive()는 false다. | `Timeline/isActive() · Details · paused/ancestor` | verified |
| ISA-06 | playhead가 시작 시각 바로 위면 아직 render 전이어도 active다. | `Timeline/isActive() · Details · start time` | verified |
| ISA-07 | progress()/totalProgress()는 paused·부모 playhead를 고려하지 않으며 global timeline은 언제나 active로 간주된다. | `Timeline/isActive() · Details · progress/global timeline` | verified |
| PAU-01 | signature는 `pause( atTime:*, suppressEvents:Boolean ) : self`다. | `Timeline/pause() · signature` | verified |
| PAU-02 | pause()는 instance를 멈추며 선택적으로 특정 위치로 점프한다. | `Timeline/pause() · summary · Details` | verified |
| PAU-03 | atTime은 `*`, 기본값 null이고 Timeline label도 받으며 생략하면 현재 위치를 쓴다. | `Timeline/pause() · Parameters · atTime` | verified |
| PAU-04 | suppressEvents는 Boolean, 기본값 true이고 atTime 이동 중 event·callback을 억제한다. | `Timeline/pause() · Parameters · suppressEvents` | verified |
| PAU-05 | pause()는 chaining을 위해 self를 돌려준다. | `Timeline/pause() · Returns` | verified |
| PAU-06 | atTime 이동은 즉시 일어나며 기본적으로 사이 callback을 건너뛴다. 레코드 바늘 비유와 false 선택이 제시된다. | `Timeline/pause() · Details · jump/callback` | verified |
| PAU-07 | 공식 예제 3개와 child pause 뒤에도 부모 playhead는 진행하므로 보통 부모를 pause하라는 note가 있다. | `Timeline/pause() · code example · nested note` | verified |
| PLY-01 | signature는 `play( from:*, suppressEvents:Boolean ) : self`다. | `Timeline/play() · signature` | verified |
| PLY-02 | play()는 앞으로 재생하며 from을 생략하면 현재 위치에서 시작한다. | `Timeline/play() · summary · Details` | verified |
| PLY-03 | play()는 instance를 paused도 reversed도 아니게 한다. | `Timeline/play() · Details · paused/reversed` | verified |
| PLY-04 | from은 `*`, 기본값 null이고 label도 받는다. Parameters의 `Time instances`와 Details의 `Timeline instances` 표현 차이를 보존한다. | `Timeline/play() · Parameters · from; Details · from` | verified |
| PLY-05 | suppressEvents는 Boolean, 기본값 true이고 from 이동 중 event·callback을 억제한다. | `Timeline/play() · Parameters · suppressEvents` | verified |
| PLY-06 | play()는 chaining을 위해 self를 돌려준다. | `Timeline/play() · Returns` | verified |
| PLY-07 | from 이동은 즉시 일어나며 기본적으로 사이 callback을 건너뛴다. 레코드 바늘 비유와 false 선택이 제시된다. | `Timeline/play() · Details · jump/callback` | verified |
| PLY-08 | timeScale 0이면 play()가 1로 바꾼다고 적고 먼저 0.001을 설정하는 패턴을 제시한다. | `Timeline/play() · note · timeScale` | verified |
| PLY-09 | 공식 play 예제 3개와 마지막 코드의 불필요한 `>` 문자가 있다. | `Timeline/play() · code example` | verified |
| RSM-01 | signature는 `resume( ) : self`이며 Parameters 절이 없다. | `Timeline/resume() · signature` | verified |
| RSM-02 | resume()은 현재 정방향·역방향을 바꾸지 않고 재생을 재개한다. | `Timeline/resume() · summary · Details` | verified |
| RSM-03 | resume()은 chaining을 위해 self를 돌려준다. | `Timeline/resume() · Returns` | verified |
| RSM-04 | timeScale 0이면 resume()이 1로 바꾼다고 적고 먼저 0.001을 설정하는 패턴을 제시한다. | `Timeline/resume() · note · timeScale` | verified |
| RST-01 | signature는 `restart( includeDelay:Boolean, suppressEvents:Boolean ) : self`다. | `Timeline/restart() · signature` | verified |
| RST-02 | restart()는 처음으로 되돌린 뒤 앞으로 재생한다. | `Timeline/restart() · summary · Details` | verified |
| RST-03 | includeDelay는 Boolean, 기본값 false이고 restart 때 delay를 존중할지 정한다. | `Timeline/restart() · Parameters · includeDelay` | verified |
| RST-04 | suppressEvents는 Boolean, 기본값 true이며 공식 설명이 존재하지 않는 `time parameter`를 가리킨다. | `Timeline/restart() · Parameters · suppressEvents` | verified |
| RST-05 | restart()는 chaining을 위해 self를 돌려준다. | `Timeline/restart() · Returns` | verified |
| RST-06 | 공식 예제는 `tl.restart()`와 `tl.restart(true, false)`다. | `Timeline/restart() · code example` | verified |
| RVS-01 | signature는 `reverse( from:*, suppressEvents:Boolean ) : self`다. | `Timeline/reverse() · signature` | verified |
| RVS-02 | reverse()는 tween ease를 포함한 animation의 모든 측면을 뒤로 향하게 한다. | `Timeline/reverse() · summary · Details` | verified |
| RVS-03 | reverse 재생에서는 time과 totalTime이 0을 향한다. | `Timeline/reverse() · Details · time/totalTime` | verified |
| RVS-04 | 역재생 전에 위치·label로 점프할 수 있고 생략하면 현재 위치에서 시작한다. | `Timeline/reverse() · Details · from` | verified |
| RVS-05 | 공식 Details는 reverse() 뒤 instance가 `neither paused nor reversed`라고 적는다. | `Timeline/reverse() · Details · state sentence` | verified |
| RVS-06 | from은 `*`, 기본값 null이고 label도 된다. 0은 끝, -1은 끝에서 1초 전이라고 적는다. | `Timeline/reverse() · Parameters · from` | verified |
| RVS-07 | suppressEvents는 Boolean, 기본값 true이고 from 이동 중 event·callback을 억제한다. | `Timeline/reverse() · Parameters · suppressEvents` | verified |
| RVS-08 | reverse()는 chaining을 위해 self를 돌려준다. | `Timeline/reverse() · Returns` | verified |
| RVS-09 | 끝으로 점프해 역재생하려면 `reverse(0)`을 쓴다. | `Timeline/reverse() · Details · reverse(0)` | verified |
| RVS-10 | 역방향 상태는 reversed()로 확인한다. | `Timeline/reverse() · Details · reversed()` | verified |
| RVS-11 | from 이동은 즉시 일어나며 기본적으로 사이 callback을 건너뛴다. 레코드 바늘 비유와 false 선택이 제시된다. | `Timeline/reverse() · Details · jump/callback` | verified |
| RVS-12 | 공식 예제는 reverse의 인자 조합, reversed() 분기, setter 토글을 보여 준다. | `Timeline/reverse() · code example` | verified |
| PSD-01 | signature는 `paused( value:Boolean ) : [Boolean \| self]`다. | `Timeline/paused() · signature` | verified |
| PSD-03 | value는 Boolean, 기본값 false이고 생략하면 getter, 넘기면 self를 반환하는 setter다. | `Timeline/paused() · Parameters · value` | verified |
| PSD-04 | paused()는 인자 유무에 따라 Boolean 또는 self를 돌려준다. | `Timeline/paused() · Returns` | verified |
| PSD-09 | pause()/resume()은 명령에, paused()는 상태 확인·토글에 쓰라고 안내한다. | `Timeline/paused() · Details · recommendation/toggle` | verified |
| PSD-11 | 공식 예제는 paused 읽기·쓰기·토글과 chaining을 보여 준다. | `Timeline/paused() · Details · code/chaining` | verified |
| RVD-01 | signature는 `reversed( value:Boolean ) : [Boolean \| self]`다. | `Timeline/reversed() · signature` | verified |
| RVD-05 | value는 Boolean, 기본값 false이고 생략하면 getter, 넘기면 self를 반환하는 setter다. | `Timeline/reversed() · Parameters · value` | verified |
| RVD-06 | reversed()는 인자 유무에 따라 Boolean 또는 self를 돌려준다. | `Timeline/reversed() · Returns` | verified |
| RVD-07 | reversed()는 getter와 setter를 겸한다. | `Timeline/reversed() · Details · getter/setter` | verified |
| RVD-08 | 공식 예제는 reversed 읽기·쓰기·토글을 보여 준다. | `Timeline/reversed() · code example` | verified |
| ISA-01 | signature는 `isActive( ) : Boolean`이며 Parameters 절이 없다. | `Timeline/isActive() · signature` | verified |
| ISA-02 | isActive()는 timeline이 active인지 나타내는 Boolean을 돌려준다. | `Timeline/isActive() · Returns` | verified |
| ISA-08 | 공식 데모는 active 동안 방향 전환을 막고 Timeline 문서에서 대상을 tween·box라고 부른다. | `Timeline/isActive() · Details · demo` | verified |

source별 공식 item 수는 `isActive 8 + pause 7 + paused 11 + play 9 + restart 6 + resume 4 + reverse 12 + reversed 8 = 65`다.

원문 구조:

- 모든 페이지: method heading → Returns → Details
- Parameters 있음: `pause`, `paused`, `play`, `restart`, `reverse`, `reversed`
- Parameters 없음: `isActive`, `resume`
- 독립 코드 block 없음: `isActive`, `resume`
- timeScale note 있음: `play`, `resume`
- child/parent pause note 있음: `pause`

공식 원문 자체의 오류·비일관성을 고치지 않았다.

1. `play()` Parameters가 label 대상을 `Time instances`라고 쓰고 Details는 `Timeline instances`라고 쓴다.
2. `play()` 공식 코드 마지막 줄에 불필요한 `>` 문자가 있다.
3. `restart()`의 `suppressEvents` 설명이 signature에 없는 `time parameter`를 가리킨다.
4. `reverse()`가 instance를 `neither paused nor reversed`로 만든다고 적는다.
5. `reverse(-1)`을 끝에서 1초 전이라고 적지만 실행은 time 0이다.
6. `paused()`에 `anscestor`·`ancenstor` 오타가 있다.
7. Timeline `isActive()` 데모 설명이 대상을 `tween`과 `box`라고 부른다.

raw HTML은 8 URL을 별도 `curl -sSL --fail`로 받았으며 응답 byte와 SHA-256은 다음과 같다.

| source | bytes | SHA-256 |
| --- | ---: | --- |
| isActive | 73,814 | `d5b75fb1c712d57c5dfd851552eb3ae48e0dbe10e7fdaab1dd851da2ae359940` |
| pause | 76,794 | `aac32b49bce59410929c9d3c2b5dbc5fe64aa4694058073f13f51a0ad91590da` |
| paused | 77,327 | `532bc8baa819f5a57a024d2bdf859ea2c9152d49b039795ae5be994519feea17` |
| play | 77,114 | `922c475b6511e48b3449834cc81b127057d4bcca5258b6028b7349ca08bb5195` |
| restart | 74,824 | `57d7ba1b011f069b1de312ce1ae27c2f7923e46a17286de19b02c2040d1bc50e` |
| resume | 72,325 | `7f3e9939f8ca527c7c625fa8ca14c3e2f5457622c8e085c520d607757a6128b8` |
| reverse | 83,800 | `fb8ae0cdef0f94d03f3db20d7de101f8830d2bf2e27f2805f9fedb0eb86e33a7` |
| reversed | 76,690 | `13cb7c5a74310b2e948e37ab9e5910ef011c37bbb6f94fe6b8aa10ac3ed4f1bd` |

### sourceBlockers

`none`. 렌더 원문과 raw HTML에서 heading·signature·parameters·returns·details·note·코드 유무를 각각 대조했다.

### moduleSelection

| module | 적용 |
| --- | --- |
| 개념·가이드 (`CI`) | 부모 playhead, 두 상태 스위치, 계산값 하나, child cascade를 먼저 세운다. |
| callable method (`CM`) | signature·인자·기본값·반환값·label 허용·호출 시점을 의도별로 비교한다. |

### learnerFlow

| id | 질문 | local section |
| --- | --- | --- |
| `flow:container` | child를 하나씩 제어해야 하나요? | `playback-model` |
| `flow:states` | paused·reversed·isActive는 무엇이 다른가요? | `playback-model` |
| `flow:stop-go` | play와 resume이 왜 둘인가요? | `playback-commands` |
| `flow:labels` | 숫자 대신 chapter 이름에서 시작할 수 있나요? | `playback-commands` |
| `flow:restart-reverse` | 처음부터 앞으로와 끝에서 뒤로는 어떻게 다른가요? | `restart-and-reverse` |
| `flow:get-set` | 같은 이름이 읽기와 쓰기를 어떻게 겸하나요? | `state-readout` |
| `flow:boundary` | playhead 위치 API는 어디서 배우나요? | `boundaries` |

### coverageMap

catalog의 모든 official 행은 아래 실제 UI 근거에 연결됐고 `localStatus: covered`다. 동일 evidence를 공유하는 경우에도 ID를 생략하거나 범위 표기로 압축하지 않았다.

| sourceItemIds | localEvidence | localStatus |
| --- | --- | --- |
| PSD-02, RVD-02, ISA-03 | `sections/PlaybackModelSection/PlaybackModelSection.tsx` · 용어/부모 playhead prose와 “스위치 둘과 계산값 하나” 표 | covered |
| PSD-05, PSD-06, RVD-03, RVD-04, ISA-05 | `PlaybackModelSection.tsx` · “자기 상태와 화면 결과는 다를 수 있습니다” warning | covered |
| ISA-04, ISA-06 | `PlaybackModelSection.tsx` · “isActive()가 계산하는 상태” 표 | covered |
| ISA-07 | `PlaybackModelSection.tsx` · warning의 progress/totalProgress 경계 + child cascade probe provenance의 global timeline 문장 | covered |
| PSD-07, PSD-08, PSD-10 | `PlaybackModelSection.tsx` · “완료와 paused는 같은 말이 아닙니다” note | covered |
| PAU-01, PLY-01, RSM-01 | `sections/PlaybackCommandsSection/PlaybackCommandsSection.tsx` · signature code block | covered |
| PAU-02, PLY-02, PLY-03, RSM-02 | `PlaybackCommandsSection.tsx` · self/Parameters prose와 “멈추고 다시 움직이는 세 명령” 표 | covered |
| PAU-03, PAU-04, PAU-06, PLY-04, PLY-05, PLY-07 | `PlaybackCommandsSection.tsx` · “atTime·from과 suppressEvents” note | covered |
| PAU-05, PLY-06, RSM-03 | `PlaybackCommandsSection.tsx` · signature 아래 self/chaining prose | covered |
| PAU-07 | `PlaybackCommandsSection.tsx` · officialCalls code + “nested Timeline에서는 어느 부모를 멈출지” note | covered |
| PLY-08, RSM-04 | `PlaybackCommandsSection.tsx` · “label과 timeScale note를 각각 실행 확인했습니다”의 공식 note/실행 분리 | covered |
| PLY-09 | `PlaybackCommandsSection.tsx` · officialCalls code + “공식 원문의 Timeline 표기 오류” warning | covered |
| RST-01, RVS-01 | `sections/RestartReverseSection/RestartReverseSection.tsx` · signature code block | covered |
| RST-02, RST-03, RST-04, RST-05, RVS-02, RVS-03, RVS-04, RVS-06, RVS-07, RVS-08 | `RestartReverseSection.tsx` · restart/reverse 두 prose card | covered |
| RST-06, RVS-09, RVS-10, RVS-12 | `RestartReverseSection.tsx` · restart/reverse officialCalls code | covered |
| RVS-05 | `RestartReverseSection.tsx` · “공식 문장 두 곳을 정정하지 않고 분리합니다” warning | covered |
| RVS-11 | `RestartReverseSection.tsx` · reverse prose의 from/suppressEvents 설명과 officialCalls code | covered |
| PSD-01, RVD-01, ISA-01 | `sections/StateReadoutSection/StateReadoutSection.tsx` · signature code block | covered |
| PSD-03, PSD-04, RVD-05, RVD-06, RVD-07, ISA-02 | `StateReadoutSection.tsx` · getter/setter prose와 “괄호 안 값이 반환 형태를 바꾼다” 표 | covered |
| PSD-09 | `StateReadoutSection.tsx` · pause/resume과 paused 역할 prose + toggle note | covered |
| PSD-11, RVD-08 | `StateReadoutSection.tsx` · officialCalls code + “토글은 안에서 읽고 밖에서 씁니다” note | covered |
| ISA-08 | `StateReadoutSection.tsx` · isActive probe provenance의 공식 demo 설명 | covered |
| TLPB-01, TLPB-02 | `RestartReverseSection.tsx` · “reverse의 상태와 음수 from을 전수 확인했습니다” probe | covered (probe; 공식 분모 제외) |
| TLPB-03, TLPB-04, TLPB-06 | `PlaybackCommandsSection.tsx` · label/timeScale/방향 유지 probe | covered (probe; 공식 분모 제외) |
| TLPB-05 | `RestartReverseSection.tsx` · “restart는 시작 상태와 무관하게 정방향” probe | covered (probe; 공식 분모 제외) |
| TLPB-07 | `StateReadoutSection.tsx` · “isActive에는 setter 얼굴이 없습니다” probe | covered (probe; 공식 분모 제외) |
| TLPB-08 | `PlaybackModelSection.tsx` · “부모 시간을 옮겨 child cascade” probe와 `examples/SequencePlaybackLab/` | covered (probe; 공식 분모 제외) |

섹션 공식 item 분포는 `14 + 20 + 18 + 13 + 0 = 65`이고, catalog 전체는 `65 official + 8 probe = 73`이다.

### relatedPages

- `timeline-basics` — Timeline 생성과 child sequence 배치
- `timeline-labels` — label 생성·조회·탐색
- `tween-playback-controls` — Tween instance의 같은 playback 메서드
- `tween-playhead` — 등록된 현재 페이지 중 초·progress 좌표 선행 설명
- `timeline-playhead` — curriculum상 다음 페이지이나 아직 route가 없어 링크하지 않음

## 구현 계약

### exactFiles

create (15):

```text
src/content/gsap/fundamentals/timeline-playback-controls/TimelinePlaybackControlsPage.tsx
src/content/gsap/fundamentals/timeline-playback-controls/TimelinePlaybackControlsPage.css
src/content/gsap/fundamentals/timeline-playback-controls/timeline-playback-controls.meta.ts
src/content/gsap/fundamentals/timeline-playback-controls/timeline-playback-controls.catalog.ts
src/content/gsap/fundamentals/timeline-playback-controls/components/PageCoverage/PageCoverage.tsx
src/content/gsap/fundamentals/timeline-playback-controls/components/SectionHeading/SectionHeading.tsx
src/content/gsap/fundamentals/timeline-playback-controls/sections/PlaybackModelSection/PlaybackModelSection.tsx
src/content/gsap/fundamentals/timeline-playback-controls/sections/PlaybackCommandsSection/PlaybackCommandsSection.tsx
src/content/gsap/fundamentals/timeline-playback-controls/sections/RestartReverseSection/RestartReverseSection.tsx
src/content/gsap/fundamentals/timeline-playback-controls/sections/StateReadoutSection/StateReadoutSection.tsx
src/content/gsap/fundamentals/timeline-playback-controls/sections/BoundariesSection/BoundariesSection.tsx
src/content/gsap/fundamentals/timeline-playback-controls/examples/SequencePlaybackLab/SequencePlaybackLab.tsx
src/content/gsap/fundamentals/timeline-playback-controls/examples/SequencePlaybackLab/SequencePlaybackLab.css
src/content/gsap/fundamentals/timeline-playback-controls/examples/SequencePlaybackLab/useSequencePlaybackAnimation.ts
docs/handoffs/gsap/core/timeline-playback-controls.md
```

modify: `src/app/routes.ts` — lazy page import와 `/fundamentals/timeline-playback-controls` lesson 등록.

### exampleContracts

#### SequencePlaybackLab

- goal: 세 child를 개별 조작하지 않고 부모 Timeline의 playback command 하나로 A → B → C sequence 전체를 제어한다.
- question: Tween과 같은 control API가 child sequence에 어떤 효과를 주며 label 인자는 어디로 이동시키나요?
- representation: 세 lane + 현재 child 강조 + command buttons + 단일 snapshot + runtime code serializer
- controls: `play()`, `pause()`, `resume()`, `restart()`, `reverse(0)`, `reversed(!reversed())`, `play('middle')`, `pause('finish')`, `reverse('finish')`
- runtimeSource: `useSequencePlaybackAnimation.ts`
- sourcePath: `examples/SequencePlaybackLab/useSequencePlaybackAnimation.ts`
- runtimeOwnership: selector·label·duration·distance 단일 descriptor, Timeline instance, command descriptor, Timeline getter와 실제 child x를 한 번에 읽는 `PlaybackSnapshot`, `useGSAP` 생명주기
- displayOwnership: controls, preview, command serializer, propertyDetails, changes, watchFor, explanation, sourcePath
- accessibility: native button·fieldset·legend, focus-visible, 이산 command·paused·reversed만 `role=status`, 연속 time/progress는 일반 `<dd>`, 작은 화면 1열
- motion: 자동 재생 없음(`paused: true`). reduced-motion이면 GSAP 시간과 snapshot은 유지하되 transform을 CSS `!important`로 숨기고 숫자·현재 child로 대체한다.

### nonGoals

- `time()`·`progress()`·`totalTime()`·`tweenTo()`·`tweenFromTo()` 전체 계약
- Timeline 생성·label 생성 API 재설명
- 콜백 발화 순서 전수 probe
- Tween 페이지의 세 lab 복제 또는 generic playback hook 추출
- 자동화 테스트 코드·테스트 환경 추가

### preserve

- 공식 오류와 실행 결과를 서로 덮어쓰지 않고 함께 표시한다.
- 다른 learning page와 공용 component는 수정하지 않는다.
- runtime config와 표시 코드는 같은 descriptor·snapshot을 쓴다.
- 브라우저 live region에 매 frame time을 넣지 않는다.

## 검증 계약

### verifiedPerspectives

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion, Cross-page Consistency, Build/Integration을 각각 판정했다.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-CORE31-001 | PASS | 8 canonical 렌더 원문과 raw HTML의 heading·signature·parameters·returns·details·note·code 유무를 2026-08-08 대조 | source blocker 없음 | none |
| SRC-CORE31-002 | PASS | 공식 오류·오타 7종을 catalog와 section에 원문 의미 그대로 남기고 실행 결과를 probe로 분리 | 공식 오류를 임의 정정하지 않음 | none |
| OC-CORE31-001 | PASS | catalog와 meta 재대조 결과 official 65, probe 8, duplicate ID 0, source 분포 8/7/11/9/6/4/12/8, section 분포 14/20/18/13 | Official Coverage 통과 | none |
| LT-CORE31-001 | PASS | API 순서 대신 container model → pause/play/resume → restart/reverse → getter/setter 흐름, 용어를 실행 전 정의 | Learning Transformation 통과 | none |
| RDS-CORE31-001 | PASS | runtime의 `SequencePlaybackDescriptor`와 `PlaybackCommand`가 Timeline 호출과 TSX serializer를 함께 구동하고 getter·child x는 `PlaybackSnapshot` 하나로 갱신 | runtime/display sync 통과 | none |
| PED-CORE31-001 | PASS | 한 3-child sequence만 사용하고 goal·propertyDetails·changes·watchFor·reason·use case를 실행 전후에 배치 | 학습 질문 하나 유지 | none |
| STRUCT-CORE31-001 | PASS | target 파일 14개 + handoff, relative import missing 0, static class missing 0, TSX의 gsap import 0, test 파일 0 | 구조·실행 source 경계 통과 | none |
| A11Y-CORE31-001 | PASS | native controls, fieldset/legend, focus-visible, 연속 시간 live region 제외, reduced-motion 정적 대체, 780/420px CSS 전환 | 정적 접근성·motion 통과 | none |
| BUILD-CORE31-001 | ADVISORY | 이전 코드 revision에서 target 경로 TypeScript 오류 0을 확인했으나 이후 catalog·meta·section이 수정됐다. | 현재 revision의 완료 증거로 사용할 수 없음 | final build로 대체 |
| BUILD-CORE31-003 | ADVISORY | 이전 코드 revision을 local esbuild로 bundle했으나 이후 부모 컨텍스트가 코드를 수정했다. | 현재 revision의 완료 증거로 사용할 수 없음 | final build로 대체 |
| BUILD-CORE31-002 | ADVISORY | 이전 전체 build 시도는 동시 작업 중인 다른 Timeline 페이지 오류로 중단됐다. | 현재 revision 전체 build PASS 증거 없음 | workspace 안정 뒤 다시 실행 |
| BUILD-CORE31-004 | PASS | route 등록과 마지막 코드 수정 뒤 root app·Storybook build exit 0 | 현재 revision 통합 검증 완료 | none |
| FORMAT-CORE31-001 | ADVISORY | `npx prettier --check`는 저장소 Prettier config가 ESM package에서 `module is not defined`를 내며 실행 불가 | 형식 검증 자동화 불가 | config 소유 범위에서 별도 해결 |
| XPAGE-CORE31-001 | PASS | route에 등록된 timeline-basics·timeline-labels·tween-playback-controls·tween-playhead만 링크하고 미등록 timeline-playhead는 링크하지 않음 | fallback route 오연결 방지 | none |
| REVIEW-CORE31-001 | PASS | Critical 0, Important 2축(coverage/localEvidence·build 판정)과 Minor 1건(reverse 문장) 반영 | 독립 감사 완료 | none |
| A11Y-CORE31-002 | DEFERRED | 키보드 실조작, reduced-motion 실제 전환, 320/390px overflow, 9 command 실제 브라우저 조작 | 소유자 일괄 브라우저 검수 대상 | route 등록 후 브라우저 검수 |

### verificationEvidence

- raw canonical: 8/8 HTTP success, byte·SHA-256 기록
- catalog invariant: total 73, official 65, probe 8, duplicate IDs 0
- source distribution: paused 11, reversed 8, is-active 8, pause 7, play 9, resume 4, restart 6, reverse 12
- section distribution: playback-model 14, playback-commands 20, restart-and-reverse 18, state-readout 13
- runtime probe: Node v22.21.0, GSAP 3.15.0, plain object targets, A/B/C duration 각 1초, Timeline 전체 duration 3초
  - labels: pause/play/reverse `middle` → time 1
  - reverse from: undefined 1.5, 0 → 3, -1/-0.5 → 0, 0.5 → 0.5, 2 → 2, 3/4 → 3
  - timeScale 0: play/resume 뒤 모두 0 유지
  - restart: forward/reverse/paused 세 출발점 모두 time 0, paused false, reversed false, timeScale 1
  - cascade: time 0/0.5/1/1.5/2/2.5/3에서 A·B·C가 순서대로 0/50/100 진행
- 이전 revision의 TypeScript·target bundle·실패한 전체 build 기록은 findings의 BUILD-CORE31-001~003에 보존했으며 현재 revision PASS 근거로 쓰지 않는다.
- 최종 build: 저장소 root `npm run build` exit 0, `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook` exit 0.
- `npx prettier --check`: repository config ESM 오류로 중단

### releaseDecision

`PASS` — 공식 coverage·독립 검토·route·현재 revision의 전체 TypeScript/Vite·Storybook build를 완료했다. 브라우저 실조작 `A11Y-CORE31-002`는 workflow에 따라 계속 `DEFERRED`다.

`src/app/routes.ts`에 lazy import와 lesson을 등록했다.
