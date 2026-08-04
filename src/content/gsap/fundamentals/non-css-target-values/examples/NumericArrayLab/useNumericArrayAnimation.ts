/** 숫자 배열을 목적지 배열로 보간하면서 index별 값과 길이 불일치 결과를 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'

/** 목적지 배열을 시작 배열과 같은 길이로 둘지 짧게 둘지 고르는 선택지다. */
export type DestinationShape = 'equal' | 'shorter'

/** EndArray가 easing을 적용한다는 사실을 확인할 최소 후보다. */
export type ArrayEase = 'none' | 'power1.inOut'

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type NumericArrayDescriptor = {
  startArray: number[]
  endArray: number[]
  ease: ArrayEase
  progress: number
}

/** index 하나가 지금 어떤 값이고 목적지가 있는지 없는지를 한 행으로 보여준다. */
export type IndexRow = {
  index: number
  start: number
  current: number
  end: number | null
  shared: boolean
}

/** 모든 실행이 같은 값에서 출발하도록 고정한 시작 배열 — 공식 예제의 [1,2,3]에 한 칸을 더해 길이 불일치를 보이게 한다. */
const startArray = [1, 2, 3, 4]

/** 길이가 같은 목적지와 짧은 목적지 — 둘 다 공식 caveat을 관찰하기 위한 값이다. */
const destinations: Record<DestinationShape, number[]> = {
  equal: [5, 6, 7, 8],
  shorter: [5, 6],
}

/** radio·slider 값을 실제 gsap 호출 인자 형태로 한 번에 정규화한다. */
function createDescriptor(shape: DestinationShape, ease: ArrayEase, progress: number): NumericArrayDescriptor {
  return { startArray, endArray: destinations[shape], ease, progress }
}

/** 소수점이 길게 늘어져 표가 흔들리지 않도록 표시용으로만 자른다. */
function round(value: number) {
  return Math.round(value * 100) / 100
}

/** 배열 채널 예제의 controls, paused Tween, index별 관찰값을 제공한다. */
export function useNumericArrayAnimation() {
  // 배열 tween에는 DOM 범위가 필요 없지만 useGSAP의 정리 계약을 그대로 쓰기 위해 scope를 둔다
  const scope = useRef<HTMLDivElement>(null)
  // GSAP이 제자리에서 바꿀 실제 target 배열 — 참조를 유지해야 매번 같은 배열을 관찰한다
  const targetRef = useRef<number[]>([...startArray])
  // 목적지 배열의 길이를 정한다 — 공식 caveat을 눈으로 확인하는 control이다
  const [shape, setShape] = useState<DestinationShape>('equal')
  // 같은 progress에서 값이 달라지는지 비교해 easing 적용을 확인하는 control이다
  const [ease, setEase] = useState<ArrayEase>('none')
  // 자동 재생 대신 사용자가 직접 시간을 옮긴다 — 이 예제의 개념 자체가 index별 중간값이다
  const [progress, setProgress] = useState(0.5)
  // 각 index의 시작·현재·목적지와 공유 여부를 표로 보여줄 관찰값이다
  const [rows, setRows] = useState<IndexRow[]>([])
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(() => createDescriptor(shape, ease, progress), [shape, ease, progress])

  useGSAP(
    () => {
      // 이전 실행이 남긴 값을 지우고 같은 배열 참조 안에서 시작값으로 되돌린다
      descriptor.startArray.forEach((value, index) => {
        targetRef.current[index] = value
      })
      // 배열 자체가 target이고 목적지는 endArray로 넘어간다 — 자동 재생 없이 progress로만 움직인다
      const tween = gsap.to(targetRef.current, {
        endArray: descriptor.endArray,
        ease: descriptor.ease,
        duration: 1,
        paused: true,
      })
      // 사용자가 고른 지점으로 재생 헤드를 옮겨야 그 시점의 index 값이 배열에 쓰인다
      tween.progress(descriptor.progress)
      // GSAP이 배열에 쓴 결과를 그대로 읽어 표로 만든다 — 보간을 다시 계산하지 않는다
      setRows(
        targetRef.current.map((current, index) => ({
          index,
          start: descriptor.startArray[index],
          current: round(current),
          end: index < descriptor.endArray.length ? descriptor.endArray[index] : null,
          shared: index < descriptor.endArray.length,
        })),
      )
    },
    // 목적지 길이·ease·progress 중 하나만 바뀌어도 시작값부터 다시 계산해 결과를 결정적으로 만든다
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // TSX가 controls·index 표·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return {
    scope,
    shape,
    setShape,
    ease,
    setEase,
    progress,
    setProgress,
    descriptor,
    rows,
  }
}
