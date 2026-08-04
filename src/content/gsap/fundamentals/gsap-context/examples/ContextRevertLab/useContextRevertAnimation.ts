/** 한 함수 안에서 만든 세 Tween을 Context가 기록했다가 revert() 한 번으로 함께 되돌리는 과정을 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 아직 안 만듦 · 만들어 재생함 · 되돌림이라는 Context의 세 관찰 단계다. */
export type ContextStage = 'idle' | 'created' | 'reverted'

/** Context 함수 안에서 만들 Tween 하나의 대상·속성·목적지를 한 줄로 고정한다. */
export type BoxStep = {
  key: string
  label: string
  selector: string
  property: 'x' | 'rotation' | 'scale'
  to: number
  from: number
}

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type ContextRevertDescriptor = {
  steps: BoxStep[]
  duration: number
  requestedDuration: number
}

/** 각 박스가 지금 어떤 값인지를 표 한 행으로 보여주는 관찰값이다. */
export type BoxObservation = {
  key: string
  label: string
  property: string
  current: number
  from: number
}

/** 한 Context가 기록한 항목 수와 되돌림 여부 — 공식이 말한 "모아 둔다"를 숫자로 드러낸다. */
export type ContextObservation = {
  recorded: number
  isReverted: boolean
}

/** Context 함수 안에서 만들 세 Tween — "여러 개를 한 번에"가 이 예제의 개념 자체라서 대상이 셋이다. */
const steps: BoxStep[] = [
  { key: 'a', label: '박스 A', selector: '.context-revert-lab__box--a', property: 'x', to: 132, from: 0 },
  { key: 'b', label: '박스 B', selector: '.context-revert-lab__box--b', property: 'rotation', to: 45, from: 0 },
  { key: 'c', label: '박스 C', selector: '.context-revert-lab__box--c', property: 'scale', to: 1.6, from: 1 },
]

/** 사용자가 요청한 이동 시간 — 모션 감소 설정에서는 실제 실행 시간이 0으로 낮아진다. */
const requestedDuration = 0.8

/** 표 숫자가 소수점 때문에 흔들리지 않도록 표시용으로만 자른다. */
function round(value: number) {
  return Math.round(value * 100) / 100
}

/** 모션 설정을 실제 gsap 호출 인자 형태로 한 번에 정규화한다. */
function createDescriptor(reducedMotion: boolean): ContextRevertDescriptor {
  return {
    steps,
    // 모션 감소 설정에서는 이동 없이 최종 상태만 보여주도록 실제 duration을 0으로 낮춘다
    duration: reducedMotion ? 0 : requestedDuration,
    requestedDuration,
  }
}

/** 모아서 되돌리기 예제의 Context 생성·되돌림 action과 박스별 관찰값을 제공한다. */
export function useContextRevertAnimation() {
  // Context의 scope로 그대로 넘길 DOM 범위 — 공식이 허용한 React Ref 형태의 scope다
  const scope = useRef<HTMLDivElement>(null)
  // 버튼 두 개가 같은 Context instance를 조작해야 해서 ref에 보관한다
  const contextRef = useRef<gsap.Context | null>(null)
  // 지금 화면이 어느 단계인지 — 설명 문구와 버튼 활성 여부가 여기서 갈린다
  const [stage, setStage] = useState<ContextStage>('idle')
  // Context가 실제로 몇 개를 기록했고 되돌려졌는지를 추측 없이 읽어 온 값이다
  const [contextObservation, setContextObservation] = useState<ContextObservation>({ recorded: 0, isReverted: false })
  // 박스별 현재 값 — GSAP이 element에 쓴 결과를 그대로 읽어 표로 만든다
  const [boxes, setBoxes] = useState<BoxObservation[]>(() =>
    steps.map((step) => ({ key: step.key, label: step.label, property: step.property, current: step.from, from: step.from })),
  )
  // 방금 어떤 조작을 했는지 screen reader에도 전달한다
  const [status, setStatus] = useState('아직 Context를 만들지 않았습니다. 버튼을 눌러 보세요.')
  // 운영체제 모션 감소 설정에서는 이동 없이 최종 상태만 보여준다
  const reducedMotion = useReducedMotion()
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(() => createDescriptor(reducedMotion), [reducedMotion])

  // GSAP이 각 element에 실제로 쓴 값을 읽어 와 표시값이 추측이 아닌 관찰이 되게 한다
  function readBoxes() {
    // scope 밖을 뒤지지 않도록 이 예제 컨테이너 안에서만 찾는다
    const container = scope.current
    if (!container) return

    setBoxes(
      descriptor.steps.map((step) => {
        const element = container.querySelector(step.selector)
        return {
          key: step.key,
          label: step.label,
          property: step.property,
          current: element ? round(Number(gsap.getProperty(element, step.property))) : step.from,
          from: step.from,
        }
      }),
    )
  }

  useGSAP(
    () => {
      // 이전 실행이 남긴 transform을 지워 항상 같은 지점에서 출발시킨다
      descriptor.steps.forEach((step) => {
        gsap.set(step.selector, { [step.property]: step.from })
      })
      // 이 컴포넌트가 사라질 때 손으로 만든 Context도 함께 되돌린다 — 이 페이지가 가르치는 정리 그 자체다
      return () => {
        contextRef.current?.revert()
        contextRef.current = null
      }
    },
    // 모션 설정이 바뀌면 시작 상태부터 다시 잡아 관찰을 결정적으로 만든다
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // 함수 하나 안에서 Tween 세 개를 만들고, 그 함수를 Context에 감싸 기록을 맡긴다
  function create() {
    // 같은 버튼을 다시 눌렀을 때 이전 Context가 남지 않게 먼저 되돌린다
    contextRef.current?.revert()

    const context = gsap.context(() => {
      descriptor.steps.forEach((step, index) => {
        // 선택자는 Context에 넘긴 scope 안에서만 찾힌다 — 세 Tween이 모두 이 함수 안에서 만들어진다
        gsap.to(step.selector, {
          [step.property]: step.to,
          duration: descriptor.duration,
          ease: 'power2.out',
          // 마지막 Tween이 끝났을 때 한 번만 최종 값을 읽어 표를 갱신한다
          onComplete: index === descriptor.steps.length - 1 ? readBoxes : undefined,
        })
      })
    }, scope)

    contextRef.current = context
    // 공식이 말한 "모아 둔다"가 실제 숫자로 몇 개인지 Context에서 직접 읽는다
    setContextObservation({ recorded: context.data.length, isReverted: context.isReverted })
    setStage('created')
    setStatus(
      reducedMotion
        ? 'Context 안에서 Tween 3개를 만들었습니다. 모션 감소 설정이라 이동 없이 최종 상태로 바뀝니다.'
        : 'Context 안에서 Tween 3개를 만들었습니다. 세 박스가 각자 움직입니다.',
    )
    readBoxes()
  }

  // 기록해 둔 것을 한 번에 되돌린다 — 변수 세 개를 따로 들고 있지 않아도 된다
  function revert() {
    const context = contextRef.current
    // 만들기 전 클릭은 화면을 바꾸지 않는다
    if (!context) return

    context.revert()
    setContextObservation({ recorded: context.data.length, isReverted: context.isReverted })
    setStage('reverted')
    setStatus('revert() 한 번으로 세 박스가 모두 처음 상태로 돌아갔습니다.')
    readBoxes()
  }

  // TSX가 버튼·관찰 표·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return { scope, descriptor, stage, boxes, contextObservation, status, reducedMotion, create, revert }
}
