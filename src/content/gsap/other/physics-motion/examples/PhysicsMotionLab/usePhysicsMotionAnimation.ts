/** 선택한 physics descriptor를 실제 plugin tween과 결과 sample에 연결한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Physics2DPlugin } from 'gsap/Physics2DPlugin'
import { PhysicsPropsPlugin } from 'gsap/PhysicsPropsPlugin'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

// 두 mode가 공유하는 좌표 결과의 단위를 고정한다.
type Point = { x: number; y: number }
// launch와 properties가 동시에 runtime config에 섞이지 않게 discriminator를 둔다.
type PhysicsDescriptor =
  | {
      mode: 'launch'
      plugin: 'Physics2DPlugin'
      duration: number
      config: {
        velocity: number
        angle: number
        gravity: number
        friction: number
      }
      final: Point
    }
  | {
      mode: 'properties'
      plugin: 'PhysicsPropsPlugin'
      duration: number
      config: {
        x: { velocity: number; acceleration: number; friction: number }
        y: { velocity: number; acceleration: number; friction: number }
      }
      final: Point
    }

/** 30 steps/second friction 계산으로 plugin final sample을 읽기 좋게 만든다. */
function sampleValue(
  velocity: number,
  acceleration: number,
  friction: number,
  duration: number,
) {
  // installed plugin과 같은 discrete integration 횟수다.
  const stepsPerSecond = 30
  // friction 없는 exact formula와 같은 value를 만들 시작 velocity다.
  let velocityPerStep = velocity / stepsPerSecond
  // 매 step에 더할 acceleration이다.
  const accelerationPerStep = acceleration / (stepsPerSecond * stepsPerSecond)
  // 공식 friction 0–1 값을 각 step의 유지 비율로 바꾼다.
  const retention = 1 - friction
  // duration에 들어가는 whole step 수를 계산한다.
  const wholeSteps = Math.floor(duration * stepsPerSecond)
  // property가 origin에서 이동한 거리를 누적한다.
  let value = 0

  for (let index = 0; index < wholeSteps; index += 1) {
    // plugin은 acceleration을 더한 뒤 friction을 적용한다.
    velocityPerStep = (velocityPerStep + accelerationPerStep) * retention
    // 현재 step의 velocity를 property 이동으로 누적한다.
    value += velocityPerStep
  }

  // 마지막 fractional step도 plugin의 friction order로 보정한다.
  const remainder = (duration * stepsPerSecond - wholeSteps) * retention
  // display는 runtime tween이 도달할 final point를 소수 첫째 자리로만 보여 준다.
  return Math.round((value + velocityPerStep * remainder) * 10) / 10
}

/** mode 하나만 선택해 actual plugin config와 final point를 함께 만든다. */
function createPhysicsDescriptor(
  mode: PhysicsDescriptor['mode'],
): PhysicsDescriptor {
  // 모든 example 실행이 같은 physical duration을 쓰게 한다.
  const duration = 1

  if (mode === 'launch') {
    // Physics2D가 x/y velocity로 분해할 launch input이다.
    const config = { velocity: 180, angle: -35, gravity: 260, friction: 0.04 }
    // degrees angle을 plugin과 같은 radians vector로 바꾼다.
    const radians = (config.angle * Math.PI) / 180
    // x/y의 velocity와 gravity를 같은 friction sample에 넣는다.
    const final = {
      x: sampleValue(
        Math.cos(radians) * config.velocity,
        0,
        config.friction,
        duration,
      ),
      y: sampleValue(
        Math.sin(radians) * config.velocity,
        config.gravity,
        config.friction,
        duration,
      ),
    }

    return { mode, plugin: 'Physics2DPlugin', duration, config, final }
  }

  // PhysicsProps가 독립적으로 읽을 x/y property config다.
  const config = {
    x: { velocity: 140, acceleration: 60, friction: 0.02 },
    y: { velocity: -100, acceleration: 180, friction: 0.05 },
  }
  // 각 property가 가진 velocity·acceleration·friction으로 final point를 따로 만든다.
  const final = {
    x: sampleValue(
      config.x.velocity,
      config.x.acceleration,
      config.x.friction,
      duration,
    ),
    y: sampleValue(
      config.y.velocity,
      config.y.acceleration,
      config.y.friction,
      duration,
    ),
  }

  return { mode, plugin: 'PhysicsPropsPlugin', duration, config, final }
}

