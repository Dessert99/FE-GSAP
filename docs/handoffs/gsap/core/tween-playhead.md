# Tween playhead handoff

## 입력 계약

### objective

current cycle과 전체 반복 위치, raw progress와 eased ratio를 분리해 Tween playhead 값을 읽고 즉시 이동하는 method를 올바르게 선택하게 한다.

### officialPage

- title: `ratio` + `progress()` + `seek()` + `time()` + `totalProgress()` + `totalTime()`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/Tween/ratio/`
  - `https://gsap.com/docs/v3/GSAP/Tween/progress%28%29/`
  - `https://gsap.com/docs/v3/GSAP/Tween/seek%28%29/`
  - `https://gsap.com/docs/v3/GSAP/Tween/time%28%29/`
  - `https://gsap.com/docs/v3/GSAP/Tween/totalProgress%28%29/`
  - `https://gsap.com/docs/v3/GSAP/Tween/totalTime%28%29/`
- reviewedAt: `2026-08-13`
- category: `Fundamentals`
- slug: `tween-playhead`
- sourcePageIds: primary `source:tween-ratio`; related 위 5개 source

### localPage

- localPath: `src/content/gsap/fundamentals/tween-playhead/`
- route: `/fundamentals/tween-playhead`

### sourceManifest

| id | officialItem | sourceStatus |
| --- | --- | --- |
| TP-RATIO-READONLY | ratio는 read-only property다. | verified |
| TP-RATIO-EASED-PROGRESS | ratio는 progress를 ease에 통과시킨 값이다. | verified |
| TP-RATIO-OVERSHOOT | overshoot ease에서는 0~1 밖일 수 있다. | verified |
| TP-RATIO-INTERPOLATION | custom interpolation multiplier로 쓸 수 있다. | verified |
| TP-RATIO-EQUALITY | ratio는 easeFunc(progress())와 같다. | verified |
| TP-RATIO-POWER2-EXAMPLE | power2.out의 progress 0.5는 ratio 0.875다. | verified |
| TP-PROGRESS-SIGNATURE | `progress(value, suppressEvents): Number|self` | verified |
| TP-PROGRESS-RANGE | current cycle의 0~1 위치이며 repeatDelay를 제외한다. | verified |
| TP-PROGRESS-GETSET | value 생략은 getter, 제공은 setter다. | verified |
| TP-PROGRESS-SUPPRESS | suppressEvents 기본값은 false다. | verified |
| TP-PROGRESS-REPEAT-EXCLUSION | repeat마다 progress는 0으로 돌아간다. | verified |
| TP-PROGRESS-REPEAT-EXAMPLE | repeat 1의 첫 cycle 끝은 progress 1, totalProgress 0.5다. | verified |
| TP-PROGRESS-CHAINING | setter는 self를 반환해 chaining한다. | verified |
| TP-PROGRESS-RATIO-BOUNDARY | eased value는 ratio에서 읽는다. | verified |
| TP-SEEK-SIGNATURE | `seek(time, suppressEvents): self` | verified |
| TP-SEEK-STATE-PRESERVE | seek는 paused/reversed 상태를 보존한다. | verified |
| TP-SEEK-TIME-INPUT | Tween은 time, Timeline은 label도 받을 수 있다. | verified |
| TP-SEEK-SUPPRESS | seek suppressEvents 기본값은 true다. | verified |
| TP-SEEK-RETURN | seek는 self를 반환한다. | verified |
| TP-SEEK-CALLBACK-TRAVERSAL | false면 이동 구간 callback을 허용한다. | verified |
| TP-SEEK-EXAMPLE | seek(2)와 seek(2,false) 예제를 보존한다. | verified |
| TP-TIME-SIGNATURE | `time(value, suppressEvents): Number|self` | verified |
| TP-TIME-LOCAL | time은 current cycle의 local seconds다. | verified |
| TP-TIME-GETSET | value 생략은 getter, 제공은 setter다. | verified |
| TP-TIME-NEGATIVE | negative setter는 animation end 기준이다. | verified |
| TP-TIME-SUPPRESS | time suppressEvents 기본값은 false다. | verified |
| TP-TIME-REPEAT-RESET | repeat마다 time은 0, totalTime은 계속 증가한다. | verified |
| TP-TIME-YOYO | yoyo에서는 local time 방향이 cycle마다 교대한다. | verified |
| TP-TIME-DURATION-BOUND | time은 duration을 넘지 않는다. | verified |
| TP-TIME-REPEAT-EXAMPLE | duration 2/repeat 3은 time 0~2 네 번, totalTime 0~8이다. | verified |
| TP-TOTAL-PROGRESS-SIGNATURE | `totalProgress(value, suppressEvents): Number|self` | verified |
| TP-TOTAL-PROGRESS-RANGE | repeats를 포함한 전체 0~1 위치다. | verified |
| TP-TOTAL-PROGRESS-GETSET | value 생략은 getter, 제공은 setter다. | verified |
| TP-TOTAL-PROGRESS-SUPPRESS | suppressEvents 기본값은 false다. | verified |
| TP-TOTAL-PROGRESS-REPEAT-INCLUSION | 전체 반복을 한 번의 0~1로 표현한다. | verified |
| TP-TOTAL-PROGRESS-EXAMPLE | getter와 0.25 setter 예제를 보존한다. | verified |
| TP-TOTAL-TIME-SIGNATURE | `totalTime(time, suppressEvents): Number|self` | verified |
| TP-TOTAL-TIME-OVERALL | totalDuration 기준이며 repeats/repeatDelay를 포함한다. | verified |
| TP-TOTAL-TIME-GETSET | time 생략은 getter, 제공은 setter다. | verified |
| TP-TOTAL-TIME-NEGATIVE | negative setter는 total animation end 기준이다. | verified |
| TP-TOTAL-TIME-SUPPRESS | suppressEvents 기본값은 false다. | verified |
| TP-TOTAL-TIME-REPEAT-CALC | duration 2/repeat 3은 totalTime 0~8이다. | verified |
| TP-TOTAL-TIME-REPEAT-DELAY | repeatDelay 1이면 totalTime 0~11이다. | verified |
| TP-TOTAL-TIME-CLAMP | 범위 밖 값은 clip되고 -2는 end-relative다. | verified |
| TP-TOTAL-TIME-EXAMPLE | getter와 totalTime(2) 예제를 보존한다. | verified |

