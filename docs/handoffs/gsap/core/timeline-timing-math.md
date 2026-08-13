# Timeline timing math handoff

## 입력 계약

### objective

Timeline의 raw duration이 children에서 파생되고, repeat·delay·timeScale·부모 배치가 duration·totalDuration·startTime·endTime·globalTime에 어떻게 반영되는지 공식 일곱 문서와 실행 probe로 가르친다.

### officialPage

- canonicalUrl: `Timeline/delay()` · `duration()` · `totalDuration()` · `startTime()` · `endTime()` · `timeScale()` · `globalTime()`
- reviewedAt: `2026-08-08`
- slug: `timeline-timing-math`
- localPath: `src/content/gsap/fundamentals/timeline-timing-math/`
- route: `/fundamentals/timeline-timing-math`

### sourceManifest

`timeline-timing-math.catalog.ts`가 공식 47개와 probe 17개의 item별 문장·source·section authority다.

| source | 공식 item | sourceStatus |
| --- | ---: | --- |
| delay | 7 | verified |
| duration | 9 | verified |
| total-duration | 8 | verified |
| start-time | 6 | verified |
| end-time | 6 | verified |
| time-scale | 6 | verified |
| global-time | 5 | verified |
| 합계 | 47 | verified |

| sourceItemIds | sourceLocation | sourceStatus |
| --- | --- | --- |
| DL-01~07 | delay signature·Parameters·Returns·Details·예제 | verified |
| DU-01~09 | duration signature·getter/setter·repeat 차이·20→10 예·코드 | verified |
| TD-01~08 | totalDuration signature·음수 설명·repeat 식 예·setter·코드 | verified |
| ST-01~06 | startTime signature·부모/delay·smoothChildTiming·코드 | verified |
| ET-01~06 | endTime signature·includeRepeats·부모 local time·timeScale·코드 | verified |
| TS-01~06 | timeScale signature·배율·중첩 4/8초·코드 | verified |
| GT-01~05 | globalTime signature·인자·반환·중첩·인자 생략 설명 | verified |

공식 일곱 URL을 개별 조회하고 HTML에서 signature·Parameters·Returns·Details·예제를 재대조했다.

### sourceBlockers

`none`.

- repeat -1의 totalDuration은 실행상 Infinity가 아니라 `10000000000`이다.
- 일반 Timeline smoothChildTiming 기본은 false이고 globalTimeline만 true다.
- paused Timeline은 endTime에서 timeScale을 1처럼 취급한다.
- `endTime()` 공식 signature의 `[Number | self]`와 달리 GSAP 3.15 타입과 실행은 Boolean 인자를 받는 Number 전용 getter다.
- 공식은 인자 없는 `globalTime()`이 `globalTime(totalTime())`과 같다고 쓰지만, 실행상 rawTime을 써 부모 playhead가 벗어나면 다르다.
- GSAP 3.15.0 타입 선언에 globalTime이 없으므로 전역 augmentation을 만들지 않는다. 이 페이지는 호출 실행 예제 대신 로컬 타입 필요성을 설명한다.

### learnerFlow

1. children이 raw 길이를 만든다.
2. 다섯 getter/setter 공통 모양을 읽는다.
3. duration과 totalDuration의 repeat 차이를 계산한다.
4. setter가 children 대신 timeScale을 바꾸는 것을 실험한다.
5. 부모 위 start/end 좌표를 계산한다.
6. timeScale과 중첩 배율을 구분한다.
7. globalTime으로 중첩을 전역 시계로 푼다.
8. 관련 페이지 경계를 확인한다.

### coverageMap

| sourceItemIds | localEvidence | localStatus |
| --- | --- | --- |
| DL-01, DL-04~07 | `ChildrenClockSection.tsx` delay 정의·immediateRender·timeScale·예제 | covered |
| DL-02~03, DU-02~03, TD-02~04, ST-02~03, TS-02~03 | `GetterSetterSection.tsx` 공통 표·NaN·getter/self·음수 문장 | covered |
| DU-01, DU-05~06, DU-09, TD-01, TD-05~06, TD-08 | `DurationTotalSection.tsx` 두 signature·repeat 공식 예·코드 | covered |
| DU-04, DU-07~08, TD-07 | `SetterScalesSection.tsx` 20→10·timeScale 설명, `DurationFitLab` | covered |
| ST-01, ST-04~06, ET-01~06 | `StartEndSection.tsx` signature·부모/delay·smooth·includeRepeats·공식 예 | covered |
| TS-01, TS-04~06 | `TimeScaleSection.tsx` 배율·2/4/8초·getter/setter 코드 | covered |
| GT-01~05 | `GlobalTimeSection.tsx` signature·인자/반환·중첩·공식 등식 | covered |
| PR-01~03 | `ChildrenClockSection.tsx` empty/child/overlap·delay probe | covered (probe) |
| PR-04~05 | `DurationTotalSection.tsx` 식·repeat -1 probe | covered (probe) |
| PR-06~09 | `SetterScalesSection.tsx` child 불변·timeScale 식·부모 폭·변경 후 깨짐 probe | covered (probe) |
| PR-10~12 | `StartEndSection.tsx` end 식·position+delay·smooth 기본 probe | covered (probe) |
| PR-13~15 | `TimeScaleSection.tsx` raw 불변·paused 예외·child 배율 probe | covered (probe) |
| PR-16~17 | `GlobalTimeSection.tsx` parent 변환 식·인자 생략 rawTime probe | covered (probe) |

