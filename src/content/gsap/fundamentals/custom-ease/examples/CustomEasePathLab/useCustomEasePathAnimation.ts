/** path 문자열로 만든 곡선이 progress마다 어떤 값을 만드는지 상자 하나로 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

// CustomEase는 core에 없으므로 이 예제가 곡선을 만들기 전에 한 번 등록한다
gsap.registerPlugin(CustomEase)

/** 예제에서 고를 수 있는 곡선 preset의 식별자다. */
export type CurvePresetId = 'smooth' | 'hop' | 'cubic' | 'overshoot'

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type PathLabDescriptor = {
  presetId: CurvePresetId
  easeId: string
  easeData: string
  targetSelector: string
  distance: number
  duration: number
}

/** 지금 시점에 GSAP이 실제로 계산해 쓴 값을 그대로 읽어 둔 관찰값이다. */
export type PathLabObservation = {
  progress: number
  easeValue: number
  offsetX: number
}

/** 코드 패널이 슬라이더 이동과 재생 중 실제 실행한 메서드를 구분하게 한다. */
export type PathLabAction =
  | { type: 'ready' }
  | { type: 'seek'; progress: number }
  | { type: 'play' }

/** gsap 선택자이자 상자의 className — 실행과 표시가 같은 문자열을 쓴다. */
const targetSelector = '.custom-ease-path-lab__box'

/** 상자가 목적지까지 갈 거리 — ease 값 1이 이 픽셀 수에 대응한다. 값이 1을 넘는 곡선도 320px 화면에서 잘리지 않는 크기다. */
const distance = 120

/** 재생 버튼이 쓸 이동 시간이며 모션 감소 설정에서는 재생 대신 끝으로 건너뛴다. */
const duration = 1.2

/** preset마다 CustomEase.create()에 넘길 이름과 곡선 데이터 — 표시 코드도 이 값을 그대로 쓴다. */
const presetData: Record<CurvePresetId, { easeId: string; easeData: string }> = {
  smooth: { easeId: 'labSmooth', easeData: 'M0,0 C0.5,0 0.5,1 1,1' },
  hop: {
    easeId: 'labHop',
    easeData:
      'M0,0 C0,0 0.056,0.442 0.175,0.442 0.294,0.442 0.332,0 0.332,0 0.332,0 0.414,1 0.671,1 0.991,1 1,0 1,0',
  },
  cubic: { easeId: 'labCubic', easeData: '.17,.67,.83,.67' },
  overshoot: { easeId: 'labOvershoot', easeData: 'M0,0 C0.2,1.4 0.6,1.4 1,1' },
}

/** radio 선택을 실제 gsap 호출 인자 형태로 한 번에 정규화한다. */
function createDescriptor(presetId: CurvePresetId): PathLabDescriptor {
  return { presetId, ...presetData[presetId], targetSelector, distance, duration }
}

/** 소수점이 길게 늘어져 표가 흔들리지 않도록 표시용으로만 자른다. */
function round(value: number, digits: number) {
  // 10의 거듭제곱으로 곱했다 나눠 자릿수를 맞춘다
  const factor = 10 ** digits

  return Math.round(value * factor) / factor
}

/** 지금 progress와 그 지점의 ease 값, 상자의 실제 x를 한 화면 분량으로 묶어 읽는다. */
function readObservation(
  progress: number,
  ease: (progress: number) => number,
  box: HTMLElement,
): PathLabObservation {
  return {
    progress: round(progress, 3),
    easeValue: round(ease(progress), 3),
    // 브라우저에 따라 "148px"로 올 수 있어 숫자만 뽑아 표시값이 NaN이 되지 않게 한다
    offsetX: round(Number.parseFloat(String(gsap.getProperty(box, 'x'))), 1),
  }
}

