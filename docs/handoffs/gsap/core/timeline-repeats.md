# Timeline repeats handoff

## 입력 계약

### objective

Timeline의 repeat·repeatDelay·yoyo·iteration이 두 child sequence 전체에 만드는 cycle과, 부모 invalidate가 모든 child의 기록값을 지우는 전파를 공식 다섯 문서와 GSAP 3.15.0 실행으로 가르친다.

### officialPage

- canonicalUrl: `Timeline/invalidate()` · `iteration()` · `repeat()` · `repeatDelay()` · `yoyo()`
- reviewedAt: `2026-08-08`
- slug: `timeline-repeats`
- localPath: `src/content/gsap/fundamentals/timeline-repeats/`
- route: `/fundamentals/timeline-repeats`

### sourceManifest

`timeline-repeats.catalog.ts`가 공식 42개와 probe 8개의 item별 문장·source·section authority다.

| source | 공식 item | sourceStatus |
| --- | ---: | --- |
| repeat | 9 | verified |
| repeat-delay | 7 | verified |
| yoyo | 8 | verified |
| iteration | 7 | verified |
| invalidate | 11 | verified |
| 합계 | 42 | verified |

| sourceItemIds | sourceLocation | sourceStatus |
| --- | --- | --- |
| REP-01~09 | repeat signature·value/default·Returns·Details·vars/getter/setter/chaining | verified |
| RPD-01~07 | repeatDelay signature·value/default·Returns·회차 간격 예·vars/code | verified |
| YOY-01~08 | yoyo signature·value/default·Returns·방향/repeat/reversed·흐름·code | verified |
| ITR-01~07 | iteration signature·Parameters·Returns·1-based 회차·setter 예·code | verified |
| INV-01~11 | invalidate signature·Returns·초기값 flush·next render·timing·공식 예·child 전파·Note·video 경계 | verified |

공식 URL 다섯 개를 각각 조회하고 원본 HTML에서 signature·Parameters·Returns·Details·Note·code·마지막 video 문장을 두 번째로 다시 대조했다.

### sourceBlockers

`none`.

- Timeline repeatDelay 공식 기본값은 `0`이다. Tween/repeatDelay 문서의 잘못된 `NaN`을 복사하지 않는다.
- Timeline iteration 공식 문서는 `value:Number` Parameters를 게시한다. 예전 Tween 문서의 빈 signature를 복사하지 않는다.
- repeat -1의 totalDuration은 실행상 Infinity가 아니라 `10000000000`이다.
- yoyo 역회차는 child 순서를 뒤집지만 Timeline reversed property는 false로 유지된다.

### learnerFlow

1. repeat가 sequence 전체의 추가 횟수임을 안다.
2. repeatDelay가 회차 사이에만 들어감을 본다.
3. yoyo가 B→A 순서로 되감음을 관찰한다.
4. iteration을 1-based 회차로 읽고 옮긴다.
5. 부모 invalidate로 모든 child vars를 다시 해석한다.
6. 다섯 메서드의 호출 계약을 비교한다.
7. Tween·시간 계산·repeatRefresh의 경계를 확인한다.

### coverageMap

| sourceItemIds | localEvidence | localStatus |
| --- | --- | --- |
| REP-04~09 | `RepeatCountSection.tsx` 총 회차·-1·정수·yoyo/gap·공식 코드, `SequenceCycleLab` | covered |
| RPD-04~07 | `RepeatGapSection.tsx` 정의·공식 repeat2/delay1 strip·vars/getter/setter/chaining | covered |
| YOY-04~08 | `YoyoDirectionSection.tsx` 방향·repeat 필요·reversed·흐름·공식 code | covered |
| ITR-04~07 | `IterationNumberSection.tsx` 1-based·setter 예·공식 code | covered |
| INV-03~10 | `InvalidateChildrenSection.tsx` 3단계·timing·공식 0→100→200·child 전파·repeatRefresh, `InvalidateChildrenLab` | covered |
| REP-01~03, RPD-01~03, YOY-01~03, ITR-01~03, INV-01~02 | `CallFormsSection.tsx` signature·parameter/default·Returns 표 | covered |
| INV-11 | `BoundariesSection.tsx` single-Tween video 안내와 Tween 페이지 경계 | covered |
| TR-P1~02 | `RepeatCountSection.tsx` 기본 getter·totalDuration/무한 반복 | covered (probe) |
| TR-P3, TR-P5 | `IterationNumberSection.tsx` 경계/gap·setter self | covered (probe) |
| TR-P4 | `YoyoDirectionSection.tsx`·`SequenceCycleLab` B→A·reversed false | covered (probe) |
| TR-P6~08 | `InvalidateChildrenSection.tsx`·`InvalidateChildrenLab` restart counter·child 전파·timing 불변 | covered (probe) |

