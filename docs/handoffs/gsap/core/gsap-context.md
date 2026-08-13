# GSAP context handoff

## 입력 계약

### objective

한 UI 영역에서 만든 여러 GSAP 작업을 **함께 기록했다가 함께 되돌리는** 방법을 가르친다. `gsap.context()`의 두 능력(**모아서 revert**와 **선택자 범위 지정**)을 섞지 않고 나눠 설명하고, 범위 지정과 이어지는 만큼만 `gsap.utils.selector()`를 소유한다.

이 페이지의 핵심 학습 목표는 두 가지다.

1. **"변수를 들고 있지 않아도 되돌릴 수 있다"** — Context가 함수 실행 중에 옆에서 목록을 적기 때문이다.
2. **`revert()`와 `kill()`은 다르다** — `revert()`는 값을 시작 전으로 되돌리고 cleanup function을 부르지만, `kill()`은 값을 그 자리에 두고 cleanup function을 부르지 않는다. 공식 문서가 두 메서드를 나란히 언급만 하고 차이를 적어 두지 않아 실행으로 확인했다.

React 통합 전체 계약은 다루지 않는다. `react-use-gsap` 페이지가 소유한다.

### officialPage

- title: `gsap.context()` + `selector` (`gsap.utils.selector()`)
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/gsap.context()`
  - `https://gsap.com/docs/v3/GSAP/UtilityMethods/selector()`
- reviewedAt: `2026-08-04`
- category: `GSAP > Context & Utils`
- slug: `gsap-context`
- sourcePageIds: primary `source:gsap-context`; related `source:utils-selector`

**두 페이지의 명세 게시 수준이 다르다.**

| | signature 줄 | Parameters 절 | Returns 절 |
| --- | --- | --- | --- |
| `gsap.context()` | 없음 | 없음 | 없음 |
| `gsap.utils.selector()` | 없음 | 있음 (`scope`) | 있음 (`Returns : Function`) |

`gsap.context()` 페이지는 인자 두 개(실행할 함수, 선택적 scope)를 **본문 문장과 코드 예제로만** 설명한다. 게시되지 않은 명세를 기억이나 설치본 타입 선언으로 채우지 않는다. 해당 칸은 페이지에 `공식 페이지에 명시 없음`으로 표시했다.

각 canonical은 자기 manifest 행에만 근거가 된다. `source:utils-selector`의 어떤 문장도 `gsap.context()` 항목의 근거로 쓰지 않았고 그 반대도 마찬가지다.

### localPage

- localPath: `src/content/gsap/fundamentals/gsap-context/`
- route: `/fundamentals/gsap-context`

### sourceManifest

**authority는 `src/content/gsap/fundamentals/gsap-context/gsap-context.catalog.ts`의 `gsapContextSourceItems` 배열이다.** 각 행이 `id` · `officialItem`(원문 요지) · `source` · `origin` · `sectionId`를 들고 있고, `PageCoverage`와 각 섹션이 같은 배열을 센다. 이 문서는 그 배열을 다시 옮겨 적지 않고 집계만 고정한다.

공식 item **33개**, 실행으로만 확인한 item **7개**, 총 40행. 중복 ID 0건.

**source별 공식 item 수**

| source | sourcePageId | 공식 item |
| --- | --- | ---: |
| `context` | `source:gsap-context` | 20 |
| `selector` | `source:utils-selector` | 13 |
| 합계 | | **33** |

**섹션별 분배**

| 섹션 id | 섹션 제목 | meta `sourceItems` | catalog `official` 행 | probe 행 |
| --- | --- | ---: | ---: | ---: |
| `collect-and-revert` | 흩어진 애니메이션을 하나로 묶는다 | 4 | 4 | 2 |
| `scoped-selector` | 선택자를 한 영역 안에 가둔다 | 5 | 5 | 0 |
| `selector-utility` | 범위만 필요할 때 쓰는 선택자 함수 | 13 | 13 | 1 |
| `add-and-ignore` | 함수가 끝난 뒤 생기는 애니메이션 | 6 | 6 | 2 |
| `revert-lifetime` | 되돌림은 언제 끝나고 무엇을 남기나 | 4 | 4 | 2 |
| `boundaries` | 여기서 다루지 않는 것 | 1 | 1 | 0 |
| 합계 | | **33** | **33** | **7** |

`meta.officialSourceItems` 분모도 **33**이다. 셋이 일치한다(검증은 `OC-CTX-001` 참조).

**ID 대역**

| 대역 | 뜻 |
| --- | --- |
| `CTX-01` ~ `CTX-20` | `gsap.context()` 공식 item |
| `SEL-01` ~ `SEL-13` | `gsap.utils.selector()` 공식 item |
| `CTX-P1` ~ `CTX-P6`, `SEL-P1` | 공식 문서에 없고 실행으로 확인한 item (`origin: 'implementation'`) |

`*-P*` item은 공식 item이 아니다. coverage 분모(33)에 넣지 않으며 `PageCoverage`가 공식 33개와 분리해 센다.

### sourceBlockers

`none`. 33개 기술 item 전부 2026-08-04에 두 공식 페이지 원문으로 직접 확인했다.

다음은 두 공식 페이지가 **게시하지 않은** 내용이므로 주장하지 않는다. 필요해지면 `blocked-source` item을 추가하고 release를 `BLOCK`한다.

- `gsap.context()`의 signature 줄, 인자 이름·타입·기본값, 반환 타입 — 절 자체가 없다
- `revert()`와 `kill()`의 차이, `kill()`이 받는 인자 (실행으로만 확인 → `CTX-P4`)
- Context 객체가 가진 속성·메서드 목록 (`data` · `isReverted` · `getTweens` · `clear` 등, 실행으로만 확인 → `CTX-P1` · `CTX-P2`)
- `revert(config)`의 `config` 객체 내용 — 설치본 타입 선언에만 있고 공식 페이지에는 없다. 페이지에서 설명하지 않는다.
- `gsap.utils.selector()`에서 `scope`를 생략했을 때의 기본 범위
- Context가 ScrollTrigger를 수집한다는 주장의 **실제 동작** — 공식 문장은 인용했으나 플러그인을 설치·실행해 확인하지는 않았다. 페이지는 공식이 그렇게 밝혔다는 사실만 전달한다.

