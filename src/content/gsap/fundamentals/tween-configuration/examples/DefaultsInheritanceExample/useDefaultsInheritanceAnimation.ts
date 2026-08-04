/** 전역 defaults를 잠깐 바꿔 Tween에 상속시킨 뒤 즉시 되돌리는 한 번의 실행을 관리한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 예제에서 defaults로 지정해 볼 ease 후보다. */
export type DefaultsEase = 'power1.out' | 'power2.in' | 'back.out(1.7)' | 'none'

/** controls·runtime·표시 코드가 공유하는 단일 실행 descriptor다. */
export type DefaultsDescriptor = {
  selector: string
  defaultsPatch: { duration: number; ease: DefaultsEase }
  tweenVars: { x: number; paused: true; inherit?: false }
}

/** 상속 결과와 전역 복원 여부를 화면에 숫자로 드러내는 관찰값이다. */
export type DefaultsObservation = {
  snapshotKeys: string[]
  snapshotDuration: number
  appliedDuration: number
  appliedEase: string
  restoredDuration: number
  restored: boolean
}

/** gsap.to에 넘길 선택자이자 preview className — 실행과 표시가 같은 문자열을 쓴다. */
const targetSelector = '.defaults-inheritance-example__target'

/** slider·select·checkbox 값을 실제 gsap 호출 인자 형태로 한 번에 정규화한다. */
function createDefaultsDescriptor(duration: number, ease: DefaultsEase, inherit: boolean): DefaultsDescriptor {
  // duration과 ease를 일부러 비워 둬야 defaults에서 채워지는 것이 보인다.
  const tweenVars = { x: 220, paused: true as const, ...(inherit ? {} : { inherit: false as const }) }

  return { selector: targetSelector, defaultsPatch: { duration, ease }, tweenVars }
}

