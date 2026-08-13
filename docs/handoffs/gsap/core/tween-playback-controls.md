# Tween playback controls handoff

## 입력 계약

### objective

여덟 개의 Tween 메서드를 나열식 레퍼런스로 늘어놓지 않고 **"지금 이 Tween을 어떻게 하고 싶은가"**라는 학습자 의도로 묶는다.

먼저 `paused`(Tween 자체가 멈췄는가), `reversed`(역방향으로 재생하도록 설정됐는가), `isActive()`(playhead와 자신·조상 timeline 상태를 종합했을 때 실제 재생 중인가)를 구분한다. `paused`와 `reversed`만으로 전체 재생 상태가 정해진다고 과장하지 않는다.

초보자가 가장 많이 막히는 두 지점을 별도 단계로 분리한다. 하나는 **`play()`와 `resume()`의 차이가 방향 하나**라는 것이고, 다른 하나는 **`paused()`·`reversed()`가 인자 개수로 getter와 setter를 가른다**는 것이다. `pause()`(명령)와 `paused()`(상태)는 글자 하나 차이라 반드시 갈라서 가르친다.

### officialPage

- title: `isActive` + `pause` + `paused` + `play` + `restart` + `resume` + `reverse` + `reversed`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/Tween/isActive()`
  - `https://gsap.com/docs/v3/GSAP/Tween/pause()`
  - `https://gsap.com/docs/v3/GSAP/Tween/paused()`
  - `https://gsap.com/docs/v3/GSAP/Tween/play()`
  - `https://gsap.com/docs/v3/GSAP/Tween/restart()`
  - `https://gsap.com/docs/v3/GSAP/Tween/resume()`
  - `https://gsap.com/docs/v3/GSAP/Tween/reverse()`
  - `https://gsap.com/docs/v3/GSAP/Tween/reversed()`
- reviewedAt: `2026-08-13` (여덟 canonical 현재 본문 재대조)
- category: `Fundamentals > Tween`
- slug: `tween-playback-controls`
- sourcePageIds: primary `source:tween-is-active`; related `source:tween-pause`, `source:tween-paused`, `source:tween-play`, `source:tween-restart`, `source:tween-resume`, `source:tween-reverse`, `source:tween-reversed`

여덟 페이지 모두 짧은 메서드 문서다. heading 구조는 `<메서드명>` → (`Parameters`) → `Returns : <타입>` → `Details`이다.

- `isActive()`와 `resume()`에는 **Parameters 절이 없다.** 두 페이지의 heading 목록을 직접 조회해 확인했다.
- `play()`와 `resume()`에만 callout이 있다(둘 다 timeScale 0에 관한 tip/note). 나머지 여섯 페이지에는 note/tip/warning callout이 **없다.**
- `resume()` 페이지에는 독립된 코드 예제 블록이 **없다.** Note 안의 한 줄이 유일한 코드다.
- 공식 문서 자체의 표현 오류 두 곳을 **고치지 않고 원문 그대로** 옮긴다. `reverse()` Details의 "Calling `reverse()` also ensures that the instance is neither paused nor reversed."와 `restart()`의 `suppressEvents` 설명이 존재하지 않는 "`time` 파라미터"를 가리키는 것이다. `paused()` Details의 오타(`anscestor`, `ancenstor`)도 인용 시 그대로 둔다.

### sourceManifest

**authority는 `src/content/gsap/fundamentals/tween-playback-controls/tween-playback-controls.catalog.ts`다.** 66개 공식 item과 현재 학습 내용에 필요한 3개 실행 확인 item의 전체 문장·source·section 귀속이 그 파일 한 곳에 있다. 이 문서는 분포만 고정한다.

item ID 규칙: `ISA`(isActive), `PAU`(pause), `PSD`(paused), `PLY`(play), `RST`(restart), `RSM`(resume), `RVS`(reverse), `RVD`(reversed), `PB`(공식 미게시 또는 실행 불일치).

source별 공식 item 수:

| sourcePageId | 메서드 | ID 접두사 | 공식 item | sourceStatus |
| --- | --- | --- | --- | --- |
| `source:tween-is-active` (primary) | `isActive()` | `ISA` | 9 | verified |
| `source:tween-pause` | `pause()` | `PAU` | 7 | verified |
| `source:tween-paused` | `paused()` | `PSD` | 11 | verified |
| `source:tween-play` | `play()` | `PLY` | 9 | verified |
| `source:tween-restart` | `restart()` | `RST` | 6 | verified |
| `source:tween-resume` | `resume()` | `RSM` | 4 | verified |
| `source:tween-reverse` | `reverse()` | `RVS` | 12 | verified |
| `source:tween-reversed` | `reversed()` | `RVD` | 8 | verified |
| **합계** | | | **66** | |

섹션별 분배(공식 item만 분모에 넣는다):

| sectionId | 로컬 제목 | 공식 item | 실행 확인 item | 구성 |
| --- | --- | --- | --- | --- |
| `playback-model` | 멈춤·방향·실제 재생 상태 구분하기 | 14 | 0 | ISA 5 + PSD 6 + RVD 3 |
| `stop-and-go` | 멈추고 다시 움직이기 | 20 | 1 | PAU 7 + PLY 9 + RSM 4 |
| `restart-from-start` | 처음으로 되감고 다시 재생하기 | 6 | 0 | RST 6 |
| `reverse-direction` | 방향을 뒤집기 | 12 | 2 | RVS 12 |
| `state-getters` | 같은 이름으로 읽기도 하고 쓰기도 한다 | 14 | 0 | ISA 4 + PSD 5 + RVD 5 |
| `boundaries` | 다음에 이어서 볼 개념 | 0 | 0 | 관련 학습 링크 |
| **합계** | | **66** | **3** | |

