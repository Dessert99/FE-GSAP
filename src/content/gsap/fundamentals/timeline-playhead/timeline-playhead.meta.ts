/** Timeline playhead 페이지의 source·섹션·coverage 계약을 고정한다. */
export const timelinePlayheadMeta = {
  title: 'Timeline 위치를 즉시 바꾸거나 부드럽게 이동하려면?',
  category: 'GSAP · Timeline Playhead',
  summary: '같은 playhead 목적지를 초·비율과 local·total 좌표로 고르고, 즉시 setter와 별도 control Tween이 만드는 사용자 경험을 나눠 봅니다.',
  sourcePath: 'src/content/gsap/fundamentals/timeline-playhead/',
  reviewedAt: '2026-08-13',
  officialSources: [
    { label: 'Timeline.progress()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/progress()' },
    { label: 'Timeline.time()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/time()' },
    { label: 'Timeline.totalProgress()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/totalProgress()' },
    { label: 'Timeline.totalTime()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/totalTime()' },
    { label: 'Timeline.tweenFromTo()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/tweenFromTo()' },
    { label: 'Timeline.tweenTo()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/tweenTo()' },
  ],
} as const

/** 공식 item 60개를 좌표 선택부터 control Tween 경계까지 여섯 단계로 재배치한다. */
export const timelinePlayheadSections = [
  { number: '01', id: 'playhead-coordinates', title: '한 playhead를 네 좌표로 읽는다', sourceItems: 15 },
  { number: '02', id: 'direct-setters', title: 'setter는 다음 frame을 기다리지 않고 이동한다', sourceItems: 19 },
  { number: '03', id: 'navigation-tween', title: 'tweenTo는 목적지까지 움직이는 별도 Tween을 만든다', sourceItems: 11 },
  { number: '04', id: 'range-tween', title: 'tweenFromTo는 출발과 도착을 함께 고정한다', sourceItems: 13 },
  { number: '05', id: 'official-differences', title: '공식 기본값과 설치본 실행을 섞지 않는다', sourceItems: 2 },
  { number: '06', id: 'boundaries', title: 'control Tween의 생명주기와 다음 학습 경계를 긋는다', sourceItems: 0 },
] as const

/** source·official item·probe·section 분모를 한 객체에서 화면과 감사에 제공한다. */
export const timelinePlayheadCoverage = { officialSources: 6, officialSourceItems: 60, probeItems: 4, localSections: 6 } as const
