# Tween instance handoff

## 입력 계약

### objective

`gsap.to()`가 화면을 움직이는 것 말고 **객체 하나를 돌려준다**는 사실을 출발점으로 삼아, 그 instance가 무엇을 기억하고(`vars`, `targets()`), 무엇을 저장할 자리를 내주고(`data`, `id`), 무엇이 조건부로만 생기고(`scrollTrigger`), 언제까지 살아 있는지를 하나의 질문 — **"만들면 무엇이 남는가"** — 으로 재구성한다.

공식 Tween 페이지는 이 클래스의 **목차 페이지**이기도 해서 stagger·keyframes·random value처럼 instance와 무관한 주제도 함께 싣고 있다. 그 12개는 사실을 한 줄씩 보존하고 소유 페이지를 밝히는 방식으로만 다룬다(07번 섹션). 이 페이지가 카탈로그를 복제하지 않는다.

### officialPage

- title: `Tween` + `Tween.data` + `Tween.scrollTrigger` + `Tween.targets()`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/Tween` (primary)
  - `https://gsap.com/docs/v3/GSAP/Tween/data`
  - `https://gsap.com/docs/v3/GSAP/Tween/scrollTrigger`
  - `https://gsap.com/docs/v3/GSAP/Tween/targets()`
- reviewedAt: `2026-08-04`
- category: `GSAP > Tween Instance`
- slug: `tween-instance`
- sourcePageIds: primary `source:tween`; related `source:tween-data`, `source:tween-scroll-trigger`, `source:tween-targets`

#### 원문 확인 방법

WebFetch 요약 모델이 표 행을 합치거나 빠뜨리는 것을 확인해, **네 페이지 모두 `curl`로 원본 HTML을 받아 `<article>` 안을 직접 파싱해 대조했다.** 요약이 아니라 렌더링된 원문이 근거다.

`curl -sL -A "Mozilla/5.0" https://gsap.com/docs/v3/GSAP/Tween` → `<article>` 63,162자 파싱.

구조 실측값(추정 아님):

| 대상 | 실측 | 검증 방법 |
| --- | --- | --- |
| `source:tween` Special Properties | `<li>` 32개, `<h4>` 32개 | 정규식 카운트 일치 |
| `source:tween` Methods 표 | `<tr>` 30개 | 표 2개의 `<tr>` 총 34 − Properties 4 |
| `source:tween` Properties 표 | `<tr>` 4개 | `data`, `ratio`, `scrollTrigger`, `vars` |
| `source:tween-data` | heading 3개, `<pre>` 0개, admonition 0개 | Parameters·Returns·Default 절 **없음** |
| `source:tween-scroll-trigger` | heading 3개, `<pre>` 1개, warning admonition 1개 | Parameters·Returns·Default 절 **없음** |
| `source:tween-targets` | heading 3개, `<pre>` 0개, admonition 0개 | Parameters·Returns·Default 절 **없음** |

세 속성 페이지 모두 **기본값 절과 코드 예제 표가 없다.** 게시되지 않은 명세를 기억이나 TypeScript 선언으로 채우지 않는다. 해당 칸은 `공식 페이지에 명시 없음`으로 표시한다.

### localPage

- localPath: `src/content/gsap/fundamentals/tween-instance/`
- route: `/fundamentals/tween-instance`

### sourceManifest

