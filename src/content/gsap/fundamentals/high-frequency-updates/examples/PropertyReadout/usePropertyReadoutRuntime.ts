/** 같은 element를 property·unit·호출 방식만 바꿔 읽어 gsap.getProperty()의 반환 형식을 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'

/** 공식 예제가 읽어 보인 세 property에 "없는 값" 한 칸을 더한 읽기 후보다. */
export type ReadableProperty = 'x' | 'width' | 'backgroundColor' | 'notARealProperty'

/** getProperty의 3번째 인자로 넘길 unit 후보이며 none은 인자를 아예 넘기지 않는다는 뜻이다. */
export type ReadUnit = 'none' | 'px' | 'em'

/** property를 매번 넘기는 직접 호출과, 한 번 만들어 재사용하는 getter 함수 중 무엇으로 읽을지다. */
export type CallStyle = 'direct' | 'getter'

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type PropertyReadoutDescriptor = {
  selector: string
  property: ReadableProperty
  requestedUnit: ReadUnit
  effectiveUnit: ReadUnit
  callStyle: CallStyle
  presetX: number
}

/** getProperty가 실제로 돌려준 값과 그 값의 JavaScript 타입을 그대로 보관한다. */
export type PropertyReadoutObservation = {
  raw: string
  valueType: string
}

/** gsap 선택자이자 대상 div의 className — 실행과 표시가 같은 문자열을 쓴다. */
const targetSelector = '.property-readout__target'

/** 읽기 전에 transform x를 한 번 걸어 두는 값 — 공식 예제의 "x" 읽기를 재현할 기준점이다. */
const presetX = 40

/** 숫자가 아닌 값에는 unit 변환을 요청하지 않아 관찰이 흐려지지 않게 한다. */
const numericProperties: ReadableProperty[] = ['x', 'width']

/** radio 값을 실제 getProperty 인자 형태로 한 번에 정규화한다. */
function createDescriptor(property: ReadableProperty, unit: ReadUnit, callStyle: CallStyle): PropertyReadoutDescriptor {
  // 색상과 없는 property는 unit 없이 읽어야 공식 문장과 그대로 대조된다
  const effectiveUnit = numericProperties.includes(property) ? unit : 'none'

  return { selector: targetSelector, property, requestedUnit: unit, effectiveUnit, callStyle, presetX }
}

/** 문자열은 따옴표를 살리고 null·undefined는 글자로 남겨 반환 형식을 눈으로 구분하게 한다. */
function formatValue(value: unknown) {
  return typeof value === 'string' ? `"${value}"` : String(value)
}

/** 읽기 예제의 controls, getProperty 호출, 반환값 관찰을 제공한다. */
export function usePropertyReadoutRuntime() {
  // 이 예제 밖의 같은 class를 선택하지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 무엇을 읽을지 고르는 control — 공식 예제의 x·width·backgroundColor를 그대로 담았다
  const [property, setProperty] = useState<ReadableProperty>('x')
  // unit 인자를 넘길지 말지를 고르는 control — 반환 타입이 바뀌는 지점이다
  const [unit, setUnit] = useState<ReadUnit>('none')
  // property를 매번 넘길지, getter를 한 번 만들어 재사용할지 고르는 control이다
  const [callStyle, setCallStyle] = useState<CallStyle>('direct')
  // getProperty가 돌려준 값을 계산하지 않고 그대로 담는 관찰 상태다
  const [observation, setObservation] = useState<PropertyReadoutObservation>({ raw: '읽기 전', valueType: '—' })
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(() => createDescriptor(property, unit, callStyle), [property, unit, callStyle])

  useGSAP(
    () => {
      // 읽기와 쓰기가 같은 element를 가리키도록 선택자를 한 번만 풀어 둔다
      const element = gsap.utils.toArray<HTMLElement>(descriptor.selector)[0]
      // 공식 예제처럼 transform x가 걸린 상태를 만들어 두고 그 값을 읽는다
      gsap.set(element, { x: descriptor.presetX })
      // none은 unit 인자를 아예 넘기지 않는다는 뜻이므로 문자열이 아닌 undefined로 바꾼다
      const unitArgument = descriptor.effectiveUnit === 'none' ? undefined : descriptor.effectiveUnit
      // 직접 호출과 재사용 getter는 같은 값을 다른 문법으로 읽는다
      const value: unknown =
        descriptor.callStyle === 'getter'
          ? gsap.getProperty(element)(descriptor.property, unitArgument)
          : gsap.getProperty(element, descriptor.property, unitArgument)
      // GSAP이 돌려준 값을 그대로 담는다 — 값을 다시 계산하거나 보기 좋게 고치지 않는다
      setObservation({ raw: formatValue(value), valueType: typeof value })
    },
    // property·unit·호출 방식 중 하나만 바뀌어도 transform을 되돌리고 처음부터 다시 읽는다
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // TSX가 controls·반환값 패널·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return {
    scope,
    property,
    setProperty,
    unit,
    setUnit,
    callStyle,
    setCallStyle,
    descriptor,
    observation,
  }
}
