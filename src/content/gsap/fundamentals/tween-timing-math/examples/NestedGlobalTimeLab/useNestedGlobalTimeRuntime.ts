/** timeline 안의 timeline 안에 tween을 넣고 globalTime()이 중첩을 반영한 전역 시각을 어떻게 반환하는지 읽는다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type NestedDescriptor = {
  innerPosition: number
  tweenPosition: number
  innerTimeScale: number
  localTime: number
  /** tween의 길이는 고정한다 — 여기서 관심사는 길이가 아니라 좌표 변환이다. */
  tweenDuration: number
}

/** 세 층의 시계가 각각 무엇을 돌려줬는지 모은 관찰 결과다. */
export type NestedReadout = {
  outerStartTime: number
  innerStartTime: number
  tweenStartTime: number
  innerTimeScale: number
  /** 사용자가 고른 local time을 globalTime()에 넣어 얻은 전역 시각이다. */
  globalTime: number
  /** tween이 시작하는 순간(local 0)의 전역 시각 — 공식 문서가 예로 든 호출이다. */
  globalStart: number
  /** tween이 끝나는 순간의 전역 시각 — 전역 시간축에서 차지하는 구간을 그리는 데 쓴다. */
  globalEnd: number
}

/** inner timeline에 걸어 볼 배속 후보 — 중첩된 timeScale이 변환에 끼어드는지 보는 최소 집합이다. */
export const innerTimeScaleOptions = [0.5, 1, 2] as const

/** GSAP 3.15.0의 타입 선언에 globalTime()이 빠져 있어 공식 문서의 signature를 그대로 좁혀 쓴다. */
type WithGlobalTime = { globalTime(localTime: number): number }

/** 타입 선언에만 없고 런타임에는 있는 메서드라 호출 지점에서 한 번만 좁힌다. */
function readGlobalTime(tween: gsap.core.Tween, localTime: number) {
  return (tween as unknown as WithGlobalTime).globalTime(localTime)
}

/** tween의 길이를 고정해 좌표 변환에만 집중하게 한다. */
const tweenDuration = 2

/** 소수점이 길게 늘어져 표가 흔들리지 않도록 표시용으로만 자른다. */
function round(value: number) {
  return Math.round(value * 1000) / 1000
}

/** slider·radio 값을 실제 gsap 호출 인자 형태로 한 번에 정규화한다. */
function createDescriptor(
  innerPosition: number,
  tweenPosition: number,
  innerTimeScale: number,
  localTime: number,
): NestedDescriptor {
  return { innerPosition, tweenPosition, innerTimeScale, localTime, tweenDuration }
}

/** 중첩 시계 예제의 controls, 삼중 구조, globalTime 관찰값을 제공한다. */
export function useNestedGlobalTimeRuntime() {
  // 이 예제 밖의 DOM을 건드리지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 바깥 timeline 위에서 안쪽 timeline이 시작하는 지점이다
  const [innerPosition, setInnerPosition] = useState(3)
  // 안쪽 timeline 위에서 tween이 시작하는 지점이다
  const [tweenPosition, setTweenPosition] = useState(1)
  // 안쪽 timeline의 배속 — 이 한 층만 바꿔 전역 시각에 배율이 어떻게 반영되는지 본다
  const [innerTimeScale, setInnerTimeScale] = useState<number>(1)
  // globalTime()에 넣을 tween 자기 기준 시각 — 이 예제가 조작하는 입력값이다
  const [localTime, setLocalTime] = useState(0)
  // 세 층의 시계가 돌려준 값 — 화면의 모든 숫자가 이 관찰값에서 나온다
  const [readout, setReadout] = useState<NestedReadout | null>(null)
  // 전역 시간축 위 표시자에 장식용 transition을 걸어도 되는지 판단한다
  const reducedMotion = useReducedMotion()
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(
    () => createDescriptor(innerPosition, tweenPosition, innerTimeScale, localTime),
    [innerPosition, tweenPosition, innerTimeScale, localTime],
  )

  useGSAP(
    () => {
      // 바깥 timeline은 멈춰 둔다 — 아무것도 재생되지 않아야 좌표만 관찰할 수 있다
      const outer = gsap.timeline({ paused: true })
      // 전역 시각의 기준점을 0으로 고정해 controls의 영향만 결과에 남긴다
      outer.startTime(0)
      // 바깥과 tween 사이에 한 층을 더 두어야 "중첩을 푼다"는 말이 실제로 두 번 일어난다
      const inner = gsap.timeline()
      outer.add(inner, descriptor.innerPosition)
      // 좌표 변환이 관심사라 target은 화면과 무관한 평범한 객체다
      const tween = gsap.to({ v: 0 }, { v: 1, duration: descriptor.tweenDuration })
      inner.add(tween, descriptor.tweenPosition)
      // 중간 층에만 배속을 걸어 변환식의 나눗셈이 어느 층에서 일어나는지 드러낸다
      inner.timeScale(descriptor.innerTimeScale)
      // 세 층의 startTime과 globalTime을 지금 호출해 그대로 읽는다 — 어떤 숫자도 직접 계산하지 않는다
      setReadout({
        outerStartTime: outer.startTime(),
        innerStartTime: inner.startTime(),
        tweenStartTime: tween.startTime(),
        innerTimeScale: inner.timeScale(),
        globalTime: readGlobalTime(tween, descriptor.localTime),
        globalStart: readGlobalTime(tween, 0),
        globalEnd: readGlobalTime(tween, descriptor.tweenDuration),
      })
      // 관찰이 끝난 timeline은 다음 실행 전에 정리한다
      return () => {
        outer.kill()
      }
    },
    // 네 control 중 하나만 바뀌어도 삼중 구조를 처음부터 다시 만들어 결과를 결정적으로 만든다
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // TSX가 controls·삼중 시간축·표·코드 패널을 같은 관찰값에서 그리도록 필요한 값만 전달한다
  return {
    scope,
    innerPosition,
    setInnerPosition,
    tweenPosition,
    setTweenPosition,
    innerTimeScale,
    setInnerTimeScale,
    localTime,
    setLocalTime,
    descriptor,
    readout,
    reducedMotion,
    round,
  }
}
