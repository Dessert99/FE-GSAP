/** 네 가지 target 형태로 같은 Tween을 만들고 targets()가 무엇을 돌려주는지 실행으로 확인시킨다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 공식 targets 인자 설명이 나열한 네 가지 형태를 그대로 선택지로 만든다. */
export type TargetMode = 'selector' | 'element' | 'elementArray' | 'plainObject'

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type TargetsDescriptor = {
  mode: TargetMode
  /** 코드 패널에 그대로 찍을 target 표현식 — 실행이 실제로 쓴 값과 같은 문자열이다. */
  targetExpression: string
  /** gsap.to()에 실제로 펼쳐 넣는 property 객체다. */
  animatedVars: { x: number } | { score: number }
  /** 이 모드에서 animate하는 property 한 줄 — DOM은 x, 일반 object는 score다. */
  propertyLine: string
  requestedDuration: number
  effectiveDuration: number
}

/** targets()가 정말 무엇을 돌려줬는지 추측 없이 화면에 드러내는 관찰값이다. */
export type TargetsObservation = {
  count: number
  entries: string[]
  /** 같은 배열 참조를 돌려주는지 — 공식 문서가 밝히지 않은 지점이라 실행으로 확인한다. */
  sameArrayReference: boolean
  /** 일반 object를 target으로 골랐을 때만 값이 있고, 화면 대신 숫자가 움직인다. */
  plainObjectScore: number | null
}

/** gsap 선택자이자 상자의 className — 실행과 표시가 같은 문자열을 쓴다. */
const boxSelector = '.targets-readback-lab__box'

/** selector text가 몇 개를 잡는지 눈으로 세도록 상자 수를 고정한다. */
export const boxCount = 3

/** 모든 실행이 같은 지점에서 출발하도록 고정한 시작 x 위치다. */
const baselineX = 0

/** DOM target이 이동할 목표 x 위치 — 어느 상자가 움직였는지로 targets()를 검증한다. */
const targetX = 112

/** 일반 JavaScript object target이 도달할 목표 숫자 — DOM이 아니어도 animate된다는 증거다. */
const targetScore = 100

/** 선택한 모드와 모션 설정을 실제 gsap 호출 인자 형태로 한 번에 정규화한다. */
function createDescriptor(mode: TargetMode, duration: number, reducedMotion: boolean): TargetsDescriptor {
  // 모션 감소 설정에서는 이동 없이 최종 상태만 보여주도록 실제 duration을 0으로 낮춘다
  const effectiveDuration = reducedMotion ? 0 : duration
  // 일반 object만 숫자 property를 움직이고 나머지 세 모드는 DOM의 x를 움직인다
  const animatedVars = mode === 'plainObject' ? { score: targetScore } : { x: targetX }
  // 실제 property 객체의 첫 항목을 코드 패널에 표시할 한 줄로 직렬화한다
  const [property, value] = Object.entries(animatedVars)[0]
  // 실제 실행값을 다시 판정하지 않고 JavaScript 객체 문법으로만 표시한다
  const propertyLine = `${property}: ${value}`

  return {
    mode,
    targetExpression: describeExpression(mode),
    animatedVars,
    propertyLine,
    requestedDuration: duration,
    effectiveDuration,
  }
}

/** 각 모드가 gsap.to()의 첫 인자로 실제로 넘기는 값을 코드 문자열로 적는다. */
function describeExpression(mode: TargetMode) {
  if (mode === 'selector') return `'${boxSelector}'`
  if (mode === 'element') return 'boxes[0]'
  if (mode === 'elementArray') return '[boxes[0], boxes[1]]'
  return 'plainObject'
}

/** targets() 배열의 각 원소가 무엇인지 화면에 쓸 수 있는 문장으로 바꾼다. */
function describeEntry(value: unknown) {
  // DOM element면 태그 이름과 상자 번호를 함께 보여줘야 어느 상자인지 셀 수 있다
  if (value instanceof HTMLElement) {
    return `${value.tagName.toLowerCase()} · ${value.dataset.label ?? '이름 없음'}`
  }

  return '일반 JavaScript object (DOM 아님)'
}

