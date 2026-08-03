/** Easing 학습 페이지의 공식 출처와 로컬 식별 정보를 고정한다. */
export const easingMeta = {
  category: 'Fundamentals · Easing',
  title: '같은 거리와 시간인데 왜 움직임이 다르게 느껴지나요?',
  summary: 'ease를 시간 progress를 실제 value로 바꾸는 함수로 읽고, curve·steps·문자열 parsing·이름 등록의 역할을 비교합니다.',
  sourcePath: 'src/content/gsap/fundamentals/easing/',
  reviewedAt: '2026-08-03',
  officialSources: [
    { label: '공식 Easing 문서', href: 'https://gsap.com/docs/v3/Eases/' },
    { label: '공식 gsap.parseEase() 문서', href: 'https://gsap.com/docs/v3/GSAP/gsap.parseEase%28%29/' },
    { label: '공식 gsap.registerEase() 문서', href: 'https://gsap.com/docs/v3/GSAP/gsap.registerEase%28%29/' },
    { label: '공식 SteppedEase 문서', href: 'https://gsap.com/docs/v3/Eases/SteppedEase/' },
  ],
} as const
