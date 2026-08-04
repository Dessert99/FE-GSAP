/** paused timeline 위에 tween 하나를 얹고 delay·duration·repeat·repeatDelay·timeScale을 바꿔 가며 일곱 getter의 반환값을 읽는다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type TimingDescriptor = {
  delay: number
  duration: number
  repeat: number
  repeatDelay: number
  timeScale: number
  /** tween을 부모 timeline의 어느 지점에 넣는지 — 0으로 고정해야 startTime이 곧 delay가 된다. */
  position: number
}

/** GSAP getter가 실제로 돌려준 값만 모은 관찰 결과다 — 화면의 숫자는 전부 여기서 나온다. */
export type TimingReadout = {
  delay: number
  duration: number
  totalDuration: number
  startTime: number
  endTime: number
  endTimeWithoutRepeats: number
  timeScale: number
  repeat: number
  repeatDelay: number
}

/** 시간축 그림의 한 칸 — 재생 구간인지 기다리는 구간인지와 부모 기준 시각 범위를 갖는다. */
export type TimingSegment = {
  id: string
  kind: 'delay' | 'cycle' | 'repeat-delay'
  label: string
  start: number
  end: number
}

/** 컨트롤이 고를 수 있는 timeScale 후보 — 느림·정상·빠름을 한눈에 비교할 최소 집합이다. */
export const timeScaleOptions = [0.5, 1, 2, 4] as const

/** tween을 부모 timeline의 0초 지점에 넣어 startTime이 delay와 같아지게 고정한다. */
const position = 0

/** 소수점이 길게 늘어져 표가 흔들리지 않도록 표시용으로만 자른다. */
function round(value: number) {
  return Math.round(value * 1000) / 1000
}

/** slider·radio 값을 실제 gsap 호출 인자 형태로 한 번에 정규화한다. */
function createDescriptor(
  delay: number,
  duration: number,
  repeat: number,
  repeatDelay: number,
  timeScale: number,
): TimingDescriptor {
  return { delay, duration, repeat, repeatDelay, timeScale, position }
}

/** GSAP이 돌려준 값만으로 시간축의 칸을 만든다 — 보간이나 길이를 새로 추정하지 않는다. */
function createSegments(readout: TimingReadout): TimingSegment[] {
  const segments: TimingSegment[] = []
  // timeScale이 클수록 부모 시간축에서 차지하는 폭이 좁아진다 — endTime과 같은 나눗셈을 쓴다
  const speed = Math.abs(readout.timeScale) || 1
  // 한 회차가 부모 시간축에서 차지하는 폭
  const cycleSpan = readout.duration / speed
  // 회차 사이에 끼는 대기 구간의 폭
  const gapSpan = readout.repeatDelay / speed

  // delay 구간은 startTime 앞에 놓이며, 있을 때만 칸으로 만든다
  if (readout.startTime > 0) {
    segments.push({ id: 'delay', kind: 'delay', label: `delay ${round(readout.delay)}초`, start: 0, end: readout.startTime })
  }

  // 첫 재생 한 번에 repeat 횟수를 더한 만큼이 실제 회차 수다
  const cycleCount = readout.repeat + 1
  let cursor = readout.startTime

  for (let index = 0; index < cycleCount; index += 1) {
    segments.push({
      id: `cycle-${index}`,
      kind: 'cycle',
      label: cycleCount === 1 ? '재생' : `${index + 1}회차`,
      start: cursor,
      end: cursor + cycleSpan,
    })
    cursor += cycleSpan

    // 마지막 회차 뒤에는 repeatDelay가 붙지 않는다 — totalDuration이 repeat 횟수만큼만 더하는 이유다
    if (gapSpan > 0 && index < cycleCount - 1) {
      segments.push({
        id: `gap-${index}`,
        kind: 'repeat-delay',
        label: `repeatDelay ${round(readout.repeatDelay)}초`,
        start: cursor,
        end: cursor + gapSpan,
      })
      cursor += gapSpan
    }
  }

  return segments
}