`paused`·`reversed`·`isActive`의 item이 두 섹션으로 갈리는 것은 의도적이다. **의미**(무엇을 뜻하는 값인가)는 `playback-model`이, **호출 형태**(signature·인자·반환)는 `state-getters`가 소유한다. 같은 item을 두 곳에서 세지 않는다.

### sourceBlockers

`none`. 66개 기술 item 전부 canonical 원문으로 직접 확인했다. 요약 압축을 막기 위해 여덟 URL 전부에 **"본문을 줄 단위로 그대로 덤프하고, 항목별로 원문 인용 또는 `NOT PRESENT`로 답하라"** 형식의 2차 조회를 돌렸다. 1차 요약이 빠뜨렸다가 2차 조회로 되살아난 item이 5개다(`SRC-CORE13-002` 참고).

다음은 여덟 페이지가 **게시하지 않은** 내용이므로 주장하지 않는다. 필요해지면 `blocked-source` item을 추가하고 release를 `BLOCK`한다.

- `restart()`가 `paused`·`reversed` 스위치를 어떻게 바꾸는지
- `paused(false)`와 `resume()`의 차이
- `reversed`의 초기값을 `vars`로 주는 방법 (`paused: true`만 게시돼 있다)
- `isActive()`에 인자를 넘겼을 때의 처리
- `from`·`atTime`에 Timeline label을 넘겼을 때의 정확한 해석 (가능하다는 언급만 있다)
- `suppressEvents: false`일 때 실제로 어떤 콜백이 어떤 순서로 발화하는지
- 브라우저·버전 지원 표, `timeScale`·`kill`의 계약 전체

### moduleSelection

| module | 목적 | 근거 source |
| --- | --- | --- |
| 개념·가이드 (`CI`) | `paused`·`reversed`·`isActive()`의 서로 다른 의미와 조상 timeline 경계를 설명한다. | 여덟 source |
| callable method (`CM`) | 여덟 메서드의 signature·인자·기본값·반환·호출 시점을 의도별로 묶어 대조한다. 미게시 칸은 명시한다. | 여덟 source |

`gsap.to()` 속성 카탈로그 형식을 복제하지 않는다. ease visualizer, 설치 모듈, Timeline 모듈, `properties.ts` 파일을 추가하지 않는다.

### learnerFlow

| id | 학습자 질문 | sourceItemIds |
| --- | --- | --- |
| `flow:what-changes` | 이 메서드들이 대체 무엇을 건드리나요? | PSD-02, RVD-02 |
| `flow:ancestors` | 값은 false인데 왜 멈춘 것처럼 보이나요? | PSD-05, PSD-06, RVD-03, RVD-04 |
| `flow:really-moving` | "지금 실제로 움직이나"는 무엇으로 아나요? | ISA-03, ISA-04, ISA-05, ISA-06, ISA-07 |
| `flow:parent-cost` | 멈춘 Tween은 부모 timeline에서 어떻게 되나요? | PSD-07 |
| `flow:complete-state` | 끝나면 자동으로 멈춤 상태가 되나요? | PSD-08 |
| `flow:initial-paused` | 처음부터 멈춘 채로 만들려면? | PSD-10 |
| `flow:stop` | 지금 멈추고 싶은데 어디서 멈추나요? | PAU-01~07 |
| `flow:play-vs-resume` | 다시 움직이는 방법이 왜 둘인가요? | PLY-02, PLY-03, RSM-02 |
| `flow:jump-args` | 인자를 주면 무엇이 달라지나요? | PAU-03, PAU-06, PLY-04, PLY-07 |
| `flow:suppress` | 건너뛴 콜백은 어떻게 되나요? | PAU-04, PLY-05, RVS-07, RST-04 |
| `flow:timescale-zero` | 속도가 0이면 재생이 되나요? | PLY-08, RSM-04, PB-05 |
| `flow:from-zero` | 처음부터 다시 보려면? delay는 또 기다리나요? | RST-01~06 |
| `flow:flip` | 열었던 걸 닫으려면 새 Tween이 필요한가요? | RVS-02, RVS-03, RVS-04, RVS-12 |
| `flow:reverse-origin` | reverse(0)은 처음인가요 끝인가요? | RVS-06, RVS-09, PB-02 |
| `flow:reverse-state` | reverse()를 부르면 상태가 어떻게 되나요? | RVS-05, RVS-10, PB-01 |
| `flow:two-faces` | 괄호에 값을 넣고 안 넣고가 왜 다른가요? | PSD-01, PSD-03, PSD-04, RVD-01, RVD-05, RVD-06, RVD-07 |
| `flow:toggle` | 토글을 한 줄로 어떻게 쓰나요? | PSD-09, PSD-11, RVD-08 |
| `flow:read-only` | isActive()는 왜 값을 못 넣나요? | ISA-01, ISA-02 |
| `flow:guard` | 재생 중 중복 클릭을 어떻게 막나요? | ISA-08, ISA-09 |
| `flow:chaining` | 점을 찍어 이어 쓸 수 있는 건 어느 쪽인가요? | PAU-05, PLY-06, RSM-03, RST-05, RVS-08 |

