/** CustomEase 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const customEaseMeta = {
  title: '원하는 속도 곡선을 직접 어떻게 만들까요?',
  category: 'GSAP · Easing',
  summary:
    'power나 bounce처럼 미리 준비된 ease로는 만들 수 없는 움직임이 있습니다. CustomEase는 곡선을 SVG path 문자열 하나로 받아 이름을 붙여 두고, 이후 어떤 tween에서든 그 이름으로 부르게 해 줍니다.',
  sourcePath: 'src/content/gsap/fundamentals/custom-ease/',
  reviewedAt: '2026-08-13',
  officialSources: [{ label: 'CustomEase', href: 'https://gsap.com/docs/v3/Eases/CustomEase/' }],
} as const

/** 공식 source item 29개를 "곡선을 직접 만들어 쓰기까지"의 일곱 단계에 대응시킨다. */
export const customEaseSections = [
  { number: '01', id: 'curve-as-function', title: '준비된 ease로는 못 만드는 움직임이 있습니다', sourceItems: 2 },
  { number: '02', id: 'setup', title: 'core에 없으니 따로 가져와 등록합니다', sourceItems: 5 },
  { number: '03', id: 'create-and-reference', title: '한 번 만들어 두고 이름으로 부릅니다', sourceItems: 4 },
  { number: '04', id: 'path-data', title: '곡선은 path 문자열 하나에 들어 있습니다', sourceItems: 4 },
  { number: '05', id: 'visualizer', title: '곡선을 그려서 문자열로 가져옵니다', sourceItems: 11 },
  { number: '06', id: 'get-svg-data', title: '만든 곡선을 그림으로 되돌려 봅니다', sourceItems: 3 },
  { number: '07', id: 'boundaries', title: '사용 전에 남은 경계 확인하기', sourceItems: 0 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const customEaseCoverage = {
  officialSources: 1,
  officialSourceItems: 29,
  localSections: 7,
} as const
