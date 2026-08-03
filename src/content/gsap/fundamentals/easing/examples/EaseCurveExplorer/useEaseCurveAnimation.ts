/** ease descriptor와 paused Tween을 같은 상태에서 만들어 수동 progress만 반영한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'

/** 공식 Core family 중 방향 variant를 비교할 수 있는 선택 범위다. */
export type EaseFamily = 'none' | 'power1' | 'power2' | 'power3' | 'power4' | 'back' | 'bounce' | 'circ' | 'elastic' | 'expo' | 'sine'
/** 같은 family에서 가속이 모이는 위치를 고르는 공식 방향 variant다. */
export type EaseVariant = 'out' | 'inOut' | 'in'

/** 실제 paused Tween과 code serializer가 함께 소비하는 실행 설정이다. */
export type EaseCurveDescriptor = { x: number; duration: number; easeExpression: string; progress: number }

// curve와 동등한 표를 그릴 때 사용하는 고정 progress 지점이다.
const sampleProgresses = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1] as const

/** family와 variant를 실제 Tween과 표시 코드가 함께 쓰는 ease 문자열로 정규화한다. */
function createEaseExpression(family: EaseFamily, variant: EaseVariant) {
  return family === 'none' ? 'none' : `${family}.${variant}`
}

/** curve explorer가 조절·관찰할 paused Tween 상태와 easing sample을 제공한다. */
export function useEaseCurveAnimation() {
  // 예제 Tween과 selector가 이 컨테이너 안에서만 생성되고 정리되게 한다.
  const scope = useRef<HTMLDivElement>(null)
  // 실제 Tween selector와 preview className이 공유하는 대상 이름이다.
  const targetClassName = 'ease-curve-explorer__target'
  // 비교할 Core ease family를 고른다.
  const [family, setFamily] = useState<EaseFamily>('power2')
  // 선택한 family의 in·out·inOut 방향을 고른다.
  const [variant, setVariant] = useState<EaseVariant>('out')
  // autoplay 없이 Tween playhead를 직접 옮길 normalized progress다.
  const [progress, setProgress] = useState(0.5)
  // 현재 값으로 paused Tween을 다시 만들어 runtime과 preview를 재동기화한다.
  const [runKey, setRunKey] = useState(0)
  // controls·Tween·serializer가 함께 사용하는 정규화된 ease 문자열이다.
  const easeExpression = createEaseExpression(family, variant)
  // 이동 거리·시간·ease·playhead를 실제 Tween과 코드 패널이 공유한다.
  const descriptor: EaseCurveDescriptor = { x: 180, duration: 1, easeExpression, progress }
  // graph·table·현재 value가 Tween과 같은 GSAP easing function을 사용하게 한다.
  const easeFunction = gsap.parseEase(easeExpression)
  // curve를 색에 의존하지 않는 표와 SVG 양쪽에서 표시할 sample이다.
  const samples = sampleProgresses.map((sampleProgress) => ({ progress: sampleProgress, value: easeFunction(sampleProgress) }))
  // 현재 slider 위치에서 target에 적용되는 eased value다.
  const currentValue = easeFunction(progress)

  useGSAP(
    () => {
      // 이전 실행이 남긴 transform을 지워 모든 ease를 같은 시작점에서 비교한다.
      gsap.set(`.${targetClassName}`, { x: 0 })
      // 자동 재생 없이 동일 거리 Tween을 만들고 선택한 progress 위치만 즉시 보여준다.
      gsap.to(`.${targetClassName}`, { x: descriptor.x, duration: descriptor.duration, ease: descriptor.easeExpression, paused: true }).progress(descriptor.progress)
    },
    // ease·progress·재실행 중 하나가 바뀌면 이전 Tween을 되돌리고 같은 descriptor로 다시 만든다.
    { scope, dependencies: [descriptor, runKey], revertOnUpdate: true },
  )

  // TSX가 controls·curve·table·code를 같은 runtime 값에서 그리도록 필요한 값만 전달한다.
  return {
    scope,
    targetClassName,
    family,
    setFamily,
    variant,
    setVariant,
    progress,
    setProgress,
    descriptor,
    samples,
    currentValue,
    replay: () => setRunKey((key) => key + 1),
  }
}
