/** CustomBounce가 만든 bounce·squash 곡선과 공 하나의 낙하를 같은 config에서 함께 만들어 낸다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { CustomBounce } from 'gsap/CustomBounce'
import { CustomEase } from 'gsap/CustomEase'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

// 공식 Quick Start와 같은 호출 — CustomBounce는 CustomEase를 확장하므로 둘을 함께 넘긴다
gsap.registerPlugin(CustomEase, CustomBounce)

/** squash ease 이름을 CustomBounce에게 맡길지 직접 지정할지 고르는 두 가지 방식이다. */
export type SquashIdMode = 'derived' | 'explicit'

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type BounceDescriptor = {
  bounceId: string
  createConfig: { strength: number; endAtStart: boolean; squash: number; squashID?: string }
  squashId: string | null
  selector: string
  liftY: number
  duration: number
  squashVars: { scaleX: number; scaleY: number; transformOrigin: string }
}

/** 곡선 그림과 텍스트 대체 설명이 함께 쓰는 ease 관찰값이다. */
export type BounceObservation = {
  bouncePath: string
  squashPath: string | null
  endRatio: number
  ratio: number
}

/** gsap.parseEase와 화면 표시가 같은 이름을 쓰도록 고정한 bounce ease ID다. */
const bounceId = 'labBounce'

/** squashID를 직접 지정할 때만 쓰는 이름 — 임의 입력 대신 값을 두 개로 묶어 registry가 늘어나지 않게 한다. */
const explicitSquashId = 'labBounce-flatten'

/** gsap 선택자이자 공 element의 className — 실행과 표시가 같은 문자열을 쓴다. */
const targetSelector = '.bounce-curve-lab__ball'

/** getSVGData에 넘기는 곡선 상자 크기 — SVG viewBox도 이 숫자에서 나온다. */
export const graphSize = { width: 300, height: 160 } as const

/** 공식 예제의 y: -200을 학습용 무대 높이에 맞춰 줄인 시작 높이다. */
const liftY = -180

/** 공식 예제와 같은 2초를 두 Tween이 함께 쓴다. */
const duration = 2

/** controls 값을 CustomBounce.create와 Tween이 그대로 받을 수 있는 형태로 한 번에 정규화한다. */
function createDescriptor(
  strength: number,
  endAtStart: boolean,
  squash: number,
  squashIdMode: SquashIdMode,
): BounceDescriptor {
  // squash가 0이면 companion ease가 아예 만들어지지 않으므로 이름 자체를 넘기지 않는다
  const squashID = squash > 0 && squashIdMode === 'explicit' ? explicitSquashId : undefined
  // squashID를 생략하면 CustomBounce가 bounce ID 뒤에 "-squash"를 붙인다
  const squashId = squash > 0 ? (squashID ?? `${bounceId}-squash`) : null

  return {
    bounceId,
    createConfig: { strength, endAtStart, squash, ...(squashID ? { squashID } : {}) },
    squashId,
    selector: targetSelector,
    liftY,
    duration,
    squashVars: { scaleX: 1.4, scaleY: 0.6, transformOrigin: 'center bottom' },
  }
}