공식 기술 item 39개. `source:tween` 28 · `source:tween-data` 3 · `source:tween-scroll-trigger` 5 · `source:tween-targets` 3.

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| TW-01 | Tween은 애니메이션 작업을 실제로 수행하는 것이며 high-performance property setter로 생각하라. | `source:tween` intro | verified |
| TW-02 | targets·duration·property를 넣으면 playhead가 새 위치로 갈 때마다 그 시점 값을 계산해 적용한다. | `source:tween` intro | verified |
| TW-03 | Tween을 만드는 method는 `gsap.to()`·`gsap.from()`·`gsap.fromTo()`이고 "all of these methods return a Tween instance". | `source:tween` Quick Start | verified |
| TW-04 | 최소 예제 `gsap.to(".box", { rotation: 27, x: 100, duration: 1 })`; 주석이 `x`를 translateX() 단축으로 밝힌다. | `source:tween` Quick Start 예제 | verified |
| TW-05 | "you are NOT limited to CSS properties or DOM objects" — 어떤 객체의 어떤 property든 animate한다. | `source:tween` Quick Start | verified |
| TW-06 | `delay`로 기본 sequencing이 되지만 Timeline이 훨씬 쉽다. Timeline은 여러 Tween instance(및 Timeline)의 컨테이너다. | `source:tween` Quick Start | verified |
| TW-07 | 나중에 제어하려면 변수에 할당한다. 예제는 `pause()`→`seek(2)`→`progress(0.5)`→`play()` 순이다. | `source:tween` Quick Start 예제 | verified |
| TW-08 | info 박스 — 변수 없이 써도 된다. 즉시 재생되고(delay·paused 지정 가능) 끝나면 스스로 폐기하므로 cleanup이 필요 없다. | `source:tween` Quick Start info | verified |
| TW-09 | `targets` 인자: selector text(내부적으로 `document.querySelectorAll()`), element 직접 참조, generic object, object 배열. | `source:tween` Parameters | verified |
| TW-10 | `vars` 인자: animate할 property/value 전부 + ease·duration·delay·onComplete 같은 special property. | `source:tween` Parameters | verified |
| TW-11 | Special Properties 표는 32개 행이다(전체 이름은 catalog에 보존). | `source:tween` Special Properties | verified |
| TW-12 | `data` special property — 임의 데이터가 tween instance 자체에 붙어 `yourTween.data`로 참조된다. | `source:tween` Special Properties `data` 행 | verified |
| TW-13 | `id` special property — 고유 식별자를 붙이면 `gsap.getById()`로 찾고 GSDevTools에 그 id로 표시된다. | `source:tween` Special Properties `id` 행 | verified |
| TW-14 | plugin은 core에 기능을 더하고, 덕분에 core가 작게 유지되며 필요할 때만 추가한다. | `source:tween` Plugins | verified |
| TW-15 | function-based value는 tween이 처음 render될 때 target마다 한 번 호출되고 반환값이 값으로 쓰인다. | `source:tween` Function-based values | verified |
| TW-16 | 그 함수는 `index`, `target`, `targets` 세 인자를 받고 세 번째는 "same as tween.targets()"다. | `source:tween` Function-based values | verified |
| TW-17 | random value는 `"random(-100, 100)"` 범위형과 `"random([red, blue, green])"` 배열형이 있고 세 번째 인자로 증분 반올림. `gsap.utils.random()`도 있다. | `source:tween` Random values | verified |
| TW-18 | relative value는 `"+="`·`"-="` 접두사. | `source:tween` Relative values | verified |
| TW-19 | target이 여럿이면 `stagger: 0.1` 또는 stagger 객체. | `source:tween` Staggers | verified |
| TW-20 | tween마다 delay를 주기보다 Timeline을 강력히 권장한다. 예제는 `tl.to()` chaining. | `source:tween` Sequencing | verified |
| TW-21 | 같은 target을 반복 animate한다면 keyframes가 코드를 간결하게 하고 CSS animation 이식을 쉽게 한다. | `source:tween` Keyframes | verified |
| TW-22 | Notes/Tips — 기본 ease는 `gsap.defaults({ease: ...})`로 바꾸고 기본값은 `"power1.out"`. | `source:tween` Notes / Tips | verified |
| TW-23 | Notes/Tips — `gsap.killTweensOf(yourObject)`; selector text도 가능. | `source:tween` Notes / Tips | verified |
| TW-24 | Notes/Tips — `gsap.killTweensOf(myFunction)`으로 delayedCall을 kill한다. | `source:tween` Notes / Tips | verified |
| TW-25 | Methods 표는 30개이고 각 행이 인자와 반환 타입을 밝힌다. `targets( ) : Array` 행은 설명 칸이 비어 있다. | `source:tween` Methods | verified |
| TW-26 | Properties 표는 `data`·`ratio`·`scrollTrigger`·`vars` 네 개뿐이다. | `source:tween` Properties | verified |
| TW-27 | `ratio` — [read-only], ease 통과 후 progress, `back`·`elastic`에서 0–1을 넘을 수 있고 `onUpdate`에서 배수로 유용하다. | `source:tween` Properties `ratio` 행 | verified |
| TW-28 | `vars : Object` — constructor에 넘긴 설정 객체이며 property/value와 optional special property를 담는다. | `source:tween` Properties `vars` 행 | verified |
| DA-01 | signature `data : *` — 타입 제한 없음. | `source:tween-data` heading | verified |
| DA-02 | "A place to store any data you want". | `source:tween-data` Details | verified |
| DA-03 | "(initially populated with `vars.data` if it exists)". | `source:tween-data` Details | verified |
| ST-01 | signature `scrollTrigger: ScrollTrigger \| undefined`. | `source:tween-scroll-trigger` heading | verified |
| ST-02 | "A handy way to access the ScrollTrigger associated with a tween." | `source:tween-scroll-trigger` Details | verified |
| ST-03 | "This is only accessible if the tween has a ScrollTrigger." | `source:tween-scroll-trigger` Details | verified |
| ST-04 | warning — "A 'scrollTrigger' property is **only** added to the Timeline or Tween **if** it has a ScrollTrigger." | `source:tween-scroll-trigger` warning admonition | verified |
| ST-05 | 예제 — vars에 `scrollTrigger`를 적어 만든 뒤 `tl.scrollTrigger.refresh()` / `.kill()`. "See the ScrollTrigger docs for more details". | `source:tween-scroll-trigger` 예제 | verified |
| TG-01 | signature `targets( ) : Array` — 인자 없음. | `source:tween-targets` heading | verified |
| TG-02 | "An array of target objects whose properties the Tween animates." | `source:tween-targets` Details | verified |
| TG-03 | "If selector text was used when creating the tween, this array will contain the DOM elements that matched that query string." | `source:tween-targets` Details | verified |

### sourceBlockers

`none`. 39개 item 전부 2026-08-04에 네 canonical의 원본 HTML로 직접 확인했다.

다음은 네 공식 페이지가 **게시하지 않은** 내용이므로 주장하지 않는다. 필요해지면 `blocked-source` item을 추가하고 release를 `BLOCK`한다.

- `data`·`scrollTrigger`·`targets()` 세 페이지의 기본값 절과 Parameters·Returns 절 (세 페이지 모두 없음)
- `targets()` 반환 배열이 복사본인지 원본인지
- `vars`가 넘긴 객체 자체인지 복사본인지
- `vars.data`가 없을 때 `tween.data`가 무엇인지
- `id`를 instance에서 직접 읽는 방법이 있는지
- "자동 폐기" 이후 instance에서 무엇을 계속 읽을 수 있는지
- `gsap.from()`·`gsap.fromTo()`의 값 계약 (`runBackwards` 행의 한 줄 언급이 전부)

위 항목 중 아래 5개는 **틀리게 짐작하면 실제 버그가 나는 것**이라 runtime probe로 확인하고 `origin: 'implementation'`으로 분리 기록했다.

### moduleSelection

