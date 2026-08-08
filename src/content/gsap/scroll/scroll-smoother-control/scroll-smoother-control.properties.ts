/** P38 code panel이 표시할 getter·setter·cleanup signature를 한 곳에 둔다. */
export const scrollSmootherControlProperties = {
  getVelocity: 'smoother.getVelocity(): number',
  offset: 'smoother.offset(target, position?, ignoreSpeed?): number',
  pausedGet: 'smoother.paused(): boolean',
  pausedSet: 'smoother.paused(value: boolean): ScrollSmoother',
  scrollTo: 'smoother.scrollTo(target, smooth?, position?): void',
  scrollTopGet: 'smoother.scrollTop(): number',
  scrollTopSetRendered:
    'smoother.scrollTop(position: number): void // rendered docs',
  scrollTopSetInstalled:
    'smoother.scrollTop(position: number): this // installed 3.15',
  kill: 'smoother.kill(): void',
} as const
