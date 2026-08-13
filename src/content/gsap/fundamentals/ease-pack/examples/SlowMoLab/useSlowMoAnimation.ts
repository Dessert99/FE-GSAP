/** SlowMo의 linearRatio·power가 가운데 구간을 어떻게 바꾸고 yoyoMode companion tween이 어떻게 맞물리는지 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ExpoScaleEase, RoughEase, SlowMo } from 'gsap/EasePack'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

// EasePack의 세 ease는 core에 없다. ease 함수 자체를 넘겨야 문자열 이름이 등록된다
gsap.registerPlugin(ExpoScaleEase, RoughEase, SlowMo)

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type SlowMoDescriptor = {
  selector: string
  x: number
  duration: number
  linearRatio: number
  power: number
  easeExpression: string
  companionEaseExpression: string
  companionEnabled: boolean
}

/** 같은 progress에서 위치 곡선과 companion 곡선이 각각 어디에 있는지 나란히 보여준다. */
export type SlowMoSample = {
  progress: number
  position: number
  companion: number
}

/** linearRatio가 만든 세 구간이 각각 전체의 몇 퍼센트인지 보여준다. */
export type SlowMoSegments = {
  easeOut: number
  linear: number
  easeIn: number
}

/** gsap 선택자이자 상자의 className — 실행과 표시가 같은 문자열을 쓴다. */
const targetSelector = '.slow-mo-lab__target'

/** 두 곡선을 같은 눈금에서 비교하기 위한 고정 관찰 지점이다. */
const sampleProgresses = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1]

/** 소수점이 길게 늘어져 표가 흔들리지 않도록 표시용으로만 자른다. */
function round(value: number) {
  return Math.round(value * 1000) / 1000
}

/** slider 값을 실제 gsap 호출 인자 형태로 한 번에 정규화한다. */
function createDescriptor(linearRatio: number, power: number, companionEnabled: boolean): SlowMoDescriptor {
  return {
    selector: targetSelector,
    x: 260,
    duration: 2,
    linearRatio,
    power,
    // 위치 tween이 쓰는 ease — yoyoMode를 생략하면 기본값 false다
    easeExpression: `slow(${linearRatio}, ${power})`,
    // 같은 두 값에 yoyoMode만 true로 바꾼 ease — companion tween이 이것을 쓴다
    companionEaseExpression: `slow(${linearRatio}, ${power}, true)`,
    companionEnabled,
  }
}

/** SlowMo 예제의 controls, paused Tween 두 개, 두 곡선의 관찰값, 실행 action을 제공한다. */
export function useSlowMoAnimation() {
  // 이 예제 밖의 같은 class를 선택하지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 위치 tween과 companion tween을 함께 재생하려고 나란히 보관한다
  const tweensRef = useRef<gsap.core.Tween[]>([])
  // 전체 중 등속으로 움직일 구간의 비율을 정하는 control이다
  const [linearRatio, setLinearRatio] = useState(0.7)
  // 양 끝 ease의 강도를 정하는 control이다
  const [power, setPower] = useState(0.7)
  // yoyoMode ease를 쓰는 opacity tween을 함께 만들지 정하는 control이다
  const [companionEnabled, setCompanionEnabled] = useState(false)
  // 준비·실행·정적 완료 상태를 screen reader에도 전달한다
  const [status, setStatus] = useState('아직 실행하지 않았습니다. 값을 고르고 실행을 눌러 보세요.')
  // 운영체제 모션 감소 설정에서는 이동 없이 최종 상태만 보여준다
  const reducedMotion = useReducedMotion()
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(
    () => createDescriptor(linearRatio, power, companionEnabled),
    [linearRatio, power, companionEnabled],
  )
  // 표의 두 열이 실제 Tween과 완전히 같은 ease 함수를 쓰도록 같은 문자열을 GSAP에 넘겨 얻는다
  const samples = useMemo<SlowMoSample[]>(() => {
    const positionEase = gsap.parseEase(descriptor.easeExpression)
    const companionEase = gsap.parseEase(descriptor.companionEaseExpression)

    return sampleProgresses.map((progress) => ({
      progress,
      position: round(positionEase(progress)),
      companion: round(companionEase(progress)),
    }))
  }, [descriptor])
  // 공식 설명대로 남는 비율을 반씩 나눠 앞뒤 ease 구간을 퍼센트로 환산한다
  const segments = useMemo<SlowMoSegments>(() => {
    const edge = Math.round(((1 - descriptor.linearRatio) / 2) * 1000) / 10
    return { easeOut: edge, linear: Math.round(descriptor.linearRatio * 1000) / 10, easeIn: edge }
  }, [descriptor])

  useGSAP(
    () => {
      // 이전 실행이 남긴 위치와 투명도를 지워 항상 같은 상태에서 출발시킨다
      gsap.set(descriptor.selector, { x: 0, opacity: 1 })
      // 가운데가 등속인 위치 tween — 실행 버튼이 이 Tween을 재생한다
      const position = gsap.to(descriptor.selector, {
        x: descriptor.x,
        duration: descriptor.duration,
        ease: descriptor.easeExpression,
        paused: true,
      })
      // yoyoMode ease를 쓰는 opacity companion tween — 같은 duration만 맞추면 자동으로 맞물린다
      const companion = descriptor.companionEnabled
        ? gsap.from(descriptor.selector, {
            opacity: 0,
            duration: descriptor.duration,
            ease: descriptor.companionEaseExpression,
            paused: true,
            // 재생 전에 상자가 미리 투명해지지 않도록 시작값을 지금 적용하지 않는다
            immediateRender: false,
          })
        : null
      // 실행 handler가 두 Tween을 같은 시점에 처음부터 재생하도록 보관한다
      tweensRef.current = companion ? [position, companion] : [position]
      setStatus('현재 값으로 paused Tween을 준비했습니다. 실행 버튼을 눌러 확인하세요.')
      // context 정리 뒤 handler가 이전 Tween을 다시 실행하지 않게 참조를 비운다
      return () => {
        tweensRef.current = []
      }
    },
    // 비율·강도·companion 여부 중 하나만 바뀌어도 이전 Tween을 되돌리고 처음부터 다시 준비한다
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // 준비된 Tween들을 함께 재생한다. 모션 감소 설정에서는 이동 없이 최종 상태만 적용한다
  function run() {
    if (reducedMotion) {
      gsap.set(descriptor.selector, { x: descriptor.x, opacity: 1 })
      setStatus(`모션 감소 설정이라 이동 없이 x ${descriptor.x}, opacity 1 상태로 바로 바뀝니다. 곡선 표는 그대로 확인할 수 있습니다.`)
      return
    }

    tweensRef.current.forEach((tween) => tween.restart())
    setStatus(
      descriptor.companionEnabled
        ? `위치 tween과 opacity companion tween을 같은 ${descriptor.duration}초로 함께 재생합니다.`
        : `위치 tween만 ${descriptor.duration}초 동안 재생합니다.`,
    )
  }

  // TSX가 controls·곡선 표·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return {
    scope,
    linearRatio,
    setLinearRatio,
    power,
    setPower,
    companionEnabled,
    setCompanionEnabled,
    descriptor,
    samples,
    segments,
    status,
    reducedMotion,
    run,
  }
}