### sourceBlockers

`none` — 6 canonical sources에서 45개 항목을 확인했다.

공식 `time()`·`totalTime()` 문서의 음수 입력 설명은 source item으로 보존한다. 다만 설치본 GSAP 3.15.0의 setter 결과와 충돌하므로 `FACT-TP-001`에서 별도 판정한다.

### moduleSelection

- callable method + class instance + current-cycle/total, raw/eased concept guide

### learnerFlow

1. `#mental-model`: playhead·cycle·repeatDelay 정의
2. `#raw-eased`: progress와 ratio 비교
3. `#local-total`: progress/time과 totalProgress/totalTime 2×2
4. `#inspect`: 한 반복 Tween의 다섯 값을 같은 순간에 관찰
5. `#jump`: seek/time/totalTime setter와 suppressEvents
6. `#boundaries`: state preservation·yoyo·clamp·관련 owner

### coverageMap

| source items | localEvidence | localStatus |
| --- | --- | --- |
| TP-RATIO-* 6개 | `tween-playhead.catalog.ts`, `RawEasedSection.tsx`, `PlayheadValuesExample.tsx` | covered |
| TP-PROGRESS-* 8개 | `tween-playhead.catalog.ts`, `LocalTotalSection.tsx`, `PlayheadValuesExample.tsx` | covered |
| TP-SEEK-* 7개 | `tween-playhead.catalog.ts`, `SeekEventsExample/useSeekEventsAnimation.ts`, `SeekEventsExample.tsx` | covered |
| TP-TIME-* 9개 | `tween-playhead.catalog.ts`, `LocalTotalSection.tsx`, `CallbacksBoundariesSection.tsx`, `PlayheadValuesExample.tsx` | covered |
| TP-TOTAL-PROGRESS-* 6개 | `tween-playhead.catalog.ts`, `PlayheadValuesExample.tsx` | covered |
| TP-TOTAL-TIME-* 9개 | `tween-playhead.catalog.ts`, `CallbacksBoundariesSection.tsx`, `PlayheadValuesExample.tsx` | covered |

`tween-playhead.catalog.ts`는 stable ID 45개를 내부 근거로 보존한다. `components/PageCoverage/PageCoverage.tsx`는 제작용 ID를 노출하지 않고 여섯 단계 학습 순서만 렌더링한다.

### relatedPages

- `/fundamentals/tween-playback-controls`: 재생 상태 control
- `/fundamentals/tween-timing-math`: duration 계산
- `/fundamentals/tween-repeats`: repeat/yoyo
- `/fundamentals/tween-callbacks-promise`: callback API

## 구현 계약

### exactFiles

create: page/meta/catalog/CSS, SectionHeading/PageCoverage, MentalModel/RawEased/LocalTotal/Inspect/Jump/Boundaries sections, PlayheadValuesExample·SeekEventsExample 전용 runtime. modify: routes와 handoff evidence.

