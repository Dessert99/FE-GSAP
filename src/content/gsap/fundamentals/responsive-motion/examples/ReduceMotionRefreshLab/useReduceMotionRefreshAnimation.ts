/** OS 조건과 앱 체크박스를 함께 읽는 handler를 두고, 체크박스만으로는 바뀌지 않는 실행을 refresh가 어떻게 되돌리는지 보게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'

/** handler 한 번의 실행이 실제로 판단한 값과 그 결과 GSAP에 넘긴 duration을 묶는다. */
export type RefreshDescriptor = {
  osReduceMotion: boolean
  osFullMotion: boolean
  appReduceMotion: boolean
  reduceMotion: boolean
  duration: number
}

/** 화면에 숫자로 드러낼 관찰값 — 실행·정리 횟수와 MatchMedia 생성 횟수가 핵심이다. */
export type RefreshObservation = {
  descriptor: RefreshDescriptor | null
  runCount: number
  cleanupCount: number
  createCount: number
}

/** gsap.set과 gsap.to가 찾을 선택자이자 JSX className — 실행과 표시가 같은 문자열을 쓴다. */
export const targetClassName = 'reduce-motion-refresh-lab__box'

/** 이 예제가 mm.add()에 넘기는 조건 쌍 — 둘이 서로 반대라 항상 하나는 매치된다. */
export const osQueries = {
  osReduceMotion: '(prefers-reduced-motion: reduce)',
  osFullMotion: '(prefers-reduced-motion: no-preference)',
} as const

/** OS 조건 쌍과 앱 설정을 하나의 판단으로 합쳐 실행값을 만든다. */
function createDescriptor(osReduceMotion: boolean, osFullMotion: boolean, appReduceMotion: boolean): RefreshDescriptor {
  // 둘 중 하나라도 모션을 줄이라고 하면 줄인다 — 사용자에게 불리한 쪽으로 기울지 않게 한다
  const reduceMotion = osReduceMotion || appReduceMotion

  return {
    osReduceMotion,
    osFullMotion,
    appReduceMotion,
    reduceMotion,
    // 공식 예제와 같은 선택 — 모션 감소면 duration 0으로 끝 상태만 남긴다
    duration: reduceMotion ? 0 : 1.6,
  }
}

/** refresh 예제의 controls, MatchMedia 생명주기, 관찰값, 재생·refresh action을 제공한다. */
export function useReduceMotionRefreshAnimation() {
  // MatchMedia의 기본 scope이자 선택자 탐색 범위 — 이 안의 .box만 찾게 만든다
  const scope = useRef<HTMLDivElement>(null)
  // handler가 만든 paused Tween — 재생 버튼이 이 instance를 처음부터 돌린다
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // media query가 아니라 우리가 들고 있는 앱 설정 — handler는 실행 시점에 이 값을 읽는다
  const appReduceRef = useRef(false)
  // handler 실행 횟수 — 체크박스만으로는 늘지 않고 refresh에서만 는다는 것이 관찰 대상이다
  const runCountRef = useRef(0)
  // cleanup 함수 실행 횟수 — refresh가 재실행 전에 정리부터 한다는 증거다
  const cleanupCountRef = useRef(0)
  // MatchMedia를 몇 번 만들었는지 — refresh가 instance를 destroy하지 않는다는 증거다
  const createCountRef = useRef(0)
  // 체크박스의 화면 표시값 — 실제 판단에 쓰이는 값은 같은 순간 ref에도 적는다
  const [appReduceMotion, setAppReduceMotion] = useState(false)
  // handler가 실제로 쓴 descriptor와 세 가지 횟수를 한 번에 보여주는 관찰값이다
  const [observation, setObservation] = useState<RefreshObservation>({
    descriptor: null,
    runCount: 0,
    cleanupCount: 0,
    createCount: 0,
  })

  // handler와 cleanup이 각자 올린 횟수를 같은 형태로 화면에 올린다
  function publish(descriptor: RefreshDescriptor | null) {
    setObservation({
      descriptor,
      runCount: runCountRef.current,
      cleanupCount: cleanupCountRef.current,
      createCount: createCountRef.current,
    })
  }

  useGSAP(
    () => {
      // scope를 기본 scope로 넘겨 handler 안의 선택자가 이 컨테이너 밖으로 나가지 않게 한다
      const mm = gsap.matchMedia(scope)
      // 이 숫자가 늘지 않는 동안은 같은 MatchMedia가 계속 살아 있다는 뜻이다
      createCountRef.current += 1

      // 서로 반대인 조건 쌍을 넘겨 항상 하나는 매치되게 한다 — refresh가 되돌릴 대상이 있어야 한다
      mm.add(osQueries, (context) => {
        // 이번 실행이 몇 번째인지 세어 재실행 여부를 숫자로 드러낸다
        runCountRef.current += 1
        // GSAP이 채워 준 boolean 쌍과 앱 설정을 이 시점에 함께 읽어 하나로 합친다
        const descriptor = createDescriptor(
          Boolean(context.conditions?.osReduceMotion),
          Boolean(context.conditions?.osFullMotion),
          appReduceRef.current,
        )

        // 이전 실행이 남긴 회전을 지우고 항상 같은 지점에서 출발시킨다
        gsap.set(`.${targetClassName}`, { rotation: 0 })
        // 자동 재생하지 않고 재생 버튼을 기다리는 Tween을 이번 판단 값으로 만든다
        tweenRef.current = gsap.to(`.${targetClassName}`, {
          rotation: 360,
          duration: descriptor.duration,
          paused: true,
        })

        publish(descriptor)

        return () => {
          // 조건이 안 맞게 되거나 revert될 때 GSAP이 불러 주는 자리 — 여기서 context.revert()를 부르지 않는다
          cleanupCountRef.current += 1
          tweenRef.current = null
        }
      })

      return () => {
        // 컴포넌트가 사라질 때 이 MatchMedia가 만든 것을 전부 되돌린다
        mm.revert()
      }
    },
    // 한 번만 만들고, 이후 재실행은 체크박스가 아니라 refresh와 OS 설정 변화로만 일어난다
    { scope },
  )

  // 체크박스는 값만 바꾼다 — 이미 만들어진 Tween은 이 시점에 다시 만들어지지 않는다
  function toggleAppReduceMotion(next: boolean) {
    appReduceRef.current = next
    setAppReduceMotion(next)
  }

  // 지금 매치 중인 MatchMedia를 되돌리고 다시 실행시켜 handler가 새 앱 설정을 읽게 한다
  function refresh() {
    gsap.matchMediaRefresh()
  }

  // 걸어 둔 Tween이 이번 판단의 duration으로 움직이는지 사용자가 직접 확인하게 한다
  function play() {
    tweenRef.current?.restart()
  }

  // TSX가 controls·관찰 표·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return { scope, appReduceMotion, toggleAppReduceMotion, observation, refresh, play }
}
