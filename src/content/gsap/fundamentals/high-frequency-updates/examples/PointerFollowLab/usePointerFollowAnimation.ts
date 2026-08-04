/** 같은 입력을 quickSetter와 quickTo로 각각 흘려보내 보간 유무와 Tween 재사용을 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 입력을 즉시 반영할지 시간을 두고 따라오게 할지 고르는 쓰기 경로다. */
export type WritePath = 'quickSetter' | 'quickTo'

/** quickTo의 vars에 넣을 ease 후보이며 power3는 공식 예제가 쓴 값이다. */
export type FollowEase = 'power3' | 'none'

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type PointerFollowDescriptor = {
  selector: string
  unit: string
  requestedPath: WritePath
  effectivePath: WritePath
  duration: number
  ease: FollowEase
  startX: number
}

/** GSAP이 실제로 쓴 결과를 다시 읽어 담는 관찰값 — 어떤 값도 여기서 새로 계산하지 않는다. */
export type PointerFollowObservation = {
  appliedX: number
  lastValue: number
  writeCalls: number
  tweensSeen: number
}

/** 만들어 둔 쓰기 함수와 그 함수가 붙들고 있는 Tween을 한 묶음으로 보관한다. */
type PointerWriter = {
  call: (value: number) => void
  tween: gsap.core.Tween | null
}

/** gsap 선택자이자 점의 className — 실행과 표시가 같은 문자열을 쓴다. */
const targetSelector = '.pointer-follow-lab__dot'

/** quickSetter를 만들 때 지정하는 단위 — 넣는 숫자에 항상 이 단위가 붙는다. */
const setterUnit = 'px'

/** 모든 실행이 트랙 왼쪽 끝에서 출발하도록 고정한 시작 x다. */
const startX = 0

/** slider가 다루는 입력 눈금의 최댓값 — 포인터 위치도 이 범위로 정규화한다. */
export const inputMax = 100

/** controls와 모션 설정을 실제 gsap 호출 인자 형태로 한 번에 정규화한다. */
function createDescriptor(path: WritePath, duration: number, ease: FollowEase, reducedMotion: boolean): PointerFollowDescriptor {
  // 모션 감소 설정에서는 보간을 없애고 즉시 쓰기로 바꾼다. quickTo의 duration을 0으로 낮추는 방법은 값이 목표에 도달하지 않아 쓸 수 없다
  const effectivePath = reducedMotion ? 'quickSetter' : path

  return { selector: targetSelector, unit: setterUnit, requestedPath: path, effectivePath, duration, ease, startX }
}

