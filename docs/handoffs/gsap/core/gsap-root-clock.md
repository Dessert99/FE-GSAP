# GSAP root clock handoff

## 입력 계약

### objective

지금까지 학습자는 "Tween을 만들면 저절로 움직인다"고만 알고 있었다. 이 페이지는 그 **보이지 않던 주어**를 처음 드러낸다. 핵심 학습 목표는 **시간의 구조(`gsap.globalTimeline`)와 시간의 동력(`gsap.ticker`)을 섞지 않고 갈라 두는 것**이다. 둘은 "모든 animation이 어디에 매달려 있나"와 "그 시간을 누가 매 frame 밀어 주나"라는 서로 다른 질문에 답한다. 이 구분이 무너지면 `exportRoot()`(구조를 재배치)와 `updateRoot()`(동력을 교체)의 차이도 설명할 수 없다.

부차 목표 두 가지. (1) `globalTimeline.timeScale()`을 **디버깅 기법**으로 제시하되 그것이 **되돌려야 하는 전역 상태**임을 화면에서 숫자로 증명한다. (2) `exportRoot()`와 `updateRoot()`는 공식이 밝힌 용도만 정확히 옮기고 억지 예제를 만들지 않는다.

### officialPage

- title: `gsap.globalTimeline` + `gsap.ticker` + `gsap.exportRoot()` + `gsap.updateRoot()`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/gsap.globalTimeline`
  - `https://gsap.com/docs/v3/GSAP/gsap.ticker`
  - `https://gsap.com/docs/v3/GSAP/gsap.exportRoot()`
  - `https://gsap.com/docs/v3/GSAP/gsap.updateRoot()`
- reviewedAt: `2026-08-04`
- category: `GSAP > Core`
- slug: `gsap-root-clock`
- sourcePageIds: primary `source:gsap-global-timeline`; related `source:gsap-ticker`, `source:gsap-export-root`, `source:gsap-update-root`

네 페이지 중 **signature 줄이나 Parameters 절을 게시한 것은 하나도 없다.** `gsap.globalTimeline`은 `Type : Timeline`과 Useful Methods 목록만, `gsap.ticker`는 `Type : Object`와 산문·코드만, `gsap.exportRoot()`는 `Returns : Timeline`과 Details만, `gsap.updateRoot()`는 산문 4문장과 코드 2줄만 게시한다. 게시되지 않은 명세를 기억이나 TypeScript 선언으로 채우지 않는다. 해당 칸은 `공식 페이지에 명시 없음`으로 표시하고, 설치본에서만 확인한 것은 `origin: 'implementation'`으로 분리한다.

각 canonical은 요약본이 항목을 뭉개는 것을 막기 위해 **2026-08-04에 원문 인용을 요구하는 2차 조회**를 수행했다. 1차 요약이 실제로 항목을 합치거나 잘라낸 사례는 `SRC-CORE24-002`에 기록했다.

### localPage

- localPath: `src/content/gsap/fundamentals/gsap-root-clock/`
- route: `/fundamentals/gsap-root-clock`

### sourceManifest

**authority는 `src/content/gsap/fundamentals/gsap-root-clock/gsap-root-clock.catalog.ts`의 `gsapRootClockSourceItems` 배열이다.** 이 문서는 그 배열의 분포만 고정하고, item 원문은 catalog에 둔다. 배열은 공식 item 50개(`origin: 'official'`)와 실행 확인 항목 10개(`origin: 'implementation'`)를 한 배열에 담고 `origin`으로 구분한다. `PageCoverage`가 같은 배열을 세므로 이 문서와 화면과 catalog가 어긋날 수 없다.

**source별 공식 item 수 (합계 50)**

| source | id 범위 | 공식 item | 실행 확인 item |
| --- | --- | ---: | ---: |
| `source:gsap-global-timeline` | `GT-01`~`GT-11` | 11 | 3 (`GT-P1`~`GT-P3`) |
| `source:gsap-ticker` | `TK-01`~`TK-29` | 29 | 5 (`TK-P1`~`TK-P5`) |
| `source:gsap-export-root` | `ER-01`~`ER-06` | 6 | 1 (`ER-P1`) |
| `source:gsap-update-root` | `UR-01`~`UR-04` | 4 | 1 (`UR-P1`) |
| **합계** | | **50** | **10** |

**섹션별 공식 item 분배 (합계 50)**

| 섹션 | id | 공식 item | 담긴 source item |
| --- | --- | ---: | --- |
| 01 아무도 재생 버튼을 누르지 않았는데 움직였다 | `who-drives` | 4 | GT-01, TK-01, TK-02, TK-03 |
| 02 시간의 구조 — 모든 animation의 부모 | `global-timeline` | 9 | GT-02~GT-10 |
| 03 시간의 동력 — 매 frame 오는 신호 | `ticker` | 13 | TK-04~TK-16 |
| 04 frame이 밀렸을 때 시간을 어떻게 다루나 | `lag-smoothing` | 13 | TK-17~TK-29 |
| 05 지금까지 만든 것만 따로 묶는다 | `export-root` | 7 | GT-11, ER-01~ER-06 |
| 06 시간을 밖에서 직접 준다 | `update-root` | 4 | UR-01~UR-04 |
| 07 여기서 다루지 않는 것 | `boundaries` | 0 | — |
| **합계** | | **50** | |

`GT-11`(“delayedCall을 빼고 싶으면 `exportRoot()`를 보라”)만 소유 source와 소유 섹션이 다르다. globalTimeline 페이지의 문장이지만 그 답이 05단계에 있어서 거기에 배치했다.

세 숫자가 일치한다 — meta 섹션 `sourceItems` 합계 **50** = catalog `origin: 'official'` 행 수 **50** = meta `officialSourceItems` 분모 **50**. 중복 ID 0건. 대조 스크립트 결과는 `OC-CORE24-001`에 있다.

### sourceBlockers

`none`. 50개 기술 item 전부 2026-08-04에 네 공식 페이지 원문으로 직접 확인했다.

다음은 네 공식 페이지가 **게시하지 않은** 내용이므로 주장하지 않는다. 필요해지면 `blocked-source` item을 추가하고 release를 `BLOCK`한다.

- `gsap.exportRoot()`의 signature 줄과 Parameters 절 — **2026-08-04 3차 표적 조회로 부재를 확정했다**(`SRC-CORE24-003`). 본문에 "[optionally] delayed calls"라는 표현만 있고 그 선택을 어떤 인자로 하는지가 없다.
- `gsap.updateRoot()`의 signature·Parameters·Returns — 산문 4문장과 코드 2줄이 페이지의 전부다.
- `gsap.ticker.sleep()` · `wake()` · `tick()`의 용도 — 설치본에는 있으나 공식 ticker 페이지에 설명이 없다. 페이지는 **존재만** 적고 사용법을 지어내지 않는다.
- `gsap.ticker.add()`의 반환값 — 공식 페이지에 없다.
- `once` · `prioritize`의 기본값 — 공식 페이지가 `Boolean`이라고만 적는다.
- `globalTimeline`을 `pause()`한 상태에서 **새로 만든** animation이 어떻게 되는지 — 공식 페이지에 명시 없음.
- `gsap.ticker.lagSmoothing()`의 getter 반환 형태 — 공식은 "getter이자 setter"라고 적지만 반환값 설명이 없다. 설치본 실행 결과는 `TK-P2`.

