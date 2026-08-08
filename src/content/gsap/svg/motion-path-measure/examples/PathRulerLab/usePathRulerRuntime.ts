/** one raw path descriptor의 static measurement와 slice result를 계산한다. */
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useMemo, useState } from 'react'

// original geometry와 all measurement calls가 공유하는 raw path descriptor다
export const pathRulerDescriptor = { data: 'M30,130 C90,20 210,20 290,130' }
// utility calls가 plugin core를 사용할 수 있게 등록한다
gsap.registerPlugin(MotionPathPlugin)
/** progress와 interval controls를 RawPath result, marker와 slice code로 연결한다. */
export function usePathRulerRuntime() {
  // marker가 sample할 normalized progress다
  const [progress, setProgress] = useState(0.5)
  // slice가 시작할 normalized progress다
  const [start, setStart] = useState(0.25)
  // slice가 끝날 normalized progress다
  const [end, setEnd] = useState(0.75)
  // descriptor와 three actual utility calls를 same memoized input에서 계산한다
  const measurement = useMemo(() => {
    // string descriptor를 utility가 sample할 RawPath로 정규화한다
    const rawPath = MotionPathPlugin.getRawPath(pathRulerDescriptor.data)
    // progress position을 읽기 전에 length measurements를 RawPath에 cache한다
    MotionPathPlugin.cacheRawPathMeasurements(rawPath)
    // selected progress의 x/y와 tangent angle을 static snapshot으로 계산한다
    const point = MotionPathPlugin.getPositionOnPath(
      rawPath,
      progress,
      true,
    ) as { x: number; y: number; angle: number }
    // selected interval을 overlay가 그릴 새 RawPath로 잘라 낸다
    const slice = MotionPathPlugin.sliceRawPath(rawPath, start, end)
    // cached geometry의 total length와 slice serialization을 같은 snapshot으로 반환한다
    return {
      length: MotionPathPlugin.getLength(rawPath),
      point,
      sliceData: MotionPathPlugin.rawPathToString(slice),
    }
  }, [progress, start, end])
  // lab가 controls와 static geometry snapshot을 함께 받는다
  return { progress, start, end, setProgress, setStart, setEnd, measurement }
}
