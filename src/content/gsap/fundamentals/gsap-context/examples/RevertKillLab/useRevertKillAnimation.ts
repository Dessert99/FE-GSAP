/** 같은 Context를 revert()로 끝낼 때와 kill()로 끝낼 때 값·상태·cleanup function이 어떻게 갈리는지 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** Context를 끝내는 세 가지 방법 — 세 번째는 kill의 인자 하나만 다르다. */
export type EndingMethod = 'revert' | 'kill' | 'killRevert'

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type RevertKillDescriptor = {
  selector: string
  from: number
  to: number
  duration: number
  requestedDuration: number
}

/** 끝내는 방법 하나가 남긴 결과 네 가지를 한 화면에 모아 보여주는 관찰값이다. */
export type EndingObservation = {
  boxX: number
  isReverted: boolean
  recorded: number
  cleanupCalls: number
  endedBy: EndingMethod | null
}

/** gsap 선택자이자 박스의 className — 실행과 표시가 같은 문자열을 쓴다. */
const targetSelector = '.revert-kill-lab__box'

/** 되돌렸는지 그 자리에 두었는지가 한눈에 보이도록 시작과 끝을 멀리 잡는다. */
const fromX = 0
const toX = 180

/** 사용자가 요청한 이동 시간 — 모션 감소 설정에서는 실제 실행 시간이 0으로 낮아진다. */
const requestedDuration = 0.7

/** 각 방법이 화면에서 어떤 코드로 불리는지 한곳에서 관리한다. */
export const endingMethods: { value: EndingMethod; call: string; label: string }[] = [
  { value: 'revert', call: 'ctx.revert()', label: '되돌리고 정리한다' },
  { value: 'kill', call: 'ctx.kill()', label: '지금 자리에 두고 정리한다' },
  { value: 'killRevert', call: 'ctx.kill(true)', label: '되돌리면서 정리한다' },
]

/** 모션 설정을 실제 gsap 호출 인자 형태로 한 번에 정규화한다. */
function createDescriptor(reducedMotion: boolean): RevertKillDescriptor {
  return {
    selector: targetSelector,
    from: fromX,
    to: toX,
    // 모션 감소 설정에서는 이동 없이 최종 상태만 보여주도록 실제 duration을 0으로 낮춘다
    duration: reducedMotion ? 0 : requestedDuration,
    requestedDuration,
  }
}

