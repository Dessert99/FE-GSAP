/** 변수에 담지 않은 Tween 하나를 id·target·활성 여부 세 방식으로 조회하며 각 조회의 범위를 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type RegistryDescriptor = {
  selector: string
  tweenId: string
  targetX: number
  duration: number
  /** 모션 감소 설정이면 자동 재생 대신 slider로 재생 헤드를 옮긴다. */
  autoplay: boolean
}

/** 세 조회 API가 같은 순간에 각각 무엇을 돌려줬는지를 한 묶음으로 보여주는 관찰값이다. */
export type RegistryQuery = {
  byId: string
  tweensOfCount: number
  tweening: boolean
  atProgress: number
}

/** gsap 선택자이자 box의 className — 실행과 표시가 같은 문자열을 쓴다. */
const targetSelector = '.tween-registry-lab__box'

/** 이 Tween에 붙일 이름표 — getById가 찾을 유일한 단서다. */
const tweenId = 'boxSlide'

/** 조회할 시간이 넉넉하도록 잡은 이동 거리와 재생 시간이다. */
const targetX = 240
const duration = 2.4

/** 모션 설정을 실제 gsap 호출 인자 형태로 한 번에 정규화한다. */
function createDescriptor(reducedMotion: boolean): RegistryDescriptor {
  return { selector: targetSelector, tweenId, targetX, duration, autoplay: !reducedMotion }
}

/** getById가 돌려준 값을 화면에 쓸 수 있는 문자열로 바꾼다 — 못 찾으면 공식 문서가 밝힌 undefined 그대로 적는다. */
function describeFound(found: gsap.core.Tween | undefined) {
  return found ? `Tween · progress ${found.progress().toFixed(2)}` : 'undefined'
}

/** 조회 예제의 controls, paused Tween, 세 조회 결과, 재생 action을 제공한다. */
export function useTweenRegistryAnimation() {
  // 이 예제 밖의 같은 class를 선택하지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 조회 결과와 실제 instance를 대조하기 위해 만든 Tween을 보관한다 — 학습 화면에서는 이 참조를 쓰지 않는다
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // 조회 대상 element — 세 조회가 모두 같은 target을 가리켜야 비교가 성립한다
  const targetRef = useRef<HTMLElement | null>(null)
  // 재생 헤드가 지금 어디인지 실시간으로 보여줘 조회 버튼을 누를 시점을 알려준다
  const [progress, setProgress] = useState(0)
  // 버튼을 누른 순간의 세 조회 결과 — 누르기 전에는 아직 조회하지 않았음을 null로 구분한다
  const [query, setQuery] = useState<RegistryQuery | null>(null)
  // 방금 어떤 조작을 했는지 screen reader에도 전달한다
  const [status, setStatus] = useState('아직 조회하지 않았습니다. 재생한 뒤 조회 버튼을 눌러 보세요.')
  // 운영체제 모션 감소 설정에서는 자동 재생 대신 slider로만 재생 헤드를 옮긴다
  const reducedMotion = useReducedMotion()
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(() => createDescriptor(reducedMotion), [reducedMotion])

  useGSAP(
    () => {
      // 조회와 실행이 같은 element를 가리키도록 선택자를 한 번만 풀어 둔다
      const box = gsap.utils.toArray<HTMLElement>(descriptor.selector)[0]
      targetRef.current = box
      // 이전 실행이 남긴 위치를 지워 항상 왼쪽 끝에서 출발시킨다
      gsap.set(box, { x: 0 })
      // 변수 대신 id만 붙여 만든 Tween — 이 예제 전체가 이 id 하나로 다시 찾는 연습이다
      tweenRef.current = gsap.to(box, {
        x: descriptor.targetX,
        duration: descriptor.duration,
        ease: 'none',
        id: descriptor.tweenId,
        paused: true,
        // GSAP이 지금 어디까지 왔는지 그대로 읽어야 표시값이 추측이 아닌 관찰이 된다
        onUpdate() {
          setProgress(Number(tweenRef.current?.progress().toFixed(2) ?? 0))
        },
      })
      // 새 Tween을 준비했으므로 이전 조회 결과를 남겨 두지 않는다
      setProgress(0)
      setQuery(null)
      // context 정리 뒤 handler가 이전 Tween을 다시 조작하지 않게 참조를 비운다
      return () => {
        tweenRef.current = null
        targetRef.current = null
      }
    },
    // 모션 설정이 바뀌면 이전 Tween을 되돌리고 재생 방식부터 다시 준비한다
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // 세 조회 API를 같은 순간에 한 번씩 불러 각자의 답을 기록한다 — 이 예제의 핵심 동작이다
  function runQuery() {
    // runtime 준비 전 click은 화면을 바꾸지 않는다
    const box = targetRef.current
    if (!box) return

    // id만 아는 상태에서 instance를 되찾는 공식 방법이다
    const found = gsap.getById<gsap.core.Tween>(descriptor.tweenId)

    setQuery({
      byId: describeFound(found),
      // 같은 target을 쓰는 Tween을 전부 배열로 받아 개수만 읽는다
      tweensOfCount: gsap.getTweensOf(box).length,
      // 지금 실제로 움직이는 중인지만 Boolean으로 묻는다
      tweening: gsap.isTweening(box),
      atProgress: found ? Number(found.progress().toFixed(2)) : progress,
    })
    setStatus('세 조회를 같은 순간에 한 번씩 실행했습니다. 아래 결과를 비교해 보세요.')
  }

  // 준비된 Tween을 처음부터 재생한다 — 모션 감소 설정에서는 이 버튼을 화면에 두지 않는다
  function play() {
    const tween = tweenRef.current
    if (!tween) return

    tween.restart()
    setStatus('재생을 시작했습니다. 움직이는 동안 조회를 눌러야 isTweening이 true로 나옵니다.')
  }

  // 재생 중인 Tween을 그 자리에서 멈춘다 — kill이 아니라 pause라서 조회에는 계속 잡힌다
  function pause() {
    const tween = tweenRef.current
    if (!tween) return

    tween.pause()
    setStatus('일시정지했습니다. 이 상태로 조회하면 무엇이 달라지는지 확인해 보세요.')
  }

  // 모션 감소 설정에서 재생 대신 재생 헤드를 직접 옮긴다
  function seek(value: number) {
    const tween = tweenRef.current
    if (!tween) return

    tween.progress(value)
    setStatus('재생 헤드를 직접 옮겼습니다. paused Tween이라 isTweening은 계속 false입니다.')
  }

  // TSX가 controls·조회 패널·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return { scope, descriptor, progress, query, status, reducedMotion, runQuery, play, pause, seek }
}
