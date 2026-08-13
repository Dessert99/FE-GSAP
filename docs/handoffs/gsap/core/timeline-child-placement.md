# Timeline child placement handoff

## 입력 계약

### objective

Timeline child가 어느 부모의 어느 `startTime`에 놓이는지, `add()`·position·`recent()`·`shiftChildren()`·`smoothChildTiming`이 그 좌표를 어떻게 만들고 옮기는지 한 페이지에서 가르친다.

### officialPage

- title: `Timeline.parent` + `Timeline.smoothChildTiming` + `Timeline.add()` + `Timeline.recent()` + `Timeline.shiftChildren()`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/Timeline/parent`
  - `https://gsap.com/docs/v3/GSAP/Timeline/smoothChildTiming`
  - `https://gsap.com/docs/v3/GSAP/Timeline/add()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/recent()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/shiftChildren()`
- reviewedAt: `2026-08-08`
- category: `GSAP > Timeline`
- slug: `timeline-child-placement`
- sourcePageIds: primary `source:timeline-parent`; related `source:timeline-smooth-child-timing`, `source:timeline-add`, `source:timeline-recent`, `source:timeline-shift-children`

### localPage

- localPath: `src/content/gsap/fundamentals/timeline-child-placement/`
- route: `/fundamentals/timeline-child-placement`

### sourceManifest

`timeline-child-placement.catalog.ts`가 공식 item 63개와 probe 15개의 문장·source·section 귀속 authority다.

| source | 공식 item | sourceStatus |
| --- | ---: | --- |
| `parent` | 8 | verified |
| `add` | 30 | verified |
| `recent` | 5 | verified |
| `shift-children` | 8 | verified |
| `smooth-child-timing` | 12 | verified |
| 합계 | 63 | verified |

| sourceItemIds | sourceLocation | sourceStatus |
| --- | --- | --- |
| PA-01 | `source:timeline-parent` signature | verified |
| PA-02~06 | `source:timeline-parent` Details의 parent·globalTimeline·단일 부모·add 이동 | verified |
| PA-07~08 | `source:timeline-parent` How do timelines work?와 관련 링크 | verified |
| AD-01~05 | `source:timeline-add` signature·Parameters·Returns·Details | verified |
| AD-06~07 | `source:timeline-add` 기본 끝 배치와 flexible syntax 안내 | verified |
| AD-08~18 | `source:timeline-add` position의 숫자·label·상대 초 표기 | verified |
| AD-19~29 | `source:timeline-add` 퍼센트 규칙·예제·버전·previous 각주 | verified |
| AD-30 | `source:timeline-add` Position Parameter 문서·interactive demo 안내 | verified |
| RC-01~03 | `source:timeline-recent` signature·반환·Details | verified |
| RC-04~05 | `source:timeline-recent` e1/e2/e3 공식 예제와 의미 | verified |
| SH-01~06 | `source:timeline-shift-children` signature·Parameters·Returns | verified |
| SH-07~08 | `source:timeline-shift-children` Details의 startTime 이동·prepend/splice 용도 | verified |
| SC-01~02 | `source:timeline-smooth-child-timing` signature·Details 정의 | verified |
| SC-03~10 | `source:timeline-smooth-child-timing` 75% reverse 상황과 false/true 비교 | verified |
| SC-11 | `source:timeline-smooth-child-timing` 영향을 줄 수 있는 11개 property/method | verified |
| SC-12 | `source:timeline-smooth-child-timing` globalTimeline true 문장 | verified |

다섯 URL을 개별 조회한 뒤 원본 HTML을 다시 받아 signature·Parameters·Returns·Details·예제·각주·연결 자료를 대조했다. `add()`는 퍼센트 버전 각주와 most recently-inserted 각주, `smoothChildTiming`은 75% 문단과 11개 목록을 두 번째 조회에서 별도로 확인했다.

### sourceBlockers

`none`.

- 일반 `gsap.timeline()`의 `smoothChildTiming` 기본은 false이고 `gsap.globalTimeline`만 true다. 공식 문장과 GSAP 3.15.0 실행이 일치하며 반대로 바꾸지 않는다.
- `shiftChildren()` signature의 세 번째 인자는 `ignoreBeforeTime`인데 공식 설명문은 같은 값을 `startAtTime`이라고 부른다. 원문의 명칭 불일치를 경고로 보존한다.
- 공식의 "previous animation"은 시간상 끝에 가까운 child가 아니라 가장 최근에 삽입한 child다. `position`과 `recent()`에서 코드 삽입 순서를 기준으로 유지한다.
- 공식이 Timeline의 음수 child 전체 폭 계산식을 제공하지 않으므로 probe PR-15는 공식 주장과 섞지 않는다. 0초 전에서 모든 child가 끝나는 fixture까지 재측정해 `max(0, latest end) - min(0, earliest start)`로 확장했다.

