# GSAP Core 지도 handoff

## 입력 계약

### objective

GSAP을 처음 접한 학습자가 `gsap` 객체, Tween, Timeline, Core, plugin의 관계를 먼저 이해하고 목적에 맞는 다음 공식 API와 로컬 학습 페이지를 선택하게 한다.

### officialPage

- title: `docsHome` + `GSAP` + `gsap.version`
- canonicalUrl:
  - `https://gsap.com/docs/v3/`
  - `https://gsap.com/docs/v3/GSAP/`
  - `https://gsap.com/docs/v3/GSAP/gsap.version/`
- reviewedAt: `2026-08-03`
- category: `Fundamentals`
- slug: `gsap-core-map`
- sourcePageIds: primary `source:docs-home`; related `source:gsap`, `source:gsap-version`

### localPage

- localPath: `src/content/gsap/fundamentals/gsap-core-map/`
- route: `/fundamentals/gsap-core-map`

### sourceManifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| DH-CORE-BOUNDARY | Core는 모든 브라우저의 빠르고 반응형 animation 기반을 제공하고 drag·scroll·morph 같은 추가 기능은 plugin으로 분리해 필요한 것만 더한다. | docsHome `GSAP Overview` | verified |
| DH-CORE-ENTRY | Core의 진입점은 GSAP이며 CDN으로도 가져올 수 있다. | docsHome `Included in GSAP's Core > GSAP` | verified |
| DH-CORE-CONSTRUCTS | Core의 중심 구성은 Tween과 Timeline이다. | docsHome `Included in GSAP's Core` | verified |
| DH-CORE-TARGETS | Core는 CSS properties, attributes, array values, numeric values, colors, 숫자가 든 complex strings를 움직일 수 있다. | docsHome `Animate anything` + linked official CSS·interpolate pages | verified |
| DH-CORE-EASES | 내장 ease는 none, power1~4, back, bounce, circ, elastic, expo, sine, steps(n)이다. | docsHome `Eases` | verified |
| DH-CORE-EFFICIENCY | Core는 stagger, callback, snapping, modifiers, keyframes, lag smoothing ticker, context/revert cleanup, matchMedia responsivity/accessibility를 제공한다. | docsHome `Animate efficiently` | verified |
| DH-CORE-UTILS | utility 전체는 checkPrefix, clamp, distribute, getUnit, interpolate, mapRange, normalize, pipe, random, selector, shuffle, snap, splitColor, toArray, unitize, wrap, wrapYoyo다. | docsHome `Utility Methods` | verified |
| DH-PLUGIN-SCROLL | Scroll plugin은 ScrollTrigger, ScrollTo, ScrollSmoother이며 ScrollSmoother는 ScrollTrigger가 필요하다. | docsHome `Scroll Plugins` | verified |
| DH-PLUGIN-TEXT | Text plugin은 SplitText, ScrambleText, Text Replacement다. | docsHome `Text Plugins` | verified |
| DH-PLUGIN-SVG | SVG plugin은 DrawSVG, MorphSVG, MotionPath, MotionPathHelper다. | docsHome `SVG Plugins` | verified |
| DH-PLUGIN-UI | UI plugin은 Flip, Draggable, Inertia, Observer다. | docsHome `UI Plugins` | verified |
| DH-PLUGIN-OTHER | Other plugin은 Physics2D, PhysicsProps, GSDevTools, Easel, Pixi다. | docsHome `Other Plugins` | verified |
| DH-EXTRA-EASES | 추가 ease는 CustomEase, EasePack의 rough·slow·expoScale, CustomWiggle, CustomBounce이며 Wiggle·Bounce는 CustomEase가 필요하다. | docsHome `Eases` | verified |
| DH-REACT | React 통합 진입점으로 `useGSAP()`과 npm 배포가 안내된다. | docsHome `React` | verified |
| GS-QUICKSTART-INSTALL | package manager quick start는 `npm install gsap` 뒤 `import { gsap } from 'gsap'`이다. | GSAP `Quick Start` | verified |
| GS-QUICKSTART-TWEEN | 최소 Tween은 `gsap.to()`로 대상·속성·duration을 전달한다. | GSAP `Minimal usage` | verified |
| GS-QUICKSTART-TIMELINE | 최소 Timeline은 `gsap.timeline()` 뒤 여러 `.to()`를 chain해 순서를 만든다. | GSAP `Minimal usage` | verified |
| GS-OBJECT-ROLE | `gsap`은 Tween과 Timeline을 생성·제어하는 대부분 기능의 generic object access point다. | GSAP intro | verified |
| GS-OVERVIEW-RESOURCE | 공식 페이지는 GSAP object 빠른 개요용 GSAP 3 Express 영상 자료를 연결한다. | GSAP `Quick Overview` | verified |
| GS-TWEEN-MODEL | Tween은 targets·duration·properties를 받고 playhead 위치마다 값을 계산·적용하는 고성능 property setter다. | GSAP `What's a Tween?` | verified |
| GS-TWEEN-CREATORS | 단순 animation은 `gsap.to()`, `gsap.from()`, `gsap.fromTo()`로 만들 수 있다. | GSAP `Common methods for creating a Tween` | verified |
| GS-TWEEN-EXAMPLE | 공식 Tween 예제는 `.box`를 1초 동안 rotation 27, x 100으로 바꾸며 x가 translateX shortcut임을 보여준다. | GSAP Tween example | verified |
| GS-DELAY-VS-TIMELINE | delay로 기본 순서를 만들 수 있지만 복잡한 choreography에는 Timeline이 더 적합하다. | GSAP before `What's a Timeline?` | verified |
| GS-TIMELINE-MODEL | Timeline은 Tween을 시간에 배치하고 전체 sequence를 제어하는 container다. | GSAP `What's a Timeline?` | verified |
| GS-TIMELINE-LIFECYCLE | Timeline은 중첩 가능하고 기본 parent는 globalTimeline이며 playhead가 children에 전파된다. Timeline 자체는 target property를 설정하지 않는다. | GSAP `What's a Timeline?` | verified |
| GS-TIMELINE-CREATE-CONTROL | `gsap.timeline()`으로 만들고 playhead·child startTime·재생 방향·timeScale을 실행 중 바꿀 수 있다. | GSAP `Method for creating a Timeline` | verified |
| GS-SEQUENCING | Timeline instance의 to/from/fromTo는 Tween을 즉시 child로 넣고 기본적으로 앞 animation 뒤에 배치하며 chaining할 수 있다. `gsap.to()`는 standalone이다. | GSAP `Sequencing` | verified |
| GS-SEQUENCING-OO-NOTE | standalone Tween을 `timeline.add()`할 수도 있지만 instance convenience method가 같은 일을 더 적은 단계로 한다. | GSAP `Sequencing` info | verified |
| GS-POSITION | position number는 absolute seconds, `+=`와 `-=` string은 Timeline 끝 기준 gap과 overlap이다. | GSAP `Positioning` | verified |
| GS-LABELS | label은 시간 위치를 이름으로 표시해 child 배치와 playback 이동에 사용한다. | GSAP `Labels` | verified |
| GS-CONTROL-INHERITANCE | Tween과 Timeline은 Animation을 확장해 pause, play, progress, restart, resume, reverse, seek, time, duration, timeScale, kill을 공유한다. | GSAP `Control methods` | verified |
| GS-CONTROL-REFERENCE | 나중에 animation을 제어하려면 instance reference를 변수로 보존한다. | GSAP control example | verified |
| GSV-PROPERTY | `gsap.version`은 현재 사용 중인 GSAP 버전을 나타내는 `String` property다. | gsap.version title, type, description | verified |
| GSV-EXAMPLE | 공식 문서의 버전 문자열은 형식 예시이며 최신 버전 고정값이 아니다. | gsap.version example | verified |

