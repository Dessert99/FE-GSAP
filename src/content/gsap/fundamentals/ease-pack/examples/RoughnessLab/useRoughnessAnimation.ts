/** RoughEase의 여섯 config property를 하나씩 바꿔 가며 곡선 모양과 흔들림이 어떻게 달라지는지 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ExpoScaleEase, RoughEase, SlowMo } from 'gsap/EasePack'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

// EasePack의 세 ease는 core에 없다. ease 함수 자체를 넘겨야 문자열 이름이 등록된다
gsap.registerPlugin(ExpoScaleEase, RoughEase, SlowMo)

/** 공식이 허용한 taper 값 네 가지다. */
export type RoughTaper = 'none' | 'in' | 'out' | 'both'

/** 벗어남의 기준선이 될 template ease 후보다. */
export type RoughTemplate = 'none' | 'power4.inOut'

/** 공식 Config Object의 여섯 property를 실행 그대로 담는다. */
export type RoughConfig = {
  clamp: boolean
  points: number
  randomize: boolean
  strength: number
  taper: RoughTaper
  template: RoughTemplate
}

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type RoughnessDescriptor = {
  selector: string
  config: RoughConfig
  easeExpression: string
  x: number
  duration: number
}

/** 곡선을 그리고 극단값을 읽기 위해 ease 함수에서 직접 뽑은 관찰 결과다. */
export type RoughObservation = {
  points: { progress: number; value: number }[]
  min: number
  max: number
  turns: number
}

/** gsap 선택자이자 상자의 className — 실행과 표시가 같은 문자열을 쓴다. */
const targetSelector = '.roughness-lab__target'

/** 곡선을 촘촘히 그리기 위한 표본 개수 — 값이 클수록 덜컹거림이 더 정확히 보인다. */
const sampleCount = 120

/** 소수점이 길게 늘어져 표가 흔들리지 않도록 표시용으로만 자른다. */
function round(value: number) {
  return Math.round(value * 1000) / 1000
}

/** control 값을 공식 문서와 같은 문자열 config 문법으로 한 번에 정규화한다. */
function createDescriptor(config: RoughConfig): RoughnessDescriptor {
  // 공식 예제와 같은 문법 — 문자열 안에 객체 리터럴을 쓰고 taper·template 값에는 따옴표를 붙이지 않는다
  const easeExpression = `rough({clamp: ${config.clamp}, points: ${config.points}, randomize: ${config.randomize}, strength: ${config.strength}, taper: ${config.taper}, template: ${config.template}})`

  return { selector: targetSelector, config, easeExpression, x: 260, duration: 1.5 }
}

/** ease 함수를 촘촘히 훑어 곡선 좌표와 최소·최대·방향 전환 횟수를 한 번에 만든다. */
function observeEase(easeFunction: (progress: number) => number): RoughObservation {
  // 곡선을 그릴 좌표이자 극단값·방향 전환을 세는 원본이다
  const points = Array.from({ length: sampleCount + 1 }, (_, index) => {
    const progress = index / sampleCount
    return { progress, value: easeFunction(progress) }
  })
  // 흔들림이 0~1 밖으로 나갔는지를 숫자로 알려 clamp 효과를 색 없이 읽게 한다
  const values = points.map((point) => point.value)
  // 값이 오르다 내리는(또는 그 반대) 지점 수 — points 설정이 만든 덜컹거림 횟수다
  let turns = 0
  let direction = 0

  for (let index = 1; index < points.length; index += 1) {
    const step = Math.sign(values[index] - values[index - 1])

    if (step !== 0 && step !== direction) {
      if (direction !== 0) turns += 1
      direction = step
    }
  }

  return { points, min: round(Math.min(...values)), max: round(Math.max(...values)), turns }
}