### coverageMap

`sourceItemId` → `localEvidence` 대응은 catalog의 `sectionId` 열이 authority다. 아래는 섹션 단위 요약이며, 모든 item의 `localStatus`는 `covered`다.

| sourceItemIds | localEvidence | localStatus |
| --- | --- | --- |
| PSD-02, RVD-02 | `PlaybackModelSection.tsx` 두 상태 비교표 "정하는 것" 열 | covered |
| PSD-05, PSD-06, RVD-03, RVD-04 | `PlaybackModelSection.tsx` 상태 표 "조상 timeline을 보나?" 열 + 경고 블록 | covered |
| PSD-07 | `PlaybackModelSection.tsx` "멈춘다고 부모에서 빠지지는 않습니다" note 첫 문단 | covered |
| PSD-08 | `PlaybackModelSection.tsx` "끝까지 재생돼도 paused 값은 그대로입니다" 블록 | covered |
| PSD-10 | `PlaybackModelSection.tsx` 상태 표 "처음 값 주기" 열 | covered |
| ISA-03~07 | `PlaybackModelSection.tsx` active 판정표 6행 + note 둘째 문단(ISA-07) | covered |
| PAU-01, PLY-01, RSM-01 | `StopAndGoSection.tsx` signature 블록 3줄 + 반환·빈 괄호 해설 | covered |
| PAU-02, PLY-02, PLY-03, RSM-02 | `StopAndGoSection.tsx` 세 명령 비교표 + "둘의 차이는 방향 하나입니다" 경고 | covered |
| PAU-03, PAU-04, PLY-04, PLY-05 | `StopAndGoSection.tsx` 인자 계약표 2행 | covered |
| PAU-06, PLY-07 | `StopAndGoSection.tsx` "왜 기본값이 실행하지 않음일까요" note (레코드플레이어 비유) | covered |
| PAU-05, PLY-06, RSM-03 | `StopAndGoSection.tsx` signature 아래 `: self` 해설 문단 | covered |
| PAU-07, PLY-09 | `StopAndGoSection.tsx` 공식 코드 6줄 원문 블록 | covered |
| PLY-08, RSM-04 | `StopAndGoSection.tsx` "timeScale이 0일 때의 공식 tip" 블록 첫 문단 (원문 병기) | covered |
| RST-01, RST-05 | `RestartSection.tsx` signature 블록 | covered |
| RST-02 | `RestartSection.tsx` 도입 문단 | covered |
| RST-03 | `RestartSection.tsx` 인자 계약표 + delay 1초 예시 코드 + 호출 비교표 | covered |
| RST-04 | `RestartSection.tsx` 인자 계약표 + "time 파라미터" 표현 불일치 note | covered |
| RST-06 | `RestartSection.tsx` 공식 코드 2줄 원문 블록 | covered |
| RVS-01, RVS-08 | `ReverseDirectionSection.tsx` signature 블록 | covered |
| RVS-02, RVS-03, RVS-04 | `ReverseDirectionSection.tsx` 도입 문단 2개 | covered |
| RVS-05 | `ReverseDirectionSection.tsx` "공식 문장 하나가 실행과 반대입니다" 블록 (원문 인용) | covered |
| RVS-06, RVS-07 | `ReverseDirectionSection.tsx` 인자 계약표 2행 | covered |
| RVS-09 | `ReverseDirectionSection.tsx` "reverse(0)은 처음이 아니라 끝입니다" 경고 | covered |
| RVS-10 | `ReverseDirectionSection.tsx` 토글 코드 아래 해설 문단 | covered |
| RVS-11 | `ReverseDirectionSection.tsx` 인자 계약표 `suppressEvents` 행 (02단계 비유 참조) | covered |
| RVS-12 | `ReverseDirectionSection.tsx` 공식 코드 5줄 + 토글 패턴 2형태 원문 블록 | covered |
| PSD-01, PSD-04, RVD-01, RVD-06 | `StateGetterSection.tsx` signature 블록 + `[Boolean | self]` 해설 | covered |
| PSD-03, RVD-05, RVD-07 | `StateGetterSection.tsx` 두 얼굴 비교표 + getter/setter 공식 문장 문단 | covered |
| PSD-09 | `StateGetterSection.tsx` "토글이 한 줄로 되는 이유" note 둘째 문단 | covered |
| PSD-11, RVD-08 | `StateGetterSection.tsx` 공식 예제 2단 블록 + chaining 코드 블록 | covered |
| ISA-01, ISA-02 | `StateGetterSection.tsx` signature 블록 셋째 줄 + 두 얼굴 표 "읽기 전용" 행 | covered |
| ISA-08 | `StateGetterSection.tsx` "공식 데모가 보여주는 쓰임" 소제목 문단 | covered |
| ISA-09 | `StateGetterSection.tsx` `globalTimeline` 코드 블록 | covered |
| PB-01, PB-02 | `ReverseDirectionSection.tsx` 호환성 차이 블록; `DirectionFlipLab` 관찰 패널 | covered (probe) |
| PB-05 | `StopAndGoSection.tsx` timeScale 0 주의 블록 | covered (probe) |