### sourceBlockers

`none` — 세 canonical source가 2026-08-03에 열렸고 모든 기술 item을 공식 본문·목록·코드에서 확인했다.

### moduleSelection

- `개념·가이드`
- `gsap` access point → Tween/Timeline 역할 → Core/plugin 경계 → 목적별 API 지도 → version 확인 → 다음 학습 순서로 재구성한다.
- 공식 카탈로그 이름은 compact exhaustive index로 보존하되 공식 목차를 그대로 복제하지 않는다.

### learnerFlow

1. `#access-point`: import 뒤 `gsap.*`으로 진입하고 최소 Tween·Timeline 코드를 읽는다.
2. `#animation-model`: Tween이 값을 쓰고 Timeline이 시간과 그룹을 조정한다는 역할 차이를 잡는다.
3. `#core-boundary`: 기본 엔진인 Core와 선택 확장인 plugin의 경계를 이해한다.
4. `#api-map`: 하고 싶은 일에서 target·ease·효율 기능·utility·plugin family로 이동한다.
5. `#version-check`: 현재 로드된 버전을 문자열 property로 확인한다.
6. `#next-steps`: 설치, `gsap.to()`, 생성 방식 비교, 설정, target, easing 순으로 이어간다.

### coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| GS-QUICKSTART-INSTALL | `AccessPointSection.tsx:4-6,31` install/import와 상세 경계 | covered |
| GS-QUICKSTART-TWEEN | `AccessPointSection.tsx:8-9,25-26` 최소 Tween | covered |
| GS-QUICKSTART-TIMELINE | `AccessPointSection.tsx:11-16,25-26` 최소 Timeline | covered |
| GS-OBJECT-ROLE | `AccessPointSection.tsx:21-25` access point와 기본 용어 | covered |
| GS-OVERVIEW-RESOURCE | `AccessPointSection.tsx:27` GSAP 3 Express 직접 링크 | covered |
| GS-TWEEN-MODEL | `AnimationModelSection.tsx:23-26` playhead별 값 계산·적용 | covered |
| GS-TWEEN-CREATORS | `AnimationModelSection.tsx:26,37` to/from/fromTo 지도 | covered |
| GS-TWEEN-EXAMPLE | `AccessPointSection.tsx:8-9,26` rotation·x·duration과 translateX shortcut | covered |
| GS-DELAY-VS-TIMELINE | `AnimationModelSection.tsx:38` 선택 경계 | covered |
| GS-TIMELINE-MODEL | `AnimationModelSection.tsx:29-32` container·sequence·property 경계 | covered |
| GS-TIMELINE-LIFECYCLE | `AnimationModelSection.tsx:31-32` nesting·globalTimeline·playhead 전파 | covered |
| GS-TIMELINE-CREATE-CONTROL | `AnimationModelSection.tsx:31-32,43-44` 생성 후 playhead·startTime·공통 제어 | covered |
| GS-SEQUENCING | `AnimationModelSection.tsx:35-37` standalone/child·기본 직렬 배치 | covered |
| GS-SEQUENCING-OO-NOTE | `AnimationModelSection.tsx:37` add/convenience 비교 | covered |
| GS-POSITION | `AnimationModelSection.tsx:39` absolute·gap·overlap | covered |
| GS-LABELS | `AnimationModelSection.tsx:9-10,40` label 배치·이동 | covered |
| GS-CONTROL-INHERITANCE | `AnimationModelSection.tsx:41,43-44` Animation 공통 control 전체 | covered |
| GS-CONTROL-REFERENCE | `AnimationModelSection.tsx:4,12-13,41` reference와 대표 control 결과 | covered |
| DH-CORE-BOUNDARY | `CoreBoundarySection.tsx:7-21` Core/plugin 분리 이유와 선택 기준 | covered |
| DH-CORE-ENTRY | `CoreBoundarySection.tsx:10-12` GSAP Core와 CDN 입구 | covered |
| DH-CORE-CONSTRUCTS | `AccessPointSection.tsx:24-26`, `AnimationModelSection.tsx:23-32` Tween·Timeline | covered |
| DH-CORE-TARGETS | `gsap-core-map.catalog.ts:3-6`, `ApiMapSection.tsx:9-17` 대상 전체 index | covered |
| DH-CORE-EASES | `gsap-core-map.catalog.ts:8-11`, `ApiMapSection.tsx:9-17` ease 전체 index | covered |
| DH-CORE-EFFICIENCY | `gsap-core-map.catalog.ts:13-16`, `ApiMapSection.tsx:9-17` 효율·cleanup·반응형·접근성 | covered |
| DH-CORE-UTILS | `gsap-core-map.catalog.ts:18-21`, `ApiMapSection.tsx:9-17` utility 전체 index | covered |
| DH-PLUGIN-SCROLL | `gsap-core-map.catalog.ts:27`, `ApiMapSection.tsx:24-31` Scroll use case·dependency | covered |
| DH-PLUGIN-TEXT | `gsap-core-map.catalog.ts:28`, `ApiMapSection.tsx:24-31` Text use case | covered |
| DH-PLUGIN-SVG | `gsap-core-map.catalog.ts:29`, `ApiMapSection.tsx:24-31` SVG use case | covered |
| DH-PLUGIN-UI | `gsap-core-map.catalog.ts:30`, `ApiMapSection.tsx:24-31` UI use case | covered |
| DH-PLUGIN-OTHER | `gsap-core-map.catalog.ts:31`, `ApiMapSection.tsx:24-31` Other use case | covered |
| DH-EXTRA-EASES | `gsap-core-map.catalog.ts:32`, `ApiMapSection.tsx:24-31` Ease family·dependency | covered |
| DH-REACT | `gsap-core-map.catalog.ts:33`, `ApiMapSection.tsx:22,24-31` React npm integration | covered |
| GSV-PROPERTY | `VersionCheckSection.tsx:12-16` String type·현재 loaded version | covered |
| GSV-EXAMPLE | `VersionCheckSection.tsx:4-7,12-16` 예시/current 구분 | covered |

