/** parseEase 입력과 sample 출력을 같은 runtime descriptor에서 계산한다. */
import gsap from 'gsap'
import { useMemo, useState } from 'react'

/** 공식 parseEase 예제에서 직접 확인할 세 문자열 형식이다. */
export type ParseExpression = 'power1' | 'steps(5)' | 'elastic(1.2, 0.5)'

// easing function의 입력·출력을 비교할 고정 progress 지점이다.
const sampleProgresses = [0, 0.25, 0.5, 0.75, 1] as const
// registerEase 공식 sequence에서 이름을 붙일 선형 함수다.
const learningLinear = (progress: number) => progress

/** registerEase 실행과 section code가 공유하는 이름·실제 easing function이다. */
export const registeredEaseDescriptor = { name: 'learningLinear', easingFunction: learningLinear } as const

// 사용자 easing function을 section의 표시 코드와 같은 이름으로 한 번 등록한다.
gsap.registerEase(registeredEaseDescriptor.name, registeredEaseDescriptor.easingFunction)

/** 선택한 ease 문자열을 실제 GSAP function과 sample table로 변환한다. */
export function useParseEaseRuntime() {
  // parse할 공식 문자열 preset을 고른다.
  const [expression, setExpression] = useState<ParseExpression>('power1')
  // motion 없이 같은 입력의 계산을 다시 실행할 수 있게 한다.
  const [runKey, setRunKey] = useState(0)
  // 선택 문자열을 GSAP easing function으로 바꾸고 고정 progress 값을 계산한다.
  const samples = useMemo(() => {
    // 표와 표시 코드가 공유할 실제 GSAP easing function이다.
    const easingFunction = gsap.parseEase(expression)
    // 각 progress가 어떤 value로 변환되는지 고정된 입력 순서로 반환한다.
    return sampleProgresses.map((progress) => ({ progress, value: easingFunction(progress) }))
  }, [expression, runKey])

  // TSX가 select·sample table·code를 같은 runtime 값에서 표시하게 한다.
  return { expression, setExpression, sampleProgresses, samples, replay: () => setRunKey((key) => key + 1) }
}
