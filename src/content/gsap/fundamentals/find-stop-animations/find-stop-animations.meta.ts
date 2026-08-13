/** 참조를 잃은 Tween을 찾고 멈추는 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const findStopAnimationsMeta = {
  title: '참조를 잃은 Tween을 어떻게 찾고 안전하게 중단하나요?',
  category: 'GSAP · Query & Kill',
  summary:
    '완료되어 정리되기 전의 Tween은 변수에 담지 않았어도 id나 target으로 조회할 수 있습니다. 찾은 Tween을 현재 상태에서 중단할지(kill), animation 이전 상태로 되돌린 뒤 중단할지(revert)를 구분합니다.',
  sourcePath: 'src/content/gsap/fundamentals/find-stop-animations/',
  reviewedAt: '2026-08-13',
  officialSources: [
    { label: 'gsap.getById()', href: 'https://gsap.com/docs/v3/GSAP/gsap.getById()' },
    { label: 'gsap.getTweensOf()', href: 'https://gsap.com/docs/v3/GSAP/gsap.getTweensOf()' },
    { label: 'gsap.isTweening()', href: 'https://gsap.com/docs/v3/GSAP/gsap.isTweening()' },
    { label: 'gsap.killTweensOf()', href: 'https://gsap.com/docs/v3/GSAP/gsap.killTweensOf()' },
    { label: 'Tween.kill()', href: 'https://gsap.com/docs/v3/GSAP/Tween/kill()' },
    { label: 'Tween.revert()', href: 'https://gsap.com/docs/v3/GSAP/Tween/revert()' },
  ],
} as const

/** 공식 문서 기술 항목 39개를 "찾기 → 범위 좁혀 멈추기 → 되돌리기"라는 흐름의 여섯 단계에 대응시킨다. */
export const findStopAnimationsSections = [
  { number: '01', id: 'lost-reference', title: '변수를 잃어버린 Tween', sourceItems: 3 },
  { number: '02', id: 'find-by-id', title: 'id로 다시 찾는다', sourceItems: 4 },
  { number: '03', id: 'find-by-target', title: 'id가 없으면 target으로 찾는다', sourceItems: 10 },
  { number: '04', id: 'kill-scope', title: '어디까지 멈출지 범위를 고른다', sourceItems: 12 },
  { number: '05', id: 'stop-vs-restore', title: '그 자리에 멈출까, 시작으로 되돌릴까', sourceItems: 10 },
  { number: '06', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 0 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const findStopAnimationsCoverage = {
  officialSources: 6,
  officialSourceItems: 39,
  localSections: 6,
} as const