/** defaults 상속 예제의 controls, paused Tween, 관찰값, replay action을 제공한다. */
export function useDefaultsInheritanceAnimation() {
  // 이 예제 밖의 같은 class를 선택하지 않도록 useGSAP 범위를 제한한다.
  const scope = useRef<HTMLDivElement>(null)
  // 준비된 paused Tween을 버튼에서만 재생하도록 보관한다.
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // defaults로 지정할 duration이며 tween에는 직접 넘기지 않는다.
  const [duration, setDuration] = useState(1.4)
  // defaults로 지정할 ease이며 역시 tween에 직접 넘기지 않는다.
  const [ease, setEase] = useState<DefaultsEase>('power2.in')
  // 체크를 풀면 tween이 inherit:false로 만들어져 defaults를 전혀 받지 않는다.
  const [inherit, setInherit] = useState(true)
  // snapshot·상속 결과·복원 여부를 색에 의존하지 않는 숫자로 보여준다.
  const [observation, setObservation] = useState<DefaultsObservation>({
    snapshotKeys: [],
    snapshotDuration: 0,
    appliedDuration: 0,
    appliedEase: '—',
    restoredDuration: 0,
    restored: true,
  })
  // 준비·실행·정적 대체 상태를 screen reader에도 전달한다.
  const [status, setStatus] = useState('아직 실행하지 않았습니다. 값을 고르고 실행을 눌러 보세요.')
  // 운영체제 모션 감소 설정에서는 이동 없이 최종 상태만 보여준다.
  const reducedMotion = useReducedMotion()
  // controls·runtime 호출·serializer가 공유할 단일 descriptor다.
  const descriptor = useMemo(() => createDefaultsDescriptor(duration, ease, inherit), [duration, ease, inherit])

  useGSAP(
    () => {
      // 이전 실행이 남긴 위치를 지워 항상 같은 지점에서 출발시킨다.
      gsap.set(descriptor.selector, { x: 0 })
      // 전역 defaults 객체는 내부 객체와 같은 참조라서, 펼쳐 복사해야 복원용 snapshot이 된다.
      const snapshot = { ...gsap.defaults() }
      // 생성 중 예외가 나도 전역이 바뀐 채로 남지 않도록 복원을 finally에 둔다.
      let tween: gsap.core.Tween
      // GSAP이 ease 문자열을 파싱해 넣은 함수 — Tween이 정말 이 함수를 물려받았는지 대조할 기준이다.
      let parsedEase: unknown
      try {
        // 여기서만 전역 기본값을 바꿔 다음에 만드는 Tween이 이 값을 물려받게 한다.
        gsap.defaults(descriptor.defaultsPatch)
        // 문자열이 아니라 파싱된 함수로 저장되므로 defaults에서 그대로 읽어 둔다.
        parsedEase = gsap.defaults().ease
        // duration·ease를 넘기지 않았는데도 defaults에서 채워지는 것을 보여주는 Tween이다.
        tween = gsap.to(descriptor.selector, { ...descriptor.tweenVars })
      } finally {
        // 상속은 생성 순간에 끝났으므로 전역을 곧바로 되돌려도 이 Tween은 값을 유지한다.
        gsap.defaults(snapshot)
      }
      // replay handler가 같은 Tween을 처음부터 재생하도록 보관한다.
      tweenRef.current = tween
      // snapshot·상속 결과·복원 결과를 한 번에 읽어 관찰 패널에 넘긴다.
      setObservation({
        snapshotKeys: Object.keys(snapshot),
        snapshotDuration: snapshot.duration as number,
        appliedDuration: tween.duration(),
        // 상속받은 ease가 방금 지정한 그 함수인지 동일성으로 확인한다. 끊겼으면 vars.ease가 비어 있다.
        appliedEase: tween.vars.ease === parsedEase ? descriptor.defaultsPatch.ease : '상속 안 됨',
        restoredDuration: gsap.defaults().duration as number,
        // duration만 보면 ease가 남아 있어도 복원됐다고 잘못 읽히므로 둘 다 대조한다.
        restored: gsap.defaults().duration === snapshot.duration && gsap.defaults().ease === snapshot.ease,
      })
      // 새 값으로 준비만 끝났고 아직 움직이지 않았음을 알린다.
      setStatus('현재 값으로 paused Tween을 준비했습니다. 실행 버튼을 눌러 확인하세요.')
      // context 정리 뒤 handler가 이전 Tween을 다시 실행하지 않게 참조를 비운다.
      return () => {
        tweenRef.current = null
      }
    },
    // 값이나 모션 설정이 하나라도 바뀌면 이전 Tween을 되돌리고 처음부터 다시 준비한다.
    { scope, dependencies: [descriptor, reducedMotion], revertOnUpdate: true },
  )

  // 준비된 Tween을 수동으로 재생하고 reduced-motion에서는 최종 상태만 보여준다.
  function run() {
    // useGSAP이 준비해 둔 paused Tween — 재생만 하고 새로 만들지 않는다.
    const tween = tweenRef.current
    // runtime 준비 전 click은 화면을 바꾸지 않는다.
    if (!tween) return

    if (reducedMotion) {
      // 재생하지 않고 헤드만 끝으로 옮겨 중간 이동을 한 프레임도 만들지 않는다.
      tween.pause().progress(1)
      setStatus(`정적 완료 · 상속된 duration ${observation.appliedDuration}초 · 전역 ${observation.restored ? '복원됨' : '복원 안 됨'}`)
      return
    }

    // 같은 Tween을 처음부터 재생해 상속된 duration과 ease를 관찰하게 한다.
    tween.restart()
    setStatus(`상속된 duration ${observation.appliedDuration}초로 실행 중입니다. 전역 defaults는 ${observation.restored ? '이미 복원됐습니다' : '복원되지 않았습니다'}.`)
  }

  // TSX가 controls·관찰값·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다.
  return {
    scope,
    duration,
    setDuration,
    ease,
    setEase,
    inherit,
    setInherit,
    descriptor,
    observation,
    status,
    reducedMotion,
    run,
  }
}