/** 곡선 preset 예제의 controls, paused Tween, 관찰값, 조작 action을 제공한다. */
export function useCustomEasePathAnimation() {
  // 이 예제 밖의 같은 class를 선택하지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // slider와 재생 버튼이 같은 Tween 하나를 조작하도록 보관한다
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // 어떤 곡선 데이터를 ease로 쓸지 고르는 control이다
  const [presetId, setPresetId] = useState<CurvePresetId>('smooth')
  // GSAP이 방금 쓴 progress·ease 값·상자 위치를 그대로 담아 두는 관찰값이다
  const [observation, setObservation] = useState<PathLabObservation>({ progress: 0, easeValue: 0, offsetX: 0 })
  // 지금 표시할 코드가 slider 이동인지 재생인지 실제 조작과 같게 기록한다
  const [action, setAction] = useState<PathLabAction>({ type: 'ready' })
  // 준비·이동·재생 상태를 screen reader에도 전달한다
  const [status, setStatus] = useState('아직 움직이지 않았습니다. slider를 끌거나 재생을 눌러 보세요.')
  // 운영체제 모션 감소 설정에서는 재생 대신 끝 상태로 바로 건너뛴다
  const reducedMotion = useReducedMotion()
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(() => createDescriptor(presetId), [presetId])

  useGSAP(
    () => {
      // 고른 곡선 데이터를 ease 이름에 등록한다 — 이 한 줄이 이 예제의 CustomEase.create()다
      const ease = CustomEase.create(descriptor.easeId, descriptor.easeData)
      // 관찰과 실행이 같은 element를 가리키도록 선택자를 한 번만 풀어 둔다
      const box = gsap.utils.toArray<HTMLElement>(descriptor.targetSelector)[0]
      // 상자를 항상 왼쪽 끝에서 출발시켜 곡선을 바꿔도 같은 조건에서 비교하게 한다
      gsap.set(box, { x: 0 })
      // 방금 만든 곡선을 이름으로 참조하는 paused Tween — slider와 재생 버튼이 이 Tween만 움직인다
      const tween = gsap.to(box, {
        x: descriptor.distance,
        duration: descriptor.duration,
        ease: descriptor.easeId,
        paused: true,
        // 값을 다시 계산하지 않고 GSAP이 방금 쓴 결과만 읽어 표시값을 관찰로 만든다
        onUpdate() {
          // 생성 도중 호출되면 아직 보관된 Tween이 없으므로 건너뛴다. 준비 직후 값은 아래에서 한 번 채운다
          const current = tweenRef.current
          if (!current) return

          setObservation(readObservation(current.progress(), ease, box))
        },
      })
      // 재생·이동 handler가 Tween을 새로 만들지 않고 같은 Tween을 조작하도록 보관한다
      tweenRef.current = tween
      // 곡선을 바꾼 직후에도 표가 비지 않도록 준비 시점 값을 한 번 채운다
      setObservation(readObservation(tween.progress(), ease, box))
      setAction({ type: 'ready' })
      setStatus('현재 곡선으로 멈춰 있는 Tween을 준비했습니다.')
      // context 정리 뒤 handler가 이전 Tween을 다시 건드리지 않게 참조를 비운다
      return () => {
        tweenRef.current = null
      }
    },
    // 곡선 preset이 바뀌면 이전 Tween을 되돌리고 새 곡선으로 처음부터 다시 준비한다
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // slider가 시간을 직접 옮긴다. 재생 중이었다면 멈추고 그 지점의 값을 쓴다
  function seek(progress: number) {
    // useGSAP이 준비해 둔 paused Tween — 없으면 아직 화면이 준비되지 않은 것이다
    const tween = tweenRef.current
    if (!tween) return

    // 드래그마다 status를 바꾸면 화면 낭독이 끊이지 않으므로 값 전달은 slider의 output에 맡긴다
    tween.pause().progress(progress)
    setAction({ type: 'seek', progress })
  }

  // 준비된 Tween을 처음부터 재생한다. 모션 감소 설정에서는 이동 없이 끝 상태만 보여준다
  function play() {
    // useGSAP이 준비해 둔 paused Tween — 없으면 아직 화면이 준비되지 않은 것이다
    const tween = tweenRef.current
    if (!tween) return

    if (reducedMotion) {
      tween.pause().progress(1)
      setAction({ type: 'seek', progress: 1 })
      setStatus('모션 감소 설정이라 이동 없이 곡선의 끝 값으로 바로 갑니다.')
      return
    }

    tween.restart()
    setAction({ type: 'play' })
    setStatus(`${descriptor.duration}초 동안 곡선을 따라 움직입니다.`)
  }

  // TSX가 controls·관찰 패널·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return {
    scope,
    presetId,
    setPresetId,
    descriptor,
    observation,
    action,
    status,
    reducedMotion,
    seek,
    play,
  }
}
