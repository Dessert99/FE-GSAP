# High-frequency updates handoff

## 입력 계약

### objective

포인터·스크롤처럼 초당 수십 번 발생하는 입력에서 값을 갱신하는 방법을 "무엇을 읽고, 어느 쓰기 경로를 고르고, 어떻게 흘려보내나"라는 하나의 선택 흐름으로 재구성한다. `gsap.getProperty()`는 읽기, `gsap.quickSetter()`는 보간 없는 즉시 쓰기, `gsap.quickTo()`는 보간 있는 되따라가기다. 셋 다 **값이 아니라 재사용할 함수**를 중심에 두는 도구이므로, API 나열이 아니라 **"입력마다 Tween을 새로 만들지 않는다"**라는 문제 해결로 가르친다.

### officialPage

- title: `gsap.getProperty()` + `gsap.quickSetter()` + `gsap.quickTo()`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/gsap.getProperty()`
  - `https://gsap.com/docs/v3/GSAP/gsap.quickSetter()`
  - `https://gsap.com/docs/v3/GSAP/gsap.quickTo()`
- reviewedAt: `2026-08-04`
- category: `Fundamentals > GSAP`
- slug: `high-frequency-updates`
- sourcePageIds: primary `source:gsap-get-property`; related `source:gsap-quick-setter`, `source:gsap-quick-to`

세 페이지 모두 **formal signature 블록·인자 표·기본값 표가 없다.** 반환 표기만 있다(`Returns : *` / `Returns : Function` / `Returns : Function`). 인자와 반환값은 산문과 코드 예제에만 나온다. 게시되지 않은 명세를 기억이나 TypeScript 선언으로 채우지 않는다. 해당 칸은 `공식 페이지에 명시 없음`으로 표시한다.

heading 구성(2026-08-04 원문 확인):

- getProperty — `Returns : *` / `Details` / `Examples:` / `Reusable getter function`. 코드 블록 3개, 표 0개, 데모 0개.
- quickSetter — `Returns : Function` / `Details` / `Combine with utility methods for super-powerful functions!` / `Mouse Follower Demo` / `If you're animating, use gsap.quickTo()` / `Trick for multiple values`. 코드 블록 3개, note admonition 1개, 데모 iframe 2개, 건너뛰기 목록 6항목.
- quickTo — `Returns : Function` / `Details` / `Combine with utility methods for super-powerful functions!` / `Mouse Follower Demo` / `Optionally define a start value` / `Access the tween`. 코드 블록 4개, 데모 iframe 1개, 건너뛰기 목록 6항목.

**수집 방법 주의.** WebFetch 요약 모델은 이 세 페이지의 목록 항목을 합치고 note와 caveat을 누락했다(1차 시도에서 quickSetter의 6항목 중 5항목만, quickTo의 시작값 절 전체가 소실). 그래서 `curl`로 canonical HTML을 직접 받아 `<article>` 안의 heading·`<li>`·`<pre>`를 원문 그대로 추출해 manifest를 만들었다. 이어받는 컨텍스트도 요약본이 아니라 원문 인용으로 대조한다.

### localPage

- localPath: `src/content/gsap/fundamentals/high-frequency-updates/`
- route: `/fundamentals/high-frequency-updates`

### sourceManifest

공식 기술 item 46개. 모두 `sourceStatus: verified`(2026-08-04 canonical 원문 직접 조회).

#### `source:gsap-get-property` — 11개

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| GP-01 | 반환 표기는 `Returns : *`이며 고정된 한 가지 타입이 아니다. | `Returns : *` heading | verified |
| GP-02 | 요청한 property의 값을 가능하면 number로 돌려주고, unit을 지정하면 그 unit이 숫자에 붙어 string이 된다. | `Returns : *` 본문 | verified |
| GP-03 | 값이 존재하지 않으면 null을 돌려준다. | `Returns : *` 본문 + `Details` 끝 | verified |
| GP-04 | 첫 코드 블록 3줄이 반환 형식 세 가지를 보여준다(`x`→20, `x`+`"px"`→`"20px"`, `backgroundColor`→`"rgb(255, 128, 0)"`). | 첫 코드 블록 | verified |
| GP-05 | 아무 property의 현재 값이나 쉽게 가져오며, DOM element라면 특정 unit으로 변환까지 시킬 수 있다. | `Details` 1문단 | verified |
| GP-06 | DOM element는 inline CSS → `.getComputedStyle()` CSS → element 자체의 property → element의 attribute 순으로 확인하고 먼저 찾는 즉시 돌려준다. | `Details` 1문단 | verified |
| GP-07 | unit 파라미터를 생략하면 NUMBER를 돌려준다(`parseFloat()`이 숫자를 주는 단순한 값에 한해). `"20px"`인 `top`·`left`·`x`도 20으로 온다. | `Details` 2문단 | verified |
| GP-08 | 숫자로 주는 이유는 애니메이션에서 숫자를 다루는 일이 흔하고 매번 `parseFloat()`으로 감싸는 것이 번거롭기 때문이다. | `Details` 2문단 | verified |
| GP-09 | unit을 포함하려면 `gsap.getProperty("#element", "x", "px")`처럼 넘기면 string이 돌아온다. | `Details` 2문단 끝 | verified |
| GP-10 | target에 selector text와 element를 모두 넘길 수 있고 `"em"` 같은 unit으로 변환할 수 있다. | `Examples:` 코드 블록 | verified |
| GP-11 | property를 생략하면 그 target의 property를 반복해 가져오는 getter 함수를 돌려준다. | `Reusable getter function` | verified |

