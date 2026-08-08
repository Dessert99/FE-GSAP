# 세션 인수인계 — 2026-08-08

> **역사적 handoff:** 이 문서는 Core 24페이지 완료·9개 미커밋 폴더가 있던 시점의 기록이다. 최신 상태와 새 세션 프롬프트는 [`current-status.md`](./current-status.md), Core 40페이지 완료 증거는 [`session-handoff-2026-08-08-core-complete.md`](./session-handoff-2026-08-08-core-complete.md)를 먼저 읽어라. 아래의 **“이 작업에서 실제로 사고가 났던 지점”**과 **“공식 문서 자체의 오류”**는 계속 유효하므로 삭제하거나 최신 문구로 교정하지 않는다.

이 문서는 GSAP 학습 페이지 제작을 이어받는 컨텍스트를 위한 것이다. 대화 기억 없이 이 문서와 저장소 파일만으로 작업을 이어갈 수 있어야 한다.

## 지금 어디까지 왔나

- 브랜치: `Dessert99/feat-gsap`, 마지막 커밋 `890bdff`
- **완료·커밋·라우트 등록: 24페이지** (전체 86개 중, core 40개 중 24개)
- 공식 source coverage: **77 / 364 (21.2%)**
- plugin 46페이지는 **미착수**
- `origin/main` 대비 **25커밋 앞서 있음 — 아직 push되지 않았다**

## 반드시 먼저 읽을 문서

1. `AGENTS.md` — 특히 6번(주석 한 줄 규칙)과 7번(GSAP 학습 코드 단계별 주석)
2. `docs/project-structure.md` — 실행 source 선택 규칙(`use*Animation.ts` / `use*Runtime.ts` / `*.example.ts`)이 핵심
3. `docs/workflows/README.md`와 거기 연결된 5개 계약 문서
4. `docs/handoffs/gsap/_program/master-page-inventory.md` — 86페이지·364 source의 소유권 authority
5. `docs/handoffs/gsap/_program/core-learning-curriculum.md` / `plugin-learning-curriculum.md` — 페이지별 구성
6. **패턴 참조 구현** — `src/content/gsap/fundamentals/tween-playback-controls/`(공식 item 66개, 메서드 다수를 의도별로 묶은 예)와 `src/content/gsap/fundamentals/non-css-target-values/`(기본 구조). 각각의 handoff도 함께 읽어라.

`docs/workflows/quality-gates.md`는 2026-08-04에 개정됐다. **독립 검수자를 두지 않는다.** 구현한 컨텍스트가 관점별로 직접 판정하고 근거를 handoff에 남긴다. 브라우저 실조작은 소유자 일괄 검수로 유예(`DEFERRED`)돼 있다.

## 작업 트리에 미커밋 상태로 남은 것 9개

라우트에 등록되지 않아 앱 동작에는 영향이 없다. **현재 저장소 전체 타입 검사는 실패한다** — 아래 4개가 아직 만들지 않은 섹션을 import하고 있기 때문이다.

| 폴더 | 파일 | 타입오류 | handoff | 상태 |
| --- | ---: | ---: | :---: | --- |
| `modifiers-snap-wrap` | 16 | 0 | O | **완성.** 31/31/31 일치, 검증 끝. 커밋과 라우트 등록만 남음 |
| `gsap-utils` | 9 | 0 | X | 섹션 작성 중 |
| `timeline-inspection` | 8 | 0 | X | 예제 작성 중 |
| `timeline-basics` | 5 | 0 | X | catalog 완료(116/116/116 보고), 섹션 작성 중 |
| `timeline-repeats` | 1 | 0 | X | meta·catalog 작성 시작 |
| `timeline-callbacks-pauses` | 7 | 9 | X | 섹션 미생성 |
| `timeline-timing-math` | 6 | 8 | X | 섹션 미생성 |
| `timeline-labels` | 7 | 6 | X | 섹션 미생성 |
| `timeline-child-placement` | 10 | 5 | X | 섹션 미생성 |

**판단 필요:** 이 미완성 결과물을 이어서 완성할지, 지우고(`git clean -fd`) 처음부터 다시 만들지는 이어받는 쪽이 정한다. 각 폴더의 `*.catalog.ts`에 이미 공식 문서 조사 결과가 들어 있으므로 살펴본 뒤 판단하는 편이 낫다. 다만 **그 catalog의 공식 주장이 실제로 원문 대조를 거쳤는지는 보증되지 않는다** — 아래 실패 사례를 참고해 재확인해라.

## 남은 작업

**core 16개** (`modifiers-snap-wrap` 포함, source 82개)
`timeline-basics` · `timeline-child-placement` · `timeline-labels` · `timeline-callbacks-pauses` · `timeline-inspection` · `timeline-cleanup` · `timeline-playback-controls` · `timeline-playhead` · `timeline-timing-math` · `timeline-repeats` · `gsap-utils` · `range-interpolation` · `utility-pipelines-units` · `utility-collections-random` · `utility-distribute` · `modifiers-snap-wrap`