/** 시간 계산 예제의 controls, paused timeline 위의 tween, getter 반환값, 시간축 칸을 제공한다. */
export function useTimingMathRuntime() {
  // 이 예제 밖의 DOM을 건드리지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 시작 전 대기 시간 — 이 값이 그대로 startTime이 되는지 확인하는 control이다
  const [delay, setDelay] = useState(1)
  // 한 회차의 길이 — repeat과 무관하게 duration()이 이 값을 유지하는지 보는 control이다
  const [duration, setDuration] = useState(2)
  // 추가 반복 횟수 — duration과 totalDuration을 갈라놓는 control이다
  const [repeat, setRepeat] = useState(2)
  // 회차 사이의 대기 시간 — totalDuration에만 더해지는 control이다
  const [repeatDelay, setRepeatDelay] = useState(0.5)
  // 재생 배속 — 길이는 그대로 두고 endTime만 바꾸는지 확인하는 control이다
  const [timeScale, setTimeScale] = useState<number>(1)
  // 일곱 getter가 방금 돌려준 값 — 화면의 모든 숫자가 이 관찰값에서 나온다
  const [readout, setReadout] = useState<TimingReadout | null>(null)
  // 시간축 막대에 장식용 transition을 걸어도 되는지 판단한다
  const reducedMotion = useReducedMotion()
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(
    () => createDescriptor(delay, duration, repeat, repeatDelay, timeScale),
    [delay, duration, repeat, repeatDelay, timeScale],
  )

  useGSAP(
    () => {
      // 부모 timeline은 멈춘 채로 둔다 — 아무것도 재생되지 않아야 숫자만 관찰할 수 있다
      const parent = gsap.timeline({ paused: true })
      // 값이 아니라 시간 계산이 관심사라 target은 화면과 무관한 평범한 객체다
      const tween = gsap.to(
        { v: 0 },
        {
          v: 1,
          duration: descriptor.duration,
          delay: descriptor.delay,
          repeat: descriptor.repeat,
          repeatDelay: descriptor.repeatDelay,
        },
      )
      // 공식 endTime 예제와 같은 방식으로 tween을 부모 timeline의 특정 지점에 넣는다
      parent.add(tween, descriptor.position)
      // timeScale은 배치가 끝난 뒤에 걸어야 endTime이 부모 기준으로 다시 계산된다
      tween.timeScale(descriptor.timeScale)
      // 일곱 getter를 지금 호출해 반환값을 그대로 읽는다 — 어떤 숫자도 직접 계산하지 않는다
      setReadout({
        delay: tween.delay(),
        duration: tween.duration(),
        totalDuration: tween.totalDuration(),
        startTime: tween.startTime(),
        endTime: tween.endTime(),
        endTimeWithoutRepeats: tween.endTime(false),
        timeScale: tween.timeScale(),
        repeat: tween.repeat(),
        repeatDelay: tween.repeatDelay(),
      })
      // 관찰이 끝난 timeline은 다음 실행 전에 정리한다
      return () => {
        parent.kill()
      }
    },
    // 다섯 control 중 하나만 바뀌어도 timeline과 tween을 처음부터 다시 만들어 결과를 결정적으로 만든다
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // 읽어 온 값에서만 시간축 칸을 만든다 — 관찰값이 없으면 그릴 것도 없다
  const segments = useMemo(() => (readout ? createSegments(readout) : []), [readout])

  // TSX가 controls·시간축·표·코드 패널을 같은 관찰값에서 그리도록 필요한 값만 전달한다
  return {
    scope,
    delay,
    setDelay,
    duration,
    setDuration,
    repeat,
    setRepeat,
    repeatDelay,
    setRepeatDelay,
    timeScale,
    setTimeScale,
    descriptor,
    readout,
    segments,
    reducedMotion,
    round,
  }
}
