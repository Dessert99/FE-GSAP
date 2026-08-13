# Timeline callbacks and pauses handoff

## 입력 계약

### objective

함수가 실행되는 시점을 네 종류로 나눠 가르친다. Timeline 밖에서 기다리는 `gsap.delayedCall()`, Timeline 시간축 안에 고정되는 `call()`, 재생 헤드를 정확한 위치에 세우는 `addPause()`·`removePause()`, Timeline 전체 생애를 관찰하는 `eventCallback()`·`then()`이다.

### officialPage

- title: `gsap.delayedCall()` + `Timeline.call()` + `Timeline.addPause()` + `Timeline.removePause()` + `Timeline.eventCallback()` + `Timeline.then()`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/gsap.delayedCall()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/call()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/addPause()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/removePause()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/eventCallback()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/then()`
- reviewedAt: `2026-08-08`
- category: `GSAP > GSAP` + `Fundamentals > Timeline`
- slug: `timeline-callbacks-pauses`
- sourcePageIds: primary `source:gsap-delayed-call`; related `source:timeline-call`, `source:timeline-add-pause`, `source:timeline-remove-pause`, `source:timeline-event-callback`, `source:timeline-then`

### localPage

- localPath: `src/content/gsap/fundamentals/timeline-callbacks-pauses/`
- route: `/fundamentals/timeline-callbacks-pauses`

### sourceManifest

`timeline-callbacks-pauses.catalog.ts`가 공식 item 60개와 실행 확인 item 9개의 문장·source·section 귀속 authority다.

| source | 공식 item | sourceStatus |
| --- | ---: | --- |
| `delayed-call` | 7 | verified |
| `call` | 18 | verified |
| `add-pause` | 13 | verified |
| `remove-pause` | 6 | verified |
| `event-callback` | 11 | verified |
| `then` | 5 | verified |
| 합계 | 60 | verified |

공식 HTML의 heading·signature·인자·반환·예제·callout을 각각 두 번 조회했다. `call()`과 `addPause()`의 긴 position 목록은 HTML 본문을 직접 추출해 항목과 예제를 셌다.

| sourceItemIds | sourceLocation | sourceStatus |
| --- | --- | --- |
| DC-01 | `source:gsap-delayed-call` Returns | verified |
| DC-02~07 | `source:gsap-delayed-call` Details와 공식 예제 | verified |
| CL-01 | `source:timeline-call` signature | verified |
| CL-02 | `source:timeline-call` Returns | verified |
| CL-03~05 | `source:timeline-call` Parameters | verified |
| CL-06~09 | `source:timeline-call` Details와 공식 예제 | verified |
| CL-10~18 | `source:timeline-call` Positioning a callback in a timeline | verified |
| AP-01 | `source:timeline-add-pause` signature | verified |
| AP-02 | `source:timeline-add-pause` Returns | verified |
| AP-03~05 | `source:timeline-add-pause` Parameters | verified |
| AP-06~11 | `source:timeline-add-pause` Details와 공식 예제 | verified |
| AP-12~13 | `source:timeline-add-pause` Positioning a pause in a timeline | verified |
| RP-01 | `source:timeline-remove-pause` signature | verified |
| RP-02 | `source:timeline-remove-pause` Returns | verified |
| RP-03 | `source:timeline-remove-pause` Parameters | verified |
| RP-04~06 | `source:timeline-remove-pause` Details와 공식 예제 | verified |
| EC-01 | `source:timeline-event-callback` signature | verified |
| EC-02 | `source:timeline-event-callback` Returns | verified |
| EC-03~05 | `source:timeline-event-callback` Parameters | verified |
| EC-06~11 | `source:timeline-event-callback` Details·warning·공식 예제 | verified |
| TH-01 | `source:timeline-then` signature | verified |
| TH-02 | `source:timeline-then` Returns | verified |
| TH-03 | `source:timeline-then` Parameters | verified |
| TH-04~05 | `source:timeline-then` Details와 공식 예제 | verified |

### sourceBlockers

`none`.

- `gsap.delayedCall()`에는 signature와 Parameters 절이 없다. 기억이나 타입 선언으로 채우지 않는다.
- `removePause()` 공식 signature와 TypeScript는 `self`지만 GSAP 3.15.0 런타임은 `undefined`를 반환한다. 공식 주장과 probe 결과를 나란히 보존한다.
- 공식 문서가 Promise reject·kill·무한 반복을 설명하지 않으므로 이 페이지에서 단정하지 않는다.

### moduleSelection

- callable method — 여섯 메서드의 signature·인자·반환·호출 시점을 비교한다.
- concept/guide — “밖에서 기다림 / 시간축 안 이벤트 / 멈춤 지점 / 전체 생애” 네 층으로 재구성한다.
- class/instance — callback과 pause가 zero-duration child로 Timeline에 남는 구조를 설명한다.

### learnerFlow

1. 함수 예약의 네 층을 구분한다.
2. Timeline 없이 한 번 기다린다.
3. Timeline의 고정 위치에 callback을 둔다.
4. position 문법을 읽는다.
5. 정확한 pause를 만들고 제거한다.
6. Timeline 전체 콜백을 읽고 바꾼다.
7. 완료를 Promise로 기다린다.
8. 다른 페이지가 소유하는 경계를 확인한다.

### coverageMap

catalog의 `sectionId`가 item별 귀속 authority이며 아래 표가 실제 로컬 근거를 고정한다. 모든 공식 item의 `localStatus`는 `covered`이고 probe는 공식 분모에서 제외한다.

| sourceItemIds | localEvidence | localStatus |
| --- | --- | --- |
| DC-02~03 | `SchedulingBasicsSection.tsx` 네 층 비교표와 `setTimeout()` 비교 note | covered |
| DC-01, DC-04~07 | `DelayedCallSection.tsx` 반환 문단·params 예제·취소 코드, `DelayedCallLab` | covered |
| CL-01~04, CL-06~09 | `TimelineCallSection.tsx` signature·인자표·동치 코드·call/onComplete 비교 | covered |
| CL-05, CL-10~18, AP-12~13 | `PositionParameterSection.tsx` 전체 position 형태 표·퍼센트 note·previous 경고·addPause 예제 | covered |
| AP-01~11 | `PausePointsSection.tsx` signature·인자표·playhead 보정 설명·공식 예제, `TimelineEventLab` | covered |
| RP-01~06 | `PausePointsSection.tsx` signature·공식 반환·제거 코드·반환 불일치 경고, `TimelineEventLab` | covered |
| EC-01~11 | `LifecycleCallbacksSection.tsx` signature·getter/setter 표·event 목록·덮어쓰기 설명·공식 예제 | covered |
| TH-01~05 | `CompletionPromiseSection.tsx` Promise 도입·signature·인자표·공식 예제 | covered |
| DC-P1~P2 | `DelayedCallSection.tsx` probe note와 `DelayedCallLab` Tween 관찰표 | covered (probe) |
| CL-P1 | `TimelineCallSection.tsx` child 모양 probe note | covered (probe) |
| AP-P1~P3, RP-P1 | `PausePointsSection.tsx` 반환 불일치·pause 수명 probe와 `TimelineEventLab` | covered (probe) |
| EC-P1 | `LifecycleCallbacksSection.tsx` 미등록 getter probe note | covered (probe) |
| TH-P1 | `CompletionPromiseSection.tsx` resolve 값 probe note와 `TimelineEventLab` | covered (probe) |

### relatedPages

- `tween-callbacks-promise` — Tween의 `eventCallback()`·`then()` 학습을 소유한다.
- `tween-playback-controls` — pause·play·resume 명령의 상태 계약을 소유한다.
- `tween-playhead` — time·progress 좌표계를 소유한다.
- `timeline-basics`·`timeline-labels` — Timeline 생성과 label 전체 계약을 소유하며, 등록 전까지 내부 링크를 만들지 않는다.

## 구현 계약

### exactFiles

- create/adopt: 이 handoff와 `src/content/gsap/fundamentals/timeline-callbacks-pauses/` 아래 catalog·meta·페이지·components·sections·examples 전체
- modify tracked file: `src/app/routes.ts`
- preserve while completing: 인계받은 untracked scaffold의 공식 주장 60개, probe 9개, 페이지 스타일과 공통 components

### exampleContracts

#### DelayedCallLab

- goal: 하나의 delayedCall을 예약하고 참조의 `kill()`과 함수 target의 `killTweensOf()`로 각각 취소한다.
- question: Timeline 없이 예약한 함수는 어떻게 취소하나요?
- representation: 남은 시간 막대, Tween 관찰값, 실행 코드
- controls: delay, params 포함 여부, 예약, 두 취소 경로, 초기화
- runtimeSource/sourcePath: `examples/DelayedCallLab/useDelayedCallAnimation.ts`
- runtimeOwnership: descriptor, delayedCall Tween, ticker, 실제 수신 params와 Tween 관찰값
- displayOwnership: TSX가 descriptor·observation을 문법으로만 직렬화하고 설명 패널을 그린다.
- accessibility: 이산 상태만 `role="status"`; 매 frame 바뀌는 남은 시간은 live region 밖 일반 요소
- motion: 시각적 이동은 없고 reduced-motion에서는 진행 막대 transition을 사용하지 않는다.

#### TimelineEventLab

- goal: 같은 Timeline 위의 `call` pin, pause pin, lifecycle callback, completion Promise가 서로 다른 시점과 상태를 만드는 것을 확인한다.
- question: 시간축 callback·pause·전체 완료는 어떻게 구분하나요?
- representation: 정적 event ruler, 이산 event log, 반환값·Promise 상태, 실행 코드
- controls: 재생, 계속, 처음부터, pause 제거·복원, 초기화
- runtimeSource/sourcePath: `examples/TimelineEventLab/useTimelineEventAnimation.ts`
- runtimeOwnership: 단일 position descriptor, Timeline과 zero-duration children, 실제 event log, removePause 반환, Promise 상태
- displayOwnership: TSX가 runtime 값을 코드 문법과 표로만 포맷한다.
- accessibility: 이산 조작 결과는 `role="status"` 한 곳에서 알리고 event log는 일반 이력으로 둔다. 연속 시각은 live region에 두지 않는다.
- motion: DOM을 움직이지 않고 객체 값과 event만 관찰하므로 reduced-motion에서도 동일한 시간 계약을 유지한다.

### nonGoals

- Timeline 생성 vars 전체, label map, playback controls, playhead 좌표계를 다시 소유하지 않는다.
- `setTimeout()`의 일반 동작이나 Promise 취소 전략을 별도 가이드로 확장하지 않는다.
- 공식 `removePause(): self`를 실제 반환값인 것처럼 실행 예제에 쓰지 않는다.
- 미등록 Timeline slug로 링크하지 않는다.

### preserve

- catalog의 공식 주장 60개와 probe 9개 구분
- `removePause()` 공식/실행 불일치
- live region에 연속 시간값을 넣지 않는 규칙

## 검증 계약

### verifiedPerspectives

구현 후 Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, Accessibility/Motion, Build/Integration, Cross-page Consistency를 각각 판정한다.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-TCP-001 | PASS | 2026-08-08 여섯 canonical의 heading·본문을 2회 직접 조회해 공식 60개 item을 재확인 | source 구현 가능 | none |
| PROBE-TCP-001 | PASS | GSAP 3.15.0에서 delayedCall 구조, call child, pause 재진입, removePause 범위·반환, eventCallback getter/setter, then resolve 값을 직접 측정 | 공식 침묵·불일치 분리 | 페이지에 provenance와 재현 조건 표시 |
| OC-TCP-001 | PASS | catalog 공식 60개 = meta 섹션 합계 60개 = coverage 분모 60개, 섹션별 수량도 모두 일치하고 ID 중복 0개 | 공식 범위 전부 로컬 근거에 귀속 | none |
| LT-TCP-001 | PASS | 예약 층 구분부터 경계까지 여덟 단계와 `DelayedCallLab`·`TimelineEventLab` 구현 | source 목록을 초보자 질문 순서로 변환 | none |
| RDS-TCP-001 | PASS | 두 lab 모두 descriptor·GSAP instance·실제 관찰을 hook이 소유하고 TSX는 직렬화만 수행, TSX의 `gsap`·`@gsap/react` import 0개 | 실행과 코드 패널의 단일 source 유지 | none |
| PED-TCP-001 | PASS | 각 lab에 목표·질문·controls·관찰·코드·네 설명 패널·실행 경로를 제공 | 조작 결과를 이유와 사용처까지 연결 | none |
| STR-TCP-001 | PASS | 페이지 TSX는 8개 section 조립만 수행하고 예제 선언·GSAP 실행 단계에 한 줄 한국어 주석 적용 | 프로젝트 구조·주석 계약 충족 | none |
| A11Y-STATIC-TCP-001 | PASS | button·label·fieldset·caption·heading 연결 확인, 연속 남은 시간은 live region 밖이고 상태 문장만 `role="status"` | 정적 접근성·motion 계약 충족 | none |
| XPAGE-TCP-001 | PASS | 등록된 `tween-playback-controls`·`tween-playhead`·`tween-callbacks-promise`만 링크하고 미등록 Timeline slug는 텍스트로만 경계 표시 | dead link 없음 | none |
| BUILD-TCP-001 | PASS | 미완성 7개 폴더를 제외한 격리 mirror에서 `npm run build`, `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook` exit 0 | 이 페이지와 등록 라우트의 production·Storybook 통합 확인 | none |
| REVIEW-TCP-001 | PASS | 독립 리뷰에서 발견한 callback identity·coverage 근거·주석·exactFiles 4건을 수정하고 재리뷰에서 잔존 Critical/Important 0건 확인 | 취소 runtime과 handoff 재검증성 확보 | none |
| A11Y-TCP-001 | DEFERRED → PASS | 키보드·reduced-motion·320/390px·실제 control 조작 | 소유자 일괄 브라우저 검수 | 전체 페이지 완성 후 확인 |

### verificationEvidence

- source: 2026-08-08 공식 HTML heading 목록 조회 + 본문/코드/parameter 재추출
- probe: Node 22, GSAP 3.15.0, plain object target, 정확값은 직접 getter로 읽고 실시간 pause는 0.1초 지점에서 ±1 frame 대기
- probe: 완료된 Timeline에 `then()`을 붙이면 restart 전에 즉시 resolve되는 것을 확인해, 예제는 `restart()` 후 새 completion watcher를 등록한다.
- review: 예약 당시 callback을 ref에 보관해 재렌더 뒤에도 `delayedCall()` target과 `killTweensOf()` target이 같은 identity를 사용한다.
- static: 공식 60 / 실행 확인 9 / meta 합계 60 / 중복 ID 0 / route 1 / TSX GSAP import 0
- build: `/tmp/fe-gsap-callbacks-TArpDg`에서 2026-08-08 재실행, 두 명령 모두 exit 0. 저장소 루트의 남은 type error 19개는 라우트 미등록 미완성 `timeline-child-placement`·`timeline-labels`·`timeline-timing-math`의 아직 없는 section import다.

### releaseDecision

`PASS` — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
