/** Timeline 위에 함수와 멈춤 지점을 예약하는 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const timelineCallbacksPausesMeta = {
  title: 'animation 사이에 함수와 멈춤 지점을 어떻게 예약하나요?',
  category: 'GSAP · Timeline Methods',
  summary:
    'Timeline은 animation만 담는 상자가 아닙니다. 시간 위의 특정 지점에 내 함수를 꽂아 둘 수도 있고, 재생을 그 자리에서 멈춰 세울 수도 있습니다. 여기서는 예약하는 여섯 가지 방법과 각각이 언제 실행되는지를 다룹니다.',
  sourcePath: 'src/content/gsap/fundamentals/timeline-callbacks-pauses/',
  reviewedAt: '2026-08-08',
  officialSources: [
    { label: 'gsap.delayedCall()', href: 'https://gsap.com/docs/v3/GSAP/gsap.delayedCall()' },
    { label: 'Timeline.call()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/call()' },
    { label: 'Timeline.addPause()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/addPause()' },
    { label: 'Timeline.removePause()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/removePause()' },
    { label: 'Timeline.eventCallback()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/eventCallback()' },
    { label: 'Timeline.then()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/then()' },
  ],
} as const

/** 공식 source item 60개를 "예약한다 → 어디에 놓나 → 멈춘다 → 끝을 안다"라는 여덟 단계에 대응시킨다. */
export const timelineCallbacksPausesSections = [
  { number: '01', id: 'scheduling-basics', title: '시간 위에 함수를 예약한다는 것', sourceItems: 2 },
  { number: '02', id: 'delayed-call', title: 'Timeline 없이 한 번만 예약하기', sourceItems: 5 },
  { number: '03', id: 'timeline-call', title: 'Timeline 안에 함수를 꽂아 두기', sourceItems: 8 },
  { number: '04', id: 'position-parameter', title: '어디에 놓을지 정하는 문법', sourceItems: 12 },
  { number: '05', id: 'pause-points', title: '재생을 그 자리에 세우고 다시 치우기', sourceItems: 17 },
  { number: '06', id: 'lifecycle-callbacks', title: 'Timeline 전체의 생애 콜백 바꾸기', sourceItems: 11 },
  { number: '07', id: 'completion-promise', title: '완료를 Promise로 기다리기', sourceItems: 5 },
  { number: '08', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 0 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const timelineCallbacksPausesCoverage = {
  officialSources: 6,
  officialSourceItems: 60,
  localSections: 8,
} as const