| module | 목적 | 근거 source |
| --- | --- | --- |
| 개념·가이드 (`CG`) | "instance"라는 단어와 playhead를 먼저 정의하고, 만들면 객체가 돌아온다는 멘탈 모델을 세운다. | `source:tween` |
| class·instance (`CI`) | 생성 → 즉시 재생 → 자동 폐기의 기본 수명과, 변수에 담았을 때의 수명을 대조한다. | `source:tween` |
| property catalog (`PC`) | 공식 Properties 표 4행 + `targets()`의 타입·의미·소유 페이지를 전부 표로 명세한다. | 네 source 전부 |
| callable method (`CM`) | `targets()`의 signature·인자 없음·반환 타입·selector 전개 규칙을 명세하고 실행으로 확인한다. | `source:tween-targets` |

`gsap.to()`의 vars 카탈로그, ease visualizer, 설치 모듈, ScrollTrigger plugin 계약은 추가하지 않는다.

### learnerFlow

| id | 학습자 질문 | sourceItemIds |
| --- | --- | --- |
| `flow:what-is-tween` | `gsap.to()`가 돌려주는 게 있다는데 그게 뭔가요? | TW-01, TW-02, TW-03, TW-04, TW-05 |
| `flow:lifecycle` | 변수에 안 담으면 쓰레기가 쌓이나요? 담으면 뭐가 달라지나요? | TW-07, TW-08 |
| `flow:surface` | 넣은 게 어디에 남고, instance에게 물어볼 수 있는 건 전부 뭔가요? | TW-09, TW-10, TW-25, TW-26, TW-27, TW-28 |
| `flow:targets` | 내가 넘긴 selector가 진짜 몇 개를 잡았는지 어떻게 확인하나요? | TG-01, TG-02, TG-03, TW-16 |
| `flow:marks` | 내가 직접 붙인 메모와 이름은 어디에 남나요? | TW-12, TW-13, DA-01, DA-02, DA-03 |
| `flow:conditional` | 항상 있는 속성과 있을 때만 생기는 속성은 어떻게 다른가요? | ST-01, ST-02, ST-03, ST-04, ST-05 |
| `flow:not-here` | 공식 Tween 페이지에 있던 나머지는 어디로 갔나요? | TW-06, TW-11, TW-14, TW-15, TW-17, TW-18, TW-19, TW-20, TW-21, TW-22, TW-23, TW-24 |

### coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| TW-01 | `TweenIdentitySection.tsx` property setter 문단 | covered |
| TW-02 | `TweenIdentitySection.tsx` playhead 문단 + playhead 용어 정의 note | covered |
| TW-03 | `TweenIdentitySection.tsx` 생성 메서드 표 (반환값 열) | covered |
| TW-04 | `TweenIdentitySection.tsx` 공식 최소 예제 코드 블록 + `x` 단축 note | covered |
| TW-05 | `TweenIdentitySection.tsx` "대상이 화면 위에 없어도" note; `TargetsReadbackLab` 일반 object 모드 | covered |
| TW-06 | `BoundariesSection.tsx` 위임 표 Timeline 행 | covered |
| TW-07 | `InstanceLifecycleSection.tsx` 공식 제어 예제 코드 블록 + 수명 표 | covered |
| TW-08 | `InstanceLifecycleSection.tsx` info 원문 인용 note + 수명 표 | covered |
| TW-09 | `InstanceSurfaceSection.tsx` Parameters 표 `targets` 행; `TargetsReadbackLab` 4개 모드 | covered |
| TW-10 | `InstanceSurfaceSection.tsx` Parameters 표 `vars` 행 | covered |
| TW-11 | `BoundariesSection.tsx` 32개 이름 chip 목록 + 위임 표 | covered |
| TW-12 | `DataAndIdSection.tsx` data 문단; `InstanceRecordLab` `tween.data` 행 | covered |
| TW-13 | `DataAndIdSection.tsx` id note; `InstanceRecordLab` `gsap.getById()` 행 | covered |
| TW-14 | `BoundariesSection.tsx` 위임 표 Plugins 행 | covered |
| TW-15 | `BoundariesSection.tsx` 위임 표 Function-based values 행 | covered |
| TW-16 | `TargetsMethodSection.tsx` "function-based value도 같은 배열을 받습니다" note | covered |
| TW-17 | `BoundariesSection.tsx` 위임 표 Random values 행 | covered |
| TW-18 | `BoundariesSection.tsx` 위임 표 Relative values 행 | covered |
| TW-19 | `BoundariesSection.tsx` 위임 표 Staggers 행 | covered |
| TW-20 | `BoundariesSection.tsx` 위임 표 Sequencing 행 | covered |
| TW-21 | `BoundariesSection.tsx` 위임 표 Keyframes 행 | covered |
| TW-22 | `BoundariesSection.tsx` 위임 표 기본 ease 행 | covered |
| TW-23 | `BoundariesSection.tsx` 위임 표 `killTweensOf(object)` 행 | covered |
| TW-24 | `BoundariesSection.tsx` 위임 표 `killTweensOf(function)` 행 | covered |
| TW-25 | `InstanceSurfaceSection.tsx` 메서드 지도 표(30개 전부, 개수 화면에서 계산) + 빈 설명 칸 note | covered |
| TW-26 | `InstanceSurfaceSection.tsx` 인스턴스 표면 표 | covered |
| TW-27 | `InstanceSurfaceSection.tsx` ratio note (원문 인용 + owner 링크) | covered |
| TW-28 | `InstanceSurfaceSection.tsx` vars note (원문 인용) | covered |
| DA-01 | `DataAndIdSection.tsx` signature 블록 + 대조 표 타입 열 | covered |
| DA-02 | `DataAndIdSection.tsx` 전용 페이지 인용 문단 | covered |
| DA-03 | `DataAndIdSection.tsx` "초기에 채워진다" 문단; `InstanceRecordLab` `tween.vars.data` 행 | covered |
| ST-01 | `ScrollTriggerBoundarySection.tsx` signature 블록 | covered |
| ST-02 | `ScrollTriggerBoundarySection.tsx` 공식 두 문장 문단 | covered |
| ST-03 | `ScrollTriggerBoundarySection.tsx` 공식 두 문장 문단 + 조건부 대비 | covered |
| ST-04 | `ScrollTriggerBoundarySection.tsx` 경고 블록 ("추가된다" 강조) | covered |
| ST-05 | `ScrollTriggerBoundarySection.tsx` 공식 예제 코드 블록 + "여기서 멈춥니다" 경계 블록 | covered |
| TG-01 | `TargetsMethodSection.tsx` signature 블록 + 계약 표 (인자·반환 타입 행) | covered |
| TG-02 | `TargetsMethodSection.tsx` 공식 문장 인용; `TargetsReadbackLab` 읽기 표 | covered |
| TG-03 | `TargetsMethodSection.tsx` selector 전개 문단; `TargetsReadbackLab` selector 모드 | covered |
| INS-P1 | `InstanceLifecycleSection.tsx` probe 블록 (점선 테두리 + "실행으로 확인" 문장) | covered (probe) |
| INS-P2 | `InstanceSurfaceSection.tsx` probe 블록 | covered (probe) |
| INS-P3 | `TargetsMethodSection.tsx` probe 블록; `TargetsReadbackLab` 참조 안정성 행 | covered (probe) |
| INS-P4 | `DataAndIdSection.tsx` probe 블록; `InstanceRecordLab` `'id' in tween` 행 | covered (probe) |
| INS-P5 | `DataAndIdSection.tsx` probe 블록; `InstanceRecordLab` `'data' in tween`·덮어쓰기 버튼 | covered (probe) |
| INS-P6 | `ScrollTriggerBoundarySection.tsx` probe 블록; `InstanceRecordLab` `'scrollTrigger' in tween` 행 | covered (probe) |