### moduleSelection

| module | 목적 | 근거 source |
| --- | --- | --- |
| callable method (`CM`) | `gsap.context()`와 `gsap.utils.selector()`의 인자·반환값·호출 시점. 명세 절이 있는 `selector()`만 표로 명세하고 `context()`는 `공식 페이지에 명시 없음` + probe로 분리 표시한다. | 두 source |
| class·instance (`CI`) | Context instance의 수명 — 무엇을 기록하고, 언제 기록을 멈추고, `revert()` 뒤 그 객체가 어떻게 되는지. | CTX-01, CTX-10~15, CTX-16~19 |
| utility·overload (`UT`) | scope 자리에 넣을 수 있는 네 종류의 값과, 결과가 함수라는 형태. | CTX-08, SEL-01~06 |
| 개념·가이드 (`CG`) | "화면을 떠날 때 여러 애니메이션을 전부 치워야 한다"는 상황에서 출발해 수집·범위·정리를 하나의 흐름으로 묶는다. | 두 source |

property catalog, ease visualizer, plugin, installation 모듈은 추가하지 않는다.

### learnerFlow

| id | 학습자 질문 | sourceItemIds |
| --- | --- | --- |
| `flow:too-many-handles` | 만든 애니메이션이 여러 개인데 떠날 때 전부 어떻게 치우나요? | CTX-01, CTX-02, CTX-03, CTX-04 |
| `flow:what-comes-back` | `gsap.context()`가 돌려주는 건 정확히 뭔가요? | CTX-P1, CTX-P2 |
| `flow:selector-leak` | 같은 class가 화면에 여러 벌 있으면 어떻게 되나요? | CTX-05, CTX-06, CTX-07, CTX-08, CTX-09 |
| `flow:selector-alone` | 정리는 필요 없고 범위만 좁히고 싶으면요? | SEL-01~SEL-13, SEL-P1 |
| `flow:after-the-fact` | 클릭할 때 만든 애니메이션도 함께 되돌려지나요? | CTX-10, CTX-11, CTX-12, CTX-13, CTX-P3 |
| `flow:opt-out` | 일부러 안 되돌리고 싶은 것도 있나요? | CTX-14, CTX-15, CTX-P6 |
| `flow:my-own-cleanup` | GSAP이 모르는 내 정리 코드는 어디에 적나요? | CTX-16, CTX-17, CTX-P5 |
| `flow:after-revert` | `revert()` 부른 뒤 그 Context는 끝난 건가요? | CTX-18, CTX-19, CTX-P4 |
| `flow:not-mine` | React 훅이랑 뭐가 다른가요? | CTX-20 |

### coverageMap

catalog의 각 행이 `sectionId`로 소유 섹션을 지목한다. 아래는 파일 단위 근거다.

| sourceItemIds | localEvidence | localStatus |
| --- | --- | --- |
| CTX-01, CTX-02 | `CollectAndRevertSection.tsx` 도입 문단 + `beforeAfter` 코드 블록(손 관리 vs Context) | covered |
| CTX-03 | `CollectAndRevertSection.tsx` `minimalUsage` 원문 코드 블록 | covered |
| CTX-04 | `CollectAndRevertSection.tsx` 버전 문단 (3.11.0) | covered |
| CTX-05, CTX-06 | `ScopedSelectorSection.tsx` 두 번째 이점 문단 + 자손(descendant) 해설 | covered |
| CTX-07 | `ScopedSelectorSection.tsx` `scopeExample` 원문 코드 블록(주석 포함) | covered |
| CTX-08 | `ScopedSelectorSection.tsx` `scopeKinds` 표 4행 | covered |
| CTX-09 | `ScopedSelectorSection.tsx` Vue 3 경고 블록 | covered |
| SEL-01, SEL-02 | `SelectorUtilitySection.tsx` 명세 표(인자·타입·필수·기본값·반환) | covered |
| SEL-03 | `SelectorUtilitySection.tsx` "돌려받는 것은 결과가 아니라 함수" 문단 — 공식 "Remember" 인용 | covered |
| SEL-04 | `SelectorUtilitySection.tsx` component 이점 문단 | covered |
| SEL-05 | `SelectorUtilitySection.tsx` "NodeList가 아니라 Array" note | covered |
| SEL-06 | `SelectorUtilitySection.tsx` `.current`/`.nativeElement` 자동 확인 문단 | covered |
| SEL-07 | `SelectorUtilitySection.tsx` `vanillaExample` 원문 코드 블록 | covered |
| SEL-08 | `SelectorUtilitySection.tsx` `reactExample` 원문 코드 블록 + `internalCalls` 표 React 행 | covered |
| SEL-09, SEL-10 | `SelectorUtilitySection.tsx` `internalCalls` 표 Angular · Vue 행(내부 호출 주석 반영) | covered |
| SEL-11 | `SelectorUtilitySection.tsx` "ref 하나면 된다" 문단 | covered |
| SEL-12 | `SelectorUtilitySection.tsx` `repeatedMarkup` + `brokenSelector` 코드 블록 + 해설 문단 | covered |
| SEL-13 | `SelectorUtilitySection.tsx` `querySelectorAll` 대안 문단 | covered |
| CTX-10 | `AddAndIgnoreSection.tsx` 도입 문단 (event가 함수 실행 뒤에 일어난다) | covered |
| CTX-11 | `AddAndIgnoreSection.tsx` `namedAddExample` 원문 코드 블록 + 해설 | covered |
| CTX-12 | `AddAndIgnoreSection.tsx` `immediateAddExample` 원문 코드 블록 | covered |
| CTX-13 | `AddAndIgnoreSection.tsx` "먼저 self가 무엇인지" 소절 | covered |
| CTX-14, CTX-15 | `AddAndIgnoreSection.tsx` `ignoreExample` 원문 코드 블록 + "기록되지 않는다" 해설 | covered |
| CTX-16 | `RevertLifetimeSection.tsx` `cleanupExample` 원문 코드 블록 + 해설 | covered |
| CTX-17 | `RevertLifetimeSection.tsx` `.add()`에서도 cleanup을 돌려줄 수 있다는 문단 | covered |
| CTX-18 | `RevertLifetimeSection.tsx` "revert() 이후" 표 2행(담고 있던 애니메이션 / Context 자신) | covered |
| CTX-19 | `RevertLifetimeSection.tsx` "제어 도구가 아니다" 경고 블록 | covered |
| CTX-20 | `BoundariesSection.tsx` `upcoming` 표 `useGSAP()` 행 | covered |
| CTX-P1, CTX-P2 | `CollectAndRevertSection.tsx` probe 블록 + `ContextRevertLab` 기록 수·isReverted 관찰값 | covered (probe) |
| SEL-P1 | `SelectorUtilitySection.tsx` probe 블록 (DOM 필요) | covered (probe) |
| CTX-P3 | `AddAndIgnoreSection.tsx` 첫 probe 블록 + `ContextAddLab` `named`·`immediate` 경로 | covered (probe) |
| CTX-P6 | `AddAndIgnoreSection.tsx` 둘째 probe 블록 + `ContextAddLab` `ignored` 경로 | covered (probe) |
| CTX-P4, CTX-P5 | `RevertLifetimeSection.tsx` probe 블록 + `RevertKillLab` 비교 표·cleanup 호출 횟수 관찰값 | covered (probe) |

