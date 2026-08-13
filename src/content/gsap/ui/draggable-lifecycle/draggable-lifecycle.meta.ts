/** Draggable lifecycle 페이지의 source·섹션·coverage 계약을 고정한다. */
export const draggableLifecycleMeta = {
  title: 'Draggable instance는 언제 켜고, 멈추고, 버릴까요?',
  category: 'GSAP · UI · Draggable',
  summary: '이미 만든 Draggable instance를 잠시 disable하고, 실제 pointer 입력으로 programmatic drag를 시작·종료하고, 더 이상 쓰지 않을 때 kill하는 상태 전이를 살펴봅니다.',
  sourcePath: 'src/content/gsap/ui/draggable-lifecycle/',
  reviewedAt: '2026-08-13',
  officialSources: [
    { label: 'Draggable.disable()', href: 'https://gsap.com/docs/v3/Plugins/Draggable/disable()/' },
    { label: 'Draggable.enable()', href: 'https://gsap.com/docs/v3/Plugins/Draggable/enable()/' },
    { label: 'Draggable.enabled()', href: 'https://gsap.com/docs/v3/Plugins/Draggable/enabled()/' },
    { label: 'Draggable.endDrag()', href: 'https://gsap.com/docs/v3/Plugins/Draggable/endDrag()/' },
    { label: 'Draggable.kill()', href: 'https://gsap.com/docs/v3/Plugins/Draggable/kill()/' },
    { label: 'Draggable.startDrag()', href: 'https://gsap.com/docs/v3/Plugins/Draggable/startDrag()/' },
  ],
} as const

/** 여섯 canonical을 instance state machine의 관찰 순서로 재배치한다. */
export const draggableLifecycleSections = [
  { number: '01', id: 'lifecycle-mental-model', title: 'instance는 enabled와 disposed를 구분한다', sourceItems: 0 },
  { number: '02', id: 'enable-disable', title: 'enable()과 disable()은 같은 instance를 켜고 끈다', sourceItems: 10 },
  { number: '03', id: 'programmatic-drag', title: '실제 pointer event로 startDrag()와 endDrag()를 호출한다', sourceItems: 7 },
  { number: '04', id: 'kill-recreate', title: 'kill()은 lookup까지 버리고 recreate는 새 instance를 만든다', sourceItems: 4 },
  { number: '05', id: 'framework-cleanup', title: 'framework unmount에서 instance를 정리한다', sourceItems: 0 },
] as const

/** 화면과 handoff가 같은 분모를 사용하도록 source·probe·섹션 수를 선언한다. */
export const draggableLifecycleCoverage = { officialSources: 6, officialSourceItems: 21, implementationItems: 2, runtimeProbeItems: 0, localSections: 5 } as const