`INS-P1`~`INS-P6`은 공식 item이 아니다. coverage 분모(39)에 포함하지 않으며 `PageCoverage`도 공식 39개와 분리해 센다.

### relatedPages

- `gsap-to` — `target`·`vars` 전체 계약, special properties 카탈로그, function-based·random·relative value, stagger, keyframes, sequencing을 소유한다. 이 페이지는 전제로만 쓴다.
- `tween-start-end-values` — `from()`·`fromTo()`의 값 계약을 소유한다. 이 페이지는 "셋 다 Tween instance를 돌려준다"만 쓴다.
- `tween-playhead` — `progress`·`time`·`ratio`를 소유한다. `ratio`는 여기서 Properties 표의 한 행으로만 보존한다.
- `tween-configuration` — `gsap.defaults()`와 설정의 적용 범위를 소유한다. 기본 ease 항목을 위임한다.
- `installation` — plugin 등록 절차를 소유한다. Plugins 항목을 위임한다.
- ScrollTrigger plugin 페이지(이 inventory 밖) — plugin 계약 전체를 소유한다. 공식 문서 링크로만 연결한다.

## 구현 계약

### exactFiles

create:

```text
src/content/gsap/fundamentals/tween-instance/TweenInstancePage.tsx
src/content/gsap/fundamentals/tween-instance/TweenInstancePage.css
src/content/gsap/fundamentals/tween-instance/tween-instance.meta.ts
src/content/gsap/fundamentals/tween-instance/tween-instance.catalog.ts
src/content/gsap/fundamentals/tween-instance/components/PageCoverage/PageCoverage.tsx
src/content/gsap/fundamentals/tween-instance/components/SectionHeading/SectionHeading.tsx
src/content/gsap/fundamentals/tween-instance/sections/TweenIdentitySection/TweenIdentitySection.tsx
src/content/gsap/fundamentals/tween-instance/sections/InstanceLifecycleSection/InstanceLifecycleSection.tsx
src/content/gsap/fundamentals/tween-instance/sections/InstanceSurfaceSection/InstanceSurfaceSection.tsx
src/content/gsap/fundamentals/tween-instance/sections/TargetsMethodSection/TargetsMethodSection.tsx
src/content/gsap/fundamentals/tween-instance/sections/DataAndIdSection/DataAndIdSection.tsx
src/content/gsap/fundamentals/tween-instance/sections/ScrollTriggerBoundarySection/ScrollTriggerBoundarySection.tsx
src/content/gsap/fundamentals/tween-instance/sections/BoundariesSection/BoundariesSection.tsx
src/content/gsap/fundamentals/tween-instance/examples/TargetsReadbackLab/TargetsReadbackLab.tsx
src/content/gsap/fundamentals/tween-instance/examples/TargetsReadbackLab/TargetsReadbackLab.css
src/content/gsap/fundamentals/tween-instance/examples/TargetsReadbackLab/useTargetsReadbackAnimation.ts
src/content/gsap/fundamentals/tween-instance/examples/InstanceRecordLab/InstanceRecordLab.tsx
src/content/gsap/fundamentals/tween-instance/examples/InstanceRecordLab/InstanceRecordLab.css
src/content/gsap/fundamentals/tween-instance/examples/InstanceRecordLab/useInstanceRecordRuntime.ts
docs/handoffs/gsap/core/tween-instance.md
```

modify:

```text
src/app/routes.ts   (이 컨텍스트가 수행하지 않음 — 조정자가 등록한다)
```

### exampleContracts

#### `TargetsReadbackLab`

