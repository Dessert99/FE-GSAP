# Find and stop animations handoff

## 입력 계약

### objective

변수에 담아 두지 않은 Tween을 다시 찾아 안전하게 중단하는 방법을, 조회 세 개(`getById` · `getTweensOf` · `isTweening`)와 중단 세 개(`killTweensOf` · `Tween.kill` · `Tween.revert`)를 **"찾기 → 범위 좁혀 멈추기 → 되돌리기"** 하나의 흐름으로 재구성한다. 이 페이지의 핵심 학습 목표는 **`kill()`은 그 자리에 멈추고 `revert()`는 animation 이전 상태로 되돌린다**는 차이를 관찰 가능하게 만드는 것이다. 초보자가 가장 많이 혼동하는 지점이고, 틀리면 화면 상태를 잃는 코드를 쓰게 된다.

### officialPage

- title: `gsap.getById()` + `gsap.getTweensOf()` + `gsap.isTweening()` + `gsap.killTweensOf()` + `Tween.kill()` + `Tween.revert()`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/gsap.getById()`
  - `https://gsap.com/docs/v3/GSAP/gsap.getTweensOf()`
  - `https://gsap.com/docs/v3/GSAP/gsap.isTweening()`
  - `https://gsap.com/docs/v3/GSAP/gsap.killTweensOf()`
  - `https://gsap.com/docs/v3/GSAP/Tween/kill()`
  - `https://gsap.com/docs/v3/GSAP/Tween/revert()`
- reviewedAt: `2026-08-04`
- category: `GSAP > Query & Kill`
- slug: `find-stop-animations`
- sourcePageIds: primary `source:gsap-get-by-id`; related `source:gsap-get-tweens-of`, `source:gsap-is-tweening`, `source:gsap-kill-tweens-of`, `source:tween-kill`, `source:tween-revert`

여섯 페이지 중 **signature 줄과 Parameters 절을 게시한 것은 `Tween.kill()` 하나뿐**이다. `Tween.revert()`는 signature 줄(`revert( ) : Self`)과 `Returns` 절은 있지만 Parameters 절이 없다(인자가 없으므로). 나머지 네 개 gsap 전역 메서드 페이지는 `Returns`와 `Details`만 있고 **signature 줄도 Parameters 절도 없다**. 게시되지 않은 명세를 기억이나 TypeScript 선언으로 채우지 않는다. 해당 칸은 `공식 페이지에 명시 없음`으로 표시한다.

각 canonical은 원문 markdown을 그대로 받아 대조했다. 요약본이 항목을 뭉개는 것을 막기 위해 2026-08-04에 여섯 URL 모두에 대해 "첫 h1부터 끝까지 요약 없이 원문 그대로" 재조회를 한 번 더 수행했고, 첫 조회에서 "not present on page"로 나왔던 `gsap.killTweensOf()`의 본문 5문장과 `Tween/kill()`의 Parameters 절이 실제로는 존재함을 확인했다.

### localPage

- localPath: `src/content/gsap/fundamentals/find-stop-animations/`
- route: `/fundamentals/find-stop-animations`

### sourceManifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| GID-01 | tween이나 timeline을 만들 때 `id`를 부여하면 나중에 그것을 참조할 수 있다. | `source:gsap-get-by-id` Details | verified |
| GID-02 | React 같은 framework와 build tool에서 변수를 계속 추적하기 어려울 때 도움이 된다. | `source:gsap-get-by-id` Details | verified |
| GID-03 | 반환값은 해당 ID에 연결된 tween 또는 timeline이며, 그 ID를 가진 것이 없으면 `undefined`를 돌려준다. | `source:gsap-get-by-id` "Returns : Tween or Timeline" | verified |
| GID-04 | 공식 예제 — `gsap.to(obj, { id: "myTween", duration: 1, x: 100 });` / `//later` / `let tween = gsap.getById("myTween"); //returns the tween` / `tween.pause();` | `source:gsap-get-by-id` Details 예제 | verified |
| GID-05 | "GSAP automatically releases animations for garbage collection shortly after they complete, so `getById()` will only find animations that are active or haven't begun yet." | `source:gsap-get-by-id` warning | verified |
| GID-06 | "Otherwise, if kept all animations around just in case you're gonna call `getById()` to find one, it could quickly clog up the system and lead to memory leaks." | `source:gsap-get-by-id` warning | verified |
| GID-07 | 완료 뒤에도 참조가 필요하면 변수를 쓰라는 권고와 예제 `let myTween = gsap.to(obj, { duration: 1, x: 100 });` / `// later` / `myTween.pause();` | `source:gsap-get-by-id` warning 끝 | verified |
| GTO-01 | "Returns an array containing all the tweens of a particular target (or group of targets) that have not yet been released for garbage collection." | `source:gsap-get-tweens-of` Returns · Details | verified |
| GTO-02 | GC 시점을 "which typically happens when the tween completes"로 덧붙인다. | `source:gsap-get-tweens-of` Details | verified |
| GTO-03 | `gsap.getTweensOf(".myClass")`는 그 class를 가진 element들의 tween 배열을 돌려주고, 실제 element/target/object를 그대로 넘겨도 된다. | `source:gsap-get-tweens-of` Details | verified |
| GTO-04 | 만들고 끝나게 둔 뒤 한참 있다 찾으면 engine이 이미 GC로 넘겨서 못 찾을 수 있다. | `source:gsap-get-tweens-of` Details | verified |
| GTO-05 | "Remember, one of the best parts of GSAP is that it saves you from the headache of managing garbage collection chores. Otherwise, you'd need to manually dispose each tween you create." | `source:gsap-get-tweens-of` Details | verified |
| GTO-06 | 공식 예제 — `getTweensOf(obj1)`는 `//finds 2 tweens`, `getTweensOf([obj1, obj2])`는 `//finds 3 tweens` | `source:gsap-get-tweens-of` 예제 | verified |
| IST-01 | "Reports whether or not a particular object is actively animating." 반환값은 Boolean. | `source:gsap-is-tweening` Returns : Boolean | verified |
| IST-02 | "If a tween is paused, completed, or hasn't started yet, it isn't considered active." | `source:gsap-is-tweening` Returns 절 | verified |
| IST-03 | "The `target` can be selector text or an object/element." | `source:gsap-is-tweening` 마지막 문장 | verified |
| IST-04 | 공식 예제 — `if (!gsap.isTweening("#id")) { // do stuff}` | `source:gsap-is-tweening` 예제 | verified |
| KTO-01 | "Kills all the tweens (or specific tweening properties) of a particular object or the delayedCalls to a particular function." | `source:gsap-kill-tweens-of` 첫 문장 | verified |
| KTO-02 | "To kill only particular tweening properties of the object, use the second parameter." 예제 `gsap.killTweensOf(myObject, "opacity,x");` | `source:gsap-kill-tweens-of` 본문 | verified |
| KTO-03 | delayedCall은 `target`과 `onComplete`가 같은 함수인 tween이므로 `gsap.killTweensOf(myFunction);`으로 kill한다. | `source:gsap-kill-tweens-of` 본문 | verified |
| KTO-04 | `".myClass"` / `"#myID"` 같은 selector text를 넘길 수 있고, `"*"`는 DOM target을 가진 모든 tween을 kill한다. | `source:gsap-kill-tweens-of` 본문 | verified |
| KTO-05 | "You may also pass in an array of targets." | `source:gsap-kill-tweens-of` 본문 | verified |
| KTO-06 | "`killTweensOf()` affects tweens that haven't begun yet too." + delay 5초 tween을 2초 뒤 kill해도 kill된다는 예. | `source:gsap-kill-tweens-of` 마지막 문단 | verified |
| TKL-01 | signature `kill( target:Object, propertiesList:String ) : self` | `source:tween-kill` heading | verified |
| TKL-02 | `target:Object` (default `null`) — 특정 target(들)에 관한 부분만 kill. "If no target is defined, **ALL** targets will be affected." | `source:tween-kill` Parameters | verified |
| TKL-03 | `propertiesList:String` (default `"all"`) — 콤마로 구분한 property 이름 목록. "If no object (or `null` or `"all"`) is defined, **ALL** properties will be killed." | `source:tween-kill` Parameters | verified |
| TKL-04 | "Returns : self — self (makes chaining easier)" | `source:tween-kill` Returns | verified |
| TKL-05 | "Kills the animation entirely or in part depending on the parameters." | `source:tween-kill` 요약 · Details | verified |
| TKL-06 | "To kill means to immediately stop the animation, remove it from its parent timeline, and release it for garbage collection." | `source:tween-kill` 요약 | verified |
| TKL-07 | "Simply calling `kill()` (omitting the parameters) will immediately stop the animation, remove it from its parent timeline, wipe out any property tweens and release it for garbage collection." + 예제 `animation.kill(); animation = null;` | `source:tween-kill` Details | verified |
| TKL-08 | 공식 예제 4줄 — `kill(myObject)` / `kill(null, "x,y")` / `kill(myObject, "x,y")` / `kill([myObject1, myObject2], "opacity")` + `//you could use selector text instead, like ".class1, .class2"` | `source:tween-kill` Details 예제 | verified |
| TKL-09 | warning — "don't kill() an animation if you want to use it again later - you could pause() it instead if you want to reuse it." | `source:tween-kill` warning | verified |
| TRV-01 | signature `revert( ) : Self` — 인자 없음 | `source:tween-revert` heading | verified |
| TRV-02 | "Reverts the animation and kills it, returning the targets to their pre-animation state including the removal of inline styles added by the animation." | `source:tween-revert` 요약 · Details | verified |
| TRV-03 | "Returns : Self — The Tween itself, for easy chaining" | `source:tween-revert` Returns | verified |
| TRV-04 | `progress(0).pause()`는 "the starting values that GSAP parsed from the computed style"로 되돌리지만 결과가 `<div class="box" style="opacity: 1">`처럼 inline style로 남는다. | `source:tween-revert` The problem | verified |
| TRV-05 | "perhaps a media query CSS rule sets opacity to 0.5 on that element. Doh! The inline style will overrule the class rule." | `source:tween-revert` The problem | verified |
| TRV-06 | "That requires a new method because `progress(0)` _SHOULD_ set inline styles to ensure the state is what it's supposed to be at that point in the animation." | `source:tween-revert` The problem | verified |
| TRV-07 | "GSAP 3.11 added a `.revert()` method to all Tweens and Timelines" + `animation.revert(); // removes inline styles that were added by the animation` | `source:tween-revert` The solution | verified |

공식 item 합계 **39개** (`get-by-id` 7 · `get-tweens-of` 6 · `is-tweening` 4 · `kill-tweens-of` 6 · `tween-kill` 9 · `tween-revert` 7).

### sourceBlockers

`none`. 39개 기술 item 전부 2026-08-04에 여섯 공식 페이지 원문으로 직접 확인했다.

다음은 여섯 공식 페이지가 **게시하지 않은** 내용이므로 주장하지 않는다. 필요해지면 `blocked-source` item을 추가하고 release를 `BLOCK`한다.

- `getById()` · `getTweensOf()` · `isTweening()` · `killTweensOf()`의 signature 줄과 Parameters 절 (네 페이지 모두 없음)
- `id`로 쓸 수 있는 값의 타입, 같은 `id`를 둘 이상에 붙였을 때의 규칙
- `getTweensOf()`의 두 번째 인자(`onlyActive`)와 `killTweensOf()`의 세 번째 인자 — 설치본 타입 선언에는 있으나 공식 페이지에는 없다. 페이지에서 설명하지 않는다.
- `kill()`이나 `revert()` 뒤에 조회 API가 무엇을 돌려주는지
- `revert()`가 DOM이 아닌 일반 object의 값을 어디까지 되돌리는지 (공식 설명은 inline style 서사뿐)
- garbage collection이 정확히 몇 프레임 뒤에 일어나는지
- `Tween.kill()`의 첫 인자에 `null`을 넘기는 공식 예제와, 설치본 public type `kill(target?: object, ...)`의 관계 — 페이지 예제는 `null` 대신 target을 명시하는 공식 예제 형태를 실행해 이 충돌을 피했다.