#### `source:gsap-quick-setter` — 16개

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| QS-01 | 반환 표기는 `Returns : Function`이다. | `Returns : Function` heading | verified |
| QS-02 | 같은 객체(또는 객체 집합)에 `gsap.set()`을 여러 번 호출하게 되면 — `"mousemove"` 이벤트 안처럼 — quickSetter 함수로 성능을 `50% - 250%` 높일 수 있다. | `Details` 1문단 | verified |
| QS-03 | 특정 target(들)의 특정 property에 묶인 최적화 함수이며 데이터를 직접 흘려보내고 `gsap.set()`의 편의 작업을 건너뛴다. | `Details` 1문단 | verified |
| QS-04 | 건너뛰기 ① 단위 변환과 자동 부착. 단 unit을 지정하면 넣는 숫자에 항상 그 단위가 붙는다. | `Details` 목록 1행 | verified |
| QS-05 | 건너뛰기 ② 상대값. | `Details` 목록 2행 | verified |
| QS-06 | 건너뛰기 ③ 함수 기반 값. | `Details` 목록 3행 | verified |
| QS-07 | 건너뛰기 ④ `"random()"` 파싱. | `Details` 목록 4행 | verified |
| QS-08 | 건너뛰기 ⑤ SVG의 `transformOrigin` 같은 property별 브라우저 불일치 우회. 그래서 `transformOrigin`용 quickSetter는 권장되지 않는다. | `Details` 목록 5행 | verified |
| QS-09 | 건너뛰기 ⑥ property 이름 alias 변환. `"x"`는 되고 `"translateX"`는 안 된다. | `Details` 목록 6행 | verified |
| QS-10 | note — `gsap.set()`을 두려워하지 마라. 대부분 실제 차이를 못 느끼고 `gsap.set()`은 편의를 많이 준다. quickSetter는 성능 임계 상황용 hyper-optimized 도구다. | `Details` note admonition | verified |
| QS-11 | 값을 하나만 받으므로 `pipe()` 끝에 붙일 수 있다. 공식 예제는 clamp(0,100)→snap(5)→quickSetter이고 `xSetter(150)`은 `100px`, `xSetter(3)`은 `5px`. | `Combine with utility methods…` | verified |
| QS-12 | Mouse Follower Demo를 게시한다. | `Mouse Follower Demo` | verified |
| QS-13 | 값을 즉시 설정하는 것이 목적이므로 animate하려면 `gsap.quickTo()`를 보라고 안내하고 quickTo 데모도 함께 게시한다. | `If you're animating, use gsap.quickTo()` | verified |
| QS-14 | property를 `"css"`로 두고 값에 객체를 넘기면 CSSPlugin의 이점과 여러 property 동시 적용을 얻는다. | `Trick for multiple values` | verified |
| QS-15 | 같은 기법이 attribute에도 통한다(`"attr"`). | `Trick for multiple values` | verified |
| QS-16 | 다만 특정 property를 지정할 때만큼의 향상은 아니다. 그래도 표준 `gsap.set()`보다는 빠르다. | `Trick for multiple values` 끝 | verified |

#### `source:gsap-quick-to` — 19개

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| QT-01 | 반환 표기는 `Returns : Function`이다. | `Returns : Function` heading | verified |
| QT-02 | 같은 target의 같은 numeric property에 `gsap.to()`를 여러 번 호출하게 되면 — `"mousemove"` 이벤트 안처럼 — quickTo()로 성능을 높일 수 있다. | `Details` 1문단 | verified |
| QT-03 | 하나의 특정 numeric property에 묶인 최적화 함수이며 새 숫자를 직접 흘려보내고 `gsap.to()`의 편의 작업을 건너뛴다. | `Details` 1문단 | verified |
| QT-04 | 건너뛰기 ① 단위 변환과 자동 부착. | `Details` 목록 1행 | verified |
| QT-05 | 건너뛰기 ② 상대값. | `Details` 목록 2행 | verified |
| QT-06 | 건너뛰기 ③ 함수 기반 값. | `Details` 목록 3행 | verified |
| QT-07 | 건너뛰기 ④ `"random()"` 파싱. | `Details` 목록 4행 | verified |
| QT-08 | 건너뛰기 ⑤ 플러그인 파싱. 직접 property나 CSS 관련 property만 되고 `attr:`·morphSVG 등은 안 된다. | `Details` 목록 5행 | verified |
| QT-09 | 건너뛰기 ⑥ property 이름 alias 변환. `"x"`는 되고 `"translateX"`는 안 된다. | `Details` 목록 6행 | verified |
| QT-10 | 새 숫자를 넘길 때마다 사실상 애니메이션을 다시 시작해 그 새 값으로 방향을 바꾼다. | `Details` 목록 뒤 문단 | verified |
| QT-11 | (재사용되는) Tween 인스턴스를 돌려준다. | `Details` 목록 뒤 문단 | verified |
| QT-12 | 선택적 3번째 파라미터는 tween vars 객체이며 `duration`, `ease` 등을 지정한다. | `Details` 목록 뒤 문단 | verified |
| QT-13 | 공식 Example은 `xTo`·`yTo`를 duration 0.4, ease `"power3"`로 미리 만들고 `mousemove`에서 `xTo(e.pageX)`, `yTo(e.pageY)`만 호출한다. | `Example` 코드 블록 | verified |
| QT-14 | `pipe()` 끝에 붙일 수 있다. 공식 예제는 clamp(0,100)→snap(5)→quickTo이고 `xTo(150)`은 `100px`, `xTo(3)`은 `5px`로 animate. | `Combine with utility methods…` | verified |
| QT-15 | Mouse Follower Demo를 게시한다. | `Mouse Follower Demo` | verified |
| QT-16 | 기본적으로 tween 안의 현재 progress 시점 현재 값에서 출발하며, 성능 최대화를 위해 target의 현재 값을 실제로 확인하지 않는다. | `Optionally define a start value` | verified |
| QT-17 | 2번째 파라미터로 숫자 시작값을 넘겨 덮어쓸 수 있다. `xTo(100)` vs `xTo(100, 500)`. | `Optionally define a start value` | verified |
| QT-18 | 결과 함수의 `.tween` property로 tween에 접근한다. 공식 예제는 `xTo.tween.pause()`. | `Access the tween` | verified |
| QT-19 | 일반 Tween 인스턴스이므로 `delay()`를 제외한 어떤 메서드·property든 활용할 수 있다. | `Access the tween` 끝 | verified |

