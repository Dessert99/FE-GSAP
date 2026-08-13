# Timeline labels handoff

## 입력 계약

### objective

Timeline local time에 이름을 붙이고, 현재·앞뒤 label을 묻고, 이름으로 seek하고, label을 제거하는 전체 계약을 공식 일곱 문서와 GSAP 3.15.0 실행 차이까지 포함해 가르친다.

### officialPage

- title: `Timeline.labels` + `addLabel()` + `currentLabel()` + `nextLabel()` + `previousLabel()` + `removeLabel()` + `seek()`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/Timeline/labels`
  - `https://gsap.com/docs/v3/GSAP/Timeline/addLabel()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/currentLabel()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/nextLabel()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/previousLabel()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/removeLabel()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/seek()`
- reviewedAt: `2026-08-08`
- category: `GSAP > Timeline`
- slug: `timeline-labels`

### localPage

- localPath: `src/content/gsap/fundamentals/timeline-labels/`
- route: `/fundamentals/timeline-labels`

### sourceManifest

`timeline-labels.catalog.ts`가 공식 item 76개와 probe 20개의 전체 문장·source·section 귀속 authority다.

| source | 공식 item | sourceStatus |
| --- | ---: | --- |
| `labels` | 5 | verified |
| `add-label` | 29 | verified |
| `current-label` | 6 | verified |
| `next-label` | 8 | verified |
| `previous-label` | 8 | verified |
| `seek` | 14 | verified |
| `remove-label` | 6 | verified |
| 합계 | 76 | verified |

| sourceItemIds | sourceLocation | sourceStatus |
| --- | --- | --- |
| LBL-01~05 | `labels` signature·Details·공식 addLabel/console 예제 | verified |
| ADD-01~08 | `addLabel()` signature·Parameters·Returns·Details·참조 예 | verified |
| ADD-09~20 | `addLabel()` Positioning의 초·label·relative 표기 | verified |
| ADD-21~29 | `addLabel()` 퍼센트 표기·각주·interactive 자료 안내 | verified |
| CUR-01~06 | `currentLabel()` signature·Parameters·Returns·getter/setter Details | verified |
| NXT-01~08 | `nextLabel()` 전체와 tweenTo 공식 예제 | verified |
| PRV-01~08 | `previousLabel()` 전체와 tweenTo 공식 예제 | verified |
| SEK-01~10 | `seek()` signature·override·Parameters·Returns | verified |
| SEK-11~14 | `seek()` suppressEvents Details·record player 비유·공식 예제 | verified |
| REM-01~06 | `removeLabel()` signature·설명·Parameters·Returns·Details·예제 | verified |

일곱 canonical을 개별 조회한 뒤 원본 HTML에서 signature·Parameters·Returns·Details·예제·position 각주를 다시 추출했다. 특히 `removeLabel()`의 설명·Returns·예제 주석 세 위치와 `addLabel()`의 퍼센트/previous 각주를 별도로 재대조했다.

### sourceBlockers

`none`.

- `removeLabel()` 공식 설명과 예제 주석은 label time 반환이라고 쓰지만 signature·Returns와 GSAP 3.15.0 실행은 self 반환이다. 실행 결과를 의도대로 보존하고 공식 오류로 명시한다.
- `addLabel()`은 animation용 퍼센트 position 설명을 그대로 싣지만 label에는 삽입 animation duration이 없다. 실행상 `"+=50%"`는 `"+=50"`과 같은 54, `"-=25%"`는 -21이므로 공식과 다르게 표시한 probe를 되돌리지 않는다.
- 없는 label 이름은 addLabel reference·currentLabel setter·seek에서 오류가 아니라 Timeline 끝의 새 label이 된다. 오타 위험을 경고한다.
- label은 소유 Timeline의 local time이며 parent time으로 환산하지 않는다.

### moduleSelection

- property — `labels` object의 key/value와 insertion order를 설명한다.
- callable methods — 여섯 label/seek method의 signature·인자·반환·경계를 보존한다.
- concept/guide — 숫자 시각 대신 의미 있는 이름을 쓰는 유지보수 이유를 설명한다.
- interactive method — 실제 getter와 seek·suppressEvents callback을 한 label 지도에서 관찰한다.

### learnerFlow

1. label이 이름→local time 지도임을 이해한다.
2. addLabel()로 이름을 만들고 참조한다.
3. position 문법과 label 퍼센트 예외를 구분한다.
4. current·next·previousLabel로 local time 앞뒤를 묻는다.
5. seek로 이름에 이동하고 suppressEvents를 비교한다.
6. removeLabel의 공식 오류와 실제 self 반환을 구분한다.
7. child 배치·callback·Timeline 상세의 후속 소유권을 확인한다.

### coverageMap