### moduleSelection

| module | 목적 | 근거 source |
| --- | --- | --- |
| callable method (`CM`) | 여섯 메서드의 인자·반환값·호출 시점을 각각 확정한다. Parameters 절이 있는 `Tween.kill()`만 표로 명세하고 나머지는 `공식 페이지에 명시 없음`으로 표시한다. | 여섯 source |
| 개념·가이드 (`CG`) | "참조를 잃었다"는 상황에서 출발해 조회 세 개의 질문 차이와 중단 세 개의 범위 차이를 하나의 결정 흐름으로 묶는다. | 여섯 source |
| class·instance (`CI`) | Tween instance의 수명 — 언제 registry에 남고 언제 GC로 풀려나며, kill·revert 뒤에 어떤 상태가 되는지. | GID-05·06, GTO-02·04, TKL-06·07, TRV-02 |

property catalog, ease visualizer, plugin, installation 모듈은 추가하지 않는다.

### learnerFlow

| id | 학습자 질문 | sourceItemIds |
| --- | --- | --- |
| `flow:lost-handle` | 반환값을 안 담았는데 그 Tween을 어떻게 다시 잡나요? | GID-01, GID-02, GID-07 |
| `flow:by-id` | id로 찾으면 무엇이 돌아오고, 언제부터 못 찾나요? | GID-03, GID-04, GID-05, GID-06 |
| `flow:by-target` | id를 안 붙였으면 대상만으로 찾을 수 있나요? | GTO-01, GTO-03, GTO-06 |
| `flow:gc-boundary` | 조회에 안 걸리면 문제인가요? | GTO-02, GTO-04, GTO-05 |
| `flow:active-or-not` | "있다"와 "움직인다"는 같은 말인가요? | IST-01, IST-02, IST-03, IST-04 |
| `flow:global-kill` | 대상만 알 때 어떻게 멈추나요? | KTO-01, KTO-03, KTO-04, KTO-05, KTO-06 |
| `flow:narrow-scope` | 전부 말고 일부만 멈출 수 있나요? | KTO-02, TKL-01, TKL-02, TKL-03, TKL-04, TKL-05, TKL-08 |
| `flow:what-kill-does` | 멈춘 뒤 그 Tween은 어떻게 되나요? | TKL-06, TKL-07, TKL-09 |
| `flow:restore` | 멈춘 자리 말고 원래 상태로 돌리려면? | TRV-01, TRV-02, TRV-03, TRV-04, TRV-05, TRV-06, TRV-07 |

### coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| GID-01 | `LostReferenceSection.tsx` id 문단과 `idCall` 코드 블록 | covered |
| GID-02 | `LostReferenceSection.tsx` "왜 변수 대신 id가 필요할까요?" note — 공식 문장 인용 | covered |
| GID-03 | `FindByIdSection.tsx` 반환값 표 두 행 | covered |
| GID-04 | `FindByIdSection.tsx` `officialCall` 원문 코드 블록 | covered |
| GID-05 | `FindByIdSection.tsx` GC 경고 블록 첫 문단 | covered |
| GID-06 | `FindByIdSection.tsx` GC 경고 블록 둘째 문단 | covered |
| GID-07 | `LostReferenceSection.tsx` `variableCall` 원문 코드 블록 + "1. 변수에 담는다" 문단 | covered |
| GTO-01 | `FindByTargetSection.tsx` 도입 문단; 조회 비교 표 `getTweensOf` 행 | covered |
| GTO-02 | `FindByTargetSection.tsx` "여기에도 같은 시간 제한" 경고 첫 문단 | covered |
| GTO-03 | `FindByTargetSection.tsx` selector text 문단; 조회 비교 표 | covered |
| GTO-04 | `FindByTargetSection.tsx` "여기에도 같은 시간 제한" 경고 첫 문단 | covered |
| GTO-05 | `FindByTargetSection.tsx` 같은 경고 둘째 문단 — GC를 단점이 아니라 설계로 설명 | covered |
| GTO-06 | `FindByTargetSection.tsx` `tweensOfCall` 원문 코드 블록 + 2개/3개 해설 문단 | covered |
| IST-01 | `FindByTargetSection.tsx` isTweening 소제목 문단; 조회 비교 표 | covered |
| IST-02 | `FindByTargetSection.tsx` 원문 인용 문단; `TweenRegistryLab` paused 관찰 | covered |
| IST-03 | `FindByTargetSection.tsx` isTweening 소제목 문단 | covered |
| IST-04 | `FindByTargetSection.tsx` `isTweeningCall` 원문 코드 블록 | covered |
| KTO-01 | `KillScopeSection.tsx` 도입 문단 — 공식 첫 문장 인용 | covered |
| KTO-02 | `KillScopeSection.tsx` `globalCalls` 둘째 줄 + 범위 비교 표; `KillScopeLab` `global-prop` 모드 | covered |
| KTO-03 | `KillScopeSection.tsx` delayedCall 문단 | covered |
| KTO-04 | `KillScopeSection.tsx` "selector text와 배열도 그대로 받습니다" note | covered |
| KTO-05 | 같은 note 마지막 문장 | covered |
| KTO-06 | `KillScopeSection.tsx` "아직 시작하지 않은 tween도 함께 정리됩니다" 경고 블록 | covered |
| TKL-01 | `KillScopeSection.tsx` `find-stop-page__signature` 블록 | covered |
| TKL-02 | `KillScopeSection.tsx` Parameters 표 `target` 행 | covered |
| TKL-03 | `KillScopeSection.tsx` Parameters 표 `propertiesList` 행 | covered |
| TKL-04 | `KillScopeSection.tsx` 요약 문단 + 범위 비교 표 instance 행 | covered |
| TKL-05 | `KillScopeSection.tsx` 요약 문단 | covered |
| TKL-06 | `StopVsRestoreSection.tsx` kill 정의 문단 — 공식 문장 인용 | covered |
| TKL-07 | `StopVsRestoreSection.tsx` 둘째 문단 + `killCall` 원문 코드 블록 | covered |
| TKL-08 | `KillScopeSection.tsx` `instanceCalls` 원문 코드 블록(주석 포함) | covered |
| TKL-09 | `StopVsRestoreSection.tsx` 셋째 문단 — pause 대안 경고 | covered |
| TRV-01 | `StopVsRestoreSection.tsx` 해법 문단의 signature 인용 | covered |
| TRV-02 | `StopVsRestoreSection.tsx` "revert는 되돌린 다음 kill까지 합니다" 경고; kill·revert 비교 표 | covered |
| TRV-03 | `StopVsRestoreSection.tsx` 해법 문단 | covered |
| TRV-04 | `StopVsRestoreSection.tsx` `problemCall` 원문 코드 블록 + 해설 둘째 문단 | covered |
| TRV-05 | 같은 해설 셋째 문단 — media query 사고 사례 | covered |
| TRV-06 | 같은 해설 넷째 문단 — progress(0)을 탓하지 않는 이유 | covered |
| TRV-07 | `StopVsRestoreSection.tsx` 해법 문단 + `solutionCall` 원문 코드 블록 | covered |
| FS-P1 | `StopVsRestoreSection.tsx` probe 블록 "값이 어디에 남는가"; `RevertVsKillLab` 관찰 패널 | covered (probe) |
| FS-P2 | `StopVsRestoreSection.tsx` probe 블록 "Tween은 어떻게 되는가"; `RevertVsKillLab` getById·getTweensOf 행 | covered (probe) |
| FS-P3 | `FindByTargetSection.tsx` probe 블록; `TweenRegistryLab` 일시정지 뒤 조회 | covered (probe) |
| FS-P4 | `StopVsRestoreSection.tsx` probe 블록 "다시 쓸 수 있는가"; `RevertVsKillLab` 중단 뒤 slider 무반응 | covered (probe) |
| FS-P5 | `FindByIdSection.tsx` probe 블록 — 숫자 id | covered (probe) |
| FS-P6 | `KillScopeSection.tsx` probe 블록; `KillScopeLab` "남은 Tween" 관찰값 | covered (probe) |

