/** getUnit과 unitize가 같은 입력에서 떼어 낸 단위·숫자·최종 문자열을 한 번에 기록한다. */
import { useState } from 'react'
import gsap from 'gsap'

/** 단위를 입력에서 보존할지 특정 CSS 단위로 바꿀지 고르는 실행 모드다. */
export type UnitMode = 'preserve' | 'px' | 'percent'

/** controls와 실제 unitize 호출에 함께 쓰는 정규화 descriptor다. */
export type UnitDescriptor = {
  input: string
  mode: UnitMode
  forcedUnit?: string
  min: number
  max: number
}

/** unitize가 실제로 안쪽 함수에 넘긴 숫자까지 담는 단일 관찰 결과다. */
export type UnitSnapshot = {
  descriptor: UnitDescriptor
  extractedUnit: string
  receivedNumber: number
  output: string
  code: string
}

// 공식 wrap 예제가 사용한 0~100 범위를 unit 처리 전후에 그대로 쓴다
const UNIT_RANGE = { min: 0, max: 100 } as const

/** UI mode를 unitize의 선택 인자와 함께 쓸 descriptor로 바꾼다. */
function createDescriptor(input: string, mode: UnitMode): UnitDescriptor {
  // preserve는 unit 인자를 생략하고 나머지는 화면 이름을 실제 단위 문자열로 바꾼다
  const forcedUnit = mode === 'preserve' ? undefined : mode === 'percent' ? '%' : 'px'
  return { input, mode, forcedUnit, ...UNIT_RANGE }
}

/** descriptor로 getUnit과 unitize를 실제 호출하고 UI가 공유할 snapshot을 만든다. */
export function createUnitSnapshot(descriptor: UnitDescriptor): UnitSnapshot {
  // getUnit이 숫자 뒤에서 실제로 분리한 단위를 읽는다
  const extractedUnit = gsap.utils.getUnit(descriptor.input)
  // unitize가 parseFloat 뒤 안쪽 함수에 실제로 넘긴 숫자를 기록한다
  let receivedNumber = Number.NaN
  // 단위가 제거된 숫자를 받아 0~100 범위로 순환시키는 안쪽 함수다
  const wrapNumber = (value: string | number) => {
    receivedNumber = Number(value)
    // 숫자로 시작하지 않은 입력은 wrap overload로 보내지 않고 의미 없는 CSS 계산을 중단한다
    if (!Number.isFinite(receivedNumber)) return Number.NaN
    return gsap.utils.wrap(descriptor.min, descriptor.max, receivedNumber)
  }
  // 강제 단위가 없으면 입력 단위를 보존하고 있으면 선택한 단위로 바꾸는 함수를 만든다
  const makeCssValue = gsap.utils.unitize(wrapNumber, descriptor.forcedUnit)
  // 단위 제거와 재부착을 따로 재현하지 않고 GSAP 반환 문자열을 한 번 읽는다
  const output = makeCssValue(descriptor.input)
  // 실제 descriptor와 관찰 callback을 표시 코드에 같은 구조로 직렬화한다
  const unitArgument = descriptor.forcedUnit ? `, '${descriptor.forcedUnit}'` : ''
  // 자유 입력 문자열을 따옴표·줄바꿈까지 안전한 JavaScript literal로 포맷한다
  const inputLiteral = JSON.stringify(descriptor.input)
  // 코드 패널도 실제 실행처럼 callback에서 받은 숫자를 기록한 뒤 wrap에 넘긴다
  const code = `const extractedUnit = gsap.utils.getUnit(${inputLiteral}) // ${JSON.stringify(extractedUnit)}\n\nlet receivedNumber = Number.NaN\nconst wrapNumber = (value) => {\n  receivedNumber = Number(value)\n  if (!Number.isFinite(receivedNumber)) return Number.NaN\n  return gsap.utils.wrap(${descriptor.min}, ${descriptor.max}, receivedNumber)\n}\n\nconst makeCssValue = gsap.utils.unitize(wrapNumber${unitArgument})\nmakeCssValue(${inputLiteral}) // ${JSON.stringify(output)}`

  return { descriptor, extractedUnit, receivedNumber, output, code }
}

/** 단위 입력·출력 모드 state와 같은 값으로 실행한 snapshot을 UI에 제공한다. */
export function useUnitLabRuntime() {
  // 숫자와 단위를 함께 가진 원본 CSS 문자열이다
  const [input, setInput] = useState('150px')
  // 입력 단위 보존과 강제 단위 두 방식을 고른다
  const [mode, setMode] = useState<UnitMode>('preserve')
  // state를 실제 호출에 쓸 한 descriptor로 정규화한다
  const descriptor = createDescriptor(input, mode)
  // 읽기 표·코드·상태 문장이 함께 쓸 단일 실행 snapshot이다
  const snapshot = createUnitSnapshot(descriptor)

  return { input, setInput, mode, setMode, snapshot }
}