### sourceBlockers

`none`. 46개 기술 item 전부 2026-08-04에 canonical 원문으로 직접 확인했다.

다음은 세 공식 페이지가 **게시하지 않은** 내용이므로 주장하지 않는다. 필요해지면 `blocked-source` item을 추가하고 release를 `BLOCK`한다.

- formal signature 블록, 인자 표, 기본값 표
- `50% - 250%`의 측정 환경·방법
- `quickSetter`가 돌려준 함수의 반환값
- `quickTo`가 돌려준 함수의 3번째 인자
- `quickTo`의 duration 하한과 `duration: 0`일 때의 동작
- DOM element가 아닌 일반 객체에서의 `getProperty` unit·null 동작
- `.tween.pause()` 이후 다시 호출했을 때의 관계
- 브라우저·버전 지원 표
- `quickSetter`·`quickTo`를 만든 뒤 되돌리거나 정리하는 방법

### moduleSelection

| module | 목적 | 근거 source |
| --- | --- | --- |
| callable method (`CM`) | 세 함수의 인자·반환값·호출 시점을 각각 확정한다. 특히 "값이 아니라 함수를 돌려받는다"를 중심에 둔다. | 세 source |
| utility·overload (`UT`) | `getProperty`의 unit 유무 오버로드와 property 생략 오버로드, 그리고 세 fast path 중 무엇을 고를지의 선택 기준을 대조한다. | 세 source |
| concept/guide subset (`CG`) | 고빈도 입력이라는 문제를 먼저 세우고, 언제 이 도구들이 **필요 없는지**까지 경계로 준다. | 세 source의 note·안내 문장 |

signature 표 모듈, 전체 Tween vars 카탈로그, ease visualizer, 설치 모듈은 추가하지 않는다. `gsap.to()` 속성 카탈로그 형식을 복제하지 않는다.

### learnerFlow

| id | 학습자 질문 | sourceItemIds |
| --- | --- | --- |
| `flow:why-not-to` | 입력마다 `gsap.to()`를 부르면 무엇이 문제인가요? | QS-02, QT-02 |
| `flow:read-shape` | 지금 값을 읽으면 무엇이 어떤 타입으로 돌아오나요? | GP-01, GP-02, GP-03, GP-04, GP-07, GP-08, GP-09 |
| `flow:read-where` | GSAP은 "현재 값"을 어디에서 찾나요? | GP-05, GP-06 |
| `flow:read-reuse` | 같은 대상을 반복해 읽을 때 문법이 따로 있나요? | GP-10, GP-11 |
| `flow:choose-path` | 즉시 써야 하나요, 시간을 두고 흘러가야 하나요? | QS-01, QS-03, QS-13, QT-01, QT-03, QT-12 |
| `flow:when-not-needed` | 그냥 `gsap.set()`·`gsap.to()`면 안 되나요? | QS-10 |
| `flow:what-breaks` | 빨라지는 대신 무엇이 안 되나요? | QS-04–QS-09, QT-04–QT-09 |
| `flow:reuse-tween` | 호출을 반복하면 Tween은 몇 개가 되나요? | QT-10, QT-11, QT-13, QT-15, QS-12 |
| `flow:start-value` | 새 값으로 갈 때 어디에서 출발하나요? | QT-16, QT-17 |
| `flow:touch-tween` | 만들어진 Tween을 직접 만질 수 있나요? | QT-18, QT-19 |
| `flow:compose` | 입력값을 다듬어 넣거나 여러 property를 한 번에 쓸 수 있나요? | QS-11, QS-14, QS-15, QS-16, QT-14 |

### coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| QS-02 | `InputStormSection.tsx` 공식 인용 문단 | covered |
| QT-02 | `InputStormSection.tsx` 공식 인용 문단 | covered |
| GP-01 | `ReadCurrentValueSection.tsx` `Returns : *` 설명 문단 | covered |
| GP-02 | `ReadCurrentValueSection.tsx` 반환 규칙 문단; 반환 형식 표 | covered |
| GP-03 | `ReadCurrentValueSection.tsx` 반환 규칙 문단; `PropertyReadout` `notARealProperty` 선택지 | covered |
| GP-04 | `ReadCurrentValueSection.tsx` 반환 형식 표(공식 첫 코드 블록 3줄) | covered |
| GP-05 | `ReadCurrentValueSection.tsx` 도입 문단; `PropertyReadout` 관찰 패널 | covered |
| GP-06 | `ReadCurrentValueSection.tsx` 조회 순서 4단계 목록 | covered |
| GP-07 | `ReadCurrentValueSection.tsx` 반환 형식 표 number 행; `PropertyReadout` unit `넘기지 않음` | covered |
| GP-08 | `ReadCurrentValueSection.tsx` "왜 숫자를 먼저 주나요" 문단 | covered |
| GP-09 | `ReadCurrentValueSection.tsx` 반환 형식 표 string 행; `PropertyReadout` unit `"px"` | covered |
| GP-10 | `ReadCurrentValueSection.tsx` 공식 `Examples:` 원문 코드 블록 | covered |
| GP-11 | `ReadCurrentValueSection.tsx` 공식 getter 원문 코드 블록; `PropertyReadout` `재사용 getter` 선택지 | covered |
| QS-01 | `ThreeFastPathsSection.tsx` 선택 표 `돌려주는 것` 열 | covered |
| QS-03 | `ThreeFastPathsSection.tsx` 공식 인용 문단 | covered |
| QS-10 | `ThreeFastPathsSection.tsx` "정말 필요한가요?" 경고 블록 | covered |
| QS-13 | `ThreeFastPathsSection.tsx` 갈림길 note 블록 | covered |
| QT-01 | `ThreeFastPathsSection.tsx` 선택 표 `돌려주는 것` 열 | covered |
| QT-03 | `ThreeFastPathsSection.tsx` 공식 인용 문단 | covered |
| QT-12 | `ThreeFastPathsSection.tsx` 보간 문단; `PointerFollowLab` duration·ease control과 코드 패널 | covered |
| QS-04 | `SkippedConveniencesSection.tsx` 건너뛰기 표 1행 quickSetter 열 | covered |
| QS-05 | `SkippedConveniencesSection.tsx` 건너뛰기 표 2행 quickSetter 열 | covered |
| QS-06 | `SkippedConveniencesSection.tsx` 건너뛰기 표 3행 quickSetter 열 | covered |
| QS-07 | `SkippedConveniencesSection.tsx` 건너뛰기 표 4행 quickSetter 열 | covered |
| QS-08 | `SkippedConveniencesSection.tsx` 건너뛰기 표 5행 quickSetter 열 | covered |
| QS-09 | `SkippedConveniencesSection.tsx` 건너뛰기 표 6행 quickSetter 열; alias 경고 블록 | covered |
| QT-04 | `SkippedConveniencesSection.tsx` 건너뛰기 표 1행 quickTo 열 | covered |
| QT-05 | `SkippedConveniencesSection.tsx` 건너뛰기 표 2행 quickTo 열 | covered |
| QT-06 | `SkippedConveniencesSection.tsx` 건너뛰기 표 3행 quickTo 열 | covered |
| QT-07 | `SkippedConveniencesSection.tsx` 건너뛰기 표 4행 quickTo 열 | covered |
| QT-08 | `SkippedConveniencesSection.tsx` 건너뛰기 표 5행 quickTo 열; attr 경고 문단 | covered |
| QT-09 | `SkippedConveniencesSection.tsx` 건너뛰기 표 6행 quickTo 열; alias 경고 블록 | covered |
| QT-10 | `FollowTheInputSection.tsx` 공식 인용 문단; `PointerFollowLab` `왜 이렇게 동작하나요?` | covered |
| QT-11 | `FollowTheInputSection.tsx` 공식 인용 문단; `PointerFollowLab` `등장한 Tween 인스턴스` 관찰값 | covered |
| QT-13 | `FollowTheInputSection.tsx` 공식 mousemove 원문 코드 블록 | covered |
| QT-15 | `FollowTheInputSection.tsx` 공식 데모 링크 목록 | covered |
| QT-16 | `FollowTheInputSection.tsx` "어디에서 출발할지" 문단 | covered |
| QT-17 | `FollowTheInputSection.tsx` 공식 시작값 원문 코드 블록 | covered |
| QT-18 | `FollowTheInputSection.tsx` 공식 `.tween` 원문 코드 블록; `PointerFollowLab` 일시정지 버튼 | covered |
| QT-19 | `FollowTheInputSection.tsx` "만들어진 Tween에 손대기" 문단(`delay()` 제외 포함) | covered |
| QS-12 | `FollowTheInputSection.tsx` 공식 데모 링크 목록 | covered |
| QS-11 | `PipeAndMultiValueSection.tsx` quickSetter pipe 원문 코드 블록 | covered |
| QT-14 | `PipeAndMultiValueSection.tsx` quickTo pipe 원문 코드 블록 | covered |
| QS-14 | `PipeAndMultiValueSection.tsx` 여러 값 트릭 표 `"css"` 행 + 원문 코드 블록 | covered |
| QS-15 | `PipeAndMultiValueSection.tsx` 여러 값 트릭 표 `"attr"` 행 + 원문 코드 블록 | covered |
| QS-16 | `PipeAndMultiValueSection.tsx` "공짜는 아닙니다" 경고 블록 | covered |
| HFU-P1 | `InputStormSection.tsx` probe 표 + 측정 방법 문단 | covered (probe) |
| HFU-P2 | `FollowTheInputSection.tsx` probe 목록 1항목 | covered (probe) |
| HFU-P3 | `FollowTheInputSection.tsx` probe 목록 2항목 | covered (probe) |
| HFU-P4 | `ReadCurrentValueSection.tsx` probe 블록 3항목 | covered (probe) |
| HFU-P5 | `FollowTheInputSection.tsx` probe 목록 3항목; `usePointerFollowAnimation.ts` reduced-motion 분기 주석 | covered (probe) |
| HFU-P6 | `FollowTheInputSection.tsx` probe 목록 4항목; `usePointerFollowAnimation.ts` `write()`의 paused 재조회 | covered (probe) |

`HFU-P1`–`HFU-P6`은 공식 item이 아니다. coverage 분모(46)에 포함하지 않으며 `PageCoverage`도 공식 46개와 분리해 센다.

### relatedPages