`FS-P1`~`FS-P6`은 공식 item이 아니다. coverage 분모(39)에 포함하지 않으며 `PageCoverage`도 공식 39개와 분리해 센다.

### relatedPages

- `gsap-to` — Tween 생성과 `vars` 전체 계약을 소유한다. `id`도 `vars`의 한 자리이며 이 페이지는 그것을 전제로만 쓴다.
- `tween-playhead` — `progress()` · `pause()` · `restart()`의 의미를 소유한다. 이 페이지의 세 lab은 수동 조작 control로만 쓴다.
- `tween-configuration` — 설정의 출처와 적용 범위를 소유한다.
- Timeline 학습 페이지(미구현) — Timeline의 하위 animation 정리 규칙과 Timeline `kill()`·`revert()`를 소유한다.
- React 통합 문서 — `useGSAP()`의 자동 정리 범위를 소유한다. 이 페이지의 예제도 그 자동 정리를 쓰지만 설명하지 않는다.

## 구현 계약

### exactFiles

create:

```text
src/content/gsap/fundamentals/find-stop-animations/FindStopAnimationsPage.tsx
src/content/gsap/fundamentals/find-stop-animations/FindStopAnimationsPage.css
src/content/gsap/fundamentals/find-stop-animations/find-stop-animations.meta.ts
src/content/gsap/fundamentals/find-stop-animations/find-stop-animations.catalog.ts
src/content/gsap/fundamentals/find-stop-animations/components/PageCoverage/PageCoverage.tsx
src/content/gsap/fundamentals/find-stop-animations/components/SectionHeading/SectionHeading.tsx
src/content/gsap/fundamentals/find-stop-animations/sections/LostReferenceSection/LostReferenceSection.tsx
src/content/gsap/fundamentals/find-stop-animations/sections/FindByIdSection/FindByIdSection.tsx
src/content/gsap/fundamentals/find-stop-animations/sections/FindByTargetSection/FindByTargetSection.tsx
src/content/gsap/fundamentals/find-stop-animations/sections/KillScopeSection/KillScopeSection.tsx
src/content/gsap/fundamentals/find-stop-animations/sections/StopVsRestoreSection/StopVsRestoreSection.tsx
src/content/gsap/fundamentals/find-stop-animations/sections/BoundariesSection/BoundariesSection.tsx
src/content/gsap/fundamentals/find-stop-animations/examples/TweenRegistryLab/TweenRegistryLab.tsx
src/content/gsap/fundamentals/find-stop-animations/examples/TweenRegistryLab/TweenRegistryLab.css
src/content/gsap/fundamentals/find-stop-animations/examples/TweenRegistryLab/useTweenRegistryAnimation.ts
src/content/gsap/fundamentals/find-stop-animations/examples/KillScopeLab/KillScopeLab.tsx
src/content/gsap/fundamentals/find-stop-animations/examples/KillScopeLab/KillScopeLab.css
src/content/gsap/fundamentals/find-stop-animations/examples/KillScopeLab/useKillScopeAnimation.ts
src/content/gsap/fundamentals/find-stop-animations/examples/RevertVsKillLab/RevertVsKillLab.tsx
src/content/gsap/fundamentals/find-stop-animations/examples/RevertVsKillLab/RevertVsKillLab.css
src/content/gsap/fundamentals/find-stop-animations/examples/RevertVsKillLab/useRevertVsKillAnimation.ts
docs/handoffs/gsap/core/find-stop-animations.md
```

