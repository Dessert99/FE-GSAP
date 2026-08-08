/** toArray()가 selector·NodeList·single object를 어떤 Array snapshot으로 만드는지 실행한다. */
import gsap from 'gsap'
import { useCallback, useEffect, useRef, useState } from 'react'

/** 화면에서 비교할 세 가지 input 모양이다. */
export type CollectionInputMode = 'selector' | 'array-like' | 'single'

/** runtime이 실제로 호출한 형태와 반환된 후보 label을 함께 보존한다. */
export type CollectionSnapshot = {
  mode: CollectionInputMode
  code: string
  labels: string[]
  scopeDescription: string
}

/** input mode를 실제 toArray() 호출과 같은 코드 문장으로 고정한다. */
function createCode(mode: CollectionInputMode) {
  if (mode === 'selector') return "gsap.utils.toArray('.collection-normalization-lab__candidate', scope.current)"
  if (mode === 'array-like') return "gsap.utils.toArray(scope.current.querySelectorAll('.collection-normalization-lab__candidate'))"
  return "gsap.utils.toArray(scope.current.querySelector('.collection-normalization-lab__candidate'))"
}

/** 입력 모양을 바꿔도 같은 scope 안의 실제 후보를 toArray()로 읽는다. */
export function useCollectionNormalizationRuntime() {
  // selector 검색을 document가 아닌 이 예제의 descendant로 제한하는 DOM 경계다
  const scope = useRef<HTMLDivElement>(null)
  // selector·array-like·single 중 실제 toArray() input 형태를 고른다
  const [mode, setMode] = useState<CollectionInputMode>('selector')
  // GSAP이 반환한 Array를 label snapshot으로만 바꿔 표시하는 관찰값이다
  const [snapshot, setSnapshot] = useState<CollectionSnapshot | null>(null)
  // DOM을 읽고 GSAP 호출을 다시 실행해 현재 input 형태의 반환값을 관찰한다
  const inspect = useCallback(() => {
    // 아직 mount되지 않은 동안에는 selector scope를 읽지 않는다
    if (!scope.current) return
    // selector text에는 scope를 함께 줘 descendant 후보만 flat Array로 만든다
    const values = mode === 'selector'
      ? gsap.utils.toArray<HTMLElement>('.collection-normalization-lab__candidate', scope.current)
      // NodeList처럼 array-like인 입력도 GSAP이 flat Array로 정규화한다
      : mode === 'array-like'
        ? gsap.utils.toArray<HTMLElement>(scope.current.querySelectorAll('.collection-normalization-lab__candidate'))
        // single element 하나도 첫 칸 하나인 Array로 감싼다
        : gsap.utils.toArray<HTMLElement>(scope.current.querySelector('.collection-normalization-lab__candidate'))
    // GSAP이 준 같은 Array의 element label만 읽어 화면 snapshot으로 전달한다
    setSnapshot({ mode, code: createCode(mode), labels: values.map((element) => element.dataset.label ?? element.textContent ?? ''), scopeDescription: mode === 'selector' ? 'scope 안의 descendant만 선택' : 'scope 안에서 먼저 만든 입력을 정규화' })
  }, [mode])

  useEffect(() => {
    // mode가 바뀔 때 같은 DOM 후보를 새 input 형태로 바로 다시 읽는다
    inspect()
  }, [inspect])

  // TSX가 controls·실제 call string·결과 snapshot을 같은 runtime state로 그리게 한다
  return { scope, mode, setMode, snapshot, inspect }
}
