# Timeline basics handoff

## 입력 계약

### objective

Timeline을 여러 Tween의 시간 관계를 소유하는 container로 소개하고, constructor vars 전체와 `to()`·`from()`·`fromTo()`·`set()` child creator, 기본 position, defaults, nesting의 시작점을 한 페이지에서 가르친다.

### officialPage

- title: `gsap.timeline()` + `Timeline` + `Timeline.vars` + `Timeline.to()` + `Timeline.from()` + `Timeline.fromTo()` + `Timeline.set()`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/gsap.timeline()`
  - `https://gsap.com/docs/v3/GSAP/Timeline`
  - `https://gsap.com/docs/v3/GSAP/Timeline/vars`
  - `https://gsap.com/docs/v3/GSAP/Timeline/to()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/from()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/fromTo()`
  - `https://gsap.com/docs/v3/GSAP/Timeline/set()`
- reviewedAt: `2026-08-08`
- category: `GSAP > GSAP` + `Fundamentals > Timeline`
- slug: `timeline-basics`
- sourcePageIds: primary `source:gsap-timeline`; related `source:timeline`, `source:timeline-vars`, `source:timeline-to`, `source:timeline-from`, `source:timeline-from-to`, `source:timeline-set`

### localPage

- localPath: `src/content/gsap/fundamentals/timeline-basics/`
- route: `/fundamentals/timeline-basics`

### sourceManifest

`timeline-basics.catalog.ts`가 공식 item 116개와 probe 9개의 전체 문장·source·section 귀속 authority다.

| source | 공식 item | sourceStatus |
| --- | ---: | --- |
| `gsap-timeline` | 35 | verified |
| `timeline` | 11 | verified |
| `timeline-vars` | 24 | verified |
| `timeline-to` | 15 | verified |
| `timeline-from` | 10 | verified |
| `timeline-from-to` | 11 | verified |
| `timeline-set` | 10 | verified |
| 합계 | 116 | verified |

| sourceItemIds | sourceLocation | sourceStatus |
| --- | --- | --- |
| GT-01 | `source:gsap-timeline` Returns | verified |
| GT-02~06 | `source:gsap-timeline` intro와 WITHOUT/WITH 예제 | verified |
| GT-07~08 | `source:gsap-timeline` Special Properties and Callbacks | verified |
| GT-09~18 | `source:gsap-timeline` Positioning animations in a timeline | verified |
| GT-19~20 | `source:gsap-timeline` Setting Defaults | verified |
| GT-21 | `source:gsap-timeline` Nesting | verified |
| GT-22~26 | `source:gsap-timeline` How do timelines work? | verified |
| GT-27~34 | `source:gsap-timeline` Other Timeline Features와 Sample code | verified |
| GT-35 | `source:gsap-timeline` global timeline note | verified |
| TL-01~02 | `source:timeline` Quick Start와 intro | verified |
| TL-03~09 | `source:timeline` Properties | verified |
| TL-10~11 | `source:timeline` Methods | verified |
| TV-00 | `source:timeline-vars` signature | verified |
| TV-01 | `source:timeline-vars` Details | verified |
| TV-02~23 | `source:timeline-vars` Property/Description 22행 | verified |
| TT-01~02 | `source:timeline-to` signature와 intro | verified |
| TT-03~05 | `source:timeline-to` Parameters | verified |
| TT-06 | `source:timeline-to` Returns | verified |
| TT-07~09 | `source:timeline-to` Details·공식 예제 | verified |
| TT-10~15 | `source:timeline-to` Positioning과 interactive demo 안내 | verified |
| TF-01~02 | `source:timeline-from` signature와 intro | verified |
| TF-03~05 | `source:timeline-from` Parameters | verified |
| TF-06 | `source:timeline-from` Returns | verified |
| TF-07~09 | `source:timeline-from` Details·info·공식 예제 | verified |
| TF-10 | `source:timeline-from` Positioning | verified |
| TFT-01~02 | `source:timeline-from-to` signature와 intro | verified |
| TFT-03~06 | `source:timeline-from-to` Parameters | verified |
| TFT-07 | `source:timeline-from-to` Returns | verified |
| TFT-08~10 | `source:timeline-from-to` Details·info·공식 예제 | verified |
| TFT-11 | `source:timeline-from-to` Positioning | verified |
| TS-01~02 | `source:timeline-set` signature와 intro | verified |
| TS-03~05 | `source:timeline-set` Parameters | verified |
| TS-06 | `source:timeline-set` Returns | verified |
| TS-07~09 | `source:timeline-set` Details·마지막 immediateRender 문장·공식 예제 | verified |
| TS-10 | `source:timeline-set` Positioning a set() in a timeline | verified |

