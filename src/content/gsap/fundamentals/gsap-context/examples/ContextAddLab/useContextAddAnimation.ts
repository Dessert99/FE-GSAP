/** Context 함수가 끝난 뒤 만든 애니메이션이 기록되는지를 네 가지 만드는 방법으로 갈라 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 클릭 시점의 Tween을 어떤 경로로 만들지 정하는 네 가지 선택지다. */
export type CreationMode = 'outside' | 'named' | 'immediate' | 'ignored'

/** Context 없음 · 만들어 둠 · 클릭 애니메이션까지 만듦 · 되돌림이라는 네 관찰 단계다. */
export type AddStage = 'idle' | 'ready' | 'made' | 'reverted'

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type ContextAddDescriptor = {
  selector: string
  mode: CreationMode
  x: number
  duration: number
  requestedDuration: number
}

/** Context가 몇 개를 기록했고 박스가 지금 어디에 있는지를 함께 보여주는 관찰값이다. */
export type AddObservation = {
  recorded: number
  boxX: number
}

/** gsap 선택자이자 박스의 className — 실행과 표시가 같은 문자열을 쓴다. */
const targetSelector = '.context-add-lab__box'

/** 클릭 시점에 이동할 거리 — 되돌아왔는지만 구분하면 되므로 하나면 충분하다. */
const targetX = 140

/** 사용자가 요청한 이동 시간 — 모션 감소 설정에서는 실제 실행 시간이 0으로 낮아진다. */
const requestedDuration = 0.6

/** 각 모드가 화면에서 어떤 이름으로 불리는지와 기록 여부 설명을 한곳에서 관리한다. */
export const creationModes: { value: CreationMode; label: string; call: string }[] = [
  { value: 'outside', label: 'Context 밖에서 그냥 만든다', call: 'gsap.to(...)' },
  { value: 'named', label: "self.add('onClick', ...)으로 등록해 두고 부른다", call: 'ctx.onClick()' },
  { value: 'immediate', label: 'ctx.add(...)에 함수를 넘긴다', call: 'ctx.add(() => gsap.to(...))' },
  { value: 'ignored', label: 'ctx.ignore(...) 안에서 만든다', call: 'ctx.ignore(() => gsap.to(...))' },
]

/** radio 값과 모션 설정을 실제 gsap 호출 인자 형태로 한 번에 정규화한다. */
function createDescriptor(mode: CreationMode, reducedMotion: boolean): ContextAddDescriptor {
  return {
    selector: targetSelector,
    mode,
    x: targetX,
    // 모션 감소 설정에서는 이동 없이 최종 상태만 보여주도록 실제 duration을 0으로 낮춘다
    duration: reducedMotion ? 0 : requestedDuration,
    requestedDuration,
  }
}

