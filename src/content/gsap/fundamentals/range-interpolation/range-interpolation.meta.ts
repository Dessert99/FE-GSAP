/** 범위 변환 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const rangeInterpolationMeta = {
  title: '입력 범위를 animation 값과 색으로 어떻게 바꾸나요?',
  category: 'GSAP · Utility Methods',
  summary:
    '센서·pointer·slider가 보내는 숫자는 animation에 바로 쓰기 어려울 때가 많습니다. 먼저 안전한 범위로 자르고, 0~1 progress로 바꾸고, 원하는 숫자·색·배열·객체의 값으로 옮기는 순서를 실제 계산으로 확인합니다.',
  sourcePath: 'src/content/gsap/fundamentals/range-interpolation/',
  reviewedAt: '2026-08-08',
  officialSources: [
    { label: 'utils.clamp()', href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/clamp()' },
    { label: 'utils.interpolate()', href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/interpolate()' },
    { label: 'utils.mapRange()', href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/mapRange()' },
    { label: 'utils.normalize()', href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/normalize()' },
    { label: 'utils.splitColor()', href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/splitColor()' },
  ],
} as const

/** 공식 item 49개를 범위 pipeline에서 형태별 보간과 경계 확인까지 여섯 단계로 다시 묶는다. */
export const rangeInterpolationSections = [
  { number: '01', id: 'pipeline-model', title: '자르기 → 비율 → 새 범위 → 값', sourceItems: 12 },
  { number: '02', id: 'range-contracts', title: 'clamp·normalize·mapRange의 두 호출 방식', sourceItems: 18 },
  { number: '03', id: 'calculation-lab', title: '한 입력이 바뀌는 전 과정을 계산하기', sourceItems: 0 },
  { number: '04', id: 'interpolation-shapes', title: '숫자에서 배열·객체까지 보간하기', sourceItems: 14 },
  { number: '05', id: 'color-components', title: '색 문자열을 성분으로 다시 읽기', sourceItems: 5 },
  { number: '06', id: 'boundaries', title: '0~1 밖과 원문 오류를 구분하기', sourceItems: 0 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const rangeInterpolationCoverage = {
  officialSources: 5,
  officialSourceItems: 49,
  localSections: 6,
} as const