일곱 URL을 heading·signature·parameter·Returns 중심으로 두 차례 조회했다. 두 번째는 공식 HTML의 `<main>` heading을 직접 추출해 vars 22행, Timeline Properties 7행, Methods 52행과 creator별 position 절을 다시 셌다.

### sourceBlockers

`none`.

- 일반 `gsap.timeline()`의 `smoothChildTiming` 기본은 false이고 `gsap.globalTimeline`만 true다. 실행 결과와 공식 본문이 일치하며 반대로 바꾸지 않는다.
- 네 creator 페이지의 공통 chaining 예제는 주석이 opacity `0.5`라고 쓰지만 실제 코드는 `{ opacity: 0 }`이다. 원문 불일치를 catalog TT-09와 로컬 경고에 그대로 보존한다.
- `set()` 첫 설명은 `add(gsap.to({ duration: 0 }))`와 같다고 쓰고 Details는 `add(gsap.set())`와 같다고 쓴다. 둘 다 보존한다.
- 공식 문서가 child duration 계산식, vars 복사 여부, defaults의 중첩 전파를 명시하지 않으므로 probe와 공식 주장을 섞지 않는다.

### moduleSelection

- concept/guide — delay 연쇄 대신 container가 시간 관계를 소유하는 이유를 설명한다.
- callable method — constructor와 네 child creator의 signature·인자·반환·immediateRender를 비교한다.
- class/instance — Timeline의 Properties 7개와 Methods 52개 전체를 보존한다.
- property catalog — constructor vars 22개를 공식 타입 빈칸까지 표로 보존한다.

### learnerFlow

1. delay를 직접 계산할 때 생기는 문제를 본다.
2. 반환된 Timeline instance의 기본 구조를 읽는다.
3. constructor vars 22개를 훑는다.
4. to·from·fromTo·set으로 child를 만든다.
5. position으로 삽입 지점을 정한다.
6. defaults의 직접 child 범위를 확인한다.
7. Timeline을 중첩하고 부모·자식 playhead를 이해한다.
8. 나머지 Timeline 기능의 후속 소유권을 확인한다.

### coverageMap

catalog `sectionId`가 item별 귀속 authority이며 아래 표가 로컬 근거를 고정한다. 공식 116개는 모두 `covered`, probe 9개는 분모 밖 `covered (probe)`다.