`PB-*` 3개는 공식 item이 아니다. coverage 분모(66)에 포함하지 않는다. 학습자 화면에는 내부 coverage 수치를 노출하지 않는다.

### relatedPages

- `gsap-to` — Tween 생성과 `vars` 전체 계약을 소유한다. 이 페이지는 `gsap.to()`를 전제로만 쓴다.
- `tween-playhead` — `time()`·`progress()`·`totalProgress()`·`seek()`의 좌표계를 소유한다. 이 페이지는 관찰값으로만 표시하고 의미 정의를 링크로 넘긴다.
- `tween-callbacks-promise` — 각 콜백이 언제 불리는지를 소유한다. `suppressEvents`가 억제하는 대상이다.
- `tween-configuration` — `delay`를 포함한 설정의 출처와 적용 범위를 소유한다. `restart(true)`가 존중하는 값이다.
- `easing` — ease 곡선의 의미를 소유한다. `reverse()`가 뒤집는 대상이다.
- Timeline 학습 페이지(미구현) — 같은 이름의 Timeline 메서드와 label 인자 문법을 소유한다. 이 페이지는 문장으로 경계만 남긴다.

## 구현 계약

### exactFiles

create (21):

```text
src/content/gsap/fundamentals/tween-playback-controls/TweenPlaybackControlsPage.tsx
src/content/gsap/fundamentals/tween-playback-controls/TweenPlaybackControlsPage.css
src/content/gsap/fundamentals/tween-playback-controls/tween-playback-controls.meta.ts
src/content/gsap/fundamentals/tween-playback-controls/tween-playback-controls.catalog.ts
src/content/gsap/fundamentals/tween-playback-controls/components/PageCoverage/PageCoverage.tsx
src/content/gsap/fundamentals/tween-playback-controls/components/SectionHeading/SectionHeading.tsx
src/content/gsap/fundamentals/tween-playback-controls/sections/PlaybackModelSection/PlaybackModelSection.tsx
src/content/gsap/fundamentals/tween-playback-controls/sections/StopAndGoSection/StopAndGoSection.tsx
src/content/gsap/fundamentals/tween-playback-controls/sections/RestartSection/RestartSection.tsx
src/content/gsap/fundamentals/tween-playback-controls/sections/ReverseDirectionSection/ReverseDirectionSection.tsx
src/content/gsap/fundamentals/tween-playback-controls/sections/StateGetterSection/StateGetterSection.tsx
src/content/gsap/fundamentals/tween-playback-controls/sections/BoundariesSection/BoundariesSection.tsx
src/content/gsap/fundamentals/tween-playback-controls/examples/StopAndGoLab/StopAndGoLab.tsx
src/content/gsap/fundamentals/tween-playback-controls/examples/StopAndGoLab/StopAndGoLab.css
src/content/gsap/fundamentals/tween-playback-controls/examples/StopAndGoLab/useStopAndGoAnimation.ts
src/content/gsap/fundamentals/tween-playback-controls/examples/DirectionFlipLab/DirectionFlipLab.tsx
src/content/gsap/fundamentals/tween-playback-controls/examples/DirectionFlipLab/DirectionFlipLab.css
src/content/gsap/fundamentals/tween-playback-controls/examples/DirectionFlipLab/useDirectionFlipAnimation.ts
src/content/gsap/fundamentals/tween-playback-controls/examples/StateReadoutLab/StateReadoutLab.tsx
src/content/gsap/fundamentals/tween-playback-controls/examples/StateReadoutLab/StateReadoutLab.css
src/content/gsap/fundamentals/tween-playback-controls/examples/StateReadoutLab/useStateReadoutAnimation.ts
```

섹션 전용 CSS는 만들지 않았다. 섹션 공통 표시 규칙은 `TweenPlaybackControlsPage.css`가 소유한다(`non-css-target-values`·`tween-callbacks-promise` 선례와 동일).

modify: `none`. `src/app/routes.ts` 등록은 저장소 소유자가 별도로 수행한다.

### exampleContracts

예제는 셋이며 각자 hook을 소유한다. 셋 다 **DOM element가 아니라 평범한 객체**(`{ value: 0 }`)를 tween한다. 재생 제어를 배우려면 duration이 필요한데, 모션 감소 설정에서 duration을 0으로 만들면 배울 것이 사라지기 때문이다. 대신 표시자 렌더링만 끄고 Tween과 숫자는 그대로 둔다.

#### `StopAndGoLab`

