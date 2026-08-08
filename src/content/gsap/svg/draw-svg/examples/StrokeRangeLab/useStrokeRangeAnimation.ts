/** 한 stroke range descriptor를 DrawSVG tween·measurement·code panel이 함께 사용한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** range control이 percentage start/end와 live suffix를 같은 descriptor로 전달한다. */
export type StrokeRangeDescriptor = {
  start: number
  end: number
  live: boolean
  value: string
}
/** getLength/getPosition에서 실제 SVG geometry를 읽어 표시할 snapshot이다. */
export type StrokeMeasurement = {
  length: number
  position: number[]
  endPercent: number
}

// import한 plugin을 GSAP에 한 번 등록해 drawSVG property를 해석한다
gsap.registerPlugin(DrawSVGPlugin)

/** range input이 만든 descriptor를 실제 DrawSVG tween과 measurement에 연결한다. */
export function useStrokeRangeAnimation() {
  // tween과 cleanup이 찾을 lab DOM 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // getLength/getPosition과 drawSVG가 함께 쓸 실제 SVG path다
  const pathRef = useRef<SVGPathElement>(null)
  // visible segment의 앞쪽 percentage를 결정한다
  const [start, setStart] = useState(20)
  // visible segment의 뒤쪽 percentage를 결정한다
  const [end, setEnd] = useState(80)
  // resize 중 length를 tick마다 다시 읽을지 결정한다
  const [live, setLive] = useState(false)
  // media preference가 selected reveal state를 즉시 적용하게 한다
  const reducedMotion = useReducedMotion()
  // 실제 plugin utility가 읽은 length와 interval만 화면에 저장한다
  const [measurement, setMeasurement] = useState<StrokeMeasurement>({
    length: 0,
    position: [0, 0],
    endPercent: 0,
  })
  // start/end/live가 plugin vars와 code panel에 공유하는 단일 range grammar다
  const descriptor: StrokeRangeDescriptor = {
    start,
    end,
    live,
    value: `${start}% ${end}%${live ? ' live' : ''}`,
  }
  // range ordering을 유지해 plugin과 ruler가 같은 forward interval을 읽게 한다
  const setRangeStart = (value: number) => setStart(Math.min(value, end))
  // range ordering을 유지해 plugin과 ruler가 같은 forward interval을 읽게 한다
  const setRangeEnd = (value: number) => setEnd(Math.max(value, start))
  // current rendered style에서 plugin utility 결과를 다시 읽는다
  const refreshMeasurement = () => {
    const path = pathRef.current
    if (!path) return
    const length = DrawSVGPlugin.getLength(path)
    const position = DrawSVGPlugin.getPosition(path)
    setMeasurement({
      length,
      position,
      endPercent: Math.floor(position[1] / (length / 100)),
    })
  }

  useGSAP(
    () => {
      // ref가 연결된 실제 stroke target만 DrawSVG tween으로 변경한다
      const path = pathRef.current
      if (!path) return undefined
      // descriptor value를 tween vars에 그대로 전달해 selected segment를 reveal한다
      const tween = gsap.to(path, {
        drawSVG: descriptor.value,
        duration: reducedMotion ? 0 : 0.7,
        ease: 'power1.out',
        overwrite: true,
        onComplete: refreshMeasurement,
      })
      // tween 시작 직후 utility가 읽는 현재 stroke interval을 snapshot으로 남긴다
      refreshMeasurement()
      return () => {
        // descriptor 변경과 unmount 때 tween과 dash inline styles를 revert한다
        tween.revert()
      }
    },
    {
      scope,
      dependencies: [descriptor.value, reducedMotion],
      revertOnUpdate: true,
    },
  )

  // TSX는 실제 target·descriptor·measurement·control setter만 소비한다
  return {
    scope,
    pathRef,
    descriptor,
    measurement,
    setRangeStart,
    setRangeEnd,
    setLive,
    refreshMeasurement,
    reducedMotion,
  }
}
