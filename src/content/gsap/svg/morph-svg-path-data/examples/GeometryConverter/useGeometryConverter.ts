/** 하나의 descriptor로 DOM conversion과 RawPath 왕복 결과를 동기화한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { useRef, useState } from 'react'

/** DOM conversion의 입력 종류와 swap 정책을 표시 코드까지 공유한다. */
export type GeometryDescriptor = {
  swap: boolean
}
/** 세 utility의 실제 반환값과 사용자 동작 결과만 보관한다. */
export type GeometrySnapshot = {
  convertedD: string
  raw: number[][]
  serialized: string
  status: string
}

gsap.registerPlugin(MorphSVGPlugin)

/** React 바깥 SVG child의 변환·복구 lifecycle을 제공한다. */
export function useGeometryConverter() {
  // scope는 demo DOM replacement cleanup을 현재 geometry에만 한정한다
  const scope = useRef<HTMLDivElement>(null)
  // React는 stable host만 소유하고 conversion 대상은 hook이 그 안에서 관리한다
  const hostRef = useRef<SVGGElement>(null)
  // baseline template과 current node는 React reconciliation 밖의 DOM만 가리킨다
  const baselineRef = useRef<SVGRectElement | null>(null)
  const currentRef = useRef<SVGElement | null>(null)
  // descriptor는 DOM input과 raw/string/code 표시에 같이 쓰는 기준값이다
  const descriptor: GeometryDescriptor = {
    swap: true,
  }
  // snapshot은 utility call이 실제 반환한 DOM/raw/string values만 표시한다
  const [snapshot, setSnapshot] = useState<GeometrySnapshot>({
    convertedD: '',
    raw: [],
    serialized: '',
    status: 'rect 원본 대기',
  })
  // host children을 fresh baseline clone 하나로 교체해 generated node와 stale ref를 없앤다
  const restoreDom = () => {
    const host = hostRef.current
    const baseline = baselineRef.current
    if (!host || !baseline) return
    host.replaceChildren()
    const original = baseline.cloneNode(true) as SVGRectElement
    host.appendChild(original)
    currentRef.current = original
  }
  // learner가 복구하면 DOM과 표시 snapshot을 함께 원본 상태로 되돌린다
  const restoreOriginal = () => {
    restoreDom()
    setSnapshot({
      convertedD: '',
      raw: [],
      serialized: '',
      status: 'rect 원본을 복구했습니다.',
    })
  }
  // descriptor의 three utility calls를 순서대로 실행하고 each actual return을 snapshot으로 남긴다
  const convert = () => {
    const source = currentRef.current
    if (!source) return
    restoreDom()
    const primitive = currentRef.current
    if (!primitive) return
    const paths = MorphSVGPlugin.convertToPath(
      primitive as SVGRectElement,
      descriptor.swap,
    )
    const path = paths[0]
    if (!path) return
    currentRef.current = path
    const convertedD = path.getAttribute('d') || ''
    const raw = MorphSVGPlugin.stringToRawPath(convertedD)
    const serialized = MorphSVGPlugin.rawPathToString(raw)
    setSnapshot({
      convertedD,
      raw,
      serialized,
      status: `${paths.length} path 생성 · DOM swap ${descriptor.swap}`,
    })
  }
  useGSAP(
    () => {
      // mount는 baseline primitive를 만들고 unmount는 hook-owned child/ref를 모두 비운다
      const host = hostRef.current
      if (host) {
        const baseline = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'rect',
        )
        baseline.setAttribute('x', '10')
        baseline.setAttribute('y', '10')
        baseline.setAttribute('width', '80')
        baseline.setAttribute('height', '80')
        baseline.setAttribute('rx', '8')
        baseline.setAttribute('ry', '8')
        baseline.setAttribute('fill', 'none')
        baseline.setAttribute('stroke', 'currentColor')
        baseline.setAttribute('stroke-width', '4')
        baselineRef.current = baseline
        restoreDom()
      }
      return () => {
        hostRef.current?.replaceChildren()
        currentRef.current = null
        baselineRef.current = null
      }
    },
    { scope },
  )
  return { scope, hostRef, descriptor, snapshot, convert, restoreOriginal }
}