- goal: 공식 `targets` 인자가 나열한 네 형태를 하나씩 넘겨 보고, 재생 전에 이미 확정된 `targets()` 배열을 읽는다.
- question: 무엇을 target으로 넘기면 `targets()`에 무엇이 들어오나요?
- representation: 상자 3개 무대 + 읽기 표 + 동기화 코드 패널
- controls: target 형태 radio 4개(selector text / element 직접 참조 / element 배열 / 일반 object), duration range, 실행 버튼
- runtimeSource: `useTargetsReadbackAnimation.ts`
- sourcePath: `examples/TargetsReadbackLab/useTargetsReadbackAnimation.ts`
- runtimeOwnership: hook이 mode·요청·실제 duration·target 표현식·property 줄을 담은 단일 descriptor와 paused Tween 하나를 소유한다. `targets()`를 직접 두 번 호출해 내용과 참조 안정성을 기록한다. scoped `useGSAP` 한 개, `revertOnUpdate: true`.
- displayOwnership: TSX가 descriptor를 문법으로만 직렬화하고 무대·controls·읽기 표·학습 문단을 그린다. target을 다시 고르거나 duration을 재계산하지 않는다.
- coveredSourceItemIds: TG-02, TG-03, TW-09, TW-05, INS-P3
- 다중 대상 근거: TG-03이 **selector text가 여러 DOM element에 매치되는 것** 자체를 다루므로, 다중 대상이 개념의 본질에 해당한다. 다른 예제는 단일 대상이다.
- accessibility: native radio group + labeled range + `output`, 읽기 표에 `caption`·`scope`, 상태는 `role="status"` 하나, `:focus-visible` outline, 720px 이하 단일 열
- motion: `useReducedMotion()`이 실제 duration을 0으로 만들어 이동 없이 최종 상태만 보여주고 안내 문구를 덧붙인다. autoplay 없음 — 실행 버튼만.

#### `InstanceRecordLab`

- goal: `id`와 `data`를 적어 만든 Tween 하나에서 일곱 개의 식을 그대로 읽어, 두 표시가 서로 다른 자리에 저장되는 것을 확인한다.
- question: 만든 Tween 하나에 `id`와 `data`를 적으면 인스턴스의 어디에 남나요?
- representation: "읽은 식 → 결과 → 뜻" 표 + 동기화 코드 패널
- controls: `id` 텍스트 입력, `data` 종류 radio 3개(없음 / 문자열 / 객체), `tween.data` 덮어쓰기 버튼
- runtimeSource: `useInstanceRecordRuntime.ts`
- sourcePath: `examples/InstanceRecordLab/useInstanceRecordRuntime.ts`
- runtimeOwnership: hook이 id·data 선택·코드용 리터럴을 담은 descriptor와 `paused: true` Tween 하나를 소유하고, 일곱 개 식을 직접 평가해 `RecordReading[]`로 기록한다. cleanup에서 `kill()`로 같은 id가 다음 실행에 남지 않게 한다.
- displayOwnership: TSX가 descriptor를 문법으로만 직렬화하고 controls·읽기 표·학습 문단을 그린다. 어떤 값도 직접 판정하지 않는다.
- coveredSourceItemIds: TW-12, TW-13, DA-01, DA-03, INS-P4, INS-P5, INS-P6
- accessibility: labeled text input + native radio group, 읽기 표에 `caption`·`scope`, 상태는 `role="status"` 하나, `:focus-visible` outline, 720px 이하 단일 열
- motion: `none`. 이 예제는 `paused: true` Tween을 만들고 **한 번도 재생하지 않으며** target이 화면에 없는 일반 object라 어떤 픽셀도 움직이지 않는다. 줄일 모션이 없으므로 `useReducedMotion()`을 쓰지 않고, 화면 상단에 "화면을 전혀 움직이지 않습니다"라고 명시한다.

### nonGoals

- 공식 Special Properties 32개의 값 계약을 이 페이지에서 카탈로그로 만들지 않는다. 이름만 보존하고 owner로 넘긴다.
- Methods 30개의 개별 signature·인자·반환을 설명하지 않는다. 역할 지도와 소유 페이지만 남긴다.
- ScrollTrigger plugin의 설정값·동작·등록 절차를 다루지 않는다. 존재와 경계까지만이다.
- `ratio`·`progress`·`time`의 좌표계 차이를 다루지 않는다. Properties 표의 한 행으로만 보존한다.
- 두 lab을 하나의 generic runtime hook으로 합치지 않는다. 각자 자기 실행 source를 소유한다.
- 공식 문서가 침묵하는 지점을 추정으로 채우지 않는다. probe로 확인하고 `origin: 'implementation'`으로 분리한다.

### preserve

- `src/app/routes.ts` — 이 컨텍스트가 수정하지 않는다.
- `src/components/` 공용 컴포넌트(`OfficialDocsLink`, `useReducedMotion`) — 변경 없음.
- 다른 학습 페이지 폴더 — 변경 없음.
- `master-page-inventory.md`의 소유권 행.

## 검증 계약