## 구현 계약

### exactFiles

- create/adopt: 이 handoff와 `timeline-timing-math/` 아래 catalog·meta·page·components·sections·example 전체
- modify: `src/app/routes.ts`
- preserve: 공식 47/probe 17 catalog, meta, 공통 components와 CSS

### exampleContracts

#### DurationFitLab

- goal: repeat과 `duration(v)`를 바꾸며 raw duration·totalDuration·children은 그대로이고 timeScale·부모 endTime만 바뀌는지 관찰한다.
- controls: repeat 0/1/2, requested duration 5/10/20
- runtimeSource: `examples/DurationFitLab/useDurationFitRuntime.ts`
- runtimeOwnership: descriptor, paused parent, child Timeline, getter snapshot
- displayOwnership: TSX는 같은 descriptor 코드와 getter 표만 표시한다.
- accessibility/motion: 이산 select 결과만 status, autoplay 없음

### preserve

- repeat -1 = 10000000000
- normal smooth false / global true
- paused endTime timeScale 예외
- globalTime 공식 등식과 runtime 차이
- 공식 47 / probe 17 분리

## 검증 계약

### findings

| ID | status | evidence | requiredAction |
| --- | --- | --- | --- |
| SRC-TTM-001 | PASS | canonical 7개 + HTML 재대조 | none |
| PROBE-TTM-001 | PASS | Node22·GSAP3.15.0 9개 lab 조합·repeat -1·smooth 기본 | provenance 유지 |
| OC-TTM-001 | PASS | 공식47=meta47=coverage47, probe17, ID 중복0 | none |
| RDS-TTM-001 | PASS | descriptor→setter→getter→표/code, TSX GSAP import0 | none |
| A11Y-STATIC-TTM-001 | PASS | label/select/status, autoplay·연속 live 없음 | none |
| REVIEW-TTM-001 | PASS | Critical 0, Important 2건(endTime 공식 오류 구분·ST-06 예제 누락) 반영 | none |
| BUILD-TTM-001 | PASS | root app·Storybook final build exit 0 | none |
| A11Y-TTM-001 | DEFERRED → PASS | 브라우저 keyboard·responsive | 일괄 검수 |

### verificationEvidence

- static: official47/probe17/meta47/source7/ID중복0/route1/TSX GSAP import0
- probe: repeat 0/1/2 × duration 5/10/20, raw duration20·children10+10 불변, timeScale/endTime getter 직접 측정
- build: 저장소 root `npm run build` exit 0, `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook` exit 0
- review: official47/probe17/ID중복0, 9개 lab 조합, cleanup·주석·live region·route link 확인

### releaseDecision

`PASS` — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 재감사

- `SRC-TTM2` — **PASS**: delay·duration·totalDuration·startTime·endTime·timeScale·globalTime 공식 페이지를 다시 조회했다.
- `RDS-TTM2` — **PASS**: DurationFitLab의 descriptor·setter·getter와 표시 코드를 정적으로 대조해 BLOCK 없음.
- `PED-TTM2` — **ADDRESSED**: 첫 화면의 내부 coverage 용어를 학습 동작 중심으로 정리했다.
- `BROWSER-TTM2` — **DEFERRED**: 실제 control·키보드·반응형·motion 조작은 수행하지 않았다.
- Storybook: `N/A` — c309e13에서 의도적으로 삭제됐다.
- releaseDecision: `PASS with DEFERRED` — 정적 BLOCK은 없고 브라우저 관점만 `DEFERRED`다.

## 2026-08-13 최종 교차검토

- `RDS-TTM3` — **PASS**: DurationFit 표시 코드에 객체 target a·b와 parent cleanup을 포함해 setter·getter 예제를 재검증했다.
- Static BLOCK: 없음. Browser: 사용자 승인 전 실조작을 수행하지 않아 `DEFERRED`. Storybook: c309e13에서 삭제되어 `N/A`.
- overallDecision: `NOT VERIFIED`
- releaseDecision: `NOT VERIFIED`