- goal: 역방향으로 설정한 하나의 Tween에 `resume()`과 `play()`를 각각 눌러, 멈춤은 똑같이 풀리는데 방향만 갈리는 것을 관찰한다.
- question: 멈춘 Tween을 다시 움직이는 세 명령은 무엇이 다른가요?
- representation: 가로 트랙 위 표시자 + 상태 4칸 관찰 패널 + 마지막 호출 코드 패널
- controls: `play()`·`pause()`·`resume()` 버튼, `reversed(true)` 준비 버튼, 점프 시각 range(0–3초, 0.1 단위)와 `play(from)`·`pause(atTime)` 버튼
- runtimeSource: `useStopAndGoAnimation.ts`
- sourcePath: `examples/StopAndGoLab/useStopAndGoAnimation.ts`
- runtimeOwnership: hook이 고정 duration·점프 시각을 담은 descriptor, 버튼을 누른 순간의 인자를 고정한 `lastAction`, `paused: true`로 만든 Tween 하나, Tween에서 직접 읽은 관찰값을 소유한다. scoped `useGSAP` 한 개, dependency 없이 한 번만 생성.
- displayOwnership: TSX가 `lastAction`을 호출 문법으로 직렬화하고 controls·관찰 패널·학습 문단을 소유한다. 상태를 다시 계산하지 않는다.
- coveredSourceItemIds: 관찰 근거로 PLY-03, RSM-02, PAU-03, PLY-04를 보강한다(섹션이 1차 근거).
- accessibility: native button·labeled range + 연결된 `<output>`, 상태는 polite live region(`role="status"`) 하나이며 관찰 `<dl>`은 중복 낭독을 막기 위해 일반 `<dd>`를 쓴다. 작은 화면에서는 1열로 전환한다.
- motion: 자동 재생 없음. `useReducedMotion()`이 켜지면 움직이는 표시자를 렌더하지 않고 위치를 문장과 숫자로만 알린다. Tween·duration·관찰값은 두 모드에서 동일하다.

#### `DirectionFlipLab`

- goal: 같은 `reverse()`를 인자만 바꿔 부르며 되감기 시작 지점이 어디로 정해지는지, 그리고 어느 경우든 `reversed()`가 `true`가 되는 것을 관찰한다.
- question: reverse()는 어디서부터 되감고 상태를 어떻게 바꾸나요?
- representation: 가로 트랙 위 표시자 + 상태 4칸 관찰 패널 + 마지막 호출 코드 패널
- controls: 놓아 둘 시각 range(0–3초, 0.1 단위)와 `pause(atTime)` 버튼, `reverse()`·`reverse(0)`·`reverse(-1)` 버튼, `play()` 버튼
- runtimeSource: `useDirectionFlipAnimation.ts`
- sourcePath: `examples/DirectionFlipLab/useDirectionFlipAnimation.ts`
- runtimeOwnership: hook이 고정 duration·배치 시각·음수 인자 값을 담은 descriptor, 버튼을 누른 순간의 인자를 고정한 `lastAction`, `paused: true` Tween 하나, Tween에서 직접 읽은 관찰값을 소유한다. scoped `useGSAP` 한 개, dependency 없이 한 번만 생성.
- displayOwnership: TSX가 `lastAction`을 호출 문법으로 직렬화하고 버튼 라벨·관찰 패널·학습 문단을 소유한다. `time` 값을 계산하지 않고 Tween이 보고한 값만 표시한다.
- coveredSourceItemIds: 관찰 근거로 RVS-04, RVS-09, PB-01, PB-02를 보강한다(섹션이 1차 근거).
- accessibility: `StopAndGoLab`과 동일 규칙. 되감기 버튼은 라벨 아래 `<small>`로 시작 지점을 함께 안내한다.
- motion: 자동 재생 없음. reduced-motion 처리는 `StopAndGoLab`과 동일.

#### `StateReadoutLab`

- goal: 같은 이름의 메서드를 괄호를 비우고도 부르고 값을 넣고도 불러, 돌려받는 것이 Boolean인지 Tween 자신인지를 `===` 비교 결과로 확인한다.
- question: 괄호 안에 값을 넣고 안 넣고가 왜 완전히 다른 일인가요?
- representation: 가로 트랙 위 표시자 + **반환값 전용 패널**(호출식·돌려받은 것·getter/setter 판정) + 상태 4칸 관찰 패널
- controls: `paused()`·`reversed()`·`isActive()` 읽기 버튼 3개, `paused(false)`·`paused(true)`·`reversed(!reversed())` 쓰기 버튼 3개, `pause(1.5)` 되돌리기 버튼
- runtimeSource: `useStateReadoutAnimation.ts`
- sourcePath: `examples/StateReadoutLab/useStateReadoutAnimation.ts`
- runtimeOwnership: hook이 고정 duration·시작 시각 descriptor, 1.5초 지점에 멈춰 둔 Tween 하나, **호출이 실제로 돌려준 값**과 그것이 Tween 자신인지의 `===` 판정, 관찰값, 마지막 command를 소유한다. scoped `useGSAP` 한 개, dependency 없이 한 번만 생성.
- displayOwnership: TSX가 command → 호출 문법 매핑, 반환값 문구, 학습 문단을 소유한다. 반환 종류를 추론하지 않고 hook의 `===` 판정 결과만 표시한다.
- coveredSourceItemIds: 관찰 근거로 PSD-03, PSD-09, RVD-07, ISA-02를 보강한다(섹션이 1차 근거).
- accessibility: native button, 반환값과 관찰 `<dl>`은 일반 요소로 두고 아래 `role="status"` 문단 하나가 변경을 낭독한다. 작은 화면에서는 1열로 전환한다.
- motion: 자동 재생 없음. reduced-motion 처리는 나머지 두 lab과 동일.

### nonGoals