| sourceItemIds | localEvidence | localStatus |
| --- | --- | --- |
| GT-01~06, TL-01~02 | `WhyTimelineSection.tsx` delay/Timeline 비교 코드·클래스 예제 차이 note | covered |
| TV-00~01, TL-03~09 | `TimelineInstanceSection.tsx` signature·Properties 7행·vars 설명 | covered |
| GT-07~08, TV-02~23 | `TimelineVarsSection.tsx` constructor 예제·vars 22행 전체 표·타입 빈칸 경고 | covered |
| TT-01~09, TF-01~09, TFT-01~10, TS-01~09 | `ChildCreatorsSection.tsx` 네 signature·인자 차이·동치/공통 chaining 예제·immediateRender 경고, `SequenceBuilderLab` | covered |
| GT-09~18, TT-10~15, TF-10, TFT-11, TS-10 | `PositionParameterSection.tsx` 모든 공식 형태·예제·퍼센트 분모·recent 정의 | covered |
| GT-19~20 | `DefaultsScopeSection.tsx` WITHOUT/WITH defaults 코드·override 설명 | covered |
| GT-21~26 | `NestingClockSection.tsx` 공식 nesting 코드·tree·playhead·smoothChildTiming·startTime -3 설명 | covered |
| GT-27~35, TL-10~11 | `BoundariesSection.tsx` Other Features 4묶음·Sample 요약·Methods 52개·globalTimeline 경고 | covered |
| TLP-01 | `WhyTimelineSection.tsx` 인자 없는 초기 상태 probe | covered (probe) |
| TLP-02~03 | `TimelineInstanceSection.tsx` duration 파생·vars identity probe | covered (probe) |
| TLP-04, TLP-09 | `ChildCreatorsSection.tsx` self 8조합·future from/set probe | covered (probe) |
| TLP-05 | `DefaultsScopeSection.tsx` set duration·중첩 defaults probe | covered (probe) |
| TLP-06~08 | `PositionParameterSection.tsx` startTime 표·음수 위치·recent child probe | covered (probe) |

### relatedPages

- `timeline-callbacks-pauses` — callback·pause·Promise를 소유하며 등록된 링크를 제공한다.
- `tween-playback-controls`·`tween-playhead` — 공통 Animation 재생·좌표 멘탈 모델을 먼저 제공한다.
- `timeline-child-placement`·`timeline-labels`·`timeline-inspection`·`timeline-timing-math`·`timeline-repeats` — 후속 Timeline 상세를 소유하며 등록 전까지 링크하지 않는다.

## 구현 계약

### exactFiles

- create/adopt: 이 handoff와 `src/content/gsap/fundamentals/timeline-basics/` 아래 catalog·meta·properties·page·components·sections·example 전체
- modify tracked file: `src/app/routes.ts`
- preserve while completing: 인계받은 untracked catalog 공식 116개·probe 9개, vars 22개와 공통 components

### exampleContracts

#### SequenceBuilderLab

- goal: 3단계 descriptor에서 `from` → `to` → `set + fromTo` child를 한 단계씩 같은 Timeline에 추가한다.
- question: Timeline에 child를 넣으면 순서·길이·chaining 코드는 어떻게 함께 바뀌나요?
- representation: UI card, 단계 목록, 실제 `startTime()`·`duration()` block ruler, 코드 패널
- controls: 다음 단계 추가, 현재 sequence 재생 또는 최종 상태 보기, 초기화
- runtimeSource/sourcePath: `examples/SequenceBuilderLab/useSequenceBuilderAnimation.ts`
- runtimeOwnership: stage descriptor, Timeline instance, DOM refs, 실제 child getter, reduced-motion 분기
- displayOwnership: TSX는 같은 descriptor를 chaining 문법으로 직렬화하고 runtime block을 배치한다.
- accessibility: frame 단위 시간을 표시하지 않고 이산 상태만 `role="status"`; ruler는 일반 정적 결과
- motion: autoplay 없음. reduced-motion에서 `progress(1, true).pause()`로 최종 상태만 즉시 보여 준다.

### nonGoals

- `add()`의 모든 child 타입, label CRUD, child 이동·검색·삭제, Timeline 전용 재생·playhead·timing·repeat 계약을 구현하지 않는다.
- globalTimeline이나 exportRoot를 실행 예제로 조작하지 않는다.
- ScrollTrigger를 생성하지 않고 조건부 property 존재만 공식 표에 보존한다.
- 미등록 Timeline slug로 링크하지 않는다.

### preserve

- 일반 Timeline과 globalTimeline의 `smoothChildTiming` 기본 차이
- creator chaining 주석의 opacity 0.5 / 코드 0 불일치
- set()의 두 동치 설명과 immediateRender false
- 공식 116 / probe 9 분리

