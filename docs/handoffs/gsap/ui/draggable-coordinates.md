# P04 Draggable coordinates handoff

## objective

P03에서 만든 Draggable instance를 읽는 다음 단계로, target·pointer·gesture phase를 분리해 열네 공식 좌표 canonical을 학습시키는 `DraggableCoordinatesPage`를 제공한다.

## officialPage

- Catalog rows #24, #25, #30, #31, #32, #33, #45, #46, #47, #48, #50, #51, #60, #61
- Rendered canonical은 2026-08-08에 각 URL을 두 번 열어 확인했고, `node_modules/gsap/Draggable.js` 및 `node_modules/gsap/types/draggable.d.ts`로 raw/installed 대조를 두 차례 수행했다.

## localPage

- slug: `draggable-coordinates`
- component: `DraggableCoordinatesPage`
- source path: `src/content/gsap/ui/draggable-coordinates/`
- route: `/fundamentals/draggable-coordinates` (registered)
- learner order: coordinate frames → phase snapshots → pointer versus target → direction/rotation → read-only/timing/environment

## sourceManifest

| sourceItemId | canonical | rendered evidence | raw/installed evidence | local section | localStatus |
| --- | --- | --- | --- | --- | --- |
| DRAGCOORD-24 | #24 deltaX | last drag event 이후 x-related change, rotation mode에서는 rotation change | `Draggable.js` render가 prior x와 delta를 계산 | coordinate-frames | covered |
| DRAGCOORD-25 | #25 deltaY | last drag event 이후 y-related change | `Draggable.js` render가 prior y와 delta를 계산 | coordinate-frames | covered |
| DRAGCOORD-30 | #30 endRotation | rotation only, release 때 ending rotation | release path가 `endRotation`을 채움 | phase-snapshots | covered |
| DRAGCOORD-31 | #31 endX | release 즉시 x ending position, inertia landing 예측 | release path가 `endX = x` | phase-snapshots | covered |
| DRAGCOORD-32 | #32 endY | release 즉시 y ending position, x,y type은 translateY | release path가 `endY = y` | phase-snapshots | covered |
| DRAGCOORD-33 | #33 getDirection() | start·velocity·element 기준 direction | runtime rotation mode는 clockwise/counter-clockwise도 반환 | direction-rotation | covered |
| DRAGCOORD-45 | #45 pointerEvent | 마지막 mouse/touch/pointer event | type은 `TouchEvent | PointerEvent` | pointer-target | covered |
| DRAGCOORD-46 | #46 pointerX | 정규화된 마지막 pointer의 pageX | press/move에서 `pointerX` 갱신 | pointer-target | covered |
| DRAGCOORD-47 | #47 pointerY | 정규화된 마지막 pointer의 pageY | press/move에서 `pointerY` 갱신 | pointer-target | covered |
| DRAGCOORD-48 | #48 rotation | 현재 target rotation read | d.ts readonly `rotation: number` | direction-rotation | covered |
| DRAGCOORD-50 | #50 startX | drag 시작 target x-related value | press가 `startX` 기록 | phase-snapshots | covered |
| DRAGCOORD-51 | #51 startY | drag 시작 target y-related value | press가 `startY` 기록 | phase-snapshots | covered |
| DRAGCOORD-60 | #60 x | x,y면 transform x, top,left면 CSS left 관련 값 | type별 x property 선택 | reading-boundaries | covered |
| DRAGCOORD-61 | #61 y | x,y면 transform y, top,left면 CSS top 관련 값 | type별 y property 선택 | reading-boundaries | covered |

`getDirection()`은 rendered 문서의 cartesian string 목록과 달리 installed runtime에서 rotation mode에 `clockwise`/`counter-clockwise`를 반환한다. 설치된 d.ts `Draggable.Direction`은 cartesian 여덟 방향만 선언하므로 lab snapshot은 `String()`으로 표시하며, catalog의 공식 claim과 implementation 차이를 섞지 않는다.

## sourceBlockers

없음. source/type 차이는 위 `getDirection()` observation으로 기록했으며 official coverage 분모는 14 canonical이다.

## moduleSelection

`CoordinateLab` 하나가 `type: 'x,y' | 'rotation'`, 실제 draggable puck, `onPress`·`onDrag`·`onRelease`, rAF-throttled visual snapshot, 일반 textual release summary와 즉시 reset을 소유한다. 좌표 readout은 live region에 넣지 않는다.