- `timeScale()`과 `kill()`의 계약을 이 페이지에서 소유하지 않는다. `play()`·`resume()` 문서가 직접 언급한 timeScale 0 부분만 보존한다.
- Timeline의 같은 이름 메서드와 label 인자 문법을 다루지 않는다.
- `time()`·`progress()`의 의미를 정의하지 않는다. 관찰값으로만 표시하고 owner 페이지로 링크한다.
- 공식 문서의 표현 오류를 고쳐 쓰지 않는다. 원문을 그대로 옮기고 실행 결과를 분리해 병기한다.
- 세 lab을 공용 generic runtime hook으로 합치지 않는다. `PlaybackObservation` 형태가 비슷해도 각 hook이 자기 타입을 소유한다.
- 자동 재생을 넣지 않는다. 세 Tween 모두 `paused: true`로 만들고 버튼으로만 움직인다.

### preserve

- `src/app/routes.ts` — 수정하지 않았다.
- `src/components/` 공용 컴포넌트(`OfficialDocsLink`, `useReducedMotion`) — 변경 없음.
- 다른 페이지 폴더 — 변경 없음.
- `master-page-inventory.md`의 소유권 행.

## 검증 계약

### verifiedPerspectives

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion, Cross-page Consistency를 정적으로 판정했다. Vite·Storybook 전역 빌드는 2026-08-13 메인 통합에서 PASS했고 브라우저 실조작은 `NOT VERIFIED`다.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-CORE13-001 | PASS | 2026-08-04에 여덟 canonical을 직접 조회하고, 2026-08-05에 "본문 줄 단위 덤프 + 항목별 원문 인용 또는 `NOT PRESENT`" 형식으로 전부 재조회해 66개 item을 확정했다. | blocker 없이 구현 가능 | 미게시 칸은 `공식 페이지에 명시 없음`으로 표시 |
| SRC-CORE13-002 | ADDRESSED | 1차 요약 조회가 item 5개를 통째로 빠뜨렸다. `isActive()`에서 데모 설명 문단(ISA-08)과 `gsap.globalTimeline.getChildren().filter(...)` 한 줄(ISA-09), `paused()`에서 부모 timeline 예시 문장(PSD-06), "현재 상태를 확인하려면 반드시 `paused()`를 써야 한다 + 토글" 문단(PSD-09의 뒷부분), "`vars`에 `paused: true`로 초기값을 줄 수 있다"(PSD-10)와 chaining 예시 `myAnimation.paused(true).delay(2).timeScale(0.5)`(PSD-11의 뒷부분)이다. 2차 인용 강제 조회에서 전부 실재함을 확인했다. | 존재하는 공식 item 5개를 누락할 뻔했다 | 되살린 item을 `playback-model`·`state-getters`에 편입하고 분모를 61→66으로 정정 |
| SRC-CORE13-003 | PASS | 공식 문서 자체의 표현 오류 3종이 원문임을 인용 강제 질의로 재확인했다 — `reverse()`의 "neither paused nor reversed", `restart()` `suppressEvents`의 존재하지 않는 "`time` 파라미터", `paused()`의 오타 `anscestor`/`ancenstor`. | 원문 보존 vs 정정의 경계 | 고치지 않고 원문 그대로 인용하고, 실행 결과를 `PB-01`·`RST-04` note로 분리해 병기 |
| SRC-CORE13-004 | ADDRESSED | 2026-08-13에 여덟 canonical을 다시 열어 현재 본문을 대조하고 meta의 `reviewedAt`을 같은 날짜로 갱신했다. | 표시 대조일과 실제 확인일 불일치 해소 | none |
| OC-CORE13-001 | PASS | 공식 66/66 item이 `coverageMap`에서 파일 근거로 연결됐다. 스크립트로 meta 섹션 합계(66) = catalog `origin: 'official'` 행 수(66) = `officialSourceItems`(66), source 8종 = `officialSources`(8), 섹션별 분포 일치, 중복 ID 0건을 대조했다. | Official Coverage 통과 | none |
| LT-CORE13-001 | PASS | `paused`·`reversed`·`isActive()`의 서로 다른 의미를 먼저 구분하고, `play()`/`resume()` 대조와 getter/setter 해설로 이어 간다. `reverse(0)`은 특별한 호출 규칙으로 설명한다. | Learning Transformation 통과 | none |
| PROBE-CORE13-001 | PASS | 현재 학습 내용에 필요한 실행 확인은 `reverse()` 상태, 음수 `from`, timeScale 0의 세 항목만 catalog와 짧은 호환성 주의로 남겼다. 재현 절차 전문은 학습자 UI에서 제거했다. | 실행 차이를 가르치되 검수 일지를 본문으로 노출하지 않음 | none |
| PROBE-CORE13-002 | PASS | 2026-08-13 GSAP 3.15.0에서 `reverse()`·`reverse(0)`·음수 `from`과 timeScale 0의 `play()`를 다시 실행했다. catalog의 PB-01·02·05와 같은 결과였다. | 현재 버전과 호환성 주의가 일치함 | none |
| RDS-CORE13-001 | PASS | 세 lab 모두 hook의 descriptor·observation에서 GSAP 호출과 표시 코드가 함께 파생된다. slider 인자를 쓰는 두 lab은 버튼을 누른 순간 값을 `lastAction`에 고정하므로, 이후 slider를 바꿔도 과거 호출 코드가 바뀌지 않는다. 관찰값은 Tween에서 직접 읽고 `StateReadoutLab`의 반환 판정은 `=== tween` 비교 결과다. | Runtime/Display Sync 통과 | none |
| AUDIT-TP-001 | ADDRESSED | `PageCoverage`가 8/8 source·66/66 item·probe 수를 학습자에게 노출하고 `BoundariesSection`이 소유권·미게시 목록을 표시했다. 학습 순서 내비게이션과 관련 학습 링크로 교체했다. | 제작·검수 용어가 개념 학습을 방해하던 문제 해소 | none |
| AUDIT-TP-002 | ADDRESSED | "바꿀 수 있는 것은 스위치 두 개뿐"이라는 설명은 playhead·timeScale·조상 timeline 조건을 빠뜨렸다. 세 상태의 역할을 별도로 정의하도록 교정했다. | 과장된 멘탈 모델로 인한 사실 오류 해소 | none |
| AUDIT-TP-003 | ADDRESSED | `pause(atTime)`·`play(from)` 실행 뒤 slider를 바꾸면 표시 코드가 실행 당시 값이 아니라 새 값으로 바뀌었다. runtime의 `lastAction`이 호출 당시 인자를 소유하도록 수정했다. | runtime/display 불일치 해소 | none |
| AUDIT-TP-004 | ADDRESSED | 학습자 본문에 측정 절차·전수 경로·프레임 오차가 장문으로 노출됐다. 공식 계약은 유지하고 필요한 버전 차이만 짧은 주의로 축약했다. | 학습 흐름과 문체 개선 | none |
| AUDIT-TP-005 | ADDRESSED | 세 code panel이 선언하지 않은 `target`을 `gsap.to(target, ...)`에 넘겼다. 실제 runtime과 같은 `{ value: 0 }` 객체 선언을 표시 코드에 추가했다. | 표시 예제를 그대로 옮겨도 실행할 수 없는 결함 해소 | none |
| PED-CORE13-001 | PASS | 세 lab 모두 `무엇이 달라졌나요?`·`무엇을 봐야 하나요?`·`왜 이렇게 동작하나요?`·`실제로 언제 쓰나요?` 네 패널을 갖췄고, 실행 전에 목표와 조작 순서를 문장으로 안내한다. 한 lab이 여덟 메서드를 전부 담지 않고 의도별로 3개로 나눴다. | Pedagogy 통과 | none |
| A11Y-CORE13-001 | ADDRESSED | 세 lab의 관찰값 `<output>`과 별도 `role="status"`가 같은 상태 변경을 중복 낭독할 수 있었다. 관찰값은 일반 `<dd>`로 바꾸고 요약 live region 하나만 유지했다. | 스크린리더 중복 낭독 해소 | none |
| A11Y-CORE13-002 | PASS | 모든 control이 native `button`·`input[type=range]`이며 `fieldset`/`legend`로 묶였고 range에는 연결된 `label`과 `<output htmlFor>`이 있다. 세 lab CSS 모두 `:focus-visible` 윤곽선을 정의한다. 상태는 색이 아니라 `true`/`false` 텍스트로 전달한다. 720px에서 1열, 관찰 패널 2열로 전환한다. | 정적 Accessibility 통과 | none |
| MOTION-CORE13-001 | PASS | 세 Tween 모두 `paused: true`라 자동 재생이 없다. `useReducedMotion()`이 켜지면 움직이는 표시자를 아예 렌더하지 않고 위치를 문장·숫자로 알린다. 표시자에 CSS transition을 두지 않아 위치가 GSAP 값에서만 나온다. duration을 0으로 낮추지 않은 이유(재생 제어 학습에는 시간 구간이 필요)를 `exampleContracts`에 남겼다. | Motion 통과 | none |
| STRUCT-CORE13-001 | PASS | 페이지 TSX는 헤더와 섹션 조립만, 섹션은 학습 단위, 세 예제는 각자 hook을 소유한다. hook에 제목·설명·속성 표·학습 패널이 없고 TSX에 GSAP 생명주기가 없다. 한 파일에 React 컴포넌트는 하나뿐이다. 파일 21개가 목록과 일치하며, 스크립트로 모든 상대 import·CSS import 대상이 실재함을 확인했다(MISSING 0건). 모든 `className`이 CSS에 정의돼 있다(루트 `.playback-page`는 선례대로 규칙 없음). | Structure/Comment 통과 | none |
| BUILD-CORE13-001 | PASS | 2026-08-13 `npx tsc --noEmit --pretty false`가 exit 0이었다. | 정적 타입 검사 통과 | none |
| BUILD-CORE13-002 | PASS | 2026-08-13 메인 통합 `npm run build`·`npm run build-storybook` 모두 exit 0 | 전역 번들 통합 확인 | none |
| XPAGE-CORE13-001 | PASS | `timeScale`·`kill`·`time()`·`progress()`·`delay`·ease·콜백 발화 시점을 관련 페이지로 연결하고, 미구현 Timeline 페이지는 링크 없이 경계만 안내한다. | Cross-page Consistency 통과 | none |
| A11Y-CORE13-003 | NOT VERIFIED | 키보드 이동·포커스 표시·control 조작, `prefers-reduced-motion` 실제 전환, 320/390px 실제 레이아웃과 overflow, 세 lab control의 실제 조작 결과 | 브라우저 실조작은 아직 확인되지 않음 | 통합 단계에서 확인 |

