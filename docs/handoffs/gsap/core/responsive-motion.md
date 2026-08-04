# Responsive motion handoff

## 입력 계약

### objective

breakpoint와 사용자의 모션 설정처럼 **조건에 따라 달라지는 animation**을, 만드는 방법이 아니라 **조건이 바뀐 순간 이전 것이 어떻게 정리되는가**를 축으로 가르친다. 이 페이지의 핵심 학습 목표는 `gsap.matchMedia()`가 가져가는 책임이 "조건이 맞을 때 실행"이 아니라 **"조건이 안 맞게 될 때 그 실행이 만든 것 전부를 revert"**라는 것을 관찰 가능하게 만드는 것이다. 그리고 `gsap.matchMediaRefresh()`는 조건이 하나도 바뀌지 않았을 때도 그 정리와 재실행을 강제하는 장치로 위치시킨다.

이 페이지는 이 저장소의 **모든 예제가 이미 쓰고 있는 `prefers-reduced-motion`**과 직접 이어진다. 학습자가 "왜 이 사이트의 예제들이 모션 감소 설정에서 다르게 동작하는지"를 여기서 이해하도록, 06단계에서 두 경로(React 훅으로 media query를 읽어 실행값을 바꾸는 방식 vs GSAP에게 판단과 정리를 함께 맡기는 방식)를 명시적으로 구분한다.

### officialPage

- title: `gsap.matchMedia()` + `gsap.matchMediaRefresh()`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/gsap.matchMedia()`
  - `https://gsap.com/docs/v3/GSAP/gsap.matchMediaRefresh()`
- reviewedAt: `2026-08-04`
- category: `Fundamentals > GSAP`
- slug: `responsive-motion`
- sourcePageIds: primary `source:gsap-match-media`; related `source:gsap-match-media-refresh`

두 공식 페이지 어느 쪽도 **형식 시그니처 줄을 게시하지 않는다.** `gsap.matchMedia()`에는 `Returns : MatchMedia` heading이 있지만 인자 표기는 본문 문장과 예제에만 있고, `.add()`에도 시그니처 줄이 없다. `gsap.matchMediaRefresh()` 페이지에는 시그니처 줄도, `Returns` 절도, Parameters 절도 없다. 게시되지 않은 명세를 기억이나 TypeScript 선언으로 채우지 않는다. 해당 칸은 페이지에 `공식 페이지에 명시 없음`으로 표시했다.

각 canonical은 **원문 인용을 요구하는 조회를 3회씩** 수행해 대조했다(아래 `SRC-CORE22-002` 참조). 요약 모델이 항목을 뭉개는 것을 막기 위한 것이며, 실제로 1차 조회가 빠뜨린 항목이 있었다.

### localPage

- localPath: `src/content/gsap/fundamentals/responsive-motion/`
- route: `/fundamentals/responsive-motion`

### sourceManifest

**authority는 `src/content/gsap/fundamentals/responsive-motion/responsive-motion.catalog.ts`의 `responsiveMotionSourceItems` 배열이다.** 이 문서는 그 배열을 복제하지 않고 분포만 고정한다. 배열의 각 행이 `id`, `officialItem`(공식 주장을 한국어로 옮긴 원문 대응), `source`, `origin`, `sectionId`를 갖는다.

공식 item **33개** + 설치본 확인 item **6개** = catalog 행 39개.

#### source별 공식 item 수

| source | 공식 문서 | 공식 item 수 | id 접두 |
| --- | --- | ---: | --- |
| `match-media` | gsap.matchMedia() | 29 | `MM-01` ~ `MM-29` |
| `match-media-refresh` | gsap.matchMediaRefresh() | 4 | `MMR-01` ~ `MMR-04` |
| 합계 | | **33** | |

#### 섹션별 공식 item 수

| # | sectionId | 섹션 제목 | 공식 item 수 | 소속 id |
| --- | --- | --- | ---: | --- |
| 01 | `auto-revert` | 조건이 바뀌면 이전 animation은 누가 치우나 | 4 | MM-01, MM-02, MM-03, MM-28 |
| 02 | `add-parameters` | mm.add()에 넘기는 세 가지 | 9 | MM-04, MM-05, MM-06, MM-07, MM-08, MM-09, MM-10, MM-12, MM-27 |
| 03 | `conditions-object` | 조건을 객체로 묶고 boolean으로 읽는다 | 5 | MM-13, MM-14, MM-15, MM-16, MM-18 |
| 04 | `cleanup-order` | 자동 정리와 내가 쓰는 정리는 층이 다르다 | 5 | MM-11, MM-17, MM-19, MM-20, MM-26 |
| 05 | `scope-selector` | 선택자가 닿는 범위를 좁힌다 | 3 | MM-21, MM-22, MM-23 |
| 06 | `reduced-motion-refresh` | 모션을 줄여 달라는 요청에 답한다 | 6 | MM-24, MM-25, MMR-01, MMR-02, MMR-03, MMR-04 |
| 07 | `boundaries` | 여기서 다루지 않는 것 | 1 | MM-29 |
| | | 합계 | **33** | |

#### 설치본 확인 item (공식 분모에 포함하지 않음)