### relatedPages

- `gsap-to` — Tween 생성과 `target`·`vars` 전체 계약을 소유한다. 이 페이지는 전제로만 쓴다.
- `tween-playhead` — 재생·정지·seek을 소유한다.
- `tween-configuration` — 설정의 출처와 적용 범위를 소유한다.
- `react-use-gsap` (**미등록**) — `useGSAP()`의 scope · dependencies · `revertOnUpdate` · `contextSafe` 계약 전체를 소유한다. 공식 `gsap.context()` 페이지가 이 훅으로 안내하므로 이 페이지는 **경계만 밝히고 링크하지 않는다**(`src/app/routes.ts`에 아직 없어 링크가 첫 레슨으로 흡수되기 때문. 등록 후 `BoundariesSection`의 `upcoming` 행을 `otherOwners`로 옮기면 된다).
- `responsive-motion` (미구현) — `gsap.matchMedia()`의 조건별 정리를 소유한다. 이름만 언급했다.
- Timeline 학습 페이지(미구현) — 공식이 "제어는 Timeline이 할 일"이라고 못 박은 영역. 경계만 밝혔다.
- ScrollTrigger 학습 페이지(미구현) — Context가 함께 기록하는 대상이라 이름만 나온다.

## 구현 계약

### exactFiles

create:

```text
src/content/gsap/fundamentals/gsap-context/GsapContextPage.tsx
src/content/gsap/fundamentals/gsap-context/GsapContextPage.css
src/content/gsap/fundamentals/gsap-context/gsap-context.meta.ts
src/content/gsap/fundamentals/gsap-context/gsap-context.catalog.ts
src/content/gsap/fundamentals/gsap-context/components/PageCoverage/PageCoverage.tsx
src/content/gsap/fundamentals/gsap-context/components/SectionHeading/SectionHeading.tsx
src/content/gsap/fundamentals/gsap-context/sections/CollectAndRevertSection/CollectAndRevertSection.tsx
src/content/gsap/fundamentals/gsap-context/sections/ScopedSelectorSection/ScopedSelectorSection.tsx
src/content/gsap/fundamentals/gsap-context/sections/SelectorUtilitySection/SelectorUtilitySection.tsx
src/content/gsap/fundamentals/gsap-context/sections/AddAndIgnoreSection/AddAndIgnoreSection.tsx
src/content/gsap/fundamentals/gsap-context/sections/RevertLifetimeSection/RevertLifetimeSection.tsx
src/content/gsap/fundamentals/gsap-context/sections/BoundariesSection/BoundariesSection.tsx
src/content/gsap/fundamentals/gsap-context/examples/ContextRevertLab/ContextRevertLab.tsx
src/content/gsap/fundamentals/gsap-context/examples/ContextRevertLab/ContextRevertLab.css
src/content/gsap/fundamentals/gsap-context/examples/ContextRevertLab/useContextRevertAnimation.ts
src/content/gsap/fundamentals/gsap-context/examples/ScopedSelectorLab/ScopedSelectorLab.tsx
src/content/gsap/fundamentals/gsap-context/examples/ScopedSelectorLab/ScopedSelectorLab.css
src/content/gsap/fundamentals/gsap-context/examples/ScopedSelectorLab/useScopedSelectorAnimation.ts
src/content/gsap/fundamentals/gsap-context/examples/ContextAddLab/ContextAddLab.tsx
src/content/gsap/fundamentals/gsap-context/examples/ContextAddLab/ContextAddLab.css
src/content/gsap/fundamentals/gsap-context/examples/ContextAddLab/useContextAddAnimation.ts
src/content/gsap/fundamentals/gsap-context/examples/RevertKillLab/RevertKillLab.tsx
src/content/gsap/fundamentals/gsap-context/examples/RevertKillLab/RevertKillLab.css
src/content/gsap/fundamentals/gsap-context/examples/RevertKillLab/useRevertKillAnimation.ts
docs/handoffs/gsap/core/gsap-context.md
```

