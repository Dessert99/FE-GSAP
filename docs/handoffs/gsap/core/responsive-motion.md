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
- reviewedAt: `2026-08-13`
- category: `Fundamentals > GSAP`
- slug: `responsive-motion`
- sourcePageIds: primary `source:gsap-match-media`; related `source:gsap-match-media-refresh`

두 공식 페이지 어느 쪽도 **형식 시그니처 줄을 게시하지 않는다.** `gsap.matchMedia()`에는 `Returns : MatchMedia` heading이 있지만 인자 표기는 본문 문장과 예제에만 있고, `.add()`에도 시그니처 줄이 없다. `gsap.matchMediaRefresh()` 페이지에는 시그니처 줄도, `Returns` 절도, Parameters 절도 없다. 게시되지 않은 명세를 기억이나 TypeScript 선언으로 채우지 않는다. 해당 칸은 페이지에 `공식 페이지에 명시 없음`으로 표시했다.

2026-08-13 감사에서 두 canonical의 현재 본문을 다시 조회해 반환 표기, `.add()` 인자, conditions, cleanup, scope, 접근성, refresh 절을 대조했다.

### localPage

- localPath: `src/content/gsap/fundamentals/responsive-motion/`
- route: `/fundamentals/responsive-motion`

### sourceManifest

**authority는 `src/content/gsap/fundamentals/responsive-motion/responsive-motion.catalog.ts`의 `responsiveMotionSourceItems` 배열이다.** 이 문서는 그 배열을 복제하지 않고 분포만 고정한다. 배열의 각 행이 `id`, `officialItem`(공식 주장을 한국어로 옮긴 원문 대응), `source`, `origin`, `sectionId`를 갖는다.

공식 item **33개** = catalog 행 33개.

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
| 07 | `boundaries` | 공식 문서가 밝히지 않은 경계 | 1 | MM-29 |
| | | 합계 | **33** | |

### sourceBlockers

`none`. 33개 공식 item 전부 2026-08-13에 두 canonical 원문으로 다시 확인했다.

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

catalog의 각 행이 `sectionId`로 근거 섹션을 지목한다. `PageCoverage`는 이 검수 수치를 학습 화면에 노출하지 않고 일곱 단계의 순서만 안내한다. 섹션 파일별 근거는 다음과 같다.

| sectionId | localEvidence | localStatus |
| --- | --- | --- |
| `auto-revert` | `sections/AutoRevertSection/AutoRevertSection.tsx` — 용어 카드 4개, 수동/자동 정리 대비 코드 2블록, 공식 첫 문장 인용, 기본 정보 표(반환값·인자·버전·시그니처 미게시) | covered |
| `add-parameters` | `sections/AddParametersSection/AddParametersSection.tsx` — structure 한 줄, 인자 표 3행 + 기본값 미게시 행, Quick Start 원문 코드, desktop/mobile 원문 코드, 재호출 문단, viewport meta 경고 | covered |
| `conditions-object` | `sections/ConditionsObjectSection/ConditionsObjectSection.tsx` — conditions 객체 원문, 공식 conditions 예제 전문, 재실행 규칙 경고, `ConditionRebuildLab` | covered |
| `cleanup-order` | `sections/CleanupOrderSection/CleanupOrderSection.tsx` — 정리 두 층 표, `do NOT do that here` 경고, `context.add("onClick")` 원문 코드, gsap.context() wrapper note | covered |
| `scope-selector` | `sections/ScopeSelectorSection/ScopeSelectorSection.tsx` — per-add scope 원문 코드, default scope 원문 코드, 이 페이지 예제가 같은 형태를 쓴다는 note | covered |
| `reduced-motion-refresh` | `sections/ReducedMotionRefreshSection/ReducedMotionRefreshSection.tsx` — 접근성 문단 + CSS-Tricks 링크, refresh 4행 표 + 미게시 행, `ReduceMotionRefreshLab` | covered |
| `boundaries` | `sections/BoundariesSection/BoundariesSection.tsx` — 미게시 항목 목록, 다음 학습 링크, 미등록 이웃 개념 목록, CodePen 임베드 note(`MM-29`) | covered |

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
- controls: breakpoint slider(min 320, 기본 max 1600, 창 폭보다 최소 40px 크게 자동 확장, step 40), "이번 조건으로 재생" 버튼
- runtimeSource: `useConditionRebuildAnimation.ts`
- sourcePath: `examples/ConditionRebuildLab/useConditionRebuildAnimation.ts`
- runtimeOwnership: hook이 `createQueries(breakpoint)`와 `createDescriptor(breakpoint, conditions)`로 단일 descriptor를 만들고, `gsap.matchMedia(scope)` 하나와 `mm.add(conditions, handler)` 하나, handler 안의 `gsap.set` · paused `gsap.to`, 실행/정리 카운터, `resize` 리스너(창 폭 표시용)를 소유한다. scoped `useGSAP` 한 개, `dependencies: [breakpoint]`, `revertOnUpdate: true`.
- displayOwnership: TSX가 descriptor의 query 문자열·boolean·x·rotation·duration을 코드 문법으로만 직렬화한다. `gsap`을 import하지 않고 조건을 다시 판정하지 않는다. 표의 boolean은 `context.conditions`가 채워 준 값을 그대로 읽은 것이다.
- coveredSourceItemIds: MM-13, MM-14, MM-15, MM-16, MM-18 (관찰 근거로 MM-01, MM-06, MM-08도 재확인)
- accessibility: native labeled slider와 버튼, 관찰값은 `dt`/`dd` + `output aria-labelledby`, 표는 `overflow-x: auto` 래퍼, 860px 이하 단일 열
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
- coveredSourceItemIds: MM-24, MMR-01, MMR-02, MMR-03, MMR-04
- accessibility: native labeled 체크박스와 버튼, 관찰값은 `dt`/`dd` + `output aria-labelledby`, 상태는 `role="status"` 하나, 860px 이하 단일 열
- motion: 자동 재생 없음. tween은 `paused: true`. `osReduceMotion`이나 앱 설정이 참이면 `duration: 0`.
- 설계 제약 1 — **조건 쌍이 필수다.** `gsap.matchMediaRefresh()`는 공식 문장대로 "현재 매치되는 것"만 다시 실행한다(`MMR-01`). 그래서 `reduce`와 `no-preference`를 쌍으로 걸어 항상 하나는 매치되게 했고, 그 이유를 예제 경고 블록에 적었다.
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

