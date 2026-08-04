/** 같은 scale 구간을 linear ease와 expoScale로 각각 지나가며 구간별 배율이 어떻게 달라지는지 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ExpoScaleEase, RoughEase, SlowMo } from 'gsap/EasePack'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

// EasePack의 세 ease는 core에 없다. ease 함수 자체를 넘겨야 문자열 이름이 등록된다
gsap.registerPlugin(ExpoScaleEase, RoughEase, SlowMo)

/** 같은 시작·끝 scale을 linear로 지날지 expoScale로 지날지 고르는 선택지다. */
export type ScaleEaseMode = 'none' | 'expoScale'

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type ScaleSpeedDescriptor = {
  selector: string
  startScale: number
  endScale: number
  easeMode: ScaleEaseMode
  easeExpression: string
  duration: number
}

/** 한 관찰 지점에서 실제 scale이 얼마였고 직전 지점 대비 몇 배가 됐는지를 한 행으로 보여준다. */
export type ScaleSample = {
  progress: number
  scale: number
  growth: number | null
}

/** gsap 선택자이자 상자의 className — 실행과 표시가 같은 문자열을 쓴다. */
const targetSelector = '.scale-speed-lab__target'

/** 배율 변화를 눈과 표로 동시에 읽을 수 있는 고정 관찰 지점이다. */
const sampleProgresses = [0, 0.25, 0.5, 0.75, 1]

/** 소수점이 길게 늘어져 표가 흔들리지 않도록 표시용으로만 자른다. */
function round(value: number) {
  return Math.round(value * 1000) / 1000
}

/** radio 값을 실제 gsap 호출 인자 형태로 한 번에 정규화한다. */
function createDescriptor(startScale: number, endScale: number, easeMode: ScaleEaseMode): ScaleSpeedDescriptor {
  // expoScale은 실제 tween의 시작·끝 scale을 그대로 문자열에 넣어야 올바른 곡선이 나온다
  const easeExpression = easeMode === 'none' ? 'none' : `expoScale(${startScale}, ${endScale})`

  return { selector: targetSelector, startScale, endScale, easeMode, easeExpression, duration: 1 }
}

/** scale 속도 예제의 controls, paused Tween, 구간별 배율 관찰값, 실행 action을 제공한다. */
export function useScaleSpeedAnimation() {
  // 이 예제 밖의 같은 class를 선택하지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 준비된 paused Tween을 실행 버튼에서만 재생하도록 보관한다
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // tween이 출발하는 크기이자 expoScale 첫 번째 인자다
  const [startScale, setStartScale] = useState(0.5)
  // tween이 도착하는 크기이자 expoScale 두 번째 인자다
  const [endScale, setEndScale] = useState(3)
  // 같은 구간을 등속으로 지날지 지수로 지날지 고르는 control이다
  const [easeMode, setEaseMode] = useState<ScaleEaseMode>('none')
  // GSAP이 실제로 쓴 scale을 그대로 읽어 만든 구간별 배율 관찰값이다
  const [samples, setSamples] = useState<ScaleSample[]>([])
  // 준비·실행·정적 완료 상태를 screen reader에도 전달한다
  const [status, setStatus] = useState('아직 실행하지 않았습니다. ease를 고르고 실행을 눌러 보세요.')
  // 운영체제 모션 감소 설정에서는 이동 없이 최종 상태만 보여준다
  const reducedMotion = useReducedMotion()
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(() => createDescriptor(startScale, endScale, easeMode), [startScale, endScale, easeMode])

  useGSAP(
    () => {
      // 관찰과 실행이 같은 element를 가리키도록 선택자를 한 번만 풀어 둔다
      const target = gsap.utils.toArray<HTMLElement>(descriptor.selector)[0]
      // 시작 scale에서 끝 scale까지 가는 paused Tween — 실행 버튼이 이 Tween을 재생한다
      const tween = gsap.fromTo(
        target,
        { scale: descriptor.startScale },
        { scale: descriptor.endScale, duration: descriptor.duration, ease: descriptor.easeExpression, paused: true },
      )
      // 재생 헤드를 관찰 지점마다 옮겨 GSAP이 그때 쓴 scale을 직접 읽는다 — 보간을 다시 계산하지 않는다
      const observed = sampleProgresses.map((progress) => {
        tween.progress(progress)
        return { progress, scale: round(Number(gsap.getProperty(target, 'scale'))) }
      })
      // 관찰이 끝났으니 화면을 다시 시작 크기로 되돌린다
      tween.progress(0)
      // 직전 지점 대비 몇 배가 됐는지를 붙여 "구간마다 같은 배율인가"를 숫자로 드러낸다
      setSamples(
        observed.map((sample, index) => ({
          ...sample,
          growth: index === 0 ? null : round(sample.scale / observed[index - 1].scale),
        })),
      )
      // 실행 handler가 같은 Tween을 처음부터 재생하도록 보관한다
      tweenRef.current = tween
      setStatus('현재 값으로 paused Tween을 준비했습니다. 실행 버튼을 눌러 확인하세요.')
      // context 정리 뒤 handler가 이전 Tween을 다시 실행하지 않게 참조를 비운다
      return () => {
        tweenRef.current = null
      }
    },
    // 시작·끝 scale·ease 중 하나만 바뀌어도 이전 Tween을 되돌리고 처음부터 다시 준비한다
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // 준비된 Tween을 수동으로 재생한다. 모션 감소 설정에서는 재생 대신 끝 상태로 건너뛴다
  function run() {
    // useGSAP이 준비해 둔 paused Tween — 재생만 하고 새로 만들지 않는다
    const tween = tweenRef.current
    // runtime 준비 전 click은 화면을 바꾸지 않는다
    if (!tween) return

    if (reducedMotion) {
      tween.progress(1)
      setStatus(`모션 감소 설정이라 이동 없이 scale ${descriptor.endScale}로 바로 바뀝니다.`)
      return
    }

    tween.restart()
    setStatus(
      `scale ${descriptor.startScale}에서 ${descriptor.endScale}까지 ease '${descriptor.easeExpression}'로 ${descriptor.duration}초 동안 커집니다.`,
    )
  }

  // TSX가 controls·관찰 표·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return {
    scope,
    startScale,
    setStartScale,
    endScale,
    setEndScale,
    easeMode,
    setEaseMode,
    descriptor,
    samples,
    status,
    reducedMotion,
    run,
  }
}
