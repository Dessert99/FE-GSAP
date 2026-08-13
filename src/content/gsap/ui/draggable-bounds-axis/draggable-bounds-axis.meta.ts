/** Draggable bounds·axis 학습 페이지의 출처·섹션·coverage 수를 한곳에서 관리한다. */
export const draggableBoundsAxisMeta = {
  title: 'drag 범위를 재고, 축을 잠그고, layout 변화 뒤 다시 맞추려면?',
  category: 'GSAP · UI · Draggable',
  summary: 'Draggable의 bounds는 움직일 수 있는 값 범위를 계산합니다. min/max 값, axis lock, edge auto-scroll과 layout 변화 뒤 update()가 같은 공간 모델에서 어떤 역할을 맡는지 확인합니다.',
  sourcePath: 'src/content/gsap/ui/draggable-bounds-axis/',
  reviewedAt: '2026-08-13',
  officialSources: [
    { label: 'applyBounds()', href: 'https://gsap.com/docs/v3/Plugins/Draggable/applyBounds()/' },
    { label: 'autoScroll', href: 'https://gsap.com/docs/v3/Plugins/Draggable/autoScroll/' },
    { label: 'lockAxis', href: 'https://gsap.com/docs/v3/Plugins/Draggable/lockAxis/' },
    { label: 'lockedAxis', href: 'https://gsap.com/docs/v3/Plugins/Draggable/lockedAxis/' },
    { label: 'maxRotation', href: 'https://gsap.com/docs/v3/Plugins/Draggable/maxRotation/' },
    { label: 'maxX', href: 'https://gsap.com/docs/v3/Plugins/Draggable/maxX/' },
    { label: 'maxY', href: 'https://gsap.com/docs/v3/Plugins/Draggable/maxY/' },
    { label: 'minRotation', href: 'https://gsap.com/docs/v3/Plugins/Draggable/minRotation/' },
    { label: 'minX', href: 'https://gsap.com/docs/v3/Plugins/Draggable/minX/' },
    { label: 'minY', href: 'https://gsap.com/docs/v3/Plugins/Draggable/minY/' },
    { label: 'update()', href: 'https://gsap.com/docs/v3/Plugins/Draggable/update()/' },
    { label: 'zIndex', href: 'https://gsap.com/docs/v3/Plugins/Draggable/zIndex/' },
  ],
} as const

/** 열두 canonical을 공간을 이해하는 다섯 단계에 배치한다. */
export const draggableBoundsAxisSections = [
  { number: '01', id: 'bounds-mental-model', title: 'bounds는 legal position 범위를 다시 잽니다', sourceItems: 2 },
  { number: '02', id: 'min-max', title: 'mode마다 min/max field가 달라집니다', sourceItems: 6 },
  { number: '03', id: 'axis-lock', title: '요청한 lockAxis와 결정된 lockedAxis를 나눕니다', sourceItems: 2 },
  { number: '04', id: 'auto-scroll-layer', title: 'edge scroll과 z-index는 drag 레이어의 일입니다', sourceItems: 2 },
  { number: '05', id: 'resync', title: '외부 layout 변화 뒤 update()로 다시 동기화합니다', sourceItems: 1 },
] as const

/** 공식 canonical 12개와 source/type 대조 항목을 분리해 보여 준다. */
export const draggableBoundsAxisCoverage = { officialSources: 12, officialSourceItems: 13, sourceVerifiedItems: 3, localSections: 5 } as const
