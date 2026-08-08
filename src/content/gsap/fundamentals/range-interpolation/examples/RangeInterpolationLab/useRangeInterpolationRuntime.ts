/** 한 입력을 다섯 utility로 계산하고 controls·표·코드가 공유할 snapshot 하나를 만든다. */
import { useMemo, useState } from 'react'
import gsap from 'gsap'

/** 마지막 인자를 지금 줄지 나중에 줄지 결정하는 두 공식 호출 방식이다. */
export type CallStyle = 'direct' | 'reusable'

/** 같은 progress를 어떤 값 형태로 바꿀지 고르는 네 공식 보간 대상이다. */
export type InterpolationMode = 'number' | 'color' | 'array' | 'object'

/** 화면 코드가 실제 보간 인자와 결과를 그대로 읽도록 문자열 표현까지 묶는다. */
export type InterpolationReading = {
  // 네 공식 data shape 중 현재 실제 호출에 사용한 종류다
  mode: InterpolationMode
  // 표시 코드가 실제 시작값을 그대로 쓰도록 보존한 JavaScript 표현이다
  startText: string
  // 표시 코드가 실제 끝값을 그대로 쓰도록 보존한 JavaScript 표현이다
  endText: string
  // GSAP interpolate가 실제로 반환한 형태별 값이다
  value: number | string | number[] | { x: number; opacity: number }
  // 표가 별도 계산 없이 실제 반환을 읽도록 만든 문자열이다
  resultText: string
}

/** 색 성분 표가 RGB(A)와 HSL(A)를 같은 color 결과에서 읽도록 고정한다. */
export type ColorReading = {
  // 색 보간의 실제 시작값을 표시 코드가 공유한다
  startText: string
  // 색 보간의 실제 끝값을 표시 코드가 공유한다
  endText: string
  // splitColor에 실제로 넘긴 보간 color 문자열이다
  value: string
  // 같은 color 문자열에서 읽은 RGB(A) 성분이다
  rgb: number[]
  // 같은 color 문자열에서 읽은 HSL(A) 성분이다
  hsl: number[]
}

/** 한 번의 계산에서 나온 입력·중간값·보간값·색 성분을 함께 보존한다. */
export type RangeInterpolationSnapshot = {
  // 이번 snapshot이 사용한 즉시값·재사용함수 호출 방식이다
  callStyle: CallStyle
  // slider에서 받은 원본 숫자다
  input: number
  // clamp와 normalize가 공유한 입력 범위의 아래끝이다
  inputMin: number
  // clamp와 normalize가 공유한 입력 범위의 위끝이다
  inputMax: number
  // clamp가 실제 반환한 안전한 입력이다
  limited: number
  // normalize가 실제 반환한 0~1 상대 위치다
  progress: number
  // mapRange가 실제 반환한 0~360 숫자다
  mappedDegrees: number
  // 선택 mode로 실제 보간한 값과 표시 descriptor다
  interpolation: InterpolationReading
  // 같은 progress의 color와 splitColor 두 반환이다
  color: ColorReading
}

// slider가 경계 밖 입력과 clamp 결과를 모두 보여 주도록 공식 0~100 범위보다 넓게 둔다
const INPUT_CONTROL = { min: -50, max: 150, step: 1 }
// pipeline의 안전 범위는 공식 예제와 같은 0~100이다
const INPUT_RANGE = { min: 0, max: 100 }
// mapRange와 number interpolate가 옮길 출력 범위는 한 바퀴 각도다
const OUTPUT_RANGE = { min: 0, max: 360 }
// color 모드와 splitColor 표가 공유하는 두 끝색이다
const COLOR_RANGE = { start: '#ff6b6b', end: '#4dabf7' }

/** 배열·객체도 코드와 표에서 같은 표기로 읽도록 결과를 JavaScript 문법으로 바꾼다. */
function formatResult(value: InterpolationReading['value']) {
  if (typeof value === 'string') return `'${value}'`
  return JSON.stringify(value)
}

/** direct와 reusable이 같은 입력·출력 계약을 쓰도록 숫자 utility 호출만 갈라 준다. */
function runNumberUtility(callStyle: CallStyle, direct: () => number, reusable: () => (value: number) => number, value: number) {
  return callStyle === 'direct' ? direct() : reusable()(value)
}

/** interpolate의 마지막 progress 인자 유무만 바꾸고 결과 타입은 그대로 보존한다. */
function runInterpolation<T>(callStyle: CallStyle, start: T, end: T, progress: number) {
  return callStyle === 'direct' ? gsap.utils.interpolate(start, end, progress) : gsap.utils.interpolate(start, end)(progress)
}

