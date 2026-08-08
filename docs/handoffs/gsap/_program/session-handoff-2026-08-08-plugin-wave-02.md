# 세션 인수인계 — Plugin 둘째 wave 완료 — 2026-08-08

이 문서는 Plugin P04~P06을 병렬로 준비하고 curriculum 순서로 통합한 체크포인트다. 이후 진행 상태는 `current-status.md`를 먼저 읽고, 이 문서는 둘째 wave의 source·검증·커밋 증거를 재현할 때 사용한다.

## 체크포인트 범위

- 브랜치: `Dessert99/feat-gsap`
- Plugin 둘째 wave 구현 기준 커밋: `0c027b4`
- 원격 반영: 이 세션은 push하지 않았다.
- Core visible learning pages: **40/40**, canonical sources **159/159**
- Plugin visible learning pages: **6/46**, canonical sources **40/205**
- 전체 visible learning pages: **46/86**, canonical sources **199/364**
- route 순서: Core 40 → P01 `plugins` → P02 `css-rule-plugin` → P03 `draggable-create` → P04 `draggable-coordinates` → P05 `draggable-bounds-axis` → P06 `draggable-lifecycle`
- P04~P06 content 폴더·page handoff·lazy import·lesson 등록이 모두 존재하고 세 handoff의 `releaseDecision`은 `PASS`다.

## 완료 커밋

| 작업 | commit | 결과 |
| --- | --- | --- |
| Wave 02 계획 | `945d92e` | P04~P06 page-local 병렬 준비와 직렬 통합 계약 |
| P04 Draggable coordinates | `908d350eaa53563429182a2faa8a4e996a5c3020` | `/fundamentals/draggable-coordinates` release |
| P05 Draggable bounds-axis | `3e035c272e375ce882a4a8746b5e35d746c6fc1e` | `/fundamentals/draggable-bounds-axis` release |
| P06 Draggable lifecycle | `0c027b457a56449912d9bcdaacc5da211e37d849` | `/fundamentals/draggable-lifecycle` release |

세 page worker는 서로 다른 page-local 폴더와 handoff만 썼다. root가 live-region, official link, scroll geometry, runtime snapshot을 직접 검수·수정 지시한 뒤 route·전체 build·Git을 P04→P05→P06 순서로 소유했다.

## 페이지별 source와 구현 증거

| page | canonical | coverage | implementation evidence |
| --- | ---: | --- | --- |
| P04 `draggable-coordinates` | 14 | 공식 item 14/14 | translation/rotation descriptor 하나로 instance type, target/pointer/phase snapshot과 표시 code를 연결한다. drag readout은 rAF로 묶고 live region 밖에 둔다. |
| P05 `draggable-bounds-axis` | 12 | 공식 item 13/13 + 설치본 source/type 3/3 | constraint descriptor가 bounds, lockAxis, autoScroll과 code를 함께 만든다. 780×420 scroll-space, min/max inspector, keyboard move와 `update(true)` resync를 제공한다. |
| P06 `draggable-lifecycle` | 6 | 공식 item 21/21 + 설치본 source/type 2/2 | command descriptor가 실제 method와 code를 고르고, 호출 뒤 `enabled()`, `isDragging`, `Draggable.get(target)`을 다시 읽어 temporary disable과 final kill을 구분한다. |

세 handoff의 `sourceManifest`와 `coverageMap`은 각 ID별 행이다. root 재검산 기준 P04는 catalog/manifest/coverage 각 14개, P05는 각 16개, P06은 각 23개이며 중복·누락이 없다. 공식 section 합계는 각각 14, 13, 21이다.

## 통합 검증 증거

| accepted page | TypeScript | Vite | Storybook | chunk |
| --- | --- | ---: | ---: | --- |
| P04 | PASS | 846 modules | 984 modules | `DraggableCoordinatesPage` JS/CSS |
| P05 | PASS | 861 modules | 999 modules | `DraggableBoundsAxisPage` JS/CSS |
| P06 | PASS | 876 modules | 1014 modules | `DraggableLifecyclePage` JS/CSS |