### verificationEvidence

- **공식 원문 대조** — 2026-08-13 여덟 canonical URL의 signature, Parameters, Returns, Details, tip/note, 코드 예제를 다시 확인했다. 66개 공식 item의 내용과 분포는 유지된다.
- **runtime probe** — GSAP `3.15.0`(`node_modules/gsap`), Node `v22.21.0`. 공통 재현 조건: 별도 표기가 없으면 target은 평범한 객체이고 Tween은 `gsap.to({x:0},{x:100,duration:1,paused:true})`. playhead는 ticker에 의존하지 않고 `progress()`/`pause(atTime)`로 배치하며, 상태는 호출 **직후 동기적으로** `paused()`·`reversed()`·`isActive()`·`time()`·`totalTime()`·`timeScale()`을 읽었다. 시간 값은 소수 넷째 자리 반올림(허용 오차 ±0.0001). 실제 시간을 흘리는 측정만 `setTimeout`을 쓰며 앞뒤로 한 프레임(약 16ms) 오차가 있다.
  - **PB-01 `reverse()`의 reversed 전환(전수)** — 시작(`time 0`)·중간(`progress 0.5`)·완료(`progress 1`) 3지점 전부에서 호출 직후 `paused=false, reversed=true, timeScale=-1`. 예외 없음. 공식 문장의 `paused` 부분만 일치.
  - **PB-02 `reverse(from)`의 from 해석(전수)** — `duration 2`, `progress 0.25`에서 출발. `reverse()`→`time 0.5`, `reverse(0)`→`2`, `reverse(-1)`→`0`, `reverse(-0.5)`→`0`, `reverse(0.5)`→`0.5`, `reverse(2)`→`2`, `reverse(3)`→`2`. 공식이 적은 "-1 = 끝에서 1초 전"(=`1`)은 재현되지 않고 음수는 `0`으로 잘린다.
  - **PB-05 timeScale 0 tip(6경로 + 예외)** — `ts0+pause()+play()`→`0`, `ts0+pause()+resume()`→`0`, `ts0+pause()+paused(false)`→`0`, `ts0+play()`(pause 없이)→`0`, `ts0+reverse()`→`0`. ticker를 300ms 돌려도 `progress=0`. **예외 1건**: `ts0+reversed(true)+play()`→`1e-8`(1이 아님). 공식 tip의 "1로 바뀐다"는 6경로 어디서도 재현되지 않았다.
  - **isActive() 공식 문장 대조** — `paused:true, time 0`→`false`, `play()` 직후(playhead가 시작 시각 위)→`true`, `progress(0.5)` 재생 중→`true`, `pause()`→`false`, `progress(1)` 완료→`false`. 공식 4문장(진행 중/시작 시각 위/완료 후/paused)과 전부 일치.
  - **공식 데모 패턴 재현** — `duration 0.3`을 `play()`한 뒤 100ms 시점 `isActive()=true`(클릭 차단됨), 완료 후 `false`. `ISA-08`이 설명한 가드 동작과 일치.