## 검증 계약

### verifiedPerspectives

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, Accessibility/Motion, Build/Integration, Cross-page Consistency를 각각 판정한다.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-TB-001 | PASS | 2026-08-08 일곱 canonical을 web 원문과 HTML heading 추출로 2회 대조 | source 구현 가능 | none |
| PROBE-TB-001 | PASS | Node 22·GSAP 3.15.0에서 빈 Timeline, smoothChildTiming 두 기본, vars identity, self 8조합, duration 파생을 재측정하고 기존 probe 조건을 대조 | 공식 침묵과 실행 차이 분리 | provenance 유지 |
| OC-TB-001 | PASS | catalog 공식 116 = meta 합계 116 = coverage 분모 116, 섹션별 일치, ID 중복 0 | 공식 범위 전체 귀속 | none |
| LT-TB-001 | PASS | 여덟 단계·vars 22행·Methods 52개·3단계 builder 구현 | 목록을 container 구성 흐름으로 변환 | none |
| RDS-TB-001 | PASS | runtime descriptor와 실제 child getter를 hook이 소유하고 TSX GSAP import 0개 | 실행·block·코드 동기화 | none |
| PED-TB-001 | PASS | lab에 목표·controls·실제 관찰·코드·네 설명 패널·실행 경로 제공 | 조작과 개념 연결 | none |
| STR-TB-001 | PASS | 페이지는 section 조립만 수행하고 example 선언·GSAP 실행 단계에 한 줄 한국어 주석 적용 | 구조·주석 계약 충족 | none |
| A11Y-STATIC-TB-001 | PASS | button·heading·table caption 확인, 연속 live 값 없음, reduced-motion은 final state 분기 | 정적 접근성·motion 충족 | none |
| XPAGE-TB-001 | PASS | 등록된 3개 slug만 링크하고 미등록 Timeline 페이지는 텍스트 경계로 유지 | dead link 없음 | none |
| REVIEW-TB-001 | PASS | 독립 리뷰의 Important 1건을 반영해 Methods 52행의 인자·반환 타입, slider·reverse·interactive 자료 안내를 보존했고 ruler 겹침과 probe label명도 수정 | coverage 과장·표시 불일치 해소 | none |
| BUILD-TB-001 | PASS | final code를 격리 mirror에서 `npm run build`, `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook` 실행해 모두 exit 0 | 페이지 단위 통합 가능 | none |
| A11Y-TB-001 | DEFERRED | 키보드·reduced-motion·320/390px·실제 단계 조작 | 소유자 일괄 브라우저 검수 | 전체 페이지 완성 후 확인 |

### verificationEvidence

- source: 공식 web open + `<main>` heading 직접 추출, vars 22 / Properties 7 / Methods 52 재계수
- probe: Node 22, GSAP 3.15.0, plain object target, paused Timeline과 getter 직접 측정
- static: 공식 116 / probe 9 / meta 116 / vars 22 / methods signature 52 / 중복 0 / route 1 / TSX GSAP import 0 / missing CSS 0 / `git diff --check` PASS
- review: Critical 0, Important 1 반영 후 해소, Minor 2 반영 후 해소, 브라우저 검수는 backend 부재로 deferred
- build: 미완성 untracked 폴더 6개를 제외한 `/tmp/fe-gsap-timeline-basics-RLHHY5`에서 final `npm run build` exit 0, `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook` exit 0
- root note: 저장소 root 타입 검사는 아직 미완성 6개 폴더의 존재하지 않는 section import 때문에 실패하며 이 페이지 route와 격리 결과에는 영향이 없다.

### releaseDecision

`PASS` — 공식 coverage·정적 계약·독립 리뷰·페이지 단위 두 build를 통과했다. 브라우저 접근성·반응형 검수만 전체 페이지 일괄 단계로 deferred다.
