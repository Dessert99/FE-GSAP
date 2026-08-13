/** 중첩 Timeline 내부를 조회하는 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const timelineInspectionMeta = {
  title: '중첩된 Timeline 안에서 원하는 child를 어떻게 찾나요?',
  category: 'GSAP · Timeline Inspection',
  summary:
    'Timeline 안에 Timeline을 넣으면 animation은 나무 모양이 됩니다. 그 나무에서 원하는 가지 하나를 다시 꺼내는 방법은 세 가지입니다 — 조건으로 훑거나(getChildren), 이름표로 집거나(getById), 움직이는 대상에서 거꾸로 되짚거나(getTweensOf).',
  sourcePath: 'src/content/gsap/fundamentals/timeline-inspection/',
  reviewedAt: '2026-08-13',
  officialSources: [
    { label: 'Timeline.data', href: 'https://gsap.com/docs/v3/GSAP/Timeline/data' },
    { label: 'Timeline.getChildren()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/getChildren()' },
    { label: 'Timeline.getById()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/getById()' },
    { label: 'Timeline.getTweensOf()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/getTweensOf()' },
    { label: 'Timeline.scrollTrigger', href: 'https://gsap.com/docs/v3/GSAP/Timeline/scrollTrigger' },
  ],
} as const

/** 공식 source item 36개를 "지형 파악 → 세 가지 조회 → 노드에 남는 부가 정보"라는 흐름의 일곱 단계에 대응시킨다. */
export const timelineInspectionSections = [
  { number: '01', id: 'nested-tree', title: 'Timeline 안의 Timeline은 나무가 된다', sourceItems: 3 },
  { number: '02', id: 'get-children', title: '네 개의 인자로 목록을 좁힌다', sourceItems: 10 },
  { number: '03', id: 'get-by-id', title: '이름표 하나로 집어낸다', sourceItems: 7 },
  { number: '04', id: 'get-tweens-of', title: '움직이는 대상에서 거꾸로 되짚는다', sourceItems: 8 },
  { number: '05', id: 'data', title: '각 노드에 붙여 두는 내 메모', sourceItems: 3 },
  { number: '06', id: 'scroll-trigger', title: '밖에서 붙은 driver가 남긴 자리', sourceItems: 5 },
  { number: '07', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 0 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const timelineInspectionCoverage = {
  officialSources: 5,
  officialSourceItems: 36,
  localSections: 7,
} as const
