/** CustomWiggle이 만든 진동 곡선과 바늘 하나의 회전을 같은 config에서 함께 만들어 낸다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { CustomWiggle } from 'gsap/CustomWiggle'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

// 공식 Quick Start와 같은 호출 — CustomWiggle도 CustomEase를 확장하므로 둘을 함께 넘긴다
gsap.registerPlugin(CustomEase, CustomWiggle)

/** 공식이 게시한 다섯 가지 wiggle 스타일이다. */
export type WiggleType = 'easeOut' | 'easeInOut' | 'anticipate' | 'uniform' | 'random'

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type WiggleDescriptor = {
  wiggleId: string
  createConfig: { wiggles: number; type: WiggleType }
  selector: string
  rotation: number
  duration: number
}

/** 곡선 그림과 텍스트 대체 설명이 함께 쓰는 ease 관찰값이다. */
export type WiggleObservation = {
  wigglePath: string
  ratio: number
  endRatio: number
}

/** gsap.parseEase와 화면 표시가 같은 이름을 쓰도록 고정한 wiggle ease ID다. */
const wiggleId = 'labWiggle'

/** gsap 선택자이자 바늘 element의 className — 실행과 표시가 같은 문자열을 쓴다. */
const targetSelector = '.wiggle-shape-lab__needle'

/** getSVGData에 넘기는 곡선 상자 크기 — wiggle은 -1~1을 오가므로 세로로 두 배를 쓴다. */
export const graphSize = { width: 300, height: 160 } as const

/** 공식 예제와 같은 2초를 그대로 쓴다. */
const duration = 2

/** controls 값을 CustomWiggle.create와 Tween이 그대로 받을 수 있는 형태로 한 번에 정규화한다. */
function createDescriptor(wiggles: number, type: WiggleType, rotation: number): WiggleDescriptor {
  return {
    wiggleId,
    createConfig: { wiggles, type },
    selector: targetSelector,
    rotation,
    duration,
  }
}

/** wiggle 예제의 controls, paused Tween, 곡선 데이터, 재생·스크럽 action을 제공한다. */
export function useWiggleShapeAnimation() {
  // 이 예제 밖의 같은 class를 선택하지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 준비된 paused Tween을 재생·스크럽 handler가 함께 쓰도록 보관한다
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // 앞뒤로 몇 번 오갈지 정하는 공식 option
  const [wiggles, setWiggles] = useState(6)
  // 진폭이 시간에 따라 줄어드는 방식을 고르는 preset
  const [type, setType] = useState<WiggleType>('easeOut')
  // 흔들림의 세기 — CustomWiggle option이 아니라 Tween이 넘기는 property 값이다
  const [rotation, setRotation] = useState(30)
  // 재생 중일 때와 직접 끌 때 모두 현재 위치를 한 값으로 표시한다
  const [progress, setProgress] = useState(0)
  // 곡선 path와 ease 출력값 — 화면 그림과 텍스트 설명이 같은 값을 쓴다
  const [observation, setObservation] = useState<WiggleObservation>({ wigglePath: '', ratio: 0, endRatio: 0 })
  // 준비·재생·정지 상태를 screen reader에도 전달한다
  const [status, setStatus] = useState('아직 재생하지 않았습니다. 재생을 누르거나 progress를 직접 끌어 보세요.')
  // 운영체제 모션 감소 설정에서는 자동 재생 대신 최종 상태만 보여준다
  const reducedMotion = useReducedMotion()
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(() => createDescriptor(wiggles, type, rotation), [wiggles, type, rotation])

  useGSAP(
    () => {
      // 1. config에서 진동 곡선을 만들고 그 이름을 등록한다
      const wiggleEase = CustomWiggle.create(descriptor.wiggleId, descriptor.createConfig)
      // 2. 방금 만든 이름을 그대로 넘겨 곡선을 SVG path 문자열로 받는다
      const wigglePath = CustomEase.getSVGData(descriptor.wiggleId, graphSize)
      // 3. 이전 실행이 남긴 회전을 지워 항상 0도에서 출발시킨다
      gsap.set(descriptor.selector, { rotation: 0 })

      // 4. rotation 하나만 움직이는 paused Tween — 세기는 이 값이, 결은 ease가 정한다
      const tween = gsap.to(descriptor.selector, {
        rotation: descriptor.rotation,
        duration: descriptor.duration,
        ease: descriptor.wiggleId,
        paused: true,
      })

      // 5. Tween이 완성된 뒤에 콜백을 붙여, GSAP이 계산한 위치를 매 프레임 그대로 읽어 온다
      tween.eventCallback('onUpdate', () => {
        const current = tween.progress()
        setProgress(current)
        setObservation((previous) => ({ ...previous, ratio: wiggleEase(current) }))
      })

      // 재생 handler와 스크럽 handler가 같은 Tween을 쓰도록 보관한다
      tweenRef.current = tween
      setProgress(0)
      setObservation({ wigglePath, ratio: wiggleEase(0), endRatio: wiggleEase(1) })
      setStatus('현재 설정으로 곡선과 Tween을 다시 만들었습니다.')

      // context 정리 뒤 handler가 사라진 Tween을 건드리지 않게 참조를 비운다
      return () => {
        tweenRef.current = null
      }
    },
    // 세 개 option 중 하나만 바뀌어도 이전 Tween을 되돌리고 곡선부터 다시 만든다
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // 모션 감소 설정에서는 움직임 없이 끝 상태만 보여주고, 아니면 처음부터 재생한다
  function run() {
    const tween = tweenRef.current
    if (!tween) return

    if (reducedMotion) {
      tween.progress(1).pause()
      setStatus('모션 감소 설정이라 이동 없이 마지막 상태만 보여줍니다. progress를 끌면 중간 값도 볼 수 있습니다.')
      return
    }

    tween.restart()
    setStatus(`${descriptor.duration}초 동안 rotation ${descriptor.rotation}도를 기준으로 ${wiggles}번 오갑니다.`)
  }

  // 사용자가 직접 끄는 값이므로 재생을 멈추고 그 위치의 화면 상태로 곧바로 이동시킨다
  function seek(value: number) {
    const tween = tweenRef.current
    if (!tween) return

    tween.pause().progress(value)
    setStatus(`progress ${value.toFixed(2)} 지점에서 멈춰 있습니다.`)
  }

  // TSX가 controls·무대·곡선·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return {
    scope,
    wiggles,
    setWiggles,
    type,
    setType,
    rotation,
    setRotation,
    progress,
    descriptor,
    observation,
    status,
    reducedMotion,
    run,
    seek,
  }
}
