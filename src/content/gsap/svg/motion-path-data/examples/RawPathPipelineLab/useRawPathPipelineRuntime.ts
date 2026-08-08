/** one discriminated descriptor로 MotionPath raw-data utility pipeline을 실행한다. */
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useEffect, useMemo, useRef, useState } from 'react'

// selectable input kind가 actual utility call과 code serializer를 함께 결정한다.
export type PipelineKind = 'points' | 'array' | 'svg' | 'string' | 'raw'

// 각 input representation이 가질 수 있는 값만 discriminated descriptor로 고정한다.
export type PipelineDescriptor =
  | { kind: 'points'; label: string; points: number[]; curviness: number }
  | {
      kind: 'array'
      label: string
      values: Array<{ x: number; y: number }>
      curviness: number
      type: 'thru'
    }
  | { kind: 'svg'; label: string; swap: true }
  | { kind: 'string'; label: string; pathData: string }
  | { kind: 'raw'; label: string; raw: number[][] }

// utility가 실제 return한 pipeline stages만 display component로 전달한다.
type PipelineSnapshot = {
  status: string
  raw: number[][]
  serialized: string
  roundTripSegments: number
  convertedD: string
}

// actual utility surface를 module load 때 GSAP core에 등록한다.
gsap.registerPlugin(MotionPathPlugin)

// React reconciliation 밖에서 생성할 baseline SVG rect를 같은 속성으로 재현한다.
const createBaselineRect = () => {
  // swap 전후 같은 geometry를 보장할 imperative original shape를 만든다.
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  rect.setAttribute('x', '32')
  rect.setAttribute('y', '28')
  rect.setAttribute('width', '136')
  rect.setAttribute('height', '76')
  rect.setAttribute('rx', '14')
  rect.setAttribute('fill', 'none')
  rect.setAttribute('stroke', 'currentColor')
  rect.setAttribute('stroke-width', '4')
  return rect
}

