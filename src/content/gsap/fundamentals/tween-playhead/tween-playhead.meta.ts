/** Tween playhead 학습 페이지의 공식 출처와 로컬 식별 정보를 고정한다. */
export const tweenPlayheadMeta = {
  category: 'Fundamentals · Tween instance',
  title: '초, progress, totalProgress, ratio는 어떻게 다른가요?',
  summary: '같은 playhead 순간을 current cycle·전체 반복·ease 적용값으로 나누어 읽고, 이동 method의 callback 경계를 확인합니다.',
  sourcePath: 'src/content/gsap/fundamentals/tween-playhead/',
  reviewedAt: '2026-08-13',
  officialSources: [
    { label: '공식 Tween.ratio 문서', href: 'https://gsap.com/docs/v3/GSAP/Tween/ratio/' },
    { label: '공식 progress() 문서', href: 'https://gsap.com/docs/v3/GSAP/Tween/progress%28%29/' },
    { label: '공식 seek() 문서', href: 'https://gsap.com/docs/v3/GSAP/Tween/seek%28%29/' },
    { label: '공식 time() 문서', href: 'https://gsap.com/docs/v3/GSAP/Tween/time%28%29/' },
    { label: '공식 totalProgress() 문서', href: 'https://gsap.com/docs/v3/GSAP/Tween/totalProgress%28%29/' },
    { label: '공식 totalTime() 문서', href: 'https://gsap.com/docs/v3/GSAP/Tween/totalTime%28%29/' },
  ],
} as const
