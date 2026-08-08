/** 같은 index 목록을 wrap과 wrapYoyo에 동시에 넣어 두 함수가 갈리는 지점을 표로 드러낸다. */
import { useMemo, useState } from 'react'
import { wrapCompareRows, type WrapRow } from './WrapCompare.example'

/** 배열 순환과 숫자 범위 순환 중 무엇을 볼지 고르는 선택지다. */
export type WrapMode = 'array' | 'range'

/** wrap 비교 예제의 controls와 계산 결과를 제공한다. */
export function useWrapCompareRuntime() {
  // 배열 index를 감쌀지 숫자 범위를 감쌀지 정한다
  const [mode, setMode] = useState<WrapMode>('array')
  // 몇 번째 index까지 늘어놓고 볼지 정한다 — 주기가 반복되는 것을 보려면 길이가 필요하다
  const [count, setCount] = useState(9)
  // 순수 계산이라 GSAP 실행 없이 같은 입력에서 항상 같은 표가 나온다
  const rows: WrapRow[] = useMemo(() => wrapCompareRows(mode, count), [mode, count])

  // TSX가 표와 코드 패널을 같은 값에서 그리도록 필요한 것만 전달한다
  return { mode, setMode, count, setCount, rows }
}