/** points·array·SVG·string·raw input을 one RawPath pipeline으로 비교한다. */
export function useRawPathPipelineRuntime() {
  // React가 소유하지 않는 SVG shape/path를 담는 imperative host다.
  const hostRef = useRef<SVGGElement>(null)
  // swap된 current shape를 DOM restoration과 getRawPath call에만 보관한다.
  const currentShapeRef = useRef<SVGElement | null>(null)
  // native select가 utility input representation을 고른다.
  const [kind, setKind] = useState<PipelineKind>('points')
  // pointsToSegment와 arrayToRawPath의 documented curviness를 조절한다.
  const [curviness, setCurviness] = useState(1)
  // actual utility output을 semantic tables에만 저장한다.
  const [snapshot, setSnapshot] = useState<PipelineSnapshot>({
    status: 'input을 고른 뒤 pipeline을 실행하세요.',
    raw: [],
    serialized: '',
    roundTripSegments: 0,
    convertedD: '',
  })
  // selected kind와 curviness가 runtime call과 display code에 공유될 descriptor를 만든다.
  const descriptor = useMemo<PipelineDescriptor>(() => {
    if (kind === 'array') {
      return {
        kind,
        label: 'object point array',
        values: [
          { x: 20, y: 110 },
          { x: 90, y: 20 },
          { x: 180, y: 100 },
        ],
        curviness,
        type: 'thru',
      }
    }
    if (kind === 'svg')
      return { kind, label: 'imperative SVG rect', swap: true }
    if (kind === 'string') {
      return {
        kind,
        label: 'SVG d string',
        pathData: 'M20,110 L90,20 L180,100',
      }
    }
    if (kind === 'raw') {
      return {
        kind,
        label: 'cubic RawPath',
        raw: [[20, 110, 45, 20, 130, 20, 180, 100]],
      }
    }
    return {
      kind: 'points',
      label: 'alternating x/y points',
      points: [20, 110, 90, 20, 180, 100],
      curviness,
    }
  }, [kind, curviness])

  // fresh original rect 하나만 host에 넣어 plugin DOM mutation의 restore target을 확정한다.
  const restoreSvgShape = () => {
    // React가 아닌 host element에서만 plugin replacement 범위를 확인한다.
    const host = hostRef.current
    if (!host) return
    host.replaceChildren()
    // every restore가 stale converted path 대신 fresh baseline을 소유한다.
    const rect = createBaselineRect()
    host.appendChild(rect)
    currentShapeRef.current = rect
  }

  useEffect(() => {
    // mount는 baseline shape를 만들고 unmount는 hook-owned DOM/ref를 모두 제거한다.
    restoreSvgShape()
    return () => {
      hostRef.current?.replaceChildren()
      currentShapeRef.current = null
    }
  }, [])

  // descriptor branch가 선택한 real utility output을 RawPath → string → RawPath pipeline으로 연결한다.
  const runPipeline = () => {
    // selected branch가 최종 serialize에 넘길 RawPath array를 보관한다.
    let raw: number[][]
    // SVG mode에서만 DOM conversion이 만든 d attribute를 남긴다.
    let convertedD = ''
    // actual calls의 branch order를 screen reader status에 설명한다.
    let status = ''

    if (descriptor.kind === 'points') {
      // flat coordinate input을 curviness에 따른 one cubic segment로 바꾼다.
      const segment = MotionPathPlugin.pointsToSegment(
        descriptor.points,
        descriptor.curviness
      )
      raw = [segment]
      status = `pointsToSegment(curviness: ${descriptor.curviness}) → segment`
    } else if (descriptor.kind === 'array') {
      // object anchor array를 documented thru configuration으로 RawPath로 바꾼다.
      raw = MotionPathPlugin.arrayToRawPath(descriptor.values, {
        curviness: descriptor.curviness,
        type: descriptor.type,
      })
      status = `arrayToRawPath(type: ${descriptor.type}, curviness: ${descriptor.curviness})`
    } else if (descriptor.kind === 'svg') {
      restoreSvgShape()
      // host가 현재 가진 imperative rect를 official DOM conversion input으로 읽는다.
      const source = currentShapeRef.current
      if (!source) return
      // official rect input은 installed d.ts의 SVGPathTarget omission을 좁은 cast로 넘긴다.
      // runtime helper가 return한 path array에서 converted SVG path를 받는다.
      const paths = MotionPathPlugin.convertToPath(
        source as unknown as gsap.SVGPathTarget,
        descriptor.swap
      )
      // first converted element가 getRawPath와 display d의 shared source다.
      const path = paths[0]
      if (!path) return
      currentShapeRef.current = path
      convertedD = path.getAttribute('d') || ''
      // swapped path element를 numeric RawPath segment array로 읽는다.
      raw = MotionPathPlugin.getRawPath(path)
      status = 'convertToPath(rect, true) → getRawPath(path)'
    } else if (descriptor.kind === 'string') {
      // d string parser의 direct result로 string input API를 실제 실행한다.
      const parsed = MotionPathPlugin.stringToRawPath(descriptor.pathData)
      // same d string을 getRawPath input으로도 actual call해 input overload를 대조한다.
      raw = MotionPathPlugin.getRawPath(descriptor.pathData)
      status = `stringToRawPath(d) ${parsed.length} segment → getRawPath(d)`
    } else {
      // raw input을 먼저 string으로 serialize해 counterpart parse call에 연결한다.
      const sourceString = MotionPathPlugin.rawPathToString(descriptor.raw)
      // serialized raw input을 numeric RawPath로 다시 parse한다.
      raw = MotionPathPlugin.stringToRawPath(sourceString)
      status = 'rawPathToString(raw) → stringToRawPath(string)'
    }

    // unified RawPath를 SVG d output으로 serialize한다.
    const serialized = MotionPathPlugin.rawPathToString(raw)
    // serialized d를 다시 parse해 one completed raw-path round trip을 확인한다.
    const roundTrip = MotionPathPlugin.stringToRawPath(serialized)
    setSnapshot({
      status,
      raw,
      serialized,
      roundTripSegments: roundTrip.length,
      convertedD,
    })
  }

  // explicit restore는 swap mode 뒤에도 React-owned node를 건드리지 않고 baseline을 되돌린다.
  const restoreSvg = () => {
    restoreSvgShape()
    setSnapshot((current) => ({
      ...current,
      status: 'imperative host의 original rect를 복구했습니다.',
      convertedD: '',
    }))
  }

  // display는 one descriptor, actual snapshot, native controls만 받아 pipeline을 설명한다.
  return {
    hostRef,
    kind,
    setKind,
    curviness,
    setCurviness,
    descriptor,
    snapshot,
    runPipeline,
    restoreSvg,
  }
}