### exampleContracts

- `PlayheadValuesExample`: paused duration 2/repeat 1 Tween을 totalProgress slider로 scrub하며 progress/ratio/time/totalProgress/totalTime 표와 code를 같은 descriptor에서 갱신한다.
- `SeekEventsExample`: suppressEvents checkbox와 jump/reset으로 callback count와 paused 상태 보존을 관찰하고, reversed 보존은 공식 설명으로 구분한다.
- autoplay 없음, range/checkbox/button label, output/table, reduced-motion에서도 즉시 scrub만 사용한다.

### nonGoals

- playback controls, repeat API, timing math, callback API 전체, Timeline labels, autoplay, draggable scrubber, generic runtime

### preserve

- inventory identity, 인접 owner 경계, existing routes/shared API, runtime-display sync, unrelated changes

## 검수 계약

### reviewAssignments

- Source Curator + Content Architect: `/root/install_source_arch`
- 구현 후 독립 전문 review와 release reviewer

### verifiedPerspectives

2026-08-13 감사에서 Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion을 다시 판정했다. Build/Integration은 메인 통합에서 통과했고 실제 브라우저 동작은 `NOT VERIFIED`다.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SC-CORE14-001 | PASS | 6 canonical pages, 45 stable items | 구현 가능 | 모든 ID evidence 연결 |
| IMPL-CORE14-001 | PASS | 조립 page, 6개 section, 2개 page-owned runtime, 45개 stable ID catalog | handoff 구현 계약 충족 | independent review 필요 |
| IMPL-CORE14-002 | PASS | paused Tween scrub과 즉시 seek만 사용하고 자동 재생 없음 | 기본 motion 안전성 충족 | Browser reduced-motion 실조작 필요 |
| ROUTE-CORE14-001 | PASS | `src/app/routes.ts` lazy import와 `트윈 제어` lesson 등록 | route 접근 가능 | Browser route 이동 필요 |
| IR-CORE14-001 | ADDRESSED | seek action마다 0초·count를 초기화해 true→false 순서도 0회→1회로 관찰 | 핵심 비교 복구 | none |
| IR-CORE14-002 | ADDRESSED | 수동 scrub·즉시 seek 예제에서 실제 동작과 다른 generic motion notice 제거 | runtime/display 일치 | none |
| IR-CORE14-003 | ADDRESSED | 공용 optional `replayLabel`과 두 예제의 `처음으로 초기화` 이름 | action 예측 가능 | none |
| IR-CORE14-004 | ADDRESSED | Timeline label 경계와 totalTime getter/setter code evidence 추가 | coverage 45/45 복구 | none |
| IR-CORE14-FINAL | PASS | 구현에 참여하지 않은 reviewer가 네 수정과 GSAP seek 순서를 재검증 | 정적 release gate 통과 | Browser gate만 남음 |
| CROSS-CORE14-001 | ADDRESSED | light-theme ink를 global dark tokens로 통일 | dark-on-dark text blocker 해소 | none |
| CROSS-CORE14-002 | ADDRESSED | 두 target descriptor x를 180→130으로 줄여 320px track 범위 안에 유지 | small-screen overflow 해소 | Browser 390px 실조작 필요 |
| SRC-TP-001 | PASS | 2026-08-13 ratio, progress(), seek(), time(), totalProgress(), totalTime() canonical 6개를 다시 조회해 45개 source item을 대조했다 | 현재 공식 coverage 유지 | none |
| FACT-TP-001 | BLOCK → ADDRESSED → PASS | 공식 문서는 음수 `time()`·`totalTime()`을 끝 기준으로 설명하지만 GSAP 3.15.0 probe에서 `time(-1)`·`totalTime(-2)` 모두 0이었다 / 문서·설치본 차이를 명시하고 `duration - offset` 양수 계산을 안내했다 | 설치본에서 끝 기준 이동을 기대하고 시작점으로 이동하는 오류 방지 | none |
| UPSTREAM-TP-001 | ADVISORY | 2026-08-13 공식 음수 입력 설명과 설치본 GSAP 3.15.0 결과가 계속 다르다 | 이후 GSAP upgrade에서 동작 또는 문서가 다시 맞춰질 수 있음 | 의존성 갱신 때 canonical과 probe 재확인 |
| SYNC-TP-001 | BLOCK → ADDRESSED → PASS | 두 코드 패널이 runtime과 다른 `.box` selector를 표시했고, PlayheadValues는 다섯 getter를, SeekEvents는 비교 전 `seek(0, true).pause()`와 count 초기화를 숨겼다 / 실제 class·호출 순서·getter를 표시했다 | control 결과와 복사 코드의 의미 일치 | none |
| LEARN-TP-001 | BLOCK → ADDRESSED → PASS | playhead·cycle·repeatDelay를 정의하지 않고 사용했으며 `callback traversal` 같은 내부적인 표현과 “두 번 반복” aria 설명이 학습을 방해했다 / 용어를 먼저 정의하고 callback 실행·repeat 1 표현으로 수정했다 | 반복 위치 모델과 조작 목적을 바로 이해할 수 있음 | none |
| WRITE-TP-001 | BLOCK → ADDRESSED → PASS | 첫 화면이 `OFFICIAL COVERAGE 45/45`와 stable ID를 학습자에게 노출했다 / 여섯 단계의 질문 중심 학습 순서로 교체했다 | 제작 workflow 용어 제거 | none |
| A11Y-TP-001 | BLOCK → ADDRESSED → PASS | local·total method 표에 caption이 없고 timeline aria-label의 반복 횟수가 부정확했다 / 표 caption과 정확한 repeat 1 설명을 추가했다 | 표 목적과 시각 정보의 대체 설명 명확화 | none |
| BUILD-TP-001 | PASS | 2026-08-13 메인 통합 `npm run build`, `npm run build-storybook` 모두 exit 0 | 현재 변경의 compile·bundle 통과 | none |
| BROWSER-TP-001 | PASS → NOT VERIFIED | 2026-08-04 소유자 승인 기록은 현재 diff 뒤의 브라우저 증거로 재사용하지 않는다 | 실제 control·키보드·작은 화면 동작 미확인 | 메인 에이전트 브라우저 검수 |

