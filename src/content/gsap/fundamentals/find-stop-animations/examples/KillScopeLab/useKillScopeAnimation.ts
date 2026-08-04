/** 같은 Tween을 네 가지 범위로 중단하며 어떤 property가 계속 반응하는지를 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'

/** 중단 호출을 고르는 두 축 — 전역 조회냐 instance냐, 전부냐 property 하나냐를 조합한 네 가지다. */
export type KillMode = 'global-all' | 'global-prop' | 'instance-all' | 'instance-prop'

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type KillScopeDescriptor = {
  selector: string
  targetX: number
  targetOpacity: number
  duration: number
  /** 범위를 좁힐 때 kill 대상으로 넘길 property 이름이다. */
  killedProperty: string
  mode: KillMode
  progress: number
}

/** 중단 뒤 어떤 값이 멈추고 어떤 값이 계속 반응하는지를 숫자로 드러내는 관찰값이다. */
export type KillScopeObservation = {
  x: number
  opacity: number
  remainingTweens: number
}

/** gsap 선택자이자 box의 className — 실행과 표시가 같은 문자열을 쓴다. */
const targetSelector = '.kill-scope-lab__box'

/** 모든 실행이 같은 지점에서 출발하도록 고정한 시작 상태와 목적지다. */
const baseline = { x: 0, opacity: 1 }
const targetX = 220
const targetOpacity = 0.2

/** 자동 재생 없이 사용자가 직접 옮기는 재생 헤드의 기준 길이다. */
const duration = 1

/** 범위를 좁힐 때 kill할 property — 공식 예제가 든 "opacity,x" 중 하나만 골라 대비를 만든다. */
const killedProperty = 'x'

/** radio·slider 값을 실제 gsap 호출 인자 형태로 한 번에 정규화한다. */
function createDescriptor(mode: KillMode, progress: number): KillScopeDescriptor {
  return { selector: targetSelector, targetX, targetOpacity, duration, killedProperty, mode, progress }
}

/** 브라우저가 "220px"처럼 단위를 붙여 돌려줘도 표시값이 NaN이 되지 않게 숫자만 뽑는다. */
function readNumber(box: HTMLElement, property: string) {
  return Number.parseFloat(String(gsap.getProperty(box, property)))
}

/** 중단 범위 예제의 controls, paused Tween, 관찰값, 중단·초기화 action을 제공한다. */
export function useKillScopeAnimation() {
  // 이 예제 밖의 같은 class를 선택하지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 중단 버튼이 조작할 Tween — instance 호출과 전역 호출을 같은 대상에 걸어야 비교가 성립한다
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // 조회와 관찰이 같은 element를 가리키도록 풀어 둔 target이다
  const targetRef = useRef<HTMLElement | null>(null)
  // 어떤 중단 호출을 실행할지 고르는 control이다
  const [mode, setMode] = useState<KillMode>('global-all')
  // 자동 재생 대신 사용자가 직접 시간을 옮긴다 — 중단 뒤 무엇이 반응하는지 계속 확인하기 위해서다
  const [progress, setProgress] = useState(0)
  // 이미 중단을 실행했는지 구분해 안내 문구와 코드 패널을 다르게 그린다
  const [appliedMode, setAppliedMode] = useState<KillMode | null>(null)
  // 중단 뒤 x·opacity·남은 Tween 수를 색이 아닌 숫자로 보여준다
  const [observation, setObservation] = useState<KillScopeObservation>({
    x: baseline.x,
    opacity: baseline.opacity,
    remainingTweens: 0,
  })
  // 방금 어떤 조작을 했는지 screen reader에도 전달한다
  const [status, setStatus] = useState('재생 헤드를 옮겨 중간까지 보낸 뒤 중단을 눌러 보세요.')
  // 초기화 버튼이 Tween을 처음부터 다시 만들게 하는 재실행 열쇠다
  const [runKey, setRunKey] = useState(0)
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(() => createDescriptor(mode, progress), [mode, progress])

  useGSAP(
    () => {
      // 조회와 실행이 같은 element를 가리키도록 선택자를 한 번만 풀어 둔다
      const box = gsap.utils.toArray<HTMLElement>(targetSelector)[0]
      targetRef.current = box
      // 이전 실행이 남긴 위치와 투명도를 지워 항상 같은 지점에서 출발시킨다
      gsap.set(box, baseline)
      // x와 opacity를 함께 움직이는 paused Tween — 두 property가 있어야 범위를 좁힌 kill이 눈에 보인다
      tweenRef.current = gsap.to(box, {
        x: targetX,
        opacity: targetOpacity,
        duration,
        ease: 'none',
        paused: true,
      })
      // 새 Tween을 준비했으므로 이전 중단 기록과 관찰값을 지운다
      setProgress(0)
      setAppliedMode(null)
      setObservation({ x: baseline.x, opacity: baseline.opacity, remainingTweens: gsap.getTweensOf(box).length })
      // context 정리 뒤 handler가 이전 Tween을 다시 조작하지 않게 참조를 비운다
      return () => {
        tweenRef.current = null
        targetRef.current = null
      }
    },
    // 초기화를 누를 때만 이전 Tween을 되돌리고 처음부터 다시 만든다
    { scope, dependencies: [runKey], revertOnUpdate: true },
  )

  // GSAP이 element에 실제로 쓴 값을 그대로 읽어 표를 만든다 — 보간을 다시 계산하지 않는다
  function readObservation() {
    const box = targetRef.current
    if (!box) return

    setObservation({
      x: Math.round(readNumber(box, 'x')),
      opacity: Number(readNumber(box, 'opacity').toFixed(2)),
      remainingTweens: gsap.getTweensOf(box).length,
    })
  }

  // 사용자가 재생 헤드를 옮긴다 — 중단 뒤에도 계속 옮겨 봐야 무엇이 죽었는지 알 수 있다
  function seek(value: number) {
    const tween = tweenRef.current
    if (!tween) return

    setProgress(value)
    tween.progress(value)
    readObservation()
  }

  // 고른 범위로 실제 중단 호출을 실행한다 — 이 예제의 핵심 동작이다
  function applyStop() {
    // runtime 준비 전 click은 화면을 바꾸지 않는다
    const tween = tweenRef.current
    const box = targetRef.current
    if (!tween || !box) return

    if (descriptor.mode === 'global-all') {
      // target만 알면 되는 전역 호출 — 그 target의 Tween을 통째로 없앤다
      gsap.killTweensOf(box)
    } else if (descriptor.mode === 'global-prop') {
      // 같은 전역 호출에 두 번째 인자를 붙여 property 하나만 없앤다
      gsap.killTweensOf(box, descriptor.killedProperty)
    } else if (descriptor.mode === 'instance-all') {
      // 이미 instance를 들고 있을 때의 호출 — 이 Tween 전체를 없앤다
      tween.kill()
    } else {
      // 같은 instance 호출에 target과 property를 함께 줘서 범위를 가장 좁힌다
      tween.kill(box, descriptor.killedProperty)
    }

    setAppliedMode(descriptor.mode)
    readObservation()
    setStatus('중단했습니다. 재생 헤드를 더 옮겨 보고 어떤 값이 아직 반응하는지 확인하세요.')
  }

  // Tween을 처음부터 다시 만들어 다른 범위로 같은 실험을 반복하게 한다
  function reset() {
    setRunKey((key) => key + 1)
    setStatus('Tween을 새로 만들었습니다. 다른 범위를 골라 다시 확인해 보세요.')
  }

  // TSX가 controls·관찰 패널·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return { scope, descriptor, mode, setMode, progress, appliedMode, observation, status, seek, applyStop, reset }
}
