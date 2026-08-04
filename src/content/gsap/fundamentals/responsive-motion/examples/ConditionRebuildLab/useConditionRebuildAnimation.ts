/** 하나의 MatchMedia에 조건 셋을 걸고, 조건 boolean이 뒤집힐 때 정리와 재실행이 일어나는 것을 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'

/** 이 예제가 mm.add()에 넘기는 조건 이름 셋 — 이름은 GSAP이 정하지 않고 우리가 짓는다. */
export type ConditionFlags = {
  isWide: boolean
  isNarrow: boolean
  reduceMotion: boolean
}

/** 조건 이름마다 실제로 넘어간 media query 문자열 — 표시 코드가 이 값을 그대로 찍는다. */
export type ConditionQueries = {
  isWide: string
  isNarrow: string
  reduceMotion: string
}

/** handler 한 번의 실행이 실제로 쓴 query 문자열과 GSAP 인자 값을 한 덩어리로 묶는다. */
export type ConditionDescriptor = {
  breakpoint: number
  queries: ConditionQueries
  conditions: ConditionFlags
  x: number
  rotation: number
  duration: number
}

/** 화면에 숫자와 문장으로 드러낼 관찰값 — 실행 횟수와 직전 정리 기록이 핵심이다. */
export type RebuildObservation = {
  descriptor: ConditionDescriptor | null
  runCount: number
  lastCleanup: string
}

/** gsap.set과 gsap.to가 찾을 선택자이자 JSX className — 실행과 표시가 같은 문자열을 쓴다. */
export const targetClassName = 'condition-rebuild-lab__box'

/** breakpoint slider가 움직일 수 있는 범위와 간격 — 실제 창 폭을 사이에 두고 넘나들 수 있어야 한다. */
export const breakpointRange = { min: 320, max: 1600, step: 40 } as const

/** 조건 이름과 media query 문자열의 대응을 breakpoint 하나에서 만들어 낸다. */
function createQueries(breakpoint: number): ConditionQueries {
  return {
    isWide: `(min-width: ${breakpoint}px)`,
    isNarrow: `(max-width: ${breakpoint - 1}px)`,
    reduceMotion: '(prefers-reduced-motion: reduce)',
  }
}

/** 조건 boolean에서 실제 GSAP 인자 값을 뽑아 controls·실행·표시 코드가 같은 값을 보게 한다. */
function createDescriptor(breakpoint: number, conditions: ConditionFlags): ConditionDescriptor {
  return {
    breakpoint,
    queries: createQueries(breakpoint),
    conditions,
    // 넓다고 판정되면 더 멀리 밀어 두고, 좁으면 제자리에 둔다
    x: conditions.isWide ? 140 : 0,
    // 모션 감소를 요청한 사용자에게는 회전 자체를 주지 않는다
    rotation: conditions.reduceMotion ? 0 : conditions.isWide ? 360 : 180,
    // 공식 예제와 같은 선택 — 모션 감소면 duration 0으로 끝 상태만 남긴다
    duration: conditions.reduceMotion ? 0 : 1.2,
  }
}

/** 조건 재실행 예제의 controls, MatchMedia 생명주기, 관찰값, 재생 action을 제공한다. */
export function useConditionRebuildAnimation() {
  // MatchMedia의 기본 scope이자 선택자 탐색 범위 — 이 안의 .box만 찾게 만든다
  const scope = useRef<HTMLDivElement>(null)
  // handler가 만든 paused Tween — 재생 버튼이 이 instance를 처음부터 돌린다
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // handler가 지금까지 몇 번 실행됐는지 — 재실행이 일어났는지 판단하는 유일한 숫자다
  const runCountRef = useRef(0)
  // cleanup 함수가 남긴 직전 정리 기록 — 다음 실행이 이 값을 읽어 화면에 올린다
  const cleanupNoteRef = useRef('아직 정리된 적이 없습니다.')
  // 사용자가 고르는 breakpoint — 이 값이 media query 문자열을 만든다
  const [breakpoint, setBreakpoint] = useState(800)
  // 조건 boolean이 왜 그렇게 나왔는지 설명하려면 지금 창 폭이 함께 보여야 한다
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth)
  // handler가 실제로 쓴 descriptor와 실행·정리 횟수를 한 번에 보여주는 관찰값이다
  const [observation, setObservation] = useState<RebuildObservation>({
    descriptor: null,
    runCount: 0,
    lastCleanup: '아직 정리된 적이 없습니다.',
  })

  useEffect(() => {
    // 조건이 토글되지 않는 폭 변화도 화면에 보여야 breakpoint와의 관계를 읽을 수 있다
    const update = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useGSAP(
    () => {
      // scope를 기본 scope로 넘겨 handler 안의 선택자가 이 컨테이너 밖으로 나가지 않게 한다
      const mm = gsap.matchMedia(scope)

      // 조건 셋을 한 객체로 묶어 하나의 handler가 세 상황을 모두 담당하게 한다
      mm.add(createQueries(breakpoint), (context) => {
        // 이번 실행이 몇 번째인지 세어 재실행 여부를 숫자로 드러낸다
        runCountRef.current += 1
        // GSAP이 채워 준 boolean을 그대로 읽는다 — 우리가 다시 판정하지 않는다
        const conditions = context.conditions as ConditionFlags
        // 조건 boolean에서 이번 실행이 쓸 GSAP 인자 값을 한 번에 만든다
        const descriptor = createDescriptor(breakpoint, conditions)

        // 이전 조건이 남긴 위치를 지우고 이번 조건의 시작 상태를 즉시 적용한다
        gsap.set(`.${targetClassName}`, { x: descriptor.x, rotation: 0 })
        // 자동 재생하지 않고 재생 버튼을 기다리는 Tween을 이번 조건 값으로 만든다
        tweenRef.current = gsap.to(`.${targetClassName}`, {
          rotation: descriptor.rotation,
          duration: descriptor.duration,
          paused: true,
        })

        setObservation({ descriptor, runCount: runCountRef.current, lastCleanup: cleanupNoteRef.current })

        return () => {
          // 조건이 안 맞게 되거나 revert될 때 GSAP이 불러 주는 자리 — 여기서 context.revert()를 부르지 않는다
          cleanupNoteRef.current = `${runCountRef.current}번째 실행이 만든 animation이 정리됐습니다.`
          tweenRef.current = null
        }
      })

      return () => {
        // 컴포넌트가 사라지거나 breakpoint가 바뀔 때 이 MatchMedia가 만든 것을 전부 되돌린다
        mm.revert()
      }
    },
    // breakpoint가 바뀌면 query 문자열 자체가 달라지므로 MatchMedia를 되돌리고 새로 만든다
    { scope, dependencies: [breakpoint], revertOnUpdate: true },
  )

  // 걸어 둔 Tween이 이번 조건의 값으로 움직이는지 사용자가 직접 확인하게 한다
  function play() {
    tweenRef.current?.restart()
  }

  // TSX가 controls·조건 표·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return { scope, breakpoint, setBreakpoint, viewportWidth, observation, play }
}
