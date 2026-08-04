/** repeat·repeatDelay·yoyo가 만든 전체 시간표를 직접 훑으며 회차 번호와 대상 값을 함께 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type RepeatCycleDescriptor = {
  selector: string
  distance: number
  duration: number
  repeat: number
  repeatDelay: number
  yoyo: boolean
  totalProgress: number
}

/** 시간표를 이루는 한 칸 — 실제 회차 구간이거나 회차 사이의 빈 틈이다. */
export type CycleBlock = {
  key: string
  kind: 'iteration' | 'gap'
  iteration: number
  startRatio: number
  widthRatio: number
  direction: 'forward' | 'backward' | null
}

/** 지금 헤드가 선 자리에서 Tween이 실제로 보고한 값들이다. */
export type CycleObservation = {
  iteration: number
  totalTime: number
  time: number
  progress: number
  x: number
  duration: number
  totalDuration: number
}

/** gsap 선택자이자 상자의 className — 실행과 표시가 같은 문자열을 쓴다. */
const targetSelector = '.repeat-cycle-lab__box'

/** 한 회차가 움직이는 거리 — 값이 어디까지 갔는지 눈으로 재는 기준이다. */
const distance = 220

/** 한 회차의 길이를 1초로 고정해 전체 시간이 repeat·repeatDelay만으로 결정되게 한다. */
const duration = 1

/** slider·checkbox 값을 실제 gsap 호출 인자 형태로 한 번에 정규화한다. */
function createDescriptor(repeat: number, repeatDelay: number, yoyo: boolean, totalProgress: number): RepeatCycleDescriptor {
  return { selector: targetSelector, distance, duration, repeat, repeatDelay, yoyo, totalProgress }
}

/** 실제 Tween이 보고한 전체 길이를 분모로 삼아 회차 칸과 틈 칸의 폭을 비율로 만든다. */
function createBlocks(descriptor: RepeatCycleDescriptor, totalDuration: number): CycleBlock[] {
  const blocks: CycleBlock[] = []
  // 회차 수는 repeat가 아니라 repeat + 1이다 — 이 예제가 가장 먼저 보여주려는 계산이다
  const iterationCount = descriptor.repeat + 1
  let elapsed = 0

  for (let index = 0; index < iterationCount; index += 1) {
    // yoyo가 켜지면 짝수 회차가 역방향이다 — 실행으로 확인한 규칙을 화면 라벨에 그대로 쓴다
    const direction = descriptor.yoyo && index % 2 === 1 ? 'backward' : 'forward'
    blocks.push({
      key: `iteration-${index}`,
      kind: 'iteration',
      iteration: index + 1,
      startRatio: elapsed / totalDuration,
      widthRatio: descriptor.duration / totalDuration,
      direction,
    })
    elapsed += descriptor.duration

    // 마지막 회차 뒤에는 틈이 붙지 않는다 — totalDuration이 repeatDelay × repeat만 더하는 이유다
    if (descriptor.repeatDelay > 0 && index < iterationCount - 1) {
      blocks.push({
        key: `gap-${index}`,
        kind: 'gap',
        iteration: index + 1,
        startRatio: elapsed / totalDuration,
        widthRatio: descriptor.repeatDelay / totalDuration,
        direction: null,
      })
      elapsed += descriptor.repeatDelay
    }
  }

  return blocks
}

/** 소수점이 길게 늘어져 표가 흔들리지 않도록 표시용으로만 자른다. */
function round(value: number) {
  return Math.round(value * 100) / 100
}

/** 반복 시간표 예제의 controls, paused Tween, 회차 칸, 관찰값을 제공한다. */
export function useRepeatCycleAnimation() {
  // 이 예제 밖의 같은 class를 선택하지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 첫 iteration 뒤에 추가로 몇 번 더 재생할지 정하는 control이다
  const [repeat, setRepeat] = useState(2)
  // 회차와 회차 사이에 넣을 빈 시간이며 마지막 회차 뒤에는 붙지 않는다
  const [repeatDelay, setRepeatDelay] = useState(0)
  // 각 반복이 방향을 뒤집을지 정하는 control이다
  const [yoyo, setYoyo] = useState(false)
  // 자동 재생 대신 사용자가 전체 시간표 위를 직접 훑는다 — 회차 변화를 눈으로 세는 것이 이 예제의 목적이다
  const [totalProgress, setTotalProgress] = useState(0)
  // 시간표를 이루는 회차 칸과 틈 칸이며 실제 totalDuration을 분모로 만든다
  const [blocks, setBlocks] = useState<CycleBlock[]>([])
  // Tween이 직접 보고한 회차 번호·시간·값이다
  const [observation, setObservation] = useState<CycleObservation>({
    iteration: 1,
    totalTime: 0,
    time: 0,
    progress: 0,
    x: 0,
    duration,
    totalDuration: duration,
  })
  // 운영체제 모션 감소 설정 — 이 예제는 자동 재생이 없어 장식 전환만 끈다
  const reducedMotion = useReducedMotion()
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(
    () => createDescriptor(repeat, repeatDelay, yoyo, totalProgress),
    [repeat, repeatDelay, yoyo, totalProgress],
  )

  useGSAP(
    () => {
      // 이전 실행이 남긴 위치를 지워 항상 같은 지점에서 시간표를 다시 만든다
      gsap.set(descriptor.selector, { x: 0 })
      // repeat·repeatDelay·yoyo를 한 Tween에 넣고 재생은 하지 않는다 — 헤드는 slider가 옮긴다
      const tween = gsap.to(descriptor.selector, {
        x: descriptor.distance,
        duration: descriptor.duration,
        repeat: descriptor.repeat,
        repeatDelay: descriptor.repeatDelay,
        yoyo: descriptor.yoyo,
        ease: 'none',
        paused: true,
      })
      // 반복을 포함한 전체 시간 위에서 헤드를 옮겨야 회차가 넘어가는 순간을 볼 수 있다
      tween.totalProgress(descriptor.totalProgress)
      // 회차 칸의 폭은 추측이 아니라 Tween이 보고한 전체 길이에서 나눈다
      setBlocks(createBlocks(descriptor, tween.totalDuration()))
      // GSAP이 계산한 회차 번호와 대상 값을 그대로 읽는다 — 다시 계산하지 않는다
      setObservation({
        iteration: tween.iteration(),
        totalTime: round(tween.totalTime()),
        time: round(tween.time()),
        progress: round(tween.progress()),
        x: Math.round(Number(gsap.getProperty(descriptor.selector, 'x'))),
        duration: tween.duration(),
        totalDuration: tween.totalDuration(),
      })
    },
    // 반복 설정이나 헤드 위치 중 하나만 바뀌어도 이전 Tween을 되돌리고 시간표를 처음부터 다시 만든다
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // TSX가 controls·시간표·관찰 패널·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return {
    scope,
    repeat,
    setRepeat,
    repeatDelay,
    setRepeatDelay,
    yoyo,
    setYoyo,
    totalProgress,
    setTotalProgress,
    descriptor,
    blocks,
    observation,
    reducedMotion,
  }
}