### relatedPages

- `/fundamentals/installation`: 설치·환경별 import 상세의 owner이며 아직 미구현이다.
- `/fundamentals/gsap-to`: 첫 standalone Tween의 owner이며 현재 구현되어 있다.
- `/fundamentals/tween-start-end-values`: to/from/fromTo/set 비교의 owner이며 아직 미구현이다.
- `/fundamentals/timeline-basics`: Timeline 구성 상세의 owner이며 아직 미구현이다.
- `/fundamentals/plugins`: plugin 등록·소유권 상세의 owner이며 아직 미구현이다.

## 구현 계약

### exactFiles

create:

- `src/content/gsap/fundamentals/gsap-core-map/GsapCoreMapPage.tsx`
- `src/content/gsap/fundamentals/gsap-core-map/GsapCoreMapPage.css`
- `src/content/gsap/fundamentals/gsap-core-map/gsap-core-map.meta.ts`
- `src/content/gsap/fundamentals/gsap-core-map/gsap-core-map.catalog.ts`
- `src/content/gsap/fundamentals/gsap-core-map/components/PageCoverage/PageCoverage.tsx`
- `src/content/gsap/fundamentals/gsap-core-map/components/SectionHeading/SectionHeading.tsx`
- `src/content/gsap/fundamentals/gsap-core-map/sections/AccessPointSection/AccessPointSection.tsx`
- `src/content/gsap/fundamentals/gsap-core-map/sections/AnimationModelSection/AnimationModelSection.tsx`
- `src/content/gsap/fundamentals/gsap-core-map/sections/CoreBoundarySection/CoreBoundarySection.tsx`
- `src/content/gsap/fundamentals/gsap-core-map/sections/ApiMapSection/ApiMapSection.tsx`
- `src/content/gsap/fundamentals/gsap-core-map/sections/VersionCheckSection/VersionCheckSection.tsx`
- `src/content/gsap/fundamentals/gsap-core-map/sections/NextStepsSection/NextStepsSection.tsx`

