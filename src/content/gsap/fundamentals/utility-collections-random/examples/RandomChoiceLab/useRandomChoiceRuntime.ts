/** random()의 overload와 immediate·reusable function 반환을 한 번의 실제 호출로 관찰한다. */
import gsap from 'gsap'
import { useRef, useState } from 'react'

/** 세 random overload를 학습 화면에서 분리하는 선택지다. */
export type RandomMode = 'range' | 'increment' | 'array'

/** random 호출의 입력과 실제 실행 결과를 화면·코드가 공유하는 descriptor다. */
export type RandomSnapshot = {
  mode: RandomMode
  returnFunction: boolean
  call: string
  value: string | null
}

/** Array overload가 실제로 고를 고정 후보이며 결과만 비결정적이다. */
const colorCandidates = ['red', 'blue', 'green']

/** mode와 returnFunction에 맞는 GSAP random call을 단 한 번 실행한다. */
function callRandom(mode: RandomMode, returnFunction: boolean) {
  // increment 없는 number range는 세 번째 인자에 reusable function 여부를 둔다
  if (mode === 'range') return gsap.utils.random(0, 100, returnFunction)
  // increment range는 세 번째 increment 뒤에 reusable function 여부를 둔다
  if (mode === 'increment') return gsap.utils.random(0, 100, 10, returnFunction)
  // Array overload는 후보 Array 뒤에 reusable function 여부를 둔다
  return gsap.utils.random(colorCandidates, returnFunction)
}

/** mode와 반환 형태가 같은 실제 GSAP 호출을 화면 코드로 직렬화한다. */
function createCall(mode: RandomMode, returnFunction: boolean) {
  const base = mode === 'range' ? 'gsap.utils.random(0, 100' : mode === 'increment' ? 'gsap.utils.random(0, 100, 10' : "gsap.utils.random(['red', 'blue', 'green']"
  return `${base}${returnFunction ? ', true' : ''})`
}

/** random choice example의 mode·reusable function·실행 snapshot을 제공한다. */
export function useRandomChoiceRuntime() {
  // number range·increment range·Array 후보 중 실제 overload를 고른다
  const [mode, setMode] = useState<RandomMode>('increment')
  // returnFunction true로 한 번 만든 reusable function을 같은 참조로 보관한다
  const reusableRef = useRef<(() => number | string) | null>(null)
  // 화면과 코드 패널이 함께 읽는 마지막 실제 random 실행 결과다
  const [snapshot, setSnapshot] = useState<RandomSnapshot | null>(null)
  // overload가 바뀌면 이전 규칙을 기억한 function을 버려 코드와 실행 범위를 일치시킨다
  const selectMode = (nextMode: RandomMode) => {
    // 이전 mode에서 생성한 function은 새 input 규칙에 재사용하지 않는다
    reusableRef.current = null
    // 현재 random overload를 새 mode로 교체한다
    setMode(nextMode)
    // 새 overload는 새 GSAP 호출 전까지 이전 결과를 표시하지 않는다
    setSnapshot(null)
  }
  // returnFunction 없이 GSAP이 즉시 반환한 값 하나를 snapshot으로 기록한다
  const drawImmediately = () => {
    // 현재 mode의 immediate overload를 실행해 GSAP 결과를 한 번만 받는다
    const value = callRandom(mode, false)
    // 코드 문장과 결과를 같은 mode snapshot으로 보관해 두 번 뽑지 않는다
    setSnapshot({ mode, returnFunction: false, call: createCall(mode, false), value: String(value) })
  }
  // 같은 mode 규칙을 계속 사용할 reusable function을 GSAP에서 한 번 만든다
  const createReusable = () => {
    // returnFunction true 결과가 function인지 3.15.0 설치본으로 probe한 호출을 실행한다
    const reusable = callRandom(mode, true)
    // GSAP overload의 function 결과만 ref에 저장해 이후 draw가 같은 함수를 호출하게 한다
    reusableRef.current = reusable as () => number | string
    // 아직 값을 뽑지 않았다는 상태도 실제 생성 call과 함께 화면에 남긴다
    setSnapshot({ mode, returnFunction: true, call: createCall(mode, true), value: null })
  }
  // 이미 만든 reusable function을 다시 호출해 이번 실행값만 새 snapshot으로 남긴다
  const drawReusable = () => {
    // reusable function이 없으면 먼저 만들어 함수 모드의 호출 순서를 보존한다
    if (!reusableRef.current) createReusable()
    // 같은 function 참조가 반환한 값 하나를 실제 화면 결과로 쓴다
    const value = reusableRef.current?.()
    // 코드와 결과는 이미 선택된 mode·function mode descriptor로 함께 기록한다
    if (value !== undefined) setSnapshot({ mode, returnFunction: true, call: createCall(mode, true), value: String(value) })
  }

  // TSX가 controls·code·결과를 runtime snapshot만으로 표시하도록 반환한다
  return { mode, setMode: selectMode, snapshot, drawImmediately, createReusable, drawReusable }
}