| id | 확인한 사실 | 소속 섹션 |
| --- | --- | --- |
| `MM-P1` | MatchMedia는 `contexts` 배열과 `add()` · `revert(config?)` · `kill(revert?)`를 가진다 | `auto-revert` |
| `MM-P2` | `mm.add()`는 MatchMedia 자신을 돌려준다 | `add-parameters` |
| `MM-P3` | `add()` 호출 시점에 이미 조건이 맞으면 handler가 그 자리에서 한 번 실행된다 | `add-parameters` |
| `MM-P4` | `context.conditions` 옆에 `context.queries`가 있어 원본 query 문자열을 들고 있다 | `conditions-object` |
| `MM-P5` | handler가 반환한 cleanup 함수는 `mm.revert()`를 직접 부를 때도 실행되고, 그때 tween 값도 되돌아간다 | `cleanup-order` |
| `MMR-P1` | `gsap.matchMediaRefresh()`는 조건이 하나도 바뀌지 않아도 정리·재실행을 일으키며 반환값은 `undefined`다 | `reduced-motion-refresh` |

`PageCoverage`는 `origin`으로 두 그룹을 나눠 센다. 공식 분모는 33이고 설치본 항목 6개는 따로 표시한다.

### sourceBlockers

`none`. 33개 공식 item 전부 2026-08-04에 두 canonical 원문으로 직접 확인했다.

다음은 두 공식 페이지가 **게시하지 않은** 내용이므로 주장하지 않는다. 필요해지면 `blocked-source` item을 추가하고 release를 `BLOCK`한다.

- `gsap.matchMedia()` · `.add()` · `gsap.matchMediaRefresh()`의 형식 시그니처 줄 (세 곳 모두 없음)
- `gsap.matchMediaRefresh()`의 Parameters · Returns 절 (페이지에 절 자체가 없음)
- `.add()` 세 인자의 기본값
- MatchMedia가 가진 멤버 목록 — `revert()` · `add()`를 문장 안에서 쓰기만 한다
- `mm.kill()`과 `mm.revert(config)`의 차이, `config`가 받는 값
- 조건이 여러 개 동시에 토글될 때 handler가 몇 번 실행되는지
- 공식 페이지의 데모 셋(`Demo using conditional syntax`, `simple demo`, `checkbox toggle`)과 `Examples`의 코드 — 전부 CodePen 임베드라 본문에 코드가 없다. 대조 근거를 **본문 문장과 본문 코드 블록**으로 한정했고, 그 사실 자체를 `MM-29`로 기록해 `BoundariesSection`에 표시했다.

### moduleSelection

| module | 목적 | 근거 source |
| --- | --- | --- |
| callable method (`CM`) | `gsap.matchMedia()` · `.add()` · `gsap.matchMediaRefresh()`의 인자·반환값·호출 시점을 확정한다. 게시되지 않은 칸은 `공식 페이지에 명시 없음`으로 표시한다. | 두 source |
| 개념·가이드 (`CG`) | "조건이 바뀌면 이전 것을 누가 치우나"라는 문제에서 출발해, 수동 정리와 자동 정리의 차이를 하나의 멘탈 모델로 묶는다. | MM-01, MM-05, MM-08, MM-26 |
| class·instance (`CI`) | MatchMedia instance의 수명 — 언제 만들어지고, 조건 토글·`revert()`·`matchMediaRefresh()`에서 각각 어떻게 되는지. | MM-03, MM-05, MM-19, MMR-01, MMR-03 |

property catalog, ease visualizer, plugin, installation 모듈은 추가하지 않는다.

### learnerFlow

| id | 학습자 질문 | sourceItemIds |
| --- | --- | --- |
| `flow:who-cleans` | 조건이 바뀌면 이전 animation은 누가 치우나요? | MM-01, MM-02, MM-03, MM-28 |
| `flow:add-shape` | 조건과 할 일을 어떻게 짝지어 주나요? | MM-04, MM-05, MM-07, MM-08, MM-09, MM-10, MM-12 |
| `flow:reentry` | 그 함수는 몇 번 불리나요? | MM-06, MM-27 |
| `flow:conditions` | 조건이 여럿인데 코드가 거의 같으면? | MM-13, MM-14, MM-15, MM-16 |
| `flow:toggle-rule` | 정확히 언제 다시 실행되나요? | MM-18 |
| `flow:two-layers` | 내가 반환하는 cleanup 함수는 무엇을 맡나요? | MM-11, MM-17, MM-19, MM-20, MM-26 |
| `flow:scope` | 선택자가 다른 컴포넌트까지 잡으면? | MM-21, MM-22, MM-23 |
| `flow:a11y` | 사용자가 모션을 줄여 달라고 하면? | MM-25 |
| `flow:force-rerun` | media query가 아닌 앱 설정은 어떻게 반영하나요? | MM-24, MMR-01, MMR-02, MMR-03, MMR-04 |
| `flow:limits` | 공식이 답하지 않는 것은 무엇인가요? | MM-29 |

### coverageMap

catalog의 각 행이 `sectionId`로 소유 섹션을 지목하고, `PageCoverage`가 같은 배열을 세어 화면에 분모를 드러낸다. 섹션 파일별 근거는 다음과 같다.