/** 나중에 생기는 애니메이션 예제의 controls, Context 조작 action, 기록 관찰값을 제공한다. */
export function useContextAddAnimation() {
  // 애니메이션이 적용될 DOM 범위이자 Context에 넘길 scope다
  const scope = useRef<HTMLDivElement>(null)
  // 버튼들이 같은 Context instance를 조작해야 해서 ref에 보관한다
  const contextRef = useRef<gsap.Context | null>(null)
  // Context 생성 시점에 등록한 handler가 최신 duration을 읽도록 descriptor를 ref로도 들고 있는다
  const descriptorRef = useRef<ContextAddDescriptor | null>(null)
  // 클릭 시점 Tween을 어느 경로로 만들지 고르는 control — 이 예제의 유일한 변수다
  const [mode, setMode] = useState<CreationMode>('outside')
  // 지금 화면이 어느 단계인지 — 버튼 활성 여부가 여기서 갈린다
  const [stage, setStage] = useState<AddStage>('idle')
  // Context가 실제로 몇 개를 기록했고 박스가 어디 있는지를 추측 없이 읽어 온 값이다
  const [observation, setObservation] = useState<AddObservation>({ recorded: 0, boxX: 0 })
  // 방금 어떤 조작을 했는지 screen reader에도 전달한다
  const [status, setStatus] = useState('먼저 Context를 만드세요. 그다음 만드는 방법을 골라 애니메이션을 만듭니다.')
  // 운영체제 모션 감소 설정에서는 이동 없이 최종 상태만 보여준다
  const reducedMotion = useReducedMotion()
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(() => createDescriptor(mode, reducedMotion), [mode, reducedMotion])

  // Context가 기록한 수와 박스의 실제 x를 함께 읽어 표시값이 관찰이 되게 한다
  function read() {
    const element = scope.current?.querySelector(targetSelector)
    setObservation({
      recorded: contextRef.current?.data.length ?? 0,
      boxX: element ? Math.round(Number(gsap.getProperty(element, 'x'))) : 0,
    })
  }

  useGSAP(
    () => {
      // 등록해 둔 handler가 항상 최신 duration으로 Tween을 만들게 한다
      descriptorRef.current = descriptor
      // 이전 실행이 남긴 위치를 지워 항상 같은 지점에서 출발시킨다
      gsap.set(targetSelector, { x: 0 })
      // 이 컴포넌트가 사라질 때 손으로 만든 Context도 함께 되돌린다
      return () => {
        contextRef.current?.revert()
        contextRef.current = null
      }
    },
    // 모드나 모션 설정이 바뀌면 시작 상태부터 다시 잡아 관찰을 결정적으로 만든다
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // 클릭 시점에 실행할 Tween 하나 — 네 경로가 모두 같은 호출을 쓰고 감싸는 방법만 다르다
  function animate() {
    const current = descriptorRef.current
    if (!current) return

    gsap.to(current.selector, { x: current.x, duration: current.duration, ease: 'power2.out' })
  }

  // 함수 안에서는 아무 애니메이션도 만들지 않고, 나중에 부를 메서드 이름만 Context에 등록한다
  function createContext() {
    contextRef.current?.revert()
    contextRef.current = gsap.context((self) => {
      // 임의의 문자열을 이름으로 주면 ctx.onClick()으로 부를 수 있는 메서드가 생긴다
      self.add('onClick', animate)
    }, scope)

    setStage('ready')
    setStatus('Context를 만들었습니다. 함수 안에서는 아직 아무것도 만들지 않아 기록은 0개입니다.')
    read()
  }

  // 고른 경로로 클릭 시점 Tween을 만든다 — 기록 여부는 이 경로가 정한다
  function makeAnimation() {
    const context = contextRef.current
    // Context를 만들기 전 클릭은 화면을 바꾸지 않는다
    if (!context) return

    if (descriptor.mode === 'outside') {
      // Context를 거치지 않으므로 이 Tween은 어디에도 기록되지 않는다
      animate()
    } else if (descriptor.mode === 'named') {
      // 생성 시점에 등록해 둔 메서드를 통해 만들면 지금 만든 것도 기록된다
      context.onClick()
    } else if (descriptor.mode === 'immediate') {
      // 함수를 첫 인자로 넘기면 그 자리에서 실행되면서 기록된다
      context.add(animate)
    } else {
      // 일부러 기록에서 빼는 경로 — revert() 대상에서 제외된다
      context.ignore(animate)
    }

    setStage('made')
    setStatus('클릭 시점 애니메이션을 만들었습니다. 기록 수가 늘었는지 보고 revert()를 눌러 보세요.')
    read()
  }

  // 기록된 것만 되돌린다 — 기록되지 않은 Tween은 그대로 남는다
  function revert() {
    const context = contextRef.current
    // 만들기 전 클릭은 화면을 바꾸지 않는다
    if (!context) return

    context.revert()
    setStage('reverted')
    setStatus('revert()를 불렀습니다. 박스가 제자리로 돌아왔는지 확인하세요.')
    read()
  }

  // TSX가 controls·관찰 패널·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return { scope, mode, setMode, descriptor, stage, observation, status, reducedMotion, createContext, makeAnimation, revert }
}