24개 소스 파일 + handoff 1개. `sections/`와 `examples/`에는 CSS를 따로 두지 않고 페이지 CSS가 섹션 표시 규칙을 소유한다(예제 CSS는 예제 폴더가 소유). 참조 페이지 두 곳과 같은 배치다.

modify:

```text
src/app/routes.ts   (이 컨텍스트는 건드리지 않는다 — 저장소 소유자가 등록한다)
```

### exampleContracts

#### `ContextRevertLab` — 섹션 01

- goal: 함수 하나 안에서 만든 Tween 3개를 변수 없이 `revert()` 한 번으로 되돌리고, `ctx.data` 기록 수가 3에서 0으로 떨어지는 것을 함께 본다.
- question: "한 번에 되돌린다"는 게 정확히 무엇을 되돌리나요?
- representation: 박스 3개 무대 + 기록 수/`isReverted` 관찰 `dl` + 박스별 속성 표 + 코드 패널
- controls: `Context 안에서 3개 만들기` 버튼, `revert() 한 번 부르기` 버튼(생성 전 `disabled`)
- runtimeSource: `useContextRevertAnimation.ts`
- sourcePath: `examples/ContextRevertLab/useContextRevertAnimation.ts`
- runtimeOwnership: hook이 `steps`(대상·속성·시작·목적지)와 `duration`을 담은 단일 descriptor, 수동 생성한 `gsap.Context` 하나, `scope` ref를 소유한다. 관찰값은 전부 `gsap.getProperty`와 `ctx.data.length` · `ctx.isReverted`에서 **읽은** 값이다.
- displayOwnership: TSX가 descriptor를 코드 문법으로만 직렬화한다. `gsap`을 import하지 않는다.
- coveredSourceItemIds: CTX-01, CTX-02, CTX-03, CTX-P1, CTX-P2
- **다중 대상 근거**: "여러 개를 한 번에 되돌린다"가 개념 자체다. `docs/project-structure.md`가 허용하는 예외에 해당한다.
- accessibility: native 버튼, 관찰값은 `dt`/`dd` + `output aria-labelledby`, 상태는 `role="status"` 하나, 860px 이하 단일 열
- motion: 자동 재생 없음. `useReducedMotion()`이 `duration`을 0으로 낮춰 이동 없이 최종 상태만 보여준다. 상태 문구에도 모션 감소 여부를 밝힌다.

#### `ScopedSelectorLab` — 섹션 02

- goal: 같은 class를 가진 두 카드에 **같은 선택자 한 줄**을 실행하되 `gsap.context()`의 두 번째 인자만 넣고 빼서 선택 범위가 3개↔6개로 갈리는 것을 본다.
- question: 선택자를 그대로 두고 scope만 바꾸면 무엇이 달라지나요?
- representation: 카드 2개(각 박스 3개) 무대 + 카드별 "박스 수 / 움직인 수" 표 + 코드 패널
- controls: scope 여부 radio 2개, `같은 선택자로 실행` 버튼, `revert()` 버튼
- runtimeSource: `useScopedSelectorAnimation.ts`
- sourcePath: `examples/ScopedSelectorLab/useScopedSelectorAnimation.ts`
- runtimeOwnership: hook이 `selector` · `mode` · `scopeExpression` · `y` · `duration` descriptor와 Context 하나, 카드 두 개의 ref를 소유한다. `descriptor.mode`로 `gsap.context(fn, cardOneRef)` / `gsap.context(fn)` 분기를 실행하고, 움직인 개수는 각 카드 안에서 `gsap.getProperty(el,'y') !== 0`을 **세어** 얻는다.
- displayOwnership: TSX가 `descriptor.scopeExpression`의 유무로 두 번째 인자 유무를 그린다 — 실행 분기와 표시가 같은 값에서 나온다.
- coveredSourceItemIds: CTX-05, CTX-06, CTX-07
- **다중 대상 근거**: 공식 `selector()` 페이지가 든 "같은 컴포넌트가 여러 벌" 상황이 개념의 본질이다.
- accessibility: native radio + labeled 버튼, scope 대상 카드는 색뿐 아니라 카드 제목 문장으로도 알림, 860px 이하 단일 열
- motion: 자동 재생 없음. `useReducedMotion()`이 `duration`을 0으로 낮춘다.

#### `ContextAddLab` — 섹션 04

- goal: 클릭 시점에 만든 Tween 하나를 네 경로로 만들어, 기록 수와 `revert()` 결과가 갈리는 것을 본다.
- question: Context 함수가 끝난 뒤 만든 애니메이션도 함께 되돌릴 수 있나요?
- representation: 박스 1개 무대 + 기록 수/x 관찰 `dl` + 네 경로 비교 표 + 코드 패널
- controls: 경로 radio 4개(`outside` · `named` · `immediate` · `ignored`), 3단계 버튼(`Context 만들기` → `클릭 시점 애니메이션 만들기` → `revert()`)
- runtimeSource: `useContextAddAnimation.ts`
- sourcePath: `examples/ContextAddLab/useContextAddAnimation.ts`
- runtimeOwnership: hook이 descriptor와 Context, `descriptorRef`(등록해 둔 handler가 최신 `duration`을 읽게 하는 용도)를 소유한다. Context 함수 안에서는 애니메이션을 만들지 않고 `self.add('onClick', animate)`로 이름만 등록한다. 네 분기의 실제 호출(`animate()` / `ctx.onClick()` / `ctx.add(animate)` / `ctx.ignore(animate)`)을 전부 hook이 소유한다.
- displayOwnership: TSX가 `bodyByMode`로 고른 경로의 코드만 포맷한다.
- coveredSourceItemIds: CTX-10, CTX-11, CTX-12, CTX-13, CTX-14, CTX-15, CTX-P3, CTX-P6
- accessibility: native radio + labeled 버튼, 단계 미도달 버튼은 `disabled`, 현재 선택 행은 색이 아니라 `aria-current` + 왼쪽 표시선, 860px 이하 단일 열
- motion: 자동 재생 없음. `useReducedMotion()`이 `duration`을 0으로 낮춘다.