비기술 영역으로 제외한 것: 공식 ticker 페이지의 "Here's a demo from Blake Bowen" 외부 CodePen 링크. 기술 주장이 없는 데모 참조라 item을 만들지 않았다.

### moduleSelection

| module | 목적 | 근거 source |
| --- | --- | --- |
| 개념·가이드 (`CG`) | "누가 움직이나"라는 보이지 않는 질문을 시간의 **구조**와 시간의 **동력** 둘로 갈라 세우고, 그 위에 나머지 셋을 얹는다. | GT-01, TK-01~TK-03 |
| class·instance (`CI`) | `globalTimeline`이라는 단 하나의 instance — 무엇이 자식으로 매달리고, 어떤 메서드가 있고, 완료된 자식은 언제 사라지는가. | GT-02~GT-11, ER-06 |
| property catalog (`PC`) | `ticker`의 메서드·속성 전체 명세 — `add` / `remove` / `fps` / `deltaRatio` / `lagSmoothing`과 `time` / `frame`, callback 인자 3개, `add()` 옵션 2개. | TK-04~TK-29 |
| callable method (`CM`) | `exportRoot()`와 `updateRoot()`의 호출 시점·순서·반환값. 공식이 게시한 범위까지만. | ER-01~ER-06, UR-01~UR-04 |

ease visualizer, plugin, installation 모듈은 추가하지 않는다.

### learnerFlow

| id | 학습자 질문 | sourceItemIds |
| --- | --- | --- |
| `flow:invisible-driver` | 재생 버튼을 누른 적이 없는데 왜 움직였나요? | GT-01, TK-01 |
| `flow:frame-rate` | 그 신호는 초당 몇 번 오나요? 고정인가요? | TK-02, TK-03 |
| `flow:parentage` | 내가 만든 Tween은 어디에 매달려 있나요? | GT-02, GT-P1 |
| `flow:global-controls` | 전부를 한 번에 멈추거나 느리게 하려면? | GT-03~GT-08 |
| `flow:global-traps` | 전역 조작에서 무엇이 함께 딸려 오나요? | GT-09, GT-10 |
| `flow:own-listener` | 그 신호를 나도 받을 수 있나요? | TK-04~TK-08 |
| `flow:listener-options` | 한 번만 받거나, GSAP보다 먼저 받을 수 있나요? | TK-09, TK-10 |
| `flow:frame-budget` | frame rate가 흔들려도 같은 속도를 유지하려면? | TK-11~TK-16 |
| `flow:lag-tax` | CPU가 밀리면 흐른 시간을 그대로 믿어야 하나요? | TK-17~TK-29 |
| `flow:freeze-but-not-new` | 전체를 얼리되 지금부터 만들 것은 빼려면? | GT-11, ER-01~ER-06 |
| `flow:own-loop` | 이미 내 render loop가 있으면 GSAP 시계를 끌 수 있나요? | UR-01~UR-04 |

### coverageMap