/** target 형태 예제의 controls, paused Tween, 관찰값, 실행 action을 제공한다. */
export function useTargetsReadbackAnimation() {
  // 이 예제 밖의 같은 class를 선택하지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 준비된 paused Tween을 실행 버튼에서만 재생하도록 보관한다
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // 공식이 나열한 네 형태 중 지금 어느 것을 첫 인자로 넘길지 정한다
  const [mode, setMode] = useState<TargetMode>('selector')
  // 사용자가 요청한 이동 시간이며 모션 감소 설정에서는 그대로 쓰이지 않는다
  const [duration, setDuration] = useState(0.9)
  // targets()를 실제로 호출해 얻은 결과만 담는다 — 표시값이 추측이 아니라 관찰이 되게 한다
  const [observation, setObservation] = useState<TargetsObservation>({
    count: 0,
    entries: [],
    sameArrayReference: false,
    plainObjectScore: null,
  })
  // 준비·실행 상태를 screen reader에도 전달한다
  const [status, setStatus] = useState('아직 실행하지 않았습니다. target 형태를 고르고 실행을 눌러 보세요.')
  // 운영체제 모션 감소 설정에서는 이동 없이 최종 상태만 보여준다
  const reducedMotion = useReducedMotion()
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(() => createDescriptor(mode, duration, reducedMotion), [mode, duration, reducedMotion])

  useGSAP(
    () => {
      // 관찰과 실행이 같은 element를 가리키도록 상자 목록을 한 번만 풀어 둔다
      const boxes = gsap.utils.toArray<HTMLElement>(boxSelector, scope.current)
      // 이전 실행이 남긴 이동을 지워 어떤 모드로 바꿔도 항상 같은 줄에서 출발시킨다
      gsap.set(boxes, { x: baselineX })
      // DOM이 아닌 target 후보 — 이 객체는 화면에 없고 숫자만 가지고 있다
      const plainObject = { score: 0 }
      // 선택한 모드가 정하는 실제 첫 인자 — 코드 패널의 targetExpression과 같은 값이다
      const target =
        descriptor.mode === 'selector'
          ? boxSelector
          : descriptor.mode === 'element'
            ? boxes[0]
            : descriptor.mode === 'elementArray'
              ? [boxes[0], boxes[1]]
              : plainObject

      // 아직 재생하지 않은 Tween — 만들자마자 targets()를 물어볼 수 있다는 것이 이 예제의 핵심이다
      const tween = gsap.to(target, {
        ...descriptor.animatedVars,
        duration: descriptor.effectiveDuration,
        ease: 'none',
        paused: true,
        // 일반 object 모드에서는 화면 대신 이 숫자가 움직이는 것을 보여준다
        onUpdate() {
          if (descriptor.mode !== 'plainObject') return
          setObservation((previous) => ({ ...previous, plainObjectScore: Math.round(plainObject.score) }))
        },
      })

      // 실행 handler가 같은 Tween을 처음부터 재생하도록 보관한다
      tweenRef.current = tween
      // 재생 전에 targets()를 두 번 불러 내용과 참조 안정성을 함께 기록한다
      const first = tween.targets<unknown>()
      setObservation({
        count: first.length,
        entries: first.map(describeEntry),
        sameArrayReference: first === tween.targets<unknown>(),
        plainObjectScore: descriptor.mode === 'plainObject' ? 0 : null,
      })
      setStatus('아직 재생하지 않았지만 targets()는 이미 답합니다. 실행을 눌러 무엇이 움직이는지 보세요.')

      // context 정리 뒤 handler가 이전 Tween을 다시 실행하지 않게 참조를 비운다
      return () => {
        tweenRef.current = null
      }
    },
    // target 형태·시간·모션 설정 중 하나만 바뀌어도 이전 Tween을 되돌리고 처음부터 다시 준비한다
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // 준비된 Tween을 수동으로 재생한다. duration이 0이면 GSAP이 곧바로 최종 상태를 쓴다
  function run() {
    // useGSAP이 준비해 둔 paused Tween — 재생만 하고 새로 만들지 않는다
    const tween = tweenRef.current
    // runtime 준비 전 click은 화면을 바꾸지 않는다
    if (!tween) return

    tween.restart()
    setStatus(
      descriptor.mode === 'plainObject'
        ? '화면의 상자는 하나도 움직이지 않고 아래 숫자만 올라갑니다. target이 DOM이 아니기 때문입니다.'
        : `targets()에 들어 있는 ${observation.count}개만 움직입니다. 나머지 상자는 제자리입니다.`,
    )
  }

  // TSX가 controls·관찰 패널·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return { scope, mode, setMode, duration, setDuration, descriptor, observation, status, reducedMotion, run }
}