| sourceItemIds | localEvidence | localStatus |
| --- | --- | --- |
| LBL-01~05 | `LabelMapSection.tsx` declaration·공식 예제·key/value 설명 | covered |
| ADD-01~08 | `AddLabelSection.tsx` signature·인자·기본값·self·참조 3개·add 대안 | covered |
| ADD-09~29 | `LabelPositionSection.tsx` 공식 15표기·퍼센트·version/previous 각주·interactive 안내 | covered |
| CUR-01~06, NXT-01~08, PRV-01~08 | `LabelNavigationSection.tsx` 세 signature·getter/setter·local time·exact 경계·tweenTo 예제 | covered |
| SEK-01~14 | `SeekByNameSection.tsx` signature·position·suppressEvents·비유·공식 3예제, `LabelNavigatorLab` | covered |
| REM-01~06 | `RemoveLabelSection.tsx` 공식 설명/Returns/예제 충돌·remove 대안 | covered |
| PB-01~02, PB-20 | `LabelMapSection.tsx` plain object·insertion order·local time probe | covered (probe) |
| PB-03~04 | `AddLabelSection.tsx` self·생략·overwrite probe | covered (probe) |
| PB-06, PB-09, PB-18 | `LabelPositionSection.tsx` 없는 reference·퍼센트 예외·duration 밖 label probe | covered (probe) |
| PB-08, PB-10~14, PB-19 | `LabelNavigationSection.tsx` undefined·없는 setter·시간순·reversed·tweenTo(undefined) probe | covered (probe) |
| PB-07, PB-15~17 | `SeekByNameSection.tsx` 없는 이름·즉시 render·끝 기준/clamp·callback probe | covered (probe) |
| PB-05 | `RemoveLabelSection.tsx` self identity·없는 label probe | covered (probe) |

### relatedPages

- `timeline-child-placement` — parent local time와 position 기준을 소유한다.
- `timeline-callbacks-pauses` — callback을 label 위치에 놓는 상세를 소유한다.
- `timeline-basics` — Timeline container 입문을 소유한다.
- 미등록 Timeline inspection·playhead·timing·repeat 페이지에는 링크하지 않는다.

## 구현 계약

### exactFiles

- create/adopt: 이 handoff와 `src/content/gsap/fundamentals/timeline-labels/` 아래 catalog·meta·page·components·sections·example 전체
- modify tracked file: `src/app/routes.ts`
- preserve while completing: 공식 76/probe 20 catalog, meta, `LabelMapSection`, 공통 components와 CSS

### exampleContracts

#### LabelNavigatorLab

- goal: paused Timeline의 label 사이를 이동하며 current·previous·next getter, seek render, suppressEvents callback을 실제 값으로 관찰한다.
- question: label로 이동하면 playhead·target 값·앞뒤 label·중간 callback은 어떻게 바뀌나요?
- representation: label select, suppress checkbox, 이동 buttons, ruler, getter 5개, action code
- controls: label select, suppressEvents checkbox, selected/previous/next seek, reset
- runtimeSource/sourcePath: `examples/LabelNavigatorLab/useLabelNavigatorRuntime.ts`
- runtimeOwnership: label descriptor, paused Timeline, plain object Tween, getters, callback count, last action
- displayOwnership: TSX는 runtime readout과 action code만 표시한다.
- accessibility: control 결과와 callback count만 `role="status"`; 연속 frame 값 없음
- motion: autoplay 없음. playhead CSS transition만 reduced-motion에서 제거한다.

### nonGoals

- Timeline을 실제 시간에 따라 재생하거나 tweenTo animation을 lab에서 시작하지 않는다.
- label을 parent Timeline 시간으로 환산하지 않는다.
- 미등록 slug로 링크하지 않는다.

### preserve

- removeLabel 공식 label time 문장/예제와 실제 self 반환 차이
- addLabel 퍼센트 공식 설명과 실행값 차이
- 없는 label 이름의 자동 생성
- 공식 76 / probe 20 분리

## 검증 계약

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-TL-001 | PASS | canonical 7개 개별 조회 + 원본 HTML 재대조 | source 구현 가능 | none |
| PROBE-TL-001 | PASS | Node 22·GSAP 3.15.0에서 percent·navigation·seek callback·remove self 등 재측정 | 공식 오류/침묵 분리 | provenance 유지 |
| OC-TL-001 | PASS | 공식 76 = meta 76 = coverage 76, source 7, ID 중복 0 | 전체 귀속 | none |
| RDS-TL-001 | PASS | runtime label descriptor·getter·action과 ruler/code 연결, TSX GSAP import 0 | 실행/표시 동기화 | none |
| A11Y-STATIC-TL-001 | PASS | form label·button·heading·caption, 이산 status, reduced-motion transition 제거 | 정적 계약 충족 | none |
| XPAGE-TL-001 | PASS | 등록된 3개 slug만 링크 | dead link 없음 | none |
| REVIEW-TL-001 | PASS | Critical/Important 0, ADD-05 섹션 귀속 보강, 중복 CSS Minor 제거 | runtime·coverage 과장 없음 | none |
| BUILD-TL-001 | PASS | labels 전용 격리 mirror의 final app·Storybook build 모두 exit 0 | 페이지 단위 통합 가능 | none |
| A11Y-TL-001 | DEFERRED → PASS | keyboard·320/390px·실제 control 조작 | 일괄 브라우저 검수 | 전체 페이지 후 확인 |

### verificationEvidence

- source: 공식 HTML signature·Parameters·Returns·Details·각주 추출
- probe: percent labels 54/-21/1, navigation insertion/time order, seek callback 0/1, remove self true
- static: 공식 76 / probe 20 / meta 76 / source 7 / ID 중복 0 / route 1 / TSX GSAP import 0 / `git diff --check` PASS
- review: Critical 0 / Important 1 후보는 ADD-05 local evidence를 보강해 해소 / Minor 1 중복 CSS 제거
- build: `/tmp/fe-gsap-timeline-labels-z2cMPk`에서 final `npm run build` exit 0, `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook` exit 0
- root note: 저장소 root build는 미완성 `timeline-timing-math`의 없는 section import 8건으로만 실패하며 timeline-labels 오류는 없다.

### releaseDecision

`PASS` — 공식 coverage·probe·독립 리뷰·페이지 단위 두 build를 통과했다. 브라우저 접근성·반응형 검수만 전체 페이지 일괄 단계로 deferred다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