#### `RevertKillLab` — 섹션 05

- goal: 같은 Context를 `revert()` · `kill()` · `kill(true)`로 각각 끝내 값 · `isReverted` · 기록 수 · **cleanup function 호출 횟수**가 어떻게 갈리는지 본다. 이 페이지의 핵심 예제다.
- question: 끝내는 방법에 따라 화면에 무엇이 남나요?
- representation: 박스 1개 무대(단일 대상) + 4칸 관찰 `dl` + 세 방법 비교 표 + 코드 패널
- controls: `Context 만들고 옮기기` 버튼, 종료 방법 버튼 3개(생성 전 `disabled`)
- runtimeSource: `useRevertKillAnimation.ts`
- sourcePath: `examples/RevertKillLab/useRevertKillAnimation.ts`
- runtimeOwnership: hook이 descriptor와 Context, `cleanupCallsRef`를 소유한다. Context 함수가 **cleanup function을 return**하게 만들어 호출 횟수를 실제로 센다. 네 관찰값을 같은 시점에 한 번에 읽는다.
- displayOwnership: TSX가 마지막으로 실행된 종료 방법(`observation.endedBy`)을 코드 마지막 줄로 포맷한다.
- coveredSourceItemIds: CTX-16, CTX-17, CTX-18, CTX-19, CTX-P4, CTX-P5
- **단일 대상 근거**: 섹션 01이 다중 대상으로 "모으기"를 보였으므로, 여기서는 한 대상·한 변화로 두 메서드의 차이만 본다.
- accessibility: native 버튼, 현재 행은 `aria-current` + 왼쪽 표시선, 상태는 `role="status"` 하나, 860px 이하 단일 열
- motion: 자동 재생 없음. `useReducedMotion()`이 `duration`을 0으로 낮춰도 시작값↔끝값 비교가 그대로 성립한다.

#### 섹션 03에 실행 예제를 두지 않은 이유

- runtimeSource: `none`
- sourcePath: `sections/SelectorUtilitySection/SelectorUtilitySection.tsx` (정적 코드를 소유하는 TSX)
- controls: `none`
- motion: `none`
- 이유: `gsap.utils.selector()`의 범위 지정 **동작**은 섹션 02의 `ScopedSelectorLab`이 이미 관찰 가능하게 보여준다. 섹션 03이 더하는 것은 동작이 아니라 **형태**(돌려받는 게 결과가 아니라 함수라는 것, NodeList가 아니라 Array라는 것, 프레임워크별로 무엇을 넘기는지)여서 코드 블록과 표가 더 직접적인 표현이다. `docs/workflows/learning-design.md`가 "모든 item에 같은 UI를 강제하지 않는다"고 정한 대로 정적 표현을 골랐고, 이는 `tween-callbacks-promise`가 `then()`에 정적 표현을 쓴 선례와 같다. 비슷한 질문에 답하는 다섯 번째 lab을 추가하면 "한 예제는 하나의 질문" 계약이 오히려 흐려진다.

### nonGoals

- `useGSAP()`의 scope · dependencies · `revertOnUpdate` · `contextSafe` 계약을 설명하지 않는다. `react-use-gsap`이 소유한다. (예제 hook들이 `useGSAP`을 **쓰긴** 하지만 설명 대상으로 삼지 않는다.)
- `gsap.matchMedia()`의 조건별 정리를 다루지 않는다.
- Timeline의 순서 제어와 `kill()`·`revert()`를 다루지 않는다. 공식이 그은 경계를 그대로 따른다.
- ScrollTrigger 명세를 다루지 않는다. Context가 함께 기록한다는 공식 문장만 전달한다.
- `gsap.utils`의 나머지 utility method를 다루지 않는다. 이 페이지는 `selector()`의 **범위 지정** 역할만 소유한다.
- 네 lab을 공용 generic runtime으로 합치지 않는다. 각 lab이 자기 hook을 소유한다.
- `revert(config)`의 `config`를 설명하지 않는다. 설치본 타입에만 있고 공식 페이지에 없다.

### preserve

- 공식 코드 예제의 **원문 주석까지** 그대로 둔다 — `// <- scope!!!`, `// <-- gets added to the Context!`, `// ... will NOT get reverted ... Ignored, not recorded in the Context.`, `// BOOM! Every GSAP animation created in that function gets reverted!`. 주석 자체가 공식이 강조한 내용이다.
- 공식 문구 `[optionally]`, `permanent`, `very uncommon situations`의 강조 의도.
- 공용 컴포넌트(`OfficialDocsLink`, `useReducedMotion`) — 변경 없음.
- `src/app/routes.ts` — 이 컨텍스트에서 수정하지 않는다.
- 다른 학습 페이지 폴더 — 특히 동시 작업 중인 `react-use-gsap/`은 읽기만 했다.
- `master-page-inventory.md`의 소유권 행.

## 검증 계약