modify:

- `src/app/routes.ts`
- `src/app/App.tsx`
- 이 handoff의 coverage, findings, verification, release fields

### exampleContracts

- name: `CoreMapStaticGuide`
- goal: Core 전체 관계와 다음 API 선택을 한 페이지에서 이해한다.
- question: 어디서 시작하고 어떤 도구로 가야 하나?
- representation: semantic HTML 관계도, 정적 code block, definition list, compact exhaustive index
- controls: `none` — 조절할 실행 상태가 없다.
- runtimeSource: `none` — GSAP call, animation lifecycle, 상태 계산을 실행하지 않는다.
- sourcePath: `none` — 독립 example/code panel이 없고 section TSX가 정적 근거를 직접 소유한다.
- runtimeOwnership: `none`
- displayOwnership: 각 section TSX와 `gsap-core-map.catalog.ts`
- accessibility: 단일 h1과 순차 heading, 관계를 색·화살표만이 아닌 텍스트로 전달, 미구현 route는 링크로 보이지 않게 표시, code block 작은 화면 가로 스크롤
- motion: `none` — autoplay, tween, animated diagram을 사용하지 않는다.

### nonGoals

- 설치·CDN·SSR·bundle 상세, registerPlugin 상세, `gsap.to()` vars, 생성 method 전체 비교, Tween/Timeline instance 전체 API, 개별 plugin 실행 예제
- 공식 video iframe, account/community/marketing 영역, live playground, controls, runtime Hook, version hardcode 또는 자동 동기화 badge
- 아직 없는 route 링크, 공용 디자인 시스템 추출, 기존 `gsap-to` 리팩터링

