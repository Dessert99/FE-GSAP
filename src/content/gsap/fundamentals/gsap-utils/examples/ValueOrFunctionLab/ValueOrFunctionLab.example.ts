/** 같은 utility를 인자를 다 주고 부를 때와 하나 빼고 부를 때 무엇이 돌아오는지를 실제 호출로 확인한다. */
import gsap from 'gsap'

/** 이 예제가 고르는 두 호출 방식 — 공식이 말한 "값" 모드와 "함수를 돌려주는" 모드다. */
export type UtilityMode = 'value' | 'function'

/** 화면 코드·실제 호출·읽기 표가 함께 쓰는 단일 실행 descriptor다. */
export type ValueOrFunctionDescriptor = {
  mode: UtilityMode
  /** 잘라 낼 대상 숫자 — 유일한 자유 입력값이다. */
  input: number
  /** clamp가 지킬 범위의 아래끝 — 공식 pipe 예제가 쓴 0을 그대로 쓴다. */
  min: number
  /** clamp가 지킬 범위의 위끝 — 공식 pipe 예제가 쓴 100을 그대로 쓴다. */
  max: number
  /** pipe 뒤에 이어 붙는 snap의 증분 — 공식 pipe 예제가 쓴 5를 그대로 쓴다. */
  increment: number
}

/** "이 식을 부르면 무엇이 돌아오나"를 식·타입·결과·뜻으로만 기록한다. */
export type ExpressionReading = {
  expression: string
  returned: string
  result: string
  note: string
}

// 공식 gsap.utils 표의 pipe 예제 pipe(clamp(0, 100), snap(5))(8)이 쓴 값을 그대로 고정값으로 삼는다
const OFFICIAL_RANGE = { min: 0, max: 100, increment: 5 }

/** 화면에서 들어온 문자열을 실제로 호출에 쓸 수 있는 숫자로만 좁힌다. */
export function normalizeInput(raw: string) {
  // 공백뿐인 입력은 Number가 0으로 바꾸기 전에 공식 예제의 8로 되돌린다
  if (raw.trim() === '') return 8

  // 숫자 문자열만 실제 utility에 넘길 값으로 바꾼다
  const parsed = Number(raw)

  // 숫자가 아닌 입력에서도 표가 비지 않도록 공식 예제의 8로 되돌린다
  return Number.isFinite(parsed) ? parsed : 8
}

/** controls 값을 실제 호출과 표시 코드가 공유할 하나의 descriptor로 정규화한다. */
export function createDescriptor(mode: UtilityMode, input: number): ValueOrFunctionDescriptor {
  return { mode, input, ...OFFICIAL_RANGE }
}

/** 읽은 값을 JavaScript 표기에 가깝게 문자열로 바꾼다. */
function show(value: unknown) {
  if (typeof value === 'function') return '(함수)'
  if (typeof value === 'string') return `'${value}'`
  return String(value)
}

/** descriptor대로 gsap.utils를 실제로 호출하고, 각 단계에서 무엇이 돌아왔는지 그대로 기록한다. */
export function runValueOrFunction(descriptor: ValueOrFunctionDescriptor): ExpressionReading[] {
  // 같은 descriptor에서 호출 방식·입력·범위·증분을 꺼내 모든 실행 단계가 같은 값을 쓰게 한다
  const { mode, input, min, max, increment } = descriptor

  if (mode === 'value') {
    // 인자를 끝까지 다 넘기면 계산이 그 자리에서 끝나고 숫자 하나가 돌아온다
    const clamped = gsap.utils.clamp(min, max, input)

    return [
      {
        expression: `gsap.utils.clamp(${min}, ${max}, ${input})`,
        returned: typeof clamped,
        result: show(clamped),
        note: '자를 범위와 자를 값을 한 번에 넘겼습니다. 계산이 끝난 숫자가 바로 돌아옵니다.',
      },
    ]
  }

  // 마지막 인자를 빼고 부르면 계산 대신 "나중에 값을 받으면 자르는 함수"가 돌아온다
  const limit = gsap.utils.clamp(min, max)
  // 돌려받은 함수를 실제로 값에 적용해 본다
  const limited = limit(input)
  // 돌려받은 함수는 다른 utility와 이어 붙일 수 있다 — 공식이 강조한 "조합"이 이 자리에서 가능해진다
  const limitThenSnap = gsap.utils.pipe(limit, gsap.utils.snap(increment))
  // 같은 입력을 완성된 pipeline에 넣어 clamp 뒤 snap까지 지난 최종 숫자를 읽는다
  const piped = limitThenSnap(input)

  return [
    {
      expression: `gsap.utils.clamp(${min}, ${max})`,
      returned: typeof limit,
      result: show(limit),
      note: '자를 값을 빼고 불렀습니다. 숫자가 아니라 함수가 돌아옵니다.',
    },
    {
      expression: `limit(${input})`,
      returned: typeof limited,
      result: show(limited),
      note: '돌려받은 함수에 값을 넣어야 그때 계산이 일어납니다.',
    },
    {
      expression: `gsap.utils.pipe(limit, gsap.utils.snap(${increment}))(${input})`,
      returned: typeof piped,
      result: show(piped),
      note: `함수라서 다른 함수와 이어 붙일 수 있습니다. 자른 뒤 ${increment} 단위로 붙였습니다.`,
    },
  ]
}
