/** Timeline sequence 전체를 조작하는 페이지의 source·섹션·coverage 계약을 고정한다. */
export const timelinePlaybackControlsMeta = {
  title: '전체 sequence를 하나의 animation처럼 어떻게 제어하나요?',
  category: 'GSAP · Timeline Methods',
  summary:
    'Timeline의 playhead 하나를 멈추거나 뒤집으면 안에 놓인 children 전체가 같은 순서를 유지한 채 따라갑니다. 여덟 메서드를 상태·명령·관찰의 세 역할로 묶어 봅니다.',
  sourcePath: 'src/content/gsap/fundamentals/timeline-playback-controls/',
  reviewedAt: '2026-08-13',
  officialSources: [
    { label: 'Timeline.isActive()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/isActive()' },
    { label: 'Timeline.pause()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/pause()' },
    { label: 'Timeline.paused()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/paused()' },
    { label: 'Timeline.play()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/play()' },
    { label: 'Timeline.restart()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/restart()' },
    { label: 'Timeline.resume()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/resume()' },
    { label: 'Timeline.reverse()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/reverse()' },
    { label: 'Timeline.reversed()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/reversed()' },
  ],
} as const

/** 공식 item 65개를 초보자가 묻는 순서의 다섯 학습 단계로 재배치한다. */
export const timelinePlaybackControlsSections = [
  { number: '01', id: 'playback-model', title: '부모 playhead 하나가 sequence 전체를 이끈다', sourceItems: 14 },
  { number: '02', id: 'playback-commands', title: '멈추고, label에서 재생하고, 방향을 유지해 잇기', sourceItems: 20 },
  { number: '03', id: 'restart-and-reverse', title: '처음부터 다시 가거나 순서 전체를 되감기', sourceItems: 18 },
  { number: '04', id: 'state-readout', title: '상태를 읽고 쓰되 active는 계산하기', sourceItems: 13 },
  { number: '05', id: 'boundaries', title: 'playback과 playhead의 경계', sourceItems: 0 },
] as const

/** source와 item 분모를 화면과 정적 감사에서 같은 값으로 사용한다. */
export const timelinePlaybackControlsCoverage = {
  officialSources: 8,
  officialSourceItems: 65,
  probeItems: 8,
  localSections: 5,
} as const