// example이 두 plugin을 explicit registration으로 사용하게 한다.
gsap.registerPlugin(Physics2DPlugin, PhysicsPropsPlugin)

/** stable target에서 selected physics tween을 재생하고 되돌린다. */
export function usePhysicsMotionAnimation() {
  // useGSAP cleanup과 target selector를 한 lab DOM으로 제한한다.
  const scope = useRef<HTMLDivElement>(null)
  // physics plugin이 x/y 값을 쓸 React-owned target이다.
  const targetRef = useRef<HTMLDivElement>(null)
  // 새 replay와 unmount에서 restoring cleanup을 할 tween reference다.
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // launch와 per-property mode 중 하나만 선택한다.
  const [mode, setMode] = useState<PhysicsDescriptor['mode']>('launch')
  // 화면으로 읽은 sparse x/y result를 표시한다.
  const [snapshot, setSnapshot] = useState<Point>({ x: 0, y: 0 })
  // OS preference가 motion 대신 same final sample을 고르게 한다.
  const reducedMotion = useReducedMotion()
  // controls, actual tween, result panel과 code serializer가 공유하는 input이다.
  const descriptor = createPhysicsDescriptor(mode)

  useGSAP(
    () => {
      // initial target를 origin에 놓아 첫 replay도 같은 기준점에서 시작한다.
      const target = targetRef.current
      if (target) gsap.set(target, { x: 0, y: 0 })

      // page를 떠날 때 tween이 남긴 transform을 origin으로 restoring cleanup한다.
      return () => {
        tweenRef.current?.revert()
        tweenRef.current = null
      }
    },
    // scope가 local target와 cleanup 범위를 보장한다.
    { scope },
  )

  // selected descriptor의 actual plugin tween을 시작한다.
  const replay = () => {
    // mounted target가 없으면 tween을 만들지 않는다.
    const target = targetRef.current
    if (!target) return

    // 이전 tween은 origin을 복구한 뒤 reference를 비운다.
    tweenRef.current?.revert()
    tweenRef.current = null
    // every replay가 같은 x/y origin과 sparse result에서 출발한다.
    gsap.set(target, { x: 0, y: 0 })
    setSnapshot({ x: 0, y: 0 })

    // update는 시각 결과만 읽고 live region을 만들지 않는다.
    const onUpdate = () => {
      setSnapshot({
        x: Number(gsap.getProperty(target, 'x')),
        y: Number(gsap.getProperty(target, 'y')),
      })
    }
    // mode discriminator가 physics2D와 physicsProps key를 exclusive하게 선택한다.
    const tween =
      descriptor.mode === 'launch'
        ? gsap.to(target, {
            duration: descriptor.duration,
            physics2D: descriptor.config,
            onUpdate,
          })
        : gsap.to(target, {
            duration: descriptor.duration,
            physicsProps: descriptor.config,
            onUpdate,
          })

    tweenRef.current = tween

    if (reducedMotion) {
      // same physics tween을 final progress로 즉시 보내 motion 없이 final sample을 표시한다.
      tween.progress(1).pause()
      setSnapshot(descriptor.final)
    }
  }

  // mode 전환은 이전 plugin transform을 복구해 code와 stage가 섞이지 않게 한다.
  const selectMode = (nextMode: PhysicsDescriptor['mode']) => {
    // 이전 physics tween은 revert 후 reference를 비운다.
    tweenRef.current?.revert()
    tweenRef.current = null
    // target와 visible result를 새 descriptor의 origin으로 되돌린다.
    if (targetRef.current) gsap.set(targetRef.current, { x: 0, y: 0 })
    setSnapshot({ x: 0, y: 0 })
    // exclusive mode를 바꿔 다음 replay가 다른 plugin key만 사용하게 한다.
    setMode(nextMode)
  }

  // display layer에는 one descriptor와 controlled replay result만 넘긴다.
  return {
    scope,
    targetRef,
    mode,
    setMode: selectMode,
    descriptor,
    snapshot,
    reducedMotion,
    replay,
  }
}