**plugin 46개** (source 205개) — 전부 미착수. `plugin-learning-curriculum.md`에 구성이 정의돼 있다.

Timeline 10개 중 5개는 이미 완성된 Tween 페이지와 1:1로 대응한다. 대응 페이지를 읽고 구조를 따르되 **Timeline 공식 문서로 사실을 다시 확인해야 한다** — 실제로 여러 지점에서 동작이 달랐다.

| Timeline 페이지 | 대응하는 완성본 |
| --- | --- |
| `timeline-playback-controls` | `tween-playback-controls` |
| `timeline-playhead` | `tween-playhead` |
| `timeline-timing-math` | `tween-timing-math` |
| `timeline-repeats` | `tween-repeats` |
| `timeline-cleanup` | `find-stop-animations` |
| `timeline-callbacks-pauses` | `tween-callbacks-promise` |
| `timeline-inspection` | `find-stop-animations` + `tween-instance` |

## 이 작업에서 실제로 사고가 났던 지점 (가장 중요)

아래는 전부 실제로 발생한 것이다. 같은 실수를 반복하지 않도록 반드시 지켜라.

### 1. 공식 문서 조회 요약이 항목을 빠뜨린다

WebFetch류의 요약은 목록을 합치거나 통째로 누락한다. **한 번 조회로 끝내지 마라.**

- 한 페이지에서 Ease Visualizer 단축키 3개가 "문서에 없음"으로 왔다가, "각 줄을 그대로 인용하고 없으면 NOT PRESENT라고 답해라"로 재조회하니 전부 실재했다. 요약만 믿고 지웠으면 coverage가 깨졌다.
- `tween-playback-controls`는 원문 인용 재조회로 **item 5개를 되살려 분모가 61→66으로 정정**됐다.
- `find-stop-animations`는 첫 조회가 `killTweensOf()` 본문과 `kill()` Parameters를 "없음"이라 답했으나 재조회로 **8개를 되살렸다.**
- `gsap-root-clock`은 재조회로 **9개**를 되살렸다.
- `tween-instance`는 요약이 같은 응답 안에서 "Special Properties 24개"라고 하면서 32개를 나열하는 **모순**을 보여, `curl`로 원본 HTML을 받아 `<li>`·`<tr>`을 직접 셌다(실측 32/30/4).

**규칙:** heading 목록, signature, 파라미터·기본값·반환값, 코드 예제는 원문 인용을 요구하며 최소 2회 조회한다. 목록이 긴 페이지는 `curl`로 세어라.

### 2. probe 주장에는 측정 방법과 재현 조건을 함께 적어라

`custom-bounce-wiggle`의 "squash 바닥 체류 2.1% / 4.8% / 8.8%"가 재현되지 않았다. 실측은 **2.4% / 10.9% / 18.1%**였고, 측정 방법(1000등분, 오차 0.001)을 명시한 값으로 교체했다.

### 3. "항상 N이다" 단정 전에 모든 선택지를 돌려라

"`wiggles: N`이면 방향 전환이 정확히 N번"이 `type: "random"`에서 깨졌다(6 대신 2). 예외를 찾아 명시해야 한다.

### 4. 비결정적 값을 두 번 파싱하지 마라 — 실제 버그가 났다

`RoughnessLab`이 화면 곡선용과 Tween용으로 `rough` 문자열을 **각각 파싱**했다. `rough`는 해석할 때마다 새 무작위 배치를 만들기 때문에 **그려진 곡선과 실제 움직임이 서로 달랐다.** `gsap.parseEase()`를 한 번만 호출해 얻은 함수를 양쪽에 넘기도록 고쳤다.

**규칙:** 화면에 표시하는 값은 반드시 GSAP이 실제로 쓴 결과를 다시 읽어 만든다. 따로 계산하지 마라.

### 5. import한 파일이 실제로 있는지 확인해라

`EasePackPage.tsx`가 존재하지 않는 CSS를 import해 빌드가 깨질 상태였다. `tween-callbacks-promise`는 섹션 4개를 import하는데 파일이 없었다. **끝내기 전에 `npx tsc --noEmit`을 돌려라.**

### 6. 세 숫자를 반드시 대조해라

`meta`의 섹션 `sourceItems` 합계 = `catalog`의 `origin: 'official'` 행 수 = `meta`의 `officialSourceItems` 분모. 셋이 정확히 같아야 하고 중복 ID가 없어야 한다. 스크립트로 세어 확인해라.

### 7. 등록되지 않은 slug로 내부 링크를 걸지 마라

`src/app/routes.ts`의 `resolveRoute`가 모르는 경로를 **조용히 첫 레슨으로 흡수한다.** 404가 나지 않아 발견이 어렵다. 링크 전에 등록 여부를 확인해라.

### 8. live region에 매 프레임 바뀌는 값을 넣지 마라

여러 lab에서 `role="status"`와 `<output>` 안에 재생 중 계속 바뀌는 시간값이 들어가, 스크린리더가 프레임마다 낭독하는 구조였다. 연속 변화 값은 live region 밖에 두고 이산 상태만 남겨라.