| sectionId | localEvidence | localStatus |
| --- | --- | --- |
| `auto-revert` | `sections/AutoRevertSection/AutoRevertSection.tsx` — 용어 카드 4개, 수동/자동 정리 대비 코드 2블록, 공식 첫 문장 인용, 기본 정보 표(반환값·인자·버전·시그니처 미게시), probe note | covered |
| `add-parameters` | `sections/AddParametersSection/AddParametersSection.tsx` — structure 한 줄, 인자 표 3행 + 기본값 미게시 행, Quick Start 원문 코드, desktop/mobile 원문 코드, 재호출 문단, viewport meta 경고, probe note | covered |
| `conditions-object` | `sections/ConditionsObjectSection/ConditionsObjectSection.tsx` — conditions 객체 원문, 공식 conditions 예제 전문, 재실행 규칙 경고, probe note, `ConditionRebuildLab` | covered |
| `cleanup-order` | `sections/CleanupOrderSection/CleanupOrderSection.tsx` — 정리 두 층 표, `do NOT do that here` 경고, `context.add("onClick")` 원문 코드, gsap.context() wrapper note, probe note | covered |
| `scope-selector` | `sections/ScopeSelectorSection/ScopeSelectorSection.tsx` — per-add scope 원문 코드, default scope 원문 코드, 이 페이지 예제가 같은 형태를 쓴다는 note | covered |
| `reduced-motion-refresh` | `sections/ReducedMotionRefreshSection/ReducedMotionRefreshSection.tsx` — 접근성 문단 + CSS-Tricks 링크, refresh 4행 표 + 미게시 행, probe note, `ReduceMotionRefreshLab` | covered |
| `boundaries` | `sections/BoundariesSection/BoundariesSection.tsx` — 미게시 항목 목록, 다른 페이지 소유 개념 링크, 미등록 이웃 개념 목록, CodePen 임베드 note(`MM-29`) | covered |

`MM-P1`~`MMR-P1`은 공식 item이 아니다. coverage 분모(33)에 포함하지 않으며 각 섹션의 `responsive-page__note--probe` 블록에서 **"공식 페이지에 게시돼 있지 않다"**는 문장과 함께 표시한다.

### relatedPages

- `tween-configuration` — `duration`·`rotation` 같은 설정의 출처와 적용 범위를 소유한다. 이 페이지는 conditions에서 그 값을 고르는 부분만 다룬다.
- `gsap-to` — `vars` 전체 명세를 소유한다.
- `css-animation` — transform과 CSS property를 GSAP이 다루는 방식을 소유한다.
- `gsap-context`(다른 컨텍스트가 작성 중) — `gsap.context()` 자체의 생성·기록·revert 명세를 소유한다. 이 페이지는 **"matchMedia가 내부적으로 context를 만든다"**는 공식 문장(`MM-26`)까지만 다루고 링크를 걸지 않는다(라우팅 미등록).
- `react-use-gsap`(다른 컨텍스트가 작성 중) — `useGSAP()` 생명주기를 소유한다. 이 페이지의 두 예제가 그 훅을 쓰지만 명세는 소유하지 않는다.
- `scroll-trigger-responsive`(플러그인 트랙, 미구현) — `ScrollTrigger.matchMedia()` · `clearMatchMedia()` legacy API를 소유한다.

## 구현 계약

### exactFiles

create:

```text
src/content/gsap/fundamentals/responsive-motion/ResponsiveMotionPage.tsx
src/content/gsap/fundamentals/responsive-motion/ResponsiveMotionPage.css
src/content/gsap/fundamentals/responsive-motion/responsive-motion.meta.ts
src/content/gsap/fundamentals/responsive-motion/responsive-motion.catalog.ts
src/content/gsap/fundamentals/responsive-motion/components/PageCoverage/PageCoverage.tsx
src/content/gsap/fundamentals/responsive-motion/components/SectionHeading/SectionHeading.tsx
src/content/gsap/fundamentals/responsive-motion/sections/AutoRevertSection/AutoRevertSection.tsx
src/content/gsap/fundamentals/responsive-motion/sections/AddParametersSection/AddParametersSection.tsx
src/content/gsap/fundamentals/responsive-motion/sections/ConditionsObjectSection/ConditionsObjectSection.tsx
src/content/gsap/fundamentals/responsive-motion/sections/CleanupOrderSection/CleanupOrderSection.tsx
src/content/gsap/fundamentals/responsive-motion/sections/ScopeSelectorSection/ScopeSelectorSection.tsx
src/content/gsap/fundamentals/responsive-motion/sections/ReducedMotionRefreshSection/ReducedMotionRefreshSection.tsx
src/content/gsap/fundamentals/responsive-motion/sections/BoundariesSection/BoundariesSection.tsx
src/content/gsap/fundamentals/responsive-motion/examples/ConditionRebuildLab/ConditionRebuildLab.tsx
src/content/gsap/fundamentals/responsive-motion/examples/ConditionRebuildLab/ConditionRebuildLab.css
src/content/gsap/fundamentals/responsive-motion/examples/ConditionRebuildLab/useConditionRebuildAnimation.ts
src/content/gsap/fundamentals/responsive-motion/examples/ReduceMotionRefreshLab/ReduceMotionRefreshLab.tsx
src/content/gsap/fundamentals/responsive-motion/examples/ReduceMotionRefreshLab/ReduceMotionRefreshLab.css
src/content/gsap/fundamentals/responsive-motion/examples/ReduceMotionRefreshLab/useReduceMotionRefreshAnimation.ts
docs/handoffs/gsap/core/responsive-motion.md
```