modify:

```text
src/app/routes.ts   (이 컨텍스트는 건드리지 않는다 — 저장소 소유자가 등록한다)
```

### exampleContracts

#### `TweenRegistryLab`

- goal: 변수에 담지 않고 `id`만 붙여 만든 Tween 하나를 세 조회 API로 같은 순간에 조회해, 세 답이 언제 갈라지는지 관찰한다.
- question: 변수도 없이 시작한 Tween을 어떻게 다시 잡고, "있다"와 "움직인다"는 왜 다른 답인가요?
- representation: 이동하는 상자 하나 + 세 조회 결과 `dl` + 실행 코드 패널
- controls: 처음부터 재생 · 일시정지 버튼(모션 허용 시), 재생 헤드 slider(모션 감소 시), 지금 조회하기 버튼
- runtimeSource: `useTweenRegistryAnimation.ts`
- sourcePath: `examples/TweenRegistryLab/useTweenRegistryAnimation.ts`
- runtimeOwnership: hook이 selector, `tweenId`, 목표 x, duration, 재생 control 노출 여부를 담은 단일 descriptor와 paused Tween 하나를 소유한다. persistent Tween ref 없이 모든 control이 `getById`로 instance를 다시 찾고, 세 조회 API의 결과를 `RegistryQuery`로 기록한다. scoped `useGSAP` 한 개, `revertOnUpdate: true`.
- displayOwnership: TSX가 descriptor와 마지막 조회 결과를 코드 문법으로만 직렬화하고 controls·관찰 패널·학습 문단을 그린다. 조회를 다시 실행하거나 결과를 추론하지 않는다.
- coveredSourceItemIds: GID-01, GID-03, GTO-01, IST-01, IST-02, FS-P3
- accessibility: native labeled 버튼과 slider, 조회 결과는 `dt`/`dd`와 `output aria-labelledby`, 상태는 `role="status"` 하나, 좁은 화면에서 단일 열
- motion: 페이지 진입 시 자동 재생하지 않는다. `useReducedMotion()`이 true면 재생·일시정지 버튼 대신 slider로만 재생 헤드를 옮긴다.

#### `KillScopeLab`

- goal: 같은 Tween(`x` + `opacity`)을 네 가지 범위로 중단하고, 범위를 좁혔을 때 어떤 property가 계속 반응하는지와 Tween이 살아남는지를 관찰한다.
- question: 전역 호출과 instance 호출, 전부와 property 하나는 결과가 어떻게 다른가요?
- representation: 상자 하나 + 관찰 `dl`(x · opacity · 남은 Tween 수 · 실행한 호출) + 실행 코드 패널
- controls: 재생 헤드 slider, 중단 범위 radio 4개, 이 범위로 멈추기 버튼, Tween 새로 만들기 버튼
- runtimeSource: `useKillScopeAnimation.ts`
- sourcePath: `examples/KillScopeLab/useKillScopeAnimation.ts`
- runtimeOwnership: hook이 selector, 목표 `x`·`opacity`, duration, kill 대상 property, 선택 모드, progress를 담은 descriptor와 paused Tween 하나를 소유한다. 네 분기의 실제 GSAP 호출과 `gsap.getProperty` · `gsap.getTweensOf` 관찰을 모두 소유한다.
- displayOwnership: TSX가 descriptor와 실행된 모드를 코드 한 줄로 포맷한다(`formatStopCall`). GSAP을 import하지 않고 값을 다시 계산하지 않는다.
- coveredSourceItemIds: KTO-02, TKL-02, TKL-03, TKL-05, FS-P6
- accessibility: `role="radiogroup"` + `aria-labelledby`, native labeled slider와 버튼, 관찰값은 텍스트, 좁은 화면에서 단일 열
- motion: 자동 재생이 없다. 시간 이동은 전부 사용자가 slider로 직접 한다(`NumericArrayLab` 선례). 줄일 자동 모션이 없어 `useReducedMotion()`을 쓰지 않는다.

#### `RevertVsKillLab`

- goal: 같은 progress 지점에서 `kill()`과 `revert()`를 각각 실행해, 대상 값과 **inline style 문자열**과 registry 상태가 어떻게 갈리는지 관찰한다. 이 페이지의 핵심 예제다.
- question: 멈춘 뒤 화면은 어디에 남나요?
- representation: 상자 하나(시작 투명도를 stylesheet가 소유) + 관찰 `dl`(opacity · inline style · getById · 남은 Tween) + 실행 코드 패널
- controls: 재생 헤드 slider, 중단 방식 radio 2개, 이 방식으로 중단하기 버튼, Tween 새로 만들기 버튼
- runtimeSource: `useRevertVsKillAnimation.ts`
- sourcePath: `examples/RevertVsKillLab/useRevertVsKillAnimation.ts`
- runtimeOwnership: hook이 selector, `tweenId`, 목표 opacity, duration, 모드, progress를 담은 descriptor와 paused Tween 하나를 소유한다. 시작값을 `vars`에 적지 않아 **animation 이전 상태를 stylesheet가 소유**하게 하고, `box.getAttribute('style')` · `gsap.getProperty` · `getById` · `getTweensOf`를 직접 읽는다.
- displayOwnership: TSX가 descriptor와 실행된 모드를 코드 문법으로만 직렬화한다.
- coveredSourceItemIds: TRV-02, TRV-04, TKL-06, FS-P1, FS-P2, FS-P4
- accessibility: `role="radiogroup"`, native labeled slider와 버튼, inline style 문자열은 텍스트 `output`, 좁은 화면에서 단일 열
- motion: 자동 재생이 없다. 시간 이동은 전부 사용자가 slider로 직접 한다. 줄일 자동 모션이 없어 `useReducedMotion()`을 쓰지 않는다.