### preserve

- master inventory의 sourcePageId·owner·route
- 기존 `/fundamentals/gsap-to`, lazy loading, resolveRoute fallback, popstate·focus semantics
- `src/content/gsap/methods/gsap-to/**`와 공용 컴포넌트 API·style
- 기존 untracked inventory와 관련 없는 사용자 변경

## 검수 계약

### reviewAssignments

- Source Curator: `/root/source_curator` — 구현 전 source manifest·blocker 판정
- Content Architect: `/root/content_architect` — 구현 전 module·learner flow·evidence target 판정
- Official Coverage + Learning Transformation + Structure/Comment + Accessibility/Motion + Build/Integration: 구현과 분리된 전문 reviewer
- Independent Release Reviewer: 구현·fix에 참여하지 않은 별도 reviewer
- Cross-page Consistency: 단일 신규 페이지이므로 `none`; 기존 `gsap-to` 경계는 Release Reviewer가 route·용어 보존만 확인

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SC-CORE01-001 | PASS | 세 canonical source와 34개 source item 확인 | 구현 범위 고정 | 모든 ID를 localEvidence에 연결 |
| SC-CORE01-002 | ADVISORY | docsHome EasePack label과 href가 불일치 | 잘못된 링크 복제 위험 | 정상 개별 공식 URL 사용 |
| SC-CORE01-003 | ADVISORY | docsHome CustomBounce dependency href `/CustomEasee`가 404 | 깨진 링크 복제 위험 | 정상 CustomEase URL 사용 |
| SC-CORE01-004 | PASS | `gsap.version`의 값은 current loaded version이며 문서 숫자는 예시 | 최신 버전 하드코딩 방지 | 예시와 현재값을 구분 |
| CA-CORE01-001 | PASS | learnerFlow와 localEvidence target이 34개 item을 수용 | 학습형 재구성 가능 | 고정한 섹션 순서 유지 |
| OC-CORE01-001~006 | ADDRESSED | 1차 28/34 판정 뒤 누락된 Core 특성·영상·x shortcut·Timeline 제어·sequencing·matchMedia 접근성을 보완하고 2차 34/34 재검수 | Official Coverage blocker 해소 | none |
| OC-CORE01-FINAL | PASS | 34개 coverageMap이 실제 file:line과 `covered`로 연결됨 | Official Coverage 통과 | none |
| LT-CORE01-001 | ADDRESSED | header에서 gsap·Tween·Timeline·plugin을 먼저 정의하고 target·property·duration을 코드 전에 정의 | 최초 용어 순서 blocker 해소 | none |
| LT-CORE01-FINAL | PASS | 목적별 learner flow, 역할 경계, plugin use case, 다음 학습 순서 재검수 | Learning Transformation 통과 | none |
| SC-COREMAP-FINAL | PASS | page 조립, section 학습 단위, catalog data, runtime none 경계와 한 줄 한국어 주석 확인 | Structure/Comment 통과 | none |
| AM-COREMAP-STATIC | PASS | heading·aria-labelledby·nav label·focus-visible·responsive CSS·overflow-x·motion none 확인 | 정적 Accessibility/Motion 통과 | Browser 실조작 증거는 EV-COREMAP-001에서 별도 관리 |
| AM-COREMAP-ADV-001 | ADDRESSED | 외부 GSAP 3 Express 링크의 접근성 이름에 `새 탭에서 열기` 추가 | 새 탭 예고 advisory 해소 | none |
| BI-COREMAP-FINAL | PASS | final `npm run build`, `npm run build-storybook`, lazy route·brand·fallback·기존 gsap-to 정적 검수 | code/build integration 통과 | Browser route 조작 증거는 EV-COREMAP-001에서 별도 관리 |
| EV-COREMAP-001 | BLOCK | Browser runtime의 `agent.browsers.list()`가 `[]`여서 keyboard·focus·390px·overflow·hash·brand·fallback 실조작을 실행하지 못함 | quality gate의 Browser behavior evidence가 비어 release 승인 불가 | 연결 가능한 in-app Browser 또는 Chrome에서 실조작 후 재검수 |
| RR-COREMAP-001 | BLOCK | Independent Release Reviewer가 34/34 coverage·Learning Transformation·build PASS와 EV-COREMAP-001을 대조 | 미검증 변경 금지 규칙에 따라 최종 release 승인 불가 | EV-COREMAP-001 해소 뒤 Accessibility/Motion·Build/Integration·Release 재검수 |

