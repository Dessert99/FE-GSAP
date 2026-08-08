/** P05 소유 canonical과 설치본 source/type 경계를 item 단위로 고정한다. */
export type DraggableBoundsAxisItem = { id: string; officialItem: string; source: string; origin: 'official' | 'source'; sectionId: string }

/** 열두 공식 item과 세 source 확인 항목을 coverage와 같은 ID로 보관한다. */
export const draggableBoundsAxisItems: DraggableBoundsAxisItem[] = [
  { id: 'DRAGBND-01', officialItem: 'applyBounds(bounds: Element | String | Object)는 Draggable에 새 bounds를 적용한다.', source: '#22', origin: 'official', sectionId: 'bounds-mental-model' },
  { id: 'DRAGBND-02', officialItem: 'bounds는 element/selector, parent 좌표의 rectangle, min/max x·y 또는 rotation object가 될 수 있다.', source: '#22', origin: 'official', sectionId: 'bounds-mental-model' },
  { id: 'DRAGBND-03', officialItem: 'maxRotation은 bounds가 적용됐을 때 legal maximum rotation이다.', source: '#39', origin: 'official', sectionId: 'min-max' },
  { id: 'DRAGBND-04', officialItem: 'maxX는 bounds가 적용됐을 때 legal maximum x다.', source: '#40', origin: 'official', sectionId: 'min-max' },
  { id: 'DRAGBND-05', officialItem: 'maxY는 bounds가 적용됐을 때 legal maximum y다.', source: '#41', origin: 'official', sectionId: 'min-max' },
  { id: 'DRAGBND-06', officialItem: 'minRotation은 bounds가 적용됐을 때 legal minimum rotation이다.', source: '#42', origin: 'official', sectionId: 'min-max' },
  { id: 'DRAGBND-07', officialItem: 'minX는 bounds가 적용됐을 때 legal minimum x다.', source: '#43', origin: 'official', sectionId: 'min-max' },
  { id: 'DRAGBND-08', officialItem: 'minY는 bounds가 적용됐을 때 legal minimum y다.', source: '#44', origin: 'official', sectionId: 'min-max' },
  { id: 'DRAGBND-09', officialItem: 'lockAxis true는 첫 2px 이후 더 크게 움직인 축만 허용하며 x,y·top,left·scroll type에만 적용된다.', source: '#37', origin: 'official', sectionId: 'axis-lock' },
  { id: 'DRAGBND-10', officialItem: 'lockedAxis는 그 drag에서 막힌 축 String이며 press 직후가 아니라 초기 방향 뒤 정해진다.', source: '#38', origin: 'official', sectionId: 'axis-lock' },
  { id: 'DRAGBND-11', officialItem: 'autoScroll non-zero는 scrollable container edge 40px 안에서 enable되고 1은 normal speed·0은 default no auto-scroll이다.', source: '#23', origin: 'official', sectionId: 'auto-scroll-layer' },
  { id: 'DRAGBND-12', officialItem: 'zIndex는 Draggable의 current z-index를 나타낸다.', source: '#62', origin: 'official', sectionId: 'auto-scroll-layer' },
  { id: 'DRAGBND-13', officialItem: 'update()는 Draggable x/y property가 target의 current position을 반영하게 한다.', source: '#58', origin: 'official', sectionId: 'resync' },
  { id: 'DRAGBND-S01', officialItem: 'installed source applyBounds()는 new bounds이면 update(true, sticky)를 호출하고 끝에 self를 반환하지만 d.ts는 void다.', source: 'node_modules/gsap/src/Draggable.js lines 1670-1727; types lines 110-124', origin: 'source', sectionId: 'resync' },
  { id: 'DRAGBND-S02', officialItem: 'installed source update(applyBounds, sticky)는 matrix를 갱신하고 applyBounds가 true면 bounds를 다시 적용하며 self를 반환한다.', source: 'node_modules/gsap/src/Draggable.js lines 1729-1762; types lines 271-284', origin: 'source', sectionId: 'resync' },
  { id: 'DRAGBND-S03', officialItem: 'installed type declaration top-level readonly properties에는 lockAxis는 있으나 lockedAxis가 없고 official #38은 String return을 명시한다.', source: 'node_modules/gsap/types/draggable.d.ts lines 1-28; #38 rendered lines 203-210', origin: 'source', sectionId: 'axis-lock' },
]