modify:

```text
src/app/routes.ts   (이 컨텍스트는 건드리지 않는다 — 저장소 소유자가 등록한다)
```

### exampleContracts

#### 예제 표현 방식 결정 — 왜 "창 크기를 바꾸세요"로 만들지 않았나

`gsap.matchMedia()`의 조건은 브라우저의 `window.matchMedia()`가 답한다. **컨테이너 폭이나 페이지 안의 값으로는 어떤 media query도 토글할 수 없다.** 따라서 "조건이 바뀌면 정리된다"를 그대로 보여주려면 학습자에게 브라우저 창을 직접 줄였다 늘리라고 요구해야 한다.

`docs/workflows/learning-design.md`의 예제 계약은 **"조작할 값과 관찰할 변화를 실행 전에 알려준다"**와 **"결과뿐 아니라 왜 그렇게 되는지와 실제 사용처를 설명한다"**를 요구한다. 창 크기 조작은 이 계약을 깨뜨린다 — 조작 대상이 페이지 밖(브라우저 크롬)에 있고, 조작하는 동안 관찰 대상(표·카운터)이 함께 흔들리거나 화면 밖으로 밀린다. 관찰과 조작이 같은 화면에 있지 않으면 학습이 끊긴다.

그래서 두 예제 모두 **페이지 안에서 조작이 끝나는 형태**로 설계했고, 각각 다른 근거를 쓴다.

- `ConditionRebuildLab` — 조건이 아니라 **breakpoint 값**을 control로 둔다. query 문자열이 그 값에서 만들어지므로, slider를 지금 창 폭 위아래로 끌면 `isWide`/`isNarrow`가 실제로 뒤집힌다. 다만 이때의 재실행 계기는 브라우저의 조건 토글이 아니라 React dependency 변화(`revertOnUpdate: true`)다. **그 차이를 감추지 않고** 예제 하단 note에 명시했다 — "브라우저 창을 실제로 줄였다 늘려도 같은 일이 일어나고 그때는 GSAP이 스스로 감지한다. slider를 움직이면 query 문자열 자체가 달라지므로 이 예제는 MatchMedia를 되돌리고 새로 만든다."
- `ReduceMotionRefreshLab` — OS의 모션 설정은 페이지에서 바꿀 수 없다. 그래서 **공식 문서가 제시한 그 사용처**(`MMR-02` "reduce motion 같은 것을 토글하는 UI 체크박스")를 그대로 구현했다. 체크박스는 media query가 아니므로 조건이 토글되지 않고, 그래서 handler가 다시 실행되지 않는다 — 그 "아무 일도 안 일어남"이 먼저 관찰되고, `gsap.matchMediaRefresh()` 버튼이 그것을 해결한다. 창 크기와 무관하게 in-page에서 완결된다.

#### `ConditionRebuildLab`

- goal: 조건 boolean이 뒤집힐 때 이전 실행이 만든 것이 정리되고 handler가 다시 실행되는 것을, 실행 횟수·정리 기록·화면 상태로 동시에 관찰한다.
- question: 조건이 뒤집히면 이전 실행은 어떻게 되나요?
- representation: 사각형 하나 + 조건 표(이름 · query 문자열 · boolean · 뜻) + 관찰 `dl`(실행 횟수 · 직전 정리 기록 · 이번 실행이 쓴 값) + 실행 코드 패널
- controls: breakpoint slider(320~1600, step 40), "이번 조건으로 재생" 버튼
- runtimeSource: `useConditionRebuildAnimation.ts`
- sourcePath: `examples/ConditionRebuildLab/useConditionRebuildAnimation.ts`
- runtimeOwnership: hook이 `createQueries(breakpoint)`와 `createDescriptor(breakpoint, conditions)`로 단일 descriptor를 만들고, `gsap.matchMedia(scope)` 하나와 `mm.add(conditions, handler)` 하나, handler 안의 `gsap.set` · paused `gsap.to`, 실행/정리 카운터, `resize` 리스너(창 폭 표시용)를 소유한다. scoped `useGSAP` 한 개, `dependencies: [breakpoint]`, `revertOnUpdate: true`.
- displayOwnership: TSX가 descriptor의 query 문자열·boolean·x·rotation·duration을 코드 문법으로만 직렬화한다. `gsap`을 import하지 않고 조건을 다시 판정하지 않는다. 표의 boolean은 `context.conditions`가 채워 준 값을 그대로 읽은 것이다.
- coveredSourceItemIds: MM-13, MM-14, MM-15, MM-16, MM-18, MM-P4 (관찰 근거로 MM-01, MM-06, MM-08도 재확인)
- accessibility: native labeled slider와 버튼, 관찰값은 `dt`/`dd` + `output aria-labelledby`, 상태는 `role="status"` 하나, 표는 `overflow-x: auto` 래퍼, 860px 이하 단일 열
- motion: 자동 재생 없음. handler가 만드는 tween은 전부 `paused: true`이고 재생은 버튼으로만 한다. `reduceMotion` 조건이 참이면 `rotation: 0`, `duration: 0`으로 실행값 자체가 모션 없는 값이 된다(공식 예제 `duration: reduceMotion ? 0 : 2`와 같은 방식). CSS에도 `prefers-reduced-motion` 블록을 둔다.

