/** P11의 공식 출처와 FLIP 학습 분모를 고정한다. */
export const flipFirstLastMeta = {
  title: 'DOM을 바꾼 뒤에도 layout 변화를 자연스럽게 연결하려면?',
  category: 'GSAP · UI · Flip',
  summary:
    'Flip은 First state를 기록하고 DOM을 Last state로 바꾼 다음, 보정값을 반대로 재생해 layout jump를 motion으로 바꿉니다.',
  sourcePath: 'src/content/gsap/ui/flip-first-last/',
  reviewedAt: '2026-08-08',
  officialSources: [
    { label: 'Flip', href: 'https://gsap.com/docs/v3/Plugins/Flip/' },
    { label: 'Flip.from()', href: 'https://gsap.com/docs/v3/Plugins/Flip/static.from()/' },
    { label: 'Flip.getState()', href: 'https://gsap.com/docs/v3/Plugins/Flip/static.getState()/' },
    { label: 'Flip.to()', href: 'https://gsap.com/docs/v3/Plugins/Flip/static.to()/' },
  ],
} as const

/** 공식 item을 First부터 cleanup까지 다섯 학습 질문에 배치한다. */
export const flipFirstLastSections = [
  { id: 'first-last', number: '01', title: 'First와 Last 사이를 역으로 잇습니다', sourceItems: 2 },
  { id: 'capture', number: '02', title: 'getState는 변경 전에 기록합니다', sourceItems: 2 },
  { id: 'from-to', number: '03', title: 'from과 to는 재생 방향이 다릅니다', sourceItems: 3 },
  {
    id: 'vars-caveats',
    number: '04',
    title: 'vars와 nested/simple 경계를 고릅니다',
    sourceItems: 3,
  },
  {
    id: 'cleanup',
    number: '05',
    title: 'interrupt와 framework timing을 정리합니다',
    sourceItems: 2,
  },
] as const

/** 4 canonical, 12 official item, 2 source boundary의 coverage 분모다. */
export const flipFirstLastCoverage = {
  officialSources: 4,
  officialSourceItems: 12,
  sourceVerifiedItems: 2,
  localSections: 5,
} as const