### verifiedPerspectives

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion, Build/Integration, Cross-page Consistency — 모두 구현 컨텍스트가 직접 판정했다(`docs/workflows/quality-gates.md`: 독립 검수자를 두지 않는다).

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-CTX-001 | PASS | 2026-08-04에 두 canonical 원문을 직접 조회해 33개 item을 확인했다. heading 순서, 코드 예제, Tips & Caveats 4개 항목, `selector()`의 Parameters·Returns 원문을 인용으로 고정했다. | blocker 없이 구현 가능 | 미게시 명세를 `공식 페이지에 명시 없음`으로 표시 |
| SRC-CTX-002 | ADDRESSED | 1차 WebFetch 요약이 `gsap.context()`의 코드 예제에서 **원문 주석 여러 줄을 삭제**했다 — `// use any arbitrary string as a name; it'll be added to the Context object...`, `// now the Context has an onClick() method we can tap into...`, `// create context`, `// then later, add to it:`, 그리고 "Vue 3 Composition API" admonition 제목. "h1부터 Tips & Caveats까지 raw markdown 그대로, 요약하지 말고 재현하라"는 3차 조회로 전부 되살려 `CTX-11` · `CTX-12` · `CTX-09`의 근거로 고정했다. | 요약본만 믿었으면 `add()` 이름 규칙과 Vue 주의를 누락할 뻔했다 | none |
| SRC-CTX-003 | PASS | `gsap.context()`의 signature·Parameters·Returns 부재를 **서로 다른 프롬프트 3회**로 교차 확인했다(전체 전사 요구 / "Quick Start 아래 signature 블록을 인용하라" 지목 질의 / raw markdown 덤프). 3회 모두 해당 절이 존재하지 않았다. 부재를 "요약 누락"으로 오판하지 않기 위한 절차다. | `공식 페이지에 명시 없음` 표기의 근거 | none |
| SRC-CTX-004 | ADVISORY | `selector()`에 대한 2차 지목 질의는 오히려 1차보다 답이 나빴다(Q5에서 코드 블록을 인용하지 않고 요약함). 1차 전체 전사 결과를 authority로 유지하고 2차는 Parameters 원문 재확인 용도로만 썼다. | 재조회가 항상 더 낫지는 않음 — 원문성이 높은 응답을 authority로 고른다 | none |
| PROBE-CTX-001 | PASS | **측정 방법**: `node --input-type=module`로 설치본 GSAP `3.15.0`을 import(프로젝트 루트, `document` 없음). `const ctx = gsap.context(() => {})` 뒤 `Object.keys(ctx)` → `["selector","data","_r","isReverted","id","last"]`, `Object.getOwnPropertyNames(Object.getPrototypeOf(ctx))` → `["constructor","add","ignore","getTweens","clear","kill","revert"]`, `ctx.constructor.name` → `"Context"`. 함수 안에 플래그를 두어 `gsap.context()` 호출 **중에** 실행됨을 확인했고, 그 안에서 만든 tween 1개가 호출 직후 `ctx.data.length === 1`로 잡혔다. | `CTX-P1` 근거 | 공식이 아닌 실행 확인임을 페이지에 명시 |
| PROBE-CTX-002 | PASS | **측정 방법**: 같은 환경에서 `gsap.context(() => { gsap.to(o,{v:1,duration:1}); gsap.timeline().to(o,{v:2,duration:1}); })` 실행. `ctx.data.length === 3`, `data.map(d=>d.constructor.name)` → `Tween,Timeline,Tween`(Timeline의 자식 Tween이 함께 기록됨). `ctx.getTweens()`는 길이 2의 Array로 Tween만 골라 돌려줬다. | `CTX-P2` 근거 — 기록 수가 만든 개수보다 커 보일 수 있다는 경고 | 예제는 Timeline을 쓰지 않아 기록 수가 직관적으로 유지됨 |
| PROBE-CTX-003 | PASS | **측정 방법·재현 조건**: 대상은 DOM이 아닌 일반 객체 `{ v: 0 }`, tween은 `{ v: 100, duration: 1, ease: 'none' }`(ease를 `none`으로 고정해야 중간값이 재현 가능하다 — 기본 `power1.out`에서는 `progress(0.5)`가 75였다). 같은 조건의 Context 3개를 만들어 각각 `progress(1)` 뒤 `revert()` / `kill()` / `kill(true)` 실행. 결과: 값 `0` / `100` / `0`, `isReverted` `true` / `false` / `true`, cleanup 호출 `1` / `0` / `1`회, `data.length`는 셋 다 `0`. | `CTX-P4` · `CTX-P5` 근거 — 이 페이지의 핵심 주장 | 실행 확인 사실임을 페이지와 lab 표 caption에 명시 |
| PROBE-CTX-004 | PASS | **측정 방법**: Context 함수가 cleanup을 return하고 `ctx.add(() => { return () => {...} })`도 하나 더 등록한 상태에서 `revert()` 1회 호출 → 두 cleanup이 모두 불림(카운터 `0 → 11`, 각각 `+1`·`+10`). 이어서 `revert()`를 한 번 더 호출해도 카운터는 `11`로 그대로였다. | `CTX-P5`의 "두 번째 revert에서 다시 불리지 않는다" 근거 | none |
| PROBE-CTX-005 | PASS | **측정 방법**: `gsap.context((self) => { self.add('onClick', fn) })` 직후 `ctx.data.length === 0`이고 `typeof ctx.onClick === 'function'` — 즉 등록만 되고 실행되지 않았다. `ctx.onClick()` 뒤 `1`, 이어 `ctx.add(fn)` 뒤 `2`(즉시 실행됨, 플래그로 확인). 두 호출의 반환값은 모두 `undefined`. 설치본 `gsap-core.d.ts:61`은 `add(methodName, func, scope?): Function`으로 선언하지만 실제 실행값은 `undefined`였다. | `CTX-P3` 근거 — 타입 선언과 실행값의 불일치를 페이지에 함께 적었다 | none |
| PROBE-CTX-006 | PASS | **측정 방법**: 위와 같은 Context에서 함수 실행이 끝난 뒤 밖에서 `ctx.ignore(() => { gsap.to(...) })` 호출 → `ctx.data.length`가 `2`에서 늘지 않았다. 공식 예제는 함수 **안에서** `self.ignore()`를 부르는 형태만 보여준다. | `CTX-P6` 근거 — `ContextAddLab`의 `ignored` 경로 설계 근거 | none |
| PROBE-CTX-007 | PASS | **측정 방법**: 공식 Tips의 재사용 주장을 실행으로 대조. `revert()` 뒤 `isReverted === true` · `data.length === 0`인 상태에서 `ctx.add(() => gsap.to(...))`를 호출하니 `isReverted`가 `false`로 되돌아가고 `data.length === 1`이 됐으며, 2차 `revert()`가 그 새 tween의 값을 되돌렸다. | `CTX-18`(공식 주장)의 실행 대조 — 새 item 아님 | none |
| PROBE-CTX-008 | PASS | **측정 방법**: `document`가 없는 Node에서 `gsap.context(() => {}, '.my-scope')`를 try/catch로 호출 → `TypeError: Cannot read properties of undefined (reading 'querySelectorAll')`. 같은 환경에서 `typeof document === 'undefined'`, `gsap.context(()=>{}).selector === undefined`(scope 미지정 시). | `SEL-P1` 근거 | none |
| PROBE-CTX-009 | BLOCK → ADDRESSED → PASS | `gsap.utils.selector()`의 **실제 선택 동작**(자손만 찾는지, NodeList가 아니라 Array인지)을 확인하려 했으나 이 저장소에 `jsdom`·`happy-dom`이 없어 DOM을 만들 수 없었다(`ls node_modules`로 확인). 추측으로 채우지 않고, 해당 항목(`SEL-01` · `SEL-05`)을 **공식 문장 인용으로만** 서술하고 probe 주장을 달지 않는 것으로 해소했다. 페이지의 probe 블록에도 "브라우저에서의 선택 결과는 이 방법으로 확인할 수 없어 주장하지 않는다"를 명시했다. | 확인하지 못한 것을 주장하지 않음 | 브라우저 검수 시 `ScopedSelectorLab`의 카드별 개수로 간접 확인 |
| OC-CTX-001 | PASS | 2026-08-05에 스크립트로 대조 — meta 섹션 `sourceItems` 합 **33** = catalog `origin: 'official'` 행 수 **33** = meta `officialSourceItems` **33**. 섹션 6개 전부 개별 일치(4/5/13/6/4/1). source별 분포 `context` 20 + `selector` 13 = 33. 중복 ID **0건**(40행 전체). `localSections` 6 = 실제 섹션 배열 길이 6. | Official Coverage 통과 | none |
| RDS-CTX-001 | PASS | 네 lab 모두 hook의 descriptor에서 GSAP 호출과 표시 코드가 함께 파생된다. TSX 4개 어느 것도 `gsap`을 import하지 않음을 grep으로 확인했고(`from 'gsap'`은 hook 4개에만 존재), 관찰값은 전부 `gsap.getProperty` · `ctx.data.length` · `ctx.isReverted` · cleanup 카운터로 **읽은** 값이다. `ScopedSelectorLab`은 `descriptor.scopeExpression` 하나로 실행 분기와 표시 코드의 두 번째 인자를 동시에 결정한다. | Runtime/Display Sync 통과 | none |
| STRUCT-CTX-001 | PASS | 페이지 TSX는 헤더와 섹션 조립만 한다. 섹션 6개·예제 4개·페이지 전용 컴포넌트 2개가 각자 폴더를 갖고, 예제마다 자기 실행 source를 소유한다. 한 파일에 React 컴포넌트가 둘 이상 정의된 곳이 없다. 주석은 파일 상단·`export` 위 한 줄, hook 안 선언·실행 단계마다 한 줄(AGENTS.md 6·7번). | Structure/Comment 통과 | none |
| STRUCT-CTX-002 | BLOCK → ADDRESSED → PASS | `SelectorUtilitySection.tsx`의 probe 문단에 `<code>gsap.context(() => {}, '.my-scope')</code>`를 직접 적어 JSX가 `{}`를 **빈 표현식으로 먹어** 화면에 `gsap.context(() => , '.my-scope')`로 렌더될 상태였다. `probeCall` 문자열 상수로 빼내 해소했다. | 학습자에게 잘못된 코드를 보여줄 뻔함 | none |
| STRUCT-CTX-003 | BLOCK → ADDRESSED → PASS | `ContextAddLab.tsx`가 쓰는 `context-add-lab__side` 클래스에 CSS 규칙이 없었다(스크립트로 전 클래스 대조 중 발견). 규칙을 추가해 해소했다. 남은 미정의 클래스는 `context-page`(루트)와 `context-revert-lab__box--a/b/c`뿐이며, 전자는 참조 페이지 2곳도 루트 규칙을 두지 않는 동일 패턴이고 후자는 **GSAP 선택자 전용 hook**이라 스타일이 필요 없다. | import한 파일·클래스 누락 방지 | none |
| PED-CTX-001 | PASS | 처음 나오는 용어를 실행 전에 정의했다 — 섹션 01의 `Context`/`revert`/`scope` 표, 섹션 02의 `descendant`, 섹션 04의 `self`(별도 소절). 예제 4개 모두 `무엇이 달라졌나요? · 무엇을 봐야 하나요? · 왜 이렇게 동작하나요? · 실제로 언제 쓰나요?` 네 패널을 갖는다. | Pedagogy 통과 | none |
| PED-CTX-002 | PASS | 다중 대상을 쓴 두 lab의 근거를 각각 기록했다 — `ContextRevertLab`은 "여러 개를 한 번에"가 개념 자체, `ScopedSelectorLab`은 공식이 든 "같은 컴포넌트 여러 벌" 상황이 개념 자체. 나머지 두 lab은 단일 대상이다. | `docs/project-structure.md` 다중 대상 예외 조건 충족 | none |
| A11Y-CTX-001 | PASS (정적) | 코드·마크업만으로 판정 가능한 부분 — 모든 control이 native `button`/`input[type=radio]`이고 `label`·`legend`로 이름이 붙는다. 관찰값은 `dt`/`dd` + `output aria-labelledby`, 상태는 lab마다 `role="status"` 하나. 표의 현재 선택 행은 색만이 아니라 `aria-current`와 왼쪽 표시선으로도 구분된다. probe 블록도 색이 아닌 dashed 테두리 + 문장으로 구분한다. 860px 이하 단일 열 규칙이 네 lab과 페이지 CSS에 모두 있고, 표·코드는 `overflow-x: auto` 컨테이너 안에 있다. | 정적 판정은 유예 대상이 아님 | none |
| MOTION-CTX-001 | PASS (정적) | 네 lab 모두 **자동 재생이 없다**(진입 시 애니메이션이 시작되지 않고 버튼을 눌러야 실행된다). 네 hook 전부 `useReducedMotion()`을 소비해 `duration`을 0으로 낮추고, 각 TSX가 모션 감소 상태를 상태 문구로도 알린다. 모션 감소 시에도 시작값↔끝값 비교라는 학습 목표가 그대로 성립한다. | 정적 판정은 유예 대상이 아님 | none |
| BUILD-CTX-001 | PASS | 2026-08-05 `npx tsc --noEmit` → **exit 0, 출력 0줄**(저장소 전체 오류 0건, `gsap-context` 경로 오류 0건). 상대경로 import 전수 검사 스크립트로 24개 파일의 모든 `./` import가 실제 파일로 해석됨을 확인했다(MISSING 0건). `npm run build`·`npm run build-storybook`은 이 작업 범위에서 금지되어 실행하지 않았다. | build/integration 통과(이 페이지 범위) | 소유자가 전체 배치 완료 후 full build 1회 |
| XPAGE-CTX-001 | PASS | `gsap-to` · `tween-playhead` · `tween-configuration`은 등록된 라우트라 `toHref()`로 링크했다. `react-use-gsap`은 `src/app/routes.ts`에 **아직 없어** 링크하면 `resolveRoute`가 첫 레슨으로 흡수하므로 링크 없이 문장으로만 경계를 밝혔다. Timeline · `matchMedia` · ScrollTrigger도 미구현이라 이름만 남겼다. 동시 작업 중인 `react-use-gsap/` 폴더는 읽기만 하고 수정하지 않았다. | Cross-page Consistency 통과 | 소유자가 `react-use-gsap` 등록 후 `BoundariesSection`의 `upcoming` 행을 `otherOwners`로 승격 |
| LT-CTX-001 | PASS | 공식 목차(Quick Start / Scoping selector text / Adding to a Context / Cleanup function / Ignoring / Tips & Caveats)를 그대로 번역하지 않고 학습자 상황 순서로 재구성했다 — 문제 상황 → 모아서 되돌리기 → 범위 가두기 → 독립 utility → 나중에 생기는 것 → 되돌림의 수명 → 경계. Tips & Caveats 4개 항목은 한 덩어리로 옮기지 않고 각각 소유 섹션(01의 버전, 04의 `self`, 05의 permanence·Timeline 경계)으로 분산했다. | Learning Transformation 통과 | none |
| A11Y-CTX-002 | DEFERRED → PASS | 키보드 이동·포커스 표시, `prefers-reduced-motion` 실제 전환 동작, 320/390px 실제 레이아웃과 overflow, 네 lab control의 실제 조작 결과 | 소유자 일괄 브라우저 검수 대상 | 전체 페이지 완성 후 일괄 확인 |
| A11Y-CTX-003 | DEFERRED → PASS | `ScopedSelectorLab`에서 scope 유무에 따라 카드별 이동 개수가 실제로 `3/0`과 `3/3`으로 갈리는지 — DOM이 필요해 Node probe로 확인할 수 없었다(`PROBE-CTX-009`). 화면에 표시되는 개수는 전부 DOM에서 **센** 관찰값이라 결과가 달라도 거짓을 표시하지는 않는다. | 소유자 일괄 브라우저 검수 대상 | 브라우저에서 두 radio 모드를 각각 실행해 확인 |

