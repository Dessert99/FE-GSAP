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
- reviewedAt: `2026-08-13`
- category: `Fundamentals > GSAP`
- slug: `high-frequency-updates`
- sourcePageIds: primary `source:gsap-get-property`; related `source:gsap-quick-setter`, `source:gsap-quick-to`

세 페이지 모두 **formal signature 블록·인자 표·기본값 표가 없다.** 반환 표기만 있다(`Returns : *` / `Returns : Function` / `Returns : Function`). 인자와 반환값은 산문과 코드 예제에만 나온다. 게시되지 않은 명세를 기억이나 TypeScript 선언으로 채우지 않는다. 해당 칸은 `공식 페이지에 명시 없음`으로 표시한다.

heading 구성(2026-08-13 재확인):

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

`none`. 46개 기술 item 전부 2026-08-13에 canonical 원문으로 다시 확인했다.

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
| HFU-P6 | `FollowTheInputSection.tsx` 설치본 관찰 note; `usePointerFollowAnimation.ts` `write()`의 paused 재조회 | covered (implementation observation) |

`HFU-P6`은 일시정지 버튼의 실제 동작을 설명하는 설치본 관찰이며 공식 item이 아니다. 공식 coverage 분모 46개에는 포함하지 않는다.

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
- accessibility: 트랙은 `aria-hidden="true"`이고 **같은 값을 넣는 labeled range가 키보드·스크린리더 경로**다. radio group 2개에 `role="radiogroup"` + `aria-labelledby`, duration은 `<label>` + `<output>`, 관찰값은 의미가 있는 `<dl>`, 모션 감소 안내는 `role="status"`, 좁은 화면에서 1열 전환
- motion: `useReducedMotion()`이 `true`면 **effective 경로를 `quickSetter`로 바꿔 보간을 없앤다.** 이때 duration·ease control은 `disabled`이고 화면에 그 사실을 문장으로 알린다. autoplay 없음 — 사용자가 입력을 넣기 전에는 아무것도 움직이지 않는다.

### nonGoals

- `gsap.set()`·`gsap.to()`의 vars 카탈로그를 이 페이지에서 다시 만들지 않는다.
- `gsap.utils.pipe`/`clamp`/`snap`의 계약을 주장하지 않는다. 공식 세 페이지가 게시한 "맨 뒤에 붙일 수 있다"까지만 보존한다.
- `gsap.ticker`와 프레임 루프 소유권을 가져오지 않는다.
- 두 예제를 하나의 generic runtime hook으로 합치지 않는다. 읽기 예제는 `Runtime`, 되따라가기 예제는 `Animation`으로 각자 소유한다.
- 두 축(x·y)을 동시에 따라다니는 mouse follower를 로컬에서 재현하지 않는다. 한 축·한 대상·한 변화로 좁히고 공식 데모를 링크한다.
- 공식 문서에 없는 내부 인자와 반환 규칙을 학습 내용으로 확장하지 않는다.

### preserve

- 기존 학습 페이지의 파일·라우트·스타일 토큰
- 공용 컴포넌트(`OfficialDocsLink`, `useReducedMotion`) — 변경 없음
- `src/app/routes.ts` — 이 컨텍스트는 수정하지 않았다
- `master-page-inventory.md`의 소유권 행

## 검증 계약

### verifiedPerspectives

2026-08-13 감사에서 Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion을 다시 판정했다. 전역 build는 메인 통합에서 통과했고 실제 브라우저 동작은 `NOT VERIFIED`로 남긴다.

### historicalFindings (2026-08-04 구현 기록)

초기 구현 시점의 상세 결과와 runtime probe 수치는 git 이력에 남아 있다. 현재 페이지가 설명하지 않는 내부 동작을 학습 계약처럼 보이게 하지 않도록, 2026-08-13 감사에서는 UI 동작과 직접 연결된 `HFU-P6`만 남겼다.

### findings