#### `ReduceMotionRefreshLab`

- goal: media query 밖에 있는 앱 설정이 왜 그냥은 반영되지 않는지, `gsap.matchMediaRefresh()`가 그것을 어떻게 반영시키는지, 그리고 그 과정에서 MatchMedia instance가 살아 있는지를 관찰한다.
- question: 체크박스를 바꿨는데 animation은 왜 그대로인가요?
- representation: 사각형 하나 + 관찰 `dl` 6칸(`osReduceMotion` · `osFullMotion` · 지금 체크박스 값 · handler가 마지막에 읽은 값 · 실행 duration · 실행/정리/생성 횟수) + 실행 코드 패널
- controls: "이 앱에서 모션 줄이기" 체크박스, "gsap.matchMediaRefresh() 호출" 버튼, "지금 설정으로 재생" 버튼
- runtimeSource: `useReduceMotionRefreshAnimation.ts`
- sourcePath: `examples/ReduceMotionRefreshLab/useReduceMotionRefreshAnimation.ts`
- runtimeOwnership: hook이 `osQueries` 조건 쌍, 앱 설정 ref, `createDescriptor(osReduceMotion, osFullMotion, appReduceMotion)`, `gsap.matchMedia(scope)` 하나, paused tween, 실행/정리/생성 카운터, `gsap.matchMediaRefresh()` 호출을 소유한다. scoped `useGSAP` 한 개, dependency 없음(한 번만 만든다).
- displayOwnership: TSX가 descriptor와 `osQueries`를 코드 문법으로만 직렬화한다. `gsap`을 import하지 않는다. "지금 체크박스 값"과 "handler가 마지막에 읽은 값"을 **다른 두 칸으로 분리해** 표시하는 것이 이 예제의 관찰 장치다.
- coveredSourceItemIds: MM-24, MMR-01, MMR-02, MMR-03, MMR-04, MMR-P1
- accessibility: native labeled 체크박스와 버튼, 관찰값은 `dt`/`dd` + `output aria-labelledby`, 상태는 `role="status"` 하나, 860px 이하 단일 열
- motion: 자동 재생 없음. tween은 `paused: true`. `osReduceMotion`이나 앱 설정이 참이면 `duration: 0`.
- 설계 제약 1 — **조건 쌍이 필수다.** `gsap.matchMediaRefresh()`는 "현재 매치되는 것"만 다시 실행한다(`MMR-01`). 조건을 `(prefers-reduced-motion: reduce)` 하나만 걸면, OS 설정이 꺼져 있는 일반적인 경우 매치되는 조건이 없어 handler가 **처음부터 한 번도 실행되지 않고** refresh도 아무 일을 하지 않는다(probe로 확인, `PROBE-CORE22-006`). 그래서 `reduce`와 `no-preference`를 쌍으로 걸어 항상 하나는 매치되게 했고, 그 이유를 예제 경고 블록에 적었다.
- 설계 제약 2 — **refresh는 전역이다.** 공식 문장이 "활성·매치 중인 **모든** MatchMedia 객체"라고 적은 대로, 이 버튼은 같은 페이지의 `ConditionRebuildLab`도 되돌리고 다시 실행시킨다. 감추지 않고 경고 블록에 적었으며, 위 예제의 실행 횟수도 함께 오른다는 것을 관찰 지시로 넣었다.

### nonGoals

- `gsap.context()` 자체의 명세(생성·`add`·`ignore`·`revert`)를 소유하지 않는다. `MM-26`이 말하는 관계까지만 다룬다.
- `useGSAP()`의 생명주기·`contextSafe`·`revertOnUpdate` 계약을 설명하지 않는다. 두 예제가 쓰지만 소유는 `react-use-gsap`이다.
- `ScrollTrigger`를 다루지 않는다. 공식 문장에 나오는 부분은 인용만 하고 실행하지 않는다.
- `mm.kill()`과 `mm.revert(config)`의 차이를 설명하지 않는다. 공식 페이지에 없다.
- CSS media query 문법 자체를 가르치지 않는다. `MM-04`가 밝힌 대로 브라우저 것을 그대로 쓴다는 사실만 전달한다.
- 두 lab을 공용 generic runtime으로 합치지 않는다. 각 lab이 자기 hook을 소유한다.
- 공식 페이지의 CodePen 데모를 재현하지 않는다. 내용을 볼 수 없으므로 추측해 만들지 않는다.

### preserve

- 공식 원문 문장의 인용 형태 — 특히 `it'll automatically call context.revert() - do NOT do that here`와 `Returns : MatchMedia`
- 공용 컴포넌트(`OfficialDocsLink`, `useReducedMotion`, `InteractiveExample`, `DemoPanel`) — 변경 없음
- `src/app/routes.ts` — 이 컨텍스트에서 수정하지 않는다
- 다른 페이지 폴더 — 변경 없음
- `master-page-inventory.md`의 소유권 행

