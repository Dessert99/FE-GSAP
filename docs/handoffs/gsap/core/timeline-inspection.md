# Timeline inspection handoff

## 입력 계약

### objective

중첩 Timeline의 child를 종류·깊이·시각, id, target으로 조회하고 각 animation에 남는 `data`와 선택적 `scrollTrigger`를 읽는 법을 공식 다섯 문서와 GSAP 3.15.0 실행 probe로 가르친다.

### officialPage

- canonicalUrl: `Timeline/data` · `scrollTrigger` · `getById()` · `getChildren()` · `getTweensOf()`
- reviewedAt: `2026-08-08`
- slug: `timeline-inspection`
- localPath: `src/content/gsap/fundamentals/timeline-inspection/`
- route: `/fundamentals/timeline-inspection`

### sourceManifest

`timeline-inspection.catalog.ts`가 공식 36개와 probe 10개의 item별 문장·source·section authority다.

| source | 공식 item | sourceStatus |
| --- | ---: | --- |
| data | 3 | verified |
| get-children | 13 | verified |
| get-by-id | 7 | verified |
| get-tweens-of | 8 | verified |
| scroll-trigger | 5 | verified |
| 합계 | 36 | verified |

| sourceItemIds | sourceLocation | sourceStatus |
| --- | --- | --- |
| TD-01~03 | data signature·임의 값·vars.data 초기화 | verified |
| GC-01~13 | getChildren signature·Parameters 네 행·Returns·Details·callback·공식 예제 세 호출 | verified |
| GI-01~07 | getById signature·인자·Returns·first descendant·framework·예제 | verified |
| GT-01~08 | getTweensOf signature·target/nested·Returns·Details·예제 두 호출 | verified |
| ST-01~05 | scrollTrigger 타입·optional 조건·warning·refresh/kill 예제·plugin 경계 | verified |

공식 URL 다섯 개를 개별 조회한 뒤 원본 HTML에서 signature·Parameters·Returns·Details·warning·예제를 두 번째로 다시 대조했다.

### sourceBlockers

`none`.

- getChildren 공식 예제의 첫 결과 주석은 `3`이지만 코드대로 실행하면 직계 Tween 3개 + Timeline 1개로 `4`다.
- getChildren의 `ignoreBeforeTime` 공식 기본 표기는 `-Infinity`지만 실행 기본값은 `-1e8`이다.
- getById 공식은 첫 descendant를 돌려준다고 쓰지만 중복 id 실행은 평탄화 목록의 마지막 일치를 돌려준다.
- getTweensOf 공식의 두 번째 인자는 `nested`지만 실행은 `onlyActive` Boolean/숫자 global time처럼 동작하고 중첩 탐색은 항상 수행한다.

### learnerFlow

1. 중첩 Timeline을 object graph로 읽는다.
2. getChildren의 네 인자로 결과 배열을 좁힌다.
3. getById로 descendant 하나를 찾는다.
4. getTweensOf로 target에서 Tween을 역조회한다.
5. data에 앱 metadata를 붙인다.
6. optional scrollTrigger driver를 읽는다.
7. local 조회와 전역 조회·구조 변경의 경계를 확인한다.

### coverageMap

| sourceItemIds | localEvidence | localStatus |
| --- | --- | --- |
| GC-02, GC-09~10 | `NestedTreeSection.tsx` tree·array 정의·callback·공식 구조 코드 | covered |
| GC-01, GC-03~08, GC-11~13 | `GetChildrenSection.tsx` signature·대조 표, `ChildQueryLab` Parameters·실행 목록 | covered |
| GI-01~07 | `GetByIdSection.tsx` signature·first/framework·공식 예, `IdLookupLab` | covered |
| GT-01~08 | `GetTweensOfSection.tsx` signature·target/nested·Returns·공식 예 | covered |
| TD-01~03 | `DataSection.tsx` signature·임의 metadata·vars.data 초기화 | covered |
| ST-01~05 | `ScrollTriggerSection.tsx` 타입·optional warning·refresh/kill·plugin 경계 | covered |
| TI-P1~03, TI-P10 | `GetChildrenSection.tsx`·`ChildQueryLab` 직계 필터·재귀·4/5/5·-1e8 | covered (probe) |
| TI-P4~05 | `GetByIdSection.tsx`·`IdLookupLab` 마지막 일치·엄격 비교·undefined | covered (probe) |
| TI-P6 | `GetTweensOfSection.tsx` onlyActive·숫자 global time·항상 중첩 | covered (probe) |
| TI-P7 | `DataSection.tsx` data 자리·vars 초기값 보존 | covered (probe) |
| TI-P8 | `ScrollTriggerSection.tsx` property 자체 부재 | covered (probe) |
| TI-P9 | `NestedTreeSection.tsx` 새 결과 배열 | covered (probe) |

