/** 시간 위치에 이름을 붙여 다루는 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const timelineLabelsMeta = {
  title: '숫자 대신 의미 있는 이름으로 시간 위치를 어떻게 다루나요?',
  category: 'GSAP · Timeline Labels',
  summary:
    'Timeline의 2.4초는 장면을 하나 넣거나 빼는 순간 3.1초가 됩니다. 그래서 GSAP은 시각에 이름을 붙이게 해 둡니다. 이름을 붙이고, 지금 어느 이름 안에 있는지 묻고, 그 이름으로 이동하는 것이 이 페이지의 전부입니다.',
  sourcePath: 'src/content/gsap/fundamentals/timeline-labels/',
  reviewedAt: '2026-08-08',
  officialSources: [
    { label: 'Timeline.labels', href: 'https://gsap.com/docs/v3/GSAP/Timeline/labels' },
    { label: 'Timeline.addLabel()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/addLabel()' },
    { label: 'Timeline.currentLabel()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/currentLabel()' },
    { label: 'Timeline.nextLabel()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/nextLabel()' },
    { label: 'Timeline.previousLabel()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/previousLabel()' },
    { label: 'Timeline.removeLabel()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/removeLabel()' },
    { label: 'Timeline.seek()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/seek()' },
  ],
} as const

/** 공식 source item 76개를 "이름을 만들고, 묻고, 그 이름으로 이동하고, 지운다"는 흐름의 일곱 단계에 대응시킨다. */
export const timelineLabelsSections = [
  { number: '01', id: 'label-map', title: 'label은 이름과 시각을 짝지은 지도다', sourceItems: 5 },
  { number: '02', id: 'add-label', title: '이름 붙이기', sourceItems: 8 },
  { number: '03', id: 'label-position', title: '이름을 어디에 붙일지 정하기', sourceItems: 21 },
  { number: '04', id: 'label-navigation', title: '지금 어느 이름인지, 앞뒤 이름은 무엇인지 묻기', sourceItems: 22 },
  { number: '05', id: 'seek-by-name', title: '이름으로 이동하기', sourceItems: 14 },
  { number: '06', id: 'remove-label', title: '이름 지우기', sourceItems: 6 },
  { number: '07', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 0 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const timelineLabelsCoverage = {
  officialSources: 7,
  officialSourceItems: 76,
  localSections: 7,
} as const