/** RoughEase 예제의 controls, paused Tween, 곡선 관찰값, 실행 action을 제공한다. */
export function useRoughnessAnimation() {
  // 이 예제 밖의 같은 class를 선택하지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 준비된 paused Tween을 실행 버튼에서만 재생하도록 보관한다
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // 시작값 아래·끝값 위로 튀는 것을 막을지 정하는 control이다
  const [clamp, setClamp] = useState(false)
  // 곡선 위에 찍을 point 개수 — 덜컹거리는 빈도를 정한다
  const [points, setPoints] = useState(20)
  // point를 무작위로 배치할지, 고르게 지그재그시킬지 정하는 control이다
  const [randomize, setRandomize] = useState(true)
  // point가 template에서 얼마나 멀리 벗어날 수 있는지를 정하는 control이다
  const [strength, setStrength] = useState(1)
  // 거칠기를 어느 쪽으로 갈수록 가늘게 만들지 정하는 control이다
  const [taper, setTaper] = useState<RoughTaper>('none')
  // 흔들림이 따라갈 기준 곡선을 정하는 control이다
  const [template, setTemplate] = useState<RoughTemplate>('none')
  // 준비·실행·정적 완료 상태를 screen reader에도 전달한다
  const [status, setStatus] = useState('아직 실행하지 않았습니다. config를 고르고 실행을 눌러 보세요.')
  // 운영체제 모션 감소 설정에서는 흔들림 없이 최종 위치만 보여준다
  const reducedMotion = useReducedMotion()
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(
    () => createDescriptor({ clamp, points, randomize, strength, taper, template }),
    [clamp, points, randomize, strength, taper, template],
  )
  // rough는 문자열을 해석할 때마다 새로 무작위 배치를 만들므로, 한 번만 해석해 곡선과 Tween이 같은 함수를 쓰게 한다
  const easeFunction = useMemo(() => gsap.parseEase(descriptor.easeExpression), [descriptor])
  // 방금 만든 그 함수를 그대로 훑어 화면 곡선을 만든다 — 다시 해석하면 실제 움직임과 어긋난다
  const observation = useMemo(() => observeEase(easeFunction), [easeFunction])

  useGSAP(
    () => {
      // 이전 실행이 남긴 위치를 지워 항상 같은 지점에서 출발시킨다
      gsap.set(descriptor.selector, { x: 0 })
      // 화면 곡선을 그린 바로 그 ease 함수를 넘긴다 — 문자열을 다시 넘기면 다른 흔들림이 만들어진다
      const tween = gsap.to(descriptor.selector, {
        x: descriptor.x,
        duration: descriptor.duration,
        ease: easeFunction,
        paused: true,
      })
      // 실행 handler가 같은 Tween을 처음부터 재생하도록 보관한다
      tweenRef.current = tween
      setStatus('현재 config로 paused Tween을 준비했습니다. 실행 버튼을 눌러 확인하세요.')
      // context 정리 뒤 handler가 이전 Tween을 다시 실행하지 않게 참조를 비운다
      return () => {
        tweenRef.current = null
      }
    },
    // config가 바뀌면 새 ease 함수가 만들어지므로 그 함수를 기준으로 이전 Tween을 되돌리고 다시 준비한다
    { scope, dependencies: [easeFunction], revertOnUpdate: true },
  )

  // 준비된 Tween을 수동으로 재생한다. 모션 감소 설정에서는 흔들림 없이 끝 위치로 건너뛴다
  function run() {
    // useGSAP이 준비해 둔 paused Tween — 재생만 하고 새로 만들지 않는다
    const tween = tweenRef.current
    // runtime 준비 전 click은 화면을 바꾸지 않는다
    if (!tween) return

    if (reducedMotion) {
      tween.progress(1)
      setStatus(`모션 감소 설정이라 흔들림 없이 x ${descriptor.x}로 바로 이동합니다. 곡선은 그대로 확인할 수 있습니다.`)
      return
    }

    tween.restart()
    setStatus(`x 0에서 ${descriptor.x}까지 ${descriptor.duration}초 동안 흔들리며 이동합니다.`)
  }

  // TSX가 controls·곡선·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return {
    scope,
    clamp,
    setClamp,
    points,
    setPoints,
    randomize,
    setRandomize,
    strength,
    setStrength,
    taper,
    setTaper,
    template,
    setTemplate,
    descriptor,
    observation,
    status,
    reducedMotion,
    run,
  }
}