## 검증 계약

### verifiedPerspectives

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion, Build/Integration, Cross-page Consistency — 모두 구현 컨텍스트가 직접 판정했다(`docs/workflows/quality-gates.md`: 독립 검수자를 두지 않는다).

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-CORE22-001 | PASS | 2026-08-04에 두 canonical 원문을 직접 조회해 33개 item을 확정했다. 두 페이지 모두 형식 시그니처 줄이 없고, `matchMediaRefresh` 페이지에는 Parameters·Returns 절 자체가 없음을 원문 인용으로 확인했다. | 구현 범위 고정 | 미게시 명세를 `공식 페이지에 명시 없음`으로 표시 |
| SRC-CORE22-002 | ADDRESSED | 조회 1회로는 항목이 빠졌다. **1차(전문 전사)**는 `So the structure looks like:`와 그 코드(`mm.add("(min-width: 800px)", () => {...}, myElementOrRef);`), `Examples` 본문(`See the CodePen Collection`), 데모 3곳의 실제 내용을 내놓지 않았다. **2차(키워드 인용)**로 시그니처 부재·heading 19개·code block 목록을 확인했으나, 이번에는 2차의 code block 열거가 default scope 블록(`let mm = gsap.matchMedia(myRefOrElement);`)을 빠뜨렸다(1차에는 있었다). **3차(구간 지정 인용)**로 누락분을 되살렸다. 세 조회의 합집합을 manifest로 고정했다. | 1회 조회만 믿었으면 `MM-10`·`MM-23`·`MM-29`를 누락할 뻔했다 | none |
| OC-CORE22-001 | PASS | 스크립트 대조 — meta 섹션 `sourceItems` 합 33 = catalog `origin: 'official'` 행 수 33 = meta `officialSourceItems` 33. 섹션별 분포 4/9/5/5/3/6/1이 meta와 catalog에서 동일. 중복 ID 0건. source 2종 모두 catalog에 등장. | Official Coverage 통과 | none |
| LT-CORE22-001 | PASS | 공식 목차(19 heading)를 그대로 옮기지 않고 "누가 치우나 → 무엇을 넘기나 → 조건 객체 → 정리의 두 층 → 범위 → 접근성/강제 재실행 → 경계" 7단계로 재구성했다. 01단계는 공식에 없는 **수동 정리 코드와 matchMedia 코드의 대비**로 시작하고, 용어 4개(media query · breakpoint · revert · MatchMedia)를 실행 전에 정의한다. 각 예제에 `무엇이 달라졌나요?` `무엇을 봐야 하나요?` `왜 이렇게 동작하나요?` `실제로 언제 쓰나요?` 4패널을 둔다. | Learning Transformation 통과 | none |
| RDS-CORE22-001 | PASS | 두 lab 모두 hook의 단일 descriptor에서 GSAP 호출과 표시 코드가 함께 파생된다. TSX 두 파일 어느 것도 `gsap`을 import하지 않는다(문자열 안의 `gsap.`은 화면에 보여줄 코드 텍스트다). 조건 표의 boolean은 `context.conditions`가 채워 준 값을 읽은 것이고 TSX가 다시 판정하지 않는다. | Runtime/Display Sync 통과 | none |
| PROBE-CORE22-001 | PASS | Node + window/document stub, GSAP 3.15.0. `gsap.matchMedia()`가 `MatchMedia`를 돌려주고 `contexts` 배열을 가짐. 설치본 타입 `node_modules/gsap/types/gsap-core.d.ts:69-74`가 `add(...): MatchMedia` · `revert(config?): void` · `kill(revert?): void`를 선언. | `MM-P1` 근거 | none |
| PROBE-CORE22-002 | PASS | 같은 실행에서 `mm.add(conditions, handler) === mm` → `true`. add 직후 `runCount === 1`, `cleanupCount === 0`(조건이 이미 매치된 상태). | `MM-P2`·`MM-P3` 근거 | none |
| PROBE-CORE22-003 | PASS | `mm.contexts[0].conditions` → `{"isWide":true,"isNarrow":false,"reduceMotion":false}`, `mm.contexts[0].queries` → `{"isWide":"(min-width: 800px)","isNarrow":"(max-width: 799px)","reduceMotion":"(prefers-reduced-motion: reduce)"}`. | `MM-P4` 근거 | none |
| PROBE-CORE22-004 | PASS | `gsap.matchMediaRefresh()` 반환값 `undefined`. 호출 뒤 조건 변화 0인데 `cleanupCount 0→1`, `runCount 1→2`, `mm.contexts.length > 0`(instance 생존). 로그 순서는 `run#1 → cleanup#1 → run#2` — 정리가 재실행보다 먼저. | `MMR-P1`·`MMR-03` 근거, 두 lab의 "정리 먼저" 관찰 지시 근거 | none |
| PROBE-CORE22-005 | PASS | `mm.revert()` 반환값 `undefined`. 호출 뒤 handler가 반환한 cleanup 함수가 실행됐고(`cleanupCount +1`), handler 안에서 `gsap.set(target, { v: 100 })`으로 올려 둔 일반 object 값이 `0`(animation 이전 값)으로 되돌아갔다. 설치본 소스 근거도 확인 — `gsap-core.js:3929` `_isFunction(result) && self._r.push(result)`, `MatchMedia.revert(config)` → `kill(config || {})` → `Context.kill(revert, true)`가 `_r`을 실행. | `MM-P5` 근거 | none |
| PROBE-CORE22-006 | PASS | 조건이 하나뿐이고 그것이 매치되지 않는 MatchMedia는 add 시점에 handler가 실행되지 않고(`runCount 0`), `gsap.matchMediaRefresh()`를 불러도 그대로 `0`이었다. 서로 반대인 조건 쌍(`reduce` / `no-preference`)을 넣은 경우에만 add 시 1회 실행되고 refresh마다 `run+1 · cleanup+1`이 됐다(2회 연속 확인: 1→2→3). | `ReduceMotionRefreshLab`의 조건 쌍 설계 근거, `MM-18` "하나도 매치되지 않으면 다시 실행하지 않는다"의 실행 확인 | none |
| PROBE-CORE22-007 | PASS | stub의 매치 상태를 뒤집고 `MediaQueryList` change 리스너를 호출하면 `cleanup` 뒤 `run`이 일어나고 `conditions`가 `{"isWide":false,"isNarrow":true,...}`로 갱신됐다. 같은 실행에서 refresh 직후 2ms 안에 토글하면 무시되는 것을 관찰했고, 설치본 소스 `gsap-core.js:3853`의 `if (time - _lastMediaTime > 2)` debounce가 원인임을 확인했다. 30ms 대기 후에는 정상 동작. | `MM-18` 토글 재실행의 실행 확인 | debounce는 페이지에 싣지 않았다(공식 미게시 + 학습 가치 낮음) |
| PROBE-CORE22-008 | PASS | 설치본 소스 `gsap-core.js:676` `var el = value.current \|\| value.nativeElement \|\| value;` — `selector()`가 React ref와 Angular ElementRef를 받는다는 `MM-21`·`MM-22` 주장의 구현 근거. | scope 인자에 ref를 넘기는 예제 구현 근거 | none |
| PROBE-LIMIT-CORE22-001 | **확인하지 못함 — 주장하지 않음** | `matchMedia`는 브라우저 API다. Node에는 `window.matchMedia`가 없어 위 probe는 전부 **직접 주입한 window/document stub** 위에서 실행했다(stub의 `querySelectorAll`은 빈 배열을 돌려주고, `matchMedia`는 내가 통제하는 boolean을 돌려준다). 따라서 **실제 브라우저에서의 동작은 관측되지 않았다.** 구체적으로 확인하지 못한 것: (1) 실제 창 리사이즈로 breakpoint를 넘을 때의 동작, (2) 실제 OS `prefers-reduced-motion` 전환, (3) `(prefers-reduced-motion: no-preference)`가 실제 브라우저에서 매치되는지, (4) DOM element에 대한 revert가 inline style을 어디까지 떼어 내는지 — probe는 일반 object(`{v:0}`)로만 확인했다, (5) `gsap.matchMedia(ref)` scope가 실제 DOM에서 선택자를 좁히는지, (6) viewport meta(`MM-27`)의 실제 효과. | 페이지에는 위 6개를 실행 확인 사실로 적지 않았다. (1)(2)(6)은 공식 원문 인용으로만, (3)은 "서로 반대인 조건 쌍"이라는 설계 의도로만, (4)(5)는 공식 문장 인용으로만 서술했다. | 소유자 브라우저 검수에서 확인 (A11Y-CORE22-002) |
| PED-CORE22-001 | PASS | 처음 나오는 용어 4개를 01단계에서 정의한 뒤에만 사용한다. 각 lab은 대상 하나(사각형 하나)와 변화 하나에 집중한다. 조작할 값과 관찰할 변화를 `__goal` 문단에서 실행 전에 알려준다. 자동 재생이 한 곳도 없다(`paused: true` 2곳, grep 확인). | Pedagogy 통과 | none |
| STRUCT-CORE22-001 | PASS | 페이지 TSX는 header + `PageCoverage` + 섹션 7개 조립만 한다. 섹션·예제·컴포넌트가 각자 폴더를 갖고, 한 파일에 컴포넌트 하나. 실행 source는 `use*Animation.ts` 2개이며 학습 패널(제목·설명·표·관찰점)을 담지 않는다. TSX는 GSAP 생명주기를 담지 않는다. 모든 `export`와 hook 내부 선언·실행 단계에 한 줄 한국어 주석(AGENTS.md 6·7번). | Structure/Comment 통과 | none |
| A11Y-CORE22-001 | PASS (정적) | 코드·마크업만으로 판정 가능한 범위 — 모든 control이 native 요소(`input[type=range]`, `input[type=checkbox]`, `button`)이고 `label htmlFor`/`fieldset legend`로 이름이 붙는다. 관찰값은 `dt id` + `output aria-labelledby`. 상태 변화는 lab마다 `role="status"` 하나. 표는 `overflow-x: auto` 래퍼 안에 있고 `scope="col"`/`scope="row"`가 붙는다. 860px 이하에서 모든 grid가 단일 열로 접힌다. 두 예제 CSS에 `prefers-reduced-motion` 블록이 있고, 실행값 자체도 조건이 참이면 `duration: 0`이 된다. | 정적 Accessibility/Motion 통과 | none |
| A11Y-CORE22-002 | DEFERRED | 키보드 이동·포커스 표시, `prefers-reduced-motion` 실제 전환, 320/390px 실제 레이아웃과 overflow, 두 lab control의 실제 조작 결과(특히 breakpoint slider가 창 폭을 넘을 때 실제로 조건이 뒤집히는지, refresh 버튼이 두 lab을 함께 되돌리는지) | 소유자 일괄 브라우저 검수 대상 (`docs/workflows/quality-gates.md` Browser 실조작 검수 유예 1~4번) | 전체 페이지 완성 후 일괄 확인 |
| BUILD-CORE22-001 | PASS | 구현 직후 `npx tsc --noEmit`은 `responsive-motion` 경로 오류 0건이었고, 이 페이지만 포함한 임시 tsconfig(`extends ./tsconfig.json`, `include`를 `responsive-motion` + `app/routes.ts` + `components` + `vite-env.d.ts`로 제한) 재실행도 `exit 0`이었다. 그 시점에 남아 있던 오류 3건은 다른 컨텍스트가 작성 중이던 `gsap-context` 페이지의 미완성 import였고 이 작업과 무관했다. handoff 작성 시점(2026-08-05)에 그 페이지가 완성되어 **저장소 전체 `npx tsc --noEmit`이 `exit 0`, 오류 0건**이다. `npm run build` · `npm run build-storybook`은 이 작업 범위에서 금지되어 실행하지 않았다. | Build/Integration 통과 | 소유자가 전체 배치 완료 후 full build 1회 |
| XPAGE-CORE22-001 | PASS | `tween-configuration` · `gsap-to` · `css-animation`으로만 링크를 걸었다(모두 현재 `routes.ts`에 등록된 slug). 동시에 작성 중인 `gsap-context` · `react-use-gsap`은 링크 대신 `BoundariesSection`의 "아직 별도 페이지가 없는 이웃 개념"에 이름만 남겨, 미등록 경로가 fallback으로 흡수되는 것을 피했다. `prefers-reduced-motion` 설명 소유권은 이 페이지가 GSAP 조건 관점에서만 가져가고, 공용 `useReducedMotion` 훅은 건드리지 않았다. | Cross-page Consistency 통과 | `gsap-context` · `react-use-gsap` 등록 후 링크 추가 검토 |

