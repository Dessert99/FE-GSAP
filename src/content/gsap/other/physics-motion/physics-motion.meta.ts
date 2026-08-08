/** P29의 official identity와 source link를 표시한다. */
export const physicsMotionMeta = {
  title: '속도만으로 어디까지 움직일지 어떻게 정할까요?',
  category: 'GSAP · Other · Physics plugins',
  summary:
    '발사 벡터와 property별 속도 모델을 분리해 physics tween의 입력과 결과를 읽습니다.',
  reviewedAt: '2026-08-08',
  sourcePath: 'src/content/gsap/other/physics-motion/',
  officialSources: [
    {
      label: 'Physics2DPlugin',
      href: 'https://gsap.com/docs/v3/Plugins/Physics2DPlugin/',
    },
    {
      label: 'PhysicsPropsPlugin',
      href: 'https://gsap.com/docs/v3/Plugins/PhysicsPropsPlugin/',
    },
  ],
} as const