## 구현 계약

### exactFiles

- create/adopt: 이 handoff와 `timeline-repeats/` 아래 catalog·meta·page·components·sections·examples 전체
- modify: `src/app/routes.ts`
- preserve: Timeline 공식 42/probe 8 분리와 Tween 문서와 다른 default/signature

### exampleContracts

#### SequenceCycleLab

- goal: 두 child sequence의 repeat·repeatDelay·yoyo를 바꾸고 manual totalProgress로 A/B 값·iteration·time·reversed를 읽는다.
- controls: totalProgress, repeat 0~3, repeatDelay 0~1, yoyo
- runtimeSource: `examples/SequenceCycleLab/useSequenceCycleRuntime.ts`
- runtimeOwnership: descriptor, paused two-child Timeline, totalProgress setter, Timeline getter와 target property snapshot
- displayOwnership: TSX는 같은 descriptor와 observation으로 cycle strip·readout·code를 만든다.
- accessibility/motion: autoplay 없음, 모든 이동은 manual slider, reduced motion은 장식 transition만 제거

#### InvalidateChildrenLab

- goal: restart만 할 때와 부모 invalidate 뒤 render할 때 두 child function counter가 모두 다시 실행되는지 비교한다.
- controls: restart render, parent invalidate render, reset
- runtimeSource: `examples/InvalidateChildrenLab/useInvalidateChildrenRuntime.ts`
- runtimeOwnership: paused parent, child function values, counter, progress render, target/timing getter snapshot
- displayOwnership: TSX는 runtime rows와 selector로 table·status·code를 만든다.
- accessibility/motion: 이산 버튼 결과만 status, autoplay·시간 기반 animation 없음

### preserve

- Timeline repeatDelay default 0
- Timeline iteration(value:Number)
- repeat -1 totalDuration 10000000000
- yoyo child reverse order / reversed false
- parent invalidate child propagation

## 검증 계약

### findings

| ID | status | evidence | requiredAction |
| --- | --- | --- | --- |
| SRC-TR-001 | PASS | canonical 5개 + 원본 HTML 2차 대조 | none |
| PROBE-TR-001 | PASS | Node22·GSAP3.15.0 defaults·cycle samples·invalidate counter | provenance 유지 |
| OC-TR-001 | PASS | 공식42=meta42=coverage42, probe8, ID 중복0 | none |
| RDS-TR-001 | PASS | descriptor→Timeline→getter rows/code, TSX GSAP import0 | none |
| A11Y-STATIC-TR-001 | PASS | label/button/status, autoplay·연속 live 없음 | none |
| REVIEW-TR-001 | PASS | Critical 0, Important 2건(INV 공식 예·suppressEvents code sync) 반영 | none |
| BUILD-TR-001 | PASS | root app·Storybook final build exit 0 | none |
| A11Y-TR-001 | DEFERRED → PASS | 브라우저 keyboard·responsive | 일괄 검수 |

### verificationEvidence

- static: official42/probe8/meta42/source5/ID중복0/route1/TSX GSAP import0
- probe: default 0/0/false/1, two-child yoyo samples, iteration boundary, counter 2→2→4, timing unchanged
- build: 저장소 root `npm run build` exit 0, `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook` exit 0
- review: official42/probe8 근거, default·1e10·B→A·counter 2→2→4, cleanup·주석·live·links 확인

### releaseDecision

`PASS` — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