/** 끝내는 방법 비교 예제의 Context 생성·종료 action과 결과 관찰값을 제공한다. */
export function useRevertKillAnimation() {
  // 애니메이션이 적용될 DOM 범위이자 Context에 넘길 scope다
  const scope = useRef<HTMLDivElement>(null)
  // 버튼들이 같은 Context instance를 조작해야 해서 ref에 보관한다
  const contextRef = useRef<gsap.Context | null>(null)
  // cleanup function이 실제로 몇 번 불렸는지 세는 값 — 렌더와 무관하게 세야 해서 ref에 둔다
  const cleanupCallsRef = useRef(0)
  // 끝내는 버튼을 아직 누를 수 있는지 — Context를 만든 뒤에만 의미가 있다
  const [hasContext, setHasContext] = useState(false)
  // 값·상태·기록 수·cleanup 횟수를 한 번에 보여주는 관찰값이다
  const [observation, setObservation] = useState<EndingObservation>({
    boxX: fromX,
    isReverted: false,
    recorded: 0,
    cleanupCalls: 0,
    endedBy: null,
  })
  // 방금 어떤 조작을 했는지 screen reader에도 전달한다
  const [status, setStatus] = useState('먼저 Context를 만들어 박스를 옮기고, 그다음 끝내는 방법을 골라 보세요.')
  // 운영체제 모션 감소 설정에서는 이동 없이 최종 상태만 보여준다
  const reducedMotion = useReducedMotion()
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(() => createDescriptor(reducedMotion), [reducedMotion])

  // 네 관찰값을 같은 시점에 한 번에 읽어 표시값이 추측이 아닌 관찰이 되게 한다
  function read(endedBy: EndingMethod | null) {
    const element = scope.current?.querySelector(targetSelector)
    const context = contextRef.current
    setObservation({
      boxX: element ? Math.round(Number(gsap.getProperty(element, 'x'))) : fromX,
      isReverted: context ? context.isReverted : false,
      recorded: context ? context.data.length : 0,
      cleanupCalls: cleanupCallsRef.current,
      endedBy,
    })
  }

  // 이동이 끝난 시점의 값을 읽고 나서만 종료 방법을 고를 수 있게 한다
  function finishCreation() {
    read(null)
    setHasContext(true)
    setStatus('박스 이동이 끝났습니다. 이제 끝내는 방법을 골라 보세요.')
  }

  useGSAP(
    () => {
      // 이전 실행이 남긴 위치를 지워 항상 같은 지점에서 출발시킨다
      gsap.set(targetSelector, { x: descriptor.from })
      // 모션 설정이 바뀌면 종료 버튼과 관찰값도 새 실험의 시작 상태로 맞춘다
      cleanupCallsRef.current = 0
      setHasContext(false)
      setObservation({ boxX: descriptor.from, isReverted: false, recorded: 0, cleanupCalls: 0, endedBy: null })
      setStatus('먼저 Context를 만들어 박스를 옮기고, 그다음 끝내는 방법을 골라 보세요.')
      // 이 컴포넌트가 사라질 때 손으로 만든 Context도 함께 되돌린다
      return () => {
        contextRef.current?.revert()
        contextRef.current = null
      }
    },
    // 모션 설정이 바뀌면 시작 상태부터 다시 잡아 비교를 결정적으로 만든다
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // Tween 하나와 cleanup function 하나를 가진 Context를 만들고 곧바로 재생한다
  function create() {
    contextRef.current?.revert()
    cleanupCallsRef.current = 0
    // 세 종료 방법이 공유할 이 예제 안의 박스 하나다
    const box = scope.current?.querySelector<HTMLElement>(descriptor.selector)
    if (!box) return

    // 이전 kill()이 남긴 값을 지워 세 종료 방법을 언제나 같은 시작점에서 비교한다
    gsap.set(box, { x: descriptor.from })

    contextRef.current = gsap.context(() => {
      // 되돌렸는지 그 자리에 두었는지를 x 값 하나로 판단할 수 있게 한 대상만 움직인다
      gsap.to(box, {
        x: descriptor.to,
        duration: descriptor.duration,
        ease: 'power2.out',
        // 다 옮긴 뒤의 값을 읽어 두어야 끝내기 전후를 비교할 수 있다
        onComplete: finishCreation,
      })
      // 함수가 돌려주는 이 cleanup function이 언제 불리는지가 이 예제의 두 번째 관찰점이다
      return () => {
        cleanupCallsRef.current += 1
      }
    }, scope)

    setHasContext(reducedMotion)
    setStatus(
      reducedMotion
        ? '모션 감소 설정이라 박스를 최종 위치에 두었습니다. 이제 끝내는 방법을 골라 보세요.'
        : 'Context를 만들고 박스를 옮기는 중입니다. 이동이 끝나면 종료 버튼이 활성화됩니다.',
    )
    read(null)
  }

  // 고른 방법으로 Context를 끝내고 네 결과를 그대로 읽어 온다
  function end(method: EndingMethod) {
    const context = contextRef.current
    // 만들기 전 클릭은 화면을 바꾸지 않는다
    if (!context) return

    if (method === 'revert') {
      context.revert()
    } else if (method === 'kill') {
      // 인자 없이 부르면 값을 지금 자리에 그대로 둔다
      context.kill()
    } else {
      // 인자 true를 주면 값까지 되돌린다
      context.kill(true)
    }

    setStatus(
      method === 'kill'
        ? 'kill()로 끝냈습니다. 애니메이션은 사라졌지만 박스는 옮겨진 자리에 남아 있습니다.'
        : '되돌리면서 끝냈습니다. 박스가 시작 위치로 돌아갔습니다.',
    )
    setHasContext(false)
    read(method)
  }

  // TSX가 버튼·관찰 표·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return { scope, descriptor, hasContext, observation, status, reducedMotion, create, end }
}