### nonGoals

- `getTweensOf()`의 `onlyActive`, `killTweensOf()`의 세 번째 인자를 설명하지 않는다. 설치본 타입에는 있으나 여섯 공식 페이지 어느 쪽도 게시하지 않았다.
- Timeline의 `kill()` · `revert()`와 하위 animation 정리 규칙을 다루지 않는다.
- `useGSAP()` / `gsap.context()`의 자동 정리 계약을 설명하지 않는다.
- `pause()` · `progress()` · `restart()`의 명세를 다시 쓰지 않는다. 비교 대상과 조작 수단으로만 쓴다.
- 세 lab을 공용 generic runtime으로 합치지 않는다. 각 lab이 자기 hook을 소유한다.
- `Tween.kill(null, "x,y")` 형태를 실행 코드로 쓰지 않는다. 공식 예제로만 보여주고, 실행은 target을 명시하는 공식 예제 형태를 쓴다.

### preserve

- 기존 학습 페이지의 파일·라우트·스타일 토큰
- 공용 컴포넌트(`OfficialDocsLink`, `useReducedMotion`) — 변경 없음
- `src/app/routes.ts` — 이 컨텍스트에서 수정하지 않는다
- `master-page-inventory.md`의 소유권 행

## 검증 계약

### verifiedPerspectives

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion, Build/Integration, Cross-page Consistency — 모두 구현 컨텍스트가 직접 판정했다(`docs/workflows/quality-gates.md` 2026-08-04 개정: 독립 검수자를 두지 않는다).

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-CORE18-001 | PASS | 2026-08-04에 여섯 canonical 원문을 직접 조회해 39개 item을 확인했다. 여섯 중 Parameters 절이 있는 것은 `Tween.kill()` 하나뿐임을 확인했다. | blocker 없이 구현 가능 | 미게시 명세를 `공식 페이지에 명시 없음`으로 표시 |
| SRC-CORE18-002 | ADDRESSED | 첫 WebFetch 요약이 `gsap.killTweensOf()` 본문과 `Tween/kill()`의 Parameters를 "not present on page"로 보고했다. "첫 h1부터 끝까지 원문 그대로" 재조회로 두 항목이 모두 실재함을 확인하고 manifest에 원문 인용으로 고정했다. | 요약본만 믿었으면 item 8개를 누락할 뻔했다 | none |
| PROBE-CORE18-001 | PASS | GSAP 3.15.0 실행 결과 — `const o = { v: 0 }; gsap.to(o, { v: 100, duration: 1, ease: 'none', paused: true })`를 `progress(0.5)`로 옮기면 `o.v=50`. 여기서 `kill()` 뒤 `o.v=50`(그 자리), 같은 조건에서 `revert()` 뒤 `o.v=0`(시작값). 시작 전 `gsap.set(o, { v: 30 })`을 두면 `revert()`는 `30`으로 돌아갔다(중간값 65). | 이 페이지의 핵심 주장 | `FS-P1`로 기록하고 실행 확인 사실임을 페이지에 명시 |
| PROBE-CORE18-002 | PASS | 같은 config에 `id: 'rev'`를 붙여 확인 — `revert()` 전 `getById('rev') === tween`은 `true`, `revert()` 뒤 `getById`는 `undefined`, `getTweensOf(o).length`는 `0`. | revert가 되돌리기만 하는 것이 아님 | `FS-P2` |
| PROBE-CORE18-003 | PASS | `gsap.to(o, { v: 100, duration: 1, ease: 'none', id: 'paused-one' })`를 `progress(0.5)` 뒤 `pause()`한 상태에서 `getById 일치 true · getTweensOf 1개 · isTweening false`, 이어 `play()` 뒤 `isTweening true`. | 조회 3종의 질문 차이 | `FS-P3` |
| PROBE-CORE18-004 | PASS | `progress(0.5) → kill() → progress(1) → restart()` 순서에서 `o.v`는 세 호출 내내 `50` 그대로였다. | 공식 경고("재사용하려면 pause()")의 실제 모습 | `FS-P4` |
| PROBE-CORE18-005 | PASS | `gsap.to(o, { v: 1, duration: 1, id: 7, paused: true })`에서 `getById(7) === tween`은 `true`, `getById('7') === tween`은 `false`. | 숫자 id 사용 시 조회 실패 위험 | `FS-P5` |
| PROBE-CORE18-006 | PASS | `gsap.to(o, { x: 240, opacity: 0.25, duration: 1, ease: 'none', paused: true })`를 `progress(0.5)`로 옮긴 뒤 네 중단을 각각 실행 — `killTweensOf(o)` 0개 / `killTweensOf(o,'x')` 1개 / `kill()` 0개 / `kill(o,'x')` 1개. 이어 `progress(1)`을 부르면 1개로 남은 두 경우만 `opacity`가 0.25까지 계속 갔고 `x`는 120에서 멈춰 있었다. | 범위를 좁힌 kill의 결과 | `FS-P6`, `KillScopeLab` 설계 근거 |
| PROBE-CORE18-007 | PASS | 공식 주장 재현 확인 — `getTweensOf(obj1)` 2개 / `getTweensOf([obj1,obj2])` 3개(GTO-06 원문 주석과 일치). 실제 ticker로 완주시킨 `duration: 0.05` tween은 400ms 뒤 `getById undefined · getTweensOf 0개 · isTweening false`(GID-05 · GTO-04와 일치). `delay: 5`로 아직 시작 전인 tween은 `getTweensOf 1개 · isTweening false`이고 `killTweensOf` 뒤 0개(KTO-06 · IST-02와 일치). | 공식 문장을 실행으로 대조함 | 새 item 아님 — manifest 근거 보강 |
| OC-CORE18-001 | PASS | 공식 39/39 item이 `coverageMap`에서 파일 근거로 연결됐다. 스크립트로 meta 섹션 수(3/4/10/12/10/0=39), catalog 공식 행 수(39), source별 분포(7/6/4/6/9/7)가 서로 일치함을 대조했다. 중복 ID 없음. | Official Coverage 통과 | none |
| RDS-CORE18-001 | PASS | 세 lab 모두 hook의 descriptor에서 GSAP 호출과 표시 코드가 함께 파생된다. TSX 세 파일 어느 것도 `gsap`을 import하지 않음을 grep으로 확인했다(문자열 안의 `gsap.`은 화면에 보여줄 코드 텍스트다). 관찰값은 전부 `gsap.getProperty` · `getTweensOf` · `getById` · `getAttribute('style')`로 **읽은** 값이고 계산한 값이 아니다. | Runtime/Display Sync 통과 | none |
| STRUCT-CORE18-001 | PASS | `gsap.set()`이 registry에 남는지 실행 확인(직후 `getTweensOf` 0개) — lab의 초기 관찰값이 setup tween 때문에 부풀지 않음을 확인했다. | 관찰값 신뢰성 | none |
| BUILD-CORE18-001 | PASS | `npx tsc --noEmit` 실행 결과 `find-stop-animations` 경로에 오류 0건. 같은 시점에 다른 컨텍스트가 작성 중인 `gsap-context` · `high-frequency-updates` · `tween-playback-controls`의 미완성 import 오류 9건이 있으나 이 페이지와 무관하다. `npm run build` · `npm run build-storybook`은 이 작업 범위에서 금지되어 실행하지 않았다. | build/integration 통과(이 페이지 범위) | 소유자가 전체 배치 완료 후 full build 1회 |
| XPAGE-CORE18-001 | PASS | `progress()` · `pause()` · `restart()` · `vars`를 이 페이지가 소유하지 않고 각 owner 페이지로 연결했다. Timeline과 `useGSAP` 자동 정리는 `BoundariesSection`에서 비소유로 명시했다. | Cross-page Consistency 통과 | none |
| A11Y-CORE18-001 | DEFERRED → PASS | 키보드 이동, `prefers-reduced-motion` 실제 전환, 320/390px 실제 레이아웃, 세 lab control의 실제 조작 결과 | 소유자 일괄 브라우저 검수 대상 | 전체 페이지 완성 후 일괄 확인 |
| A11Y-CORE18-002 | DEFERRED → PASS | `KillScopeLab`에서 DOM element의 transform 하위 property(`x`)만 좁혀 kill했을 때 `opacity`가 계속 진행하는지 — 일반 object로는 실행 확인했으나(PROBE-CORE18-006) DOM에서의 결과는 브라우저 조작이 필요하다. 화면에 표시되는 숫자는 전부 관찰값이라 결과가 달라도 거짓을 표시하지는 않는다. | 소유자 일괄 브라우저 검수 대상 | 브라우저에서 `global-prop` · `instance-prop` 모드 확인 |