- `gsap-to` — Tween 생성 계약 전체를 소유한다. 이 페이지는 "그것을 반복 호출하면 안 되는 자리"만 다룬다.
- `tween-configuration` — vars 기본값의 출처를 소유한다. quickTo의 3번째 파라미터가 tween vars라는 사실만 여기서 보존한다.
- `css-animation` — transform 이름 규칙(`x` vs `translateX`)을 소유한다. alias 미변환 경고에서 링크한다.
- `non-css-target-values` — attribute 채널과 `attr:`를 소유한다. quickTo가 `attr:`를 쓸 수 없다는 경계에서 링크한다.
- `easing` — ease 곡선의 의미를 소유한다. `power3`는 공식 예제 값으로만 쓴다.
- `tween-playhead` — Tween 인스턴스 메서드와 재생 헤드를 소유한다. `.tween.pause()`에서 링크한다.
- `gsap.utils.pipe/clamp/snap`, `gsap.ticker` — 아직 로컬 전용 페이지가 없다. 06단계는 "맨 뒤에 붙일 수 있다"는 공식 범위까지만 설명하고 각 utility의 계약은 주장하지 않는다.

## 구현 계약

### exactFiles

create:

```text
src/content/gsap/fundamentals/high-frequency-updates/HighFrequencyUpdatesPage.tsx
src/content/gsap/fundamentals/high-frequency-updates/HighFrequencyUpdatesPage.css
src/content/gsap/fundamentals/high-frequency-updates/high-frequency-updates.meta.ts
src/content/gsap/fundamentals/high-frequency-updates/high-frequency-updates.catalog.ts
src/content/gsap/fundamentals/high-frequency-updates/components/PageCoverage/PageCoverage.tsx
src/content/gsap/fundamentals/high-frequency-updates/components/SectionHeading/SectionHeading.tsx
src/content/gsap/fundamentals/high-frequency-updates/sections/InputStormSection/InputStormSection.tsx
src/content/gsap/fundamentals/high-frequency-updates/sections/ReadCurrentValueSection/ReadCurrentValueSection.tsx
src/content/gsap/fundamentals/high-frequency-updates/sections/ThreeFastPathsSection/ThreeFastPathsSection.tsx
src/content/gsap/fundamentals/high-frequency-updates/sections/SkippedConveniencesSection/SkippedConveniencesSection.tsx
src/content/gsap/fundamentals/high-frequency-updates/sections/FollowTheInputSection/FollowTheInputSection.tsx
src/content/gsap/fundamentals/high-frequency-updates/sections/PipeAndMultiValueSection/PipeAndMultiValueSection.tsx
src/content/gsap/fundamentals/high-frequency-updates/sections/BoundariesSection/BoundariesSection.tsx
src/content/gsap/fundamentals/high-frequency-updates/examples/PropertyReadout/PropertyReadout.tsx
src/content/gsap/fundamentals/high-frequency-updates/examples/PropertyReadout/PropertyReadout.css
src/content/gsap/fundamentals/high-frequency-updates/examples/PropertyReadout/usePropertyReadoutRuntime.ts
src/content/gsap/fundamentals/high-frequency-updates/examples/PointerFollowLab/PointerFollowLab.tsx
src/content/gsap/fundamentals/high-frequency-updates/examples/PointerFollowLab/PointerFollowLab.css
src/content/gsap/fundamentals/high-frequency-updates/examples/PointerFollowLab/usePointerFollowAnimation.ts
docs/handoffs/gsap/core/high-frequency-updates.md
```

modify:

```text
src/app/routes.ts   # 이 컨텍스트는 건드리지 않았다. 라우트 등록은 코디네이터가 수행한다.
```

### exampleContracts

#### `PropertyReadout`

- goal: 같은 element 하나를 property·unit·호출 방식만 바꿔 읽어, `gsap.getProperty()`가 무엇을 어떤 타입으로 돌려주는지 확인한다.
- question: 읽기 요청의 형태가 바뀌면 반환값과 그 타입은 어떻게 달라지나요?
- representation: 대상 사각형 하나 + radio 3묶음 + 반환값/타입/실제 unit 3칸 readout + 코드 패널
- controls: property radio(`x` / `width` / `backgroundColor` / `notARealProperty`), unit radio(`넘기지 않음` / `"px"` / `"em"`), 호출 방식 radio(`직접 호출` / `재사용 getter`)
- runtimeSource: `usePropertyReadoutRuntime.ts` (상태형 비애니메이션 GSAP utility이므로 `Animation`이 아니라 `Runtime`)
- sourcePath: `examples/PropertyReadout/usePropertyReadoutRuntime.ts`
- runtimeOwnership: hook이 selector, property, 요청 unit, 정규화된 effective unit, 호출 방식, preset x를 담은 단일 descriptor를 소유한다. `gsap.set()`으로 transform을 걸고 `gsap.getProperty()`를 호출한 뒤 **돌아온 값과 `typeof`를 그대로** observation에 담는다. 어떤 값도 다시 계산하지 않는다. scoped `useGSAP` 한 개, `revertOnUpdate: true`.
- displayOwnership: TSX가 descriptor와 observation을 코드 문법으로만 직렬화하고 controls·readout·학습 패널을 그린다. unit 인자 문자열도 descriptor의 `effectiveUnit`에서만 만든다.
- coveredSourceItemIds: GP-03, GP-05, GP-07, GP-09, GP-11
- accessibility: native radio group 3개(`role="radiogroup"` + `aria-labelledby`), 반환값 readout은 `<dl>`에 `aria-live="polite"`, 색이 아닌 텍스트로 상태 전달, 좁은 화면에서 1열 전환
- motion: `none` — GSAP 호출이 `gsap.set()`과 `gsap.getProperty()`뿐이라 시간에 따른 이동이 전혀 없다. CSS transition·animation도 없다. 그래서 `useReducedMotion()` 분기를 두지 않았다(없는 모션을 끄는 죽은 코드가 된다). autoplay 없음.