/** bounce 예제의 controls, paused timeline, 곡선 데이터, 재생·스크럽 action을 제공한다. */
export function useBounceCurveAnimation() {
  // 이 예제 밖의 같은 class를 선택하지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 두 Tween을 한 덩어리로 재생·스크럽하기 위해 timeline을 보관한다
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  // 얼마나 튕길지 정하는 공식 option — 0과 1 사이에서 고른다
  const [strength, setStrength] = useState(0.7)
  // true면 곡선이 시작한 자리로 돌아와 끝난다
  const [endAtStart, setEndAtStart] = useState(false)
  // 바닥에 붙어 있는 구간의 길이 — 0이면 squash ease를 만들지 않는다
  const [squash, setSquash] = useState(0)
  // squash ease 이름을 CustomBounce에게 맡길지 직접 줄지 고른다
  const [squashIdMode, setSquashIdMode] = useState<SquashIdMode>('derived')
  // timeline을 직접 끌어 볼 때와 재생 중일 때 모두 현재 위치를 한 값으로 표시한다
  const [progress, setProgress] = useState(0)
  // 곡선 path와 ease 출력값 — 화면 그림과 텍스트 설명이 같은 값을 쓴다
  const [observation, setObservation] = useState<BounceObservation>({
    bouncePath: '',
    squashPath: null,
    endRatio: 0,
    ratio: 0,
  })
  // 준비·재생·정지 상태를 screen reader에도 전달한다
  const [status, setStatus] = useState('아직 재생하지 않았습니다. 재생을 누르거나 progress를 직접 끌어 보세요.')
  // 운영체제 모션 감소 설정에서는 자동 재생 대신 최종 상태만 보여준다
  const reducedMotion = useReducedMotion()
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(
    () => createDescriptor(strength, endAtStart, squash, squashIdMode),
    [strength, endAtStart, squash, squashIdMode],
  )

  useGSAP(
    () => {
      // 1. config에서 bounce ease를 만든다. squash가 0보다 크면 companion ease도 같은 호출에서 생긴다
      const bounceEase = CustomBounce.create(descriptor.bounceId, descriptor.createConfig)
      // 2. 방금 만든 이름을 그대로 넘겨 곡선을 SVG path 문자열로 받는다
      const bouncePath = CustomEase.getSVGData(descriptor.bounceId, graphSize)
      // 3. squash ease가 있을 때만 두 번째 곡선을 받는다
      const squashPath = descriptor.squashId ? CustomEase.getSVGData(descriptor.squashId, graphSize) : null
      // 4. 이전 실행이 남긴 transform을 지워 항상 바닥·원래 크기에서 출발시킨다
      gsap.set(descriptor.selector, { y: 0, scaleX: 1, scaleY: 1 })

      // 5. 두 Tween을 같은 시각에 놓아 위치와 찌그러짐이 함께 흐르게 한다
      const timeline = gsap.timeline({ paused: true })

      // 6. 시작값 y를 위로 올려 두고 바닥(0)까지 bounce 곡선으로 떨어뜨린다
      timeline.from(descriptor.selector, {
        y: descriptor.liftY,
        duration: descriptor.duration,
        ease: descriptor.bounceId,
      })

      // 7. squash ease가 있을 때만 같은 target·같은 시각에 scale Tween을 겹친다
      if (descriptor.squashId) {
        timeline.to(
          descriptor.selector,
          { ...descriptor.squashVars, duration: descriptor.duration, ease: descriptor.squashId },
          0,
        )
      }

      // 8. 자식 Tween을 다 넣은 뒤에 콜백을 붙여, GSAP이 계산한 위치를 매 프레임 그대로 읽어 온다
      timeline.eventCallback('onUpdate', () => {
        const current = timeline.progress()
        setProgress(current)
        setObservation((previous) => ({ ...previous, ratio: bounceEase(current) }))
      })

      // 재생 handler와 스크럽 handler가 같은 timeline을 쓰도록 보관한다
      timelineRef.current = timeline
      setProgress(0)
      setObservation({ bouncePath, squashPath, endRatio: bounceEase(1), ratio: bounceEase(0) })
      setStatus('현재 설정으로 곡선과 timeline을 다시 만들었습니다.')

      // context 정리 뒤 handler가 사라진 timeline을 건드리지 않게 참조를 비운다
      return () => {
        timelineRef.current = null
      }
    },
    // 네 개 option 중 하나만 바뀌어도 이전 Tween을 되돌리고 곡선부터 다시 만든다
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // 모션 감소 설정에서는 움직임 없이 끝 상태만 보여주고, 아니면 처음부터 재생한다
  function run() {
    const timeline = timelineRef.current
    if (!timeline) return

    if (reducedMotion) {
      timeline.progress(1).pause()
      setStatus('모션 감소 설정이라 이동 없이 마지막 상태만 보여줍니다. progress를 끌면 중간 값도 볼 수 있습니다.')
      return
    }

    timeline.restart()
    setStatus(`${descriptor.duration}초 동안 bounce 곡선을 따라 떨어집니다.`)
  }

  // 사용자가 직접 끄는 값이므로 재생을 멈추고 그 위치의 화면 상태로 곧바로 이동시킨다
  function seek(value: number) {
    const timeline = timelineRef.current
    if (!timeline) return

    timeline.pause().progress(value)
    setStatus(`progress ${value.toFixed(2)} 지점에서 멈춰 있습니다.`)
  }

  // TSX가 controls·무대·곡선·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return {
    scope,
    strength,
    setStrength,
    endAtStart,
    setEndAtStart,
    squash,
    setSquash,
    squashIdMode,
    setSquashIdMode,
    progress,
    descriptor,
    observation,
    status,
    reducedMotion,
    run,
    seek,
  }
}
