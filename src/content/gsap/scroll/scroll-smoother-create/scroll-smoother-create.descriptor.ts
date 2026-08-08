/** 전역 ScrollSmoother bootstrap에서만 쓸 하나의 creation 값을 고정한다. */
export const scrollSmootherCreationDescriptor = {
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: 1,
  effects: true,
} as const