#### `PointerFollowLab`

- goal: 같은 입력 숫자를 `quickSetter`와 `quickTo`에 각각 흘려보내며, 보간 유무와 "Tween이 몇 개나 등장하는가"를 동시에 관찰한다.
- question: 입력마다 함수를 다시 부르면 화면과 Tween 개수는 각각 어떻게 되나요?
- representation: 트랙 위 점 하나 + 포인터/슬라이더 이중 입력 + 5칸 관찰 readout + 코드 패널
- controls: 트랙 `onPointerMove`, 입력 위치 range(0–100, 키보드 경로), 쓰기 경로 radio(`quickSetter` / `quickTo`), duration range(0.1–1.2), ease radio(`power3` / `none`), `xTo.tween.pause()` 토글 버튼
- runtimeSource: `usePointerFollowAnimation.ts` (재사용 Tween의 생명주기를 소유하므로 `Animation`)
- sourcePath: `examples/PointerFollowLab/usePointerFollowAnimation.ts`
- runtimeOwnership: hook이 selector, unit, 요청 경로, 정규화된 effective 경로, duration, ease, 시작 x를 담은 단일 descriptor를 소유한다. 입력 정규화(트랙 rect → 0–100 → px 목표값)도 hook이 한다. `quickSetter`/`quickTo` 함수를 `useGSAP` 안에서 한 번만 만들고 handler는 그것만 부른다. `quickTo` 호출이 돌려준 Tween을 `Set`에 넣어 **재사용 여부를 실제로 센다**. scoped `useGSAP` 한 개, `revertOnUpdate: true`.
- displayOwnership: TSX가 descriptor와 observation을 코드 문법으로만 직렬화하고 controls·readout·학습 패널을 그린다. 보간값을 직접 계산하거나 목표 픽셀을 다시 조립하지 않는다.
- coveredSourceItemIds: QT-10, QT-11, QT-12, QT-18
- accessibility: 트랙은 `aria-hidden="true"`이고 **같은 값을 넣는 labeled range가 키보드·스크린리더 경로**다. radio group 2개에 `role="radiogroup"` + `aria-labelledby`, duration은 `<label>` + `<output>`, 관찰값은 `<dl>`에 `aria-live="polite"`, 모션 감소 안내는 `role="status"`, 좁은 화면에서 1열 전환
- motion: `useReducedMotion()`이 `true`면 **effective 경로를 `quickSetter`로 바꾼다.** `quickTo`의 duration을 0으로 낮추는 방법은 값이 목표에 도달하지 않아 쓸 수 없다(HFU-P5). 이때 duration·ease control은 `disabled`이고 화면에 그 사실을 문장으로 알린다. autoplay 없음 — 사용자가 입력을 넣기 전에는 아무것도 움직이지 않는다.

### nonGoals

- `gsap.set()`·`gsap.to()`의 vars 카탈로그를 이 페이지에서 다시 만들지 않는다.
- `gsap.utils.pipe`/`clamp`/`snap`의 계약을 주장하지 않는다. 공식 세 페이지가 게시한 "맨 뒤에 붙일 수 있다"까지만 보존한다.
- `gsap.ticker`와 프레임 루프 소유권을 가져오지 않는다.
- 두 예제를 하나의 generic runtime hook으로 합치지 않는다. 읽기 예제는 `Runtime`, 되따라가기 예제는 `Animation`으로 각자 소유한다.
- 두 축(x·y)을 동시에 따라다니는 mouse follower를 로컬에서 재현하지 않는다. 한 축·한 대상·한 변화로 좁히고 공식 데모를 링크한다.
- 공식 문서에 없는 `startIsRelative` 사용을 권하지 않는다. 존재만 기록한다.

### preserve

- 기존 학습 페이지의 파일·라우트·스타일 토큰
- 공용 컴포넌트(`OfficialDocsLink`, `useReducedMotion`) — 변경 없음
- `src/app/routes.ts` — 이 컨텍스트는 수정하지 않았다
- `master-page-inventory.md`의 소유권 행

## 검증 계약