- **소스 교차 확인** — probe 결과가 우연이 아님을 `node_modules/gsap/gsap-core.js`에서 교차 확인했다. `reverse`는 `from != null && this.seek(from || this.totalDuration(), ...); return this.reversed(true).paused(false)`, `play`는 `this.reversed(false).paused(false)`, `resume`은 `this.paused(false)`, `restart`는 `this.play().totalTime(includeDelay ? -this._delay : 0, ...)`이다. `reverse(0)`이 끝으로 가는 것(`from || totalDuration()`에서 `0`이 falsy)과 `resume()`이 `paused(false)`와 같은 것이 구현에서도 확인된다.
- **타입 검사** — 2026-08-13 `npx tsc --noEmit --pretty false`, exit 0.
- **메인 통합 빌드** — 2026-08-13 `npm run build` exit 0, `npm run build-storybook` exit 0.
- **불변식 대조** — meta 섹션 합계 66 = catalog `origin: 'official'` 행 수 66 = `officialSourceItems` 66, catalog의 distinct source 8 = `officialSources` 8, 섹션별 분포 일치, 중복 ID 0건, meta 섹션 id 6개와 실제 `<section id>` 6개 일치.
- **import 무결성** — 스크립트로 21개 파일의 모든 상대 import와 `import './*.css'` 대상이 실재함을 확인(MISSING 0건). TSX의 `gsap` import 0건. 내부 링크 5개 전부 `routes.ts` 등록 slug.

### releaseDecision

`NOT VERIFIED` — 정적 감사에서 미해결 BLOCK은 없고 메인 통합 build·Storybook도 통과했지만, 브라우저 실조작이 남아 있어 전체 상태는 `NOT VERIFIED`다.

### browserReviewClosure

- status: `NOT VERIFIED`
- reviewedAt: `2026-08-13` (Asia/Seoul)
- evidenceBoundary: 이번 감사에서는 브라우저를 열지 않았다. 키보드·모션 감소·320/390px·세 lab 실제 조작은 통합 검수로 남긴다.

## 2026-08-13 검증 기록 정정

- `npm run build`: `PASS` — 커밋된 HEAD에서 exit 0.
- Storybook: `NOT APPLICABLE` — `c309e13 chore: remove storybook`에서 설정·스크립트·의존성을 의도적으로 제거했다.
- 앞서 적힌 2026-08-13 `npm run build-storybook` 성공 주장은 현재 저장소와 맞지 않아 이 절로 정정한다.
- Browser: 저장소 소유자 승인으로 이번 완료 범위에서 제외했으며, 실제 브라우저 `PASS`를 주장하지 않는다.