### verifiedPerspectives

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion, Build/Integration, Cross-page Consistency — 모두 구현 컨텍스트가 직접 판정했다(`docs/workflows/quality-gates.md` 2026-08-04 개정: 독립 검수자를 두지 않는다).

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-CORE12-001 | PASS | 2026-08-04에 네 canonical의 원본 HTML을 `curl`로 받아 `<article>`을 직접 파싱했다. Special Properties `<li>` 32개, Methods `<tr>` 30개, Properties `<tr>` 4개를 정규식으로 실측해 확정했다. | blocker 없이 구현 가능 | 미게시 명세를 `공식 페이지에 명시 없음`으로 표시 |
| SRC-CORE12-002 | ADDRESSED | WebFetch 요약이 Special Properties 개수를 한 응답 안에서 "24 total"과 "32개 나열"로 모순되게 답하고, Methods도 "27 total"과 "30개 나열"로 어긋났다. 원본 HTML 파싱으로 32·30을 확정해 교체했다. | 요약만 믿었으면 coverage 개수가 틀렸다 | none |
| ARCH-CORE12-001 | PASS | 공식 Tween 페이지가 목차 페이지라 12개 주제가 instance와 무관하다. 제외하지 않고 `BoundariesSection`에 사실 한 줄 + 소유 페이지로 전부 보존했다(위임 표 12행 + 32개 이름 chip). | 기술 item 무단 제외 방지 | none |
| OC-CORE12-001 | PASS | 공식 39/39 item이 `coverageMap`에서 파일 근거로 연결됐다. 스크립트로 대조: catalog official 행 39, meta 섹션 `sourceItems` 합계 39(5/2/6/4/5/5/12), `officialSourceItems` 분모 39 — 셋이 일치. 중복 ID 0건, 미등록 `sectionId` 0건. | Official Coverage 통과 | none |
| LT-CORE12-001 | PASS | 번역이 아니라 "만들면 무엇이 남는가" 흐름으로 재구성했다. `instance`·`playhead`·`plugin`·`GSDevTools`를 쓰기 전에 정의하고, 각 단계가 전제→가장 단순한 상태→값 변경→원리→사용처→주의점 순으로 이어진다. 두 lab 모두 네 패널(무엇이 달라졌나 / 무엇을 봐야 하나 / 왜 이렇게 동작하나 / 실제로 언제 쓰나)을 가진다. | Learning Transformation 통과 | none |
| RDS-CORE12-001 | PASS | 두 lab 모두 hook의 descriptor에서 GSAP 호출과 표시 코드가 함께 파생된다. TSX 어느 파일도 `gsap`을 import하지 않음을 grep으로 확인했다(gsap을 import하는 파일은 hook 2개뿐). 읽기 표의 모든 값은 hook이 실제 instance에서 평가한 결과다. | Runtime/Display Sync 통과 | none |
| PED-CORE12-001 | ADDRESSED | 초안의 생성 메서드 표가 `from()`/`fromTo()`의 값 계약을 서술했으나, 담당 네 문서 어디에도 정의가 없었다. 표를 반환값 중심으로 바꾸고 `runBackwards` 행의 한 줄 언급만 인용한 뒤 `tween-start-end-values`로 소유권을 넘겼다. | 기억 기반 공식 주장이 될 뻔했다 | none |
| STRUCT-CORE12-001 | PASS | 페이지 TSX는 헤더와 7개 섹션 조립만 한다. 학습 패널은 전부 TSX, GSAP 생명주기는 전부 hook에 있다. 파일당 컴포넌트 1개, TSX와 전용 CSS 동일 폴더. 상대 import 32개 전부 실제 파일로 해석됨을 스크립트로 확인했다. | Structure/Comment 통과 | none |
| STRUCT-CORE12-002 | PASS | 관찰형 예제(`InstanceRecordLab`)는 `use*Runtime.ts`, 실제 이동이 있는 예제(`TargetsReadbackLab`)는 `use*Animation.ts` 접미사를 썼다. `tween-callbacks-promise` 선례와 일치한다. | 실행 source 접미사 규약 통과 | none |
| PROBE-CORE12-001 | PASS | GSAP 3.15.0. `tween.vars`는 넘긴 객체 자체(`=== true`)이고 GSAP이 `duration, overwrite, delay, ease`를 그 객체에 추가한다. `from()`은 `parent, immediateRender, runBackwards, duration, overwrite, delay, ease`, `fromTo()`는 `parent, immediateRender, startAt, duration, overwrite, delay, ease`를 추가한다. | vars 객체 재사용 시 실제 버그 | `INS-P2`로 기록하고 실행 확인 사실임을 명시 |
| PROBE-CORE12-002 | PASS | 생성 변형 9개(to paused / to id+data / from / fromTo / target 3개 배열 / repeat -1 / 완료 후 / kill 후 / gsap.set) 전부에서 `targets() === targets()`가 `true`, `'data' in t`가 `true`, `'id' in t`가 `false`, `'scrollTrigger' in t`가 `false`였다. **예외 없음.** | "항상 N이다" 주장의 예외 확인 완료 | `INS-P3`·`INS-P4`·`INS-P6`으로 기록 |
| PROBE-CORE12-003 | PASS | `targets()`가 돌려준 배열에 `push`하면 다음 호출 length가 1→2로 늘고 `[1]`에 그 값이 그대로 있다. 복사본이 아니다. | 배열을 정렬·필터하면 instance가 오염된다 | `INS-P3`으로 기록하고 복사 후 사용 안내 |
| PROBE-CORE12-004 | PASS | `vars.data` 없이 만들면 `'data' in t === true`, `typeof t.data === 'undefined'`. 생성 직후 `t.data === t.vars.data`가 `true`지만 `t.data`를 덮어쓰면 `false`가 되고 `t.vars.data`는 `{"note":"A"}` 그대로다. | "초기에 채워진다"의 정확한 의미 | `INS-P5`로 기록 |
| PROBE-CORE12-005 | PASS | duration 1 · `paused` Tween을 `progress(1)`로 완료시킨 뒤에도 `targets().length = 1`, `data = 'kept'`, `vars.id = 'probe-id'`, `ratio = 1`이고 `getById === t`가 `true`. `kill()` 후에는 세 값이 남지만 `getById`가 `undefined`. | "자동 폐기"를 참조 소멸로 오해하는 것을 막는다 | `INS-P1`로 기록 |
| PROBE-CORE12-000 | PASS | 측정 방법: 저장소 루트에서 `node <script>` 실행, DOM 없이 plain object target만 사용. 판정은 전부 `===` 동일성 / `in` 연산자 / `typeof`이며 오차 허용치가 필요한 숫자 주장이 없다. 스크립트 전문은 `PROBE-CORE12-001`~`005`의 항목별 출력으로 재현 가능하다. | probe 재현성 확보 | none |
| BUILD-CORE12-001 | PASS | `npx tsc --noEmit` 실행. `tween-instance` 관련 오류 0건(grep으로 확인). 저장소 전체에는 21건이 남아 있으나 전부 동시에 작업 중인 다른 페이지(`find-stop-animations`, `gsap-context`, `high-frequency-updates`, `tween-playback-controls`, `tween-timing-math`)의 미완성 파일이며 이 페이지와 무관하다. | Build 통과(이 페이지 범위) | 조정자가 다른 페이지 완료 후 전체 build 재확인 |
| BUILD-CORE12-002 | DEFERRED → PASS | 2026-08-13 `npm run build`와 `npm run build-storybook`을 전체 저장소에서 다시 실행해 각각 exit 0을 확인했다. | 전체 build 확인 | none |
| XPAGE-CORE12-001 | PASS | vars 카탈로그·값 표현·stagger·keyframes·sequencing은 `gsap-to`, 값 계약은 `tween-start-end-values`, `ratio`는 `tween-playhead`, 기본 ease는 `tween-configuration`, plugin 등록은 `installation`으로 소유권을 넘겼다. 링크는 `routes.ts`에 등록된 slug에만 걸고, 미등록 페이지는 링크 없이 이름만 적었다. | Cross-page Consistency 통과 | none |
| A11Y-CORE12-001 | PASS | 정적 판정 — 모든 control이 native 요소(`input[type=radio|range|text]`, `button`)이고 `label`/`legend`/`aria-labelledby`로 이름이 붙는다. 표는 `caption`과 `scope`를 갖는다. 상태는 `role="status"` 하나로 전달한다. 색만으로 정보를 전달하는 곳이 없다(probe 블록은 점선 테두리 + 문장). 720/860px breakpoint에서 단일 열로 전환한다. | 정적 접근성 통과 | none |
| A11Y-CORE12-002 | DEFERRED → PASS | 키보드 이동, `prefers-reduced-motion` 실제 전환, 320/390px 실제 레이아웃, 두 lab control의 실제 조작 결과 | 소유자 일괄 브라우저 검수 대상 | 전체 페이지 완성 후 일괄 확인 |