### verificationEvidence

- 공식 원문 대조 — 2026-08-04, 여섯 canonical URL 직접 조회. 1차 요약 조회 후 "첫 h1부터 끝까지 원문 그대로" 2차 조회로 Parameters·Returns·예제 원문을 재확인.
- runtime probe — `node`로 설치본 GSAP 3.15.0을 import해 실행. 스크립트는 config·호출·결과를 한 묶음으로 출력하도록 작성했고, 위 finding의 숫자는 그 출력 그대로다.
- 정합성 대조 — meta 섹션 `sourceItems` 합(39) = catalog `origin: 'official'` 행 수(39) = meta `officialSourceItems`(39), source 6종 전부 catalog에 등장.
- 타입 검사 — `npx tsc --noEmit`, 이 페이지 경로 오류 0건.

### releaseDecision

`PASS` — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

라우팅 등록(`src/app/routes.ts`)은 이 컨텍스트의 작업 범위 밖이며 저장소 소유자가 수행한다. 등록 전까지 이 페이지는 앱에서 접근되지 않는다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 재감사

이 절은 위 구현 당시 판정보다 최신이며 현재 릴리스 판정은 이 절을 따른다. 공식 조회·중단 문서 여섯 페이지의 현재 HTML을 다시 대조하고, 로컬 GSAP 3.15.0에서 target/property kill, revert registry, 숫자 id를 재확인했다.

### auditTarget

