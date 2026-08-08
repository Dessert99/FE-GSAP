/** wrap과 wrapYoyo를 같은 입력에 나란히 호출해 결과만 돌려주는 순수 계산이다. */
import gsap from 'gsap'

/** 표 한 줄 — 같은 index에 두 함수가 각각 무엇을 돌려줬는지 담는다. */
export type WrapRow = {
  index: number
  wrapped: string
  yoyoed: string
}

/** 배열 순환을 보여줄 고정 후보 — 값이 짧아야 순환 주기가 눈에 들어온다. */
export const sampleValues = ['red', 'green', 'yellow'] as const

/** 숫자 범위 순환을 보여줄 고정 구간 — 최댓값 포함 여부 차이를 드러내려고 작은 정수를 쓴다. */
export const sampleRange = { min: 0, max: 3 } as const

/** 같은 index 목록을 두 함수에 넣어 결과를 나란히 만든다. */
export function wrapCompareRows(mode: 'array' | 'range', count: number): WrapRow[] {
  return Array.from({ length: count }, (_, index) => {
    // 배열 모드는 index를 배열 길이로, 범위 모드는 숫자를 min~max로 감싼다
    const wrapped =
      mode === 'array' ? gsap.utils.wrap([...sampleValues], index) : gsap.utils.wrap(sampleRange.min, sampleRange.max, index)
    const yoyoed =
      mode === 'array'
        ? gsap.utils.wrapYoyo([...sampleValues], index)
        : gsap.utils.wrapYoyo(sampleRange.min, sampleRange.max, index)

    return { index, wrapped: String(wrapped), yoyoed: String(yoyoed) }
  })
}
