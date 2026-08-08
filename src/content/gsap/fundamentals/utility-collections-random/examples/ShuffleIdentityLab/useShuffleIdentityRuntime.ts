/** shuffle()가 같은 Array reference를 in place로 바꾼 결과를 snapshot으로 읽는다. */
import gsap from 'gsap'
import { useRef, useState } from 'react'

/** mutation 전후 순서와 identity 비교를 화면·코드가 공유하는 실행 snapshot이다. */
export type ShuffleSnapshot = {
  before: string[]
  after: string[]
  sameIdentity: boolean
}

/** 순서만 변하고 항목은 유지되는 것을 보기 위한 고정 Array 내용이다. */
const initialItems = ['첫 번째', '두 번째', '세 번째', '네 번째']

/** shuffle example의 실제 target Array와 반환 참조 비교 결과를 제공한다. */
export function useShuffleIdentityRuntime() {
  // GSAP에 전달할 같은 Array reference를 render 사이에도 유지한다
  const itemsRef = useRef([...initialItems])
  // mutation 전후 순서와 === 비교값을 코드·배지에 전달하는 관찰 snapshot이다
  const [snapshot, setSnapshot] = useState<ShuffleSnapshot>({ before: [...itemsRef.current], after: [...itemsRef.current], sameIdentity: true })
  // 전달한 Array와 반환된 Array가 같은 reference인지 실제 GSAP 호출로 확인한다
  const shuffle = () => {
    // mutation 전 순서는 같은 reference를 훼손하지 않도록 표시용 복사본으로 남긴다
    const before = [...itemsRef.current]
    // GSAP은 itemsRef.current를 in place로 섞고 반환값도 받는다
    const returned = gsap.utils.shuffle(itemsRef.current)
    // 순서 snapshot과 실제 === 결과를 같은 호출 직후에 함께 기록한다
    setSnapshot({ before, after: [...itemsRef.current], sameIdentity: returned === itemsRef.current })
  }
  // 다시 읽기 쉬운 출발 순서를 만들되 shuffle 계약과 혼동하지 않게 별도 action으로 둔다
  const reset = () => {
    // 다음 shuffle도 같은 ref를 유지하도록 Array 내용만 초기값으로 되돌린다
    itemsRef.current.splice(0, itemsRef.current.length, ...initialItems)
    // reset 뒤의 순서와 identity는 현재 reference에서 바로 읽어 보여준다
    setSnapshot({ before: [...itemsRef.current], after: [...itemsRef.current], sameIdentity: true })
  }

  // TSX가 실제 target 순서·반환 identity·action을 같은 runtime state에서 표시하게 한다
  return { snapshot, shuffle, reset }
}
