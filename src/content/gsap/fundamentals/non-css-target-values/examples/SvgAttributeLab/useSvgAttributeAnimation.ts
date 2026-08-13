/** SVG circle의 r attribute만 움직이고 같은 element의 CSS transform은 고정해 두 채널을 갈라 보여준다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type SvgAttributeDescriptor = {
  selector: string
  baselineAttr: { r: number }
  targetAttr: { r: number }
  fixedTransform: { x: number }
  requestedDuration: number
  effectiveDuration: number
}

/** attribute 채널과 CSS transform 채널이 실제로 갈렸는지 숫자로 드러내는 관찰값이다. */
export type SvgAttributeObservation = {
  currentRadius: number
  transformX: number
}

/** gsap 선택자이자 circle의 className — 실행과 표시가 같은 문자열을 쓴다. */
const targetSelector = '.svg-attribute-lab__circle'

/** 모든 실행이 같은 지점에서 출발하도록 고정한 시작 반지름이다. */
const baselineRadius = 24

/** attr 밖에서 한 번만 걸어 두는 CSS transform — 움직이지 않아야 비교 기준이 된다. */
const fixedTransformX = 54

/** slider 값과 모션 설정을 실제 gsap 호출 인자 형태로 한 번에 정규화한다. */
function createDescriptor(targetRadius: number, duration: number, reducedMotion: boolean): SvgAttributeDescriptor {
  // 모션 감소 설정에서는 이동 없이 최종 반지름만 보여주도록 실제 duration을 0으로 낮춘다
  const effectiveDuration = reducedMotion ? 0 : duration

  return {
    selector: targetSelector,
    baselineAttr: { r: baselineRadius },
    targetAttr: { r: targetRadius },
    fixedTransform: { x: fixedTransformX },
    requestedDuration: duration,
    effectiveDuration,
  }
}

/** attribute 채널 예제의 controls, paused Tween, 관찰값, 실행 action을 제공한다. */
export function useSvgAttributeAnimation() {
  // 이 예제 밖의 같은 class를 선택하지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 준비된 paused Tween을 실행 버튼에서만 재생하도록 보관한다
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // attr 안에 넣을 목표 반지름 — 이 값만 attribute 채널로 간다
  const [targetRadius, setTargetRadius] = useState(56)
  // 사용자가 요청한 이동 시간이며 모션 감소 설정에서는 그대로 쓰이지 않는다
  const [duration, setDuration] = useState(1.2)
  // 실행 중 attribute 값과 고정 transform 값을 색이 아닌 숫자로 보여준다
  const [observation, setObservation] = useState<SvgAttributeObservation>({
    currentRadius: baselineRadius,
    transformX: fixedTransformX,
  })
  // 준비·실행·정적 완료 상태를 screen reader에도 전달한다
  const [status, setStatus] = useState('아직 실행하지 않았습니다. 목표 반지름을 고르고 실행을 눌러 보세요.')
  // 운영체제 모션 감소 설정에서는 이동 없이 최종 상태만 보여준다
  const reducedMotion = useReducedMotion()
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(
    () => createDescriptor(targetRadius, duration, reducedMotion),
    [targetRadius, duration, reducedMotion],
  )

  useGSAP(
    () => {
      // 관찰값을 읽을 element는 예제 범위 안에서 찾고 GSAP 호출에는 표시 코드와 같은 선택자를 쓴다
      const circle = scope.current?.querySelector<SVGCircleElement>(descriptor.selector)
      // 예제 DOM이 아직 준비되지 않았으면 Tween을 만들지 않는다
      if (!circle) return
      // 이전 실행이 남긴 반지름을 지워 항상 같은 크기에서 출발시킨다
      gsap.set(descriptor.selector, { attr: descriptor.baselineAttr })
      // CSS transform은 여기서 한 번만 걸고 이후 어떤 Tween도 건드리지 않는다 — 채널 비교의 고정 기준이다
      gsap.set(descriptor.selector, descriptor.fixedTransform)
      // attr 안의 r만 움직이는 paused Tween — 실행 버튼이 이 Tween을 재생한다
      const tween = gsap.to(descriptor.selector, {
        attr: descriptor.targetAttr,
        duration: descriptor.effectiveDuration,
        ease: 'none',
        paused: true,
        // GSAP이 쓴 결과를 element에서 그대로 읽어 와야 표시값이 추측이 아닌 관찰이 된다
        onUpdate() {
          setObservation({
            currentRadius: Number(circle.getAttribute('r')),
            // 브라우저·단위에 따라 "54px"로 올 수 있어 숫자만 뽑아 표시값이 NaN이 되지 않게 한다
            transformX: Number.parseFloat(String(gsap.getProperty(circle, 'x'))),
          })
        },
      })
      // 실행 handler가 같은 Tween을 처음부터 재생하도록 보관한다
      tweenRef.current = tween
      // 새 값으로 준비만 끝났고 아직 움직이지 않았음을 알린다
      setObservation({ currentRadius: baselineRadius, transformX: fixedTransformX })
      setStatus('현재 값으로 paused Tween을 준비했습니다. 실행 버튼을 눌러 확인하세요.')
      // context 정리 뒤 handler가 이전 Tween을 다시 실행하지 않게 참조를 비운다
      return () => {
        tweenRef.current = null
      }
    },
    // 목표 반지름·시간·모션 설정 중 하나만 바뀌어도 이전 Tween을 되돌리고 처음부터 다시 준비한다
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // 준비된 Tween을 수동으로 재생한다. duration이 0이면 GSAP이 곧바로 최종 상태를 쓴다
  function run() {
    // useGSAP이 준비해 둔 paused Tween — 재생만 하고 새로 만들지 않는다
    const tween = tweenRef.current
    // runtime 준비 전 click은 화면을 바꾸지 않는다
    if (!tween) return

    // 같은 시작 반지름에서 다시 관찰할 수 있도록 준비한 Tween을 처음부터 재생한다
    tween.restart()
    setStatus(
      reducedMotion
        ? `모션 감소 설정이라 이동 없이 반지름 ${descriptor.targetAttr.r}로 바로 바뀝니다.`
        : `반지름을 ${descriptor.baselineAttr.r}에서 ${descriptor.targetAttr.r}로 ${descriptor.effectiveDuration}초 동안 움직입니다.`,
    )
  }

  // TSX가 controls·관찰 패널·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return {
    scope,
    targetRadius,
    setTargetRadius,
    duration,
    setDuration,
    descriptor,
    observation,
    status,
    reducedMotion,
    run,
  }
}
