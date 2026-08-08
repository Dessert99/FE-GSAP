/** 현재 브라우저의 실제 CSS style 지원표에서 checkPrefix 반환을 읽는다. */
import { useState } from 'react'
import gsap from 'gsap'

/** 브라우저별 차이를 관찰하기에 충분한 대표 property와 의도적 미지원 항목이다. */
export type PrefixProperty = 'transform' | 'filter' | 'maskImage' | 'definitelyNotAProperty'

// 공식 타입 표기와 실제 null 가능성을 함께 보존하는 좁은 호출 타입이다
type CheckPrefixRuntime = (property: string) => string | null | undefined

/** 현재 선택과 실제 반환값·표시 코드를 한 번에 전달하는 snapshot이다. */
export type PrefixSnapshot = {
  property: PrefixProperty
  result: string | null | undefined
  code: string
}

/** 선택한 property를 실제 checkPrefix에 한 번 전달해 환경별 결과를 읽는다. */
function createPrefixSnapshot(property: PrefixProperty): PrefixSnapshot {
  // 설치본 타입은 string만 선언하지만 실제 미지원 값은 null이라 호출 지점에서만 타입을 좁힌다
  const checkPrefix = gsap.utils.checkPrefix as CheckPrefixRuntime
  // 현재 브라우저의 style 객체를 기준으로 prefix 결과를 읽는다
  const result = checkPrefix(property)
  // 화면 코드는 실제 선택과 반환값을 같은 snapshot에서 직렬화한다
  const code = `gsap.utils.checkPrefix('${property}') // ${result === null ? 'null' : result === undefined ? 'undefined' : `'${result}'`}`

  return { property, result, code }
}

/** property 선택 state와 실제 브라우저 결과 snapshot을 UI에 제공한다. */
export function usePrefixCheckRuntime() {
  // 브라우저 지원 여부를 확인할 CSS property다
  const [property, setProperty] = useState<PrefixProperty>('transform')
  // 결과·코드·상태가 공유할 한 번 호출 snapshot이다
  const snapshot = createPrefixSnapshot(property)

  return { property, setProperty, snapshot }
}
