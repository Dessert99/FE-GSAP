/** 같은 Tween을 여러 번 다시 재생하면서 기억해 둔 시작값이 언제 유지되고 언제 다시 읽히는지 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 버튼 두 개가 실제로 실행하는 호출 순서의 차이다. */
export type RunKind = 'restart' | 'invalidate'

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type InvalidateDescriptor = {
  selector: string
  shift: string
  duration: number
  reducedMotion: boolean
}

/** 한 번의 실행에서 Tween이 실제로 쓴 시작값과 끝값을 한 행으로 남긴다. */
export type RunRow = {
  index: number
  kind: RunKind
  startX: number
  endX: number
}

/** gsap 선택자이자 상자의 className — 실행과 표시가 같은 문자열을 쓴다. */
const targetSelector = '.invalidate-lab__box'

/** 목적지를 상대값으로 적어야 "지금 위치에서 얼마나 더"라는 재계산 질문이 생긴다. */
const shift = '+=120'

/** 한 번의 이동에 걸리는 시간 — control이 아니라 고정값이라 관찰이 회차 사이에서 흔들리지 않는다. */
const duration = 0.6

/** 모션 설정을 실제 gsap 호출 인자 형태로 한 번에 정규화한다. */
function createDescriptor(reducedMotion: boolean): InvalidateDescriptor {
  return { selector: targetSelector, shift, duration, reducedMotion }
}

/** 소수점 없이 픽셀 위치만 비교하도록 표시용으로만 자른다. */
function round(value: unknown) {
  return Math.round(Number(value))
}

/** 값 재계산 예제의 paused Tween, 실행 기록, 두 가지 실행 action을 제공한다. */
export function useInvalidateAnimation() {
  // 이 예제 밖의 같은 class를 선택하지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 여러 번 다시 재생할 대상 Tween — 같은 instance가 값을 기억하고 있어야 이 예제가 성립한다
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // 실행할 때마다 Tween이 쓴 시작·끝 값을 쌓아 두 버튼의 차이를 표로 비교한다
  const [runs, setRuns] = useState<RunRow[]>([])
  // 방금 어떤 호출을 했는지 screen reader에도 전달한다
  const [status, setStatus] = useState('아직 실행하지 않았습니다. 두 버튼을 번갈아 눌러 비교해 보세요.')
  // 되돌리기 버튼이 Tween을 처음 상태로 다시 만들게 하는 신호다
  const [resetKey, setResetKey] = useState(0)
  // 운영체제 모션 감소 설정 — 이동 없이 최종 상태만 보여줄지 결정한다
  const reducedMotion = useReducedMotion()
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(() => createDescriptor(reducedMotion), [reducedMotion])

  useGSAP(
    () => {
      // 이전 실행이 남긴 위치를 지워 항상 x가 0인 상태에서 첫 기억이 만들어지게 한다
      gsap.set(descriptor.selector, { x: 0 })
      // 목적지가 상대값인 paused Tween — 아직 재생하지 않았으므로 시작값도 기억하지 않은 상태다
      tweenRef.current = gsap.to(descriptor.selector, {
        x: descriptor.shift,
        duration: descriptor.duration,
        ease: 'none',
        paused: true,
      })
      // 새로 만들었으므로 이전 Tween의 실행 기록을 지운다
      setRuns([])
      setStatus('아직 실행하지 않았습니다. 두 버튼을 번갈아 눌러 비교해 보세요.')
      // context 정리 뒤 handler가 이전 Tween을 다시 실행하지 않게 참조를 비운다
      return () => {
        tweenRef.current = null
      }
    },
    // 모션 설정이나 되돌리기 신호가 바뀔 때만 Tween을 새로 만든다 — 버튼 실행만으로는 다시 만들지 않는다
    { scope, dependencies: [descriptor, resetKey], revertOnUpdate: true },
  )

  // 두 버튼의 차이는 restart 앞에 invalidate()를 부르느냐 하나뿐이다
  function run(kind: RunKind) {
    // useGSAP이 준비해 둔 paused Tween — 재생만 하고 새로 만들지 않는다
    const tween = tweenRef.current
    // runtime 준비 전 click은 화면을 바꾸지 않는다
    if (!tween) return

    // 기억해 둔 시작·끝 값을 지운다. 다음 render에서 vars를 다시 읽게 된다
    if (kind === 'invalidate') tween.invalidate()

    // 헤드를 시작으로 보내면 이 render에서 실제로 쓰일 시작값이 화면에 적힌다
    tween.progress(0)
    const startX = round(gsap.getProperty(descriptor.selector, 'x'))
    // 헤드를 끝으로 보내 같은 실행이 도달할 끝값을 읽는다
    tween.progress(1)
    const endX = round(gsap.getProperty(descriptor.selector, 'x'))

    if (descriptor.reducedMotion) {
      // 모션 감소 설정에서는 이동 없이 끝 상태에 그대로 머문다
      setStatus(`모션 감소 설정이라 이동 없이 x ${startX}에서 ${endX}로 바로 바꿨습니다.`)
    } else {
      // 시작으로 되감은 뒤 실제로 재생해야 이동이 눈에 보인다
      tween.progress(0)
      tween.restart()
      setStatus(
        kind === 'invalidate'
          ? `invalidate() 뒤 restart() — 시작값을 다시 읽어 x ${startX}에서 ${endX}로 갑니다.`
          : `restart()만 — 기억해 둔 시작값을 그대로 써서 x ${startX}에서 ${endX}로 갑니다.`,
      )
    }

    // GSAP이 실제로 쓴 두 값을 그대로 기록한다 — 다시 계산하지 않는다
    setRuns((previous) => [...previous, { index: previous.length + 1, kind, startX, endX }])
  }

  // Tween을 처음 만든 상태로 되돌려 기억이 없는 지점부터 다시 비교하게 한다
  function reset() {
    setResetKey((previous) => previous + 1)
  }

  // TSX가 버튼·기록 표·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return { scope, descriptor, runs, status, reducedMotion, run, reset }
}