/** 현재 mode의 두 끝값과 실제 보간 결과를 하나의 읽기값으로 만든다. */
function createInterpolationReading(callStyle: CallStyle, mode: InterpolationMode, progress: number): InterpolationReading {
  if (mode === 'number') {
    // number 모드는 mapRange와 같은 0→360 결과를 interpolate로 다시 확인한다
    const value = runInterpolation(callStyle, OUTPUT_RANGE.min, OUTPUT_RANGE.max, progress)
    return { mode, startText: '0', endText: '360', value, resultText: formatResult(value) }
  }

  if (mode === 'color') {
    // color 모드는 같은 progress를 두 hex color 사이의 rgba 문자열로 바꾼다
    const value = runInterpolation(callStyle, COLOR_RANGE.start, COLOR_RANGE.end, progress)
    return { mode, startText: `'${COLOR_RANGE.start}'`, endText: `'${COLOR_RANGE.end}'`, value, resultText: formatResult(value) }
  }

  if (mode === 'array') {
    // array 모드는 두 좌표 배열의 각 index를 같은 progress로 보간한다
    const value = runInterpolation(callStyle, [0, 20], [100, 80], progress)
    return { mode, startText: '[0, 20]', endText: '[100, 80]', value, resultText: formatResult(value) }
  }

  // object 모드는 x와 opacity를 한 progress로 함께 보간하되 기본 동작대로 원본을 보존한다
  const value = runInterpolation(callStyle, { x: 0, opacity: 0 }, { x: 360, opacity: 1 }, progress)
  return {
    mode,
    startText: '{ x: 0, opacity: 0 }',
    endText: '{ x: 360, opacity: 1 }',
    value,
    resultText: formatResult(value),
  }
}

/** controls 상태를 실제 GSAP 호출 한 번의 읽기 snapshot으로 계산한다. */
function createSnapshot(callStyle: CallStyle, mode: InterpolationMode, input: number): RangeInterpolationSnapshot {
  // clamp는 뒤 단계가 공식 계약 밖 값을 받지 않도록 먼저 입력을 0~100에 가둔다
  const limited = runNumberUtility(
    callStyle,
    () => gsap.utils.clamp(INPUT_RANGE.min, INPUT_RANGE.max, input),
    () => gsap.utils.clamp(INPUT_RANGE.min, INPUT_RANGE.max),
    input,
  )
  // normalize는 안전해진 0~100 입력을 형태와 무관한 0~1 progress로 바꾼다
  const progress = runNumberUtility(
    callStyle,
    () => gsap.utils.normalize(INPUT_RANGE.min, INPUT_RANGE.max, limited),
    () => gsap.utils.normalize(INPUT_RANGE.min, INPUT_RANGE.max),
    limited,
  )
  // mapRange는 같은 progress 위치를 실제 animation 값으로 쓸 0~360 숫자로 옮긴다
  const mappedDegrees = runNumberUtility(
    callStyle,
    () => gsap.utils.mapRange(0, 1, OUTPUT_RANGE.min, OUTPUT_RANGE.max, progress),
    () => gsap.utils.mapRange(0, 1, OUTPUT_RANGE.min, OUTPUT_RANGE.max),
    progress,
  )
  // 현재 mode의 보간값은 앞에서 만든 바로 그 progress를 사용한다
  const interpolation = createInterpolationReading(callStyle, mode, progress)
  // splitColor가 읽을 색도 선택 mode와 무관하게 같은 progress에서 한 번만 만든다
  const colorValue = runInterpolation(callStyle, COLOR_RANGE.start, COLOR_RANGE.end, progress)
  // RGB(A) 성분은 실제 color 보간 결과를 다시 GSAP에 넣어 읽는다
  const rgb = [...gsap.utils.splitColor(colorValue)]
  // HSL(A) 성분도 별도 색 계산 없이 같은 color 결과에서 읽는다
  const hsl = [...gsap.utils.splitColor(colorValue, true)]

  return {
    callStyle,
    input,
    inputMin: INPUT_RANGE.min,
    inputMax: INPUT_RANGE.max,
    limited,
    progress,
    mappedDegrees,
    interpolation,
    color: { startText: `'${COLOR_RANGE.start}'`, endText: `'${COLOR_RANGE.end}'`, value: colorValue, rgb, hsl },
  }
}

/** lab의 controls와 단일 계산 snapshot을 제공한다. */
export function useRangeInterpolationRuntime() {
  // 입력 범위 밖 동작부터 볼 수 있도록 slider는 25에서 출발한다
  const [input, setInput] = useState(25)
  // 마지막 인자 유무가 결과가 아니라 호출 시점만 바꾼다는 점을 비교한다
  const [callStyle, setCallStyle] = useState<CallStyle>('direct')
  // 한 progress가 여러 data shape로 바뀌는 것을 선택한다
  const [mode, setMode] = useState<InterpolationMode>('number')
  // controls 한 번의 상태에서 실제 호출과 모든 화면 읽기값을 한 번만 계산한다
  const snapshot = useMemo(() => createSnapshot(callStyle, mode, input), [callStyle, input, mode])

  // TSX는 실행 의미를 다시 만들지 않고 이 snapshot과 controls setter만 소비한다
  return { input, setInput, callStyle, setCallStyle, mode, setMode, snapshot, inputControl: INPUT_CONTROL }
}