각 단계에서 `npx tsc --noEmit`, `npm run build`, `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook`, `git diff --check`가 모두 exit 0이었다. 마지막 프로그램 handoff commit 전에도 같은 네 검증을 fresh-run한다.

Storybook의 기존 500 kB 초과 chunk warning과 `npm install`의 기존 high-severity audit 2건은 이 wave에서 생긴 blocker가 아니며 dependency 변경은 범위 밖이었다.

## 보존할 공식/source 경계

### P04 coordinates

- 공식 `getDirection()`은 cartesian 방향을 설명하지만 installed runtime은 rotation mode에서 `clockwise`/`counter-clockwise`를 반환한다. installed `Draggable.Direction` union에는 두 문자열이 없어 local snapshot은 `String()`으로만 표시한다.
- `endX`·`endY`·`endRotation`은 drag 중에도 바뀔 수 있으므로 release summary를 live region으로 두지 않았다.

### P05 bounds-axis

- 공식 `applyBounds()` signature는 반환을 표시하지 않고 installed d.ts는 `void`지만 installed source는 `self`를 반환한다. 공개 학습 계약을 억지로 하나로 합치지 않는다.
- 공식 `lockedAxis` canonical은 String property를 문서화하지만 installed top-level d.ts에는 빠져 있다. runtime은 page-local optional narrow type으로 읽는다.
- `autoScroll` lab은 보이는 224px viewport 안에 실제 가로·세로 overflow를 만들어 browser 실조작에서 edge scroll을 관찰할 수 있다.

### P06 lifecycle

- 공식 rendered `enabled(value:Boolean) : Boolean` signature와 본문의 setter self-return 설명이 다르다. installed d.ts getter Boolean/setter `this` overload를 함께 보존한다.
- 공식 `startDrag`/`endDrag`는 original event를 요구하고 d.ts도 Event를 필수로 한다. installed raw runtime의 `event || self.pointerEvent` fallback은 implementation 차이로만 기록하며 lab은 실제 captured event가 없으면 호출하지 않는다.
- start/end 성공과 kill disposal은 수동 Boolean으로 꾸미지 않는다. 실제 `instance.isDragging`과 `Draggable.get(target)` 결과를 action 뒤 다시 읽는다.

## Release와 유예 상태

- Plugin P01~P06 handoff: `releaseDecision PASS` 6/6
- Plugin page handoff의 미해결 `BLOCK`: 0
- browser-only `DEFERRED`가 있는 Plugin handoff: 6개
- browser batch 항목: keyboard/focus, 실제 reduced-motion, 320/390px layout·overflow, 실제 control/drag 조작
- Core 34개를 합친 page handoff 기준 `DEFERRED` 파일: 40개

## 다음 wave identity

| order | page | route | canonical ownership | primary source |
| ---: | --- | --- | ---: | --- |
| P07 | `draggable-events` | `/fundamentals/draggable-events` | 3 | `source:draggable-add-event-listener` |
| P08 | `draggable-collision-momentum` | `/fundamentals/draggable-collision-momentum` | 3 | `source:draggable-is-throwing` |
| P09 | `draw-svg` | `/fundamentals/draw-svg` | 3 | `source:draw-svg` |

세 page-local worker를 다시 병렬로 사용할 수 있다. P07은 P03/P04 gesture timing, P08은 P03~P05와 Inertia dependency, P09는 SVG stroke와 DrawSVG registration 경계를 각각 소유한다. root는 P07→P08→P09 순서로 source·coverage·runtime을 재검수하고 route 등록, TypeScript, Vite, Storybook, handoff PASS, page commit을 하나씩 완료한다.

## 재현 체크

```bash
git status -sb
git rev-list --left-right --count origin/main...HEAD
git log -8 --oneline
npx tsc --noEmit
npm run build
STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook
git diff --check
```

정적 수량만 믿지 말고 P01~P06 각각의 content folder, page handoff, lazy import, lesson slug와 `releaseDecision PASS`를 함께 대조한다.