2026-08-13 감사에서 Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion을 다시 판정했다. 전역 build는 메인 통합에서 통과했고 실제 브라우저 동작은 `NOT VERIFIED`로 남긴다.

### historicalFindings (2026-08-04 구현 기록)

초기 구현 시점의 상세 probe 기록은 git 이력에 남아 있다. 2026-08-13 감사에서는 공식 문서 기반 학습 흐름에 직접 필요하지 않은 설치본 내부 항목을 페이지와 catalog에서 제거했다.

### findings

| ID | initial | current | evidence |
| --- | --- | --- | --- |
| SRC-RM-01 | PASS | PASS | 2026-08-13 현재 공식 두 페이지에서 33개 항목을 다시 대조했고 변경된 공식 계약은 없었다. |
| FACT-RM-01 | BLOCK | PASS | `revert`를 "transform과 style을 떼어 낸다"로 단정하던 정의를 공식 범위인 "GSAP이 건드리기 전 상태로 되돌린다"로 좁혔다. |
| PED-RM-01 | BLOCK | PASS | 첫 화면의 `2/2`, `33/33 source item`, 섹션별 수량과 본문의 설치본 probe 6건을 제거하고 학습 순서와 공식 경계만 남겼다. 제작 용어인 설명 소유권·"다시 태운다" 표현도 학습 문장으로 바꿨다. |
| RDS-RM-01 | BLOCK | PASS | breakpoint range의 max가 1600px에 고정돼 더 넓은 viewport에서는 `isNarrow`로 전환할 수 없었다. 현재 viewport보다 최소 한 step 큰 값까지 max를 확장해 지원하는 최소 폭 이상에서 핵심 조건 전환을 조작할 수 있게 했다. |
| RDS-RM-02 | BLOCK | PASS | 두 코드 패널은 paused Tween의 반환값을 버려 실제 `play()` 버튼이 호출하는 `restart()`를 표현할 수 없었다. Tween을 바깥 변수에 보존하고 실제 재생 action을 직렬화했다. |
| A11Y-RM-01 | BLOCK | PASS (정적) | range를 움직일 때마다 읽히던 `ConditionRebuildLab`의 `role="status"`를 제거했다. 버튼으로 갱신하는 refresh lab의 status는 유지했다. |

### verificationEvidence

- **공식 원문 대조** — 2026-08-13, [gsap.matchMedia()](https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/)와 [gsap.matchMediaRefresh()](https://gsap.com/docs/v3/GSAP/gsap.matchMediaRefresh%28%29/)의 현재 본문을 직접 대조했다.
- **정적 변환·연결 검사** — 대상 TypeScript/TSX 16개를 esbuild transform했고 오류가 없었다. CSS와 공용 route registry를 external로 둔 페이지 entry bundle도 통과했다. `git diff --check` 오류 0건.
- **정적 coverage** — 공식 catalog 행 33개, ID 중복 0개, source별 분포 matchMedia 29 / matchMediaRefresh 4, 섹션별 분포 4/9/5/5/3/6/1을 확인했다.
- **정적 runtime/display 검사** — 두 hook과 TSX의 query 문자열, condition boolean, duration, Tween 보존, `restart()` 코드, control 범위를 함께 대조했다.
- **전역 build** — 2026-08-13 메인 통합 `npm run build`, `npm run build-storybook` 모두 exit 0.
- **브라우저** — 이 감사 컨텍스트에서는 실행하지 않는다.

### releaseDecision

`NOT VERIFIED`

- 미해결 `BLOCK`: 없음.
- 남은 `ADVISORY`: 없음.
- 남은 `NOT VERIFIED`: 실제 브라우저 breakpoint 전환, OS `prefers-reduced-motion`, refresh가 두 lab에 미치는 전역 효과, 키보드 포커스, 320/390px 레이아웃, route 이동·cleanup.

### browserReviewClosure

- status: `NOT VERIFIED`
- evidenceBoundary: 실제 브라우저 조작은 메인 에이전트의 통합 검수 범위다.