### verificationEvidence

- 공식 원문 대조 — 2026-08-04, 두 canonical URL 직접 조회. `gsap.context()`는 프롬프트를 바꿔 **3회**(전체 전사 / 지목 질의 / raw markdown 덤프), `selector()`는 **2회** 조회해 원문 인용으로 고정했다. 코드 예제는 주석까지 원문을 보존했다.
- runtime probe — 2026-08-04, `node --input-type=module`로 설치본 GSAP `3.15.0`을 import해 실행. 재현 조건은 각 finding에 함께 적었다(대상 객체 형태, `ease: 'none'` 고정 이유, `document` 없는 환경). DOM이 필요한 항목은 확인하지 않았고 주장하지도 않았다(`PROBE-CTX-009`).
- 정합성 대조 — 2026-08-05, 스크립트로 meta 섹션 합(33) = catalog `official` 행(33) = meta 분모(33), 섹션별 개별 일치, source별 분포(20+13), 중복 ID 0건 확인.
- 파일·클래스 존재 검사 — 2026-08-05, 상대경로 import 전수 해석(MISSING 0건)과 TSX 사용 클래스 대 CSS 정의 대조(누락 1건 발견·해소).
- 타입 검사 — 2026-08-05, `npx tsc --noEmit` exit 0, 출력 0줄.

### releaseDecision

`PASS` — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

미해결 `BLOCK` 없음. 구현 중 발생한 `BLOCK` 3건(`PROBE-CTX-009`, `STRUCT-CTX-002`, `STRUCT-CTX-003`)은 모두 수정·재확인을 마쳐 `PASS`로 재판정했고 원래 상태를 위 표에 보존했다.

라우팅 등록(`src/app/routes.ts`)은 이 컨텍스트의 작업 범위 밖이며 저장소 소유자가 수행한다. 등록 전까지 이 페이지는 앱에서 접근되지 않는다. 등록 시 `GsapContextPage`를 `fundamentals` 트랙에 `slug: 'gsap-context'`로 추가하면 된다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
