/** 공식 docsHome의 Core·plugin 전체 명칭을 목적별 학습 지도 데이터로 보존한다. */
export const coreCapabilityGroups = [
  {
    title: '무엇을 바꿀까요?',
    description: 'Core는 DOM에만 묶이지 않고 숫자로 계산할 수 있는 다양한 값을 Tween의 target으로 받습니다.',
    items: ['CSS properties', 'attributes', 'array values', 'numeric values', 'colors', 'numbers in complex strings'],
  },
  {
    title: '속도감은 어떻게 정할까요?',
    description: 'ease는 같은 거리와 duration 안에서 진행률이 변하는 모양을 정합니다.',
    items: ['none', 'power1', 'power2', 'power3', 'power4', 'back', 'bounce', 'circ', 'elastic', 'expo', 'sine', 'steps(n)'],
  },
  {
    title: '복잡해진 실행은 어떻게 다룰까요?',
    description: '여러 대상, 계산값, 정리, 반응형·모션 접근성 조건을 위한 기능도 Core에 포함됩니다.',
    items: ['staggers', 'callbacks', 'snapping', 'modifiers', 'keyframes', 'ticker + lag smoothing', 'context() + revert()', 'matchMedia(): responsivity + accessibility'],
  },
  {
    title: 'animation 전후 값은 어떻게 계산할까요?',
    description: 'utility는 값을 정규화하거나 조합한 뒤 Tween과 Timeline에 전달하게 돕습니다.',
    items: ['checkPrefix()', 'clamp()', 'distribute()', 'getUnit()', 'interpolate()', 'mapRange()', 'normalize()', 'pipe()', 'random()', 'selector()', 'shuffle()', 'snap()', 'splitColor()', 'toArray()', 'unitize()', 'wrap()', 'wrapYoyo()'],
  },
] as const

/** Core 밖의 특수 능력을 plugin family와 필수 의존성 단위로 묶는다. */
export const pluginFamilies = [
  { family: 'Scroll', useCase: 'scroll 위치에 맞춰 시작·고정·이동·부드러운 화면 흐름을 만들 때', items: ['ScrollTrigger', 'ScrollTo', 'ScrollSmoother'], dependency: 'ScrollSmoother는 ScrollTrigger 필요' },
  { family: 'Text', useCase: '문장을 글자·단어로 나누거나 표시 문자를 단계적으로 바꿀 때', items: ['SplitText', 'ScrambleText', 'Text Replacement'], dependency: null },
  { family: 'SVG', useCase: '선을 그리거나 shape를 바꾸고 path를 따라 대상을 움직일 때', items: ['DrawSVG', 'MorphSVG', 'MotionPath', 'MotionPathHelper'], dependency: null },
  { family: 'UI', useCase: 'layout 전환, drag, 관성, pointer·wheel gesture를 다룰 때', items: ['Flip', 'Draggable', 'Inertia', 'Observer'], dependency: null },
  { family: 'Other', useCase: '물리 기반 속도, animation 디버깅, Canvas·Pixi renderer를 연결할 때', items: ['Physics2D', 'PhysicsProps', 'GSDevTools', 'Easel', 'Pixi'], dependency: null },
  { family: 'Eases', useCase: '기본 ease로 표현하기 어려운 사용자 정의·불규칙·특수 곡선이 필요할 때', items: ['CustomEase', 'EasePack: rough · slow · expoScale', 'CustomWiggle', 'CustomBounce'], dependency: 'CustomWiggle과 CustomBounce는 CustomEase 필요' },
  { family: 'React', useCase: 'React render lifecycle에 맞춰 GSAP 생성과 cleanup을 묶을 때', items: ['useGSAP()'], dependency: 'React lifecycle에 맞춘 npm integration' },
] as const
