/** Timeline cleanup 여섯 선택지를 보존 범위 중심의 학습 순서와 공식 source에 연결한다. */
export const timelineCleanupMeta = {
  title: '무엇을 보존하면서 Timeline 내용을 제거하나요?',
  category: 'GSAP · Timeline Cleanup',
  summary:
    '정리는 모두 같은 삭제가 아닙니다. child 하나만 떼기, container를 비우기, target의 property만 멈추기, Timeline을 폐기하기, 화면까지 되돌리기, 완료 child를 자동 배출하기를 “무엇이 남는가”로 비교합니다.',
  sourcePath: 'src/content/gsap/fundamentals/timeline-cleanup/',
  reviewedAt: '2026-08-08',
  officialSources: [
    { label: 'Timeline.autoRemoveChildren', href: 'https://gsap.com/docs/v3/GSAP/Timeline/autoRemoveChildren' },
    { label: 'Timeline.clear()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/clear()' },
    { label: 'Timeline.kill()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/kill()' },
    { label: 'Timeline.killTweensOf()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/killTweensOf()' },
    { label: 'Timeline.remove()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/remove()' },
    { label: 'Timeline.revert()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/revert()' },
  ],
} as const

/** 공식 item 39개를 범위 선택, 네 cleanup 묶음, 자동 배출, 경계의 여섯 단계로 재구성한다. */
export const timelineCleanupSections = [
  { number: '01', id: 'preserve-scope', title: '먼저 남길 것을 고른다', sourceItems: 0 },
  { number: '02', id: 'remove-clear', title: '하나를 떼거나 container만 비운다', sourceItems: 12 },
  { number: '03', id: 'kill-tweens', title: 'target과 property 범위로 멈춘다', sourceItems: 8 },
  { number: '04', id: 'kill-revert', title: '폐기할지 화면까지 되돌릴지 고른다', sourceItems: 16 },
  { number: '05', id: 'auto-remove', title: '완료된 child를 자동으로 배출한다', sourceItems: 3 },
  { number: '06', id: 'boundaries', title: 'UI 생명주기 cleanup과 경계를 긋는다', sourceItems: 0 },
] as const

/** source 대조와 local mapping 분모를 페이지에서 명시적으로 드러낸다. */
export const timelineCleanupCoverage = { officialSources: 6, officialSourceItems: 39, localSections: 6 } as const