### 9. 전역 상태를 바꾸는 예제는 복원을 보장하고 화면에 드러내라

`gsap-root-clock`이 `globalTimeline.timeScale()`을 바꾼다. 복원을 4경로(useGSAP cleanup / onComplete / 화면 버튼 / reduced-motion에서는 아예 안 건드림)로 보장하고, 복원 여부를 매번 GSAP에서 다시 읽어 화면 세 곳에 숫자로 표시한다.

**되돌릴 수 없는 조작은 예제를 만들지 마라.** `ticker.fps()`·`lagSmoothing()`은 이전 값을 읽을 수 없어 복원 보장이 불가능하고, `exportRoot()`는 해제할 수 없으며, ticker에서 `updateRoot`을 떼면 앱 전체가 멈춘다. 정적 코드로 두고 이유를 화면에 적었다.

## 공식 문서 자체의 오류 — 되돌리지 마라

아래는 실행으로 확인한 것이다. 공식 문서와 다르게 적혀 있는 것이 **의도된 것**이다.

| 위치 | 공식 문서 | 실제 |
| --- | --- | --- |
| `Tween/repeatDelay()` | 기본값 `NaN` | 숫자 `0` |
| `Tween/reverse()` | `-1`은 "끝에서 1초 전"(duration 2면 1) | `0`으로 감 |
| `Eases/SlowMo` 예제 주석 | `slow(0.5, 0.8)`이 기본 `slow`와 "같은 효과" | 다름 (0.3753 vs 0.3656) |
| `UtilityMethods/wrapYoyo()` | 같은 호출을 예제1은 `"red"`, 예제3은 `"green"` | `"green"` (예제1이 틀림) |

공식이 침묵하지만 실행으로 확인한 것:
- `repeat: -1`의 `totalDuration()`은 `Infinity`가 아니라 `10000000000`
- `gsap.timeline()`의 `smoothChildTiming` 기본값은 `false`, `gsap.globalTimeline`만 `true`
- paused child는 `endTime()`에서 `timeScale`을 무시
- `revert()`는 0이 아니라 **tween이 기록한 시작값**으로 복원 (`gsap.set(30)` 후면 30)
- `duration: 0`에서는 `onStart`가 불리지 않고 `onComplete`도 1회차 뒤 멈춤
- `wrap(0,3,i)`는 최댓값 3을 포함하지 않고 `wrapYoyo(0,3,i)`는 포함
- `gsap.utils.snap`의 radius 밖 값은 snap되지 않고 원값 그대로
- GSAP 3.15.0 타입 선언에 `globalTime()`이 없다 → 전역 augmentation 대신 호출 지점에서만 좁히는 로컬 타입을 쓴다(`tween-timing-math/examples/NestedGlobalTimeLab/useNestedGlobalTimeRuntime.ts`의 `WithGlobalTime` 참고)

Node에서 `CustomBounce`·`CustomWiggle`·`EasePack`은 `window.gsap`을 찾으므로 probe 하니스에 `globalThis.window = { gsap }`가 필요하다. 브라우저에는 영향 없다.

## 페이지 하나를 만드는 절차

1. `master-page-inventory.md`에서 담당 source와 route를 확인한다
2. 공식 URL을 **각각** 직접 조회하고, 원문 인용을 요구하며 재조회한다
3. 공식이 침묵하는 동작 중 틀리면 잘못 가르치게 되는 것은 `node`로 실행해 확인한다
4. `<slug>.catalog.ts`에 공식 item과 probe item을 `origin`으로 구분해 고정한다
5. `<slug>.meta.ts`에 섹션과 분모를 적는다 (세 숫자 일치)
6. 페이지·섹션·예제를 만든다. **TSX에서 `gsap`을 import하지 않는다** — 실행은 hook 또는 `.example.ts`가 소유한다
7. `npx tsc --noEmit`으로 확인한다
8. `docs/handoffs/gsap/core/<slug>.md`를 쓴다 (형식은 기존 handoff 참고)
9. `src/app/routes.ts`에 등록하고 `npm run build`·`npm run build-storybook`을 돌린다
10. 페이지 단위로 커밋한다

## 남아 있는 과제

- **배포가 25커밋 뒤처져 있다.** `origin/main`은 `c6efe0d`이고 라이브 사이트에는 9개 페이지만 올라가 있다. 브라우저 검수를 하려면 배포하거나 `npm run dev`로 띄워야 한다.
- **브라우저 실조작 검수가 24개 페이지에 대해 한 번도 되지 않았다.** 모든 handoff에 `DEFERRED`로 남아 있다. `grep -rl DEFERRED docs/handoffs/`로 대상을 찾을 수 있다. 구조적 문제가 있다면 남은 62페이지에 그대로 복제되므로, 계속 만들기 전에 한 번 확인하는 편이 낫다.
- 옛 브랜치 `feat/gsap-docs-complete`에서 이미 완료 작업(gsap.to coverage 55개 item, 프로그램 문서 5종)을 회수한 이력이 있다. 추가 누락은 확인 결과 없었다.