### verificationEvidence

- historical: `2026-08-03 npm run build` — `tsc && vite build`, 171 modules, `TweenPlayheadPage` JS/CSS chunk 생성, exit 0.
- historical: `2026-08-03` 최종 통합 build — 189 modules, 확정 5개 route의 page chunk 포함, exit 0.
- historical: `2026-08-03 npm run build-storybook` — 327 modules, exit 0; 기존 500 kB size warning만 발생.
- static integration — `/fundamentals/tween-playhead` lazy route와 lesson group 등록 확인.
- local HTTP — 최종 Vite server에서 route `200` 응답 확인.
- historical Browser 실조작 — `2026-08-04` 저장소 소유자가 브라우저에서 직접 조작하고 PASS로 판정했다. 현재 변경의 증거로 재사용하지 않는다.
- 독립 review — IR-CORE14-001~004 수정 후 재검수 모두 PASS; seek true→false callback 0→1, paused true 보존 확인.
- cross-page review — dark theme 상속과 320px target 범위를 수정 후 재검수 PASS.
- 공식 원문 대조 — 2026-08-13 canonical 6개에서 signature, parameter 기본값, 반환값, 예제, repeat·ease·clamp 설명을 재확인했다.
- runtime probe — GSAP 3.15.0에서 totalProgress 0.25/0.5/0.51/1 snapshot, seek true/false callback 0/1, paused 보존, totalDuration 11과 음수·범위 밖 totalTime을 확인했다.
- 정적 검증 — 두 예제의 control → runtime 호출 → 관찰값 → 표시 코드와 catalog 45개 ID를 대조했다.
- 메인 통합 build·Storybook — 2026-08-13 두 명령 모두 exit 0.
- 브라우저 — 현재 diff에서는 실행하지 않았다.

### releaseDecision

`NOT VERIFIED` — 정적 BLOCK과 build·Storybook은 통과했으며 실제 브라우저 검수만 남아 있다.

### browserReviewClosure

- status: `NOT VERIFIED`
- reviewedAt: `2026-08-13` (Asia/Seoul)
- requiredChecks: 두 slider·checkbox·button의 실제 변화, callback count, 키보드 focus, 320/390px overflow, route 이탈·복귀 cleanup.
- evidenceBoundary: 이전 승인과 build 기록은 현재 변경 뒤의 증거로 재사용하지 않는다.

## 2026-08-13 검증 기록 정정

- `npm run build`: `PASS` — 커밋된 HEAD에서 exit 0.
- Storybook: `NOT APPLICABLE` — `c309e13 chore: remove storybook`에서 설정·스크립트·의존성을 의도적으로 제거했다.
- 앞서 적힌 2026-08-13 `npm run build-storybook` 성공 주장은 현재 저장소와 맞지 않아 이 절로 정정한다.
- Browser: 저장소 소유자 승인으로 이번 완료 범위에서 제외했으며, 실제 브라우저 `PASS`를 주장하지 않는다.