### verificationEvidence

- `2026-08-03 npm run build` — `tsc && vite build`, 94 modules, `GsapCoreMapPage` lazy JS/CSS chunk 생성, exit 0
- `2026-08-03 npm run build-storybook` — 232 modules, Storybook build completed successfully, exit 0
- local Vite HTTP — `/fundamentals/gsap-core-map` 200, `/fundamentals/gsap-to` 200
- static integration — 신규 route가 fundamentals 첫 lesson이고 기존 `gsap-to`는 두 번째 lesson으로 보존; brand는 `getTrackHref(tracks[0])` 사용
- source/learning independent review — Official Coverage PASS 34/34, Learning Transformation PASS
- structure/static accessibility/build independent review — Structure/Comment PASS, static Accessibility/Motion PASS, code/build integration PASS
- Browser discovery — in-app Browser/Chrome 목록이 비어 실제 keyboard·small-screen·route interaction은 미검증
- Independent Release Review — `EV-COREMAP-001`이 남아 `releaseDecision: BLOCK`

### releaseDecision

`BLOCK` — 구현·34/34 coverage·Learning Transformation·구조·정적 접근성·build는 통과했다. 연결 가능한 Browser가 없어 실제 keyboard·small-screen·overflow·route interaction 증거와 이에 따른 Independent Release PASS가 아직 없다.
