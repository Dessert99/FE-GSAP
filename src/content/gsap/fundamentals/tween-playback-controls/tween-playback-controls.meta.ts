/** 같은 Tween을 재생·정지·재시작·역재생하는 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const tweenPlaybackControlsMeta = {
  title: '같은 Tween을 어떻게 재생·정지·재시작·역재생하나요?',
  category: 'GSAP · Tween Methods',
  summary:
    'Tween을 만들었다면 그 다음은 조작입니다. 여덟 개의 메서드가 있지만 실제로 하는 일은 둘뿐입니다. 재생 상태를 바꾸는 명령이거나, 지금 상태를 읽는 질문이거나.',
  sourcePath: 'src/content/gsap/fundamentals/tween-playback-controls/',
  reviewedAt: '2026-08-05',
  officialSources: [
    { label: 'Tween.isActive()', href: 'https://gsap.com/docs/v3/GSAP/Tween/isActive()' },
    { label: 'Tween.pause()', href: 'https://gsap.com/docs/v3/GSAP/Tween/pause()' },
    { label: 'Tween.paused()', href: 'https://gsap.com/docs/v3/GSAP/Tween/paused()' },
    { label: 'Tween.play()', href: 'https://gsap.com/docs/v3/GSAP/Tween/play()' },
    { label: 'Tween.restart()', href: 'https://gsap.com/docs/v3/GSAP/Tween/restart()' },
    { label: 'Tween.resume()', href: 'https://gsap.com/docs/v3/GSAP/Tween/resume()' },
    { label: 'Tween.reverse()', href: 'https://gsap.com/docs/v3/GSAP/Tween/reverse()' },
    { label: 'Tween.reversed()', href: 'https://gsap.com/docs/v3/GSAP/Tween/reversed()' },
  ],
} as const

/** 공식 source item 66개를 "지금 이 Tween을 어떻게 하고 싶은가"라는 의도의 여섯 단계에 대응시킨다. */
export const tweenPlaybackControlsSections = [
  { number: '01', id: 'playback-model', title: '재생 상태는 스위치 두 개로 정해진다', sourceItems: 14 },
  { number: '02', id: 'stop-and-go', title: '멈추고 다시 움직이기', sourceItems: 20 },
  { number: '03', id: 'restart-from-start', title: '처음으로 되감고 다시 재생하기', sourceItems: 6 },
  { number: '04', id: 'reverse-direction', title: '방향을 뒤집기', sourceItems: 12 },
  { number: '05', id: 'state-getters', title: '같은 이름으로 읽기도 하고 쓰기도 한다', sourceItems: 14 },
  { number: '06', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 0 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const tweenPlaybackControlsCoverage = {
  officialSources: 8,
  officialSourceItems: 66,
  localSections: 6,
} as const