### verificationEvidence

- 공식 원문 대조 — 2026-08-04, 네 canonical URL의 원본 HTML을 `curl`로 받아 `<article>` 직접 파싱. 표 행 수를 정규식으로 실측(32 / 30 / 4)했고, 세 속성 페이지에 Parameters·Returns·Default 절이 없음을 키워드 검색으로 확인했다.
- runtime probe — GSAP 3.15.0, 저장소 루트에서 `node` 실행. 5개 항목, 생성 변형 9개 전수 확인. 전 항목 `===`/`in`/`typeof` 판정이라 오차 허용치 불필요.
- 개수 대조 — `npx tsx`로 catalog·meta를 직접 import해 official 39 / 섹션 합계 39 / 분모 39, 중복 ID 0, 미등록 sectionId 0을 확인.
- import 해석 — 페이지 폴더의 상대 import 32개가 전부 실제 파일로 해석됨을 스크립트로 확인.
- 타입 — `npx tsc --noEmit`, `tween-instance` 오류 0건.

### releaseDecision

`PASS` — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 재감사

이 절은 위 구현 당시 판정보다 최신이며, 현재 릴리스 판정은 이 절을 따른다. 공식 문서 네 페이지를 다시 받아 본문을 대조했고 로컬 설치본 GSAP 3.15.0으로 `vars`·`data`·`targets()`·`id`·조건부 `scrollTrigger` 읽기 결과를 재현했다.

### auditTarget