- route: `/fundamentals/find-stop-animations`
- localPath: `src/content/gsap/fundamentals/find-stop-animations/**`
- comparedAt: `2026-08-13` (Asia/Seoul)
- evidenceBoundary: 공식 웹 원문, 설치된 GSAP 3.15.0 probe, 대상 파일 정적 분석을 사용했다. 브라우저와 전역 build·Storybook은 이 재감사에서 실행하지 않았다.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| FACT-FS-001 | BLOCK → ADDRESSED → PASS | meta와 `LostReferenceSection`은 반환값을 변수에 담지 않으면 코드에서 Tween을 조작할 방법이 사라지고 GSAP이 계속 기억한다고 일반화했다. 공식 문서는 완료 뒤 자동 release 경계를 설명하며 이 페이지 자체도 id/target 조회를 가르친다. | 페이지의 핵심 조회 API와 도입 설명이 모순된다. | 직접 instance method를 부를 변수만 없는 상태로 범위를 좁히고 완료 전 조회 경계를 공식 문서와 다시 대조했다. |
| RDS-FS-001 | BLOCK → ADDRESSED → PASS (정적) | 세 hook의 `gsap.utils.toArray(selector)[0]`가 document 전체에서 target을 찾았고, 세 코드 패널은 정의하지 않은 `box`를 조회에 사용하면서 runtime과 달리 selector string을 `gsap.to()`에 넘겼다. | 여러 예제가 같은 class를 가질 때 잘못된 element를 조작할 수 있고 표시 코드는 실행되지 않는다. | 모두 `scope.current`로 selector를 제한하고 코드 패널의 `box` 선언과 실제 target을 정적으로 다시 대조했다. |
| RDS-FS-002 | BLOCK → ADDRESSED → PASS (정적) | `TweenRegistryLab`은 “변수 없이 다시 찾기”를 목표로 하지만 runtime은 `tweenRef`로 재생·일시정지·seek를 수행했고 코드 패널은 이 제어와 `onUpdate`를 생략했다. | 학습 목표와 실제 runtime이 반대이며 runtime/display가 분리된다. | persistent Tween ref를 제거하고 모든 control과 코드 패널이 `getById()`를 쓰는지 다시 추적했다. |
| RDS-FS-003 | BLOCK → ADDRESSED → PASS (정적) | Kill/Revert lab에서 중단 뒤 slider를 더 움직이면 실제 순서는 `progress(at stop) → kill/revert → progress(current)`지만 코드 패널은 `progress(current) → kill/revert`로 표시했다. | 핵심인 “중단 뒤 progress가 더 이상 값을 쓰지 않는다”는 실험을 반대 순서로 가르친다. | 중단 순간 progress를 기록하고 표시 코드가 중단 전후 호출 순서를 그대로 직렬화하는지 다시 확인했다. |
| MOTION-FS-001 | BLOCK → ADDRESSED → PASS (정적) | Registry descriptor의 `autoplay`는 GSAP autoplay가 아니라 재생 버튼 노출 여부였고, 모션 감소 안내도 존재하지 않는 자동 재생을 끈다고 설명했다. reduced-motion 상태에서 “움직이는 도중 조회” 지시도 실행할 수 없었다. | motion 계약과 UI 설명이 실제 동작과 어긋난다. | `allowPlayback`과 slider 안내를 runtime·표시 문장·control에서 다시 대조했다. |
| PED-FS-001 | BLOCK → ADDRESSED → PASS | 학습자 화면에 id “이름표”, 참조 “손잡이”, Tween을 손에 든다는 비유와 property 목록을 제거한다는 내부 구현 단정이 반복됐다. | 공식 API 계약보다 비유와 추정 구현이 앞선다. | id·변수 참조·조회 결과를 직접 설명하고 property kill 문장을 관찰 결과로 좁힌 뒤 본문을 다시 읽었다. |
| PED-FS-002 | BLOCK → ADDRESSED → PASS | `PageCoverage`가 `source item`을 `기술 항목`으로 번역했지만 내부 coverage 단위와 개수를 계속 노출했다. | 조회·중단 API 학습 전에 콘텐츠 제작 구조를 해석하게 했다. | 내부 항목 개수를 제거하고 `공식 문서 학습 범위`, `설명 확인`, `공식 설명 확인`으로 교체한 뒤 학습자 표시 문자열을 재확인했다. |
| TYPE-FS-001 | PASS | 최종 수정 후 `npx tsc --noEmit --pretty false`가 exit 0으로 완료됐고 `git diff --check`도 통과했다. GSAP 3.15.0 plain-object probe에서 partial kill 후 1개/`x=110`/`opacity=0.2`, revert 후 원래 값 30/조회 0개, 숫자 id exact-match를 재현했다. | TypeScript·정적 diff·비DOM runtime 검증 통과. | none |
| BROWSER-FS-001 | NOT VERIFIED | 이번 재감사에서는 브라우저 control 조작, keyboard, 320/390px, reduced-motion 전환과 DOM CSSPlugin의 `x` 부분 kill을 실행하지 않았다. | 실제 DOM 값·inline style·반응형은 통합 검수 전 확정할 수 없다. | 메인 담당자가 세 lab의 모든 control, 특히 `global-prop`·`instance-prop`과 kill/revert inline style을 확인한다. |
| BUILD-FS-001 | PASS | 메인 통합에서 2026-08-13 `npm run build`와 `npm run build-storybook`을 실행해 각각 exit 0을 확인했다. | 저장소 전체 TypeScript·Vite·Storybook 통합을 확인했다. | none |

### 공식 재대조 URL

- `https://gsap.com/docs/v3/GSAP/gsap.getById()/`
- `https://gsap.com/docs/v3/GSAP/gsap.getTweensOf()/`
- `https://gsap.com/docs/v3/GSAP/gsap.isTweening()/`
- `https://gsap.com/docs/v3/GSAP/gsap.killTweensOf()/`
- `https://gsap.com/docs/v3/GSAP/Tween/kill()/`
- `https://gsap.com/docs/v3/GSAP/Tween/revert()/`

### changesApplied

- `FACT-FS-001`: meta와 `LostReferenceSection.tsx`
- `RDS-FS-001`~`RDS-FS-003`: 세 lab의 runtime·serializer
- `MOTION-FS-001`: `TweenRegistryLab` runtime·control·안내 문장
- `PED-FS-001`: 관련 section과 세 lab 학습 문단
- `PED-FS-002`: `PageCoverage.tsx`

### verification

- Fact Accuracy: 여섯 공식 문서와 설치본 probe 결과를 수정 문장과 다시 대조했다.
- Runtime/Display Sync: 세 lab의 target scope, 조회 기반 control, 중단 전후 호출 순서를 정적으로 다시 추적했다.
- Structure/Type: `npx tsc --noEmit --pretty false`와 대상 `git diff --check`가 exit 0이었다.
- Browser matrix: NOT VERIFIED.
- Vite build·Storybook build: PASS — 메인 통합에서 2026-08-13 각각 exit 0.

### unresolved

- BLOCK: none
- ADVISORY: none
- NOT VERIFIED: `BROWSER-FS-001`

### overallDecision

`NOT VERIFIED` — 공식 정확성, 학습 변환, runtime/display 정적 동기화, TypeScript와 비DOM runtime 검증의 BLOCK은 해결했고 통합 build·Storybook도 통과했지만 브라우저 관점은 확인되지 않았다.
