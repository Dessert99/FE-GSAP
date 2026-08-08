/** Draggable 생성 페이지의 source·섹션·coverage 계약을 고정한다. */
export const draggableCreateMeta = {
  title: 'Draggable은 무엇을 만들고, 나중에 어떻게 찾을까요?',
  category: 'GSAP · UI · Draggable',
  summary: 'DOM target 하나에 연결되는 Draggable instance를 만들고, 같은 target으로 다시 찾아 target과 vars를 읽는 가장 작은 흐름을 살펴봅니다.',
  sourcePath: 'src/content/gsap/ui/draggable-create/',
  reviewedAt: '2026-08-08',
  officialSources: [
    { label: 'Draggable', href: 'https://gsap.com/docs/v3/Plugins/Draggable/' },
    { label: 'Draggable.create()', href: 'https://gsap.com/docs/v3/Plugins/Draggable/static.create()/' },
    { label: 'Draggable.get()', href: 'https://gsap.com/docs/v3/Plugins/Draggable/static.get()/' },
    { label: 'Draggable.target', href: 'https://gsap.com/docs/v3/Plugins/Draggable/target/' },
    { label: 'Draggable.vars', href: 'https://gsap.com/docs/v3/Plugins/Draggable/vars/' },
  ],
} as const

/** 다섯 canonical을 생성·조회·검사·정리 순서로 재배치한다. */
export const draggableCreateSections = [
  { number: '01', id: 'instance-mental-model', title: 'target마다 Draggable instance 하나를 만든다', sourceItems: 4 },
  { number: '02', id: 'create', title: 'create()는 입력을 넓게 받고 배열을 돌려준다', sourceItems: 47 },
  { number: '03', id: 'lookup-identity', title: '같은 target으로 instance를 다시 찾는다', sourceItems: 4 },
  { number: '04', id: 'target-vars', title: 'target과 vars로 만든 것을 검사한다', sourceItems: 3 },
  { number: '05', id: 'lifecycle-boundary', title: '사용자 drag와 React cleanup의 경계를 나눈다', sourceItems: 2 },
] as const

/** 화면과 handoff가 같은 분모를 사용하도록 source·probe·섹션 수를 선언한다. */
export const draggableCreateCoverage = { officialSources: 5, officialSourceItems: 60, implementationItems: 2, runtimeProbeItems: 0, localSections: 5 } as const