## learnerFlow

1. delta를 target의 직전 상태 대비 변화로 읽는다.
2. start/current/end를 press·drag·release 시점에 맞춰 읽는다.
3. pointer event의 page 좌표와 target state를 분리한다.
4. 방향 기준과 rotation degree를 구분한다.
5. read-only timing, CSS type, browser pointer 환경, cleanup 경계를 확인한다.

## coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| DRAGCOORD-24 | `CoordinateMentalModelSection` delta 설명, `CoordinateLab` delta readout | covered |
| DRAGCOORD-25 | `CoordinateMentalModelSection` delta 설명, `CoordinateLab` delta readout | covered |
| DRAGCOORD-30 | `PhaseSnapshotSection` release 설명, `CoordinateLab` release summary | covered |
| DRAGCOORD-31 | `PhaseSnapshotSection` release 설명, `CoordinateLab` release summary | covered |
| DRAGCOORD-32 | `PhaseSnapshotSection` release 설명, `CoordinateLab` release summary | covered |
| DRAGCOORD-33 | `DirectionRotationSection`, `CoordinateLab` direction readout | covered |
| DRAGCOORD-45 | `PointerTargetSection`, `CoordinateLab` event readout | covered |
| DRAGCOORD-46 | `PointerTargetSection`, `CoordinateLab` pointer readout | covered |
| DRAGCOORD-47 | `PointerTargetSection`, `CoordinateLab` pointer readout | covered |
| DRAGCOORD-48 | `DirectionRotationSection`, `CoordinateLab` rotation readout | covered |
| DRAGCOORD-50 | `PhaseSnapshotSection`, `CoordinateLab` target readout | covered |
| DRAGCOORD-51 | `PhaseSnapshotSection`, `CoordinateLab` target readout | covered |
| DRAGCOORD-60 | `ReadingBoundarySection`, `CoordinateLab` target readout | covered |
| DRAGCOORD-61 | `ReadingBoundarySection`, `CoordinateLab` target readout | covered |

## relatedPages

- [P01 Plugins overview](/fundamentals/plugins)
- [P03 Draggable create](/fundamentals/draggable-create)
- P05 bounds·axis, P06 enable/disable·kill, P07 gesture event, P08 collision·momentum은 text-only boundary다.

## exactFiles

- `src/content/gsap/ui/draggable-coordinates/DraggableCoordinatesPage.tsx`
- `src/content/gsap/ui/draggable-coordinates/DraggableCoordinatesPage.css`
- `src/content/gsap/ui/draggable-coordinates/draggable-coordinates.meta.ts`
- `src/content/gsap/ui/draggable-coordinates/draggable-coordinates.catalog.ts`
- `src/content/gsap/ui/draggable-coordinates/draggable-coordinates.properties.ts`
- `src/content/gsap/ui/draggable-coordinates/components/PageCoverage/PageCoverage.tsx`
- `src/content/gsap/ui/draggable-coordinates/components/SectionHeading/SectionHeading.tsx`
- `src/content/gsap/ui/draggable-coordinates/examples/CoordinateLab/CoordinateLab.tsx`
- `src/content/gsap/ui/draggable-coordinates/examples/CoordinateLab/CoordinateLab.css`
- `src/content/gsap/ui/draggable-coordinates/examples/CoordinateLab/useCoordinateAnimation.ts`
- five `sections/*/*.tsx` files

## findings

- Static checks: PASS — catalog/meta/sourceManifest/coverageMap 14/14/14/14, duplicate/missing ID 0, relative import·comment·cleanup·P01/P03 link·P05–P08 text-only boundary 확인, `prettier --no-config --check` 및 scoped `git diff --check` 통과.
- Route registration and build: `PASS` — root registered `/fundamentals/draggable-coordinates`; `npx tsc --noEmit`, `npm run build`, `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook`, `git diff --check` all exited 0. Vite transformed 846 modules and Storybook transformed 984 modules; both emitted `DraggableCoordinatesPage` JS/CSS chunks.
- Browser checks: `DEFERRED` — translation drag, rotation drag, reset, cleanup/unmount.
- Release: `PASS` — route/build integration blocker is cleared. The four approved browser checks remain `DEFERRED` for the final browser batch.