### verifiedPerspectives

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion, Build/Integration, Cross-page Consistency — 모두 구현 컨텍스트가 직접 판정했다(`docs/workflows/quality-gates.md` 2026-08-04 개정: 독립 검수자를 두지 않는다).

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-CORE19-001 | ADDRESSED | 1차 WebFetch 요약이 quickSetter 건너뛰기 6항목 중 5항목만 반환하고 quickTo의 `Optionally define a start value` 절 전체를 누락했다. `curl`로 canonical HTML을 받아 `<article>`의 heading·`<li>`·`<pre>`를 원문 추출해 46개 item을 다시 세웠다. | 요약본만 믿었으면 기술 item 7개 이상이 소실됐다 | 이어받는 컨텍스트도 원문 인용으로 대조 |
| OC-CORE19-001 | PASS | 공식 46/46 item이 `coverageMap`에서 파일 근거로 연결됐다. 스크립트로 meta 섹션 합(2+11+7+12+9+5+0=46), catalog 공식 행 수(46), meta 분모(46)가 일치하고 ID 중복·미지정 sectionId가 없음을 대조했다. source별 분포는 getProperty 11, quickSetter 16, quickTo 19. | Official Coverage 통과 | none |
| LT-CORE19-001 | PASS | 공식 목차 순서(getProperty→quickSetter→quickTo)를 그대로 쓰지 않고 "문제 → 읽기 → 선택 → 대가 → 실행 → 조합 → 경계" 7단계로 재배열했다. 두 문서의 건너뛰기 목록을 6행 대조표로 합쳐 **다섯 번째만 다르다**는 관계를 드러냈고, 각 item에 전제·관찰·원리·사용처를 붙였다. | Learning Transformation 통과 | none |
| RDS-CORE19-001 | PASS | 두 예제 모두 hook의 단일 descriptor에서 GSAP 호출과 표시 코드가 함께 파생된다. 관찰값은 전부 GSAP이 쓴 결과를 다시 읽어 만든다 — `PropertyReadout`은 `gsap.getProperty()` 반환값을 그대로, `PointerFollowLab`은 `gsap.getProperty(element,'x')` 재조회와 `quickTo` 반환 Tween을 담은 `Set`의 크기, `tween.paused()` 재조회로 만든다. TSX에서 보간값이나 Tween 개수를 직접 계산하는 곳이 없음을 확인했다. TSX 어느 파일도 `gsap`을 import하지 않음을 grep으로 확인했다. | Runtime/Display Sync 통과 | none |
| RDS-CORE19-002 | ADDRESSED | 초안에서 `quickSetter` 경로만 writer 안에서 `observe()`를 부르고 `quickTo` 경로는 `onUpdate`에만 맡겨, Tween이 일시정지된 상태에서 입력하면 `함수를 부른 횟수`가 화면에서 멈췄다. 두 경로 모두 `write()` 끝에서 `observe()`를 부르도록 통일했다. | 표시값과 실제 호출이 어긋났다 | none |
| PROBE-CORE19-001 | PASS | GSAP 3.15.0 / Node v22.21.0에서 6개 항목을 실행 확인했다(아래 verificationEvidence에 숫자와 측정 방법 기재). 특히 `duration: 0`이 quickTo를 깨뜨린다는 사실이 reduced-motion 구현 방식을 바꿨다. | 공식 문장만으로는 알 수 없는 동작 6건 | `HFU-P1`–`HFU-P6`으로 기록하고 실행 확인 사실임을 페이지에 명시 |
| PED-CORE19-001 | PASS | 처음 나오는 용어를 쓰기 전에 정의했다 — `고빈도 입력`(01), `보간`(03), `pipe()`(06). 두 예제 모두 한 대상·한 변화이고 `무엇이 달라졌나요? / 무엇을 봐야 하나요? / 왜 이렇게 동작하나요? / 실제로 언제 쓰나요?` 네 패널을 갖췄다. 07단계에서 "이 도구들은 먼저 쓸 도구가 아니다"로 닫았다. | Pedagogy 통과 | none |
| STRUCT-CORE19-001 | PASS | 페이지 TSX는 헤더와 섹션 조립만 한다. 섹션 7개·예제 2개가 각자 폴더를 갖고, 실행 source는 성격에 따라 `usePropertyReadoutRuntime.ts`(비애니메이션 상태형)와 `usePointerFollowAnimation.ts`(Tween 생명주기)로 나뉜다. runtime 파일에 제목·설명·속성 표가 없고 TSX에 GSAP 생명주기가 없다. 한 파일 한 컴포넌트, 한 줄 한국어 주석 규칙을 지켰다. | Structure/Comment 통과 | none |
| STRUCT-CORE19-002 | PASS | 커리큘럼 메모의 "readout only / quickSetter / quickTo 세 모드"를 한 예제에 넣지 않고, 읽기는 `PropertyReadout`이 별도로 소유하게 했다. `learning-design.md`의 "한 예제는 하나의 핵심 질문에 답한다"가 더 강한 계약이고, 메모의 실제 금지 사항("세 점을 동시에 놓지 말 것")은 지켰다. | 계획 대비 의도적 편차 | none |
| A11Y-CORE19-001 | PASS (정적) | 정적으로 읽어 판정 가능한 부분: 모든 control이 native `input` + `label`이고 radio 묶음마다 `role="radiogroup"` + `aria-labelledby`가 있다. 포인터 트랙은 `aria-hidden="true"`이고 **같은 값을 넣는 labeled range가 키보드 경로로 항상 제공**된다. 관찰값은 색이 아닌 텍스트이며 `aria-live="polite"`, 모션 안내는 `role="status"`다. `:focus-visible` 아웃라인이 두 예제에 모두 있고, 720/860px 미디어 쿼리로 1열 전환한다. 표는 `caption`과 `scope`를 갖췄다. | 정적 접근성 통과 | none |
| MOTION-CORE19-001 | PASS (정적) | autoplay 없음 — 사용자가 입력을 넣기 전에는 어떤 값도 변하지 않는다. `useReducedMotion()`이 `true`면 `PointerFollowLab`의 effective 경로를 `quickSetter`로 바꿔 보간을 없애고, 그 사실을 화면에 문장으로 알리며 duration·ease control을 `disabled`로 만든다. `PropertyReadout`은 모션 자체가 없어 분기를 두지 않았다(사유를 exampleContracts에 기록). | 정적 motion 통과 | none |
| BUILD-CORE19-001 | PASS | `npx tsc --noEmit` — 이 페이지 파일에서 오류 0건. 모든 상대 import(`.ts`/`.tsx`/`.css`)가 실제 파일로 해석되는지 스크립트로 확인했고, TSX가 쓰는 className이 모두 CSS에 존재하는지도 대조했다(루트 `hfu-page`만 하위 선택자 전용으로 규칙 없음 — 참조 페이지와 동일한 관례). `src/app/routes.ts`와 `src/components/`는 `git status`로 미변경 확인. | Build/Integration 통과 | `npm run build`·`build-storybook`은 이 작업의 금지 항목이라 실행하지 않았다 |
| BUILD-CORE19-002 | ADVISORY | 같은 시점 `npx tsc --noEmit`에 다른 페이지(`gsap-context`, `tween-playback-controls`)의 미완성 import 오류 7건이 남아 있다. 이 페이지와 무관한 동시 작업 산출물이다. | 이 페이지의 release를 막지 않음 | 해당 페이지 담당 컨텍스트가 처리 |
| XPAGE-CORE19-001 | PASS | `gsap.to()`·transform 이름·attr 채널·ease·Tween 메서드·vars 기본값을 이 페이지가 소유하지 않고 각 owner 페이지로 링크했다. 링크한 6개 route가 모두 `src/app/routes.ts`에 등록되어 있음을 확인했다. 아직 페이지가 없는 `gsap.utils`·`gsap.ticker`는 링크 대신 07단계에서 비소유임을 명시했다. | Cross-page Consistency 통과 | none |
| A11Y-CORE19-002 | DEFERRED → PASS | 키보드 이동·포커스 표시, `prefers-reduced-motion` 실제 전환, 320/390px 실제 레이아웃, 두 예제 control의 실제 조작 결과 | 소유자 일괄 브라우저 검수 대상 | 전체 페이지 완성 후 일괄 확인 |

