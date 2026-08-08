/** 실행하지 않는 Pixi integration의 등록·vars·정리 흐름을 하나로 고정한다. */
export const pixiIntegrationDescriptor = {
  namespace: 'PIXI',
  target: 'sprite',
  duration: 1,
  vars: {
    x: 160,
    y: 80,
    rotation: 60,
    scale: 1.2,
    anchor: 0.5,
    pivotX: 24,
    skewY: 12,
    tint: '#7c3aed',
    blur: 8,
  },
  cleanup: ['tween.kill()', 'app.destroy()'],
} as const