/** 고빈도 입력 예제의 controls, 재사용 쓰기 함수, GSAP이 쓴 결과 관찰을 제공한다. */
export function usePointerFollowAnimation() {
  // 이 예제 밖의 같은 class를 선택하지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 포인터의 화면 좌표를 트랙 안의 비율로 바꾸려면 트랙의 실제 위치와 폭이 필요하다
  const trackRef = useRef<HTMLDivElement>(null)
  // 입력 handler가 매번 선택자를 다시 풀지 않도록 대상 element를 보관한다
  const elementRef = useRef<HTMLElement | null>(null)
  // 입력이 올 때마다 다시 부를 쓰기 함수 — 이 함수를 재사용하는 것이 이 페이지의 요지다
  const writerRef = useRef<PointerWriter | null>(null)
  // 쓰기 함수를 몇 번 불렀는지 세어 입력 빈도를 눈에 보이게 한다
  const writeCountRef = useRef(0)
  // 서로 다른 Tween 인스턴스가 몇 개나 등장했는지 실제로 모아 센다
  const seenTweensRef = useRef(new Set<gsap.core.Tween>())
  // GSAP에 마지막으로 넘긴 숫자 — 코드 패널이 이 값을 그대로 보여준다
  const lastValueRef = useRef(startX)
  // 즉시 쓰기와 부드럽게 따라가기 중 무엇을 쓸지 고르는 control이다
  const [path, setPath] = useState<WritePath>('quickTo')
  // quickTo가 목표값까지 흘러가는 시간이며 0은 고를 수 없다
  const [duration, setDuration] = useState(0.4)
  // 같은 duration에서 따라오는 느낌이 어떻게 달라지는지 비교하는 control이다
  const [ease, setEase] = useState<FollowEase>('power3')
  // slider와 포인터가 공유하는 0-100 입력 눈금이다
  const [input, setInput] = useState(0)
  // .tween.pause()가 실제로 걸렸는지 Tween에서 다시 읽어 담는다
  const [tweenPaused, setTweenPaused] = useState(false)
  // GSAP이 쓴 결과만 담는 관찰 상태 — 보간값을 직접 계산하지 않는다
  const [observation, setObservation] = useState<PointerFollowObservation>({
    appliedX: startX,
    lastValue: startX,
    writeCalls: 0,
    tweensSeen: 0,
  })
  // 운영체제 모션 감소 설정에서는 따라오는 움직임 없이 위치만 바꾼다
  const reducedMotion = useReducedMotion()
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(
    () => createDescriptor(path, duration, ease, reducedMotion),
    [path, duration, ease, reducedMotion],
  )

  // 화면에 표시할 값은 전부 GSAP이 element에 쓴 결과를 다시 읽어서 만든다
  function observe(element: HTMLElement) {
    setObservation({
      appliedX: Math.round(Number(gsap.getProperty(element, 'x'))),
      lastValue: lastValueRef.current,
      writeCalls: writeCountRef.current,
      tweensSeen: seenTweensRef.current.size,
    })
  }

  useGSAP(
    () => {
      // 입력 handler와 관찰이 같은 element를 가리키도록 선택자를 한 번만 풀어 둔다
      const dot = gsap.utils.toArray<HTMLElement>(descriptor.selector)[0]
      elementRef.current = dot
      // 설정을 바꿔 다시 만들 때마다 왼쪽 끝에서 출발시켜 비교 기준을 같게 맞춘다
      gsap.set(dot, { x: descriptor.startX })
      // 호출 횟수와 Tween 집계도 함께 초기화해야 이번 설정의 결과만 세게 된다
      writeCountRef.current = 0
      seenTweensRef.current = new Set()
      lastValueRef.current = descriptor.startX

      if (descriptor.effectivePath === 'quickSetter') {
        // 입력 바깥에서 딱 한 번 만든다. 이후에는 이 함수만 부르고 Tween은 만들지 않는다
        const setX = gsap.quickSetter(dot, 'x', descriptor.unit) as (value: number) => void
        writerRef.current = {
          call: (value) => setX(value),
          tween: null,
        }
      } else {
        // 입력 바깥에서 딱 한 번 만든다. 이 순간 Tween 하나가 생기고 이후로는 그것만 재사용된다
        const xTo = gsap.quickTo(dot, 'x', {
          duration: descriptor.duration,
          ease: descriptor.ease,
          // 보간 중에는 매 프레임 GSAP이 쓴 값을 다시 읽어야 화면 숫자가 실제와 어긋나지 않는다
          onUpdate: () => observe(dot),
        })
        writerRef.current = {
          call: (value) => {
            // 호출이 돌려준 Tween을 집합에 넣어 같은 인스턴스가 재사용되는지 실제로 센다
            seenTweensRef.current.add(xTo(value))
          },
          tween: xTo.tween,
        }
      }

      // 새 설정으로 준비만 끝난 상태를 화면에 반영한다
      setTweenPaused(false)
      observe(dot)

      // context 정리 뒤 handler가 사라진 함수를 다시 부르지 않게 참조를 비운다
      return () => {
        writerRef.current = null
        elementRef.current = null
      }
    },
    // 쓰기 경로·duration·ease·모션 설정 중 하나만 바뀌어도 함수를 되돌리고 처음부터 다시 만든다
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // 입력 눈금 하나를 실제 픽셀 목표값으로 바꿔 쓰기 함수에 흘려보낸다
  function write(nextInput: number) {
    setInput(nextInput)

    const track = trackRef.current
    const element = elementRef.current
    const writer = writerRef.current
    // runtime 준비 전 입력은 화면을 바꾸지 않는다
    if (!track || !element || !writer) return

    // 점이 트랙 밖으로 나가지 않도록 이동 폭을 매번 다시 잰다 — 화면 폭이 바뀌어도 맞는다
    const travel = Math.max(0, track.clientWidth - element.offsetWidth)
    const targetX = Math.round((nextInput / inputMax) * travel)

    lastValueRef.current = targetX
    writeCountRef.current += 1
    writer.call(targetX)
    // 넘긴 값은 재사용 Tween의 일시정지를 풀어 버리므로 버튼 표시도 Tween에서 다시 읽는다
    setTweenPaused(writer.tween ? writer.tween.paused() : false)
    observe(element)
  }

  // 포인터의 화면 좌표를 트랙 기준 0-100 눈금으로 바꿔 slider와 같은 입력으로 만든다
  function pointTo(clientX: number) {
    const track = trackRef.current
    if (!track) return

    const rect = track.getBoundingClientRect()
    write(Math.round(gsap.utils.clamp(0, 1, (clientX - rect.left) / rect.width) * inputMax))
  }

  // 결과 함수의 .tween으로 재사용 Tween을 직접 멈추거나 다시 돌린다
  function toggleTweenPaused() {
    const tween = writerRef.current?.tween
    // quickSetter 경로에는 Tween이 없어 멈출 대상도 없다
    if (!tween) return

    tween.paused(!tween.paused())
    // 화면 표시는 Tween이 실제로 가진 상태를 다시 읽어서 만든다
    setTweenPaused(tween.paused())
  }

  // TSX가 controls·관찰 패널·코드 패널을 같은 descriptor와 관찰값에서 그리도록 필요한 값만 전달한다
  return {
    scope,
    trackRef,
    path,
    setPath,
    duration,
    setDuration,
    ease,
    setEase,
    input,
    write,
    pointTo,
    descriptor,
    observation,
    tweenPaused,
    toggleTweenPaused,
    reducedMotion,
  }
}