## 구현 계약

### exactFiles

- create/adopt: 이 handoff와 `timeline-inspection/` 아래 catalog·meta·page·components·sections·examples 전체
- modify: `src/app/routes.ts`
- preserve: 공식 36/probe 10 catalog와 두 runtime hook의 tree/query 단일 소스 구조

### exampleContracts

#### ChildQueryLab

- goal: nested·tweens·timelines·ignoreBeforeTime을 바꾸며 같은 object graph의 반환 배열만 달라지는지 관찰한다.
- controls: Boolean 세 개, ignoreBeforeTime 미지정/0/0.5/1/2/3/4, progress slider, motion 허용 시 play/pause
- runtimeSource: `examples/ChildQueryLab/useChildQueryAnimation.ts`
- runtimeOwnership: step descriptor, master/detail Timeline, getChildren 인자와 실제 결과 instance 배열
- displayOwnership: TSX는 같은 step·args·result index로 tree 강조와 표시 코드를 만든다.
- accessibility/motion: 연속 progress는 live 밖, 이산 query count만 status, 기본 paused, reduced motion에서는 play/pause 숨김

#### IdLookupLab

- goal: 중복·중첩·숫자·문자열·없는 id 후보로 실제 getById 반환 instance를 확인한다.
- controls: id 후보 6개 버튼
- runtimeSource: `examples/IdLookupLab/useIdLookupRuntime.ts`
- runtimeOwnership: 중복 id tree, id candidate, getById 호출, match count, 반환 index
- displayOwnership: TSX는 candidate literal과 반환 index로 코드·tree 강조·status를 만든다.
- accessibility/motion: 이산 버튼 결과만 status, autoplay와 animation 없음

### preserve

- 공식 getChildren 예제 `3` / 실행 `4`
- 공식 ignoreBeforeTime `-Infinity` / 실행 `-1e8`
- 공식 getById first / 실행 last match
- 공식 getTweensOf nested / 실행 onlyActive
- 공식 36 / probe 10 분리

## 검증 계약

### findings

| ID | status | evidence | requiredAction |
| --- | --- | --- | --- |
| SRC-TI-001 | PASS | canonical 5개 + 원본 HTML 2차 대조 | none |
| PROBE-TI-001 | PASS | Node22·GSAP3.15.0 probe 10개 재현 | provenance 유지 |
| OC-TI-001 | PASS | 공식36=meta36=coverage36, probe10, item·section ID 중복0 | none |
| RDS-TI-001 | PASS | descriptor/query→instance index→tree/code, TSX GSAP import0 | none |
| A11Y-STATIC-TI-001 | PASS | label/button/status, autoplay·연속 live 없음 | none |
| REVIEW-TI-001 | PASS | Critical 0, Important 2건(snapshot·reduced-motion)과 Minor 1건(initial code) 반영 | none |
| BUILD-TI-001 | PASS | root app·Storybook final build exit 0 | none |
| A11Y-TI-001 | DEFERRED | 브라우저 keyboard·responsive | 일괄 검수 |

### verificationEvidence

- static: official36/probe10/meta36/source5/route1/TSX GSAP import0
- probe: getChildren 4/5/5·filter recursion/default, getById duplicate/type, getTweensOf active/time, data·scrollTrigger·array copy
- build: 저장소 root `npm run build` exit 0, `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook` exit 0
- review: official36/probe10 item별 근거, fixture 4/5/5, cleanup·주석·live region·route link 확인

### releaseDecision

`PASS` — 정적·build·독립 관점 검토 완료. 브라우저 keyboard·responsive 검수만 `DEFERRED`.
