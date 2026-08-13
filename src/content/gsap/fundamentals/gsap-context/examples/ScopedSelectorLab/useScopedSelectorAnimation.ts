/** 같은 class가 두 카드에 있을 때 Context의 scope 인자 하나가 선택 범위를 어떻게 바꾸는지 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** Context에 scope를 넘길지 말지를 정하는 두 가지 선택지다. */
export type ScopeMode = 'scoped' | 'unscoped'

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type ScopedSelectorDescriptor = {
  selector: string
  mode: ScopeMode
  scopeExpression: string
  y: number
  duration: number
  requestedDuration: number
}

/** 카드 하나에서 몇 개가 실제로 움직였는지를 한 행으로 보여주는 관찰값이다. */
export type CardObservation = {
  key: 'one' | 'two'
  label: string
  total: number
  moved: number
}

/** 두 카드가 공유하는 class이자 gsap 선택자 — 이름이 같다는 것이 이 예제의 전제다. */
const targetSelector = '.scoped-selector-lab__box'

/** 카드 하나가 담는 박스 개수 — 두 카드가 같은 수를 가져야 비교가 선명하다. */
export const boxesPerCard = 3

/** 위로 띄우는 거리 — 움직였는지 아닌지만 구분하면 되므로 작게 잡는다. */
const targetY = -18

/** 사용자가 요청한 이동 시간 — 모션 감소 설정에서는 실제 실행 시간이 0으로 낮아진다. */
const requestedDuration = 0.5

/** radio 값과 모션 설정을 실제 gsap 호출 인자 형태로 한 번에 정규화한다. */
function createDescriptor(mode: ScopeMode, reducedMotion: boolean): ScopedSelectorDescriptor {
  return {
    selector: targetSelector,
    mode,
    // 코드 패널이 두 번째 인자를 그릴 때 쓰는 문자열 — 실행에서 scope를 넘기는지와 같은 값에서 파생한다
    scopeExpression: mode === 'scoped' ? 'cardOneRef' : '',
    y: targetY,
    // 모션 감소 설정에서는 이동 없이 최종 상태만 보여주도록 실제 duration을 0으로 낮춘다
    duration: reducedMotion ? 0 : requestedDuration,
    requestedDuration,
  }
}