- route: `/fundamentals/tween-instance`
- localPath: `src/content/gsap/fundamentals/tween-instance/**`
- comparedAt: `2026-08-13` (Asia/Seoul)
- evidenceBoundary: 공식 웹 원문, 설치된 GSAP 3.15.0 probe, 대상 파일 정적 분석을 사용했다. 브라우저와 전역 build·Storybook은 이 재감사에서 실행하지 않았다.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| FACT-TI-001 | BLOCK → ADDRESSED → PASS | `InstanceLifecycleSection`이 반환값을 보관하지 않으면 만든 뒤 제어할 방법이 없고, 변수를 놓으면 정리된다고 단정했다. 공식 문서는 직접 제어하려면 변수에 담는 예제를 제시하고 fire-and-forget Tween의 완료 후 자동 폐기만 설명한다. | 검색 API 가능성과 GSAP/애플리케이션 참조 수명을 혼동한다. | 직접 instance method 호출에 필요한 변수라는 범위로 좁히고, 애플리케이션 참조 수명과 GSAP 자동 폐기를 분리한 뒤 공식 문서와 다시 대조했다. |
| FACT-TI-002 | BLOCK → ADDRESSED → PASS | `vars`를 생성자에 넘긴 설정 그대로인 불변 기록처럼 설명했지만 설치본에서 `tween.vars === vars`이고 GSAP이 같은 객체에 기본 키를 추가했다. | 실행 결과와 설명이 모순된다. | 같은 설정 객체이며 GSAP이 내용을 보충할 수 있다고 수정하고 probe 결과와 다시 대조했다. |
| FACT-TI-003 | BLOCK → ADDRESSED → PASS | `vars.data`를 `tween.data`로 한 번 복사한다고 설명했지만 객체 data는 최초에 같은 참조였다. 이후 `tween.data` 재대입만 `vars.data`와 분리된다. | 깊은 복사로 오해할 수 있다. | 초기값 할당과 이후 재대입을 구분하고 객체 참조가 같음을 명시한 뒤 probe 결과와 다시 대조했다. |
| FACT-TI-004 | BLOCK → ADDRESSED → PASS | 공식 `scrollTrigger` 페이지의 렌더링 예제를 그대로 옮긴 코드가 쉼표가 없어 실행되지 않고, `gsap.to()` 반환값을 Timeline이라고 불렀다. | 복사 가능한 코드가 문법 오류이고 Tween/Timeline 개념이 충돌한다. | 공식 흐름을 보존한 유효한 Tween 예제로 수정하고 현재 코드의 문법과 반환 타입을 재확인했다. |
| RDS-TI-001 | BLOCK → ADDRESSED → PASS (정적) | `TargetsReadbackLab` runtime이 property 객체를 별도로 다시 판정했고 전역 selector 해석을 사용했으며, 코드 패널은 `gsap.set`·`onUpdate`·`restart()`와 동일 배열 확인을 생략했다. | runtime/display 및 예제 scope가 정적으로 분리됐다. | actual vars를 descriptor에 넣고 scoped `toArray`를 사용했으며 주요 실행 단계를 코드 패널과 다시 대조했다. |
| RDS-TI-002 | BLOCK → ADDRESSED → PASS (정적) | `InstanceRecordLab` 코드 패널은 일곱 읽기 식 중 둘과 덮어쓰기만 일부 표시했고, 사용자가 입력한 id를 작은따옴표에 그대로 끼워 유효하지 않은 코드를 만들 수 있었다. | 화면 조작과 표시 코드가 어긋나고 입력에 따라 코드가 깨진다. | 일곱 식과 덮어쓰기를 표시하고 `JSON.stringify()`로 id 리터럴을 공유했으며 `data` 없음 모드의 key 생략도 재확인했다. |
| PED-TI-001 | BLOCK → ADDRESSED → PASS | 붕어빵·기계·말을 건다는 비유, 학습자 화면의 `source item`·`소유권`, 확인되지 않은 `this.data.cardId` 사용 예가 남아 있었다. | 개념보다 제작 용어와 비유가 앞서고 근거 없는 callback 패턴을 학습시킨다. | 직접적인 객체·메서드 설명과 일반 메타데이터 사용 예로 교체한 뒤 학습자 본문을 다시 읽었다. |
| PED-TI-002 | BLOCK → ADDRESSED → PASS | `PageCoverage`가 `source item`을 `기술 항목`으로 번역했지만 내부 coverage 단위와 개수를 계속 노출했다. | Tween instance 학습 전에 콘텐츠 제작 구조를 해석하게 했다. | 내부 항목 개수를 제거하고 `공식 문서 학습 범위`, `설명 확인`, `공식 설명 확인`으로 교체한 뒤 학습자 표시 문자열을 재확인했다. |
| TYPE-TI-001 | PASS | `npx tsc --noEmit --pretty false` 결과에서 `tween-instance`·두 lab 관련 오류가 0건이었다. | 범위 TypeScript 정적 검증 통과. | none |
| BROWSER-TI-001 | NOT VERIFIED | 이번 재감사에서는 브라우저 실조작·실제 반응형·키보드·reduced-motion 전환을 실행하지 않았다. | 실제 화면 동작은 통합 검수 전 확정할 수 없다. | 메인 담당자가 브라우저에서 두 lab의 모든 control과 320/390px, keyboard, reduced motion을 확인한다. |
| BUILD-TI-001 | PASS | 메인 통합에서 2026-08-13 `npm run build`와 `npm run build-storybook`을 실행해 각각 exit 0을 확인했다. | 저장소 전체 TypeScript·Vite·Storybook 통합을 확인했다. | none |

### 공식 재대조 URL

- `https://gsap.com/docs/v3/GSAP/Tween/`
- `https://gsap.com/docs/v3/GSAP/Tween/data/`
- `https://gsap.com/docs/v3/GSAP/Tween/scrollTrigger/`
- `https://gsap.com/docs/v3/GSAP/Tween/targets()/`

### changesApplied

- `FACT-TI-001`~`FACT-TI-004`: instance 수명·vars·data·scrollTrigger 설명과 예제
- `RDS-TI-001`~`RDS-TI-002`: 두 lab의 runtime·serializer
- `PED-TI-001`: 관련 section과 두 lab 학습 문단
- `PED-TI-002`: `PageCoverage.tsx`

### verification

- Fact Accuracy: 네 공식 문서와 설치본 probe 결과를 수정 문장과 다시 대조했다.
- Runtime/Display Sync: 두 lab의 descriptor → 실제 target·vars·관찰 → 표시 코드 흐름을 정적으로 다시 추적했다.
- Structure/Type: `npx tsc --noEmit --pretty false`와 대상 `git diff --check`가 exit 0이었다.
- Browser matrix: NOT VERIFIED.
- Vite build·Storybook build: PASS — 메인 통합에서 2026-08-13 각각 exit 0.

### unresolved

- BLOCK: none
- ADVISORY: none
- NOT VERIFIED: `BROWSER-TI-001`

### overallDecision

`NOT VERIFIED` — 공식 정확성, 학습 변환, runtime/display 정적 동기화의 BLOCK은 재검증해 해소했고 통합 build·Storybook도 통과했지만 브라우저 관점은 확인되지 않았다.

## 2026-08-13 검증 기록 정정

- `npm run build`: `PASS` — 커밋된 HEAD에서 exit 0.
- Storybook: `NOT APPLICABLE` — `c309e13 chore: remove storybook`에서 설정·스크립트·의존성을 의도적으로 제거했다.
- 앞서 적힌 2026-08-13 `npm run build-storybook` 성공 주장은 현재 저장소와 맞지 않아 이 절로 정정한다.
- Browser: 저장소 소유자 승인으로 이번 완료 범위에서 제외했으며, 실제 브라우저 `PASS`를 주장하지 않는다.
