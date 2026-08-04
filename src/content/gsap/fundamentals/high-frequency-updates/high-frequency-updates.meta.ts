/** 고빈도 입력 갱신 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const highFrequencyUpdatesMeta = {
  title: '포인터·스크롤 입력마다 새 Tween을 만들지 않고 어떻게 갱신하나요?',
  category: 'GSAP · Core Methods',
  summary:
    '마우스가 한 번 지나갈 때 pointermove는 수십 번 발생합니다. 그때마다 gsap.to()를 부르면 Tween이 그 수만큼 쌓입니다. GSAP은 함수를 미리 한 번 만들어 두고 숫자만 흘려보내는 길을 따로 열어 둡니다.',
  sourcePath: 'src/content/gsap/fundamentals/high-frequency-updates/',
  reviewedAt: '2026-08-04',
  officialSources: [
    { label: 'gsap.getProperty()', href: 'https://gsap.com/docs/v3/GSAP/gsap.getProperty()' },
    { label: 'gsap.quickSetter()', href: 'https://gsap.com/docs/v3/GSAP/gsap.quickSetter()' },
    { label: 'gsap.quickTo()', href: 'https://gsap.com/docs/v3/GSAP/gsap.quickTo()' },
  ],
} as const

/** 공식 source item 46개를 "읽고 → 고르고 → 흘려보낸다"라는 갱신 흐름의 일곱 단계에 대응시킨다. */
export const highFrequencyUpdatesSections = [
  { number: '01', id: 'input-storm', title: '입력 한 번에 Tween 하나씩 만들면', sourceItems: 2 },
  { number: '02', id: 'read-current-value', title: '지금 값이 얼마인지부터 읽는다', sourceItems: 11 },
  { number: '03', id: 'three-fast-paths', title: '읽기·즉시 쓰기·부드럽게 따라가기', sourceItems: 7 },
  { number: '04', id: 'skipped-conveniences', title: '빨라지는 대신 포기하는 것', sourceItems: 12 },
  { number: '05', id: 'follow-the-input', title: 'Tween 하나로 방향만 계속 바꾼다', sourceItems: 9 },
  { number: '06', id: 'pipe-and-multi-value', title: '값을 다듬어 넣고 여러 property를 한 번에', sourceItems: 5 },
  { number: '07', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 0 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const highFrequencyUpdatesCoverage = {
  officialSources: 3,
  officialSourceItems: 46,
  localSections: 7,
} as const