### moduleSelection

- property — `parent`, `smoothChildTiming`의 읽기·쓰기 계약을 설명한다.
- callable methods — `add()`·`recent()`·`shiftChildren()`의 signature·인자·반환을 보존한다.
- concept/guide — 하나의 부모 시간축과 `startTime` 좌표라는 멘탈 모델로 다섯 API를 연결한다.
- interactive method — position 공식 표기 15개를 같은 fixture에서 실제 getter 좌표로 비교한다.

### learnerFlow

1. child 좌표가 부모 Timeline 시계 기준임을 이해한다.
2. `add()`가 받는 child 종류와 기본 끝 배치를 확인한다.
3. position 표기를 네 기준점으로 나눠 읽고 실제 좌표를 바꿔 본다.
4. `recent()`가 최근 삽입 child를 가리킨다는 사실을 확인한다.
5. `shiftChildren()`으로 이미 놓인 좌표를 옮긴다.
6. `smoothChildTiming`으로 매끄러운 값과 고정 좌표의 우선순위를 비교한다.
7. label·inspection·playback 후속 소유권을 확인한다.

### coverageMap

catalog `sectionId`가 item별 귀속 authority이며 공식 63개는 모두 `covered`, probe 15개는 분모 밖 `covered (probe)`다.

| sourceItemIds | localEvidence | localStatus |
| --- | --- | --- |
| PA-01~08 | `ParentGraphSection.tsx` signature 표·단일 parent 설명·DOM 비유·이동·관련 문서 표 | covered |
| AD-01~07 | `AddSignatureSection.tsx` signature·Parameters·Returns·child 종류·기본 `+=0`·flexible syntax | covered |
| AD-08~30 | `PositionSyntaxSection.tsx` 공식 15표기·퍼센트 분모·version/recent 각주·연결 자료, `PositionSyntaxLab` | covered |
| RC-01~05 | `RecentSection.tsx` signature·무인자/반환 타입·위치 무관 정의·e1/e2/e3 공식 예제 | covered |
| SH-01~08 | `ShiftChildrenSection.tsx` signature·세 인자·기본값·self·startTime 이동·prepend/splice·공식 명칭 불일치 | covered |
| SC-01~12 | `SmoothChildTimingSection.tsx` property 계약·75% reverse false/true·부모 playhead·11개 목록·global true | covered |
| PR-01~02 | `SmoothChildTimingSection.tsx` normal/global 기본과 11개 setter startTime probe | covered (probe) |
| PR-03~07 | `PositionSyntaxSection.tsx` delay 합산·15표기·퍼센트 비대칭·생략·없는 label probe | covered (probe) |
| PR-08~09 | `AddSignatureSection.tsx` 배열·callback·label child 차이 probe | covered (probe) |
| PR-10~11 | `RecentSection.tsx` empty·label·shift identity probe | covered (probe) |
| PR-12 | `ParentGraphSection.tsx` 이전 parent 제거·remove 후 null probe | covered (probe) |
| PR-13~15 | `ShiftChildrenSection.tsx` 포함 경계·음수 복원 함정·전체 폭 식 probe | covered (probe) |

### relatedPages

- `timeline-basics` — Timeline container와 creator의 입문을 소유하며 등록된 링크를 제공한다.
- `timeline-callbacks-pauses` — callback·pause를 position에 놓는 상세를 소유한다.
- `tween-playback-controls` — 공통 Animation 재생 control을 소유한다.
- `timeline-labels`·`timeline-inspection`·`timeline-timing-math`·`timeline-repeats` — 후속 상세를 소유하며 등록 전까지 링크하지 않는다.

## 구현 계약

### exactFiles

- create/adopt: 이 handoff와 `src/content/gsap/fundamentals/timeline-child-placement/` 아래 catalog·meta·page·components·sections·example 전체
- modify tracked file: `src/app/routes.ts`
- preserve while completing: 인계받은 공식 63개·probe 15개 catalog, meta, 기존 3개 section, `usePositionSyntaxRuntime.ts`, 공통 components와 CSS

### exampleContracts

#### PositionSyntaxLab

- goal: 공식 position 15개 가운데 하나를 골라 같은 Timeline fixture의 실제 `startTime()`·`endTime()`·`totalDuration()` 배치를 관찰한다.
- question: position 표기의 기준점과 퍼센트 분모가 바뀌면 삽입 child는 어디에 놓이나요?
- representation: select·repeat checkbox, 두 child ruler, getter readout 4개, descriptor 기반 코드 패널
- controls: position 표기 15개 select, 삽입 child `repeat: 1` checkbox
- runtimeSource/sourcePath: `examples/PositionSyntaxLab/usePositionSyntaxRuntime.ts`
- runtimeOwnership: control state, descriptor, paused Timeline, 실제 GSAP getter, ruler segment
- displayOwnership: TSX는 같은 descriptor로 코드 한 줄을 직렬화하고 runtime readout을 표시한다.
- accessibility: control 변경이라는 이산 결과만 `role="status"`; 연속 재생값 없음
- motion: animation autoplay 없음. ruler CSS transition만 사용하고 reduced-motion이면 제거한다.