### verificationEvidence

- 공식 원문 대조 — 2026-08-04, 두 canonical URL 직접 조회. 같은 URL에 대해 (1) 전문 전사 (2) 키워드별 인용 (3) 구간 지정 인용, **총 3회** 조회하고 합집합을 manifest로 고정. 모든 조회 프롬프트에 "없으면 NOT PRESENT라고 답하라"를 명시.
- runtime probe — 2026-08-04, `node` v22로 설치본 GSAP 3.15.0을 import해 실행. **`window.matchMedia`·`document`는 직접 주입한 stub이며 실제 브라우저가 아니다.** 스크립트는 호출과 결과를 한 묶음으로 출력하도록 작성했고 위 finding의 숫자는 그 출력 그대로다. probe 스크립트는 저장소에 남기지 않았다.
- 설치본 소스 조회 — 2026-08-04, `node_modules/gsap/gsap-core.js`(`_onMediaChange` 3849–3891, `Context` 3894–4043, `Context.add` 3908–3940, `Context.kill` 3961–4037, `MatchMedia` 4045–4108, `matchMediaRefresh` 4266–4280, `selector` 673–679)와 `node_modules/gsap/types/gsap-core.d.ts`(52–74).
- 정합성 대조 — 2026-08-05, meta 섹션 `sourceItems` 합(33) = catalog `origin: 'official'` 행 수(33) = meta `officialSourceItems`(33), 섹션별 분포 일치, 중복 ID 0건.
- 타입 검사 — 2026-08-05, 저장소 전체 `npx tsc --noEmit` `exit 0`(오류 0건). 구현 직후에는 이 페이지만 포함한 임시 tsconfig로도 `exit 0`을 확인했다. 임시 tsconfig는 검증 후 삭제했다.

### releaseDecision

`PASS` (미해결 `DEFERRED` 1건: **A11Y-CORE22-002** — 소유자 브라우저 일괄 검수 대상)

추가로 `PROBE-LIMIT-CORE22-001`에 **실행으로 확인하지 못한 6개 항목**을 남겼다. 이 항목들은 페이지에서 실행 확인 사실로 서술하지 않았고 공식 원문 인용으로만 서술했으므로 release를 막지 않는다. 다만 소유자 브라우저 검수에서 (1) breakpoint slider가 실제 창 폭을 넘을 때 조건이 뒤집히는지, (2) `(prefers-reduced-motion: no-preference)`가 실제로 매치되어 `ReduceMotionRefreshLab`의 refresh가 동작하는지 두 가지는 반드시 확인해야 한다. 둘 중 하나라도 실패하면 해당 예제 설계를 다시 판정한다.

라우팅 등록(`src/app/routes.ts`)은 이 컨텍스트의 작업 범위 밖이며 저장소 소유자가 수행한다. 등록 전까지 이 페이지는 앱에서 접근되지 않는다.