/** 범위 지정 예제의 controls, Context 생성·되돌림 action, 카드별 관찰값을 제공한다. */
export function useScopedSelectorAnimation() {
  // 예제 전체 범위 — useGSAP이 시작 상태를 잡을 때 이 안에서만 선택자를 찾는다
  const scope = useRef<HTMLDivElement>(null)
  // Context의 scope로 넘길 첫 번째 카드 — 공식이 허용한 React Ref 형태의 scope다
  const cardOneRef = useRef<HTMLDivElement>(null)
  // 두 번째 카드는 scope 밖이라는 것을 세는 데만 쓰고 GSAP에는 넘기지 않는다
  const cardTwoRef = useRef<HTMLDivElement>(null)
  // 버튼 두 개가 같은 Context instance를 조작해야 해서 ref에 보관한다
  const contextRef = useRef<gsap.Context | null>(null)
  // scope를 넘길지 말지를 정하는 control — 이 예제의 유일한 변수다
  const [mode, setMode] = useState<ScopeMode>('scoped')
  // 카드별로 몇 개가 움직였는지 — 선택 범위를 숫자로 드러낸다
  const [cards, setCards] = useState<CardObservation[]>([
    { key: 'one', label: '카드 1 (scope로 넘긴 영역)', total: boxesPerCard, moved: 0 },
    { key: 'two', label: '카드 2 (scope 밖)', total: boxesPerCard, moved: 0 },
  ])
  // 실행 전에는 revert 버튼을 막고 모드 변경 뒤 남은 Context를 조작하지 않게 한다
  const [hasContext, setHasContext] = useState(false)
  // 코드 패널이 실제 revert 호출 여부를 구분하도록 마지막 정리 동작을 기록한다
  const [didRevert, setDidRevert] = useState(false)
  // 방금 어떤 조작을 했는지 screen reader에도 전달한다
  const [status, setStatus] = useState('아직 실행하지 않았습니다. scope 여부를 고르고 실행을 눌러 보세요.')
  // 운영체제 모션 감소 설정에서는 이동 없이 최종 상태만 보여준다
  const reducedMotion = useReducedMotion()
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(() => createDescriptor(mode, reducedMotion), [mode, reducedMotion])

  // 카드 안에서 y가 0이 아닌 박스를 세어 "실제로 선택된 것"을 관찰값으로 만든다
  function countMoved(card: HTMLDivElement | null) {
    if (!card) return 0
    return Array.from(card.querySelectorAll(targetSelector)).filter(
      (element) => Number(gsap.getProperty(element, 'y')) !== 0,
    ).length
  }

  // 두 카드를 같은 방법으로 세어 표를 갱신한다 — 추측이 아니라 DOM에서 읽는다
  function readCards() {
    setCards([
      { key: 'one', label: '카드 1 (scope로 넘긴 영역)', total: boxesPerCard, moved: countMoved(cardOneRef.current) },
      { key: 'two', label: '카드 2 (scope 밖)', total: boxesPerCard, moved: countMoved(cardTwoRef.current) },
    ])
  }

  useGSAP(
    () => {
      // 이전 실행이 남긴 위치를 지워 두 카드가 항상 같은 지점에서 출발하게 한다
      const boxes = gsap.utils.toArray<HTMLElement>(targetSelector, scope.current)
      gsap.set(boxes, { y: 0 })
      // scope 선택이나 모션 설정이 바뀌면 관찰값과 버튼 단계도 시작 상태로 맞춘다
      setCards([
        { key: 'one', label: '카드 1 (scope로 넘긴 영역)', total: boxesPerCard, moved: 0 },
        { key: 'two', label: '카드 2 (scope 밖)', total: boxesPerCard, moved: 0 },
      ])
      setHasContext(false)
      setDidRevert(false)
      setStatus('아직 실행하지 않았습니다. scope 여부를 고르고 실행을 눌러 보세요.')
      // 이 컴포넌트가 사라질 때 손으로 만든 Context도 함께 되돌린다
      return () => {
        contextRef.current?.revert()
        contextRef.current = null
      }
    },
    // scope 선택이나 모션 설정이 바뀌면 시작 상태부터 다시 잡아 비교를 결정적으로 만든다
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // 같은 선택자 한 줄을 scope 있는 Context와 없는 Context에서 각각 실행한다
  function run() {
    // 이전 실행이 남긴 위치를 되돌려 이번 결과만 표에 남게 한다
    contextRef.current?.revert()

    const animate = () => {
      gsap.to(descriptor.selector, {
        y: descriptor.y,
        duration: descriptor.duration,
        ease: 'power2.out',
        // GSAP이 다 쓴 뒤에 세어야 "몇 개가 선택됐나"가 정확해진다
        onComplete: readCards,
      })
    }

    // 두 번째 인자를 주느냐 마느냐 — 이 한 줄이 선택 범위를 정한다
    contextRef.current =
      descriptor.mode === 'scoped' ? gsap.context(animate, cardOneRef) : gsap.context(animate)

    setHasContext(true)
    setDidRevert(false)
    setStatus(
      descriptor.mode === 'scoped'
        ? '카드 1을 scope로 넘겼습니다. 같은 선택자인데도 카드 1 안에서만 찾습니다.'
        : 'scope를 넘기지 않았습니다. 같은 선택자가 문서 전체에서 이 class를 찾습니다.',
    )
    readCards()
  }

  // 이번 실행이 움직인 것만 처음 자리로 되돌린다
  function revert() {
    const context = contextRef.current
    // 실행 전 클릭은 화면을 바꾸지 않는다
    if (!context) return

    context.revert()
    setHasContext(false)
    setDidRevert(true)
    setStatus('revert()로 이번 실행이 건드린 박스를 모두 처음 자리로 되돌렸습니다.')
    readCards()
  }

  // TSX가 controls·카드 무대·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return {
    scope,
    cardOneRef,
    cardTwoRef,
    mode,
    setMode,
    descriptor,
    cards,
    hasContext,
    didRevert,
    status,
    reducedMotion,
    run,
    revert,
  }
}