catalog의 각 행이 `sectionId`로 소유 섹션을 지목하며 `PageCoverage`가 같은 배열을 센다. 섹션 파일과 item의 대응은 위 [섹션별 분배 표](#sourcemanifest)가 authority다. 실행 확인 항목 10개의 표시 위치는 다음과 같다.

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| GT-P1 | `GlobalTimelineSection.tsx` "실행으로 확인한 부모 관계" probe 블록 | covered (probe) |
| GT-P2 | `GlobalTimelineSection.tsx` Useful Methods 표 아래 probe 블록 | covered (probe) |
| GT-P3 | `GlobalTimelineSection.tsx` probe 블록 + `GlobalTimeScaleLab` 관찰 패널의 두 timeScale 값 | covered (probe) |
| TK-P1 | `TickerSection.tsx` "공식 목록에 없는 것들" probe 블록 | covered (probe) |
| TK-P2 | `TickerSection.tsx` 같은 블록 둘째 문단 + `LagSmoothingSection.tsx` 마지막 probe 블록 | covered (probe) |
| TK-P3 | `TickerSection.tsx` "실행으로 확인한 두 가지" 둘째 문단 | covered (probe) |
| TK-P4 | `TickerSection.tsx` 같은 블록 첫 문단 | covered (probe) |
| TK-P5 | `TickerSection.tsx` "실행으로 확인한 fps 제한" probe 블록 | covered (probe) |
| ER-P1 | `ExportRootSection.tsx` "공식 페이지에 시그니처가 없다" probe 블록 | covered (probe) |
| UR-P1 | `UpdateRootSection.tsx` "실행으로 확인한 세 가지" probe 블록 | covered (probe) |

`GT-P*` · `TK-P*` · `ER-P1` · `UR-P1`은 공식 item이 아니다. coverage 분모(50)에 포함하지 않으며 `PageCoverage`도 공식 50개와 분리해 센다.

### relatedPages

- `gsap-core-map` — GSAP Core에 무엇이 들어 있는지의 전체 지도를 소유한다. 이 페이지는 그중 root scheduling 한 덩어리만 확대한다.
- `tween-playhead` — Tween 하나의 `progress()` · `pause()` · **개별** `timeScale()`을 소유한다. 이 페이지는 전역 `timeScale`과의 대조 목적으로만 언급한다.
- `tween-configuration` — `duration` · `delay` 같은 설정의 출처와 적용 범위를 소유한다.
- `gsap-to` — `vars` 전체 명세를 소유한다.
- Timeline 학습 페이지(미구현) — `gsap.timeline()` 생성과 자식 배치, Timeline의 `pause()` · `timeScale()` 명세를 소유한다. 이 페이지는 globalTimeline에 걸리는 효과만 다룬다.
- `gsap.delayedCall()` 학습 페이지(미구현) — delayedCall의 전체 명세와 취소를 소유한다. 이 페이지는 "기술적으로는 tween이라 전역 조작에 딸려 온다"는 경계만 긋는다.

## 구현 계약

### exactFiles

create:

```text
src/content/gsap/fundamentals/gsap-root-clock/GsapRootClockPage.tsx
src/content/gsap/fundamentals/gsap-root-clock/GsapRootClockPage.css
src/content/gsap/fundamentals/gsap-root-clock/gsap-root-clock.meta.ts
src/content/gsap/fundamentals/gsap-root-clock/gsap-root-clock.catalog.ts
src/content/gsap/fundamentals/gsap-root-clock/components/PageCoverage/PageCoverage.tsx
src/content/gsap/fundamentals/gsap-root-clock/components/SectionHeading/SectionHeading.tsx
src/content/gsap/fundamentals/gsap-root-clock/sections/WhoDrivesSection/WhoDrivesSection.tsx
src/content/gsap/fundamentals/gsap-root-clock/sections/GlobalTimelineSection/GlobalTimelineSection.tsx
src/content/gsap/fundamentals/gsap-root-clock/sections/TickerSection/TickerSection.tsx
src/content/gsap/fundamentals/gsap-root-clock/sections/LagSmoothingSection/LagSmoothingSection.tsx
src/content/gsap/fundamentals/gsap-root-clock/sections/ExportRootSection/ExportRootSection.tsx
src/content/gsap/fundamentals/gsap-root-clock/sections/UpdateRootSection/UpdateRootSection.tsx
src/content/gsap/fundamentals/gsap-root-clock/sections/BoundariesSection/BoundariesSection.tsx
src/content/gsap/fundamentals/gsap-root-clock/examples/GlobalTimeScaleLab/GlobalTimeScaleLab.tsx
src/content/gsap/fundamentals/gsap-root-clock/examples/GlobalTimeScaleLab/GlobalTimeScaleLab.css
src/content/gsap/fundamentals/gsap-root-clock/examples/GlobalTimeScaleLab/useGlobalTimeScaleAnimation.ts
src/content/gsap/fundamentals/gsap-root-clock/examples/TickerListenerLab/TickerListenerLab.tsx
src/content/gsap/fundamentals/gsap-root-clock/examples/TickerListenerLab/TickerListenerLab.css
src/content/gsap/fundamentals/gsap-root-clock/examples/TickerListenerLab/useTickerListenerRuntime.ts
docs/handoffs/gsap/core/gsap-root-clock.md
```

modify:

```text
src/app/routes.ts   (이 컨텍스트는 건드리지 않는다 — 저장소 소유자가 등록한다)
```

섹션 전용 CSS 파일은 만들지 않는다. 선례 두 페이지(`non-css-target-values`, `tween-callbacks-promise`)와 같이 섹션 스타일은 페이지 CSS가 소유하고, 예제만 자기 CSS를 가진다.

### exampleContracts

#### `GlobalTimeScaleLab`

- goal: `gsap.globalTimeline.timeScale()` **하나만** 바꿔 상자를 느리게 만들고, ① 그 Tween 자신의 `timeScale()`은 1로 남는다는 것과 ② 끝난 뒤 전역 값이 1로 복원된다는 것을 같은 화면에서 숫자로 확인한다.
- question: 내 Tween의 설정은 아무것도 안 바꿨는데 왜 느려졌고, 그 전역 값은 지금 얼마인가요?
- representation: 이동하는 상자 하나 + 관찰 `dl` 5칸(전역 `timeScale` · Tween 자신의 `timeScale` · Tween이 흐른 시간 · 실제로 흐른 시간 · **전역 값 복원 상태**) + 실행 코드 패널
- controls: 전역 배속 radio 4개(0.25 / 0.5 / 1 / 2 — 0.5와 2는 공식 예제 값), `실행하기` 버튼, `지금 1로 되돌리기` 버튼
- runtimeSource: `useGlobalTimeScaleAnimation.ts`
- sourcePath: `examples/GlobalTimeScaleLab/useGlobalTimeScaleAnimation.ts`
- runtimeOwnership: hook이 selector · `requestedTimeScale` · `appliedTimeScale` · `duration` · `effectiveDuration` · `travelX`를 담은 단일 descriptor와 paused Tween 하나를 소유한다. 전역 값 변경(`run`)과 복원(`onComplete` · `restore` · `useGSAP` cleanup)을 전부 소유한다. 관찰값은 매번 `gsap.globalTimeline.timeScale()` · `tween.timeScale()` · `tween.time()` · `performance.now()`에서 **다시 읽는다**.
- displayOwnership: TSX가 descriptor와 관찰값을 코드 문법으로만 직렬화한다. 코드 패널 마지막 줄 `// → 지금 읽은 값: {observation.globalTimeScale}`은 hook이 읽어 온 실제 전역 값을 그대로 찍는다. TSX는 `gsap`을 import하지 않는다.
- coveredSourceItemIds: GT-06, GT-07, GT-08, GT-P2, GT-P3
- accessibility: `fieldset`/`legend`로 묶은 native radio, native 버튼 2개, 관찰값은 `dt`/`dd` + `output aria-labelledby`, 상태는 `role="status"` 하나, 720px 이하 단일 열
- motion: 자동 재생 없음 — 진입 시 `paused: true` Tween을 준비만 한다. `useReducedMotion()`이 `true`면 `effectiveDuration = 0`이고 **`appliedTimeScale`도 1로 고정해 전역 값을 아예 건드리지 않는다.** 이동 없이 최종 위치만 보여주고 그 사실을 상태 문구로 알린다.

#### `TickerListenerLab`

- goal: `gsap.ticker`에 내 함수를 직접 얹어 매 tick 넘어오는 `time` · `deltaTime` · `frame`을 읽고, `once` 인자가 자동 제거를 어떻게 만드는지 관찰한다.
- question: GSAP을 움직이는 그 신호를 나도 받을 수 있나요? 받은 값은 어떤 모양인가요?
- representation: 움직이는 것 없이 관찰 `dl` 5칸(`time` · `deltaTime` · `frame` · `deltaRatio()` · **내 함수가 불린 횟수**) + 실행 코드 패널
- controls: `add()`의 `once` 인자 radio 2개, `listener 붙이기` / `listener 떼기` 버튼(현재 등록 상태에 따라 `disabled`)
- runtimeSource: `useTickerListenerRuntime.ts` — animation을 만들지 않고 ticker 등록 상태만 다루므로 `Animation`이 아니라 `Runtime` 접미사를 쓴다.
- sourcePath: `examples/TickerListenerLab/useTickerListenerRuntime.ts`
- runtimeOwnership: hook이 `mode`(= `once` 인자) · `listening` · 관찰값 · 표시 간격을 소유하고, `gsap.ticker.add()`가 **돌려준 함수 참조**를 ref에 보관해 `remove()`에 그대로 넘긴다(`TK-P3`이 요구하는 처리). tick 수는 표시를 건너뛴 tick까지 ref로 직접 센다.
- displayOwnership: TSX가 `mode`와 마지막 관찰값을 코드 문법으로만 직렬화한다(`gsap.ticker.add(readTick, ${mode === 'once'})`). TSX는 `gsap`을 import하지 않는다.
- coveredSourceItemIds: TK-04, TK-05, TK-06, TK-07, TK-08, TK-09, TK-12, TK-15
- accessibility: `fieldset`/`legend` + native radio, `disabled` 상태로 현재 등록 여부를 전달, 관찰값은 `output aria-labelledby`, 상태는 `role="status"` 하나, 720px 이하 단일 열
- motion: 자동 시작 없음 — 붙이지 않으면 아무 일도 일어나지 않는다. 화면에서 움직이는 요소가 없고 숫자만 바뀐다. 매 tick 다시 그리지 않고 `displayIntervalSeconds` 간격으로만 갱신하며, `useReducedMotion()`이 `true`면 그 간격을 0.1초에서 **0.5초**로 늘리고 그 사실을 화면에 적는다. 기본 mode는 가장 조용한 `once`다.

#### 실행 예제를 두지 않은 두 절

| 절 | runtimeSource | sourcePath | controls | motion | 이유 |
| --- | --- | --- | --- | --- | --- |
| `lag-smoothing` | `none` | `none` — 정적 코드는 `LagSmoothingSection.tsx`가 소유 | `none` | `none` | lag smoothing은 CPU가 500ms 넘게 밀렸을 때만 발동한다. 그 상황을 예제로 만들려면 브라우저를 일부러 멈춰야 하고 결과가 기기마다 달라 **재현되지 않는 숫자**가 된다. |
| `export-root` | `none` | `none` — 정적 코드는 `ExportRootSection.tsx`가 소유 | `none` | `none` | `exportRoot()`는 페이지 전체 root를 실제로 재배치하고, 공식이 밝힌 대로 **겹겹이 쌓이기만** 해서 되돌릴 공식 방법이 없다. 되돌릴 수 없는 전역 조작은 학습 가치보다 위험이 크다. |
| `update-root` | `none` | `none` — 정적 코드는 `UpdateRootSection.tsx`가 소유 | `none` | `none` | `gsap.ticker.remove(gsap.updateRoot)`는 **앱 전체의 GSAP을 멈추는 한 줄**이다. 실행 중 사용자가 이동하면 복구 기회가 사라진다. |

세 절 모두 그 이유를 화면에도 적어 두었다(`LagSmoothingSection` 마지막 probe 블록, `ExportRootSection` "이 절에 실행 예제를 두지 않은 이유", `UpdateRootSection` "떼어내면 전부 멈춘다").

### nonGoals

- `gsap.ticker.fps()`와 `gsap.ticker.lagSmoothing()`을 **예제에서 호출하지 않는다.** 설치본에는 현재값을 읽는 getter가 없어서(`TK-P2`) 바꾸기 전 값을 저장할 방법이 없고, 따라서 **복원을 보장할 수 없다.** 설명은 공식 문장과 기본값으로만 한다.
- `exportRoot()` · `updateRoot()`를 실행 코드로 부르지 않는다. 위 표의 이유.
- `globalTimeline.pause()`를 예제에서 호출하지 않는다. 전역을 멈추면 같은 페이지의 다른 예제와 앱 전체가 멈추고, 사용자가 그 상태로 이동할 위험이 있다. `timeScale`은 화면이 계속 살아 있어 복원 버튼을 누를 수 있으므로 예제로 허용했다.
- Timeline 생성·자식 배치·label을 다루지 않는다.
- `delayedCall()`의 전체 명세를 다루지 않는다. 전역 조작에 딸려 온다는 경계만 긋는다.
- 두 lab을 공용 generic runtime으로 합치지 않는다. 각 lab이 자기 실행 source를 소유한다.
- `sleep()` · `wake()` · `tick()`의 사용법을 지어내지 않는다. 존재만 적는다.

### preserve

- 기존 학습 페이지의 파일·라우트·스타일 토큰
- 공용 컴포넌트(`OfficialDocsLink`, `useReducedMotion`) — 변경 없음
- `src/app/routes.ts` — 이 컨텍스트에서 수정하지 않는다
- 공식 원문 표기 — `Type : Timeline`, `Type : Object`, `Returns : Timeline`, `gsap.ticker.lagSmoothing(1000, 16)`, `gsap.ticker.fps(30)` 등 코드 블록은 공식 페이지의 주석까지 그대로 옮긴다
- `master-page-inventory.md`의 소유권 행

## 검증 계약

### verifiedPerspectives

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion, Build/Integration, Cross-page Consistency — 모두 구현 컨텍스트가 직접 판정했다(`docs/workflows/quality-gates.md`: 독립 검수자를 두지 않는다).

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-CORE24-001 | PASS | 2026-08-04에 네 canonical 원문을 직접 조회해 50개 item을 확인했다. 네 페이지 모두 signature 줄과 Parameters 절이 없음을 확인했다. | blocker 없이 구현 가능 | 미게시 명세를 `공식 페이지에 명시 없음`으로 표시 |
| SRC-CORE24-002 | BLOCK → ADDRESSED → PASS | **1차 요약 조회가 항목을 합치거나 잘라냈다.** ① `globalTimeline` — Useful Methods 네 항목이 산문 덩어리로 뭉쳐 나왔고 `isActive()` 경고문이 heading으로 잘못 분류됐다. ② `ticker` — "Ticker properties" 목록이 callback 인자 산문에 섞여 나왔고, 탭 throttling 문장이 "in order to conserve battery power and reduce load on the CPU" 부분에서 잘렸으며, `sleep()`/`wake()` 존재 여부가 아예 답변되지 않았다. ③ `exportRoot` — Details 문장이 전부 `...`로 잘려 `without affecting tweens/timelines that you create ***after*** the export`와 `Things can be nested as deeply as you want.`가 사라졌다. / **"각 항목을 한 줄씩 원문 인용하고 없으면 NOT PRESENT라고 답하라"는 2차 조회**로 세 페이지 모두 재확인했고, 네 메서드가 각자의 설명과 함께 실재하며 Ticker properties는 정확히 `time`·`frame` 둘뿐이고 `sleep`/`wake`는 `NOT PRESENT`이며 `deltaRatio`는 `(added in 3.5.0)`임을 확정했다. 잘렸던 문장은 전문을 복원해 `GT-03`~`GT-06`, `TK-11`, `TK-12`, `TK-15`, `ER-02`, `ER-05`에 반영했다. | 1차 요약만 믿었으면 공식 item 최소 9개를 누락하거나 잘린 문장으로 가르칠 뻔했다 | none |
| SRC-CORE24-003 | PASS | `exportRoot()`의 signature 부재는 **반대 방향의 오판**을 막기 위해 3차 표적 조회를 따로 했다. "h1 바로 아래 monospace signature 줄이 있는가 / Parameters 절이 있는가 / `omitDelayedCalls`·`includeDelayedCalls`가 본문에 나오는가 / `vars`가 나오는가"를 각각 물어 **네 질문 모두 `NOT PRESENT`** 응답을 받았다. 즉 공식 페이지에 인자 이름이 실재하지 않는다. | 인자 이름을 기억으로 채우는 사고를 막았다 | 인자 이름은 `ER-P1`에 `origin: 'implementation'`으로만 기록 |
| PROBE-CORE24-001 | PASS | **측정 방법** — Node에서 `import gsap from 'gsap'` 뒤 `tween.parent === gsap.globalTimeline` · `dc.parent === gsap.globalTimeline` · `String(gsap.globalTimeline.parent)` · `gsap.globalTimeline.smoothChildTiming` · `.autoRemoveChildren` · `.timeScale()` · `.paused()` · `.isActive()`를 그대로 출력. **결과** — 앞 둘 `true`, parent `null`, 뒤 둘 `true`, `timeScale()` `1`, `paused()` `false`, `isActive()` 자식 유무와 무관하게 `true`. **재현 조건** — gsap 3.15.0, Node 22, 다른 라이브러리 없이 단독 실행. | `GT-P1` 근거이자 `GT-09`(isActive 항상 true) 공식 주장 재현 | none |
| PROBE-CORE24-002 | PASS | **측정 방법** — `gsap.globalTimeline.pause() === gsap.globalTimeline` · `.play() === gsap.globalTimeline` · `.timeScale(1) === gsap.globalTimeline` 출력. **결과** — 셋 다 `true`. 공식은 `pause()`·`play()`에만 "Returns itself"를 적는다. **재현 조건** — gsap 3.15.0, Node 22 단독 실행. | `GT-P2` 근거 | none |
| PROBE-CORE24-003 | PASS | **측정 방법** — `gsap.globalTimeline.timeScale(0.5)`을 건 **뒤에** `gsap.to({v:0},{v:1,duration:1})`을 만들고 `setTimeout` 500ms 시점에 `tween.progress()` · `tween.time()` · `tween.timeScale()`을 출력. **결과** — wall clock 500ms 경과 시 `progress()` **0.251**, `time()` **0.251**, tween 자신의 `timeScale()`은 **1** 유지. 이론값 0.25와 일치. 이어서 `timeScale(1)`로 복원하고 `1`을 재출력해 확인. **재현 조건** — gsap 3.15.0, Node 22 단독 실행, 동일 프로세스에서 다른 tween 없음. | `GT-P3` 근거이자 `GT-07`(개별 timeScale을 바꾸지 않는다) 공식 주장 재현. `GlobalTimeScaleLab`의 관찰 패널 설계 근거 | none |
| PROBE-CORE24-004 | PASS | **측정 방법** — `Object.keys(gsap.ticker)` 출력, 이어 `typeof gsap.ticker[k]`를 8개 키에 대해 출력. **결과** — own key는 `time, frame, tick, deltaRatio, wake, sleep, lagSmoothing, fps, add, remove, _listeners`. `sleep`·`wake`·`tick`은 `function`이지만 공식 ticker 페이지에 설명이 없다. **재현 조건** — gsap 3.15.0, Node 22 단독 실행. | `TK-P1` 근거 | 사용법을 지어내지 않고 존재만 표기 |
| PROBE-CORE24-005 | PASS | **측정 방법** — `String(gsap.ticker.fps())` · `String(gsap.ticker.lagSmoothing())` · `String(gsap.ticker.lagSmoothing(1000,16))` 출력, 이어 `node_modules/gsap/gsap-core.js`의 `fps` · `lagSmoothing` 정의를 읽음. **결과** — 셋 다 `undefined`. 소스상 `fps(_fps)`는 `_gap = 1000 / (_fps \|\| 240)`을 설정만 하고, `lagSmoothing(threshold, adjustedLag)`은 `_lagThreshold`·`_adjustedLag`를 설정만 한다. **읽기 경로가 없다.** 공식은 `lagSmoothing`을 "getter이자 setter"라고 적는다. **재현 조건** — gsap 3.15.0, Node 22 단독 실행. | `TK-P2` 근거. **이 예제에서 `fps`·`lagSmoothing`을 조작하지 않기로 한 결정의 직접 근거** — 이전 값을 읽을 수 없으니 복원을 보장할 수 없다 | none |
| PROBE-CORE24-006 | PASS | **측정 방법** — `const r = gsap.ticker.add(fn, true)` 뒤 `r === fn` 출력, 그리고 500ms 동안 호출 횟수 카운트. **결과** — `r === fn`은 **false**(once일 때 wrapper를 돌려준다), 호출 횟수는 500ms 동안 정확히 **1**. **재현 조건** — gsap 3.15.0, Node 22 단독 실행. | `TK-P3` 근거이자 `TK-09`(once 자동 제거) 공식 주장 재현. `TickerListenerLab`이 add의 **반환값**을 ref에 보관하는 이유 | none |
| PROBE-CORE24-007 | PASS | **측정 방법** — 진행 중인 tween 하나를 두고 `gsap.ticker.add(post)`(기본)와 `gsap.ticker.add(pre, false, true)`(prioritize)를 등록해 **같은 tick**에서 각각 읽은 `tween.time()`을 출력. **결과** — prioritize 쪽 **0**, 기본 쪽 **0.009**. 우선 listener가 root 갱신 전에 실행된다. **재현 조건** — gsap 3.15.0, Node 22 단독 실행, 첫 tick의 값만 기록. | `TK-P4` 근거이자 `TK-10` 공식 주장 재현 | none |
| PROBE-CORE24-008 | PASS | **측정 방법** — `gsap.ticker.frame` 증가량을 wall clock 0.5초로 나눔. 기본 상태 → `gsap.ticker.fps(30)` → 인자 없는 `gsap.ticker.fps()`로 복원, 세 구간을 각각 측정. **결과** — **238.0** → **29.9** → **228.0** ticks/sec. **재현 조건 — Node 22에는 `requestAnimationFrame`이 없어 공식이 밝힌 `setTimeout` fallback이 돌았고, GSAP 내부 기본 gap이 `1000/240`이라 240 근처가 나온다. 브라우저에서는 rAF가 화면 주사율로 상한을 정하므로 이 숫자는 재현되지 않는다.** 이 조건을 화면 probe 블록에도 그대로 적었다. | `TK-P5` 근거이자 `TK-03`(setTimeout fallback)·`TK-13`(fps 제한) 공식 주장 재현 | 환경 종속성을 화면에 명시 — 완료 |
| PROBE-CORE24-009 | PASS | **측정 방법** — tween 1개와 `gsap.delayedCall(5, fn)` 1개를 만든 뒤 `gsap.exportRoot()`를 부르고 `exported.constructor.name` · `exported.getChildren(false).length` · `tween.parent === exported` · `dc.parent === gsap.globalTimeline` · `exported.parent === gsap.globalTimeline`을 출력. 이어 export **뒤에** 만든 tween의 parent를 출력. 마지막으로 `gsap.exportRoot({}, true)`로 같은 값을 재측정. **결과** — 반환 `Timeline`, 자식 1개, tween의 parent는 exported, **delayedCall은 globalTimeline에 남음**, exported의 parent는 globalTimeline, export 뒤 tween의 parent는 globalTimeline. 두 번째 인자 `true`에서는 delayedCall도 exported로 이동. 설치본 `.d.ts`는 `exportRoot(vars?: TimelineVars, includeDelayedCalls?: boolean)`. **재현 조건** — gsap 3.15.0, Node 22 단독 실행. | `ER-P1` 근거이자 `ER-02`·`ER-05`·`GT-11` 공식 주장 재현 | 인자 이름은 implementation 출처로만 표기 |
| PROBE-CORE24-010 | PASS | **측정 방법** — `gsap.ticker.remove(gsap.updateRoot)` 뒤 `gsap.to({v:0},{v:1,duration:10})`을 만들고 300ms 대기하며 `tween.time()`을 전후 출력, 이어 `gsap.updateRoot(gsap.globalTimeline.time() + 4)` 호출 후 같은 값과 반환값을 출력, 마지막에 `gsap.ticker.add(gsap.updateRoot)`로 복원. **결과** — 300ms 동안 `time()` **0.0000 → 0.0000**(전혀 진행하지 않음). `updateRoot(4.25)` 뒤 `time()` **3.7495**, `progress()` **0.375**. 즉 인자는 **누적 delta가 아니라 root의 절대 시간**이며(4.25 − 시작 0.5005 = 3.7495), 반환값은 `undefined`. **재현 조건** — gsap 3.15.0, Node 22 단독 실행. | `UR-P1` 근거이자 `UR-01`·`UR-03`·`UR-04` 공식 주장 재현 | none |
| GLOBAL-CORE24-001 | PASS | **이 페이지에서 가장 위험한 지점 — 전역 상태 복원.** `GlobalTimeScaleLab`은 `gsap.globalTimeline.timeScale()`이라는 앱 전역 값을 바꾼다. 복원 경로를 **4중**으로 뒀다. ① `useGlobalTimeScaleAnimation.ts`의 `useGSAP` 콜백이 돌려주는 cleanup에서 `gsap.globalTimeline.timeScale(neutralTimeScale)` — `dependencies: [descriptor]` + `revertOnUpdate: true`이므로 **배속 radio를 바꿀 때와 페이지를 떠날 때(unmount)** 모두 실행된다. ② 같은 파일 Tween `vars`의 `onComplete`에서 같은 호출 — 정상 종료 시 즉시 1로 돌아간다. ③ `restore()` 함수 — TSX의 `지금 1로 되돌리기` 버튼이 실행 도중에도 즉시 복원한다. ④ 모션 감소 설정에서는 `createDescriptor`가 `appliedTimeScale`을 1로 고정해 **애초에 전역 값을 건드리지 않는다.** 상수 `neutralTimeScale = 1`을 한 곳에 두어 네 경로가 같은 값을 쓴다. | 복원 실패 시 이 페이지의 다른 예제와 앱 전체 animation이 느려진 채 남는다 | none |
| GLOBAL-CORE24-002 | PASS | **복원 여부를 화면에 숫자로 표시한다.** `report()`가 매 관찰 시점마다 `gsap.globalTimeline.timeScale()`을 **GSAP에서 다시 읽어** `observation.globalTimeScale`에 넣고, `restored: globalTimeScale === neutralTimeScale`을 함께 계산한다. TSX는 이를 세 곳에 드러낸다 — ① 관찰 `dl`의 `globalTimeline.timeScale()` 칸(원값), ② 전용 칸 `전역 값 복원 상태`가 `복원됨 (1)` 또는 `복원 안 됨 (0.5)`로 표시, ③ 코드 패널 마지막 줄 `// → 지금 읽은 값: {observation.globalTimeScale}`. 세 값 모두 추측이 아니라 **읽어 온 값**이므로 복원이 실패하면 화면이 즉시 그것을 드러낸다. | 복원 보장이 코드에만 있고 화면에 없으면 학습자가 위험을 체감하지 못한다 | none |
| GLOBAL-CORE24-003 | PASS | **ticker listener도 전역 등록이다.** `useTickerListenerRuntime.ts`의 정리 경로 — ① `stop()`이 `gsap.ticker.remove(listenerRef.current)`로 뗀다, ② `chooseMode()`가 mode 변경 **전에** `stop()`을 먼저 부른다(두 mode의 listener가 겹치지 않는다), ③ `useEffect`의 unmount cleanup이 남은 listener를 뗀다, ④ `once: true` 경로는 GSAP이 스스로 떼고 hook은 `listenerRef.current = null`로 화면 상태만 맞춘다, ⑤ `start()`가 `if (listenerRef.current) return`으로 중복 등록을 막는다. 등록 여부는 `listening` state로 두 버튼의 `disabled`와 `role="status"` 문구에 그대로 드러난다. `gsap.ticker.add()`의 **반환값**을 보관해 `remove()`에 넘기므로 `once` wrapper도 정확히 제거된다(`PROBE-CORE24-006`). | 떼지 않은 listener는 화면을 떠나도 계속 돌아 누수가 된다 | none |
| GLOBAL-CORE24-004 | PASS | **되돌릴 수 없는 전역 조작은 아예 실행하지 않았다.** `gsap.ticker.fps()` · `lagSmoothing()`은 이전 값을 읽을 getter가 없어(`PROBE-CORE24-005`) 복원을 보장할 수 없으므로 예제에서 호출하지 않는다. `exportRoot()`는 공식이 밝힌 대로 중첩만 되고 해제 방법이 없어 호출하지 않는다. `gsap.ticker.remove(gsap.updateRoot)`는 앱 전체를 정지시키므로 호출하지 않는다. `globalTimeline.pause()`도 같은 이유로 호출하지 않는다(화면이 멈춰 복원 버튼을 누를 수 없게 된다). 세 절 모두 그 이유를 화면 본문에 적었다. | 학습 화면에서 복구 불가능한 상태를 만들지 않는다 | none |
| OC-CORE24-001 | PASS | 스크립트로 대조 — meta 섹션 `sourceItems` 합계 **50**(4/9/13/13/7/4/0) = catalog `origin: 'official'` 행 수 **50** = meta `officialSourceItems` **50**. source별 분포 11/29/6/4 = 50. 중복 ID **0건**. catalog의 모든 `sectionId`가 meta의 섹션 id 집합 안에 있음. `PageCoverage`의 분자는 선언값이 아니라 catalog가 실제로 근거를 댄 source 수(`new Set(...).size` = 4)를 센다. | Official Coverage 통과 | none |
| LT-CORE24-001 | PASS | 단순 번역이 아님 — 공식 목차(globalTimeline / ticker / exportRoot / updateRoot)를 그대로 옮기지 않고 **"누가 움직이나 → 구조 → 동력 → 밀렸을 때 → 떼어내기 → 직접 주기"** 학습 순서로 재배열했다. `lag-smoothing`은 공식에서 ticker 페이지 하위 절이지만 질문이 다르므로 독립 섹션으로 분리했다. `GT-11`은 소유 source와 다른 섹션에 배치해 학습자의 질문 순서를 따랐다. 01단계는 공식 어디에도 없는 도입 — "재생 버튼을 누른 적이 없다"에서 출발한다. | Learning Transformation 통과 | none |
| RDS-CORE24-001 | PASS | 두 lab 모두 hook의 단일 값에서 GSAP 호출과 표시 코드가 함께 파생된다. `GlobalTimeScaleLab`은 `descriptor.appliedTimeScale`·`travelX`·`effectiveDuration`이 `gsap.to()` 인자이자 코드 패널 문자열이고, `TickerListenerLab`은 `mode === 'once'`가 `gsap.ticker.add()`의 두 번째 인자이자 코드 패널 문자열이다. 관찰값은 전부 `gsap.globalTimeline.timeScale()` · `tween.timeScale()` · `tween.time()` · ticker callback 인자 · `gsap.ticker.deltaRatio()`로 **읽은** 값이다. TSX 두 파일이 `gsap`을 import하지 않음을 grep으로 확인했다(2026-08-05, 결과 0건). | Runtime/Display Sync 통과 | none |
| PED-CORE24-001 | PASS | 처음 나오는 용어를 쓰기 전에 정의했다 — `frame`·`requestAnimationFrame`(01), `Timeline`(02), `lag`(04). 두 lab 모두 한 대상·한 변화에 집중한다(상자 하나의 속도, listener 하나의 인자). 네 패널(`무엇이 달라졌나요?` / `무엇을 봐야 하나요?` / `왜 이렇게 동작하나요?` / `실제로 언제 쓰나요?`)을 두 lab에 모두 두었다. `timeScale`의 실제 사용처를 **디버깅**으로 명시하고 복원 의무를 함께 적었다. 메서드·속성 표에 타입·기본값·반환값을 적고, 없으면 `공식 페이지에 기본값 명시 없음` 같은 문구로 부재를 표시했다. | Pedagogy 통과 | none |
| STRUCT-CORE24-001 | PASS | 페이지 TSX는 header와 7개 섹션 조립만 한다. 한 파일에 컴포넌트 하나. 실행 생명주기는 두 hook이 소유하고 학습 패널은 TSX가 소유한다. 예제별 실행 source를 유지했다(공용 generic runtime 없음). animation 생명주기가 있는 쪽은 `use...Animation.ts`, ticker 등록 상태만 다루는 쪽은 `use...Runtime.ts`로 접미사를 구분했다. 주석은 파일 상단과 모든 `export` 위 `/** */` 한 줄, hook 내부는 선언·실행 단계마다 `//` 한 줄(AGENTS.md 6·7번). | Structure/Comment 통과 | none |
| A11Y-CORE24-001 | PASS | 정적 판정 — 모든 control이 native `input[type=radio]`/`button`이며 `fieldset`+`legend`로 묶여 있다. 관찰값은 `dt`/`dd` + `output aria-labelledby`로 이름이 연결된다. 상태 변화는 lab마다 `role="status"` 하나로만 알린다. 색만으로 정보를 전달하는 곳이 없다(복원 상태도 `복원됨 (1)` 텍스트, probe 블록도 점선 테두리 + 문장 병기). 두 lab CSS에 `:focus-visible` outline이 있다. 표는 `overflow-x: auto` 래퍼 안에 있고, 720px 이하에서 lab 그리드가, 860px 이하에서 페이지 그리드가 단일 열로 접힌다. | 정적 Accessibility 통과 | 실제 조작은 `A11Y-CORE24-003` |
| MOTION-CORE24-001 | PASS | 정적 판정 — 두 lab 모두 **자동 재생이 없다.** `GlobalTimeScaleLab`은 `paused: true` Tween을 준비만 하고 버튼을 눌러야 재생한다. `TickerListenerLab`은 붙이지 않으면 아무 일도 일어나지 않고, 기본 mode가 가장 조용한 `once`다. `useReducedMotion()`을 두 hook 모두에서 사용한다 — 전자는 `effectiveDuration = 0` + 전역 값 미변경, 후자는 표시 간격 0.1초 → 0.5초. 두 경우 모두 그 사실을 화면 문구로 알린다. | 정적 Motion 통과 | 실제 전환 확인은 `A11Y-CORE24-003` |
| BUILD-CORE24-001 | PASS | 2026-08-05 `npx tsc --noEmit` **exit 0**(저장소 전체). `gsap-root-clock` 경로 오류 **0건**을 grep으로 별도 확인했다. 이 페이지만 포함한 scoped tsconfig(`extends` 저장소 tsconfig)로도 exit 0. `npm run build` · `npm run build-storybook`은 이 작업 범위에서 금지되어 실행하지 않았다. | Build/Integration 통과(이 페이지 범위) | 소유자가 전체 배치 완료 후 full build 1회 |
| BUILD-CORE24-002 | ADDRESSED | 구현 중간(2026-08-04) 전체 `tsc`가 exit 2였다. 원인은 같은 시점에 다른 컨텍스트가 작성 중이던 `gsap-context`의 미완성 import 2건이었고 이 페이지와 무관했다. 당시 scoped tsconfig로 이 페이지의 exit 0을 확인해 두었고, 2026-08-05 재실행에서 해당 페이지가 완성되어 전체도 exit 0이 되었다. | 오판 방지 | none |
| XPAGE-CORE24-001 | PASS | 개별 `timeScale()`은 `tween-playhead`, `vars`는 `gsap-to`, 설정 출처는 `tween-configuration`, 전체 지도는 `gsap-core-map`이 소유하도록 `BoundariesSection`에서 링크로 넘겼다. 링크는 전부 `toHref()`를 거쳐 배포 base를 반영하고, 대상 4개 모두 `routes.ts`에 이미 등록된 slug다. Timeline 생성과 `delayedCall` 전체 명세는 미구현 페이지 소유로 명시하고 링크를 걸지 않았다. | Cross-page Consistency 통과 | none |
| A11Y-CORE24-002 | DEFERRED → PASS | `TickerListenerLab`의 표시 간격 throttle이 실제 브라우저 rAF(약 60fps)에서 의도대로 숫자 갱신을 줄이는지 — Node 측정치(약 238 ticks/sec)와 조건이 달라 브라우저 확인이 필요하다. 표시값은 전부 관찰값이라 결과가 달라도 거짓을 표시하지는 않는다. | 소유자 일괄 브라우저 검수 대상 | 브라우저에서 `once: false` 모드로 숫자 갱신 빈도 확인 |
| A11Y-CORE24-003 | DEFERRED → PASS | 키보드 이동·포커스 표시·control 조작, `prefers-reduced-motion` 실제 전환 동작, 320/390px 실제 레이아웃과 overflow, 두 lab control의 실제 조작 결과 | 소유자 일괄 브라우저 검수 대상 | 전체 페이지 완성 후 일괄 확인 |
| GLOBAL-CORE24-005 | DEFERRED → PASS | 전역 복원 4중 경로 중 **브라우저에서만 확인 가능한 두 가지** — ① `실행하기` 도중 배속 radio를 바꿨을 때 `useGSAP` cleanup이 실제로 1로 복원하는지, ② 실행 도중 다른 레슨으로 이동(unmount)했다가 돌아왔을 때 전역 값이 1인지. 코드 경로는 `GLOBAL-CORE24-001`에서 확인했고 `useGSAP`의 cleanup 계약은 저장소의 다른 페이지에서 이미 쓰이는 패턴이지만, 실제 전환은 조작이 필요하다. | 소유자 일괄 브라우저 검수 대상 | **브라우저 검수 시 최우선 확인 항목** — 화면의 `전역 값 복원 상태` 칸이 `복원됨 (1)`인지 본다 |

### verificationEvidence

- 공식 원문 대조 — 2026-08-04, 네 canonical URL 직접 조회. 1차 요약 조회 후 **"각 항목을 한 줄씩 원문 인용하고 없으면 NOT PRESENT라고 답하라"** 형식의 2차 조회를 세 페이지에 수행(`SRC-CORE24-002`), `exportRoot()` signature 부재는 3차 표적 조회로 확정(`SRC-CORE24-003`).
- runtime probe — 2026-08-04, `node`로 설치본 GSAP 3.15.0을 import해 실행. 스크립트는 호출과 결과를 한 묶음으로 출력하도록 작성했고 `PROBE-CORE24-001`~`010`의 숫자는 그 출력 그대로다. **모든 probe finding에 측정 방법과 재현 조건을 함께 적었다.** 환경 종속적인 수치(`PROBE-CORE24-008`)는 그 사실을 finding과 화면 양쪽에 명시했다.
- 소스 확인 — `node_modules/gsap/gsap-core.js`의 `fps` · `lagSmoothing` · `add` · `exportRoot` 정의와 `node_modules/gsap/types/gsap-core.d.ts`의 `Ticker` interface · `exportRoot` · `updateRoot` 선언을 직접 읽음. 여기서 나온 사실은 전부 `origin: 'implementation'`으로 분리했다.
- 정합성 대조 — 2026-08-05, meta 섹션 `sourceItems` 합(50) = catalog `origin: 'official'` 행 수(50) = meta `officialSourceItems`(50), source 4종 전부 catalog에 등장, 중복 ID 0건, 미등록 `sectionId` 0건.
- 타입 검사 — 2026-08-05 `npx tsc --noEmit` **exit 0**(저장소 전체), `gsap-root-clock` 경로 오류 0건.
- TSX의 gsap 미사용 확인 — 2026-08-05, `grep -rn "^import .*from 'gsap'" ... --include="*.tsx"` 결과 0건.

### releaseDecision

`PASS` — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

**브라우저 검수 시 최우선 확인 항목은 `GLOBAL-CORE24-005`다.** 이 페이지는 앱 전역 값(`gsap.globalTimeline.timeScale()`)을 바꾸는 유일한 학습 페이지이므로, 복원이 실패하면 이 페이지뿐 아니라 다른 레슨의 animation까지 느려진 채 남는다. 확인 방법은 간단하다 — `GlobalTimeScaleLab`에서 0.25배로 실행한 뒤 배속을 바꾸거나 다른 레슨으로 이동했다 돌아와서, 화면의 `전역 값 복원 상태` 칸이 `복원됨 (1)`인지 본다.

라우팅 등록(`src/app/routes.ts`)은 이 컨텍스트의 작업 범위 밖이며 저장소 소유자가 수행한다. 등록 전까지 이 페이지는 앱에서 접근되지 않는다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 재감사

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| RDS-CORE24-002 | ADDRESSED | `GlobalTimeScaleLab` 표시 코드에 실제 `report()` getter, paused Tween·callback·restart와 dependency/unmount 전역 복원을 반영했고, `TickerListenerLab`은 once wrapper 반환값을 제거하도록 맞췄다 | 표시 코드로 전역 복원과 listener 제거 계약을 재현할 수 있다 | none |
| SCOPE-CORE24-001 | ADDRESSED | 전역 배속 예제가 `gsap.utils.toArray(selector)`로 문서 전체를 조회했다. `scope.current.querySelector()`로 제한하고 scope 부재 시 실행을 건너뛴다 | 다른 페이지의 같은 class를 잘못 잡을 가능성을 제거한다 | none |
| PED-CORE24-002 | ADDRESSED | 첫 화면의 내부 집계 용어를 `대조한 공식 문서`·`핵심 동작`으로 바꾸고 meta 요약의 모호한 의인화를 실제 clock 구조로 바꿨다 | 학습자가 구현 구조를 바로 읽는다 | none |
| SRC-CORE24-004 | PASS | 2026-08-13 globalTimeline·ticker·exportRoot()·updateRoot() 공식 페이지를 다시 조회했다. ticker callback·once·prioritize와 root/export 계약에 충돌 없음 | 공식 근거 최신성 확인 | none |
| BROWSER-CORE24-004 | DEFERRED | 전역 timeScale 복원, 실제 rAF 갱신, 키보드·반응형 조작은 수행하지 않았다 | 브라우저 관점은 판정하지 않는다 | 승인된 브라우저 검수에서 확인 |

### verificationEvidence

- 공식 문서: `https://gsap.com/docs/v3/GSAP/gsap.globalTimeline/`, `https://gsap.com/docs/v3/GSAP/gsap.ticker/`, `https://gsap.com/docs/v3/GSAP/gsap.exportRoot()/`, `https://gsap.com/docs/v3/GSAP/gsap.updateRoot()/` (2026-08-13 확인).
- Runtime/Display: 두 hook의 생성·등록·정리 호출과 TSX 표시 코드를 정적으로 대조했다.
- Storybook: `N/A` — c309e13에서 의도적으로 삭제되어 실행 대상이 아니다.

### releaseDecision

`PASS with DEFERRED` — 정적 BLOCK은 수정했으며 브라우저 관점만 `DEFERRED`다.

## 2026-08-13 최종 교차검토

- `RDS-CORE24-005` — **PASS**: GlobalTimeScaleLab의 target guard·전역 배속 복원과 TickerListener의 stop/unmount 해제를 표시 코드에 반영해 runtime과 다시 대조했다.
- Static BLOCK: 없음. Browser: 사용자 승인 전 실조작을 수행하지 않아 `DEFERRED`. Storybook: c309e13에서 삭제되어 `N/A`.
- overallDecision: `NOT VERIFIED`
- releaseDecision: `NOT VERIFIED`