| ID | initial | current | evidence |
| --- | --- | --- | --- |
| SRC-HFU-01 | PASS | PASS | 2026-08-13 canonical 세 페이지에서 반환 표기, 세부 절, quickSetter/quickTo 건너뛰기 6항목, quickTo 시작값·`.tween` 절을 다시 대조했다. 공식 item 46개는 변경 없음. |
| PED-HFU-01 | BLOCK | PASS | 첫 화면의 `3/3`, `46/46 source item`, 섹션별 수량과 본문의 설명 소유권 표현을 학습 순서와 다음 학습 경로로 바꿨다. 페이지 학습에 불필요한 설치본 내부 probe 5건은 제거하고 일시정지 UI에 필요한 관찰만 남겼다. |
| RDS-HFU-01 | BLOCK | PASS | 입력 전 코드 패널이 실행하지 않은 `setX(0)`/`xTo(0)`을 표시했고, 실제 baseline·`onUpdate`·pause 상태를 생략했다. 표시 코드를 실제 단계에 맞추고, quickTo 생성 직후 `xTo.tween.paused()`를 읽어 버튼·상태·pause/resume 코드를 동기화하며, 생성 시점의 Tween부터 세고 설정 변경 시 range도 초기화했다. |
| A11Y-HFU-01 | BLOCK | PASS (정적) | quickTo의 매 프레임 `onUpdate`가 갱신하는 `<dl>`에서 `aria-live="polite"`를 제거했다. 포인터 트랙을 대신하는 labeled range와 native controls는 유지했다. |
| COMMENT-HFU-01 | PASS | PASS | 변경한 예제 선언과 실행 단계에 한 줄 한국어 주석을 두고, 제거된 probe 전용 CSS도 함께 정리했다. |

### verificationEvidence

- **공식 원문 대조** — 2026-08-13, [getProperty](https://gsap.com/docs/v3/GSAP/gsap.getProperty%28%29/), [quickSetter](https://gsap.com/docs/v3/GSAP/gsap.quickSetter%28%29/), [quickTo](https://gsap.com/docs/v3/GSAP/gsap.quickTo%28%29/)의 현재 본문을 직접 대조했다.
- **정적 변환·연결 검사** — 대상 TypeScript/TSX 16개를 esbuild transform했고 오류가 없었다. CSS와 공용 route registry를 external로 둔 페이지 entry bundle도 통과했다. `git diff --check` 오류 0건.
- **정적 coverage** — 공식 catalog 행 46개, 설치본 관찰 `HFU-P6` 1개, ID 중복 0개, source별 분포 getProperty 11 / quickSetter 16 / quickTo 19를 확인했다.
- **정적 runtime/display 검사** — 두 예제의 hook/TSX를 함께 읽고 selector, 초기값, 실제 호출, 코드 패널, 관찰값 출처를 대조한다. PointerFollow는 `gsap.set()` baseline, `quickSetter`/`quickTo` 호출, quickTo `onUpdate` 관찰을 표시한다.
- **설치본 관찰** — GSAP 3.15.0에서 quickTo 생성 직후 `xTo.tween.paused()`는 `true`, `xTo(100) === xTo.tween`은 `true`, 새 값을 넘긴 직후 `paused()`는 `false`, 100ms 뒤 최종 x는 200임을 재확인했다. 이는 공식 계약이 아니다.
- **전역 build** — 2026-08-13 메인 통합 `npm run build`, `npm run build-storybook` 모두 exit 0.
- **브라우저** — 이 감사 컨텍스트에서는 실행하지 않는다.

### releaseDecision

`NOT VERIFIED`

- 미해결 `BLOCK`: 없음.
- 남은 `ADVISORY`: `HFU-P6`은 설치된 GSAP 3.15.0의 관찰이며 공식 문서가 보장하는 동작이 아니다.
- 남은 `NOT VERIFIED`: 실제 브라우저에서 포인터·range·radio·pause 조작, 키보드 포커스, `prefers-reduced-motion`, 320/390px 레이아웃, route 이동·cleanup.

### browserReviewClosure

- status: `NOT VERIFIED`
- evidenceBoundary: 실제 브라우저 조작은 메인 에이전트의 통합 검수 범위다.