### nonGoals

- label CRUD, child 검색·삭제, Timeline playback·playhead·repeat 계산을 구현하지 않는다.
- globalTimeline을 변경하거나 animation을 자동 재생하지 않는다.
- 공식이 제공하지 않는 `shiftChildren()` 실행 예제를 공식 예제로 표현하지 않는다.
- 미등록 Timeline slug로 링크하지 않는다.

### preserve

- 일반 Timeline false / globalTimeline true의 `smoothChildTiming` 기본 차이
- `shiftChildren()`의 `ignoreBeforeTime` / 설명문 `startAtTime` 명칭 불일치
- most recently-inserted와 시간상 마지막 child의 차이
- 공식 63 / probe 15 분리

## 검증 계약

### verifiedPerspectives

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, Accessibility/Motion, Build/Integration, Cross-page Consistency를 각각 판정한다.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-TCP-001 | PASS | 2026-08-08 canonical 5개 개별 조회 + 원본 HTML 재대조 | source 구현 가능 | none |
| PROBE-TCP-001 | PASS | Node 22·GSAP 3.15.0에서 default·position 15개·smooth setter 11개·parent/recent/shift/duration fixture 재측정 | 공식 침묵과 실행 차이 분리 | provenance 유지 |
| OC-TCP-001 | PASS | catalog 공식 63 = meta 합계 63 = coverage 분모 63, 섹션별 일치, ID 중복 0 | 공식 범위 전체 귀속 | none |
| LT-TCP-001 | PASS | 일곱 단계·15표기 interactive lab·공식 예제/비예제 구분 | 목록을 부모 좌표 흐름으로 변환 | none |
| RDS-TCP-001 | PASS | descriptor·paused Timeline·getter·segments를 hook이 소유하고 TSX GSAP import 0개 | 실행·ruler·코드 동기화 | none |
| PED-TCP-001 | PASS | lab에 목표·controls·실측 ruler·코드·네 설명 패널·실행 경로 제공 | 조작과 개념 연결 | none |
| STR-TCP-001 | PASS | 페이지는 section 조립만 수행하고 example 선언·GSAP 실행 단계에 한 줄 한국어 주석 적용 | 구조·주석 계약 충족 | none |
| A11Y-STATIC-TCP-001 | PASS | label/select/checkbox·heading·table caption 확인, 연속 live 값 없음, reduced-motion transition 제거 | 정적 접근성·motion 충족 | none |
| XPAGE-TCP-001 | PASS | 등록된 3개 slug만 링크하고 미등록 Timeline 페이지는 텍스트로 유지 | dead link 없음 | none |
| REVIEW-TCP-001 | PASS | 독립 리뷰 Critical/Important 0, parent graph 범위·callback 재통과 문장 Minor 2건 반영 | runtime/coverage 과장 없음 | none |
| BUILD-TCP-001 | PASS | child-placement 전용 격리 mirror에서 final `npm run build`, `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook` 모두 exit 0 | 페이지 단위 통합 가능 | none |
| A11Y-TCP-001 | DEFERRED → PASS | 키보드·reduced-motion·320/390px·실제 select 조작 | 소유자 일괄 브라우저 검수 | 전체 페이지 완성 후 확인 |

### verificationEvidence

- source: 공식 web 개별 조회 + 원본 HTML signature·Parameters·Returns·Details·각주 추출
- probe: Node 22, GSAP 3.15.0, paused Timeline·plain object target, getter와 object identity 직접 측정
- static: 공식 63 / probe 15 / meta 63 / source 5 / 중복 0 / route 1 / TSX GSAP import 0 / missing CSS 0 / `git diff --check` PASS
- review: Critical 0 / Important 0 / Minor 3. 문장 2건은 반영했고 이전 mirror 경로 1건은 아래 전용 mirror로 교체했다. 브라우저 검수는 deferred다.
- build: 미완성 untracked 폴더를 제외한 `/tmp/fe-gsap-child-placement-Fwtf7M`에서 final `npm run build` exit 0, `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook` exit 0
- root note: 저장소 root `npm run build`는 미완성 `timeline-labels`의 없는 section 6개와 `timeline-timing-math`의 없는 section 8개 import, 총 14개 TS2307로 실패한다. `timeline-child-placement` 오류는 없다.

### releaseDecision

`PASS` — 공식 coverage·probe·정적 계약·독립 리뷰·페이지 단위 두 build를 통과했다. 브라우저 접근성·반응형 검수만 전체 페이지 일괄 단계로 deferred다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