### verificationEvidence

- **공식 원문 대조** — 2026-08-04, 세 canonical URL을 `curl`로 직접 받아 `<article>` 안의 heading·`<li>`·`<pre>`를 원문 추출. 페이지별 구성(코드 블록 3/3/4개, 건너뛰기 목록 6/6항목, note admonition 1개, 데모 iframe 0/2/1개)을 개별 확인.
- **runtime probe** — 전부 GSAP 3.15.0, Node v22.21.0, DOM 없는 환경. `import gsap from 'gsap'`.
  - `HFU-P1` Tween 누적. 측정: 실행 전 `gsap.globalTimeline.clear()`, 50회 호출 후 `gsap.globalTimeline.getChildren(true, true, true).length`. 결과 — baseline `0`, `gsap.to()` 50회 → **50**, quickTo 함수 50회 → **1**, quickSetter 함수 50회 → **0**(target `x` = 49).
  - `HFU-P2` quickSetter 반환 함수. 측정: `fn.length`와 호출 반환값. 결과 — `fn.length` = **1**. 단일 target: `setX(42)` → **42**, target `x` = 42. 다중 target(`[{x:0},{x:0}]`): `setMulti(7)` → **undefined**, 두 target 모두 `x` = 7. 요소 1개짜리 배열은 단일 취급되어 **7**을 돌려준다.
  - `HFU-P3` quickTo 반환 함수. 측정: `fn.length`, `.tween` 생성자명, 호출 반환값 동일성. 결과 — `fn.length` = **3**, `.tween` = `Tween`, 첫 호출 반환 `=== .tween` **true**, 두 번째 호출 반환 `===` 첫 반환 **true**. 3번째 인자: `x`가 100인 대상에 `uTo(200, 50, true)` → progress 0에서 `x` = **150**, progress 1에서 **200**. `startIsRelative` 이름은 `node_modules/gsap/types/gsap-core.d.ts`의 `QuickToFunc`에만 있고 공식 페이지에는 없다.
  - `HFU-P4` 일반 객체 target. 측정: 반환값과 `typeof`. 결과 — `gsap.getProperty({x:5},'x')` → **5** (`number`), `gsap.getProperty({x:5},'x','px')` → **5** (`number`, unit 무시), `gsap.getProperty({x:5},'nope')` → **undefined**, 재사용 getter도 동일. 반면 `gsap.quickSetter(obj,'x','px')(42)` → `obj.x` = **"42px"** (`string`).
  - `HFU-P5` duration 하한. 측정: `duration` 0 / 0.001 / 0.3으로 각각 quickTo를 만들어 `f(250)` 호출 후 400ms 뒤 target 값. 결과 — **0.1**(도달 실패, 내부 초기값 `"+=0.1"`에 머묾) / **250** / **250**. 동기 읽기에서도 duration 0은 0.1이었다. → reduced-motion을 `duration: 0`으로 구현하면 안 되는 근거.
  - `HFU-P6` 일시정지와 이후 호출. 측정: `pause()` 직후와 다음 호출 직후의 `tween.paused()`. 결과 — `pause()` 후 **true**, `xTo(200)` 호출 후 **false**, 600ms 뒤 target `x` = **200**.
  - 참고(페이지에 주장하지 않음): `quickTo`의 vars에 `onUpdate`를 넣으면 정상 호출된다(duration 0.2에서 49회). `PointerFollowLab`이 이 방식으로 매 프레임 값을 다시 읽는다.
- **build** — `npx tsc --noEmit`, 이 페이지 파일 오류 0건. `npm run build`·`npm run build-storybook`은 이 작업에서 금지되어 실행하지 않았다. 라우트 등록 후 코디네이터가 전체 빌드를 확인해야 한다.
- **정적 검사 스크립트** — (1) meta 섹션 합 = catalog 공식 행 수 = meta 분모 = 46, (2) 모든 상대 import 해석 가능, (3) TSX className이 CSS에 존재, (4) TSX에 `gsap` import 없음, (5) `src/app/routes.ts`·`src/components/` 미변경.

### releaseDecision

`PASS` (전체 빌드 확인 조건부).

- 미해결 `BLOCK`: 없음.
- 해소된 `DEFERRED → PASS` 1건: `A11Y-CORE19-002` — 키보드 이동·포커스 표시, `prefers-reduced-motion` 실제 전환, 320/390px 실제 레이아웃, 두 예제 control의 실제 조작. 소유자 브라우저 일괄 검수 대상.
- 남은 통합 조건: `src/app/routes.ts`에 `/fundamentals/high-frequency-updates` 등록과 그 뒤의 `npm run build` / `npm run build-storybook`. 두 작업 모두 이 컨텍스트의 금지 범위라 코디네이터가 수행한다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
